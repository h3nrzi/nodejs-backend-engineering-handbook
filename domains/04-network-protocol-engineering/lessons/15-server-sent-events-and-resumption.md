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

The revised lab incrementally parses bytewise UTF-8, BOM and mixed line endings, then exercises SSE over real local HTTP with manual cursor reconnection and client cancellation. Its small parser and scripted replay still do not implement the EventSource connection state machine or certify conformance.

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

## Streaming grammar: state persists beyond a convenient block split

The revised parser maintains a streaming UTF-8 decoder, current line, CR-followed-by-LF state, data lines, event type and ID buffer. CR terminates a line immediately; one following LF is skipped even when it arrives in another chunk. It removes only one initial BOM. Split the wire one byte at a time and `€` still decodes intact. This is parser partition evidence, not a promise that HTTP callbacks have those boundaries.

| Input block | Dispatch / state result |
|---|---|
| Comment only | No application event |
| `data: first` and `data: second`, then blank line | One event with `first\nsecond` |
| `data:` then blank line | Event with empty data string |
| `id: cursor-only` then blank line | Cursor advances; no data event |
| `id` containing NUL | Ignore that ID field |
| `retry: 12x` | Ignore invalid retry value |
| `data: interrupted` then EOF | No event dispatch |

Only one optional leading space after the colon is removed, not arbitrary whitespace. An empty ID clears the ID buffer; an ID-only block can update reconnect state without dispatching a data event. Event type resets at each dispatch block while the ID buffer persists. The fixture keeps retry digits as text and does not implement reconnect scheduling; converting arbitrarily long digits into a JavaScript number would need bounds. Unknown fields are ignored. These details follow [WHATWG event-stream interpretation](https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation).

### Exercise transport lifetime independently from replay policy

An actual local HTTP response sends event 7 followed by an incomplete event tail. The client dispatches only 7, then explicitly reconnects with Last-Event-ID 7. The fixture emits event 8 and keeps the response open. The client aborts after parsing 8; the server observes response close and clears its producer-active flag. This proves one controlled cursor exchange and disconnect cleanup, without a browser or automatic EventSource retries. A real producer owning timers/listeners must stop those resources too; setting a flag is only this fixture's bounded cleanup action.

Native EventSource can stop reconnecting on HTTP 204 under its rules; a parser over `http.get` does not supply that state machine. Likewise Node HTTP does not automatically generate Last-Event-ID. Cursor replay, authorization and retained-history gaps still require an application contract.

**Advanced exercise:** add bare CR, an empty ID, an `event: update` block, unknown fields and a tail lacking the blank-line terminator. Predict event count, types, data and committed cursor before running. Full credit handles ID-only blocks, no-data versus empty-data, split CRLF and EOF without inventing an event; explains why a cursor is not consumer acknowledgment. Browser reconnection/CORS, replay retention and proxy flushing remain unverified. The teaching parser is bounded for its fixtures, not certified as a complete hostile-input implementation.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-15.mjs`, then run `node lab-15.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
function parser(emit) {
  const decoder = new TextDecoder(); // Streaming UTF-8; removes one initial BOM.
  let line = '', skipLF = false, data = [], type = '', id = '', cursor = '', retry;
  function finishLine() {
    if (!line) {
      cursor = id;
      if (data.length) emit({ id: cursor, type: type || 'message', data: data.join('\n') });
      data = []; type = ''; return;
    }
    if (line[0] === ':') return;
    const colon = line.indexOf(':');
    const field = colon < 0 ? line : line.slice(0, colon);
    let value = colon < 0 ? '' : line.slice(colon + 1);
    if (value.startsWith(' ')) value = value.slice(1);
    if (field === 'data') data.push(value);
    if (field === 'event') type = value;
    if (field === 'id' && !value.includes('\0')) id = value;
    if (field === 'retry' && /^[0-9]+$/.test(value)) retry = value;
  }
  return {
    push(bytes) {
      for (const ch of decoder.decode(bytes, { stream: true })) {
        if (skipLF) { skipLF = false; if (ch === '\n') continue; }
        if (ch === '\r' || ch === '\n') {
          finishLine(); line = ''; skipLF = ch === '\r';
        } else { line += ch; assert.ok(line.length <= 1024); }
        assert.ok(data.length <= 16); // Fixture bounds, not a full hostile-input policy.
      }
    },
    end() { decoder.decode(); line = ''; data = []; }, // No EOF dispatch.
    get cursor() { return cursor; }, get retry() { return retry; }
  };
}
const events = [], p = parser(e => events.push(e));
const wire = Buffer.from('\ufeffid: 7\r\n:beat\r\ndata: €\r\ndata: second\r\n\r\n' +
  'id: cursor-only\n\nid: bad\0id\nretry: 12x\nretry: 25\ndata:\n\ndata: partial');
for (const byte of wire) p.push(Buffer.from([byte])); p.end();
assert.deepEqual(events, [
  { id: '7', type: 'message', data: '€\nsecond' },
  { id: 'cursor-only', type: 'message', data: '' }
]);
assert.equal(p.cursor, 'cursor-only'); assert.equal(p.retry, '25');

const controlEvents = [], controls = parser(e => controlEvents.push(e));
controls.push(Buffer.from('retry: 12x\n')); assert.equal(controls.retry, undefined);
controls.push(Buffer.from('id: x\revent: update\rdata: a\r\rid:\runknown: value\rdata\r\r'));
assert.deepEqual(controlEvents, [
  { id: 'x', type: 'update', data: 'a' }, { id: '', type: 'message', data: '' }
]);
assert.equal(controls.cursor, ''); controls.end();
let resolveCleanup, producerActive = false;
const cleaned = new Promise(resolve => { resolveCleanup = resolve; });
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store' });
  if (!req.headers['last-event-id']) res.end('id: 7\ndata: first\n\ndata: interrupted');
  else {
    assert.equal(req.headers['last-event-id'], '7'); producerActive = true;
    res.on('close', () => { producerActive = false; resolveCleanup(); });
    res.write('id: 8\ndata: resumed\n\n'); // Stay open until the client cancels.
  }
});
server.listen(0, '127.0.0.1'); await once(server, 'listening');
function read(headers, controller) {
  return new Promise((resolve, reject) => {
    const found = []; const p = parser(event => {
      found.push(event); if (controller) controller.abort();
    });
    const req = http.get({ host: '127.0.0.1', port: server.address().port, agent: false,
      headers, signal: controller?.signal }, res => {
      assert.match(res.headers['content-type'], /^text\/event-stream/);
      res.on('data', c => p.push(c));
      res.on('error', e => { if (!controller?.signal.aborted) reject(e); });
      res.on('close', () => { p.end(); resolve(found); });
    });
    req.on('error', e => { if (!controller?.signal.aborted) reject(e); });
  });
}
try {
  const first = await read({}); assert.equal(first.length, 1); assert.equal(first[0].id, '7');
  const resumed = await read({ 'Last-Event-ID': first[0].id }, new AbortController());
  assert.deepEqual(resumed, [{ id: '8', type: 'message', data: 'resumed' }]);
  await cleaned; assert.equal(producerActive, false);
} finally {
  server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
}
console.log('SSE bytewise BOM/CRLF/UTF-8 grammar; actual HTTP cursor replay, partial tail, abort cleanup: ok');
```

The bytewise fixture exercises BOM, CRLF/LF, UTF-8, ID-only state, invalid ID/retry fields and incomplete EOF; separate control assertions check bare CR, empty ID, event type and unknown fields. Actual HTTP exercises one manual cursor reconnection and cancellation cleanup. Native/browser EventSource retry scheduling, CORS, replay retention and proxy flushing are unexecuted.

## Hands-on exercises with expected results

1. Trace CRLF split between chunks and compare a blank data field with an ID-only block. Expected: one CRLF line ending; empty-data dispatch differs from no-data state update. The revised parser maintains explicit cross-chunk state.
2. Define what a user should see when a reconnect reference is older than retained history. Expected: explicit gap/fresh-state outcome rather than invented replay.
3. Compare SSE and WebSocket for one-way status updates plus occasional client commands. Expected: trade-offs in direction, clients, backpressure and intermediary support; no universal choice.

## Self-assessment and answer rubric

- **Is a heartbeat comment an application event?** Full credit: no; it can keep bytes flowing without dispatching data.
- **Does an event ID guarantee exactly once?** Full credit: no; cursor/replay and consumer processing are separate contracts.
- **Should incomplete EOF data dispatch?** Full credit: not merely because transport ended; follow event-stream framing.

## Reliable references and version notes

- [WHATWG server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html), normative framing and EventSource behavior.
- [Node v24 TextDecoder](https://nodejs.org/docs/latest-v24.x/api/util.html#class-utiltextdecoder), streaming UTF-8/BOM behavior, and [HTTP](https://nodejs.org/docs/latest-v24.x/api/http.html), request cancellation and stream lifecycle.
- [HTTP caching, RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html), response reuse context; SSE transport is not automatically a replay store.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P06 directly challenges resumed event visibility and slow consumers. Full parser conformance, browser/native EventSource reconnection and proxy-buffering interoperability remain untested. D02 SubscriptionHub and D03 LiveRoom scopes are preserved. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 14](14-websocket-sessions-and-control.md) · [Next: Chapter 16](16-rpc-envelopes-and-protocol-evolution.md)
