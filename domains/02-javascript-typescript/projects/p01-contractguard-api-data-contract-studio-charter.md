# Project Charter — p01 contractguard api data contract studio

**Domain:** D02  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic JavaScript/TypeScript learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Problem and motivation

Teams integrating external business APIs frequently discover changed or ambiguous payload requirements only after a request fails or data is silently misinterpreted. The product gives API publishers and consumers a shared place to describe expected data, evaluate examples and explain contract changes without needing to operate a production API.

## Audience and actors

- **Contract author:** creates and edits draft contracts and versions.
- **Reviewer:** inspects changes, examples and compatibility evidence and approves publication where enabled.
- **API consumer:** explores published contract versions and checks representative payloads.
- **Workspace manager:** governs who may publish, archive or review contracts. Detailed role configuration is a product decision pending review.

These are product roles, not a prescribed authentication or authorization architecture.

## Goals and measurable outcomes

Users can (a) express a contract unambiguously, (b) see whether a sample matches it, (c) identify which fields failed and why, and (d) compare two versions before adoption. Proposed measurable product checks: identical contracts and payloads yield the same decision; every rejection includes actionable paths/reason categories; a published version remains reviewable after newer versions appear. Quantitative response-time targets and retention limits remain open rather than invented.

## Scope

**In scope:** named contract registry; draft and published versions; field definitions; required/optional/nullability and discriminated alternatives; bounded nested arrays and objects; explicit accepted primitive representations; evaluation of individual and grouped example payloads; structured issue lists; two-version comparison; human-readable comparison reports; access to earlier published results.

**Deferred pending decisions:** team collaboration permissions, reusable shared definitions, large batch processing, import/export of external schema dialects, automated consumer adoption tracking.

**Out of scope:** proxying live API traffic, enforcing contracts on production systems, API request delivery, full API design suite, arbitrary executable user rules, database migration, generating production validators or code.

## Explicit non-goals

Not a live traffic gateway, wire-protocol test runner, business authorization validator, database migration service, universal JSON Schema interpreter, code-execution sandbox or compiler. The product may clarify data contracts but cannot prove operational compatibility with an unspecified production API.

## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
