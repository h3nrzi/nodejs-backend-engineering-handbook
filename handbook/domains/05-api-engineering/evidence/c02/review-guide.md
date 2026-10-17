# D05-C02 — Reproducible editorial evaluation

**Source:** Product Owner's “D05-C02 Authoring” instruction, received 2026-10-16; prepared 2026-10-17 local time. **Scope:** record C01 editorial approval; author/review/publish C02 only. **C02 status:** in_review. **Human evaluation:** not_run.

**Revision:** clean starting `main`/`origin/main` `dfe397acbaed6326190dbda1e12b76c54854c6ed` plus the changes in the commit containing this guide. `git log -1 --format='%H %s'` identifies publication; [execution](execution.json)/[preflight](preflight.json) retain exact reviewed source hashes. No claim that earlier baseline checks ran against the final commit.

This applies the global `ticket-walkthrough` skill to Handbook authoring. The actual supported boundary is reading, predicting outcomes, following diagrams/citations and optionally running bounded examples. There is no portfolio service or fake endpoint. Preparing this guide introduces no extra approval gate for the authorized commit/push; chapter editorial acceptance remains the Product Owner's separate decision.

## Starting point and first action

Open a Markdown preview from `/Users/hossein/Projects/nodejs-backend-engineering-handbook`. Reading needs no setup. Optional examples require Node; preflight used v24.22.0 / darwin arm64 / ESM. No dependencies, credentials, ports, accounts, network calls or private data are needed by either example.

First open [C02 §17](../../lessons/02-resources-operations-and-workflow-modeling.md#17-compare-two-complete-models-for-the-same-reservation-journey). Before running code, write the identity Alice retains before/after confirmation in each model. Predict the allocation count if H8 becomes converted but B6 does not exist. Expected: A keeps R41; B follows H8→B6; the split conversion leaves zero active allocations in that constructed history and violates the acknowledged confirmation promise. Continue with C02-R01 below.

Readiness: C02 displays in_review, both models use the same §1 requirements, the ledger contains eighteen reasoned rows, and the two commands below terminate with the retained output categories. Agent preflight outcomes are supporting evidence, not human acceptance.

## Criterion-to-scenario coverage

| Requested criterion | Scenario | Observable coverage / qualification |
|---|---|---|
| Clean baseline, explicit C01 editorial approval, preserve submitted text and earlier approvals | R07 | Approval record plus protected-file/canonical comparison |
| Workflow derivation, domain/resource/representation/entity, identity, collections/singleton, relationships | R02 | §§1–6, N/A1–6, E1–6; inventory/file transfer |
| Resource operations versus commands, non-CRUD actions and required generic-status failure | R03 | §§7–10, refund counterexample and guarded transition table |
| All profile mechanisms meet eight depth dimensions; compare alternatives | R02–R06 | Ledger M01–M18 and independent E1–E18/rubrics; R06 integrated exercise |
| Ownership/authority, nested boundaries, reparenting, deletion/tombstone/cascade/restoration | R04 | §§3/5/11/12/16; stale actor and non-resurrection examples |
| Consumer versus worker state, sync/long-running, partial/aggregate outcomes and uncertainty | R05 | §§13–15; identical observer timeout for distinct histories |
| At least two coherent reservation models, coupling, lifecycle/failure and evolution | R01, R06 | §§17–18; same requirements, conversion and compatibility counterexamples |
| Runnable examples, exact observations and limitations | R01, R03–R05 | Two pure-model commands, 720 combinations and deterministic traces; no HTTP/durable integration |
| Editable diagrams/render inspection, accessibility and authoritative sources | R08 | Three source/SVG pairs, captions/text equivalents, section-specific primary citations |
| Links/navigation, JSON, canonical counts, scope and Git publication | R07 | Reproducible checks, exact manifest, remote/main parity |
| Keep C02 in_review; no C03, Charters or project artifacts/competence claims | R06–R07 | Scope checks; human approval/evaluation remain pending |

## Scenarios

### C02-R01 — Compare the same journey through two models

Actor: reader/editor. Prerequisites: chapter §1 requirements; no mutable setup. Read §17 after writing your prediction above. Trace acquire at 100, confirm at 200, cancel at 300 and settlement at 350 through both models. For each acknowledgment record subject identity, live allocation and unresolved obligation. Then run in a terminal from the repository root:

```sh
node handbook/domains/05-api-engineering/examples/c02/boundaries-and-observations.mjs
```

Expected: the first line reports coherent H8→B6 conversion keeps one allocation; split conversion can lose it. Remaining lines concern independent reset cases and should match [retained stdout](boundaries-and-observations.stdout.txt). Refusal/no-effect check: conversion at expiry, conversion by former/wrong owner and converting an already converted hold are refused in the fixture. Read §17 A17 to explain why creating two independent claims is a different failure. Retain your identity timeline, predicted allocation count and any unclear semantics. After: process exits, state discarded. User result: not_run.

### C02-R02 — Audit the foundational modeling mechanisms

Actor: editorial reviewer. Prerequisites: none. Open [the full profile](../../depth-specification.md#d05-c02--resources-operations-and-workflow-modeling), [the ledger](depth-ledger.md) and chapter §§1–6. For M01–M06 locate all eight evidence dimensions, then answer E3/E5/E6 before reading their rubrics. Follow R41's rename, view departure and seat reference; compare with F8 reparenting and supplier relocation.

Expected: identity is scoped and preserved independently from labels/ownership/views, representations differ from resources/storage, singletons can select current policy, and embedded facts have historical/current/observation meanings. Refusal/no-effect check: no table, deep path or nested JSON object implies authority, atomicity or writable ownership. Retain missing causal steps by mechanism ID and your independent answer. No shared state changes. User result: not_run.

### C02-R03 — Legal transitions and the generic-status counterexample

Actor: reader/optional Node user. Prerequisites: §1 assumptions. Read §§7–10 and the §8 transition table. Predict confirmation at 599/600, unauthorized confirmation, missing payment acceptance, terminal confirmation and cancellation at cutoff. Predict what setting state alone leaves missing. Run:

```sh
node handbook/domains/05-api-engineering/examples/c02/reservation-model.mjs
```

Expected: normal held→confirmed→cancelled with pending→settled refund; boundary refusals leave input unchanged; 720 enumerated combinations agree with the declared guard table; raw status update lacks the refund obligation. Compare [stdout](reservation-model.stdout.txt). Refusal/no-effect check: the modeled function does not mutate its input or grant confirmation after expiry; settling a refund does not revive allocation. Answer E8/E10 on changed extension/finalization policies. Retain prediction/output and any disagreement with the table. After: exited, no cleanup. User result: not_run.

### C02-R04 — Identity, authority and deletion during work

Actor: reader/editor. Prerequisites: none; fixture cases reset independently. Read §§11–12 and §16. In the R01 output inspect transfer, stale-affordance and restoration lines; rerun its command if desired. Answer E11/E12/E16 independently, including a pending refund during tenant removal and old access after transfer.

Expected: transfer preserves identity/deadline but changes eligible actor; old nested path/link grants nothing; restoring history visibility leaves R41 cancelled and Bob's allocation untouched; pending obligation remains referable under a declared policy. Compare hard removal, tombstone and recoverable soft deletion. Refusal/no-effect check: restoration does not implicitly reverse business cancellation or promise physical erasure; no credentials/auth engine is implemented by the fixture. Retain proposed legal/refused transitions and old-reference behavior. No lasting state. User result: not_run.

### C02-R05 — Acknowledgments, partial results and unknown outcomes

Actor: reader/editor. Prerequisites: none. Read §§13–15. Explain which effects the cancellation receipt acknowledges and why receiving it is unnecessary for the provider to continue settlement. Inspect the aggregate and knowledge lines in R01's output. Draw both histories that yield timeout, then answer E13–E15 before their rubrics.

Expected: public cancelled/pending survives private retries; accepted work differs from completed effect; per-item R41 accepted/R42 refused differs from an all-or-none group refusal; timeout alone cannot distinguish a no-effect history from committed cancellation. Refusal/no-effect check: `pending` does not guarantee eventual success, current cancelled state may not identify the caller's attempt, and an expired/inaccessible monitor does not prove rollback. Retain your history/evidence table. No external refund, real dropped reply or durable execution was exercised. User result: not_run.

### C02-R06 — Depth, transfer and future evolution

Actor: editorial reviewer/learner. Prerequisites: §§1–18 available; no requirement to pass the other scenarios first. Audit M07–M18 against the ledger's paired evidence tables. Answer E17/E18 and the independent §20 synthesis without copying the examples. Compare the two models for partial group confirmation; propose adding staff approval before seat release.

Expected: same requirements are applied to both models; legal guards, shared invariants, ownership, retention, loss of observation and migration obligations are explicit. Existing consumers' cancellation acknowledgment keeps its meaning or requires an explicit new contract. Refusal/no-effect check: `/v2`, another state string, passing model checks and the agent's reasoned rating cannot themselves establish compatibility, learner competency or Product Owner acceptance. Retain unresolved gaps by mechanism/section; no grade is inferred. User result: not_run.

### C02-R07 — Approval reconciliation, counts, preservation and publication

Actor: Product Owner/reviewer. Prerequisites: none. Open [C01 approval](../c01/editorial-approval.md), [canonical state](../../../../tracking/state.json), [tracker](../../../../../TRACKER.md), [index](../../README.md) and [coverage](../../../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage). The historical C01 text/evidence retain pending labels; the new record supersedes those labels without rewriting the submitted artifact. For the historical C02 authoring audit, use the [original publication checkout](../../../../../docs/repository-layout.md#historical-evidence). Current read-only checks:

```sh
python3 docs/repository-restructure/check-preservation.py
python3 scripts/check-handbook-links.py
python3 -m json.tool handbook/tracking/state.json > /dev/null
git diff --check
git log -1 --format='%H %s'
git status --short
git ls-remote origin refs/heads/main
```

Expected: the current restructuring checker verifies 341 moved files with tracking/approval values unchanged except paths. The historical authoring audit reported 274 protected baseline files byte-identical, unchanged approved chapter profiles/sequence/CD01–CD07 and prior domain/MediaForge objects; 68 authored = 67 approved + C02 in_review; 23 unstarted D05 chapters; 20 approved earlier Charters and zero D05 Charters. After delivery, tree clean and remote main equals the delivery SHA. [Exact changed-file manifest](changed-files.txt) accounts for every path. Refusal/no-effect check: C01 approval is editorial only, C02 remains in_review, C03 has no lesson, no project artifacts or competence upgrades exist. Retain discrepancies. Commands are read-only. User result: not_run.

### C02-R08 — Figures, sources and evidence qualifications

Actor: reader/editor. Prerequisites: Markdown/image viewer. Open all three SVGs from §§5/8/14 at normal width and about 390px page width; follow their adjacent `.mmd` links. Inspect arrow direction, labels, clipping, contrast and text alternatives. Compare §8 table guards with V02's event labels. In V03 distinguish release/obligation receipt from later settlement. Follow primary source citations for RFC 9110 deletion/acceptance, SCXML guards, resource identity, OWASP object access and AIP conventions.

Expected: labels remain readable, no essential fact relies only on color, all diagrams have captions/prose equivalents, and sources distinguish normative HTTP/URI/link rules from architectural explanations and ecosystem conventions. [Validation](validation.md) records actual render and lookup limits. Refusal/no-effect check: no decorative image, remote diagram asset, generic DELETE-erasure claim, standardized invented action schema or deployed implementation is implied. Retain clipped/ambiguous labels or source mismatches by figure/section. No renderer installation is needed to read exports. User result: not_run.

## Results and resumable checkpoint

| Scenario | Actual agent preflight / source | Human result |
|---|---|---|
| R01 | Both models reviewed under §1 assumptions; conversion witness passed in [execution](execution.json) | not_run |
| R02 | M01–M06 audited with definitions, cause, N/A cases, comparison, backend relevance, E/rubric and sources | not_run |
| R03 | Fixture A exited 0; 720 combinations plus concrete boundary/refund witnesses passed | not_run |
| R04 | Identity/transfer/stale-control/visibility examples reviewed; fixture B passed | not_run |
| R05 | Aggregate and identical-timeout witnesses passed; receipt/obligation limits reviewed | not_run |
| R06 | 18/18 rows rated reasoned in separate agent audit; no independent external reviewer or learner answer | not_run |
| R07 | Structural/protected-state checks passed; final [preflight](preflight.json), publication identified by Git | not_run |
| R08 | Three Mermaid sources rendered/inspected; primary targets/fragments checked; limits in [validation](validation.md) | not_run |

**Current scenario:** R01. **Next safe action:** open §17 and predict the two identity paths and the split-conversion allocation count. Report observations by scenario ID; C02 editorial approval remains pending until an explicit Product Owner decision.

**State/environment:** no running service, credentials, port, persistent fixture or shared evaluation data. Independent cases reset every process invocation. Stop reading at any point; examples exit on their own. Cleanup is unnecessary. Resume using this guide and your last notes; rerun a command for a fresh fixture. Do not alter canonical statuses to record tentative findings. Source changes affecting a scenario require its preflight to be rerun while retaining prior observations.

**Known limitations:** pure sequential models, trusted authority inputs, no HTTP/storage/provider/concurrent integration, no full screen-reader or physical mobile-device assessment, no independent external review, no learner assessment. No known substantive chapter finding is concealed; see [review findings](validation.md#mechanism-review-and-findings). Publication is authorized; advancement to C03 is not. Stop after C02.
