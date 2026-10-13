# D03 — Node.js Internals

**Status:** in_progress — 18 lessons and five catalog concepts learner-approved editorially; five product PRDs authored/in_review. Overall D03 content-authoring gate remains open until PRD review.  
**Curriculum:** [18-chapter plan](curriculum.md), approved_by_learner on 2026-10-12.  
**Lessons:** 18/18 authored and approved_by_learner editorially; lesson-authoring gate closed after coverage reconciliation.  
**Project catalog:** [five concepts](projects/catalog.md) learner-approved on 2026-10-13. **Product PRDs:** 5/5 authored/in_review; none yet learner-approved.  
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

17. [Chapter 17 — Runtime Diagnostics and Measurement](lessons/17-runtime-diagnostics-and-measurement.md) — approved_by_learner on 2026-10-13; seven Node v22.16.0/Linux ESM fixtures executed three times each (21/21 expected outcomes). Event-loop delay/ELU, User Timing, Diagnostics Channel, Inspector CPU sampling, safe report summary, CPU time and blocking-child ELU counterexample documented. No remote tracing, production SLO, learner assessment or product implementation.

18. [Chapter 18 — Integrated Runtime Failure and Performance Case Studies](lessons/18-integrated-runtime-failure-and-performance-case-studies.md) — approved_by_learner on 2026-10-13; seven reproducible Node v22.16.0/Linux fixtures executed three times each (21 expected outcomes), plus six separate native-pool comparison runs: 27 final checks. Cases cover delayed callbacks, aborted pipeline, pool contention, Worker transfer detachment, retained heap objects, CommonJS/ESM resolution mismatch and server-work/client-disconnect uncertainty. No learner assessment, product architecture or implementation claimed.

## Five product PRDs — authored/in_review as one batch

- [P01 — IntakeLedger](projects/p01-intakeledger-verified-file-intake-prd.md) — in_review; product-scope learner approval pending.
- [P02 — MediaForge](projects/p02-mediaforge-asset-processing-prd.md) — in_review; product-scope learner approval pending.
- [P03 — NodeScope](projects/p03-nodescope-runtime-incident-evidence-prd.md) — in_review; product-scope learner approval pending.
- [P04 — PackageClinic](projects/p04-packageclinic-runtime-preflight-prd.md) — in_review; product-scope learner approval pending.
- [P05 — LiveRoom](projects/p05-liveroom-interactive-session-prd.md) — in_review; product-scope learner approval pending.

**Batch review:** explicit user approval must cover all five separately identifiable product boundaries; in particular, P04 proposes trusted, owner/operator-approved integration scenario execution and deliberately excludes public arbitrary code execution. Detailed policies/limits can remain open for later learner-approved Matt/Codex discovery.

## Next action and handoff

Chapters 01–18 and the [five D03 catalog concepts](projects/catalog.md) are learner-approved editorially. The [Coverage Matrix](../../projects/coverage-matrix.md) preserves 48 approved chapter mappings and now identifies the five **draft PRD product challenges separately from approved challenges**. **Review the five linked PRDs as one batch**: none is approved yet, all are in_review. No project implementations or learning assessments have started. Overall D03 content gate remains open until PRD approval and final coverage audit.

[Canonical state](../../tracking/state.json) · [Human tracker](../../TRACKER.md) · [Workflow](../../docs/workflow.md) · [Coverage matrix](../../projects/coverage-matrix.md).

**Coverage review — 2026-10-13:** D03-C01 through D03-C18 mapped as learner-approved editorially (18/18). Thirty approved D01/D02 mappings and nine product PRDs unchanged. The [five-candidate catalog](projects/catalog.md) is learner-approved; all five PRDs are authored/in_review (no learner PRD approval, assessment or implementation evidence).
