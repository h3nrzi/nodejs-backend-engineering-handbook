# Handbook information architecture

The Handbook operates as three connected systems, not a single completion checklist.

## 1. Curriculum — what is taught

`domains/` owns the 16-domain roadmap, each domain's curriculum, lessons, catalog, and educational Project Charters. `templates/` owns editorial scaffolds. `projects/coverage-matrix.md` maps educational opportunities to competencies.

A lesson marked `approved_by_learner` has editorial approval, not proof the learner studied it or mastered it. A Charter names product problems and engineering challenges; it does not prescribe architecture or replace a Final PRD.

## 2. Project engineering — what is being built

`docs/workflow.md` is the authoritative cross-repository process. `docs/module-driven-engineering.md` defines role/authority handoffs. The Handbook links approved external project artifacts through `projects/implementations/`.

The external implementation repository owns Product Discovery → explicitly approved Final PRD → explicitly approved Module Plan → module Technical Discovery → specification → tickets → implementation and acceptance. Product Owner approval is always attached to the named artifact. The Handbook must not copy or independently revise those artifacts.

## 3. Competency evidence — what the learner demonstrated

`tracking/state.json` is the canonical machine-readable project and editorial state; `TRACKER.md` is the human-readable projection. A project may have approved planning artifacts without implemented behavior. The learner may have run a project without having demonstrated understanding of every underlying concept. Those are separate evidence claims.

Use these dimensions:
- **Editorial:** not started / drafted / learner approved.
- **Project planning/delivery:** Charter approved / Product Discovery approved / Final PRD approved / Module Plan approved / module specs and tickets approved / implemented with verification / module accepted.
- **Learner competency:** not assessed / practiced with evidence / assessed with evidence.

Only assign the strongest status supported by a link to the actual artifact, check, commit or assessment. If a local project file is not published, record the user-reported stage and mark remote verification pending.

## Navigation ownership

- `README.md`: orientation and entry points, not a competing status database.
- `ROADMAP.md`: ordered learning domains.
- `AGENTS.md`: agent operating contract and authoring safeguards.
- `docs/`: canonical workflow, gates, protocols and dated audits.
- `domains/`: lesson and approved educational project content.
- `projects/implementations/`: lightweight pointers to actual project repositories and their evidence gates.
- `templates/`: reusable educational and handoff templates.
- `tracking/`: canonical state, with `TRACKER.md` as its projection.

## How MediaForge validates the workflow

D03-P02 is the first active external implementation planning case. The project has approved module-one tickets; ticket implementation and tests must be tracked separately as evidence arrives. Subsequent findings from Codex should improve templates and procedural guidance, not retroactively rewrite its approved Charter or Product Owner product contract.
