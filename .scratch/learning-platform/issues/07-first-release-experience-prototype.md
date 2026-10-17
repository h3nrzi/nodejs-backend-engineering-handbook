# Validate the first-release learner and publisher experience

Status: resolved
Type: prototype
Labels: wayfinder:prototype
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 06
Prerequisites: [Define the first release and later product phases](06-first-release-and-phases.md)

## Question

What should the selected first-release learner and publisher journeys look like and how should they behave, including empty, loading, error, and interrupted-learning situations?

Create the cheapest concrete outline, wireframe, or disposable prototype needed for the owner to evaluate the release's key flows. Use representative Handbook material and a contrasting course example where relevant to the agreed release. Resolve navigation, terminology, and interaction questions through the owner's reactions. Link the prototype as an asset; it is a discussion aid rather than production implementation.

For selected publishing and revision journeys, apply [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md#answer). Evaluate draft preview and publication, returning-learner change communication, explanations of unavailable material, and recovery interactions where included in the release. Include operational workflows where an in-platform interface is not selected.

For selected learner journeys, apply [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md#answer). Evaluate pre-enrollment suitability information, independent enrollment and path participation, shared qualifying course progress, last-visited versus next-required navigation, required and optional counts, and separate current progress, obstacles, historical completion, and competency displays. Where included, exercise assessment feedback and retries, prerequisite verification, self-confirmation corrections, archive/restore, and revised or unavailable required work. Do not imply that an unsupported assessment or verification route is available.

Apply [Choose the business and operating constraints for launch](05-business-and-operating-constraints.md#answer): evaluate the selected experience in Persian with RTL layout, while course content follows its independently declared language. Include mixed-direction content where relevant to selected formats. Show the invitation-only pilot boundary, free access for admitted learners, and selected support and privacy information. Evaluate applicable keyboard, focus, and semantic interaction expectations without representing a disposable prototype as proof of release accessibility compliance.


### Selected release boundary

Apply [Define the first release and later product phases](06-first-release-and-phases.md#answer). Prototype browse/search, suitability details, enrollment, structured study, Continue Learning, learner-confirmed completion and undo, course/path progress, archive/restore, and following/leaving paths. Include current versus historical fulfillment and learner-visible revision/unavailability explanations. Support email is the direct reporting channel. Do not show assessed submissions, competency claims, mandatory prerequisite verification, or human assessment review as supported release capabilities.

Publishing uses repository workflows and operator tools; evaluate a concrete operational walkthrough for preview/review/approval/publication, retirement, access removal, recovery, and equivalence decisions rather than assuming a publisher dashboard or editor. First-release materials are formatted text, images, code examples, and written practice instructions.

Use representative multiple-course and credible two-course path examples to evaluate behavior even if actual second-course content is not ready. The invited pilot may begin with a bounded Handbook course; distinguish owner prototype review from actual multi-course/path learner validation required before broader public rollout.

## Comments

### Earlier prototype approach — superseded (2026-10-17)

The ticket was claimed before work. An earlier Codex-generated interactive artifact supported discussion of study continuity, completion correction, path relationships, revisions and operational publishing. Its initial syntax/loading checks did not establish completed browser interactions or accessibility compliance. The owner subsequently deleted that artifact intentionally and replaced the approach with the Stitch collection indexed in the current [asset and scope review](../prototypes/experience-review.md). No link or instruction to run the deleted artifact remains active; it must not be recreated. Useful owner approvals and technical qualifications from that discussion are preserved below.

### Owner review — provisional feedback (2026-10-17)

The owner reviewed the prototype source and review guide and exercised core state-model transitions. The owner found the main product behaviors consistent with approved decisions. This is provisional feedback, not final acceptance of the rendered interface or a completed end-to-end browser interaction review.

- **Navigation and enrollment — provisionally approved:** keep یادگیری‌های من, دوره‌ها, مسیرها, and افزودن به یادگیری‌های من. The terminology preserves the distinction between enrollment and access entitlement.
- **Study and continuity — behavior approved:** confirming completion leaves the current lesson open. Continue from Last Visit and Next Required Lesson remain separate. Opening an optional lesson updates saved position without automatically completing it or changing required-lesson progress.
- **Course/path relationships — behavior approved:** keep independent enrollment, shared qualifying course progress, and preserved records when leaving paths or archiving courses. Following a path does not automatically enroll its courses.
- **Revision communication — behavior approved:** separate current requirement fulfillment, historical completion, and meaningful change explanations. New requirements change current progress while preserving historical completion. Keep explanations accessible from course details after acknowledgment.
- **Interrupted operations — concept approved with a technical requirement:** distinguish confirmed saved progress, an uncertain save outcome, and unavailable content. Do not report an uncertain operation as successful or definitively failed without appropriate evidence. The implementation must safely reconcile uncertain outcomes and avoid duplicate effects on retry. The simulated retry does not establish this behavior.
- **Publishing — concept approved with technical boundaries open:** retain the repository sequence, exact-version preview/review, approval invalidation after edits, explicit publication, source provenance, and current eligibility checks during recovery. The event log and operator controls are illustrative; actual authorization, audit records, and publication enforcement remain technical decisions.

The technical requirements are carried forward to [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md#experience-review-follow-ups). They do not resolve or claim that blocked ticket.

At that stage the owner withheld final experience acceptance pending browser/mobile/keyboard/focus/accessibility review. Direct state manipulation was explicitly not evidence that learner interactions worked. The requirement to keep this discovery ticket claimed for review of that earlier artifact is superseded by the owner's replacement-prototype direction below; the underlying implementation and pilot verification obligations remain.

### Owner direction — accept the Stitch collection (2026-10-17)

The owner accepts the ten Google Stitch screens under the prototypes directory as the temporary visual prototype for this product-discovery stage and requires no further visual polishing. The owner authorizes resolving this decision if the approved behaviors and references adequately answer its product-experience questions, while preserving technical follow-ups and future implementation/pilot validation. Do not recreate the deleted prototype, implement the product or expand release scope. Repository publishing remains separate from learner invitation/access, with no publisher dashboard intentionally included.

Inspected all ten supplied screenshots, their HTML exports and the supporting design notes. The [asset inventory and scope review](../prototypes/experience-review.md) records coverage, meaningful gaps, precedence rules and actual evidence. No visual assets were changed. The existing decisions answer the product questions; identified differences are constrained by approved scope or assigned to the technical/specification follow-ups. This resolves only this ticket.

## Answer

### Accepted discovery reference and its authority

Accept the [ten-screen Stitch collection and supporting assets](../prototypes/experience-review.md#actual-asset-inventory) as the temporary visual reference for the first-release learner experience. The collection covers My learning, Courses, Course details, Lesson reader, Learning paths, Learning path details, Archived course, Progress revisions, Interruption recovery, and Invitation/access with a separate explanatory publishing diagram. The HTML exports and design notes support interpretation; they are not production code or a complete implementation specification. The owner explicitly accepts this discovery approach without another visual iteration.

Approved behavior and first-release scope govern over mockup placeholders. The [scope review](../prototypes/experience-review.md#scope-precedence-and-meaningful-gaps) records material differences and their disposition: certificates/assessments/competency claims, educational progression locks, audio/video/downloads and offline guarantees, perpetual access/retention, concrete signing/authentication/reviewer assumptions, optional adoption of revised requirements, and incomplete exception/support/privacy coverage. None adds a first-release capability or requires another mockup iteration. Future technical/specification work must account for the documented differences.

### Settled learner experience

- Keep the global areas **یادگیری‌های من**, **دوره‌ها**, and **مسیرها**, with **افزودن به یادگیری‌های من** as enrollment. Suitability information precedes enrollment. Pilot admission/access entitlement is independent of enrollment; all published courses are free for admitted pilot learners.
- Structured study uses the course's declared language within the Persian RTL interface, with appropriate mixed-direction text/code. Required and optional work are explicit; sequence and preparation are advisory. Visits do not establish completion or competency.
- Explicit learner-confirmed completion leaves the current lesson open; undo changes current progress while preserving history. **Continue from Last Visit** and **Next Required Lesson** remain separate. Visiting optional work updates the saved position without automatically completing it or changing required-lesson progress.
- Course enrollment is independent of path participation. Following a path does not enroll courses; qualifying course progress is shared across applicable paths. Leaving a path or archiving a course preserves enrollment and learning records. Archived courses leave active recommendations; restoration uses current published requirements.
- Separate current required-work counts, optional work, historical completion and obstacles. Course counts use required lessons; path counts use required courses. Latest published requirements govern current fulfillment. Explicit equivalence decisions determine whether earlier completion qualifies. Preserve historical achievements and keep meaningful change explanations available in course details after acknowledgment.
- Separate confirmed progress, an uncertain save outcome and unavailable content. Do not report uncertain writes as successful or definitively failed without evidence. Reconciliation must be safe and retries must avoid duplicate effects. Unavailability alone neither grants nor invalidates prior fulfillment or silently reduces requirements; explain the obstacle and available next actions. The technical contract is still to be selected and verified.

These retain the approved [learner journey](04-learner-experience-and-evidence.md#answer) within the [first-release scope](06-first-release-and-phases.md#answer). Mockup certificate, examination and skill-validation language does not turn learner confirmation into assessment.

### Separate repository publisher experience

Use the [repository publisher walkthrough](../prototypes/publisher-workflow.md), applying the approved [publishing rules](03-authoring-and-publishing.md#answer). Prepare unpublished drafts from authoritative sources; privately preview/review the exact package and its equivalence consequences; record exact-version approval, invalidating it on edits; publish explicitly with provenance/accountability. Each course independently adopts shared revisions. Distinguish course retirement, material retirement and access removal. Recover by explicit republication of an approved version under current eligibility and access restrictions, preserving history.

This is an operational workflow, separate from invitation/access and enrollment. Admitting a learner does not grant publisher authority. The lack of an in-platform publisher dashboard/editor is intentional. A separate reviewer is not required; authorization, audit records, publication enforcement and concrete tooling remain technical decisions. The combined Stitch sheet does not merge these responsibilities or authorize public rollout.

### Evidence limits and follow-ups

Owner acceptance and inspection of the supplied static references settle this discovery decision. They do not establish working interactions, persistence, responsive/mobile behavior, keyboard/focus behavior, accessibility compliance, actual publishing controls, or learner validation. Earlier model/source review and small export demo handlers are not end-to-end evidence. The former browser-review condition for the deleted interactive artifact is superseded, not represented as passed.

- [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md#experience-review-follow-ups) retains uncertain-write reconciliation and duplicate-effect prevention, enforceable publishing/authorization/audit, privacy/access lifecycle, content/identity contracts, accessibility criteria and verification planning. It remains blocked by operating-arrangement and budget decisions.
- [Confirm the blueprint and first-release specification are ready for implementation](09-specification-readiness.md#experience-reference-and-validation-coverage) must trace these accepted behaviors and scope gaps into testable contracts and future release checks. Real learner-control walkthroughs, mobile, keyboard, focus, accessibility and persistence verification remain implementation obligations. Preserve the task session, another-day return, follow-up and credible multi-course/path validation before broader public rollout; owner acceptance is not learner validation.

Set this ticket to **resolved** under the local tracker convention. Only this experience decision is closed; no implementation, content production, operational pilot, provider selection, launch or further ticket resolution is implied. The supplied Stitch files remain the linked discovery assets in their owner-selected location; no replacement executable artifact or branch-capture requirement from the superseded approach remains.
