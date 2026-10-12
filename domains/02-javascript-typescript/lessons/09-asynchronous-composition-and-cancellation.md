# Chapter 09 — Asynchronous Composition and Cancellation

**Domain:** D02 — JavaScript & TypeScript
**Status:** approved_by_learner
**Study assessments:** deferred
**Examples:** educational, not independently executed

## Objectives
Understand independent versus dependent async work, Promise combinators, bounded concurrency, AbortSignal, time budgets, retries, outcome uncertainty and cleanup. This chapter describes language and user-visible behavior rather than prescribing a system architecture.

## 1. Dependency ordering
Sequential tasks must await prerequisites; independent tasks can be started together.

~~~js
async function dependent(readId, readUser) {
  const id = await readId();
  return readUser(id);
}
async function independent(a, b) {
  return Promise.all([a(), b()]);
}
~~~

Concurrent work need not be CPU parallelism.

## 2. Choosing a combinator
- Promise.all requires every fulfillment, rejects after an observed member rejection, but does not cancel siblings.
- Promise.allSettled waits for each settlement and reports status.
- Promise.any returns first fulfillment or AggregateError if all reject.
- Promise.race follows whichever member first settles.

Input ordering is retained by all/allSettled results, regardless of completion ordering. Combinator settlement does not imply other effects stopped.

## 3. Bounded fan-out
Unbounded launches can exhaust sockets, memory and external service quotas. A limited worker pool provides an illustrative technique:

~~~js
async function mapWithLimit(items, limit, worker) {
  if (!Number.isSafeInteger(limit) || limit < 1) throw new RangeError("limit");
  const results = new Array(items.length);
  let cursor = 0;
  async function consume() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume));
  return results;
}
~~~

On failure, siblings may continue. A production contract needs explicit cancellation, partial-result and cleanup policies; this illustrative function is not a durable job scheduler.

## 4. Cooperative cancellation
AbortController creates an AbortSignal that participating operations may observe. Calling abort does not guarantee external effects are undone.

~~~js
async function step(signal, operation) {
  signal.throwIfAborted();
  const value = await operation(signal);
  signal.throwIfAborted();
  return value;
}
~~~

Signals may be composed via AbortSignal.any and timeout signals where supported. Runtime compatibility and listener cleanup matter.

## 5. Deadline and timeout
An overall deadline differs from repeatedly granting every nested operation a fresh timeout. Timer expiration reflects the caller's willingness to wait, not proof that a remote operation failed. Cancellation, confirmation and reconciliation are separate concepts.

## 6. Retry and uncertain outcome
Retries require a failure classification. A transport failure can hide a successful state-changing effect. Stable logical attempt identity and reconciliation avoid treating a repeated submission as a new action.

~~~ts
type Outcome<T> =
  | { kind: "confirmed"; value: T }
  | { kind: "rejected"; reason: string }
  | { kind: "uncertain"; attemptId: string };
~~~

Types do not validate external JSON. Backoff, maximum attempts and jitter are design choices to evaluate, not universal numbers.

## 7. Partial success policies
Distinguish fail-fast, collect-all, best-effort and stop-scheduling-new-work. Stopping future scheduling does not necessarily cancel active tasks. Completed effects cannot be assumed rolled back merely because an aggregate Promise rejects.

## 8. Cleanup and rejection observation
All started asynchronous branches need an observation strategy. Cleanup failures may coexist with primary errors and should be reported without erasing important context.

~~~js
async function reportAll(tasks) {
  return Promise.allSettled(tasks.map(task => task()));
}
~~~

This initiates all tasks immediately and is *not* concurrency limiting.

## 9. Async iteration and backpressure
A for-await loop can consume asynchronous values incrementally, but collecting every yielded value still risks memory growth. Breaking from such a loop invokes iterator cleanup protocols when available, not universal external resource rollback.

## 10. Backend scenario
An operator sends a batch of notifications. Product questions include partial delivery, cancellation, duplicate requests, retention of results, unknown outcomes and limits on concurrent activity. No infrastructure is selected by this example.

## 11. Misconceptions
Promise.all does not cancel siblings; abort is not rollback; timeout is not definitive business failure; async fan-out is not free; TypeScript result unions are not runtime validators; and partial success needs explicit semantics.

## 12. Exercises reserved for study
Compare all/allSettled/any/race; reason about failures during worker-pool processing; explain abort after confirmation; compare deadline versus timeout; design safe retry after response loss; and describe why collecting an entire async iterable defeats bounded memory.

**Answer guide:** aggregation rules differ; active work may continue; cancellation does not reverse past effects; nested timeouts can exceed total deadline; retry needs identity/reconciliation; accumulation retains all produced items.

## 13. References
- [ECMAScript Promises](https://tc39.es/ecma262/#sec-promise-objects)
- [MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [MDN AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [MDN for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

**Learner editorial approval:** 2026-10-12. Example execution not independently verified; learner assessment and implementation not started.
