# Learning evidence and competency tracking

## Purpose

Separate **editorial coverage**, **project delivery**, and **learner demonstrated competence**. The Handbook teaches Node.js backend engineering; generated code or approved docs alone cannot certify understanding.

## Evidence chain

1. **Lesson:** learning outcomes, prerequisites, practice exercises and expected results. Editorial approval means the content has been reviewed, not that the learner completed it.
2. **Project Charter:** links relevant lessons to observable real-world challenges. Charters must stay technology-solution-neutral and are **not** Final PRDs.
3. **External project:** a learner-selected Charter is handed to Codex; the approved Final PRD, Module Plan, technical discoveries, specs, tickets, implementation and tests belong to that repository.
4. **Reflection and assessment:** only actual learner explanation, troubleshooting, trade-off justification or hands-on work may count as demonstrated competency. Record artifact pointers, assessment method, date and limits.

## Evidence levels

| Category | Permissible claim | Required evidence |
| --- | --- | --- |
| Taught | Lesson authored/editorially accepted | Lesson and editorial review record |
| Challenged | Approved Charter addresses a problem with relevance to a competency | Charter and lesson mapping |
| Planned | External product and module artifacts explicitly approved | Named document, approval gate and qualified source |
| Exercised | An implemented behavior or experiment actually ran | Commit, command/test result, environment and scope |
| Demonstrated by learner | Learner independently applied or explained the concept | Dated exercise or assessment and rubric |
| Not assessed | No learner-competency claim | No evidence needed |

Never aggregate `planned` into `exercised`, nor `exercised` into `demonstrated by learner`. A Codex-produced implementation may provide practice material, but mastery requires learner evidence.

## What to record per learning checkpoint

- Domain and lesson IDs; optional project/requirement/ticket reference.
- Learning objective or competency in the learner's own words.
- Evidence link and whether independently verified or user reported.
- Scope/environment for executed checks; what has not been tested.
- Learner's explanation or decision rationale, when assessed.
- Outcome: not assessed / practiced / demonstrated / needs review. Do not invent a grade.

## Workflow integration

Use [Workflow V2](workflow.md) and [module ownership](module-driven-engineering.md) for production work. [External project registry](../projects/implementations/README.md) tracks engineering progress. The [coverage matrix](../projects/coverage-matrix.md) tracks taught/challenged relevance. Do not duplicate implementation PRDs, ADRs or tickets in this repository.

Assessments remain deferred by learner choice; this document defines future evidence integrity only and does not start a quiz or grade any current learner.
