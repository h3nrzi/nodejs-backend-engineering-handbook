# Chapter 09 — HTTP clients and connection pools

**Domain / competency:** D04 / D04-C09
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Explain client connection reuse and queueing; distinguish HTTP persistence, TCP keepalive and application heartbeat; diagnose stalled pools and release response resources correctly.

Prerequisites: Chapters [06](06-tls-identity-and-negotiation.md)–[08](08-http1-framing-and-server-lifetimes.md), D03 stream cleanup. Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: a client owns more than a request

A client operation can wait for admission, an available connection, name resolution, connect, TLS, response headers and body consumption. Reusing an existing connection skips some setup but does not remove queueing or response work. Measuring only time from socket assignment hides the pool queue and can make an overloaded caller look healthy.

A connection pool manages reusable transport state and pending work. A limit on active sockets does not necessarily bound pending request count. A bounded client needs a decision about admission, queue length and time spent waiting. Global and per-origin limits answer different questions; many origins can exceed a safe process total even when each origin is individually limited.

## Persistence, probes and ownership

HTTP persistence allows multiple exchanges over a connection. TCP keepalive probes test aspects of transport liveness over a configured interval. An application heartbeat proves only the application-level exchange it defines. None implies that a particular business request completed. A proxy's idle timeout can close a pooled connection even when both applications would otherwise retain it.

An idle pooled socket can become stale between eligibility checks and the next write. The resulting reset may occur before or after remote processing began. A client may retry only under a qualified request contract; “it was a reused socket” is not itself proof that no action occurred. Preserve reuse, phase and request replayability evidence.

Consuming or deliberately cancelling a response body is part of request ownership. Receiving status 200 and then abandoning the body can hold a connection or other resources. Blindly draining an unbounded hostile body is also unsafe. Decide bounded consumption, cancellation and whether the connection remains reusable. An intentional destroy can sacrifice reuse to terminate work promptly; that is a trade-off, not automatically a bug.

## Node APIs and version boundaries

`node:http` uses `http.Agent` for its connection-management model. The built-in `fetch` uses a different client implementation and is not configured by passing an `http.Agent` as though both APIs shared pool knobs. Do not mix instructions from unrelated clients. The lab chooses `http.Agent` with explicit keepAlive and maxSockets to make the observed scope clear.

An Agent can queue requests when its socket limits are reached. Explicitly destroy a lesson-owned agent when done. Client timeout events in the HTTP API require understanding the exact method; setting a timeout is not a universal abort that covers queue, lookup, connect and body. `AbortSignal` can convey a cancellation request in supported APIs, but server-side execution might already have happened. Chapter 17 separates observation deadlines from remote outcomes.

TypeScript wrappers should preserve ownership: a function returning an open response stream transfers a cleanup obligation to its caller. A function claiming to return a completed parsed value should validate bounds, consumption and parse failures before resolving. A Promise resolved at headers has a different contract from one resolved at body completion.

## Worked pool example and counterexample

The lab sends two sequential requests to one loopback origin through an owned single-socket agent, fully consuming each body. It observes one accepted connection. It also issues a complete 404 response to show that application status is not a transport failure. The experiment does not force race conditions or prove reuse across real load balancers.

Counterexample: resolve a wrapper as soon as the response callback fires and omit body consumption. Under repeated calls, available connections can disappear while the dashboard reports low header latency. Fixing only maxSockets raises resource consumption and masks the ownership defect. First establish response lifetime and bounded queueing, then evaluate capacity.

## Debugging checklist in context

When a dependency appears slow, measure admission/queue, setup, first response and body phases separately. Compare in-flight requests, pending queue, active/free connections and response bytes. A small active-socket count alongside a large pending queue suggests a different problem from thousands of connections stuck in connect. A fast header followed by a stalled body suggests yet another boundary. Avoid asserting that every delay is the remote application's CPU time.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-09.mjs`, then run `node lab-09.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
let connections = 0;
const server = http.createServer((req, res) => {
  res.writeHead(req.url === '/missing' ? 404 : 200); res.end('body');
});
server.on('connection', () => { connections++; });
server.listen(0, '127.0.0.1'); await once(server, 'listening');
const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: '127.0.0.1', port: server.address().port,
      agent, path }, res => {
      let body = '';
      res.on('data', chunk => { body += chunk; }); res.on('error', reject);
      res.on('end', () => resolve({ status: res.statusCode, body, complete: res.complete }));
    }); req.on('error', reject);
  });
}
try {
  assert.deepEqual(await request('/'), { status: 200, body: 'body', complete: true });
  assert.deepEqual(await request('/missing'), { status: 404, body: 'body', complete: true });
  assert.equal(connections, 1);
} finally {
  agent.destroy(); await new Promise(resolve => server.close(resolve));
}
console.log('two consumed responses, one reused connection, complete 404: ok');
```

One local run can show reuse for these sequential calls; it cannot guarantee connection survival or pool fairness elsewhere. The tiny known response bounds the fixture. Production callers must enforce their own input and queue limits.

## Hands-on exercises with expected results

1. Design a phase report that includes time before socket assignment. Expected: queue wait remains visible, and total elapsed includes consumption.
2. Explain what to do with an unexpected 200 MiB error body when the caller allows only 64 KiB. Expected: stop/cancel under the chosen API contract, report the bound, and make no promise of connection reuse.
3. Compare configuration ownership for `http.Agent` and built-in fetch. Expected: distinct client stacks; do not claim the lab tests fetch pooling.

## Self-assessment and answer rubric

- **Does maxSockets bound pending work?** Full credit: no; admission/queue bounds remain necessary.
- **Why consume a body after headers?** Full credit: completion and resource release are part of the caller's ownership contract.
- **Is keepalive a business heartbeat?** Full credit: distinguish HTTP reuse, TCP probes and application liveness.

## Reliable references and version notes

- [Node v24 HTTP Agent](https://nodejs.org/docs/latest-v24.x/api/http.html#class-httpagent), queue, reuse and destruction.
- [Node v24 globals: fetch](https://nodejs.org/docs/latest-v24.x/api/globals.html#fetch), separate implementation boundary.
- [TCP user timeout, RFC 5482](https://www.rfc-editor.org/rfc/rfc5482.html), transport timeout context; not a claim of Node option support.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P03 directly challenges slow/interrupted transfers; pooling is supporting engineering knowledge. No fetch pool, remote proxy idle race, fairness or production capacity is tested. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 08](08-http1-framing-and-server-lifetimes.md) · [Next: Chapter 10](10-caching-validation-and-ranges.md)
