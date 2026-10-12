# D03 — Node.js Internals

**Status:** in_progress — lesson authoring.  
**Curriculum:** [18-chapter plan](curriculum.md), approved_by_learner on 2026-10-12.  
**Lessons:** 5 authored: Chapters 01–04 learner-approved; Chapter 05 in_review; Chapters 06–18 not_started.  
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

5. [Chapter 05 — EventEmitter and Callback Contracts](lessons/05-eventemitter-and-callback-contracts.md) — authored/in_review; seventeen educational execution scenarios passed on Node v26.4.0, libuv 1.52.1, darwin/arm64, ESM. Intentional errors/warnings and cleanup outcomes were checked; no learner assessment or implemented product is claimed.

## Next action and handoff

Chapters 01–04 are learner-approved. Review Chapter 05 — EventEmitter and Callback Contracts — before authoring Chapter 06. The [project catalog](projects/catalog.md) remains a scaffold and will be developed after lesson authoring.

[Canonical state](../../tracking/state.json) · [Human tracker](../../TRACKER.md) · [Workflow](../../docs/workflow.md) · [Coverage matrix](../../projects/coverage-matrix.md).

**Coverage review — 2026-10-12:** D03-C01 through D03-C04 mapped as learner-approved editorially; the 30 approved D01/D02 mappings remain unchanged. C05 is mapped separately as authored/in_review; C06–C18 remain planned; no PRD, learner assessment or implementation evidence exists.
