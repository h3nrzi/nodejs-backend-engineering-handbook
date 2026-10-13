# Chapter 09 — Pipelines, Transforms and Cancellation

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C09  
**Editorial status:** approved_by_learner — learner explicitly approved on 2026-10-13.  
**Prerequisite review:** learner explicitly approved Chapter 08 on 2026-10-13.  
**Educational execution:** Section 13 records executed commands, outcomes and limits.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes and prerequisites

Compose incremental stages with one outcome owner; explain independent Duplex sides and Transform output/finalization; observe failure and cleanup across a pipeline; distinguish cancelling a wait from cancelling work; handle early iteration exit; and translate Node/Web stream ownership and queue contracts without assuming their APIs are interchangeable.

Prerequisites: [Chapter 08 — stream mechanics](08-readable-and-writable-stream-mechanics.md), [Chapter 06 — bytes and encoding](06-buffers-bytes-and-text-encoding.md), [Chapter 07 — file/resource ownership](07-filesystem-io-and-resource-ownership.md), and D02 Promise/iteration/cancellation concepts. Fixtures are bounded educational code, not project implementations. No product architecture, storage or deployment choice is made here. Native thread-pool saturation is Chapter 10, which remains not_started.

## 2. First principles: a chain has more than one outcome

A **pipeline** connects source → optional transformation stages → destination. Pressure travels upstream; data travels downstream. Errors can originate anywhere. Without a lifecycle owner, a destination can fail while a source continues producing, leaving buffers, handles or listeners behind.

A stream outcome is local: source end means consumed input, sink finish means its writes/finalization completed, and close means its lifecycle released resources according to its implementation. Chain success requires the selected participants' completion contract. Failure may leave already processed output. Coordination is not rollback, a durable commit, a remote acknowledgement or proof that every external side effect stopped.

| Mechanism | Responsibility | Remaining boundary |
|---|---|---|
| `source.pipe(destination)` | Incremental transfer with pressure | Owner must coordinate failures and cleanup; source errors do not automatically close the destination |
| Promise `pipeline(...)` | Connect, propagate failures, destroy unfinished stream participants and report outcome | Custom operations must cooperate with cleanup; completed participants have documented exceptions |
| Promise `finished(stream)` | Observe completion/error/premature close | Does not consume a Readable or transfer input; aborting this wait does not abort the stream |
| Async iteration | Sequential consumer steps | Early return normally destroys Node Readable; preserving it transfers cleanup duty |
| Node/Web adapter | Translate an interface and its pressure/lifecycle operations | Queue units, chunk types, reader locks and ownership still matter |

Use fresh streams for a new operation. Pipeline may retain internal listeners after settlement; failed-stream reuse can accumulate listeners or swallow errors. It is not a universal stream reset utility. Promise APIs let the owning function catch and classify an outcome; they do not make caller errors disappear.

## 3. Duplex and Transform mechanisms

A **Duplex** is both Writable and Readable, with separate buffers and completion states. Its output need not be computed from its input; a socket sends and receives independent byte sequences. Writable finish alone does not prove Readable end. `allowHalfOpen` controls whether a Duplex writable side remains open after its readable side ends; it is not a business acknowledgement policy. Select supported options based on ownership, rather than imposing a universal half-close rule.

A **Transform** is a Duplex whose readable output derives from writable input. Implement `_transform(chunk, encoding, callback)`: produce zero, one or multiple output chunks with push, then call the callback once (optionally with an error or one output value). Node serializes transform calls; the callback establishes when the current input was handled. Do not combine push(output) and callback(null, sameOutput) unless duplicate output is intended.

`_flush(callback)` can emit final pending output before Readable end. A decoder/parser might retain a partial record across input chunks and validate it at EOF. A compression stage may need trailing bytes. Calling the callback before asynchronous work ends breaks accounting and failure ownership. Consumer code must not call these underscore methods or manually emit lifecycle events.

Pressure does not bound a transform's private arrays or unlimited expansion from one input chunk. A parser needs input/record/expansion bounds independently of stream thresholds. Keep text decoding and record framing separate: uppercasing each arbitrary byte chunk through independent UTF-8 conversion can corrupt split characters. Our object-mode transform avoids that problem; it is not a general text parser.

## 4. Example A — failures at every stage and final output

Save as `pipeline-outcomes.mjs`. Run normal, source, transform, sink or flush. All stages own a logical resource and explicitly release it once. The source owns a scheduled read and cancels it in destruction. Error cases assert outcome and release, without assuming identical partial-output timing for all implementations.

```javascript
import assert from 'node:assert/strict';
import { Readable, Transform, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
const mode = process.argv[2];
assert.ok(['normal', 'source', 'transform', 'sink', 'flush'].includes(mode));
const released = { source: 0, transform: 0, sink: 0 };
const output = [];
let next = 1, pending;
const source = new Readable({ objectMode: true, highWaterMark: 1,
  read() {
    if (pending) return;
    pending = setImmediate(() => {
      pending = undefined;
      if (mode === 'source' && next === 2) return this.destroy(new Error('source failed'));
      this.push(next <= 3 ? next++ : null);
    });
  },
  destroy(error, callback) {
    clearImmediate(pending);
    pending = undefined;
    released.source++;
    callback(error);
  }
});
const transform = new Transform({ objectMode: true, highWaterMark: 1,
  transform(value, encoding, callback) {
    if (mode === 'transform' && value === 2) return callback(new Error('transform failed'));
    callback(null, value * 2);
  },
  flush(callback) {
    if (mode === 'flush') return callback(new Error('flush failed'));
    this.push('done');
    callback();
  },
  destroy(error, callback) { released.transform++; callback(error); }
});
const sink = new Writable({ objectMode: true, highWaterMark: 1,
  write(value, encoding, callback) {
    if (mode === 'sink' && value === 4) return callback(new Error('sink failed'));
    output.push(value);
    callback();
  },
  destroy(error, callback) { released.sink++; callback(error); }
});
let outcome = 'success';
try { await pipeline(source, transform, sink); }
catch (error) { outcome = error.message; }
assert.equal(outcome, mode === 'normal' ? 'success' : `${mode} failed`);
assert.deepEqual(released, { source: 1, transform: 1, sink: 1 });
assert.ok([source, transform, sink].every(stream => stream.destroyed));
if (mode === 'normal') {
  assert.deepEqual(output, [2, 4, 6, 'done']);
  assert.equal(transform.readableEnded, true);
  assert.equal(sink.writableFinished, true);
} else assert.equal(sink.writableFinished, false);
console.log(JSON.stringify({ mode, outcome, output, released,
  sinkFinished: sink.writableFinished }));
```

Normal includes the flush output before successful sink completion. Each failure rejects the pipeline and releases the owned logical resources; successful earlier writes are not undone. These custom destroy callbacks complete synchronously, so this fixture does not claim that every external cleanup completes immediately after rejection. Native work cannot be cancelled merely by clearing its JavaScript observer.

Backend symptom: a data export stops after a malformed record. Record which stage reported failure, whether output was partially accepted, whether owned resources closed, and what success boundary was absent. An HTTP response used as a pipeline destination may have its socket destroyed on failure; attempting a new error response afterward can be too late. Decide externally observable response behavior in the product workflow, not by assuming pipeline permits rollback.

## 5. Cancellation is a supported-operation contract

An **AbortController** publishes a cancellation request through its signal. Passing `{ signal }` to promise pipeline asks the pipeline to destroy its stream participants and report cancellation when aborted (documented as AbortError; concurrent failures can produce an AggregateError containing abort errors). Async-generator stages receive a signal argument; pass it to supported awaited operations and check it before more work. Ignoring that signal can leave a generator blocked and prevent completion.

A Promise has no general cancellation mechanism. An abort does not undo prior writes, interrupt a synchronous CPU loop, stop every OS operation or prove an external operation had no effect. Support varies by API/version: check the actual operation and its cleanup contract. An AbortError describes cancellation of this operation, not a complete audit of outside effects. Completion racing cancellation requires observing the resulting outcome, not assuming which request won.

Use finally to release resources owned by a generator. Resource cleanup must itself have an outcome and sometimes a bounded policy. Do not call every error cancellation; preserve source, transform, sink and finalization failures distinctly. No timeout, retry or partial-output product policy is chosen here.

## 6. Example B — cooperative generator cancellation

Save as `pipeline-abort.mjs`; run normal or abort. The source yields one value, then awaits an abort-aware timer before yielding a second. Abort is scheduled only after the sink accepts the first value, ensuring the generator has started. A separate finalization observation avoids inferring generator release only from pipeline rejection.

```javascript
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { setTimeout as delay } from 'node:timers/promises';
const mode = process.argv[2];
assert.ok(['normal', 'abort'].includes(mode));
const controller = new AbortController();
const output = [];
let finalized = false, cleanups = 0, markFinalized;
const generatorDone = new Promise(resolve => { markFinalized = resolve; });
const sink = new Writable({ objectMode: true,
  write(value, encoding, callback) {
    output.push(value);
    if (mode === 'abort' && value === 1) setImmediate(() => controller.abort());
    callback();
  },
  destroy(error, callback) { cleanups++; callback(error); }
});
let outcome = 'success', errorName, causes = [];
try {
  await pipeline(async function* ({ signal }) {
    try {
      signal.throwIfAborted();
      yield 1;
      await delay(20, undefined, { signal });
      signal.throwIfAborted();
      yield 2;
    } finally { finalized = true; markFinalized(); }
  }, sink, { signal: controller.signal });
} catch (error) {
  outcome = error.code;
  errorName = error.name;
  causes = (error.errors ?? [error]).map(cause => cause.code);
}
await generatorDone;
assert.equal(outcome, mode === 'abort' ? 'ABORT_ERR' : 'success');
if (mode === 'abort') assert.ok(causes.length > 0 && causes.every(code => code === 'ABORT_ERR'));
assert.deepEqual(output, mode === 'abort' ? [1] : [1, 2]);
assert.equal(finalized, true);
assert.equal(cleanups, 1);
assert.equal(sink.writableFinished, mode === 'normal');
console.log(JSON.stringify({ mode, outcome, errorName, causes, output, finalized, cleanups,
  finished: sink.writableFinished }));
```

The abort run observed AggregateError with code ABORT_ERR and two AbortError causes, from concurrent pipeline and timer cancellation. The fixture checks cancellation codes and generator finalization rather than assuming a universal wrapper/error count. Abort leaves the first accepted value visible, runs generator finally and releases the sink once without finish. Normal completes both values. The timer duration is a fixture delay, not a completion deadline or latency guarantee. This demonstrates a cooperating timer; it is not a proof of cancellation support for a database, file write or external service.

## 7. finished observes; it does not consume or own cancellation

Promise finished observes the selected readable/writable completion, errors and premature closure. A Readable still needs a consumer; watching it does not drain its data. By default a Duplex observation accounts for both sides; `{ readable: false }` or `{ writable: false }` narrows the observation, not the actual stream operation.

`finished(stream, { signal })` aborts **the wait**, leaving the underlying stream running. This differs from pipeline's signal. `{ cleanup: true }` removes listeners registered by the promise observer after settlement; default retained listeners protect against unexpected late errors from incorrect implementations. Once listeners are removed, the stream owner still needs an appropriate policy for later errors. The callback form returns a cleanup function instead. Do not confuse listener cleanup with resource closure.

## 8. Example C — completion, premature close and a cancelled wait

Save as `finished-observation.mjs`; run normal, premature or wait-abort. Outcome observation is registered before mutation. Wait-abort deliberately shows that the same sink can still finish after the observer was cancelled. The explicit error listener belongs to the owner, not finished.

```javascript
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
const mode = process.argv[2];
assert.ok(['normal', 'premature', 'wait-abort'].includes(mode));
let cleanups = 0;
const sink = new Writable({
  write(chunk, encoding, callback) { setImmediate(callback); },
  destroy(error, callback) { cleanups++; callback(error); }
});
sink.on('error', () => {}); // Owner handles errors; observer records the tested outcome.
const names = ['error', 'end', 'finish', 'close'];
const before = names.map(name => sink.listenerCount(name));
const controller = new AbortController();
const observation = finished(sink, { cleanup: true, signal: controller.signal })
  .then(() => 'success', error => error.code);
if (mode === 'premature') sink.destroy();
else if (mode === 'wait-abort') controller.abort();
else sink.end('x');
const outcome = await observation;
assert.equal(outcome, mode === 'normal' ? 'success'
  : mode === 'premature' ? 'ERR_STREAM_PREMATURE_CLOSE' : 'ABORT_ERR');
assert.deepEqual(names.map(name => sink.listenerCount(name)), before);
if (mode === 'wait-abort') {
  assert.equal(sink.destroyed, false);
  sink.end('x');
  await finished(sink, { cleanup: true });
}
assert.equal(sink.writableFinished, mode !== 'premature');
assert.equal(cleanups, 1);
console.log(JSON.stringify({ mode, outcome, finished: sink.writableFinished,
  cleanups, listenerCounts: names.map(name => sink.listenerCount(name)) }));
```

The normal sink finishes; premature destruction rejects with premature-close evidence; cancelling the wait reports ABORT_ERR without destroying the stream, which then finishes. Registered observer counts return to baseline. This is a listener-count assertion, not a heap-leak proof or blanket permission to ignore errors.

## 9. Early async iteration exit and ownership transfer

Default Node Readable async iteration destroys the stream when a loop exits via break, return or throw. That protects the usual one-consumer lifecycle but can surprise a caller intending to resume later. `readable.iterator({ destroyOnReturn: false })` preserves the stream on an early return; the next consumer or explicit owner must eventually consume/destroy it. Do not confuse stopping iteration with full source consumption or sink success.

Throwing from a consumer is another failure boundary. A manually composed iterator-to-sink flow must coordinate source release, sink failure and pressure; awaiting a business function does not add pipeline cleanup automatically. An async generator in pipeline must preserve its signal contract through awaited calls and finally.

Save as `iteration-ownership.mjs`; run break or preserve. The preserved branch resumes remaining values; neither branch leaves a retained open stream.

```javascript
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
const mode = process.argv[2];
assert.ok(['break', 'preserve'].includes(mode));
const source = Readable.from([1, 2, 3], { objectMode: true, highWaterMark: 1 });
const closed = new Promise(resolve => source.once('close', resolve));
let first;
const iterable = mode === 'preserve'
  ? source.iterator({ destroyOnReturn: false }) : source;
for await (const value of iterable) { first = value; break; }
const destroyedAfterBreak = source.destroyed;
assert.equal(first, 1);
assert.equal(destroyedAfterBreak, mode === 'break');
const rest = [];
if (mode === 'preserve') for await (const value of source) rest.push(value);
await closed;
assert.deepEqual(rest, mode === 'preserve' ? [2, 3] : []);
assert.equal(source.destroyed, true);
console.log(JSON.stringify({ mode, first, destroyedAfterBreak, rest,
  ended: source.readableEnded, destroyed: source.destroyed }));
```

## 10. Node/Web streams: adapt contracts, not just names

Web ReadableStream uses a reader lock, Promise-returning reads and cancel; Web WritableStream uses a writer lock, Promise-returning writes, close and abort. Writer ready and queue desiredSize express Web pressure rather than Node's false/drain events. A reader must release its lock when ownership ends; releasing alone does not cancel or drain input. A disturbed stream has already been read or cancelled; adaptation does not rewind it.

Readable.fromWeb/toWeb, Writable.fromWeb/toWeb and Duplex pair adapters connect the interfaces. Validate supported runtime/version, chunk representations, objectMode and queue strategy. Readable.toWeb's strategy size defaults to one per chunk; if your budget counts bytes, explicitly provide a matching size function. FromWeb byte-mode input must be compatible with Node byte chunks; arbitrary values need objectMode. Adaptation can add buffering and does not guarantee copies or a total memory cap.

Adapters own an underlying reader/writer; avoid simultaneous original-side and adapter-side consumption. Direct pipeline support for Web streams exists on this verified runtime, but adapters are useful when a particular Node API requires its stream interface. Do not presume every older release supports the same options or lifecycle details.

## 11. Example E — bytes across the interface and cancellation

Save as `web-interop.mjs`; run readable, writable or cancel. There is no network request. Readable conversion preserves five UTF-8 bytes; text is decoded after byte collection. Writable conversion reaches a finite Web sink's close callback. Cancel converts a Node Readable to Web and verifies its owned cleanup after reader cancellation and lock release.

```javascript
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { WritableStream, ReadableStream } from 'node:stream/web';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
const mode = process.argv[2];
assert.ok(['readable', 'writable', 'cancel'].includes(mode));
if (mode === 'readable') {
  const bytes = Buffer.from('A€Z');
  const web = new ReadableStream({ start(controller) {
    controller.enqueue(new Uint8Array(bytes.subarray(0, 2)));
    controller.enqueue(new Uint8Array(bytes.subarray(2)));
    controller.close();
  }});
  const node = Readable.fromWeb(web);
  const chunks = [];
  for await (const chunk of node) chunks.push(chunk);
  const result = Buffer.concat(chunks);
  assert.deepEqual(result, bytes);
  assert.equal(result.toString('utf8'), 'A€Z');
  assert.equal(web.locked, true); // Observed adapter-owned lock on this version.
  console.log(JSON.stringify({ mode, bytes: result.length, text: result.toString(), locked: web.locked }));
} else if (mode === 'writable') {
  const chunks = [];
  let closes = 0;
  const web = new WritableStream({
    write(chunk) { chunks.push(Buffer.from(chunk)); },
    close() { closes++; }
  });
  const node = Writable.fromWeb(web);
  await pipeline(Readable.from([Buffer.from('A'), Buffer.from('Z')], { objectMode: false }), node);
  assert.equal(Buffer.concat(chunks).toString(), 'AZ');
  assert.equal(closes, 1);
  assert.equal(web.locked, true); // Observed adapter-owned lock on this version.
  console.log(JSON.stringify({ mode, text: Buffer.concat(chunks).toString(), closes, locked: web.locked }));
} else {
  let released = 0;
  const node = new Readable({ read() {},
    destroy(error, callback) { released++; callback(error); } });
  const closed = new Promise(resolve => node.once('close', resolve));
  const web = Readable.toWeb(node, { strategy: { highWaterMark: 4, size: chunk => chunk.byteLength } });
  const reader = web.getReader();
  assert.equal(web.locked, true);
  try { await reader.cancel(); } finally { reader.releaseLock(); }
  await closed;
  assert.equal(node.destroyed, true);
  assert.equal(released, 1);
  assert.equal(web.locked, false);
  console.log(JSON.stringify({ mode, released, destroyed: node.destroyed, locked: web.locked }));
}
```

On this version, the two fromWeb fixtures observed the original Web stream still locked after completion. This is an adapter-owned reader/writer, not a caller-owned lock that can be released through a private field; do not attempt to reuse the original Web stream or infer a live external handle from locked alone. These observed adapter lock states are version-scoped, not a public promise of identical future implementation behavior. By contrast the toWeb cancellation fixture explicitly releases its caller-owned reader. Lock-state assertions must be checked against the exact adapter version; manual Web readers/writers have their own release obligations. Byte collection is finite here and deliberately not a scalable whole-input aggregation recommendation. The readable fixture uses five bytes, split inside the euro sign; a chunk-by-chunk decoder would lose that text boundary.

## 12. Failure modes, trade-offs and diagnostic practice

A transform can stall because its output is unconsumed, because a callback is omitted, or because downstream pressure is doing its job. Two buffers and private retained state make a single writableLength an incomplete explanation. Inspect readable/writable state, event/error outcomes and pending application work together. A transform's low input queue does not bound its internal record cache or expansion output.

Common mistakes: trusting pipe to coordinate all failures; retrying a failed stream instance; treating pipeline success as durable storage; swallowing an error and reporting close as success; ignoring generator signal; assuming finished abort cancels underlying I/O; preserving an iterator without assigning cleanup; double-consuming an adapter's source; and treating text chunks as records.

Error races can change the observed primary error. If several stages fail during cleanup, retain relevant diagnostics without fabricating a universal first-error ordering. Custom `_destroy()` must account for owned native handles and in-flight work. Memory/CPU-heavy stages still need their own limits; cancellation cannot interrupt the running JavaScript stack. Backpressure and cancellation answer different questions: whether to pause new work and whether to terminate this operation.

## 13. References, exact execution evidence and limitations

Documentation checked on 2026-10-13 with Context7 `/nodejs/node` and pinned official Node v26.4.0 API documents. Version-sensitive references:

- [Stream API — v26.4.0](https://github.com/nodejs/node/blob/v26.4.0/doc/api/stream.md): Duplex/Transform, pipeline/finished, generator signals, iterator ownership, adapters and listener caveats.
- [Web streams API — v26.4.0](https://github.com/nodejs/node/blob/v26.4.0/doc/api/webstreams.md): locks, desiredSize, reader cancellation and writer operations.
- [Promise timers — v26.4.0](https://github.com/nodejs/node/blob/v26.4.0/doc/api/timers.md): abort-aware timer used in Example B.

Executed environment: Node v26.4.0, V8 14.6.202.34-node.21, libuv 1.52.1, darwin/arm64; standalone ESM .mjs processes. The five exact educational code blocks were extracted from this lesson and run separately with a ten-second process timeout. Expected intentional failures are caught and asserted; an exit zero means the outcome assertions passed, not that the deliberately failed operation succeeded.

**Executed: fifteen scenarios passed from five exact lesson blocks; each process exited 0 with no stderr.**

| Command | Observed outcome and assertions |
|---|---|
| `node pipeline-outcomes.mjs normal` | success; observed output `[2, 4, 6, "done"]`; source/transform/sink released once; sink finish true. |
| `node pipeline-outcomes.mjs source` | source failed; observed output `[2]`; source/transform/sink released once; sink finish false. |
| `node pipeline-outcomes.mjs transform` | transform failed; observed output `[2]`; source/transform/sink released once; sink finish false. |
| `node pipeline-outcomes.mjs sink` | sink failed; observed output `[2]`; source/transform/sink released once; sink finish false. |
| `node pipeline-outcomes.mjs flush` | flush failed; observed output `[2, 4, 6]`; source/transform/sink released once; sink finish false. |
| `node pipeline-abort.mjs normal` | success; output `[1, 2]`; generator finally true; sink released once; finish true. |
| `node pipeline-abort.mjs abort` | ABORT_ERR; output `[1]`; generator finally true; sink released once; finish false. Observed AggregateError containing two ABORT_ERR causes. |
| `node finished-observation.mjs normal` | success; sink finish true; cleanup once; observer listeners restored to baseline `[1,0,0,0]`. |
| `node finished-observation.mjs premature` | ERR_STREAM_PREMATURE_CLOSE; sink finish false; cleanup once; observer listeners restored to baseline `[1,0,0,0]`. |
| `node finished-observation.mjs wait-abort` | ABORT_ERR; sink finish true; cleanup once; observer listeners restored to baseline `[1,0,0,0]`. |
| `node iteration-ownership.mjs break` | First 1; destroyed after break true; rest `[]`; final destroyed true; readableEnded false. |
| `node iteration-ownership.mjs preserve` | First 1; destroyed after break false; rest `[2, 3]`; final destroyed true; readableEnded true. |
| `node web-interop.mjs readable` | Five bytes preserved as A€Z; original Web lock still true (version-scoped observation). |
| `node web-interop.mjs writable` | AZ received; Web sink close once; original Web lock still true (version-scoped observation). |
| `node web-interop.mjs cancel` | Node source destroyed; owned cleanup once; manual reader released; Web lock false. |


Limits: finite local synthetic operations, logical resource counters and local adapters. No real HTTP/socket failure, filesystem cleanup/durability, external side-effect rollback, heap-leak proof, cross-platform result, learner assessment or implemented product. Source/transform/sink partial output is observational; only normal-mode output is asserted as a complete result. Exercises and unsupported-operation counterexamples are not execution evidence.

## 14. Exercises, expected outcomes and future rubric

1. **Pipe versus pipeline:** sketch a source-error flow and identify who closes the sink in each case. Credit requires distinguishing pressure propagation from outcome ownership; no product architecture needed.
2. **Transform framing:** bytes split mid-character and a record spans three chunks. Explain decoder state, bounded record state and EOF validation. Credit requires avoiding per-chunk independent decoding and unbounded retained arrays.
3. **Flush failure:** all numeric inputs processed but trailer creation fails. Expected failure rather than chain success; identify why already written output remains visible.
4. **Cancelled wait:** finished rejects ABORT_ERR while the sink remains live. Assign stream cleanup to its owner. Contrast pipeline cancellation without claiming rollback or general OS interruption.
5. **Early exit:** preserve a Readable iterator, consume one item and never resume. Explain retained resource risk and design an explicit cleanup responsibility; do not infer that the stream is drained.
6. **Web byte budget:** Node byte threshold 64 KiB adapted with default size one. Explain the mismatch and compare byteLength sizing. Credit requires noting extra queues and oversized chunks still prevent a total memory guarantee.
7. **Late error and listeners:** explain the default finished listener retention and cleanup option; state what error ownership remains afterward. Listener-count evidence is not heap proof.
8. **Export failure diagnosis:** source, parser, client sink and cleanup report competing errors. Propose evidence for partial output and actual release; classify observation versus inference without inventing a universal error order.

Future self-assessment: trace success/failure/cancellation through each participant, name a boundary that does not imply rollback, explain both Duplex sides and three ownership transfers, and state each experiment's limits. No learner grading is performed during authoring.

## 15. Coverage and editorial review

- [x] First-principles composition, pressure and outcome ownership; pipe/pipeline/finished comparisons.
- [x] Duplex sides and Transform transform/flush lifecycle, expansion and decoding caveats.
- [x] Source/transform/sink/flush failures and owned cleanup evidence.
- [x] AbortSignal support, cooperating async generators and wait-versus-operation cancellation.
- [x] Async iteration early exit and preserved-consumer ownership.
- [x] Node/Web interoperability, chunks, locks, queue units and local cancellation evidence.
- [x] Backend symptom, misconceptions, exercises, official references and versioned execution evidence.
- [x] Canonical state, tracker, indexes and coverage matrix reconciliation.
- [x] Learner editorial approval of Chapter 09 — confirmed 2026-10-13.

Honest gaps: no comprehensive compose API tour, BYOB byte-reader tuning, native stream internals, real transport crash/recovery testing or production fault policies. Thread-pool contention belongs to Chapter 10; comprehensive runtime shutdown to Chapter 16. D03 project catalog/PRDs and implementation remain not_started.

**Author quality-gate review — 2026-10-13:** progressive teaching, mechanisms, bounded runnable examples, intentional failures, lifecycle ownership, references, exercises and evidence limits checked against `docs/quality-gates.md` and D03-C09 curriculum scope. Learner editorial approval was received on 2026-10-13; technical/project implementation and learning assessment remain deferred.

**Next action:** Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation — is the next lesson to author, then submit for learner editorial review. No approval of Chapter 10 is implied.
