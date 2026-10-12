# D03 Curriculum blueprint — Node.js Internals

**Status:** approved_by_learner — 18-chapter breadth, sequence and boundaries confirmed on 2026-10-12.  
**Authored:** 2026-10-12.  
**Lessons:** Chapters 01–04 learner-approved; Chapter 05 authored/in_review; Chapters 06–18 not_started. This blueprint is not lesson content.  
**Project catalog / PRDs / implementation:** not_started.  
**Assessment:** deferred_until_learning_phase.

## Purpose and prerequisites

Teach how Node.js runs code, schedules callbacks, handles bytes and I/O, manages memory and resources, isolates CPU work and exposes evidence for diagnosis. Move from execution models to mechanisms, failure modes and measured case studies. Prerequisites: D01 correctness, OS/memory/I/O/concurrency fundamentals and D02 language, async, type/runtime and module distinctions.

The learner-approved breadth is **18 chapters**. Each is a self-contained beginner-to-advanced lesson to be written and reviewed individually under the approved plan. The list defines teaching objectives, not an implementation stack or requirements for future products.

## Version and evidence policy

For planning, official Node.js v24 documentation was consulted through Context7 on 2026-10-12 using `/websites/nodejs_latest-v24_x_api`. This is a documentation reference line, **not a claim that v24 is the current latest release or an approved project runtime**. Before authoring examples, select and record an exact supported Node version, OS and CJS/ESM context; check the applicable official release/API documentation. Version-sensitive flags, defaults, stability and timing must be qualified in the lesson.

Separate documented public guarantees, source-level implementation observations and empirical results. Cite source revisions for deeper internals where API docs are insufficient. An experiment cannot establish a universal scheduling order. Record commands, runtime/environment, expected result, observed result and limitations; label execution unverified until actually run.

## Approved sequence and chapter coverage

| # / planned competency | Chapter | Teaching scope | Observable future checkpoint | Prerequisites |
|---|---|---|---|---|
| 01 / D03-C01 | Runtime architecture and execution boundaries | Node/V8/libuv/OS responsibilities; isolates, JS execution versus native operations, source-to-callback path; public contracts versus implementation detail | Trace CPU and I/O work through the responsible layers without claiming all async work uses one pool. | D01 systems; D02 async |
| 02 / D03-C02 | Startup, configuration and runtime identity | Executable entry, process.argv/env, cwd, flags, platform/build/version identity and bootstrap; distinguish runtime configuration from product policy | Produce a reproducible environment manifest and identify why two invocations behave differently. | 01 |
| 03 / D03-C03 | The event loop and I/O lifecycle | Loop phases and watchers; polling versus completion; platform differences; which APIs use OS facilities or libuv work; thread-pool contention | Explain an I/O completion trace and separate loop delay from native work waiting. | 01–02 |
| 04 / D03-C04 | Scheduling queues and timers | nextTick, Promise jobs/queueMicrotask, timer thresholds, setImmediate; nested scheduling, CJS/ESM evaluation context, starvation, ref/unref | Predict only documented ordering and demonstrate why timer delay is not a completion deadline. | 03; D02 promises |
| 05 / D03-C05 | EventEmitter and callback contracts | Synchronous dispatch, listener registration/removal, once, error events, reentrancy, rejection handling and listener lifetimes | Diagnose reentrancy and missed events; explain why events do not automatically imply backpressure. | 04; D02 events |
| 06 / D03-C06 | Buffers, bytes and text encoding | Buffer/TypedArray/ArrayBuffer, views versus copies, ownership, alloc versus allocUnsafe, byte length, UTF-8 boundaries and decoding | Preserve text across arbitrary chunk splits and identify retained or aliased byte storage. | D01 memory; D02 values |
| 07 / D03-C07 | Filesystem I/O and resource ownership | Callback/promise/sync APIs, file handles, positional reads/writes, cleanup, partial operations, concurrent mutation, watchers and platform caveats | Explain blocked loops, leaked descriptors and incomplete writes without assuming OS-independent durability. | 03,06 |
| 08 / D03-C08 | Readable and Writable stream mechanics | Readable modes, consumption choices, object mode, write/false/drain, highWaterMark thresholds, end/finish/close and destroy | Trace buffered data and stop production on pressure; distinguish consumption, flush and resource closure. | 05–07; D02 iteration |
| 09 / D03-C09 | Pipelines, transforms and cancellation | Transform/Duplex lifecycles, pipeline/finished, error propagation, AbortSignal support boundaries, async iteration and Node/Web stream interop | Show cleanup and outcome evidence under source/transform/sink failure and early consumer termination. | 08 |
| 10 / D03-C10 | Native asynchronous work and thread-pool saturation | libuv work queue versus network readiness; selected fs, crypto, compression and DNS paths; contention, queue time, cancellation limitations | Explain why unrelated work can wait and why enlarging a pool is not a universal fix. | 03,07–09 |
| 11 / D03-C11 | Worker threads and data ownership | Worker lifecycle/isolate, messages, structured clone, transfer versus shared memory, failure/exit, resourceLimits, bounded task dispatch | Distinguish CPU offload from I/O concurrency and reason about transferred-buffer ownership and worker failure. | 06,10; D01 concurrency |
| 12 / D03-C12 | Child processes, IPC and cluster boundaries | spawn/exec/execFile/fork concepts, stdio pressure, shell and argument boundaries, signals, IPC serialization, process isolation; cluster overview | Compare process/thread failure boundaries and explain subprocess output stalls; no deployment architecture chosen. | 02,08,11 |
| 13 / D03-C13 | Module resolution and runtime loading | CJS/ESM host resolution, package type/exports/imports, extensions, caches, cycles, dynamic import, interop and top-level-await constraints | Diagnose a load/evaluation mismatch from package and runtime context without conflating TS resolution with Node loading. | 02,04; D02 modules/interop |
| 14 / D03-C14 | V8 execution, memory and garbage collection | Interpreter/JIT optimization concepts, shapes and deoptimization at a measured level; heap spaces, reachability, pauses, external/Buffer memory, rss versus heap metrics | Separate retention, allocation churn, external memory and CPU symptoms; avoid engine-version folklore. | 01,06,11; D01 memory |
| 15 / D03-C15 | Async context and diagnostic causality | AsyncLocalStorage and AsyncResource concepts, context lifetime/binding, request correlation across callbacks/workers and lost context | Explain attribution loss and demonstrate context isolation; do not equate correlation with globally ordered causality. | 04–05,11–12 |
| 16 / D03-C16 | Runtime failures and graceful shutdown | Thrown errors, rejected promises and error events; uncaught-failure boundaries; signals, beforeExit/exit, open handles, draining, deadlines and cleanup | Explain why unknown/cancelled differs from successful shutdown and how exit paths affect pending work. | 05,07–12,15 |
| 17 / D03-C17 | Runtime diagnostics and measurement | Inspector, CPU profiles, heap snapshots, diagnostic reports, perf_hooks loop delay/utilization, resource usage and controlled experiments; privacy/overhead caveats | Choose evidence for loop blocking, pool contention, memory retention or handle leaks; state limits of each measurement. | 03,10,14–16 |
| 18 / D03-C18 | Integrated runtime case studies and transfer | Delayed callbacks, stalled pipeline, saturated native work, worker transfer bug, memory retention, module mismatch and incomplete shutdown; correlate competing explanations | Write a falsifiable diagnosis, evidence plan and limitations; review cross-domain boundaries and remaining gaps. | 01–17 |

The curriculum objectives are learner-approved as a plan, not as acquired competency. [Chapter 01 — Runtime Architecture and Execution Boundaries](lessons/01-runtime-architecture-and-execution-boundaries.md) is learner-approved editorially; [Chapter 02 — Startup, Configuration and Runtime Identity](lessons/02-startup-configuration-and-runtime-identity.md) is learner-approved editorially; [Chapter 03 — The Event Loop and I/O Lifecycle](lessons/03-event-loop-and-io-lifecycle.md) is learner-approved editorially; [Chapter 04 — Scheduling Queues and Timers](lessons/04-scheduling-queues-and-timers.md) is learner-approved editorially; [Chapter 05 — EventEmitter and Callback Contracts](lessons/05-eventemitter-and-callback-contracts.md) is authored/in_review; Chapters 06–18 remain planned. No learner assessment or project implementation evidence is inferred.

## Why this order

Chapters 01–05 establish execution, scheduling and event contracts before I/O composition. Chapters 06–10 connect byte ownership, file handles and stream lifecycles to native work contention. Chapters 11–13 introduce isolation and Node-specific loading with the execution context already understood. Chapters 14–17 use those mechanisms to reason about memory, async attribution, failure and diagnostic evidence. Chapter 18 integrates symptoms and competing explanations rather than repeating an API tour.

Diagnostics appear as small evidence exercises throughout; Chapter 17 consolidates tool selection and limitations. Scheduling context is revisited after module loading, because entry-context differences must not be hidden by a simple universal queue diagram.

## Coverage boundaries with other domains

| Domain | Already taught / later responsibility | D03 contribution |
|---|---|---|
| D01 | Complexity, OS scheduling, memory fundamentals, safety/liveness and state reasoning | Apply these models to Node-specific execution and resource behavior; link rather than repeat foundational chapters. |
| D02 | JavaScript semantics, Promises, iterable/event abstractions, TS types and module concepts | Node host scheduling, concrete streams/Buffer APIs, runtime loading and diagnostic execution context. |
| D04 / D05 | Network protocols, HTTP semantics and API products | Use I/O as a runtime illustration; no comprehensive protocol/API curriculum. |
| D06 / D10 / D11 | Application architecture, distributed systems and messaging guarantees | Compare local workers/processes; no prescribed topology, distributed consensus or universal delivery guarantee. |
| D09 | Application security architecture and threat modeling | Explain runtime trust limits, unsafe buffer/shell boundaries and diagnostic-data exposure; no security certification. |
| D12 / D16 | Deep performance methodology and production observability systems | Runtime evidence and bounded experiments; no optimization claims or vendor/production monitoring platform selection. |
| D13 / D14 / D15 | Reliability strategy, comprehensive testing and deployment/platform engineering | Local failure/cleanup and educational verification; no CI/deployment stack or production operations handbook. |

Runtime C++/libuv/V8 source may be used for a carefully scoped explanation, but this plan does not require a complete native-runtime codebase tour or native-addon development course. Add-ons/FFI, embedded Node, custom loader implementation and experimental runtime capabilities may be signposted; they are not core build commitments. Coverage of source internals must state revision and platform.

## Per-chapter authoring standard

Each chapter must include:
- Terminology and prerequisites, first-principles model, mechanism, why/when it matters and comparison with alternatives.
- At least two worked educational examples, including one failure/counterexample and one backend symptom or resource-lifecycle trace.
- Explicit ordering/ownership/error guarantees and limitations; relevant CJS/ESM/version/OS assumptions.
- Common misconceptions, diagnostic questions, realistic edge cases and resource cleanup.
- Exercises with expected outcomes or answer rubric for future study; no present learner grading.
- Official references, dated/versioned verification notes and a concept coverage checklist with honest gaps.
- An explicit example-execution status; no production-readiness claim or architecture mandate.

Scheduling exercises must distinguish guaranteed order from permitted alternatives. Stream exercises must separate pressure thresholds from hard memory guarantees. Worker exercises must distinguish cloned, transferred and shared ownership. Diagnostic exercises must separate observed evidence from inferred causes.

## Project planning after lessons

Do not finalize project candidates now. After all approved lessons, develop a distinct catalog around real user problems, then review concepts and author product PRDs individually. Compare candidate coverage and non-goals against D01/D02's nine products to avoid duplicating the workload observatory, allocation/dependency simulators, dataset workspace, contract studio, dispatch console, policy workspace, package registry or subscription console.

A runtime learning objective does not force a particular worker, stream, queue or storage design in a PRD. Product boundaries and observable outcomes remain authoritative; consequential product decisions stay with the learner, with Matt/Codex discovery in the separate implementation repository.

## Approval, tracking and next action

1. **Completed 2026-10-12:** learner explicitly approved the 18-chapter breadth, sequence and domain boundaries.
2. **Chapters 01–04 approved; Chapter 05 authored/in_review:** request learner review before authoring Chapter 06. Curriculum approval does not automatically approve any lesson.
3. Reconcile the global coverage matrix whenever a lesson/project mapping changes, record it with both trackers, and keep planned versus authored/approved/evidenced progress separate.
4. After lesson authoring: catalog review → separate product PRDs → coverage audit → domain content closure.
5. Study assessments and project implementations remain deferred until explicitly initiated.

**Pending editorial review:** Chapter 05 — EventEmitter and Callback Contracts. After approval, author Chapter 06 only. The first five chapters’ examples were run on Node v26.4.0 (environment and limits in each lesson); later examples must record their own exact versions and conditions. This does not mandate a project runtime.

## Starting official references

Planning checks via Context7 covered queue/timer context, stream pressure/pipeline cleanup and worker CPU/data-ownership boundaries. Remaining references below are starting points for verification during the corresponding lesson, not assertions that every API detail was already audited.

- [Event loop, timers and nextTick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Process and scheduling context](https://nodejs.org/docs/latest-v24.x/api/process.html)
- [Timers](https://nodejs.org/docs/latest-v24.x/api/timers.html)
- [Events](https://nodejs.org/docs/latest-v24.x/api/events.html)
- [Buffer](https://nodejs.org/docs/latest-v24.x/api/buffer.html)
- [File system](https://nodejs.org/docs/latest-v24.x/api/fs.html)
- [Streams](https://nodejs.org/docs/latest-v24.x/api/stream.html)
- [Worker threads](https://nodejs.org/docs/latest-v24.x/api/worker_threads.html)
- [Child processes](https://nodejs.org/docs/latest-v24.x/api/child_process.html)
- [Cluster](https://nodejs.org/docs/latest-v24.x/api/cluster.html)
- [CommonJS modules](https://nodejs.org/docs/latest-v24.x/api/modules.html), [ES modules](https://nodejs.org/docs/latest-v24.x/api/esm.html), [Packages](https://nodejs.org/docs/latest-v24.x/api/packages.html)
- [V8 API](https://nodejs.org/docs/latest-v24.x/api/v8.html), [V8 project documentation](https://v8.dev/docs)
- [Async context](https://nodejs.org/docs/latest-v24.x/api/async_context.html)
- [Performance hooks](https://nodejs.org/docs/latest-v24.x/api/perf_hooks.html), [Inspector](https://nodejs.org/docs/latest-v24.x/api/inspector.html), [Diagnostic reports](https://nodejs.org/docs/latest-v24.x/api/report.html)
- [libuv design](https://docs.libuv.org/en/v1.x/design.html)
