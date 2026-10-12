# Chapter 16 — Backend Language Case Studies and Transfer

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Study assessments:** deferred until explicit learning phase  
**Examples:** illustrative, not independently executed

## Outcomes and prerequisites

This concluding chapter connects all earlier D02 lessons to backend engineering decisions. It is a **language-level case study collection**, not an architecture prescription or implemented product. Readers should eventually be able to trace JavaScript runtime behavior, apply TypeScript modeling without trusting erased annotations, identify dangerous asynchronous outcomes, select collection and module patterns, and articulate what must be learned in D03 Node.js Internals.

## 1. Case study: incoming HTTP-like commands

Suppose a command includes a customer identifier, requested quantity and optional note. The boundary receives untrusted values, regardless of what a TypeScript declaration claims.

~~~ts
type CreateRequest = { customerId: string; quantity: number; note?: string };

function parseRequest(raw: unknown): CreateRequest {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new TypeError("expected object");
  }
  const record = raw as Record<string, unknown>;
  if (typeof record.customerId !== "string" ||
      !/^c_[a-z0-9]+$/.test(record.customerId)) {
    throw new TypeError("invalid customerId");
  }
  if (typeof record.quantity !== "number" ||
      !Number.isSafeInteger(record.quantity) || record.quantity <= 0) {
    throw new TypeError("invalid quantity");
  }
  if (record.note !== undefined && typeof record.note !== "string") {
    throw new TypeError("invalid note");
  }
  return {
    customerId: record.customerId,
    quantity: record.quantity,
    ...(record.note === undefined ? {} : { note: record.note })
  };
}
~~~

This example intentionally ignores unknown properties. Whether unknown fields are rejected, stripped or accepted requires a documented product contract. A structurally valid command still needs authentication, authorization and authoritative state checks.

## 2. Case study: modeling a booking lifecycle

~~~ts
type Booking =
  | { kind: "pending"; requestId: string }
  | { kind: "confirmed"; requestId: string; appointmentId: string }
  | { kind: "rejected"; requestId: string; reason: string }
  | { kind: "uncertain"; requestId: string };

function message(result: Booking): string {
  switch (result.kind) {
    case "pending": return "Processing";
    case "confirmed": return "Confirmed";
    case "rejected": return "Rejected";
    case "uncertain": return "Checking final outcome";
  }
}
~~~

A discriminated union prevents some inconsistent internal representations but does not establish legal transitions, resource ownership or durable truth. A lost confirmation is not proof an appointment was never created. Choosing idempotency and reconciliation policies begins as product behavior and is implemented later with project-specific technical decisions.

## 3. Case study: shared versus request-local state

~~~js
const mutable = { lastCustomer: null };
function unsafe(customerId) {
  mutable.lastCustomer = customerId;
  return () => mutable.lastCustomer;
}
function isolated(customerId) {
  const id = customerId;
  return () => id;
}
~~~

Callbacks created by unsafe share module state; isolated captures each call's local binding. Neither design automatically guarantees authorization or correct lifecycle cleanup. Long-lived closures may retain sensitive request data longer than expected.

## 4. Case study: data transformation and exactness

When collecting items by identifier, choose equality deliberately. Object references in Set compare by identity; Map string keys allow canonical identifiers. Arithmetic using Number requires precision and overflow checks.

~~~ts
type Line = { id: string; quantity: number };

function group(lines: readonly Line[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const line of lines) {
    if (!line.id || !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1) throw new Error("invalid line");
    const updated = (totals.get(line.id) ?? 0) + line.quantity;
    if (!Number.isSafeInteger(updated)) throw new Error("unsafe total");
    totals.set(line.id, updated);
  }
  return totals;
}
~~~

This is an internal example assuming callers supply objects with the declared shape; a true external boundary must validate the array and every field at runtime before passing data to this function. Domain-specific money values need an explicit unit and representation policy.

## 5. Case study: failure during concurrent work

~~~ts
type Delivery =
  | { kind: "delivered"; recipientId: string }
  | { kind: "rejected"; recipientId: string; reason: string }
  | { kind: "unknown"; recipientId: string; attemptId: string };

async function collect(
  operations: readonly (() => Promise<Delivery>)[]
): Promise<PromiseSettledResult<Delivery>[]> {
  return Promise.allSettled(operations.map(run => run()));
}
~~~

All tasks launch immediately; this example does **not** bound concurrency. A rejected Promise differs from a resolved `Delivery` with kind rejected. Neither event automatically cancels other work. A production batch contract must choose limits, partial-success behavior, cancellation, retry identity and post-disconnect recovery.

## 6. Case study: asynchronous cleanup

~~~js
async function withResource(open, action) {
  const resource = await open();
  try {
    return await action(resource);
  } finally {
    await resource.close();
  }
}
~~~

The explicit await allows cleanup to follow completed action settlement. Both action and close can fail; cleanup can replace the original error unless the design preserves both. Garbage collection is not an adequate timely release policy for scarce external resources.

## 7. Case study: streaming a large dataset

~~~ts
async function totalQuantities(
  input: AsyncIterable<unknown>,
  parseQuantity: (value: unknown) => number
): Promise<number> {
  let total = 0;
  for await (const raw of input) {
    const n = parseQuantity(raw);
    const next = total + n;
    if (!Number.isSafeInteger(next)) throw new RangeError("unsafe total");
    total = next;
  }
  return total;
}
~~~

Async iteration allows incremental consumption but does not automatically bound internal producer buffers, item sizes or total processing time. Iterator cleanup on early exit must be tested against the chosen host API. Node streams and actual backpressure mechanisms belong in D03.

## 8. Case study: package boundary and runtime interop

A package may have TypeScript declarations and pass static checking while its emitted JavaScript fails to load under the target runtime. Distinguish public source types, compiler emit and host loading. Type-only imports do not create runtime values; TypeScript paths aliases do not necessarily rewrite emitted import specifiers. Keep imports free of hidden stateful startup effects where possible, and document the actual runtime entrypoints.

## 9. Case study: error categories and information safety

At a backend boundary, separate invalid syntax, valid but unauthorized intent, expected domain rejection, unexpected failure and unknown remote outcome. A typed `Result` cannot make a remote side effect atomic, and a broad catch must not silently turn programming bugs into ordinary business rejections.

An error response should expose actionable, stable codes but not stack traces, secrets or raw sensitive payloads. Preserve internal causal context through redacted operational evidence according to future implementation requirements.

## 10. Transfer checklist: applying D02 to a new backend

Before implementing a feature, answer:

1. **Input:** Which values are untrusted, and where does validation convert unknown to a canonical internal shape?
2. **Types:** What invariants can unions, generics and interfaces enforce statically? Which cannot?
3. **Identity and mutation:** Are shared references, module state or closures creating unintended coupling?
4. **Asynchrony:** Which operations depend on others, and what may safely overlap?
5. **Failures:** What are confirmed, rejected and uncertain outcomes? Is reconciliation needed?
6. **Resources:** Who owns cleanup; how do cancellation and errors affect it?
7. **Interfaces:** Do package types, emitted code and runtime module behavior agree?
8. **Observability:** Which evidence is needed to diagnose failures without leaking sensitive data?

The list informs later Codex-led technical discovery; it must not be converted into a mandatory architecture or stack.

## 11. Boundaries with D01 and D03

**D01** established complexity analysis, concurrency reasoning, dependency graphs and large-data processing concepts. D02 applies JavaScript/TypeScript semantics to those problems. **D03** must investigate V8 behavior, Node.js event-loop phases, libuv, Buffer, streams, EventEmitter, process lifecycle and Node-specific module loading. This handbook section does not claim knowledge of target-runtime performance or operational guarantees without measurements.

## 12. Common cross-cutting mistakes

- Mistaking a valid TypeScript shape for an authenticated and authorized command.
- Assuming structural type checking is a runtime parser.
- Using module-scope mutable data as accidental request state.
- Assuming object equality compares content, or Number arithmetic is always exact.
- Interpreting Promise rejection/timeout as proof no external effect occurred.
- Believing abort or Promise.all rejection rolls back siblings.
- Treating async iteration as automatic bounded memory.
- Overlooking cleanup failures, unhandled rejections and module interop mismatches.
- Building overly complex type-level abstractions instead of explicit product contracts.

## 13. Future-study exercises and answer guide

These are not administered during content authoring. When studying, the learner may: (1) trace closure isolation, (2) model pending/confirmed/rejected/uncertain bookings, (3) distinguish compile-time versus runtime checks, (4) specify bounded concurrent delivery failure policy, (5) design a resource cleanup error strategy, (6) explain precision hazards in aggregations, and (7) identify Node-specific questions deferred to D03.

**Answer guidance:** per-invocation bindings isolate captured state; discriminants express alternatives but require runtime parsing; external data demands validation and authority checks; launched work may persist after aggregate failure; cleanup needs ownership and error preservation; large numeric values may lose precision; Node host behavior requires D03 investigation.

## 14. References and editorial gate

- [ECMAScript Language Specification](https://tc39.es/ecma262/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Node.js Documentation](https://nodejs.org/api/) — runtime topics reserved for D03

**Coverage:** integrates D02 values/coercion, scope, functions, object models, modules, failures, collections, async work, type systems, narrowing, generics, configuration and runtime parsing into backend-language examples.

**Pending:** learner editorial approval, example execution verification. No learning assessment, project catalog, product PRD or implementation work claimed complete.
