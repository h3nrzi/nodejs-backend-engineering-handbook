# P01 — IntakeLedger: Verified File Submission & Handoff — Product Requirements

**Domain:** D03 — Node.js Internals  
**Status:** in_review — proposed product boundaries awaiting **one batch learner approval**  
**Concept:** learner-approved in D03 catalog on 2026-10-13  
**PRD product-owner approval:** pending  
**Implementation / learner assessment:** not_started / deferred  
**Approval meaning:** review the problem, users, first-version in/out/deferred scope and indispensable observable outcomes, **not technical architecture or every numerical policy**. The five PRDs are authored together but each retains its own approval status.

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

## 5. Product capabilities and user journeys

1. **Send:** sender creates an intake for a recipient; sees package ID and supported file requirements.
2. **Submit:** sender adds file(s), sees per-file validation and a package summary, and explicitly finishes submission.
3. **Recover:** sender returns to a recognized failed/incomplete intake to retry an eligible file without overwriting a previously accepted file silently.
4. **Receive:** recipient sees a package only when eligible and can download accepted files and read integrity/format results.
5. **Acknowledge:** recipient explicitly acknowledges retrieval or reports a problem; sender and operator see a truthful handoff status.

## 6. Functional requirements

**FR-01.** A package has stable identity, sender context, intended recipient, human-readable label and visible lifecycle.

**FR-02.** Each submitted file has a distinct identity, submitted filename/format/size metadata and validation outcome; displayed metadata is not treated as trusted proof until checked.

**FR-03.** The product documents supported file categories, limits and required validation checks before a sender finalizes intake.

**FR-04.** Incomplete or unsupported files receive non-success outcomes and a usable reason; invalid bytes cannot be silently accepted as valid.

**FR-05.** The product distinguishes `incomplete`, `submitted`, `accepted`, `needs_attention` and other agreed package outcomes with unambiguous meaning; package acceptance reflects required content checks.

**FR-06.** A finalized accepted file is retrievable unchanged within the supported retention window; any mismatch is disclosed and the artifact is not reported as verified.

**FR-07.** A recipient without access cannot list, retrieve or acknowledge another recipient's file/package.

**FR-08.** Recipient acknowledgment is an explicit action recorded separately from acceptance of uploaded bytes and separately from opening a download link.

**FR-09.** A repeated submission/retry is distinguishable from a prior accepted file version; operations do not silently replace accepted artifacts or historical evidence.

**FR-10.** Sender and recipient can inspect event history including what happened, which package/file was affected, reported result and any known uncertainty.

**FR-11.** An input limit or storage/validation failure results in an honest state and never an invented successful handoff.

**FR-12.** When a package cannot be retrieved or an acknowledgment response is lost, the displayed state is reconciled from authoritative recorded events rather than inferring success from a timeout.

## 7. Engineering problems and externally observable invariants

**Core product invariants:**
- A package's `accepted` status never hides an incomplete required file under the declared V1 rules.
- Original accepted bytes are not silently changed by validation, retries or a later package revision.
- An upload accepted by the intake does **not** imply recipient receipt; an acknowledgment never impersonates a sender's upload success.
- An unauthorized actor sees neither protected file data nor the existence/details of another party's private intake.
- Every recorded transition refers to the correct package/file version, not a stale draft or different sender.
- Failures/unknown outcomes are not rewritten as delivered or acknowledged solely because a UI request timed out.

**Underlying engineering challenges (no solution selected):** File/resource lifetime, partial I/O and validation truthfulness; pressure and memory awareness; safe user-visible recovery across disconnected sessions.

These invariants describe **externally observable correctness**, not locks, databases, queues, protocols, runtimes, algorithms, frameworks or deployment topology.

## 8. Nonfunctional constraints and quality expectations

- Publish supported file sizes, count, allowed formats, retention and whether integrity checks are best-effort or definitive for V1.
- Provide accessible, keyboard-operable intake, retrieval and acknowledgment flows with distinct loading, empty, rejected, pending and recovery states.
- Protect non-public file contents, filenames and recipient information; define deletion/retention and audit visibility without promising formal evidentiary custody.
- Require a verifiable file identity and usable error feedback rather than a silent generic 'upload failed'.

Do not treat the small example sizes or runtime benchmark fixtures taught in D03 as product limits. Numerical limits and policies require learner-approved first-version discovery.

## 9. Edge cases, failure behavior and recovery expectations

- An empty package or empty file when policy disallows it; duplicate filenames that are different artifacts.
- File ends early, format signature conflicts with claimed extension, bytes change, metadata malformed or file exceeds published limit.
- One file is accepted while another fails; sender attempts package finalization.
- Network breaks after final bytes sent but before sender gets response; same package retried.
- Two actors attempt finalization or acknowledgment concurrently; stale UI state.
- Recipient download is interrupted; downloaded artifact is corrupt or no longer retained.
- Access is revoked after a link/view existed; deletion occurs while a retrieval is attempted.

An unavailable acknowledgment, interrupted connection or deadline does **not automatically prove** a business effect failed or was rolled back. State and recovery rules must follow the approved product semantics, not an incidental technology choice.

## 10. Acceptance criteria and scenarios

**AC-01.** Given a sender creates a package and submits all required valid files, when finalization succeeds, each required file and the package show a consistent accepted outcome.

**AC-02.** Given one required file is incomplete, when the sender finalizes, the package is not labeled fully accepted and explains what needs attention.

**AC-03.** Given a file exceeds a published limit, when submitted, the user receives a bounded rejection reason without a successful artifact.

**AC-04.** Given two same-name files with different contents, when both are allowed, each retains a distinct identity and is never silently overwritten.

**AC-05.** Given a recipient accesses a package they do not own/have access to, when listing or downloading, protected content and details are withheld.

**AC-06.** Given an accepted package, when a permitted recipient retrieves a file, the retrieved artifact matches the accepted artifact according to the stated integrity claim.

**AC-07.** Given a recipient downloads a file but does not acknowledge, the product continues to distinguish accepted/intake-ready from explicitly acknowledged handoff.

**AC-08.** Given an acknowledgment request is repeated after uncertain response, the package cannot gain contradictory acknowledgment history or a fabricated second recipient action.

**AC-09.** Given a mid-transfer disconnect, the UI can show incomplete/unknown state and a safe documented next action instead of false success.

**AC-10.** Given a partial validation failure, history records only observed transitions and preserves earlier accepted artifact identity.

The scenarios are **acceptance requirements**, not evidence of implemented software or passing tests.

## 11. Assumptions, unknowns and product-level open questions

**Fixed by this proposed V1 boundary:** Product is about controlled **file intake and recipient handoff with explicit acknowledgment**; not processing file contents into derived datasets or acting as a storage vendor.

**Questions to resolve with the learner at separate Matt-skill-guided project kickoff (subject to V1 boundary):**
1. Which initial file categories and validation criteria must be supported?
2. What makes an intake complete: all listed files, required categories, or manually declared package finalization?
3. Which parties may initiate or receive a package, and who may see historical metadata?
4. What integrity evidence is promised for accepted artifacts, and how is a later failed check reported?
5. What should a sender do after uncertain submission/acknowledgment or a rejected item?
6. What exact file/count/concurrency/retention limits and deletion policy apply?

Open details are not silent approvals. If an unanswered choice changes *which* product is being built, it must be resolved in the batch review or before the PRD is marked approved; incidental numeric rules can wait for kickoff.

## 12. Explicit non-goals

No automatic malware-safety certification, legal receipt certification, universal resumable transfers, arbitrary file execution or content transformation in V1.

No implementation code, technical ADR, architecture or library selections are authorized by this PRD.

## 13. Domain learning outcomes and why this project is valuable

**D03 learning coverage to challenge if the project is later built:** D03-C03–C09 (runtime, bytes, files, streams, pipeline errors), C14 (memory), C15–C18 (context, shutdown, diagnostic accountability).

**Distinctness / portfolio rationale:** Unlike D01's Large Dataset Processing Workspace, the value is **verified submission, recipient access and handoff accountability**, not data transformation; unlike P02, it does not produce derived media.

These are *potential* learning challenges, not a mandate to implement a specific Node mechanism or proof of learner proficiency. D01/D02 existing PRDs and their scope remain unchanged.

## 14. Approval record

- **2026-10-13:** learner explicitly approved the **five D03 candidate concepts** as a catalog, not their detailed PRDs.
- **2026-10-13:** this document authored and author-reviewed against `templates/project-prd.md`, `docs/quality-gates.md` and the approved catalog; status **in_review**.
- **Current learner decision:** approve or request revisions to **all five PRDs together**, preserving the separate authoritative status of each.
- **No implementation readiness claim:** detailed first-version policies can be resolved at the separate selected-project kickoff, with learner approval before dependent technical design. Implementation, external tests and learner assessment have **not** begun.

**Next gate:** only after explicit PRD approval can the D03 content-authoring closure be audited and recorded. Actual project kickoff/technical decisions take place in a **separate local repository** with Codex and verified installed Matt Pocock skills; no scope expansion without learner approval.
