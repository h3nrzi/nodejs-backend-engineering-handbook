# Chapter 03 — Trees, Heaps and Graphs

**Domain:** D01 Computer Science Foundations  
**Status:** drafted — pending learner review  
**Prerequisites:** [Chapter 01](01-cost-models-and-correctness.md) and [Chapter 02](02-linear-and-associative-data-structures.md)

## Learning outcomes

After studying, learners should be able to distinguish trees from graphs; reason about balanced versus unbalanced search trees; implement and trace a binary heap; model dependencies as graphs; compare BFS and DFS; identify graph cycles; justify adjacency representations and complexity bounds; and define observable correctness requirements without prescribing project architecture.

## 1. First principles: relationships rather than sequences

An array describes indexed positions; a graph describes **vertices** (nodes) and **edges** (relationships). An edge may be directed or undirected, weighted or unweighted. In a directed graph, A → B need not imply B → A. A graph may have cycles, disconnected components, self-loops or multiple edges depending on its definition.

A **tree** is a connected undirected graph with no cycles; equivalently, an undirected tree with V vertices has V−1 edges. In a rooted tree we choose a root and speak of parent, child, sibling, ancestor, descendant, subtree, depth and height. Rooting does not change the underlying graph edges. A forest consists of multiple trees. Some programming uses “tree” for rooted hierarchical structures whose edges point from parents to children; clarify which convention is in use.

**Examples:** product-category hierarchy (tree only if every category has one parent); service dependencies (directed graph); organization ownership (often a tree, but shared membership creates a graph); workflow DAG (directed acyclic graph).

### Counting and shape

- A node's **degree** in an undirected graph counts incident edges. Directed graphs distinguish in-degree and out-degree.
- Depth of a node is number of edges from root; height of a rooted tree is maximum downward path length (here measured in edges).
- In a tree, there is exactly one simple path between any two vertices.
- A **DAG** is directed and has no directed cycle; it need not be a tree because nodes may have multiple incoming edges.

**Checkpoint:** A → C and B → C is a valid DAG but not a rooted tree if both are considered parents of C.

## 2. Binary trees and traversals

A **binary tree** gives each node at most two ordered child positions (left/right). It is not automatically a binary search tree. A *full* binary tree has either zero or two children per node; a *perfect* one has all internal nodes with two children and all leaves at one depth; a *complete* tree fills levels left-to-right except possibly the final level. These terms are distinct.

```text
          8
        /   \
       3    10
      / \     \
     1   6    14
        / \
       4   7
```

**Preorder** visits node, left, right: `8,3,1,6,4,7,10,14`.  
**Inorder** visits left, node, right: `1,3,4,6,7,8,10,14`.  
**Postorder** visits left, right, node: `1,4,7,6,3,14,10,8`.  
**Level order** visits by increasing depth: `8,3,10,1,6,14,4,7`.

These traversals each visit n nodes in Θ(n) time. Recursive depth-first traversal uses O(h) additional call-stack space for height h; breadth-first traversal can need O(w) queued nodes for maximum width w. Deeply skewed trees can cause stack overflow in JavaScript recursion, so recursion depth is a practical constraint.

### Working TypeScript example: iterative inorder

```ts
type BNode<T> = {
  value: T;
  left: BNode<T> | null;
  right: BNode<T> | null;
};

function inorder<T>(root: BNode<T> | null): T[] {
  const result: T[] = [];
  const stack: BNode<T>[] = [];
  let current = root;
  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    const node = stack.pop()!;
    result.push(node.value);
    current = node.right;
  }
  return result;
}
```

**Invariant:** pending stack frames represent ancestors whose own visit or right subtree remains outstanding. The algorithm returns n values in Θ(n) time, uses O(h) stack space plus Θ(n) result storage. The non-null assertion is safe here because the outer loop ensures either current is non-null (and will push) or stack is nonempty.

## 3. Binary search trees (BST)

A BST imposes an *ordering invariant*: every value in a node's left subtree is smaller and every value in its right subtree is larger, under a total-order comparator and a defined duplicate-key policy. The invariant applies to **entire subtrees**, not just immediate children.

Search, insertion and deletion take O(h) time for tree height h. In a balanced BST, h = Θ(log n); a degenerate insertion order can yield h = Θ(n), making operations linear.

```ts
type IntNode = {
  key: number;
  left: IntNode | null;
  right: IntNode | null;
};

function bstHas(root: IntNode | null, target: number): boolean {
  if (!Number.isFinite(target)) throw new RangeError("Invalid key");
  let node = root;
  while (node !== null) {
    if (target === node.key) return true;
    node = target < node.key ? node.left : node.right;
  }
  return false;
}
```

Assume each stored key is finite and distinct; inserting duplicates or using `NaN` without a defined comparator can violate semantics. Try searching the earlier illustrated tree for 7 (found) and 9 (absent). A sorted insertion sequence 1,2,3,4 into a naïve BST produces a chain, not a balanced tree.

**Self-balancing variants** such as AVL and red-black trees enforce structural constraints through rebalancing to retain logarithmic height. Their exact invariants, rotations and update costs matter; understanding that a tree must preserve *both ordering and balance* is the core goal here. Rotations change shape while preserving inorder key order.

**Why backend engineers care:** ordered ranges, predecessor/successor queries, in-memory indexes and ordered scheduling. A relational database index may use B-trees or variants, but is not the same as a textbook binary search tree; its internals belong to D07.

## 4. Heaps and priority queues

A **heap** is a partially ordered tree, not a sorted tree. For a min-heap, every parent's priority is <= each child's priority. It guarantees the *minimum at the root* but not full sorted iteration.

A binary heap is normally a complete binary tree and can be stored compactly in an array. At zero-based index i, child indexes are `2i+1` and `2i+2`; parent index is `floor((i−1)/2)`.

| Operation | Binary min-heap (n elements) |
|---|---|
| Read minimum | Θ(1) |
| Insert with sift-up | O(log n) |
| Remove minimum with sift-down | O(log n) |
| Build heap bottom-up | Θ(n) |
| Find arbitrary key | Θ(n) worst case |

A **priority queue** is an ADT that removes by priority, not insertion order. A heap is one possible implementation. Equal-priority ordering is not automatically FIFO; if that matters, the contract must say so.

### Educational min-heap (finite numeric priorities)

```ts
class MinHeap {
  private a: number[] = [];

  get size(): number { return this.a.length; }
  peek(): number | undefined { return this.a[0]; }

  push(value: number): void {
    if (!Number.isFinite(value)) throw new RangeError("Invalid priority");
    this.a.push(value);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.a[p] <= this.a[i]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }

  pop(): number | undefined {
    if (this.a.length === 0) return undefined;
    const min = this.a[0];
    const last = this.a.pop()!;
    if (this.a.length === 0) return min;
    this.a[0] = last;
    let i = 0;
    for (;;) {
      const left = 2 * i + 1;
      const right = left + 1;
      let smallest = i;
      if (left < this.a.length && this.a[left] < this.a[smallest]) smallest = left;
      if (right < this.a.length && this.a[right] < this.a[smallest]) smallest = right;
      if (smallest === i) break;
      [this.a[i], this.a[smallest]] = [this.a[smallest], this.a[i]];
      i = smallest;
    }
    return min;
  }
}
```

**Trace:** insert 5,2,9,1; repeated pop returns 1,2,5,9. An educational test should assert after each operation that every existing parent's key is <= both existing child keys. This implementation doesn't include arbitrary deletion, indexed priority updates or stable tie handling; those are separate requirements.

**Why build-heap is O(n) rather than O(n log n):** most nodes lie close to leaves and require little sift-down work; a weighted sum over node heights is linear. Repeatedly inserting n items is O(n log n), which is a different construction process.

## 5. Graph representation: adjacency list versus matrix

For V vertices and E edges:

| Representation | Storage | Check whether edge (u,v) exists | Iterate neighbors of u |
|---|---|---|---|
| Adjacency list (array of neighbors) | Θ(V+E) | O(out-degree(u)) | Θ(out-degree(u)) |
| Adjacency matrix | Θ(V²) | Θ(1) | Θ(V) |
| Adjacency sets | O(V+E) expected-model storage | expected O(1) membership, assumptions apply | Θ(out-degree(u)) |

Choose based on graph density, operation mix and representation guarantees. For undirected graphs, storing each edge at both endpoints is a common convention. For directed graphs, outgoing versus incoming edges must be distinguished.

```ts
type Graph = Map<string, string[]>;
const g: Graph = new Map([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", ["D"]],
  ["D", []],
]);
```

**Invariants:** every referenced vertex is valid (or explicitly allowed as an external vertex); direction is consistent; parallel edges/self-loops follow a documented policy. Never silently assume no duplicates.

## 6. BFS, DFS and reachability

**Breadth-first search (BFS)** explores vertices by distance in edge count from a start vertex, using a queue. On an *unweighted graph*, BFS can find a shortest path by **number of edges**. It does not solve arbitrary weighted shortest-path problems.

```ts
function reachable(g: Graph, start: string): Set<string> {
  const visited = new Set<string>([start]);
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const vertex = queue[head++];
    for (const next of g.get(vertex) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return visited;
}
```

**DFS** explores a branch before backtracking, using recursion or an explicit stack. In adjacency-list representation both BFS and DFS run Θ(V+E) when traversing the complete reachable graph and processing each vertex/edge a bounded number of times, with up to O(V) visited/frontier storage. For a disconnected graph, searching from one source touches only reachable vertices and their edges; exploring *all* components requires starting additional searches.

Walkthrough on graph A→B,C; B→D; C→D: BFS from A visits A, B, C, D (assuming neighbor order as listed). DFS order depends on whether neighbors are pushed/popped in reverse order.

**Common bug:** marking visited only when dequeuing can enqueue the same vertex many times; marking at enqueue prevents duplicates from multiplying.

## 7. Dependency graphs and cycle detection

A workflow dependency A→B can mean “A must finish before B starts”; define edge direction explicitly. If there is a directed cycle A→B→C→A, no task in that cycle can become ready under the ordinary prerequisite rule.

A **topological ordering** exists for a directed graph **if and only if** it is acyclic. It can be found by repeatedly removing vertices of in-degree zero (Kahn's algorithm), or by DFS finishing times with cycle detection.

### Kahn's algorithm (educational)

```ts
function topoOrder(g: Graph): string[] {
  const degree = new Map<string, number>();
  for (const v of g.keys()) degree.set(v, 0);
  for (const neighbors of g.values()) {
    for (const v of neighbors) {
      if (!degree.has(v)) throw new Error("Unknown vertex: " + v);
      degree.set(v, degree.get(v)! + 1);
    }
  }
  const queue = [...degree.entries()]
    .filter(([, d]) => d === 0)
    .map(([v]) => v);
  const order: string[] = [];
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of g.get(u) ?? []) {
      const next = degree.get(v)! - 1;
      degree.set(v, next);
      if (next === 0) queue.push(v);
    }
  }

  if (order.length !== degree.size) throw new Error("Dependency cycle");
  return order;
}
```

This algorithm runs Θ(V+E) in an adjacency-list model. **Proof idea:** each output node has no remaining prerequisites; removing its outgoing edges preserves the constraint for later nodes. If vertices remain without any zero-in-degree vertex, a directed cycle exists. The output is not necessarily unique, because independent tasks can appear in different valid orders.

This is a learning demonstration. In a product PRD, specify rejection/diagnosis of invalid dependencies and observable readiness behavior; do **not** demand Kahn's algorithm.

## 8. Weighted graphs and shortest paths: boundaries

A weighted edge stores a cost (latency, distance, price). A shortest path minimizes total edge weight, not the number of edges. Dijkstra's algorithm handles **nonnegative** edge weights under its assumptions; a priority queue often supports its efficient implementation. Negative edge weights invalidate the usual greedy guarantee, while negative cycles reachable on routes can make the “shortest” total unbounded below.

**Minimum spanning tree** is a different problem: connect all vertices of a connected, undirected, weighted graph with minimum total edge weight. It does not minimize the path between each pair. Distinguish this from shortest-path trees.

Paths, cycles, connected components, strongly connected components and topological order each answer different business questions. Do not select a graph algorithm before defining the question precisely.

## 9. Real backend engineering cases

**Priority-based task admission:** requirements may specify ordering by priority, fairness on ties and bounded capacity. A priority queue can be studied, but a PRD states observable ordering and overload outcomes; Codex decides representation and concurrency control.

**Deployment prerequisite planning:** if service B requires artifact A and service C requires B, cycles must be rejected and independent prerequisites may execute in any valid order. Requirements concern DAG validity, not prescribed data structures.

**Authorization relationships:** a member can belong to multiple teams; a tree assumption loses relationships. Graph reachability alone is not an authorization policy. Security rules and tenant boundaries must be defined separately.

**Catalog category navigation:** hierarchy can be tree-shaped or DAG-shaped depending on whether categories may have multiple parents. Decide with product stakeholders before choosing structure.

## 10. Typical mistakes and counterexamples

1. “Every binary tree is sorted.” False: BST ordering is extra.
2. “Heap gives sorted iteration.” False: only parent/child priority is constrained.
3. “Every graph has a topological order.” False: cycles prohibit it.
4. “BFS gives shortest weighted route.” False in general.
5. “BST operations are always logarithmic.” False for unbalanced trees.
6. “DFS and BFS visit vertices in a unique order.” False when multiple neighbors are available.
7. “Tree is just a DAG.” A rooted tree has additional structural constraints.
8. “Same Big O means equal speed.” False due to allocation, locality and constant costs.
9. “A dependency edge’s direction is obvious.” False: name it in the contract.
10. “A graph algorithm's mathematical correctness automatically handles missing IDs and malformed data.” False: validation is separate.

## 11. Exercises (attempt before reading answers)

1. Draw a rooted tree with six vertices. State root, height (in edges), leaves and number of edges.
2. On the example binary tree, write preorder, inorder, postorder and level order.
3. Explain why searching a naïve BST built from ascending numbers can cost Θ(n).
4. Trace the min-heap after inserting 5,2,9,1 and verify every parent/child inequality.
5. Explain why scanning for a random heap element cannot rely on BST binary search.
6. For a sparse graph with V=1,000 and E=2,000, compare adjacency-list and matrix space asymptotically.
7. Give a graph where BFS and DFS reach the same vertices but in different orders.
8. A→B, B→C, C→A: can it have a topological order? Show the obstruction.
9. A→C and B→C: is this a valid DAG? Is C allowed to have two prerequisites?
10. Explain the difference between shortest path and minimum spanning tree.
11. Describe a backend feature that needs a graph rather than a strict rooted tree and explain why.
12. Define acceptance tests for task dependencies without prescribing a graph algorithm.
13. A graph contains a reference to vertex Z but Z isn't defined. Which contract decisions are possible?
14. Why do two independently valid queues (priority and FIFO) not imply fairness without an explicit policy?

### Answer guide

1. Any six-node undirected tree has five edges. Root, leaves and height depend on your drawing.
2. Preorder 8,3,1,6,4,7,10,14; inorder 1,3,4,6,7,8,10,14; postorder 1,4,7,6,3,14,10,8; level 8,3,10,1,6,14,4,7.
3. Every successive node can become the previous node's right child, giving height n−1.
4. One valid array representation after insertion is [1,2,9,5]; pops yield 1,2,5,9.
5. Heap order restricts each node only relative to descendants along parent edges, not a global left/right search order.
6. Lists Θ(V+E) = Θ(3,000) entries up to constants; matrix Θ(V²) = Θ(1,000,000) cells.
7. A→B,C, B→D, C→E suffices; traversal neighbor order/stack behavior affects DFS order.
8. No. Every vertex in the cycle has an incoming edge from within it, leaving none available first.
9. Yes; C can have two incoming edges in a DAG.
10. Shortest path optimizes one route (or routes from a source); spanning tree minimizes total connectivity edge weight across all vertices.
11. Multi-team membership or workflows with shared prerequisites cannot be modeled as a strict single-parent hierarchy.
12. Test rejected cycles, correct readiness, missing dependencies, completion transitions and consistent outcomes under equivalent requests.
13. Reject, auto-create under explicit rules or allow external references; choose according to product contract, never silently.
14. Fairness requires a specified scheduling policy and is not guaranteed by data-structure names.

## 12. Self-assessment and next steps

Before proceeding, you should be able to trace heap operations by hand, derive O(h) BST costs, explain when BFS shortest-path claims hold, distinguish graph and tree invariants, and defend topological sorting's correctness without memorizing code.

References for detailed study:
- Cormen, Leiserson, Rivest & Stein, *Introduction to Algorithms* — BSTs, heaps, BFS/DFS and graph algorithms.
- Sedgewick & Wayne, *Algorithms* — search trees, priority queues and graph representation.
- MIT OpenCourseWare 6.006: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
- ECMAScript: https://tc39.es/ecma262/

**Coverage:** tree vocabulary/traversal ✓; BST and balance ✓; heap ✓; graph models ✓; BFS/DFS ✓; DAG/cycle/topological order ✓; weighted graph problem boundaries ✓; worked examples ✓; exercises ✓. **Pending:** learner review, external code execution and measurements. **Next chapter:** 04 — Algorithmic Problem-Solving.
