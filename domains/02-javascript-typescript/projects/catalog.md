# D02 — JavaScript & TypeScript Project Catalog

**Status:** proposed_pending_learner_review
**Curriculum:** all 16 chapters learner-approved (editorial review; examples not independently executed).
**Phase:** product concept selection. No candidate approved and no PRD authored yet.
**Scope rule:** specify product users, problems, essential capabilities and distinct learning coverage; do not select framework, storage, hosting, APIs, implementation architecture or code.

## Selection principle

Choose products that solve **different user problems**, not four variants of one JavaScript exercise. D02 projects should pressure-test language semantics, type contracts, asynchronous outcomes and safe boundary behavior through realistic product requirements. D01 already covers a workload complexity observatory, resource allocation simulator, dependency workflow simulator and large dataset processing workspace; avoid duplicating those products. Node runtime internals and infrastructure are reserved for D03.

## P01 — ContractGuard: API Data Contract Studio

**Users:** teams publishing and consuming external business APIs.

**Problem:** incoming/outgoing data formats change, and invalid or ambiguous inputs lead to silent behavior differences, broken integrations and hard-to-debug errors.

**Product concept:** a workspace to publish named API data contracts, submit example payloads, inspect accepted/rejected results and see an understandable explanation of each mismatch. Versioned contract comparisons reveal breaking changes and compatibility risks.

**Distinctive product capabilities:** manage contract versions; define required/optional fields and discriminated variants; evaluate sample payloads; report per-field issues; compare old/new contract acceptance; export human-readable compatibility reports.

**D02 learning coverage:** values, null/undefined, coercion, object shapes, runtime parsing, TypeScript structural types, discriminated unions, module/package interfaces and error modeling.

**Not this product:** a general API gateway, authentication system, database schema migrator or merely a collection of small validators.

**Open product decisions:** contract authoring audience and format; strict-versus-permissive extras; version retention; exact compatibility guarantees.

## P02 — DispatchDesk: Multi-Recipient Delivery Operations

**Users:** small organizations managing customer notifications or operational outbound messages.

**Problem:** sending many messages produces partial success, duplicate attempts, unclear timeouts and uncertain final outcomes, leaving staff unable to safely reconcile delivery.

**Product concept:** staff prepare recipient batches, initiate a delivery campaign, review per-recipient states, pause or cancel eligible pending work and reconcile unknown attempts.

**Distinctive product capabilities:** draft and preview a campaign; validate recipients and message requirements; initiate a batch; show queued/in-progress/delivered/rejected/unknown results; request cancellation; retry eligible items without duplicating confirmed outcomes; export an audit-oriented result summary.

**D02 learning coverage:** Promises, async composition, bounded work, cancellation semantics, idempotent user intent, result unions, closures, error propagation and cleanup.

**Not this product:** a generic job queue, full marketing automation suite, email/SMS provider implementation or guaranteed instant cancellation of external delivery.

**Open product decisions:** meaning of delivered; duplicate-suppression policy; retry eligibility; cancellation guarantees; retention and privacy.

## P03 — PolicyLens: Business Rule & Decision Explanation Workspace

**Users:** operations and compliance staff who need to understand why a business request is eligible or declined.

**Problem:** business rules are hard to audit, contradictory outcomes are hard to explain, and users cannot compare proposed rule changes against realistic cases.

**Product concept:** create versioned eligibility policies and test business cases to receive a decision plus an explainable trace of which rules applied.

**Distinctive product capabilities:** author policies from a restricted catalog of supported conditions; manage active and draft versions; submit individual and grouped examples; classify allowed/denied/needs-review outcomes; compare decisions between versions; produce an explanation report.

**D02 learning coverage:** discriminated unions, narrowing, exhaustive cases, composable functions, immutability, object models, type-safe rule shapes and runtime validation.

**Not this product:** unrestricted execution of user-supplied JavaScript, a general authorization platform, a graph/dependency workflow simulator or an AI decision system.

**Open product decisions:** allowed rule vocabulary; conflict priorities; explanation detail; policy approval and activation.

## P04 — PackagePassport: Integration Compatibility Registry

**Users:** maintainers of internal packages and teams integrating shared components.

**Problem:** an integration appears type-correct but fails because its published package interface, declared module format or supported execution environment does not match consumers' expectations.

**Product concept:** maintain a catalog of package releases with public export contracts, compatibility claims and reproducible integration scenarios; provide a compatibility matrix and migration notes.

**Distinctive product capabilities:** register releases; document published exports and consumer expectations; compare contract changes; record scenario outcomes and unsupported combinations; highlight compatibility risks; generate upgrade guidance.

**D02 learning coverage:** ESM/CommonJS concepts, export boundaries, TypeScript declarations, configuration/interop, error classification, object and collection modeling.

**Not this product:** a package manager, dependency resolver, code compiler, CI service or Node loader diagnostic runtime.

**Open product decisions:** which environments to catalog; whether scenarios are manually recorded or verified elsewhere; evidence/provenance standards; compatibility labels.

## P05 — SubscriptionHub: Live Event Subscription Console

**Users:** product operators tracking meaningful event subscriptions such as stock alerts, service-status changes or customer activity notifications.

**Problem:** subscribers need an understandable view of event streams, subscription lifetimes, gaps and failures; bursty updates can lead to confusion about lost or repeated events.

**Product concept:** users create subscriptions to defined event categories, inspect recent event history, pause/resume subscriptions where supported, and see explicit delivery-gap and reconnection states.

**Distinctive product capabilities:** define a subscription with filters; show ordered events and timestamps; distinguish live/paused/interrupted status; surface missing-event warnings; allow controlled resume; summarize events by category and time window.

**D02 learning coverage:** iterables, event abstractions, push/pull, backpressure policy, async state, resource lifetimes, discriminated message variants and cancellation.

**Not this product:** a universal event broker, real-time transport infrastructure, monitoring vendor clone or large-dataset processing workspace.

**Open product decisions:** event ordering and delivery guarantees; gap detection; retention; pause semantics; subscriber limits.

## Comparison and coverage

| Candidate | Distinct primary problem | Strongest D02 themes | Distinction from D01 |
|---|---|---|---|
| P01 ContractGuard | API contract drift and validation | Types, runtime boundaries, modules | Contract correctness, not dataset processing |
| P02 DispatchDesk | Operational message delivery outcomes | Promises, errors, cancellation | Delivery workflow, not resource-allocation simulation |
| P03 PolicyLens | Explainable business decisions | Unions, functions, state modeling | Policy evaluation, not dependency graph workflows |
| P04 PackagePassport | Package interface compatibility | Modules, TS config and interop | Integration contracts, not complexity analysis |
| P05 SubscriptionHub | Event subscription and gap visibility | Iteration, events, lifetime | Subscriber product, not bulk-data workspace |

**Coverage recommendation:** retain all five distinct candidates if strong portfolio breadth matters, with P01–P03 as the strongest starting shortlist and P04–P05 providing specialized variety. This recommendation is not learner approval.

## Review gate

Learner chooses, rejects or revises candidate concepts and their distinct boundaries **before** any PRDs are authored. Product PRDs should later cover actors, workflows, scope, non-goals, product invariants and acceptance criteria only. They must not prescribe technical architecture, language libraries or service deployment choices. Implementation is later performed in separate repositories with Codex. Learning assessments remain deferred.
