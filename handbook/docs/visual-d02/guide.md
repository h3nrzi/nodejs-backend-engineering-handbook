# D02 visual enhancement — hands-on review

Purpose: evaluate all 17 figures across 15 enhanced chapters and the intentional C01 omission after reviewing all 16 chapters. Source: Product Owner’s D02 request in this chat. Baseline `d3828398597238741e14147685bc172a7c50f7b1`; review build is the commit containing this guide (`git log -1 --format=%H -- docs/visual-d02/guide.md`). Canonical paths/questions are in [plan.json](plan.json) and [review.md](review.md). Human visual acceptance is pending; no learner study assessment is being administered.

## Starting point and setup

Actor for every scenario: Product Owner/reviewer. In this repository, open [C02](../../handbook/domains/02-javascript-typescript/lessons/02-variables-scope-and-closures.md), §5, and find **Closures share bindings within one invocation**. Your first action: follow both Counter A arrows and explain which count they share, then compare Counter B. Expected: A’s two methods share count 2; B has its own count 0. Report R01 with the first confusing label/arrow, if any.

Use Markdown preview in your editor or the repository’s rendered lesson, then adjacent full-size SVG/source links. Assets are local, require no account/service and change no application state. Agent preflight used Chrome and actual Markdown at 720/360 px; commands and measurements are versioned. For disposable local previews, run `node docs/visual-d02/verify.mjs` from `/Users/hossein/Projects/nodejs-backend-engineering-handbook`; the printed temp directory contains lesson HTML and per-figure pair/dark/grayscale PNGs. This read/check command does not rewrite lessons/assets/evidence. Existing locked dependencies and an installed browser are required. It does run repository smoke/render checks into temporary directories.

## Criterion-to-scenario coverage

| Criterion | Scenarios |
| --- | --- |
| Every selected learning objective, mechanism and misconception | R01–R17, each paired with owning lesson/source/caption |
| All 16 chapters reviewed, intentional omission, approved content/status preservation | R19 |
| Desktop/mobile presentation, arrows, labels, accessibility, text equivalence | R18, covering all 17 figures |
| Canonical sources, local regeneration, output identity and limitations | R20 |
| Exact checks, scoped educational evidence and remaining limits | R19–R20; report/evidence |
| Commit/push and D02-only stop | Delivery SHA and remote verification in final handoff; no D03 continuation |

## Feature scenarios

For each R01–R17, prerequisites are the named lesson and source/SVG pair linked in the review inventory. Read the owning section, inspect the image first, trace the named relations, and explain your answer before reading the caption. Then compare the explanation with the caption/source. These are read-only scenarios with no shared state dependencies; any can be resumed independently. Retain the revision, scenario ID, your explanation and the first confusing label/arrow. Agent observations are supporting preflight; your result remains `not_run` until reported.

### R01 — Closures share bindings within one invocation

Open [C02](../../handbook/domains/02-javascript-typescript/lessons/02-variables-scope-and-closures.md), Before ## 6. Capture in loops and asynchronous callbacks. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/02-variables-scope-and-closures/closure-binding-sharing.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/02-variables-scope-and-closures/closure-binding-sharing.mmd).

Action: Which returned methods share count, and which counter is independent? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: Counter A increment and read both access call A count, now 2. Counter B read accesses a separate call B count, still 0. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “A closure freezes its creation-time value or all factory calls share local state.” and explain the limit: After the two increments above, A’s methods share the updated binding. A second makeCounter() call starts a separate count at 0. Arrows mean binding access, not physical memory placement or an exact retention graph. Closure capture keeps access to state; it does not snapshot the initial number or guarantee authorization.

State afterward: unchanged. **User result: not_run.**

### R02 — Call syntax supplies the ordinary-function receiver

Open [C03](../../handbook/domains/02-javascript-typescript/lessons/03-functions-and-invocation.md), Before ## 5. Arrow functions and lexical `this`. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/03-functions-and-invocation/receiver-at-call-site.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/03-functions-and-invocation/receiver-at-call-site.mmd).

Action: Why does the same read function work as a method and fail when detached? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The property call meter.read supplies meter as this and returns 2. A detached plain strict call supplies undefined and reading this.value throws TypeError. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Methods retain their original receiver when extracted.” and explain the limit: These are two alternative calls to the same ordinary method, shown vertically for reading. Detaching copies the function value without permanently binding meter. Strict mode is essential to the undefined receiver shown here. Arrows and bound functions have different receiver rules, explained below.

State afterward: unchanged. **User result: not_run.**

### R03 — Lookup delegates until an own property is found

Open [C04](../../handbook/domains/02-javascript-typescript/lessons/04-objects-prototypes-and-classes.md), Before ## 4. Constructor functions and new. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/04-objects-prototypes-and-classes/prototype-property-lookup.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/04-objects-prototypes-and-classes/prototype-property-lookup.mmd).

Action: Why is account.role readable even though account does not own role? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: account has no own role. Lookup follows its prototype to shared and finds role viewer there, without continuing to Object.prototype or null. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Inheritance copies properties or a readable property must be owned.” and explain the limit: Solid arrows trace this read; dashed arrows show the remaining prototype chain. No property is copied into account: Object.hasOwn(account, "role") stays false, while "role" in account is true. This ordinary data-property example omits accessors and proxies, whose reads can execute code. An own role would shadow the inherited property.

State afterward: unchanged. **User result: not_run.**

### R04 — A new array can retain the same element objects

Open [C05](../../handbook/domains/02-javascript-typescript/lessons/05-collections-iteration-and-data-handling.md), Before ## 3. map, filter, reduce, find and some/every. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/05-collections-iteration-and-data-handling/sorted-array-shared-elements.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/05-collections-iteration-and-data-handling/sorted-array-shared-elements.mmd).

Action: What changes when sorted has a different order but shares original’s objects? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: Original index 0 and sorted index 1 reference object A. Original index 1 and sorted index 0 reference object B, whose score changes from 1 to 9. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “A non-mutating array operation deep-copies its objects.” and explain the limit: The arrows are element references after toSorted and the assignment above. original and sorted are distinct arrays; their element objects are shared. Writing sorted[0].score changes original[1].score too. Changing an element’s score does not automatically re-sort either array; shallow copying preserves aliases.

State afterward: unchanged. **User result: not_run.**

### R05 — A live import follows the exporter’s binding

Open [C06](../../handbook/domains/02-javascript-typescript/lessons/06-modules-and-package-boundaries.md), Before ## 4. Linking, instantiation and evaluation. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/06-modules-and-package-boundaries/live-import-versus-snapshot.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/06-modules-and-package-boundaries/live-import-versus-snapshot.mmd).

Action: Why does a live count read change while a primitive snapshot stays 0? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The imported count reads the exporter binding, which increment changes from 0 to 1. A local primitive snapshot copied before increment remains 0. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “An import is a snapshot or a read-only import freezes object properties.” and explain the limit: The solid read arrow denotes a live imported binding, not a copied variable. Adding const snapshot = count before increment() would copy 0 into a separate local binding. The importer cannot reassign count. Read-only imports still allow mutation of writable properties on an exported object; ESM binding semantics do not freeze objects or specify CommonJS interoperability.

State afterward: unchanged. **User result: not_run.**

### R06 — Cleanup can preserve or replace a pending outcome

Open [C07](../../handbook/domains/02-javascript-typescript/lessons/07-exceptions-errors-and-resource-lifetimes.md), Before ## 3. catch bindings and unknown failure shapes. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/07-exceptions-errors-and-resource-lifetimes/finally-completion-replacement.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/07-exceptions-errors-and-resource-lifetimes/finally-completion-replacement.mmd).

Action: How does finally decide which return or throw leaves the function? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: A pending return or throw enters finally. Normal finally completion preserves it; a return or throw from finally replaces it. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “finally guarantees preserving the original error or awaits arbitrary returned work.” and explain the limit: A pending outcome is a control-flow description, not a Promise state. result() logs cleanup then preserves "first"; dangerous() replaces the original throw with "overridden". This assumes execution reaches and exits finally: process termination is outside this language-level model. Other abrupt exits, such as a valid break or continue, can also replace the pending outcome. A synchronous finally does not wait for a bare returned Promise.

State afterward: unchanged. **User result: not_run.**

### R07 — Resolution can lock an outcome while settlement waits

Open [C08](../../handbook/domains/02-javascript-typescript/lessons/08-promises-and-async-await.md), Before ## 2. Synchronous executors, asynchronous reactions. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/08-promises-and-async-await/promise-adoption.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/08-promises-and-async-await/promise-adoption.mmd).

Action: Can outer already follow inner while still being pending? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: Resolving outer with a pending inner Promise leaves outer pending but locked to inner. Inner fulfillment leads to outer fulfillment; inner rejection leads to outer rejection. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Resolved always means fulfilled; a pending adopted Promise can be redirected.” and explain the limit: The example takes the fulfillment branch when finish("ready") runs; rejection is the alternative if inner were rejected. Resolving here fixes what outer follows, so later attempts to resolve or reject outer cannot change that choice. These boxes describe this adoption case, not a fourth Promise state or a complete thenable-resolution algorithm. Settlement is eventual via Promise jobs, not necessarily immediate at finish().

State afterward: unchanged. **User result: not_run.**

### R08 — The executor runs now and the reaction runs later

Open [C08](../../handbook/domains/02-javascript-typescript/lessons/08-promises-and-async-await.md), Before ## 3. Chaining and recovery. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/08-promises-and-async-await/promise-reaction-order.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/08-promises-and-async-await/promise-reaction-order.mmd).

Action: Why does C appear before D even though p is already fulfilled? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: A logs first, the synchronous Promise executor logs B and resolves 5, then registers a reaction. C logs before the reaction job logs D. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Fulfilled Promises call then handlers inline or executors run asynchronously.” and explain the limit: This is the exact A/B/C/D example above: the executor is synchronous, whereas a then handler runs in a later job even for an already fulfilled Promise. The diagram gives causal order, not elapsed time, CPU parallelism, or ordering against timers, I/O or process.nextTick. Handler registration does not call the handler inline.

State afterward: unchanged. **User result: not_run.**

### R09 — Aborting observation cannot undo a confirmed effect

Open [C09](../../handbook/domains/02-javascript-typescript/lessons/09-asynchronous-composition-and-cancellation.md), Before ## 5. Deadline and timeout. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/09-asynchronous-composition-and-cancellation/abort-after-remote-effect.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/09-asynchronous-composition-and-cancellation/abort-after-remote-effect.mmd).

Action: What if cancellation happens after remote success but before confirmation arrives? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: An operation succeeds for attempt R, its confirmation is lost, and the caller aborts afterward. The prior effect remains while the caller lacks confirmation. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “abort guarantees rollback or a rejected wait proves remote failure.” and explain the limit: This is one possible order, not an AbortSignal network protocol. Participating local work can observe the signal and stop or reject; previously completed remote effects remain. The caller needs the same logical attempt’s authoritative outcome before applying its retry policy. Neither abort nor timeout establishes rollback or remote failure.

State afterward: unchanged. **User result: not_run.**

### R10 — Awaiting each save delays the next pull

Open [C10](../../handbook/domains/02-javascript-typescript/lessons/10-iteration-streams-and-event-abstractions.md), Before ## 8. Event subscriptions and lifetimes. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/10-iteration-streams-and-event-abstractions/paced-consumer.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/10-iteration-streams-and-event-abstractions/paced-consumer.mmd).

Action: What does this loop bound, and what can the source still buffer? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The consumer pulls item 1, checks cancellation, and waits for its save to fulfill before pulling item 2. The source may buffer internally during the wait. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Async iteration automatically bounds all memory or cancels upstream effects.” and explain the limit: This traces the successful path of processAll. Only one save started by this loop is active at a time; the source can have its own buffers and items can be large. On an in-loop throw or early return, the applicable iterator-close protocol looks for return() and awaits async closing. Neither pacing nor closing proves remote rollback or a total memory bound.

State afterward: unchanged. **User result: not_run.**

### R11 — Structural compatibility preserves the runtime object

Open [C11](../../handbook/domains/02-javascript-typescript/lessons/11-typescript-type-system-fundamentals.md), Before ## 7. Function signatures. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/11-typescript-type-system-fundamentals/structural-assignment.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/11-typescript-type-system-fundamentals/structural-assignment.mmd).

Action: Does assigning record to Identified strip category or create a new identity? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The checker accepts record with string id and category for Identified, which requires string id. At runtime input and record remain the same object and category still exists. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Structural assignment removes extra fields, checks identity or validates runtime data.” and explain the limit: Purple boxes concern static checking; the final box states JavaScript identity. This is assignment through the existing variable, so the fresh-object-literal excess-property check is not the rule illustrated. Compatibility does not strip fields, deep-copy the object, compare identity, or validate external data. Other type features can impose additional compatibility constraints.

State afterward: unchanged. **User result: not_run.**

### R12 — Branches narrow the checker’s view of Booking

Open [C12](../../handbook/domains/02-javascript-typescript/lessons/12-unions-narrowing-and-domain-modeling.md), Before ## 5. Exhaustiveness and never. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/12-unions-narrowing-and-domain-modeling/control-flow-narrowing.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/12-unions-narrowing-and-domain-modeling/control-flow-narrowing.mmd).

Action: What type remains after each returning status branch? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: A Booking starts as a union. A pending branch returns a waiting message. Otherwise a confirmed branch can read specialistId, leaving cancelled with reason on the final path. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “A union is a runtime validator or discriminant branches are business-state transitions.” and explain the limit: This equivalent decision view of summarize shows control-flow analysis over an already typed Booking; it is not a lifecycle transition graph. The JavaScript status comparisons still run, while TypeScript uses them to narrow fields statically. Each return removes that path from later control flow. A new variant requires revisiting handling; never-based exhaustive checking is shown below. Unknown JSON still needs parsing.

State afterward: unchanged. **User result: not_run.**

### R13 — The chosen key determines the returned type

Open [C13](../../handbook/domains/02-javascript-typescript/lessons/13-generics-constraints-and-advanced-types.md), Before ## 4. Generic interfaces and reusable result contracts. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/13-generics-constraints-and-advanced-types/generic-key-value-relation.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/13-generics-constraints-and-advanced-types/generic-key-value-relation.mmd).

Action: How does K connect a permitted property name to T[K]? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: For entry with string id and boolean active, keyof T is id or active. Choosing active makes K active and T[K] boolean; runtime execution is ordinary obj[key]. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Generic constraints execute as runtime shape checks or output is unrelated to selected key.” and explain the limit: The solid arrows are type relationships for getProperty(entry, "active"), not runtime stages. K extends keyof T rejects an unknown key in checked calls and links the result to the selected property type. It does not inject runtime guards, prevent getters, or ensure an external object still matches T.

State afterward: unchanged. **User result: not_run.**

### R14 — Distribution changes where the union appears

Open [C13](../../handbook/domains/02-javascript-typescript/lessons/13-generics-constraints-and-advanced-types.md), Before ## 7. Mapped types and modifiers. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/13-generics-constraints-and-advanced-types/conditional-distribution.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/13-generics-constraints-and-advanced-types/conditional-distribution.mmd).

Action: Why do Wrap and WrapTogether produce different object alternatives? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: Wrap distributes over string and number and yields a union of two object types. WrapTogether tests the tuple-wrapped union together and yields one object type with a union-valued property. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Conditional types branch at runtime or union of objects and object of union are identical type relationships.” and explain the limit: These are two alternative type calculations from the same input union, arranged vertically. A naked type parameter in this conditional distributes; wrapping the checked parameter in a tuple suppresses that distribution. The output types retain different relationships even where accepted simple values overlap. This computes types only: it creates no objects and performs no runtime branching.

State afterward: unchanged. **User result: not_run.**

### R15 — Checking, emission and loading answer separate questions

Open [C14](../../handbook/domains/02-javascript-typescript/lessons/14-typescript-modules-configuration-and-interop.md), Before ## 2. tsconfig.json and project boundaries. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/14-typescript-modules-configuration-and-interop/type-emit-runtime-boundaries.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/14-typescript-modules-configuration-and-interop/type-emit-runtime-boundaries.mmd).

Action: Where can a checked module still fail before or during execution? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The checker resolves source types. With emission enabled, JavaScript must still be inspected and its value imports resolved and evaluated by the runtime or bundler. noEmit produces no compiler output. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Checking implies runtime compatibility, declarations supply implementations or paths rewrites imports.” and explain the limit: These are separate responsibilities, not a guarantee that errors prevent emit or that every pipeline uses tsc for output. import type is erased; .d.ts files describe APIs without implementing them. paths affects checker lookup and does not itself rewrite emitted import specifiers. A separate build or runtime must support any remaining alias and ESM/CommonJS contract.

State afterward: unchanged. **User result: not_run.**

### R16 — Only executed checks establish this parser’s input contract

Open [C15](../../handbook/domains/02-javascript-typescript/lessons/15-runtime-validation-and-boundary-safety.md), Before ## 3. Separate syntax, representation and business rules. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/15-runtime-validation-and-boundary-safety/runtime-parser-boundary.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/15-runtime-validation-and-boundary-safety/runtime-parser-boundary.mmd).

Action: What must pass before parseCustomerInput constructs its result? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: The parser rejects null, arrays and non-objects, then checks a nonblank string name and safe integer age from 0 to 130. Failures throw; success constructs a new object with trimmed name and original age. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “Type assertions validate input or shape validation provides authorization.” and explain the limit: This is the parser above, for ordinary data records. The name check requires a nonblank string; the age check requires a safe integer from 0 to 130. Invalid name throws first, then invalid age. The result copies the checked primitive fields and leaves extra input fields out. The illustrative age policy is not universal; the parser does not check authorization, current state, hostile accessors or proxies. A type assertion alone follows none of these branches.

State afterward: unchanged. **User result: not_run.**

### R17 — Promise settlement and domain outcome are separate layers

Open [C16](../../handbook/domains/02-javascript-typescript/lessons/16-backend-language-case-studies-and-transfer.md), Before ## 6. Case study: asynchronous cleanup. Inspect [the actual SVG](../../handbook/domains/02-javascript-typescript/assets/16-backend-language-case-studies-and-transfer/promise-versus-domain-rejection.svg) and [its editable source](../../handbook/domains/02-javascript-typescript/assets/16-backend-language-case-studies-and-transfer/promise-versus-domain-rejection.mmd).

Action: How can allSettled report fulfilled when a delivery was rejected? Follow every relevant arrow and branch, then explain the result in your own words.

Expected: A fulfilled operation carries a Delivery value whose kind may be delivered, rejected or unknown; its allSettled status is fulfilled. A rejected operation instead yields status rejected with a reason. Compare against the lesson’s code/prose. Refusal/no-effect check: reject the misconception “A rejected domain value and a rejected Promise always mean the same thing.” and explain the limit: The outer status reports Promise settlement; value.kind reports the domain result. Thus a fulfilled entry can contain kind "rejected" without a Promise rejection. The diagram assumes each operation returns a Promise as declared. If run() throws synchronously during operations.map, collect rejects before allSettled receives the array; this function does not bound concurrency or cancel siblings.

State afterward: unchanged. **User result: not_run.**

### R18 — Presentation and accessible text equivalence

Prerequisites: all 17 figures. Inspect every actual SVG at 720 px and 360 px reading widths at 100% zoom, including dark page surroundings and grayscale. The verifier supplies paired PNGs and local lesson previews. In local lesson HTML, viewport widths 750/390 leave the intended reading column. Check each arrowhead, connector, label, line break, decision branch and note for clipping, overlap and contrast. Read alt text/caption without the image, then open both adjacent links.

Expected: all 17 lesson images load and remain readable, and words/arrow directions preserve distinctions without color. The adjacent text gives essential relationships and limits. Refuse missing images, clipped labels, ambiguous alternative order or forced horizontal scrolling for a diagram. Keep per-figure observations. Full screen-reader, GitHub publication and PDF behavior remain unverified. State afterward: unchanged. **User result: not_run.**

### R19 — Omission, preserved depth and status boundaries

Read the C01 omission rationale in review.md, then inspect the lesson diff:

```sh
git diff d3828398597238741e14147685bc172a7c50f7b1 HEAD -- handbook/domains/02-javascript-typescript/lessons
```

Expected: only 136 added lines, forming 17 question/image/caption/source-link blocks; all original content retained. C01 is byte-identical. Check that examples, exercises, references and approval labels survive and that no Charters or D01/D03/D04 lessons changed. Consult the preservation/scope assertions in verification.json and the changed-path inventory. Reconciliation records no mapping/status changes; no learner competency or Product Owner acceptance is claimed. Refuse any removed/abbreviated approved material or implicit D03/D05 authorization. State afterward: unchanged. **User result: not_run.**

### R20 — Regeneration and honest verification limits

Prerequisites: repository root, existing locked tools and installed Chrome/Chromium. In a terminal:

```sh
d02_preview_dir=$(mktemp -d)
npm run visuals:render -- -i handbook/domains/02-javascript-typescript/assets/05-collections-iteration-and-data-handling/sorted-array-shared-elements.mmd -o "$d02_preview_dir/shared.svg"
open "$d02_preview_dir/shared.svg"
```

Expected: the new export has two distinct arrays referencing the same two element objects, with original index 1 and sorted index 0 pointing to B. Compare with the committed SVG and source; do not demand identical SVG-generated IDs across platforms. Review validation.txt, verification.json and lab-replay.json: runtime replays use type stripping and do not type-check static claims. No package install or external service is needed in the preflight environment. Reject missing sources, incorrect pair paths or any assertion that local tests establish human acceptance. State afterward: only the disposable directory above. Keep any command error with revision/runtime. **User result: not_run.**

## Results and resumable checkpoint

| Scenario | Agent preflight | User result | Observation |
| --- | --- | --- | --- |
| R01 | pass (see report/evidence) | not_run | Pending |
| R02 | pass (see report/evidence) | not_run | Pending |
| R03 | pass (see report/evidence) | not_run | Pending |
| R04 | pass (see report/evidence) | not_run | Pending |
| R05 | pass (see report/evidence) | not_run | Pending |
| R06 | pass (see report/evidence) | not_run | Pending |
| R07 | pass (see report/evidence) | not_run | Pending |
| R08 | pass (see report/evidence) | not_run | Pending |
| R09 | pass (see report/evidence) | not_run | Pending |
| R10 | pass (see report/evidence) | not_run | Pending |
| R11 | pass (see report/evidence) | not_run | Pending |
| R12 | pass (see report/evidence) | not_run | Pending |
| R13 | pass (see report/evidence) | not_run | Pending |
| R14 | pass (see report/evidence) | not_run | Pending |
| R15 | pass (see report/evidence) | not_run | Pending |
| R16 | pass (see report/evidence) | not_run | Pending |
| R17 | pass (see report/evidence) | not_run | Pending |
| R18 | pass (see report/evidence) | not_run | Pending |
| R19 | pass (see report/evidence) | not_run | Pending |
| R20 | pass (see report/evidence) | not_run | Pending |

Checkpoint: **R01, not started by user**. Known final scoped agent failures: none (see exact evidence/limits). Human observations: none. Next safe action: open C02 §5 and explain shared A versus separate B count. Silence and automated passes do not advance acceptance.

Stop by closing the viewer. No service needs stopping. Keep versioned sources, exports and evidence. Clean only the specific disposable directory you created or the exact temp directory printed by the verifier when no longer needed. Resume at the first `not_run` scenario on the same revision; retain earlier observations and mark affected scenarios for rerun if a figure changes. Stop after D02 and wait for explicit Product Owner visual acceptance before D03.
