# D05-C02 validation and editorial audit

**Authoring date:** 2026-10-16/17 (Asia/Tehran); final checks 2026-10-17. **Baseline:** `dfe397acbaed6326190dbda1e12b76c54854c6ed`, clean main matching origin/main after successful fetch. C01's approval instruction was received 2026-10-16 before the local date rollover. **C02 status:** in_review.

**Scope:** C01 editorial approval recording and C02 educational authoring/review/publication only. The publication commit identifies the reviewed working tree; [preflight](preflight.json) records exact artifact hashes, structural results and command outputs. [Changed-file manifest](changed-files.txt) lists every changed path. Earlier evidence is retained as historical, not overwritten as though run now.

## Approval and preservation

[C01 approval record](../c01/editorial-approval.md) quotes the explicit Product Owner decision and names the exact approved baseline. The lesson, original review guide/ledger/execution/source evidence and diagrams are byte-identical. Their earlier pending labels describe the submitted snapshot; the later record and current canonical state supersede those labels. No automated check is used to manufacture approval.

Reconciled AGENTS, root/domain indexes, curriculum status/reference text, depth-specification inventory metadata, tracker, canonical JSON and coverage. Approved curriculum sequence, all 25 complete chapter profiles and CD01–CD07 definitions/statuses are unchanged. Canonical domain objects for D01–D04/D06–D16, old history prefix and MediaForge object are identical. **274 protected files** (earlier domains, project catalog/Charters/registry, submitted C01 and earlier D05 evidence/catalog) remain byte-identical. The scoped preservation checker below compares against the full baseline SHA.

Current totals: **68 authored lessons = 67 approved + C02 in_review**; D05 has 2 authored / 1 approved / 23 not_started profiles and zero concepts/Charters. All 20 existing approved Charters and mappings are preserved. C03 is absent; no project Product/Technical Discovery, Final PRD, Module Plan, specification, tickets, framework or architecture is authored. No D05 completion, learner assessment or production-readiness claim.

## Mechanism review and findings

A separate profile-to-chapter audit followed drafting. The reviewer was the same agent in a distinct review pass; **no independent external reviewer or human chapter evaluation is claimed**. [The paired depth tables and profile-clause audit](depth-ledger.md) point to actual sections, N1–N18/A1–A18 normal/adverse cases, E1–E18 independent exercises/rubrics, comparisons, backend applications and qualified sources. All eighteen required mechanism groups reach **reasoned**; structural inventory checks do not prove that editorial rating.

The chapter contains about 11,700 words, exceeding C01's roughly 9,300-word benchmark, but depth is assessed per mechanism rather than by length. It derives two models under identical seat/authority/time/refund requirements, traces conversion/release/expiry, and separately teaches multi-resource obligations, identity/relationship boundaries and unknown observations. Later-chapter topics are bounded modeling implications, not full HTTP/replay/authorization/async/compatibility implementations. Inventory and file examples plus the independent group-workflow synthesis test transfer beyond the recurring reservation.

| Finding from review | Resolution / evidence | Remaining qualification |
|---|---|---|
| Generic status cancellation could be mistaken for a universally forbidden design | §7 explicitly permits a guarded state setter if it defines all effects; demonstrates the actual missing-obligation defect and a split-effect failure | Neither explicit command nor resource name enforces durable coupling |
| Transfer can conflate identity with authorization and historical rights | §§3/5/12 define global versus parent-local names, accepted transfer, old-reference behavior and separate historical access | Trusted actor facts in fixtures are not real authentication/revocation |
| Delayed expiry cleanup can imply a late active hold | §§8/10 guard by effective interval, refuse equality at deadline, and exempt confirmed booking from hold expiry | No real clock, timer punctuality or materialized expiry implementation tested |
| Conversion has hidden shared-allocation obligations | §17 normal/adverse traces and fixture B show single allocation, split loss and duplicate-claim risk | No storage transaction or concurrent conversion implementation |
| Receipt node could imply settlement waits for delivery | §14 caption explicitly says settlement is independent of receipt delivery; §15 separates effects/knowledge | Receipt loss is a model witness, not actual HTTP fault injection |
| Initial V02/V03 exports were too small when scaled to mobile | Reduced labels, retained full guards in table, adjusted per-source layout/spacing/minimum widths; final figures reviewed at 800/390px | Browser previews are not physical-device or screen-reader tests |
| Current-facing curriculum tail still directed C01-only review | Reconciled tail/index/state to approved C01, C02 in_review and stop before C03 | Historical submitted guides/approval records retain their original stops deliberately |
| Diff review caught a dropped shared coverage-maintenance footer during D05 section replacement | Restored the exact baseline footer and added explicit prefix/footer preservation assertions to the scoped checker | No D01–D04 coverage or maintenance policy change |
| Unsupported independent-review claim would overstate evidence | Explicitly identify the same-agent separate audit and pending external/human evaluation here, in ledger and guide | Independent external review remains unavailable; no external-review completion inferred |

**Unresolved substantive content findings:** none known after this audit. **Outstanding editorial gate:** Product Owner review/approval of C02; human scenarios remain not_run. The absence of known findings does not establish learner competence or replace independent human review.

## Actual educational example execution

Run from the repository root:

```sh
node domains/05-api-engineering/examples/c02/reservation-model.mjs
node domains/05-api-engineering/examples/c02/boundaries-and-observations.mjs
```

Both standalone invocations exited **0**, stderr empty. Observed **Node v24.22.0 / V8 13.6.233.17-node.57 / darwin arm64 / ESM .mjs**, no flags or dependencies. The integer teaching clock is supplied explicitly, not read from wall time. Exact source/output hashes and actual stdout are in [execution.json](execution.json); retained [fixture A stdout](reservation-model.stdout.txt) and [fixture B stdout](boundaries-and-observations.stdout.txt) make outcomes reviewable.

| Fixture / classification | Expected and observed result | Limit |
|---|---|---|
| Reservation state/obligation — pure model | Confirm/cancel and pending→settled normal journey; deadline/authority/payment/terminal/cutoff refused unchanged; 720 finite state/event/actor/time/payment combinations match declared table; status-only update lacks refund obligation | Local synchronous abstract guards/effects; no database, HTTP, true concurrency, payment or durable state |
| Boundaries/knowledge — pure model | Coherent H8→B6 maintains one allocation; split conversion loses it; transfer keeps ID/deadline and refuses former owner; stale controls refused; visibility restore cannot revive allocation; common seat admission rejects second while independent snapshots admit two; per-item differs from atomic group; same timeout in distinct effect histories | Conversion assumes accepted payment context; shared-seat example abstracts already-active entries, no expiry materialization; aggregate assumes authority; no real crash, transport loss, access engine or replay implementation |

The model's indivisible function evaluation is an explicit assumption. Actual backends would need independent evidence that guard/effect and release/obligation coupling survive concurrency and faults. The declarative guard oracle is separate from transition branches but shares authored assumptions; passing it is not proof those assumptions describe a real product. No runnable sample is labeled a schema/tool/HTTP/external integration test. Inputs are fixed/bounded, memory disposable, no services/files mutated by examples, each process exits and needs no cleanup. Static JavaScript is used deliberately; no TypeScript compiler/toolchain was selected or run.

## Source-claim review

Primary references were consulted using the web tool; runtime/renderer API syntax was additionally checked through Context7's resolve→query workflow. [source-links.json](source-links.json) retains direct GET status, final URLs, body SHA-256 and literal fragment checks for all **27 unique external chapter targets**. All returned 200 and all cited fragments were found. These are availability observations, not semantic proof or an exhaustive standards/errata audit.

| Claim / chapter scope | Source sections reviewed | Qualification |
|---|---|---|
| Resource versus representation, changing mapping, collection abstraction | Fielding 2000 §5.2.1.1–2; W3C Web Architecture §§2–3 | Architectural references; concrete reservation requirements/derivation are original teaching analysis |
| Identity scope, URI references, readable names/aliases and movement | RFC 3986 §§1.1/1.2.2; W3C §2; AIP-122 | URI syntax does not prescribe global uniqueness, opaque IDs or path spelling; AIP name rules are ecosystem conventions |
| Resource orientation, specialized actions beyond CRUD | AIP-121 Resources/Methods, AIP-136 Guidance | Published Google conventions, not a universal REST/HTTP resource/action-resource standard |
| Guarded transitions and state dimensions | SCXML §§3.5/3.13 | Formal event/condition reference; no SCXML engine or full execution semantics taught/executed |
| Representation manipulation, creation, deletion, accepted-work meaning | RFC 9110 §§3.1–3.2/9.3.3–5/15.3.3 | DELETE does not promise byte erasure; acceptance does not imply completion; no method-format tutorial or persistence guarantee |
| Links, actions and stale controls | RFC 8288 §2; C01 prerequisite continuity | Link model does not standardize invented `actions` vocabulary or grant permission; current guard checks remain necessary |
| Soft deletion, recovery, cascade/retention choices | AIP-164 Guidance/List and Get; RFC 9110 §9.3.5 | AIP's fields/undelete behavior are one comparison; our visibility policy is local and is not a legal erasure promise |
| Object/operation authority | OWASP API1:2023 Is the API Vulnerable / How To Prevent | Risk taxonomy supports checking actor/action/object; no complete authorization implementation/security audit |
| Long-running monitors, result/monitor lifetime | AIP-151 Guidance/Expiration/Errors; RFC 9110 §15.3.3 | No universal monitor schema, cancellation protocol or retention duration is implied; C16 owns deeper treatment |
| Model evolution and changing meanings | AIP-180 Guidance/Changing resource names/Semantic changes | Compatibility guidance, not certification of arbitrary optional fields/enums or deployed clients |
| Strict assertion API | Context7 Node.js resolve → `/websites/nodejs_latest-v24_x_api`, strict ESM/equality query | Official v24 living docs, High reputation; strict-mode import verified; actual observed runtime separately pinned |
| Rendering and mobile layout | Context7 Mermaid CLI → `/mermaid-js/mermaid-cli`, input/output/config query; Mermaid → `/mermaid-js/mermaid`, frontmatter/layout query; installed config types | Official living repositories, High reputation; installed CLI/engine pins below; local output verifies actual used surface |

The chapter's worked cases are original domain analyses, not copied source prose or standard-mandated business behavior. AIP guidance remains clearly distinguished from normative HTTP/URI/link specifications. No payment-provider behavior, framework, schema validator, identity provider, database or project topology is selected by these sources. Existing C01 references and approvals remain intact.

## Visual validation and inspection

Canonical `.mmd` files live beside SVG exports in `assets/02-resources-operations-and-workflows/`. All three include `accTitle`/`accDescr`, SVG title/description, selectable text, chapter alt text, source link, caption and equivalent prose/table. Source-specific frontmatter adjusts only layout/look/spacing/minimum node widths for V02/V03; repository theme, fonts, strict security and SVG text rendering remain in force. No remote image/font/script, HTML label, click handler or disabled browser sandbox was introduced.

```sh
npm run visuals:check -- domains/05-api-engineering/lessons/02-resources-operations-and-workflow-modeling.md domains/05-api-engineering/assets/02-resources-operations-and-workflows/relationships.mmd domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.mmd domains/05-api-engineering/assets/02-resources-operations-and-workflows/cancellation-effects.mmd
npm run visuals:render -- -i domains/05-api-engineering/assets/02-resources-operations-and-workflows/relationships.mmd -o domains/05-api-engineering/assets/02-resources-operations-and-workflows/relationships.svg
npm run visuals:render -- -i domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.mmd -o domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.svg
npm run visuals:render -- -i domains/05-api-engineering/assets/02-resources-operations-and-workflows/cancellation-effects.mmd -o domains/05-api-engineering/assets/02-resources-operations-and-workflows/cancellation-effects.svg
```

Actual final check: **3/3 blocks passed** across four targets; three exports succeeded. Installed **Mermaid CLI 12.0.0, Mermaid 12.2.0, Puppeteer 25.14.0**, existing Chrome; no install or lockfile change. [Visual evidence](visual-review.json) records source/render hashes, browser version, preview measurements and export-consistency observations. Agent inspected actual final images at desktop 800px and mobile 390px page widths, including grayscale and dark surroundings. Labels, direction and node/edge spacing were checked; full guards are in §8's accessible table rather than tiny diagram text. Local previews are supporting evidence, not native GitHub renderer, physical-device, print/PDF or assistive-technology qualification.

## Repository validation and handoff

```sh
python3 domains/05-api-engineering/evidence/c02/check-authoring.py
python3 scripts/check-handbook-links.py
python3 -m json.tool tracking/state.json > /dev/null
node --check domains/05-api-engineering/examples/c02/reservation-model.mjs
node --check domains/05-api-engineering/examples/c02/boundaries-and-observations.mjs
git diff --check
git diff --cached --check
```

Final command observations and JSON/count/scope results are retained in [preflight](preflight.json). The scoped checker verifies protected bytes, unchanged prior objects/history/decisions/profiles/sequence, C01/C02 statuses/stop boundary, actual lesson inventory, coverage counts, example hashes, case/exercise/ledger inventory and SVG accessibility structure. It deliberately does not infer educational quality from strings. Internal-link checker covers repository-relative Markdown links and anchors; it is not a full Markdown renderer. All three [fresh SVG exports](svg-consistency.json) are byte-identical to the stored SVGs; the consistency helper also supports generated-ID normalization without removing geometry/styles/text.

No unrelated earlier-domain lab suite was rerun because those files and canonical objects are unchanged. No production/external service, learner exercise or independent human review was run. Preparing [the complete hands-on guide](review-guide.md) fulfills the end-of-ticket handoff workflow. First action: compare the two identity paths in chapter §17 and predict the split conversion. C02 remains in_review; human results are not_run. Commit/push are authorized after checks; stop before C03.
