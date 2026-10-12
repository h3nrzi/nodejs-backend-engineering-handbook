# Quality gates and status definitions

## Status vocabulary

`not_started` → `in_progress` → `drafted` → `in_review` → `approved`. `blocked` may apply with a documented blocker. Never mark `approved` without explicit learner approval. Implementation uses `not_started`, `in_progress`, `ready_for_human_review`, `verified`, or `blocked`; verify with external evidence.

## Lessons — substantive zero-to-advanced curriculum

- Clear prerequisites and progressive teaching from first principles to advanced practice.
- Each concept defined; mechanism, mental model, practical application, caveats, comparison and examples.
- TypeScript/Node.js examples when appropriate; version-dependent assertions cited and checked.
- Failure modes, misconceptions, security/performance trade-offs, real-life scenarios.
- Exercises with expected outcomes, self-assessment, references, coverage against learning objectives.
- Distinguish sample/demo code from production-ready methods.
- No arbitrary claim of 100% completeness: audit concept checklist and document gaps.

## Project catalog / PRD

- Distinct real problem, audience, value, clear in/out scope and user journeys.
- Functional requirements, observable nonfunctional requirements, measurable invariants, failure/recovery behavior, acceptance cases.
- PRD must avoid prescribing architecture, data stores, infrastructure, libraries, algorithms, queues, locks, topology, deployment or directory layout.
- Engineering challenges may be named without specifying mechanisms. No technical solution hidden as a nonfunctional requirement.
- Review ambiguous/untestable criteria and scope creep before approval.

## Tracking

- Status supported by file/commit/test/report link where applicable; no fabricating progress.
- Machine state and human tracker updated together and consistent.
- Explicit next action, blockers, decisions and review gate.
