# Chapter 14 — WebSocket sessions and control

**Domain / competency:** D04 / D04-C14
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Distinguish WebSocket handshake, frames, messages and application sessions; explain control traffic and bounded output; reason about reconnect gaps and acknowledgment without promising automatic recovery.

Prerequisites: Chapters [04](04-framing-and-incremental-parsers.md), [06](06-tls-identity-and-negotiation.md), [08](08-http1-framing-and-server-lifetimes.md) and [11](11-proxies-routing-and-trust-boundaries.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: a persistent channel still needs a contract

WebSocket supplies a bidirectional message channel after a successful protocol opening. Its common HTTP/1.1 handshake uses an upgrade exchange. Successful TCP or an HTTP 200 is not equivalent to a WebSocket opening. The server validates the opening fields and returns the protocol's expected response. Secure WebSocket uses TLS for the relevant hop; intermediary termination still creates separate trust boundaries.

The accept calculation in the actual upgrade fixture transforms a client key and fixed protocol identifier using SHA-1 then base64. Its role is handshake confirmation, not password hashing or proof of user authorization. The input key is not a secret credential. Other WebSocket bootstrapping mechanisms over newer HTTP versions need explicit endpoint support; do not assume HTTP/1.1 Upgrade fields can be copied onto h2.

## Frames versus messages

A WebSocket message can span multiple frames using fragmentation. Control frames can be interleaved during a fragmented message, so a parser that waits for a whole large message before handling ping or close is incorrect. Control frames are limited to 125 payload bytes and must not be fragmented; a close payload, when nonempty, includes a two-byte status code before any UTF-8 reason. A short control exchange does not relax limits on a fragmented application message. Text messages must satisfy UTF-8 rules across their reconstructed payload, while binary messages need an application format.

Client-to-server masking is a framing requirement, not encryption. A known mask key and payload are both on the wire; the lab reverses masking to make this explicit. TLS is the confidentiality mechanism when selected. Server-side implementations must validate required masking direction and other framing rules; a five-line XOR example is not a protocol server.

A peer can send many tiny messages or a few huge fragmented messages. Bound frame/message sizes, accumulated fragments, message rates, queued work and queued output. Backpressure support varies by API. The browser's classic WebSocket API is not an awaited Writable stream; sending faster than the network can consume needs explicit queue accounting and policy.

## Control, liveness and closure

Ping/pong can test protocol responsiveness, while an application heartbeat may establish a more specific processing checkpoint. Receiving a pong does not prove every queued business message was handled. The browser API does not expose all wire control-frame operations as ordinary application methods, so server API examples must not be copied into browser code unquestioningly.

The close exchange has its own states; abrupt transport loss may prevent a clean close handshake. A close code helps categorize an observed closure, not certify delivery of prior application messages. Closing locally and observing no error cannot establish that the other application committed the last update.

## Application sessions and reconnect

A newly opened connection is not automatically the continuation of the old session. Define identity, subscription state, acknowledged position and gap handling at the application layer. Reconnect can duplicate a command whose response was lost, miss events emitted during downtime or receive an old message late. Sequence references need scope and retention; a connection-local counter alone does not survive process or session restart.

Replay and acknowledgment policies are consequential product decisions for a later repository. The educational goal is to represent unknown outcomes and gaps honestly, not to require a durable broker or a particular storage design. D03 LiveRoom and D02 SubscriptionHub remain unchanged; the proposed D04 portfolio focuses on network interruption evidence rather than duplicating those products.

## Backend failure analysis and counterexamples

Counterexample: “The connection is open, so every subscriber is current.” A connected slow subscriber can lag indefinitely while output queues grow. Another error is validating Origin as if it authenticated a non-browser caller. Origin checks help enforce browser exposure policy; arbitrary clients can supply a field. User authentication and authorization remain necessary under the product policy.

When a session drops at a fixed interval, compare ingress idle limits, heartbeat traffic, server processing and event-loop delay. When memory rises, inspect outgoing backlog and application retention rather than assuming persistent connections are cheap. A successful handshake does not test message limits, compression expansion or reconnect correctness.

## Opening, interleaved control and close on actual sockets

The new fixture uses Node's global WebSocket client with an owned HTTP/1.1 upgrade peer. A normal HTTP request gets 426 and does not become a WebSocket connection. For the positive opening, the peer checks version/key shape and sends 101 with the correct accept value. It then sends a non-final text frame containing `hel`, a ping carrying `p`, and a final continuation containing `lo`. The client emits one `hello` message and returns a masked pong; control progress does not wait for application-message fragmentation to end.

After both observations, the client starts close with code 1000 and reason `done`. The fixture validates and echoes the close payload, then ends TCP; the client reports a clean close. A close code/reason is still no acknowledgment of a business action. The fixture parser deliberately accepts only short masked client control frames, caps total client bytes and owns all upgraded sockets. It is a constrained peer for testing a real implementation, not a reusable or conformant WebSocket server. A production library must also handle extended lengths, invalid UTF-8, RSV/extension negotiation, fragmented messages and adversarial lifetimes.

### Control and compression failure boundaries

A close payload of length one is invalid: the optional status needs two bytes. Codes 1005, 1006 and 1015 are reserved for reporting and must not be transmitted as status codes. A dropped TCP connection may produce an abnormal-close observation without any close frame on the wire. Never send 1006 as a proposed “network failure response.”

Mask keys must be freshly and unpredictably chosen for client frames; reversible masking is not secrecy. Text validity is evaluated across the reassembled message, so a split multibyte character cannot be validated independently per fragment. A negotiated compression extension changes RSV interpretation and carries memory/expansion risks; it is absent from this fixture and must not be assumed merely because the connection opened. [RFC 6455 §§5–7](https://www.rfc-editor.org/rfc/rfc6455.html#section-5) governs these frame/closure distinctions.

**Advanced exercise:** trace `text(fragment 1) → ping → continuation → close` with a disconnect after a client command but before its application acknowledgment. Full credit separates frame control responsiveness, message reassembly, clean-close reporting and unknown command outcome; defines bounded slow-consumer output; and explains why reconnect alone restores neither authentication context nor missed state. Browser Origin/cookie policy, TLS, permessage-deflate, malformed-frame refusal and h2 extended CONNECT remain untested.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-14.mjs`, then run `node lab-14.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const accept = key => createHash('sha1').update(key + guid).digest('base64');
assert.equal(accept('dGhlIHNhbXBsZSBub25jZQ=='), 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
let sawPong; const pong = new Promise(resolve => { sawPong = resolve; });
const sockets = new Set();
const server = http.createServer((req, res) => { res.writeHead(426); res.end(); });
server.on('upgrade', (req, socket, head) => {
  sockets.add(socket); socket.on('close', () => sockets.delete(socket));
  socket.on('error', () => {});
  assert.equal(req.headers.upgrade.toLowerCase(), 'websocket');
  assert.equal(req.headers['sec-websocket-version'], '13');
  assert.equal(Buffer.from(req.headers['sec-websocket-key'], 'base64').length, 16);
  socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\n' +
    'Connection: Upgrade\r\nSec-WebSocket-Accept: ' + accept(req.headers['sec-websocket-key']) + '\r\n\r\n');
  // Restricted fixture: fragmented text with a ping between fragments.
  socket.write(Buffer.from([0x01, 3, 104, 101, 108, 0x89, 1, 112, 0x80, 2, 108, 111]));
  let rest = Buffer.alloc(0), total = 0;
  function receive(chunk) {
    total += chunk.length; assert.ok(total <= 1024);
    rest = Buffer.concat([rest, chunk]);
    while (rest.length >= 2) {
      const opcode = rest[0] & 15, n = rest[1] & 127;
      assert.equal(rest[0] & 0xf0, 0x80); assert.ok(rest[1] & 0x80); assert.ok(n < 126);
      if (rest.length < 6 + n) return;
      const mask = rest.subarray(2, 6);
      const payload = Buffer.from(rest.subarray(6, 6 + n).map((b, i) => b ^ mask[i % 4]));
      rest = rest.subarray(6 + n);
      if (opcode === 10) { assert.equal(payload.toString(), 'p'); sawPong(); }
      else {
        assert.equal(opcode, 8); assert.equal(payload.readUInt16BE(0), 1000);
        socket.end(Buffer.concat([Buffer.from([0x88, n]), payload]));
      }
    }
  }
  socket.on('data', receive); receive(head);
});
server.listen(0, '127.0.0.1'); await once(server, 'listening');
let ws;
try {
  const status = await new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: server.address().port, agent: false }, res => {
      res.resume(); res.on('end', () => resolve(res.statusCode));
    }).on('error', reject);
  }); assert.equal(status, 426);
  ws = new WebSocket(`ws://127.0.0.1:${server.address().port}`);
  const opened = once(ws, 'open'), message = once(ws, 'message'), closed = once(ws, 'close');
  await opened; assert.equal((await message)[0].data, 'hello'); await pong;
  ws.close(1000, 'done');
  const [event] = await closed; assert.equal(event.code, 1000); assert.equal(event.wasClean, true);
} finally {
  ws?.close(); for (const socket of sockets) socket.destroy();
  await new Promise(resolve => server.close(resolve));
}
console.log('actual 101; fragmented text + ping/masked pong; clean 1000 close; ordinary HTTP 426: ok');
```

A real Node WebSocket client opens against a restricted loopback upgrade peer, reassembles fragmented text, automatically responds to ping with masked pong and completes a clean close exchange. The peer implements only the required short-control subset and is not a general WebSocket server. No browser, reconnect, TLS or compression behavior is tested.

## Hands-on exercises with expected results

1. Draw a fragmented text message with a ping between fragments. Expected: control handling can progress before the full application message completes.
2. Design a bounded outbound queue for a slow consumer. Expected: explicit byte/work limits and an observable overflow/closure outcome, without assuming a chosen library API.
3. Trace a command sent before disconnect and retried after reconnect. Expected: acknowledge possible duplicate execution and identify the product policy/evidence needed later.

## Self-assessment and answer rubric

- **Does masking encrypt messages?** Full credit: no; reversible XOR with an exposed key is not confidentiality.
- **Does a pong prove an action committed?** Full credit: only its defined protocol responsiveness, not business completion.
- **Does reconnect restore missed events?** Full credit: only if the application supplies a qualified replay/resumption contract.

## Reliable references and version notes

- [WebSocket, RFC 6455](https://www.rfc-editor.org/rfc/rfc6455.html), opening, frames and control.
- [WebSocket over HTTP/2, RFC 8441](https://www.rfc-editor.org/rfc/rfc8441.html), distinct bootstrapping.
- [WHATWG WebSockets](https://websockets.spec.whatwg.org/), browser API and send buffering.
- [Node v24 WebSocket client](https://nodejs.org/docs/latest-v24.x/api/globals.html#class-websocket), API used by the actual fixture; this is not a server API.
- [Node v24 crypto](https://nodejs.org/docs/latest-v24.x/api/crypto.html), hash API used only for the protocol vector.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P06 directly challenges interrupted interactive sessions; WebSocket is optional, not prescribed. An actual opening, ordinary-HTTP 426, control exchange and clean close are exercised; malformed-handshake/frame refusal, browser behavior, compression, abrupt-loss recovery and resume interoperability remain unexecuted. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 13](13-quic-and-http3-trade-offs.md) · [Next: Chapter 15](15-server-sent-events-and-resumption.md)
