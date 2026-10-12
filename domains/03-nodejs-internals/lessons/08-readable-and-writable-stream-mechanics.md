# Chapter 08 — Readable and Writable Stream Mechanics

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C08  
**Editorial status:** approved_by_learner — explicit approval recorded on 2026-10-13.  
**Prerequisite review:** learner explicitly approved Chapter 07 on 2026-10-12.  
**Educational execution:** Section 12 records executed fixtures and limits.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes and prerequisites

Trace chunks through production, buffering and consumption. Choose one Readable consumption style, explain byte versus object accounting, stop a Writable producer on pressure, and distinguish input exhaustion, successful write completion and resource closure. Diagnose a stalled sink without treating its threshold as a process memory limit.

Prerequisites: [EventEmitter contracts](05-eventemitter-and-callback-contracts.md), [Buffers and encoding](06-buffers-bytes-and-text-encoding.md), [Filesystem ownership](07-filesystem-io-and-resource-ownership.md) and D02 iteration/Promises. These finite educational simulations select no project architecture or implementation. Transforms, coordinated pipeline cleanup, cancellation and Web stream interop belong to Chapter 09, which remains not_started.

## 2. First principles: incremental work needs a protocol

A whole-input operation obtains its input before processing it. Streams permit incremental progress: a **producer** supplies chunks, a **consumer** handles them, and a **buffer** temporarily retains data between the two. A **Readable** exposes data; a **Writable** accepts data. Neither makes JavaScript CPU work parallel.

A chunk is an API delivery unit, not inherently a line, JSON document, network message or character. Byte-mode consumption can combine or split buffered data. A UTF-8 character may span underlying chunks; decoding and record framing are separate responsibilities, discussed in Chapter 06.

**Backpressure** asks a producer to slow or stop because downstream processing has not caught up. Sustained production faster than consumption grows retained work. Bounded use requires producer cooperation, input bounds and an outcome policy when progress stops; the stream abstraction alone supplies none of these product decisions.

| Choice | Useful property | Remaining responsibility |
|---|---|---|
| Whole-input helper | Simple for enforced small inputs | Whole input allocation and processing cost |
| `data` events | Prompt synchronous processing | Async listener results are ignored; control concurrency |
| `readable` plus `read()` | Explicit consumption of available input | Read until null; observe errors and EOF |
| Async iteration | Sequential awaited consumer steps | Error/early-exit ownership; avoid retaining all chunks |
| `pipe()` | Automatic source-to-Writable pressure | Plain pipe is not coordinated failure cleanup for a chain |

Choose one consumption API for each stream. Mixing data/readable listeners, piping and iteration makes delivery and ownership difficult to reason about.

## 3. Readable modes, demand and EOF

Flowing mode delivers chunks through data events; paused mode permits explicit reads. **Object mode** describes chunk values/accounting, independently of flowing versus paused delivery.

The public `readableFlowing` has three states: null (no flow-based consumption established), false (flowing delivery paused), and true (active flowing delivery). Adding a data listener, calling pipe or resume can start flowing from the initial state. After an explicit pause, adding a data listener does not itself resume. A readable listener selects explicit reading, and resume does not override that listener. Removing data listeners does not automatically pause. Resume without a consumer can discard data; use it only for intentional draining.

Pause stops flowing delivery, not necessarily prefetch or an external device. A buffer may still hold data. `read()` returning null means no chunk is available for this read now, not necessarily final EOF. In byte mode, `read(n)` can wait for enough buffered bytes; at EOF it can return the remaining data. In object mode it returns one object regardless of n. A producer signals EOF with `push(null)`; end is observed after the consumer has exhausted buffered data. An unconsumed Readable need not emit end merely because null was pushed.

A custom Readable implements `_read(size)`; consumers never call it directly. Size is advisory, not a record-size guarantee. Stop pushing when `push(chunk)` returns false; Node calls `_read()` again when it requests more. Do not wait for Readable drain: that event belongs to Writable pressure. Async wrappers also need to prevent overlapping source requests and clean up the underlying source on destruction. A wrapper cannot halt a device that has no pause facility.

## 4. Example A — one source, three consumption styles

Save as `readable-modes.mjs`; run events, pull or iterate. Object chunks let assertions concern value delivery rather than byte-chunk boundaries. Request counts are observations, not portable constants.

```javascript
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
const mode = process.argv[2];
assert.ok(['events', 'pull', 'iterate'].includes(mode));
class Numbers extends Readable {
  constructor() {
    super({ objectMode: true, highWaterMark: 2 });
    this.next = 1;
    this.requests = 0;
  }
  _read() {
    this.requests++;
    while (this.next <= 5) {
      if (!this.push({ value: this.next++ })) return;
    }
    this.push(null);
  }
}
const source = new Numbers();
assert.equal(source.readableFlowing, null);
const seen = [];
const closed = new Promise((resolve, reject) => {
  source.once('error', reject);
  source.once('close', resolve);
});
if (mode === 'events') {
  source.on('data', item => {
    seen.push(item.value);
    if (item.value === 1) {
      source.pause();
      assert.equal(source.readableFlowing, false);
      setImmediate(() => source.resume());
    }
  });
} else if (mode === 'pull') {
  source.on('readable', () => {
    let item;
    while ((item = source.read()) !== null) seen.push(item.value);
  });
} else {
  for await (const item of source) {
    seen.push(item.value);
    await new Promise(resolve => setImmediate(resolve));
  }
}
await closed;
assert.deepEqual(seen, [1, 2, 3, 4, 5]);
assert.equal(source.readableEnded, true);
console.log(JSON.stringify({ mode, seen, ended: source.readableEnded,
  destroyed: source.destroyed, requests: source.requests }));
```

All modes preserve five values and end normally. Events deliberately pauses/resumes; iteration awaits one bounded step at a time. Neither proves no prefetch occurred. A tempting counterexample is `source.on('data', async item => await save(item))`: EventEmitter does not await the returned Promise. Saves can overlap and accumulate outside stream accounting, and rejection needs its own handling. This hypothetical save is not a product service implemented here.

## 5. Writable admission, processing and pressure

On a valid live stream, `write(chunk)` returning false signals pressure **after admission**, not rejection. Retrying the same chunk on drain duplicates it. True permits continued submission under the buffering contract; it does not confirm disk persistence or remote acceptance. Invalid chunks can throw; failed streams have error outcomes, so false is not a complete success/failure protocol.

After false, stop submitting new chunks until drain. Observe error and premature closure too: a failed or permanently stalled destination may never drain. Drain is not emitted after every write or a receipt for all input. Do not use a final drain after end as a substitute for finish.

Custom Writable `_write(chunk, encoding, callback)` calls are serialized for that Writable. Call the callback exactly once after the sink has handled the chunk, optionally with an error. Calling it before sink work completes hides backlog outside stream accounting. Never call `_write()` directly or manually emit finish/drain/error. Report write failure through its callback; Readable production failure through destroy(error).

Queuing a Buffer does not promise a deep copy. A delayed sink may retain its reference, so mutation before processing completes can change observed content. Objects similarly retain references. Copies cost allocations; borrowing requires a defined lifetime agreement.

## 6. Example B — slow sink and a bounded pressure counterexample

Save as `writable-pressure.mjs`. Respect stops on false; ignore submits only six chunks despite false; fail injects error on chunk three. The bad case is deliberately tiny. One lifecycle owner registers outcome listeners before writing and stops on failure/close instead of waiting indefinitely for drain.

```javascript
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
const mode = process.argv[2];
assert.ok(['respect', 'ignore', 'fail'].includes(mode));
const processed = [], events = [];
let calls = 0, drains = 0, peak = 0, next = 0, stopped = false;
const sink = new Writable({
  highWaterMark: 4,
  write(chunk, encoding, callback) {
    const call = ++calls;
    setImmediate(() => {
      if (mode === 'fail' && call === 3) return callback(new Error('sink failed'));
      processed.push(chunk.toString());
      callback();
    });
  }
});
let failure;
const closed = new Promise(resolve => sink.once('close', resolve));
sink.on('error', error => { failure = error.message; stopped = true; events.push('error'); });
sink.on('finish', () => events.push('finish'));
sink.on('close', () => { stopped = true; events.push('close'); });
function pump() {
  while (!stopped && next < 6) {
    const more = sink.write(Buffer.from(String(next++).padStart(4, '0')));
    peak = Math.max(peak, sink.writableLength);
    if (!more && mode !== 'ignore') return;
  }
  if (!stopped && next === 6) sink.end();
}
sink.on('drain', () => { drains++; pump(); });
pump();
await closed;
if (mode === 'fail') {
  assert.equal(failure, 'sink failed');
  assert.deepEqual(processed, ['0000', '0001']);
  assert.deepEqual(events, ['error', 'close']);
} else {
  assert.deepEqual(processed, ['0000', '0001', '0002', '0003', '0004', '0005']);
  assert.deepEqual(events, ['finish', 'close']);
}
assert.equal(peak, mode === 'ignore' ? 24 : 4);
console.log(JSON.stringify({ mode, submitted: next, processed, peak, drains, events, failure }));
```

Each four-byte admission reaches the explicit four-byte threshold with this delayed sink. Respect processes all six once, peak writableLength 4; ignore queues 24 bytes despite threshold 4; fail submits three, processes two and closes without finish. Timings are irrelevant to these assertions.

Backend symptom: an export appears fast at its producer while a slow client retains output and memory rises. Inspect write results, writableLength, writableNeedDrain and producer behavior together. If stream queues are small but memory grows, inspect application arrays, unresolved async handlers, aliased Buffer storage and external buffers. This fixture establishes pressure relationships, not network delivery or a throughput benchmark.

## 7. highWaterMark is an accounting threshold

The threshold controls demand/admission feedback, not a strict maximum chunk size or global memory cap. One oversized chunk can exceed it. In-flight writes contribute to Writable accounting. Ignoring write(false) or push(false) can overfill buffers. Byte-mode read(n) can influence buffering: the threshold is not an immutable resource quota.

Byte mode normally counts bytes. Object mode counts values; one huge Buffer inside one object counts as one. A Readable decoded with setEncoding measures buffered string length in UTF-16 code units instead of raw input bytes. Defaults vary by API/version; all these experiments explicitly configure thresholds rather than asserting a universal default.

## 8. Example C — what is being counted?

Save as `threshold-units.mjs`. Bytes submits eight bytes against a four-byte threshold; objects submits two values; text observes decoded accounting. A held callback makes the Writable observation deterministic.

```javascript
import assert from 'node:assert/strict';
import { Readable, Writable } from 'node:stream';
const mode = process.argv[2];
assert.ok(['bytes', 'objects', 'text'].includes(mode));
if (mode === 'text') {
  const source = new Readable({ highWaterMark: 4, read() {} });
  source.setEncoding('utf8');
  source.push(Buffer.from('€😀'));
  assert.equal(Buffer.byteLength('€😀'), 7);
  assert.equal(source.readableLength, 3);
  assert.equal(source.read(), '€😀');
  const closed = new Promise(resolve => source.once('close', resolve));
  source.destroy();
  await closed;
  console.log(JSON.stringify({ mode, sourceBytes: 7, bufferedCodeUnits: 3 }));
} else {
  const objectMode = mode === 'objects';
  let release;
  const sink = new Writable({ objectMode, highWaterMark: objectMode ? 2 : 4,
    write(chunk, encoding, callback) { release = callback; } });
  sink.on('error', error => { throw error; });
  const closed = new Promise(resolve => sink.once('close', resolve));
  const first = sink.write(objectMode ? { bytes: Buffer.alloc(8) } : Buffer.alloc(8));
  let second;
  if (objectMode) second = sink.write({ value: 2 });
  assert.equal(first, objectMode);
  if (objectMode) assert.equal(second, false);
  assert.equal(sink.writableLength, objectMode ? 2 : 8);
  const accounted = sink.writableLength;
  sink.end();
  release();
  if (objectMode) release();
  await closed;
  assert.equal(sink.writableFinished, true);
  console.log(JSON.stringify({ mode, first, second, accounted, finished: true }));
}
```

No measured number here is resident memory. Accounting excludes object graphs, slab retention, decoder state, producer caches and OS buffers. Smaller thresholds can reduce queued data at a coordination cost; larger thresholds can amortize work while increasing queued latency and memory. Tune from relevant workload evidence; this makes no product stack recommendation.

## 9. End, finish, close and destruction

| Boundary | Meaning | Does not establish |
|---|---|---|
| Readable push(null) | Producer signals EOF | Buffered input consumed |
| Readable end | Buffered input consumed, no more data | Sink completion or resource closure |
| Writable end() | Optional final chunk submitted; admission ended | Pending processing completed at return |
| Writable finish | End called, writes and finalization successfully handled | Remote acknowledgement, crash durability or resource closure |
| close | Destruction/associated resource closure completed per implementation | Successful consumption/writing |
| destroy(error) | Termination and cleanup initiated, optional error | Pending data successfully flushed |

Writable writableEnded reflects end being called; writableFinished reflects successful completion just before finish. Destroyed reflects destroy being called, not asynchronous cleanup completion. Default base-stream autoDestroy normally destroys after normal completion; emitClose can suppress close. Resource-specific streams/options have their own contracts.

Custom `_destroy(error, callback)` releases owned resources and calls its callback once; cleanup itself can fail. `_final(callback)` delays finish until remaining sink work completes. Consumers do not call either method directly. Attach error handling before work; unhandled error events can terminate the process. File closure is distinct from durable persistence; socket write completion is distinct from another application accepting a transaction.

## 10. Example D — lifecycle outcomes and owned cleanup

Save as `writable-lifecycle.mjs`; run normal, destroy, final-fail or no-close. A logical resource stands in for an owned handle. This verifies the callback contract, not a real descriptor closure. Async cleanup separates destroyed from released.

```javascript
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
const mode = process.argv[2];
assert.ok(['normal', 'destroy', 'final-fail', 'no-close'].includes(mode));
const events = [];
let owned = true, cleanups = 0, completedWrites = 0;
let cleanupDone;
const cleaned = new Promise(resolve => { cleanupDone = resolve; });
const sink = new Writable({
  emitClose: mode !== 'no-close',
  write(chunk, encoding, callback) {
    if (mode !== 'destroy') setImmediate(() => { completedWrites++; callback(); });
    // Destroy mode holds this synthetic operation; no external resource is pending.
  },
  final(callback) {
    events.push('final');
    callback(mode === 'final-fail' ? new Error('final failed') : undefined);
  },
  destroy(error, callback) {
    cleanups++;
    setImmediate(() => {
      owned = false;
      callback(error);
      setImmediate(cleanupDone);
    });
  }
});
sink.on('finish', () => events.push('finish'));
sink.on('error', error => events.push(`error:${error.message}`));
sink.on('close', () => events.push('close'));
sink.write('x');
if (mode === 'destroy') {
  sink.destroy(new Error('stopped'));
  sink.destroy();
  assert.equal(sink.destroyed, true);
  assert.equal(owned, true);
} else {
  sink.end();
  assert.equal(sink.writableEnded, true);
  assert.equal(sink.writableFinished, false);
}
await cleaned;
assert.equal(owned, false);
assert.equal(cleanups, 1);
const expected = mode === 'destroy' ? ['error:stopped', 'close']
  : mode === 'final-fail' ? ['final', 'error:final failed', 'close']
  : mode === 'no-close' ? ['final', 'finish'] : ['final', 'finish', 'close'];
assert.deepEqual(events, expected);
assert.equal(completedWrites, mode === 'destroy' ? 0 : 1);
assert.equal(sink.writableFinished, mode === 'normal' || mode === 'no-close');
console.log(JSON.stringify({ mode, events, cleanups, owned, completedWrites,
  finished: sink.writableFinished }));
```

Normal finalizes before finish and cleans up before close. Destroy abandons the held write without finish; repeated destroy does not duplicate cleanup. Final-fail processes one write but fails finalization; processing all chunks alone is insufficient for finish. No-close releases ownership but suppresses the event. These order assertions apply to the explicitly configured fixtures, not every implementation.

Real async sinks must coordinate outstanding operations/callbacks with cleanup. Abandoning a JavaScript callback does not cancel OS work. The destroy fixture owns no pending timer/file/socket and is not a reusable production sink.

## 11. Misconceptions, edge cases and diagnostic questions

- False does not mean retry: the admitted chunk remains queued.
- Async data listeners do not automatically apply pressure: concurrent work can escape accounting.
- Pause does not erase prefetched input or stop every external producer.
- Threshold is not a hard memory bound; large chunks, object graphs and application caches remain.
- End, finish and close describe different boundaries; close alone can follow failure.
- Null is reserved, including object mode; represent nullable data inside an object.
- Buffer/object mutation after submission can affect a delayed consumer.

For a stalled download ask: who owns consumption? Was input resumed without a consumer? Did write return false? Is the producer waiting for drain after a sink failure? Did `_write()` omit its callback or `_final()` never complete? Is CPU parsing blocking callback progress? What do error/close/finish and public queue state show? A writableLength plateau suggests retained work but does not prove a filesystem/network cause.

A zero threshold provides frequent feedback, not zero-memory operation. A never-draining peer requires an owner-defined termination policy. Writes after end/destroy have error contracts. Merely attaching error listeners to source and destination does not coordinate a piped chain. Detailed composition, cancellation and early iteration termination remain Chapter 09 objectives.

## 12. Reliable references and execution evidence

Context7 `/nodejs/node` and the official v26.4.0 stream API source documentation were checked on 2026-10-12 for Readable modes/consumption, Writable admission/pressure and lifecycle implementer contracts. Public-contract references:

- [Stream API — pinned Node v26.4.0 source documentation](https://github.com/nodejs/node/blob/v26.4.0/doc/api/stream.md): states, consumption, accounting, write/drain, lifecycle and implementer methods.
- [Stream API — v24 documentation line](https://nodejs.org/docs/latest-v24.x/api/stream.html): a separate reference line, not an installed-runtime or project-runtime claim.
- [Node backpressure guide](https://nodejs.org/en/learn/modules/backpressuring-in-streams): motivation; its measurements are not results from these examples.
- [EventEmitter API — v26.4.0](https://github.com/nodejs/node/blob/v26.4.0/doc/api/events.md): dispatch and error contracts.

Each executable block uses standalone ESM .mjs, built-ins, finite inputs and explicit thresholds. Verification environment on 2026-10-12: Node v26.4.0, V8 14.6.202.34-node.21, libuv 1.52.1, darwin/arm64. The exact lesson blocks were extracted into temporary files and run in separate processes with a timeout. The following table records commands and observed assertions after execution.

**Executed: 13 scenarios passed (four exact lesson blocks); every process exited 0 with no stderr.** Intentional errors were asserted as expected outcomes, not ignored.

| Command | Observed assertions |
|---|---|
| `node readable-modes.mjs events` | Values 1–5 once; ended/destroyed true; observed requests 5. |
| `node readable-modes.mjs pull` | Values 1–5 once; ended/destroyed true; observed requests 5. |
| `node readable-modes.mjs iterate` | Values 1–5 once; ended/destroyed true; observed requests 5. |
| `node writable-pressure.mjs respect` | Submitted 6; processed 6; peak 4 bytes; drains 6; events finish → close. |
| `node writable-pressure.mjs ignore` | Submitted 6; processed 6; peak 24 bytes; drains 0; events finish → close. |
| `node writable-pressure.mjs fail` | Submitted 3; processed 2; peak 4 bytes; drains 2; events error → close. |
| `node threshold-units.mjs bytes` | Accounted 8 bytes; first return false; finish true. |
| `node threshold-units.mjs objects` | Accounted 2 objects; first return true; finish true. |
| `node threshold-units.mjs text` | Seven input bytes, three UTF-16 code units. |
| `node writable-lifecycle.mjs normal` | Events final → finish → close; cleanup once; owned false; writes 1; finish true. |
| `node writable-lifecycle.mjs destroy` | Events error:stopped → close; cleanup once; owned false; writes 0; finish false. |
| `node writable-lifecycle.mjs final-fail` | Events final → error:final failed → close; cleanup once; owned false; writes 1; finish false. |
| `node writable-lifecycle.mjs no-close` | Events final → finish; cleanup once; owned false; writes 1; finish true. |


Limits: one local runtime/platform, synthetic sinks/scheduling and logical ownership. No actual socket stall, real descriptor cleanup, RSS bound, throughput benchmark, crash durability, cross-platform guarantee, learner competence or project implementation is established. Request counts are observations, not portable guarantees. Only these fixtures were executed; the learner has not completed the following exercises.

## 13. Exercises and future self-assessment rubric

1. **Admission trace:** threshold 8, delayed sink, submit chunks 3/3/3 bytes before callbacks. Expected true/true/false, retained length 9; third chunk admitted. Explain why retry duplicates data. Credit requires separating pressure from success.
2. **Object budget:** an object owns a 10 MiB Buffer. Explain why object threshold 2 is not a byte budget. Credit requires value counts, referenced memory and producer storage; do not infer RSS.
3. **Async events:** replace a synchronous consumer with an async data listener. Identify overlapping work and compare sequential iteration. Credit requires acknowledging prefetch even with iteration.
4. **EOF without consumption:** push a Buffer and null into a Readable before consumption, then consume. Expected model: producer EOF differs from observed end; buffered data must be consumed. Record runtime/observations without timing constants.
5. **Mutation:** hold a Writable callback, submit a Buffer and mutate it before processing reads it. Predict retained-reference mutation; compare copying and its allocation cost.
6. **Failed export:** error then close with no finish. Explain why close cannot report success; identify evidence for write progress, finalization and cleanup without choosing product architecture/retry policy.
7. **Producer review:** custom source ignores push(false). Identify missing cooperation; explain why Readable drain is wrong and how async wrappers prevent overlapping reads/report failure.

Future self-assessment: explain all fixture outcomes, distinguish source/sink/resource boundaries, identify a hidden queue and state experiment limits. This rubric is for later study, not present grading.

## 14. Coverage gaps and editorial checklist

- [x] Progressive terminology, incremental model and consumption alternatives.
- [x] Modes/states, demand, read null result, EOF and object mode.
- [x] Write/false/drain, producer cooperation, callbacks and failure paths.
- [x] Threshold units and memory-limit caveats; byte/object/string examples.
- [x] End/finish/close/destroy, finalization and async cleanup trace.
- [x] Backend symptoms, async-listener concurrency and aliasing.
- [x] Executable examples, expected/observed evidence and version limits.
- [x] Exercises/rubric, references and coverage reconciliation.
- [x] Learner editorial approval — explicit confirmation on 2026-10-13.

Gaps: no exhaustive API inventory, `_writev`/cork tuning, native C++ stream internals, production recovery or assessed competency. Transform/Duplex composition, pipeline/finished, cancellation, early consumer exit and Node/Web interoperability belong to Chapter 09. D03 catalog/PRDs and implementation remain not_started.

**Author review outcome — 2026-10-12:** checked against `docs/quality-gates.md` and the approved D03-C08 scope. Progressive teaching, consumption/accounting/pressure mechanisms, finite failure and lifecycle examples, references, exercises and evidence limits are present. The four exact code blocks passed thirteen scenarios; canonical state, indexes and coverage matrix reconciled. Learner editorial approval recorded on 2026-10-13.

**Review outcome:** learner explicitly approved Chapter 08 on 2026-10-13. Chapter 09 is now authored/in_review; review Chapter 09 before Chapter 10.
