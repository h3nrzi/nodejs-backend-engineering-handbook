# Project Charter — p04 large dataset processing workspace

**Status:** learner-approved project concept/educational direction from D01–D03 authoring; **no final V1 PRD has been produced**.  
**Authority:** handbook educational intent and initial product boundary; the separate project Codex process owns Product Discovery, Final PRD and Module Plan.  
**Migration:** adapted from the original learner-approved product-scope draft (preserved in repository history); the following sections are framing input, not an executable specification or frozen technical architecture.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Historical project concept and source framing

**Domain:** D01 — Computer Science Foundations  
**Status:** approved_by_learner  
**Product approval:** confirmed 2026-10-12  
**Implementation:** not started
**Approval meaning:** product problem, intended users, in/out/deferred scope and indispensable observable behavior are approved; remaining detailed product questions are not silently decided.
**Matt kickoff:** use the actually installed Matt Pocock skills with Codex to clarify build-blocking first-version behavior, request learner approval and preserve scope before dependent architecture work.



## Problem and users

Developers and data operators need to validate, process and export large datasets without silent truncation, misleading success signals or unbounded resource promises. An operator submits and processes an input; a reviewer examines the resulting integrity evidence. This is an educational product, not a commercial ETL or object-storage platform.



## Goals

Users can submit datasets within clear supported limits, select a documented operation, observe processing status and record counts, download validated output, understand malformed records and interrupted work, and distinguish a definitive outcome from an uncertain one.



## Scope

**Included:** supported structured text input; format and field validation; a curated set of validation, filtering and aggregate operations; observable processing progress; record-count and integrity summaries; explicit cancellation, failure, restart and result retrieval; separately identifiable runs and exports.

**Excluded:** arbitrary user code execution, production data connectors, multi-tenant administration, limitless data volume, commercial storage and full ETL orchestration.

**Deferred:** exact mid-file resume, multi-file joins, collaboration, recurrence and distributed high-availability guarantees.



## Product boundary and open questions for project kickoff

**Already approved in scope:** a workspace for supported structured-text datasets with validation, filtering and aggregation, trustworthy status/progress, honest integrity counts and validated downloadable outputs for successful runs. Real production data connectors and unrestricted code execution are out; exact mid-file resume is deferred. These commitments are not unanswered scope choices.

**Still to decide through Matt-guided product discovery when this project starts:**

1. Which initial input format and documented encoding/dialect subset are supported?
2. Which specific validation, filtering and aggregation options make up the first curated selection?
3. How do users choose strict rejection versus partial acceptance for invalid rows?
4. What are the detailed interruption, restart and partial-output visibility policies consistent with the already approved integrity guarantees and deferred exact resume?
5. Which progress values can be presented and how should estimates be labeled?
6. What numeric input, active-run, duration, report-size and retention limits are acceptable?

Proposed defaults (e.g., CSV/UTF-8, simple operations and fresh restart) remain recommendations, not approvals. The learner approves the first-version decisions before dependent technical design; the handbook initial project brief does not need those details resolved to remain editorially approved.



## Learning coverage and distinction

Covers operating systems, memory, filesystem I/O, buffering, backpressure, state correctness and failure recovery in D01 Chapters 06–13. Unlike P01 it is not a benchmark product; unlike P02 it does not focus on capacity-claim contention; unlike P03 it does not model dependency graphs.



## Approval and handoff

**Learner editorially approved the P04 product direction and scope on 2026-10-12.** This initial project brief is the agreed product-boundary input to Codex at project kickoff; open first-version policies and limits will be resolved *with* Codex using the installed Matt Pocock skills and explicit learner approval, before dependent technical work. No finalized implementation-ready specification is claimed. Architecture, tickets, code and execution evidence are not started.


## Implementation kickoff gate

When selected, hand this Charter to Codex. Codex must produce `product-discovery.md`, then an owner-approved `final-charter.md`, then an owner-approved `module-plan.md`. Technical discovery is **scoped to the current module** and feeds `to-spec` → `to-tickets` → implementation → verified module acceptance. No code or product implementation is claimed by this Charter.
