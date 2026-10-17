# D04 — Product Owner editorial approval and authoring closure

**Recorded:** 2026-10-15. **Authority:** the Product Owner’s explicit instruction in this chat, “Handbook — D04 Editorial Approval & Tracking Closure.” **Editorial status:** approved_by_learner. **Educational authoring gate:** closed / content_complete.

## Named approval and exclusions

The Product Owner explicitly approved D04 — Network & Protocol Engineering after authoring, expansion, independent editorial review and resolution of the two blocking findings. Approval covers the [curriculum](../curriculum.md), **all 18 lessons D04-C01–D04-C18**, the [six project concepts and their Educational Project Charters D04-P01–D04-P06](../projects/catalog.md), domain-level editorial coverage and educational authoring completion.

This records the Product Owner’s decision; it is not an approval inferred from passing checks or Git history. No project implementation, Final PRD, Module Plan or learner competency is approved. D04 Product Discovery, Final PRDs, Module Plans and implementations remain not_started; learner competency remains not_assessed. Bounded educational labs are not project application tests, conformance certification or provider qualification.

## Verified baseline and technical evidence

The working tree was clean at `612b777` (`docs: fix D04 completion evidence and HTTP 426 response`) before closure edits. That revision follows `86d2ef1` (deep expansion) and `713e05b` (initial D04 authoring).

| Blocking finding | Verification at the current baseline |
|---|---|
| Chapter 18 unknown completion conflated with incomplete | Explicit `complete === false` and `complete === true` distinguish incomplete/complete; absent and non-Boolean completion remains unknown even with status 200 or an observed action. Explanation, exercise and rubric agree. All 23 finite cases passed in the fresh suite. |
| Chapter 14 HTTP 426 required headers | Ordinary HTTP refusal sends `Upgrade: websocket`, `Connection: Upgrade, close` and zero Content-Length. Actual loopback assertions check status, both headers, empty complete body and no protocol ownership transfer; separate valid opening uses 101. Fresh suite passed. |

Before recording approval, verified all **18 complete lesson-file hashes**, **18 extracted JavaScript block hashes**, the runner hash, full-suite output hash and focused-output hash against [the retained manifest](lab-manifest.json). The [blocking-fix report](blocking-fixes.md) retains 2/2 focused passes and the full 18/18 run with exact commands and limitations. Both findings are resolved; no lesson correction was needed in this closure.

Fresh preflight in this session: `node scripts/check-d04.mjs` exited 0 with **18/18 educational labs passed**, including the C14 checks and 23 C18 cases. Runtime: Node v24.22.0, darwin arm64; OpenSSL CLI 3.6.3; Python 3.14.7. Historical runtime details and practical gaps remain in [execution evidence](educational-execution.md).

Closure changes lesson approval metadata and coverage links only. Full lesson-file hashes in the retained manifest identify the **pre-approval revision**, not these edited Markdown files. The extracted executable blocks and runner remain byte-identical. [Closure verification](closure-verification.json) checks the historical file hashes against `612b777`, current executable hashes, unaffected domain/project records, all counts/statuses and links. Prior technical reports and JSON outputs remain historical evidence; they are not silently reissued as new test runs.

## Reconciliation and next state

The canonical [state](../../../tracking/state.json), [tracker](../../../../TRACKER.md), domain index, curriculum, catalog, all 18 lesson headers, all six Charter headers, [coverage matrix](../../../projects/coverage-matrix.md#d04--approved-editorial-coverage), root navigation and roadmap agree:

- D04 curriculum, lessons, catalog concepts and educational Charters: approved_by_learner; domain content_complete; authoring completion dated 2026-10-15.
- D01–D04: **66/66 lessons and 20/20 educational Charters editorially approved**, zero in_review. Per-domain Charter counts: 4, 5, 5, 6.
- Coverage reviewed: no competency identifiers, direct/supporting assignments, audience, scope or technical requirements changed. Direct educational challenges are approved; supporting relevance still mandates no mechanism.
- D01–D03 domain records/files and MediaForge’s external planning/implementation evidence remain unchanged. D05–D16 remain not_started; D05 stays next in roadmap order. No new authoring, project selection or implementation begins here.

The active domain remains D04 to identify the completed milestone; top-level review is approved. A separate instruction can start the next authoring or project-selection task. No new product-policy, architecture, Final PRD or Module Plan was created.

## Handoff and evaluation boundary

The explicit editorial decision is recorded as approved. Individual manual scenario observations and learner practice are not supplied by that decision. The [updated review guide](review-guide.md#closure-record-evaluation) preserves those unrun results and provides optional closure-record checks with actual agent preflight. Human evaluation of the recording changes remains pending; it does not reopen or condition the Product Owner’s editorial approval.
