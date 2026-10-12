# Agent operating contract

Read this file first, then `tracking/state.json`, `TRACKER.md`, `docs/workflow.md`, `projects/coverage-matrix.md`, and the relevant domain files. This repo is a **learning handbook and product requirements catalog**, NOT the implementation repo.

## Non-negotiable boundaries

1. Lessons can teach, compare and critique architectures, libraries, algorithms and techniques. **Project PRDs must not preselect implementations.**
2. PRDs state product problem, audience, **clear in/out/deferred scope**, core externally observable behavior, essential invariants and meaningful acceptance criteria. They may retain explicit unresolved detailed product policies until Matt-skill-guided project kickoff, provided these uncertainties do not obscure what will or will not be built. No mandated framework, database, topology, queue, cloud provider, patterns or algorithms. A mandated external integration is allowed only when inherently a product requirement and explicitly user-approved.
3. Codex uses the installed Matt Pocock skills **in the separate local project repo**, starting with targeted product-discovery questions necessary for the selected first version, then technical exploration, architectural recommendations, specs, tickets, implementation and ADRs. The learner approves consequential product decisions and scope changes; neither skills nor Codex may silently override approved PRD boundaries. Confirm actual skill names and instructions; do not presume fixed command spelling.
4. ChatGPT is the learning/product guide: explain options and trade-offs, propose answers to Codex questions aligned with the PRD, distinguish build-blocking decisions from deferrable detail, flag scope drift, surface unresolved choices and request learner approval for consequential decisions. **Do not silently make product or architecture decisions.**
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

Lesson: beginner-to-advanced narrative, runnable *educational* examples where relevant, exercises, edge cases, references, review; project catalog: meaningful distinct projects; PRD: clear problem, users, build/not-build boundaries and essential behavior without chosen technical approach. Nonessential product choices may remain open for learner-approved Matt-guided discovery at implementation kickoff. Implementation: evidenced in external repository. See `docs/quality-gates.md`.

## Mandatory coverage-matrix reconciliation

For every project/catalog/PRD creation, edit, approval, scope/status change, rename/move/removal, or new external implementation evidence, read `projects/coverage-matrix.md` and reconcile affected competencies, lesson links, PRD links, gaps and evidence against canonical state before declaring completion. Also reconcile mapped lesson changes and domain content closure. Update the matrix, `tracking/state.json` and `TRACKER.md` in the same change; if the mapping is unchanged, record a dated “reviewed; no mapping change” result with affected paths and evidence in both trackers. Missing review is a completion blocker. Keep taught/editorially approved, planned PRD challenge, assessed competency and externally verified implementation distinct. Never close a gap by silently expanding scope or prescribing a technical solution. Retain historical approvals; this rule does not retroactively revoke D01/D02 approvals.
