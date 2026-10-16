# D05-C01 validation and technical/editorial review

**Date:** 2026-10-16. **Baseline:** `6e7048b0c89e7fc4ad3700711edbfe583760c784`, clean `main`.

**Chapter status:** `in_review`; author review is not Product Owner chapter approval.

**Scope:** curriculum approval recording and C01 educational authoring only. Tested source revision is identified by exact hashes in [execution](execution.json) and [preflight](preflight.json); the publication revision is the commit containing this record.

## Actual educational execution

Both final standalone files ran in separate Node process invocations, each with exit 0 and empty stderr. No package installation or server setup was needed.

```sh
node domains/05-api-engineering/examples/c01/contract-traces.mjs
node domains/05-api-engineering/examples/c01/correctness-boundaries.mjs
```

Observed environment: **Node v24.22.0**, **V8 13.6.233.17-node.57**, **darwin arm64**, **ESM `.mjs`**, no flags. [execution.json](execution.json) retains commands, exact fixture/output SHA-256, outputs and limitations. Retained stdout: [target/control trace](contract-traces.stdout.txt), [correctness boundaries](correctness-boundaries.stdout.txt).

| Fixture / kind | Expected and actual observations | Limit |
|---|---|---|
| contract-traces — pure synchronous model | A: both clients succeed; B: guided selects new target and succeeds, conventional selects old target and fails; absent action yields no submission; stale control refused; unsupported method refused locally | Six printed lines, not six network tests; independent disposable cases; no HTTP, auth, cache or representation parser |
| correctness-boundaries — pure synchronous model | Invalid/syntax inputs refuse before effect; valid input accepted; unqualified retry creates 2 effects versus 1 with its local agreement; changed input under same intent refused; split checks overwrite while indivisible condition refuses second; distinct object conditions allow capacity violation | Four printed categories; fixed inputs, deterministic interleavings, no genuine parallelism, durable storage or production replay implementation |

The retry fixture deliberately permits independent creations for the same seat; it isolates intent duplication and does not implement the chapter's initial seat-uniqueness guarantee. The parsing model does not qualify the illustrative 1 KiB HTTP bound or duplicate JSON names. A synchronous replay Map has no crash, expiry or distributed concurrency semantics. These limits were added during review rather than inferred away from passing assertions.

## Source claim review

Primary sources were consulted for the claims below. [source-links.json](source-links.json) records direct GET availability, final URL, body hash and fragment presence for **31 unique external chapter targets**. All 31 returned 200 and all cited fragments were present. These observed HTML hashes identify fetched bodies; living HTML can change on a later fetch. Link reachability is separate from semantic review.

| Claim group / chapter sections | Primary sections checked | Review conclusion and boundary |
|---|---|---|
| REST taxonomy, causal constraint/property model, client-server/stateless/cache/layers/optional code | Fielding 2000 Chapter 5 §§5.1.2–5.1.7, §5.2, §5.3; Chapter 6 historical evaluation | All required constraints and four uniform-interface subconstraints taught separately; optional code is not mandatory. Historical protocol examples do not override modern HTTP. Concrete reservation traces are original applications, not standard-mandated policy |
| Runtime controls and target construction, §9 | Fielding 2008 hypertext clarification; RFC 8288 §2, §2.1.2 | Discovery assumes understood relation/format semantics and a stable entry. Link relations do not supply universal mutation forms. Toy `actions` is explicitly invented, using an example extension URI, not a standardized format |
| Resource/representation and identification, §§2, 6–8 | RFC 3986 §§1.1–1.2; RFC 9110 §§3.2, 6.4, 8; W3C Web Architecture §2 and identification/interaction/formats separation | Identity is not bytes or authority; reference meaning and units are explicitly owned contract decisions |
| Method safety, replay and observation, §§2, 10, 13 | RFC 9110 §§9.2.1–9.2.2, 9.3.3, 15.6.5 | GET cancellation counterexample is unsafe; idempotence concerns intended effect, not identical outputs; gateway timeout does not establish origin rollback in the illustrated history |
| Reuse and freshness, §5 | RFC 9111 §§3–5, especially §5.2.2 no-cache/no-store/private/public | Non-storage permitted; no-cache is not no-store; explicit-clock freshness is not latest-source consistency, authority, or write admission |
| Runtime input and conditions, §§12, 14 | RFC 8259 §§4, 9; RFC 9110 §§13, 15.5.1 | Parsing/shape/permission/effect boundaries distinct; protocol precondition alone supplies no storage atomicity. Cross-resource invariant limitation explicitly worked |
| Description versus behavior, §§1, 18 | OpenAPI 3.2.1 Introduction; JSON Schema 2020-12 publication page | Approved reference line preserved; no OAS/schema artifact or executable tool conformance claimed. C13 owns dialect/tool qualification |
| Small executable API surface | Context7 resolve Node.js → `/nodejs/node`, then query strict assertion imports/equality/throws; official main `doc/api/assert.md` | Official repository, High reputation; living index not an exact runtime source pin. Uses only verified strict assertions; actual execution qualifies the named local version |
| Rendering CLI flags | Context7 resolve Mermaid CLI → `/mermaid-js/mermaid-cli`, then query mmdc input/output/config/background rendering | Official repository, High reputation; living docs checked against installed CLI 12.0.0. Existing repository wrapper/config used; no new rendering dependency |

The web tool initially failed to retrieve RFC 8288 (429) and versioned/latest Node documentation (internal fetch failures). RFC 8288 was inspected through the IETF Datatracker copy; a subsequent direct GET of the chapter's RFC Editor URL succeeded. Node API documentation came through the official repository/Context7, with the documentation branch explicitly qualified. These failed retrievals are not claimed as successful verification. The historical discovery's Context7 unavailability remains recorded separately; this authoring session successfully resolved and queried the two named libraries.

No exhaustive errata/cross-implementation conformance audit is claimed. Future lessons must recheck their own normative details and tool behavior. No auth provider, schema validator, generated client, gateway or storage engine is selected by these checks.

## Visual validation and inspection

Sources and exported SVGs live under `assets/01-api-contracts-and-rest/` in D05. The `.mmd` files are canonical; SVGs are regenerated exports. Both have `accTitle`/`accDescr`, captions, adjacent source links and equivalent prose in the chapter.

```sh
npm run visuals:check -- domains/05-api-engineering/assets/01-api-contracts-and-rest/state-boundaries.mmd domains/05-api-engineering/assets/01-api-contracts-and-rest/transition-change.mmd
npm run visuals:render -- -i domains/05-api-engineering/assets/01-api-contracts-and-rest/state-boundaries.mmd -o domains/05-api-engineering/assets/01-api-contracts-and-rest/state-boundaries.svg
npm run visuals:render -- -i domains/05-api-engineering/assets/01-api-contracts-and-rest/transition-change.mmd -o domains/05-api-engineering/assets/01-api-contracts-and-rest/transition-change.svg
```

Actual final result: **2/2 Mermaid blocks passed**; both SVG exports succeeded with installed **Mermaid CLI 12.0.0**, existing Chrome and `tools/visuals/mermaid.config.json` (strict security, no remote resources). PNG inspection exports used the same command with output `/tmp/d05-c01-state-boundaries.png` and `/tmp/d05-c01-transition-change.png`; they remain temporary QA artifacts, not committed teaching assets.

An initial sequence render failed on semicolons in text. Those labels were fixed, then the final sources checked again. Visual inspection found long path labels made the sequence unnecessarily wide; replaced them with target A/B and defined exact paths in the caption. Inspected both final raster previews: labels readable, arrow direction/crossing correct, no clipping; resource/policy versus conversation inputs are separately labeled, and disposable sequence cases/recheck are explicit. SVG XML/accessibility checks are retained in preflight. These are local exported diagrams, not a native GitHub Mermaid-preview verification; the lesson embeds SVG rather than native fences.

## Profile, accuracy and progression review

[The depth ledger](depth-ledger.md) audits **16 mechanism rows**, including separate audience/ownership and conformance-claim rows, against every C01 profile dimension. Each row has definitions/assumptions, causal steps, a normal case, a concrete failure/limit, comparison, backend application, independent rubric and qualified source. All are rated **reasoned** by the author review; no required mechanism remains merely named or explained. E1–E15 and the integrated exercise are unrun learner tasks.

Review resolved: missing explicit definitions of policy/mechanism/capability/independent evolution; clearer uniform-interface meaning without identical schemas; explicit REST/protocol separation; retry versus uniqueness fixture boundary; parser-size/integration boundary; diagram parse and reading-width issues. The chapter retains the required undocumented-transition break while distinguishing a genuinely published fixed-template guarantee and semantic compatibility changes. It separates current resource state from evidence about which attempt caused it.

Progression proceeds contract → style choice → individual constraints → adverse correctness → conformance comparison → experiments → independent synthesis. Backward prerequisites are linked; later chapters are ownership/transfer destinations, not unexplained prerequisites. SOAP/OData/federation signposts remain proportionate under CD06. Neither the chapter nor the review prescribes project architecture.

## Canonical, structural and preservation checks

[preflight.json](preflight.json) records actual structured assertions and retained artifact hashes. Checks cover unchanged seven decision definitions, unchanged 25 sequence rows/168 backward edges and all detailed profile bodies, C01-only authored status, 24 unstarted chapters, 67 authored/66 approved/one in_review totals, 20 approved existing Charters, zero D05 Charters, 253 byte-identical protected files, all prior canonical domain objects and MediaForge evidence, append-only history, and the unchanged historical discovery preflight.

Reproduce ordinary checks from repository root:

```sh
python3 -m json.tool tracking/state.json > /dev/null
python3 scripts/check-handbook-links.py
git diff --check
git diff 6e7048b0c89e7fc4ad3700711edbfe583760c784 -- domains/01-computer-science-foundations domains/02-javascript-typescript domains/03-nodejs-internals domains/04-network-protocol-engineering projects/implementations
```

The final link checker reports **1,791 internal links, zero current/new issues** and includes current untracked files during authoring; the protected-path comparison is empty. An intermediate check ran before the new evidence files had been saved and reported their missing paths; those files were then written and the check rerun successfully. It does not validate external source truth; the separate source record above supplies the bounded availability check. No earlier approved lesson/Charter text is revised. Current indexes, AGENTS status, TRACKER and coverage are reconciled; historical pending states are retained as dated snapshots.

## Handoff and remaining limits

The [review guide](review-guide.md) adapts the installed `ticket-walkthrough` skill and covers seven document/experiment scenarios. Agent preflight and your results are separate; all human chapter results remain `not_run`. No learner competence is assessed. Exact changed paths are listed in [changed-files.txt](changed-files.txt).

C01 remains `in_review`; curriculum approval does not approve this chapter. No substantive known C01 reasoning gap remains after author review, subject to Product Owner findings. Execution is limited to two pure models on one named host; actual HTTP/schema/provider/database integration, real concurrent/durable behavior, production qualification and learner acceptance are unverified. Stop before C02, pending explicit Product Owner approval and authorization.
