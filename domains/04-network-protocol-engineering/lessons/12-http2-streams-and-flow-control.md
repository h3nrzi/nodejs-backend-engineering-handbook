# Chapter 12 — HTTP/2 streams and flow control

**Domain / competency:** D04 / D04-C12
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Distinguish HTTP/2 streams from the shared transport connection; explain flow-control stalls, reset scope and graceful session closure; recognize connection-wide head-of-line effects despite multiplexing.

Prerequisites: Chapters [06](06-tls-identity-and-negotiation.md), [08](08-http1-framing-and-server-lifetimes.md) and [09](09-http-clients-and-connection-pools.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: multiplexing changes message transport

HTTP/2 encodes messages using binary frames on numbered streams. Multiple streams can progress on one session; headers use a protocol-specific representation including pseudo-fields such as :method and :path. The HTTP semantics remain, while HTTP/1.1 start lines and chunked transfer coding are not simply sent inside h2.

A DATA frame is neither necessarily one application message nor one TCP segment. A stream can contain many DATA frames, and a body parser still needs its own record boundaries. A stream identifier provides protocol routing inside a session, not durable business identity or a substitute for an application request reference.

## Flow control and shared resources

HTTP/2 applies flow control to DATA at both stream and connection levels. A stream can stall because its own window is exhausted or because the connection window is exhausted by aggregate work. Consuming data and issuing window updates permit progress under the protocol. Header frames are not governed by DATA flow control, so metadata limits and stream admission remain necessary.

Multiplexing removes HTTP/1.1's requirement to deliver complete responses in request order on one connection. However, ordinary h2 runs over TCP: loss of a TCP segment can delay delivery of later bytes needed by other streams. Independent HTTP streams therefore do not eliminate transport-level head-of-line blocking. They also share congestion state, session buffers and peer limits.

HPACK compresses headers using static and dynamic tables. Compression state is session-scoped, and decoding remains a separate resource concern from encoded bytes. Large expanded headers, excessive stream creation and rapid reset activity can consume work even if response bodies are small. Current security maintenance and admission controls matter; this lesson does not certify a hardened HTTP/2 service.

## Lifetime, reset and GOAWAY

A stream reset ends one stream under its error semantics. A connection failure can affect every active stream. Neither automatically proves that an application action did not occur. GOAWAY communicates session shutdown information, including a boundary used to reason about which streams might have been processed; application retry safety still needs request semantics and evidence. Draining active streams differs from destroying the session immediately.

The peer advertises settings such as concurrent-stream limits. Treat these as protocol constraints rather than a guaranteed throughput target. A caller also needs its own queue, byte and time limits. Priority mechanisms and implementation support evolve; do not assume a browser or server obeys a remembered priority tree or that setting a priority guarantees latency.

## Node mechanisms and the bounded example

`node:http2` exposes session and stream APIs; it is not merely `node:http` with a different version string. The lab uses the direct stream API and a cleartext loopback session so no certificate fixture is necessary. Real browser h2 commonly negotiates through TLS ALPN; this lab does not prove browser compatibility or encrypted h2 deployment.

Two streams are opened before either is awaited to demonstrate independently addressable exchanges within one session. The lab asserts stream-specific response content and one accepted session. It does not assert response order or a particular frame schedule. Resource ownership closes the client session before closing the server.

## Failure reasoning and counterexamples

Counterexample: “h2 lets us send unlimited requests on one socket.” Each active stream consumes memory and work, and shared connection flow control can amplify one slow consumer. A pool limit of one session is not an application concurrency bound. Another mistake is passing HTTP/1.1 connection-specific fields into h2 and treating resulting protocol errors as random network failures.

When downloads stall, inspect stream state, pending bytes, consumed bodies, remote settings and connection health. If all streams stop together after loss, transport ordering is a plausible cause; if one stream alone stops, its application/flow state is another hypothesis. Without window or packet evidence, label these hypotheses rather than conclusions.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-12.mjs`, then run `node lab-12.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http2 from 'node:http2';
import { once } from 'node:events';
let sessions = 0;
const server = http2.createServer();
server.on('session', () => { sessions++; });
server.on('stream', (stream, headers) => {
  stream.on('error', () => {});
  stream.respond({ ':status': 200 }); stream.end(`path:${headers[':path']}`);
});
server.listen(0, '127.0.0.1'); await once(server, 'listening');
const client = http2.connect(`http://127.0.0.1:${server.address().port}`);
await once(client, 'connect');
function request(path) {
  return new Promise((resolve, reject) => {
    const stream = client.request({ ':path': path });
    let body = ''; stream.setEncoding('utf8');
    stream.on('data', c => { body += c; }); stream.on('error', reject);
    stream.on('end', () => resolve(body)); stream.end();
  });
}
try {
  const a = request('/a'), b = request('/b');
  assert.deepEqual(await Promise.all([a, b]), ['path:/a', 'path:/b']);
  assert.equal(sessions, 1);
} finally {
  const closed = once(client, 'close'); client.close(); await closed;
  await new Promise(resolve => server.close(resolve));
}
console.log('two independent responses on one cleartext h2 session: ok');
```

This is actual local HTTP/2, with no TLS, packet impairment, window exhaustion or GOAWAY replay test. Assertions avoid scheduling and performance guarantees. A failed process is terminated by the runner deadline.

## Hands-on exercises with expected results

1. Draw a blocked stream-window case and a blocked connection-window case. Expected: identify which unrelated streams can still progress and what evidence is needed.
2. Explain a TCP loss event affecting several h2 streams. Expected: stream multiplexing does not bypass TCP byte ordering.
3. Review a proposed retry after stream reset. Expected: examine request semantics, transmitted state and outcome uncertainty; reset alone is insufficient.

## Self-assessment and answer rubric

- **Does one session mean one request at a time?** Full credit: no; multiple streams share it under limits.
- **Does multiplexing remove every head-of-line effect?** Full credit: HTTP response-order blocking changes, TCP ordering remains.
- **Why is max concurrent streams not a memory budget?** Full credit: stream bytes, headers, pending queue and application work vary independently.

## Reliable references and version notes

- [HTTP/2, RFC 9113](https://www.rfc-editor.org/rfc/rfc9113.html), stream/session protocol.
- [HPACK, RFC 7541](https://www.rfc-editor.org/rfc/rfc7541.html), header compression state.
- [Node v24 HTTP/2](https://nodejs.org/docs/latest-v24.x/api/http2.html), direct stream/session APIs and cleanup.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P04 directly challenges negotiated-protocol compatibility; h2 flow-control internals are supporting knowledge. TLS ALPN interoperability, flow-window fault injection and real-loss behavior remain unverified. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 11](11-proxies-routing-and-trust-boundaries.md) · [Next: Chapter 13](13-quic-and-http3-trade-offs.md)
