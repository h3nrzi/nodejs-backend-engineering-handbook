# D05 — API Engineering

**Curriculum / depth contract:** `approved_by_learner`, 2026-10-16 — [CD01–CD07 reconciliation and approval](evidence/curriculum-approval.md).
**Domain:** `in_review`. **Inventory:** 25 approved chapter profiles; one authored chapter `in_review`, 24 `not_started`; zero D05 concepts or educational Project Charters.
**Implementation:** not_started. **Learner assessment:** deferred_until_learning_phase.

## Purpose and boundaries

Teach consumer-visible API contracts from foundations through concurrent state changes, compatibility, asynchronous and persistent interfaces, verification and diagnosis. D04 networking is a prerequisite; D05 applies those semantics without repeating its transport curriculum. The [ownership map](curriculum.md#ownership-and-adjacent-domain-map) defines boundaries with architecture, storage, security, distributed systems and operations.

## Curriculum and authored chapter index

- [Approved curriculum](curriculum.md): preserved 25-chapter sequence, dependencies, ownership, coverage/gaps and approved decisions.
- [Approved depth matrix and full profiles](depth-specification.md): controlling mechanism-level authoring/completion gates.
- **[D05-C01 — APIs as Contracts and REST as an Architectural Style](lessons/01-apis-as-contracts-and-rest.md): complete draft `in_review`.** [Depth ledger](evidence/c01/depth-ledger.md) · [Validation](evidence/c01/validation.md) · [Review guide](evidence/c01/review-guide.md).
- C02–C25: `not_started`; the curriculum table is the full approved sequence. No placeholder lesson files.
- [Primary-source register](references.md): discovery references plus dated C01 lookup qualifications.
- [Historical discovery evidence](evidence/review-guide.md) and [preflight](evidence/preflight.json): preserved earlier proposal checks and pending-state context.

## Exercises and evidence

C01 supplies independent exercises/rubrics and two executed pure Node.js models. Their actual outcomes and limits are separate from editorial approval. They establish no actual HTTP, schema-tool, durable storage or provider integration, and no learner assessment. Other profiles remain future teaching obligations; C02–C25 experiments are unrun.

## Project catalog and coverage

[Catalog](projects/catalog.md) remains `not_started`. Later authorized authoring may propose differentiated concepts and educational Charters using [the Charter template](../../templates/project-charter.md). Final PRDs and Module Plans belong to separately selected implementation repositories under [Workflow V2](../../docs/workflow.md).

[D05 global coverage](../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage) distinguishes C01 authored coverage from 24 unstarted chapters. No D05 Charter mapping exists; the 66 approved D01–D04 lessons and 20 approved Charters are unchanged.

## Review and next action

Open [C01 §9](lessons/01-apis-as-contracts-and-rest.md#9-uniform-interface-fourth-constraint-hypermedia-drives-application-state), compare the two consumers across the changed transition, and follow [the current guide](evidence/c01/review-guide.md). Human evaluation remains `not_run`; chapter editorial approval is pending. **Stop before C02 and wait for explicit Product Owner approval and authorization.** No project implementation, Product/Technical Discovery, Final PRD or Module Plan is authorized.

[Canonical state](../../tracking/state.json) · [Tracker](../../TRACKER.md).
