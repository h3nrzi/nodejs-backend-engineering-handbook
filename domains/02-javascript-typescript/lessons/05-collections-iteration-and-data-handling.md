# Chapter 05 — Collections, Iteration and Data Handling

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Assessment:** deferred until the learner explicitly starts studying  
**Examples:** educational; execution not independently verified

## Goals and prerequisites

Prerequisites: values and equality (Chapter 01), closures (02), functions (03), and object/prototype behavior (04). This chapter explains arrays and collection choices, property ordering, iteration protocols and generators, copy versus shared references, and data transformation pitfalls in backend code. The reader should eventually reason about correctness, memory, mutation and semantics—not merely memorize collection methods.

## 1. Arrays: indexed objects, not fixed typed sequences

JavaScript arrays are mutable objects with a special `length` property and integer-index-like properties. They may hold different types and *holes*, which differ from elements explicitly set to `undefined`.

```js
const values = [1, , 3];
values.length; // 3
0 in values; // true
1 in values; // false
values[1]; // undefined
values.push(4);
```

Setting an array index at or beyond its length may extend it; shortening `length` removes elements. `Array.isArray` is preferable to `typeof` for recognizing arrays. Typed arrays are distinct fixed-length, numerically specialized views (details on binary data in D03).

**Backend implication:** a missing element can be indistinguishable from present `undefined` when read, but serialization and iteration may treat them differently.

## 2. Mutating versus non-mutating operations

`push`, `pop`, `splice`, `sort` and `reverse` mutate arrays. `map`, `filter`, `slice`, `concat`, `toSorted`, `toReversed`, `toSpliced` and `with` return new arrays, but are not necessarily deep copies.

```js
const original = [{ score: 3 }, { score: 1 }];
const sorted = original.toSorted((a, b) => a.score - b.score);
sorted[0].score = 9; // also changes the shared object in original
```

The newer copying methods require a compatible ECMAScript implementation; supported environments must be checked during execution. Immutable-style transformations prevent top-level array mutation, not mutations of shared element objects.

## 3. map, filter, reduce, find and some/every

These operations express data-processing intent through callbacks:

```js
const records = [{ active: true, id: "a" }, { active: false, id: "b" }];
const ids = records.filter(r => r.active).map(r => r.id); // ["a"]
const anyInactive = records.some(r => !r.active); // true
const count = records.reduce((n, r) => n + Number(r.active), 0); // 1
```

`map` maps one input position to an output position for visited elements. `filter` includes selected elements; `reduce` accumulates a result. `find` returns the first matching value; `findIndex` its index. Callbacks often receive `(element, index, array)`, which can unexpectedly interact with functions whose signatures use extra arguments:

```js
["10", "10", "10"].map(parseInt); // [10, NaN, 2]
```

Use `x => Number(x)` or `x => parseInt(x, 10)` with explicit syntax/range validation. Some array methods skip holes and others visit them; avoid treating sparse arrays as ordinary dense lists.

## 4. Equality and membership

`includes` uses SameValueZero, matching `NaN` with itself; `indexOf` uses strict equality and does not find `NaN`.

```js
[NaN].includes(NaN); // true
[NaN].indexOf(NaN);  // -1
```

`Set` also uses SameValueZero. Two separately created objects remain distinct members even if they have the same fields. If product equality means the same user ID rather than the same object identity, derive a stable key deliberately.

## 5. Map and Set

`Map` stores keys of any value type and preserves iteration insertion order. `Set` stores unique values according to its equality rule. Neither is a persistent database or a guarantee of synchronization across separate execution contexts.

```js
const counts = new Map();
counts.set("pending", 1);
counts.set("pending", counts.get("pending") + 1);
counts.get("pending"); // 2

const unique = new Set(["a", "a", "b"]);
[...unique]; // ["a", "b"]
```

Objects can be convenient fixed-shape records; `Map` can be clearer for arbitrary user-defined keys and iteration over entries. Map keys compare objects by identity, not structure. Insertion order and re-setting an existing key do not mean the collection sorts its entries.

## 6. WeakMap and WeakSet

A `WeakMap` associates supported object or non-registered symbol keys with values without keeping keys alive merely by their membership. `WeakSet` supports weakly held keys as members. They are not enumerable and have no size property because observable membership must not reveal garbage-collection timing.

```js
const metadata = new WeakMap();
const request = {};
metadata.set(request, { startedAt: 1 });
metadata.get(request); // { startedAt: 1 }
```

Weak collections can support metadata tied to object lifetime, but they are not a universal memory-leak cure. Reachability through other references still matters. Do not build application correctness around when garbage collection occurs.

## 7. Iterable and iterator protocols

An **iterable** provides `[Symbol.iterator]()`, yielding an iterator. An iterator offers a `next()` method returning `{ value, done }`. `for...of`, spread, and many collection constructors consume iterables.

```js
const range = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};
[...range]; // [1, 2, 3]
```

A plain object is not automatically iterable. `for...in` enumerates enumerable string property keys, including inherited ones, so it is generally inappropriate for iterating array values. `for...of` consumes an iterable's values.

Iterator cleanup matters: `for...of` invokes an iterator's `return()` when a loop exits early in applicable cases, permitting resource cleanup. Correct cleanup is not guaranteed by every custom consumer, so iterator contracts should be explicit.

## 8. Generators and lazy production

A generator function creates an iterator whose execution pauses at `yield`. Values are produced on demand rather than eagerly materializing every value.

```js
function* numbers(limit) {
  for (let i = 0; i < limit; i++) yield i;
}
for (const n of numbers(3)) {
  console.log(n); // 0, 1, 2
}
```

A generator can improve memory behavior when it avoids retaining all items, but laziness does not automatically imply lower computational complexity or safe I/O. Infinite iterables require bounded consumers.

## 9. Async iterables and async generators

An async iterable supplies `[Symbol.asyncIterator]()`; `for await...of` awaits successive results. Async generators can yield values after asynchronous work.

```js
async function* fetchPages(fetchPage) {
  let page = 1;
  while (true) {
    const result = await fetchPage(page++);
    if (result.items.length === 0) return;
    yield result.items;
  }
}
```

This simplified example assumes an empty page ends the sequence; many real APIs require explicit cursor or termination semantics. Handling cancellation, errors, concurrent work and cleanup needs additional attention (Chapters 08–10). Do not assume async iteration by itself provides bounded concurrency or automatic cancellation.

## 10. Sorting and comparison contracts

Without a comparator, `sort` compares string representations, potentially surprising numeric expectations.

```js
[2, 10, 1].sort(); // [1, 10, 2]
[2, 10, 1].sort((a, b) => a - b); // [1, 2, 10]
```

A well-behaved comparator should be consistent, antisymmetric, reflexive and transitive under the intended ordering. Impure or inconsistent comparators can produce engine-dependent results. Modern ECMAScript specifies stable Array sorting; this does not fix an invalid comparator.

Be careful with `NaN`, missing fields, locale-sensitive text sorting and data mixed across types. Define the product's sorting rules before comparing results.

## 11. Destructuring, shallow copies and data ownership

Destructuring extracts values, not necessarily copies of referenced objects. Object and array spread produce shallow structures.

```js
const source = { profile: { enabled: true } };
const { profile } = source;
const clone = { ...source };
profile.enabled = false;
clone.profile.enabled; // false
```

For data at an API boundary, define whether transformations mutate supplied data. `structuredClone` may be appropriate for some supported structured values, but it cannot clone every JavaScript value (notably functions), and its availability and supported transfer behavior are host-dependent. JSON round-tripping is not a general deep-clone solution.

## 12. Backend case study: safe grouping and duplicate detection

Suppose records have a stable string `customerId` and positive integer `quantity`. Data validation must precede aggregation.

```ts
type Item = { customerId: string; quantity: number };

function groupQuantities(items: readonly Item[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const item of items) {
    if (!item.customerId || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
      throw new Error("invalid item");
    }
    const next = (totals.get(item.customerId) ?? 0) + item.quantity;
    if (!Number.isSafeInteger(next)) throw new Error("total exceeds safe integer range");
    totals.set(item.customerId, next);
  }
  return totals;
}
```

The typed input describes a static contract, but untrusted JSON still requires actual shape checks before being treated as `Item[]`. The function does not mutate the input array. A Map preserves group keys without an accidental collision with inherited object properties; product requirements may require canonicalizing IDs before grouping.

## 13. Performance, memory and trade-offs

`map` and `filter` can create intermediate arrays. A single loop can reduce intermediate allocations when measurements justify it, but readability and error risk matter. Maps/Sets offer useful expected lookup behavior, not universal measured superiority. Iterators can reduce eager materialization; care is still needed when consumers convert entire streams into arrays.

Do not infer reliable performance from small microbenchmarks; environment, workload, object shapes and allocation patterns matter. More detailed benchmarking, CPU/cache considerations and memory reasoning appear in D01 and D03.

## 14. Common mistakes

- Assuming array holes and explicitly stored `undefined` are identical.
- Calling `sort` on shared input and forgetting it mutates the array.
- Passing `parseInt` directly to `map`.
- Using objects as `Map` keys while expecting deep equality.
- Using `for...in` to iterate array values.
- Treating a generator as proof of bounded memory usage regardless of the consumer.
- Assuming WeakMap entries can be enumerated or observed after GC.
- Mistaking shallow spread or destructuring for deep cloning.
- Relying on TypeScript annotations to validate externally supplied arrays.
- Assuming a returned array of objects cannot mutate shared element objects.

## 15. Exercises for the future study phase

1. Contrast a hole in `[1, , 3]` with an explicit `undefined` element using `in` and indexed reads.
2. Predict `["10", "10", "10"].map(parseInt)` and explain the index argument.
3. Explain why `[NaN].includes(NaN)` and `[NaN].indexOf(NaN)` differ.
4. Design a grouping function keyed by normalized customer IDs; specify validation and integer overflow behavior.
5. Explain why `for...in` may include inherited keys and `for...of` does not enumerate keys.
6. Compare eager array materialization to a generator when processing many records.
7. Show why an array returned by `toSorted` still shares nested objects.
8. Describe which data a WeakMap allows a consumer to inspect and why it cannot expose all its keys.

**Short answer guide:** holes lack an own indexed element; parseInt receives radix 0/1/2 by index; SameValueZero differs from strict equality for NaN; normalization and validation are product-level rules; for...in enumerates string keys; lazy iteration can avoid eager storage; toSorted is shallow; weak collections cannot be enumerated.

Exercises are supplied as future study materials, **not** as an assessment being administered now.

## 16. References and editorial coverage

- [ECMAScript — Indexed Collections](https://tc39.es/ecma262/#sec-indexed-collections)
- [ECMAScript — Keyed Collections](https://tc39.es/ecma262/#sec-keyed-collections)
- [ECMAScript — Iteration](https://tc39.es/ecma262/#sec-iteration)
- [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN — Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [MDN — Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

**Covered:** arrays/sparse elements, array methods and mutation, Map/Set/weak collections, equality and identity, iteration and generators, async iteration, sorting, copying/destructuring, backend validation/grouping and resource trade-offs.

**Pending:** learner editorial review and independent execution checks. No code or learning competency is claimed verified.
