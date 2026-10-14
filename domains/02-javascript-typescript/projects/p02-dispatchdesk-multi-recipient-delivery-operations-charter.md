# Project Charter — P02 — DispatchDesk: Multi-Recipient Delivery Operations

**Domain:** D02  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic JavaScript/TypeScript learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Problem and motivation

Operational teams need to contact many recipients, but bulk dispatch creates uncertain results: some attempts succeed, some are rejected, some remain pending and others lose confirmation. Operators cannot safely distinguish retries from duplicates or tell which recipients need attention. DispatchDesk provides a focused workspace for preparing, initiating, tracking and reconciling a batch of outgoing messages.





## Audience and actors

- **Operator:** prepares batches, reviews recipient validation and starts eligible sends.
- **Supervisor:** reviews outcomes, resolves uncertain cases under policy and authorizes sensitive cancellation/retry actions.
- **Auditor:** views historical intent, actions and recipient-level outcomes without modifying them.
- **Recipient:** receives a message externally but is not necessarily an authenticated workspace user.

Specific role/approval rules are open product decisions; this project briefs does not prescribe identity infrastructure.





## Goals and measurable outcomes

Every batch gives a clearly understandable answer to: which intended recipients were eligible, which attempts were started, which deliveries are confirmed, which were rejected, which remain pending and which outcomes are uncertain. Users can distinguish a retry of an existing intent from a new delivery. Every recipient result exposes its authoritative evidence level. Quantitative capacity, latency, rate, retention and confirmation targets require product approval rather than guessed values.





## In scope, deferred and out of scope

**In:** compose a batch with one message and recipient set; preview and validate; save drafts; initiate a batch; per-recipient outcome tracking; progress and aggregate summary; cancel unstarted work where permitted; retry/reconcile eligible unknown or failed attempts; readable action history; export outcome report.

**Deferred:** multi-channel routing, personalization templates, scheduling campaigns, approval chains, inbound replies, complex audience segmentation and recurring campaigns.

**Out:** marketing automation suite, contact CRM, universal message broker, building actual telecom infrastructure, promising message reads/open rates, unrestricted provider-specific configuration, guaranteed rollback of deliveries.





## Explicit non-goals

Not a broadcast broker, provider implementation, scheduling platform, CRM, marketing suite, guaranteed delivery/reading system or bulk spam utility. No claim of sending through any named commercial service is made.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
