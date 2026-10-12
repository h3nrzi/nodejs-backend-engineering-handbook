# Learning and implementation workflow

## Handbook authoring, one domain at a time

1. Read `AGENTS.md`, machine state, handoff and domain index.
2. Confirm scope for ONE domain. Write exhaustive staged lessons, terminology, how/why/when, practical TypeScript or Node.js educational examples, common mistakes, exercises, checkpoints and trustworthy references (date/version where relevant).
3. Review lesson against `docs/quality-gates.md`; mark review status honestly.
4. Propose distinctly valuable project concepts aligned to coverage goals; avoid many overlapping CRUDs.
5. For approved concepts, write separate **product PRDs**, using `templates/project-prd.md`. Explain what and why, boundary, invariants and acceptance, never technical choices.
6. Update tracker with committed evidence and the next precise task. Obtain learner review before marking approved.

## Local implementation journey (outside handbook)

1. Learner studies domain and chooses project PRD.
2. ChatGPT asks learner to create an independent local repository and transfer PRD.
3. ChatGPT prepares starter prompt directing Codex to inspect installed Matt Pocock skills. Use `$wayfinder` or `$grill-with-docs` only if those are actual skill invocation names in that installation; let the agent guide questions and documentation.
4. Learner relays Codex questions/output to ChatGPT. ChatGPT explains trade-offs, maps to PRD and learning goals, suggests an answer, and distinguishes approved product constraints from optional technical recommendations.
5. Learner approves consequential decisions; Codex records architecture, specs, ADRs and tickets in the local project repo. Move into implementation via installed skill workflow, then tests/reviews.
6. Handbook records linked implementation repo, status, learning coverage and verified evidence; it must not duplicate technical specifications.

## AI-to-AI handoff

Before finishing, persist current task, status, exact file paths, links, open questions, decisions approved by learner, evidence and next action in `tracking/state.json` and `TRACKER.md`. Unanswered Codex questions belong in external project notes and may be summarized/link-referenced here. No implied approvals. Handoff works from the repo alone, without conversation memory.

## Separate authoring from studying (2026-10-12)

The learner's current phase is **content authoring and portfolio-project planning**, not personal study. During authoring, finish domain lessons, project catalogs, implementation-neutral PRDs and trackers. The exercises and assessment rubric in Chapter 14 remain ready for future use but are **deferred**. Do not initiate, grade or require any learner quiz, practical defense or assessment evidence unless the learner explicitly starts the study phase. Domain chapter editorial approval does not certify competence. Keep project architecture/technical implementation decisions in separate Codex workflows.

## Approved per-domain authoring sequence (2026-10-12)

Apply this order to every domain: **(1) Curriculum planning and learner approval → (2) complete individual lessons with chapter-by-chapter review → (3) develop and review a distinct project candidate catalog → (4) author and review implementation-neutral product PRDs → (5) close the domain content-authoring gate and move to the next domain.** Preliminary project ideas may inform curriculum planning but the actual catalog and PRDs are finalized only after lesson authoring. Do not start learner assessments during authoring. Implementation projects and Codex decisions remain separate. This sequencing is learner-approved; it does not itself approve an individual curriculum blueprint.
