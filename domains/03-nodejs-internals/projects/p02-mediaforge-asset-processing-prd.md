# P02 — MediaForge: Content Asset Processing Desk — Product Requirements

**Domain:** D03 — Node.js Internals  
**Status:** in_review — proposed product boundaries awaiting **one batch learner approval**  
**Concept:** learner-approved in D03 catalog on 2026-10-13  
**PRD product-owner approval:** pending  
**Implementation / learner assessment:** not_started / deferred  
**Approval meaning:** review the problem, users, first-version in/out/deferred scope and indispensable observable outcomes, **not technical architecture or every numerical policy**. The five PRDs are authored together but each retains its own approval status.

## 1. Problem and motivation

Creative and editorial teams repeatedly need multiple publication-ready variants of source media. A conversion request can produce a mix of complete and failed outputs, take longer than expected or end in an uncertain state. **MediaForge** offers a deliberately limited asset-processing desk with visible per-request outcomes and retrievable derived deliverables—not a general-purpose compute farm or arbitrary media editor.

## 2. Audience and actors

- **Contributor:** submits an owned source asset and requests an allowed transformation preset.
- **Editor/reviewer:** inspects outputs and failures and selects which completed result to use.
- **Operations user:** sees processing progress and addresses failed/unknown jobs within the workspace's supported policy.
- **Workspace manager:** maintains permitted access to source/output assets and workspace boundaries.

These are product responsibilities, not a requirement for a particular identity, permission or deployment implementation.

## 3. Goals and measurable outcomes

A contributor can request a supported transformation, distinguish running/failed/complete/uncertain outcomes and retrieve a verified complete output. A reviewer knows which source and preset produced which variant. Success is observable through a completed expected output and readable job result; a cancellation or timeout never creates a false 'all outputs delivered' claim.

**Evidence for acceptance:** demonstration on explicitly supported sample cases and negative/failure cases; no invented latency, capacity, retention or success-rate SLA. The first-version numeric boundaries are agreed during separate product discovery before dependent engineering decisions.

## 4. Product boundary: in / out / deferred

**In scope for V1:**
- Submit supported media assets with source identity, metadata and validation feedback.
- Choose from a **small, explicitly published** set of output presets relevant to the initial supported media type(s).
- Create separately identified processing requests showing source, selected preset(s), state and any available progress.
- List and retrieve completed output variants with provenance back to their source and requested preset.
- Describe failed/incomplete results clearly and offer user-visible retry and cancellation requests where eligible.
- Allow an editor to review result previews or metadata and identify final usable variants.

**Out of scope:**
- Arbitrary user-authored executable processing scripts, custom plugins or untrusted code execution.
- A public unlimited transcoding/rendering farm, enterprise compute scheduler or infrastructure management console.
- Full video editing suite, complex collaborative asset annotation or a general DAM marketplace.
- Guarantee that a cancellation reverses output already delivered or effects at external processors.

**Deferred beyond V1 or subject to subsequent explicit scope approval:**
- Automated recurring batch schedules, third-party publishing and content-management integrations.
- User-defined transformation pipelines and compound workflows spanning many media types.
- Professional collaborative approvals, long-term archive/legal retention and large-scale distributed processing.

The above determines **what product is being built**. Detailed policies in Section 11 must remain compatible with this boundary; they do not authorize a new major feature.

## 5. Product capabilities and user journeys

1. **Prepare:** contributor identifies a source asset, checks allowed types/presets and sees constraints.
2. **Request:** contributor selects a supported output variant/preset and confirms the job; the request gets a distinct reference.
3. **Observe:** contributor or editor sees queued/running/completed/failed/indeterminate states and honest progress where measurable.
4. **Review:** editor examines available output/preview and its source/preset provenance.
5. **Recover:** a failed or uncertain result is reconciled or safely retried under documented conditions; eligible active work may receive a cancellation request.

## 6. Functional requirements

**FR-01.** Every source asset and requested output variant has an identity; the visible origin, chosen preset and request identity remain associated.

**FR-02.** Supported formats, presets and workload limits are published to the user before they request a conversion.

**FR-03.** An invalid, unsupported or unsafe-by-policy input is rejected with an explanation before it becomes a completed result.

**FR-04.** Each processing request has its own visible lifecycle, including an explicit outcome for rejected input, successful output and failed work.

**FR-05.** A success label requires that the promised output variant is available for retrieval and passes the product's declared checks.

**FR-06.** Output variants clearly state source, selected preset, status and any known partial-result limitations.

**FR-07.** A request spanning multiple variants can report mixed outcomes without pretending all variants succeeded.

**FR-08.** A retry is distinguishable from its previous attempt; a repeated confirmation cannot silently duplicate delivered artifacts or overwrite an accepted output.

**FR-09.** Cancellation is described as a **request**, and its observed outcome distinguishes no longer eligible, already completed, cancelled and unknown.

**FR-10.** Progress, if displayed, names the unit/meaning and does not imply a percentage of total work when unknown.

**FR-11.** An allowed actor can inspect their source/output history and retrieve available variants; unauthorized users cannot access protected assets.

**FR-12.** A failed/partial/uncertain processing result never silently appears in the catalog as a ready final deliverable.

**FR-13.** The product retains failure explanations useful to the customer without leaking hidden inputs or internal privileged diagnostics.

## 7. Engineering problems and externally observable invariants

**Core product invariants:**
- Each claimed completed variant is available, linked to one source/preset/request, and is not a partial artifact masquerading as final.
- A failed or cancelled request cannot silently erase an earlier valid output variant or its provenance.
- Cancellation and timeouts cannot be equated with proof that no output or side effect occurred.
- Different processing requests and users cannot silently share or overwrite each other's source/output identities.
- Unsupported input cannot produce a misleading 'success' by skipping required validation.
- The source and results preserve the visibility/ownership rules of the agreed workspace.

**Underlying engineering challenges (no solution selected):** Resource-bounded heavy processing, long-running result states, partial outputs and cancellation semantics; no predetermined Worker/process/converter technology.

These invariants describe **externally observable correctness**, not locks, databases, queues, protocols, runtimes, algorithms, frameworks or deployment topology.

## 8. Nonfunctional constraints and quality expectations

- Declare supported input/output types, maximum media duration/size, output availability and concurrent-job limits before project kickoff.
- Provide understandable progress when measurable, with stable recovery paths and accessible controls for job state and reviewing results.
- Protect source/derived content from unauthorized viewers; explicitly define retention and deletion of failed intermediate artifacts.
- Preserve consistent user-facing provenance and error categories across supported presets; do not advertise universal codec/platform support.

Do not treat the small example sizes or runtime benchmark fixtures taught in D03 as product limits. Numerical limits and policies require learner-approved first-version discovery.

## 9. Edge cases, failure behavior and recovery expectations

- Zero-length asset, malformed container, unsupported media encoding, mismatched file metadata or protected content.
- One preset completes and another fails; output file is produced but post-processing verification fails.
- A cancellation request races with completion or is sent after success.
- Contributor retries after losing a response; previously produced output exists but local UI is stale.
- Processing takes longer than a published time budget, or the user closes the interface.
- Two people request same source/preset while one result is already available.
- Input is removed while a request is pending; output retention expires during review.

An unavailable acknowledgment, interrupted connection or deadline does **not automatically prove** a business effect failed or was rolled back. State and recovery rules must follow the approved product semantics, not an incidental technology choice.

## 10. Acceptance criteria and scenarios

**AC-01.** Given a valid supported asset and preset, when processing completes, a retrievable output is associated with the exact source and selected preset.

**AC-02.** Given unsupported input, when submitted, the system rejects it with a specific user-facing reason and no fabricated completed variant.

**AC-03.** Given two selected variants and one fails, when viewing results, the successful variant remains available while the failed one has a separate explained outcome.

**AC-04.** Given a completed output, when viewed by its permitted editor, the product identifies its origin and allows retrieval.

**AC-05.** Given a transient disconnect during processing, when the user returns, they can distinguish continuing, definitive failure, definitive success or uncertainty.

**AC-06.** Given a cancellation request near completion, the product reports a single honest resulting status without claiming all work was undone.

**AC-07.** Given a retry after a missing acknowledgment, the user can inspect the prior request and avoid treating a duplicate artifact as a novel successful request.

**AC-08.** Given a completed output with invalid/incomplete content, the system does not label it ready.

**AC-09.** Given an unauthorized actor, when requesting source/output, the content is not exposed.

**AC-10.** Given missing measurable progress, the UI describes activity as running/unknown without fabricating a numeric percentage.

The scenarios are **acceptance requirements**, not evidence of implemented software or passing tests.

## 11. Assumptions, unknowns and product-level open questions

**Fixed by this proposed V1 boundary:** A curated **media transformation desk** with selected supported inputs/presets, visible variant results and retrieval. No arbitrary user code or general-purpose infrastructure service.

**Questions to resolve with the learner at separate Matt-skill-guided project kickoff (subject to V1 boundary):**
1. Which single initial media category and minimum useful presets define V1?
2. Should a job submit one or multiple variants in the first release, and how should mixed results be labeled?
3. Which output checks make 'ready' meaningful for each preset?
4. What is the user-visible result of a cancellation near completion or a timed-out worker?
5. When are retry attempts allowed, and what happens to existing outputs?
6. What are content access, source/output retention, asset size, duration and concurrency policies?

Open details are not silent approvals. If an unanswered choice changes *which* product is being built, it must be resolved in the batch review or before the PRD is marked approved; incidental numeric rules can wait for kickoff.

## 12. Explicit non-goals

No enterprise media editing suite, arbitrary script host, guaranteed instant cancellation, unlimited processing, automated rights enforcement or third-party publishing in V1.

No implementation code, technical ADR, architecture or library selections are authorized by this PRD.

## 13. Domain learning outcomes and why this project is valuable

**D03 learning coverage to challenge if the project is later built:** D03-C03–C04, C06–C12 (byte/dataflow and asynchronous/native/parallel work), C14–C18 (resource pressure, attribution, shutdown and diagnosis).

**Distinctness / portfolio rationale:** Unlike P01's intake/handoff, MediaForge creates **new derived assets**; unlike D01's generic large-data workspace it solves a focused creative content publishing workflow rather than arbitrary records/aggregations.

These are *potential* learning challenges, not a mandate to implement a specific Node mechanism or proof of learner proficiency. D01/D02 existing PRDs and their scope remain unchanged.

## 14. Approval record

- **2026-10-13:** learner explicitly approved the **five D03 candidate concepts** as a catalog, not their detailed PRDs.
- **2026-10-13:** this document authored and author-reviewed against `templates/project-prd.md`, `docs/quality-gates.md` and the approved catalog; status **in_review**.
- **Current learner decision:** approve or request revisions to **all five PRDs together**, preserving the separate authoritative status of each.
- **No implementation readiness claim:** detailed first-version policies can be resolved at the separate selected-project kickoff, with learner approval before dependent technical design. Implementation, external tests and learner assessment have **not** begun.

**Next gate:** only after explicit PRD approval can the D03 content-authoring closure be audited and recorded. Actual project kickoff/technical decisions take place in a **separate local repository** with Codex and verified installed Matt Pocock skills; no scope expansion without learner approval.
