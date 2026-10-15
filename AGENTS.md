# Handbook agent operating contract — Workflow V2

Read [Workflow](docs/workflow.md), [Tracking](tracking/state.json), [Tracker](TRACKER.md), [Coverage matrix](projects/coverage-matrix.md), then selected domain lessons and Charter.

## Nonnegotiable boundaries

1. **Handbook only authors:** Domain lessons, educational project Charters, catalogs, coverage, templates and tracking. No Final PRD or Module Plan for unselected projects.
2. **Charter is not Final PRD.** It establishes educational purpose, target users, problem, initial scope and engineering challenges, without mandating an implementation solution.
3. In a separate project repo, **Codex authors** `product-discovery.md`, then an explicitly learner-approved `final-prd.md`, then an explicitly learner-approved `module-plan.md`.
4. Each module goes through **module-scoped** Codex Technical Discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → acceptance. Do not conduct unbounded whole-product Technical Discovery.
5. The learner approves all consequential product and technical decisions. ChatGPT guides, explains trade-offs, reviews consistency and learning evidence; Codex proposes and implements.
6. Preserve versioned evidence and avoid claiming unrun tests, implementation, verified learning or provider qualification.
7. D01–D04 curricula, all 66 lessons and all 20 educational Charters are editorially approved; D04’s educational authoring gate closed on 2026-10-15. D05 remains not_started. MediaForge D03-P02 has approved external Module 01 planning through tickets; implementation/tests and learner competence remain unverified.
8. For every authoring milestone reconcile `tracking/state.json`, `TRACKER.md`, domain indexes, and `projects/coverage-matrix.md`.
9. Do not create technical architecture or force use of a Node.js mechanism just for educational coverage; domain challenges belong in the Charter, solution selection belongs to Codex per module.

Use actual installed skill names. See [Role ownership](docs/module-driven-engineering.md) and [Quality gates](docs/quality-gates.md).
