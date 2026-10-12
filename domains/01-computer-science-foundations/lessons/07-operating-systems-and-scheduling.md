# Chapter 07 — Operating Systems and Scheduling

**Domain:** D01 Computer Science Foundations  
**Status:** draft, awaiting learner review  
**Prerequisites:** Chapters 01–06.

## Outcomes

Explain kernel/user mode, syscalls, process/thread lifecycle, scheduling algorithms, preemption, starvation, blocking versus nonblocking I/O, resource limits, signals and graceful shutdown. Diagnose common backend bottlenecks without preselecting implementation architecture.

## 1. Operating system fundamentals

An operating system provides protected access to CPU, memory, files, devices and networking. Programs normally execute in **user mode**; privileged operations run in **kernel mode**. A **system call** requests an OS operation, such as opening a file or creating a process. A JavaScript function or `await` expression isn't necessarily a syscall; runtime APIs may perform many operations internally.

A **program** is executable instructions. A **process** is a running instance with a virtual address space and resources. A **thread** is a schedulable execution context, with its own stack and registers, that typically shares process memory with sibling threads. Processes can communicate through pipes, sockets or shared memory.

Node.js executes ordinary JS callbacks on an event-loop thread per process, while the runtime can use other OS threads. Domain 03 studies these details.

## 2. Process and thread lifecycle

An educational state model is:

```text
created → ready → running → terminated
             ↑      |
             +-- waiting (I/O or synchronization)
```

A waiting operation becomes runnable upon completion, then the scheduler may run it. Operating systems implement additional states and schedule threads differently; this diagram isn't a specification for all kernels.

**Context switching** saves/restores execution state. It can cost CPU work and disrupt caches. A syscall or asynchronous operation does not always require a full process switch.

## 3. CPU scheduling

| Policy | Basic rule | Limitation |
|---|---|---|
| First-come first-served | Run jobs in arrival order | Convoy effect |
| Shortest job first | Prefer shortest known duration | Duration uncertainty and fairness |
| Round robin | Rotate with time slices | Switching overhead |
| Priority | Prefer high-priority jobs | Starvation |
| Multilevel feedback queue | Adapt priorities with behavior | More complex policy |

Example: jobs A, B and C arrive at time zero needing 8, 4 and 1 CPU units, with no overhead. FCFS A→B→C has completion times 8,12,13, average 11. SJF C→B→A yields 1,5,13, average 19/3. This does not make SJF automatically appropriate for a real backend.

**Response time** means first run minus arrival; **turnaround** means completion minus arrival; **waiting** is time spent ready but not executing. State definitions explicitly when measuring.

## 4. Preemption, starvation and fairness

**Preemption** allows the scheduler to interrupt work. **Cooperative yielding** requires a running task to yield at supported points. **Starvation** means ready work can remain unserved indefinitely. Priorities can cause starvation; aging is one possible remedy. **Priority inversion** occurs when a high-priority task waits for a resource held by a lower-priority one.

Fairness is not an implementation detail until its meaning is specified: equal service, bounded waiting, priority weighting and deadlines are different product behaviors.

## 5. Blocking, nonblocking and asynchronous I/O

Blocking calls delay caller progress. Nonblocking calls can return when work isn't ready. Asynchronous APIs deliver an eventual result through a callback, completion or promise. These are related but not interchangeable.

```ts
import { readFile } from "node:fs/promises";

async function readConfig(path: string): Promise<string> {
  return readFile(path, "utf8");
}
```

Awaiting this call suspends the async function's continuation, not necessarily every underlying OS thread. A CPU-heavy loop can still delay responsiveness even if it appears inside an async function.

## 6. File descriptors and resource ownership

OS file descriptors or handles refer to files, sockets and other open resources. Unclosed descriptors can cause resource exhaustion. Use guaranteed cleanup where possible:

```ts
import { open } from "node:fs/promises";

async function firstBytes(path: string): Promise<Buffer> {
  const file = await open(path, "r");
  try {
    const buffer = Buffer.alloc(16);
    const { bytesRead } = await file.read(buffer, 0, 16, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await file.close();
  }
}
```

This demonstrates release, **not** validation or authorization for externally supplied paths. Resource limits and overload require product-level outcomes, such as clear rejection or eventual completion, but do not imply any architecture.

## 7. Signals and shutdown

On Unix-like systems, SIGTERM normally requests termination and may be handled; SIGKILL cannot be caught. Platform behavior differs. A signal handler that only logs isn't graceful shutdown.

```ts
let stopping = false;
process.on("SIGTERM", () => { stopping = true; });
```

This merely sets a flag. It does not stop accepting requests, drain work, close connections, resolve uncertain results or ensure the process exits. Installing a handler changes default signal behavior and requires a complete lifecycle plan. Codex must design those mechanisms later from project requirements.

## 8. Isolation and security

Processes ordinarily have distinct address spaces; OS permissions constrain accessible resources. Running with unnecessary privileges increases risk. Container isolation is not equivalent to a virtual machine or a complete security boundary.

**TOCTOU** (time of check to time of use) arises when a resource changes after validation and before an operation. It illustrates why a preceding check does not guarantee a later action's assumptions. Chapters 10 and Domain 09 cover deeper concurrency/security implications.

## 9. Diagnosing real backend incidents

An API slows during report generation. Possible explanations: CPU saturation; workers competing for cores; file descriptors leaked; memory pressure; remote I/O wait.

Investigate methodically: record arrival rates, p95/p99 latency, CPU utilization and per-thread behavior, RSS/heap, I/O timings, open descriptors and event-loop delay. Form a hypothesis and reproduce under controlled load. High RSS alone doesn't prove a JS memory leak; low CPU doesn't mean the service is healthy.

## 10. Exercises

1. Explain program versus process versus thread.
2. Is every await a syscall? Why not?
3. Draw transitions from running to I/O waiting to runnable.
4. Recalculate FCFS versus SJF completion averages above.
5. Construct a starvation scenario with priority scheduling.
6. Compare preemption to yielding.
7. Why doesn't async automatically parallelize CPU computation?
8. Identify three kinds of leaked OS resources and their symptoms.
9. Why does try/finally help with resource ownership?
10. Compare SIGTERM and SIGKILL under Unix-like semantics.
11. What must a real graceful-shutdown contract specify?
12. Give a TOCTOU filesystem example.
13. Explain why high RSS and low JS heap can coexist.
14. Design a diagnostic experiment that distinguishes CPU-bound behavior from remote I/O delay.
15. Write product-level fairness requirements without selecting a scheduler.

### Answer guide

1. Program: code; process: running resource context; thread: schedulable execution context.
2. Await is a language/runtime operation; syscall behavior depends on underlying API.
3. Running → waiting → ready → running, when scheduling permits.
4. FCFS = 11; SJF = 19/3 time units.
5. Continuous high-priority arrivals prevent low-priority work from running.
6. Preemption is externally imposed; yielding cooperatively gives control back.
7. Suspending a promise doesn't create simultaneous compute resources.
8. Descriptors, sockets, threads or memory; leaks can create errors and exhausted capacity.
9. It closes a resource even after exceptions, assuming cleanup itself completes.
10. SIGTERM requests and can be handled; SIGKILL can't be caught.
11. Admission stop, draining/cancellation, deadlines, resource closure and truthful status.
12. File replaced between a pathname check and opening it.
13. External buffers, native allocations, memory mappings and stacks add memory outside JS heap.
14. Compare CPU profiles, per-stage timings and I/O waits on matched workloads.
15. Define bounded waiting, tie policy, starvation expectation and overload results in observable terms.

## Review checkpoint

You should be able to explain process/thread scheduling, when work blocks, how OS resources leak, why fairness requires a definition and why a shutdown flag isn't a shutdown system.

References:
- OSTEP: https://pages.cs.wisc.edu/~remzi/OSTEP/
- Node.js process: https://nodejs.org/api/process.html
- Node.js filesystem: https://nodejs.org/api/fs.html
- Linux proc: https://docs.kernel.org/filesystems/proc.html

**Coverage:** OS boundaries ✓; processes/threads ✓; scheduler trade-offs ✓; I/O ✓; signals ✓; resources ✓; security ✓; diagnostics ✓; exercises ✓. Pending learner review and independent execution. Next: Chapter 08 — Memory Models and Management.
