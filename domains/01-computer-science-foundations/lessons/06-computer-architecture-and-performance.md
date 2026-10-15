# Chapter 06 — Computer Architecture and Performance

**Domain:** D01 Computer Science Foundations
**Status:** Draft — pending learner review
**Prerequisites:** Chapters 01–05

## Learning outcomes

Explain the machine execution pipeline, CPU cores and threads, registers, caches and memory, virtual addresses and paging, locality, bandwidth versus latency, CPU-bound versus I/O-bound workloads, scheduling and context switches, Amdahl's law and measurement methodology. Distinguish theoretical algorithm cost from measured application performance.

## 1. From TypeScript to machine execution

TypeScript code is typically transformed into JavaScript before execution. A JavaScript runtime such as Node.js runs that code through an engine; engines may interpret, compile, optimize and deoptimize instructions. One line of TypeScript does not correspond to one CPU instruction.

A CPU fetches, decodes and executes instructions. Modern CPUs use pipelines, branch prediction, out-of-order execution and multiple functional units. The simple fetch/decode/execute model is useful for orientation but not an exact description of every microarchitectural implementation.

Registers hold a small amount of immediately usable information. Caches hold recently or nearby accessed data and instructions. RAM holds larger working sets. Persistent storage holds files and databases across process lifetimes. Their performance characteristics differ, and exact latencies are hardware-dependent.

## 2. Memory hierarchy and locality

**Temporal locality** means reusing the same data soon. **Spatial locality** means accessing nearby addresses. CPUs fetch cache lines, so adjacent values can benefit from one transfer. Sequential scans may outperform pointer-based traversals even when both are Θ(n).

A cache miss requires fetching from a slower memory level. A translation lookaside buffer (TLB) caches virtual-to-physical address translations. Working sets larger than available caches and RAM can incur cache or page misses.

**False sharing** can arise when threads write distinct locations sharing a cache line. Coherence traffic may slow them despite no logical overlap. This applies only when genuinely shared memory is used; don't infer it from ordinary asynchronous application requests.

### Worked comparison

Scanning n packed numeric entries and traversing n linked objects both require Θ(n) visits. The linked representation may allocate more objects and incur less predictable memory access. Neither performance ranking is universal; measure representative runtime and data shapes.

## 3. CPU pipelines, branches and bandwidth

Pipelining overlaps stages of instructions. Branch prediction predicts which path execution will follow; prediction misses can waste work. SIMD can operate on several values together when supported by the architecture and executable code.

**Latency** is duration per operation. **Throughput** is operations completed per unit time. **Bandwidth** is the volume of data transferred per time. **IOPS** counts completed I/O operations per second. None alone describes complete end-user performance.

Amdahl's law estimates speedup when fraction p of original time becomes s times faster:

`Speedup = 1 / ((1-p) + p/s)`.

If p=0.8 and s=4, speedup is 2.5, not 4. The remaining 20% limits benefit. The equation abstracts changing overheads, contention and system behavior.

## 4. CPU-bound, memory-bound and I/O-bound

A **CPU-bound** task is primarily constrained by computation, a **memory-bound** task by memory access/bandwidth, and an **I/O-bound** task by waiting on disk or network. The same backend endpoint can pass through all three phases.

Consider an illustrative sequential request:
- parsing: 2 ms
- remote fetch: 40 ms
- computation: 8 ms
- serialization: 3 ms

Total: 53 ms. Cutting computation time in half saves 4 ms, making total 49 ms. This only holds when these times add sequentially; overlapping work and queues change the critical path.

**Visual question:** Why does halving computation save only four milliseconds in this request?

![The illustrative sequential request parses for two milliseconds, fetches for forty, computes for eight and serializes for three, totaling fifty-three. Halving only computation to four milliseconds reduces the total to forty-nine. All stages are sequential with no queueing or overlap.](../assets/06-computer-architecture-and-performance/sequential-critical-path.svg)

**Figure 1 — Optimize a stage, then recompute the whole path.** Follow the critical path of the lesson’s invented sequential request. Only the computation stage changes: 2+40+8+3=53 ms becomes 2+40+4+3=49 ms. Equal-size boxes do not represent equal durations. These are illustrative values, not benchmark results; there is no queueing, overlap, contention or changed overhead in this model. [Reference](https://www3.cs.stonybrook.edu/~rezaul/Spring-2019/CSE613/reading/Amdahl-1967.pdf).

[Full-size SVG](../assets/06-computer-architecture-and-performance/sequential-critical-path.svg) · [Editable Mermaid source](../assets/06-computer-architecture-and-performance/sequential-critical-path.mmd)

Concurrency means progress across overlapping tasks; parallelism means execution at the same time on separate resources. Asynchronous network waits can improve utilization but do not alone accelerate CPU-intensive computation.

## 5. Processes, threads, scheduling and context switches

A process has an operating-system-managed address space and resources. Threads within a process ordinarily share that address space but keep separate stacks and register state. The scheduler determines when runnable threads get CPU time.

Context switching preserves/restores execution state and may disrupt locality, but not every asynchronous operation causes a full process context switch. Too many CPU-intensive workers for available cores can increase scheduling overhead and contention. Too few workers can underutilize truly parallelizable work. Measure rather than guessing worker counts.

Preemptive scheduling permits the OS to interrupt execution. Cooperative scheduling relies on yielding at supported points. Responsiveness and fairness depend on both the scheduler and workload.

## 6. Virtual memory and operating-system caches

Virtual memory maps program virtual addresses to memory pages. The OS and hardware cooperate on translation, permissions and page management. A page fault signals that access needs OS attention; not every page fault reads from disk.

**RSS** is resident process memory; **JavaScript heap** is one part of runtime-managed memory; **page cache** is OS-managed caching for files. They are different accounting concepts. A Node.js process can consume external buffers and native memory beyond its JavaScript heap.

A working set exceeding available memory can produce severe performance degradation due to frequent memory reclamation or paging. Never treat high RSS as proof of a JavaScript heap leak without diagnostics.

## 7. Queueing and tail latency

For a stable system under Little's law assumptions, `L = λW`, where L is average work in system, λ is long-term average throughput and W is average time in system. At 100 requests per second and W=0.2 seconds, L=20.

When arrivals exceed sustainable processing over time, backlog can grow. Near saturation, queueing delays can dominate response time. A faster isolated function cannot automatically solve a service-capacity deficit.

Percentiles describe the latency distribution: p99 means roughly 99% of measured observations are at or below that threshold under the sample definition. An excellent mean can hide severe tail latency.

## 8. Measuring performance scientifically

Define an actual question, comparable workloads and correctness criteria before measuring.

1. Record operating system, processor, Node.js version and workload.
2. Verify equivalent outputs of compared implementations.
3. Warm up appropriately and collect repeated independent samples.
4. Record latency distributions, throughput, errors and memory.
5. Profile CPU, allocations, I/O and wait time when relevant.
6. Change one important factor, repeat and document uncertainty.

A synthetic microbenchmark is not a production SLO guarantee. Instrumentation itself may alter the system being measured.

### TypeScript timing illustration

```ts
import { performance } from "node:perf_hooks";

function durationMs(work: () => void): number {
  const start = performance.now();
  work();
  return performance.now() - start;
}

const values = Array.from({ length: 100_000 }, (_, i) => i);
const samples: number[] = [];
let checksum = 0;

for (let run = 0; run < 30; run++) {
  samples.push(durationMs(() => {
    for (const value of values) checksum += value;
  }));
}

samples.sort((a, b) => a - b);
console.log({
  medianMs: samples[Math.floor(samples.length / 2)],
  checksum,
});
```

This only demonstrates measurement mechanics. It does not isolate JIT optimization, GC, frequency scaling, environmental noise or input distributions. It also accumulates across runs, so a benchmark harness should specify desired state and check that the tested operations perform equivalent work.

## 9. Backend engineering case studies

**Large JSON reports:** parsing and encoding may become CPU/memory bottlenecks. Product requirements can demand bounded resources and clear failures but must not preselect streaming or workers.

**Remote provider latency:** if network waits dominate a request's critical path, optimizing small local loops likely yields modest end-to-end benefit.

**Parallel processing:** adding workers may help compute-bound workloads but can worsen contention or memory pressure. Benchmark representative task sizes.

**Data layout:** identical Big O analyses need not mean identical latency because allocations, branches and cache locality differ.

All of these are educational examples; Codex chooses architecture during implementation of approved product requirements.

## 10. Common misconceptions

- Node.js uses exactly one OS thread.
- More concurrency automatically means more CPU parallelism.
- Low mean latency implies low p99 latency.
- Big O predicts exact milliseconds.
- Every page fault means a disk access.
- Heap usage equals resident memory.
- Adding workers always improves throughput.
- A single benchmark run is reliable evidence.
- CPU usage alone proves the bottleneck.
- Fast algorithmic behavior guarantees correctness or resilience.

## 11. Exercises

1. Describe the relationship of TypeScript, JavaScript runtime and CPU instructions.
2. Give examples of temporal and spatial locality in a backend service.
3. Why can two Θ(n) traversals perform differently?
4. Compute Amdahl speedup for p=0.6, s=3.
5. Classify compression, remote file download and random memory traversals by likely bottleneck; note assumptions.
6. Explain how context switching can increase overhead.
7. Distinguish virtual memory, RSS, JS heap and page cache.
8. A stable service completes 150 requests/sec and mean response time is 0.1 sec. Compute L.
9. Why should a service monitor p95/p99, not just average latency?
10. Design a fair experiment for comparing sequential and shuffled accesses over equal data volumes.
11. If remote fetch is 90 ms and calculation 10 ms sequentially, what is the effect of halving the calculation?
12. State three measurable, externally observable requirements for a large-report service without prescribing implementation.

### Answers and rubric

1. TypeScript is commonly transpiled; the runtime executes JavaScript via engine/machine code.
2. Reusing the same metadata is temporal; scanning adjacent numeric records is spatial.
3. Memory locality, allocations, cache misses, branch behavior or GC.
4. `1/(0.4+0.6/3)=1.667` approximately.
5. Compression often CPU-bound, download I/O-bound, random traversal memory-bound; verify with profiling.
6. Saving/restoring state, scheduling and cache disruption have costs.
7. Virtual memory is address mapping; RSS resident pages; JS heap one runtime allocation area; page cache OS file-backed caching.
8. L=15 average requests.
9. Infrequent slow requests can harm users while barely shifting average.
10. Match item counts, outputs, environment, warm-up, repeated samples and measured statistics.
11. Sequential total drops from 100 to 95 ms: a 5% improvement.
12. Define supported input limits, completion/failure behavior and measurable performance under a stated workload.

## 12. Mastery checkpoint and references

You should be able to explain a plausible performance bottleneck, distinguish latency from throughput, calculate Amdahl and Little's law, and design a reproducible comparison without claiming universal hardware constants.

References:
- Bryant and O'Hallaron, *Computer Systems: A Programmer's Perspective*.
- Hennessy and Patterson, *Computer Architecture: A Quantitative Approach*.
- *Operating Systems: Three Easy Pieces*: https://pages.cs.wisc.edu/~remzi/OSTEP/
- Node.js performance hooks: https://nodejs.org/api/perf_hooks.html
- Linux proc filesystem: https://docs.kernel.org/filesystems/proc.html

**Coverage audit:** runtime-to-machine ✓; CPU/cache/RAM ✓; locality ✓; bandwidth/latency ✓; CPU/memory/I/O bounds ✓; context switches ✓; virtual memory ✓; queueing ✓; Amdahl ✓; experiments ✓; exercises ✓. Pending: learner review and independent example execution. Next: Chapter 07 — Operating Systems and Scheduling.
