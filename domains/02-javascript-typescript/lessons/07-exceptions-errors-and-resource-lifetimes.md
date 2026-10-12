# Chapter 07 — Exceptions, Errors and Resource Lifetimes

**Domain:** D02 — JavaScript & TypeScript  
**Status:** drafted_pending_learner_review  
**Assessment:** deferred until explicit learner study phase  
**Code execution:** examples not independently verified

## Goals and prerequisites

Prerequisites: JavaScript values, scopes, functions, object semantics and modules (Chapters 01–06). Learn how synchronous exceptions propagate, how catch/finally execute, how errors carry context, how resources require cleanup, and how to design comprehensible function failure contracts. Async Promise rejection is introduced but treated in depth in Chapter 08; platform-specific I/O lifecycle belongs to D03.

## 1. Distinguish a returned outcome from a thrown exception

Functions can return a value or abruptly terminate by throwing. A thrown value propagates along the active synchronous call chain until an appropriate catch is reached. JavaScript permits throwing any value, but Error instances carry more useful diagnostics.

```js
function requireName(input) {
  if (typeof input !== "string" || input.length === 0) {
    throw new TypeError("name must be a nonempty string");
  }
  return input;
}
function register(input) {
  return { name: requireName(input) };
}
try {
  register(null);
} catch (error) {
  console.log(error instanceof TypeError); // true
}
```

Throwing is not a substitute for declaring expected business outcomes. A user declining a booking and a corrupted internal invariant have different meanings; the product contract should distinguish predictable rejections from unexpected failures.

## 2. try, catch, finally and control flow

`try` evaluates its block; `catch` handles an exception thrown there; `finally` runs when control exits the construct (including normal completion, return or throw). Abrupt completion from `finally` can **replace** a previous return or exception.

```js
function result() {
  try { return "first"; }
  finally { console.log("cleanup"); }
}
// result() returns "first" after logging

function dangerous() {
  try { throw new Error("original"); }
  finally { return "overridden"; }
}
// dangerous() returns "overridden": original failure is suppressed
```

Avoid returning or throwing from cleanup without consciously handling the original failure. `finally` does not imply any awaited asynchronous operation has settled when used around a bare returned Promise.

## 3. catch bindings and unknown failure shapes

Anything can be thrown: `throw "oops"` is valid JS, so code cannot assume an arbitrary caught value is an `Error`. TypeScript with `useUnknownInCatchVariables` under strict settings encourages narrowing.

```ts
function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown failure";
}
```

Do not blindly serialize `error.stack` or expose internal messages to clients; they may contain environment details or sensitive input. `instanceof` behavior can be complicated by cross-realm objects, library custom errors and transpilation contexts.

## 4. Error objects and causal chains

Built-in types include `Error`, `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`, `EvalError` (legacy) and `AggregateError`. `Error` can include a `cause` to preserve context across layers.

```js
function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new Error("Configuration could not be parsed", { cause });
  }
}
```

Do not assume exact stack trace formatting is a language guarantee. Stacks and any automatic logging of causes are host/runtime dependent. A rethrown exception (`throw error`) retains its original object; wrapping adds a more specific context but requires careful sensitivity handling.

## 5. Failure taxonomy and API boundaries

Document whether an operation can produce:
- **Success:** valid returned value.
- **Expected domain rejection:** user-facing, foreseeable result (for example, unavailable capacity).
- **Input validation failure:** malformed or unsupported data.
- **Unexpected failure:** a broken assumption or operational fault.
- **Uncertain outcome:** caller cannot tell whether an operation took effect.

These are distinct semantic categories, not universally prescribed JavaScript classes or frameworks. At external boundaries, validate unknown input and translate internal failures to stable, non-sensitive client-facing contracts.

## 6. Result values versus exceptions

For expected recoverable outcomes, an explicit discriminated union can make callers handle both paths; exceptions remain useful for truly exceptional failures. This is a design trade-off, not a universal rule.

```ts
type ParseResult =
  | { ok: true; value: number }
  | { ok: false; reason: "invalid_syntax" | "out_of_range" };

function parseQuantity(input: unknown): ParseResult {
  if (typeof input !== "string" || !/^[0-9]+$/.test(input)) {
    return { ok: false, reason: "invalid_syntax" };
  }
  const value = Number(input);
  if (!Number.isSafeInteger(value) || value > 1000) {
    return { ok: false, reason: "out_of_range" };
  }
  return { ok: true, value };
}
```

TypeScript checks handlers statically when configured but does not validate external data merely because of annotations.

## 7. Resource lifetimes and ownership

Resources such as handles, subscriptions, iterators, external clients or temporary files may need explicit release. Garbage collection primarily concerns memory reachability; it should not be treated as a timely release guarantee for scarce external resources.

Define who acquires, uses and releases each resource, and what happens when work fails before normal completion.

```js
function processWithResource(acquire) {
  const resource = acquire();
  try {
    return resource.process();
  } finally {
    resource.close();
  }
}
```

This synchronous illustration assumes both `process` and `close` are synchronous. It will **not** wait for asynchronous cleanup, and `close()` throwing may conceal a prior processing error.

## 8. Cleanup failures and multiple errors

A primary operation and cleanup can both fail. A naive `finally` that throws may mask the primary failure. Design a policy to preserve both failures or explicitly prioritize one and document what is observable.

```js
function runAndClose(resource) {
  let primary;
  try {
    return resource.run();
  } catch (error) {
    primary = error;
    throw error;
  } finally {
    try {
      resource.close();
    } catch (cleanupError) {
      if (primary !== undefined) {
        // Record both through the application's documented error strategy.
        // Do not silently misrepresent the cleanup error as original success.
      } else {
        throw cleanupError;
      }
    }
  }
}
```

This snippet is educational and incomplete as a production reporting strategy: it demonstrates decision points, not recommended suppression of cleanup faults.

## 9. Deterministic resource management concepts

Where supported, JavaScript's explicit resource management syntax (`using` / `await using`) and disposal protocols can make cleanup intent visible. Support varies by runtime and tooling. Do not require these features without checking the target environment.

The synchronous disposal protocol uses `Symbol.dispose`; asynchronous disposal uses `Symbol.asyncDispose`. In resource-management scopes, disposal is tied to lexical lifetime and designed to run on scope exit. Error composition and order deserve special attention.

```js
// Conceptual example, only for environments supporting explicit disposal:
// {
//   using handle = openDisposableHandle();
//   handle.perform();
// } // disposal at the scope boundary
```

This should not be confused with garbage collection, nor treated as a security guarantee. The host and resource implementation determine the actual external effects.

## 10. Exceptions and async functions

Inside an `async` function, throwing results in a rejected Promise, even if the throw occurs before the first `await`. A surrounding synchronous `try` without `await` does not catch that Promise rejection.

```js
async function fails() { throw new Error("no"); }
try {
  fails(); // returns a rejected Promise
} catch {
  // Not entered due to the returned rejection
}
```

Catching requires awaiting inside `try` or attaching a rejection handler. Promise settlement and unhandled-rejection hosting policies are covered in Chapter 08 and D03.

## 11. Cancellation and uncertain outcomes

Cancellation is generally a request for work to stop. It does not necessarily mean the effect was rolled back or that the operation never succeeded. Likewise, a timeout means the caller did not get a timely result; it does not establish the authoritative outcome.

For backend commands that change state, distinguish rejected, confirmed, pending and uncertain results. Retrying blindly may repeat an effect. Idempotency and reconciliation are product correctness requirements whose technical implementation is deferred to project-specific Codex discovery.

## 12. Module initialization and errors

A module can throw during evaluation. Importers may fail to load, and partially evaluated dependency cycles add complexity. Avoid unexpected side effects on import and maintain explicit recoverable initialization paths where the product demands them. The distinction between ESM language linking and Node-specific loaders remains as described in Chapter 06.

## 13. Common mistakes and failure modes

- Throwing raw strings and assuming all caught values have `.message`.
- Returning in `finally` and concealing prior exceptions.
- Treating a returned rejected Promise as a synchronous exception.
- Discarding a useful original `cause` without a reporting strategy.
- Relying on garbage collection for time-sensitive I/O cleanup.
- Ignoring cleanup failures or overwriting the primary failure with them.
- Sharing internal stack traces directly with clients.
- Treating a timeout/cancellation as proof an operation did not execute.
- Using TypeScript error classes/types as runtime validation.
- Choosing an error code without first defining the product's semantic failure categories.

## 14. Future-study exercises (not active assessments)

1. Trace the result of `dangerous()` and explain how `finally` changes it.
2. Explain why `catch (error)` cannot safely use `error.message` without narrowing.
3. Compare returning a discriminated union for a known business rejection with throwing.
4. Design a function boundary that distinguishes invalid input, unavailable resource, unexpected error and uncertain result.
5. Explain what happens if `resource.process()` and `resource.close()` both throw in a naive `try/finally`.
6. Explain why `try { fails(); } catch {}` cannot catch the async rejection.
7. Compare garbage collection, `finally`, `Symbol.dispose` and `Symbol.asyncDispose` as resource-lifetime concepts.
8. Explain why a client retry after timeout needs a reconciliation/idempotency policy.

**Answer guide:** finally's return suppresses the throw; any value can be thrown; unions can make expected failures explicit; error classes reflect observable semantics; cleanup can replace the first error; async throw rejects Promise; lifetime strategies guarantee different things; timeout doesn't prove failure.

## 15. References and version caution

- [ECMAScript — Try Statement](https://tc39.es/ecma262/#sec-try-statement)
- [ECMAScript — Error Objects](https://tc39.es/ecma262/#sec-error-objects)
- [ECMAScript — Explicit Resource Management](https://tc39.es/ecma262/#sec-ecmascript-language-statements-and-declarations-using-declarations) (check current edition and runtime support)
- [MDN — try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN — Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN — using](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using)
- [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [TypeScript TSConfig — useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig/useUnknownInCatchVariables.html)

The example involving explicit disposal is deliberately conceptual because implementation support changes. No code examples were independently executed or checked against a named runtime.

## 16. Editorial gate

Covered: exceptions, catch/finally, thrown value narrowing, built-in errors and cause, domain vs unexpected failures, typed results, resource ownership and cleanup, cleanup failure, explicit disposal concepts, Promise rejection distinction, cancellation ambiguity and module initialization errors.

**Pending:** learner editorial review and execution checks. No learning assessment or project implementation has begun.
