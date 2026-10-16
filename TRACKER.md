# Handbook Progress — Workflow V2

**Updated:** 2026-10-16
**Phase:** Educational Content Authoring — D05 curriculum discovery proposal in_review; D01–D04 approvals and D04 closure preserved.
**Canonical state:** [tracking/state.json](tracking/state.json)

## Domain status

- **D01:** 14 approved lessons and 4 approved educational Project Charters.
- **D02:** 16 approved lessons and 5 approved educational Project Charters.
- **D03:** 18 approved lessons and 5 approved educational Project Charters.
- **D04:** curriculum, all 18 lessons, six catalog concepts and six Educational Project Charters approved_by_learner on 2026-10-15; domain editorial coverage approved and educational authoring complete. 18/18 bounded educational labs passed on Node v24.22.0 / darwin arm64; expanded real TLS/HTTP/h2/WebSocket/SSE cases and corrected EOF/missing-evidence handling. OpenSSL CLI 3.6.3 is required for the TLS fixture.
- **D05:** 25-chapter [curriculum proposal](domains/05-api-engineering/curriculum.md), [depth matrix/profiles](domains/05-api-engineering/depth-specification.md), prerequisite/domain maps, coverage/gaps and open decisions in_review; Product Owner approval pending. Zero authored lessons, concepts or Charters; experiments not_run and learner assessment deferred. Commit/push requested; stop before lesson authoring. [Review evidence and guide](domains/05-api-engineering/evidence/review-guide.md).
- **D06–D16:** not_started.

**Implementations:** D03-P02 MediaForge has an approved external Module 01 specification and eight-ticket plan, but **no implementation or application-test completion is verified**. Other projects have no recorded implementation progress. No learner competency assessment is claimed.

**Active external project:** [MediaForge implementation registry](projects/implementations/mediaforge.md) — learner-reported approval gates through Module 01 ticket planning; implementation pending evidence.

## Active workflow

[Workflow V2](docs/workflow.md) · [Module ownership and gates](docs/module-driven-engineering.md) · [Coverage matrix](projects/coverage-matrix.md)

When starting any project, import its approved Charter into a separate Codex repository. Codex authors Product Discovery → approved Final PRD → approved Module Plan; then develops modules individually using technical discovery → spec → tickets → implementation → verification.

## D04 educational authoring closure

This section and its dated entries retain the 2026-10-15 closure context. The separate 2026-10-16 instruction now authorizes D05 curriculum discovery only; it does not reopen D04 or authorize D05 lesson authoring.

[Domain index](domains/04-network-protocol-engineering/README.md) · [Curriculum](domains/04-network-protocol-engineering/curriculum.md) · [Catalog / six Charters](domains/04-network-protocol-engineering/projects/catalog.md) · [Execution evidence](domains/04-network-protocol-engineering/evidence/educational-execution.md) · [Review guide](domains/04-network-protocol-engineering/evidence/review-guide.md)

Current totals: **66/66 lessons and 20/20 educational Charters editorially approved; zero in_review**. D04 direct challenges are approved educational directions; supporting knowledge does not mandate technology. The Product Owner explicitly approved the named educational artifacts and closure in this chat. [Approval record](domains/04-network-protocol-engineering/evidence/editorial-approval.md) preserves the baseline, verified blocking fixes, actual evidence and exclusions.

No D04 Final PRD, Module Plan, implementation or learner assessment is approved. D05 remains not_started and next in roadmap order; wait for a separate instruction before starting it or selecting a project. Optional hands-on recording checks remain pending in [the updated guide](domains/04-network-protocol-engineering/evidence/review-guide.md#closure-record-evaluation); this does not reopen the approved educational gate.

The dated review/fix entries below describe their historical pre-approval states.

**D04 deep review — 2026-10-15:** All 18 chapters expanded; five Charters clarified evidence semantics, P01 unchanged. Reviewed coverage; no mapping/scope change. [Chapter findings, execution and limitations](domains/04-network-protocol-engineering/evidence/educational-execution.md#chapter-by-chapter-technical-audit). Explicit learner editorial approval remains pending; do not close D04 or start D05.

**D04 blocking fixes — 2026-10-15:** Resolved only C14 required HTTP 426 headers and C18 unknown-versus-incomplete classification, with 2/2 focused labs (23 classifier cases) and 18/18 suite processes passed. [Exact evidence and limits](domains/04-network-protocol-engineering/evidence/blocking-fixes.md). Ready for Product Owner editorial approval; D04 remains in_review and user evaluation remains not_run. No Charter, mapping, earlier approval or MediaForge progress changed.

**D04 Product Owner editorial approval — 2026-10-15:** Explicit approval recorded for curriculum, D04-C01–C18, all six concepts and D04-P01–P06 educational Charters, domain editorial coverage and authoring completion. Verified clean baseline `612b777`, both blocking fixes, all retained hashes and fresh 18/18 lab execution. Tracking, index, catalog, statuses and coverage reconciled; no mapping or product-scope change. Editorial gate closed only; earlier approvals, MediaForge progress and all implementation/competency evidence boundaries preserved.

**D03 authorized editorial corrections — 2026-10-15:** After Product Owner acceptance of visual commit `09c12651b8087682d87d1bbc7b8201b914f3db5d`, clarified C11 transfer-list semantics and reconciled current-facing D03 status language with Workflow V2 and canonical tracking. **Coverage reviewed; no mapping, Charter scope or editorial approval change.** Historical evidence, examples, exercises and accepted visuals preserved. MediaForge implementation/tests remain unverified and learner competency unassessed; no D04/D05 work initiated. [Correction evidence and evaluation guide](docs/visual-d03/editorial-corrections.md).

## D05 curriculum discovery — 2026-10-16

Authorized curriculum design only, with commit/push and a stop before lessons. Proposed 25 chapters based on mechanism and assessment needs, including separate read-consistency, conditional-write, idempotency, long-running-operation, bulk and webhook models. Each profile contains all fifteen requested dimensions; a mechanism-level depth gate rejects topic-only coverage. The [proposal](domains/05-api-engineering/curriculum.md) includes dependency/domain maps, coverage/gaps, course conversion and seven open decisions.

**Tracking/coverage review:** 25 proposed D05 competencies, zero D05 taught/approved mappings and zero Charters; **66 approved lessons / 20 approved Charters unchanged**. D01–D04 domain objects and MediaForge registry preserved. Active D05 scaffolding, shared catalog template and canonical authoring sequence now use educational Charter terminology. D06–D16 legacy scaffold references are identified as deferred maintenance, not authorization to start those domains. [Actual review/preflight evidence](domains/05-api-engineering/evidence/review-guide.md).

**Next:** Product Owner reviews the named proposal and open decisions. Editorial approval and human review observations remain pending; stop after publishing the proposal, without Chapter 01 or technical implementation.
