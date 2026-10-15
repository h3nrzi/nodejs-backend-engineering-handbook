# Chapter 02 — DNS and service discovery

**Domain / competency:** D04 / D04-C02
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Explain name resolution and caching; distinguish OS lookup from DNS protocol queries; diagnose stale endpoints and partial IPv4/IPv6 failures without mistaking an address answer for a live connection.

Prerequisites: Chapter [01](01-network-paths-and-addressing.md) and [D03 native work](../../03-nodejs-internals/lessons/10-native-asynchronous-work-and-thread-pool-saturation.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: a name is a queryable reference

DNS distributes typed records under hierarchical names. A recursive resolver pursues answers on a caller's behalf; authoritative servers answer for their zones. A cache can answer without contacting the authority again. Delegation connects zones, so one host's successful query does not establish that every caller sees the same answer at the same time.

An A record carries an IPv4 address; AAAA carries IPv6; CNAME aliases one name to another. MX and SRV describe other discovery data; a generic HTTP connection does not automatically interpret SRV as its endpoint configuration. Record type matters: absence of AAAA is not absence of the name. NXDOMAIN means the queried name does not exist according to that response; NOERROR with no requested data is a different result. SERVFAIL indicates resolution failure, not a definitive missing service.

A time to live bounds ordinary cache reuse of a record. It is not a synchronized global update deadline. A client can hold a live connection beyond DNS TTL, application caches can impose their own policy, and resolvers can support qualified stale-answer behavior. Negative answers also have caching rules. Short TTLs trade increased query load against faster eligible refresh; they do not instantly migrate established traffic.

## Mechanisms in Node.js

`dns.lookup()` uses the operating system's name-resolution facilities. Local hosts configuration and platform resolver behavior can affect results; it is not merely a wire DNS query. Its asynchronous path uses libuv thread-pool work, so latency can include contention with other pool users. `dns.resolve*()` performs DNS record queries through Node's resolver facilities and does not simply reproduce the host's lookup policy. Choosing one solely for speed can change correctness in enterprise or local development environments.

A numeric address bypasses hostname discovery but also loses information unless the desired TLS identity and HTTP authority are preserved separately. `lookup({all:true})` can return multiple candidate addresses. Ordering is not a guarantee that the first address is reachable. Node connection-family attempt behavior is version/configuration sensitive; inspect the exact `net` API settings rather than asserting that every request tries IPv6 first or uses a fixed delay.

Happy Eyeballs describes coordinated attempts across address families to reduce delays from a broken path. It is not a claim that IPv4 is always faster. Parallel/raced attempts consume resources and need loser cleanup. Connecting successfully to one endpoint does not prove every resolved endpoint healthy; include chosen address and family in diagnostic evidence.

## Worked cache and failover reasoning

Suppose a DNS response with TTL 60 was cached at t=0. An operator updates the authoritative address at t=10. A normal cache can still return the old answer at t=30. At t=61 it may refresh, but a pooled socket opened at t=5 may remain active to the old server. Rotating DNS therefore requires connection lifecycle and service draining decisions too. This example is a timeline, not a promise that all resolvers obey this exact process.

A misleading counterexample is “resolve again before every request to ensure security.” A later client connection might perform a second lookup and use a different address. Validating one resolution while connecting with another creates a time-of-check/time-of-use gap. Redirects and proxy routing create additional destinations. D09 owns the complete outbound-request security policy; D04 supplies the resolution and connection facts needed to implement that policy later.

## Debugging sequence and backend relevance

When only some callers fail, compare resolver path, query type, response codes, cached age, candidate addresses, selected endpoint and connection phase. Inspect the same namespace and network as the failing process. A laptop's answer cannot certify an isolated job runner's answer. Avoid logging entire resolver configuration if it contains internal infrastructure information.

DNS failure can occur before any remote application execution; a timeout after request transmission has different outcome uncertainty. Keep a discriminated result model in TypeScript: resolution failure, connect failure and response failure are separate cases with phase-qualified evidence. Do not turn every error into `serviceNotFound: true`. In particular, Node documents that `lookup` can report `ENOTFOUND` for failures beyond a nonexistent name, including other lookup/resource failures. An API error code and an authoritative wire NXDOMAIN response are different evidence.

Custom caches require bounded entries, expiry bookkeeping, coalescing rules and a decision about failures. Coalescing can reduce a lookup stampede but may make many callers depend on one slow attempt. Cache key design must include the dimensions actually affecting answers. These are engineering trade-offs for lessons, not prescribed portfolio architecture.

## Resolution timeline and cache ownership

Trace a new HTTPS request through application cache → OS lookup policy → recursive cache → authoritative answer → address selection → connection. Some steps may be absent; an existing pooled connection can bypass the whole resolution path. Record which layer supplied the result rather than labelling all elapsed time “DNS.” An authoritative TTL governs record cache reuse, not the lifetime of a socket or an application-maintained service object.

Consider two failures after a deployment:

| Observation | Compatible explanations | Discriminating next evidence |
|---|---|---|
| Old address still receives traffic | Cached answer; old pooled socket; rollout overlap | Connection creation time and selected peer, then resolution source |
| `lookup` is slow, `resolve4` fast | OS policy or native-pool contention; different lookup context | Same-process timing, native-pool workload and actual returned candidates |
| AAAA connects slowly, A succeeds | Broken family path; family attempt policy | Actual attempted addresses and connection-attempt events |
| Resolver reports SERVFAIL | Upstream failure; validation failure; temporary resolver fault | Response/source details; never classify as authoritative absence |

A CNAME chain does not give all its records one universal lifetime. Negative caching depends on the negative response and its SOA-derived rules; inventing a permanent “not found” cache from one error can turn a transient incident into a lasting application outage. DNSSEC validation, where performed, authenticates DNS data under its trust chain; it does not prove endpoint reachability or replace TLS service identity. See [RFC 4033](https://www.rfc-editor.org/rfc/rfc4033.html) for that distinct boundary.

### Address attempts are a resource lifecycle

A resolver can return several candidates. A connection strategy must track attempts, their deadlines and the selected winner; close losing attempts and observe their errors. Node v24 exposes `autoSelectFamily` and family-attempt settings on the net connection path. A numeric loopback lookup in this lab exercises none of that racing. Report actual settings and attempt evidence before diagnosing “IPv6 first” behavior; ordering alone does not show which candidate was contacted.

**Advanced exercise:** design a cache diagnostic for a request still reaching an old endpoint 90 seconds after a 30-second TTL update. Full credit identifies at least three independent lifetimes, records the connection's creation/peer context, and distinguishes DNS cache evidence from socket reuse. Include why resolving twice around a security check can select different destinations. No public resolver experiment or SSRF policy implementation is implied.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-02.mjs`, then run `node lab-02.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import { lookup } from 'node:dns/promises';
const result = await lookup('127.0.0.1', { all: true });
assert.deepEqual(result, [{ address: '127.0.0.1', family: 4 }]);
function cached(entry, now) {
  return now < entry.expiresAt ? entry.address : undefined;
}
const entry = { address: '192.0.2.10', expiresAt: 60_000 };
assert.equal(cached(entry, 30_000), '192.0.2.10');
assert.equal(cached(entry, 60_000), undefined);
const candidates = [{ family: 6, reachable: false }, { family: 4, reachable: true }];
assert.equal(candidates.find(x => x.reachable).family, 4);
console.log('numeric lookup and explicit cache/family models: ok');
```

The numeric lookup is an actual Node API call. The TTL and family cases are deterministic models; they do not query an external resolver, implement Happy Eyeballs or prove failover. Documentation-only addresses in the model are never contacted.

## Hands-on exercises with expected results

1. Construct a timeline with TTL expiry and a connection outliving it. Expected: explain at least two independent lifetimes.
2. In an authorized disposable environment, compare `lookup` and `resolve4` for an operator-provided name; record resolver context and both results. This optional external experiment is unexecuted here; differences are evidence to interpret, not automatic bugs.
3. Design a result union with distinct NXDOMAIN, temporary resolver failure and connected-but-no-response cases. Expected: avoid a Boolean “server down” flag and preserve phase and source.

## Self-assessment and answer rubric

- **Why might changing DNS not move traffic?** Full credit: cache eligibility and existing connections are independent.
- **Is no AAAA record equivalent to NXDOMAIN?** Full credit: distinguish record-type absence from name absence.
- **Can `lookup` latency prove DNS server slowness?** Full credit: include OS resolver and native-pool contention as competing causes, then propose phase-specific evidence.

## Reliable references and version notes

- [DNS concepts, RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html), hierarchy and caching.
- [Negative caching, RFC 2308](https://www.rfc-editor.org/rfc/rfc2308.html), negative-answer distinctions.
- [Happy Eyeballs v2, RFC 8305](https://www.rfc-editor.org/rfc/rfc8305.html), address-family attempt coordination.
- [Node v24 DNS](https://nodejs.org/docs/latest-v24.x/api/dns.html) and [net](https://nodejs.org/docs/latest-v24.x/api/net.html), lookup/resolve distinction and connection-family settings.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

No public DNS availability, DNSSEC validation, service-mesh discovery or multi-host failover is tested. D04-P01 directly challenges phase-qualified discovery evidence; DNSSEC operations remain later specialization. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 01](01-network-paths-and-addressing.md) · [Next: Chapter 03](03-tcp-delivery-and-connection-lifecycle.md)
