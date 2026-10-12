# Handbook progress tracker

**Updated:** 2026-10-12  
**Phase:** content_and_project_planning  
**Current authoring focus:** D03 — Node.js Internals curriculum planning (not yet started)  
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

**D03–D16:** not started.

## Next action

D02 content-authoring gate is closed. Draft D03 Node.js Internals curriculum blueprint, present it for learner editorial approval, then begin D03 lessons only after approval. Resolve D01's remaining product questions only when preparing an implementation handoff. Do not initiate educational assessments unless the learner explicitly begins studying.

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

Curriculum blueprint approval → chapter-by-chapter lessons → project catalog → behavior-only PRDs → domain content closure. Study assessments and Codex implementation remain separate. D01 and D02 content gates are closed; D03 curriculum is the next planning deliverable and has not been authored or approved.
