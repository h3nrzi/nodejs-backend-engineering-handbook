# Project Charter — p01 workload complexity observatory

**Status:** learner-approved project concept/educational direction from D01–D03 authoring; **no final V1 PRD has been produced**.  
**Authority:** handbook educational intent and initial product boundary; the separate project Codex process owns Product Discovery, Final PRD and Module Plan.  
**Migration:** adapted from the original learner-approved product-scope draft (preserved in repository history); the following sections are framing input, not an executable specification or frozen technical architecture.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive product requirements from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Historical project concept and source framing

**Domain:** D01 — Computer Science Foundations  
**Status:** approved_by_learner  
**Product approval:** approved 2026-10-12  
**Implementation:** not started  
**Editorial approval scope:** the problem, target users, build/not-build boundaries and essential observable behavior are approved; open implementation-dependent product policies do not revoke that approval.
**Decision timing:** resolve first-version blocking details with Codex through installed Matt Pocock skills at project kickoff; the learner approves consequential product choices and any scope change. No architecture/implementation is authorized by this initial project brief.
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



## 7. Engineering challenges and externally observable invariants

- A report must never compare results as equivalent if they were produced from incompatible definitions without explicit disclosure.
- Results from one run must not be silently merged with a different run.
- A run marked completed must have satisfied the defined correctness checks for its reported valid trials.
- Reported trial counts must reconcile with included, failed and excluded trials.
- A cancellation request must not be falsely reported as proof of cancellation if processing may already have completed.
- Concurrent experiment activity must not mix each other's identity, input definitions or results.
- An invalid or partial experiment must not be presented as a fully successful measurement.

These invariants describe outcomes; **no locking, storage, scheduling, algorithm or framework is selected**.



## 12. Explicit non-goals

This isn't an APM product, profiling SaaS, online judge, programming interview site, automated optimization agent, or guarantee of cross-device objective rankings.



## 13. Learning coverage and portfolio value

Directly exercises D01 Chapter 01 cost models, 02/03 data-structure reasoning, 04 algorithm comparisons, 05 probability/variance reasoning, 06 CPU/cache performance and 08 memory measurement.

It is deliberately distinct from P02's concurrency correctness, P03's dependency graph reasoning and P04's failure-aware large-file processing. Implementation may later reveal knowledge gaps that belong in other domains; the initial project brief does not force a specific technical solution.



## 14. Approval record

- 2026-10-12: first product-level draft authored for review.
- **Learner approval:** confirmed in conversation 2026-10-12; open product questions remain for future implementation discovery.
- **Architecture, ADRs, tickets, code and test evidence:** not started.
- **Next for this project:** at implementation kickoff, use installed Matt Pocock skills with Codex to clarify build-blocking first-version product behaviors, obtain learner approval, and only then design dependent technical solutions. No implementation started.


## Implementation kickoff gate

When selected, hand this Charter to Codex. Codex must produce `product-discovery.md`, then an owner-approved `final-prd.md`, then an owner-approved `module-plan.md`. Technical discovery is **scoped to the current module** and feeds `to-spec` → `to-tickets` → implementation → verified module acceptance. No code or product implementation is claimed by this Charter.
