# Project Charter — p02 concurrent resource allocation simulator

**Domain:** D01  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic computer-science foundations learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.



## Problem and motivation

Teams building reservations, ticket claims, limited inventory and other capacity-constrained workflows struggle to reason about simultaneous attempts, duplicate requests, cancellation, and uncertain outcomes. Demonstrations often highlight successful scenarios but hide the schedules that violate capacity guarantees.

Build an educational simulator where an engineer can define a finite resource pool, submit competing allocation attempts, inspect results and timelines, and see whether user-selected rules preserve the stated constraints.

The product is a **simulator**, not a real ticketing service or customer-facing booking business.





## Target users and actors

- **Scenario author:** creates a capacity model and sets up allocation/cancellation scenarios.
- **Operator:** starts, interrupts or repeats simulations.
- **Reviewer:** examines outcome summaries, invariant checks and chronological evidence.
- **Observer:** views a shared/exported report without changing its inputs.

Version 1 does not require separate organizational permissions or public accounts.





## Goals and measurable product outcomes

1. A reviewer can determine exactly what capacity and contention conditions were simulated.
2. Each attempt produces an attributable result or an explicitly unresolved status; no attempt silently disappears from the report.
3. The simulator reports whether the **defined capacity invariant** was preserved across observable state transitions.
4. Users can compare a normal sequential scenario with competing claims and retries under the same product rules.
5. Results are reproducible as a **scenario definition and trace**, while elapsed execution timing can legitimately vary.
6. A completed report visibly distinguishes business rejection, operational failure, cancellation request, confirmed cancellation, and outcome uncertainty.





## Scope

### In scope — initial version

- Create named simulation scenarios with one or more resource types and finite positive integer capacities.
- Specify a set of logical allocation attempts with stable attempt identities.
- Set competing request groups and the intended order/concurrency of scenario events where expressible.
- Start, observe, cancel or repeat simulation runs.
- Show accepted, rejected, pending, cancelled, failed and unresolved outcomes with explanations.
- Inspect resource availability, claimed capacity and an event timeline tied to one run.
- Include retries of the same logical attempt and attempts from distinct callers.
- Inject *simulated* interruption and lost-response situations to study uncertainty.
- Review invariant status and export a self-contained human-readable summary.

### Out of scope

- Selling inventory, charging payments or conducting real-world reservations.
- Multi-tenant enterprise identity, real customer communications or production user management.
- Guarantees about performance or correctness of arbitrary external production services.
- Arbitrary user-provided executable code or plugins.
- Full distributed-system orchestration, real cross-region deployment or infrastructure failure emulation.

### Deferred

- Time-interval overlaps or sophisticated resource eligibility policies.
- Weighted resource bundles, partial allocation and waitlists.
- Collaboration among multiple scenario authors.
- Automated model exploration beyond the explicitly supported scenarios.
- Comparative leaderboards or security testing of real services.





## Explicit non-goals

The app is not a commerce platform, inventory ERP, payment gateway, production concurrency-testing service, external distributed lock manager or full reservation marketplace.





## Domain learning relevance

- Chapter 01: correctness and measurement.
- Chapters 02–05: modeling attempts, counters and logical properties.
- Chapters 07–09: scheduling, memory and I/O conditions that influence observable results.
- Chapter 10: interleavings, race conditions, logical atomicity and linearizability.
- Chapter 11: liveness, fairness, cancellation and uncertain outcomes.
- Chapter 12: state machines, guards, invariants, model-based tests.
- Chapter 13: backend case-study reasoning.

Distinct from P01 performance methodology, P03 graph workflow planning and P04 bounded large-file processing.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
