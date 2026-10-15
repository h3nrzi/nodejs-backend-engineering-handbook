# Handbook architecture audit — 2026-10-15

Status: Phase 1 structural audit; no curriculum/Charter rewrites.

## Observed repository inventory

- 16 domain directories, D01–D16.
- D01: 14 editorially approved lessons, 4 approved educational Project Charters.
- D02: 16 editorially approved lessons, 5 approved educational Project Charters.
- D03: 18 editorially approved lessons, 5 approved educational Project Charters.
- D04–D16 are future curriculum work, not completed lesson sets.
- Workflow V2 already defines Handbook Charter ownership versus separate Codex product and implementation artifacts.
- `tracking/state.json` is the canonical tracking state and `TRACKER.md` its reader-oriented projection.
- `projects/coverage-matrix.md` records instructional coverage, not verified learner mastery.

## Findings and prioritized actions

1. **Stale MediaForge execution state (high):** The README, tracker, coverage-matrix prose and state still describe every project implementation as not started. D03-P02 MediaForge has independently reached approved Final PRD, Module Plan, Module 01 technical discovery, specification and eight-ticket plan in its separate project repo. This is **planning progress only**; no implementation, running tests, or learner assessment is confirmed.
2. **Three distinct status dimensions (high):** Lesson editorial approval, external project delivery status and the learner's demonstrated competency must not share a completion flag. Keep verified evidence separate from documented decisions.
3. **Navigation ownership (medium):** Maintain `docs/workflow.md` and `docs/module-driven-engineering.md` as the current workflow authority. Avoid prematurely moving them; create a concise information-architecture map instead. The old PRD audit is historical and should stay discoverable but non-authoritative.
4. **Projects register (medium):** An external project registry is missing. Add one linked entry for D03-P02, refer to the implementation repository rather than copying PRD/spec/ADR/tickets here.
5. **Assessment timing (medium):** Assessment is deferred until the learning phase; defining an evidence-status model does not create or claim exams or results.
6. **Coverage reconciliation (medium):** A maintained competency matrix should distinguish taught, charter challenge, externally exercised and learner demonstrated, without treating a named Node mechanism as a mandatory solution in a product Charter.

## Data and document authority

| Artifact | Authoritative home | Allowed handbook representation |
| --- | --- | --- |
| Domain curriculum, lessons, educational Charters | Handbook | Full text and editorial status |
| Product Discovery, Final PRD, Module Plan | Separate project repository | Direct link, explicit owner approval/evidence |
| Technical Discovery, ADR, specification, ticket files, tests | Separate project repository | Links and verified status only |
| Learner study/assessment | Handbook learning tracking | Evidence-linked, default unassessed |
| Live progress | `tracking/state.json` | `TRACKER.md` projection and project registry |

## Non-goals of this phase

No moving 48 lessons, no rewriting 14 approved Charters, no changing approved product requirements, no invented learning outcomes or implementation tests. Preserve existing workflow entry points until link migration is explicitly planned and validated.

## Follow-up migration plan

1. Register MediaForge and reconcile canonical/project-specific status with truthful evidence boundaries.
2. Add information-architecture and evidence-status guidance.
3. Audit links and redundant instructions across README, ROADMAP, AGENTS, workflow, templates and catalogs.
4. Only after link checks, consider selective folder relocation; do not move historical content just to fit a new diagram.
