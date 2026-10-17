# D05 — API Engineering

**Curriculum / depth contract:** `approved_by_learner`, 2026-10-16 — [CD01–CD07 reconciliation](evidence/curriculum-approval.md).
**Domain:** `in_review`. **Inventory:** 25 approved chapter profiles; two authored chapters: C01 `approved_by_learner`, C02 `in_review`; C03–C25 `not_started`. Zero D05 concepts or educational Project Charters.
**Implementation:** not_started. **Learner assessment:** deferred_until_learning_phase.

## Purpose and boundaries

Teach consumer-visible API contracts from foundations through concurrent state changes, compatibility, asynchronous and persistent interfaces, verification and diagnosis. D04 networking is a prerequisite. The [ownership map](curriculum.md#ownership-and-adjacent-domain-map) defines adjacent-domain boundaries. Curriculum approval and individual chapter editorial approval are separate gates; D05 is not complete.

## Curriculum and authored chapter index

- [Approved curriculum](curriculum.md): preserved 25-chapter sequence, dependencies, coverage and CD01–CD07.
- [Approved depth matrix and profiles](depth-specification.md): controlling mechanism-level completion gates; profile definitions unchanged.
- **[D05-C01 — APIs as Contracts and REST as an Architectural Style](lessons/01-apis-as-contracts-and-rest.md): approved_by_learner**, explicit Product Owner editorial approval 2026-10-16. [Approval record](evidence/c01/editorial-approval.md) · [original ledger](evidence/c01/depth-ledger.md) · [execution/validation](evidence/c01/validation.md). Submitted lesson/evidence bytes remain preserved; their historical pending labels are superseded by the approval record and canonical tracking.
- **[D05-C02 — Resources, Operations and Workflow Modeling](lessons/02-resources-operations-and-workflow-modeling.md): complete draft in_review.** [Depth ledger](evidence/c02/depth-ledger.md) · [Validation](evidence/c02/validation.md) · [Current review guide](evidence/c02/review-guide.md).
- C03–C25: `not_started`. No placeholder lessons or work beyond C02.
- [Primary-source register](references.md): dated source/library qualifications.
- [Historical discovery guide](evidence/review-guide.md), [preflight](evidence/preflight.json) and [curriculum approval](evidence/curriculum-approval.md): retained original scope and pending-state history.

## Exercises and evidence

C01 and C02 each supply independent exercises/rubrics and two executed bounded Node pure-model scripts. C02 includes eighteen modeling mechanisms, two coherent reservation models and three editable/rendered diagrams. Actual execution is distinct from editorial approval. No HTTP, schema-tool, durable storage, payment provider or true concurrent integration is established, and no learner assessment has run. C03–C25 experiments remain unrun.

## Project catalog and coverage

[Catalog](projects/catalog.md) remains `not_started`, with zero D05 Charters and no direct/supporting project mappings. The [global matrix](../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage) reconciles **68 authored lessons = 67 approved + C02 in_review**, including the unchanged 66 approved D01–D04 lessons and 20 approved Charters. No existing scope or mapping changes. Final PRDs, Module Plans and implementation belong to separately authorized project repositories under [Workflow V2](../../../docs/workflow.md).

## Review and next action

Open [C02 §17 — competing models](lessons/02-resources-operations-and-workflow-modeling.md#17-compare-two-complete-models-for-the-same-reservation-journey), predict what happens if conversion consumes a hold before its booking exists, and follow [C02-R01](evidence/c02/review-guide.md#c02-r01--compare-the-same-journey-through-two-models). Human evaluation remains `not_run`; C02 editorial approval is pending. **Stop before C03 until explicit Product Owner approval and authorization.** No project implementation, Product/Technical Discovery, Final PRD or Module Plan is authorized.

[Canonical state](../../tracking/state.json) · [Tracker](../../../TRACKER.md).
