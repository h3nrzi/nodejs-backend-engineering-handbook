# D01 — Computer Science Foundations

**Domain status:** in_progress  
**Curriculum blueprint:** approved by learner  
**Lesson chapters:** 01–14 approved; practical assessment not_started  
**Project PRDs:** P01 approved; P02 drafted pending review; P03–P04 candidate only  
**Implementation:** not_started

## Purpose

Understand the computer-science mechanisms behind reliable, efficient backend programs before relying on Node.js abstractions. The outcome is *practical reasoning* about algorithms, processes, memory, concurrency, I/O and state correctness, not academic memorization.

## Prerequisites

Basic JavaScript syntax (variables, functions, loops, arrays, promises) and elementary terminal usage. Every advanced concept must be introduced from first principles; domain-specific Node.js API internals are taught later in D03.

## Learning outcomes

By the end, the learner should be able to:

1. Choose and justify appropriate structures and algorithms against workload constraints; estimate asymptotic and measured cost.
2. Explain process/thread scheduling, virtual memory, CPU/cache locality and file I/O well enough to diagnose backend bottlenecks.
3. Reason about concurrent operations using interleavings, invariants and synchronization, including deadlock and starvation risks.
4. Express business rules as state machines, specify safety/liveness properties, and test corner cases.
5. Connect theory to Node.js backend use cases without confusing language/runtime abstractions with OS mechanisms.

## Curriculum and review

See [chapter-by-chapter blueprint](curriculum.md). Chapters will be written and reviewed individually; an outline is not a lesson. **Approved:** [Chapter 01 — Cost Models and Correctness](lessons/01-cost-models-and-correctness.md), [Chapter 02 — Linear and Associative Data Structures](lessons/02-linear-and-associative-data-structures.md). **Approved:** [Chapter 03 — Trees, Heaps and Graphs](lessons/03-trees-heaps-and-graphs.md). **Approved:** [Chapter 04 — Algorithmic Problem-Solving](lessons/04-algorithmic-problem-solving.md). **Approved:** [Chapter 05 — Discrete Foundations](lessons/05-discrete-foundations.md). **Approved:** [Chapter 06 — Computer Architecture and Performance](lessons/06-computer-architecture-and-performance.md). **Approved:** [Chapter 07 — Operating Systems and Scheduling](lessons/07-operating-systems-and-scheduling.md). **Approved:** [Chapter 08 — Memory Models and Management](lessons/08-memory-models-and-management.md). **Approved:** [Chapter 09 — File Systems and I/O](lessons/09-file-systems-and-io.md). **Draft pending review:** [Chapter 10 — Concurrent Execution](lessons/10-concurrent-execution.md).

## Projects

See [candidate catalog](projects/catalog.md). Candidate descriptions are *product problems and expected outcomes*, not technical implementation designs. PRDs will be written in separate steps after candidate review, with architecture/technology selection deferred to Codex in the external implementation project.

## Boundaries

- In scope: first-principles CS knowledge with demonstrable use in backend engineering.
- Covered deeper elsewhere: JavaScript types/promises (D02), Node.js Event Loop and V8 internals (D03), network protocols (D04), database internals (D07), distributed algorithms (D10).
- Not required: deriving full mathematical proofs of every algorithm; fundamentals of proofs, invariants and counterexamples **are** required.

## Current gate

Curriculum plan approved. Chapter 10 awaits review. Project candidates remain unapproved; no PRDs have been drafted.

**New lesson:** [Chapter 12 — State Machines and Formal Reasoning](lessons/12-state-machines-and-formal-reasoning.md) (draft, pending learner review).

**Chapter 13:** [Backend Case-Study Workshop](lessons/13-backend-case-study-workshop.md) — draft, pending learner review.

**Chapter 14:** [Assessment and Transfer](lessons/14-assessment-and-transfer.md) — approved by learner. The separate practical competency assessment is not complete.

## Current project planning

The [project catalog](projects/catalog.md) contains four distinct D01 candidates. The first behavior-only PRD, [P01 Workload & Complexity Observatory](projects/p01-workload-complexity-observatory-prd.md), is learner-approved. [P02 Concurrent Resource Allocation Simulator](projects/p02-concurrent-resource-allocation-simulator-prd.md) is drafted and awaiting review. No implementation choices have been made. Practical assessments remain deferred until the explicit study phase.
