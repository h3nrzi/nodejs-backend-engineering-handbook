# Chapter 14 — Assessment and Transfer

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, pending learner review  
**Prerequisites:** Chapters 01–13  
**Purpose:** establish whether the learner can apply foundational reasoning independently, then transfer the learning into product discovery and Codex-led implementation without prematurely selecting architecture.

## 1. What completion means

Three separate milestones must not be conflated:

1. **Curriculum authored and learner-approved:** all 14 chapters accepted for instructional clarity and coverage.
2. **Competence demonstrated:** learner completes and reviews assessments and a case-study portfolio, with recorded evidence.
3. **Product implementation:** only after choosing a project, approving an implementation-neutral PRD, and handing it to Codex with the required skills. This is a different workstream.

Approving this chapter closes the **lesson-authoring review gate**, not automatically the practical assessment or any project PRD.

## 2. Competency matrix

| Theme | Chapters | Demonstration required |
|---|---|---|
| Algorithm correctness and cost | 01, 04 | Invariant/proof, Big-O model, counterexample and benchmark plan |
| Data structures and graphs | 02, 03 | Choose an ADT based on workload; trace a graph traversal or heap |
| Discrete mathematics | 05 | Logic/quantifier translation, induction, basic probability |
| Machine and OS behavior | 06, 07 | Differentiate CPU, scheduling and I/O bottlenecks |
| Memory and filesystem | 08, 09 | Explain retention, memory bounds, backpressure, durability |
| Concurrency and liveness | 10, 11 | Find race interleavings, deadlock/starvation cases and recovery requirements |
| State machines | 12 | Transition table, invariant, forbidden paths and model tests |
| Integration | 13 | Full case study with product behavior, evidence and uncertainty |

The purpose is transfer of reasoning, not memorization of definitions.

## 3. Written assessment — 30 points

Answer in your own words. State assumptions.

**Q1 (3):** An array of one million items supports repeated searches. Compare one-off linear search to preprocessing for repeated lookup, including update and memory costs.

**Q2 (3):** Show why inserting sorted values into an unbalanced binary search tree can give O(n) lookup. What additional property changes that bound?

**Q3 (3):** For a graph with V vertices and E directed edges, explain when BFS is appropriate versus topological ordering and when weighted shortest-path reasoning is required.

**Q4 (3):** Negate “every confirmed job has a successful output” using quantifiers. Explain why one counterexample matters.

**Q5 (3):** Distinguish JavaScript heap usage, RSS and peak temporary memory; give an example of reachable but unnecessary retained data.

**Q6 (3):** A producer adds 700 jobs/sec and consumers complete 520/sec for 90 seconds. Estimate backlog growth and identify an observable requirement needed under overload.

**Q7 (3):** Two requests both read one available seat before either writes. Show a violating schedule and formulate the safety invariant without naming a lock, database or transaction.

**Q8 (3):** Contrast successful write API completion, visibility, atomic rename and durability following power failure.

**Q9 (3):** A caller times out during a report submission but the report may succeed. Define valid observable states and a retry/reconciliation expectation.

**Q10 (3):** Define the difference between deadlock, starvation, livelock and a merely slow but progressing task, and supply one distinguishing observation for each.

### Answer guidance (not a substitute for learner work)

- Q1: one-off scan O(n); repeated queries may justify indexes or sets, but build/update/memory costs matter.
- Q2: ordered insertion produces a chain; balancing constraints keep height O(log n).
- Q3: BFS for unweighted reachability/minimum edge count; topological order for DAG dependencies; weighted shortest path needs weight-aware assumptions.
- Q4: `∃job: confirmed(job) ∧ ¬successfulOutput(job)`; it refutes the universal rule.
- Q5: RSS includes more than managed JS objects; reachable caches and buffers can remain retained even when useless.
- Q6: `(700−520)×90=16,200` additional jobs, assuming sustained rates and no rejection.
- Q7: both read available then both report success; invariant: confirmed claims on an exclusive resource never exceed allowed capacity.
- Q8: API acknowledgment is not automatically persistence; rename namespace atomicity does not itself guarantee durable data and metadata.
- Q9: separate unknown-to-caller from authoritative terminal outcome; same logical attempt must be reconcilable without unintended duplicate effects.
- Q10: blocked circular wait; indefinite unfair postponement; repeated activity with no useful progress; finite but prolonged work.

## 4. Applied assessment — 40 points

Choose **one** Chapter 13 case study (reservation, workflow dependencies, large dataset processing or priority queue).

Deliver six artifacts:

1. **Behavior specification (6):** actors, user problem, intended outcomes, exclusions, failure semantics.
2. **State and invariant sheet (8):** state diagram, transition table, three safety properties and one conditional liveness property.
3. **Workload and resource model (6):** meaningful variables, complexity assumptions, memory/I/O constraints and expected scale.
4. **Counterexamples (8):** at least two minimal incorrect schedules or failure traces, with explanation of the violated invariant.
5. **Testing/evidence plan (8):** deterministic boundary tests, concurrent tests, recovery/timeout tests, and representative measurements.
6. **Decision boundary (4):** distinguish product rules from possible technical approaches; explicitly leave architecture decisions to Codex.

Do not implement production code as part of this assessment. Educational pseudocode or a tiny local experiment is optional and must not be mistaken for production evidence.

## 5. Oral/design defense — 20 points

Explain your chosen case in a review conversation:

- **Correctness (5):** demonstrate a proof sketch or invariant-preserving argument.
- **Trade-offs (5):** compare at least two conceptual approaches with explicit assumptions; no forced implementation choice.
- **Performance (5):** give a falsifiable measurement hypothesis, workload shape and evidence that would change your view.
- **Failure/recovery (5):** explain uncertain outcomes, retries and a case where a client-visible timeout differs from actual system state.

An answer such as “use Redis because it is fast” does not qualify as a complete trade-off analysis.

## 6. Transfer exercise — 10 points

Take the case study and produce **an implementation-neutral product handoff**:

- Problem statement and target user.
- In-scope and excluded behavior.
- User-visible flows, including loading/empty/error/uncertain outcomes where relevant.
- Safety and liveness acceptance criteria.
- Domain terminology, constraints and unresolved product questions.
- **No** selected ORM, database, queue, lock, algorithm, cloud provider, deployment topology or technical architecture.

This exercise is *not automatically an approved PRD*. A later product-review gate must accept a dedicated PRD in the project's catalog.

When a real project is selected, Codex—using the installed Matt Pocock skill workflow—performs technical discovery, alternatives, architecture/ADRs, specification, tickets and implementation in a separate repository. The Handbook links that repository and records evidence of learning and implementation status.

## 7. Scoring and review

Total: **100 points**.

| Component | Points |
|---|---:|
| Written reasoning | 30 |
| Applied case study | 40 |
| Design defense | 20 |
| Implementation-neutral handoff | 10 |

Suggested criteria:
- **85–100:** ready to begin product selection, subject to review of any critical gaps.
- **70–84:** targeted revision of weak concepts and resubmission of relevant evidence.
- **Below 70:** revisit the relevant lessons before proceeding.

**Critical gate:** regardless of total score, any submission that violates a stated safety invariant, treats a timeout as conclusive failure without justification, or embeds technical choices as mandatory PRD requirements must be revised. The rubric is a learning aid; it is not a certification.

No passing score should be recorded until the user's actual answers and evidence are reviewed.

## 8. Evidence checklist

- [ ] Chapter 14 reviewed and approved by learner.
- [ ] Written answers submitted.
- [ ] At least one full Chapter 13 case study submitted.
- [ ] Two explicit failure/counterexample traces reviewed.
- [ ] Resource and performance measurement plan reviewed.
- [ ] State machine and concurrency acceptance tests reviewed.
- [ ] Design defense completed.
- [ ] Implementation-neutral handoff reviewed.
- [ ] Gaps and resubmissions recorded.
- [ ] Separate product PRD selected and approved, if the learner chooses to proceed.

Never check a box merely because the Handbook contains explanatory material.

## 9. Transfer beyond Domain 01

The rest of the Handbook builds upon these foundations:

- D02 JavaScript & TypeScript: language semantics, types and application-level guarantees.
- D03 Node.js Internals: event loop, worker threads, V8 and runtime behavior.
- D04–D05: protocols, network timing and API contracts.
- D06–D08: system architecture and persistent data trade-offs.
- D09–D13: security, distributed operations, messaging, performance and reliability.
- D14–D16: testing, platform engineering, operations and observability.

A lesson should be revisited when evidence shows a gap. There is no requirement to implement all D01 case studies or all 16 domains before beginning an approved portfolio project; portfolio sequencing remains a separate user decision.

## 10. Final self-check

Can you explain **why** a requirement holds, produce an example where a tempting implementation fails, analyze time and memory honestly, distinguish correctness from liveness, and describe a way to measure rather than guess? Can you hand a product contract to Codex without deciding the architecture on its behalf?

If yes, you have a credible plan for evidence-based backend engineering. The next activity is **learner review of this chapter**, then separately the practical assessment and any approved project PRD work.

**References:** D01 Chapters 01–13; CLRS, *Introduction to Algorithms*; *Operating Systems: Three Easy Pieces* (https://pages.cs.wisc.edu/~remzi/OSTEP/); Lamport, *Specifying Systems* (https://lamport.azurewebsites.net/tla/book.html).

**Coverage audit:** integrated written exam ✓; worked answer guide ✓; applied evaluation ✓; design defense ✓; transfer boundary ✓; scoring ✓; evidence checklist ✓. **Pending:** learner chapter approval and all actual assessment evidence.
