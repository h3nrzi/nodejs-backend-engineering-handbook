# D01–D03 curriculum and competency coverage audit — 2026-10-15

**Status:** Structural/editorial audit completed; proposals only for content revisions. No approved lessons or Project Charters modified.

## Verified scope

- GitHub inventory contains 14 D01, 16 D02 and 18 D03 lesson files: **48** total.
- Each domain has a curriculum blueprint and a project catalog; D01/D02/D03 contain **4/5/5 educational Charters**, respectively.
- The competency crosswalk has exactly **48 chapter-level rows**: D01-C01–C14, D02-C01–C16, D03-C01–C18.
- Crosswalk rows currently have no *external portfolio implementation* evidence. This does not negate the scoped educational experiment evidence already documented in some D03 lessons.
- Sampling reviewed D01 Chapter 01, D02 Chapter 08 and D03 Chapter 03 in full navigation/heading outline and opening sections, plus all three curriculum blueprints and the crosswalk structure. This is **not** a full line-by-line factual audit of all 48 lessons.

## Findings

### A. Confirmed stale editorial metadata (priority high)

1. `handbook/domains/01-computer-science-foundations/curriculum.md` describes Chapter 01 as a **draft**, although the canonical state records all 14 D01 lessons as editorially approved.
2. `handbook/domains/01-computer-science-foundations/lessons/01-cost-models-and-correctness.md` itself says **drafted; awaiting learner review**. This conflicts with the current tracker. Treat it as an editorial-status discrepancy requiring reconciliation against the approval record, **not** as evidence that approval never happened.
3. `handbook/domains/03-nodejs-internals/curriculum.md` includes historical **approved PRDs** and `implementation: not_started` language. Workflow V2 treats those former PRD drafts as superseded by approved educational **Charters**. D03-P02 MediaForge has separately progressed through approved external Module 01 ticket planning; application implementation remains unverified.

**Action:** Reconcile historical status labels without changing lesson content or retroactively redefining approval. Keep legacy text discoverable and explicitly historical where necessary.

### B. Curriculum continuity (priority medium)

The blueprints establish clear domain boundaries:
- **D01:** correctness/algorithms → machine and OS foundations → concurrency → cumulative reasoning.
- **D02:** language semantics → asynchronous composition → TypeScript → integration.
- **D03:** runtime lifecycle/scheduling → bytes, I/O and execution boundaries → diagnosis and failure cases.

The reviewed sample lessons include outcomes, explanations, examples, exercises and qualifications. D03 Chapter 03 explicitly refers to D01 I/O/liveness and D03 prerequisites, while D02 Chapter 08 separates language-level Promise behavior from Node runtime phases.

**Gap:** The crosswalk is chapter-level rather than exhaustive subtopic assessment, so it cannot prove that every advanced subtopic has equivalent exercise depth. This is a granularity limitation, not evidence of a missing chapter. Defer subtopic-quality claims until a chapter-by-chapter audit with explicit rubric.

### C. Project-to-competency traceability (priority medium)

The 48 crosswalk rows link a taught competency to one or more educational Charter challenges. At least 13 crosswalk rows explicitly qualify an approach as optional or supporting, properly avoiding imposed technical solutions.

**Gap:** A challenge mentioning a competency does not guarantee Codex will select or exercise that mechanism. Preserve three different statuses per competency: **taught**, **Charter challenge**, and **externally exercised**. A fourth, **learner-demonstrated**, requires independent learner evidence. Never retrofit specific technology requirements into approved Charters merely to make the matrix look complete.

### D. Evidence and readiness (priority medium)

Selected D03 lessons contain bounded environment-specific execution evidence, separate from implementation-repository tests and learner assessments. MediaForge has approval records through Module 01 tickets but no verified implementation/test completion currently registered.

**Gap:** A single statement like “zero evidence” is misleading across evidence types. Clearly distinguish **education-fixture execution**, **external product execution**, and **learner demonstrated mastery** in future reports.

## Recommended quality-review rubric for later deep audit

For each chapter, verify:
1. Intended prerequisite concepts and backward/forward links.
2. Correct mechanism explanation, examples and meaningful counterexamples.
3. Clearly bounded Node/JavaScript versions and documented-vs-observed guarantees.
4. Exercises with expected outcomes and a rubric, not only conceptual recall.
5. Backend-specific failure diagnosis and competing explanations.
6. Honest statement of what has been executed versus not executed.
7. Connection to at least one product/Charter challenge without prescribing its architecture.
8. Distinct **editorial**, **execution**, and **learner** evidence states.

## Recommended next changes

- Correct editorial-status references in blueprints via a narrowly scoped metadata pass.
- Mark historical D03 PRD terminology as superseded; do not rewrite Charter contents.
- Add a concise crosswalk note defining chapter-level mapping limitations and scoped lesson experiments.
- Preserve D04 as the next curriculum authoring domain once the metadata review is reconciled.

No learner assessment was performed; no lesson exercises were newly executed; no portfolio project passed a verification gate in this audit.
