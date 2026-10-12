# Chapter 10 — Concurrent Execution

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, awaiting learner review  
**Prerequisites:** Chapters 01 (invariants), 05 (logic), 06–09 (CPU, OS, memory and I/O).

## Learning objectives

Explain concurrency versus parallelism, interleavings, race conditions, atomicity, critical sections, visibility and ordering; compare locks, semaphores, condition variables and message passing; recognize data races and deadlocks; design counterexample schedules; and specify safety under concurrent operations without presupposing an implementation architecture.

## 1. Concurrency changes the order of events

**Concurrency** means multiple operations may progress in overlapping intervals. **Parallelism** means they execute simultaneously. A single-threaded event loop can interleave asynchronous operations, while multiple threads or processes can execute concurrently or in parallel.

A program's observable result depends on the **happens-before relationships** and potential interleavings among operations. An operation composed of a read, calculation and write may not be atomic.

Imagine a shared capacity of one, with requests A and B:

```text
A reads capacity = 1
B reads capacity = 1
A writes capacity = 0 and confirms
B writes capacity = 0 and confirms
```

Both confirmations would violate `confirmed <= capacityOriginal`. The error is not the final numeric value zero; it is two successful claims on one resource.

The correct product requirement states that total confirmed allocations never exceed capacity under any concurrent schedule. It must not require locks, transactions or any specific technology. Codex will investigate implementation strategies when the project exists.

## 2. Race conditions, data races and logical races

A **race condition** occurs when correctness depends on relative timing/order of events. A **data race** is a narrower concept in memory models: conflicting unsynchronized accesses to shared memory, at least one a write, without the required ordering. A logical race may occur across separated requests or database operations without any shared-memory data race.

### Educational asynchronous race

```ts
let stock = 1;

async function claim(wait: () => Promise<void>): Promise<boolean> {
  if (stock <= 0) return false;
  await wait();
  stock -= 1;
  return true;
}
```

If two invocations both read stock=1 before either resumes, both can return true and stock becomes -1. JavaScript executing one callback at a time does **not** make a sequence separated by `await` atomic.

This example intentionally contains a defect. It is not a production booking design and should not be copied into an app.

## 3. Atomicity and linearizability

An **atomic operation** acts as one indivisible logical step for the relevant observers. Atomicity of a memory instruction, an operating-system operation and a business transaction are not interchangeable.

**Linearizability** is a correctness model for concurrent operations: each completed operation can be assigned a single logical point between its invocation and response, and the resulting order respects real-time precedence between non-overlapping operations. It is stronger than merely getting an eventually correct final counter.

Example: with one available seat, two competing confirm operations must have outcomes consistent with one succeeding and the other failing, assuming no cancellation or capacity change. A timeout with an unknown outcome needs a separate reconciliation contract; a client cannot infer failure merely from a missing response.

**Serializability** describes equivalence to some serial execution of transactions, while linearizability includes real-time constraints for individual operations. These properties answer different questions and should not be conflated.

## 4. Safety, liveness and invariants

- **Safety:** something bad never happens, such as confirmed claims exceeding capacity.
- **Liveness:** something good eventually happens under explicit assumptions, such as an admitted request eventually finishing or being rejected.
- **Invariant:** a property that must hold in all reachable valid states.

Define a small state model first:

```text
Available(1) --A confirms--> Available(0)
Available(0) --B attempts--> Rejected
```

This is a specification of observable transitions, not an enforcement algorithm. It enables schedule-based tests and Codex discovery without committing to architecture.

A design can satisfy safety by rejecting all work but fail liveness and product usefulness. Both need acceptance criteria.

## 5. Critical sections and synchronization primitives

A **critical section** is a region whose concurrent execution requires coordination to preserve shared-state invariants.

**Mutex:** limits access to one holder. Correctness requires all relevant writers to obey the same protocol; locking the wrong scope does not protect the invariant.

**Semaphore:** manages a count of permits; it can represent bounded concurrent access. A semaphore count alone does not necessarily encode the full business ownership contract.

**Condition variable:** enables waiting until a predicate about shared state becomes true; callers normally re-check the predicate in a loop because of spurious wakeups and intervening state changes.

**Read-write lock:** can allow multiple readers or exclusive writer access; fairness and write starvation depend on policy.

**Atomic read-modify-write:** specialized primitive for small shared-memory state; it is not a general substitute for an atomic multi-record workflow.

**Message passing:** participants communicate work/state changes through messages rather than arbitrary shared-memory mutation. It reduces some shared-memory hazards but introduces ordering, retry, delivery and ownership considerations.

These are **educational alternatives**. None is mandatory for project PRDs.

## 6. Memory visibility and ordering

With shared memory, one CPU/thread's write may not immediately appear in the same order to another thread without synchronization. Compiler optimizations, caches and memory-model rules matter.

JavaScript ordinary objects are generally not safely shared for arbitrary concurrent mutation across workers. `SharedArrayBuffer` and `Atomics` provide explicitly shared-memory operations with defined semantics. The Node.js worker model and exact APIs are taught in Domain 03.

```ts
const memory = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counter = new Int32Array(memory);
Atomics.add(counter, 0, 1);
console.log(Atomics.load(counter, 0)); // 1 in this isolated example
```

An atomic increment prevents lost updates for this counter operation; it does **not** automatically make a multi-step business process atomic.

## 7. Deadlock, starvation and livelock

**Deadlock:** participants cannot progress because each waits for conditions held by others. The classic Coffman conditions are mutual exclusion, hold-and-wait, no preemption, and circular wait. All are necessary for the standard resource deadlock model.

Example:

```text
Worker A holds X, waits for Y
Worker B holds Y, waits for X
```

**Starvation:** work remains eligible but never receives service. **Livelock:** participants keep reacting/changing state without making useful progress.

Avoidance and detection strategies (resource ordering, timeouts, bounded waiting, deadlock detection) are worth studying; no one strategy should be inserted as a default in a PRD.

### Fairness

FIFO scheduling, priority order and bounded waiting represent different contracts. Under constant high-priority arrivals, lower-priority work may never run. Product requirements must identify what fairness means before implementation.

## 8. Producer-consumer and bounded buffers

If producers generate tasks at rate λ and consumers finish them at rate μ, sustained λ > μ causes backlog growth unless the system applies an explicit admission or overload policy.

A **bounded buffer** makes capacity explicit. Possible externally visible behaviors include refusal, waiting, deferral or loss with disclosure, depending on the product. Backpressure propagates downstream capacity limits toward producers.

A correct concurrent queue must preserve its own invariants (no duplicate consumption unless the contract permits it; no item silently lost) even when work arrives and departs concurrently. Cross-process durable delivery and retries are covered in D11.

## 9. Testing concurrent behavior systematically

Tests should exercise **interleavings**, not depend on a lucky race happening naturally.

1. State the invariant and sequential expected outcomes.
2. Identify competing operations and their observation/write boundaries.
3. Force a known order with controllable gates or barriers.
4. Assert outcomes *and* final state, including intermediate visibility if required.
5. Repeat with cancellation, timeouts and retries.
6. Check that tests fail against an intentionally defective implementation.
7. Document what the test cannot establish.

### Controlled gate example

```ts
function gate() {
  let release!: () => void;
  const wait = new Promise<void>(resolve => { release = resolve; });
  return { wait: () => wait, release: () => release() };
}

async function demonstrateRace(): Promise<void> {
  let remaining = 1;
  const g = gate();
  async function reserve() {
    if (remaining <= 0) return false;
    await g.wait();
    remaining--;
    return true;
  }

  const a = reserve();
  const b = reserve();
  g.release();
  const results = await Promise.all([a, b]);
  console.log({ results, remaining }); // [true,true], -1
}
```

This deterministic demonstration creates a shared pause so both calls pass the stale check. It is intentionally buggy and for education only. Note that ordinary timing-based stress tests can miss races; controlled schedules make one particular violation reproducible but do not exhaust all possible schedules.

## 10. Backend case studies and contract boundaries

**Limited inventory:** specify invariant that confirmed quantity never exceeds available allocation, and specify timeout/retry outcomes. Avoid prescribing locking or a database.

**Job scheduler:** define at-most-once/at-least-once user-visible processing expectations and how duplicates are reconciled; implementation mechanics belong to Codex.

**Account adjustments:** require no lost accepted change even under concurrent requests. Define rounding, history, failure semantics and observability before designing transactions.

**Seat reservation:** specify that two successful confirmations cannot claim the same exclusive seat; test simultaneous attempts and a lost response. Do not choose distributed locks or SQL until skill-guided discovery.

## 11. Frequent misconceptions

1. Single-threaded JavaScript means no race conditions.
2. An `await` protects a critical section.
3. A thread-safe counter makes a whole workflow safe.
4. An atomic write is the same as a durable write.
5. Serializability and linearizability are interchangeable.
6. Running a test thousands of times proves all schedules.
7. Locking one process protects all processes automatically.
8. Deadlock and starvation mean the same thing.
9. Backpressure guarantees every item succeeds.
10. A PRD should specify mutexes, transaction isolation or distributed locks.

## 12. Exercises

1. Define concurrency and parallelism with an asynchronous server example.
2. Give a two-request interleaving that leads to overbooking.
3. Distinguish a data race from a logical race across API requests.
4. Specify an invariant for a fixed-capacity inventory system.
5. Explain a linearization point and why real-time precedence matters.
6. Compare serializability and linearizability.
7. Explain why an atomic integer increment is insufficient for two-record consistency.
8. State when a mutex, semaphore and condition variable conceptually apply.
9. Give a deadlock schedule using resources X and Y.
10. Differentiate livelock, deadlock and starvation.
11. If production is 500 tasks/sec and consumption is 400 tasks/sec, estimate backlog increase after one minute.
12. Describe a forced-interleaving test for two competing reservations.
13. Why might an ordinary load test miss the race even if the code is defective?
14. Explain why a `SharedArrayBuffer` counter doesn't solve an inter-service booking problem.
15. State an implementation-neutral PRD acceptance criterion for uncertain network responses.

### Answer guide

1. Concurrent work overlaps in progress; parallel work runs simultaneously on distinct resources.
2. Both observe capacity one before either commits a claim, then both return success.
3. Data race concerns unsynchronized conflicting shared-memory accesses; logical race concerns timing-dependent application invariants.
4. `0 <= confirmed <= capacity` for all reachable states.
5. Logical instant during call/response interval; non-overlapping calls must preserve external order.
6. Serializable transactions behave like some serial ordering; linearizability also respects real-time precedence.
7. An atomic increment doesn't guarantee all related state changes succeed together.
8. Mutex exclusivity, semaphore counted permits, condition variable waiting on a predicate.
9. A holds X and awaits Y; B holds Y and awaits X.
10. Deadlock no progress because blocked; livelock active without useful progress; starvation some task never served.
11. Approximately 6,000 queued tasks, assuming fixed rates and no drops.
12. Pause both after reading availability, release together, assert no more than one success.
13. Scheduling may not expose the vulnerable interleaving.
14. It only coordinates shared memory with a specific process/thread setup, not arbitrary external services.
15. "A retry must not create a second confirmed reservation; the requester can determine whether the original attempt succeeded."

## Mastery checkpoint

Explain an interleaving counterexample, define a safety invariant, distinguish atomicity levels, describe deadlock and starvation, and construct a deterministic race test. Any proposed solution for a real product must emerge later through Codex's discovery and the approved PRD.

References:
- OSTEP, Concurrency: https://pages.cs.wisc.edu/~remzi/OSTEP/
- Node.js worker threads: https://nodejs.org/api/worker_threads.html
- MDN Atomics: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
- Herlihy & Shavit, *The Art of Multiprocessor Programming*.

**Coverage:** concurrency/parallelism ✓; interleavings ✓; races ✓; safety/liveness ✓; atomicity/linearizability ✓; synchronization ✓; visibility ✓; deadlock/starvation ✓; bounded buffers ✓; deterministic testing ✓. Pending learner review and independent execution. Next: Chapter 11 — Liveness and Coordination.
