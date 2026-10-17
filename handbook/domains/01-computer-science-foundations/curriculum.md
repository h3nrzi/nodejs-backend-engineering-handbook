# D01 Curriculum blueprint — Computer Science Foundations

**Status:** approved curriculum plan; NOT itself lesson content. All 14 chapters are editorially approved according to the canonical tracker; learning assessments remain deferred.  
**Plan:** write one self-contained chapter at a time from first principles to advanced cases. Every chapter must include explanations, worked examples, JavaScript/TypeScript exercises where relevant, counterexamples, reference readings, checkpoints and explicit links to backend scenarios.

[Chapter 01 — Cost Models and Correctness](lessons/01-cost-models-and-correctness.md)

## Learning progression

### Part A — Reasoning and algorithms

| Chapter | Scope, from first principles to advanced practice | Competency check |
|---|---|---|
| 01 — Cost models and correctness | Problem specification; inputs/outputs; invariants; counterexamples; correctness vs performance; time/space complexity; Big O/Theta/Omega; worst/average/amortized; benchmarking caveats | Explain trade-offs, prove a simple loop invariant and diagnose misleading performance comparisons |
| 02 — Linear and associative structures | Arrays vs linked lists; stacks, queues, deques; hash maps/sets; collisions, resizing, amortized behavior, locality | Select structures for workloads; explain expected and pathological behavior |
| 03 — Trees, heaps and graphs | Binary trees, BST, balanced trees; heaps and priority queues; tries; graph representation and traversals | Model scheduling, lookup and dependency problems; estimate costs |
| 04 — Algorithmic problem-solving | Recursion; iteration; divide-and-conquer; sorting/search; binary search; greedy; dynamic programming; graph path and topological ordering; correctness arguments | Choose approaches with clearly stated assumptions, bounds and edge cases |
| 05 — Discrete foundations | Propositional logic; sets, functions, relations; induction; combinatorics, basic probability; graph theory foundations | Turn informal requirements into precise predicates and reason about cases |

### Part B — Machines and operating systems

| Chapter | Scope, from first principles to advanced practice | Competency check |
|---|---|---|
| 06 — Computer architecture and performance | CPU pipeline basics; registers, caches, RAM, locality, CPU vs I/O bound; bandwidth vs latency; context switching; measurement | Trace a bottleneck and distinguish workload classes |
| 07 — Operating systems and scheduling | Kernel/user mode; syscalls; processes, threads, context switches; CPU scheduling; signals and resource limits | Explain process/thread lifecycle and scheduling impacts |
| 08 — Memory models and management | Stack/heap concepts; virtual memory, pages, allocation; reference lifetimes; fragmentation; garbage collection fundamentals; leaks | Distinguish memory retention, allocation cost and paging symptoms |
| 09 — File systems and I/O | Files, descriptors, buffering, sequential/random access; page cache, durability concepts, fsync; blocking/nonblocking interfaces; streams/backpressure concepts | Explain memory-efficient I/O and common failure modes |

### Part C — Correctness under concurrency

| Chapter | Scope, from first principles to advanced practice | Competency check |
|---|---|---|
| 10 — Concurrent execution | Interleavings; shared state; race conditions; atomicity; critical sections; mutexes, semaphores, condition variables; locks vs message passing | Produce counterexample interleavings and protect an invariant conceptually |
| 11 — Liveness and coordination | Deadlock conditions; starvation; fairness; livelock; producer-consumer; bounded buffers; cancellation and backpressure | Distinguish safety from liveness and derive test scenarios |
| 12 — State machines and formal reasoning | Finite state machines; transition tables; pre/postconditions; invariants; deterministic vs nondeterministic behavior; basic property-based/model-based tests | Specify and validate valid/invalid business state transitions |

### Part D — Synthesis and evaluation

| Chapter | Scope | Competency check |
|---|---|---|
| 13 — Backend case-study workshop | Job scheduling, concurrent reservations, large-file processing, dependency graphs; compare multiple solutions without prescribing one for any future PRD | Justify choices, explain risks and formulate acceptance tests |
| 14 — Assessment and transfer | Cumulative exercises; debugging tasks; measured comparisons; self-review; cross-domain pointers and gaps | Demonstrate learning outcomes and document remaining gaps |

## Coverage crosswalk

| Earlier outline topic | Primary chapters |
|---|---|
| Data Structures | 02–03 |
| Algorithms | 04 |
| Complexity Analysis | 01, 04 |
| Operating Systems | 06–07 |
| Concurrency Fundamentals | 10–11 |
| Memory Management | 08 |
| Computer Architecture | 06 |
| File Systems & I/O | 09 |
| Discrete Mathematics | 05 |
| Computational Models | 12 |

## Chapter acceptance standard

Each chapter: beginner entry point → progressively harder mental models and mechanisms → at least two worked examples → edge cases/common misconceptions → backend connection → practical exercises with expected results or answer rubric → references and version notes if applicable → chapter-level concept coverage audit. Examples teach techniques; they do not dictate architecture for project PRDs.

## Drafting order and review gates

1. Learner reviews this blueprint and project-candidate list.
2. Draft Chapter 01 **only**; independent review against the quality gate; record gaps and corrections.
3. Continue chapter by chapter, updating machine tracker and handoff each time. Do not label the domain complete until chapter and assessment coverage is audited.
4. Once educational coverage is mature, review candidate projects and prepare educational Project Charters without technical prescriptions.

## Starting references for verification during chapter authoring

- CLRS, *Introduction to Algorithms* — data structures, algorithms, proofs and complexity.
- Sedgewick & Wayne, *Algorithms* — algorithms and data structures with worked examples.
- *Operating Systems: Three Easy Pieces* (OSTEP), https://pages.cs.wisc.edu/~remzi/OSTEP/ — virtualization, concurrency and persistence.
- *Computer Systems: A Programmer's Perspective* — architecture, memory and systems performance.
- MDN JavaScript documentation, https://developer.mozilla.org/en-US/docs/Web/JavaScript — language behavior when demonstrations use JS.
- Node.js documentation, https://nodejs.org/api/ — runtime-specific examples; check behavior against the target version.

These are intended references, not evidence that all material was already reviewed.
