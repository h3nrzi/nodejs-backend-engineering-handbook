# Quality gates and status definitions — Workflow V2

## Approval vocabulary

Use `not_started`, `in_progress`, `drafted`, `in_review`, `approved_by_learner`, and `blocked` with evidence. **Approval always attaches to a named artifact and gate**; a learner-approved Charter does not imply an approved Final PRD, implementation or demonstrated mastery.

## Lessons

- Progress from first principles to advanced domain-specific reasoning, with prerequisites, accurate mechanism explanation, trade-offs and pitfalls.
- Include real Node.js/TypeScript exercises, failure cases, self-assessment and version-aware references where appropriate.
- Track content editorial approval separately from actual student practice, test execution and proven competency.

## Project Charter (Handbook only)

- Identify a distinct authentic problem, intended users and plausible value, with initial in/out/deferred directions and non-goals.
- Explain **why the project exercises this domain**: observable engineering challenges, domain learning outcomes, evidence of learning, and relevant lesson links.
- State project boundaries without freezing every policy; never prescribe libraries, data stores, queues, deployment, operating system controls or code architecture.
- Charter may suggest meaningful failure cases or invariants as **challenges**, not as a finalized V1 implementation contract.
- Confirm learner editorial approval; mark Final PRD and implementation explicitly not started.

## Codex Product Discovery and Final PRD (separate implementation repository)

- Codex records actual product questions, recommendations, alternatives, explicit learner decisions and traceable approved policies.
- Final PRD must consolidate all approved V1 scope, rules, actors, acceptance cases and invariants with no contradictory or unexplained gaps.
- Learner expressly approves consolidated Final PRD; Codex cannot self-approve.

## Codex Module Plan

- Generated only from owner-approved Final PRD; maps all requirements to cohesive delivery modules with traceable acceptance, dependencies and shared contract boundaries.
- Modules are vertical delivery units, not mandated microservices or framework modules.
- The learner approves order, boundaries and ownership before first module technical grilling.

## Module cycle

- Only current module’s implementation-blocking decisions are interrogated; inspect prior cross-cutting decisions and record adoption/qualification honestly.
- Consequential choices require learner approval and qualifying ADRs.
- Use `to-spec` → `to-tickets` → `implement` and acceptance evidence per module, then proceed to next.
- Never claim tests, proof of host behavior, commercial provider access, production readiness or implemented functionality from approval text alone.

## Tracking integrity

Maintain `tracking/state.json`, `TRACKER.md`, domain indexes, catalogs and competency matrix in agreement. Deleted legacy files must have no active references. Historical interview archives may remain explicitly superseded, but are not current authority.
## Competency assessment boundary

Follow [learning evidence rules](learning-evidence.md). Content editorial approval, external implementation evidence, and the learner's demonstrated competence are separate statuses. Assessments remain deferred until the learner begins that phase.
