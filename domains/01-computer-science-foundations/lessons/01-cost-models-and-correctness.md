# Chapter 01 — Cost Models and Correctness

**Domain:** D01 — Computer Science Foundations  
**Status:** drafted; awaiting learner review  
**Prerequisites:** variables, arrays, loops, functions and basic arithmetic in JavaScript  
**Scope:** reasoning about what a program must do, why it is correct, and how its resource cost grows. Later chapters develop the data structures and algorithms themselves.

## Learning outcomes

By the end, you should be able to (1) convert ambiguous requirements into precise inputs, outputs and invariants; (2) find counterexamples; (3) explain partial versus total correctness and a loop invariant; (4) count dominant operations and express bounds using O, Ω and Θ; (5) distinguish input size, best/average/worst case and amortized cost; (6) analyze auxiliary versus total space; (7) interpret benchmarks without confusing elapsed time with asymptotic complexity.

## 1. Correctness comes before speed

A program is **correct with respect to a specification**, not simply because it returns a plausible result. Consider a service that receives a list of purchase amounts and must report whether the total fits a nonnegative spending limit.

**Initial vague description:** “Approve if the total is within budget.”

**Precise contract (for this lesson):**

- Input: an array of nonnegative *safe integers* measured in the smallest currency unit and a nonnegative safe-integer budget.
- The mathematical sum must be representable exactly as a JavaScript safe integer (or the operation explicitly reports a range error).
- Output: `true` exactly when the sum is less than or equal to the budget, otherwise `false`.
- Invalid input is rejected; the function does not modify the array.
- Empty input has sum zero. Equality to the budget is allowed.

We deliberately specified currency units, numeric range, equality, empty input and mutation. These are requirements, not implementation choices. Real financial applications may require different money representations, which Codex decides during project design.

### Preconditions, postconditions and invariants

A **precondition** is what must be true before an operation: e.g., amounts and budget are valid nonnegative safe integers. A **postcondition** is what must be true after successful termination: the returned boolean matches the exact mathematical comparison. An **invariant** is a property that must remain true throughout some operation or transition: e.g., a running subtotal always equals the sum of the elements already processed.

A **safety property** says that something bad never happens (no approval above budget). A **liveness property** says that something good eventually happens under stated assumptions (the finite scan returns). These concepts recur in concurrency and distributed systems.

**Counterexample:** Approving only when `total < budget` violates the equality requirement: amounts `[4, 6]`, budget `10` must be accepted. A single counterexample disproves a universal correctness claim; passing a handful of examples does not prove it.

### Reference implementation for study

```ts
function withinBudget(amounts: readonly number[], budget: number): boolean {
  if (!Number.isSafeInteger(budget) || budget < 0) {
    throw new RangeError("Invalid budget");
  }

  let total = 0;

  for (const amount of amounts) {
    if (!Number.isSafeInteger(amount) || amount < 0) {
      throw new RangeError("Invalid amount");
    }
    // Reject before exceeding safe-integer exactness.
    if (amount > Number.MAX_SAFE_INTEGER - total) {
      throw new RangeError("Sum exceeds safe-integer range");
    }
    total += amount;
  }

  return total <= budget;
}
```

**Walk through:** `[4, 6]`, budget `10` → subtotal 0 → 4 → 10 → true. For `[]`, the loop has zero iterations and returns `0 <= budget` (true for a valid nonnegative budget). For `[Number.MAX_SAFE_INTEGER, 1]`, it throws rather than silently comparing an inexact sum.

This function is a teaching example, not a product recommendation, accounting system or mandated PRD design.

## 2. How to reason about loops

A loop invariant helps prove that a loop does what we think it does. Consider:

```ts
function sum(values: readonly number[]): number {
  let result = 0;
  for (let i = 0; i < values.length; i++) {
    result += values[i];
  }
  return result;
}
```

For the proof below, assume finite mathematical numbers with exact addition (for example, small nonnegative integers whose total stays within the safe-integer range). Floating-point rounding otherwise complicates the literal equality used in the invariant.

**Invariant:** immediately before iteration `i`, `result` equals the sum of `values[0..i-1]`.

1. **Initialization:** when `i=0`, no elements have been read and `result=0` equals the empty sum.
2. **Maintenance:** adding `values[i]` makes the subtotal equal to the sum through element `i`; the next iteration begins with the invariant intact.
3. **Termination:** when `i=values.length`, the invariant says the result is the sum of all elements.

The loop counter rises by one and is bounded by a finite array length, so the loop terminates. **Partial correctness** is “if it terminates, the result satisfies the postcondition”; **total correctness** adds termination. Real JavaScript number semantics still require the explicit numeric assumptions above.

**Why useful in backend work:** When processing paginated records or recalculating inventory, state what has already been processed, what remains, and which invariant should hold even after each iteration.

## 3. Cost models: count work, then measure reality

We need an **input size** `n`: the number of elements in an array, vertices/edges in a graph, bytes in a file, or number of digits in an integer. “How fast is it?” has no meaning until the workload and measurement are defined.

A basic **RAM model** assumes simple arithmetic, comparisons and indexed accesses cost constant time. It is an abstraction: cache misses, allocation, I/O, JIT compilation and data representation can dominate actual running time. When integers grow arbitrarily large, arithmetic itself is not always constant-time.

### Example A: linear scan

```ts
function contains(values: readonly number[], target: number): boolean {
  for (const value of values) {
    if (value === target) return true;
  }
  return false;
}
```

- Best case: target is first → one comparison, **Θ(1)**.
- Worst case: target absent or last → `n` comparisons, **Θ(n)**.
- Average case: depends on a **specified distribution**. If target is guaranteed present with equally likely position, expected comparisons = `(n+1)/2`, still **Θ(n)**.
- Auxiliary space: **Θ(1)**, excluding the provided input array.

Do not announce “average = O(n)” without the input distribution assumptions when the distinction matters.

### Example B: triangular nested loops

```ts
function countPairs(n: number): number {
  let pairs = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs++;
    }
  }
  return pairs;
}
```

For a nonnegative integer `n`, the increment executes `(n-1)+(n-2)+...+1+0 = n(n-1)/2` times. This is **Θ(n²)** for growing `n`; an outer/inner-loop count need not always equal exactly `n²`. The counter is constant-size in the mathematical model, but JavaScript's exact numeric range limits practical `n`; the code is for analysis, not unbounded counting.

### Example C: logarithmic reduction

```ts
function stepsToOne(n: number): number {
  if (!Number.isSafeInteger(n) || n < 1) throw new RangeError();
  let steps = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    steps++;
  }
  return steps;
}
```

Each iteration halves the remaining magnitude. The number of iterations is `⌊log₂(n)⌋`: **Θ(log n)** for `n >= 2`. This does *not* mean every binary search is correct: binary search additionally relies on an ordered search space and maintained boundaries.

## 4. O, Ω and Θ: precise asymptotic statements

For nonnegative cost functions at sufficiently large `n`:

- **O(g(n)) — upper bound:** there exist positive constants `c` and `n₀` so `f(n) <= c·g(n)` for all `n >= n₀`.
- **Ω(g(n)) — lower bound:** `f(n) >= c·g(n)` beyond some threshold.
- **Θ(g(n)) — tight bound:** both upper and lower bounds hold.

If `f(n)=3n²+7n+10`, then `f(n) ∈ Θ(n²)`: lower-order terms and constant factors do not alter asymptotic growth. It is **also true** that `f(n) ∈ O(n³)`, but the latter is a loose bound, not a useful tight characterization.

Asymptotic notation describes growth **as n increases**; it does not directly compare wall-clock latency for small inputs. A `Θ(n)` implementation can be slower than a `Θ(n log n)` implementation for relevant small workloads due to constants, allocations and machine behavior.

### Complexity reference table

| Growth | Example cost model | What it means |
|---|---|---|
| Θ(1) | access at a known array index, under model assumptions | bounded independent of n |
| Θ(log n) | repeatedly halving the search space | doubling n adds roughly one step |
| Θ(n) | scan every element | doubling n roughly doubles work |
| Θ(n log n) | certain comparison sorting strategies | grows faster than linear |
| Θ(n²) | inspect all unordered pairs | doubling n roughly quadruples work |
| Θ(2ⁿ) | enumerate binary choices | quickly becomes infeasible |

The examples are illustrative, not guarantees for arbitrary languages, implementations or workloads.

## 5. Amortized analysis is not average-case analysis

Suppose a dynamic array doubles its capacity whenever full. Most appends cost one assignment. Occasionally, an append copies all existing items.

Across `n` appends starting from a constant capacity, total copies from growth are bounded by the geometric series `1+2+4+... < 2n`. Together with `n` assignments, total work is **O(n)**, so **amortized O(1)** per append.

An individual append at a resize boundary can still be **Θ(n)**. Amortized describes a bound across a *sequence of operations*; average case depends on a probability distribution. Neither means “every operation is constant-time.”

This analysis explains *a hypothetical growth policy*; don't assume a particular JavaScript engine exposes or guarantees the same array capacity policy.

## 6. Space complexity and input ownership

Be explicit about what is counted.

```ts
function copyAndReverse<T>(items: readonly T[]): T[] {
  const result = [...items];
  result.reverse();
  return result;
}
```

For `n` items, this allocates an output array with **Θ(n)** additional element slots and does **Θ(n)** work. We commonly call that **Θ(n) auxiliary space** relative to the input, though some conventions exclude required output storage from “auxiliary”; state your convention. A recursive algorithm can incur stack space even when it creates no explicit array.

In services, differentiate: retained heap memory, peak temporary allocation, external buffers, OS page cache and storage volume are not the same measurement.

## 7. Correctness properties versus performance targets

Imagine a batch processing API. A requirement might say:

- **Correctness:** every accepted valid record appears exactly once in the final logical result, or receives an explicit failure result.
- **Safety:** partial processing must never be reported as complete.
- **Performance:** under a named workload and environment, process a specified number of records within a latency/resource budget.

A performance benchmark cannot establish correctness, and a unit test cannot establish throughput. Both need evidence. This distinction is particularly useful when ChatGPT guides Codex through a future PRD: the PRD defines the externally observable constraints, whereas Codex explores the implementation that satisfies them.

## 8. Benchmarking without misleading conclusions

A fair experiment defines machine, Node.js version, workload sizes, input distributions, sample counts and confidence in the results. Avoid changing only the algorithm while quietly changing input shape. Also beware warm-up, JIT behavior, garbage collection, process contention and clock granularity.

```ts
import { performance } from "node:perf_hooks";

function timeOne(operation: () => void): number {
  const start = performance.now();
  operation();
  return performance.now() - start;
}

// Educational timing skeleton: do not draw conclusions from one sample.
const samples: number[] = [];
for (let i = 0; i < 30; i++) {
  samples.push(timeOne(() => {
    let x = 0;
    for (let j = 0; j < 100_000; j++) x += j;
    if (x < 0) throw new Error("unexpected");
  }));
}
samples.sort((a, b) => a - b);
console.log({ medianMs: samples[Math.floor(samples.length / 2)] });
```

**Limitations of this skeleton:** the workload is synthetic and might be optimized unexpectedly; there is no explicit warm-up, baseline subtraction, independent verification of optimized machine code, variance report or environment isolation. Its purpose is to introduce measurement mechanics, not to certify production performance. For stronger comparisons, use sufficiently substantial representative operations, separate experiment runs, report distributions (median, p95, variation), monitor GC and CPU, and compare scaling over multiple `n` values.

**Latency versus throughput:** latency is the time per operation; throughput is completed operations per time. A system can improve throughput by batching while raising latency. Record both when the product cares about both.

**Measurement checklist:** state question/hypothesis → isolate a variable → construct representative data → verify equivalent outputs → warm up appropriately → collect repeated samples → inspect distribution and outliers → scale input sizes → report environment and limitations → attempt reproduction.

## 9. Worked reasoning: choosing between two membership tests

An API needs to check whether incoming identifiers belong to a reference list.

**Approach 1:** For each incoming ID, scan all `n` reference IDs. For `m` incoming IDs, worst-case work **Θ(mn)**.

**Approach 2:** Construct a membership structure from `n` references, then test `m` incoming IDs. Under an explicit assumption of expected constant-time operations for the chosen structure, expected work is **O(n+m)** plus storage **O(n)**; pathologies and memory cost still matter.

We can discuss those theoretical options in a lesson. A project PRD should simply state the membership behavior, workload and resource constraints; it must **not** mandate either option. Codex compares choices based on measured needs during implementation.

## 10. Exercises

Work on paper first, then test with small JavaScript/TypeScript functions.

1. **Contract:** A reservation service holds capacity 3. Specify inputs, outputs and two safety invariants for concurrent requests. Do *not* choose a lock or database.
2. **Counterexample:** A function returns `sum < limit` but the spec says “at most limit.” Give the smallest useful counterexample.
3. **Invariant:** Prove that scanning an array and retaining the maximum so far returns its maximum for a **nonempty** finite array. State initialization, maintenance and termination.
4. **Cost:** Count exactly how many times a body executes: `for (let i=0;i<n;i++) for(let j=0;j<i;j++) body();` for integer `n>=0`.
5. **Bounds:** Is `3n²+4n+1` in O(n³), Ω(n²), Θ(n²)? Explain.
6. **Case distinction:** For linear search, explain best/worst/expected comparisons when the searched item is guaranteed present uniformly at random.
7. **Amortization:** Explain why a single resize may cost Θ(n), yet appending n items to a doubling-capacity array requires O(n) total copies.
8. **Space:** Compare a function that builds a reversed copy to one that swaps items in place. Identify output/auxiliary memory and mutability implications.
9. **Experiment:** Design a fair benchmark for two functions that find membership in a set of records. Specify distributions, sizes, correctness check, warm-up, sample statistics and limitations.
10. **Bug investigation:** A numeric sum exceeds `Number.MAX_SAFE_INTEGER`. Explain why a fast loop does not guarantee a correct answer, and suggest a contract-level way to handle the limitation.

### Answer rubric / selected solutions

1. Good invariants: `0 <= confirmed <= 3` and an allocation can belong to at most one confirmed owner (if exclusivity is a requirement); define what “confirmed” means.
2. `sum=limit=0` with an empty valid input is a minimal equality counterexample (if nonnegative values and zero limit are allowed).
3. Initialize max to first element; after processing the first `k` elements, max equals their largest; updating with the next element preserves it; after `n` steps it is global max.
4. `0+1+...+(n-1)=n(n-1)/2`, hence Θ(n²) as n grows.
5. Yes to all three; Θ(n²) is tight.
6. 1, n and `(n+1)/2` respectively.
7. Growth-copy costs form a geometric series bounded by a multiple of n.
8. Copy uses Θ(n) additional slots and doesn't mutate input; in-place reversal can use Θ(1) auxiliary storage but changes caller-owned data.
9. Must include same input/outputs, sizes spanning orders of magnitude, warm-up, repeats, environment, metrics and reproducibility.
10. JavaScript Number can't represent all integers above the safe-integer threshold; specify acceptable value range and explicit error or exact integer representation, without imposing a project-level technology prematurely.

### Self-check

You are ready to review this chapter when you can explain without memorization: (a) why tests and proofs answer different questions; (b) what assumptions a Θ(n) claim uses; (c) why an O(n) algorithm can be slower for small n; (d) why worst-case and amortized bounds may differ; and (e) how to translate a requirement into a testable invariant.

## 11. Common misconceptions

- “It passes tests, therefore it is proven correct.” Tests only exercise selected cases; proofs depend on explicit assumptions.
- “Big O is elapsed time.” It's a growth bound, not a clock measurement.
- “O(n²) is always slower than O(n).” Not necessarily at practical sizes and workloads.
- “Average-case and amortized are synonyms.” They answer different mathematical questions.
- “JavaScript has unlimited integer precision.” `number` has finite precision and a safe-integer limit.
- “The number of loops determines exact complexity.” Iteration counts, bounds and early exits matter.
- “No allocations means constant total memory.” Call-stack growth, retained data and external memory also count.
- “Exactly once is solved by a fast algorithm.” Correctness under retries or concurrency is a separate system property.

## 12. Scope, references and further study

This chapter establishes *reasoning tools*. Ch02–04 develop structure-specific and algorithm-specific complexity. Ch06–09 explain why actual hardware and operating systems differ from simplified models; Ch10–12 deepen concurrency and invariant reasoning.

Suggested sources to verify while studying:

- Cormen, Leiserson, Rivest & Stein, *Introduction to Algorithms*, chapters on growth, correctness, asymptotic notation and amortized analysis.
- Sedgewick & Wayne, *Algorithms*, introductory analysis and data structures.
- MIT OpenCourseWare 6.006, algorithms and asymptotic analysis: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
- MDN, JavaScript number precision: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
- Node.js, performance hooks: https://nodejs.org/api/perf_hooks.html
- OSTEP, systems background: https://pages.cs.wisc.edu/~remzi/OSTEP/

**Coverage audit:** specification ✓; pre/postconditions ✓; invariants ✓; counterexamples ✓; partial/total correctness ✓; time/space ✓; O/Ω/Θ ✓; best/worst/average ✓; amortization ✓; benchmark caveats ✓; worked backend applications ✓; exercises and rubrics ✓. Pending: learner review, code execution evidence, cross-domain application in actual project.
