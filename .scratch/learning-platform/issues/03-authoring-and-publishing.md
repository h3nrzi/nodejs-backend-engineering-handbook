# Choose the course authoring and publishing workflow

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 02
Prerequisites: [Define courses, educational materials, and learning paths](02-course-and-learning-path-model.md)

## Question

How should the owner and team create, review, publish, revise, and withdraw courses and educational materials under one publishing organization?

Determine the initial publisher roles, supported material needs, publication boundaries, and what learners should experience when content changes. Preserve the Handbook's source authority while deciding which authoring needs future courses introduce. Decide which workflow capabilities need product support and which can remain an operational process; do not presume an in-platform editor or a repository-only workflow for every course.

Use the approved course, lesson, and material boundaries in [Define courses, educational materials, and learning paths](02-course-and-learning-path-model.md#answer). Determine how revisions to a reused material affect the courses and course-specific lessons using it, including review and publication responsibility.

## Comments

### Owner discovery — authoring, responsibilities, materials, and publication

- Approved: `handbook/` remains the Handbook's authoritative authoring and maintenance source. Other courses may use an in-platform editor, but courses may have different authoring workflows and content sources; internal authoring is not mandatory. Including the editor in the first release remains a separate scope decision.
- Approved: authors prepare and revise educational content; publishers review, approve, publish, and withdraw it. One person may perform both responsibilities, and approval by a second person is not mandatory.
- Approved: the publishing workflow should accommodate formatted text, images, code examples, video, downloadable files, and written exercise instructions. Executable exercises and interactive learning activities are evaluated separately. These conceptual needs do not commit the first release to every format.
- Approved: publication makes a coherent, reviewed course structure and its selected material revisions available together. Changes remain drafts until explicitly published; learners continue seeing the currently published version during preparation and review. Detailed revision rules and effects on existing learner progress remain open.
- The ticket remains claimed while shared-material revision, learner updates, withdrawal, and the boundary between product capabilities and operational processes are explored.

### Owner discovery — shared revisions, learner continuity, withdrawal, and accountability

- Approved: each published course retains its explicitly selected shared-material revisions. Its publisher independently decides whether and when to adopt an update; updating a shared material never silently alters another published course.
- Approved: existing learners receive the latest published course version while retaining historical activity and completion records. Meaningful changes must be communicated to returning learners. Historical completion must not be erased or silently rewritten; whether it satisfies substantially revised requirements remains open. Access to older course versions is not currently required.
- Deferred to [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md): added lessons, changed requirements, reassessment, and completion validity following course revisions.
- Approved: course retirement stops new discovery and enrollment while preserving access for existing learners. Access removal makes affected content unavailable when necessary and records a reason. Neither automatically deletes historical learning records.
- Approved: external tools may support coordination, discussions, reviews, and checklists. The publishing workflow must protect drafts, support preview before publication, and record who approved and published each course version and when those actions occurred. Detailed tooling and first-release implementation boundaries remain open.

### Owner discovery — source provenance, material withdrawal, recovery, and approval validity

- Approved: imports and synchronization from `handbook/` or any other external source create unpublished drafts, never automatic publication. The original authoring source remains authoritative. Each publication identifies the exact source revision used, and drafts require preview, review, approval, and explicit publication.
- Approved: retiring a shared material prevents selection for future publications but preserves existing published uses. Access removal makes the affected material unavailable across all courses using it, informs affected publishers, and explains unavailability to learners. It never silently substitutes a revision or deletes historical learning records.
- Approved: publishers can recover from an incorrect publication by explicitly republishing a previously approved course version as a new publication event. Publication history and learner records are preserved, and all active content access restrictions still apply. No learner-facing version selector is required.
- Approved: approval applies to the exact reviewed course structure and material revisions. Any change to an approved draft invalidates approval and requires renewed review and approval. Preview, approval, and publication refer to the same content version. Authors acting as publishers may approve their own work.
- Remaining edge case: whether recovery may republish an older version containing material retired since that version's original publication. This needs an explicit precedence rule between material retirement and recovery.

### Owner discovery — recovery eligibility

- Approved: recovery follows current publication eligibility rules. Retired material cannot be included in a new publication, including recovery, until explicitly reactivated or replaced with an eligible, reviewed and approved replacement. Existing published uses remain available. Recovery never bypasses active access removal, and historical publication and learner records remain preserved.

## Answer

### Authoring sources and material needs

`handbook/` remains the Handbook's authoritative authoring and maintenance source. Other courses may use an in-platform content editor or different external authoring workflows and sources; internal authoring is not mandatory. Whether the editor belongs in the first release remains open.

Imports and synchronization create unpublished drafts, never automatic publication. The original authoring source remains authoritative, and each publication identifies the exact source revision used. Imported drafts undergo preview, review, approval, and explicit publication before learners see them.

The workflow should accommodate formatted text, images, code examples, video, downloadable files, and written exercise instructions. Executable exercises and interactive learning activities require separate evaluation. These conceptual needs do not commit the first release to every material format.

### Responsibilities, approval, and publication

Authors prepare and revise educational content. Publishers review, approve, publish, and withdraw it. One person may perform both responsibilities and approve their own work; approval by a second person is not mandatory.

Publication releases a coherent, reviewed course structure and its explicitly selected material revisions together. Draft changes remain unavailable to learners, who continue seeing the currently published version during preparation and review.

Approval applies to the exact course structure and material revisions reviewed. Any change to an approved draft invalidates approval and requires renewed review and approval. Preview, approval, and publication must reference the same content version.

External tools may support coordination, discussions, reviews, assignments, and checklists. The publishing workflow must protect drafts, support preview, and preserve accountability by recording who approved and published each course version and when. Detailed tooling and first-release delivery mechanisms remain open; external coordination does not remove these safeguards.

### Shared-material revisions

Each published course retains its explicitly selected revisions of shared educational materials. When a material changes, each course's publisher independently decides whether and when to adopt the revision through review and explicit publication. Updating shared material never silently alters other published courses.

### Existing learners and historical records

Existing learners receive the latest published course version. Meaningful changes are communicated to returning learners, while historical learning activity and completion records remain preserved and must not be erased or silently rewritten. Access to older course versions and a learner-facing version selector are not currently required.

Preserving historical completion does not settle whether it satisfies substantially revised requirements. Added lessons, changed requirements, reassessment, current completion validity, and associated progress displays remain for learner-experience discovery.

### Retirement and access removal

Course retirement stops new discovery and enrollment while preserving access for existing learners. Material retirement prevents inclusion in future publications while preserving existing published uses.

Access removal is a separate operation that makes affected content unavailable when necessary, with a recorded reason. For shared material, it applies across every course using the affected material; affected publishers must be informed, and learners receive a clear explanation of unavailability. It must not silently substitute another revision. Retirement and access removal do not automatically delete historical learning records.

### Publication recovery

A publisher may recover from an incorrect publication by explicitly republishing a previously approved course version. Recovery is a new publication event, preserving publication history and learner records, and must comply with current publication eligibility rules.

If the selected version contains material retired since its original publication, the publisher must explicitly reactivate that material or prepare, review, and approve an eligible replacement before publishing. Retirement therefore blocks new inclusion even during recovery, while preserving existing published uses. Recovery never bypasses active access removal.

### Context pointers and remaining decisions

Settled vocabulary is recorded in the root [glossary](../../../GLOSSARY.md). No editor implementation, content schema, import mechanism, or provider is selected.

- [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md) establishes revised-requirement completion validity, reassessment, progress displays, and learning-path consequences while preserving historical records.
- [Define the first release and later product phases](06-first-release-and-phases.md) selects editor scope, supported material formats and authoring sources, and how the required publishing safeguards are delivered within the release.
- [Validate the first-release learner and publisher experience](07-first-release-experience-prototype.md) evaluates selected publication, revision, notification, unavailability, and recovery experiences.
- [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md) resolves selected ingestion and source provenance, version identity, approval validity, publication accountability, eligibility enforcement, and historical record preservation contracts.

The owner explicitly approved all workflow decisions through the discovery rounds, including the final recovery eligibility rule. This resolves the publishing workflow decision; release selection, learner-experience rules, and technical delivery remain with their linked tickets.
