# D03 limited editorial corrections — 2026-10-15

Source: Product Owner's “D03 Editorial Corrections” request in this session, authorizing only C11 transfer semantics and current-facing historical-status reconciliation. The Product Owner explicitly accepted D03 Visual Enhancement at `09c12651b8087682d87d1bbc7b8201b914f3db5d` before this correction pass.

Validated revision: that accepted commit plus the corrections listed below. Identify the delivery commit with `git log -1 --format=%H -- docs/visual-d03/editorial-corrections.md`. Correction evaluation remains **not_run**; this does not reopen existing editorial or visual approval.

## Corrections and authority

- **Task 1 / F01:** [C11 §4](../../domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md#4-three-ways-data-crosses-a-worker-boundary) now separates ordinary cloneable posting, explicit transferable ArrayBuffer movement, explicit untransferable storage, SharedArrayBuffer sharing and allocation-dependent Buffer pooling. This resolves [F01](technical-findings.md) without changing the accepted D03-V10 asset, caption or exclusions.
- Documentation: Context7 resolved Node.js to `/nodejs/node` and `/websites/nodejs_latest-v22_x_api`; queried Buffer provenance and message transfer semantics. Checked the authoritative [v22.16.0 postMessage contract/history](https://nodejs.org/download/release/v22.16.0/docs/api/worker_threads.html#portpostmessagevalue-transferlist), [markAsUntransferable example](https://nodejs.org/download/release/v22.16.0/docs/api/worker_threads.html#workermarkasuntransferableobject), and [Buffer considerations](https://nodejs.org/download/release/v22.16.0/docs/api/worker_threads.html#considerations-when-transferring-typedarrays-and-buffers). Version and storage provenance qualify the explanation; older cloning language is not a promise of fallback on an explicit list.
- Experiments: preserved [finding-check.json](finding-check.json) and reran its [source](finding-check.mjs) **without `--record`**. The marked ArrayBuffer case threw DataCloneError with sender bytes intact; ordinary posting produced an independent receiver copy. This is a bounded Node v24.22.0 observation, not a pooled-constructor audit or a new v22 execution claim.
- **Task 2:** corrected D03 README/curriculum and lesson status headers, coverage rows and obsolete next-authoring instructions. Preserved historical counts/dates, original approval records and numeric execution observations. C18's original workflow exercise is intact, followed by an explicit Workflow V2 clarification of its historical PRD terminology.
- Authority: [canonical state](../../tracking/state.json), [tracker](../../TRACKER.md), [coverage](../../projects/coverage-matrix.md), [Workflow V2](../workflow.md), and [MediaForge registry](../../projects/implementations/mediaforge.md). All 18 D03 lessons and five educational Charters remain approved. Current global totals remain 66 lessons / 20 educational Charters. MediaForge has approved external planning through Module 01 tickets; implementation/tests are unverified and learner competency unassessed. D04 is already editorially closed; D05 remains not_started. Neither domain was authored in this pass.
- Coverage reviewed; **no mapping, direct/supporting assignment, Charter scope or approval change**. Canonical JSON differs only by one appended history record. TRACKER and coverage each receive a reconciliation note; dated historical reviews are retained.

## Actual agent preflight and review

Environment: Node **v24.22.0**, V8 **13.6.233.17-node.57**, libuv **1.52.1**, macOS/darwin **arm64**. Historical v22/Linux and v26/macOS results remain attributed to their original environments.

| Check | Observed result |
| --- | --- |
| `node docs/visual-d03/finding-check.mjs` | PASS: explicit untransferable list throws; ordinary posting clones independent bytes. Original JSON unchanged. |
| Five exact C11 JavaScript fences, extracted to disposable `.mjs` files and run once each | 5/5 exit 0. A: timer 24 ms, result 188 ms, Worker exit 0 at 189 ms. B: receiver clone first 99 / parent first 1; both sender alias lengths 0 after transfer; receiver bytes [4,5,6,7]. C: 20,000 atomic increments. D: sawError true, sawResult false, Worker exit 1. E: terminated Worker exit 1, gotResult false. These scoped observations do not replace historical measurements. |
| Python comparison against accepted commit | 18/18 lessons: **188 full fenced blocks** and **325 numbered exercise/checkpoint lines byte-identical**; editorial/prerequisite approval headers and complete visual blocks identical. Diff review confirmed only authorized explanation/status edits; no unrelated teaching content removed. |
| Protected-path comparison against accepted commit | All D03 assets and Charters, other domains, external registry, tooling and original visual evidence unchanged. No external repository was accessed or modified. |
| Canonical JSON comparison | Every field unchanged except one appended history entry; prior history preserved in order. Approval, implementation and assessment states unchanged. |
| `npm run visuals:check -- domains/03-nodejs-internals/lessons/*.md` | PASS: 18 targets, 3 existing inline Mermaid blocks validated. No diagram source or SVG regenerated. |
| C11 §4 local HTML render using installed marked/Chrome | Inspected screenshot: paragraphs, links and five-column table legible; existing figure loads and agrees with the clarification. Temporary preview only; no published-viewer claim. |
| Installed marked parser over all changed Markdown | PASS: 23 documents parsed; 93 tables have consistent column counts. |
| `python3 scripts/check-handbook-links.py`; `git diff --check 09c12651b8087682d87d1bbc7b8201b914f3db5d` | PASS: 1,405 internal links checked, zero current/pre-existing/new issues; no whitespace errors. |

The original visual verifier is historical evidence for an additive-only visual pass; this authorized prose correction uses the accepted commit for preservation comparisons. The full 79-case visual replay suite was not rerun; unchanged code fences plus the focused C11 runs above cover this correction. No all-version, production-performance, implementation-completion or learner-mastery claim is made.

## Reproducible evaluation guide

Actor: Product Owner/reader. Start in `/Users/hossein/Projects/nodejs-backend-engineering-handbook` with the delivery checked out. Markdown preview needs no service, account or data. Node is needed only for the optional bounded experiment. All scenarios are independent and read-only; the experiment uses synthetic bytes and closes both ports.

| Scenario / coverage | Exact reader action and expected result | Agent preflight | User evaluation |
| --- | --- | --- | --- |
| E1 — Task 1, technical explanation | Open [C11 §4](../../domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md#4-three-ways-data-crosses-a-worker-boundary) in Markdown preview. Read “Transfer moves…” and “Buffer pooling matters”; expect the five distinctions above and version/provenance qualifications. Follow the Node documentation links and preserved experiment link. Optionally run `node docs/visual-d03/finding-check.mjs`; expect its PASS line, no rewritten JSON and no lingering process. | pass | not_run |
| E2 — Task 2, current versus historical status | Read [README next action](../../domains/03-nodejs-internals/README.md#next-action-and-handoff), [curriculum current state](../../domains/03-nodejs-internals/curriculum.md#approval-tracking-and-next-action), and each lesson's header/footer. Expect approved D03 authoring and educational Charters, no stale lesson-review gate, and MediaForge planning separated from unverified implementation. Read C18's clarification after exercise 12. Compare the dated 2026-10-13 coverage record with today's current totals; historical counts remain dated. | pass | not_run |
| E3 — Validation and boundaries | Run `git diff 09c12651b8087682d87d1bbc7b8201b914f3db5d -- domains/03-nodejs-internals/assets domains/03-nodejs-internals/projects domains/01-computer-science-foundations domains/02-javascript-typescript domains/04-network-protocol-engineering projects/implementations`; expect no output. Review `git diff 09c12651b8087682d87d1bbc7b8201b914f3db5d -- tracking/state.json` for one added history record only. Run `python3 scripts/check-handbook-links.py` and `git diff --check 09c12651b8087682d87d1bbc7b8201b914f3db5d`; expect no new link issues or whitespace errors. | pass | not_run |

Retain scenario ID, delivery commit and expected-versus-observed notes. If a scenario fails, report it and continue independent scenarios. No accepted approval or competency status changes from an automated pass.

Checkpoint: **E1**, user observations **not_run**. First concrete action: open C11 §4 and compare its explicit untransferable-list paragraph with ordinary posting. No integration or setup blocker is known. Close previews when finished; the five fixture files were automatically removed. Resume at any independent scenario. No background service or production state needs cleanup. Human evaluation of these corrections is pending; implementation of the authorized corrections does not wait for it.

## Exact changed files

- [TRACKER.md](../../TRACKER.md)
- [docs/visual-d03/editorial-corrections.md](../../docs/visual-d03/editorial-corrections.md)
- [domains/03-nodejs-internals/README.md](../../domains/03-nodejs-internals/README.md)
- [domains/03-nodejs-internals/curriculum.md](../../domains/03-nodejs-internals/curriculum.md)
- [domains/03-nodejs-internals/lessons/01-runtime-architecture-and-execution-boundaries.md](../../domains/03-nodejs-internals/lessons/01-runtime-architecture-and-execution-boundaries.md)
- [domains/03-nodejs-internals/lessons/02-startup-configuration-and-runtime-identity.md](../../domains/03-nodejs-internals/lessons/02-startup-configuration-and-runtime-identity.md)
- [domains/03-nodejs-internals/lessons/03-event-loop-and-io-lifecycle.md](../../domains/03-nodejs-internals/lessons/03-event-loop-and-io-lifecycle.md)
- [domains/03-nodejs-internals/lessons/04-scheduling-queues-and-timers.md](../../domains/03-nodejs-internals/lessons/04-scheduling-queues-and-timers.md)
- [domains/03-nodejs-internals/lessons/05-eventemitter-and-callback-contracts.md](../../domains/03-nodejs-internals/lessons/05-eventemitter-and-callback-contracts.md)
- [domains/03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md](../../domains/03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md)
- [domains/03-nodejs-internals/lessons/07-filesystem-io-and-resource-ownership.md](../../domains/03-nodejs-internals/lessons/07-filesystem-io-and-resource-ownership.md)
- [domains/03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md](../../domains/03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md)
- [domains/03-nodejs-internals/lessons/09-pipelines-transforms-and-cancellation.md](../../domains/03-nodejs-internals/lessons/09-pipelines-transforms-and-cancellation.md)
- [domains/03-nodejs-internals/lessons/10-native-asynchronous-work-and-thread-pool-saturation.md](../../domains/03-nodejs-internals/lessons/10-native-asynchronous-work-and-thread-pool-saturation.md)
- [domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md](../../domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md)
- [domains/03-nodejs-internals/lessons/12-child-processes-ipc-and-cluster-boundaries.md](../../domains/03-nodejs-internals/lessons/12-child-processes-ipc-and-cluster-boundaries.md)
- [domains/03-nodejs-internals/lessons/13-module-resolution-and-runtime-loading.md](../../domains/03-nodejs-internals/lessons/13-module-resolution-and-runtime-loading.md)
- [domains/03-nodejs-internals/lessons/14-v8-execution-memory-and-garbage-collection.md](../../domains/03-nodejs-internals/lessons/14-v8-execution-memory-and-garbage-collection.md)
- [domains/03-nodejs-internals/lessons/15-async-context-and-diagnostic-causality.md](../../domains/03-nodejs-internals/lessons/15-async-context-and-diagnostic-causality.md)
- [domains/03-nodejs-internals/lessons/16-runtime-failures-and-graceful-shutdown.md](../../domains/03-nodejs-internals/lessons/16-runtime-failures-and-graceful-shutdown.md)
- [domains/03-nodejs-internals/lessons/17-runtime-diagnostics-and-measurement.md](../../domains/03-nodejs-internals/lessons/17-runtime-diagnostics-and-measurement.md)
- [domains/03-nodejs-internals/lessons/18-integrated-runtime-failure-and-performance-case-studies.md](../../domains/03-nodejs-internals/lessons/18-integrated-runtime-failure-and-performance-case-studies.md)
- [projects/coverage-matrix.md](../../projects/coverage-matrix.md)
- [tracking/state.json](../../tracking/state.json)
