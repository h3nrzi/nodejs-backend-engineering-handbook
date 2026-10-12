# PRD Scope-First Alignment Audit — 2026-10-12

**Repository:** Node.js Backend Engineering Handbook
**Review scope:** all nine learner-approved product PRDs: D01 P01–P04 and D02 P01–P05.
**Policy reference:** [Workflow](workflow.md), [Agent operating contract](../AGENTS.md), [Quality gates](quality-gates.md), [PRD template](../templates/project-prd.md).
**Outcome:** all nine documents audited and aligned. **No new product direction, technical architecture or implementation approval** is implied.

## Agreed distinction

- **Handbook PRD / editorial approval:** an identifiable user problem, target audience, value, explicit **in/out/deferred scope**, core user journeys, essential observable behavior and non-goals. A PRD with these boundaries can be approved even when some exact policies or numerical limits are still open.
- **At selected project kickoff:** Codex uses the *actually installed* Matt Pocock skills to raise only necessary first-version product questions. ChatGPT can explain recommendations and trade-offs, and the learner explicitly approves consequential choices **before technical work depending on them**.
- **Scope change control:** adding out-of-scope features, changing essential behavior or target users is never a silent technical decision; obtain the learner's separate approval.
- **Ownership separation:** product questions and boundary amendments are recorded in the separate project workspace. Architecture, ADRs, tickets, tests and implementation remain outside the handbook. No competency/learning assessment was performed.

## Results by PRD

| PRD | Audit findings and editorial correction | Final editorial status |
|---|---|---|
| [D01 P01 — Workload & Complexity Observatory](../domains/01-computer-science-foundations/projects/p01-workload-complexity-observatory-prd.md) | Removed incorrect requirement to decide thresholds *before PRD approval*; moved run limits and detailed policies to Matt-guided kickoff, retaining observatory scope and honesty of benchmark results. | Approved |
| [D01 P02 — Concurrent Resource Allocation Simulator](../domains/01-computer-science-foundations/projects/p02-concurrent-resource-allocation-simulator-prd.md) | Deferred quantitative limits and first-version cancellation/retry policies to kickoff; removed obsolete next-action reference to drafting P03. Capacity and outcome invariants unchanged. | Approved |
| [D01 P03 — Dependency Workflow Simulator](../domains/01-computer-science-foundations/projects/p03-dependency-workflow-simulator-prd.md) | Separated **already approved** simulator-only, retry identity, historical evidence and accessible text-view boundaries from detailed prerequisite, cancellation, graph-display and size policies. Removed obsolete “before P04” instruction. | Approved |
| [D01 P04 — Large Dataset Processing Workspace](../domains/01-computer-science-foundations/projects/p04-large-dataset-processing-workspace-prd.md) | Distinguished approved processing/integrity/restart boundaries from open initial formats, operation subsets, exact policies and numeric limits. Corrected implication that the handbook must deliver a complete implementation-ready PRD *before* involving Codex. | Approved |
| [D02 P01 — ContractGuard](../domains/02-javascript-typescript/projects/p01-contractguard-api-data-contract-studio-prd.md) | Clarified that limits are settled in the project kickoff before dependent work; retained API contract evaluation and version-comparison scope, with authoring and audience questions explicitly open. | Approved |
| [D02 P02 — DispatchDesk](../domains/02-javascript-typescript/projects/p02-dispatchdesk-multi-recipient-delivery-operations-prd.md) | Fixed stale “PRD editorial approval pending” record; clarified that delivery semantics, limits and retry policies are not automatically approved and move to the Matt-guided kickoff. | Approved |
| [D02 P03 — PolicyLens](../domains/02-javascript-typescript/projects/p03-policylens-business-rule-decision-workspace-prd.md) | Strengthened the concise PRD with explicit **in/out scope**, core actors and journeys, named non-goals, and a structured list of first-version choices. No new capabilities were approved; product remains an explainable rule workspace, not an enforcement or script execution platform. | Approved |
| [D02 P04 — PackagePassport](../domains/02-javascript-typescript/projects/p04-packagepassport-integration-compatibility-registry-prd.md) | Recorded approval boundary and deferred evidence/environment/ownership choices, preserving registry-vs-runtime-execution exclusions. | Approved |
| [D02 P05 — SubscriptionHub](../domains/02-javascript-typescript/projects/p05-subscriptionhub-live-event-subscription-console-prd.md) | Clarified that event-domain, pause/resume details, source guarantees and limits will be reviewed with Matt/Codex at kickoff; preserved subscription console, gap transparency and explicit non-goals. | Approved |

## Consistency checks

- Checked all nine actual GitHub PRD contents after changes: each still contains `**Status:** approved_by_learner`.
- All nine now explicitly refer to Matt Pocock skill-guided first-version discovery, learner approval and separation of product scope from technical design.
- Old conflicting references to pending editorial reviews, forced decision completion before PRD approval, and previous next-PRD steps were removed from the affected files.
- Existing detailed acceptance criteria and approved requirements were not discarded to shorten the PRDs. Clarifications do **not** automatically turn a previously open suggestion into an approved requirement.
- D01 remains content-complete with four learner-approved PRDs; D02 remains content-complete with five. **D03 Node.js Internals curriculum authoring remains next and has not yet started.**

## Remaining distinctions and explicit limits

The open product questions are intentionally retained. Some—such as the target audience, product's first supported business domain or evidence policy—could materially affect the build boundary. During kickoff, any proposal that *changes* the approved audience, in-scope capabilities or a non-goal requires separate learner approval, not a quiet assumption. Other fine-grained policies and numeric thresholds can be settled in the ordinary product discovery process.

This was a **document consistency audit**, not a runtime test, independent verification of educational code or proof of implementation readiness. Existing editorial approvals from 2026-10-12 were preserved; no fresh endorsement of unapproved product decisions is asserted.

## Coverage limitation discovered in follow-up audit

This report’s scope was the nine PRDs. It did not establish that the global `projects/coverage-matrix.md` or domain catalog/handoff prose had been reconciled. The matrix remained an empty scaffold and stale catalog/next-step wording survived. See [coverage follow-up audit](coverage-matrix-audit-2026-10-12.md) for the evidence, corrections and new mandatory review gate. The nine PRD product-scope approvals remain unchanged.
