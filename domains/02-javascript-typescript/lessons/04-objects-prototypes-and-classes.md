# Chapter 04 — Objects, Prototypes and Classes

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Learning assessment:** deferred until the learner explicitly starts studying  
**Examples:** educational and not independently executed

## Outcomes and prerequisites

Requires values, references, lexical scope and function invocation (Chapters 01–03). This chapter explains object identity, property mechanics, delegation through prototypes, class syntax and safe composition. Readers should eventually be able to explain a property lookup, differentiate own/inherited properties, predict receiver behavior, protect object boundaries and identify class inheritance trade-offs in backend code.

## 1. Objects are identities with properties

An object is a reference-identified value holding properties. Property keys are strings or symbols; numerical keys are coerced to strings. Two separate literals are distinct objects even when they contain identical entries.

```js
const a = { id: 1 };
const b = { id: 1 };
a === b; // false
const alias = a;
alias.id = 2;
a.id; // 2
```

Property access may use dot notation or brackets. Brackets are necessary for computed or otherwise invalid identifier keys. Missing property reads commonly return `undefined`; that does not establish whether the property exists. `Object.hasOwn(obj, key)` tests own-property presence without relying on the object's possibly overridden methods.

## 2. Descriptors and property operations

An own *data property* has a value plus writable, enumerable and configurable attributes; an *accessor property* has get/set functions and enumerability/configurability. Assignment, deletion, reflection and enumeration obey these attributes and the object's extensibility.

```js
const user = {};
Object.defineProperty(user, "id", {
  value: "u-17",
  writable: false,
  enumerable: true,
  configurable: false
});
Object.getOwnPropertyDescriptor(user, "id");
// { value: "u-17", writable: false, enumerable: true, configurable: false }
```

In strict code, assigning a non-writable property throws; in non-strict code it can fail silently. A non-configurable data property generally cannot be deleted. `Object.keys` lists enumerable own string keys; `Reflect.ownKeys` includes own string and symbol keys, enumerable or not. Do not treat enumeration results as a complete schema validator.

## 3. Own properties, inherited properties and the prototype chain

Each ordinary object has an internal `[[Prototype]]` link to an object or `null`. Reading a property first considers the object's own property, then traverses prototypes until found or the chain ends. A missing property yields `undefined`.

```js
const shared = { role: "viewer" };
const account = Object.create(shared);
account.id = "a1";

account.role;                   // "viewer" (inherited)
Object.hasOwn(account, "role"); // false
"role" in account;             // true
account.id;                     // "a1"
```

The `in` operator includes inherited members; `Object.hasOwn` excludes them. A property shadowed by an own property hides an inherited property of the same name without erasing it.

Prototypes enable delegation, not class-based copying. Avoid modifying built-in prototypes in shared services because changes may affect unrelated code.

## 4. Constructor functions and new

With an ordinary constructible function, `new` creates an object whose prototype is usually taken from the constructor's `.prototype`, invokes the constructor with that receiver, and returns an appropriate result under the constructor rules.

```js
function Ticket(code) {
  this.code = code;
}
Ticket.prototype.display = function () {
  return this.code;
};
const ticket = new Ticket("T-42");
ticket.display(); // "T-42"
Object.getPrototypeOf(ticket) === Ticket.prototype; // true
```

A function's `.prototype` property is not the same concept as that function object's own `[[Prototype]]`. Arrow functions are not constructors. A constructor's explicit object return can replace its normally constructed result; do not assume every function follows exactly the same rules.

## 5. Class syntax and methods

`class` provides syntax for declaring constructors, methods, fields and inheritance; it does not replace prototypes with a separate object model. Instance methods normally live on the class prototype and are shared, whereas public instance fields are initialized on instances.

```js
class Invoice {
  status = "draft";
  constructor(id) { this.id = id; }
  finalize() {
    if (this.status !== "draft") throw new Error("invalid state");
    this.status = "final";
  }
}
const invoice = new Invoice("i1");
invoice.finalize();
invoice.status; // "final"
```

Class bodies execute in strict mode. A class constructor cannot be called like an ordinary function without `new`. Method extraction can still lose `this`; class syntax does not automatically bind methods.

## 6. Inheritance, super and method dispatch

`extends` configures prototype relationships and subclass construction behavior. `super` in a derived constructor invokes its parent constructor before the derived class can use its own `this`. `super.method()` resolves from the parent prototype but calls with the current receiver.

```js
class Record {
  describe() { return "record"; }
}
class EventRecord extends Record {
  describe() { return super.describe() + ": event"; }
}
new EventRecord().describe(); // "record: event"
```

Subclassing creates coupling to inherited behavior; a deep hierarchy makes changes harder to reason about. In backend design, composition often offers clearer responsibilities: pass an explicit strategy or service collaborator rather than relying on fragile inheritance.

## 7. Private fields, accessors and encapsulation

Class `#private` fields are language-enforced private names, distinct from TypeScript's compile-time `private` modifier.

```js
class Counter {
  #count = 0;
  get count() { return this.#count; }
  increment() { this.#count += 1; }
}
const c = new Counter();
c.increment();
c.count; // 1
// c.#count; // SyntaxError outside the class body
```

Private fields cannot be accessed as ordinary string-key properties, and accessors can run code during reads and writes. Object property access is not always a side-effect-free lookup. A private field supports local encapsulation but does not guarantee data authorization, encrypted storage or multi-request concurrency correctness.

## 8. Object integrity operations

`Object.preventExtensions`, `Object.seal` and `Object.freeze` constrain object shape and property updates with different strengths. A freeze is **shallow**.

```js
const config = Object.freeze({ nested: { retries: 1 } });
// config.extra = true; // rejected/throws in strict mode
config.nested.retries = 2; // allowed: nested object not frozen
```

A copied object is also usually a shallow copy:

```js
const original = { nested: { enabled: true } };
const copy = { ...original };
copy.nested.enabled = false;
original.nested.enabled; // false
```

Distinguish a policy of not mutating shared state from actual immutable data representation. `readonly` in TypeScript is not runtime freezing.

## 9. Object composition and API boundaries

Model behavior through collaborators where a long inheritance tree would mix unrelated concerns.

```js
function createNotifier(deliver) {
  return {
    notify(message) {
      if (typeof message !== "string") throw new TypeError("message");
      return deliver(message);
    }
  };
}
const notifier = createNotifier(message => ({ delivered: true, message }));
notifier.notify("ready");
```

The dependency is passed explicitly and can be substituted in educational tests. This is one possible organization technique, not a mandated architecture. Callback outcome semantics—including thrown errors versus Promise rejection—must be documented.

## 10. Property injection, untrusted keys and surprising behavior

Objects inherited from `Object.prototype` may expose inherited properties. Untrusted dynamic property names can cause prototype-related security problems in unsafe merge/write patterns. `__proto__` has historically special behavior in ordinary object contexts, and simple `target[key] = value` is not a sound general-purpose arbitrary-key storage contract.

```js
const data = Object.create(null);
data["constructor"] = "user-provided";
Object.hasOwn(data, "constructor"); // true
```

A null-prototype dictionary avoids inherited string-key names but also lacks inherited methods. `Map` is often appropriate for arbitrary key/value collections. For untrusted inputs, validate permissible keys and explicitly define merge behavior rather than relying on a single magic sanitizer. Deep prototype-pollution exploit design is outside this lesson.

## 11. JSON, prototype and class instances

JSON parses data, not arbitrary JavaScript object behavior. Methods, private fields, prototype identities and several JavaScript values cannot be faithfully serialized with ordinary JSON.

```js
const payload = JSON.parse('{"id":"x"}');
payload instanceof Invoice; // false
```

Treat deserialized inputs as plain untrusted data until validated; parsing a record is not equivalent to reconstructing a class instance with enforced invariants.

## 12. TypeScript's structural typing versus runtime classes

TypeScript describes object shapes structurally in many settings. An interface does not exist as a runtime constructor, and `instanceof` cannot check an interface.

```ts
interface HasId { id: string }
function display(item: HasId): string { return item.id; }
const x = { id: "u1", extra: true };
display(x); // "u1"
```

Object shape compatibility, excess-property checks and access modifiers have nuances explored in Chapters 11–13. A TypeScript object signature never removes the need to validate an external JSON payload.

## 13. Common mistakes

- Treating equal-looking object literals as the same identity.
- Confusing an object's `[[Prototype]]` with a constructor's `.prototype`.
- Assuming `in` implies an own property.
- Forgetting property getters can run arbitrary code.
- Believing extracted class methods stay bound.
- Assuming `Object.freeze` recursively freezes nested objects.
- Using unvalidated external keys in object merge operations.
- Treating TypeScript interfaces or modifiers as runtime access controls.
- Expecting JSON parsing to restore methods or private class state.
- Assuming classes guarantee correct business invariants merely because methods are named appropriately.

## 14. Exercises for the future learning phase

1. Explain why `Object.hasOwn(account, "role")` is false but `"role" in account` is true.
2. Predict the result of comparing `{ id: 1 } === { id: 1 }`.
3. Distinguish `Object.keys` from `Reflect.ownKeys`.
4. Explain why extracting `invoice.finalize` may fail under strict mode.
5. Show why `Object.freeze({ nested: {} })` doesn't freeze the nested object.
6. Compare `#count` with TypeScript `private count` as runtime enforcement.
7. Identify which parts of a class instance survive JSON serialization.
8. Explain two reasons to use explicit composition instead of deep inheritance in a backend feature.
9. Explain why arbitrary user-controlled keys need careful handling even if an object has the correct TypeScript shape.

**Answer guide:** inherited vs own; identity comparison false; enumerable own strings vs all own keys; detached receiver is undefined; shallow freeze; # private enforced in JS runtime; ordinary JSON preserves representable enumerable data only; composition reduces coupling; static shapes don't validate inputs or block prototype hazards.

## 15. References and version notes

- [ECMAScript — Objects](https://tc39.es/ecma262/#sec-ecmascript-language-types-object-type)
- [ECMAScript — Property Attributes](https://tc39.es/ecma262/#sec-property-attributes)
- [ECMAScript — Class Definitions](https://tc39.es/ecma262/#sec-class-definitions)
- [MDN — Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN — Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [MDN — Private elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
- [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

Behaviors described concern JavaScript and TypeScript language contracts; Node-specific object internals and runtime performance investigations belong in D03.

## 16. Editorial gate

Covered: identity, descriptors, ownership, prototype chain, constructors, class syntax, `super`, encapsulation, object integrity, composition, key-safety, JSON boundary, TypeScript structural typing and failure cases.

**Pending:** learner editorial approval, independent execution checks and any requested corrections. This is lesson content, not an assessment outcome or implementation claim.
