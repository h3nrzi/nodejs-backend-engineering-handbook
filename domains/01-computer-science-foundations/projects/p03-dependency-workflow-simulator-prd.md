# PRD P03 — Dependency Workflow Simulator

**Domain:** D01 — Computer Science Foundations
**Status:** approved_by_learner
**Product approval:** approved 2026-10-12
**Implementation:** not started
**Approval meaning:** product problem, intended users, in/out/deferred scope and indispensable observable behavior are approved; remaining detailed product questions are not silently decided.
**Matt kickoff:** use the actually installed Matt Pocock skills with Codex to clarify build-blocking first-version behavior, request learner approval and preserve scope before dependent architecture work.

## 1. Problem

Users need to understand how tasks depend on one another, why some cannot start, and why cyclic dependencies make a plan invalid. This educational simulator models and explains workflows; it does not execute production jobs.

## 2. Audience

Workflow author defines tasks and prerequisites; operator advances simulations; reviewer studies validation, history and outcomes; observer reads exported reports.

## 3. Goals

Authors can create and validate a workflow. The product identifies missing references, self-dependencies and cycles. Users can see eligible, blocked, running and terminal tasks, understand blockers, explore more than one permitted order and export results that accurately preserve the run definition.

## 4. Scope

**In:** create/edit task and prerequisite definitions, validate, show eligible and blocked work, start simulation runs, record simulated completion/failure/cancellation, handle repeated attempts with distinct identity, inspect timeline, export reports.

**Out:** real task execution, external API automation, multi-tenant project management, billing, enterprise workforce permissions, distributed orchestration and cloud job scheduling.

**Deferred:** conditional branches, recurring schedules, nested workflows, task deadlines, collaborative editing and external event triggers.

## 5. User journeys

1. Define: create workflow, tasks and prerequisite relationships.
2. Validate: identify and correct cycles, missing or invalid links.
3. Simulate: start eligible tasks and record outcomes; observe newly eligible tasks.
4. Recover: report failures, cancellation outcomes and new retry attempts according to documented rules.
5. Review: inspect a definition snapshot, event history, eligibility explanations and export.

## 6. Functional requirements

**FR-01:** Each workflow, task, run and attempt has a stable distinguishable identity.

**FR-02:** A prerequisite means the dependent task cannot start until the published prerequisite-satisfaction condition holds.

**FR-03:** Validation rejects missing task references, self-dependencies, cycles and duplicate stable identifiers, explaining the issue.

**FR-04:** A blocked task shows its specific unsatisfied prerequisites.

**FR-05:** A task cannot start unless eligible. Invalid actions return explicit outcomes without modifying authoritative state.

**FR-06:** Display not-started, ready, running, succeeded, failed and cancelled states under documented semantics.

**FR-07:** Independent tasks can be eligible together without inventing a unique execution order.

**FR-08:** A failure or cancellation of a prerequisite has a published downstream policy.

**FR-09:** Cancellation requested and cancellation completed are not confused near task completion.

**FR-10:** Retrying a failed task creates a distinguishable attempt, retaining the original result.

**FR-11:** The run timeline and status counts agree with the same definition snapshot.

**FR-12:** Editing a workflow cannot silently rewrite prior run evidence.

**FR-13:** Export includes prerequisites, validation, states, history, run identity and interpretation caveats.

## 7. Invariants

A task starts only after all mandatory prerequisites meet the documented condition. Invalid graphs cannot launch a valid simulation. A rejected transition preserves authoritative state. A single attempt cannot have contradictory terminal outcomes. Historical results are bound to one run and one definition. Visible readiness matches visible prerequisite status.

These are **behavioral requirements**, not architectural or algorithm selections.

## 8. Quality and constraints

Publish supported task count, relationship count and run length, and reject oversized configurations visibly. Explain graph errors in plain language. Provide a readable text dependency view even when a diagram is present. Ensure keyboard accessibility and explicit incomplete/interrupted outcomes. Exact numeric limits remain open product questions.

## 9. Edge cases

Empty workflow; single task; several independent tasks; multiple prerequisites; self-cycle; multi-task cycle; missing reference; removed task; duplicate task identity; blocked start; prerequisite failure; cancellation racing with completion; repeated terminal action; rerun after editing; interrupted run and partial export.

## 10. Acceptance scenarios

- **AC-01:** Independent tasks A and B are both eligible; no unsupported precedence is imposed.
- **AC-02:** If A is required for B, B cannot begin before A satisfies the published prerequisite-satisfaction condition.
- **AC-03:** A→B→A is reported as cyclic and blocked from valid start.
- **AC-04:** An unknown prerequisite reference produces a targeted correction message.
- **AC-05:** If B requires A and C, after only A succeeds, B remains blocked with C identified.
- **AC-06:** Completing a prerequisite updates eligible dependents consistently.
- **AC-07:** A rejected start or terminal replay cannot change a previously terminal outcome.
- **AC-08:** Failed prerequisites follow a visible downstream rule, not implicit success.
- **AC-09:** Cancellation racing with completion resolves to one policy-consistent outcome.
- **AC-10:** An interrupted run is not silently marked fully successful.
- **AC-11:** Changing the definition does not change historical run records.
- **AC-12:** An exported result is interpretable without the original live session.

## 11. Approved scope and product questions for kickoff

**Already approved in the product boundary:** this is a simulator, **not** an engine that executes real production jobs (Sections 1, 4 and 12). Users can define task dependencies, validate graphs, inspect blockers and simulate outcomes. Retried work has a distinct attempt identity; a terminal attempt is not silently rewritten. The workflow must remain understandable in a textual view; a diagram is optional. These are not pending approvals.

**Details for learner-approved Matt-guided discovery when this project starts:**

1. Does satisfying a prerequisite require successful completion only, or are other explicit outcomes eligible?
2. What does failure/cancellation of a prerequisite mean for dependents: blocked, skipped or an explicitly recoverable state?
3. What is the chosen policy for cancellation near completion, and what counts as overall run success?
4. Should optional graphical visualization be included in the first version or deferred? Keep the readable text view in either case.
5. What limits apply to task count, prerequisite links, run length and retained history?

Decide only the first-version answers needed before dependent technical design. Preserve the approved simulator-only boundary and obtain learner approval for any proposed change in scope.

## 12. Explicit non-goals

This is not a CI service, executable workflow engine, commercial task manager, distributed scheduler or production infrastructure monitor.

## 13. Domain value

Illustrates graph validity and order (D01 Chapters 03–05), transition invariants (12), liveness and cancellation (10–11) and the case-study workshop (13). Distinct from P01 performance comparisons, P02 capacity allocation and P04 large-dataset I/O.

## 14. Approval

Drafted and **editorially approved by learner on 2026-10-12**, including the simulator-only product boundary. The detailed questions in Section 11 are deferred to learner-approved discovery using installed Matt Pocock skills when this project starts. No architecture, implementation, ADR, ticket or test execution claimed.
