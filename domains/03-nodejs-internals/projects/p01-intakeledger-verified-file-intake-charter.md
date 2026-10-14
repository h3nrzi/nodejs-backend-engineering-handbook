# Project Charter — P01 — IntakeLedger: Verified File Submission & Handoff

**Domain:** D03  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic Node.js runtime learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Problem and motivation

Teams receiving files from customers, contractors and vendors often cannot distinguish a file that was merely selected, partly transferred, formally accepted, later rejected or received by an authorized colleague. Messages and folder links rarely preserve an understandable submission-to-handoff record. **IntakeLedger** is a bounded submission and handoff product: the main value is a trustworthy acceptance and recipient acknowledgment trail, not transformation or general storage.





## Audience and actors

- **Sender:** creates a named package, submits supported files and sees intake outcome.
- **Recipient:** accesses only packages they are permitted to receive, retrieves accepted files and acknowledges or flags handoff problems.
- **Intake operator:** reviews rejected/incomplete submissions and supportable evidence of acceptance.
- **Workspace manager:** administers the product's allowed sender/recipient visibility and access at the product level.

These are product responsibilities, not a requirement for a particular identity, permission or deployment implementation.





## Goals and measurable outcomes

A sender can complete a supported submission and understand the precise outcome for each file and the package; a permitted recipient can identify, retrieve and acknowledge accepted files. Measurable checks: no package is labeled fully accepted when required files are incomplete; a rejection gives a meaningful category; recipient acknowledgment is distinguishable from successful byte acceptance; past state changes are visible without fabricating legal proof.

**Evidence for acceptance:** demonstration on explicitly supported sample cases and negative/failure cases; no invented latency, capacity, retention or success-rate SLA. The first-version numeric boundaries are agreed during separate product discovery before dependent engineering decisions.





## Product boundary: in / out / deferred

**In scope for V1:**
- Create a named package with a stable reference and intended recipient under a limited workspace.
- Submit one or more files within a published supported format/size/count policy.
- Report per-file uploaded/incomplete/accepted/rejected status and explain validation failures.
- Present an overall package state based on its accepted contents and submission finalization.
- Allow permitted recipients to list, inspect, and retrieve accepted files, plus explicitly acknowledge receipt or raise a handoff issue.
- Show a concise sender/recipient-facing history of meaningful submission, validation and handoff events.

**Out of scope:**
- Arbitrary bulk dataset filtering or ETL; media editing; general object-storage hosting.
- Real-time collaborative document authoring, legal e-signatures or court-admissible chain-of-custody guarantees.
- Universal interrupted-upload resume, arbitrary file execution, or a promise that scanning makes all files malware-free.
- Cross-organization marketplace, payment/contract management or unlimited uploads.

**Deferred beyond V1 or subject to subsequent explicit scope approval:**
- Resume interrupted transfers from exact offsets and multi-device draft continuation.
- Automated content inspection beyond declared V1 supported validation and integrated third-party scanners.
- Enterprise retention/legal hold, cryptographic signing, complex approval chains and external storage integrations.

The above determines **what product is being built**. Any future Product Discovery choices must remain compatible with this initial boundary unless the owner explicitly changes it.





## Explicit non-goals

No automatic malware-safety certification, legal receipt certification, universal resumable transfers, arbitrary file execution or content transformation in V1.

No implementation code, technical ADR, architecture or library selections are authorized by this project briefs.





## Domain learning outcomes and why this project is valuable

**D03 learning coverage to challenge if the project is later built:** D03-C03–C09 (runtime, bytes, files, streams, pipeline errors), C14 (memory), C15–C18 (context, shutdown, diagnostic accountability).

**Distinctness / portfolio rationale:** Unlike D01's Large Dataset Processing Workspace, the value is **verified submission, recipient access and handoff accountability**, not data transformation; unlike P02, it does not produce derived media.

These are *potential* learning challenges, not a mandate to implement a specific Node mechanism or proof of learner proficiency. D01/D02 existing project briefs and their scope remain unchanged.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
