# Project Charter — p04 large dataset processing workspace

**Domain:** D01  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic computer-science foundations learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.



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





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
