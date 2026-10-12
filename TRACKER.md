# Handbook progress tracker

**Updated:** 2026-10-12  
**Phase:** content_and_project_planning  
**Current authoring focus:** D03 — Node.js Internals curriculum blueprint drafted, awaiting learner editorial review  
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

**D03 — Node.js Internals:** [18-chapter curriculum blueprint](domains/03-nodejs-internals/curriculum.md) drafted and in_review. No authored lessons, project catalog/PRDs or implementation; assessment deferred.

**D04–D16:** not started.

## Next action

D02 content-authoring gate is closed. Review and explicitly approve or revise the drafted D03 curriculum blueprint. After approval, author Chapter 01 only and request its editorial review. Resolve D01's remaining product questions only when preparing an implementation handoff. Do not initiate educational assessments unless the learner explicitly begins studying.

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

Curriculum blueprint approval → chapter-by-chapter lessons → project catalog → behavior-only PRDs → domain content closure. Study assessments and Codex implementation remain separate. D01 and D02 content gates are closed; D03 curriculum blueprint is drafted and awaits explicit learner approval.

## Global coverage reconciliation — 2026-10-12

[Coverage matrix](projects/coverage-matrix.md) reviewed and updated against all nine approved D01/D02 PRDs and all 30 authored lessons at baseline `48f227313e52a85246c0a65e1acbea3f511a1d0b`. [Detailed findings and correction evidence](docs/coverage-matrix-audit-2026-10-12.md). Nine project entries and 30 chapter-level competency mappings distinguish direct challenges, supporting theory, gaps and absent implementation evidence. Corrected stale catalog/next-step wording and P03 prerequisite terminology; no approved product scope or status changed. All implementation remains not started; assessment deferred. D03 curriculum planning remains next.

**Mandatory completion gate:** after any project/catalog/PRD mutation, mapped lesson change, domain closure or external implementation-evidence update, reconcile the matrix and update both trackers in the same change. If mapping is unchanged, record a dated, evidence-backed “reviewed; no mapping change” result with affected paths in both trackers. Work cannot be declared complete without that record. See [agent contract](AGENTS.md), [workflow](docs/workflow.md) and [quality gates](docs/quality-gates.md).

## D03 curriculum planning — 2026-10-12

[Proposed 18-chapter plan](domains/03-nodejs-internals/curriculum.md) drafted after user authorization to move to the next domain. Covers runtime/startup, event loop and scheduling, events, buffers/files/streams, native work, workers/processes, runtime modules, V8 memory, async context, failure/shutdown, diagnostics and integrated case studies. Official Node.js v24 documentation consulted through Context7 for scheduling, streams and workers; exact example runtime remains to be recorded during lesson authoring. This is a plan awaiting learner review, not taught content or product-scope approval.

**Coverage review:** reviewed and updated [matrix](projects/coverage-matrix.md) against the D03 blueprint/index and canonical state. Added a separate planning-only D03 row; existing D01/D02 30 lesson mappings and nine PRD entries unchanged. D03 has no taught, assessed or implementation evidence. Next: learner approves/revises curriculum, then Chapter 01 only. Project catalogs/PRDs follow lessons; assessment and implementation remain deferred.
