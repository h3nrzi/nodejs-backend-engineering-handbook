> **Workflow V2 (2026-10-14):** D01–D03 former pre-implementation PRDs were reclassified as educational Project Charters. References and historical approval labels here should be interpreted as **Charter editorial approval**, not Codex-authored Final PRD or implementation readiness. Historical reset applies to earlier implementation claims; since then MediaForge reached approved external Module 01 ticket planning, without verified implementation.

# D03 — Node.js Internals

**Status:** completed — **D03 content-authoring gate closed after explicit approval of all 18 lessons, five catalog concepts and five Project Charters and final Coverage Matrix audit**. This does not assess student proficiency or imply a built project.  
**Curriculum:** [18-chapter plan](curriculum.md), approved_by_learner on 2026-10-12.  
**Lessons:** 18/18 authored and approved_by_learner editorially; lesson-authoring gate closed after coverage reconciliation.  
**Project catalog:** [five concepts](projects/catalog.md) approved on 2026-10-13. **Project Charters:** **5/5 learner-approved at product scope** on 2026-10-13; technical discovery and implementation not_started.  
**Assessment:** deferred_until_learning_phase.  
**External MediaForge planning:** Module 01 tickets approved; implementation/tests not verified. See [registry](../../projects/implementations/mediaforge.md).

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

## Approved D03 Project Charters

- [P01 — IntakeLedger](projects/p01-intakeledger-verified-file-intake-charter.md) — learner-approved product boundaries; detailed policies open.
- [P02 — MediaForge](projects/p02-mediaforge-asset-processing-charter.md) — learner-approved product boundaries; detailed policies open.
- [P03 — NodeScope](projects/p03-nodescope-runtime-incident-evidence-charter.md) — learner-approved product boundaries; detailed policies open.
- [P04 — PackageClinic](projects/p04-packageclinic-runtime-preflight-charter.md) — learner-approved **trusted, authorized test execution only**, no public arbitrary-code execution.
- [P05 — LiveRoom](projects/p05-liveroom-interactive-session-charter.md) — learner-approved product boundaries; detailed policies open.

All five Charters were approved together on **2026-10-13**; each remains a separately traceable product. None is implementation-ready solely because its product scope is approved. Technical architecture belongs to Codex's skill-guided discovery in an independent project repository **only if the learner later selects a product to implement**.

## Next action and handoff

D03 content-authoring is **complete**: 18/18 lesson chapters, 5/5 catalog concepts and 5/5 educational Project Charters approved editorially. The [Coverage Matrix](../../projects/coverage-matrix.md) audits all 48 D01–D03 lesson mappings and **14 approved Charters**; all actual product implementations remain not_started, and learner assessments deferred. The next handbook content phase is **D04 — Network & Protocol Engineering**, beginning with curriculum/outline creation and learner review—not project implementation or assumed study assessment.

[Canonical state](../../tracking/state.json) · [Human tracker](../../TRACKER.md) · [Workflow](../../docs/workflow.md) · [Coverage matrix](../../projects/coverage-matrix.md).

**Coverage review — 2026-10-13:** All 18 D03 chapter mappings learner-approved editorially, with 30 approved D01/D02 mappings unchanged; **14 Project Charters approved** (nine D01/D02 unchanged plus five D03 batch approvals). D03 competency challenges mapped to actual approved PRD scope without mandating technical methods; no learner assessment, product implementation or architecture evidence.
