# Chapter 12 — State Machines and Formal Reasoning

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, awaiting learner review  
**Prerequisites:** Chapters 01 (correctness), 05 (logic), 10–11 (concurrency and progress).

## Learning objectives

Model software behavior using states, events and transition relations; distinguish state from historical events; specify guards, invariants, safety and liveness; reason about deterministic versus nondeterministic transitions; test both valid and forbidden transitions; explain temporal properties and basic model checking; and translate user-facing requirements into a verifiable state machine **without imposing an architecture on Codex**.

## 1. Why a state machine?

A state machine describes which states a system can occupy and which events can cause movement between states. It replaces ambiguous prose such as “the appointment can be completed after service” with explicit conditions.

A basic finite-state machine is a tuple of states S, events E, an initial state s₀ and a transition function or relation. A deterministic machine has at most one next state per state and event under a complete event definition. Real service models frequently include guards, variables and externally observed outcomes.

**Example:** a background job can be `queued`, `running`, `succeeded`, `failed`, or `cancelled`. Merely having a string status is not enough: the important part is which transitions are permitted and what evidence justifies them.

## 2. Define the state space and transitions

Consider the contract:

```text
queued ──start──→ running ──complete──→ succeeded
   │                 │
   └─cancel────────→ cancelled
                     │
                     ├─fail────────→ failed
                     └─cancel──────→ cancelled
```

In this simplified product, terminal states are `succeeded`, `failed` and `cancelled`. No transition leaves a terminal state. A different product may allow retry by creating a **new attempt**, rather than reopening a terminal attempt.

### Transition table

| Current | Event | Guard | Next | Observable result |
|---|---|---|---|---|
| queued | start | worker accepted work | running | started |
| queued | cancel | cancellation permitted | cancelled | cancelled |
| running | complete | output validated | succeeded | success |
| running | fail | failure classified | failed | failure |
| running | cancel | cancellation wins under policy | cancelled | cancelled |
| succeeded | cancel | none | unchanged | rejected/already terminal |

A rejected transition is still a defined outcome. If “cancel while completing” is possible, the product must state how conflicts are resolved; the table alone does not prove an atomic implementation.

## 3. Invariants and reachable states

A **state invariant** must hold in every state reachable from the initial state via valid transitions.

Examples:
- Terminal job attempts never become running again.
- Every succeeded job has a validated result.
- A confirmed exclusive booking has a resource assignment.
- Total confirmed claims per exclusive resource never exceed one.

A test that checks current status in isolation cannot prove all invariants across concurrent transitions.

A proof approach:
1. Show invariant holds in the initial state.
2. For each permitted transition, assume it holds before transition and show it holds afterward.
3. Conclude it holds for all reachable states, provided the model covers all relevant transitions.

This is **inductive invariance**. It proves a property of the model under its assumptions, not automatically of an implementation.

## 4. Preconditions, guards, effects and postconditions

A **guard** decides whether a transition is enabled. **Effects** describe state changes or externally visible behavior. **Postconditions** specify what must be true afterward.

```ts
type Status = "queued" | "running" | "succeeded" | "failed" | "cancelled";
type Event = "start" | "complete" | "fail" | "cancel";

type Outcome =
  | { ok: true; status: Status }
  | { ok: false; reason: "invalid_transition"; status: Status };

function transition(status: Status, event: Event): Outcome {
  const edges: Partial<Record<Status, Partial<Record<Event, Status>>>> = {
    queued: { start: "running", cancel: "cancelled" },
    running: {
      complete: "succeeded",
      fail: "failed",
      cancel: "cancelled",
    },
  };

  const next = edges[status]?.[event];
  return next
    ? { ok: true, status: next }
    : { ok: false, reason: "invalid_transition", status };
}
```

This is a **pure educational state-transition function**. It does not authorize actors, persist state, validate outputs or make competing requests atomic. Those responsibilities emerge from the specific project contract and Codex exploration.

## 5. State versus events and snapshots

State answers **what is true now**. An event reports **what happened**, often with an identifier and time. A sequence of events can reconstruct a state if all meaningful transitions are represented and processed under defined rules.

However, event sourcing is not required to implement a state machine. A system can maintain current state in many ways. The PRD defines observable history and auditing needs without mandating storage architecture.

**Snapshots** represent state at a selected point; they can omit intermediate events unless the contract includes them. A mutable history can also have different audit guarantees from append-only evidence.

## 6. Determinism and nondeterminism

A deterministic transition function gives the same next state for the same complete inputs. **Nondeterminism** in a model lets multiple outcomes be possible, for example when two requests race or an external dependency responds unpredictably.

Model the allowed outcomes explicitly:

```text
pending --response received--> succeeded
pending --definitive rejection--> failed
pending --timeout--> unresolved
```

A timeout should not silently be treated as definitive failure. The product can require reconciliation. Modelling uncertainty improves correctness even before architecture is selected.

## 7. Safety, liveness and temporal properties

**Safety:** a forbidden state is never reached. Example: a cancelled job never becomes succeeded afterward if cancellation is terminal.

**Liveness:** eventually some progress occurs under declared assumptions. Example: every accepted job eventually reaches terminal status when capacity and dependencies remain available.

Basic temporal-logic vocabulary:
- `G P`: P is always true.
- `F P`: P becomes true at some future point.
- `P U Q`: P remains true until Q holds (under strong-until semantics).

Illustrations:
- `G(confirmed_count <= capacity)` — capacity invariant.
- `G(accepted -> F(terminal))` — every accepted attempt eventually terminates, **assuming fairness and system availability**.

These notations are conceptual and not executable verification artifacts. Purely finite test runs cannot prove unbounded liveness without a bounded contract or deeper reasoning.

## 8. Composition and state explosion

When independently modeled components interact, the full state space can grow as the product of their state counts. Three components with 5, 4 and 6 states have up to 120 combined configurations before considering variable data.

This is **state explosion**. To reason usefully, define abstraction boundaries, ignore irrelevant distinctions, reduce symmetric states, and investigate only interactions affecting invariants. Such abstraction must not hide a real failing interleaving.

For example, a booking attempt's state may interact with a resource's availability and a payment result. A per-entity state machine alone may not preserve cross-entity invariants.

## 9. Model-based and property-based testing

A table of permitted transitions can drive tests; then include illegal transitions, repeated events and sequences.

```ts
const sequence: Event[] = ["start", "complete", "cancel"];
let status: Status = "queued";

for (const event of sequence) {
  const result = transition(status, event);
  if (result.ok) status = result.status;
}
console.log(status); // "succeeded"; terminal cancel was rejected
```

**Property-based testing:** generate many event sequences and assert general properties such as “terminal never returns to running.” **Model-based testing:** compare the system under test against the reference transition model. A generated test suite is evidence only for the explored sequences; test generators, models and integration boundaries can be wrong.

Important test cases:
- every permitted edge;
- every forbidden edge;
- duplicate/replayed events;
- missing/invalid identity;
- interleaving of competing commands;
- interruptions and uncertain outcomes;
- state restoration after restart;
- reconciliation with external systems.

## 10. Backend case study: capacity and cancellation

An exclusive-resource reservation system may have `draft`, `pending`, `confirmed`, `cancelled`. Define which actions preserve selected service, owner and quoted price. Define whether cancellation can happen after confirmation, whether time windows apply and whether a stale draft may be confirmed.

A PRD can state that no two confirmed reservations claim the same exclusive resource for overlapping intervals. Codex later selects the synchronization, persistence and API design. A state diagram alone cannot prevent races at runtime.

## 11. Frequent mistakes

1. Listing statuses without defining transition rules.
2. Treating a status check and update as automatically atomic.
3. Leaving rejected transitions unspecified.
4. Confusing the last recorded event with guaranteed current truth.
5. Reopening terminal attempts without an explicit product rule.
6. Treating timeout as proof of remote failure.
7. Assuming model validation proves production correctness.
8. Ignoring external side effects and recovery paths.
9. Leaving actor permissions out of transition requirements.
10. Assuming every complex workflow requires event sourcing.

## 12. Exercises

1. Define states and events for a simple report-generation task.
2. Identify all terminal states and rejected transitions in the example above.
3. Prove terminal-state immutability by induction over event sequences.
4. Add a `cancel_requested` state: what new ambiguous outcomes must be specified?
5. Express “capacity is never exceeded” as an invariant.
6. Explain why a pure transition function cannot prevent two-process races.
7. Distinguish an event from a snapshot.
8. Give a counterexample to treating timeout as final failure.
9. How many combined configurations can four independent 3-state components have?
10. Write a basic property-based testing strategy for a state machine.
11. Why can a generated suite miss concurrency defects?
12. Define the semantics of cancelling a job already succeeded.
13. Explain how product rules for actor authorization affect a transition.
14. Write an implementation-neutral PRD acceptance criterion for replaying a completion event.

### Answers and rubric

1. Queued, running, succeeded, failed, cancelled; start/complete/fail/cancel as events.
2. Succeeded, failed, cancelled are terminal; e.g. succeeded→running is forbidden.
3. Base: initial state nonterminal; step: terminal states have no outgoing valid edges, so property persists.
4. Completion may win or cancellation may win; specify final result and what the caller observes.
5. `∀reachable_state, confirmed_count <= capacity`.
6. It doesn't enforce shared atomicity across separate processes or persistent writes.
7. Event records an occurrence; snapshot represents a state at some moment.
8. Remote work can succeed after the client stops waiting.
9. `3^4 = 81`.
10. Generate valid/invalid event sequences, assert allowed-state reachability and terminal invariants.
11. Not every interleaving or external failure is enumerated; model assumptions can be wrong.
12. Return an explicit already-terminal result, with no state reversal if that is the chosen contract.
13. Guards must include an actor's allowed action/resource scope where required.
14. Replaying a completed operation cannot create a second unintended side effect or reverse its final status.

## Mastery checkpoint and references

Explain a transition table and invariant proof, recognize nondeterministic outcomes, distinguish safety and liveness, and outline model-based tests without predetermining storage or workflow architecture.

References:
- Lamport, *Specifying Systems* (TLA+): https://lamport.azurewebsites.net/tla/book.html
- Leslie Lamport, *State Machines and Their Formal Specifications* (related writings): https://lamport.azurewebsites.net/
- Harel, *Statecharts: A Visual Formalism for Complex Systems*.
- OSTEP concurrency: https://pages.cs.wisc.edu/~remzi/OSTEP/

**Coverage:** FSM/transitions ✓; guards/invariants ✓; deterministic/nondeterministic ✓; state/events ✓; safety/liveness ✓; temporal reasoning ✓; composition/state explosion ✓; model/property-based testing ✓. Pending learner review and independent code execution. Next: Chapter 13 — Backend Case-Study Workshop.
