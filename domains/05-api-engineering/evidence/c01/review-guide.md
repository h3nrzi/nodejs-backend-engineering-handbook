# D05 curriculum approval and C01 — Hands-on editorial evaluation

**Source:** Product Owner's “D05 Curriculum Approval and Chapter 01 Authoring” instruction, 2026-10-16.

**Build:** clean baseline `6e7048b0c89e7fc4ad3700711edbfe583760c784` plus the changes in the commit containing this guide. After publication, `git log -1 --format='%H %s'` identifies the delivery revision. Actual fixture source hashes are in [execution.json](execution.json).

**Prepared:** 2026-10-16. **C01 editorial status:** `in_review`. **Human chapter evaluation:** `not_run`.

## What you will evaluate

Evaluate a complete textbook chapter against the approved C01 profile and mechanism depth gate. Also inspect accurate recording of the seven already-approved curriculum decisions. Curriculum approval is established by your explicit instruction; the chapter's editorial acceptance and your own learning observations remain separate and pending.

This guide applies the global `ticket-walkthrough` skill to document authoring. The real supported boundary is reading the chapter, following its citations and diagrams, predicting model outcomes and running its bounded examples. It does not launch a pretend portfolio service or treat test commands as the entire human evaluation.

## Start here

Work in `/Users/hossein/Projects/nodejs-backend-engineering-handbook`. Reading requires only a Markdown viewer/browser. Optional examples need Node; preflight used v24.22.0 / darwin arm64 / ESM. No credentials, services, packages, user data or port allocation are required.

First open [C01 §9 — Hypermedia](../../lessons/01-apis-as-contracts-and-rest.md#9-uniform-interface-fourth-constraint-hypermedia-drives-application-state). Before running code, predict which target each consumer selects after release B and what a stale control proves. This is scenario C01-R04; all other scenarios can be completed independently in the order below.

Ready when: the chapter shows `in_review`, names the four uniform-interface constraints separately, and the linked [ledger](depth-ledger.md) contains 16 reviewed mechanism rows. Agent preflight: both pure-model fixtures passed; actual outputs, source/link checks and render review are retained in [validation](validation.md). Those observations do not establish your acceptance.

## Feature-to-scenario coverage

| Request / criterion | Scenario | Evidence boundary |
|---|---|---|
| CD01–CD07 reconciled/recorded without changing definitions; curriculum-only approval | C01-R01 | Original rows/baseline and explicit approval record |
| Standalone chapter, observable promises, audience/ownership, resource/RPC comparison | C01-R02 | Reading and independent reasoning; no product architecture |
| Every REST constraint and four uniform-interface subconstraints; causal property/failure/trade-offs | C01-R03 | 16-row author ledger, subject to your review |
| Required changed-transition experiment; normal/adverse behavior and limits | C01-R04 | Pure model with selected action; no HTTP integration |
| Malformed input, retry/uncertainty and concurrency reasoning; bounded examples | C01-R05 | Four correctness categories; single-process models |
| Editable/rendered diagrams, sources, appropriate version qualification | C01-R06 | Exact source/render and scoped availability/claim checks |
| Canonical state/index/coverage, preserve D01–D04 and external project evidence | C01-R07 | Structural and Git preservation checks |
| Commit/push and stop before C02; no lesson/Charter/competency approval inferred | C01-R01, C01-R07 | Git publication separate from approval; future work stopped |

## Scenarios

### C01-R01 — Approval reconciliation and stop boundary

Actor: Product Owner. Prerequisites: none. Open [the reconciliation record](../curriculum-approval.md), then [the unchanged decision definitions](../../curriculum.md#open-curriculum-decisions). Compare each ID against your seven approval bullets, especially CD04's tool-qualification exception and CD05's artifact/file-processing equivalence.

Expected: seven matching approvals, no redefined decision; curriculum/depth gate approved, C01 `in_review`, C02–C25 `not_started`. Refusal/no-effect check: no D05 lesson or Charter approval, implementation, Final PRD, Module Plan or competence is inferred. Retain any mismatch by ID. State after: no files or data change. Your evaluation: `not_run`.

### C01-R02 — Contract meaning and independent consumers

Actor: reader. Prerequisites: none. Read chapter §§1–2 and answer E1/E2 on paper before inspecting their rubrics. For §1's 1 KiB/512-byte example, name the consumer-visible contradiction and its accountable owner. Compare the same cancellation outcome through resource and operation interfaces.

Expected: a contract includes input/output/state/time/authority/error and observation promises; an internal caller can still be independently deployed; useful interface choices depend on workload and coordination. Refusal/no-effect check: no framework/storage/architecture is mandated. Keep your own reasoning and any unclear prerequisite; no learner grade is assigned. State after: independent notes only. Your evaluation: `not_run`.

### C01-R03 — Mechanism depth rather than topic presence

Actor: editorial reviewer. Prerequisites: chapter outcomes. Open [the full C01 profile](../../depth-specification.md#d05-c01--apis-as-contracts-and-rest-as-an-architectural-style), then [the ledger](depth-ledger.md). For M01–M16, follow the cited section and locate definitions/assumptions, ordered cause, concrete normal/adverse trace, comparison, backend application, independent exercise/rubric and sources.

Expected: all required rows reach `reasoned`; §§6–9 independently develop identification, manipulation, self-description and hypermedia. Inspect E4/E5/E9/E11 for limits on statelessness, cacheability, discovery and optional downloaded code. Refusal/no-effect check: named SOAP/OData/federation signposts are not claimed deep coverage, and a pure fixture is not REST certification. Keep any missing cell or weak causal step by mechanism ID. State after: no shared state. Your evaluation: `not_run`.

### C01-R04 — Follow controls versus construct a retired target

Actor: reader/optional Node user. Prerequisites: none; disposable cases reset on each invocation.

1. Read chapter §9's teaching vocabulary and T17/T18. Predict release B's selected targets and whether preserving fields protects the convention-dependent client.
2. In a terminal at the repository root, run:

   ```sh
   node domains/05-api-engineering/examples/c01/contract-traces.mjs
   ```

3. Compare the six output lines with your prediction. Explain what would change if the old template had been published as a guarantee, if the relation's meaning changed, or if another actor cancelled before submission.

Expected: A succeeds for both; B's guided target is `/cancellation-requests/R41` and succeeds; B's constructed `/reservations/R41/cancellation` is retired. No action is selected when absent; stale controls are refused; unsupported method is refused locally. Refusal/no-effect check: no HTTP requests, credential forwarding or persistent effects occur. Keep output and your prediction, not secrets. State after: process exited; next run starts fresh. Your evaluation: `not_run`.

### C01-R05 — Refusal, repeated intent and competing observations

Actor: reader/optional Node user. Prerequisites: none. Read §§12–14 and predict the four correctness categories before running:

```sh
node domains/05-api-engineering/examples/c01/correctness-boundaries.mjs
```

Expected: malformed/invalid input has zero effects; unqualified retry creates two model effects versus one under its stated replay agreement; split checks allow stale overwrite while the atomic condition refuses the second; per-object versions can both pass and violate common capacity. Then independently answer E12–E14 and the integrated §17 case. Refusal/no-effect check: a syntax/shape refusal does not mutate the model; mismatched reuse of I9 is refused; no durable, real concurrent or HTTP server behavior is claimed. The retry fixture deliberately omits seat uniqueness. Keep output and explanations of the missing authoritative evidence. State after: process exited, memory discarded; no cleanup. Your evaluation: `not_run`.

### C01-R06 — Diagrams, references and evidence limits

Actor: reader/editor. Prerequisites: none. Open both chapter SVGs at reading width and follow their adjacent editable `.mmd` links. Read captions and text equivalents. Verify that V01 separates request context, resource/policy state and hidden conversation; V02 shows independently reset cases and a current eligibility check.

Follow source links for Fielding's constraints, RFC 9110 §13, RFC 9111 §5 and RFC 8288 §2 from the chapter. Compare [the source-claim review](validation.md#source-claim-review) with the chapter's claims. Expected: architectural, modern HTTP, local policy and observed pure-model facts are distinguished; OpenAPI 3.2.1/JSON Schema 2020-12 are reference lines, with no executed-tool support claim. Refusal/no-effect check: visible action objects are explicitly invented; code-on-demand is optional; render success proves no semantic conformance. Retain clipping/ambiguity or inaccurate source claims by section. State after: no service state. Your evaluation: `not_run`.

### C01-R07 — Counts, preservation and publication

Actor: Product Owner/reviewer. Prerequisites: none. Open [canonical state](../../../../tracking/state.json), [TRACKER](../../../../TRACKER.md), [D05 index](../../README.md) and [coverage](../../../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage). Optionally run:

```sh
git log -1 --format='%H %s'
python3 -m json.tool tracking/state.json > /dev/null
python3 scripts/check-handbook-links.py
git diff --check
git diff 6e7048b0c89e7fc4ad3700711edbfe583760c784 -- domains/01-computer-science-foundations domains/02-javascript-typescript domains/03-nodejs-internals domains/04-network-protocol-engineering projects/implementations
git status --short
git ls-remote origin refs/heads/main
```

Expected: 67 authored = 66 approved + C01 in_review; 24 D05 lessons not_started; seven curriculum approvals; 20 approved existing Charters and zero D05 Charters; empty protected-path diff. After publication the working tree is clean and remote main matches the delivery commit. Refusal/no-effect check: history and historical discovery preflight are retained; no MediaForge implementation/test/competency upgrade. Retain any inconsistent status/count or publication discrepancy. State after: read-only checks. Your evaluation: `not_run`.

## Results and checkpoint

| Scenario | Agent preflight | User result | Evidence / boundary |
|---|---|---|---|
| C01-R01 | Seven definitions reconciled; explicit curriculum authority recorded | not_run | [Approval](../curriculum-approval.md); chapter remains in_review |
| C01-R02 | Author reviewed contract dimensions, progression and audience cases | not_run | Chapter §§1–2, E1/E2; learner reasoning not assessed |
| C01-R03 | Profile audited against 16 reasoned rows | not_run | [Ledger](depth-ledger.md); author judgment, no independent external review |
| C01-R04 | Fixture exited 0 with six expected output lines | not_run | [Execution](execution.json); pure model only |
| C01-R05 | Fixture exited 0 with four expected categories | not_run | [Execution](execution.json); no real concurrent/durable implementation |
| C01-R06 | Sources/links and exact rendered outputs reviewed | not_run | [Validation](validation.md); bounded availability and claim checks |
| C01-R07 | Canonical and protected-state preservation checked | not_run | [Structural evidence](preflight.json); Git identifies publication |

**Current scenario:** C01-R04; human evaluation has not started.

**Artifacts:** chapter, two model scripts, two `.mmd`/SVG pairs, approval/ledger/validation/evidence in D05; no running process, credentials or persistent evaluation data.

**Known limits:** no actual HTTP/schema/provider/database/true concurrent execution, no complete REST certification, no learner assessment; chapter editorial acceptance pending.

**Next safe action:** open [chapter §9](../../lessons/01-apis-as-contracts-and-rest.md#9-uniform-interface-fourth-constraint-hypermedia-drives-application-state), predict release B's two targets, then optionally run C01-R04 and report your observation by scenario ID.

Stop reading at any point. Scripts exit on their own and need no cleanup; rerun either command to get a fresh in-memory fixture. Resume from this guide and your last scenario notes. Do not edit canonical statuses merely to record a tentative finding. Chapter approval requires your explicit decision; the agent stops before C02 while waiting. Preparing this guide completes the handoff workflow and introduces no human-approval gate for committing/pushing the authorized draft.
