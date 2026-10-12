# State protocol

`tracking/state.json` is the source of truth. `TRACKER.md` is its human-readable projection. Git history is evidence of changes, not proof of educational approval.

- `phase`: repository_infrastructure | domain_authoring | project_guidance | paused.
- `review`: pending_learner_review | changes_requested | approved.
- `active_domain_id`: domain under active authorship; null means no domain started.
- `next_domain_id`: next in roadmap, not the latest discussed in chat.
- Domain fields: `status`, `lesson_status`, `project_specs_status`, `implementation_status`. Implementation refers to external project work.
- `current_implementation_project`: null or object with slug, repo_url, PRD path, skill/session stage, external evidence; do not invent it.
- `history`: dated important events with evidence paths/commit references.

Update state and tracker in the same commit. Review git diff, ensure JSON parses, cross-check domain IDs/count/status and document blockers. External agent decisions should be documented in the external implementation repo and only linked here.
