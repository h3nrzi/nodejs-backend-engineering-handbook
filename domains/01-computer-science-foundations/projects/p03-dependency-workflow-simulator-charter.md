# Project Charter — p03 dependency workflow simulator

**Status:** learner-approved project concept/educational direction from D01–D03 authoring; **no final V1 PRD has been produced**.  
**Authority:** handbook educational intent and initial product boundary; the separate project Codex process owns Product Discovery, Final PRD and Module Plan.  
**Migration:** adapted from the original learner-approved product-scope draft (preserved in repository history); the following sections are framing input, not an executable specification or frozen technical architecture.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Historical project concept and source framing

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



## 12. Explicit non-goals

This is not a CI service, executable workflow engine, commercial task manager, distributed scheduler or production infrastructure monitor.



## 13. Domain value

Illustrates graph validity and order (D01 Chapters 03–05), transition invariants (12), liveness and cancellation (10–11) and the case-study workshop (13). Distinct from P01 performance comparisons, P02 capacity allocation and P04 large-dataset I/O.



## 14. Approval

Drafted and **editorially approved by learner on 2026-10-12**, including the simulator-only product boundary. The detailed questions in Section 11 are deferred to learner-approved discovery using installed Matt Pocock skills when this project starts. No architecture, implementation, ADR, ticket or test execution claimed.


## Implementation kickoff gate

When selected, hand this Charter to Codex. Codex must produce `product-discovery.md`, then an owner-approved `final-charter.md`, then an owner-approved `module-plan.md`. Technical discovery is **scoped to the current module** and feeds `to-spec` → `to-tickets` → implementation → verified module acceptance. No code or product implementation is claimed by this Charter.
