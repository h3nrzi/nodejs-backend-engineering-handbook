# D03 — Node.js Internals

**Status:** in_progress — lesson authoring.  
**Curriculum:** [18-chapter plan](curriculum.md), approved_by_learner on 2026-10-12.  
**Lessons:** 2 authored and learner-approved; Chapters 03–18 not_started.  
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

## Next action and handoff

Chapters 01–02 are learner-approved. Author Chapter 03 — The Event Loop and I/O Lifecycle — only, then request its editorial review. The [project catalog](projects/catalog.md) remains a scaffold and will be developed after lesson authoring.

[Canonical state](../../tracking/state.json) · [Human tracker](../../TRACKER.md) · [Workflow](../../docs/workflow.md) · [Coverage matrix](../../projects/coverage-matrix.md).

**Coverage review — 2026-10-12:** D03-C01 and D03-C02 mapped as learner-approved editorially; the 30 approved D01/D02 mappings remain unchanged. C03–C18 remain planned; no PRD, learner assessment or implementation evidence exists.
