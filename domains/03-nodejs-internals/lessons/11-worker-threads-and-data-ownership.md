# Chapter 11 — Worker Threads and Data Ownership

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C11  
**Editorial status:** approved_by_learner — learner explicitly approved on 2026-10-13.  
**Prerequisite approval:** D03 Chapters 01–10 learner-approved; Chapter 10 explicitly approved on 2026-10-13.  
**Educational execution evidence:** Section 16; five standalone ESM fixtures executed three times each on Node v22.16.0 / Linux x64.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes, prerequisites and boundaries

After studying this lesson, a learner should be able to distinguish CPU-bound JavaScript offload from ordinary asynchronous I/O and libuv's native work pool; explain Worker thread and V8 isolate boundaries; select conceptually between **clone, transfer and shared memory**; reason about a worker's startup, message, error, termination and exit; and define explicit ownership, correlation and failure behavior for bounded CPU work.

Prerequisites: [Chapter 01 — Runtime Architecture](01-runtime-architecture-and-execution-boundaries.md), [Chapter 03 — Event Loop](03-event-loop-and-io-lifecycle.md), [Chapter 06 — Buffers](06-buffers-bytes-and-text-encoding.md) and [Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation](10-native-asynchronous-work-and-thread-pool-saturation.md). D01 supplies processes, threads, synchronization and memory reasoning; D02 supplies Promise, typed-array and error semantics.

**What is in this lesson:** built-in `node:worker_threads`, Worker execution and lifecycle, message exchange, data ownership, `SharedArrayBuffer` + `Atomics`, bounded scheduling reasoning, errors, termination and resource-limits caveats.

**What is not selected:** an application framework, production CPU pool, retry policy, worker count, queue system, security sandbox, resource quota or deployment topology for any handbook project. Child processes and IPC comparison receive full treatment in Chapter 12. Diagnostics and async context propagation are covered further in Chapters 15 and 17.

## 2. Why JavaScript Workers exist

A synchronous CPU-intensive calculation running on a JavaScript execution thread occupies that thread until it returns or suspends. Timers, completed I/O and new callbacks cannot interrupt its running JavaScript stack on that same thread. Making the function `async` without offloading its computation does not change that fact.

Node's `Worker` class starts another thread capable of executing JavaScript in **parallel** with the parent JavaScript thread. This helps when the work is substantial **CPU-intensive JavaScript**, such as a bounded calculation or parse. It usually does not help for ordinary asynchronous file/network I/O, which Node already supports efficiently without a new JavaScript isolate.

Workers are **not** the libuv pool described in Chapter 10:
- **libuv worker pool:** handles selected built-in native operations such as asynchronous filesystem work and PBKDF2. It does not execute arbitrary JavaScript tasks merely because a caller uses `await`.
- **JavaScript Worker thread:** starts its own V8 isolate and event loop, executes user-provided JavaScript, receives messages, and has its own lifecycle and resource overhead.
- **Child process:** has a separate OS process boundary and address space. Its failure/isolation/IPC properties are not interchangeable with a Worker. Chapter 12 covers them.

The `node:worker_threads` API documentation explicitly recommends Workers primarily for CPU-heavy **JavaScript** tasks and notes that spawning a Worker per short task can cost more than the work itself. A reusable bounded dispatch pattern may make sense, but that is a **technical option**, not an approved architecture for a future PRD.

## 3. Process, thread, isolate, event loop: four different concepts

A Worker is an OS thread inside a Node process. Its V8 **isolate** has its own ordinary JavaScript object graph, global state, module instances and execution stack. It can execute JavaScript while the parent runs JavaScript elsewhere.

However, **thread does not mean independent process**. Workers share the broader process address space and resources. An isolate is not a security sandbox. Shared memory, native libraries, process-wide failures and external effects can cross the conceptual boundary. A Worker error may terminate that Worker; a native memory fault or resource exhaustion can affect the entire process.

Each Worker has its own local event loop and task scheduling. Posting a message does not give synchronous access to the other thread's stack. The sender returns; the receiving handler runs later when its environment can service the message.

Terminology:

| Term | Meaning | Frequent mistaken inference |
|---|---|---|
| `isMainThread` | Whether this execution context is the process's main JavaScript thread | Main-thread status says nothing about all OS support threads. |
| `threadId` | A Node-assigned identifier for this Worker context | It is not an OS process ID or a globally durable task ID. |
| `parentPort` | The default messaging endpoint inside a Worker | A message is not a transaction commit. |
| `workerData` | Initial data passed at Worker construction, using structured cloning and permitted transfers | Changes to the original parent object automatically remain synchronized. |
| `postMessage` | Enqueues a value for delivery via the messaging mechanism | Delivery or completion is synchronous, durable or exactly once. |
| `message`, `error`, `exit` | Distinct Worker lifecycle observations | Receiving one proves all requested tasks succeeded. |

A useful mental model:

```text
One Node process
├─ Main JS thread + V8 isolate + event loop
│    ├─ message submission
│    └─ message / error / exit observations
├─ Worker JS thread A + separate isolate + event loop
│    └─ computational JS
└─ Worker JS thread B + separate isolate + event loop
     └─ computational JS

Native facilities / libuv pool / OS services may also exist.
```

This drawing is a conceptual boundary map, not a census of native threads or internal memory. [Worker threads reference](https://nodejs.org/download/release/latest-v22.x/docs/api/worker_threads.html).

## 4. Three ways data crosses a Worker boundary

The choice affects correctness, lifetime, memory and performance.

| Method | Sender after posting | Receiver | Shared mutable state? | Main risk |
|---|---|---|---|---|
| **Structured clone** (default for cloneable data) | Original remains usable; mutations stay local | Receives a distinct cloned graph under structured-clone rules | No, for ordinary cloned `ArrayBuffer` and object graphs | Allocation/copying, serialization cost, lost custom prototypes/accessors |
| **Transfer** (list a transferable resource) | The transferred `ArrayBuffer` becomes **detached**; all sender views of it are unusable | Receives ownership of the backing store | Not ordinary simultaneous access | Use-after-transfer assumptions, detaching aliases, sending an unexpected larger buffer |
| **Share** (`SharedArrayBuffer`) | Continues to access the same shared memory | Can access the same memory | **Yes** | Data races, coordination, memory-ordering and lifetime complexity |

### Clone is not JSON serialization

Worker messaging uses the HTML structured clone algorithm, not `JSON.stringify`. It supports many native data types and cyclic graphs, but not arbitrary functions, and custom class prototypes/accessors are not generally preserved as expected. Attempts to post uncloneable values can throw a `DataCloneError`. A cloned Error object can have supported properties, but do not assume every custom property survives.

### Transfer moves the backing store, not just one view

An `ArrayBuffer` may be viewed simultaneously by several `Uint8Array`, `DataView` or Node Buffer objects. Transferring that one underlying `ArrayBuffer` detaches **all** views over it on the sending side. A later read may report zero length or throw, depending on the access.

The safe mental model is a **move** of a known-owned resource. Do not transfer a backing buffer unless its ownership and aliases are established.

### Buffer pooling matters

Node `Buffer` instances are views over underlying `ArrayBuffer` storage. Some Buffer constructors use pooled storage, and a pooled backing store may be marked untransferable. A transfer attempt can instead result in cloning; sending a pooled Buffer can copy more backing memory than expected and inadvertently include unrelated retained bytes. The docs warn against assuming all Buffers are transferable or equally cheap.

Use a dedicated `ArrayBuffer` for the examples below. `markAsUntransferable()` can protect storage from being transferred but does not make an object immutable, encrypted or otherwise secure. [Node Worker docs: transferring TypedArrays and Buffers](https://nodejs.org/download/release/latest-v22.x/docs/api/worker_threads.html#considerations-when-transferring-typedarrays-and-buffers).

## 5. Worked example A — CPU offload without blocking the main timer

Save as `a-cpu.mjs`. This one file conditionally executes either the main context or the Worker code:

```js
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import { performance } from 'node:perf_hooks';

if (!isMainThread) {
  const until = performance.now() + 140;
  let turns = 0;
  while (performance.now() < until) turns++;
  parentPort.postMessage({ kind: 'result', positiveWork: turns > 0 });
} else {
  const start = performance.now();
  const events = [];
  const worker = new Worker(new URL(import.meta.url));
  const note = name => events.push({ name, ms: Math.round(performance.now() - start) });
  const timer = setTimeout(() => note('main-timer'), 20);
  worker.on('message', value => note(value.kind));
  worker.on('error', error => {
    note('worker-error');
    console.error(error);
    process.exitCode = 1;
  });
  worker.on('exit', code => {
    clearTimeout(timer);
    note('worker-exit-' + code);
    console.log(JSON.stringify(events));
    if (code !== 0 || !events.some(e => e.name === 'result')) process.exitCode = 1;
  });
}
```

Run `node a-cpu.mjs`.

One of the checked traces was:

```json
[{"name":"main-timer","ms":24},{"name":"result","ms":173},{"name":"worker-exit-0","ms":175}]
```

The Worker spends approximately 140 ms executing CPU-heavy JavaScript **on another execution thread**. The main thread could run its 20 ms timer while that work was still in flight; `message` and `exit` were observed later. Observed timer times were around 22–25 ms in three trials, while Worker result observations were around 171–180 ms.

**What this does not prove:** that a 20 ms timer always beats a Worker, that CPU capacity is unlimited, or that spawning Workers always improves throughput. Worker startup itself takes time. Under a busy host, the main timer can be delayed as well. A Worker can also saturate the same CPU quota available to the process; this demonstration is an ordering/ownership trace, not a performance guarantee.

The CPU loop is **intentionally wasteful demonstration code**; it is finite and not a production algorithm. The example does not include request IDs or a bounded admission queue and is not production task dispatch.

## 6. Worked example B — clone versus transfer and detachment

Save as `b-clone-transfer.mjs`:

```js
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (!isMainThread) {
  parentPort.on('message', ({ kind, bytes }) => {
    if (kind === 'clone') {
      bytes[0] = 99;
      parentPort.postMessage({ kind, workerFirst: bytes[0] });
    } else if (kind === 'transfer') {
      parentPort.postMessage({ kind, received: [...bytes], receivedLength: bytes.byteLength });
    }
  });
} else {
  const worker = new Worker(new URL(import.meta.url));
  const exchange = (payload, list = []) => new Promise((resolve, reject) => {
    const onMessage = reply => { cleanup(); resolve(reply); };
    const onError = err => { cleanup(); reject(err); };
    function cleanup() {
      worker.off('message', onMessage);
      worker.off('error', onError);
    }
    worker.once('message', onMessage);
    worker.once('error', onError);
    worker.postMessage(payload, list);
  });

  try {
    const clone = new Uint8Array([1, 2, 3]);
    console.log('clone',
      JSON.stringify(await exchange({ kind: 'clone', bytes: clone })),
      'parentFirst', clone[0]);

    const buffer = new ArrayBuffer(4);
    const outgoing = new Uint8Array(buffer);
    outgoing.set([4, 5, 6, 7]);
    const alias = new Uint8Array(buffer);

    const task = exchange({ kind: 'transfer', bytes: outgoing }, [buffer]);
    console.log('after-transfer', JSON.stringify({
      senderLength: outgoing.byteLength,
      aliasLength: alias.byteLength
    }));
    console.log('worker-received', JSON.stringify(await task));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await worker.terminate();
  }
}
```

Run `node b-clone-transfer.mjs`.

The checked output in three runs:

```text
clone {"kind":"clone","workerFirst":99} parentFirst 1
after-transfer {"senderLength":0,"aliasLength":0}
worker-received {"kind":"transfer","received":[4,5,6,7],"receivedLength":4}
```

**Clone:** the Worker changes its received copy from 1 to 99, but the sender still reads 1.

**Transfer:** the Worker receives the four bytes, while **both** sender views report `byteLength === 0` because their one backing `ArrayBuffer` was detached. The message's `transferList` lists the backing buffer, not a TypedArray view. Note that adding a buffer to a transfer list **without including it in the message value** can still detach sender storage; never treat the list as an optional hint.

The tiny `exchange` helper assumes one in-flight request at a time and contains no deadline, task ID, worker-exit reconciliation or backpressure. It is deliberately **not** a general dispatcher. A Worker that exits silently could leave that Promise unresolved; production ownership and failure handling are addressed in Section 11.

## 7. Worked example C — shared memory with explicit atomic updates

Shared memory removes cloning for the shared region but introduces a concurrency correctness obligation. Without atomic operations, two Workers can read, increment and write the same location in overlapping sequences, losing increments. The JS `Atomics` API provides synchronized operations on supported typed arrays backed by `SharedArrayBuffer`.

Save as `c-shared-atomics.mjs`:

```js
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads';

if (!isMainThread) {
  const shared = new Int32Array(workerData.shared);
  for (let i = 0; i < 10_000; i++) Atomics.add(shared, 0, 1);
  parentPort.postMessage({ kind: 'done' });
} else {
  const shared = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
  const view = new Int32Array(shared);
  const completed = [];

  for (let i = 0; i < 2; i++) {
    const worker = new Worker(new URL(import.meta.url), { workerData: { shared } });
    completed.push(new Promise((resolve, reject) => {
      let received = false;
      worker.once('message', msg => { received = msg.kind === 'done'; });
      worker.once('error', reject);
      worker.once('exit', code =>
        code === 0 && received ? resolve() :
          reject(new Error('worker incomplete: ' + code)));
    }));
  }

  await Promise.all(completed);
  console.log(JSON.stringify({ expected: 20_000, observed: Atomics.load(view, 0) }));
  if (Atomics.load(view, 0) !== 20_000) process.exitCode = 1;
}
```

Run `node c-shared-atomics.mjs`. Three checked runs reported:

```json
{"expected":20000,"observed":20000}
```

Two Workers each issue 10,000 atomic increments on the **same** four-byte region. The parent checks after both Workers have reported completion and exited. The count is correct in the observed runs because increments are atomic; it is not evidence that arbitrary non-atomic shared-object updates would be safe.

**Important limitations:** `SharedArrayBuffer` itself is **shared**, never a transferable `ArrayBuffer`. It cannot be detached to move sole ownership. Race safety, signaling, memory ordering, access control and lifetime must be designed explicitly. `Atomics.wait()` can block its calling thread. Node permits it on the main thread, but doing so blocks that thread's event loop and defeats responsiveness; avoid it there. More complex protocols need coordination; a shared counter alone is not a complete concurrent queue.

A completion message is useful evidence, but `message`, `error`, `exit` and shared-memory state are distinct signals. This fixture verifies finite successful Workers; it does not implement a robust shared-memory task processor.

## 8. Worked example D — an uncaught Worker exception is not a result

Save as `d-worker-failure.mjs`:

```js
import { Worker, isMainThread } from 'node:worker_threads';

if (!isMainThread) {
  throw new Error('deliberate-child-failure');
} else {
  const worker = new Worker(new URL(import.meta.url));
  let sawError = false;
  let sawResult = false;

  worker.on('message', () => { sawResult = true; });
  worker.on('error', error => {
    sawError = error.message === 'deliberate-child-failure';
  });
  worker.on('exit', code => {
    console.log(JSON.stringify({ sawError, sawResult, exitCode: code }));
    if (!sawError || sawResult || code === 0) process.exitCode = 1;
  });
}
```

Run `node d-worker-failure.mjs`. All three observed runs reported:

```json
{"sawError":true,"sawResult":false,"exitCode":1}
```

The parent receives an `error` event for this uncaught Worker exception, then sees a nonzero Worker exit. The **parent process itself** completes the example successfully because the deliberately failed child outcome was handled and recognized as the expected negative test.

An `error` event must have an owner. Absence of a `message` is **not** proof the task had no effects: the Worker might have written data or contacted a service before throwing. A worker exit is terminal for that Worker and should not be confused with task completion. Whether an unfinished business task may be retried is a **product policy**, not a default implied by the Worker API.

## 9. Worked example E — termination is not rollback

Save as `e-terminate.mjs`:

```js
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import { performance } from 'node:perf_hooks';

if (!isMainThread) {
  parentPort.postMessage('started');
  const until = performance.now() + 500;
  while (performance.now() < until) { /* deliberate bounded CPU work */ }
  parentPort.postMessage('finished');
} else {
  const worker = new Worker(new URL(import.meta.url));
  let gotResult = false;
  worker.on('message', async message => {
    if (message === 'finished') gotResult = true;
    if (message !== 'started') return;
    await new Promise(resolve => setTimeout(resolve, 20));

    const exitCode = await worker.terminate();
    console.log(JSON.stringify({ exitCode, gotResult }));
    if (exitCode === 0 || gotResult) process.exitCode = 1;
  });
  worker.on('error', error => {
    console.error(error);
    process.exitCode = 1;
  });
}
```

Run `node e-terminate.mjs`. All three runs of this **start-acknowledged** fixture reported:

```json
{"exitCode":1,"gotResult":false}
```

The parent first waits for the Worker's `started` message, then asks for termination while its bounded CPU loop is still running. The returned code records the Worker's exit in this run; no `finished` result was observed.

**Why the start acknowledgment matters:** an earlier timing-only experiment initiated `terminate()` before confirming Worker startup; that run returned exit code **0** even though no result was observed. Worker lifecycle timing can change what termination reveals. Neither `exitCode === 1` nor `0` alone is a durable record of completed business work. Use task-level identity/outcome reconciliation instead of guessing from thread exit codes.

`worker.terminate()` is a last-resort control, not structured cancellation with guaranteed cleanup. It can interrupt JavaScript execution without application-level `finally` completion. It cannot roll back already-sent messages or effects outside the process, and should not be used as a routine substitute for a cooperative stop protocol. This example intentionally has no external side effects.

## 10. Lifecycle ownership, message protocols and resource cleanup

A Worker is a stateful resource. Applications need to reason about at least:

1. **Created:** constructor returned; startup and dependency evaluation can still fail.
2. **Online / ready:** `online` indicates a runtime startup milestone, not necessarily that application modules are ready to process domain commands.
3. **Task accepted or submitted:** message posted, but worker-side validation and admission may still fail.
4. **Result / error:** a message may report a task outcome; an uncaught Worker error may instead terminate the environment.
5. **Exit:** no more work is possible in that Worker; pending application tasks may need reconciliation.
6. **Shutdown/termination:** cooperative shutdown can permit resource release; forceful termination sacrifices guarantees about in-progress user code.

Do not conflate **Worker readiness**, **task acceptance**, **task completion**, **application acknowledgment**, **external side effects** and **Worker exit**. Each is a different boundary.

### Safe educational protocol thinking

For a dispatcher with more than one task, a minimal *behavioral* envelope might include a task identity, operation kind, bounded validated inputs and a result that echoes that identity. The parent owns the mapping between submitted tasks and observed outcomes. A message arriving after a local timeout is not automatically a new success; the task might be pending, cancelled, or completed but unobserved. The learner can explore idempotency and uncertain outcomes later, but **no project PRD is being augmented by this lesson**.

A limited number of reusable Workers can avoid per-task startup overhead. Yet a finite Worker count still needs limits on **in-flight work**, **queued work**, memory and shutdown. Creating `Promise.all(tasks.map(task => new Worker(...)))` is not an automatic bounded pool. A task's deadline can expire while its computation or external effects continue. Admission, fairness, retry and cancellation are technical/product decisions requiring evidence and appropriate approval.

If you retain many listeners or task closures indefinitely, the Worker may be alive but the parent may leak memory. Every Worker/MessagePort, timer, event listener and rejected task should have an explicit owner. Don't rely solely on garbage collection to implement resource cleanup.

## 11. Version-sensitive capabilities and limits

| Capability | What it helps with | Important boundary |
|---|---|---|
| `workerData` | Immutable-at-submission initial snapshot through structured cloning; some transferables supported | Not a continuing live object link, except explicitly shared memory. |
| `MessageChannel` / `MessagePort` | Multiple explicit message channels | Ports have ownership, transfer and close/ref behavior. |
| `resourceLimits` | Optional V8 engine constraints such as portions of heap and stack | **Not** a whole-process, native allocation, `ArrayBuffer` or security quota; can still hit process-wide OOM. |
| `worker.terminate()` | Requests Worker termination and resolves with its exit status | No guarantee of cooperative cleanup, rollback or a successful task result. |
| `worker.ref()` / `unref()` | Influences whether the Worker keeps the event loop alive | Doesn't mean the task is done, and can allow the process to exit before intended work. |
| `setEnvironmentData()` / `getEnvironmentData()` | Host-specific initial data for Worker environments | Avoid assuming all environment variables and application globals remain live-shared. |
| `markAsUntransferable()` | Protects an `ArrayBuffer` from transfer | Doesn't prevent normal mutation or all data copying. |
| `getHeapSnapshot` / diagnostic APIs | Support investigation under version-specific constraints | Diagnostics cost memory/time and aren't proof of a product guarantee. |

A Worker runs in the same process, so `resourceLimits` does not isolate untrusted JavaScript as securely as a purpose-built sandbox/process boundary. Some process-level APIs differ or are restricted in Worker contexts. Node versions and their stability levels vary; verify the target runtime docs before relying on a new API.

## 12. Choosing clone, transfer or share

Ask these questions in order:

- **Does the sender need to keep using the same bytes?** If yes, structured clone may be the simplest, unless deliberate concurrent sharing is needed.
- **Is ownership exclusive and can the sender relinquish the entire backing store?** Transfer can avoid a data copy, but every alias is detached. Own and verify the buffer's allocation before transferring.
- **Must multiple threads mutate the same memory?** Then a SharedArrayBuffer with a formally defined synchronization protocol may be appropriate. The concurrency and security burden is higher.
- **Is the work sufficiently heavy to cover Worker startup/serialization cost?** Tiny transformations may be faster in the calling context; compare real workloads rather than citing generic thresholds.
- **Can input size or task count be attacker-controlled?** Bound payloads, parallel Workers, queueing and output, and handle malformed messages.
- **What happens if the Worker fails or a result arrives late?** Define safe task outcome and ownership semantics without inventing business guarantees.

A transferable `ArrayBuffer` and a shared `SharedArrayBuffer` both avoid some copying, but they provide opposite ownership models. The first is normally **exclusive move**, the second is **simultaneous access**.

## 13. Backend case study: a report export freezes the server

A service receives a large JSON report request and performs expensive validation/aggregation synchronously before sending the result. Other requests become slow. A proposed change runs calculation in a Worker.

A useful investigation separates competing explanations:

- The computation genuinely consumes expensive JavaScript CPU on the event-loop thread.
- Parsing/stringifying or preparing the message **before** posting still occupies the main thread.
- The Worker computes quickly, but copying a very large input/result consumes time and memory.
- Worker startup per request dominates many tiny tasks.
- Too many Workers compete for the same CPU quota and increase memory.
- Workers finish calculation but remain alive because message channels or listeners are not closed.
- A Worker exits after partial external side effects; business retries might duplicate work.

A falsifiable plan: use bounded synthetic fixtures, separate timestamps for submission/serialization, Worker execution, result delivery, application processing and cleanup, and compare CPU use/tail latency before and after offload. Inspect task admission and memory retention. Track Worker ID and individual task identity separately. If an interval is not measured, label it unknown.

**Scope authority:** the product PRD may require exports, consistency or resource limits, but it does not mandate Worker threads. Choosing to offload is a later technical decision and may not silently change first-version product behavior.

## 14. Common mistakes and counterexamples

| Mistake | Correction |
|---|---|
| “A Worker is one entry in the libuv pool.” | It is a separate JS execution thread/isolate, not an arbitrary user-JS task run on libuv's pool. |
| “Separate isolate means separate process/security sandbox.” | Workers share broader process resources and are not isolation for untrusted arbitrary code. |
| “`postMessage` gives a live reference to every object.” | Ordinary objects are cloned, transferables move ownership, explicit SharedArrayBuffers share memory. |
| “Transferring a `Uint8Array` only affects that view.” | Transfer the backing `ArrayBuffer`; **all** aliases become detached. |
| “Any Buffer's bytes can be moved cheaply.” | Pooling/ownership changes transfer/cloning and may copy unrelated backing data. |
| “Shared memory automatically makes updates correct.” | Define a synchronization protocol; use Atomics where required. |
| “A Worker message implies task persistence.” | It is an observation in a live message channel, not durable storage or a commit. |
| “A Worker exit proves every posted task finished.” | Some tasks may be in flight or have ambiguous side effects. |
| “`terminate` is graceful cancellation and rollback.” | It can interrupt JS without cleanup; external effects are not reversed. |
| “The Worker always improves latency.” | Startup, copying, communication, scheduling and resource contention can outweigh benefits. |
| “Creating one Worker per request is automatically scalable.” | Unbounded thread/task count can exhaust CPU and memory. |
| “`resourceLimits` solves hostile-code security.” | V8 constraints are not process isolation or a complete OS resource limit. |

## 15. Exercises / future self-assessment (not administered)

1. **Worker or libuv?** Classify `crypto.pbkdf2`, `fs.stat`, synchronous JS sorting and a user-created Worker. **Rubric:** distinguish native worker pool, JS event-loop thread and explicit JS Worker.
2. **Clone:** if a Worker mutates a structured-cloned Uint8Array, does the parent change? **Answer:** no, barring separately shared storage.
3. **Transfer and aliases:** two typed arrays share one ArrayBuffer; only one is posted with that buffer in the transfer list. What can the sender still read? **Answer:** both sender views are detached, including the one not posted.
4. **Shared counter:** explain why `Atomics.add` was used in Example C rather than `view[0]++`. **Rubric:** read-modify-write races and lost increments.
5. **Failure:** the Worker sends a “started” message, writes to an external service and then throws. Should the parent automatically retry? **Answer:** not without product-level reconciliation; an error/exit is not proof no side effect happened.
6. **Lifecycle race:** termination before Worker startup produces exit 0 with no result in a run. Why is exit 0 not equivalent to task success? **Answer:** Worker lifetime and task outcome are separate; ack/progress/exit timing can differ.
7. **Performance trade-off:** explain why a tiny computation might lose performance when moved to one Worker per task. **Answer:** startup and message cloning overhead may exceed saved main-thread computation.
8. **Security:** why not execute arbitrary untrusted customer scripts in a Worker with `resourceLimits`? **Answer:** same process/native resources and incomplete resource/security boundaries.
9. **Protocol design:** sketch behavior for two in-flight tasks when one Worker exits without replying. **Rubric:** request IDs, bounded admission, explicit uncertain terminal handling, no invented exactly-once completion or silent product default.
10. **Memory ownership:** when would transferring a dedicated ArrayBuffer be preferable to cloning? **Rubric:** explicit exclusive ownership and known aliases; consumer need, loss of sender access and size costs.

Passing these future exercises would require explicit learner answers and review. **No learning assessment, score or demonstration of personal mastery has been recorded.**

## 16. Verification, references, quality review and gaps

**Author checks on 2026-10-13** used the official [Node Worker threads API](https://nodejs.org/download/release/latest-v22.x/docs/api/worker_threads.html) (including Worker lifecycle, message cloning, transfer lists and Buffer warnings), [Node event-loop / worker-pool guide](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) and the standard [JavaScript Atomics API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics). These are evolving or release-line documentation links; this lesson does **not** claim a native source-code revision audit. The precise executed version below is authoritative for the local observations.

**Executed environment:** Linux x64; Node **v22.16.0**, V8 **12.4.254.21-node.26**, libuv **1.49.2**. Five independent ESM fixture files were saved under a temporary working directory, invoked with `node <fixture>.mjs` and executed **three times each (15 successful fixture runs)**. Fixtures used only generated bytes, local threads and bounded CPU intervals; no network calls or external resources.

| Fixture | Three-run observed evidence | What it does **not** establish |
|---|---|---|
| A — CPU Worker and main timer | Timer around **22–25 ms**; Worker result around **171–180 ms**; Worker exited 0 after reporting | Universal timer deadline, cross-platform throughput or improvement for arbitrary tasks |
| B — clone and transfer | Worker clone first byte 99, sender first byte 1; after transfer both sender alias lengths 0, Worker received [4,5,6,7] | Buffer-pool transfer safety, all possible transferable objects or security |
| C — SharedArrayBuffer and Atomics | Expected 20,000; observed 20,000 across all three runs | General lock-free protocol safety or performance under contention |
| D — deliberate Worker exception | `sawError:true`, `sawResult:false`, Worker `exitCode:1` | Complete recovery, absence of side effects or all error kinds |
| E — start-acknowledged termination | Termination returned 1 and no `finished` result was observed in all three runs | Universal exit codes, cooperative cleanup or rollback |

**Additional counterexample observed while refining fixture E:** an early `terminate()` issued before confirmed Worker startup returned code **0** with no task result in one local execution. That counterexample informed the later start-acknowledged fixture. It does not mean code 0 *always* occurs in that race.

The fixtures do not include exhaustive `MessageChannel` port transfer, nested Workers, real filesystem ownership, `resourceLimits` crash/OOM testing, thread-level profiling, complex cancellation protocols or production traffic. Such concerns are not silently certified by this lesson. The code is educational, not a complete worker-pool/queue implementation or a future project's chosen architecture.

| Quality gate | Evidence and explicit limitation |
|---|---|
| First principles and progression | Sections 1–4 distinguish native pool, JS thread, isolate, lifecycle and three ownership models. |
| Runnable examples and counterexamples | Sections 5–9; five independent Node ESM fixtures with fifteen repeated runs and one pre-start termination counterexample. |
| Error, cancellation, cleanup | Sections 8–11 separate Worker error/exit, task outcomes, termination and owned listener/handle lifetimes. |
| Security/performance | Sections 11–14 discuss bounded admission, copying, pooled buffers, untrusted code and resourceLimits gaps. |
| Exercises with answer rubric | Section 15; no learner assessment administered. |
| Versioned references | Official Node release-line docs, exact runtime/OS observations, no cross-platform guarantee. |
| Coverage mapping | D03-C10 approved editorially; D03-C11 authored/in_review; no D03 catalog/PRD/implemented project evidence. |

**Author quality review:** completed against `docs/quality-gates.md` and the learner-approved D03-C11 curriculum scope. **Learner editorial approval:** explicitly confirmed on 2026-10-13. Next: author Chapter 12 — Child Processes, IPC and Cluster Boundaries — only; submit it for learner review before Chapter 13. Learner assessment and implementation remain deferred.
