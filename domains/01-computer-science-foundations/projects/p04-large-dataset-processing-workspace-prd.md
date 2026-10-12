# PRD P04 — Large Dataset Processing Workspace

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

## Functional requirements

- **FR01:** Each input has a unique identity, declared format, size and validation status.
- **FR02:** Unsupported encoding and malformed content cause an explained result.
- **FR03:** Every run retains its input identity and immutable operation definition.
- **FR04:** Published size, record, active-run and duration limits are enforced.
- **FR05:** Invalid rows follow a visible strict-reject or partial-accept policy.
- **FR06:** The run lifecycle distinguishes accepted, processing, succeeded, failed, cancelled and uncertain as applicable.
- **FR07:** Progress metrics state their units and whether they are estimates.
- **FR08:** A succeeded run has complete validated output.
- **FR09:** Accepted, rejected and produced counts reconcile under the selected operation's documented meaning.
- **FR10:** Interrupted or failed outputs are never presented as successful final deliverables.
- **FR11:** Retry/restart creates a distinguishable run without rewriting past outcomes.
- **FR12:** Output and integrity report are retrievable for successful runs.
- **FR13:** Export contains input identity, rules, status, counts, caveats and known failures.

## Externally observable invariants

A run marked successful must pass its stated integrity checks. One attempt cannot have contradictory terminal outcomes. A report never attributes one run's output to another input or definition. Invalid records cannot disappear from reconciliation. A caller timeout does not prove processing failed. Oversized work cannot be reported as successfully supported.

## Quality expectations

Clear advertised input and concurrency bounds, observable progress for long runs, readable validation feedback, keyboard-usable reports, and documented retention and output availability. Any memory and duration guarantees must name measurement conditions. Limits are product questions, not implementation choices.

## Important edge cases

Empty files, header-only files, invalid encoding, multibyte text split across chunk boundaries, truncated records, duplicate records, invalid fields, high rejection rates, just-over-limit input, cancellation near completion, process interruption after output preparation, same input processed more than once, invalid final output and lost client responses.

## Acceptance criteria

1. A supported valid dataset produces validated output and a report with input and run identity.
2. Empty and malformed inputs receive documented outcomes, never fabricated success.
3. Unsupported encoding or malformed records receive meaningful validation feedback.
4. Oversized datasets are rejected under the published product limit.
5. Strict and partial-accept modes report accepted, rejected and produced counts honestly.
6. Record content remains correct regardless of internal read boundary placement.
7. A cancellation request near completion resolves to one documented terminal state.
8. Interrupted processing cannot expose incomplete output as validated final output.
9. A restarted run has a new identity; historical evidence stays unchanged.
10. Failed final integrity checks prevent the succeeded outcome.
11. Progress, units and unavailable metrics are labeled correctly.
12. A reviewer can interpret an exported report without the original session.

## Product boundary and open questions for project kickoff

**Already approved in scope:** a workspace for supported structured-text datasets with validation, filtering and aggregation, trustworthy status/progress, honest integrity counts and validated downloadable outputs for successful runs. Real production data connectors and unrestricted code execution are out; exact mid-file resume is deferred. These commitments are not unanswered scope choices.

**Still to decide through Matt-guided product discovery when this project starts:**

1. Which initial input format and documented encoding/dialect subset are supported?
2. Which specific validation, filtering and aggregation options make up the first curated selection?
3. How do users choose strict rejection versus partial acceptance for invalid rows?
4. What are the detailed interruption, restart and partial-output visibility policies consistent with the already approved integrity guarantees and deferred exact resume?
5. Which progress values can be presented and how should estimates be labeled?
6. What numeric input, active-run, duration, report-size and retention limits are acceptable?

Proposed defaults (e.g., CSV/UTF-8, simple operations and fresh restart) remain recommendations, not approvals. The learner approves the first-version decisions before dependent technical design; the handbook PRD does not need those details resolved to remain editorially approved.

## Learning coverage and distinction

Covers operating systems, memory, filesystem I/O, buffering, backpressure, state correctness and failure recovery in D01 Chapters 06–13. Unlike P01 it is not a benchmark product; unlike P02 it does not focus on capacity-claim contention; unlike P03 it does not model dependency graphs.

## Approval and handoff

**Learner editorially approved the P04 product direction and scope on 2026-10-12.** This PRD is the agreed product-boundary input to Codex at project kickoff; open first-version policies and limits will be resolved *with* Codex using the installed Matt Pocock skills and explicit learner approval, before dependent technical work. No finalized implementation-ready specification is claimed. Architecture, tickets, code and execution evidence are not started.
