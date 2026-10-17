# Handbook Progress — Workflow V2

**Updated:** 2026-10-17
**Phase:** Educational Content Authoring — D05 curriculum/depth gate approved; C01 editorially approved; C02 complete draft in_review; D01–D04 approvals and D04 closure preserved.
**Canonical state:** [tracking/state.json](tracking/state.json)

## Domain status

- **D01:** 14 approved lessons and 4 approved educational Project Charters.
- **D02:** 16 approved lessons and 5 approved educational Project Charters.
- **D03:** 18 approved lessons and 5 approved educational Project Charters.
- **D04:** curriculum, all 18 lessons, six catalog concepts and six Educational Project Charters approved_by_learner on 2026-10-15; domain editorial coverage approved and educational authoring complete. 18/18 bounded educational labs passed on Node v24.22.0 / darwin arm64; expanded real TLS/HTTP/h2/WebSocket/SSE cases and corrected EOF/missing-evidence handling. OpenSSL CLI 3.6.3 is required for the TLS fixture.
- **D05:** [25-chapter curriculum](domains/05-api-engineering/curriculum.md), [depth contract](domains/05-api-engineering/depth-specification.md) and CD01–CD07 remain approved. [C01](domains/05-api-engineering/lessons/01-apis-as-contracts-and-rest.md) explicitly editorially approved_by_learner on 2026-10-16; [approval and preserved-snapshot reconciliation](domains/05-api-engineering/evidence/c01/editorial-approval.md). [C02 complete draft](domains/05-api-engineering/lessons/02-resources-operations-and-workflow-modeling.md) in_review; C03–C25 not_started; zero D05 Charters. [18-mechanism ledger](domains/05-api-engineering/evidence/c02/depth-ledger.md) · [Validation](domains/05-api-engineering/evidence/c02/validation.md) · [Current guide](domains/05-api-engineering/evidence/c02/review-guide.md). Stop before C03 pending explicit Product Owner approval and authorization; no implementation or learner competence inferred.
- **D06–D16:** not_started.

**Implementations:** D03-P02 MediaForge has an approved external Module 01 specification and eight-ticket plan, but **no implementation or application-test completion is verified**. Other projects have no recorded implementation progress. No learner competency assessment is claimed.

**Active external project:** [MediaForge implementation registry](projects/implementations/mediaforge.md) — learner-reported approval gates through Module 01 ticket planning; implementation pending evidence.

## Active workflow

[Workflow V2](docs/workflow.md) · [Module ownership and gates](docs/module-driven-engineering.md) · [Coverage matrix](projects/coverage-matrix.md)

When starting any project, import its approved Charter into a separate Codex repository. Codex authors Product Discovery → approved Final PRD → approved Module Plan; then develops modules individually using technical discovery → spec → tickets → implementation → verification.

## D04 educational authoring closure

This section and its dated entries retain the 2026-10-15 closure context. D05 discovery and the subsequent curriculum-approval/C01 authorization are recorded separately below; neither reopens D04.

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


## D05 curriculum approval and C01 authoring — 2026-10-16

This later explicit Product Owner instruction supersedes the discovery-only stop above. Reconciled all seven IDs with their original definitions; CD01–CD07, the 25-chapter sequence and controlling depth contract are approved for educational authoring only. [Approval record](domains/05-api-engineering/evidence/curriculum-approval.md) preserves authority, baseline and exclusions.

C01 is a complete standalone draft **in_review**, including all REST constraints and four separate uniform-interface mechanisms, contract audiences/ownership, normal/adverse histories, independent exercises/rubrics and source qualifications. Two bounded Node ESM pure-model fixtures passed; two Mermaid sources have rendered SVGs and visual review. Actual command/source/output evidence and review limits are retained with the chapter. Human chapter evaluation remains **not_run**; no lesson editorial approval inferred.

**Tracking/coverage review:** 67 authored chapters = 66 approved D01–D04 + one D05-C01 in_review; 24 unstarted D05 chapters. All 20 approved Charters retain mappings/scopes/statuses; zero D05 Charters and no D05 direct/supporting project mapping. D01–D04 canonical domain objects and MediaForge record preserved. No portfolio architecture, Product/Technical Discovery, Final PRD, Module Plan, implementation or competence claim.

**Next:** begin [C01 review scenario C01-R01](domains/05-api-engineering/evidence/c01/review-guide.md#c01-r01--approval-reconciliation-and-stop-boundary). Keep C01 in_review; stop before C02 and wait for explicit Product Owner approval and authorization.

## D05 C01 approval and C02 authoring — 2026-10-17

The Product Owner's 2026-10-16 instruction explicitly approves C01 educational content and separately authorizes C02. Verified clean `main` and `origin/main` baseline `dfe397acbaed6326190dbda1e12b76c54854c6ed`. [C01 approval](domains/05-api-engineering/evidence/c01/editorial-approval.md) supersedes its submitted pending labels; lesson and original evidence bytes remain preserved. Earlier dated entries above remain historical snapshots.

C02 is a complete standalone draft **in_review**, with eighteen reasoned mechanism rows, two reservation models under identical requirements, inventory/file transfer exercises, legal/illegal transitions, authority, lifecycle, partial effect/observation and evolution reasoning. Two bounded Node ESM pure-model fixtures passed, including 720 state/event/actor/time/payment combinations; three Mermaid source/SVG pairs have rendering/inspection evidence. These runs are neither external implementation nor human acceptance.

**Current tracking/coverage:** 68 authored chapters = 67 approved (66 D01–D04 + C01) + C02 in_review; 23 unstarted D05 chapters. All 20 earlier approved Charters retain scopes, mappings and statuses; zero D05 Charters. Curriculum/depth-profile definitions, all earlier approvals, D04 closure and MediaForge's qualified planning record are preserved. No project discovery, architecture, Final PRD, Module Plan, implementation, production readiness or learner competency is claimed.

**Next:** begin [C02-R01](domains/05-api-engineering/evidence/c02/review-guide.md#c02-r01--compare-the-same-journey-through-two-models). C02 human evaluation remains **not_run** and editorial approval pending. Stop after this chapter; wait for explicit Product Owner approval and authorization before C03.
