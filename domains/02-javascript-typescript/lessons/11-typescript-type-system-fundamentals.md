# Chapter 11 — TypeScript Type System Fundamentals

**Domain:** D02 — JavaScript & TypeScript  
**Status:** drafted_pending_learner_review  
**Study assessment:** deferred until explicit learning phase  
**Code examples:** educational, not independently executed

## Outcomes and prerequisites

Requires D02 Chapters 01–10, especially values, functions, objects, modules and async semantics. The learner should eventually explain the relationship between TypeScript and JavaScript, type inference, annotations, structural compatibility, unknown/any/never, object and function types, literal inference, readonly, and the limits of compile-time checking at runtime.

## 1. What TypeScript does—and does not do

TypeScript adds a static type checker to JavaScript. Its types are largely erased during compilation. An annotation can reveal mistakes before execution, but it does not validate incoming HTTP payloads, protect runtime object fields, or create a different JavaScript execution model.

~~~ts
function formatId(id: string): string {
  return id.trim();
}
// formatId(42); // static type error
~~~

If untrusted JavaScript bypasses the declared contract, runtime failures remain possible. TypeScript aims to model JavaScript behavior, not replace boundary validation.

## 2. Inference versus annotations

The checker infers types from initialization and control flow. Use annotations to describe stable public contracts, guide ambiguous code and make intent visible; avoid redundant annotations where inference is clear.

~~~ts
const city = "Tehran";      // literal-aware inference
let count = 0;             // generally number
const ids: string[] = [];
ids.push("u1");
~~~

Inference can widen literals to primitive types when a mutable binding is expected. Assigning a string to a variable inferred as number produces a compile-time error, even though analogous plain JavaScript reassignment is legal.

## 3. Primitive, literal and union types

Common primitives include string, number, boolean, bigint, symbol, null and undefined. Literal types can express exact permitted values; unions offer alternatives.

~~~ts
type AppointmentState = "pending" | "confirmed" | "cancelled";
let state: AppointmentState = "pending";
state = "confirmed";
// state = "archived"; // static error
~~~

A union is a compile-time constraint, not automatic parsing. The product still needs runtime rules for unknown external strings. Narrowing and discriminated domain models are treated in Chapter 12.

## 4. Arrays, tuples and readonly

~~~ts
const tags: string[] = ["new", "vip"];
const coordinates: readonly [number, number] = [35.7, 51.4];
// coordinates[0] = 0; // compile-time error
~~~

Tuples describe per-position types and sometimes length constraints; ordinary arrays describe homogeneous element expectations. The readonly modifier prevents certain writes through a typed reference but is not deep runtime immutability or Object.freeze.

## 5. Object types and optional properties

~~~ts
interface Customer {
  id: string;
  name?: string;
  active: boolean;
}
const customer: Customer = { id: "c1", active: true };
~~~

An optional property is permitted to be absent. Its read value commonly includes undefined. Missing, explicitly undefined and null may represent different business states; compiler settings such as exactOptionalPropertyTypes affect assignment rules. Type declarations alone cannot establish property presence at runtime.

## 6. Structural compatibility

TypeScript usually checks whether a value has the required members, rather than requiring a declaration-specific nominal identity.

~~~ts
type Identified = { id: string };
const record = { id: "r1", category: "service" };
const input: Identified = record;
~~~

Fresh object literals undergo excess-property checking in certain assignment contexts, but structural compatibility is not runtime validation. Interfaces and type aliases have different expressiveness and extension affordances; neither universally supersedes the other.

## 7. Function signatures

~~~ts
type Formatter = (value: number) => string;
const format: Formatter = value => String(value);

function apply(value: number, fn: Formatter): string {
  return fn(value);
}
~~~

Parameter and return types help check calls. Functions can throw or produce side effects even when signatures omit those outcomes. Parameter variance and structural assignability have nuanced rules, especially for methods and strictFunctionTypes. TypeScript does not enforce runtime argument counts or coerce values on invocation.

## 8. any, unknown and never

**any** opts out of many checks and can propagate unsound assumptions. **unknown** accepts arbitrary values but requires narrowing before use. **never** describes paths that cannot produce a value and is useful for exhaustive checks.

~~~ts
function parseLabel(value: unknown): string {
  if (typeof value !== "string") throw new TypeError("label");
  return value.trim();
}

function fail(message: string): never {
  throw new Error(message);
}
~~~

Do not cast untrusted data using as SomeType and mistake the assertion for a validator. The unknown-to-validated transition must involve runtime checks.

## 9. Type assertions, non-null assertion and satisfies

~~~ts
type Options = { retries: number };
const options = { retries: 3 } satisfies Options;
~~~

The satisfies operator checks compatibility while preserving useful expression inference. An as assertion instructs the checker to treat an expression as a different type under permitted rules; it does not convert the runtime value. The postfix non-null assertion (!) similarly removes null/undefined concerns only for static checking, and can hide real runtime faults.

## 10. keyof, indexed access and typeof in types

~~~ts
type User = { id: string; score: number };
type UserKey = keyof User;      // "id" | "score"
type Score = User["score"];    // number
const example = { enabled: true, limit: 10 };
type Config = typeof example;   // compile-time query
~~~

The TypeScript type-query typeof operates in type positions; JavaScript typeof is a runtime operator. Indexed access types and keyof support derived contracts without duplicating field definitions.

## 11. Generics preview

~~~ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
const result = first(["a", "b"]); // string | undefined
~~~

Generics preserve relationships across inputs and outputs without forcing everything to unknown or any. A generic type parameter does not prove that data loaded from an API follows a claimed type. Advanced constraints, conditional and mapped types are in Chapter 13.

## 12. Nullability and compiler configuration

Under strictNullChecks, null and undefined are not freely assignable to unrelated types; code must narrow or explicitly accommodate them. noUncheckedIndexedAccess and exactOptionalPropertyTypes can strengthen common boundary assumptions. These compiler options affect the checker, not emitted runtime validation.

A TS project must document its compiler settings; a supposedly safe example can have weaker guarantees under different settings. Chapter 14 covers configuration and interoperability systematically.

## 13. Backend boundary example

~~~ts
type UserInput = { id: string; enabled: boolean };

function parseUserInput(value: unknown): UserInput {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("expected object");
  }
  const record = value as Record<string, unknown>;
  if (typeof record.id !== "string" || typeof record.enabled !== "boolean") {
    throw new TypeError("invalid fields");
  }
  return { id: record.id, enabled: record.enabled };
}
~~~

The assertion to Record<string, unknown> is used only after checking the value is a non-null non-array object. The property types are checked at runtime before constructing a typed result. Production policies might additionally restrict unknown fields, identifier formats, object prototypes or accessor behavior; those decisions belong to the product's input contract.

## 14. Frequent mistakes and trade-offs

- Treating compile-time annotation as runtime validation.
- Using any where unknown would preserve necessary checks.
- Assuming readonly or private always enforces deep runtime immutability/privacy.
- Treating an asserted API response as verified data.
- Confusing TS type-query typeof with JS runtime typeof.
- Ignoring optional property absence versus undefined.
- Assuming structural compatibility is deep equality or branded identity.
- Overcomplicating simple contracts with generics.
- Assuming strict compiler checks are enabled without inspecting tsconfig.

## 15. Future-study exercises (not an assessment now)

1. Explain why annotating an API response type doesn't validate JSON. (Types erased; check at runtime.)
2. Contrast unknown and any for an arbitrary request body. (Unknown forces narrowing.)
3. Explain why an extra field can be accepted through a variable but produce an excess-property error in a fresh literal. (Context-sensitive structural checking.)
4. Explain readonly at compile time versus freezing at runtime. (No automatic freeze.)
5. Compare keyof User and User["score"]. (Keys union versus property type.)
6. Explain why first([]) has possibly undefined result. (No element to return.)
7. Demonstrate the limitation of as UserInput. (No value conversion or runtime verification.)
8. Explain why strictNullChecks and exactOptionalPropertyTypes influence code review. (Different static semantics.)

## 16. References and editorial gate

- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook — More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [TypeScript Handbook — TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript TSConfig — strict](https://www.typescriptlang.org/tsconfig/strict.html)
- [TypeScript Handbook — Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)

**Covered:** inference, annotations, primitive/literal/union types, object/array/tuple types, structural compatibility, functions, any/unknown/never, assertions/satisfies, keyof/type queries, generics preview, nullability/configuration and boundary checks.

**Pending:** learner editorial review; independent execution checks. The project catalog, PRDs and learning assessments remain deferred.
