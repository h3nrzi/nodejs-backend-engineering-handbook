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

A zero-credit body stream and header-only response demonstrate different progress on one session. The lab increases stream credit, observes body completion and resets another stream. It records one accepted session without claiming a particular frame schedule; owned sessions are closed/destroyed before server closure.

## Failure reasoning and counterexamples

Counterexample: “h2 lets us send unlimited requests on one socket.” Each active stream consumes memory and work, and shared connection flow control can amplify one slow consumer. A pool limit of one session is not an application concurrency bound. Another mistake is passing HTTP/1.1 connection-specific fields into h2 and treating resulting protocol errors as random network failures.

When downloads stall, inspect stream state, pending bytes, consumed bodies, remote settings and connection health. If all streams stop together after loss, transport ordering is a plausible cause; if one stream alone stops, its application/flow state is another hypothesis. Without window or packet evidence, label these hypotheses rather than conclusions.

## Flow-control arithmetic and the window experiment

If stream A has 4096 bytes of send credit but the connection has 1024, at most 1024 additional DATA payload bytes can be sent before more credit is needed. If stream A instead has zero credit while stream B and the connection have credit, B can continue. DATA flow control counts its defined flow-controlled payload, including padding; frame headers are outside it. WINDOW_UPDATE increases credit for its stream or the connection, while SETTINGS_INITIAL_WINDOW_SIZE changes stream windows, not the connection window. A settings reduction can make an existing stream's window negative; the sender waits for sufficient credit rather than treating it as an unsigned wraparound.

The revised cleartext h2 fixture advertises an initial stream receive window of zero. The server responds on a body-bearing stream, while a header-only response completes on another stream. The client has received headers but no DATA on the first stream. Raising the advertised initial stream window to 1024 then permits its three-byte body to arrive. This demonstrates an actual protocol credit gate without a sleep-based “probably stalled” inference. It does not test connection-window exhaustion, TCP loss or Node's entire buffering strategy; the server can queue bytes locally even while wire DATA is blocked.

### Reset and shutdown need different retry evidence

The fixture resets a separate open stream with CANCEL and observes the server's matching reset code while the session remains shared. A reset scopes protocol termination to that stream; it does not cancel every application resource started by its handler. Owners still stop producers and observe work errors. Graceful session `close()` stops creating new streams and permits existing streams to finish; `destroy()` terminates them. Server close alone does not gracefully end every existing session.

GOAWAY's last-stream identifier describes the highest peer-initiated stream that might have been processed. Streams above the applicable boundary were not processed under that connection's protocol contract; streams at or below it remain potentially processed, not automatically successful. An explicit REFUSED_STREAM carries a different unprocessed signal from a generic CANCEL. Automatic replay still requires reconstructible content, deadline budget and trusted protocol evidence; a generic transport loss supplies no such assurance. See [RFC 9113 §§5.1, 5.2 and 6.8](https://www.rfc-editor.org/rfc/rfc9113.html#section-6.8).

**Advanced exercise:** draw a session with A credit zero, B credit 2048 and connection credit 512. Predict allowable DATA and whether HEADERS can progress. Then distinguish GOAWAY boundary, CANCEL and a broken TCP socket for retry evidence. Full credit identifies shared resources and avoids treating `write(false)` as an HTTP/2 window measurement. GOAWAY replay, TLS ALPN h2 and connection-window fault tests remain unrun.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-12.mjs`, then run `node lab-12.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http2 from 'node:http2';
import { once } from 'node:events';
let sessions = 0, resolveReset;
const resetSeen = new Promise(resolve => { resolveReset = resolve; });
const owned = new Set();
const server = http2.createServer();
server.on('session', session => {
  sessions++; owned.add(session); session.on('error', () => {});
  session.on('close', () => owned.delete(session));
});
server.on('stream', (stream, headers) => {
  stream.on('error', () => {}); stream.respond({ ':status': 200 });
  if (headers[':path'] === '/cancel') {
    stream.on('close', () => resolveReset(stream.rstCode));
  } else stream.end(headers[':path'] === '/empty' ? undefined : 'abc');
});
server.listen(0, '127.0.0.1'); await once(server, 'listening');
const client = http2.connect(`http://127.0.0.1:${server.address().port}`,
  { settings: { initialWindowSize: 0 } });
client.on('error', () => {});
try {
  await once(client, 'connect');
  const slow = client.request({ ':path': '/slow' });
  let body = ''; slow.on('data', c => { body += c; });
  const headers = once(slow, 'response'), done = once(slow, 'end'); slow.end();
  const empty = client.request({ ':path': '/empty' });
  const emptyDone = once(empty, 'end'); empty.resume(); empty.end();
  await headers; await emptyDone;
  assert.equal(body, ''); // Zero stream receive credit prevents DATA, not HEADERS.
  await new Promise((resolve, reject) => client.settings({ initialWindowSize: 1024 },
    error => error ? reject(error) : resolve()));
  await done; assert.equal(body, 'abc');
  const cancel = client.request({ ':path': '/cancel' });
  const response = once(cancel, 'response'); cancel.end(); await response;
  const closed = once(cancel, 'close'); cancel.close(http2.constants.NGHTTP2_CANCEL);
  await closed; assert.equal(await resetSeen, http2.constants.NGHTTP2_CANCEL);
  assert.equal(sessions, 1);
  const clientClosed = once(client, 'close'); client.close(); await clientClosed;
} finally {
  client.destroy(); for (const session of owned) session.destroy();
  await new Promise(resolve => server.close(resolve));
}
console.log('h2 zero stream window blocks DATA; HEADERS progress; window update releases; reset isolated: ok');
```

This is actual local HTTP/2 with a stream receive-credit gate and cancellation reset. TLS, packet impairment, connection-window exhaustion and GOAWAY replay remain untested. Assertions avoid scheduling and performance guarantees. A failed process is terminated by the runner deadline.

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

D04-P04 directly challenges negotiated-protocol compatibility; h2 flow-control internals are supporting knowledge. TLS ALPN h2 interoperability, connection-window exhaustion, GOAWAY replay and real-loss behavior remain unverified. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 11](11-proxies-routing-and-trust-boundaries.md) · [Next: Chapter 13](13-quic-and-http3-trade-offs.md)
