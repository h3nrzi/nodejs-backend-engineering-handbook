# Decide the first-release technical boundaries and feasibility

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 07
Prerequisites: [Validate the first-release learner and publisher experience](07-first-release-experience-prototype.md)

## Question

Which technical boundaries and contracts make the agreed first-release experience feasible with Next.js in client/ and the Handbook's source authority intact?

For selected release capabilities, resolve content ingestion and stable identity, content revisions and links, application and backend responsibilities, learner identity and persistence, and operational requirements. Scope security, accessibility, performance, privacy, and deployment decisions to the approved release. Investigate APIs and provider facts against current documentation; create specific research or prototype tickets for unresolved dependencies before resolving this ticket. Avoid detailed architecture for later phases and avoid building the application.

Translate the selected capabilities from [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md#answer) into enforceable contracts for source revision provenance, consistent preview/approval/publication content identity, approval invalidation, independently selected shared revisions, publication accountability, and preservation of historical publication and learner records. Resolve how publication and recovery enforce current material eligibility and active access removal without silently changing other published courses.

Translate selected capabilities from [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md#answer) into contracts for enrollment versus access entitlement, path participation without duplicate course progress, requirement identity and evidence, current fulfillment calculations, historical completion, course/path publication changes and equivalence, saved position, and archive/restore. Enforce meaningful required-work publication minimums and distinguish obstacles from progress. For included assessment and verification capabilities, resolve reviewer authority, evidence correction or invalidation, reassessment, result qualification, feedback availability, and propagation to affected requirements while preserving history. Surface unresolved policy choices explicitly rather than inventing them as implementation details.
