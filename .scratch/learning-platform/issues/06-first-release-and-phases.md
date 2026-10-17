# Define the first release and later product phases

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 03, 04, 05
Prerequisites: [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md); [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md); [Choose the business and operating constraints for launch](05-business-and-operating-constraints.md)

## Question

What is the smallest coherent first release that delivers the chosen learner outcome within the agreed publishing and operating constraints, and how should the product evolve after it?

Set explicit included and excluded learner and publisher journeys, course and material coverage, and release success criteria. Decide whether and how a second course or contrasting subject must validate general-purpose behavior in the first release. Explain the value and prerequisites of later phases without turning uncertain future capabilities into detailed commitments. Identify the remaining decisions needed to specify the first release.

Respect the self-paced first-release context and core learning priorities resolved in [Choose the first learner segment and learning outcome](01-first-learner-and-outcome.md#answer). Instructor-led courses, live classes, and scheduled learning are part of the long-term vision, beyond the first release. Consider their direction and prerequisites without assuming that future expansion requires building their infrastructure in the first release.

Use [Define courses, educational materials, and learning paths](02-course-and-learning-path-model.md#answer) when selecting supported material types, reuse, optionality, and prerequisite capabilities. A standalone, browsable educational-material library is a possible future capability; decide when to revisit it without treating material reuse as a requirement for a separate catalog or enrollment model.

Apply [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md#answer) when selecting first-release authoring sources, editor scope, material formats, and publishing operations. Decide how its required safeguards are delivered, including what can remain an operational process, without treating conceptual material support as a commitment to implement every format or an in-platform editor.

Apply [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md#answer) when selecting completion evidence, practice and assessment methods, prerequisite verification, learning paths, learner controls, and revision support. Distinguish enrollment from access, current fulfillment from history and competency, and optional work from required totals. Include only requirements with a supported fulfillment route; decide which human-review and correction workflows are needed for selected capabilities. Preserve the approved priority of structured study, navigation, and reliable progress; advanced adaptive personalization remains a later consideration pending educational value and evidence.

Apply [Choose the business and operating constraints for launch](05-business-and-operating-constraints.md#answer): a free, invitation-only adult pilot, Persian RTL interface, independently declared course languages, accessibility, private learner records and minimal data, and owner-led delivery and support. Select one direct support channel and a feasible pilot evaluation plan for approximately 5–10 personally recruited community participants, distinguishing owner review from actual learner findings. Specify what must be learned before considering broader public access. Manual recruitment and invitations are acceptable; dedicated invitation-management or age-verification tooling is not automatically required. Product scope planning may proceed with operating arrangement and budget still open, but must respect their later qualification and spending constraints. Do not treat general support ownership as confirmed assessment-review capacity.

## Comments

### Owner discovery — first-release capabilities and pilot boundaries

- Approved: include course browsing and simple search, course details, enrollment, structured lessons, Continue Learning, progress tracking, course archiving/restoration, and following/leaving learning paths. Paths reuse qualifying course progress rather than creating duplicate learning records.
- Approved: use externally authored, repository-managed content. `handbook/` remains authoritative for the Handbook; other courses may have separate authoritative sources. Initially support formatted text, images, code examples, and written practice instructions. Defer the in-platform editor, video delivery, downloadable attachments, executable exercises, and interactive activities. Exact source formats, ingestion, and implementation remain separate technical decisions.
- Approved: lessons use explicit learner-confirmed completion through Mark Complete and undo. Written practice may include instructions, guidance, examples, and sample answers without assessed submissions. Exclude assessed submissions, competency claims, mandatory prerequisite verification, and human assessment review. Prerequisites remain advisory. Publish only lessons whose declared requirements legitimately permit learner confirmation.
- Approved with clarification: multiple independent courses and meaningful learning paths are first-release capabilities. Prepare a small second course from a contrasting subject or experience level to validate subject independence. Its completion and publication do not automatically block the initial invited pilot, which may begin with available Handbook content. Before broader public rollout, validate multi-course behavior and a meaningful path connecting at least two courses toward a credible educational goal. Content production remains separate from this planning effort.
- Approved: use a dedicated support email address, displayed consistently in relevant learner experiences, for access issues, content reports, and platform problems. Finalize the actual address before operation. No guaranteed response time.
- Approved: evaluate the pilot through an initial task-based session, a return visit on another day, and a brief follow-up. Cover discovery, enrollment, studying, completion and undo, resuming, and course/path progress where available. Record task completion, assistance, failures, accessibility obstacles, and participant feedback. Broader access depends on independent completion of the core journey, reliable progress preservation, and resolution of blocking access/accessibility issues. These are usability and continuity findings, not evidence of educational effectiveness.
- At the end of this first round the ticket remained claimed, pending publisher delivery, revision scope, phase direction, and final shared understanding. No implementation or actual learner evaluation had occurred.


### Owner discovery — publisher operations, revision support, content readiness, and phases

- Approved: documented repository workflows and operator tools deliver preview, review, exact-revision approval, publication, course/material retirement, access removal, and publication recovery. Manual coordination is acceptable; protected drafts, provenance, accountability, and independent course adoption of shared revisions remain mandatory. Defer a publisher dashboard.
- Approved: support course/path revisions in the first release. Current fulfillment uses latest published requirements; preserve historical learning records and completion achievements. Publishers explicitly decide whether prior completion/evidence qualify, and affected learners receive clear explanations of meaningful changes and consequences. Repository workflows can manage these decisions. Email notifications and a dedicated notification center are not required. References to assessment evidence preserve the broader model; they do not add first-release assessment capabilities.
- Approved: the initial pilot may use a bounded, coherent course from available Handbook material, with accurate outcomes, meaningful structure, and sufficient complete lessons to evaluate studying, progress, and return visits. The whole Handbook need not be completed. Publish only reviewed, complete, approved course content; unfinished material stays unpublished. Content production remains separate.
- Approved: progress through invited pilot, broader self-paced access, richer teaching/publishing, and additional learning/business models. There are no fixed delivery dates or detailed later-phase commitments. Expansion depends on learner findings, educational need, operating readiness, and relevant capacity/evidence.

## Answer

### First-release learner scope

Deliver course browsing and simple search, course suitability details, explicit enrollment, structured sections and lessons, Continue Learning, progress tracking, course archiving/restoration, and following/leaving learning paths. Support multiple independent courses and meaningful paths from the first release, even when initial pilot content is limited.

Apply the settled [learner journey and evidence rules](04-learner-experience-and-evidence.md#answer): enrollment is separate from access entitlement; path participation reuses qualifying independent course progress without duplicate records or automatic course enrollment. Continue Learning distinguishes the last visited lesson from the next unfinished required lesson. Required and optional work remain separate, as do current requirement fulfillment, historical completion, and obstacles. Course/path publication minimums, archive/restore, and unavailable-content rules remain applicable.

First-release lessons use explicit learner-confirmed completion through Mark Complete, with undo. Only publish lessons whose declared requirements can legitimately be satisfied through learner confirmation. Visits do not establish completion or competency. Written practice can include instructions, guidance, examples, and sample answers without assessed submissions. Prerequisites remain advisory.

Exclude assessed submissions, competency claims, mandatory prerequisite verification, and human assessment review from this release. General support ownership does not imply assessment-review capacity. References to assessment evidence in the broader revision model do not introduce assessment collection, import, evaluation, or correction workflows into the pilot.

### Content, authoring, and publisher scope

Use externally authored, repository-managed content. `handbook/` remains authoritative for the Handbook; other courses may have separate authoritative sources. Initially support formatted text, images, code examples, and written practice instructions. Exact content formats, ingestion mechanisms, stable identities, and technical implementation remain for the technical decision.

Defer the in-platform editor, publisher dashboard, video delivery, downloadable attachments, executable exercises, and interactive learning activities.

Documented repository workflows and operator tools support preview, review, approval, publication, course and material retirement, access removal, and publication recovery. Manual review coordination is acceptable; the [publishing safeguards](03-authoring-and-publishing.md#answer) remain mandatory: protect drafts, approve exact reviewed revisions, invalidate approval on changes, preserve source provenance and action accountability, independently adopt shared-material revisions per course, and enforce current eligibility and access restrictions during publication and recovery.

### Revisions and historical continuity

Support course and learning-path revisions in the first release. Current requirement fulfillment reflects latest published requirements. Publishers explicitly decide whether earlier completion continues to qualify; meaningful changes and their consequences must be explained to affected learners. Preserve historical learning records and completion achievements. For example, adding a required lesson can change current fulfillment from 10/10 to 10/11 while retaining the earlier completion record.

Publishers may manage requirement-equivalence decisions through repository workflows. Learner-visible explanations belong in the product. Email notifications and a notification center are not required. Unsupported assessment or prerequisite-verification routes must not appear as available ways to fulfill requirements.

### Initial content and multi-course validation

The initial invited pilot may begin with a bounded, coherent course prepared from available Handbook material. It needs accurate learning outcomes, a meaningful structure, and enough complete lessons to evaluate studying, progress tracking, and returning to continue. Completing the whole Handbook curriculum is not a pilot prerequisite. Only reviewed, complete, approved course content is published; unfinished material remains unpublished.

Prepare a small second course from a contrasting subject or experience level to validate subject independence. Completing and publishing it does not automatically block the initial invited pilot. Before broader public rollout, validate multi-course behavior and at least one meaningful learning path connecting at least two courses toward a credible educational goal. Do not arbitrarily combine unrelated courses. These content-validation gates do not defer the first-release capability to support courses and paths.

Educational content production remains separate from this planning map. Planning can use representative course/path examples without claiming that publishable content or learner validation already exists.

### Pilot operation and evaluation

Retain the [launch constraints](05-business-and-operating-constraints.md#answer): free access for invited adults, approximately 5–10 personally recruited community participants as a provisional target, a Persian RTL interface, independently declared course languages, accessibility, private learner records, minimal data, and owner-led delivery/support. No fixed launch date, operating arrangement, provider, or spending limit is established here.

Use a dedicated support email address, displayed consistently in relevant learner experiences, for access issues, content reports, and platform problems. Finalize the actual address before operation. Promise no guaranteed response time. Manual recruitment and invitations are acceptable; dedicated invitation-management or age-verification tooling is not required solely for this pilot.

Evaluate through an initial task-based session, a return visit on another day, and a brief follow-up. Cover discovery, enrollment, studying, marking and undoing completion, resuming, and understanding course/path progress where available. Record task completion, assistance required, failures, accessibility obstacles, and participant feedback.

Broader access depends on participants independently completing the core journey, reliable progress preservation, resolution of blocking access/accessibility issues, multi-course/path validation, and operating, privacy, support, and cost readiness. An early Handbook-only pilot cannot establish path usability or subject independence. Owner review, prototype reactions, and automated checks must remain distinct from actual learner findings. No participants, pilot observations, or educational-effectiveness evidence are established by this resolution.

### Phased product direction

1. **Invited pilot:** deliver and evaluate the core self-paced experience; prioritize usability, accessibility, progress reliability, and learning continuity.
2. **Broader self-paced access:** validate multiple independent courses and a meaningful multi-course path, address pilot findings, and establish operating, privacy, support, and cost readiness before public rollout.
3. **Richer teaching and publishing:** expand formats, authoring, assessments, feedback, and publishing tools according to demonstrated educational and operational needs. Human-reviewed assessments require confirmed reviewer capacity. Reconsider a standalone educational-material library only when learners demonstrate a need for discovery outside courses; material reuse alone does not justify it.
4. **Additional learning and business models:** evaluate instructor-led learning, scheduled courses, independent instructors, and monetization as separate opportunities justified by demand and operating capacity. Advanced adaptive personalization requires clear educational benefit supported by evidence.

These phases define direction and prerequisites, not fixed dates or implementation commitments. Do not build future-phase infrastructure solely to anticipate these possibilities. Detailed specifications for later phases remain outside this map.

### Remaining specification decisions

- [Validate the first-release learner and publisher experience](07-first-release-experience-prototype.md): resolve selected learner interactions in Persian RTL, repository/operator publishing and revision workflows, error/unavailability explanations, and representative multi-course/path behavior through owner reactions. A disposable prototype is not production implementation or actual learner validation.
- [Choose the pilot operating arrangement](10-operating-arrangement.md): confirm the arrangement and relevant factual qualification dependencies before jurisdiction-dependent technical choices.
- [Estimate pilot operating costs and approve a spending limit](11-operating-budget.md): estimate feasible costs for this scope and obtain a spending decision; no amount is approved here.
- [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md): select content formats and ingestion, stable identities, enforceable publishing/revision/progress contracts, access and persistence boundaries, privacy and account/data lifecycle policies, concrete accessibility criteria, and feasible operational delivery after qualification and budget decisions. Resolve exposed product-policy questions explicitly.
- [Confirm the blueprint and first-release specification are ready for implementation](09-specification-readiness.md): consolidate the approved direction and detailed first-release contracts into linked blueprint/spec assets, with testable acceptance criteria and explicit pilot/public-rollout evidence gates. Do not treat unresolved content preparation or future pilot findings as implementation decisions already settled.

The owner explicitly approved all ten discovery questions, including the clarification separating initial pilot readiness from broader-rollout multi-course validation. This resolves the release boundary and phased direction. It does not authorize production implementation, deployment, or launch, and records no human learner acceptance.
