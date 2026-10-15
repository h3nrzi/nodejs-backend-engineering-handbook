# Chapter 01 — Network paths and addressing

**Domain / competency:** D04 / D04-C01
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Trace a backend exchange across application, transport, network and link boundaries; distinguish an address, a route, a listener and a service identity; calculate a latency or bandwidth lower bound without treating it as measured performance.

Prerequisites: [D01 OS resources](../../01-computer-science-foundations/lessons/07-operating-systems-and-scheduling.md) and [D03 byte ownership](../../03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: communication is a sequence of contracts

A program sends bytes through an operating-system interface. The transport relates endpoints; the network forwards packets between interfaces; each local link carries its own frames. Encapsulation adds metadata for a different job at each boundary. An Ethernet frame, IP packet, TCP segment, TLS record and HTTP message are different units. One may contain only part of another, and reassembly does not preserve the sender's application writes.

Use a concrete request path: caller → local socket → host routing decision → next hop → destination listener → accepted connection → application parser. A successful step does not certify the next one. Resolving a name does not prove reachability; reaching a host does not prove a process listens on the port; accepting TCP does not prove HTTP or TLS is healthy. This layered reasoning is a debugging method, not a claim that real implementations fit neatly into seven isolated OSI boxes.

## Addressing, routing and service identity

IPv4 addresses are 32-bit values; IPv6 addresses are 128-bit values. A prefix denotes a set of addresses, not an application. Routers choose a next hop using forwarding information, typically preferring the longest matching prefix. The return path can differ from the outbound path. A default route is a fallback, not a guarantee that the destination or return path works.

A transport endpoint includes an address and port; TCP connections also depend on the peer and protocol. A server can accept many connections on one listening port because the connection tuples differ. A client's ephemeral port is a finite host resource. Binding a wildcard address requests listening on applicable local interfaces; it does not create authentication or configure firewalls. Binding IPv6 wildcard and expecting IPv4 acceptance depends on dual-stack host/API settings. Explicit loopback is appropriate for this lesson's disposable experiment.

`127.0.0.1` and `::1` identify the current network namespace's loopback paths. Inside an isolated container, localhost denotes that container's namespace, not automatically the developer's host or a neighboring service. Private addressing describes routing conventions, not trust. Network address translation can rewrite tuples and expire state; it does not authenticate the human or application behind an address. A reverse proxy can become the transport peer while representing a different original caller.

Names and addresses answer different questions. A URL authority identifies a requested origin; DNS proposes addresses; TLS checks a claimed service identity; HTTP authority helps route a request. Substituting an IP for a name can change SNI, certificate matching and virtual-host selection even when the IP is correct. Keep those values separate in TypeScript configuration types rather than using one ambiguous `host` string for all of them.

## Cost models before optimization

Latency is elapsed time for an event; bandwidth is a rate limit over an interval; throughput is the useful rate achieved. For a serial, store-free thought experiment, transferring B bytes over rate R bytes/second needs at least B/R seconds. Propagation, queuing, handshake round trips, processing and loss recovery add costs; pipelining can overlap some costs. A 10 MiB object over 10 Mbit/s needs about 8.39 seconds of serialization alone. Confusing bits and bytes yields an eightfold error before network behavior is considered.

The bandwidth-delay product approximates how many bytes must be in flight to fill a path: rate × round-trip time. It is a dimensional model, not a recommended socket buffer setting. TCP flow and congestion windows, application production, competing traffic and host limits may each constrain delivery. More connections can increase contention instead of capacity.

## Backend failure reasoning

An unavailable service can mean wrong namespace, wrong address family, missing route, listener mismatch, policy drop, overloaded accept path or application failure. A refusal suggests an active rejection at some point; silence can reflect dropping, routing failure or a stalled peer. Neither uniquely identifies the component responsible. Record the attempted address family, local and remote tuple, elapsed phase and error code before changing a timeout.

Counterexample: “Ping works, so the upload must work.” ICMP reachability, where permitted, neither tests the application's TCP port nor its body-size and authentication policy. Conversely, blocked ICMP does not prove a service unavailable. Diagnostic probes must target the contract under investigation.

## Worked path: separate the four endpoint questions

Suppose a client requests `https://api.example.test/report` through a terminating ingress. Follow these steps without collapsing their evidence:

| Step | Value or event | What remains unproved |
|---|---|---|
| Name resolution | A/AAAA candidates for the ingress | Reachability, listening process and identity |
| Connect | Client local tuple → ingress tuple | TLS identity and application readiness |
| TLS | Expected DNS identity, SNI and negotiated ALPN | Upstream protection and request authorization |
| HTTP routing | Authority and target select a service | Complete representation or business action |
| Upstream exchange | Ingress opens its own backend connection | End-to-end receipt at the original client |

A NAT can rewrite a tuple within one transport path; a terminating proxy creates a separate transport connection. This distinction matters when correlating logs: backend `remotePort` cannot identify the original client connection across termination. A listener backlog, established connection table and application work queue are also different resources. A connection can be established before the application accepts/handles it, so connect latency and handler-start latency need separate instrumentation.

For IPv6, a link-local address needs an interface/scope context; an address string copied from another host can be insufficient to select the intended link. Brackets in a URL authority delimit an IPv6 literal, not part of its numeric address. Avoid applying IPv4 assumptions about broadcast or textual prefix matching to IPv6.

### Calculate a bottleneck, then challenge the assumptions

At 100 Mbit/s and 80 ms RTT, the bandwidth-delay product is `100,000,000 / 8 × 0.080 = 1,000,000 bytes`. If only 64 KiB can be in flight, a simplified steady-state ceiling is `65,536 / 0.080 = 819,200 bytes/s`, before other costs. This does not diagnose which window is limiting or justify changing host buffers: application pauses, congestion and receiver limits can produce different ceilings. A 1 MiB read buffer cannot remove an 80 ms propagation delay.

**Advanced incident exercise:** a service connects quickly on the host and times out inside a container. Draw namespace, bind address, outbound and return paths; propose three competing causes and one observation per cause. Full credit requires distinguishing refusal from silence, listener scope from authorization, and a controlled connectivity check from proof of application health. A change to public binding without evidence does not satisfy the exercise.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-01.mjs`, then run `node lab-01.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import net from 'node:net';
import { once } from 'node:events';
assert.equal(net.isIP('127.0.0.1'), 4);
assert.equal(net.isIP('::1'), 6);
assert.equal(net.isIP('service.example'), 0);
assert.equal(net.isIP('999.1.1.1'), 0);
const server = net.createServer(socket => socket.end('ok'));
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const address = server.address();
assert.equal(address.address, '127.0.0.1');
assert.ok(address.port > 0);
try {
  const client = net.connect(address.port, '127.0.0.1');
  let text = '';
  for await (const chunk of client) text += chunk;
  assert.equal(text, 'ok');
} finally {
  await new Promise(resolve => server.close(resolve));
}
const bytes = 10 * 1024 * 1024;
assert.equal(bytes * 8 / 10_000_000, 8.388608);
console.log('address families, loopback exchange, serialization bound: ok');
```

The OS chooses a free port with port 0; assertions concern address family, successful bytes and a unit calculation. It does not inspect actual packets, NAT or routes. If binding fails, preserve the error and host policy instead of changing the example to expose a public listener.

## Hands-on exercises with expected results

1. Draw the path for a browser reaching a backend through a proxy. Label the peer tuple seen at each hop. Expected: the backend socket identifies the proxy; original-user identity requires additional trusted context.
2. Recalculate the lower bound for 20 MiB at 25 Mbit/s. Expected: 6.7108864 seconds of serialization, with no claim about wall-clock completion.
3. Explain a service that works on `127.0.0.1` but fails from another machine. Expected hypotheses include loopback-only binding, routing and policy; propose evidence that separates them. Do not expose a listener just to test a hypothesis.

## Self-assessment and answer rubric

- **Does a port identify one request?** Full credit: distinguish listener, connected tuple and application requests; multiple requests may share a connection.
- **Does a private IP prove trust?** Full credit: no; routing scope, peer identity and authorization are separate.
- **Why can a fast link have slow requests?** Full credit: identify at least two serial phases or bottlenecks and attach units to latency versus rate. A larger buffer alone is not an explanation.

## Reliable references and version notes

- [IPv6 specification, RFC 8200](https://www.rfc-editor.org/rfc/rfc8200.html), address and packet model.
- [Node v24 net API](https://nodejs.org/docs/latest-v24.x/api/net.html), `isIP`, `listen`, `address` and connection events.
- [IP forwarding requirements, RFC 1812 §5](https://www.rfc-editor.org/rfc/rfc1812.html#section-5), routing context; not an operational network configuration guide.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

Routing-protocol administration, BGP policy and subnet deployment labs are outside this backend domain. D04-P01 offers a direct path-diagnosis challenge; packet engineering remains supporting knowledge. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Next: Chapter 02](02-dns-and-service-discovery.md)
