# Chapter 04 — Scheduling Queues and Timers

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C04  
**Editorial status:** in_review — authored, awaiting learner approval.  
**Prerequisite review:** learner authorized continuation after the Chapter 03 review request on 2026-10-12; Chapter 03 is recorded as editorially approved.  
**Educational execution:** Section 13 records executed fixtures and their limits.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes and prerequisites

Explain what is deferred, which queue receives it, and which execution context supports an ordering claim. Distinguish returning from a callback, draining microtasks and allowing a later loop iteration. Choose a scheduling mechanism from its observable contract; reason about repeated work, errors, timer cancellation and process liveness.

Prerequisites: [Chapter 03 — Event loop and I/O lifecycle](03-event-loop-and-io-lifecycle.md), [Chapter 02 — Runtime identity](02-startup-configuration-and-runtime-identity.md), and D02's [Promises and async/await](../../02-javascript-typescript/lessons/08-promises-and-async-await.md). The preceding chapter explains native waiting and phases; this one examines JavaScript deferred execution around those boundaries. Module-loading details return in Chapter 13. Shutdown and diagnostic tools belong to Chapters 16–17.

The objective is defensible prediction, not memorizing one output sequence that supposedly describes every Node program.

## 2. From the current stack to deferred work

A callback cannot run halfway through an ordinary synchronous operation on the same JavaScript thread. Registering deferred work first records an intention; executing it later requires an appropriate scheduling boundary. The code following registration continues synchronously.

Consider three questions separately:

1. Has the present function returned?
2. Has the current queue finished its pending jobs?
3. Has the event loop progressed to another opportunity for I/O or timers?

These are different milestones. A Promise continuation can satisfy the first without satisfying the third. That distinction explains why a program containing many `await` expressions can still monopolize execution.

**Queue** means an ordered collection of eligible jobs governed by a particular scheduler. **Checkpoint** means an opportunity to process such jobs. **Phase** means part of event-loop coordination, introduced in Chapter 03. **Yielding** needs a destination: yielding to the microtask queue differs from yielding until an immediate callback. None means the same JavaScript work became parallel.

Draw a partial order instead of forcing unrelated events into one list. Registration precedes execution; synchronous completion precedes the continuation. Add edges only when the API and context justify them. An observed timestamp is evidence about one run, not a new edge in the public contract.

## 3. Scheduling mechanisms and the questions they answer

| Mechanism | Useful interpretation | Main caution |
|---|---|---|
| Direct function call | Run during the current synchronous operation | Can block or reenter the caller before it finishes bookkeeping. |
| `process.nextTick` | Node-specific deferral using its next-tick queue | Not a loop phase; recursive use can obstruct progress. |
| `queueMicrotask` | Defer a callback through the microtask queue | Draining more microtasks is not an I/O yield. |
| `Promise.then` / `await` | Continue according to Promise settlement | Creates/propagates Promise outcomes; a settled Promise is not a timer. |
| `setImmediate` | Arrange a check-phase callback | Does not interrupt the current callback. |
| `setTimeout` | Arrange future timer eligibility | Not an exact deadline or a preemptive cancellation mechanism. |
| `setInterval` | Arrange repeated callback opportunities | Does not await an async callback's returned Promise. |

For ordinary user-facing deferral, the official [process documentation](https://github.com/nodejs/node/blob/main/doc/api/process.md) favors `queueMicrotask` unless nextTick's particular capabilities are needed. When maintaining an existing callback contract, first establish what callers rely on; changing queue choice can change observable order.

There is no universal best queue. A microtask may be suitable for delivering a callback after the current call returns. A bounded CPU batch that should let other work progress needs a different boundary. A future retry requires time and product policy, not merely a different spelling of deferral.

## 4. Example A — compare CJS and ESM entry contexts

Save the following identical content as `entry.cjs` and `entry.mjs`. The explicit extensions make entry context visible without depending on a nearby package file.

```javascript
console.log('sync-start');
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));
console.log('sync-end');
```

Invoke each as an independent Node process. In the ordinary CommonJS entry case, expect sync-start → sync-end → nextTick → promise → microtask. In the ordinary ES-module entry case, expect sync-start → sync-end → promise → microtask → nextTick. Promise and queueMicrotask work are registered in that order in both cases.

The [documented comparison](https://github.com/nodejs/node/blob/main/doc/api/process.md) explains ESM evaluation's existing microtask context. The language syntax alone is not the explanation: this fixture contains no `import` or `export`, but `.mjs` still supplies that context. Do not extend an entry-context result into a claim about every callback later invoked by that module.

This is a counterexample to the blanket statement “nextTick always comes first.” Equally, ESM entry order does not mean nextTick is permanently behind every Promise in the process. Identify where the scheduling call happens. A test runner, dynamic import, REPL or wrapper may change that context; record how the fixture was launched.

## 5. Example B — nested scheduling inside an I/O callback

Save as `nested-io.mjs`. Reading this fixture's own file creates a real asynchronous callback without requiring a server or an external service.

```javascript
import { readFile } from 'node:fs';

readFile(new URL(import.meta.url), (error) => {
  if (error) {
    console.error('read-failed', error.code);
    process.exitCode = 1;
    return;
  }
  console.log('io');
  process.nextTick(() => console.log('tick-1'));
  Promise.resolve().then(() => {
    console.log('promise-1');
    process.nextTick(() => console.log('tick-from-promise'));
    queueMicrotask(() => console.log('micro-from-promise'));
  });
  queueMicrotask(() => console.log('micro-1'));
  setImmediate(() => console.log('immediate'));
});
```

For this isolated callback context, trace io → tick-1 → promise-1 → micro-1 → micro-from-promise → tick-from-promise → immediate. The microtask registered while another microtask runs is appended to that microtask work. Scheduling a nextTick from there does not interrupt the active microtask drain. A later check-phase opportunity follows this bounded queue work.

Explain the registration events before predicting execution. At the end of the I/O callback, the initial tick and two microtasks are pending. The Promise handler later adds two more jobs to different queues. Their names tell us who registered them; those names do not themselves determine priority.

This fixture also counters “an ESM file always has ESM entry ordering.” It is an ESM file, but the relevant scheduling calls occur in a later I/O callback. The result is scoped to that context, the finite jobs shown and the verified runtime; it does not order other ready resources or hidden jobs in a larger application.

## 6. Timer delay, immediates and partial ordering

Timers become eligible rather than reserving an execution instant. Delayed observation may include JavaScript obstruction and other runtime work. Registering a timer is therefore insufficient evidence that a business deadline will be enforced on time.

The [timer contract](https://nodejs.org/api/timers.html) makes delays below 1 ms, above 2,147,483,647 ms or NaN use 1 ms; fractional delays are truncated. Validate a product's numeric input before passing it to a scheduling API. A huge value accidentally producing a short timer is a boundary failure, not successful long-term scheduling.

Do not use a top-level timeout-versus-immediate race as a general priority rule. Chapter 03 demonstrates the more specific I/O-callback relationship. Within a batch of immediates, registration order matters, and an immediate registered during an immediate callback waits for another iteration. Microtask/tick work can still occur between callback boundaries. “Same phase” does not mean one uninterrupted user-code transaction.

Use monotonic elapsed-time measurements for local duration experiments, identify the registration and observation points, and report variation. Console logging can perturb execution. A test should check a relationship relevant to correctness rather than demanding a brittle exact millisecond value.

Neither zero delay nor a shorter delay promises higher business priority. If two operations have different policy importance, represent that in the product and its processing rules; queue folklore is not a substitute.

## 7. Example C — bounded queue draining versus a loop yield

A callback that continually schedules another microtask can keep the queue occupied. Repeated nextTick deferral has a similar starvation risk. Demonstrate the mechanism with a finite experiment; never run an unbounded starvation loop on a shared process.

Save as `batching.mjs`. The arithmetic stands in for a small unit of synchronous work. A real batching design must also consider the cost of each unit, not just the number of units.

```javascript
const mode = process.argv[2];
if (!['micro', 'tick', 'yield'].includes(mode)) {
  throw new Error('mode must be micro, tick or yield');
}
let count = 0;
let checksum = 0;
setImmediate(() => console.log('observer', count));

function step() {
  checksum = (checksum + count) % 1000003;
  count += 1;
  if (count === 5000) {
    console.log('done', count, checksum);
    return;
  }
  if (mode === 'micro') queueMicrotask(step);
  else if (mode === 'tick') process.nextTick(step);
  else setImmediate(step);
}
step();
```

In micro and tick modes, the finite chain reaches done before the immediate observer, which sees 5000. In yield mode, the already registered observer sees count 1, before the chain completes. All modes finish the same arithmetic. The experiment checks an opportunity for another callback, not a throughput benchmark or a guarantee of fairness for every client.

Replacing the recursive scheduling with `await Promise.resolve()` would still rely on microtask continuations; it does not create the immediate boundary demonstrated here. In contrast, awaiting the Promise-based immediate API can supply that boundary. In either case, synchronous work between boundaries remains on the same JavaScript thread.

Use bounded batches when cooperation is sufficient. A single expensive work unit still prevents progress during that unit. Worker offload changes execution boundaries and ownership; that is Chapter 11, not an automatic conclusion from this experiment. Extra scheduling also has overhead, so choose batch sizes with evidence and the intended responsiveness goal.

## 8. Repetition, drift and asynchronous overlap

An async callback starts synchronously and returns a Promise when it suspends. `setInterval` does not treat that Promise as an instruction to wait. Multiple invocations can therefore have outstanding asynchronous effects even though their JavaScript callbacks do not execute simultaneously on the same thread.

For a task that should wait for completion before deciding whether to schedule another attempt, an educational pattern is: start one attempt, await its outcome, check a stopping condition, then schedule the next attempt. Choose whether the desired interval is measured from start or finish. Those yield different behavior after slow work. Record failures rather than interpreting lack of a success log as successful cancellation.

That pattern is not a ready-made production scheduler. Retries, overlap allowance, persistence, missed runs and deadline interpretation depend on the product. A process restart loses ordinary in-memory timers. Local timer callbacks cannot establish cross-process exactly-once behavior or durable scheduling.

## 9. Example D — cancellation and timer ownership

Save as `cancel.mjs`. It covers both a callback timer handle and a Promise-based timer with an abort signal, with no forced exit.

```javascript
import { setTimeout as sleep } from 'node:timers/promises';

const handle = setTimeout(() => console.log('unexpected-callback'), 1000);
clearTimeout(handle);
console.log('callback-timer-cleared');

const controller = new AbortController();
const pending = sleep(1000, 'value', { signal: controller.signal });
controller.abort();
try {
  await pending;
  throw new Error('timer unexpectedly fulfilled');
} catch (error) {
  if (error.name !== 'AbortError') throw error;
  console.log('promise-timer-aborted', error.name);
}
console.log('done');
```

Expected: callback-timer-cleared → promise-timer-aborted AbortError → done, normal exit, no unexpected-callback. Cancellation addresses scheduled work; it does not undo an effect whose callback already began. Aborting this sleep also says nothing about cancelling a separately submitted database or filesystem operation. [Timer cancellation documentation](https://github.com/nodejs/node/blob/main/doc/api/timers.md) defines the supported handles and Promise rejection behavior.

Ownership questions make cleanup concrete: who retains the handle, who decides to clear it, and which outcome should callers observe? Dropping a variable does not reliably express cancellation. `unref` changes the resource's requirement to keep the process alive; it does not cancel it. Chapter 03's isolated ref/unref fixture demonstrates this distinction. Pending Promise existence alone is not a process-liveness guarantee.

## 10. Example E — error outcome differs by API

Save as `errors.mjs` and invoke each mode in a separate child process. The throw is intentional; this educational fixture does not install a handler that resumes normal operation after an uncaught exception.

```javascript
const mode = process.argv[2];
function fail() { throw new Error('scheduled-failure'); }
if (mode === 'promise') {
  Promise.resolve().then(fail).catch((error) => {
    console.log('caught-rejection', error.message);
  });
} else if (mode === 'micro') {
  queueMicrotask(fail);
} else if (mode === 'tick') {
  process.nextTick(fail);
} else {
  throw new Error('mode must be promise, micro or tick');
}
```

The Promise handler's throw becomes a rejection that the following catch handles. A throw from queueMicrotask or nextTick is an uncaught exception in this fixture, with a nonzero process outcome. [Global callback documentation](https://nodejs.org/api/globals.html#queuemicrotaskcallback) describes queueMicrotask's exception path; the [process reference](https://github.com/nodejs/node/blob/main/doc/api/process.md) covers nextTick and failure events.

These APIs are not interchangeable merely because each defers a function. Replacing one with another can change the failure channel callers need to handle. An outer try/catch around registration cannot catch a throw that occurs after that registration call has returned. Handle expected errors at the correct asynchronous boundary and preserve the intended failure outcome. Comprehensive fatal-error policy remains Chapter 16.

## 11. Backend diagnosis and common mistakes

Imagine a request handler that loops over cached records and awaits a resolved Promise between records. Other requests still experience long waits. The presence of `await` is weak evidence of event-loop cooperation: inspect the awaited operation, the amount of synchronous work and the frequency of opportunities for I/O.

Compare a controlled bounded-batch experiment with the original while keeping data shape and instrumentation comparable. Improved callback progress supports a scheduling explanation; it does not prove that every production delay comes from the same cause. Separate CPU cost, native waiting and queue draining with appropriate observations. Chapter 17 introduces stronger diagnostic evidence.

| Mistake | Correction |
|---|---|
| nextTick means the next event-loop iteration | It names a separate deferral queue. |
| ESM entry output orders all ESM callbacks | Identify the actual callback context. |
| All deferred work belongs to one FIFO | Use queue-specific registration and boundary evidence. |
| await always lets I/O progress | Settled-Promise continuations can keep microtask work occupied. |
| setImmediate interrupts long synchronous work | It needs a later execution opportunity. |
| A repeating async callback cannot overlap effects | Its Promise is not implicitly awaited by interval scheduling. |
| Cancelling a timer stops every operation it relates to | Separate timer ownership from effect cancellation. |
| unref cancels work | It changes liveness; the callback may still execute. |
| A scheduled throw behaves like a caught rejection | Identify the error channel for the chosen API. |

## 12. Future-study exercises and answer rubric

1. Predict Example A in both entry contexts and name the assumption that changes. **Rubric:** preserve synchronous order and Promise registration order; explain ESM evaluation context without a universal priority slogan.
2. In Example B, why does the tick created inside a Promise not interrupt the pending microtask work? **Rubric:** registration is not preemption; reconstruct which drain is active.
3. Replace Example C's microtask scheduling with resolved-Promise await. Is that sufficient to reproduce yield mode? **Answer:** no; it still schedules microtask continuation rather than the demonstrated immediate opportunity.
4. Design a bounded experiment for a costly batch. **Rubric:** record per-unit cost, another callback's progress, total work, environment and limits; do not demand exact timings.
5. Explain the possible overlap of a 20 ms interval whose async operation takes 80 ms. **Rubric:** separate serialized JS execution from multiple outstanding effects; avoid predicting an exact count under all loads.
6. Can Example D cancel a remote operation that already started? **Answer:** no such evidence or API contract is present; timer abort and remote effect are different boundaries.
7. Why does an outer try/catch around queueMicrotask registration fail to catch its later throw? **Rubric:** the synchronous stack has returned; name the asynchronous error path.
8. May a queue change silently alter an approved project's cancellation or retry guarantees? **Answer:** no; observable product behavior stays authoritative and consequential changes require learner approval.

No learner answers or grades are recorded. These exercises are ready for a separately initiated study phase.

## 13. Execution evidence and quality review

**Checked on 2026-10-12:** official process/timers/global documentation through Context7 `/nodejs/node`, with current official API pages consulted for timer boundaries. Broad queue snippets were qualified against the explicit CJS/ESM entry comparison. No unpinned internal source code is used to claim universal scheduling.

**Executed environment:** Node `v26.4.0`, V8 `14.6.202.34-node.21`, libuv `1.52.1`; `darwin/arm64`, Darwin kernel `25.1.0`. Independent child processes; explicit `.cjs`/`.mjs` entries; no test-runner queue wrapper. Documentation pages and local runtime are separate evidence; the execution version is not a mandated project runtime or a latest-release claim.

| Fixture | Executed scenarios and observed outcome |
|---|---|
| A — entry queues | Two independent entries: CJS observed sync-start → sync-end → nextTick → promise → microtask; ESM observed sync-start → sync-end → promise → microtask → nextTick. |
| B — nested I/O callback | Three independent runs observed io → tick-1 → promise-1 → micro-1 → micro-from-promise → tick-from-promise → immediate. |
| C — bounded scheduling | Three modes passed: micro/tick observer saw 5000 after done; yield observer saw 1 before done. All produced checksum 497464. |
| D — timer cancellation | Cleared callback timer never ran; aborted Promise timer reported AbortError; normal exit. |
| E — error channels | Three modes passed: caught Promise rejection exited 0; isolated microtask and nextTick exceptions each exited 1 with scheduled-failure. |

Twelve execution scenarios checked relationships, termination and error outcomes, with bounded process timeouts. These are local educational fixtures, not learner competence, implemented-product evidence, scheduler latency guarantees or cross-platform verification.

| Coverage criterion | Evidence and limit |
|---|---|
| First principles | Stack completion, queue draining, checkpoints and partial order. |
| Context-aware ordering | Entry comparison and later I/O callback with nested registrations. |
| Progress and starvation | Finite recursive chains versus an immediate boundary. |
| Timer lifecycle | Eligibility, delay boundaries, cancellation, ref/unref and repeated async work. |
| Failure paths | Expected AbortError and deliberately uncaught callback exceptions. |
| Backend application | Bounded diagnosis; no architecture or product policy prescribed. |
| Exercises | Eight future-study questions with answer criteria; assessment deferred. |
| Honest gaps | No fairness/throughput proof, durable scheduler, fatal-error recovery or source-internal audit. |

**Review outcome:** author quality-gate review completed; Chapter 04 submitted for learner editorial review. Next: learner approves or revises this chapter before Chapter 05 — EventEmitter and Callback Contracts — is authored.
