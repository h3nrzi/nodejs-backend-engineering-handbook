# Chapter 01 — Values, Types and Coercion

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Learning assessments:** deferred until explicit study phase  
**Examples:** educational; not independently executed

## Outcomes and prerequisites

Prerequisite: basic reading of JavaScript expressions. After studying, the learner should be able to distinguish values and variables, primitive and object types, predict conversions and equality behavior, explain missing values and numeric limits, and defend explicit input parsing at backend boundaries.

## 1. Values, expressions and types

A **value** is the result of evaluating an expression. A variable is a binding that can refer to a value; the binding name is not itself the value's type. JavaScript is dynamically typed: values have language types and a binding can later refer to a value of a different type.

```js
let input = 42;
input = "42"; // valid JS; type belongs to each value
```

The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, BigInt and Object. Seven are primitive types; Object is non-primitive. Functions are callable objects, and arrays are objects. JavaScript values are not the same as TypeScript's compile-time annotations (covered deeply in Chapter 11).

A primitive is not a mutable container of properties in the way an object is. Strings behave as immutable values even though they support property access and methods.

```js
const a = "hello";
const b = a.toUpperCase(); // "HELLO"; a still "hello"
const obj = { count: 1 };
const alias = obj;
alias.count = 2; // obj.count becomes 2
```

**Identity versus structure:** two separately created objects are unequal under ordinary identity comparison even if their properties match. Two primitives of the same value often compare equal, with important numeric corner cases.

## 2. typeof and reliable classification

```js
typeof undefined;        // "undefined"
typeof null;             // "object" — legacy quirk, not true null objecthood
typeof 1;                // "number"
typeof 1n;               // "bigint"
typeof "x";              // "string"
typeof Symbol("id");     // "symbol"
typeof (() => {});       // "function" — callable object
typeof [];               // "object"
Array.isArray([]);       // true
```

Avoid using `typeof value === "object"` as proof of a safe record: null, arrays and many built-in values also fit that result. Type guards must validate the shape and properties actually needed.

## 3. Absent values: undefined, null and missing properties

`undefined` is frequently produced by absent object properties or a function without an explicit return. `null` is an intentionally expressible null value. Neither automatically means the same business thing as “not supplied,” “unknown” or “clear the value.”

```js
const account = { nickname: undefined };
"nickname" in account;         // true
Object.hasOwn(account, "nickname"); // true
Object.hasOwn({}, "nickname"); // false
account.nickname === undefined; // true
({}).nickname === undefined;    // true
```

Reading a missing property and a present property whose value is `undefined` can look the same, but their presence differs. For PATCH-like commands, the product contract must distinguish omission from explicit clearing where needed. JSON has additional serialization rules: `JSON.stringify({ x: undefined })` is `"{}"`; `JSON.stringify([undefined])` is `"[null]"`.

Use `??` for a default only when null or undefined should trigger fallback; `||` also treats 0, false and empty string as fallback cases:

```js
const limit = 0;
limit || 10; // 10
limit ?? 10; // 0
```

## 4. Truthiness and Boolean coercion

All objects, including empty arrays and empty objects, are truthy. The falsy values include `false`, `0`, `-0`, `0n`, `NaN`, empty string, `null`, and `undefined` (plus the legacy host-defined `document.all` anomaly in browser environments).

```js
Boolean("false"); // true
Boolean("0");     // true
Boolean([]);      // true
Boolean({});      // true
Boolean("");      // false
```

Practical pitfall: `if (request.query.enabled)` cannot safely interpret a string such as `"false"`. Define allowed values and parse them deliberately.

`&&` and `||` return one of their operand values, not necessarily Boolean results. `!x` and `Boolean(x)` convert to Boolean.

## 5. Explicit and implicit conversion

Conversions may happen at operators, comparisons and APIs. Prefer visible parsing at external boundaries.

```js
"5" + 2;         // "52" (string concatenation)
"5" - 2;         // 3 (numeric conversion)
Number("");      // 0
Number(null);    // 0
Number(undefined); // NaN
parseInt("12px", 10); // 12; partial parsing can hide invalid input
Number("12px");  // NaN
String(null);    // "null"
```

`Number()` is not a general-purpose validator for user input. It accepts representations you may not intend, including whitespace-only strings, and may round large integers. Strict parsing means separately specifying allowed syntax, range, units, and whether leading/trailing whitespace is permitted.

Objects can define conversion behavior through `Symbol.toPrimitive`, `valueOf` and `toString`. Do not assume an arbitrary object can be safely converted to a meaningful numeric identifier.

## 6. Equality and identity

`===` checks strict equality without cross-type numeric/string conversion. `==` applies abstract equality rules and can yield surprises. Prefer `===` except when a deliberately documented rule calls for different semantics.

```js
0 === "0";       // false
0 == "0";        // true
null == undefined; // true
null === undefined; // false
[] == false;     // true
[] === false;    // false
({}) === ({});   // false
```

There are multiple equality relations in JavaScript. `Object.is(NaN, NaN)` is true whereas `NaN === NaN` is false; `Object.is(-0, 0)` is false whereas `-0 === 0` is true. `Map` and `Set` use SameValueZero for key matching, so they treat `NaN` as matching itself and positive/negative zero as equal.

Never infer deep structural equality from `===` on two distinct objects; it compares identity.

## 7. Numbers: IEEE 754, NaN and infinity

JavaScript `Number` values use binary64 floating-point representation. Not all decimal fractions are exactly representable:

```js
0.1 + 0.2 === 0.3;   // false
Number.isNaN(NaN);   // true
NaN === NaN;         // false
1 / 0;               // Infinity
Number.isFinite(1 / 0); // false
```

All integers between `-(2**53 - 1)` and `2**53 - 1` are exactly representable, but values beyond the safe-integer range may lose distinctness. `Number.isSafeInteger(value)` is useful when accepting IDs or integer quantities, but decimal currency requires a documented money representation and rounding policy—not unexamined binary floating point.

`Number.isNaN()` does not coerce, unlike global `isNaN()`. Distinguish `NaN` (“not a number” as a numeric result) from an exception, missing input and string validation failure.

## 8. BigInt and mixed arithmetic

`BigInt` represents integers of arbitrary precision subject to available resources, not decimals. Most ordinary Number/BigInt arithmetic cannot mix directly:

```js
const exact = 9007199254740993n;
exact + 1n;  // 9007199254740994n
// exact + 1; // TypeError
Number(exact); // may lose precision
JSON.stringify({ id: exact }); // TypeError by default
```

BigInt division truncates toward zero, and a BigInt literal ends in `n`. Document conversion and serialization explicitly when APIs or persistence boundaries expose large integers.

## 9. Property keys, Symbols and object references

Ordinary object property keys are strings or symbols; numeric keys are converted to strings. Symbols enable unique keys even when descriptions match. `Symbol("x") !== Symbol("x")`. Object identity matters for `Map` keys: separately constructed objects do not refer to the same key.

When copying objects, know the difference between a shallow copy and a cloned nested structure:

```js
const source = { profile: { visible: true } };
const shallow = { ...source };
shallow.profile.visible = false;
source.profile.visible; // false
```

Mutability and ownership contracts matter for backend request handling, caches and shared utilities; full collection semantics are covered in Chapter 05.

## 10. Backend boundary: safe parsing example

Treat untrusted values as `unknown` until validated. A query string is not automatically a number merely because its semantic name is `limit`.

```ts
function parsePositiveLimit(input: unknown): number {
  if (typeof input !== "string" || !/^[1-9][0-9]*$/.test(input)) {
    throw new Error("limit must be a positive decimal integer");
  }
  const result = Number(input);
  if (!Number.isSafeInteger(result) || result > 1000) {
    throw new Error("limit out of range");
  }
  return result;
}
```

This intentionally rejects whitespace, `"0"`, signs, decimal points, arrays, `null`, `undefined`, and unsafe integers. These are **illustrative product policy choices**, not universally required rules. TypeScript annotations disappear at runtime; explicit checks remain necessary.

## 11. Advanced distinctions and trade-offs

- **Comparison algorithms:** `===`, `Object.is`, and collection key equality are distinct; choose the one matching domain requirements.
- **Coercion versus validation:** permissive conversion can be convenient internally but dangerous at security and data boundaries.
- **Representation:** use precise integer types or string identifiers where exactness matters; define serialization.
- **Shape checks:** `typeof` and type assertions do not prove deep validity.
- **Compatibility:** language specification behavior differs from host APIs; platform-specific quirks must be labeled.

## 12. Common mistakes and debugging checklist

- Treating `typeof null` as evidence null has object properties.
- Using `||` to default valid `0` or `false`.
- Reading `"false"` as falsy.
- Relying on `parseInt` accepting an entire user-supplied number.
- Comparing object contents with `===`.
- Ignoring `NaN`, infinity, signed zero and integer precision.
- Mixing Number and BigInt without explicit conversion policy.
- Assuming a TS type annotation validates an HTTP request or JSON response.
- Treating missing, explicitly null and present-but-undefined fields as interchangeable.

## 13. Exercises — for future study, not active assessment

1. Predict `typeof null`, `Boolean([])`, `0 ?? 10`, `0 || 10`, `NaN === NaN`, and `Object.is(-0, 0)`. Explain each result.
2. Explain why `{ value: undefined }` and `{}` behave alike on property read but differ under `Object.hasOwn`.
3. Design input rules for an optional pagination limit; decide how to handle missing, null, empty string, `"0"`, `"10"` and `"10px"`.
4. Explain why `"9007199254740993"` should not be blindly accepted through `Number()` as an exact identifier.
5. Compare separate equal-shaped objects as Set entries; explain why two entries can remain.
6. Propose an API contract for serializing an integer that might exceed Number's safe range.

**Answer guide:** (1) `"object"`, true, 0, 10, false, false. (2) presence differs. (3) contract-dependent; parsing must be explicit and testable. (4) precision loss. (5) identity comparison. (6) use documented string representation or another explicit representation with validation.

## 14. Reliable references and version notes

- [ECMA-262 — ECMAScript Language Specification](https://tc39.es/ecma262/): language types, conversions, equality, Number and BigInt.
- [MDN — JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).
- [MDN — Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
- [MDN — Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
- [MDN — BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

Language features above use established ECMAScript behavior; specific compiler settings and host/runtime APIs are deliberately not selected. References should be rechecked during future study if specifications evolve.

## 15. Editorial coverage and review gate

Covered: values/types; primitive vs object identity; typeof; null/undefined/missing; coercion and parsing; truthiness; equality variants; Number/NaN/infinity/safe integers; BigInt; shallow references; server input validation; examples and exercises.

**Pending review:** learner editorial approval, independent execution of sample snippets, and any improvements to reference coverage. This draft is **not** evidence of learning assessment, production correctness, or a shipped project.
