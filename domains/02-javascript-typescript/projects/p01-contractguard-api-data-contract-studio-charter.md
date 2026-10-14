# Project Charter — p01 contractguard api data contract studio

**Status:** learner-approved project concept/educational direction from D01–D03 authoring; **no final V1 PRD has been produced**.  
**Authority:** handbook educational intent and initial product boundary; the separate project Codex process owns Product Discovery, Final PRD and Module Plan.  
**Migration:** adapted from the original learner-approved product-scope draft (preserved in repository history); the following sections are framing input, not an executable specification or frozen technical architecture.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive product requirements from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Historical project concept and source framing

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** approved by learner, 2026-10-12  
**initial project brief approval:** learner-approved, 2026-10-12; product questions remain open  
**Implementation:** not started; technical choices deliberately excluded
**Approval boundary:** editorially approved problem, users, in/out/deferred scope and indispensable product behavior; detailed open policies do not block this approval.
**Decision timing:** use installed Matt Pocock skills with Codex at this project's kickoff for unresolved first-version decisions; learner approves consequential choices and any scope change before dependent technical design.



## 1. Problem and motivation

Teams integrating external business APIs frequently discover changed or ambiguous payload requirements only after a request fails or data is silently misinterpreted. The product gives API publishers and consumers a shared place to describe expected data, evaluate examples and explain contract changes without needing to operate a production API.



## 2. Audience and actors

- **Contract author:** creates and edits draft contracts and versions.
- **Reviewer:** inspects changes, examples and compatibility evidence and approves publication where enabled.
- **API consumer:** explores published contract versions and checks representative payloads.
- **Workspace manager:** governs who may publish, archive or review contracts. Detailed role configuration is a product decision pending review.

These are product roles, not a prescribed authentication or authorization architecture.



## 3. Goals and measurable outcomes

Users can (a) express a contract unambiguously, (b) see whether a sample matches it, (c) identify which fields failed and why, and (d) compare two versions before adoption. Proposed measurable product checks: identical contracts and payloads yield the same decision; every rejection includes actionable paths/reason categories; a published version remains reviewable after newer versions appear. Quantitative response-time targets and retention limits remain open rather than invented.



## 4. Scope

**In scope:** named contract registry; draft and published versions; field definitions; required/optional/nullability and discriminated alternatives; bounded nested arrays and objects; explicit accepted primitive representations; evaluation of individual and grouped example payloads; structured issue lists; two-version comparison; human-readable comparison reports; access to earlier published results.

**Deferred pending decisions:** team collaboration permissions, reusable shared definitions, large batch processing, import/export of external schema dialects, automated consumer adoption tracking.

**Out of scope:** proxying live API traffic, enforcing contracts on production systems, API request delivery, full API design suite, arbitrary executable user rules, database migration, generating production validators or code.



## 12. Explicit non-goals

Not a live traffic gateway, wire-protocol test runner, business authorization validator, database migration service, universal JSON Schema interpreter, code-execution sandbox or compiler. The product may clarify data contracts but cannot prove operational compatibility with an unspecified production API.



## 14. Approval record

**2026-10-12:** P01 product concept approved as part of five-candidate D02 catalog.  
**initial project brief editorial review:** learner-approved, 2026-10-12; unresolved product decisions remain documented.  
**Implementation, architecture, stack and learning assessment:** not started/selected.


## Implementation kickoff gate

When selected, hand this Charter to Codex. Codex must produce `product-discovery.md`, then an owner-approved `final-prd.md`, then an owner-approved `module-plan.md`. Technical discovery is **scoped to the current module** and feeds `to-spec` → `to-tickets` → implementation → verified module acceptance. No code or product implementation is claimed by this Charter.
