# Chapter 04 — Algorithmic Problem-Solving

**Domain:** D01 — Computer Science Foundations  
**Status:** drafted; pending learner review  
**Prerequisites:** Chapters [01](01-cost-models-and-correctness.md), [02](02-linear-and-associative-data-structures.md), [03](03-trees-heaps-and-graphs.md)

## Learning objectives

Given a clearly defined backend problem, you should be able to formalize inputs and outputs; choose between exhaustive search, iteration, recursion, divide-and-conquer, greedy and dynamic programming; recognize binary-search preconditions; implement sorting/searching safely; analyze recurrence and graph-algorithm costs; construct correctness arguments and counterexamples; and compare real measurements against theory.

This chapter is an **educational comparison** of approaches. It does not mandate algorithms, data stores or architectures for future project PRDs.

## 1. An algorithm is a contract plus a process

Before coding, identify: (1) valid inputs and numeric ranges, (2) required output and ordering, (3) unacceptable outcomes, (4) scale and resource constraints, (5) edge cases and (6) whether an exact solution is required.

Example: "Find the earliest available appointment" is incomplete. Earliest by whose timezone? Does the appointment need contiguous capacity? Are ties deterministic? Must another user's simultaneous booking be accounted for? A correct algorithm for an incomplete contract can still produce an incorrect product.

Write three artifacts first: **examples**, **invariants**, and **counterexamples**. Use Chapter 01's preconditions/postconditions to separate algorithm correctness from runtime availability and concurrency.

### Typical workflow

1. Restate problem precisely and create a tiny baseline that is obviously correct.
2. Identify input size parameters (possibly more than one, e.g. vertices V and edges E).
3. Determine which work is repeated and which representation permits useful operations.
4. Develop an optimized candidate, stating assumptions.
5. Prove or strongly justify correctness; test extreme cases.
6. Analyze time and auxiliary space; benchmark under representative data.
7. Reevaluate if constraints or requirements change.

## 2. Iteration, recursion and termination

**Iteration** repeats using a loop; **recursion** solves smaller instances via function calls. Neither is intrinsically faster. A recursive solution needs a base case and a measure that decreases toward it; otherwise it may not terminate.

Consider computing a nonnegative integer factorial:

```ts
function factorial(n: number): bigint {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError();
  let answer = 1n;
  for (let i = 2; i <= n; i++) answer *= BigInt(i);
  return answer;
}
```

For n iterations, counting multiplication as constant time yields Θ(n); for growing bigint values multiplication itself gets more expensive, so Θ(n) is only the **unit-cost arithmetic model**. The method uses Θ(1) explicit scalar slots, while the result's bigint storage grows with n. A recursive variant requires Θ(n) stack frames and risks stack exhaustion in Node.js; do not rely on tail-call optimization.

### Loop invariants

For iterative factorial, after finishing iteration k, `answer = k!`. Initialization holds at 1!, multiplying by k+1 preserves it, and termination at n proves the postcondition. Rejecting negative, fractional or unsafe-number n makes the contract explicit.

## 3. Exhaustive search and pruning

**Brute force** explores all candidates, useful as a correctness reference for small inputs even if it does not scale. For n yes/no decisions, the search space can contain 2^n combinations.

**Pruning** skips branches known not to yield acceptable results, but skipping must preserve correctness. If a branch can still produce a valid solution, pruning it silently is a bug. Backtracking maintains partial state, explores choices and undoes them.

Example: select a subset of tasks within a capacity limit. Enumerating all subsets provides a small-input oracle. Pruning when a partial sum exceeds capacity is sound **only if** all remaining task costs are nonnegative. Negative values break that assumption.

## 4. Search: linear versus binary

Linear search scans values; worst-case time Θ(n), and it requires no sorting.

Binary search exploits a **monotone predicate** or ordered search space. For a sorted ascending numeric array, we can find the first index with value >= target:

```ts
function lowerBound(sorted: readonly number[], target: number): number {
  let lo = 0;
  let hi = sorted.length; // exclusive
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

**Invariant:** all indices before lo have values < target, and all indices at or after hi have values >= target (conceptually including the sentinel n). Each iteration shrinks [lo,hi); when lo=hi, it is the first qualifying position, or n. Sorting and consistent comparison are required. With an array of finite numeric values and finite target, time is O(log n), auxiliary space Θ(1). NaN invalidates ordinary ordering assumptions and should be excluded or explicitly handled.

Trace `[1,2,2,5,9]` with target 2: result 1. With target 6: result 4. With target 10: result 5. In an unsorted array, binary search is not correct.

**Crucial distinction:** if data must first be sorted, preprocessing might cost O(n log n). Binary search is not automatically the fastest choice for one-off queries.

## 5. Divide-and-conquer and recurrences

Divide-and-conquer breaks a problem into smaller subproblems, solves them, and combines results.

Merge sort recursively splits an array, then merges sorted halves. With T(n)=2T(n/2)+Θ(n), the usual recurrence yields Θ(n log n) time. It typically uses Θ(n) additional element storage and Θ(log n) recursion frames for a top-down implementation. Its advantage includes predictable worst-case growth and stable sorting when implemented appropriately; its trade-off includes copying/merging allocations.

### Educational stable merge

```ts
function mergeSorted(a: readonly number[], b: readonly number[]): number[] {
  const out: number[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]); // left wins ties
    else out.push(b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
```

Assume finite numbers and sorted inputs. The output has length |a|+|b|, stays sorted and includes the same multiset of values. Choosing the left item when equal preserves relative order of equal items across the merge, assuming the halves were themselves stably ordered.

### Comparing sorting algorithms

| Algorithm | Typical time | Worst case | Extra storage (typical) | Caveat |
|---|---|---|---|---|
| Insertion sort | Θ(n²) | Θ(n²) | Θ(1) | Very effective for tiny or nearly sorted inputs |
| Merge sort | Θ(n log n) | Θ(n log n) | Θ(n) | Can be stable |
| Quicksort | expected Θ(n log n) | Θ(n²) | recursion stack varies | Pivot strategy and partitioning matter |
| Heapsort | Θ(n log n) | Θ(n log n) | Θ(1) auxiliary | Not stable in usual form |

"Expected" for quicksort needs a defined randomization/input assumption. No algorithm dominates all data distributions and constraints. Comparison-based sorting has an Ω(n log n) worst-case lower bound under the decision-tree model, but specialized non-comparison sorting can exploit bounded integer keys or other extra assumptions.

JavaScript's `Array.prototype.sort` sorts **strings by default** if no comparator is given. A numeric ascending comparator is `(a,b)=>a-b` for finite numbers. Current ECMAScript specifies stable sorting but does not require one particular algorithm or time bound.

## 6. Greedy methods: local choices and proofs

A **greedy** algorithm commits to a locally preferred choice and does not revisit it. Greedy can be optimal when the problem exhibits a suitable exchange property or matroid-like structure; local intuitions alone are insufficient.

**Interval scheduling** (maximize number of non-overlapping activities) is a classic example. For intervals with start < end, treating them as half-open [start,end), sorting by earliest finish time and repeatedly accepting a compatible interval produces a maximum-cardinality selection.

**Exchange argument (sketch):** among optimal solutions, replace the first chosen interval with the globally earliest-finishing compatible interval without reducing the number of later intervals. Repeat on remaining compatible intervals. The proof relies on the exact objective and interval rules.

```ts
type Interval = { start: number; end: number };

function selectMaximumCount(items: readonly Interval[]): Interval[] {
  for (const x of items) {
    if (!Number.isFinite(x.start) ||
        !Number.isFinite(x.end) || x.start >= x.end) {
      throw new RangeError("Invalid interval");
    }
  }
  const sorted = [...items].sort((a,b) => a.end - b.end || a.start - b.start);
  const selected: Interval[] = [];
  let latestEnd = -Infinity;
  for (const x of sorted) {
    if (x.start >= latestEnd) {
      selected.push(x);
      latestEnd = x.end;
    }
  }
  return selected;
}
```

This solves **maximum number of non-overlapping intervals**, not maximum revenue, multiple-room booking, or concurrency-safe reservation. Those are different requirements. Sorting dominates time O(n log n); storing sorted copy and output uses O(n) additional space.

**Greedy counterexample:** coin denominations [1,3,4], target 6. Taking the largest coin repeatedly yields 4+1+1 (3 coins), but 3+3 uses 2. Greedy coin change isn't universally optimal.

## 7. Dynamic programming: overlapping subproblems

Dynamic programming (DP) is useful when a problem has **optimal substructure** and **overlapping subproblems**. It stores answers to avoid repeated work, through memoization (top-down) or tabulation (bottom-up).

Fibonacci's naïve recursive definition recomputes subproblems exponentially often. Tabulation eliminates repeated recursion:

```ts
function fibonacci(n: number): bigint {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError();
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) [a,b] = [b,a+b];
  return a;
}
```

This performs O(n) bigint additions under a unit-cost model and uses constant-many bigint variables, but bigint operand sizes grow with n. Precision, bit complexity and maximum acceptable n matter for a real API.

### DP formulation checklist

1. Define **state** precisely.
2. Write a recurrence connecting states.
3. State base cases.
4. Select evaluation order and verify dependencies are available.
5. Recover the answer (and selected decisions if needed).
6. Count number of states times cost per transition.
7. Identify memory reduction possibilities and reconstructability trade-offs.

**Example — 0/1 knapsack:** given n items with integer nonnegative weight and value, each usable at most once, maximize total value under integer capacity C. A common DP has O(nC) time and O(C) space when optimized, which is **pseudo-polynomial**: C can be exponentially large relative to its bit-length. Calling it "polynomial-time in input length" would be incorrect.

DP is not automatically better than greedy: for interval scheduling's max-count goal, the proven greedy method is simpler.

## 8. Graph problem-solving patterns

Review Chapter 03's adjacency lists, BFS, DFS and topological ordering.

| Problem | Standard idea | Preconditions |
|---|---|---|
| Reachability | BFS or DFS | Graph representation and edge semantics defined |
| Fewest edges in unweighted graph | BFS with predecessor tracking | All edges have equal unit cost |
| Dependency ordering | Topological order | Directed acyclic graph |
| Nonnegative weighted shortest path | Dijkstra | No negative edge weight, correct priority updates |
| Negative edges, no reachable negative cycle for finite shortest paths | Bellman–Ford | Handle reachable negative cycles explicitly |
| Minimum total connection cost | Minimum spanning tree algorithms | Undirected weighted connectivity setting |

### BFS shortest-path witness

When BFS first discovers a vertex at distance d from source, it does so via a vertex at distance d−1. Any shorter path would have reached it through an earlier frontier level, a contradiction. This applies to **edge count**, not arbitrary positive or negative weighted costs.

### Topological failure

A cycle A→B→C→A means no node on the cycle can be first if edges represent prerequisites. The correct user-visible behavior might be rejecting the dependency plan and showing a comprehensible diagnostic. The PRD shouldn't preselect a cycle-detection algorithm.

## 9. Complexity, representation and practical limits

Algorithmic comparisons require more than asymptotic notation:
- **Multiple variables:** graph traversal is O(V+E), not simply O(n) without defining n.
- **Worst vs expected:** data distribution matters for hashing and quicksort.
- **Time vs space:** memoization may speed execution while increasing retained memory.
- **Preprocessing vs queries:** indexing/sorting costs can be worthwhile for repeated reads.
- **Numerical correctness:** JavaScript `number` precision, NaN, infinities and bigint arithmetic require explicit contracts.
- **Call-stack limits:** deep recursion can throw even when mathematical recurrence terminates.
- **Adversarial inputs:** worst cases can become security/resource-exhaustion problems.
- **I/O and concurrency:** a CPU complexity analysis does not prove a distributed workflow safe under retries.

## 10. Worked backend scenarios

### A. Search a changing product catalog

A one-off query might scan data; many repeated queries might justify preprocessing or an index. The correct approach depends on catalog mutation, query volume, ordering and memory budget. A PRD defines observable search accuracy, latency and constraints; Codex evaluates strategies during implementation.

### B. Schedule independent tasks with dependencies

Model dependencies as a DAG. The system must reject cycles and recognize ready tasks. If priorities also matter, clarify whether priority overrides arrival order or only orders ready tasks. Topological ordering validates prerequisites; priority choice is an independent product rule.

### C. Allocate non-overlapping sessions

If the goal is maximum appointment **count** on one resource, the interval-scheduling greedy proof may apply. If services have different revenues or staff constraints, that proof no longer establishes optimality. A correct scope and objective must precede algorithms.

## 11. Mistakes to avoid

- Choosing binary search on unsorted data.
- Assuming all recursive algorithms have logarithmic depth.
- Calling a greedy strategy correct because it works on a few examples.
- Ignoring tie policies, equality and numeric ranges.
- Treating `O(nC)` knapsack as polynomial in binary-encoded input size.
- Using a benchmark as a correctness proof.
- Assuming Dijkstra supports arbitrary negative weights.
- Confusing shortest paths with minimum spanning trees.
- Hiding sorting/index-building cost when comparing queries.
- Claiming an algorithm prevents race conditions without specifying concurrent operation semantics.

## 12. Exercises (attempt before the answer guide)

1. Give a loop invariant proving factorial for n≥0.
2. Trace lowerBound on [1,2,2,5,9] for targets 2, 6 and 10.
3. What precondition makes binary search valid? Supply a counterexample when it fails.
4. Solve T(n)=2T(n/2)+n for powers of two; explain the recursion-tree sum.
5. Merge [1,4,4] and [2,4,7] stably. Why does the <= comparison matter?
6. Find a smallest useful counterexample to greedy coin change with [1,3,4].
7. Prove why earliest-finish interval scheduling is optimal for maximum count.
8. Change the objective to maximum **revenue**. Explain why the old proof fails.
9. Write DP state/transition/base cases for minimizing coins with denominations [1,3,4].
10. Explain why knapsack O(nC) is pseudo-polynomial.
11. Compare shortest path in unweighted vs nonnegative weighted graphs.
12. A workflow has A→B and B→A. What requirement is violated?
13. Benchmark two membership approaches: specify workload, distributions, output check and metrics.
14. When does O(n log n) sort + O(log n) per query beat n repeated linear scans? Express costs using n elements and q queries.
15. A recursive DFS on a 1-million-node chain crashes. Is the graph problem mathematically unsolvable? Explain.
16. Define a contract for a scheduler's fairness policy without selecting an algorithm.

### Answers and rubric

1. After processing k, accumulator equals k!; initialize 0!=1, multiply by k+1, terminate at n.
2. Indices 1, 4 and 5.
3. Monotone/sorted predicate; e.g. [10,1] breaks assumptions for target 2.
4. Each of log₂n levels costs Θ(n), giving Θ(n log n).
5. [1,2,4(left),4(left),4(right),7]; consuming left ties maintains stable relative order.
6. Target 6: 4+1+1 versus 3+3.
7. Exchange an optimal schedule's first interval for an earliest-finishing interval; it leaves at least as much time for all later choices, then induct.
8. A shorter low-revenue interval may displace a longer high-revenue one.
9. dp[0]=0; dp[x]=1+min(dp[x−coin]) over allowable coin values ≤x, with unreachable states infinity.
10. C's numeric magnitude can be exponential in the number of bits encoding C.
11. BFS minimizes edge count; nonnegative weighted shortest paths need weighted logic (e.g. Dijkstra).
12. Prerequisite cycle prevents an executable topological ordering.
13. Specify repeatable datasets, hit/miss distributions, equal correctness, warm-up, repeated samples, tail latency and memory.
14. Sort once O(n log n) plus q lookups O(q log n), versus O(qn), under the modeled operations.
15. No. Implementation stack depth can fail; iterative traversal or other representation can solve the graph task.
16. Define externally observable ordering, starvation limit, tie semantics and capacity handling; do not preselect a priority queue or policy mechanism.

## 13. Mastery checkpoint

You are ready for review when you can write a correct binary-search invariant; give a greedy counterexample; explain the recurrence of merge sort; formulate a DP state and bound; distinguish topological sorting, BFS and weighted shortest paths; and justify algorithm choice based on workload and proof, not popularity.

## References and boundaries

- Cormen, Leiserson, Rivest & Stein — *Introduction to Algorithms*, sorting, recurrences, greedy, DP and graphs.
- Sedgewick & Wayne — *Algorithms*, search/sort/graph methods.
- MIT OCW Introduction to Algorithms: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
- ECMAScript Array sorting specification: https://tc39.es/ecma262/#sec-array.prototype.sort
- MDN sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

**Coverage audit:** iteration/recursion ✓; brute force/backtracking ✓; binary search ✓; divide-and-conquer/recurrences ✓; sorting ✓; greedy/proofs ✓; DP/pseudo-polynomial complexity ✓; graph algorithms ✓; practical failure cases ✓; exercises and answers ✓. **Pending:** learner review and independently executed examples. Chapter 05 covers discrete mathematical foundations.
