# Project Charter — p01-intakeledger-verified-file-intake

**Status:** Learner-approved project direction for Domain 03; Final PRD NOT CREATED. No current implementation started. Historical detailed scope draft remains recoverable from git history.

**Primary purpose:** build a useful product that challenges Node.js runtime fundamentals: event-loop responsiveness, asynchronous I/O, streams/backpressure, filesystem/resource ownership, process isolation, controlled cancellation and diagnostic evidence. These are learning challenges, NOT predetermined implementations.

# P01 — IntakeLedger: Verified File Submission & Handoff — Project Direction

**Domain:** D03 — Node.js Internals  
**Status:** approved_by_learner — product scope approved explicitly with five-project briefs batch on 2026-10-13  
**Concept:** learner-approved in D03 catalog on 2026-10-13  
**project briefs product-owner approval:** explicitly confirmed 2026-10-13; implementation details deferred  
**Implementation / learner assessment:** not_started / deferred  
**Approval meaning:** review the problem, users, first-version in/out/deferred scope and indispensable observable outcomes, **not technical architecture or every numerical policy**. The five project briefs are authored together but each retains its own approval status.



## 1. Problem and motivation

Teams receiving files from customers, contractors and vendors often cannot distinguish a file that was merely selected, partly transferred, formally accepted, later rejected or received by an authorized colleague. Messages and folder links rarely preserve an understandable submission-to-handoff record. **IntakeLedger** is a bounded submission and handoff product: the main value is a trustworthy acceptance and recipient acknowledgment trail, not transformation or general storage.



## 2. Audience and actors

- **Sender:** creates a named package, submits supported files and sees intake outcome.
- **Recipient:** accesses only packages they are permitted to receive, retrieves accepted files and acknowledges or flags handoff problems.
- **Intake operator:** reviews rejected/incomplete submissions and supportable evidence of acceptance.
- **Workspace manager:** administers the product's allowed sender/recipient visibility and access at the product level.

These are product responsibilities, not a requirement for a particular identity, permission or deployment implementation.



## 3. Goals and measurable outcomes

A sender can complete a supported submission and understand the precise outcome for each file and the package; a permitted recipient can identify, retrieve and acknowledge accepted files. Measurable checks: no package is labeled fully accepted when required files are incomplete; a rejection gives a meaningful category; recipient acknowledgment is distinguishable from successful byte acceptance; past state changes are visible without fabricating legal proof.

**Evidence for acceptance:** demonstration on explicitly supported sample cases and negative/failure cases; no invented latency, capacity, retention or success-rate SLA. The first-version numeric boundaries are agreed during separate product discovery before dependent engineering decisions.



## 4. Product boundary: in / out / deferred

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

The above determines **what product is being built**. Detailed policies in Section 11 must remain compatible with this boundary; they do not authorize a new major feature.



## 12. Explicit non-goals

No automatic malware-safety certification, legal receipt certification, universal resumable transfers, arbitrary file execution or content transformation in V1.

No implementation code, technical ADR, architecture or library selections are authorized by this project briefs.



## 13. Domain learning outcomes and why this project is valuable

**D03 learning coverage to challenge if the project is later built:** D03-C03–C09 (runtime, bytes, files, streams, pipeline errors), C14 (memory), C15–C18 (context, shutdown, diagnostic accountability).

**Distinctness / portfolio rationale:** Unlike D01's Large Dataset Processing Workspace, the value is **verified submission, recipient access and handoff accountability**, not data transformation; unlike P02, it does not produce derived media.

These are *potential* learning challenges, not a mandate to implement a specific Node mechanism or proof of learner proficiency. D01/D02 existing project briefs and their scope remain unchanged.



## 14. Approval record

- **2026-10-13:** learner explicitly approved the **five D03 candidate concepts** as a catalog, not their detailed project briefs.
- **2026-10-13:** this document authored and author-reviewed against `templates/project-charter.md`, `docs/quality-gates.md` and the approved catalog; status **in_review**.
- **2026-10-13:** learner explicitly approved all five project briefs together, including this product's problem, audience, V1 in/out/deferred boundaries and externally observable invariants.
- **No implementation readiness claim:** detailed first-version policies can be resolved at the separate selected-project kickoff, with learner approval before dependent technical design. Implementation, external tests and learner assessment have **not** begun.

**Next gate:** all five project briefs have explicit learner product approval. Perform final D03 coverage/content closure audit; no implementation follows automatically. Actual project kickoff/technical decisions take place in a **separate local repository** with Codex and verified installed Matt Pocock skills; no scope expansion without learner approval.


## Implementation kickoff gate

The independent-project Codex process must create and obtain explicit owner approval for `product-discovery.md`, then `final-charter.md`, then `module-plan.md`. Each approved module uses module-scoped technical discovery → to-spec → to-tickets → implementation → verification. Product scope cannot be expanded to force any Node.js mechanism.
