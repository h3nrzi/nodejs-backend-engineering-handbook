# Chapter 11 — Proxies, routing and trust boundaries

**Domain / competency:** D04 / D04-C11
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Trace independent proxy hops and protocol translation; distinguish transport peer from asserted original caller; review forwarding fields, buffering and timeouts under an explicit trust boundary.

Prerequisites: Chapters [06](06-tls-identity-and-negotiation.md)–[10](10-caching-validation-and-ranges.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: an intermediary creates another exchange

A forward proxy acts on behalf of a client; a reverse proxy fronts an origin service. A load balancer distributes traffic, but that description alone does not say whether it operates on transport connections or parsed HTTP requests. A layer-4 path can forward connections without interpreting HTTP; a layer-7 intermediary parses and can rewrite messages. TLS pass-through and TLS termination have different identity and visibility boundaries.

With termination, client-to-proxy and proxy-to-backend are distinct sessions. The backend sees the proxy as transport peer. A healthy front-side TLS session does not prove encrypted or authenticated upstream transport. A client-facing h2 connection may become HTTP/1.1 upstream; version-sensitive behavior must be evaluated on both hops.

## Routing and identity claims

HTTP authority helps select an origin or tenant. SNI participates earlier in TLS selection. Path rewriting can alter routes, encoded separators and query handling. If a signature covers the original target, an intermediary transformation can invalidate it or, worse, cause different components to verify different meanings. Canonicalization must be explicitly defined, not inferred from convenient string operations.

`Forwarded` and common X-Forwarded fields convey intermediary claims. A direct caller can also send fields with those names. Treat them as authoritative only under an explicit trust model: known ingress, sanitized/overwritten fields and documented chain interpretation. Selecting the leftmost address without establishing trusted hops permits spoofing. Trusting all private source addresses is also insufficient when unrelated workloads share a network.

The lab uses an explicit `trustedPeer` argument supplied by a hypothetical validated boundary. It does not implement network peer authentication. Its tiny function shows why headers alone cannot establish the caller. Real trust configuration, proxy chain changes and authorization belong to later security/operations work.

## Hop-by-hop metadata and translation

Some connection-specific HTTP/1.1 fields apply only to one hop. An intermediary must handle the Connection field and its named fields rather than blindly forwarding every header. HTTP/2 prohibits many connection-specific HTTP/1.1 fields. Translation is therefore not byte-for-byte copying of the header block. Protocol-specific upgrade and tunnel semantics need deliberate support.

Buffering changes observable streaming. An intermediary may receive an entire upload before forwarding, or buffer a response before client delivery. A backend calling write() repeatedly does not prove the user sees incremental progress. Compression, cache layers and minimum flush behavior can add delay. Event streams and large downloads therefore need end-to-end tests through the intended path later.

Limits and deadlines compose across hops. A proxy can reject a body before the application sees it, close an idle connection sooner than the backend, or return a gateway error while upstream work continues. 502, 503 and 504 alone do not identify a precise root cause; log provenance and phase. A gateway timeout is not a rollback acknowledgment from the upstream.

## Worked incident and counterexamples

Suppose a backend generates an absolute redirect using an untrusted X-Forwarded-Host. A direct caller supplies another hostname and receives a poisoned redirect. The defect is promoting an assertion across the trust boundary. The solution is an approved origin/trust policy, not simply escaping the header. Similarly, using an asserted original IP for rate limits without sanitization lets callers choose their own apparent bucket.

Another incident: an SSE endpoint works directly but appears frozen through ingress. Confirm bytes produced, bytes forwarded and bytes received separately. The cause could be buffering, compression, timeout, protocol translation or no actual writes; changing application timers without evidence addresses only one hypothesis.

## Node.js and TypeScript relevance

Node's request headers are parsed metadata, not verified identity objects. The socket's remote address describes the immediate peer and can be represented in IPv4-mapped IPv6 form. Normalize only according to a correct address library/policy chosen later, not ad hoc string suffix tests. In TypeScript, separate `UntrustedForwardingFields` from an established ingress context so ordinary parsing cannot silently confer trust.

No lesson authorizes a proxy architecture for a Charter. Products can face network intermediaries without requiring the learner to build or deploy a particular proxy.

## Follow a claim through two independently failing hops

Suppose client → ingress uses h2/TLS and ingress → backend uses HTTP/1.1. The client sees a 504 after the ingress's upstream budget expires. The backend may still finish its action, the ingress may have buffered part of its response, and the original client may already have cancelled. No one status settles all three observers' outcomes. A trace should name immediate peer, hop protocol, phase and which component generated the final status.

For an illustrative forwarding chain `[untrusted caller, trusted edge, trusted internal proxy]`, establish the direct peer first, then interpret assertions only through the known trusted segment under the deployment's sanitization rule. Stop when trust stops; do not select the first syntactically valid public address from an arbitrary list. A change in ingress topology can invalidate a previously correct hop-count rule. `Forwarded` has quoted/obfuscated values and IPv6 syntax; splitting on commas/colons is not a complete parser or trust policy.

### Translation must preserve semantics, not forbidden wire fields

A Connection field can nominate additional connection-specific fields for removal. A complete intermediary also handles known connection metadata and protocol requirements, including the narrow HTTP/2 exception permitting `TE: trailers`. Removing only names listed by one simple Connection string is insufficient. HTTP/1.1 chunked transfer framing is decoded/reframed for an h2 hop; forwarding literal chunk-size lines into the new body corrupts representation data.

CONNECT creates a tunnel under defined success semantics, while Upgrade changes the protocol on an HTTP/1.1 connection. WebSocket upgrade requires deliberately transferring socket ownership, including any `head` bytes read beyond the HTTP fields; discarding them can lose the first frame. Normal HTTP server shutdown helpers do not automatically account for every upgraded socket. These are lifecycle obligations to evaluate if such support is later selected, not a requirement to build a proxy.

**Advanced incident exercise:** the direct origin emits SSE every few seconds, but the ingress client receives a batch once per minute. Propose measurements at generation, origin write, upstream receipt and downstream receipt; include compression, buffering and client scheduling as competing causes. Full credit avoids equating `write()` with flush-to-user, qualifies clock differences, and checks which hop's timeout expired. The lab remains a trust/removal model, not evidence of ingress authentication or proxy interoperability.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-11.mjs`, then run `node lab-11.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
function observedCaller({ peer, trustedPeer, sanitizedOriginal }) {
  if (!trustedPeer) return { caller: peer, source: 'socket' };
  if (!sanitizedOriginal) return { caller: peer, source: 'socket' };
  return { caller: sanitizedOriginal, source: 'trusted-ingress-assertion' };
}
assert.deepEqual(observedCaller({ peer: '192.0.2.10', trustedPeer: false,
  sanitizedOriginal: '198.51.100.7' }), { caller: '192.0.2.10', source: 'socket' });
assert.deepEqual(observedCaller({ peer: '192.0.2.10', trustedPeer: true,
  sanitizedOriginal: '198.51.100.7' }),
  { caller: '198.51.100.7', source: 'trusted-ingress-assertion' });
const headers = { connection: 'keep-alive, x-local', 'keep-alive': 'timeout=5',
  'x-local': 'hop secret', 'x-end-to-end': 'value' };
const named = headers.connection.split(',').map(x => x.trim().toLowerCase());
const forwarded = Object.fromEntries(Object.entries(headers)
  .filter(([key]) => key !== 'connection' && !named.includes(key)));
assert.deepEqual(forwarded, { 'x-end-to-end': 'value' });
console.log('untrusted assertion ignored; explicit trust and hop-field model: ok');
```

The header model illustrates only Connection-nominated removal for a tiny normalized object. It is not a complete proxy implementation, Forwarded parser, sanitization routine or authenticated trust policy. Documentation-only addresses are never contacted.

## Hands-on exercises with expected results

1. Draw two TLS sessions and label where identity is checked on each. Expected: front-side encryption cannot certify upstream protection.
2. Evaluate a request with a forged forwarding field sent directly to the backend. Expected: an untrusted assertion does not replace transport-peer evidence.
3. Plan a controlled streaming comparison through a future authorized ingress and directly. Expected: phase/byte evidence at both boundaries, no conclusion from application write calls alone.

## Self-assessment and answer rubric

- **Who is remoteAddress behind a reverse proxy?** Full credit: the immediate peer; original-caller assertions require established trust.
- **Can every header be forwarded unchanged?** Full credit: no; hop metadata and version constraints matter.
- **Does a gateway timeout prove no upstream action?** Full credit: no; separate caller observation from upstream execution.

## Reliable references and version notes

- [Forwarded, RFC 7239](https://www.rfc-editor.org/rfc/rfc7239.html), field semantics and trust caveats.
- [HTTP intermediary rules, RFC 9110 §7.6](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6), connection-specific fields.
- [Node v24 HTTP](https://nodejs.org/docs/latest-v24.x/api/http.html), parsed/raw headers and request sockets.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P01 and P04 directly challenge hop provenance and compatibility; P06 challenges streaming visibility. No proxy, ingress deployment, caller authentication or multi-hop security review is implemented. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 10](10-caching-validation-and-ranges.md) · [Next: Chapter 12](12-http2-streams-and-flow-control.md)
