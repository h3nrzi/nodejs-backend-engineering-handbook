# PRD P02 — Concurrent Resource Allocation Simulator

**Domain:** D01 — Computer Science Foundations  
**Status:** draft_pending_learner_review  
**Product approval:** pending  
**Implementation:** not started  
**Boundary:** This document specifies user-visible product rules only; no algorithm, locking strategy, storage technology, queue, framework, or topology is prescribed.

## 1. Problem and motivation

Teams building reservations, ticket claims, limited inventory and other capacity-constrained workflows struggle to reason about simultaneous attempts, duplicate requests, cancellation, and uncertain outcomes. Demonstrations often highlight successful scenarios but hide the schedules that violate capacity guarantees.

Build an educational simulator where an engineer can define a finite resource pool, submit competing allocation attempts, inspect results and timelines, and see whether user-selected rules preserve the stated constraints.

The product is a **simulator**, not a real ticketing service or customer-facing booking business.

## 2. Target users and actors

- **Scenario author:** creates a capacity model and sets up allocation/cancellation scenarios.
- **Operator:** starts, interrupts or repeats simulations.
- **Reviewer:** examines outcome summaries, invariant checks and chronological evidence.
- **Observer:** views a shared/exported report without changing its inputs.

Version 1 does not require separate organizational permissions or public accounts.

## 3. Goals and measurable product outcomes

1. A reviewer can determine exactly what capacity and contention conditions were simulated.
2. Each attempt produces an attributable result or an explicitly unresolved status; no attempt silently disappears from the report.
3. The simulator reports whether the **defined capacity invariant** was preserved across observable state transitions.
4. Users can compare a normal sequential scenario with competing claims and retries under the same product rules.
5. Results are reproducible as a **scenario definition and trace**, while elapsed execution timing can legitimately vary.
6. A completed report visibly distinguishes business rejection, operational failure, cancellation request, confirmed cancellation, and outcome uncertainty.

## 4. Scope

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

## 5. Main user journeys

### Journey A — Define resources

An author names a scenario, adds a resource category, enters total capacity and reviews the rule that successful allocations must not exceed that capacity. Invalid negative, fractional or missing capacities are rejected.

### Journey B — Competing claims

The author adds several claim attempts, chooses which may compete, launches the run and sees a trace identifying each attempt's submission, definitive response, and final allocation effect.

### Journey C — Retries and lost responses

The operator simulates a response loss for an attempt whose authoritative outcome may differ from what the caller knows. The same attempt can be retried or reconciled; the display differentiates caller-observed uncertainty from actual simulation state.

### Journey D — Cancellation race

The operator requests cancellation while an allocation is pending or completed. The product applies the chosen product policy, records the final state and explains why cancellation won or was refused.

### Journey E — Inspect/export

The reviewer views capacity totals, valid and invalid outcomes, unfinished attempts, key event ordering and limitations; then exports the scenario settings and result evidence.

## 6. Functional requirements

**FR-01 — Resource definition.** Every resource pool has a stable identity, label and finite integer capacity. Units and maximum supported counts are displayed.

**FR-02 — Attempt identity.** Every logical claim carries a stable attempt identifier; submitting it again as a retry must be identifiable as the same intention rather than a distinct new claim.

**FR-03 — Run identity.** Every execution has a distinct run identifier tied to a snapshot of its scenario definition. Editing a scenario cannot silently change past evidence.

**FR-04 — Consistent outcomes.** Attempts report a defined result: confirmed, rejected, cancelled, failed, pending, or unresolved to the caller where appropriate. The view must distinguish authoritative simulator state from caller knowledge.

**FR-05 — Allocation integrity.** Successful allocations consume the declared capacity exactly once according to the product's claim semantics. A duplicate attempt must not create an additional confirmed allocation.

**FR-06 — Competition trace.** A timeline identifies significant submitted and resolved events. It must not claim an unobserved global ordering where the simulation does not establish one.

**FR-07 — Policy visibility.** Resource and cancellation policies are visible before a run and copied into its report.

**FR-08 — Interruption simulation.** Supported simulated failures have clearly labeled trigger points and outcomes. A lost response must not automatically become a business rejection.

**FR-09 — Invariant inspection.** Reports present allowed capacity, effective confirmed allocation count, violations (if any) and enough attribution to inspect how an outcome arose.

**FR-10 — Replay.** Re-running the same configured scenario produces a new identifiable run and preserves earlier evidence.

**FR-11 — Validation.** Invalid attempts (unknown resource, invalid quantity, duplicate scenario identifiers or unsupported configurations) receive explicit feedback.

**FR-12 — Report portability.** Export records the scenario, policies, actors/attempt identities, ordering constraints, relevant outcomes, detected invariant violations and limitations.

## 7. Observable invariants

- **Capacity safety:** for every resource pool and every simulated state, confirmed active allocations do not exceed its declared capacity.
- **No double effect:** repeating a logical attempt cannot create an extra active confirmed claim without an explicit separate user action.
- **Identity isolation:** results from different runs or attempts are never silently attributed to another.
- **Lifecycle coherence:** terminal outcomes cannot transition to contradictory terminal outcomes within the same attempt unless an explicitly documented product rule permits a later separate action.
- **Cancellation honesty:** a cancellation request is never reported as an effected cancellation unless that state was reached.
- **Trace consistency:** totals shown to reviewers reconcile with the reported attempt and resource states.
- **Integrity disclosure:** any scenario that deliberately demonstrates a violation must prominently show that it failed the invariant rather than marking it successful.

These are behavioral commitments. How the simulator enforces or intentionally demonstrates them remains a technical exploration for Codex.

## 8. Nonfunctional and quality requirements

- Published support boundaries for resource pools, attempts per run, report size and supported simulated interruptions.
- Long runs show observable active progress; interruption yields a distinct state rather than fabricated completion.
- Reports display units and counts clearly, with explanatory labels for conflicts and ambiguity.
- A reviewer can understand the configured rules and final outcomes without watching the live execution.
- Responsive, keyboard-usable reading of scenario setup, results, and timelines.
- Multiple simultaneous runs must retain separate identities and never cross-contaminate results.
- The product may reject oversized scenarios rather than making an unbounded resource promise.

Exact numeric limits, history retention duration and permitted timeouts are open product decisions and must be approved before implementation.

## 9. Edge cases and failure behavior

- Zero-capacity resource: choose whether to reject such a configuration or allow it with all claims rejected.
- Two attempts competing for the final unit.
- Three competing attempts for capacity two.
- Replayed same attempt before/after a definitive response.
- Caller loses confirmation response and retries.
- Cancellation requested before processing, while pending and just after confirmation.
- Run interrupted between an authoritative state change and a visible result.
- Attempts targeting absent resource pools.
- Repeated scenario runs with changed settings.
- Partial/unavailable timeline information.
- Export of cancelled, failed and inconclusive runs.
- Simulated violation mode versus guaranteed-correct mode.

Every supported condition requires a clearly labeled outcome; the product must not imply real-world distributed guarantees from simulated results.

## 10. Acceptance criteria

**AC-01:** Given capacity one and two distinct competing attempts, no valid run reports two active confirmed allocations for that resource.

**AC-02:** Given capacity two and three competing distinct attempts, confirmed active allocation count is at most two, and each attempt has an attributable outcome.

**AC-03:** Given a successfully resolved attempt retried with the same attempt identifier, the original outcome is discoverable and no extra allocation is made.

**AC-04:** Given a lost response after an authoritative confirmation, the caller view marks the outcome uncertain rather than conclusively rejected, and reconciliation shows the authoritative result.

**AC-05:** Given a cancellation request racing a confirmation, the final record agrees with the published cancellation policy and never reports two contradictory terminal results for one action.

**AC-06:** Given an invalid resource or capacity, the author receives a clear rejection and correction path.

**AC-07:** Given two runs of one scenario, report outputs preserve distinct run identities and cannot rewrite each other's results.

**AC-08:** Given a simulated failure or invariant violation, the report distinguishes it from a successful run and identifies what was violated or remained unknown.

**AC-09:** Given an export of a completed run, a reviewer can inspect capacity, attempts, rules, outcomes, simulated failure settings and invariant status.

**AC-10:** Given a scenario above supported size limits, the product rejects it with a bounded and understandable response, rather than appearing to complete normally.

## 11. Assumptions and decisions awaiting product review

1. Should v1 model only single-unit claims, or requests for quantities larger than one? **Recommendation:** single-unit first.
2. Should every scenario enforce invariants, or also provide an explicit unsafe educational mode to exhibit a violation? **Recommendation:** both, with unsafe mode clearly separated and never represented as valid allocation.
3. For cancellation after confirmation, should cancellation release capacity, or should v1 only allow cancelling pending attempts? **Recommendation:** support explicitly defined cancellation of confirmed claims and release capacity in separate lifecycle transition.
4. What should the author control about contention order: only groups of competing requests or also specific staged event sequences? **Recommendation:** guided presets plus simple event grouping.
5. Should unresolved attempts remain visible indefinitely until the run is reconciled? **Recommendation:** show explicit unresolved state with a bounded follow-up flow.
6. Is the report intended only for individual educational use or external read-only sharing?
7. Which explicit limits on resources, attempts and run duration should v1 promise?

These are product behavior decisions, **not** technical architecture choices.

## 12. Explicit non-goals

The app is not a commerce platform, inventory ERP, payment gateway, production concurrency-testing service, external distributed lock manager or full reservation marketplace.

## 13. Domain learning relevance

- Chapter 01: correctness and measurement.
- Chapters 02–05: modeling attempts, counters and logical properties.
- Chapters 07–09: scheduling, memory and I/O conditions that influence observable results.
- Chapter 10: interleavings, race conditions, logical atomicity and linearizability.
- Chapter 11: liveness, fairness, cancellation and uncertain outcomes.
- Chapter 12: state machines, guards, invariants, model-based tests.
- Chapter 13: backend case-study reasoning.

Distinct from P01 performance methodology, P03 graph workflow planning and P04 bounded large-file processing.

## 14. Approval record

- Draft authored 2026-10-12.
- **Learner product approval:** pending.
- **Architecture and implementation:** not started.
- **Next:** review policy questions and acceptance scope. After explicit approval, prepare P03 PRD as a separate step.
