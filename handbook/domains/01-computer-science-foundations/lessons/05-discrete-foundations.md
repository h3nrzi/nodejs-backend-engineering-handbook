# Chapter 05 — Discrete Foundations for Backend Engineers

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft; pending learner review  
**Prerequisites:** [Chapter 01](01-cost-models-and-correctness.md) through [Chapter 04](04-algorithmic-problem-solving.md)

## Outcomes

After this chapter you should be able to: translate requirements into propositions and predicates; reason with sets, relations, functions and quantifiers; construct counterexamples and small inductive proofs; count possibilities without double-counting; model basic probability and conditional events; recognize graph-theory constraints; and apply these tools to authorization, idempotency, state invariants and backend testing.

Mathematics here is a **reasoning toolkit**, not a mandated architecture for any project's PRD.

## 1. Propositions and Boolean logic

A *proposition* is a statement that is true or false under its stated interpretation. Example: “The authenticated user owns the order” is a proposition after user and order are fixed. A **predicate** contains variables: `Owns(user, order)`.

Operators:
- Negation `¬P`: not P.
- Conjunction `P ∧ Q`: both.
- Disjunction `P ∨ Q`: at least one (inclusive OR).
- Implication `P → Q`: false only when P is true and Q false.
- Biconditional `P ↔ Q`: both directions hold.

| P | Q | P ∧ Q | P ∨ Q | P → Q |
|---|---|---|---|---|
| F | F | F | F | T |
| F | T | F | T | T |
| T | F | F | T | F |
| T | T | T | T | T |

Why implication is true when P is false: it makes no claim about cases where the premise is absent. Confusing `P → Q` with `Q → P` is the fallacy of *affirming the consequent*.

**Backend example.** Let P = “a booking is confirmed” and Q = “the booking has an assigned resource.” Requirement P → Q does **not** mean every assigned resource implies a confirmed booking. A draft can have an assignment without being confirmed.

### Equivalences and De Morgan

`¬(P ∧ Q) ≡ ¬P ∨ ¬Q`; `¬(P ∨ Q) ≡ ¬P ∧ ¬Q`. These are useful when reviewing guard clauses, but short-circuit evaluation and side effects matter in JavaScript: logical expressions have operational behavior beyond mathematical Boolean algebra.

```ts
type Principal = { active: boolean; role: "viewer" | "manager" };
function canManage(user: Principal): boolean {
  return user.active && user.role === "manager";
}
```

This educational rule is deliberately incomplete: a real authorization system must also check resource scope, tenant, policy version and server-side ownership where relevant.

## 2. Quantifiers and precise requirements

Universal `∀x` means “for every x”; existential `∃x` means “there exists at least one x.”

- `∀b ∈ ConfirmedBookings, assigned(b)` — every confirmed booking has an assignment.
- `∃b ∈ Bookings, cancelled(b)` — at least one booking is cancelled.

Negation flips the quantifier:
- `¬∀x P(x) ≡ ∃x ¬P(x)`.
- `¬∃x P(x) ≡ ∀x ¬P(x)`.

A test producing one violating booking disproves a universal requirement. Conversely, passing ten test cases does not mathematically establish it for every possible booking.

**Vacuous truth:** “Every booking in an empty list is confirmed” is logically true. Decide whether the product also requires *existence* of bookings before using that statement as an acceptance criterion.

### Quantifier order matters

`∀user ∃order Owns(user,order)` says each user owns some order. `∃order ∀user Owns(user,order)` says one order is owned by all users. Very different contracts.

## 3. Sets and operations

A set contains distinct elements. Let `A={a,b,c}`, `B={b,c,d}`.

- Union `A ∪ B={a,b,c,d}`.
- Intersection `A ∩ B={b,c}`.
- Difference `A \ B={a}`.
- Symmetric difference `A △ B={a,d}`.
- `A ⊆ B` denotes every member of A is in B.
- The power set `𝒫(A)` contains every subset; for |A|=n there are 2^n subsets.

**Application:** Users who have both `billing:read` and `tenant:member` may be eligible for a query, provided additional policy predicates hold. Set intersection can describe eligibility, but cannot replace resource-level authorization.

```ts
function intersection<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) if (b.has(item)) result.add(item);
  return result;
}
```

This code follows JavaScript `Set` membership semantics (SameValueZero); deep-equivalent objects are not automatically equal. Iteration over `a` is O(|A|), membership cost depends on the implementation's average-access guarantees; don't claim strict constant time from the specification.

## 4. Relations, equivalence and ordering

A binary relation R on A is a subset of `A × A` (ordered pairs). Common properties:

- **Reflexive:** every a relates to itself.
- **Symmetric:** aRb implies bRa.
- **Antisymmetric:** aRb and bRa imply a=b.
- **Transitive:** aRb and bRc imply aRc.

An **equivalence relation** is reflexive, symmetric and transitive; it divides a set into equivalence classes. Example: mobile numbers considered equivalent after a *specified normalization rule*. The normalization itself must be precise, otherwise seemingly equal identifiers may diverge.

A **partial order** is reflexive, antisymmetric and transitive. Some pairs can be incomparable. For example, a dependency reachability relation in a DAG (including self-reachability) forms a partial order with an appropriately defined direction. **Total orders** compare every pair.

**Common mistake:** “Permission relationships are always transitive.” Membership or delegated authorization is transitive only if the actual product policy says so; blindly taking a transitive closure can leak access.

## 5. Functions, injectivity and keys

A mathematical function maps each input in a domain to exactly one output in a codomain.

- **Injective (one-to-one):** different inputs have different outputs.
- **Surjective (onto):** every codomain element is produced.
- **Bijective:** both, enabling an inverse function.

A database identifier generator aims for uniqueness among live records, but collision probability and enforced constraints need examination. A hash function from an enormous input space into a fixed-size output space **cannot** be injective: by the pigeonhole principle at least two different inputs share an output.

In practice, a digest is not an identity guarantee; cryptographic collision resistance and application-level uniqueness are distinct requirements.

## 6. Proof techniques

**Direct proof:** use definitions to derive the conclusion.  
**Contrapositive:** prove `¬Q → ¬P` instead of `P → Q`.  
**Contradiction:** assume the opposite and derive inconsistency.  
**Counterexample:** one case refutes a universal claim.  
**Induction:** show base case and that truth at n implies truth at n+1.

### Induction worked example: triangular sum

Claim for every integer `n ≥ 0`:

`0 + 1 + ... + n = n(n+1)/2`.

Base n=0: both sides zero. Inductive step: assume sum through n is n(n+1)/2. Add n+1:

`n(n+1)/2 + (n+1) = (n+1)(n+2)/2`.

Therefore claim holds for n+1. The induction principle establishes it for every nonnegative integer.

**Backend relevance:** proving a loop invariant or bounding the cumulative number of task comparisons is analogous to induction over processed records. Proofs depend on assumptions; they do not cover network faults or malformed inputs unless those are explicitly modeled.

## 7. Counting and combinatorics

**Rule of product:** if one independent choice has m possibilities and a subsequent choice has n possibilities for every first choice, there are mn ordered combinations.

**Rule of sum:** if alternatives are disjoint, counts add. If not disjoint, subtract their intersection (inclusion-exclusion).

- Permutations of n distinct items: `n!`.
- Ordered selections of k distinct items: `n!/(n-k)!`.
- Unordered k-subsets: `C(n,k)=n!/(k!(n-k)!)`.
- Binary include/exclude decisions over n items: `2^n`.

Example: ten independent Boolean feature flags have 1,024 possible on/off configurations. If flags have dependencies or exclusions, fewer combinations are valid. Counting all combinations isn't equivalent to enumerating and testing them.

### Pigeonhole principle and collision risk

Placing n+1 objects into n buckets guarantees some bucket has at least two. For identifiers drawn from a finite space of size M, enough issued identifiers necessarily collide. Even before exhausting the space, random draws can collide; the next section introduces how probability affects risk.

## 8. Probability foundations

For a finite uniform sample space, `P(A)=|A|/|Ω|`. For general events, `0 ≤ P(A) ≤ 1`, `P(Ω)=1`, and disjoint-event probabilities add.

- Complement: `P(not A)=1-P(A)`.
- Union: `P(A∪B)=P(A)+P(B)-P(A∩B)`.
- Conditional probability, when P(B)>0: `P(A|B)=P(A∩B)/P(B)`.
- Independence: `P(A∩B)=P(A)P(B)`. **Do not assume independence** merely because requests come from different users.

### Expected value

For a discrete random variable X with values xᵢ and probabilities pᵢ, `E[X]=Σxᵢpᵢ`. A lookup with cost 1 on cache hits and cost 100 on misses, with hit probability 0.9, has modeled expected cost `0.9·1+0.1·100=10.9` cost units. This is an illustrative model, not a measurement, and tail latency can remain severe.

### Birthday effect (approximation)

For k independent uniformly random identifiers from M possibilities, probability of *no* collision is exactly:

`∏(i=0 to k−1) (1−i/M)` when k≤M.

For k small relative to M, collision probability is approximately `1−exp(−k(k−1)/(2M))`. This approximation assumes independent uniform draws. Real generators can be biased or correlated; uniqueness checks and collision handling remain important.

## 9. Graph-theory foundations

A graph `G=(V,E)` contains vertices and edges. In an undirected simple graph, the **handshake lemma** states `Σ degree(v)=2|E|` because each edge contributes to two endpoint degrees.

- **Path:** sequence of adjacent vertices.
- **Cycle:** closed path with no repeated internal vertices under the usual simple-cycle convention.
- **Connected component:** maximal mutually reachable set in an undirected graph.
- **Strongly connected component:** maximal subset of a directed graph where every pair is mutually reachable.
- **DAG:** directed graph with no directed cycle, allowing topological ordering.
- **Tree:** connected acyclic undirected graph; |E|=|V|−1.

A dependency system may require acyclicity. But a DAG does not specify how work executes, how failures recover or how concurrent workers coordinate. Those are separate contractual and engineering problems.

### Worked graph example

Tasks A→C, B→C, C→D mean A and B must finish before C, and C before D (by the stated arrow convention). Valid orders include A,B,C,D and B,A,C,D. C,A,B,D is invalid. Adding D→A introduces a cycle and should be rejected if cyclic dependencies are forbidden.

## 10. Formalizing backend invariants

Consider a system with three available seats. Let `confirmed(s)` denote the set of confirmed claims on seat s.

Requirements can be expressed as:

- Capacity safety: `∀s, |confirmed(s)| ≤ 1`.
- Allowed status: `∀booking, status(booking) ∈ {pending, confirmed, cancelled}`.
- Referential consistency: `∀booking with status=confirmed, ∃s seatAssigned(booking,s)`.
- Tenant isolation: `∀request, success(request) → authorized(request.actor, request.resource)`.

These are illustrative **what-must-hold** rules. They do not select database transactions, locks, queues, microservices or any specific way to enforce them. Codex will compare technical solutions later when implementing an approved product PRD.

**Safety versus liveness:** no overbooking is a safety property. Eventually resolving pending claims, under declared availability/fairness conditions, is a liveness property. A system could satisfy safety by rejecting every request but fail the intended product objective; both dimensions deserve explicit acceptance criteria.

## 11. Common reasoning failures

1. Switching the direction of an implication.
2. Assuming `∀` implies there exists an element.
3. Confusing “some” with “all”.
4. Treating a relation as transitive without a policy.
5. Assuming object equality is mathematical set equality in JavaScript.
6. Mistaking a hash digest for a guaranteed unique identifier.
7. Double-counting overlapping alternatives.
8. Assuming independent outcomes in correlated systems.
9. Reporting only average latency instead of tail behavior.
10. Assuming a DAG dictates a scheduling architecture.
11. Treating a tested example as proof of a universal property.
12. Confusing a rule about **what** must hold with a prescription of **how** to enforce it.

## 12. Practical exercises

Try these without reading the answer rubric first.

1. Draw a truth table for `P → Q`. Explain why it is true when P=false.
2. Negate `∀order, valid(order)` using quantifiers.
3. Is “Every failed request was retried” equivalent to “Every retried request failed”? Explain.
4. A list of bookings is empty. Is `∀booking, hasAssignment(booking)` true? What additional requirement might a product need?
5. Given A={1,2,3}, B={3,4}, calculate union, intersection and A\B.
6. Show that relation “same normalized email” is an equivalence relation if normalization is a deterministic function and equality is ordinary equality.
7. Explain why a fixed-length hash cannot map infinitely many inputs injectively.
8. Prove by induction that `1+2+...+n=n(n+1)/2` for n≥1.
9. Count unordered teams of 3 selected from 7 distinct engineers.
10. Given independent events A and B with probabilities 0.2 and 0.4, compute P(A∩B) and P(A∪B).
11. A cache hit costs 2 ms and miss costs 50 ms; if hit rate is 80%, calculate modeled expected latency and explain why it says nothing about p99.
12. For a simple undirected graph with degree sequence (2,2,1,1), how many edges are there?
13. A→B and B→C. If arrows denote prerequisites, is C→A acceptable in a DAG? Why?
14. Express in predicate form: “No user may read a resource from a different tenant unless explicitly authorized by cross-tenant policy.”
15. Construct a counterexample showing that “all confirmed bookings have an assigned seat” alone does not rule out overbooking.
16. Distinguish a safety invariant from a liveness expectation for background jobs.

### Answer guide

1. Implication is false only for P=true and Q=false; a false premise does not violate the conditional.
2. `∃order, ¬valid(order)`.
3. No. `failed→retried` and `retried→failed` are converses.
4. Yes, vacuously. The product may also require existence or successful processing.
5. Union {1,2,3,4}; intersection {3}; difference {1,2}.
6. Equality of normalized outputs is reflexive, symmetric and transitive (provided function is deterministic and defined on the domain).
7. Pigeonhole principle: more possible inputs than fixed output values.
8. Base n=1 holds; append n+1 to the inductive hypothesis to derive (n+1)(n+2)/2.
9. `C(7,3)=35`.
10. Intersection 0.08; union 0.2+0.4−0.08=0.52.
11. `0.8·2+0.2·50=11.6ms`. p99 depends on the latency distribution, not solely the mean.
12. Degree sum 6; edges 3.
13. No: it closes the directed cycle A→B→C→A.
14. One valid form: `∀u,r: readAllowed(u,r) → (tenant(u)=tenant(r) ∨ crossTenantAuthorized(u,r))`.
15. Two different confirmed bookings could each claim the same assigned seat.
16. Safety: a completed job is not marked successful without meeting criteria; liveness: admitted jobs eventually reach terminal outcome under stated service availability/fairness assumptions.

## 13. Mastery assessment and transfer

Before the next chapter, explain without looking up: why implication differs from its converse; how quantifier negation works; when a relation is an equivalence; what assumptions make collision probability calculations valid; how induction proves a loop property; how to express a concurrency invariant without selecting a technical mechanism; and why graph acyclicity is necessary but not sufficient for reliable workflow execution.

Build a small **requirements notebook**, not an implementation project: take three product statements and write formalized predicates, assumptions, one counterexample each, and observable tests. Keep technical remedies out of the PRD.

## References

- Rosen, *Discrete Mathematics and Its Applications*: logic, sets, relations, counting and graphs.
- Lehman, Leighton and Meyer, *Mathematics for Computer Science*: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
- MIT OCW Mathematics for Computer Science: https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/
- Grinstead and Snell, *Introduction to Probability*: https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html
- ECMAScript language semantics: https://tc39.es/ecma262/

**Coverage audit:** logic ✓; quantifiers ✓; sets ✓; relations/functions ✓; proof and induction ✓; counting ✓; probability ✓; graph theory ✓; backend invariants ✓; counterexamples and exercises ✓. **Pending:** learner review and independent verification of educational examples. **Next chapter:** 06 — Computer Architecture and Performance.
