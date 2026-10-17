# Repository publisher workflow

This operational walkthrough supports [Validate the first-release learner and publisher experience](../issues/07-first-release-experience-prototype.md#answer). It applies the approved [authoring/publishing rules](../issues/03-authoring-and-publishing.md#answer) within the [first-release boundary](../issues/06-first-release-and-phases.md#answer). Those decisions govern; the [Stitch scope review](experience-review.md#scope-precedence-and-meaningful-gaps) identifies illustrative details that do not.

## Independent responsibilities

Pilot admission grants learner access to the free published catalog. Enrollment organizes the learner's studies. Neither grants author/publisher authority. The invitation/access screen's publishing diagram is a separate explanatory reference; the repository workflow does not require a publisher dashboard or editor, and its absence is intentional.

Authors prepare revisions; publishers review, approve, publish and withdraw them. The same person may do both and approve their own work. A two-reviewer gate is not required. Actual authorization, audit records, tooling, source formats and publication consistency remain for [Decide the first-release technical boundaries and feasibility](../issues/08-first-release-technical-boundaries.md#experience-review-follow-ups). GPG, OAuth2 and diagnostic examples in the export are not selected mechanisms.

## Operational walkthrough

1. **Prepare a draft:** change the authoritative source (`handbook/` for the Handbook); importing or synchronizing creates an unpublished draft. Identify exact source revisions, course structure and selected educational-material revisions. Learners keep the current publication.
2. **Preview and review:** privately preview the same package intended for publication. Review content, language/direction, image alternatives, code, required/optional work and supported learner-confirmation requirements. Record review accountability without requiring an in-platform dashboard.
3. **Decide equivalence:** for each changed requirement, explicitly determine whether earlier completion still qualifies and explain the consequence. Cosmetic changes preserve qualification; new work and substantial changes need an explicit decision. Prepare a meaningful learner-visible change explanation and preserve historical completion.
4. **Approve the exact version:** record the approving actor and time for the precise reviewed package. Any package change invalidates approval and requires renewed review and approval. Preview, approval and publication must identify the same content.
5. **Publish explicitly:** release a coherent course version, recording provenance, selected materials and approval/publication accountability. Shared-material updates are adopted independently by each course's publisher. Availability is bounded by admitted-pilot access; this is not public rollout.
6. **Withdraw with the correct operation:** course retirement stops new discovery/enrollment while preserving existing enrollees' access; material retirement blocks future selection while preserving existing published uses. Access removal records a reason, blocks affected content across courses, informs affected publishers, and explains learner obstacles. These operations do not silently delete learning history, substitute content or grant completion.
7. **Recover within today's rules:** select a previously approved version and check current eligibility and access restrictions. Explicit republication is a new event, preserving publication and learning history. Retired material must be explicitly reactivated or replaced with eligible reviewed/approved material. Recovery never bypasses active access removal.

This is a product-discovery operational walkthrough, not executable tooling or evidence that publication enforcement works. Technical and specification work must define and verify the real permission checks, protected previews, approval invalidation, coherent publication, audit records and recovery restrictions. Retention of personal learning records remains subject to the eventual privacy/deletion policies.
