# Handbook Progress — Workflow V2

**Updated:** 2026-10-15
**Phase:** D01–D03 educational content approved; D04 deep technical review/expansion complete, still in_review.
**Canonical state:** [tracking/state.json](tracking/state.json)

## Domain status

- **D01:** 14 approved lessons and 4 approved educational Project Charters.
- **D02:** 16 approved lessons and 5 approved educational Project Charters.
- **D03:** 18 approved lessons and 5 approved educational Project Charters.
- **D04:** curriculum, 18 lessons, catalog and six proposed educational Charters in_review; zero new editorial approvals. 18/18 bounded educational labs passed on Node v24.22.0 / darwin arm64; expanded real TLS/HTTP/h2/WebSocket/SSE cases and corrected EOF/missing-evidence handling. OpenSSL CLI 3.6.3 is required for the TLS fixture.
- **D05–D16:** not started.

**Implementations:** D03-P02 MediaForge has an approved external Module 01 specification and eight-ticket plan, but **no implementation or application-test completion is verified**. Other projects have no recorded implementation progress. No learner competency assessment is claimed.

**Active external project:** [MediaForge implementation registry](projects/implementations/mediaforge.md) — learner-reported approval gates through Module 01 ticket planning; implementation pending evidence.

## Active workflow

[Workflow V2](docs/workflow.md) · [Module ownership and gates](docs/module-driven-engineering.md) · [Coverage matrix](projects/coverage-matrix.md)

When starting any project, import its approved Charter into a separate Codex repository. Codex authors Product Discovery → approved Final PRD → approved Module Plan; then develops modules individually using technical discovery → spec → tickets → implementation → verification.

## D04 educational review gate

[Domain index](domains/04-network-protocol-engineering/README.md) · [Curriculum](domains/04-network-protocol-engineering/curriculum.md) · [Catalog / six Charters](domains/04-network-protocol-engineering/projects/catalog.md) · [Execution evidence](domains/04-network-protocol-engineering/evidence/educational-execution.md) · [Review guide](domains/04-network-protocol-engineering/evidence/review-guide.md)

Current totals: **66 authored lessons (48 approved, 18 in_review); 20 educational Charters (14 approved, six in_review)**. Direct/supporting D04 coverage is proposed only. No D04 Final PRD, Module Plan, implementation or learner assessment exists. The next action is explicit learner editorial review; D05 is next in roadmap order but must not begin in this session. Educational review scenarios remain `not_run` by the learner.

**D04 deep review — 2026-10-15:** All 18 chapters expanded; five Charters clarified evidence semantics, P01 unchanged. Reviewed coverage; no mapping/scope change. [Chapter findings, execution and limitations](domains/04-network-protocol-engineering/evidence/educational-execution.md#chapter-by-chapter-technical-audit). Explicit learner editorial approval remains pending; do not close D04 or start D05.

**D04 blocking fixes — 2026-10-15:** Resolved only C14 required HTTP 426 headers and C18 unknown-versus-incomplete classification, with 2/2 focused labs (23 classifier cases) and 18/18 suite processes passed. [Exact evidence and limits](domains/04-network-protocol-engineering/evidence/blocking-fixes.md). Ready for Product Owner editorial approval; D04 remains in_review and user evaluation remains not_run. No Charter, mapping, earlier approval or MediaForge progress changed.
