# Handbook Workflow V2 — Module-Driven Engineering

## Authority and repository boundary

**This repository owns:** domain curricula, lessons, approved educational project Charters, competency coverage, reusable process templates and tracking links.

**The separate implementation repository owns:** Codex-authored `product-discovery.md`, `final-prd.md`, `module-plan.md`, module technical decisions, ADRs, specifications, tickets, code, tests and acceptance evidence.

**The learner/product owner explicitly approves consequential outputs.** ChatGPT explains trade-offs, preserves learning coverage and reviews product alignment; it does not silently approve decisions.

## Domain authoring (Handbook)

1. Author comprehensive curriculum and lessons for one domain.
2. Propose distinct valuable project concepts that offer genuine practice with the domain’s learning challenges.
3. Create `project-charter.md` for each selected concept using `templates/project-charter.md`: problem, audience, initial in/out boundary, expected observable challenges, domain learning outcomes and measurable learning evidence. **No final PRD, implementation solution, technology prescription, or module plan at this phase.**
4. Learner reviews lesson and Charter editorial quality. Record educational approval only; implementation and mastery remain unverified.
5. Reconcile coverage matrix and trackers. Do not count a Charter as Final PRD.

## Implementation kickoff (Codex in separate project repository)

1. Import approved Charter without assuming it is an executable specification.
2. Codex uses installed Matt Pocock `grill-with-docs` with Product Manager focus, producing `product-discovery.md`. The learner approves product decisions; Codex cannot decide unilaterally.
3. After final product-policy approval, **Codex**, not Handbook, consolidates all approved requirements and acceptance into **one authoritative `final-prd.md`**; learner approves this document.
4. **Codex** derives `module-plan.md` from the Final PRD: cohesive delivery modules, requirements traceability, dependency order, cross-module interfaces and acceptance. Learner approves the plan.
5. Execute **one module at a time**. For that module, Codex reviews approved cross-cutting decisions, runs only the necessary **module-scoped Technical Discovery**, applies `grill-with-docs`, documents qualifying ADRs, runs `to-spec` → `to-tickets` → `implement`, verifies against the module acceptance, and then advances.
6. Conduct full-product integration and learning-outcome review after module completion.

## Mandatory discovery stop condition

The technical interview closes when all **implementation-blocking decisions for the current module** are resolved. Do not demand resolution of every downstream architecture, operations or release question for the whole product. Defer unrelated decisions to their owning module or release gate, but do not defer decisions necessary for correctness, safety or acceptance of the current module.

Cross-cutting changes require traceability, conflict review and learner approval. Module is a delivery unit, **not** a mandated microservice, package or framework module.

## Historical migration

D01–D03 pre-V2 documents formerly called PRDs are superseded by the 14 learner-approved educational Charters; original detailed drafts remain recoverable via Git history. Historical MediaForge Product/Technical Discovery archives remain educational artifacts **only**, not authority for a fresh implementation. The historical restart reset earlier implementation claims; since then, MediaForge has reached explicitly learner-approved planning through the Module 01 ticket plan. Implementation and application tests remain unverified. See [the current project registry](../handbook/projects/implementations/mediaforge.md). No approved curriculum chapters or learning assessments are reset.

For role details see `docs/module-driven-engineering.md`.