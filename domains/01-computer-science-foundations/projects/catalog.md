# D01 — Project candidate catalog

**Status:** Four differentiated product concepts; P01–P04 PRDs learner-approved at product-scope level. Open product decisions remain; no implementations started.

These are distinct product ideas with observable goals and target learning coverage. **No database, framework, queue, lock, architecture, language-level concurrency strategy or infrastructure is prescribed.** Codex will explore technical solutions using Matt Pocock skills in the separate project repository after a PRD is approved.

## P01 — Workload & Complexity Observatory

**Approved PRD:** [Workload & Complexity Observatory](p01-workload-complexity-observatory-prd.md) — learner-approved; unresolved product thresholds retained.

- **Problem:** learners and engineering teams make data-structure and algorithm choices without understanding how performance changes as workloads grow.
- **Users:** backend learners and developers analyzing workload trade-offs.
- **Product outcome:** define repeatable workloads, compare implementations, visualize measured elapsed time and memory use, show assumptions and reproducibility conditions.
- **Not in scope:** claim universal fastest choice or production monitoring of customer traffic.
- **Engineering challenge:** comparable experiments, transparent metrics, representative inputs, reproducibility and honest reporting of variance.
- **Learning coverage:** complexity analysis, arrays/maps/trees, search/sort, CPU/cache effects, experimental design.
- **Why worthwhile:** portfolio evidence of scientific performance reasoning instead of anecdotal optimization.
- **Next:** product scope approved; resolve necessary first-version limits at the separate Matt/Codex kickoff with learner approval before dependent technical work; no technical approach selected.

## P02 — Concurrent Resource Allocation Simulator

**Approved PRD:** [Concurrent Resource Allocation Simulator](p02-concurrent-resource-allocation-simulator-prd.md) — learner-approved; product thresholds remain open.

- **Problem:** concurrent claims on limited resources can cause invalid allocations or inconsistent outcomes.
- **Users:** students and developers designing capacity-limited products such as ticket sales or reservations.
- **Product outcome:** model a finite capacity, accept competing attempts, give unambiguous outcomes, preserve allocation invariants, report rejected/conflicting attempts, and demonstrate behavior during interruption/retry.
- **Not in scope:** real payment processing, full marketplace, live-event business operations.
- **Engineering challenge:** capacity invariants under concurrency, unknown outcomes and recovery; **implementation strategy intentionally unspecified**.
- **Learning coverage:** interleavings, atomicity, safety vs liveness, state machines, concurrency testing.
- **Why worthwhile:** demonstrates correctness reasoning under contention; avoid overlap with commerce project by keeping it a general-purpose simulator.
- **Next:** retain open product questions and choose for implementation only after a separate decision.

## P03 — Dependency Workflow Simulator

**Approved PRD:** [Dependency Workflow Simulator](p03-dependency-workflow-simulator-prd.md) — learner-approved; open product questions remain.

- **Problem:** complex activities depend on other activities; cycles and invalid transitions can make plans impossible to execute correctly.
- **Users:** platform developers, engineering trainees, operations teams modeling workflows.
- **Product outcome:** define tasks and dependencies, validate that workflows can progress, expose invalid dependency cycles, report ready/blocked/completed work and explain transition failures.
- **Not in scope:** distributed orchestration engines, production message brokers, enterprise workflow platform features.
- **Engineering challenge:** dependency consistency, invalid graphs, scheduling constraints, state transition correctness.
- **Learning coverage:** graphs, topological ordering, traversal, heaps/priority policy concepts, state machines and invariants.
- **Why worthwhile:** distinct graph and correctness focus, with a later D10/D11 distributed implementation possible only as a separate scope decision.
- **Next:** retain open product questions; no algorithm mandated.

## P04 — Large Dataset Processing Workspace

**Approved PRD:** [Large Dataset Processing Workspace](p04-large-dataset-processing-workspace-prd.md) — learner-approved; open product questions remain.

- **Problem:** teams need to process datasets bigger than available memory while retaining verifiable and recoverable results.
- **Users:** data operations and backend developers processing large exports/imports.
- **Product outcome:** accept large inputs, provide processing progress and failure outcomes, produce validated output and integrity summaries, restart work in a specified user-visible way; exact mid-file resume is deferred.
- **Not in scope:** commercial object storage or full ETL orchestration platform.
- **Engineering challenge:** bounded resource use, partial failures, correctness and data integrity.
- **Learning coverage:** file I/O, buffering, memory, throughput/latency, OS resources.
- **Why worthwhile:** demonstrates systems fundamentals; implementation-specific Streams details are taught in lessons/D03, not forced by PRD.
- **Next:** P04 PRD already learner-approved; resolve necessary first-version choices at its separate Matt/Codex kickoff with learner approval.

## Selection and overlap check

- These four **candidates**, not commitments, cover different strengths: performance evaluation, concurrency correctness, graph/state reasoning and resource-limited I/O.
- All four PRDs specify observable behavior, requirements and acceptance criteria without selecting technical solutions. Some product thresholds and details are still open.
- Check overlaps with D03 Node.js Internals, D07 Database Engineering and D10 Distributed Systems at selection time. No need to build all four.

## Portfolio differentiation review (2026-10-12)

- P01: measurement methodology and experimental reproducibility; avoid production monitoring.
- P02: concurrency safety and outcome reconciliation; avoid a real commerce/reservation application.
- P03: graph validity and explainable workflow states; avoid distributed orchestration scope.
- P04: bounded resource use, I/O integrity and interrupted work; avoid a general ETL platform.

All four PRDs are learner-approved for product scope, but the projects remain optional portfolio candidates. No implementation was selected or started. Necessary first-version product questions and limits are resolved with installed Matt Pocock skills and Codex at the selected project’s kickoff, with learner approval before dependent technical work. Safely deferred questions may remain open. Study assessments are deferred until the learner explicitly begins studying.

**Coverage reconciliation:** [Global matrix](../../../projects/coverage-matrix.md) reviewed against all four approved PRDs on 2026-10-12; no implementation evidence recorded.
