# Chapter 15 — Server-sent events and resumption

**Domain / competency:** D04 / D04-C15
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Explain SSE text framing and browser resumption behavior; distinguish event IDs from exactly-once delivery; reason about buffering, heartbeat comments and retention gaps.

Prerequisites: Chapters [07](07-http-semantics-and-representations.md)–[11](11-proxies-routing-and-trust-boundaries.md) and [14](14-websocket-sessions-and-control.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: one-way streaming can stay within HTTP

Server-sent events use a long-lived HTTP response with the event-stream media type. The server sends UTF-8 text fields; the browser's EventSource parses and dispatches events. The channel is server-to-client. Client actions use other requests rather than pretending the event stream is bidirectional. Compared with WebSocket, the fit depends on the product's interaction direction, clients and intermediary behavior.

The transport still supplies arbitrary chunks. A line or event can span chunks, and a multibyte UTF-8 character can span byte deliveries. Preserve decoder state before applying line grammar. Network buffering and application event framing are separate layers.

## Event framing and dispatch

A blank line terminates an event block. Multiple data fields join with newline separators, with the protocol's final trailing-newline handling. Event can select the dispatch type; id updates the last event ID buffer under defined rules; retry can supply a reconnect delay when valid. A colon at the beginning of a line introduces a comment, which can carry a heartbeat without dispatching an application event.

Line endings include CRLF, LF and CR. A complete parser must handle splits between CR and LF, an optional initial BOM, empty field values and unknown fields. A final incomplete event at EOF does not automatically become a dispatched event. These details matter when adapting generic line parsers that emit a last partial line on close.

The lab implements a deliberately restricted LF-only block fixture after text decoding. It demonstrates multiple data lines, comments, IDs and incomplete EOF handling, but explicitly does not claim full EventSource conformance. Distinguishing a subset model from a complete parser is part of engineering evidence discipline.

## Reconnect and replay are different layers

EventSource can reconnect and provide a last-event reference according to its API rules. The server must still decide whether it can replay from that reference. Event IDs are opaque application references, not inherently timestamps, globally increasing numbers or proof of exactly-once delivery. A reconnect can repeat an event or encounter a gap beyond retained history.

A product needs a visible gap policy: for example, state that history is unavailable and require a fresh snapshot, rather than silently jumping forward while showing a complete history badge. Choosing replay storage, retention and cursor validation belongs to later Product Discovery and module design. The Charter can challenge honest resumption without mandating a broker or database.

An event emitted by the backend is not necessarily dispatched by the browser yet, and browser dispatch is not equivalent to durable application processing. If an acknowledgment is required, it needs a separate application contract. Duplicate handling and ordering are scoped to that contract, not supplied by SSE syntax alone.

## Backend lifecycle and intermediary effects

Set the correct media type and design cache behavior deliberately. An intermediary can buffer response bytes, apply compression or close idle streams. Writing a heartbeat at the origin does not prove that it traversed every buffering layer. Verify user-visible incremental delivery through the actual supported path later. HTTP/1.1 browser connection limits and h2 stream limits differ; avoid universal per-origin numeric claims across versions and clients.

Native EventSource supports a particular credential/request model, not arbitrary custom request options from every HTTP library. Cross-origin access and cookies need actual browser testing under the intended policy. Do not put durable secrets in query strings just because adding a header is inconvenient; D09 owns the complete authentication design.

Resource ownership includes disconnect cleanup, bounded per-client output and stopping producers when no longer needed. A timer writing comments forever after a peer disappears can retain connections, listeners or work. A slow client must not grow an unbounded personal event queue.

## Worked failure reasoning

Counterexample: splitting every incoming chunk on `

` loses an event whose delimiter is split across chunks and can corrupt split UTF-8. Another mistake is automatically dispatching residual content at EOF, converting an interrupted event into an apparently complete update.

If updates appear in bursts, compare generation timestamps, actual write times, intermediary forwarding and client receipt. Browser callback timing also includes local scheduling. Preserve observation boundaries rather than subtracting unsynchronized wall clocks and calling the result network latency.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-15.mjs`, then run `node lab-15.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import { StringDecoder } from 'node:string_decoder';
const wire = Buffer.from(':beat\nid: 7\ndata: €\ndata: second\n\ndata: partial');
const decoder = new StringDecoder('utf8');
let text = '';
for (const byte of wire) text += decoder.write(Buffer.from([byte]));
text += decoder.end();
const blocks = text.split('\n\n');
const incomplete = blocks.pop(); // EOF does not dispatch an incomplete block.
const events = blocks.map(block => {
  let id, data = [];
  for (const line of block.split('\n')) {
    if (line.startsWith('id:')) id = line.slice(3).replace(/^ /, '');
    if (line.startsWith('data:')) data.push(line.slice(5).replace(/^ /, ''));
  }
  return { id, data: data.join('\n') };
});
assert.deepEqual(events, [{ id: '7', data: '€\nsecond' }]);
assert.equal(incomplete, 'data: partial');
console.log('LF-only SSE model: bytewise UTF-8, multiline event, incomplete tail: ok');
```

The bytewise decoder is real Node behavior; the parser is a finite LF-only subset. No HTTP stream, browser EventSource, reconnect timing, CR/CRLF grammar or proxy flushing is executed.

## Hands-on exercises with expected results

1. Add a paper trace with CRLF split between chunks. Expected: a full parser treats CRLF as one line ending; this subset lab is insufficient without further state handling.
2. Define what a user should see when a reconnect reference is older than retained history. Expected: explicit gap/fresh-state outcome rather than invented replay.
3. Compare SSE and WebSocket for one-way status updates plus occasional client commands. Expected: trade-offs in direction, clients, backpressure and intermediary support; no universal choice.

## Self-assessment and answer rubric

- **Is a heartbeat comment an application event?** Full credit: no; it can keep bytes flowing without dispatching data.
- **Does an event ID guarantee exactly once?** Full credit: no; cursor/replay and consumer processing are separate contracts.
- **Should incomplete EOF data dispatch?** Full credit: not merely because transport ended; follow event-stream framing.

## Reliable references and version notes

- [WHATWG server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html), normative framing and EventSource behavior.
- [Node v24 StringDecoder](https://nodejs.org/docs/latest-v24.x/api/string_decoder.html), split UTF-8 preservation.
- [HTTP caching, RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html), response reuse context; SSE transport is not automatically a replay store.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P06 directly challenges resumed event visibility and slow consumers. Full SSE parsing, browser EventSource and proxy-buffering interoperability remain untested. D02 SubscriptionHub and D03 LiveRoom scopes are preserved. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 14](14-websocket-sessions-and-control.md) · [Next: Chapter 16](16-rpc-envelopes-and-protocol-evolution.md)
