# Project Charter — p01 workload complexity observatory

**Domain:** D01  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic computer-science foundations learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.



## Problem and motivation

Backend engineers often compare algorithms or data structures with anecdotal microbenchmarks. They confuse input size, workload distribution, preprocessing, memory allocation and warm-up effects. As a result, benchmark claims are hard to reproduce and can mislead decisions.

A learning-oriented observatory should help an engineer **describe a comparison, execute repeatable trials, inspect the measured outcomes, and communicate limitations without claiming universal superiority**.





## Audience and actors

- **Experiment author:** a student/developer configuring a comparison and running trials.
- **Reviewer:** a colleague examining methodology, results and limitations.
- **Observer:** a person viewing a finished report without modifying its setup.

No production traffic instrumentation or organizational identity platform is needed in this first scope.





## Goals and measurable outcomes

- Every completed comparison records enough visible input and environment information for a second reviewer to understand **what was actually compared**.
- Results report time and resource measurements with units and repeated-trial variation, not a single unsupported “fastest” badge.
- A user can contrast results for at least three input sizes and two different workload patterns.
- Invalid comparisons and inconclusive measurements are called out rather than silently ranked.
- A completed report can be revisited or exported in a human-readable, self-contained form.

**Success measurement for a user study:** a reviewer can correctly identify workload setup, units, key limitations and the observed—not universal—winner from an exported report without relying on the author’s explanation.





## Scope

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





## Explicit non-goals

This isn't an APM product, profiling SaaS, online judge, programming interview site, automated optimization agent, or guarantee of cross-device objective rankings.





## Learning coverage and portfolio value

Directly exercises D01 Chapter 01 cost models, 02/03 data-structure reasoning, 04 algorithm comparisons, 05 probability/variance reasoning, 06 CPU/cache performance and 08 memory measurement.

It is deliberately distinct from P02's concurrency correctness, P03's dependency graph reasoning and P04's failure-aware large-file processing. Implementation may later reveal knowledge gaps that belong in other domains; the initial project brief does not force a specific technical solution.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
