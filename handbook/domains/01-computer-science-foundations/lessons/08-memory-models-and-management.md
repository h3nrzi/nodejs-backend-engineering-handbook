# Chapter 08 — Memory Models and Management

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, awaiting learner review  
**Prerequisites:** Chapters 01, 02, 06 and 07

## Outcomes

Explain address spaces, stack frames, heap allocation, object reachability, garbage collection, fragmentation, paging and memory pressure; distinguish leaks from necessary retention; estimate peak and retained memory; diagnose backend memory symptoms; and formulate memory-related product acceptance criteria without prescribing implementation.

## 1. Memory is several layers, not one number

A program works with virtual addresses. The OS and hardware map these to pages of physical memory subject to permissions. A process's address space can include executable code, stacks, dynamically allocated regions, mapped files and native runtime allocations.

A **stack** typically holds execution frames, return information and local bookkeeping. A **heap** is a region or abstraction for dynamically allocated values whose lifetimes need not match one call frame. These terms are models, not a promise of precise placement for each JavaScript variable: engines may store, inline or optimize values in several ways.

**RSS** is resident process memory, **JavaScript heap used** describes managed objects, **external memory** may include backing stores for buffers, and **OS page cache** caches file data. These numbers measure different things and must not be blindly added.

## 2. Stack frames and recursion

Every active call needs enough execution state to resume. A recursive function can consume O(depth) stack space, even when its mathematical algorithm creates no explicit array.

```ts
function sumRecursive(a: readonly number[], i = 0): number {
  if (i === a.length) return 0;
  return a[i] + sumRecursive(a, i + 1);
}
```

For n elements the mathematical work is Θ(n), and the recursive call depth is Θ(n). Deep recursion can throw a stack overflow; JavaScript implementations do not guarantee elimination of such frames in ordinary Node.js execution. Under the assumption of safe finite numbers, an iterative alternative can use a fixed number of local scalar variables:

```ts
function sumIterative(a: readonly number[]): number {
  let total = 0;
  for (const value of a) total += value;
  return total;
}
```

Neither example handles arbitrary-precision totals. Input validation and numeric precision are separate correctness questions.

## 3. Allocation, object lifetime and reachability

Allocation gives an operation a place to retain values. An object becomes **reachable** if the runtime can access it through roots such as active execution references and other reachable objects. Garbage collectors can reclaim managed objects that are no longer reachable, but reachability does **not** mean an object remains useful.

```ts
const cache = new Map<string, Uint8Array>();
function retain(key: string, bytes: Uint8Array): void {
  cache.set(key, bytes);
}
```

As long as the map stays reachable, its entries can remain reachable. If incoming keys are unbounded and no eviction or retention rule exists, memory can grow without a classic lost-pointer bug. **Unbounded useful-looking retention is still a possible memory leak relative to product intent.**

Distinguish **liveness** of a reference from actual business necessity. Questions: Who owns this memory? When is it no longer needed? How is cancellation handled? Which observations show release?

## 4. Garbage collection: mental model

A tracing garbage collector typically starts from roots, marks reachable objects and can reclaim unreachable objects. Implementations can use generations, incremental/concurrent phases, compaction and other techniques. V8 specifics are covered more deeply in Domain 03 and can change by version.

**Generational hypothesis:** many objects die young, so engines may optimize collection accordingly. This is a heuristic, not a guarantee that every short-lived allocation is inexpensive.

**Stop-the-world pauses** suspend some application execution while necessary GC phases run. Modern collectors may move other work concurrently or incrementally; observed pauses depend on workload, heap state, runtime and platform.

Reference counting, tracing GC and manual allocation are different memory-management strategies. Cycles are a classic problem for naïve reference counting; tracing collectors can reclaim unreachable cycles.

**Visual question:** Why can a cache retain unused bytes while a separate cycle is collectible?

![A runtime root reaches a cache, which strongly references a small view, which retains a large backing buffer. Separately, objects X and Y reference each other but have no root path. The rooted chain stays reachable; the isolated cycle is eligible for tracing collection.](../assets/08-memory-models-and-management/reachability-and-cycles.svg)

**Figure 1 — Reachability determines collection eligibility.** Arrows are strong references, not copies or a physical memory layout. A rooted cache entry can keep a small view and its larger backing allocation alive. X↔Y has no root path and is eligible for tracing collection despite its cycle. Removing the cache entry releases this path only; any other reference can still retain the allocation. Collection timing, allocator reuse and return of resident memory to the OS are separate matters. Weak references and collector internals are omitted. [Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management).

[Full-size SVG](../assets/08-memory-models-and-management/reachability-and-cycles.svg) · [Editable Mermaid source](../assets/08-memory-models-and-management/reachability-and-cycles.mmd)

## 5. Fragmentation and allocation pressure

**Internal fragmentation:** allocated blocks contain unused space. **External fragmentation:** free space is split into chunks that may not satisfy a larger contiguous request. Compaction, allocation classes and paging can change the consequences.

Frequent short-lived allocations can increase GC activity; large retained graphs increase tracing work. But a rising heap graph alone does not prove a leak: a runtime may legitimately grow its heap and later reuse memory.

Three useful metrics answer different questions:
- **Allocated bytes per operation:** how much churn occurs?
- **Retained bytes after collections:** what remains reachable?
- **Peak memory during a workload:** what resource budget is required?

## 6. Buffers, copies and ownership

Backend programs may handle byte buffers, strings, decoded JSON objects, file chunks and response data simultaneously. Copies can multiply peak memory.

Suppose an input file of size S is read fully, decoded to text and transformed to an output buffer. Peak memory may exceed S by a substantial factor depending on encoding, object representation, intermediate results and GC timing. It is **not** correct to assert a universal 2S or 3S bound without measuring.

```ts
import { readFile } from "node:fs/promises";

async function loadBytes(path: string): Promise<Buffer> {
  return readFile(path);
}
```

This returns a buffer whose size grows with file input, so supported file-size limits matter. Reading via a buffered API is not universally wrong; it is appropriate when input sizes and resource budgets justify it. Selecting chunking or streaming for a real project is a later Codex design choice, not a PRD mandate.

**Aliasing:** two references can point to the same mutable buffer. Modifying one view may affect another. A view into a backing buffer may keep the entire underlying allocation alive even when the view is small. Analyze ownership and lifetimes.

## 7. Virtual memory and paging

Virtual pages are mapped with permissions and may be resident, shared, file-backed or not currently present. A page fault requires OS intervention; **minor** faults need not read from disk, while **major** faults often involve storage I/O.

Memory pressure may cause reclamation, swapping or termination depending on system configuration. Page-table and TLB behavior also affect performance. These mechanisms explain why a process can slow dramatically before exhausting every byte of reported memory.

A server's memory budget must account for concurrency: if one request temporarily retains approximately B bytes and up to C requests overlap, temporary memory may scale on the order of C×B plus baseline memory. Exact peaks depend on timing and shared data; this is a planning model, not a guaranteed measurement.

## 8. Detecting leaks versus expected growth

A disciplined investigation:

1. Reproduce the same workload at multiple durations and sizes.
2. Measure process RSS, JS heap, external memory and request concurrency.
3. Observe a baseline after warm-up and periods of quiescence.
4. Compare retained object graphs/heap snapshots, allocation trends and GC activity.
5. Identify references responsible for retention.
6. Change one hypothesis and verify correctness and memory behavior again.

```ts
const m = process.memoryUsage();
console.log({
  rss: m.rss,
  heapUsed: m.heapUsed,
  heapTotal: m.heapTotal,
  external: m.external,
  arrayBuffers: m.arrayBuffers,
});
```

These figures are bytes at one point in time. Some categories overlap (for example, `arrayBuffers` is included in `external` in Node.js accounting), so do not add them as independent totals. GC timing and allocator behavior influence readings.

**Warning:** do not use explicit forced garbage collection in production merely to make charts look smaller. Controlled GC can be useful during a carefully designed experiment where the flags and environment are documented, but it changes the observation.

## 9. Common leak patterns

- Global maps retaining every request or identity forever.
- Timers, event listeners and callbacks never cleaned up after lifecycles end.
- Queues that accumulate faster than consumers finish.
- Closures retaining large objects beyond necessity.
- Long-lived views keeping a large backing buffer reachable.
- Failed/cancelled operations that never release resources.
- Repeated snapshots, arrays or debug data saved without a bound.

Not every long-lived cache is a leak. Requirements should state retention, capacity and expiration expectations; implementation strategy belongs to Codex.

### Educational leak demonstration

```ts
const history: Uint8Array[] = [];

function record(bytes: Uint8Array): void {
  history.push(bytes);
}
```

A process calling `record` indefinitely accumulates references. If those records should be retained for only a limited period or count, the growth violates the intended retention policy. This snippet deliberately omits management to show the source of retention.

## 10. Backend memory requirements versus design decisions

A product PRD may say:
- For inputs within a defined size range, processing must stay within a measurable memory budget under a defined concurrency level.
- Invalid/oversized inputs must receive explicit failure outcomes rather than incomplete success reports.
- Cancelled jobs must not retain indefinitely the resources associated exclusively with that job.
- Reports must preserve data integrity and provide deterministic observable results.

A PRD must **not** require a specific GC tuning flag, buffer pool, stream implementation, cache provider, memory allocator or worker architecture. Those are implementation candidates for Codex to investigate using Matt Pocock skills.

## 11. Worked case: growing queue memory

A producer emits 500 tasks/sec, while the consumer finishes 400 tasks/sec. After 60 seconds, approximately 6,000 more tasks remain queued if rates are steady and none are rejected. If each retained task record requires an illustrative 2 KiB, the additional retained payload is about 12,000 KiB, excluding array/object overhead and backing allocations.

The problem is *sustained mismatch between arrival and processing capacity*, not necessarily a defective garbage collector. Valid product behavior must define admission, overload, retry and eventual outcomes.

## 12. Common misconceptions

1. "A garbage-collected language cannot leak memory."
2. "Every growing RSS graph proves a JS heap leak."
3. "Freeing a JS object immediately returns memory to the OS."
4. "The stack holds all local variables and the heap holds all objects in a literal engine-independent way."
5. "Allocations that quickly die are always free."
6. "A small slice guarantees its backing allocation is released."
7. "Low heapUsed means no memory pressure."
8. "Reading a complete file is always wrong."
9. "Calling global.gc solves a leak."
10. "Memory usage is a single number that can be inferred from file size."

## 13. Exercises

1. Distinguish call-stack space from dynamically allocated object retention.
2. Compare recursive and iterative summing for a million entries.
3. Can a reachable object be a leak? Give a realistic example.
4. Explain tracing GC and why unreachable cycles can be reclaimed.
5. Distinguish internal from external fragmentation.
6. A job allocates a large temporary buffer; what is the difference between peak and retained memory?
7. Why might a buffer view keep a larger allocation alive?
8. Explain why RSS, heapUsed and external are not disjoint additive components.
9. What measurements would distinguish warm-up heap expansion from an ongoing leak?
10. A queue gains 100 jobs/sec for two minutes. How many additional jobs remain if conditions persist?
11. Under what assumptions can concurrent requests scale temporary memory approximately as C×B?
12. List three possible memory symptoms unrelated to a JS heap leak.
13. Write an observable memory constraint suitable for a PRD without prescribing a technique.
14. Explain why a controlled benchmark should record GC and Node.js version.
15. A cache retains 10 million keys, all still reachable. Does GC have permission to remove them? Why?

### Answer rubric

1. Stack models active execution frames; heap describes dynamic allocations/lifetimes; JS representation is engine-dependent.
2. Both perform linear work under unit-cost arithmetic; recursion can exhaust call stack, iteration uses constant frame depth.
3. Yes: a global map unintentionally retaining expired sessions.
4. Mark from roots; unmarked unreachable cycles can be collected.
5. Internal waste lies inside allocations; external waste lies between allocations.
6. Peak is maximum simultaneous usage; retained usage persists after the operation.
7. View references backing storage; reachability can extend its lifetime.
8. Metrics measure overlapping or differently scoped memory classes.
9. Compare retained baselines after repeated equivalent work, heap snapshots and allocation rates.
10. 12,000 jobs.
11. Comparable request-local buffers, overlapping lifetimes and little sharing; actual peak varies.
12. Native buffers, mapped files, allocator fragmentation, thread stacks or OS page cache.
13. Define workload/concurrency, numeric memory ceiling, error behavior and measurement environment.
14. Collector/runtime behavior affects both latency and memory measurements.
15. No; tracing collectors generally retain reachable objects regardless of business utility.

## Mastery checkpoint

You should be able to sketch a reachability chain, explain why GC doesn't eliminate all leaks, distinguish peak/retained memory, identify where OS paging matters, and formulate a bounded-memory requirement without choosing how to satisfy it.

References:
- *Operating Systems: Three Easy Pieces*: https://pages.cs.wisc.edu/~remzi/OSTEP/
- Node.js process memory usage: https://nodejs.org/api/process.html#processmemoryusage
- V8 memory overview: https://v8.dev/blog/trash-talk
- MDN memory management: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management

**Coverage:** stack/heap ✓; virtual memory ✓; allocation/reachability ✓; GC ✓; fragmentation ✓; buffers ✓; paging ✓; leak investigation ✓; capacity model ✓; exercises ✓. Pending learner review and independently executed tests. Next: Chapter 09 — File Systems and I/O.
