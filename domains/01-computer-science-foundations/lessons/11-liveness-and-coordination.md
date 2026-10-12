# Chapter 11 — Liveness and Coordination

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, pending learner review  
**Prerequisites:** Chapters 01, 07, 09 and 10

## Outcomes

Distinguish safety, liveness and fairness; diagnose deadlock, starvation and livelock; reason about condition predicates, bounded queues, timeouts, cancellation and progress; and write testable product requirements without prescribing technical solutions.

## 1. Safety is not liveness

**Safety** means a prohibited outcome never occurs. Example: no two confirmed bookings occupy one exclusive seat.

**Liveness** means work eventually makes progress under stated assumptions. Example: every admitted request eventually reaches an observable outcome while workers and required dependencies remain available.

**Fairness** defines which eligible operations get service. Weak fairness means an action that remains continuously enabled eventually executes; strong fairness concerns actions enabled infinitely often. An engineering requirement often uses measurable waiting bounds under specified load.

A system can be perfectly safe by rejecting every request, yet fail its product purpose. It can also make rapid progress while violating capacity correctness. Both dimensions need independent evidence.

## 2. Deadlock and circular waiting

In the classic reusable-resource model, deadlock requires four Coffman conditions: mutual exclusion, hold-and-wait, no preemption and circular wait.

Example:

```text
A holds resource X; waits for Y held by B
B holds resource Y; waits for X held by A

Wait-for graph: A → B → A
```

With single-instance resources, this cycle indicates deadlock. With multiple resource instances a cycle alone may be insufficient. Resource ordering, avoiding hold-and-wait and explicit recovery are possible concepts, but no strategy belongs in a project PRD by default.

## 3. Starvation and livelock

**Starvation** occurs when eligible work is repeatedly denied service while other work proceeds. A flood of high-priority requests can starve lower-priority work.

**Livelock** occurs when participants remain active and react continually but cannot complete useful work. Deadlock typically involves blocked participants.

FIFO order, weighted fairness, deadlines and priority all represent different product policies. They may conflict; choose acceptance criteria first.

## 4. Predicate-based waiting

Condition variables support waiting for changes to a shared-state predicate, traditionally while coordinating with a mutex.

```text
acquire lock
while resource_not_available:
    wait (release lock, then reacquire before return)
perform protected action
release lock
```

Rechecking the predicate is critical: wakeups may be spurious, or a different participant can consume the resource before a waiter resumes. A notification is not a substitute for validated shared state.

This is conceptual pseudocode, not a technology recommendation.

## 5. Producer–consumer coordination

For a bounded queue with capacity K, maintain `0 <= queue_size <= K`.

If work arrives at 250 items/s and completes at 200 items/s for a minute, a queue without admission limits gains about 3,000 items. The product needs an explicit overload policy: reject, wait/defer, or an agreed loss policy. Backpressure restricts production to downstream capacity; it does not ensure successful delivery or progress by itself.

## 6. Cancellation and uncertain outcomes

Cancellation is a **request to stop**, not proof that no work took place. If completion and cancellation race, the contract must define which terminal outcome is valid.

A client timeout means the caller stopped waiting. It does not prove a remote action failed. Retrying without reconciling may repeat an effect.

```text
accepted → executing → succeeded / failed
                |
                → cancellation_requested → cancelled OR succeeded
```

A deadline is an absolute time point; a timeout is a relative duration. Child operations may need to inherit remaining time budgets.

## 7. Progress guarantees

A blocking algorithm may wait for another participant. **Lock-free** means system-wide progress is guaranteed under its formal assumptions, even though individual operations may starve. **Wait-free** provides bounded per-operation progress under its model. Neither is synonymous with nonblocking network I/O.

Linearizability (correct concurrent ordering) and liveness (eventual progress) are distinct properties. An operation can be correct if it finishes yet fail to finish.

## 8. Practical backend examples

**Limited booking capacity:** require no overbooking, a final observable result, and well-defined behavior when two requests race.

**Background reports:** specify accepted, running, completed, failed and cancellation-requested states; never equate a lost response with failed processing.

**Dependent tasks:** define stalled-state observability and recovery outcomes; do not mandate a scheduler or orchestration engine.

The PRD defines what must hold. Codex decides how to enforce it using the Matt Pocock skill-driven discovery process.

## 9. Common pitfalls

- Safety is treated as a guarantee of progress.
- A cycle in every wait-for graph is assumed to prove deadlock.
- Condition-variable wakeups are treated as proof that the predicate holds.
- A timeout is treated as cancellation or rollback.
- Nonblocking I/O is confused with lock-free progress.
- Throughput is optimized without checking starvation.
- A PRD prematurely mandates mutexes, brokers or transactions.

## 10. Exercises

1. Give independent safety and liveness properties for a reservation service.
2. Draw a two-resource circular wait and explain when it implies deadlock.
3. Give an example of priority-induced starvation.
4. Explain how livelock differs from deadlock.
5. Why must a condition-variable waiter test its predicate in a loop?
6. Define three observable policies for an overloaded bounded queue.
7. Calculate backlog growth at 250 arrivals/s and 200 completions/s over two minutes.
8. Why does a caller timeout not prove task failure?
9. Construct a cancellation-completion race and propose an explicit product outcome.
10. Distinguish lock-free progress, wait-free progress and asynchronous I/O.
11. Describe a controlled test for a missed notification.
12. Formulate a measurable fairness requirement without selecting an algorithm.

### Answer guide

1. Safety: confirmed bookings never exceed capacity. Liveness: admitted bookings reach a final outcome under declared availability conditions.
2. A holds X and waits for B; B holds Y and waits for A. Single-instance resource cycles indicate deadlock; multi-instance cases need more analysis.
3. Continuous urgent work prevents eligible ordinary work from receiving service.
4. Livelock participants remain active but ineffective; deadlocked participants are blocked.
5. State may change after the wakeup, and spurious wakeups can occur.
6. Explicit rejection, deferred admission, or a documented shedding policy.
7. `(250-200)*120=6000` additional items.
8. The remote task may later complete and have side effects.
9. Define whether an already committed operation reports completion despite the cancellation request.
10. Lock-free and wait-free are formal progress properties; async I/O concerns deferred result delivery.
11. Force notification immediately before and after waiting begins; verify ready work does not remain blocked.
12. Under a specified maximum admission rate, eligible ordinary work receives a terminal response within an agreed bound.

## Mastery check and references

You should be able to trace wait-for dependencies, explain starvation and cancellation races, and translate progress objectives into measurable acceptance criteria without prescribing technology.

References: [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) (concurrency); Herlihy & Shavit, *The Art of Multiprocessor Programming*; [Node.js AbortController](https://nodejs.org/api/globals.html#class-abortcontroller).

**Coverage:** liveness/safety, deadlock, fairness, condition waiting, bounded buffers, cancellation, progress and exercises. **Pending:** learner review and independent code verification. **Next:** Chapter 12 — State Machines and Formal Reasoning.
