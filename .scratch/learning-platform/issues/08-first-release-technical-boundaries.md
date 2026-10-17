# Decide the first-release technical boundaries and feasibility

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 07, 10, 11
Prerequisites: [Validate the first-release learner and publisher experience](07-first-release-experience-prototype.md); [Choose the pilot operating arrangement](10-operating-arrangement.md); [Estimate pilot operating costs and approve a spending limit](11-operating-budget.md)

## Question

Which technical boundaries and contracts make the agreed first-release experience feasible with Next.js in client/ and the Handbook's source authority intact?

For selected release capabilities, resolve content ingestion and stable identity, content revisions and links, application and backend responsibilities, learner identity and persistence, and operational requirements. Scope security, accessibility, performance, privacy, and deployment decisions to the approved release. Investigate APIs and provider facts against current documentation; create specific research or prototype tickets for unresolved dependencies before resolving this ticket. Avoid detailed architecture for later phases and avoid building the application.

Translate the selected capabilities from [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md#answer) into enforceable contracts for source revision provenance, consistent preview/approval/publication content identity, approval invalidation, independently selected shared revisions, publication accountability, and preservation of historical publication and learner records. Resolve how publication and recovery enforce current material eligibility and active access removal without silently changing other published courses.

Translate selected capabilities from [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md#answer) into contracts for enrollment versus access entitlement, path participation without duplicate course progress, requirement identity and evidence, current fulfillment calculations, historical completion, course/path publication changes and equivalence, saved position, and archive/restore. Enforce meaningful required-work publication minimums and distinguish obstacles from progress. For included assessment and verification capabilities, resolve reviewer authority, evidence correction or invalidation, reassessment, result qualification, feedback availability, and propagation to affected requirements while preserving history. Surface unresolved policy choices explicitly rather than inventing them as implementation details.

Apply [Choose the business and operating constraints for launch](05-business-and-operating-constraints.md#answer). Resolve invitation-only access enforcement independently of enrollment without requiring a dedicated invitation-management system. Specify Persian RTL and course-language behavior, a concrete accessibility standard, and verification criteria appropriate to selected material formats. Define necessary learner data and purposes, private-by-default access, service-provider sharing disclosures, retention periods, account and data deletion, account recovery, and historical-record handling; preservation of history does not authorize indefinite personal-data retention. Obtain owner decisions on unresolved privacy policies and investigate actual jurisdiction-dependent obligations instead of assuming them. Identify concrete accessibility and learner-market availability checks for the eventual release; planning evidence alone is not an operational pilot test.

Final hosting, deployment, and jurisdiction-dependent choices require the confirmed operating arrangement, verified relevant availability and eligibility, cost estimates, and an owner-approved spending limit from the prerequisite decisions. Recheck cost assumptions against the final contracts and reopen the budget decision if necessary. Payment-provider qualification is unnecessary for the free release. Do not resolve this ticket with provider eligibility, operating arrangement, spending approval, or included privacy policies still undecided.
