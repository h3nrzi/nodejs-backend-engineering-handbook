# PRD P01 — Workload & Complexity Observatory

**Domain:** D01 — Computer Science Foundations  
**Status:** draft_pending_learner_review  
**Product approval:** pending  
**Implementation:** not started  
**Boundary:** This document describes product behavior, not an implementation design.

## 1. Problem and motivation

Backend engineers often compare algorithms or data structures with anecdotal microbenchmarks. They confuse input size, workload distribution, preprocessing, memory allocation and warm-up effects. As a result, benchmark claims are hard to reproduce and can mislead decisions.

A learning-oriented observatory should help an engineer **describe a comparison, execute repeatable trials, inspect the measured outcomes, and communicate limitations without claiming universal superiority**.

## 2. Audience and actors

- **Experiment author:** a student/developer configuring a comparison and running trials.
- **Reviewer:** a colleague examining methodology, results and limitations.
- **Observer:** a person viewing a finished report without modifying its setup.

No production traffic instrumentation or organizational identity platform is needed in this first scope.

## 3. Goals and measurable outcomes

- Every completed comparison records enough visible input and environment information for a second reviewer to understand **what was actually compared**.
- Results report time and resource measurements with units and repeated-trial variation, not a single unsupported “fastest” badge.
- A user can contrast results for at least three input sizes and two different workload patterns.
- Invalid comparisons and inconclusive measurements are called out rather than silently ranked.
- A completed report can be revisited or exported in a human-readable, self-contained form.

**Success measurement for a user study:** a reviewer can correctly identify workload setup, units, key limitations and the observed—not universal—winner from an exported report without relying on the author’s explanation.

## 4. Scope

### Included in version 1

- Create and name a comparison.
- Choose from a curated set of **educational operation families**, such as membership lookup, sequence traversal, insertion or ordering, with comparable observable outputs.
- Set input sizes, input distribution, key hit/miss ratio where relevant, and trial count within supported limits.
- Execute a comparison and see pending, running, completed, failed or cancelled status.
- View side-by-side latency summaries, variability, total work, resource observations and input/environment metadata.
- View per-size results and an explanation of what is and isn't justified by them.
- Export a report sufficient for human review.
- Retry a failed comparison as a distinct run while retaining the original outcome.

### Excluded

- Continuous profiling or monitoring of third-party production services.
- Importing arbitrary untrusted executable benchmark scripts.
- Promising a universally fastest data structure or algorithm.
- Automated changes to application source code.
- Real-time collaboration, billing, organizational roles or commercial benchmarking certification.

### Deferred

- User-authored benchmark plugins.
- Hardware-to-hardware normalization or universal leaderboards.
- Automatic optimization advice.
- Collaboration and historical trend reporting across teams.

## 5. Product capabilities and journeys

**Journey A — Design an experiment:** author creates a comparison, selects two or more candidates that perform the same defined operation, selects representative input sizes, distribution and trial settings, and reviews a concise methodology preview before starting.

**Journey B — Run and inspect:** author starts the experiment, sees progress and terminal outcome, then inspects per-candidate measurements with units and variability. Missing or inapplicable metrics are explicitly labeled.

**Journey C — Review and share:** reviewer opens a finished report, sees the complete setup, results, excluded/failed trials and caveats, and can export it.

**Journey D — Recover:** on failure, interruption or cancellation, the UI shows which run was affected. Starting again creates a distinguishable run; prior completed evidence isn't silently overwritten.

## 6. Functional requirements

**FR-01 — Experiment identity.** Every experiment has an unambiguous identity, title, creation time and revision/definition snapshot associated with every run.

**FR-02 — Comparable work.** Every compared candidate is evaluated against the same defined logical operation and correctness expectations. If comparable work cannot be established, the system must refuse or mark the comparison invalid.

**FR-03 — Input control.** A run displays the chosen input sizes, distribution shape and, where meaningful, hit/miss and duplicate characteristics. Parameters outside supported ranges are rejected with an explanation.

**FR-04 — Trial transparency.** A run shows requested, completed, failed and excluded trial counts. Never present fewer actual trials as though the requested count succeeded.

**FR-05 — Timing and resources.** Display wall-clock measurements with explicit units and repeat/variation information. Resource measures must identify what is measured and may be unavailable if unsupported; never substitute invented data.

**FR-06 — Environment record.** Each report identifies relevant environment characteristics available to the product, such as runtime version, platform class and execution timestamp, while marking unknown details honestly.

**FR-07 — State and recovery.** Runs have observable pending/running/completed/failed/cancelled outcomes. User cancellation requests and terminal state must be distinguishable, particularly near completion.

**FR-08 — Report integrity.** A completed report ties measured observations to exactly the displayed experiment definition and run identity. Changes to an experiment cannot rewrite past run data.

**FR-09 — Interpretive guidance.** Explain that measured differences apply to the tested environment and workload. State where claims are inconclusive, under-sampled or otherwise limited.

**FR-10 — Report export.** An exported report contains methodology, results, units, caveats, run identity and statuses so a reviewer can interpret it independently.

## 7. Engineering challenges and externally observable invariants

- A report must never compare results as equivalent if they were produced from incompatible definitions without explicit disclosure.
- Results from one run must not be silently merged with a different run.
- A run marked completed must have satisfied the defined correctness checks for its reported valid trials.
- Reported trial counts must reconcile with included, failed and excluded trials.
- A cancellation request must not be falsely reported as proof of cancellation if processing may already have completed.
- Concurrent experiment activity must not mix each other's identity, input definitions or results.
- An invalid or partial experiment must not be presented as a fully successful measurement.

These invariants describe outcomes; **no locking, storage, scheduling, algorithm or framework is selected**.

## 8. Nonfunctional constraints and quality expectations

Version 1 targets local/development educational use rather than production-scale benchmarks.

- Supported input and trial limits must be explicitly shown before launch and enforced consistently.
- A configured comparison that exceeds supported resource limits must stop or reject with a recoverable, comprehensible outcome.
- Progress should remain observable during long runs and the user must be able to distinguish active work from a stalled/uncertain run.
- At least three dataset sizes and two input patterns are supported per comparison, within published limits.
- Keyboard navigation and readable tables/visual explanations are expected; no specific UI framework is required.
- Timing precision and resource measurement scope must be labeled.
- Expected results and measurement methodology should be reviewable without exposing private machine identifiers.

**Open product thresholds:** exact maximum sizes, permissible run duration, trial limits, acceptable measurement noise and report-retention duration require review before PRD approval. These must not be guessed into architectural commitments.

## 9. Edge cases and recovery expectations

- Empty dataset and missing-key lookup.
- Duplicates when a candidate's semantics treat them differently.
- Already ordered, reverse ordered and randomized distributions when appropriate.
- Candidate produces incorrect or non-equivalent output.
- Measurements are below reliable resolution or show high variance.
- Unsupported resources/metrics on a platform.
- User attempts to modify a definition while a run is active.
- User cancels immediately before completion.
- Run interrupted by process termination.
- Export requested for failed, cancelled or partially completed runs.
- Multiple runs started from the same definition.
- Resource pressure causes the experiment to end prematurely.

Each must result in an explicit status or explanatory message; partial results must be labeled as partial.

## 10. Acceptance scenarios

**AC-01:** Given an experiment comparing the same membership operation across two supported candidates and multiple input sizes, when it finishes, the report lists all inputs, trial counts, timing units and per-size results.

**AC-02:** Given a candidate that produces an incorrect answer, when validation detects the mismatch, the UI refuses to display its measurements as a valid equivalent comparison.

**AC-03:** Given fewer successful trials than requested, when a report is viewed, counts and reasons are shown; a fully completed claim cannot conceal excluded trials.

**AC-04:** Given an input size beyond a supported limit, the user receives an explicit rejection before costly execution where possible.

**AC-05:** Given cancellation racing with completion, a user can inspect the actual terminal outcome rather than assuming cancellation took effect.

**AC-06:** Given two runs of the same experiment, their results and timestamps remain distinguishable and prior evidence is not silently overwritten.

**AC-07:** Given an export, a reviewer can identify environment details, workload patterns, metric definitions, run status and caveats without a live session.

**AC-08:** Given unavailable memory data or inconclusive timings, the product labels them unsupported/inconclusive and does not invent numeric values.

**AC-09:** Given a run interrupted mid-execution, the UI does not mislabel it as fully completed; the next run retains its own identity.

**AC-10:** Given an empty or malformed configuration, the author receives a clear correction path.

## 11. Assumptions and open product questions

1. Is the observatory intended solely for local learner use, or should v1 support sharing reports between machines?
2. Which operation families belong in the curated initial set? (Suggested scope: lookup, traversal and ordering.)
3. What maximum input size, trials and run duration are meaningful for the user's target development machines?
4. Must every run be reproducible bit-for-bit, or is reproducible *configuration* with honestly varying timing adequate? (Recommend the latter for performance metrics.)
5. What minimum methodology information must always be visible?
6. Should incomplete/cancelled runs be exportable with an unmistakable partial status?
7. How long must experiment histories remain available?

These are approval questions, **not choices of database, algorithm or infrastructure**.

## 12. Explicit non-goals

This isn't an APM product, profiling SaaS, online judge, programming interview site, automated optimization agent, or guarantee of cross-device objective rankings.

## 13. Learning coverage and portfolio value

Directly exercises D01 Chapter 01 cost models, 02/03 data-structure reasoning, 04 algorithm comparisons, 05 probability/variance reasoning, 06 CPU/cache performance and 08 memory measurement.

It is deliberately distinct from P02's concurrency correctness, P03's dependency graph reasoning and P04's failure-aware large-file processing. Implementation may later reveal knowledge gaps that belong in other domains; the PRD does not force a specific technical solution.

## 14. Approval record

- 2026-10-12: first product-level draft authored for review.
- **Learner approval:** pending.
- **Architecture, ADRs, tickets, code and test evidence:** not started.
- **Next:** review scope and open product questions; refine and explicitly approve before a separate Codex implementation project is started.
