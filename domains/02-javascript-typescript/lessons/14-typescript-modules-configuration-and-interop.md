# Chapter 14 — TypeScript Modules, Configuration and Interop

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Assessment:** deferred until explicit learning phase  
**Examples:** educational; not independently executed

## Goals and prerequisites

Requires Chapters 06 and 11–13: JavaScript modules, types, narrowing and generics. Explain the distinction between source imports, type checking and emitted JavaScript; select compiler settings deliberately; understand module and declaration resolution, type-only imports, JS interoperability and common ESM/CJS mismatches. Runtime-specific Node.js loading algorithms remain in D03.

## 1. Three separate questions

For every TypeScript module ask: (1) can the compiler find its type declarations? (2) what JavaScript does the compiler emit? (3) will the actual runtime or bundler resolve and execute those imports? Success in one does not guarantee the other two.

~~~ts
import type { Customer } from "./contracts.js";
import { normalize } from "./normalize.js";

export function describe(customer: Customer) {
  return normalize(customer.id);
}
~~~

Type-only imports are removed from output. The relative specifier may include a JS extension even though the source file is .ts, depending on compiler module-resolution mode. This syntax is an illustrative Node-style ESM choice, not a universal requirement for every environment.

## 2. tsconfig.json and project boundaries

A tsconfig establishes the compiler input scope and options. Important choices include target, module, moduleResolution, strict, noEmit, declaration, outDir, rootDir, lib and types. No single option set is correct for every runtime/build system.

~~~json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
~~~

This illustrative configuration is suitable only when another supported system handles execution/build or code emission is intentionally disabled. It is not a deployable build recipe. NodeNext behavior depends on file extensions and package metadata; actual support is version-specific.

## 3. Type checking versus emitted files

The checker can produce diagnostics, and the compiler can also transform syntax and emit .js/.d.ts according to settings. Some configurations and compilation tools may emit JavaScript even when type errors exist; distinguish type-check success from emit policy. A bundler's transformation of TS syntax is not necessarily an equivalent substitute for full type checking.

Interfaces and type aliases normally disappear at runtime; enums and some other constructs may produce runtime behavior depending on the syntax and compiler mode. Avoid relying on type-only syntax as a runtime schema.

## 4. Module and moduleResolution

The module option governs module treatment and/or output; moduleResolution governs lookup of dependencies and declarations. For example, NodeNext models Node's ESM/CJS distinction while Bundler mode models bundler-oriented resolution assumptions. Path aliases help the TypeScript checker find source declarations but **do not automatically rewrite runtime import specifiers**.

~~~json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"]
    }
  }
}
~~~

Without runtime/build support for the alias, successfully type-checked imports can still fail at execution. Exact Node package exports, conditions and loader precedence belong in D03.

## 5. ESM/CommonJS boundary

ESM uses import/export with live bindings; CommonJS typically exposes module.exports through require. TypeScript source forms do not erase host distinctions. Interoperability behavior can depend on module settings, runtime version and package declarations.

~~~ts
// TypeScript source (illustrative)
import { parse } from "./parser.js";
export const process = (text: string) => parse(text);
~~~

Do not assume a CommonJS library always supplies native named ESM exports, or that a default import in TypeScript guarantees an identical JavaScript shape at runtime. Check the package contract and inspect emitted output when debugging.

## 6. type-only imports and verbatimModuleSyntax

~~~ts
import type { RecordView } from "./types.js";
import { makeRecord } from "./factory.js";
export type { RecordView } from "./types.js";
~~~

Type-only imports/exports communicate erasure explicitly. verbatimModuleSyntax generally preserves ordinary import/export forms and drops type-only imports, helping align written syntax with emitted semantics. It can surface errors when module syntax conflicts with an output mode instead of silently rewriting the module system. Understand selected target settings before enabling it.

## 7. Declaration files

A .d.ts file describes the type surface of JavaScript code or a published package. It does not contain executable implementations or guarantee the implementation follows the declaration.

~~~ts
// api.d.ts
export declare function parseId(raw: string): string;
~~~

Declaration generation can form an important public contract. If the runtime API changes without corresponding declarations, consumers can be type-checked against false promises. Avoid publishing private implementation types inadvertently.

## 8. Working with JavaScript

allowJs permits including JS files in a TS project; checkJs enables diagnostics for those files. JSDoc can express useful types when migrating incrementally.

~~~js
/** @param {number} amount @returns {number} */
export function double(amount) {
  return amount * 2;
}
~~~

TypeScript can infer types for JS but cannot prove runtime inputs satisfy annotations. A gradual JS-to-TS migration can preserve behavior while progressively improving static coverage; avoid blanket unsafe assertions to make the compiler quiet.

## 9. Third-party libraries and type packages

Some packages ship declarations, while others rely on community-maintained definitions. Type definitions can lag the runtime library, omit branches or disagree with export maps. Always distinguish a package's actual JS entrypoints from its static declarations.

A compiler finding a name in ambient declarations does not prove the API exists in a target runtime. Review supported versions and any host/global types included through lib and types.

## 10. Strictness and safety-related flags

strict enables a family of checks; other useful options may include noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitOverride and noFallthroughCasesInSwitch. Each makes some coding assumptions more explicit but can increase migration effort.

~~~ts
type Flags = { enabled?: boolean };
function interpret(flags: Flags): boolean {
  return flags.enabled ?? false;
}
~~~

An optional property can be absent; assigning explicit undefined may be treated differently under exactOptionalPropertyTypes. These are static constraints and don't sanitize external input.

## 11. Incremental and multi-package projects

Project references and incremental compilation can organize large TS codebases and speed builds under appropriate configurations. Type-checking caches and generated declarations need disciplined invalidation. A package's public API should remain clear even if its implementation is split into many compiler projects.

Do not select monorepo tooling or a build pipeline merely because multiple TS projects are possible. Those decisions are reserved for future project-specific implementation planning.

## 12. Debugging three classes of failure

**Type discovery failure:** Cannot find declaration/module, mismatched types or wrong generic signature. Inspect tsconfig, package declarations and resolution assumptions.

**Emit mismatch:** Output format/extensions differ from what the host expects. Inspect generated JS, not just TS source.

**Runtime resolution/evaluation failure:** Host cannot resolve package export or ESM/CJS interop behaves differently. Reproduce with the actual runtime/build path. Node-specific algorithms belong in D03.

## 13. Backend case study: shared domain contracts

A backend module publishes TypeScript types for request results and ordinary JavaScript validators. Consumers may share the static contract, but external requests still require validation at runtime and no client should trust types merely because a package exports them.

~~~ts
export type LookupResult =
  | { kind: "found"; id: string }
  | { kind: "not_found" };

export function isLookupResult(value: unknown): value is LookupResult {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (record.kind === "found" && typeof record.id === "string")
    || record.kind === "not_found";
}
~~~

This simplified guard is intentionally permissive about unknown properties and does not inspect prototypes. A product contract may demand stricter parsing.

## 14. Common mistakes

- Assuming TS compilation success proves runtime module compatibility.
- Treating paths aliases as automatic emitted specifier rewriting.
- Conflating target, module and moduleResolution.
- Thinking a .d.ts file implements the declared behavior.
- Importing types as runtime values.
- Assuming bundler TS stripping performs complete type checking.
- Relying on synthetic default interop without testing actual exported runtime shape.
- Mistaking strict compiler options for runtime input validation.
- Forgetting TypeScript version and host version affect valid settings.

## 15. Exercises for future study

1. Identify which of type resolution, JS emission and runtime resolution can fail independently. (All three.)
2. Explain why import type disappears from emitted JS. (It exists solely for checking.)
3. Explain why a paths alias can work in the editor but fail under Node. (Runtime specifier not rewritten.)
4. Contrast .ts and .d.ts. (Source and declarations, respectively.)
5. Explain one risk from mismatched runtime package exports and type declarations. (Type-safe call can fail at runtime.)
6. Compare noEmit with build-output requirements. (No JS generated by compiler.)
7. Explain how checkJs can help migration. (Adds checks to JS files.)
8. Explain why NodeNext and Bundler modes must reflect actual execution path. (Different assumptions.)

Exercises are not administered until the learner opts into studying.

## 16. References and editorial gate

- [TypeScript Handbook — Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [TypeScript Handbook — Module Resolution](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [TypeScript TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
- [TypeScript — Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript — JavaScript Projects](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html)
- [TypeScript — Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

**Covered:** tsconfig, module modes, resolution, emit, type-only imports, declaration files, JS interop, package types, strictness, incremental projects and debugging.

**Pending:** learner editorial review; execution verification. Node loader internals reserved for D03; project implementation not started.
