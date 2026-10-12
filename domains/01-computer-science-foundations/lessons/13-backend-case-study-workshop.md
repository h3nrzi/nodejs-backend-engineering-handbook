# Chapter 13 — Backend Case-Study Workshop

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft; pending learner review  
**Prerequisites:** Chapters 01–12  
**Boundary:** Educational reasoning only. No project PRD may require a specific algorithm, database, framework, queue or synchronization technique.

## Learning outcomes

Integrate correctness, cost models, data structures, state transitions, operating-system behavior, resource bounds, memory, I/O, concurrency and progress. Given a backend product scenario, produce a precise contract, workload model, counterexample, solution trade-off analysis and executable acceptance-test sketch **without prematurely choosing production architecture**.

## Workshop method: six artifacts per case

For each case prepare:

1. **Product behavior:** actors, triggers, outcomes and exclusions.
2. **State model:** relevant states, transitions, invariants.
3. **Workload model:** sizes, operation mix, arrival rates and constraints.
4. **Failure and interleaving schedule:** a minimal counterexample to an incorrect implementation.
5. **Options and trade-offs:** conceptual techniques with assumptions, asymptotic and practical costs, not prescribed design.
6. **Evidence plan:** deterministic tests, performance measurements, limitations and acceptance criteria.

The following cases are exercises in reasoning, not yet-approved PRDs for the portfolio catalog.

## Case A — Limited-capacity reservation

### Product statement

A customer requests one exclusive resource during a given interval. The service either confirms the request or provides a definitive rejection; when the response is lost, the customer must be able to discover the attempt's eventual outcome.

### 1. Contract

- No two confirmed reservations for the same exclusive resource overlap.
- A confirmed attempt has an assigned resource and immutable identity of the attempt.
- A cancellation returns an explicit terminal result according to the cancellation policy.
- Replaying the *same* logical attempt must not create a second unintended reservation.
- A caller timeout is not necessarily a failed reservation.

This is a behavioral contract, not an instruction to use locks or database transactions.

### 2. State machine

```text
draft → pending → confirmed
           └────→ rejected
confirmed → cancelled (only when policy permits)
```

Model terminal status separately from the customer's knowledge of the status: the operation can be confirmed even while the client sees `unknown`.

**Safety invariant:** for every resource r and instant t, the number of confirmed reservations covering t on r is at most one.

### 3. Counterexample schedule

```text
A observes r available
B observes r available
A confirms r
B confirms r
```

Both succeed only if the concurrency boundary fails to preserve the capacity invariant. Another counterexample: A succeeds, response is lost, retry produces a second confirmation.

### 4. Reasoning alternatives

A logical ownership claim must have a valid atomic decision point. Different mechanisms can establish one under different scope, storage and failure assumptions. Their suitability cannot be inferred from the PRD alone and belongs to subsequent Codex research.

### 5. Acceptance evidence

Force both claim attempts to observe the same precondition and race; assert at most one confirmation. Simulate lost responses, same-attempt retries, cancellation near completion and restarts. Assert outcomes and authoritative state; do not treat repeated nondeterministic load tests as proof of every interleaving.

### 6. Complexity and load

If the supported reservation window contains n candidate slots, naive conflict scans may be O(n) per request; specialized ordered lookup structures can change query costs but introduce update and memory costs. Do not choose from Big O before measuring overlapping intervals, concurrency and persistence needs.

## Case B — Dependency workflow planner

### Product statement

Users submit named tasks and prerequisites. A plan must reject cyclic or missing dependencies and identify which tasks are eligible once prerequisites are completed.

### 1. Model

Represent tasks as vertices and prerequisite relationships as directed edges. Specify arrow meaning: A→B means A must complete before B can start.

A valid plan is a DAG. A topological order can exist without being unique. Readiness is a *state-dependent* predicate, not just the static graph structure.

```text
A → C → D
B ↗
```

Both A,B,C,D and B,A,C,D satisfy prerequisites; C,B,A,D does not.

### 2. Safety and progress

Safety: a task never transitions to running unless its prerequisites satisfy the declared completion policy.

Liveness: eligible tasks eventually receive a terminal resolution under explicit worker availability and fairness assumptions.

A cycle A→B→A cannot be resolved by merely choosing a different topological order.

### 3. Workload and representation

Adjacency lists often support graph traversal at O(V+E) under the conventional model, but representation must be evaluated against frequent edits, reachability queries, memory limits and malformed identifiers.

### 4. Failure scenarios

A prerequisite completes just as a dependent task is cancelled; a task is replayed after an uncertain response; a worker fails midway; a stale readiness view permits invalid execution. Define observable results before choosing coordination.

### 5. Tests

Generate a DAG, validate every emitted order respects edges, introduce cycles and missing vertices, and test parallel independent completions. Use property tests to find small counterexample graphs, not just happy-path fixtures.

## Case C — Large-dataset processing workspace

### Product statement

A user submits a bounded-size dataset for validation, processing and export. The system clearly distinguishes accepted, rejected, completed, failed and cancelled processing.

### 1. Resource model

Let input bytes = S, number of records = N, maximum concurrent jobs = C, transient memory per job = B(N,S), plus baseline M. A rough planning bound is M+C×B for overlapping jobs, not a guaranteed real peak. Copies, decoding, intermediate objects, buffers, native allocations and GC timing affect the observed bound.

An O(N) parser still can be too memory-hungry if it retains all records. A fast parser can be wrong if a record crosses an I/O chunk boundary.

### 2. State transitions

`submitted → accepted → processing → succeeded|failed|cancelled`; define policy for cancellation during finishing. A successful user-visible response must imply validated output according to the declared integrity criteria.

### 3. I/O and durability

Buffering and page cache change measured latency. A completed write is not automatically durable through every crash; an atomic namespace rename is not the same as a durability guarantee. Declare supported failure conditions and restoration expectations at product level.

### 4. Backpressure exercise

If input arrives at 12 MiB/s and processing accepts 8 MiB/s, unchecked buffered data grows around 240 MiB in one minute. State observable overload behavior before picking a mechanism.

### 5. Evidence

Test empty files, malformed encodings, truncated records, large supported inputs, resource limits, cancellation, partial output, lost responses and comparison against a trusted small-input oracle. Report peak memory, p95/p99 latency, throughput and error rates under named hardware/runtime assumptions.

## Case D — Priority work queue with fairness

### Product statement

Operators submit background work of several priority classes. Tasks must not vanish silently, and the policy must explain which jobs can be delayed.

### 1. Separate concerns

Priority order, arrival order among equals, eligibility, admission capacity and retry policy are **different requirements**. A priority queue ADT does not make the service fair or durable.

### 2. Counterexamples

- Endless high-priority arrivals starve normal work.
- Work accepted but not durably recorded disappears after restart.
- A timeout after successful completion causes a retry with a second side effect.
- A queue and membership index drift out of sync.

### 3. Quantitative model

With arrival rate λ and completion rate μ, sustained λ>μ causes backlog accumulation without rejection or shedding. Under stable conditions Little's law L=λW relates average in-system work to average time, but it does not guarantee a particular tail-latency percentile.

### 4. Evidence

Force overload, process failure, repeated delivery and completion/cancellation races. Measure waiting distributions by priority, not only global average throughput. Explicitly declare fairness and success criteria.

## Cross-case synthesis: select techniques from evidence

| Domain concept | Key question | Failure if ignored |
|---|---|---|
| Preconditions/invariants | What must always hold? | Silent invalid success |
| Arrays/maps/graphs | Which operations dominate? | Excess lookup cost or wrong model |
| Greedy/DP/search | What objective is optimized? | Locally plausible, globally wrong result |
| Memory locality/GC | What is retained and copied? | Memory pressure, pauses |
| OS/I/O and file lifecycle | What does "written" guarantee? | Partial/corrupt output |
| Concurrency/linearizability | What is the atomic logical event? | Duplicates, overbooking |
| Liveness/fairness | Can admitted work starve? | Jobs never terminate |
| State machines | What transitions are legal? | Contradictory statuses |

No row establishes a universal implementation choice.

## Workshop deliverables

For **each** scenario submit:

- A one-page behavior-only specification, with in-scope and excluded cases.
- A state diagram/transition table with at least three invariants.
- A workload model with input sizes and dominant operations.
- Two explicit failing schedules or minimal counterexamples.
- An options/trade-off note covering complexity and resources without committing to architecture.
- A test matrix including nominal, empty, invalid, concurrent, retry, cancellation, overload and restart cases.
- An uncertainty log naming assumptions that need product clarification or Codex research.

### Review rubric (20 points per case)

- Contract clarity and boundary discipline: 0–4
- Invariants and state transitions: 0–4
- Counterexamples and concurrency reasoning: 0–4
- Workload/space/time realism: 0–4
- Tests, evidence and uncertainty: 0–4

A score below 3 in any category triggers revision even if the total is high. This scoring is an educational rubric, not evidence that any exercise was performed.

## Guided exercises

1. In Case A, why is a client timeout not a safe reason to issue a brand-new reservation attempt?
2. Give an invalid topological order for Case B and identify the violated prerequisite.
3. Explain why counting bytes per file chunk isn't equivalent to counting Unicode characters or CSV records.
4. Demonstrate starvation in Case D with an unending stream of high-priority work.
5. Which Case A property is safety, and which is liveness?
6. For Case C, distinguish peak RSS from JavaScript heap usage.
7. Write one temporal property for terminal-state immutability.
8. Design a deterministic interleaving for cancellation versus completion.
9. Explain why O(V+E) graph traversal does not alone specify total workflow latency.
10. Rewrite “use Redis locks for reservations” as a product invariant.
11. Identify where a benchmark can be fast yet prove nothing about correctness.
12. Propose a small-input correctness oracle for one of the cases.

### Answer guidance

1. Remote work may already have succeeded; reconcile the existing logical attempt.
2. For A→C and B→C, placing C before either A or B is invalid.
3. Data units differ, and records/UTF-8 sequences may cross chunks.
4. Ordinary jobs never receive service because every cycle selects another urgent job.
5. No double booking is safety; accepted attempts resolving under assumptions is liveness.
6. RSS includes resident native/external/runtime memory; JS heap is only one category.
7. Conceptually `G(terminal -> G(terminal))`, assuming terminal is an immutable property for one attempt.
8. Pause both actions before their proposed decision point, then release in controlled order and assert an allowed terminal outcome.
9. Scheduling, I/O, network failures and coordination add costs beyond graph traversal.
10. “No two overlapping confirmed claims may occupy the same exclusive resource.”
11. Microbenchmarks can ignore retries, real data, racing writers and malformed inputs.
12. An exhaustive simple enumeration on small inputs can check an optimized candidate's output.

## Mastery checkpoint

Before Chapter 14, demonstrate at least one full workshop deliverable with counterexamples, explicit assumptions and a test plan. Do not claim a production-ready implementation or a finished PRD merely because a teaching exercise is complete.

References: earlier D01 chapters; CLRS *Introduction to Algorithms*; OSTEP https://pages.cs.wisc.edu/~remzi/OSTEP/; Lamport *Specifying Systems* https://lamport.azurewebsites.net/tla/book.html.

**Coverage audit:** four backend scenarios ✓; contracts/invariants ✓; costs and capacity ✓; concurrency/liveness ✓; I/O and memory ✓; evidence rubric ✓; exercises ✓. Pending learner review and hands-on workshop evidence. **Next:** Chapter 14 — Assessment and Transfer.
