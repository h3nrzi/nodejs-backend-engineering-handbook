# Handbook progress tracker

**Updated:** 2026-10-13  
**Phase:** content_and_project_planning  
**Current authoring focus:** D03 — all 18 chapters learner-approved; five project candidates authored/in_review, no D03 PRDs  
**Canonical state:** [tracking/state.json](tracking/state.json)

## D01 — Computer Science Foundations

- **Curriculum:** learner-approved.
- **Lessons:** all 14 authored and learner-approved (editorial approval; examples not independently verified).
- **Project catalog:** four differentiated ideas, each with a learner-approved product-scope PRD.
- **Open PRD decisions:** product policies, numeric limits and acceptance thresholds remain unresolved; approval does not mean implementation-ready.
- **Learning assessment:** deferred until learner explicitly enters the study phase; no answers, grades or practice evidence recorded.
- **Implementation projects:** none selected, created or implemented under this handbook workflow.

### Approved project PRDs

1. [P01 — Workload & Complexity Observatory](domains/01-computer-science-foundations/projects/p01-workload-complexity-observatory-prd.md)
2. [P02 — Concurrent Resource Allocation Simulator](domains/01-computer-science-foundations/projects/p02-concurrent-resource-allocation-simulator-prd.md)
3. [P03 — Dependency Workflow Simulator](domains/01-computer-science-foundations/projects/p03-dependency-workflow-simulator-prd.md)
4. [P04 — Large Dataset Processing Workspace](domains/01-computer-science-foundations/projects/p04-large-dataset-processing-workspace-prd.md)

[All fourteen chapters and project index](domains/01-computer-science-foundations/README.md) · [Project differentiation](domains/01-computer-science-foundations/projects/catalog.md)

## Remaining domains

**D02 — JavaScript & TypeScript: content authoring complete (2026-10-12).**

- **Curriculum:** learner-approved, 16 chapters.
- **Lessons:** all 16 authored and learner-approved editorially; educational examples not independently verified.
- **Project catalog:** [five distinct concepts](domains/02-javascript-typescript/projects/catalog.md), all learner-approved.
- **Product PRDs:** all five learner-approved at product scope: [P01 ContractGuard](domains/02-javascript-typescript/projects/p01-contractguard-api-data-contract-studio-prd.md), [P02 DispatchDesk](domains/02-javascript-typescript/projects/p02-dispatchdesk-multi-recipient-delivery-operations-prd.md), [P03 PolicyLens](domains/02-javascript-typescript/projects/p03-policylens-business-rule-decision-workspace-prd.md), [P04 PackagePassport](domains/02-javascript-typescript/projects/p04-packagepassport-integration-compatibility-registry-prd.md), [P05 SubscriptionHub](domains/02-javascript-typescript/projects/p05-subscriptionhub-live-event-subscription-console-prd.md).
- **Open product decisions:** assumptions, policy details, quantities and acceptance thresholds remain in the PRDs. Editorial approval does not imply implementation-readiness.
- **Assessments and implementation:** deferred/not started; no runnable-product evidence claimed.
- **Module index:** [D02 overview and lesson catalog](domains/02-javascript-typescript/README.md).

**D03 — Node.js Internals:** [18-chapter curriculum](domains/03-nodejs-internals/curriculum.md) learner-approved; **all 18 lessons now learner-approved editorially** including [Chapter 18 — Integrated Runtime Failure and Performance Case Studies](domains/03-nodejs-internals/lessons/18-integrated-runtime-failure-and-performance-case-studies.md). Lesson-authoring gate complete after full [coverage reconciliation](projects/coverage-matrix.md). [Five-project candidate catalog](domains/03-nodejs-internals/projects/catalog.md) drafted/in_review, not learner-approved. D03 PRDs, implementation not_started; learner assessment deferred. Overall D03 content-authoring gate remains open.

**D04–D16:** not started.

## Next action

D01/D02 content-authoring gates remain closed. In D03, **all 18 chapters are learner-approved editorially** and the chapter-authoring gate is complete. **Five D03 project candidate concepts await explicit learner review** in [catalog](domains/03-nodejs-internals/projects/catalog.md). Do not author any D03 PRD until the learner approves the candidate direction; each PRD will require separate product-scope review. No implementations or learning assessments have started. The [Coverage Matrix](projects/coverage-matrix.md) records 48/48 approved editorial lessons and no D03 approved project challenge.

## Product decision policy — approved 2026-10-12

- **Handbook PRD gate:** prioritize why the product exists, who uses it, **what is in/out/deferred**, and indispensable observable behaviors; editorial approval does not imply all details are finalized.
- **Deferred product questions:** unresolved nonessential policies, numerical limits and exceptional-case rules remain documented in approved PRDs. They are resolved at the **specific project's kickoff** using installed Matt Pocock skills with Codex and the learner's explicit approval before dependent technical design.
- **Scope control:** changes to the promised product boundary, users or essential behavior require learner approval; Codex must not silently treat a technical recommendation as a product decision.
- D01/D02 approvals and D03 next curriculum-planning task remain unchanged. Study assessments and implementation still deferred.

## D01/D02 PRD alignment audit — 2026-10-12

[Reviewed all nine approved product PRDs](docs/prd-scope-alignment-audit-2026-10-12.md) for consistency with the scope-first approval policy: four in D01 and five in D02. Corrected premature decision-readiness language, stale editorial statuses/next steps and unclear boundary-versus-policy wording. No product boundary, learner approval status or implementation status changed. Detailed first-version decisions remain for explicit learner approval during Matt Pocock skill-guided project kickoff. **D03 curriculum planning remains the next handbook task.**

## AI handoff rules

Read [AGENTS.md](AGENTS.md), [workflow](docs/workflow.md), and canonical state before work. The **product PRDs state what/why and observable criteria**, never prescribe implementation. Codex owns future architecture, ADRs, tickets, implementation and tests in separate repositories. Do not infer implementation from PRD approval or competence from lesson approval.

## Standard authoring sequence (learner approved)

Curriculum blueprint approval → chapter-by-chapter lessons → project catalog → behavior-only PRDs → domain content closure. Study assessments and Codex implementation remain separate. D01 and D02 content gates are closed; D03 curriculum and Chapters 01–08 are learner-approved; Chapter 09 is authored/in_review.

## Global coverage reconciliation — 2026-10-12

[Coverage matrix](projects/coverage-matrix.md) reviewed and updated against all nine approved D01/D02 PRDs and all 30 authored lessons at baseline `48f227313e52a85246c0a65e1acbea3f511a1d0b`. [Detailed findings and correction evidence](docs/coverage-matrix-audit-2026-10-12.md). Nine project entries and 30 chapter-level competency mappings distinguish direct challenges, supporting theory, gaps and absent implementation evidence. Corrected stale catalog/next-step wording and P03 prerequisite terminology; no approved product scope or status changed. All implementation remains not started; assessment deferred. D03 curriculum planning remains next.

**Mandatory completion gate:** after any project/catalog/PRD mutation, mapped lesson change, domain closure or external implementation-evidence update, reconcile the matrix and update both trackers in the same change. If mapping is unchanged, record a dated, evidence-backed “reviewed; no mapping change” result with affected paths in both trackers. Work cannot be declared complete without that record. See [agent contract](AGENTS.md), [workflow](docs/workflow.md) and [quality gates](docs/quality-gates.md).

## D03 curriculum planning — 2026-10-12

[Proposed 18-chapter plan](domains/03-nodejs-internals/curriculum.md) drafted after user authorization to move to the next domain. Covers runtime/startup, event loop and scheduling, events, buffers/files/streams, native work, workers/processes, runtime modules, V8 memory, async context, failure/shutdown, diagnostics and integrated case studies. Official Node.js v24 documentation consulted through Context7 for scheduling, streams and workers; exact example runtime remains to be recorded during lesson authoring. This is a plan awaiting learner review, not taught content or product-scope approval.

**Coverage review:** reviewed and updated [matrix](projects/coverage-matrix.md) against the D03 blueprint/index and canonical state. Added a separate planning-only D03 row; existing D01/D02 30 lesson mappings and nine PRD entries unchanged. D03 has no taught, assessed or implementation evidence. Next: learner approves/revises curriculum, then Chapter 01 only. Project catalogs/PRDs follow lessons; assessment and implementation remain deferred.

## D03 curriculum approval and Chapter 01 — 2026-10-12

Learner explicitly approved the 18-chapter curriculum in this chat. [Chapter 01 — Runtime Architecture and Execution Boundaries](domains/03-nodejs-internals/lessons/01-runtime-architecture-and-execution-boundaries.md) authored and reviewed against quality gates, covering engine/host/native/OS responsibilities, process/thread/isolate, concurrency versus parallelism and submission/completion/observation. Three standalone educational examples executed on Node v26.4.0, V8 14.6.202.34-node.21, libuv 1.52.1, darwin/arm64, ESM. Outcomes and limitations are recorded in the lesson. No learner score or implemented product is claimed.

**Coverage review:** D03-C01 added as authored/in_review, separately from 30 approved D01/D02 mappings and nine approved PRDs. Curriculum approval recorded; remaining 17 chapters not_started. Matrix, domain index and machine state reconciled in this change. Next: learner reviews Chapter 01 before Chapter 02 is authored. Catalog/PRDs follow lessons; assessment and implementation remain deferred.

## D03 Chapter 01 approval and Chapter 02 — 2026-10-12

Learner explicitly approved Chapter 01 in this chat. [Chapter 02 — Startup, Configuration and Runtime Identity](domains/03-nodejs-internals/lessons/02-startup-configuration-and-runtime-identity.md) authored/in_review, covering launch identity, runtime versus application arguments, cwd versus module resources, configuration parsing, env-file precedence, startup options, preloads and failure stages. Four educational JavaScript fixtures checked in 16 execution scenarios on Node v26.4.0, darwin/arm64, ESM entries and CommonJS preload. Exact evidence and limits are in the lesson; no learner assessment or implemented product claimed.

**Coverage review:** D03-C01 approved mapping and D03-C02 authored/in_review mapping reconciled with both lesson files, curriculum, domain index and state. Total authored mappings: 32, including 31 editorially approved and 1 in_review; D01/D02 project coverage unchanged. Chapters 03–18 not_started. Next: learner reviews Chapter 02, then Chapter 03 only. Catalog/PRDs and implementation remain not_started; assessment deferred.

## D03 Chapter 02 learner approval — 2026-10-12

Learner explicitly approved [Chapter 02 — Startup, Configuration and Runtime Identity](domains/03-nodejs-internals/lessons/02-startup-configuration-and-runtime-identity.md) in the current conversation. Chapters 01–02 of 18 are editorially approved. Chapter 03 — The Event Loop and I/O Lifecycle — remains not_started and is next for authoring and learner review; assessment, projects and implementation remain deferred/not_started.

**Mandatory coverage reconciliation:** checked the [coverage matrix](projects/coverage-matrix.md) against Chapter 02, the curriculum, D03 index and canonical state. D03-C02 moved from authored/in_review to approved; its taught-competency crosswalk row was added. All 32 authored chapters across D01–D03 are approved; 9 product PRDs remain approved for scope, with no product implementation evidence or learner assessments claimed.

## D03 Chapter 03 authoring — 2026-10-12

Learner authorized continuation; the previously recorded Chapter 02 approval is preserved. [Chapter 03 — The Event Loop and I/O Lifecycle](domains/03-nodejs-internals/lessons/03-event-loop-and-io-lifecycle.md) authored/in_review. Covers phases/poll waiting, readiness versus native completion and JS observation, timer eligibility, I/O-context scheduling, resource liveness and diagnostic limits. Three educational fixtures passed seven scenarios on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Precise evidence and limits are in the chapter.

**Coverage review:** D03-C01/C02 approved mappings preserved and D03-C03 authored/in_review mapping reconciled across lesson content, curriculum, domain/root indexes, matrix and state. Total authored mappings 33: 32 approved, 1 in_review. D01/D02 nine PRDs and 30 approved lesson mappings unchanged. Chapters 04–18 not_started. Next: learner reviews Chapter 03, then Chapter 04 only. No learner assessment or implementation evidence claimed.

## D03 Chapter 03 approval and Chapter 04 — 2026-10-12

Learner authorized continuation after the Chapter 03 review request; Chapter 03 editorial approval recorded. [Chapter 04 — Scheduling Queues and Timers](domains/03-nodejs-internals/lessons/04-scheduling-queues-and-timers.md) authored/in_review, covering context-specific queue order, nested scheduling, finite starvation/callback progress, timer eligibility/cancellation, repeated async work and error channels. Five educational code blocks produced six standalone fixtures; twelve execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, explicit CJS/ESM. Error-fixture nonzero outcomes were intentional and verified; no learner assessment or implemented product claimed.

**Mandatory coverage review:** D03-C03 moved to approved with its chapter-level row; D03-C04 mapped separately as authored/in_review. Matrix, lesson statuses, curriculum, domain/root indexes and canonical state reconciled in this change. Total authored mappings 34: 33 approved, 1 in_review. D01/D02 thirty chapter mappings and nine product PRDs unchanged. Chapters 05–18 not_started; projects and implementation not_started; assessment deferred. Next: learner reviews Chapter 04 before Chapter 05 only.

## D03 Chapter 04 approval and Chapter 05 — 2026-10-12

Learner authorized continuation after the Chapter 04 review request; Chapter 04 editorial approval recorded. [Chapter 05 — EventEmitter and Callback Contracts](domains/03-nodejs-internals/lessons/05-eventemitter-and-callback-contracts.md) authored/in_review. Covers synchronous dispatch and reentrancy, listener mutation/once, async completion and error channels, missed-event waits, subscription ownership, warning thresholds and consistent callback timing. Six standalone educational fixtures passed seventeen scenarios on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM; deliberate uncaught errors and warnings were isolated and verified. No learner assessment or implemented product claimed.

**Mandatory coverage review:** D03-C04 moved to approved with its chapter-level row; D03-C05 mapped separately as authored/in_review. Matrix, both lesson statuses, curriculum, root/domain indexes and canonical state reconciled in this change. Total authored mappings 35: 34 approved, 1 in_review. D01/D02 thirty chapter mappings and nine product PRDs unchanged. Chapters 06–18 not_started; catalog/PRDs and implementation not_started; assessment deferred. Next: learner reviews Chapter 05 before Chapter 06 only.

## D03 Chapter 05 approval and Chapter 06 — 2026-10-12

Learner explicitly approved Chapter 05. [Chapter 06 — Buffers, Bytes and Text Encoding](domains/03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md) authored/in_review. Covers text/code units/bytes, view/copy ownership, byte windows, typed-array conversions, initialization and valid ranges, incremental UTF-8 and record boundaries. Five educational fixtures passed twelve scenarios on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. All 256 partitions of a nine-byte valid sample decoded correctly with StringDecoder; independent chunk decoding differed in 248. Incomplete/invalid input and intentional record rejection checked; no uninitialized bytes exposed. No learner assessment or implemented product claimed.

**Mandatory coverage review:** D03-C05 moved to approved with its chapter-level row; D03-C06 mapped separately as authored/in_review. Matrix, both lesson statuses, curriculum, root/domain indexes and canonical state reconciled in this change. Total authored mappings 36: 35 approved, 1 in_review. D01/D02 thirty chapter mappings and nine product PRDs unchanged. Chapters 07–18 not_started; catalog/PRDs and implementation not_started; assessment deferred. Next: learner reviews Chapter 06 before Chapter 07 only.

## D03 Chapter 06 approval and Chapter 07 — 2026-10-12

Learner explicitly approved Chapter 06. [Chapter 07 — Filesystem I/O and Resource Ownership](domains/03-nodejs-internals/lessons/07-filesystem-io-and-resource-ownership.md) authored/in_review. Covers API timing/error contracts, paths versus handles, valid counts/positions, closure, controlled write progress, check/use races, flags and watcher/cancellation/durability limits. Four educational fixtures passed fifteen scenarios on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Explicit handles closed on exercised paths; verification harness confirmed the temporary-file parent empty after every scenario. Controlled short requests and faults were labeled; missing-file/consumer/write failures preserved exit status 1. No learner assessment, watcher portability, crash-durability or implemented product claimed.

**Mandatory coverage review:** D03-C06 moved to approved with its chapter-level row; D03-C07 mapped separately as authored/in_review. Matrix, both lesson statuses, curriculum, root/domain indexes and canonical state reconciled in this change. Total authored mappings 37: 36 approved, 1 in_review. D01/D02 thirty chapter mappings and nine product PRDs unchanged. Chapters 08–18 not_started; catalog/PRDs and implementation not_started; assessment deferred. Next: learner reviews Chapter 07 before Chapter 08 only.

## D03 Chapter 07 explicit approval and Chapter 08 — 2026-10-12

The learner explicitly instructed this chat to record approval of [Chapter 07 — Filesystem I/O and Resource Ownership](domains/03-nodejs-internals/lessons/07-filesystem-io-and-resource-ownership.md). Transition: `in_review → approved_by_learner`; this is editorial approval, not competence or implementation evidence. The current instruction is sufficient authorization; the referenced conversation preview was used only as context.

[Chapter 08 — Readable and Writable Stream Mechanics](domains/03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md) authored in English and moved `not_started → in_progress → drafted → in_review`. Four exact lesson blocks passed thirteen standalone ESM execution scenarios on Node v26.4.0, V8 14.6.202.34-node.21, libuv 1.52.1, darwin/arm64. Section 12 records commands and observed outcomes, including intentional sink/finalization failures, queue accounting, and logical cleanup. Official v26.4.0 API documentation and Context7 checked. No real socket/descriptor or global memory guarantee inferred.

**Mandatory coverage review:** D03-C07 approved crosswalk added; D03-C08 separately mapped as authored/in_review. Matrix, both lesson statuses, curriculum, root/domain indexes and canonical state reconciled together. Total authored mappings 38: 37 approved, 1 in_review. D01/D02 thirty approved mappings and nine PRDs unchanged. Chapters 09–18 not_started; catalog/PRDs and implementation not_started; assessment deferred. No project architecture or implementation selected.

**Handoff:** active domain D03, active deliverable Chapter 08/in_review; no technical blockers. Only pending question: learner editorial approval/revision of Chapter 08. Do not author Chapter 09 until explicit approval. Verified baseline: `c08dd49767761ca9662749f59792518e7615fb39`; resulting change is identified by its containing Git commit.

## D03 Chapter 08 explicit approval and Chapter 09 — 2026-10-13

Learner explicitly confirmed “تایید بریم بعدی” in this chat after the Chapter 08 review handoff. [Chapter 08](domains/03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md) transitioned `in_review → approved_by_learner` on 2026-10-13. [Chapter 09 — Pipelines, Transforms and Cancellation](domains/03-nodejs-internals/lessons/09-pipelines-transforms-and-cancellation.md) authored in English: `not_started → in_progress → drafted → in_review`. Only Chapter 09 was authored.

**Evidence:** five exact lesson blocks passed fifteen standalone ESM scenarios on Node v26.4.0, V8 14.6.202.34-node.21, libuv 1.52.1, darwin/arm64. Source/transform/sink/flush failures, generator abort/finally, finished wait-abort versus stream operation, premature close, iterator ownership and Web conversion/cancellation checked. The final examples incorporate observed AggregateError abort causes and retained fromWeb locks. Commands/results/limits are in Chapter 09 Section 13. Official pinned API documents and Context7 checked; author quality gates reviewed. Logical resource release is not a real descriptor/transport test.

**Coverage reconciliation:** D03-C08 approved crosswalk added; D03-C09 separately mapped as authored/in_review. Both lessons, curriculum, domain/root indexes, matrix and canonical state reconciled in this change. Total authored mappings 39: 38 approved, 1 in_review. D01/D02 thirty approved mappings and nine product PRDs preserved; no assessed competency or external implementation evidence.

**Handoff:** baseline `b6f1b6e097774b0da1d857ba3162aea00fd8058e`; resulting change identified by its containing commit. D03 active, Chapter 09/in_review; no technical blockers. Pending decision: approve/revise Chapter 09. Chapters 10–18 remain not_started; do not author Chapter 10 until explicit learner approval. Catalog/PRDs and implementation not_started; assessment deferred. No project architecture or implementation decisions made.

## D03 Chapter 09 learner approval and Chapter 10 authored — 2026-10-13

Learner explicitly approved [Chapter 09 — Pipelines, Transforms and Cancellation](domains/03-nodejs-internals/lessons/09-pipelines-transforms-and-cancellation.md) in the current chat. It transitioned `in_review → approved_by_learner`. Authored only [Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation](domains/03-nodejs-internals/lessons/10-native-asynchronous-work-and-thread-pool-saturation.md), which remains **authored/in_review**, not yet learner-approved. Chapter 11 remains not_started.

**Author evidence:** consulted official Node CLI, libuv thread-pool, Node DNS, crypto and filesystem documentation; verified 14 independent Node `v22.16.0`, libuv `1.49.2`, V8 `12.4.254.21-node.26`, OpenSSL `3.0.16`, Linux/x64 educational fixture invocations. Controlled examples contrast `UV_THREADPOOL_SIZE=1,2,4` for shared native pool and unrelated filesystem callback, sync/async PBKDF2 with a JS timer, and a `Promise.race` deadline that does not cancel ongoing native work. Outputs, commands, scope and repeatability limits are recorded in the lesson Section 15. Earlier chapters' Node `v26.4.0` macOS evidence remains separate. No performance guarantee, native queue-time instrumentation, assessed learner competence or project implementation claimed.

**Mandatory coverage reconciliation:** the [Coverage Matrix](projects/coverage-matrix.md) now includes D03-C09 as learner-approved and D03-C10 as authored/in_review. Total authored chapter mappings: **40 (39 editorially approved; 1 in_review)**. D01/D02 thirty approved chapter mappings and all nine product PRDs unchanged. Root/domain READMEs, roadmap, curriculum and canonical state reconciled.

**Handoff:** active domain D03; Chapter 10 pending learner review; Chapter 11–18 not_started. D03 project catalog, PRDs and implementation not_started; assessments deferred. Do not interpret an educational benchmark comparison as a chosen product runtime, thread-count requirement or capacity policy.

## D03 Chapter 10 learner approval and Chapter 11 authored — 2026-10-13

Learner explicitly approved [Chapter 10 — Native Asynchronous Work and Thread-Pool Saturation](domains/03-nodejs-internals/lessons/10-native-asynchronous-work-and-thread-pool-saturation.md) in the current conversation: `in_review → approved_by_learner`. Authored only [Chapter 11 — Worker Threads and Data Ownership](domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md), with status `authored/in_review` and **no learner approval inferred**. Chapter 12 remains not_started.

**Educational execution:** five standalone Node ESM Worker fixtures each repeated three times (15 successful independent process invocations) on Node `v22.16.0`, V8 `12.4.254.21-node.26`, libuv `1.49.2`, Linux/x64. The fixtures show main timer versus Worker CPU execution, structured clone versus transferable ArrayBuffer ownership/detachment, SharedArrayBuffer+Atomics increments, intentional Worker error/exit, and start-acknowledged Worker termination. One additional pre-start terminate counterexample (exit code 0 with no result) is separately noted in Section 16. The lesson is educational and cannot establish cross-platform, security sandbox, performance, user competency or project-implementation evidence. Reference Node v22 Worker documentation and the Node worker-pool guide checked; author quality gates reviewed.

**Coverage Matrix review:** [matrix](projects/coverage-matrix.md) reconciled with both lesson files, curriculum, domain/root indexes, roadmap and canonical state. D03-C10 now learner-approved; D03-C11 mapped as authored/in_review. **41 authored chapter mappings: 40 learner-approved editorially and 1 in_review.** All nine D01/D02 PRDs and thirty D01/D02 approved lesson mappings unchanged. No D03 catalog/PRD, learner assessment or implemented project evidence claimed.

**Handoff:** active deliverable D03 Chapter 11, awaiting learner editorial review; Chapters 12–18 not_started. Next decision: learner approves Chapter 11 or requests revisions. Do not interpret the educational Worker examples as a chosen technical architecture or scope change for any project.

## D03 Chapter 11 learner approval and Chapter 12 authored — 2026-10-13

Learner explicitly approved [Chapter 11 — Worker Threads and Data Ownership](domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md) in this chat: `in_review → approved_by_learner`. Authored only [Chapter 12 — Child Processes, IPC and Cluster Boundaries](domains/03-nodejs-internals/lessons/12-child-processes-ipc-and-cluster-boundaries.md): `not_started → drafted → in_review`. Chapter 12 **has not been approved**; Chapter 13 remains not_started.

**Evidence:** seven standalone ESM fixtures executed three times each (**21 independent local educational checks**) on Node `v22.16.0`, V8 `12.4.254.21-node.26`, libuv `1.49.2`, Linux/x64. Verified spawn stdout/stderr and exit/close; execFile literal argv and output overflow; fork IPC with advanced Map serialization and distinct PID; stdout pressure/drain; SIGTERM after child readiness; two-cluster-worker shared port and separate PIDs; missing-executable ENOENT negative path. Exact runnable examples, observed outputs, source URLs and platform limitations appear in Chapter 12 Section 17. No production subprocess management, security sandbox, OS-portability guarantee, learner assessment or implementation evidence.

**Mandatory coverage reconciliation:** [Coverage Matrix](projects/coverage-matrix.md) reconciled with the two lessons, curriculum, domain/root indexes, roadmap and canonical state. D03-C11 approved; D03-C12 mapped as authored/in_review. **42 authored lesson mappings: 41 approved editorially, 1 in_review**. Nine D01/D02 approved PRDs and thirty D01/D02 lesson mappings unchanged. D03 project catalog/PRDs and implementation remain not_started.

**Handoff:** active domain D03, Chapter 12 in_review. Pending learner decision: approve/revise Chapter 12. Do not begin Chapter 13 until explicit approval. This chapter teaches mechanisms but does not select any product implementation topology.

## D03 Chapter 12 learner approval and Chapter 13 authored — 2026-10-13

Learner explicitly approved [Chapter 12 — Child Processes, IPC and Cluster Boundaries](domains/03-nodejs-internals/lessons/12-child-processes-ipc-and-cluster-boundaries.md) in this chat: `in_review → approved_by_learner`. Authored only [Chapter 13 — Module Resolution and Runtime Loading](domains/03-nodejs-internals/lessons/13-module-resolution-and-runtime-loading.md): `not_started → drafted → in_review`. **Chapter 13 has not been approved**; Chapter 14 remains not_started.

**Educational evidence:** read the pinned official Node v22.16.0 packages, ESM, CJS and node:module documentation; ran nine standalone fixture entry points three times each (**27/27 expected outcome checks**) on Node `v22.16.0`, V8 `12.4.254.21-node.26`, libuv `1.49.2`, Linux/x64. Covered ESM explicit extensions versus CJS extension probing, conditional package exports/imports, public/private subpaths, CJS/ESM caches and query-distinct URL identity, partial CJS cycles versus expected ESM `ReferenceError` (three intentionally nonzero exits), synchronous `require(esm)` versus top-level-await rejection, JSON import attributes and CJS bridges. Exact fixture setup, observed outputs, run manifest, version limits and untested TS/bundler behavior recorded in Chapter 13 Sections 5–11 and 17. No compiler tests, learner study assessment, implementation or production compatibility guarantee claimed.

**Mandatory Coverage Matrix reconciliation:** [matrix](projects/coverage-matrix.md) mapped D03-C12 as learner-approved and D03-C13 as authored/in_review. **43 authored lesson mappings: 42 learner-approved editorially, 1 in_review.** Thirty D01/D02 approved mappings and all nine D01/D02 product PRDs unchanged. Root/domain READMEs, roadmap, curriculum and canonical state reconciled. D03 project catalog/PRDs and implementation remain not_started.

**Handoff:** active deliverable D03 Chapter 13 awaiting learner editorial review. Chapters 14–18 not_started. Do not begin Chapter 14 until explicit approval; no technical architecture/product scope is implied by module experiments.

## D03 Chapter 13 learner approval and Chapter 14 authored — 2026-10-13

Learner explicitly approved [Chapter 13 — Module Resolution and Runtime Loading](domains/03-nodejs-internals/lessons/13-module-resolution-and-runtime-loading.md) in this chat: `in_review → approved_by_learner`. Authored only [Chapter 14 — V8 Execution, Memory and Garbage Collection](domains/03-nodejs-internals/lessons/14-v8-execution-memory-and-garbage-collection.md): `not_started → authored → in_review`. **Chapter 14 has not been approved; Chapter 15 remains not_started.**

**Execution evidence:** six ESM educational fixtures run three times each (**18 independent local process invocations**) on Node `v22.16.0`, V8 `12.4.254.21-node.26`, libuv `1.49.2`, Linux/x64. Covered hot property access optimization followed by the `wrong map` deopt trace, JS-heap retention/release after controlled GC, 32 MiB Buffer accounted in external/ArrayBuffers rather than equivalent heapUsed, temporary-object churn with small post-GC retained delta, GC PerformanceObserver entries, and heap-space statistics. All commands, outputs and caveats are in Chapter 14 Section 18; `--expose-gc` and `--trace-opt --trace-deopt` were limited to isolated fixtures. The author checked official Node v22 release-line docs and V8 references. Results are not a production benchmark, GC pause/CPU SLA, heap budget, OS-portability result, learner assessment or implemented product evidence.

**Mandatory coverage reconciliation:** [Coverage Matrix](projects/coverage-matrix.md) updated D03-C13 to learner-approved and mapped D03-C14 separately as authored/in_review. **44 authored lesson mappings: 43 learner-approved editorially and 1 in_review.** Thirty D01/D02 approved lesson mappings and nine D01/D02 approved product PRDs unchanged. Domain and root README, curriculum, ROADMAP and canonical state reconciled. D03 catalog, PRDs and implementation still not_started; learner assessment deferred.

**Handoff:** active domain D03; Chapter 14 awaits explicit learner editorial approval or revision request. Do not author Chapter 15 until learner approval. Memory experiments are educational and authorize no product scope expansion or implementation architecture.

## D03 Chapter 14 approval and Chapter 15 draft — catch-up, 2026-10-13

Learner explicitly approved [Chapter 14 — V8 Execution, Memory and Garbage Collection](domains/03-nodejs-internals/lessons/14-v8-execution-memory-and-garbage-collection.md) on 2026-10-13; the chapter was updated to `approved_by_learner`. The next lesson, [Chapter 15 — Async Context and Diagnostic Causality](domains/03-nodejs-internals/lessons/15-async-context-and-diagnostic-causality.md), was authored with five educational Node v22.16.0/Linux ESM fixture scripts, each executed three times (**15/15 expected checks**), covering AsyncLocalStorage, EventEmitter bind/snapshot, AsyncResource, explicit Worker correlation and mutable store. Chapter 15 remained `in_review` after authoring. Canonical state, curriculum, domain/root indexes, roadmap and Coverage Matrix were updated then, but **this human TRACKER was still stale**; this dated catch-up explicitly reconciles that previously missed tracker change. No study assessment or project implementation occurred.

**Coverage review catch-up:** [Coverage Matrix](projects/coverage-matrix.md) recorded D03-C14 approved, D03-C15 authored/in_review (45 authored/44 approved at that milestone). Historical mapping and approval preserved.

## D03 Chapter 15 learner approval and Chapter 16 authored — 2026-10-13

Learner explicitly approved [Chapter 15 — Async Context and Diagnostic Causality](domains/03-nodejs-internals/lessons/15-async-context-and-diagnostic-causality.md) in the current chat: `in_review → approved_by_learner`. Authored only [Chapter 16 — Runtime Failures and Graceful Shutdown](domains/03-nodejs-internals/lessons/16-runtime-failures-and-graceful-shutdown.md), status **authored/in_review**, not learner-approved. Chapter 17 remains not_started.

**Educational evidence:** seven Node `v22.16.0`, V8 `12.4.254.21-node.26`, libuv `1.49.2`, Linux x64 ESM fixtures each independently run three times (**21/21 expected outcomes**). Included beforeExit/exit, process.exit vs exitCode in spawned children, thrown/rejected/emitter failures (explicit `--unhandled-rejections=throw`), HTTP active request draining under server.close(), Linux SIGTERM child handler and graceful HTTP response, deliberately stalled connection with forced socket closure, and AbortSignal-scoped timer cancellation. Full commands/source/results and limitations in Chapter 16 Section 18. These are scoped educational tests, not a production shutdown guarantee, automatic rollback, OS portability claim, student mastery or implemented product.

**Mandatory coverage reconciliation:** [matrix](projects/coverage-matrix.md) now marks D03-C15 approved and D03-C16 authored/in_review. **46 authored chapter mappings: 45 editorially approved, 1 in_review**, including 30 approved D01/D02 chapters and 15 approved D03 chapters. The nine approved D01/D02 product PRDs and all implementation statuses remain unchanged. Cross-checked curriculum, D03 index, root README, ROADMAP and canonical state. Assessments deferred; D03 project catalog/PRDs not_started.

**Handoff:** active domain D03; Chapter 16 awaits learner editorial review. Chapters 17–18 not_started; no assessment or product implementation. Next step after explicit Chapter 16 approval: author Chapter 17 — Runtime Diagnostics and Measurement — only.

## D03 Chapter 16 approved and Chapter 17 authored — 2026-10-13

Learner explicitly approved [Chapter 16 — Runtime Failures and Graceful Shutdown](domains/03-nodejs-internals/lessons/16-runtime-failures-and-graceful-shutdown.md) in the latest conversation message (`تایید`): `in_review → approved_by_learner`. Authored only [Chapter 17 — Runtime Diagnostics and Measurement](domains/03-nodejs-internals/lessons/17-runtime-diagnostics-and-measurement.md), currently **authored/in_review**. Chapter 18 **not_started**. The 18-chapter curriculum remains learner-approved as scope; study assessment and implementations remain deferred.

**Educational evidence:** 7 standalone Node v22.16.0, V8 12.4.254.21-node.26, libuv 1.49.2, Linux x64 ESM diagnostic fixtures each invoked three times in separate Node processes (**21/21 expected-outcome checks**). Exercises: monitorEventLoopDelay and ELU under controlled JS blocking; performance marks/measures/observer; synchronous Diagnostics Channel subscription and context; local Inspector CPU profile; restricted process.report summary without raw data; CPU time and resource-type API; and a counterexample where parent ELU reached 1.0 during spawnSync while parent CPU stayed ~1.5–1.9ms over ~111.5–114.9ms wall time. Exact code, output ranges, privacy/measurement limitations and official v22 references in Chapter 17 Section 19. Trace-event capture and remote production diagnostics **not tested**. No claimed production monitoring, distributed causality proof, security acceptance, learner assessment, or product implementation.

**Mandatory coverage review:** [Coverage Matrix](projects/coverage-matrix.md) reconciled with Chapter 16 approved and Chapter 17 authored/in_review. **47 authored chapter mappings: 46 editorially approved and 1 in_review** (30 D01/D02 lessons and 16 D03 lessons approved). Nine approved D01/D02 product PRDs unchanged. Curriculum, root/domain indexes, ROADMAP and machine state aligned. D03 catalog/PRDs and implementations not_started, assessments deferred.

**Handoff:** Active domain D03. Chapter 17 awaits explicit learner editorial review; do not author Chapter 18 until approval. Product PRDs remain implementation-neutral and separate from this educational runtime diagnostic content.

## D03 Chapter 17 learner approval and Chapter 18 authored — 2026-10-13

Learner explicitly approved [Chapter 17 — Runtime Diagnostics and Measurement](domains/03-nodejs-internals/lessons/17-runtime-diagnostics-and-measurement.md) in this chat: `in_review → approved_by_learner`. Authored only [Chapter 18 — Integrated Runtime Failure and Performance Case Studies](domains/03-nodejs-internals/lessons/18-integrated-runtime-failure-and-performance-case-studies.md): `not_started → authored → in_review`. **Chapter 18 is not learner-approved.** Every chapter from D03-C01 to D03-C18 has a lesson file, but that alone does not close the D03 editorial lesson gate. The candidate catalog, PRDs and project implementations remain not_started; study assessment deferred.

**Educational evidence:** seven standalone Node v22.16.0, V8 12.4.254.21-node.26, libuv 1.49.2, Linux x64 diagnostic case fixtures each repeated three times (**21/21 primary expected outcomes**), plus six separately launched `UV_THREADPOOL_SIZE=1/4` comparison invocations (**27 final checked runs total**). Covered loop-delay sampling under bounded JS blocking, pipeline AbortError/destroy without assuming late callback cancellation, fs.stat/PBKDF2 pool competition, transferred ArrayBuffer alias detachment and DataView throwing TypeError, retained/released managed heap, CommonJS/ESM missing extension, and client disconnect despite a prior **local** server-side increment. The chapter explicitly distinguishes local simulated state from any durable external business commit. Two initial fixture errors (detached DataView getter; incorrect ClientRequest.readableEnded expectation) were corrected before final verification and are recorded, not counted as passing. All samples and limitations are documented in Chapter 18 Section 19. Official Node v22 references reviewed. No production benchmark, release portability guarantee, learner proficiency certification or implemented product claim.

**Mandatory Coverage Matrix reconciliation:** [matrix](projects/coverage-matrix.md) updated D03-C17 to approved and D03-C18 to authored/in_review. **48 authored chapter mappings: 47 learner-approved editorially, 1 in_review.** D01/D02 30 lesson approvals and nine approved product PRDs unchanged. Root/domain indexes, curriculum, ROADMAP and canonical machine state reconciled. Assessment deferred; no D03 catalog, PRD or implementation.

**Handoff:** active domain D03; Chapter 18 pending explicit learner editorial approval. Next action: request approval or revisions to Chapter 18. Once approved, reconcile all D03-C01–C18 lesson mappings and then begin the **distinct D03 project candidate catalog** as the next workflow step. Do not author catalog/PRDs early or infer project architecture from integrated teaching cases.

## D03 Chapter 18 approved; 18-lesson gate complete; five candidates in review — 2026-10-13

**Explicit editorial approval:** Learner approved [Chapter 18 — Integrated Runtime Failure and Performance Case Studies](domains/03-nodejs-internals/lessons/18-integrated-runtime-failure-and-performance-case-studies.md) in the current conversation: `in_review → approved_by_learner`. All **D03-C01 through D03-C18** are now learner-approved editorially, and D03's **lesson-authoring gate is complete**. This does **not** certify learner mastery, product implementation, or overall domain content completion. Chapter 18's educational evidence remains scoped to the 27 Node v22.16.0/Linux checks documented in the lesson; no new runtime tests are claimed here.

**New catalog for learner review:** [D03 Project Candidate Catalog](domains/03-nodejs-internals/projects/catalog.md) contains **five proposed, distinct product concepts**, all `in_review` and none approved or selected: P01 IntakeLedger (verified file handoff), P02 MediaForge (content asset processing), P03 NodeScope (incident evidence), P04 PackageClinic (trusted runtime preflight), and P05 LiveRoom (interactive audience sessions). Each identifies primary users, real product problem, first-version observable user journey, **in/out/deferred boundaries**, key runtime learning pressure and overlap safeguards against D01/D02 existing approved products. Any actual execution of third-party package code (P04) remains a substantial later security/product decision; this catalog neither assumes safety nor prescribes isolation. Project names are working titles only. **No D03 PRDs were authored or approved, no project implementation started**, no architecture/tech stack selected.

**Mandatory coverage reconciliation:** [Coverage Matrix](projects/coverage-matrix.md) audited all eighteen D03 lesson IDs, their live links and approval statuses: **48 authored chapter mappings, 48 learner-approved editorially, 0 in_review** across D01–D03 (30 D01/D02 + 18 D03). Nine previously approved D01/D02 PRDs remain unchanged. The candidate catalog has a separate *proposal-only* mapping table and is linked in D03 overview; candidate concepts are **not** approved PRD challenges or verified project implementations. Assessment remains deferred, all D03 PRDs not_started. Domain index, curriculum, README, ROADMAP and canonical machine state reconciled.

**Handoff / next decision:** learner approves, narrows or revises the five-candidate catalog. After explicit catalog review, author one separate implementation-neutral PRD at a time following the user-approved workflow, with clear scope and essential behaviors but no forced engineering implementation. **D03 overall content gate remains open**; D04 lesson authoring does not start yet.
