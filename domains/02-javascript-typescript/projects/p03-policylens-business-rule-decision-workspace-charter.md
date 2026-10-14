# Project Charter — P03 — PolicyLens project briefs

**Domain:** D02  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic JavaScript/TypeScript learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Product overview
Policy authors define versioned, restricted (non-executable) business rules; analysts evaluate cases and see an allowed/denied/needs_review decision with matched-rule explanation. Reviewers publish immutable versions; auditors inspect historical decisions and compare version changes.

## Scope — confirmed product boundary

**In scope:** a workspace for *explainable business-policy evaluation*. Users create draft/published rule policies from a finite non-executable vocabulary; define explicit conflict/precedence and no-match behavior; validate and evaluate cases; inspect why a decision was reached; save sample cases; compare versions; inspect immutable publication history; enforce editorial visibility/permission boundaries; and export reports.

**Out of scope:** executing user-supplied scripts, acting as a production authorization/enforcement gateway, autonomous AI policy decisions, regulatory certification and a generic graph/workflow simulator. PolicyLens is a business-decision explanation product, not a system that independently enforces its results.

**Not committed to the first version:** capabilities beyond the approved in-scope set, including broader rule domains or external integrations, require a later product-scope decision. This is not permission to silently add them during technical implementation.

**Actors and core journeys:** policy authors draft conditions and define declared outcomes; reviewers publish permitted versions; analysts submit a case and inspect the decisive matched rules; reviewers compare a proposed version with past examples; auditors recover exact historical version/decision explanations. The product must distinguish **invalid input** from a valid **denied** business result.

**Approval meaning and decision timing:** these in/out boundaries and core behaviors are learner-approved. Specific initial business domain, supported condition vocabulary, rule-conflict policy, default outcome, roles and resource limits are documented below as **open product questions**, not preselected decisions. At the separate project kickoff, Codex uses actually installed Matt Pocock skills to ask the questions needed for the chosen first version, recommends options, and records choices only with explicit learner approval. No technical architecture, database or framework is chosen here.

## D02 coverage and approval
Exercises discriminated unions, exhaustive handling, rule composition, object contracts, and runtime validation. Concept and project briefs editorially approved by learner on 2026-10-12 for the problem, audience, approved scope and essential behavior. Open product policies remain for learner-approved Matt-guided discovery at project kickoff. Learning assessment and implementation deferred.

## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
