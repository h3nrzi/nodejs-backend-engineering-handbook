# Define courses, educational materials, and learning paths

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: 01
Prerequisites: [Choose the first learner segment and learning outcome](01-first-learner-and-outcome.md)

## Question

What do course, educational material, and learning path mean in this platform, and how do learners encounter and move between them?

Resolve their boundaries, organization, prerequisites, and relationships using concrete examples from the Handbook and at least one contrasting subject or experience level. Decide what independence and reuse across courses mean. Distinguish learner activity and completion from demonstrated competency; editorial approval must not become learner progress. Record settled vocabulary in the root glossary without committing to database or content schemas.

## Comments

### Owner discovery — structure and terminology

- Approved: each course has its own learning outcomes and sections grouping related lessons; lessons are individual learning units.
- Approved: a lesson can combine educational materials including text, video, images, code examples, interactive content, and exercises. Materials support a lesson rather than automatically becoming separate lessons. This establishes vocabulary, not a first-release commitment to implement every material type.
- Approved: a learning path connects multiple courses toward a broader educational goal. Each course retains its internal structure and course sequence.
- Owner clarification: a defined sequence does not automatically require mandatory linear progression. Prerequisites, optional lessons, and progression restrictions remain separate decisions to explore.
- Recorded these settled terms in the root glossary. The ticket remains claimed while independence, reuse, prerequisites, optionality, and related boundaries are discussed.

### Owner discovery — navigation, optionality, reuse, and independence

- Approved: learners navigate courses freely by default. Prerequisites provide guidance; courses may explicitly declare mandatory progression restrictions where educationally necessary, with clear requirements and rationale.
- Approved: courses distinguish required lessons from optional enrichment. Optional lessons are not required for course completion. Precise lesson and course completion rules remain for [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md).
- Approved: educational materials are reusable across courses, while lessons remain course-specific. Reuse does not share lesson completion, learner progress, assessment results, or learning outcomes across courses.
- Approved: courses are independently discoverable and accessible without learning-path enrollment. A course may belong to multiple learning paths representing different broader educational journeys.
- Approved: in the initial learning experience, materials are primarily accessed through lessons. A standalone, browsable material library may be considered in a future release; reuse alone creates neither separate learner-facing catalog entries nor enrollment requirements.
- Updated the root glossary with these settled boundaries. Path navigation, the meaning of course prerequisites, and the distinction between learning records and competency remain to be confirmed before resolution.

## Answer

### Course structure and learning paths

Each course has its own learning outcomes and an organized structure of sections containing lessons. Sections group related lessons; lessons are course-specific individual learning units. The defined ordering inside a course is its course sequence.

A learning path connects multiple courses toward a broader educational goal. Each course retains its own internal structure and course sequence, remains independently discoverable and accessible without path enrollment, and may belong to multiple paths. A path's recommended ordering must not prevent independent discovery or access to its courses.

### Materials, reuse, and initial access

A lesson is a learning step that can combine educational materials: text, video, images, code examples, interactive content, exercises, and other supporting content or activities. A material does not automatically become a separate lesson. These examples define the vocabulary; they do not commit the first release to supporting every material type.

Materials may be reused across courses, while lessons remain course-specific. Reuse does not share lesson completion, learner progress, assessment results, or learning outcomes across courses. In the initial learning experience, learners primarily access materials through lessons. Reuse alone creates neither separate learner-facing catalog entries nor separate enrollment requirements. A standalone, browsable material library may be considered in a future release.

### Sequence, prerequisites, and restrictions

Course sequences and learning paths recommend an order without imposing mandatory linear progression. Learners navigate freely by default. Prerequisites provide guidance unless a mandatory progression restriction is explicitly declared for an educational reason; every restriction must explain its requirements and rationale.

Prerequisites may describe knowledge or skills rather than completion of a particular platform course. Learners may acquire that preparation through external education, professional experience, or independent study. A mandatory prerequisite must define the evidence that satisfies it. Prior knowledge does not automatically bypass a mandatory requirement without an appropriate verification mechanism. The precise verification methods remain for learner-experience discovery.

### Required and optional participation

Courses distinguish required lessons from optional enrichment lessons. Learning paths similarly distinguish required courses from optional enrichment courses. Optional lessons are not required for course completion, and optional courses are not required for path completion. A course's required or optional designation belongs to its role within a particular path, not to the course globally.

Precise lesson, course, and path completion criteria remain open; this decision establishes their structural distinction without selecting automatic completion triggers or assessment methods.

### Activity, completion, competency, and editorial approval

Learner activity records participation and interactions. Completion means that explicitly defined learning requirements have been fulfilled. Demonstrated competency requires appropriate evidence that the learner can apply relevant knowledge or skills. Opening a lesson does not automatically establish completion; completing a course does not automatically prove competency.

Editorial approval concerns educational content readiness. It must remain separate from individual learner progress, completion, and demonstrated competency. The Handbook's existing editorial or delivery tracking must not become learner progress.

### Illustrative scenarios

These examples illustrate the approved model; they are not claims about existing course organization or a proposed course portfolio.

- A Handbook course could organize HTTP lessons in a section, with a lesson combining an explanation, code examples, and an exercise. Another course could reuse the explanation in a different lesson without inheriting the Handbook learner's lesson completion or assessment results. HTTP preparation could be advisory knowledge acquired outside the platform; an explicit mandatory requirement would need defined evidence.
- A beginner photography course could organize exposure lessons in a section, with an aperture lesson combining text, photographs, and practice. A separate editing lesson could be optional enrichment. A photography learning path could require the exposure course and offer an editing course as optional enrichment; learners could still discover and access either course independently of that path.

### Context pointers and remaining decisions

Settled vocabulary is recorded in the root [glossary](../../../GLOSSARY.md). No database or content schema is selected.

- [Choose the course authoring and publishing workflow](03-authoring-and-publishing.md) resolves publishing and revision behavior, including the consequences of shared-material changes.
- [Choose the learner journey and evidence of learning](04-learner-experience-and-evidence.md) resolves enrollment, activity and progress records, lesson/course/path completion criteria, assessment methods, and evidence and verification for mandatory prerequisites.
- [Define the first release and later product phases](06-first-release-and-phases.md) decides which capabilities enter the first release and when a standalone material library should be reconsidered.

The owner explicitly approved the structure, independence, reuse, navigation, optionality, prerequisite, and evidence distinctions through the discovery rounds. This resolves the model decision; learner validation and later experience and release decisions remain open.
