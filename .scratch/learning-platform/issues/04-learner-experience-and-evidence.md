# Choose the learner journey and evidence of learning

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 01, 02
Prerequisites: [Choose the first learner segment and learning outcome](01-first-learner-and-outcome.md); [Define courses, educational materials, and learning paths](02-course-and-learning-path-model.md)

## Question

What coherent learning journey should the platform offer, and which capabilities best support the chosen learner outcome over time?

Consider finding and navigating a course, starting and resuming study, learning paths and personalization, practice, exercises, assessments, feedback, and progress. Decide what each proposed learner-facing status or claim means and what evidence supports it, including how completion differs from competency. Identify capability priorities and dependencies without assuming every capability belongs in the first release.

Use the approved independent, self-paced context from [Choose the first learner segment and learning outcome](01-first-learner-and-outcome.md#answer). Specify the enrollment, structured-lesson, learning-path, resume, and progress experiences prioritized there, including what observable progress means. Distinguish these owner-selected priorities from validated learner needs.

Apply the approved boundaries in [Define courses, educational materials, and learning paths](02-course-and-learning-path-model.md#answer). Specify lesson, course, and learning-path completion criteria and their evidence, including how required and optional steps affect progress displays. Define how path participation relates to independent course study, including a course appearing in multiple paths. Determine how advisory prerequisites and explicit restrictions appear to learners, and what evidence and verification can satisfy a mandatory prerequisite, including knowledge acquired outside the platform. Keep these decisions separate from choosing which capabilities ship in the first release.

Apply the owner-approved publishing constraints recorded in [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md#answer). Determine whether historical completion satisfies revised course requirements, how added or substantially changed required lessons affect current progress and completion displays, and when reassessment is necessary. Distinguish preserved historical records from fulfillment of current requirements, including consequences for learning paths containing an updated or withdrawn course.

## Comments

### Owner discovery — discovery, participation, continuity, and evidence

- Approved: learners browse and search courses before enrollment. Course information presents learning outcomes, intended audience, prerequisites, outline, required and optional lessons, and mandatory progression restrictions so learners can judge suitability.
- Approved: enrollment is the learner's choice to add a course to ongoing studies and track progress. Access entitlement is separate; enrollment implies neither payment, permission to access restricted materials, nor an obligation to finish.
- Approved: following a learning path is explicit and organizes existing course progress without duplication. Qualifying independent course progress and progress shared across paths contribute to each relevant path. Following a path does not automatically enroll learners in its courses; leaving preserves course enrollments and historical learning records.
- Approved: Continue Learning returns to the last visited lesson and separately identifies the next unfinished required lesson. Visits do not complete lessons. Revisions, retirement, or access removal affecting the saved position require an explanation and an available next step.
- Approved: lessons declare completion requirements appropriate to their learning objectives. Ordinary study may use explicit Mark Complete; requirements for submission, assessment results, or other verified evidence cannot be satisfied by learner confirmation alone. Opening, elapsed time, and playback independently establish neither understanding nor demonstrated competency.
- Approved: structured self-paced study, clear navigation, and reliable progress come first. Practice develops skills, assessment evaluates against defined criteria, and feedback supports improvement, all aligned to course outcomes. Prefer transparent learner choices and publisher guidance initially. Advanced adaptive personalization remains a future consideration pending educational value and evidence.
- These are owner-selected product decisions, not validated learner findings or a commitment to ship every capability in the first release. The ticket remains claimed while completion calculations, prerequisite verification, assessment evidence, and revision consequences are explored.

### Owner discovery — requirement fulfillment, verification, assessment, and revisions

- Approved: course completion requires all required lessons; path completion requires all required courses. Display required lessons fulfilled / total required lessons and required courses fulfilled / total required courses, respectively. Track optional work separately; it never prevents completion. Counts measure requirement fulfillment, not effort, remaining time, or competency.
- Approved: mandatory prerequisites specify acceptable evidence and an accessible verification route, including for externally acquired knowledge or skills. Depending on the requirement, relevant platform assessment results, diagnostic assessment, or reviewed external evidence may qualify. Self-declaration can acknowledge advisory preparation but cannot automatically satisfy a mandatory verified requirement. Explain restrictions and how to satisfy them.
- Approved: required assessments disclose evaluation criteria, passing requirements, evaluation method, and expected feedback before the attempt. Submission is distinct from successful assessment completion; submission alone qualifies only if explicitly sufficient. Automated evaluation and human review are possible. Mandatory human review requires communicated reviewer availability and expected turnaround, never an unexplained self-paced dependency.
- Approved: support assessment retries and improvement while preserving attempts, results, and feedback. Publishers declare attempt limits, waiting periods, and result qualification rules before attempts. A later unsuccessful practice attempt must not silently invalidate an already fulfilled requirement. Reassessment due to revised requirements is separate.
- Approved: preserve historical activity, assessment results, and completion when course requirements change. Current progress reflects the latest published requirements. Publishers explicitly determine whether prior completion and evidence qualify; cosmetic changes preserve fulfillment, while new or substantially changed requirements require an explicit equivalence decision or additional learner work. Explain historical completion, current fulfillment, and changes separately. Reassess only where revised requirements demand additional evidence.
- Approved: demonstrated competency claims identify the specific evaluated outcomes, criteria, result, and date, supported by suitable assessment evidence. Learner-confirmed completion alone does not demonstrate competency. Evidence supports only evaluated outcomes; historical competency evidence remains distinct from fulfillment of revised current requirements.
- The ticket remains claimed while path revision and withdrawal consequences, unavailable requirements, learner controls, and progress status boundaries are explored.

### Owner discovery — path changes, obstacles, corrections, and statuses

- Approved: paths calculate current progress against latest published path requirements using qualifying course fulfillment, while preserving historical path completion and evidence. Publish and communicate required-course changes explicitly. Added or replacement courses do not automatically inherit completion; removed requirements no longer contribute to current fulfillment.
- Approved: unavailable requirements remain visibly unresolved until an explicit publisher decision changes requirements or restores an eligible route. Access removal, unavailable review, and unmet mandatory prerequisites neither grant fulfillment nor silently reduce requirements. Retirement preserves existing enrollees' access. Explain unavailable required path courses and require an explicit path revision or restored valid route. Unavailability alone neither grants nor invalidates previously established fulfillment.
- Approved: publication requires at least one required lesson per course and at least one required course per path. Drafts can remain incomplete; optional-only offerings must not appear automatically completed.
- Approved: learners may undo self-confirmed lesson completion, updating current fulfillment and affected course/path progress while preserving historical activity. Revisiting does not revoke completion. Verified assessments and mandatory prerequisite evidence use separate correction or review procedures.
- Approved: archiving removes a course from active studies and automatic Continue Learning recommendations without changing enrollment, access entitlement, or historical records. Restoration uses current published requirements. Leaving and rejoining paths similarly preserves underlying course enrollment and learning records.
- Approved: current statuses are Not started (no learning activity or qualifying fulfillment), In progress (activity has begun or some requirements qualify, with required work remaining), and Requirements fulfilled (all current required work qualifies). Display awaiting review, unmet mandatory prerequisites, and unavailable content separately. Distinguish historical completion with outstanding revised requirements from current fulfillment, and display demonstrated competency only with suitable evidence.

## Answer

### Discovery, enrollment, and structured study

Learners browse and search courses before enrollment. Each course presents learning outcomes, intended audience, prerequisites, its outline, required and optional lessons, and mandatory progression restrictions, enabling a judgment about goals and preparation.

Enrollment is an explicit choice to add a course to ongoing studies and track progress. It is separate from access entitlement and implies neither payment, permission to access restricted materials, nor an obligation to finish. Course sequence remains advisory by default, with restrictions explicitly justified and explained.

Continue Learning returns to the last visited lesson while separately identifying the next unfinished required lesson. Visiting a lesson does not complete it. Revisions, retirement, or access removal affecting the saved position require an explanation and an available next step; an unavailable required step is explained as an obstacle rather than silently skipped for completion.

Learners may archive courses to remove them from active studies and automatic Continue Learning recommendations without losing enrollment, access entitlement, or history. Restoring a course resumes against current published requirements. Archiving does not cancel enrollment or independently grant or revoke access.

### Learning-path participation and shared course progress

Following a learning path is explicit and organizes existing qualifying course progress without duplication. Independent course study and courses shared across multiple paths contribute to each relevant path when their requirements qualify. Following a path does not automatically enroll the learner in every course. Leaving or rejoining a path preserves course enrollments and learning records.

### Completion requirements and observable progress

Each lesson declares completion requirements appropriate to its learning objectives. Ordinary study may use explicit Mark Complete. A requirement for an exercise submission, assessment result, or other verified evidence cannot be fulfilled by learner confirmation alone. Opening a page, elapsed time, and video playback alone do not establish understanding or demonstrated competency.

Course completion requires all required lessons; path completion requires all required courses. Display course progress as required lessons fulfilled / total required lessons, and path progress as required courses fulfilled / total required courses. Track optional work separately; it never prevents completion. These counts measure requirement fulfillment, not effort, time remaining, or competency. A published course needs at least one required lesson, and a published path at least one required course; drafts may remain incomplete.

Learners may undo their own self-confirmed completion. Current lesson fulfillment and affected course/path progress update, while historical activity remains preserved. Revisiting a completed lesson does not revoke completion. Verified assessment results and mandatory prerequisite evidence use separate correction or review procedures rather than self-confirmation controls.

Current progress labels have these meanings:

- **Not started:** no learning activity or qualifying fulfillment.
- **In progress:** activity has begun or some requirements qualify, with required work remaining.
- **Requirements fulfilled:** all currently published required work qualifies.

Obstacles such as awaiting review, unmet mandatory prerequisites, and unavailable content appear separately from progress. Historical completion and demonstrated competency are distinct information, not substitutes for current requirement fulfillment.

### Practice, assessment, feedback, and verification

Practice provides opportunities to develop knowledge and skills. Assessment evaluates performance against defined criteria, and feedback supports improvement. Each serves the specific course learning outcomes.

Before a required assessment begins, disclose evaluation criteria, passing requirements, evaluation method, and expected feedback. Submission and passing are distinct; submission alone qualifies only where explicitly sufficient. Automated evaluation and human review are possible, according to the learning outcome. Mandatory human review requires communicated reviewer availability and expected turnaround, never an unexplained dependency in self-paced study.

Support retries and improvement while preserving attempts, results, and feedback. Publishers declare attempt limits, waiting periods, and result qualification rules before attempts begin. A later unsuccessful practice attempt must not silently invalidate already fulfilled requirements. Reassessment due to revised requirements is separate.

Mandatory prerequisites specify acceptable evidence and an accessible verification route, including for externally acquired knowledge and skills. Relevant platform assessment results, diagnostic assessment, or reviewed external evidence may qualify, depending on the requirement. Self-declaration can acknowledge advisory preparation but cannot automatically satisfy verified mandatory requirements. Explain why access is restricted and how learners can qualify.

### Competency and evidence boundaries

Demonstrated competency requires suitable assessment evidence for specific learning outcomes. Each claim identifies the evaluated outcome, assessment criteria, result, and date of demonstration. Evidence supports only the outcomes it actually evaluates. Learner-confirmed completion alone cannot establish competency. Historical competency evidence remains distinguishable from whether it satisfies revised current requirements.

### Revisions, equivalence, and historical achievements

Preserve historical learning activity, assessment results, and completion. Current progress reflects the latest published requirements. Publishers explicitly determine whether prior completion and evidence still qualify: cosmetic changes preserve fulfillment; new or substantially changed requirements need an explicit equivalence decision or additional learner work. Reassessment occurs only where revised requirements demand new evidence.

Explain historical completion, current fulfillment, and changes separately. For example, a learner who completed ten required lessons retains that achievement after an eleventh required lesson is added, while current progress can show ten of eleven requirements fulfilled and explain the outstanding work.

Paths use qualifying course fulfillment against their latest published requirements. Course revisions may change current path progress without erasing historical path completion. Required-course changes within paths must be explicitly published and communicated to affected learners. Adding or replacing a required course does not automatically transfer completion to the replacement; removing a requirement stops it contributing to current fulfillment. Historical achievements and evidence remain preserved.

### Unavailable content and completion obstacles

Unavailable requirements remain visibly unresolved until an explicit publisher decision changes the requirements or restores an eligible route. Access removal, unavailable assessment review, and unmet mandatory prerequisites must not automatically grant fulfillment or silently reduce completion requirements. Unavailability alone neither grants nor invalidates previously established fulfillment.

Course retirement preserves access for existing enrollees. If a required path course becomes unavailable to a learner, including retirement before enrollment, explain the obstacle. The publisher must explicitly revise the path or restore a valid route to completion. Preserve the learner's historical evidence and achievements.

### Priorities, evidence, and remaining decisions

Structured self-paced study, clear navigation, and reliable progress are the initial priorities. Prefer transparent learner choices and publisher guidance. Practice, assessment, and feedback support course-specific outcomes; advanced adaptive personalization remains a future consideration pending educational value and supporting evidence.

These are owner-approved product decisions, not validated learner findings or a commitment to ship every capability in the first release. Real-learner validation remains open. Settled terms are recorded in the root [glossary](../../../GLOSSARY.md); no schema, provider, assessment engine, or implementation has been selected.

- [Choose the business and operating constraints for launch](05-business-and-operating-constraints.md) determines access policy and operating responsibilities, including constraints on any required human review.
- [Define the first release and later product phases](06-first-release-and-phases.md) selects supported completion, practice, assessment, verification, revision, and learner-control capabilities and their phase boundaries.
- [Validate the first-release learner and publisher experience](07-first-release-experience-prototype.md) evaluates the selected discovery, enrollment, path, resume, progress, evidence, obstacle, and change-communication experiences.
- [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md) defines selected identity and history contracts, evidence and equivalence handling, correction/review responsibilities, and publication/progress consistency. Any further product decisions exposed by those contracts require explicit resolution rather than assumed policies.
- [Confirm the blueprint and first-release specification are ready for implementation](09-specification-readiness.md) checks that included capabilities have complete, testable contracts and that deferred ones do not create unsupported requirements.

The owner explicitly approved all eighteen discovery questions, including path revisions, unavailable requirements, publication minimums, completion correction, archiving, and status meanings. This resolves the learner-journey decision; release selection, detailed delivery contracts, and learner validation remain with their linked work.
