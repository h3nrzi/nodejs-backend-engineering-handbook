# State protocol

`handbook/tracking/state.json` is the source of truth. `TRACKER.md` is its human-readable projection. Git history is evidence of changes, not proof of educational approval.

- `phase`: repository_infrastructure | domain_authoring | project_guidance | paused.
- `review`: pending_learner_review | changes_requested | approved.
- `active_domain_id`: domain under active authorship; null means no domain started.
- `next_domain_id`: next in roadmap, not the latest discussed in chat.
- Domain fields: `status`, `lesson_status`, `project_specs_status`, `implementation_status`. Implementation refers to external project work.
- `current_implementation_project`: null for a reset/not-started project; otherwise a source-qualified object identifying the selected external repository, Charter, owner-reported approval gates and independently verified evidence where available. Include `source`, distinguish `not_verified` from `not_started`, and never infer implementation or passing tests from approvals.
- `history`: dated important events with evidence paths/commit references.

Update state and tracker together as a single logical change (prefer one commit where supported). Check per-domain Charter counts individually; they are **D01=4, D02=5, D03=5, D04=6** (20 approved in total). Legacy `prd_count` / `*_prd_count` fields retain the 14 migrated D01–D03 document counts; use `*_charter_count` for the complete D01–D04 inventory, not Final PRD approval. Review git diff, ensure JSON parses, cross-check domain IDs/count/status and document blockers. External agent decisions should be documented in the external implementation repo and only linked here.
