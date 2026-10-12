# D01 — Computer Science Foundations

**Domain status:** in_progress  
**Curriculum blueprint:** approved by learner  
**Lesson chapters:** 01 drafted / awaiting review; 02–14 not_started  
**Project PRDs:** not_started  
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

See [chapter-by-chapter blueprint](curriculum.md). Chapters will be written and reviewed individually; an outline is not a lesson. **Chapter 01 drafted:** [Cost Models and Correctness](lessons/01-cost-models-and-correctness.md). Awaiting learner review before Chapter 02.

## Projects

See [candidate catalog](projects/catalog.md). Candidate descriptions are *product problems and expected outcomes*, not technical implementation designs. PRDs will be written in separate steps after candidate review, with architecture/technology selection deferred to Codex in the external implementation project.

## Boundaries

- In scope: first-principles CS knowledge with demonstrable use in backend engineering.
- Covered deeper elsewhere: JavaScript types/promises (D02), Node.js Event Loop and V8 internals (D03), network protocols (D04), database internals (D07), distributed algorithms (D10).
- Not required: deriving full mathematical proofs of every algorithm; fundamentals of proofs, invariants and counterexamples **are** required.

## Current gate

Curriculum plan approved. Chapter 01 awaits review. Project candidates remain unapproved; no PRDs have been drafted.
