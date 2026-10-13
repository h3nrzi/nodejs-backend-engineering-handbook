# Chapter 13 — Module Resolution and Runtime Loading

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C13  
**Editorial status:** approved_by_learner — explicitly confirmed 2026-10-13.  
**Prerequisite approval:** D03 Chapters 01–12 learner-approved; Chapter 12 explicitly approved on 2026-10-13.  
**Educational execution:** Section 17 records 27 checked invocations (nine fixture entry points, three runs each) on Node v22.16.0 / Linux x64. One intentionally failing ESM cycle is a **passed negative-path check**, not a successful application run.  
**Study assessment / project implementation:** deferred / not_started.

## 1. Outcomes, prerequisites and scope

A learner should be able to:

1. Distinguish a **specifier**, the **resolved file or URL**, its **module format**, loading, linking, evaluation, and an observable export.
2. Explain how the nearest package boundary, `"type"`, `.mjs`, `.cjs` and ambiguous `.js` affect host interpretation.
3. Diagnose relative ESM imports without extensions versus CommonJS extension/directory probing.
4. Identify public package entries defined by `"exports"`, private package mappings defined by `"imports"`, and conditional `"import"`/`"require"` targets.
5. Explain CommonJS and ESM caching, URL identity, duplicate evaluation and circular-dependency hazards.
6. Describe dynamic import, CommonJS/ESM interop, JSON import attributes and top-level `await` constraints without assuming all versions behave identically.
7. Separate **TypeScript's type-check-time path interpretation** and bundler rewriting from **Node's actual runtime resolution**.
8. Investigate a backend startup failure without inventing package-manager, architecture or product guarantees.

Prerequisites: [Chapter 02 — Startup, Configuration and Runtime Identity](02-startup-configuration-and-runtime-identity.md), [Chapter 04 — Scheduling Queues and Timers](04-scheduling-queues-and-timers.md), [Chapter 11 — Worker Threads and Data Ownership](11-worker-threads-and-data-ownership.md) and D02's [module/package boundaries](../../02-javascript-typescript/lessons/06-modules-and-package-boundaries.md) and [TypeScript modules and interop](../../02-javascript-typescript/lessons/14-typescript-modules-configuration-and-interop.md).

This chapter teaches **the Node.js host's module mechanisms**. It does not select ESM versus CJS, a compiler, a bundler, a module loader hook, a package manager, a directory layout or an implementation topology for any portfolio PRD. Runtime capability claims here are **pinned to Node v22.16.0**, with version-dependent behavior clearly identified.

## 2. First principles: import text does not identify a module by itself

Consider `import 'example-package'`. That string is a **specifier**. Before running package code, Node must determine **where** the specifier points, **what format** the target has and **how to link or evaluate** it.

Use this causal model:

```text
Import or require call + parent module URL/file + process/package context
            |
      Resolve specifier
            |  -> failure? NOT_FOUND / PACKAGE_PATH_NOT_EXPORTED / invalid specifier
      Obtain resource and determine module format
            |  -> failure? wrong syntax, unsupported extension or missing import attribute
      Link dependencies / prepare records
            |  -> failure? missing named export, circular access or linking error
      Evaluate module graph
            |  -> failure? exception, top-level await delay/failure, partial CJS cycle
      Return namespace / exports / Promise
```

These are **responsibility stages**, not a complete internal stack trace. Resolution can be influenced by a package's metadata, file extension, conditions and the parent module. Loading and evaluation differ between CJS and ESM. A diagnostic like `ERR_MODULE_NOT_FOUND` is evidence about one step; a `ReferenceError` during a cycle is evidence about a different step.

Do not equate **module resolved** with **module executed**, **module executed** with **application initialized safely**, or **TypeScript compiled** with **Node loaded the emitted JavaScript**. Modules can execute side effects before an entry module's first visible statement because dependency evaluation occurs before that statement.

## 3. Two host loaders, two important sets of defaults

| Concern | CommonJS (`require`) | ECMAScript modules (`import`) |
|---|---|---|
| Ordinary loader entry | Synchronous `require(specifier)` | Static `import` links a graph; `import(specifier)` is dynamic and Promise-based |
| Relative file spelling | Tries supported extension/legacy folder resolution under documented rules | Requires full extension for relative/absolute file specifiers; no implicit `./folder/index.js` |
| Module identity/cache | CommonJS `require.cache`, generally resolved filenames | Separate ESM module graph cache; URLs (including queries/fragments) matter |
| Export values | Mutable `module.exports` result; partially initialized objects possible during cycles | Exported bindings, namespace objects, linking and temporal initialization rules |
| `require`, `__dirname`, `__filename` | Provided in CJS wrapper | Not automatic ESM globals; use `import.meta`, `createRequire` where needed |
| Native JSON handling | `require('./file.json')` under CJS rules | JSON imports require `with { type: 'json' }` in tested Node v22.16.0 |
| Existing built-ins | Can use `require('node:fs')` | Can use `import ... from 'node:fs'` |

The ESM loader and CJS loader are **interoperable but distinct**. It is incorrect to treat `require.cache` as the ESM cache, `module.exports` as a live ESM named-export object, or Node's `"type"` as a TypeScript type-checking option.

The CJS loader can resolve extensionless paths and legacy folders; the ESM loader intentionally does not apply the same guessing rules. For explicit configuration and long-lived packages, avoid depending on ambiguous defaults. [Node v22.16.0 packages](https://nodejs.org/download/release/v22.16.0/docs/api/packages.html), [ES modules](https://nodejs.org/download/release/v22.16.0/docs/api/esm.html), [CommonJS modules](https://nodejs.org/download/release/v22.16.0/docs/api/modules.html).

## 4. Source interpretation: explicit markers and package scopes

The nearest enclosing `package.json` establishes the **package scope**, subject to nested boundaries. Within that scope, the `"type"` field describes how Node treats ordinary `.js` files:

- `"type": "module"`: ordinary `.js` is ESM in that package scope.
- `"type": "commonjs"`: ordinary `.js` is CommonJS.
- `.mjs`: ESM regardless of surrounding `"type"`.
- `.cjs`: CommonJS regardless of surrounding `"type"`.

A nested package with its own `package.json` creates another boundary. The same filename and source syntax can have different meaning if moved into another package scope.

**Version-sensitive ambiguity:** in Node v22.16.0, some ambiguous `.js` inputs without an explicit module marker can be inspected for ESM syntax; this syntax detection was enabled by default in Node 22.7. It is not safe to teach a universal “no `type` always means CJS” rule across all entry contexts and versions. `import()` alone is allowed inside CommonJS and does not necessarily make a file ESM. Explicit `"type"` and/or extensions remove ambiguity. [Node packages: syntax detection](https://nodejs.org/download/release/v22.16.0/docs/api/packages.html#syntax-detection).

**Launch context:** an entry run as `node src/app.mjs` can evaluate imported dependencies before its own entry-body validation. `process.cwd()` and a module's own location remain distinct as taught in Chapter 02. An ESM module can resolve a local file using `new URL('./relative.js', import.meta.url)`, while an operator-supplied cwd-relative path is a different product choice.

## 5. Worked example A — ESM extension requirement versus CJS searching

Create this controlled folder:

```text
scope/
  package.json
  value.js
  a.mjs
commonjs/
  package.json
  value.js
  probe.cjs
```

Files:

```json
// scope/package.json
{"type":"module"}
```

```js
// scope/value.js
export const answer = 42;
```

```js
// scope/a.mjs
import { answer } from './value.js';
console.log(JSON.stringify({ answer }));
try {
  await import('./value'); // deliberately omit the extension
} catch (error) {
  console.log('missingExtension', error.code);
}
```

```json
// commonjs/package.json
{"type":"commonjs"}
```

```js
// commonjs/value.js
module.exports = { value: 42 };
```

```js
// commonjs/probe.cjs
const value = require('./value'); // CJS probes supported extensions
console.log('cjs-extension-search', value.value);
```

Run `node scope/a.mjs` and `node commonjs/probe.cjs` from their parent directory. In three checked executions of each:

```text
{"answer":42}
missingExtension ERR_MODULE_NOT_FOUND
cjs-extension-search 42
```

**Why:** `./value.js` resolves explicitly in ESM. `./value` in ESM does not search for `.js` and fails, whereas CJS `require('./value')` looks for supported extensions and finds `value.js`.

**Counterexample to avoid:** adding a TypeScript path alias or changing the working directory does not automatically change the ESM relative-extension contract. The relative specifier is anchored to the importing module. Do not silently “fix” errors by enabling an undocumented resolution hook for a production project.

The observed `ERR_MODULE_NOT_FOUND` is a host error for this particular failed import; it is not a business-level 404 or evidence that the file contents were evaluated.

## 6. Worked example B — conditional exports, public subpaths and private imports

A package's `"exports"` can expose only approved entry paths and dispatch based on loader conditions. It also means that merely knowing a file exists on disk does **not** grant importers the right to address it through the package's public specifier. `"imports"` defines `#`-prefixed mappings **within that package's own scope**.

Construct this synthetic package:

```text
node_modules/handbook-fixture/
  package.json
  index.mjs
  index.cjs
  public.mjs
  private.mjs
package-demo.mjs
```

```json
// node_modules/handbook-fixture/package.json
{
  "name": "handbook-fixture",
  "type": "module",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs"
    },
    "./public": "./public.mjs"
  },
  "imports": {
    "#private": "./private.mjs"
  }
}
```

```js
// node_modules/handbook-fixture/private.mjs
export default 11;
```

```js
// node_modules/handbook-fixture/index.mjs
import value from '#private';
export default { via: 'import', value };
```

```js
// node_modules/handbook-fixture/index.cjs
module.exports = { via: 'require', value: 11 };
```

```js
// node_modules/handbook-fixture/public.mjs
export const kind = 'public';
```

```js
// package-demo.mjs (outside the package scope)
import pkg from 'handbook-fixture';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
console.log('branches', JSON.stringify({
  import: pkg,
  require: require('handbook-fixture')
}));
console.log('public', (await import('handbook-fixture/public')).kind);

try {
  await import('handbook-fixture/private.mjs');
} catch (error) {
  console.log('private', error.code);
}

try {
  await import('#private');
} catch (error) {
  console.log('outsidePrivate', error.code);
}
```

Run `node package-demo.mjs`. Three local checks produced:

```text
branches {"import":{"via":"import","value":11},"require":{"via":"require","value":11}}
public public
private ERR_PACKAGE_PATH_NOT_EXPORTED
outsidePrivate ERR_PACKAGE_IMPORT_NOT_DEFINED
```

**Interpretation:** the package name resolves to distinct ESM/CJS entry files according to conditions. The public `./public` mapping works. The unlisted `./private.mjs` deep package subpath is blocked by `"exports"`. The package-local `#private` mapping works for `index.mjs`, not for unrelated outside code.

**Security and API caveat:** `"exports"` enforces the named package public interface in supported resolution paths; it is **not strong filesystem encapsulation or a sandbox**. A consumer with an independently known accessible absolute path might still load an internal file. Export-path controls help compatibility, not access-control for sensitive data.

**Dual-entry hazards:** `import` and `require` pointing at different files can instantiate separate state and unexpected duplicate singletons, even if the two return equal data. Designing a coherent dual-format package requires explicit contract reasoning and testing across entry routes. This example deliberately chooses no reusable packaging convention.

## 7. Package resolution is contextual, not global

A bare specifier such as `'handbook-fixture'` is resolved relative to the **importing module and relevant package lookup paths**, not necessarily the shell's cwd. The nearest package metadata and its `"exports"` conditions can select the target. Two files in different package trees can resolve the same bare name to different package versions or entries. Thus “it worked from the repository root” does not establish which copy another dependency will load.

Resolution errors to distinguish:

| Symptom | Likely question | Why it matters |
|---|---|---|
| `ERR_MODULE_NOT_FOUND` | Was the relative specifier complete? Is the package/path present and reachable? | Extension errors differ from evaluating valid code. |
| `ERR_PACKAGE_PATH_NOT_EXPORTED` | Does the importing code address a blocked package subpath? | File existence does not override the exports map. |
| `ERR_PACKAGE_IMPORT_NOT_DEFINED` | Does the `#` mapping exist in **this package**? | A private imports map is not a global alias. |
| `ERR_UNKNOWN_FILE_EXTENSION` / format failure | Did resolution produce a format the loader cannot handle? | Resolution and interpretation are separate. |
| Missing named export / `ReferenceError` | Did linking or evaluation fail after a target was found? | “Module not found” is not an accurate diagnosis for every startup failure. |

Exports subpath patterns and user-supplied `--conditions` can complicate matching. Object condition ordering and runtime-specific conditions matter; do not assume build tools use the same conditions as Node. Consult the exact package's export map and the actual Node version.

Builtin names are another resolution category: `node:fs` is a host-provided builtin and does not point to an installed `node_modules/fs` package. Explicit `node:` makes that intention visible, with some builtin names requiring the prefix.

## 8. Worked example C — two caches and URL identity

Create:

```js
// cache/counter.cjs
globalThis.cjsExecutions = (globalThis.cjsExecutions ?? 0) + 1;
module.exports = { count: globalThis.cjsExecutions };
```

```js
// cache/counter.mjs
globalThis.esmExecutions = (globalThis.esmExecutions ?? 0) + 1;
export const count = globalThis.esmExecutions;
```

```js
// cache/demo.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const a = require('./counter.cjs');
const b = require('./counter.cjs');
const x = await import('./counter.mjs');
const y = await import('./counter.mjs');
const z = await import('./counter.mjs?variant=1');

console.log(JSON.stringify({
  cjsSame: a === b,
  cjsCount: a.count,
  esmSame: x === y,
  esmCount: x.count,
  esmVariantCount: z.count
}));
```

Three independent `node cache/demo.mjs` runs printed:

```json
{"cjsSame":true,"cjsCount":1,"esmSame":true,"esmCount":1,"esmVariantCount":2}
```

**Observed reasoning:** the identical CJS `require` returns a previously cached export. The same ESM URL returns the same module namespace. Adding a URL query produces another ESM module identity and causes this simple module's side effect to run again. Each independent process starts with its own global counters.

**Limits:** import URL queries are not a general cache invalidation or reload policy. Arbitrary changing queries can grow memory by instantiating new module records; module lifetime/garbage collection and native hooks have additional boundaries. `require.cache` does **not** control the ESM loader cache. Mixed CJS/ESM imports can have special bridging/cross-cache rules, especially JSON; don't reduce them to “always separate copies.”

The same symbolic package name can also resolve to different filenames from different parents, so CJS cache identity cannot be inferred from spelling alone. ESM file URL identity and filesystem symlink/case conventions can differ across platforms and flags. Use controlled reproductions to identify actual resolved locations.

## 9. Worked example D — cycles expose initialization order

Dependency cycles are **not** intrinsically an exception in all module systems. Their danger is partially initialized state or access before a binding has been initialized.

**CommonJS partial export example:**

```js
// cycle/a.cjs
exports.ready = false;
const b = require('./b.cjs');
exports.observedB = b.sawA;
exports.ready = true;
```

```js
// cycle/b.cjs
const a = require('./a.cjs');
exports.sawA = a.ready;
```

```js
// cycle/demo.cjs
console.log('cjs', JSON.stringify(require('./a.cjs')));
```

The result in three runs:

```text
cjs {"ready":true,"observedB":false}
```

While A was loading, B required the partially constructed A and saw `ready === false`. After B returned, A finished and exported `ready === true`. This is the documented CJS partial-export mechanism; it is not a race requiring two OS threads.

**ESM temporal-initialization counterexample:**

```js
// cycle/a.mjs
import { observedB } from './b.mjs';
export const ready = true;
console.log('observedB', observedB);
```

```js
// cycle/b.mjs
import { ready } from './a.mjs';
export const observedB = ready;
```

Run `node cycle/a.mjs`. All three negative-path executions **exited 1** and printed an error containing:

```text
ReferenceError: Cannot access 'ready' before initialization
```

ESM bindings participate in linking before evaluation, but evaluation order and temporal dead zones still matter. This simple cycle attempts to read `ready` too early. **Do not conclude every ESM cycle fails.** A cycle can be valid when references are only used after the necessary initialization.

A useful remedy is to challenge the ownership boundary: separate a pure contract from effectful initialization, or introduce an explicit initialization call with observable readiness and failures. Those are **engineering options** rather than a blanket requirement to redesign every cyclic module. Do not use a global mutable object to hide the cycle without clarifying who owns its state.

## 10. Worked example E — CJS/ESM interop is version-sensitive

As of the **tested Node v22.16.0** version, a CommonJS `require()` can load some **synchronous ESM graphs**. An ESM graph requiring top-level `await` cannot be loaded with the same synchronous contract. This capability evolved over Node releases; older blanket rules claiming `require()` can *never* load ESM are wrong for this environment, and a future project's supported version must be checked.

```js
// interop/sync.mjs
export const value = 17;
```

```js
// interop/async.mjs
export const value = await Promise.resolve(18);
```

```js
// interop/demo.cjs
let syncOutcome;
try { syncOutcome = require('./sync.mjs').value; }
catch (error) { syncOutcome = error.code; }

let asyncOutcome;
try { asyncOutcome = require('./async.mjs').value; }
catch (error) { asyncOutcome = error.code; }

console.log(JSON.stringify({ syncOutcome, asyncOutcome }));
```

Three invocations produced:

```json
{"syncOutcome":17,"asyncOutcome":"ERR_REQUIRE_ASYNC_MODULE"}
```

The second failure is about a **graph that requires asynchronous ESM evaluation**, not necessarily a syntax error or missing file. Top-level `await` is supported in ESM, but synchronously requiring a graph that needs it is a different capability. Dynamic `import('./async.mjs')` is available from CommonJS and returns a Promise, subject to the underlying evaluation succeeding.

**CJS imported into ESM:**

```js
// interop/legacy.cjs
module.exports = { legacyValue: 21 };
```

```js
// interop/from-esm.mjs
import legacy from './legacy.cjs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
console.log(JSON.stringify({
  legacy: legacy.legacyValue,
  requireSyncEsm: require('./sync.mjs').value
}));
```

Three executions printed:

```json
{"legacy":21,"requireSyncEsm":17}
```

The CJS `module.exports` object is available as the ESM **default** import. Some named exports can be detected by static analysis, but detection is not universal and should not be treated as live updates to all properties. Prefer explicit contract checks across both formats when a package claims interop. The `createRequire` helper provides the `require` API in ESM for cases that need it; it does not make every ESM graph synchronous.

## 11. Worked example F — JSON import attributes and top-level await

In Node v22.16.0, importing a JSON module through ESM requires `with { type: 'json' }`. The same attribute requirement applies to appropriate dynamic import options.

```json
// interop/data.json
{"value":19}
```

```js
// interop/json.mjs
import data from './data.json' with { type: 'json' };
console.log(JSON.stringify(data));

try {
  await import('./data.json');
} catch (error) {
  console.log('noAttribute', error.code);
}
```

Three executions of `node interop/json.mjs` printed:

```text
{"value":19}
noAttribute ERR_IMPORT_ATTRIBUTE_MISSING
```

A successful static import with the required attribute does not mean all JSON imports elsewhere can omit it. The failure is **format/import-attribute handling**, not a missing file. The runtime also has specific CJS/ESM JSON cache compatibility described in its docs; avoid teaching a false universal “all imports of the same JSON file create new independent objects.”

**Top-level `await`:** it can delay dependent ESM module evaluation and is not an ordinary synchronous CJS export initializer. An unresolved top-level `await` can prevent normal startup completion; the official Node v22 ESM documentation describes an exit status for never-resolving top-level awaits. That particular hanging-TLA case is **documented, not executed in this lesson**, to avoid inventing an application liveness guarantee.

**Asynchronous initialization design:** dependencies can run code before the entry module's own body. If a service must validate configuration or acquire a resource before running application side effects, make initialization boundaries and failure outcomes explicit. Do not infer that moving an `if` to the first visible line of an ESM entry means it runs before static dependencies.

## 12. TypeScript and bundlers are separate authorities

TypeScript's compiler may recognize a path alias such as `@core/config` because `tsconfig.json` defines `paths`. That does **not** automatically register that alias with Node's runtime resolver. Emitted JavaScript might still contain the alias unchanged; then a normal Node process can fail to load it. A bundler or custom runtime hook **may** rewrite or implement a mapping, but those are separate mechanisms that require evidence.

Likewise, TypeScript's `module`, `moduleResolution`, `esModuleInterop`, `paths` and `types` settings affect type checking, emitted syntax and/or compiler interpretation in specific ways. They do not universally override Node's `package.json` exports, loader conditions or ESM extension requirements. A bundler can accept an extensionless import and rewrite output into a shape Node can execute; that is **build-transformation behavior**, not proof that the Node source import resolves natively.

Consider this illustrative source:

```ts
// TypeScript-only illustrative snippet — NOT a tested Node fixture
import { configuration } from '@core/config';
```

Questions to diagnose: What JavaScript was emitted? What does the built command actually launch? Which loader receives `@core/config`? Was a bundler or loader hook installed, and is it present in production? Which conditions resolve the package's entry? Is the import intended to be a package-private `#` mapping rather than a compiler alias?

Do not declare TypeScript compiler/alias behavior independently verified by this chapter's Node-only fixtures. D02 covers the language/tooling contracts; D03 investigates Node's **host runtime**.

## 13. Advanced details, failure boundaries and security

**URLs, queries and percent-encoding.** ESM resolves file modules using URL rules; special characters in paths need correct URL representation. An ESM import with a changed `?query` or `#fragment` can identify a separate module instance. Prefer `new URL('./file.js', import.meta.url)` for module-relative resources rather than naive string/path manipulation. This is not the same as Node's cwd-relative file read.

**Resolution customization.** Node provides module customization APIs/hooks with versions and restrictions. They can change a host's behavior, but they are an explicit runtime feature, not an invisible “fix” to package exports. Experimental/stability levels matter. The lesson does not implement hooks or mandate an import map.

**Named exports from CJS.** Node uses static analysis to expose some CJS named exports to ESM consumers. Those names do not necessarily track mutation or dynamically assigned properties. In contrast, native ESM exports are bindings with specific initialization and update behavior.

**Native addons and JSON.** `.node` native addons, `.json` handling, and ESM type attributes have format-specific paths. Some host APIs provide a CJS bridge for addons that ESM's ordinary import syntax does not directly load. Avoid asserting all extensions are interchangeable across loaders.

**Symlinks and multiple copies.** Different parent dependencies, symbolic-link flags, case sensitivity or duplicate installed packages can produce different resolved module identities and duplicated state. A module cache is **not** a cross-process database or globally shared singleton: Worker isolates and child processes have separate module/evaluation contexts.

**Trust boundaries.** Importing a module **executes code in the process's authority**. `"exports"` is API encapsulation, not permission enforcement. Loading arbitrary user-selected paths or packages is not a safe plugin sandbox. Avoid logging raw cwd, package paths, full environment or loader flags if they reveal secrets; prefer allowlisted diagnostic context. Do not run untrusted `node_modules` fixtures in a privileged production process.

**Error ownership.** Module linking/evaluation can reject a dynamic `import()` Promise, throw during synchronous `require()`, or fail an entry process before it can install expected application handlers. Handle errors at the correct boundary. Clearing caches or blindly retrying loading is not generally safe if the module performed partial side effects.

## 14. Backend incident: compiled service succeeds in tests, fails at launch

A TypeScript backend passes type checking and bundler-based development tests. Its deployed runtime executes plain Node, and startup fails trying to resolve `@internal/settings`.

Competing hypotheses:

1. TypeScript `paths` was resolved only at type-check time; emitted JS still contains an alias Node does not understand.
2. A build/bundler step rewrote specifiers locally but a different artifact was deployed.
3. The package `"exports"` blocks the desired subpath or selects a different `"node"`/`"import"`/`"require"` condition.
4. ESM code imports a relative specifier without a supported extension.
5. The package scope changed from `"commonjs"` to `"module"`, changing `.js` interpretation.
6. A previously loaded CJS module returns incomplete cyclic exports, or an ESM binding is observed before initialization.
7. Required configuration or a resource was initialized inside an imported dependency before entry-body validation.

A sound evidence plan asks the operator to record: exact Node executable/version, launch command, cwd and entry URL; parent specifier and resolved target if known; relevant `package.json` scopes and exports; emitted JS; loader customizations and flags; the **first stack trace and error code**; and which dependency modules executed side effects before failure.

Create a minimal reproduction in an isolated directory, deliberately remove compiler/bundler hooks and observe whether Node alone can load the emitted artifact. Compare **one variable at a time**, not an invented set of “fix” flags. A path-alias failure is not a reason to silently expand a product PRD or choose a mandatory bundler.

## 15. Comparison matrix and common misconceptions

| Misconception | Corrective mental model |
|---|---|
| “A module specifier is always a filesystem path.” | Bare package names, built-ins, `#` private mappings and file URLs use different rules. |
| “No `package.json` means all JavaScript is CJS in every Node version.” | Ambiguous syntax detection in Node 22 complicates that; use explicit markers. |
| “ESM searches for missing relative `.js` extensions like CJS.” | Node ESM requires explicit relative file extensions. |
| “Knowing a package file path means it is a public exported subpath.” | `"exports"` controls named package entries; direct filesystem access is a different boundary. |
| “`"imports"` creates a global alias for every consumer.” | `#` mappings belong to their defining package scope. |
| “TypeScript `paths` rewrites every emitted import.” | Check the actual emitted artifact/runtime loader; type lookup is not automatic runtime resolution. |
| “`require.cache` clears all ESM module instances.” | ESM uses a distinct cache and URL identities. |
| “Any cycle is a threading deadlock.” | Many cycles are single-threaded partial-initialization or temporal-binding problems. |
| “`require()` can never load ESM.” | Some synchronous ESM graphs are loadable in tested Node v22.16.0; top-level-await graphs have different rules. |
| “CJS named exports are always live ESM bindings.” | Static detection is partial and mutation is not universally tracked. |
| “Top-level await makes startup a synchronous require.” | It can make evaluation asynchronous and incompatible with a synchronous importer. |
| “Importing JSON in ESM is the same as JSON require.” | Import attributes and bridge caching rules apply. |
| “A module cache is a process-wide trusted singleton across Workers.” | Module identities and Worker isolate/process boundaries matter. |
| “`exports` is a security sandbox.” | It describes a public API surface, not OS access control. |

## 16. Exercises and future self-assessment rubric

These are questions for a **later learning phase**; no learner answers, grade or competence evidence are recorded.

1. **Format classification:** for `.mjs`, `.cjs` and `.js` under `"type": "module"`, identify Node v22 loader interpretation. **Answer:** first two unambiguous ESM/CJS respectively; scoped `.js` ESM.
2. **Extension failure:** why does `import('./value')` fail in Example A but `require('./value')` succeed elsewhere? **Answer:** different relative resolution rules, not source absence.
3. **Package boundaries:** why does `handbook-fixture/private.mjs` fail while `#private` succeeds in the package's `index.mjs`? **Answer:** export-map encapsulation versus package-local imports.
4. **Conditional entry:** what risk exists if ESM and CJS conditions load different singleton-bearing files? **Rubric:** independent module state/side effects and version-dependent integration.
5. **Cache identity:** predict the ESM counter values on same URL versus `?variant=1`. **Answer:** one and one for repeated URL; new URL instance increments this fixture's shared global counter to two.
6. **CJS cycle:** explain why A is finally `ready=true` but B observed `false`. **Answer:** B obtained A's partially initialized exports during synchronous require.
7. **ESM cycle:** explain the `ReferenceError` instead of “module missing.” **Answer:** target resolves; binding is accessed before initialization during graph evaluation.
8. **Interop:** why does `require('./sync.mjs')` work in this Node release but `require('./async.mjs')` fails? **Answer:** synchronous ESM graph versus one requiring top-level await, with runtime-specific support.
9. **JSON:** why does dynamic import without `with { type: 'json' }` fail despite the file existing? **Answer:** required JSON import attribute in tested version.
10. **TypeScript alias:** tests pass with a resolver plugin but production Node cannot load `@core/config`. What evidence is required? **Rubric:** emitted JS, launch flags, package conditions, runtime hooks, exact error and target Node version.
11. **Scope:** may the handbook force a bundler in a portfolio PRD because an educational example hit an ESM error? **Answer:** no; lesson mechanism does not approve technical implementation choices.

Passing future questions does not automatically establish working project implementation or domain mastery; assessments need independent learner responses and evidence.

## 17. Verification manifest and official references

**Source documentation checked 2026-10-13** from the *exact* Node **v22.16.0** release line:

- [Modules: Packages](https://nodejs.org/download/release/v22.16.0/docs/api/packages.html): package scope, explicit/ambiguous module markers, exports/imports, conditions and subpaths.
- [ECMAScript modules](https://nodejs.org/download/release/v22.16.0/docs/api/esm.html): mandatory relative extensions, URL identity, JSON import attributes, interop, top-level await and ESM cache.
- [CommonJS modules](https://nodejs.org/download/release/v22.16.0/docs/api/modules.html): require resolution, caching, cycles and version-limited `require(esm)`.
- [node:module API](https://nodejs.org/download/release/v22.16.0/docs/api/module.html): `createRequire` and runtime customization entry points.

**Executed environment:** 2026-10-13; Linux x64; Node **v22.16.0**, V8 **12.4.254.21-node.26**, libuv **1.49.2**. Synthetic local ESM/CJS folders under `/tmp/d03c13` with controlled package metadata and no installed third-party dependencies. Nine fixture entries were run independently **three times each** by invoking `node <fixture>` from the parent fixture directory: **27/27 expected-outcome checks passed**. Every run was checked for expected exit status and a bounded output/error substring, not just human-readable resemblance.

| Exact invocation from fixture root | Observed output / expected result | Boundary shown |
|---|---|---|
| `node scope/a.mjs` | `{"answer":42}`; missing extension → `ERR_MODULE_NOT_FOUND`; exit 0 (caught) | ESM explicit extension |
| `node commonjs/probe.cjs` | `cjs-extension-search 42`; exit 0 | CJS extension probing |
| `node package-demo.mjs` | Import and require branches; public subpath; `ERR_PACKAGE_PATH_NOT_EXPORTED`; `ERR_PACKAGE_IMPORT_NOT_DEFINED`; exit 0 (caught errors) | Conditional exports and package-only imports |
| `node cache/demo.mjs` | `cjsSame:true`, `esmSame:true`, variant eval count 2; exit 0 | Distinct module caches and URL identity |
| `node cycle/demo.cjs` | `{"ready":true,"observedB":false}`; exit 0 | Partially initialized CJS cycle |
| `node cycle/a.mjs` | `ReferenceError` before `ready` initialization; **exit 1 intentionally**, matched in all 3 trials | ESM cycle negative path |
| `node interop/demo.cjs` | `{"syncOutcome":17,"asyncOutcome":"ERR_REQUIRE_ASYNC_MODULE"}`; exit 0 (caught) | Synchronous ESM require versus TLA graph |
| `node interop/json.mjs` | `{"value":19}`; `ERR_IMPORT_ATTRIBUTE_MISSING`; exit 0 (caught) | JSON import attribute |
| `node interop/from-esm.mjs` | `{"legacy":21,"requireSyncEsm":17}`; exit 0 | CJS default in ESM, `createRequire` bridge |

**Intentional negative cases:** missing extension, unexported subpath, outside `#` mapping, ESM cycle temporal error, top-level-await require mismatch and missing JSON import attribute. They count as **passed checks of expected failure**, not successful imports. The fixture values are synthetic; no real credentials, customer packages or network services were used.

**What these checks do not prove:** all package-manager layouts, symlink flags, Windows path/case behavior, Node 18/20/24/26 compatibility, TypeScript compiler transformation, custom loaders, bundler output, native add-ons, browser import maps, complete security or production release readiness. No claims about learner mastery, implemented portfolio projects or comprehensive module-source audit follow from these runs.

## 18. Coverage audit and next editorial gate

| Handbook quality gate | Evidence | Gap / reservation |
|---|---|---|
| First-principles progression | Sections 2–4: resolver/loader/evaluator, format markers, CJS versus ESM | Not an internal source-code call graph |
| Practical examples with failure paths | Sections 5–11: package entries, cache, cycles, interop, JSON; nine checked fixture entry points | No production package installation or runtime hooks |
| Comparison and version nuance | Node v22 syntax detection, sync `require(esm)`, JSON attributes and TLA | Other Node versions must be retested |
| Realistic backend diagnosis | Sections 12–14: emitted JS, runtime conditions, startup ordering, ambiguous errors | Not an approved architecture or bundler |
| Security/performance tradeoffs | Sections 6, 8, 13, 15: export encapsulation, cache growth, module execution authority | Not an untrusted plugin sandbox |
| Exercises, answers, references | Sections 16–17 | No learner assessment administered |
| Coverage matrix | D03-C12 learner-approved; D03-C13 authored/in_review; D03 project catalog/PRDs and implementation not_started | No implementation or mastery evidence |

**Author editorial/quality review:** completed against `docs/quality-gates.md`, the D03-C13 curriculum and official release-line module documentation. Versioned fixture outcomes are recorded without universalizing Node v22 behavior. **Learner editorial approval:** explicitly confirmed on 2026-10-13. Chapter 14 — V8 Execution, Memory and Garbage Collection — is the next authoring unit, followed by explicit learner review before Chapter 15. Assessments and project implementation remain deferred.
