# Chapter 06 — Modules and Package Boundaries

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Assessment:** deferred until the learner explicitly starts studying  
**Examples:** educational, not independently executed

## Prerequisites and learning outcomes

Requires Chapters 01–05, especially lexical scope, functions, objects and references. This chapter introduces modular code, native ECMAScript module bindings, module evaluation, dependencies, cyclic imports, package interfaces and interoperability boundaries. It distinguishes **JavaScript language guarantees** from Node.js-specific resolution/loading rules reserved for D03.

## 1. Why modules exist

Modules give code explicit boundaries: a module may expose public values while keeping implementation details private, describe dependencies and make reuse/testability easier. A module boundary does not automatically create a security sandbox or a separate process. Prefer meaningful exports over exposing every helper.

```js
// tax.mjs
const rate = 0.1;
export function calculateTax(amount) {
  return amount * rate;
}

// checkout.mjs
import { calculateTax } from "./tax.mjs";
console.log(calculateTax(100)); // 10
```

The explicit module specifier names a dependency; exactly how non-relative names are resolved, which file extensions are accepted and how packaging conditions work depends on the host and tools.

## 2. Imports, exports and lexical encapsulation

ES modules are evaluated in strict mode and have their own module scope. Unexported bindings are not directly imported; exports expose named bindings, not arbitrary copied text. Named exports and default exports are distinct interface styles.

```js
// helpers.mjs
export const version = 1;
export function normalize(s) { return s.trim().toLowerCase(); }
export default function describe() { return "helpers"; }

// consumer.mjs
import describe, { normalize, version } from "./helpers.mjs";
```

Re-exports can compose a public module surface:

```js
export { normalize } from "./helpers.mjs";
export * from "./other.mjs";
```

A default export is not re-exported by bare `export *`. Star re-export conflicts can make a requested name ambiguous; avoid relying on unclear barrel exports.

## 3. Live bindings and read-only imports

An imported ESM binding is a **live view** of an exported binding. When the exporting module changes its binding, importers observe the updated value. An importing module cannot reassign the imported binding.

```js
// counter.mjs
export let count = 0;
export function increment() { count += 1; }

// view.mjs
import { count, increment } from "./counter.mjs";
console.log(count); // 0
increment();
console.log(count); // 1
// count = 7; // invalid assignment to an import
```

Live bindings are not the same as making exported objects immutable: consumers can still mutate a shared exported object when its properties are writable. Be careful exposing mutable module-scoped objects in backend services.

## 4. Linking, instantiation and evaluation

Conceptually, ESM dependencies are linked, bindings instantiated, and modules evaluated with dependencies considered. Static imports express dependencies before ordinary module body execution. This helps explain why ESM cycles can be usable for some function exports but fail for access to uninitialized lexical exports.

```js
// a.mjs
import { readB } from "./b.mjs";
export function readA() { return "A"; }
console.log(readB());

// b.mjs
import { readA } from "./a.mjs";
export function readB() { return readA() + "B"; }
```

This example illustrates a cycle that can work due to function declaration initialization. Cyclic relationships become fragile when top-level evaluation accesses values in a temporal dead zone, or when asynchronous evaluation changes ordering. Prefer acyclic dependency direction when possible, but do not claim every circular import is inherently invalid.

## 5. Circular dependency failure example

```js
// left.mjs
import { rightValue } from "./right.mjs";
export const leftValue = rightValue + 1;

// right.mjs
import { leftValue } from "./left.mjs";
export const rightValue = leftValue + 1;
```

Depending on evaluation order, these modules access an uninitialized lexical binding and fail with ReferenceError. The lesson is not that JavaScript supplies a global safe order for arbitrary cycles; correct behavior must be reasoned from the graph and initialization points.

## 6. Dynamic import and asynchronous evaluation

`import(specifier)` is an expression that returns a Promise for a module namespace object. It can be used where dependency loading is conditional or deferred.

```js
async function loadFormatter(kind) {
  if (kind === "compact") {
    const module = await import("./compact.mjs");
    return module.format;
  }
  const module = await import("./full.mjs");
  return module.format;
}
```

Dynamic import is not a permission check. Do not let untrusted inputs freely control module specifiers. Host resolution, supported protocols and execution policy remain environment-dependent.

Top-level `await` is allowed in supported ESM environments and can make dependent module evaluation asynchronous. Initialization failures and cyclic async evaluation require careful treatment; do not move irreversible business side effects into module initialization without considering failures and retries.

## 7. Namespace objects and export design

`import * as namespace from "./module.mjs"` yields a module namespace object with access to the module's exported names. Import bindings cannot be arbitrarily reassigned through it. Exposing a giant namespace is convenient but can obscure dependencies and increase coupling. Prefer small, stable contracts and explicit names when clarity matters.

Avoid relying on object serialization, `Object.assign`, or destructuring snapshots to preserve *live binding* behavior: a copied property value is not necessarily a live import.

## 8. ESM versus CommonJS concepts

ECMAScript modules use standardized `import`/`export` bindings. CommonJS uses `require`, `module.exports` and an execution/wrapping model defined by hosts such as Node.js, not by ECMA-262. Their cycles, evaluation timing, caching and interop can differ.

```js
// CommonJS conceptual example
const helper = require("./helper.cjs");
module.exports = { execute: helper.execute };
```

Do not assume ESM named-export behavior is identical to destructuring `require` results. Whether importing CommonJS into ESM exposes synthetic names or a default value depends on the runtime; detailed Node.js dual-module semantics and package resolution belong in D03.

## 9. Package public interfaces

A **package boundary** is a contract for callers: public entrypoints, export names, types, runtime behavior, version compatibility and documented failure modes. Users should not need knowledge of internal directory structure.

Desirable contracts include:
- Specific public imports and documented stability.
- Explicit supported environments and module formats.
- Clear semantics of synchronous vs asynchronous initialization.
- No reliance on internal deep-import paths unless explicitly supported.
- Honest compatibility notes for breaking changes.

Packages may publish metadata such as exports, types and supported environments, but their exact host/tool interpretation is covered later. This lesson does not prescribe a build tool or package manager.

## 10. Dependency direction and side effects

Importing a module may evaluate its top-level code. Hidden startup side effects (opening connections, registering global handlers, reading mutable global configuration) complicate tests and error recovery.

```js
// More controllable: setup occurs when explicitly invoked
export function makeReporter(write) {
  return { report(message) { return write(message); } };
}
```

Passing collaborators explicitly reduces hidden coupling. It is not the only valid pattern, and this example does not select the architecture of a future product. Dependency cycles in application design should be understood separately from language module-evaluation cycles.

## 11. TypeScript interfaces across modules

```ts
// contracts.ts
export type RecordId = string;
export interface RecordView { id: RecordId; label: string }

// service.ts
import type { RecordView } from "./contracts";
export function formatRecord(r: RecordView): string {
  return r.label;
}
```

`import type` denotes a type-only dependency erased from emitted JavaScript under appropriate compilation semantics. Types/interfaces cannot be used as runtime validators. TypeScript module targets, type declarations, path aliases and ESM/CJS emit options are analyzed in Chapter 14.

## 12. Testing module behavior and failure modes

A module test should account for shared module state, initialization side effects, export changes and cache-related isolation assumptions. A test suite that shares one module instance may see state retained between tests. Isolating modules is tool/runtime-specific; describe isolation requirements without pretending that each `import` produces a fresh independent instance.

Backend scenarios include configuration modules, request-local contexts, plugin-like extension interfaces and long-running singleton objects. A module may be loaded once per host-defined module identity and subsequently reused; never equate module scope with request scope.

## 13. Common mistakes

- Treating imports as ordinary snapshots rather than live ESM bindings.
- Assuming a writable property of an exported object is protected by a read-only import binding.
- Believing every circular dependency throws, or believing all cycles are safe.
- Confusing native ESM semantics with a particular Node.js loader or bundler.
- Assuming top-level `await` has no effect on dependent initialization.
- Treating dynamic import as a security boundary.
- Publishing undocumented deep imports as though they were stable package APIs.
- Assuming TypeScript import aliases necessarily work at runtime.
- Letting module-level mutable state accidentally cross request boundaries.
- Equating type-only exports with runtime objects.

## 14. Future-study exercises and answers

1. Explain why `count` changes in the importing module after `increment()`.
2. Contrast a live imported binding and a copied primitive: `const snapshot = count`.
3. Identify why the two `const` initializers in a cycle can throw.
4. Give a circular import where calls are deferred until after evaluation; explain the critical condition.
5. Describe why a dynamically constructed import path from untrusted input is risky.
6. Compare ESM and CommonJS exports without assuming identical interop.
7. Explain how `import type` changes emitted JavaScript and why it cannot validate a JSON payload.
8. List two hazards from performing I/O at module import time.
9. Explain why module-scoped state can outlive a single HTTP request.

**Answer guide:** imports are live views; snapshots are ordinary values; TDZ ordering can fail; defer reads until initialization completes; guard exposed module specifiers; module systems differ; types erase; top-level side effects hurt predictability and recovery; module and request lifetimes differ.

Exercises are reference material for the future learning phase, not a current quiz.

## 15. Sources and version considerations

- [ECMAScript — Modules](https://tc39.es/ecma262/#sec-modules)
- [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN — import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN — export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [MDN — import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [TypeScript Handbook — Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Node.js — Modules overview](https://nodejs.org/api/modules.html) (runtime-specific follow-up in D03).

Language-level semantics are distinct from host module loading and package resolution. Code samples have not been independently run, and no specific Node version, loader or build tool is assumed.

## 16. Editorial coverage and gate

Covered: scope/encapsulation, import/export styles, binding liveness, module lifecycle, circular dependencies, dynamic imports, top-level await, namespace imports, CommonJS comparison, package interface design, side-effect boundaries, TS type-only imports and failure cases.

**Pending:** learner editorial approval; independent code-example verification. Neither product PRDs nor implementation nor the learning assessment have started.
