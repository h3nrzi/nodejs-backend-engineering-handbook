# Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C10  
**Editorial status:** in_review — authored for learner editorial review; **not approved**.  
**Prerequisite review:** Chapters 01–09 learner-approved; Chapter 09 explicitly approved on 2026-10-13.  
**Educational execution:** Section 15 contains dated, exact local commands and observations for Node v22.16.0 / Linux x64; do not confuse that runtime with the macOS/Node v26.4.0 examples in earlier chapters.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes, prerequisites and scope

After studying this chapter, a learner should be able to:
1. Distinguish asynchronous API submission, native queue wait, native execution, event-loop notification and JavaScript result observation.
2. Identify which representative Node APIs use libuv's shared native worker pool and which use different I/O or execution paths.
3. Explain why a tiny filesystem request can become slow while JavaScript timers still run.
4. Interpret what changing `UV_THREADPOOL_SIZE` can and cannot establish.
5. Explain the difference between abandoning a wait, cancelling a queued native request, and stopping work already in progress.
6. Form a falsifiable diagnosis for apparent native-work contention without prescribing a production architecture.

Read [Chapter 03 — Event Loop and I/O Lifecycle](03-event-loop-and-io-lifecycle.md), [Chapter 07 — Filesystem I/O and Resource Ownership](07-filesystem-io-and-resource-ownership.md), [Chapter 08 — Readable/Writable Streams](08-readable-and-writable-stream-mechanics.md), and [Chapter 09 — Pipelines, Transforms and Cancellation](09-pipelines-transforms-and-cancellation.md). D01 OS scheduling and liveness models and D02 Promise semantics are prerequisites. Explicit JavaScript Worker threads arrive in Chapter 11; child processes in Chapter 12; production performance engineering in D12.

**Boundary:** this is an educational study of Node's host/native execution mechanisms. It does **not** select worker counts, cryptography, filesystem architecture, networking, runtime versions, deadlines or deployment topology for any product PRD.

## 2. First principles: asynchronous does not mean unlimited independent work

Consider an API that accepts an operation and invokes a callback later. The JavaScript submission can be quick even if the task itself requires an operating-system thread to perform blocking native work. If all relevant native workers are occupied, a newly submitted task waits. When its work eventually finishes, the callback must still wait for an opportunity to run on the event loop.

Model its lifetime as distinct intervals:

```text
application JS       host/native             libuv worker(s)        JS callback
     |                     |                         |                    |
     | -- submit request-> | -- enqueue -----------> |                    |
     | <- returns -------- |                         |                    |
     |                     |             waiting for a worker            |
     |                     |                         | -- do work -->     |
     |                     |                         | -- complete -----> | eligible
     |                                         loop can observe completion | runs
```

The sketch is **causal**, not a guarantee about a specific internal queue algorithm, thread assignment, or exact time between phases. A high-level filesystem call may require multiple underlying native requests, and some operations can complete/error before taking the pictured path.

We need five names:

- **Event-loop delay:** JavaScript cannot run a callback promptly because the loop is executing other work or waiting under its scheduling rules.
- **Worker-pool queue delay:** a native task cannot begin because the relevant pool workers are occupied.
- **Native service time:** the assigned worker performs or waits for the requested work.
- **Completion-to-observation delay:** native completion is reported, but JavaScript has not executed the observer yet.
- **Application processing time:** the callback, Promise continuation, parsing, logging or business validation consumes additional time.

**End-to-end elapsed time is not an attribution trace.** A timestamp before calling `fs.stat` and one in its callback includes several stages, not just the filesystem's native service time.

## 3. What progresses on which resource?

Node exposes one coherent JavaScript API surface over several kinds of work. The return shape (callback, Promise or stream) does not identify the execution mechanism.

| Operation / family | Common progress path in documented Node APIs | What must not be concluded |
|---|---|---|
| `fs.stat`, `fs.readFile`, async filesystem operations | libuv native worker-pool work for blocking filesystem tasks | Every high-level API call is exactly one native task; filesystem durability follows from callback success. |
| `crypto.pbkdf2`, `scrypt`, selected async key-generation/random APIs | libuv worker pool; native CPU-intensive or native-service work | An `async` name means no CPU consumption or no contention. |
| Async `zlib` operations | Worker-pool work, with operation-specific chunking and buffering | A stream-based interface eliminates native-pool costs. |
| `dns.lookup` and `dns.lookupService` | OS `getaddrinfo` / `getnameinfo` style paths via the shared pool | All DNS APIs take this path or DNS lookup latency is purely network time. |
| `dns.resolve*` | Different c-ares resolver path; generally not the same `getaddrinfo` worker-pool operation | Identical semantics to `dns.lookup` (hosts files, order, configuration and result policy differ). |
| TCP sockets and many other nonblocking network operations | OS readiness/completion facilities integrated with the event loop | One worker-pool thread is assigned to each connection. |
| `JSON.parse`, a long synchronous loop, sync crypto/FS call | Calling JavaScript thread or synchronous native call | The event loop is free simply because other parts of the process have multiple OS threads. |
| `worker_threads.Worker` | Separate JS thread/isolate with its own execution context | This creates an independent libuv pool for every Worker or gives process isolation. |

This is the **current documented API-family model**, not a promise that all Node builds/platforms use identical syscalls. Node's [Don't Block the Event Loop (or the Worker Pool)](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) guide and [CLI documentation on `UV_THREADPOOL_SIZE`](https://nodejs.org/api/cli.html#uv_threadpool_sizesize) enumerate the representative APIs. The [DNS API](https://nodejs.org/docs/latest-v22.x/api/dns.html) distinguishes lookup from resolution. Chapter 03 already explained why socket readiness is different from a native filesystem task.

A common misconception is that the libuv pool executes arbitrary `async function` JavaScript. It does not. Creating an `async function` without an `await` does not offload its CPU loops. Explicit JS Worker threads are a different facility.

## 4. The shared libuv pool: capacity, queueing and callbacks

The libuv worker pool is **global within its relevant process runtime**, shared by requests submitted through libuv across event loops rather than dedicated to one filesystem API. libuv documents a default size of **four** threads and a configurable maximum of **1024**. It lazily grows thread stacks on many platforms, but more workers still cost resources. Those numbers describe libuv's implementation and limits; they are not safe or desirable defaults for every service.

The broad lifecycle for libuv's `uv_queue_work()` is: an eligible request enters work scheduling; an available worker runs its native work callback; after completion, an after-work callback is delivered through the associated event loop. libuv exposes `uv_cancel()` for supported pending requests and a cancelled status to the completion callback. The mere existence of that primitive does not mean every Node API exposes a matching JavaScript cancellation option. [libuv thread-pool reference](https://docs.libuv.org/en/v1.x/threadpool.html).

The shared pool creates **interference**: CPU-intensive native work can occupy workers needed for seemingly unrelated filesystem metadata or lookup requests. Worker count is a capacity constraint, not a guarantee of fairness or a fixed per-operation deadline.

### Why `UV_THREADPOOL_SIZE` is a startup setting

The documented environment variable `UV_THREADPOOL_SIZE` configures the libuv pool. Set it in the *launcher environment*, **before Node starts**. Assigning `process.env.UV_THREADPOOL_SIZE` after initialization is not guaranteed to change a pool already created. A value printed by `process.env` proves only what text the process environment contains, not the exact number of native workers created.

Changing this setting can alter queueing and interference, but also changes memory overhead, CPU pressure, context switching and potential storage contention. It is not a universal speed-up knob, a fairness guarantee, a separate per-module pool, or permission to raise a product's committed capacity.

## 5. Worked example A: unrelated tasks can share a bottleneck

Save as `pool-contend.mjs`. It submits two bounded native PBKDF2 tasks and an asynchronous filesystem metadata request. These are **synthetic educational inputs**, not a password-storage prescription or a production concurrency benchmark.

```js
import { pbkdf2 } from 'node:crypto';
import { stat } from 'node:fs';
import { performance } from 'node:perf_hooks';

const start = performance.now();
const events = [];
const event = (name, extra = {}) => events.push({
  name,
  elapsedMs: Math.round(performance.now() - start),
  ...extra
});

let ticks = 0;
const ticker = setInterval(() => { ticks++; }, 20);

function derive(name) {
  return new Promise((resolve, reject) =>
    pbkdf2('demo-only', 'fixed-salt', 300_000, 32, 'sha256',
      (error, result) => {
        event(name, { bytes: result?.length ?? 0 });
        error ? reject(error) : resolve();
      }));
}

const first = derive('derive-A');
const second = derive('derive-B');
const file = new Promise((resolve, reject) =>
  stat(new URL(import.meta.url), (error, info) => {
    event('file-stat', { isFile: info?.isFile() ?? false });
    error ? reject(error) : resolve();
  }));

try {
  await Promise.all([first, second, file]);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  clearInterval(ticker);
  console.log(JSON.stringify({
    threadpoolSize: process.env.UV_THREADPOOL_SIZE ?? 'default',
    ticks,
    events
  }, null, 2));
}
```

Run as **separate processes**, not repeated imports inside one process:

```sh
UV_THREADPOOL_SIZE=1 node pool-contend.mjs
UV_THREADPOOL_SIZE=2 node pool-contend.mjs
UV_THREADPOOL_SIZE=4 node pool-contend.mjs
```

For the single-worker run, the recorded callbacks were `derive-A` at **62 ms**, `derive-B` at **125 ms**, then `file-stat` at **126 ms**; the interval recorded **6 ticks**. The `file-stat` operation was not expensive as application code, yet its *observation* was delayed while unrelated native work occupied the constrained resource. The timer ticks illustrate that JavaScript scheduling could continue during native work.

For four workers, the same environment observed `file-stat` at about **1 ms** while derivations completed around **64–67 ms**. Two-worker scheduling in one run observed both the second derivation and metadata callback around **61 ms** and the first derivation at **67 ms**. These are observations, not guarantees of native queue discipline.

**Do not assert exact FIFO order from this example.** OS thread scheduling, native work partitioning, callback delivery, warmed state, CPU quota and libuv versions can alter which callback finishes first. A high-level `fs.stat` timestamp does **not** isolate the time waiting for a worker from actual filesystem service and callback delivery. The fact that the event-loop timer continues is also not proof that no callback ever blocks the event loop.

**Negative-path reasoning:** changing the metadata URL to a nonexistent file should produce an error in the callback. A rejected native task or failed file operation is not a successful file lookup. The Promise wrapper above records `process.exitCode = 1` and clears the interval even when `Promise.all` rejects; this tiny fixture's tasks are allowed to finish naturally. Real request cancellation and teardown require more deliberate ownership.

## 6. Worked example B: synchronous versus asynchronous native CPU work

Save as `block-or-offload.mjs`:

```js
import { pbkdf2, pbkdf2Sync } from 'node:crypto';
import { performance } from 'node:perf_hooks';

const mode = process.argv[2];
if (!['sync', 'async'].includes(mode)) {
  throw new Error('mode must be sync or async');
}

const started = performance.now();
const mark = label => console.log(JSON.stringify({
  label,
  elapsedMs: Math.round(performance.now() - started)
}));

setTimeout(() => mark('timer'), 20);
mark('submitted');

if (mode === 'sync') {
  pbkdf2Sync('demo-only', 'fixed-salt', 350_000, 32, 'sha256');
  mark('work-observed');
} else {
  pbkdf2('demo-only', 'fixed-salt', 350_000, 32, 'sha256',
    error => {
      if (error) {
        console.error(error);
        process.exitCode = 1;
      }
      mark('work-observed');
    });
}
```

Run `node block-or-offload.mjs sync` and `node block-or-offload.mjs async` as separate invocations.

Observed on the recorded runtime:

| Mode | Observed callback sequence and elapsed time | Supported inference |
|---|---|---|
| `sync` | `submitted` 0 ms → `work-observed` 74 ms → `timer` 74 ms | This synchronous operation occupied the calling thread; the 20 ms timer could not run during it. |
| `async` | `submitted` 0 ms → `timer` 20 ms → `work-observed` 77 ms | The native task progressed without keeping the JS execution turn occupied for the entire work interval. |

The async form is not “free CPU,” and the fixed work cost can delay *other native requests*. The sync form is not secretly redirected to the libuv worker pool. Exact durations can change for workload, machine and OpenSSL version. The string inputs are deliberately nonsecret demo placeholders; cryptographic suitability, policy and parameters are outside this example.

**Contrast with a JavaScript `async function`:** if the function executes a long synchronous loop before any suspension point, it will still delay the timer. An `async` declaration changes return/continuation behavior, not the execution resource. See [Chapter 01's synchronous CPU example](01-runtime-architecture-and-execution-boundaries.md).

## 7. Worked example C: a deadline is not native cancellation

Save as `timeout-is-not-cancellation.mjs`:

```js
import { pbkdf2 } from 'node:crypto';
import { performance } from 'node:perf_hooks';

const start = performance.now();
let nativeCompleted = false;
let timer;

const native = new Promise((resolve, reject) =>
  pbkdf2('demo-only', 'fixed-salt', 500_000, 32, 'sha256',
    (error, buf) => {
      nativeCompleted = true;
      console.log('native callback',
        Math.round(performance.now() - start), 'ms');
      error ? reject(error) : resolve(buf.length);
    }));

const deadline = new Promise(resolve => {
  timer = setTimeout(() => resolve('deadline-observed'), 10);
});

const first = await Promise.race([
  native.then(() => 'work-finished'),
  deadline
]);

console.log('first outcome', first, 'nativeCompleted', nativeCompleted);
await native;
clearTimeout(timer);
console.log('final nativeCompleted', nativeCompleted);
```

The observed first report was `deadline-observed nativeCompleted false`; the native callback then ran at about **106 ms**, and the final report showed `true`. Two further executions observed callback completion at about **124 ms** and **128 ms** after the deadline had already won the race.

`Promise.race` chooses which result your code sees **first**. It does not reach into OpenSSL or libuv and stop the other operation. You may stop awaiting a task while it continues occupying a worker. The code deliberately awaits its completion later so that the observation is unambiguous and the process finishes naturally.

The low-level libuv `uv_cancel()` exists, but it has specific constraints: a task already executing on a worker generally cannot be cancelled by that queued-work primitive. And this `pbkdf2` signature does not expose an application-provided `AbortSignal`. Do not invent an abort capability by attaching a signal to an API that does not support it. **Stopping the observer, signalling supported cancellation, and proving an external side effect did not happen are three different claims.**

For an actual service, choose an application-specific late-result policy and bounded admission/cleanup behavior. Those **product decisions** require approval at the appropriate project kickoff; this chapter chooses none.

## 8. Why extra concurrency can make service worse

Suppose a service receives 100 requests, each requiring one expensive native task. Submitting 100 Promises concurrently does not create 100 libuv workers; submissions can accumulate behind a smaller shared capacity. If arrival rate exceeds sustainable service rate, waiting time can grow even when JavaScript is responsive.

A useful causal model is:

```text
Incoming workload
    |
  admission
    |
 shared work queue → limited native workers → completion notification
                                           |
                                  event-loop JS observer
```

- **High utilization:** more workers are occupied; queue time may rise for later requests.
- **Variable task duration:** a long native request can delay unrelated short requests. A small pool amplifies this interference.
- **Larger pool:** may reduce queueing for some mixes, but can cause CPU oversubscription, storage contention, memory overhead or context switching.
- **Extra application concurrency:** can increase outstanding memory, pressure and the number of timeouts that race with work still running.
- **No admission rule:** an unbounded stream of expensive inputs can starve well-behaved users and create an availability/security problem.

A bounded application-level queue, backpressure or a separate execution resource **might** be candidate technical responses, depending on the problem. This lesson does not mandate any of them as a project architecture. Quantitative targets, fairness and accepted overload behavior are **product and engineering decisions** to make separately.

A comparison of `UV_THREADPOOL_SIZE=1` versus `4` in one small fixture is a diagnostic illustration, not a throughput study. Fair comparison needs representative traffic, CPU/memory/IO measurements, warmups, repeated trials, tail latencies and contention evidence. Changing one knob while ignoring the rest can produce a misleading “fix.”

## 9. DNS makes the execution path distinction concrete

The DNS APIs are an important exception to “all hostnames follow the same path”:

- `dns.lookup(hostname)` typically uses operating-system name resolution through `getaddrinfo` (including platform-specific resolver configuration) and consumes libuv worker-pool resources.
- `dns.resolve4(hostname)` and related `resolve*` functions use Node's separate DNS query facilities rather than following the same OS `getaddrinfo` worker-pool path.

These APIs do **not** have identical resolver semantics. The `lookup` path may account for hosts-file and OS resolver policy; DNS-query calls have different records, errors, and configuration behavior. Therefore replacing one with the other merely to avoid queueing can change externally observed product behavior and is **not** an invisible optimization. See [Node DNS docs](https://nodejs.org/docs/latest-v22.x/api/dns.html) for the precise API/platform distinctions.

This chapter deliberately does **not** run a live DNS test; external resolver responses vary by host environment, cache, policy and network access. The performance comparison is between **known execution paths**, not an invented millisecond DNS result.

The same discipline applies to `fs.watch`, which is not handled like every asynchronous filesystem request, and to sockets, which do not consume one native pool worker per open connection.

## 10. Backend incident: quick file metadata becomes mysteriously slow

Imagine a backend that serves uploaded documents and periodically performs native key-derivation/compression work. A brief `fs.stat` callback starts arriving late at peak load even though a synchronous small-file metadata check seems fast in isolation.

Competing hypotheses:

1. The shared native pool is occupied by expensive operations, so the metadata request waits.
2. The filesystem or storage layer is slow or congested.
3. The event loop cannot promptly run completed callbacks because application JavaScript is busy.
4. Resource cleanup, active connections or a launcher configuration changed the workload.
5. The measurement covers logging, parsing or higher-level scheduling unrelated to `fs.stat`.

A *falsifiable evidence plan*:

1. Record exact Node/libuv versions, operating system, launch flags and relevant `UV_THREADPOOL_SIZE` setting without leaking secrets.
2. Measure end-to-end request and callback-observation timings separately from any known external operation timing.
3. Check event-loop delay/utilization; a free event loop alongside late relevant callbacks makes main-thread CPU blocking less likely, **not impossible**.
4. Reproduce with controlled native load and compare isolated versus contended short operations on the same host.
5. Change **one** execution condition in an isolated test, repeat trials, and evaluate tail behavior and collateral latency.
6. Identify which interval remains unobserved. Without native instrumentation, report **possible pool queue contention**, not a proven queue-time distribution.

A production workload might involve encryption, compression or DNS rather than file metadata; the test still needs operation-specific instrumentation. Later Chapters 14 and 17 cover V8 memory and diagnostic tooling; D12 addresses comprehensive capacity analysis.

## 11. Cancellation, errors and cleanup at different boundaries

An asynchronous callback can fail because arguments are invalid, a file disappears, an OS operation fails, native work rejects, or application processing throws later. These are different failure boundaries.

| Event | What it proves | What it does not prove |
|---|---|---|
| API returns immediately | Submission path returned control to JavaScript | Work was accepted, assigned a worker or completed. |
| A local timer deadline wins a race | Application chose a timeout outcome first | Underlying native work stopped. |
| libuv reports queued work cancellation | Supported cancellation path was observed at that layer | Every higher-level side effect was rolled back. |
| Native callback succeeds | The native API reported a successful outcome | Downstream application validation, persistence or user delivery succeeded. |
| Short filesystem callback runs late | End-to-end observation is late | Its native queue wait alone caused the entire delay. |
| A larger pool improves one trial | That run had a different elapsed time | A general throughput/security/reliability gain. |

Always release timers, file handles, sockets and error listeners owned by an example or service. A rejected `Promise.all` does not necessarily stop the other tasks in flight. For stream pipelines, use the explicit ownership and cancellation rules already covered in Chapter 09; do not confuse “close requested” with a guaranteed external rollback.

**Security/availability:** accepting attacker-controlled expensive derivation parameters, compression inputs, or excessive parallel work can exhaust scarce native execution capacity. Defending against resource exhaustion requires input policy and measurement; do not silently change approved product limits or invent cryptographic settings.

## 12. Advanced nuances and version/platform boundaries

**Pool scope:** libuv documents a global shared worker pool across event loops within the libuv runtime context. This does not imply unrelated operating-system processes share one user-space pool. A separate child process is a separate process/resource boundary, while a Node Worker thread uses an independent JavaScript execution context; Chapter 11 distinguishes those boundaries in detail.

**Implementation revision:** the libuv thread-pool reference documents a default of four and a maximum of 1024; stack defaults and naming have changed over libuv releases. The exact OS thread names, allocations and scheduling may vary. This lesson does not verify internal pool source code for a particular commit.

**Early initialization:** Node's CLI reference warns that setting `UV_THREADPOOL_SIZE` via `process.env` at runtime is not guaranteed to affect an already-initialized pool. Only compare independent process launches with the setting present at startup.

**Cancellation:** the ability to cancel *pending* work with a native primitive does not imply stopping a task in progress. High-level Node APIs have distinct signal support; `fs.readFile` abort semantics are not equivalent to `pbkdf2` cancellation.

**Work chunks:** one high-level request may be broken into several native tasks; callback ordering does not reveal a complete native FIFO queue. Compression input size, file batching and host scheduler behavior matter. Do not say “one Node Promise equals one libuv work item.”

**Synchronous host operations:** if you use `pbkdf2Sync` or sync filesystem APIs, the calling JavaScript thread waits; the presence of a native pool does not make those calls nonblocking.

**Performance observability:** user-space callback timestamps cannot split queue wait from service time without additional instrumentation. CPU counters, OS scheduler data, event-loop metrics and workload-level spans all have different blind spots.

**Portability:** the executed fixtures use Linux and Node v22.16.0 while earlier chapters ran on macOS / Node v26.4.0. Neither sample run establishes behavior on every CPU limit, libuv version, OpenSSL build or filesystem.

## 13. Common mistakes and corrective models

| Mistake | Corrective model |
|---|---|
| “Node is single-threaded, so it cannot use the CPU while JavaScript waits.” | The main JS thread and native worker threads are distinct resources. |
| “All async work runs in a background pool.” | Many sockets progress via OS event notification; only specific APIs use native workers. |
| “Async PBKDF2 is CPU-free.” | It consumes CPU/native capacity away from the event-loop callback thread. |
| “Hundreds of Promises provide hundreds of workers.” | Concurrency at the API boundary can produce queues behind fixed execution resources. |
| “A late file callback proves a slow disk.” | Pool wait, filesystem work and callback scheduling are competing causes. |
| “A healthy event-loop timer proves every request is healthy.” | Worker-pool queueing can delay native completions while timers run. |
| “Setting the pool size in the middle of execution resizes it.” | Apply the environment setting before initialization; runtime changes are not guaranteed. |
| “A bigger pool is always faster.” | Memory/CPU/IO contention and workloads can reverse the result. |
| “`Promise.race` timeout cancels the loser.” | The loser can remain in flight and consume a worker. |
| “`dns.lookup` and `dns.resolve4` are interchangeable.” | They have different paths and resolver semantics. |
| “A cancelled request guarantees no effect.” | Cancellation and external-effects semantics are API- and product-specific. |
| “Our one benchmark proves a general optimization.” | Reproduce and measure workloads, tails and other resources. |

## 14. Exercises and self-assessment rubric — deferred

These are future learning exercises; the learner has **not** been assessed.

1. **Queue diagnosis:** two PBKDF2 tasks precede an async metadata request with `UV_THREADPOOL_SIZE=1`. Explain why the metadata callback might be late without claiming the filesystem itself was slow. **Answer:** shared pool resources may be occupied; a callback timestamp cannot separate native queue time from execution and observation.
2. **Work paths:** classify a TCP socket, `dns.lookup`, `dns.resolve4`, `fs.stat`, async PBKDF2, synchronous JSON parsing and a JavaScript Worker. **Rubric:** separate OS readiness, OS-name lookup pool work, distinct DNS query path, filesystem native work, CPU-native work, main-thread JS and separate isolate.
3. **Compare A:** state why the presence of 20 ms timer ticks alongside late `fs.stat` is relevant. **Answer:** JavaScript was able to service some timer callbacks while native work progressed/queued; it does not prove when `fs.stat` finished natively.
4. **Compare B:** why is `pbkdf2Sync` different from callback `pbkdf2`? **Answer:** sync blocks the caller; async uses the documented native path and later callback. CPU still runs.
5. **Timeout:** a 10 ms Promise deadline wins but the PBKDF2 callback arrives at 110 ms. Was the operation cancelled? **Answer:** no; the race changed which outcome was observed first.
6. **Tuning critique:** `UV_THREADPOOL_SIZE=4` made one metadata request quicker. Is 4 a justified production setting? **Rubric:** need representative load, CPU quotas, memory/IO limits, tail behavior and accepted product requirements; no universal conclusion.
7. **Cross-layer incident:** API end-to-end time 250 ms, database-reported execution 20 ms, event-loop delay low. Give at least three remaining plausible intervals and instrumentation choices. **Rubric:** submission, native/network or external wait, callback/driver processing; do not automatically blame a pool used by an unrelated API.
8. **Scope guard:** may a technical team silently increase customer upload limits after increasing pool size? **Answer:** no; changing promised product capability requires explicit product approval.
9. **Cancellation ownership:** explain the difference between suppressing an HTTP response, declining to await PBKDF2, cancelling a supported pending libuv request and rollback of a remote action. **Rubric:** each is a different authority/outcome boundary.

A learner should be able to identify the execution resource, predict only **qualitative** relationships, name missing evidence, and separate performance experiments from product guarantees. No grades, practice submissions or competency certification are recorded during handbook authoring.

## 15. Verification, official references and coverage audit

**Documentation consulted 2026-10-13:** 
- [Node CLI: `UV_THREADPOOL_SIZE`](https://nodejs.org/api/cli.html#uv_threadpool_sizesize) — representative shared native pool APIs, startup setting and non-guaranteed runtime resizing.
- [libuv thread-pool work scheduling](https://docs.libuv.org/en/v1.x/threadpool.html) — global pool, defaults/limits, native callbacks and `uv_cancel`.
- [Node guide: Don't Block the Event Loop (or the Worker Pool)](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) — queueing, CPU/I/O fairness and denial-of-service considerations.
- [Node DNS API, versioned v22 line](https://nodejs.org/docs/latest-v22.x/api/dns.html), [crypto v22](https://nodejs.org/docs/latest-v22.x/api/crypto.html), [filesystem v22](https://nodejs.org/docs/latest-v22.x/api/fs.html) — operation-specific semantics. These are public API documentation links, not claims about unverified native source revisions.

**Executed environment:** 2026-10-13; Node **v22.16.0**, V8 **12.4.254.21-node.26**, libuv **1.49.2**, OpenSSL **3.0.16**, Linux **6.18.44 x86_64**. Educational ESM `.mjs` fixtures under a temporary workspace; no real passwords, production datasets, external DNS or service deployments.

**Exact execution commands:** `UV_THREADPOOL_SIZE=1 node pool-contend.mjs`, `=2 node pool-contend.mjs`, `=4 node pool-contend.mjs` (each in a new process); `node block-or-offload.mjs sync`, `node block-or-offload.mjs async`; `UV_THREADPOOL_SIZE=1 node timeout-is-not-cancellation.mjs`. The same fixed inputs shown in Sections 5–7 were executed.

| Educational check | Executed observation | Limits |
|---|---|---|
| Pool size 1, contention | Initial run: derive callbacks at ~62/~125 ms, file metadata callback ~126 ms; six 20 ms timer ticks. Three repeats: file metadata ~125–151 ms; derivatives ~60–151 ms. | Shared-resource interference illustrated; not proof of precise native queue time or FIFO discipline. |
| Pool size 2 | One run: callbacks ~61–67 ms, metadata callback ~61 ms. | Worker assignment and callback order may change. |
| Pool size 4 | Initial run: file metadata callback ~1 ms; derivatives ~64–67 ms. Three repeats: file metadata ~0–1 ms, derivatives ~60–105 ms. | Not a general production throughput result; CPU quotas and contention differ. |
| Sync versus async PBKDF2 | Sync: work observed ~74 ms, timer ~74 ms. Async: timer ~20 ms, native callback ~77 ms. | Timer and CPU work cost change across hosts; only the observed ordering relationships are scoped. |
| Promise deadline vs native completion | In first run, 10 ms deadline won while native work still pending; native callback ~106 ms. Two repeats: callback ~124–128 ms after deadline win. | `Promise.race` does not cancel native work; no broader cancellation contract established. |

**Local executions:** 14 independent process invocations in total: pool size 1 ×4, size 2 ×1, size 4 ×4, sync and async ×1 each, timeout ×3. All completed without unexpected fixture errors. The outcomes demonstrate the limited behavior stated here, not deterministic timing, platform portability, worker-pool implementation internals, real-load benchmarks, full security/performance acceptance or learned competency. Exact quantitative values are diagnostic observations only.

| Chapter quality gate | Coverage and remaining gap |
|---|---|
| First principles & mechanisms | Sections 2–4 separate queue, native service and JS observation. |
| Practical examples and counterexamples | Sections 5–7: pool contention, sync/async blocking and timeout without cancellation. |
| API boundaries and nuanced claims | Sections 3, 9, 12 distinguish DNS, sockets, filesystem, pool and JS Workers. |
| Failures/security/operations | Sections 8, 10–11 cover overload, missing evidence, cancellation and availability risks. |
| Exercises and answer rubric | Section 14; no actual assessment. |
| Versioned sources and execution evidence | Above; Node v22/Linux fixture environment distinguished from prior Node v26/macOS lessons. |
| Coverage matrix / projects | D03-C09 learner-approved; D03-C10 authored/in_review; no D03 project candidates/PRDs or implementations. |

**Honest gaps:** exact native queue timing is not measured; no OS-level thread tracing, cross-platform stress, fine-grained fairness or exhaustive DNS/crypto/zlib version matrix was run. Worker JS execution belongs to Chapter 11, process-level boundaries to Chapter 12 and full diagnostics to Chapter 17. **No implementation decisions or product commitments** follow from this educational comparison.

**Author quality review:** completed against `docs/quality-gates.md` with checked local fixtures and explicit limitations. **Next gate:** learner reviews and approves or requests revisions to Chapter 10. **Do not begin Chapter 11 before explicit Chapter 10 approval.**
