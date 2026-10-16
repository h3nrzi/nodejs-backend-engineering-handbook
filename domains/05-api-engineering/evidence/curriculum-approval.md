# D05 curriculum approval — 2026-10-16

**Gate:** curriculum and chapter-depth authoring contract `approved_by_learner`.
**Authority:** explicit Product Owner instruction “D05 Curriculum Approval and Chapter 01 Authoring” in this chat, 2026-10-16.
**Reviewed baseline:** `6e7048b0c89e7fc4ad3700711edbfe583760c784` (clean `main`).

## Reconciliation against the recorded decisions

The canonical IDs are D05-CD01–D05-CD07. The request's CD01–CD07 refer to these same rows in [the curriculum decision record](../curriculum.md#open-curriculum-decisions); no decision was renamed or redefined. The original definitions and pending state remain recoverable at the baseline and in the historical discovery evidence.

| ID | Existing proposal | Explicit approval reconciled | Result |
|---|---|---|---|
| D05-CD01 | 25 chapters; separate C08/C09/C10 and C16/C17/C18 | Preserve the proposed 25-chapter curriculum | approved_by_learner |
| D05-CD02 | Full C19 GraphQL and C20 gRPC mechanism chapters | Independent mechanism-oriented GraphQL and gRPC chapters | approved_by_learner |
| D05-CD03 | Framework-neutral contracts; bounded Node/TypeScript examples | Framework-independent with appropriate Node.js/TypeScript educational examples | approved_by_learner |
| D05-CD04 | OpenAPI 3.2.1 and JSON Schema 2020-12; actual tool qualification may use a recorded older fixture line | Current authoritative references including these versions; validate actual support during authoring | approved_by_learner |
| D05-CD05 | Reservation/booking context plus inventory, artifact and notification transfer cases | Recurring reservation scenario plus inventory, file-processing and notification examples | approved_by_learner; artifact/file-processing is the same transfer context, no scope conflict |
| D05-CD06 | Signpost SOAP/OData/federation; no full specialization chapter initially | Proportionate coverage without dedicated deep dives | approved_by_learner |
| D05-CD07 | Shared mechanism gate, chapter adverse trace and independent rubric | Complete causal/normal/adverse/comparison/independent-exercise depth rubric | approved_by_learner |

No interpretation conflict was found. Approval applies to [the 25-chapter curriculum](../curriculum.md) and [its controlling depth specification](../depth-specification.md), including all four uniform-interface subconstraints in C01. Numeric policies and toy mechanisms in lessons are educational assumptions, not approved project policies.

## Authorization and exclusions

The same instruction explicitly authorizes a complete D05-C01 draft, mechanism ledger, source/example validation, canonical reconciliation, commit and push. **D05-C01 remains `in_review`.** C02–C25 remain `not_started`; stop before C02 pending explicit Product Owner approval and further authorization.

No D05 lesson, concept or educational Project Charter is approved by this record. There are zero D05 Charters. No project implementation, Product Discovery, Technical Discovery, Final PRD, Module Plan, project architecture or learner competence is approved. D01–D04's 66 lesson and 20 Charter approvals, D04 closure and MediaForge's qualified external planning record are preserved.

## Historical evidence and current review

The original [discovery guide](review-guide.md) and [discovery preflight](preflight.json) are retained as historical evidence of the proposal's pending state. They are not rewritten as if the checks had run after approval. Current C01 review, execution evidence and the pending human checkpoint live in [the C01 guide](c01/review-guide.md), [depth ledger](c01/depth-ledger.md) and [validation record](c01/validation.md). Publishing or automated validation does not grant editorial approval.
