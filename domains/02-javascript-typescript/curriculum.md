# D02 Curriculum Blueprint — JavaScript & TypeScript

**Status:** draft_pending_learner_review  
**Learning phase:** not started; assessment deferred until learner explicitly opts in.  
**Authoring rule:** one substantial chapter per approval, after this blueprint is approved.  
**Boundary:** language behavior and TypeScript's static analysis; Node.js runtime internals remain D03. Product PRDs must remain implementation-neutral.

## Goals and progression

Develop a precise mental model of JavaScript semantics and TypeScript's static type system, recognize runtime versus compile-time guarantees, safely design and debug backend-facing code, and reason about asynchronous behavior and language-level contracts. Lessons move from values/scope to object behavior and asynchronous flows, then type modeling, tooling and integrated case studies.

Each chapter will contain definitions, why/how explanations, illustrative JavaScript and TypeScript code, counterexamples, edge cases, backend use cases, exercises with answer guide, further reading and coverage audit. Educational code is not claimed tested until independently verified.

## Part A — JavaScript semantics

| # | Chapter | Core scope | Completion evidence to design |
|---|---|---|---|
| 01 | Values, Types and Coercion | primitives/objects, typeof, null/undefined, truthiness, strict vs loose equality, NaN, numeric precision/BigInt, conversions, equality corner cases | Predict outcomes and diagnose unsafe coercion |
| 02 | Variables, Scope and Closures | let/const/var, lexical environments, hoisting/TDZ, closures, references and lifetime, shadowing, module scope | Explain captured state and scope-related defects |
| 03 | Functions and Invocation | declarations/expressions/arrows, parameters, rest/spread, call/apply/bind, this, arguments, higher-order functions, recursion | Trace call semantics and API callback behavior |
| 04 | Objects, Prototypes and Classes | properties, descriptors, prototype chain, Object.create, class syntax, getters/setters, private fields, inheritance, composition | Diagnose lookup/mutation and inheritance semantics |
| 05 | Collections, Iteration and Data Handling | arrays, Map/Set, weak collections, iterables/iterators/generators, destructuring, copying, sorting, mutability | Choose representations without overlooking equality/iteration costs |
| 06 | Modules and Package Boundaries | ECMAScript modules, imports/exports, live bindings, module evaluation, circular dependencies, CommonJS interoperability concepts, package API boundaries | Explain module loading semantics without assuming a Node-specific resolution policy |
| 07 | Exceptions, Errors and Resource Lifetimes | throw/catch/finally, Error/cause, propagation, result modeling, cleanup and disposable resource concepts, validation vs exceptions | Define failure behavior and avoid swallowed errors |

## Part B — Asynchronous JavaScript

| # | Chapter | Core scope | Completion evidence to design |
|---|---|---|---|
| 08 | Promises and Async/Await | promise states and resolution, thenables, chaining, rejection propagation, async functions, microtask concepts, finally | Trace async outcomes and rejection behavior |
| 09 | Asynchronous Composition and Cancellation | Promise.all/allSettled/any/race, independent vs dependent work, concurrency limits as a concept, AbortSignal, timeout semantics, lost-response uncertainty | Explain failed, cancelled and unresolved outcomes |
| 10 | Iteration, Streams and Event Abstractions | sync/async iteration protocols, async generators, event-driven APIs, producer-consumer and backpressure at abstraction level | Handle partial iteration and cleanup conceptually |

## Part C — TypeScript deep foundations

| # | Chapter | Core scope | Completion evidence to design |
|---|---|---|---|
| 11 | TypeScript Type System Fundamentals | structural typing, inference, widening/literals, any/unknown/never/void, type annotations/assertions, strictness, type erasure | Distinguish compiler checks from runtime behavior |
| 12 | Unions, Narrowing and Domain Modeling | unions/intersections, discriminated unions, control-flow narrowing, type predicates, exhaustive checks, readonly, optional/nullable fields | Model state and error outcomes precisely |
| 13 | Generics, Constraints and Advanced Types | generic functions/types, constraints, keyof/indexed access, conditional/mapped/template-literal types, utility types, variance intuition | Explain reusable type relations without overengineering |
| 14 | TypeScript Modules, Configuration and Interop | tsconfig intent, strict flags, targets and libs, module modes, declaration files, third-party JS interfaces, generated/runtime mismatch | Diagnose compile/runtime boundary differences |
| 15 | Runtime Validation and Boundary Safety | unknown external data, parsing, validation, serialization, number/date/JSON limits, trust boundaries, type assertions versus actual checks | Demonstrate that external input isn't trusted merely because it has a TS type |

## Part D — Integration and later assessment

| # | Chapter | Core scope | Completion evidence to design |
|---|---|---|---|
| 16 | Backend Language Case Studies and Transfer | model a request/result contract, async retry/cancel flows, module boundaries, type-driven state transitions, error handling, compatibility and migration trade-offs | Produce explanations, counterexamples and tests; no forced architecture |

**Total: 16 proposed chapters.** These are topic blueprints, not already-written lessons or learner competency claims.

## Cross-cutting concepts

- Explain ECMAScript specified behavior separately from host/runtime behavior and TypeScript compiler settings.
- Every TS example distinguishes static guarantees from runtime validation and states relevant strictness assumptions.
- Treat `this`, closures, prototype mutation, promise settlement, cancellation and structural typing as correctness topics, not mere syntax.
- Incorporate observable contracts, security implications, edge cases, debugging and thoughtful performance discussion without duplicating D01 foundations.
- Code examples should be runnable once verified, but authored lessons should explicitly label unverified execution.
- Avoid premature implementation choices in later project PRDs; discuss technology trade-offs only as lesson content.

## Boundaries with other domains

- **D01:** algorithms, OS scheduling, memory fundamentals and formal reasoning are prerequisites, not repeated as full curricula.
- **D03:** Node-specific Event Loop phases, libuv, V8/GC internals, Buffer specifics, workers and Node module resolution implementation belong there; D02 teaches only language-level contracts.
- **D04/D05:** HTTP, network protocols and API product contracts belong there; D02 uses small motivating examples.
- **D09:** application security architecture and threat modeling belong there; D02 demonstrates type/runtime trust limits.
- **D14:** production testing strategy and CI belong there; D02 provides educational correctness tests.

## Project-catalog criteria after lessons

Favor distinct TypeScript/JavaScript language problems rather than another general CRUD application. Future project candidates may illustrate (a) runtime data contract validation, (b) async orchestration and failure visibility, (c) static type-driven state transitions or (d) modular extension contracts. These are **directions only**, not approved projects or PRDs; user review will determine catalog scope.

## Editorial approval and evidence gates

1. Learner reviews and approves or revises this blueprint.
2. Write Chapter 01 in full; obtain explicit approval before Chapter 02. Repeat per chapter.
3. When all chapters have editorial approval, review project candidates, then create product-only PRDs individually.
4. Keep all quizzes/practical assessment work deferred until the learner explicitly enters the studying phase.
5. Track authored/approved status separately from code execution evidence, assessment results, PRDs and implementation.

**Open editorial questions:** Is 16 chapters an appropriate breadth, and should a separate debugging/tooling chapter be added or integrated into each chapter? The proposed default is integrating debugging techniques throughout and keeping 16 chapters.
