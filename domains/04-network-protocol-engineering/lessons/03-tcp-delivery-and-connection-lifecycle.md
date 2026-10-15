# Chapter 03 — TCP delivery and connection lifecycle

**Domain / competency:** D04 / D04-C03
**Editorial status:** approved_by_learner — Product Owner editorial approval recorded 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Distinguish ordered byte delivery from message or business acknowledgment; trace TCP setup, half-close, reset and resource retention; diagnose flow-control pressure separately from congestion and application delay.

Prerequisites: Chapters [01](01-network-paths-and-addressing.md)–[02](02-dns-and-service-discovery.md), [D03 streams](../../03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: reliable transport still has boundaries

TCP presents an ordered byte stream between endpoints. Sequence numbers identify positions in that stream; acknowledgments and retransmission repair loss. This contract neither preserves individual application writes nor reports that a business action committed. A peer kernel can acknowledge data before its application reads it. A local write callback is weaker still: it concerns local write progress.

Connection establishment normally exchanges SYN, SYN-ACK and ACK. It establishes transport state, not application identity. TLS and application negotiation follow when used. The peer may accept TCP but never send valid protocol bytes. The application therefore needs a state model beyond “connected.”

## Flow, congestion and latency mechanisms

Receiver flow control limits outstanding data according to the advertised receive window. Congestion control adjusts sending to network conditions; it protects the path rather than a particular application's memory. The sender is constrained by both, plus application and host capacity. A slow consumer can fill receiving buffers, shrink the available window and eventually stall a sender even on a loss-free network.

Node's `socket.write()` return value exposes local buffering pressure. False does not mean “not accepted”: retrying the same bytes after drain duplicates data. Stop producing new bytes until progress or terminal failure. Observe error and close while waiting, because a failed socket may never drain. A high-water threshold is not a global memory limit; application queues and kernel buffers sit outside that one counter.

Nagle's algorithm can combine small writes while acknowledgments are outstanding; delayed acknowledgments can affect short exchanges. `setNoDelay()` changes one behavior, not propagation, congestion or application scheduling. Benchmark the relevant workload before tuning. The lab avoids claiming anything about packet counts from writes.

## Connection lifecycle and ownership

`end()` finishes the writable direction after pending output; receiving an EOF means the peer finished its sending direction. TCP supports half-close: one direction can remain useful after the other ends. Node's `allowHalfOpen` controls automatic handling when the readable side ends. A request protocol can deliberately use EOF as a delimiter, though that sacrifices convenient reuse and needs a clear truncation rule.

A reset terminates transport abruptly. A graceful FIN sequence and an application-level success are different events. If the server changed state but its reply is lost, the client cannot infer rollback. TIME_WAIT preserves transport safety around old segments after active closure; large connection churn consumes finite tuple and host resources. Do not recommend disabling safety controls as a generic fix for exhaustion.

`socket.setTimeout()` concerns inactivity. A timeout event alone does not close a raw `net.Socket`; the owner must end or destroy it. A continuously trickling peer can evade an idle timeout, so a total operation deadline is a different requirement. Timers are subject to event-loop scheduling, not hard real-time enforcement. Chapter 17 develops end-to-end budgets.

## Worked failure analysis

Consider a producer writing frames faster than a peer reads. Initially local writes succeed. Later write returns false. Continuing to enqueue can grow memory; waiting forever only for drain can hang when the peer disappears. Correct reasoning follows producer admission, local queue, kernel progress, remote receive and protocol acknowledgment as separate states.

Counterexample: “The server emitted finish, so the customer received the receipt.” Finish refers to the writable side's local completion. A client can disconnect after the action occurred and before reading the receipt. To describe user-visible truth, preserve an unknown-outcome state rather than declaring failure and repeating the action.

When diagnosing resets, correlate phase, reused/new socket, peer shutdown and message completion. ECONNRESET alone cannot tell which business operation ran. Distinguish a clean end with an incomplete application frame from a cleanly completed protocol exchange. D03's resource-lifetime reasoning applies; D04 adds transport and message boundaries.

## A directional TCP state trace

Each direction has its own byte sequence and EOF. In the half-close fixture, the client submits `abc`, then `end()` requests FIN after pending bytes. The server receives the bytes before readable EOF, parses its EOF-delimited request and remains able to send `received:abc` because `allowHalfOpen:true` preserves its writable side. Its later `end()` completes the reverse direction. Neither FIN acknowledges business success.

| Event | Local meaning | Invalid inference |
|---|---|---|
| `write` returns false | Bytes admitted; local pressure threshold reached | Resubmit the same bytes |
| Write callback | Local write handling completed or failed | Peer application consumed or committed |
| `end` event | Peer finished sending its direction | Every application frame was complete |
| `finish` event | Local writable stream finished output handling | Remote receipt is durable |
| `close` event | Local socket resource closed | Remote work was rolled back |
| Explicit RST | Abrupt TCP termination | The peer never saw earlier bytes |

TCP retransmits stream data rather than exposing duplicate application bytes for ordinary segment retransmission. Application retries above TCP can still duplicate an operation. ACK numbers are cumulative next-byte expectations; selective acknowledgments can describe additional received regions, but neither acknowledges an HTTP request or database transaction. A FIN also consumes sequence space; connection shutdown is part of the transport state machine, not an empty application record.

### Close states and pressure incidents

CLOSE_WAIT means the local endpoint received peer FIN while its sending direction remains open. Accumulation can indicate application ownership failing to finish/close sockets, although deliberate half-open work can be legitimate. TIME_WAIT commonly belongs to the active closer and protects against delayed segments/tuple reuse; simultaneous closure is an additional case. Counts alone do not identify a leak without traffic rate, ages and expected lifetime.

`destroy()` ends local I/O; it is not a portable promise of a particular packet-level reset sequence. The lab uses `resetAndDestroy()` specifically to request RST and checks the observed `ECONNRESET` on this host. It does not infer packet timing or business state from that error. The idle case waits for a timeout notification and verifies the socket is still open before its owner destroys it; 20 ms is a trigger setting, never a latency assertion.

**Advanced exercise:** a producer pauses after write(false), then the peer closes without drain. Give transitions for `producing → pressured → terminal`, including listener removal and no duplicate write. Full credit includes a total budget, cleanup on error/close, and a distinction between accepted local bytes and complete peer frames. Explain why a persistent CLOSE_WAIT population and a high TIME_WAIT turnover suggest different investigations. [RFC 9293 §3.6](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.6) supplies the transport close model.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-03.mjs`, then run `node lab-03.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import net from 'node:net';
import { once } from 'node:events';
let sawEnd = false;
const server = net.createServer({ allowHalfOpen: true }, socket => {
  socket.on('error', () => {});
  let input = '';
  socket.on('data', chunk => { input += chunk; });
  socket.on('end', () => {
    sawEnd = true;
    socket.end(`received:${input}`);
  });
});
server.listen(0, '127.0.0.1');
await once(server, 'listening');
try {
  const client = net.connect(server.address().port, '127.0.0.1');
  const connected = once(client, 'connect');
  await connected;
  client.end('abc');
  let reply = '';
  for await (const chunk of client) reply += chunk;
  assert.equal(reply, 'received:abc');
  assert.equal(sawEnd, true);
} finally {
  await new Promise(resolve => server.close(resolve));
}

const resetServer = net.createServer(socket => {
  socket.on('error', () => {});
  socket.once('data', () => socket.resetAndDestroy());
});
resetServer.listen(0, '127.0.0.1'); await once(resetServer, 'listening');
let resetClient;
try {
  resetClient = net.connect(resetServer.address().port, '127.0.0.1');
  const failure = new Promise(resolve => resetClient.once('error', resolve));
  const closed = new Promise(resolve => resetClient.once('close', resolve));
  await once(resetClient, 'connect'); resetClient.write('trigger');
  assert.equal((await failure).code, 'ECONNRESET'); await closed;
} finally {
  resetClient?.destroy();
  await new Promise(resolve => resetServer.close(resolve));
}
const idleServer = net.createServer(socket => { socket.on('error', () => {}); });
idleServer.listen(0, '127.0.0.1'); await once(idleServer, 'listening');
const idleClient = net.connect(idleServer.address().port, '127.0.0.1');
try {
  await once(idleClient, 'connect');
  const timedOut = once(idleClient, 'timeout'); idleClient.setTimeout(20);
  await timedOut;
  assert.equal(idleClient.destroyed, false); // Notification did not terminate I/O.
} finally {
  const closed = once(idleClient, 'close'); idleClient.destroy(); await closed;
  await new Promise(resolve => idleServer.close(resolve));
}
console.log('half-close reply; explicit RST -> ECONNRESET; idle timeout needs destroy: ok');
```

The first fixture waits for client EOF and still sends a reply. Separate local fixtures request RST and observe ECONNRESET, then show that raw-socket inactivity timeout requires explicit destruction. It does not test real packet loss, retransmission, Nagle effects, drain pressure or TIME_WAIT exhaustion. Resource cleanup is local and bounded by the runner process timeout.

## Hands-on exercises with expected results

1. Change the mental protocol to keep connections open. Expected: explain why EOF can no longer delimit each request; Chapter 04 supplies explicit framing.
2. Draw a lost-reply timeline with the action occurring before disconnect. Expected: local timeout cannot establish whether the action committed.
3. Design a producer state machine for write(false), drain, error and close. Expected: no duplicate submission, no infinite wait on drain after terminal closure, bounded queued work.

## Self-assessment and answer rubric

- **What does TCP ACK certify?** Full credit: received transport bytes, not a durable business action.
- **Flow control versus congestion control?** Full credit: receiver capacity versus network conditions; both can constrain flight.
- **Why is idle timeout insufficient?** Full credit: periodic progress can keep it alive indefinitely; a total deadline has different semantics.
- **Can EOF be valid and still represent failure?** Full credit: yes, if the application frame or declared message is incomplete.

## Reliable references and version notes

- [TCP, RFC 9293 §§3.5–3.8](https://www.rfc-editor.org/rfc/rfc9293.html), lifecycle and stream contract.
- [TCP congestion control, RFC 5681](https://www.rfc-editor.org/rfc/rfc5681.html), window and loss-response context.
- [Node v24 net](https://nodejs.org/docs/latest-v24.x/api/net.html), `allowHalfOpen`, `end`, `setTimeout`, `write`, `destroy`.
- [Node v24 streams](https://nodejs.org/docs/latest-v24.x/api/stream.html), pressure and terminal events.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

No kernel tuning or production transport benchmark is provided. D04-P03 offers direct partial-transfer and acknowledgment challenges; transport tuning is supporting knowledge, never a required project mechanism. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--approved-editorial-coverage) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 02](02-dns-and-service-discovery.md) · [Next: Chapter 04](04-framing-and-incremental-parsers.md)
