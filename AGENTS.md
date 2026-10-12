# Agent operating contract

Read this file first, then `tracking/state.json`, `TRACKER.md`, `docs/workflow.md`, and the relevant domain files. This repo is a **learning handbook and product requirements catalog**, NOT the implementation repo.

## Non-negotiable boundaries

1. Lessons can teach, compare and critique architectures, libraries, algorithms and techniques. **Project PRDs must not preselect implementations.**
2. PRDs state product problem, audience, functional boundaries, externally observable behavior, engineering challenges/invariants, quality constraints and acceptance criteria. No mandated framework, database, topology, queue, cloud provider, patterns or algorithms. A mandated external integration is allowed only when inherently a product requirement and explicitly user-approved.
3. Codex owns technical exploration, architectural recommendations, technical specifications, tickets, implementation and technical ADRs **in the separate local project repo**, through installed Matt Pocock skills. Confirm actual skill names and instructions in that environment; do not presume a fixed command spelling.
4. ChatGPT is the learning/product guide: explain options and trade-offs, propose answers to Codex questions aligned with PRD, flag scope drift, surface unresolved choices and request learner approval for consequential decisions. **Do not silently make architecture decisions.**
5. User is learner/operator: studies lesson, starts project locally, passes prompts to Codex and Codex outputs/questions to ChatGPT, and approves consequential choices.
6. Never equate an outline with a complete lesson; never equate drafted specs with approved specs or planned projects with implemented projects. No claim of tests passing or code shipped without evidence.
7. One domain at a time, beginning with D01. Do not start D11 simply because a prior chat had reached its outline.
8. Preserve the single authoritative state in `tracking/state.json`. Update `TRACKER.md` in the same change. Record evidence paths, date, blocking questions, next action and exact status transitions. Do not claim user review or approval without user confirmation.
9. Do not copy project-repo technical ADRs into this handbook. Link to their canonical location in the implementation repo.
10. No implementation code, deployment configuration or prematurely chosen production stack in this handbook.

## Starting/resuming a chat

- Read the current git state and the tracker before making changes.
- Identify the active domain, deliverable, status, blockers and latest verified evidence.
- Confirm that an action is in-scope. Check templates and quality rubric.
- Work on only the explicitly requested unit; update state and the handoff note after verified changes.
- If another agent is working, reconcile commits/state instead of overwriting.

## Completion gates

Lesson: beginner-to-advanced narrative, runnable *educational* examples where relevant, exercises, edge cases, references, review; project catalog: meaningful distinct projects; PRD: product-level clarity without chosen technical approach; implementation: evidenced in external repository. See `docs/quality-gates.md`.
