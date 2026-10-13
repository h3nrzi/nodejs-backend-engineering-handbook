# Chapter 14 — V8 Execution, Memory and Garbage Collection

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C14  
**Editorial status:** approved_by_learner — learner explicitly approved on 2026-10-13.  
**Prerequisite approvals:** D03 Chapters 01–13 learner-approved; Chapter 13 approved explicitly on 2026-10-13.  
**Educational execution:** Section 18 records six independently launched Node v22.16.0/Linux x64 example fixtures, each checked three times (18 successful process runs); GC traces and optimization events are version-specific observations, not contractual results.  
**Study assessment / project implementation:** deferred / not_started.

## 1. Learning outcomes and boundaries

By the end of this chapter, the learner should be able to:

1. Describe JavaScript execution in V8 using **parsing, bytecode execution, feedback, optimization and deoptimization** as separate mechanisms rather than claiming a fixed compiler path.
2. Explain why object **shapes** (V8 *Maps* / hidden classes) and property-access feedback can affect optimizations without promising a universal speed advantage.
3. Distinguish heap **allocation**, reachable **retention**, unreachable garbage and actual OS-resident memory.
4. Relate generational garbage collection, concurrent/incremental work and possible stop-the-world pauses to observed latency, while separating the mental model from implementation details that change across V8 versions.
5. Correctly interpret Node's `heapUsed`, `heapTotal`, `external`, `arrayBuffers` and `rss`, including per-Worker and process-wide accounting.
6. Build limited, reproducible memory diagnostics using `process.memoryUsage()`, `node:v8`, optional `--expose-gc` and `node:perf_hooks` without mistaking debug measurements for production proof.
7. Evaluate the trade-offs of heap limits, heap snapshots and GC instrumentation, and avoid confusing allocation churn, memory retention, external memory and CPU symptoms.

**Prerequisites:** [D03 Chapter 01 — Runtime Architecture](01-runtime-architecture-and-execution-boundaries.md), [Chapter 06 — Buffers, Bytes and Text Encoding](06-buffers-bytes-and-text-encoding.md), [Chapter 11 — Worker Threads and Data Ownership](11-worker-threads-and-data-ownership.md); D01 memory lifetimes and algorithmic analysis; D02 objects/prototypes, closures and asynchronous JavaScript.

**Scope:** Node/V8 runtime mechanics for education, not a mandate to optimize every application, select a heap-size flag, add a profiling service, adopt an object layout, or implement a product. Comprehensive measurement and load testing belong to D12, production observability to D16, and a deeper diagnostic tooling survey to D03 Chapter 17. No performance target or capacity limit for any approved PRD is chosen here.

## 2. First principles: where JavaScript execution time goes

Source code is not executed as physical JavaScript “instructions” by the operating system. Node embeds V8, which parses JavaScript, creates internal representations and runs it in an execution engine. On commonly used V8 builds, an interpreter and optimizing compilation tiers work together, with runtime feedback permitting assumptions specialized to observed operations.

A useful *conceptual* model:

```text
JavaScript source
       |
parse / compile internal representation
       |
interpreter / baseline execution
       |
runtime feedback from types, shapes, call sites
       |
candidate optimized machine code
       |
guard assumption becomes invalid? -> deoptimize -> continue correctly
```

This is **not** a promise that every function runs each tier in this order. V8 has evolved across Ignition, Sparkplug, Maglev and TurboFan implementations; different Node releases, CPU targets, flags, hotness and workloads may select different pathways. The JavaScript language specifies observable behavior, **not** whether a particular function was JIT compiled, when optimization occurs or which guard triggers deoptimization.

A function taking 20 ms can spend time in JS instructions, allocation, garbage collection, native addon calls or related runtime work. Recompilation/deoptimization traces are **possible causes**, not sufficient proof of a production latency regression. A microbenchmark without workload context rarely identifies actual backend bottlenecks.

## 3. Shapes, inline caches and deoptimization

JavaScript object properties are dynamic, but an engine benefits from knowing how objects commonly look. V8 calls its shape metadata **Maps** (often called *hidden classes*); they are **not** JavaScript's `Map` collection type.

Consider:

```js
const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 };
console.log(a.x + a.y, b.x + b.y); // both 3
```

These objects expose the same named properties but were created through different insertion orders. V8 may assign different internal shapes. At a frequently executed property-access site, an **inline cache** can specialize access using observed shape/type feedback. If new objects arrive with a different shape or value representation, optimized code may need additional checks, a more general path or deoptimization. Such changes preserve program correctness but can alter CPU usage.

Do not assert that every property addition automatically “destroys performance,” or that every different property insertion order forces a deopt. Engines adapt, and the behavior depends on actual optimization tier and input distribution. [V8 fast properties](https://v8.dev/blog/fast-properties) and [V8 hidden classes](https://v8.dev/docs/hidden-classes) explain the internals, with implementation-version caveats.

**Good application practice:** choose data representations that express the domain clearly and measure the actual workload. It is usually counterproductive to distort product or domain types solely to chase an unverified hidden-class optimization.

## 4. Worked example A — observe *one* optimization and deoptimization trace

Save as `e-shapes.mjs`:

```js
function total(record) { return record.x + record.y; }

const a = { x: 1, y: 2 };
let checksum = 0;
for (let i = 0; i < 250000; i++) checksum += total(a);

const b = { y: 2, x: 1 };
checksum += total(b);
console.log(JSON.stringify({
  checksum, sameResult: total(a) === total(b)
}));
if (checksum !== 750003) process.exitCode = 1;
```

Run a *separate process* with V8's diagnostic flags:

```sh
node --trace-opt --trace-deopt e-shapes.mjs
```

In **three local Node v22.16.0/Linux runs**, diagnostic output included `total` being marked/compiled/optimized by **TURBOFAN**, followed by a `deopt-eager` record whose reason was **`wrong map`** for `total`. The script then printed:

```json
{"checksum":750003,"sameResult":true}
```

**What this establishes:** in these runs the engine optimized one hot property-reading function, then invalidated a shape-dependent specialization after a different layout. The numeric result remained correct.

**What this does not establish:** a measurable production slowdown, a universal trigger on every V8 build, the full optimization lifecycle or that a particular object layout is best. You can also see deopt records for surrounding code; do not automatically attribute those records to `total`. The trace flags and text are **V8 diagnostics**, not stable application interfaces. CPU profiling and representative workload comparisons must come before performance claims.

## 5. Memory anatomy: heap is not the whole process

Most ordinary JS objects and arrays are managed in V8's garbage-collected heap, but a Node process consumes more resources:

```text
Process address space / resident pages (RSS is an OS memory measurement)
├─ V8 managed heap: ordinary JS objects, contexts and other engine allocations
├─ V8 code and runtime metadata; heap spaces and reservations
├─ ArrayBuffer / Buffer backing stores and other external/native allocations
├─ Stacks for main and other OS threads
├─ Native libraries, file/network buffers, allocator bookkeeping
└─ Other runtime/OS-managed committed memory
```

This is a **classification aid**, not a partition in which the reported counters can be added. For example, `arrayBuffers` is **already included in** `external` in the documented Node memory counters, and RSS overlaps the resident portions of many categories. `heapUsed + external + rss` is **double/triple counting**, not total memory.

A small wrapper JS `Buffer` object can refer to a large byte backing store that is **not charged as an equivalent increase in `heapUsed`**. Conversely, a large graph of small JS objects can increase `heapUsed` substantially without producing a correspondingly large `arrayBuffers` number.

### Node process counters

| Metric | Broad documented meaning | Cannot conclude |
|---|---|---|
| `heapUsed` | Bytes used in V8's managed heap | Complete process footprint, or that all used bytes are reachable leaks |
| `heapTotal` | V8 managed heap allocation/reservation statistic | Resident OS RAM or hard configured limit |
| `external` | Native/external memory associated with JS-managed objects | A disjoint number to add on top of `arrayBuffers` |
| `arrayBuffers` | Memory for `ArrayBuffer`/`SharedArrayBuffer` including Node Buffers | All native memory or a guaranteed precise physical-RAM measurement |
| `rss` | Process resident set size: pages resident in RAM | Only JavaScript heap, or proof of heap retention |
| `v8.getHeapStatistics().heap_size_limit` | Current V8 heap limit | Process RAM quota, container memory limit or leak threshold |

In **Worker threads**, Node documents `rss` as referring to the **entire process**, whereas the other `process.memoryUsage()` fields refer to the **current thread**. A per-Worker heap graph cannot be compared directly with process RSS as though both measure the same scope. Node notes that obtaining full memory usage by iterating pages can be costly; `process.memoryUsage.rss()` provides faster RSS-only sampling. See [Node process memoryUsage](https://nodejs.org/download/release/v22.16.0/docs/api/process.html#processmemoryusage).

## 6. Worked example B — retained object graph versus released graph

Garbage collection identifies **reachability**, not whether an object is “still useful to the business.” If a global `Map`, closure, listener or cache references data that will never be used again, that data can remain **reachable** and cannot be reclaimed merely because a request finished.

Save as `a-retention.mjs` and launch with `node --expose-gc a-retention.mjs`:

```js
import { memoryUsage } from 'node:process';
if (typeof globalThis.gc !== 'function')
  throw new Error('run with --expose-gc');

function settle() { gc(); gc(); return memoryUsage().heapUsed; }
const base = settle();

globalThis.retained = Array.from({ length: 120_000 }, (_, i) => ({
  id: i, label: `item-${i}`, ready: true
}));
const kept = settle();
const count = globalThis.retained.length;

delete globalThis.retained;
const released = settle();

const mb = n => +(n / (1024 ** 2)).toFixed(2);
const result = {
  count, baseMiB: mb(base), keptMiB: mb(kept),
  releasedMiB: mb(released),
  gainedMiB: mb(kept - base),
  droppedMiB: mb(kept - released)
};
console.log(JSON.stringify(result));
if (result.gainedMiB < 3 || result.droppedMiB < 3)
  process.exitCode = 1;
```

Three observed runs produced approximately:

```json
{"count":120000,"baseMiB":4.05,"keptMiB":14.12,"releasedMiB":4.05,"gainedMiB":10.07,"droppedMiB":10.06}
```

**Interpretation:** while `globalThis.retained` referenced the objects, the retained object graph occupied about **10 MiB** more JS heap on this machine. After deleting that root and explicitly requesting GC twice, `heapUsed` dropped by roughly the same amount.

**Limits:** `--expose-gc` and `gc()` are **educational/debug controls**, not a production memory-management algorithm; a GC request does not specify an engine-wide, universal “fully compact and return every page to the OS” outcome. The exact byte count is affected by object representations, metadata and engine version. `heapUsed` falling does **not** promise RSS falls. Root references elsewhere, WeakRefs, finalization and native resources have additional lifetime rules. The check's 3 MiB thresholds are **only for the bounded fixture**, not product capacity limits.

## 7. Worked example C — large Buffer backing store is externally accounted

Save as `b-external.mjs`:

```js
import { memoryUsage } from 'node:process';
const report = () => memoryUsage();
const before = report();
const bytes = 32 * 1024 * 1024;
const backing = Buffer.alloc(bytes, 0x5a);
const after = report();
const mb = n => +(n / (1024 ** 2)).toFixed(2);

const result = {
  byteLength: backing.byteLength,
  heapUsedDeltaMiB: mb(after.heapUsed - before.heapUsed),
  externalDeltaMiB: mb(after.external - before.external),
  arrayBuffersDeltaMiB: mb(after.arrayBuffers - before.arrayBuffers),
  rssDeltaMiB: mb(after.rss - before.rss),
  firstByte: backing[0]
};
console.log(JSON.stringify(result));
if (result.arrayBuffersDeltaMiB < 30 || backing[0] !== 0x5a)
  process.exitCode = 1;
```

Run `node b-external.mjs`. In three local runs:

```json
{"byteLength":33554432,"heapUsedDeltaMiB":0,"externalDeltaMiB":32,"arrayBuffersDeltaMiB":32,"rssDeltaMiB":32,"firstByte":90}
```

The allocation touched the 32 MiB backing store, and the accounting reflected it predominantly in `external`/`arrayBuffers` rather than `heapUsed`. In this Linux execution, RSS also rose by about 32 MiB.

**Important:** `external` and `arrayBuffers` overlap by design. Do not add both. Do not assume *all* Buffer-related memory is always attributed identically on embedded Node builds or every OS. The code is bounded by a deliberately chosen **demo** size; allocating large Buffers in a service requires product input limits and resource planning. A process with apparently stable heapUsed can still run out of process/container memory due to external allocations.

## 8. Reachability, GC generations and pauses

Garbage collection does **not** mean that every program allocation triggers one stop-the-world sweep, or that the engine immediately returns all freed pages to the OS.

- **Roots and reachability:** V8 traces reachable objects via runtime roots and references; unreachable JS objects can become eligible for reclamation. “No longer needed by the business” is not a root-analysis rule.
- **Generational hypothesis:** many objects become unreachable quickly. V8 uses young/new and old generations and different strategies to make frequent short-lived allocations relatively efficient.
- **Allocation, promotion and long-lived objects:** surviving young objects can be promoted or placed/retained in older spaces under implementation-dependent behavior.
- **Incremental/concurrent work:** V8 may perform marking/sweeping work incrementally or concurrently to reduce pause impact, but some work still stops JavaScript execution on a given isolate.
- **Compaction:** some garbage-collection work may relocate live objects to reduce fragmentation. Reclaimed object slots and OS-resident page release are **not** synonymous.

Do not teach “GC pauses happen only when the heap reaches its max,” “the heap always shrinks immediately after a major GC,” or “all retained memory is a bug.” Caches can deliberately retain data; the question is whether retention is **bounded and justified**, and whether it matches usage and product expectations.

Generational layout and collection terminology depend on exact V8 revisions; V8's [Orinoco GC overview](https://v8.dev/blog/trash-talk) is a valuable *conceptual* explanation but should not be treated as a current source-level description of every Node release.

## 9. Worked example D — allocation churn can disappear after GC

Churn and retention are different phenomena. A request can create many temporary objects, increase GC work/CPU, and leave little surviving heap once all references are gone.

Save as `f-churn.mjs`:

```js
import { memoryUsage } from 'node:process';
if (!globalThis.gc) throw Error('run with --expose-gc');
gc(); gc();
const start = memoryUsage().heapUsed;

function produceThenDrop() {
  let checksum = 0;
  for (let batch = 0; batch < 8; batch++) {
    const disposable = Array.from({ length: 25000 }, (_, i) => ({
      id: i + batch * 25000, field: 'temporary-' + i
    }));
    checksum += disposable.length;
  }
  return checksum;
}

const checksum = produceThenDrop();
gc(); gc();
const end = memoryUsage().heapUsed;
console.log(JSON.stringify({
  temporaryObjects: checksum,
  postGcDeltaMiB: +((end - start) / 1048576).toFixed(2)
}));
if (checksum !== 200000) process.exitCode = 1;
```

Run `node --expose-gc f-churn.mjs`. In three observed runs, `temporaryObjects` was **200000** and `postGcDeltaMiB` was **0**, **0.01**, **0.01**.

**Interpretation:** this function created substantial temporary allocation activity, but after returning and explicit GC there was almost no lasting change in the sampled managed heap. An application can nevertheless experience GC-related latency or CPU pressure from the allocation *rate*.

**Counterexample:** if a listener, global cache or timer closure stores references to each batch, the same business code can show retention instead. This example's result is **not** a proof that those 200,000 objects caused zero CPU/GC cost; the fixture measures no allocation rate or pauses.

The two GC calls are an experimental device, not a recommended way to force memory to “stabilize” during production request handling.

## 10. Measuring GC events is not measuring every cause of latency

Node's `PerformanceObserver` can expose `gc` performance entries, including durations and `detail.kind`. An observer itself receives notifications asynchronously and has buffer/sampling limitations. A recorded entry's duration is evidence about that event, **not** a complete causal decomposition of request latency.

Save as `c-gc-events.mjs`:

```js
import { PerformanceObserver } from 'node:perf_hooks';
if (typeof gc !== 'function') throw Error('run with --expose-gc');

const events = [];
const observer = new PerformanceObserver(list => {
  for (const e of list.getEntries()) {
    if (e.entryType === 'gc')
      events.push({
        kind: e.detail?.kind,
        durationMs: +e.duration.toFixed(3)
      });
  }
});
observer.observe({ entryTypes: ['gc'] });

const garbage = Array.from({ length: 30000 }, (_, i) => ({
  index: i, payload: `value-${i}`
}));
console.log('allocated', garbage.length);

setImmediate(() => {
  gc();
  setImmediate(() => {
    observer.disconnect();
    const result = {
      events: events.length,
      kinds: [...new Set(events.map(x => x.kind))].sort(),
      durationMsTotal: +events
        .reduce((sum, e) => sum + e.durationMs, 0).toFixed(2)
    };
    console.log(JSON.stringify(result));
    if (result.events === 0) process.exitCode = 1;
  });
});
```

Three runs of `node --expose-gc c-gc-events.mjs` yielded:

```text
allocated 30000
{"events":4,"kinds":[1],"durationMsTotal":3.51}
allocated 30000
{"events":4,"kinds":[1],"durationMsTotal":3.69}
allocated 30000
{"events":4,"kinds":[1],"durationMsTotal":6.05}
```

The recorder saw **four `gc` entries** in each trial, each classified by the runtime's reported `kind` value `1` in this trace. **Do not infer that the explicit `gc()` call caused exactly four collections**, that `kind=1` describes a universal full-heap event, or that summing these events is total production GC cost. Some GC events may be outside the observer's reporting window, and event semantics/flags can change.

For production-grade attribution, correlate actual request latency with an appropriate diagnostic signal, the CPU profile, heap trend and external work. This chapter demonstrates an observer, not a deployable monitoring platform.

## 11. V8 heap spaces are diagnostics, not permanent schema

`v8.getHeapStatistics()` and `v8.getHeapSpaceStatistics()` expose aggregate and per-space measurements. Space names, enumeration order and even the presence of a space are **not stable across V8 versions**, as Node's official documentation explicitly notes.

Save as `d-space.mjs`:

```js
import { getHeapStatistics, getHeapSpaceStatistics } from 'node:v8';

const stats = getHeapStatistics();
const spaces = getHeapSpaceStatistics();
const result = {
  heapSizeLimitMiB: Math.round(stats.heap_size_limit / 1048576),
  reportedSpaces: spaces.length,
  allNamed: spaces.every(s => typeof s.space_name === 'string'),
  sumSpaceUsed: spaces.reduce((sum, s) => sum + s.space_used_size, 0),
  reportedHeapUsed: stats.used_heap_size
};
console.log(JSON.stringify(result));
if (!result.allNamed || result.reportedSpaces === 0 ||
    result.heapSizeLimitMiB <= 0) process.exitCode = 1;
```

Run `node d-space.mjs`. Each of three runs reported an example **2096 MiB heap size limit** and **11 heap spaces**, with `allNamed: true`. In these samples `sumSpaceUsed` was **4,482,112** bytes versus `reportedHeapUsed` **4,460,536** bytes.

**Why sums differ:** reading separate statistics is not an atomic snapshot of all V8 memory; the APIs can cover different accounting categories, and activity can occur between measurements. **Do not require exact equality** or treat a space list as a hardcoded public taxonomy.

A reported `heap_size_limit` is a V8 heap constraint, not the process's OS/container RAM budget and not the total of all native/Buffer allocations. Different runtime flags/host constraints yield different limits.

## 12. Why more heap is not always the solution

Node exposes options such as `--max-old-space-size` and `--max-semi-space-size` that can influence V8 heap management, but the outcome depends on Node/V8 revision, workload, available memory and platform limits. These flags are **runtime knobs**, not approved memory budgets for a project.

- A **larger heap** may reduce collection frequency for some workloads, but allow more retained data and potentially higher pause or process memory costs.
- A **smaller heap** may collect more often or encounter an out-of-memory failure sooner; this can reveal retention but is not safe to treat as a universal leak test.
- **External/Buffer memory** can exhaust the process or container despite managed heap metrics remaining relatively small.
- **Allocation churn** can increase CPU/GC effort without steadily growing the post-GC retained graph.
- **Process RSS** can remain high after objects become unreachable because allocator fragmentation, page reuse and OS accounting differ from heap reachability.

The right question is **which resource is exhausted and why**, not “how large can we make V8's heap?” Test a candidate flag only with a representative workload, established product requirements and bounded failure expectations. Don't silently change accepted upload sizes, concurrency or product scope to match a technical knob.

## 13. Heap snapshots and CPU profiles: powerful but intrusive

A heap snapshot records an engine-specific representation of object relationships that may help identify **retaining paths**: e.g. a global cache → list → unused request state. But a snapshot is **not** an image of all native memory, and its format is not a stable application protocol.

Official Node v22 docs warn that `v8.getHeapSnapshot()` / `writeHeapSnapshot()` can:
- Block the event loop while creating the snapshot.
- Require memory roughly **twice the live heap** while generating it, creating an out-of-memory/kill risk.
- Contain **sensitive application data** including strings/object contents.

Do **not** turn on snapshots automatically for a busy production service or persist them in a public repository. Limit who can capture/read them and clean up after diagnostics. Use a safe reproduction or a controlled diagnostic environment where possible.

For CPU investigations, a **CPU profile** can identify hot JavaScript/native frames; a **heap snapshot** helps inspect retaining objects; **GC event entries** show some collector-related intervals; **RSS/external graphs** reveal footprint changes. They answer different questions. Node's inspector and diagnostic tooling are covered in Chapter 17, while sustained profiling/production incident policy belongs to D12/D16.

[Node v22 V8 API](https://nodejs.org/download/release/v22.16.0/docs/api/v8.html).

## 14. Worker memory and isolate boundaries

Chapter 11 established that Workers run JavaScript in separate isolates/threads inside one process. This matters when interpreting memory telemetry:

- Each Worker has its **own isolate and managed heap**. A parent-thread `heapUsed` chart does not include every Worker's JS heap as one combined number.
- Node documents `process.memoryUsage().rss` as **whole-process** even when read inside one Worker.
- Shared ArrayBuffers and external backing stores can affect process memory in ways not captured by summing two per-thread heap charts.
- A Worker can terminate and release much of its local state, while process-level allocator and native memory behavior do not promise an immediate proportional RSS decrease.
- `resourceLimits` for a Worker apply to supported V8 resources and **are not** complete native/external or OS-process limits.

This section is a conceptual comparison grounded in documented Node APIs; the six educational fixtures **do not directly test two-Worker memory accounting**. Do not report an invented Worker memory sample. Product-level isolation, container budgets and process telemetry require their own evidence.

## 15. Backend case study: stable heapUsed, rising RSS, slow requests

A Node report-processing service exhibits increasing RSS and intermittent slow requests. Its dashboard says `heapUsed` is stable. A proposed “fix” increases `--max-old-space-size`, and another proposes clearing the entire module cache.

These are **hypotheses**, not root-cause evidence. Several competing mechanisms fit:

1. Large `Buffer`/`ArrayBuffer` payloads or native allocations grow; `heapUsed` does not reflect their full backing stores.
2. Allocator fragmentation or retained native memory keeps RSS elevated despite stable used heap.
3. Short-lived JavaScript object churn triggers GC work, producing CPU/latency without sustained retention.
4. A long-lived closure/cache retains JavaScript graphs, but the chart's sampling window, baseline or scope hides the trend.
5. Worker heaps or native components consume process memory outside the parent thread's `heapUsed`.
6. CPU-heavy parsing or other work delays the event loop independently of memory pressure.

**Evidence plan:**
1. Record precise Node/V8/OS/build information, process/container limits and Worker count, without exposing secrets.
2. Capture `heapUsed`, `heapTotal`, `external`, `arrayBuffers` and **RSS** with explicit per-thread versus process scope and timestamps. Avoid summing overlapping counters.
3. Compare equivalent workload intervals and post-GC retained trends in an **isolated experiment**, not by forcing global GC during live requests.
4. Correlate memory with allocations, pauses/CPU, event-loop delay, active workload and external/native resource counts; name missing signals.
5. Inspect retaining paths only if managed-heap growth warrants it. If external memory dominates, a heap snapshot alone may not identify the backing allocation owner.
6. Test one change at a time under bounded workload and product constraints; record tail-latency and memory consequences, not only averages.

A heap flag, explicit GC, data-structure change or Worker topology is a **technical candidate**, not an approved change to any product PRD. If the intended product would now accept more data or guarantee higher concurrency, obtain product approval separately.

## 16. Frequent mistakes and corrective models

| Misconception | Correction |
|---|---|
| “Node is single-threaded, so V8 cannot do anything concurrently.” | JS execution/isolate boundaries are distinct from V8 concurrent GC/compiler and native/OS work. |
| “V8 always interprets once, then always compiles with TurboFan.” | Execution tiers and thresholds are version/runtime dependent. |
| “Every different object shape causes slow code.” | Shape feedback may affect specialization; only a scoped trace shows what happened. |
| “Deoptimization changes JavaScript results.” | Correct deoptimization preserves semantics while changing execution strategy. |
| “A successful `gc()` returns all memory to the OS.” | GC reclaims unreachable objects under implementation rules; RSS may remain high. |
| “Stable `heapUsed` proves no memory problem.” | External/native allocations or other Worker heaps can grow. |
| “`external + arrayBuffers + rss` gives total memory.” | These metrics overlap and measure different scopes. |
| “`heapTotal` is the hard V8 memory limit.” | Compare with `heap_size_limit` and OS/process constraints separately. |
| “All frequent allocations are memory leaks.” | Churn can be reclaimed but still impose CPU/GC overhead. |
| “GC log entries uniquely identify the cause of a slow request.” | Need timing correlation and competing explanations. |
| “A heap snapshot sees all native memory safely.” | Snapshot has scope, pause, privacy and OOM risks. |
| “The main thread's `heapUsed` includes every Worker.” | Worker-local heap metrics and whole-process RSS differ. |
| “A bigger `--max-old-space-size` solves every OOM.” | Managed heap flags don't eliminate external/native/process memory costs. |
| “The demo's 32 MiB Buffer or 120k objects are product limits.” | All sizes are bounded **educational fixtures**, not approved product policy. |

## 17. Exercises and future self-assessment — not administered

1. **Shape/JIT:** two objects have the same values with different property insertion order. Must V8 deopt? **Answer:** no universal guarantee. Identify shape feedback and use measured, versioned traces.
2. **Cache retention:** a global cache retains finished request records. Why doesn't normal GC “fix” it? **Answer:** references remain reachable; evaluate whether retention is intentional, bounded and releasable.
3. **Churn:** 200k temporary objects leave stable post-GC heap. Did they cost zero CPU? **Answer:** no; allocation and collection can still consume time.
4. **Metrics:** `heapUsed` +2 MiB, `arrayBuffers` +32 MiB, `external` +32 MiB, RSS +34 MiB. Should you add them? **Answer:** no; categories overlap and scopes differ.
5. **Worker metrics:** why can Worker-local heapUsed appear stable while overall process RSS grows? **Rubric:** multiple isolates/heaps, external/native allocations, process-wide RSS and allocator effects.
6. **GC observation:** an event observer reports four GC entries and ~4 ms total in a test. Is that the request's GC pause budget? **Answer:** not without aligned observation windows, additional sampling limitations and causal attribution.
7. **Heap limits:** why is `heap_size_limit` not equivalent to container memory? **Answer:** V8 managed heap is one component of process memory.
8. **Heap snapshot:** identify two production risks of obtaining a snapshot. **Answer:** pause/event-loop blocking and up-to-roughly-double heap memory, plus sensitive data exposure.
9. **Incident diagnosis:** stable `heapUsed` but climbing RSS—propose an evidence plan that distinguishes external memory, fragmentation, allocation churn and Worker heaps. **Rubric:** collect overlapping metrics carefully, workload-aligned CPU/GC evidence, state limitations.
10. **PRD boundary:** may a runtime benchmark silently increase a customer-visible dataset limit? **Answer:** no; product boundaries require explicit learner approval at kickoff.

Learner answers, grading and assessment are **deferred**. These exercises are future-study prompts and do not record actual competency or production implementation.

## 18. Verification manifest, official references and coverage review

**Docs checked 2026-10-13:**
- [Node.js v22.16.0 `process.memoryUsage()`](https://nodejs.org/download/release/v22.16.0/docs/api/process.html#processmemoryusage), including Worker scope and overlapping external/ArrayBuffer accounting.
- [Node.js v22.16.0 `node:v8` APIs](https://nodejs.org/download/release/v22.16.0/docs/api/v8.html), including unstable heap-space taxonomy, heap statistics, heap snapshot pause/memory caveats.
- [Node.js v22.16.0 performance hooks](https://nodejs.org/download/release/v22.16.0/docs/api/perf_hooks.html), including GC PerformanceObserver entries.
- [V8 hidden classes](https://v8.dev/docs/hidden-classes), [fast properties](https://v8.dev/blog/fast-properties), [V8 garbage collector overview](https://v8.dev/blog/trash-talk). V8's published internals are **explanatory source material**, not a guarantee about the precise native code path in Node's V8 12.4 build.

**Executed environment:** 2026-10-13; Linux x64, Node **v22.16.0**, V8 **12.4.254.21-node.26**, libuv **1.49.2**. Each of six ESM fixtures was run three independent times: **18/18 process invocations completed with expected outcomes**. `--expose-gc` was used **only** for fixtures requiring forced GC, and `--trace-opt --trace-deopt` **only** for the version-specific optimization trace. All outputs were bounded and synthetic; no heap snapshots of user data, production process kill or external network calls.

| Fixture / exact command | Three-run observation | What it cannot prove |
|---|---|---|
| `node --trace-opt --trace-deopt e-shapes.mjs` | `total` optimized by TurboFan and later deoptimized for `wrong map` in all three; result `750003` and sameResult true | Cross-version deopt guarantee or business performance regression |
| `node --expose-gc a-retention.mjs` | 120,000 retained objects; baseline ~4.05 MiB; retained ~14.12 MiB; after deleting root ~4.05 MiB, in all three | Exact object sizes, OS RSS release, GC timing in services |
| `node b-external.mjs` | 32 MiB Buffer; +32 MiB external and arrayBuffers; +32 MiB RSS; ~0 MiB heapUsed delta in all three | General OS page accounting or native allocation totals |
| `node --expose-gc f-churn.mjs` | 200,000 short-lived objects per run; post-GC heap difference 0, 0.01, 0.01 MiB | Zero allocation/GC CPU cost or every workload's reachability |
| `node --expose-gc c-gc-events.mjs` | Four GC observer entries per run, `kind` 1; cumulative reported durations ~3.51, ~3.69 and ~6.05 ms | Complete GC timeline, identification of individual explicit GC calls or production latency attribution |
| `node d-space.mjs` | 11 named spaces, ~2096 MiB heap-size limit; sampled sumSpaceUsed 4,482,112 versus used_heap_size 4,460,536 | Stable space names, equality of independently sampled counters or OS memory budget |

The execution checks prove **only those scoped educational observations**. They do not certify behavior under Node v26/macOS (used for prior lessons), other operating systems or CPU architectures, sustained traffic, native addon memory, container quotas, inspector overhead, diagnostic security, production tuning, learner comprehension or a completed portfolio product.

| Quality gate | Evidence and honest limits |
|---|---|
| First principles and execution model | Sections 2–3: tiers, runtime feedback, shapes and deoptimization | No full native/compiler implementation tour |
| Memory correctness and resource categories | Sections 5–9: reachability, generational GC, churn, external buffers and counters | No complete process memory accounting |
| At least two runnable examples + counterexamples | Six fixtures, 18 runs, shape deopt, retained/released graph and misleading metric comparisons | All measurements version- and workload-scoped |
| Practical diagnostic case study | Sections 13–15 on memory incidents, snapshot risk and competing causes | No production incident reproduced |
| Exercises and answer rubric | Section 17; no learner answers, grade or study phase | Assessment deferred |
| Official docs and versioned evidence | Section 18, exact Node/V8/OS and launch flags | No V8 source-revision proof |
| Coverage and project status | D03-C13 learner-approved editorially; D03-C14 authored/in_review; D03 catalog/PRDs, implementation and assessments not_started/deferred | No competency certification |

**Author quality review:** complete against `docs/quality-gates.md` and D03-C14 curriculum. **Learner editorial approval:** explicitly confirmed on 2026-10-13. The next unit is Chapter 15 — Async Context and Diagnostic Causality — to be authored for a separate learner review; Chapter 16 must not start before that review. Learning assessments and project implementation remain deferred.
