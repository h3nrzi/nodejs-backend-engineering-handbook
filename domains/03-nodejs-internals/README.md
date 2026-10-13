# D03 — Node.js Internals

**Status:** in_progress — lesson authoring.  
**Curriculum:** [18-chapter plan](curriculum.md), approved_by_learner on 2026-10-12.  
**Lessons:** 17 authored: Chapters 01–16 learner-approved; Chapter 17 in_review; Chapter 18 not_started.  
**Project catalog / PRDs:** not_started.  
**Assessment:** deferred_until_learning_phase.  
**Implementation:** not_started.

## Purpose and boundary

Explain Node.js runtime execution, scheduling, I/O, byte/memory ownership, workers/processes, module loading, resource lifetimes and diagnostic evidence. D01 supplies systems fundamentals; D02 supplies language/type/async abstractions. Protocols, distributed architecture, production operations and comprehensive performance/observability strategies remain in their later domains.

## Approved curriculum progression

Runtime architecture/startup → event loop/scheduling/events → buffers/files/streams/native work → workers/processes/modules → V8 memory/async context/failure → diagnostics and integrated case studies. Curriculum approval does not imply lesson approval or implemented projects.

## Authored lessons

1. [Runtime Architecture and Execution Boundaries](lessons/01-runtime-architecture-and-execution-boundaries.md) — approved_by_learner on 2026-10-12; three educational examples executed on Node v26.4.0, darwin/arm64. Execution evidence is scoped to those fixtures and is separate from editorial approval, learner competence and project implementation.

2. [Startup, Configuration and Runtime Identity](lessons/02-startup-configuration-and-runtime-identity.md) — approved_by_learner on 2026-10-12; 16 educational execution scenarios passed on Node v26.4.0, darwin/arm64. No learner assessment or implemented product is claimed.

3. [Chapter 03 — The Event Loop and I/O Lifecycle](lessons/03-event-loop-and-io-lifecycle.md) — approved_by_learner on 2026-10-12; seven educational execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Evidence is local to these fixtures; no learner assessment or implemented product is claimed.

4. [Chapter 04 — Scheduling Queues and Timers](lessons/04-scheduling-queues-and-timers.md) — approved_by_learner on 2026-10-12; twelve educational execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, CJS/ESM. Execution evidence is local to these fixtures; no learner assessment or implemented product is claimed.

5. [Chapter 05 — EventEmitter and Callback Contracts](lessons/05-eventemitter-and-callback-contracts.md) — approved_by_learner on 2026-10-12; seventeen educational execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Intentional errors/warnings and cleanup outcomes were checked; no learner assessment or implemented product is claimed.

6. [Chapter 06 — Buffers, Bytes and Text Encoding](lessons/06-buffers-bytes-and-text-encoding.md) — approved_by_learner on 2026-10-12; twelve educational execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM, including all 256 partitions of a nine-byte UTF-8 sample. No uninitialized bytes exposed; no learner assessment or implemented product claimed.

7. [Chapter 07 — Filesystem I/O and Resource Ownership](lessons/07-filesystem-io-and-resource-ownership.md) — approved_by_learner on 2026-10-12; fifteen educational scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Temporary-file cleanup verified after every scenario; partial-write fault injection labeled. No learner assessment, cross-platform durability or implemented product claimed.

8. [Chapter 08 — Readable and Writable Stream Mechanics](lessons/08-readable-and-writable-stream-mechanics.md) — approved_by_learner on 2026-10-13; thirteen educational scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Bounded pressure, accounting and lifecycle assertions verified; no actual network/descriptor, memory bound, learner assessment or implemented product claimed.

9. [Chapter 09 — Pipelines, Transforms and Cancellation](lessons/09-pipelines-transforms-and-cancellation.md) — approved_by_learner on 2026-10-13; fifteen educational scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Stage/flush failure, cooperative cancellation, finished observation, early iterator exit and Node/Web adapter outcomes checked; no real transport/descriptor, rollback, learner assessment or product implementation claim.

10. [Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation](lessons/10-native-asynchronous-work-and-thread-pool-saturation.md) — approved_by_learner on 2026-10-13; 14 educational process invocations checked on Node v22.16.0, libuv 1.49.2, Linux/x64, ESM. Shared-pool contention, timer responsiveness, sync/async differences and non-cancellation by Promise race illustrated; no production benchmark, platform guarantee, learner assessment or implementation claim.

11. [Chapter 11 — Worker Threads and Data Ownership](lessons/11-worker-threads-and-data-ownership.md) — approved_by_learner on 2026-10-13; five independent ESM fixtures executed three times each (15 successful invocations) on Node v22.16.0, libuv v1.49.2, Linux/x64; additional early-termination counterexample. CPU offload, clone/transfer detachment, SharedArrayBuffer/Atomics, explicit Worker errors and termination observed. No cross-platform guarantee, learner assessment or product implementation.

12. [Chapter 12 — Child Processes, IPC and Cluster Boundaries](lessons/12-child-processes-ipc-and-cluster-boundaries.md) — approved_by_learner on 2026-10-13; seven standalone ESM fixtures executed three times each (21 educational checks) on Node v22.16.0, libuv 1.49.2, Linux/x64. Spawn/exit/close, execFile overflow, fork IPC, stdio backpressure, signal, two-process cluster and missing-executable negative path checked. No production subprocess orchestration, cross-platform guarantee, learner assessment or implemented project.

13. [Chapter 13 — Module Resolution and Runtime Loading](lessons/13-module-resolution-and-runtime-loading.md) — approved_by_learner on 2026-10-13; nine Node v22.16.0/Linux module fixtures checked three times each (27/27 expected outcomes). Relative extensions, package exports/imports, dual entry, cache identity, CJS/ESM cycles, top-level-await require and JSON import attributes examined. No TS compiler or bundler tests, project implementation or learner mastery claimed.

14. [Chapter 14 — V8 Execution, Memory and Garbage Collection](lessons/14-v8-execution-memory-and-garbage-collection.md) — approved_by_learner on 2026-10-13; six local Node v22.16.0/Linux ESM fixtures executed three times each (18/18 expected outcomes). Demonstrated V8 TurboFan optimization/deoptimization, JS heap retention vs release, external/Buffer accounting, allocation churn, GC event observation and V8 heap-space diagnostics. No production memory budget, compiler-tier guarantee, learner assessment or implemented product.

15. [Chapter 15 — Async Context and Diagnostic Causality](lessons/15-async-context-and-diagnostic-causality.md) — approved_by_learner on 2026-10-13; five Node v22.16.0/Linux ESM fixtures executed three times each (15/15 expected outcomes). ALS isolation, EventEmitter context loss and bind/snapshot, AsyncResource scoping, explicit Worker propagation and mutable-store hazards checked. No distributed causality proof, authorization guarantee, learner assessment or implemented product.

16. [Chapter 16 — Runtime Failures and Graceful Shutdown](lessons/16-runtime-failures-and-graceful-shutdown.md) — approved_by_learner on 2026-10-13; seven independent Node v22.16.0/Linux ESM fixtures executed three times each (21/21 expected outcomes). Explored process exit/beforeExit, unhandled failures, signal-based HTTP drain, forced closure, bounded cancellation and unknown effects. No production shutdown SLO, platform portability, learner assessment or product implementation claimed.

17. [Chapter 17 — Runtime Diagnostics and Measurement](lessons/17-runtime-diagnostics-and-measurement.md) — authored/in_review; seven Node v22.16.0/Linux ESM fixtures executed three times each (21/21 expected outcomes). Event-loop delay/ELU, User Timing, Diagnostics Channel, Inspector CPU sampling, safe report summary, CPU time and blocking-child ELU counterexample documented. No remote tracing, production SLO, learner assessment or product implementation.

## Next action and handoff

Chapters 01–16 are learner-approved. Review Chapter 17 — Runtime Diagnostics and Measurement — before authoring Chapter 18; explicit learner approval is required. The [project catalog](projects/catalog.md) remains a scaffold and will be developed after lesson authoring.

[Canonical state](../../tracking/state.json) · [Human tracker](../../TRACKER.md) · [Workflow](../../docs/workflow.md) · [Coverage matrix](../../projects/coverage-matrix.md).

**Coverage review — 2026-10-13:** D03-C01 through D03-C16 mapped as learner-approved editorially; the 30 approved D01/D02 mappings remain unchanged. C17 is mapped separately as authored/in_review; C18 remains planned; no PRD, learner assessment or implementation evidence exists.
