# D01 visuals — Product Owner evaluation

Source: **D01 Visual Enhancement** request, this chat; prepared 2026-10-15. Baseline `59aeeb59a0f277f4073fa73df445012f8a7f02a6`. Build: the commit containing this guide (`git log -1 --format=%H -- docs/visual-d01/guide.md`); record your checked-out `git rev-parse HEAD` with observations. Exact source/SVG identities: [verification.json](verification.json). **User evaluation: not_run. Visual acceptance: pending.**

## Starting point

Use `/Users/hossein/Projects/nodejs-backend-engineering-handbook` in your editor’s Markdown preview or open the linked SVGs in a browser. No account, server, credentials or application data are required. Existing dependencies, Chrome and renderer were preflighted; see [review](review.md) and [command transcript](validation.txt).

**First action:** open [Chapter 01 §5](../../handbook/domains/01-computer-science-foundations/lessons/01-cost-models-and-correctness.md#5-amortized-analysis-is-not-average-case-analysis), then view Figure 1 immediately before §6. Follow appends 1–5 and count old-item copies. Expect 0,1,2,0,4 (seven total) plus five new-item assignments. Start R01 below.

For local browser previews using committed assets without replacing evidence:

```sh
cd /Users/hossein/Projects/nodejs-backend-engineering-handbook
node docs/visual-d01/verify.mjs
```

Expected: printed temporary preview directory and a final `PASS`. Open the generated lesson `.html` files there in your browser. This is a local preview, not GitHub. Node >=22.13 and the existing Chrome/Chromium are renderer prerequisites; the separate optional teaching-code replay was verified specifically on Node v24.22 with the experimental transformation flag. No packages are installed by these commands. `--render` regenerates SVGs and `--record` overwrites versioned evidence; omit both during ordinary reading review.

## Feature coverage and independent scenarios

Actor: Product Owner for all scenarios. R01–R13 are independent reading/reasoning tasks; R14 checks presentation/accessibility across all figures and R15 checks reproduction/preservation. No scenario mutates shared application state or consumes IDs. Keep scenario ID, revision, viewport/zoom, expected-versus-observed finding and optional screenshot. An unclear figure or wrong inference is a failure to record, even when automation passed.

| Criterion | Scenarios | Limits |
| --- | --- | --- |
| All 14 lessons planned, need-based visuals, no content compression | R01–R13, R15 | C05/C14 omission rationale in review/plan |
| Algorithms, complexity, structures, dependencies | R01–R05 | Explicit model/ordering assumptions |
| Performance, scheduling, memory ownership, I/O | R06–R09 | Illustrative/conceptual, no new benchmark or OS trace |
| Concurrency, liveness, state and uncertainty | R10–R13 | No implementation correctness/learner mastery claim |
| Editable sources/local exports, captions and alternatives, desktop/mobile | R14 | Full screen-reader/GitHub/PDF behavior untested |
| Validation, preserved approvals/Charters/domain boundary, reproduction | R15 | Agent checks support human judgment |

### R01 — Copies occur at resize boundaries

Prerequisite: open [C01](../../handbook/domains/01-computer-science-foundations/lessons/01-cost-models-and-correctness.md) and find the figure by title (source/SVG pair in the review inventory).

1. Follow the five appends; sum growth copies and new-item assignments separately.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Seven copies plus five assignments. Explain why a resize can be linear while the sequence has constant amortized cost. Refusal/no-effect check: Do not infer that every append is cheap or that JS arrays promise this growth policy.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R02 — Logical order survives physical wraparound

Prerequisite: open [C02](../../handbook/domains/01-computer-science-foundations/lessons/02-linear-and-associative-data-structures.md) and find the figure by title (source/SVG pair in the review inventory).

1. Trace dequeue A then enqueue C using the physical slot labels. Identify the next item returned and what another enqueue does.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Slots C/B, FIFO B/C, head 1 and count 2; the next enqueue rejects in this teaching queue. Refusal/no-effect check: Do not read physical slot zero as the oldest item after wraparound.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R03 — A min-heap is not a binary search tree

Prerequisite: open [C03](../../handbook/domains/01-computer-science-foundations/lessons/03-trees-heaps-and-graphs.md) and find the figure by title (source/SVG pair in the review inventory).

1. Map indexes 0–3 to the heap tree; compare each parent/child and the root’s left subtree.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: [1,2,9,5] obeys min-heap ordering; it violates BST left-subtree ordering. Refusal/no-effect check: Do not infer sorted iteration or stable equal-priority order.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R04 — Both prerequisites must complete

Prerequisite: open [C03](../../handbook/domains/01-computer-science-foundations/lessons/03-trees-heaps-and-graphs.md) and find the figure by title (source/SVG pair in the review inventory).

1. In the snapshot, complete B mentally; identify what C and D may do.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: C becomes eligible under the stated rule; D still waits for C to complete. Refusal/no-effect check: No immediate dispatch, parallelism or fairness is established by graph edges.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R05 — A shrinking interval finds the first match

Prerequisite: open [C04](../../handbook/domains/01-computer-science-foundations/lessons/04-algorithmic-problem-solving.md) and find the figure by title (source/SVG pair in the review inventory).

1. Trace target 2 through every lo/hi/mid value; explain why equality moves hi.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Intervals [0,5), [0,2), [0,1), [1,1); return 1, the first duplicate. Refusal/no-effect check: hi is an answer boundary; unordered or NaN-containing inputs are outside the contract.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R06 — Optimize a stage, then recompute the whole path

Prerequisite: open [C06](../../handbook/domains/01-computer-science-foundations/lessons/06-computer-architecture-and-performance.md) and find the figure by title (source/SVG pair in the review inventory).

1. Add the stage durations before and after the computation change.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: 53 ms becomes 49 ms, saving 4 ms. Equal boxes are not proportional durations. Refusal/no-effect check: Do not interpret invented values as measurements or assume the arithmetic covers overlap/queues.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R07 — Ready is different from running

Prerequisite: open [C07](../../handbook/domains/01-computer-science-foundations/lessons/07-operating-systems-and-scheduling.md) and find the figure by title (source/SVG pair in the review inventory).

1. Start in Running, block on I/O, then satisfy the wait. Trace how CPU execution resumes.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Running→Waiting→Ready→Running, with dispatch required after Ready. Refusal/no-effect check: I/O completion must not imply instant execution or a universal promise state model.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R08 — Reachability determines collection eligibility

Prerequisite: open [C08](../../handbook/domains/01-computer-science-foundations/lessons/08-memory-models-and-management.md) and find the figure by title (source/SVG pair in the review inventory).

1. Follow the rooted cache chain, then inspect the separate X/Y cycle. Mentally delete the cache entry.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Rooted storage stays reachable; the isolated cycle is eligible for tracing collection. Removing one path helps only if no other reference remains. Refusal/no-effect check: No immediate collection, buffer copy, physical placement or RSS-release guarantee.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R09 — Capacity feedback constrains production

Prerequisite: open [C09](../../handbook/domains/01-computer-science-foundations/lessons/09-file-systems-and-io.md) and find the figure by title (source/SVG pair in the review inventory).

1. Distinguish solid work arrows from dashed feedback; describe the full-buffer response.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Capacity feedback constrains accepted production; the chosen policy can pause/reject. K counts items. Refusal/no-effect check: No inference of durable storage, successful processing or an absolute process-memory cap.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R10 — An await splits the check from the update

Prerequisite: open [C10](../../handbook/domains/01-computer-science-foundations/lessons/10-concurrent-execution.md) and find the figure by title (source/SVG pair in the review inventory).

1. Read both stock checks before gate release, then each decrement.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Both pass at 1; A decrements to 0, B to −1, both true; one thread can expose the race. Refusal/no-effect check: No need for simultaneous execution; await does not make the two-step claim atomic.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R11 — A circular wait has no enabled release

Prerequisite: open [C11](../../handbook/domains/01-computer-science-foundations/lessons/11-liveness-and-coordination.md) and find the figure by title (source/SVG pair in the review inventory).

1. Follow both wait-for edges and name who holds each needed resource.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: A needs B’s Y; B needs A’s X; neither can release under the stated model. Refusal/no-effect check: A generic graph cycle or multi-instance-resource cycle alone is insufficient.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R12 — Terminal attempts have no outgoing transitions

Prerequisite: open [C12](../../handbook/domains/01-computer-science-foundations/lessons/12-state-machines-and-formal-reasoning.md) and find the figure by title (source/SVG pair in the review inventory).

1. Follow all five permitted job transitions and then try cancel/start on each terminal node. Compare with the transition table.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Succeeded/Failed/Cancelled have no outgoing permitted transitions; rejected events leave state unchanged. Refusal/no-effect check: The diagram does not enforce guards, actor permissions, storage or competing-command atomicity.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R13 — Caller knowledge can lag the actual outcome

Prerequisite: open [C13](../../handbook/domains/01-computer-science-foundations/lessons/13-backend-case-study-workshop.md) and find the figure by title (source/SVG pair in the review inventory).

1. Follow attempt R after response loss and timeout, then the later outcome request.
2. Explain the visible relationship before reading the caption, then compare with its assumptions.
3. Follow the full-size SVG and editable source links if a label is unclear.

Expected: Service remains confirmed while caller is uncertain; reconciliation reveals the same attempt’s outcome. Refusal/no-effect check: Timeout is not proof of failure or rollback; reconciliation does not create a fresh reservation.

Retain your explanation and the first confusing label/arrow, if any. State afterward: unchanged reading view. Agent preflight: reference/source review, rendered 720/360 px inspection and scoped checks passed. **User result: not_run.**

### R14 — Presentation and text equivalence

Prerequisite: the 13 figures above. In each owning lesson, inspect at 720 px and 360 px reading columns at 100% zoom. With the verifier’s local previews, viewport widths 750 and 390 px leave the intended column after padding. Inspect every label, arrowhead, return path and terminal branch; check light and dark page surroundings and grayscale. Read the alt/caption without viewing the image, then open both adjacent SVG/source links.

Expected: all 13 images load locally, with no clipping/overlap, readable labels and distinctions available through words/arrows rather than color alone. Captions convey relationships and model limits; source remains editable. Reject missing images, broken links, unexplained symbols or excessive zoom requirements. Keep per-figure observations; full screen-reader/GitHub/PDF checks remain outstanding. State afterward: unchanged. Agent preflight: structural/contrast/bounds, parsed Markdown and rendered inspection passed. **User result: not_run.**

### R15 — Reproduction, omissions and preserved content

Prerequisite: repository checkout and existing renderer/browser. Read C05/C14 omission rationale in [review.md](review.md). In a terminal at the root, regenerate one SVG into a disposable directory:

```sh
d01_preview_dir=$(mktemp -d)
npm run visuals:render -- -i handbook/domains/01-computer-science-foundations/assets/02-linear-and-associative-data-structures/ring-buffer-wraparound.mmd -o "$d01_preview_dir/ring.svg"
open "$d01_preview_dir/ring.svg"
git diff 59aeeb59a0f277f4073fa73df445012f8a7f02a6 HEAD -- handbook/domains/01-computer-science-foundations/lessons
```

Expected: local export matches relationships and labels; lesson diff only adds visual-question/image/caption/source-link blocks. C05/C14 remain unchanged, as do Charters, statuses and D02–D04. Inspect [validation.txt](validation.txt), [verification.json](verification.json), [lab-replay.json](lab-replay.json) and [changed paths](changed-files.txt). No test pass establishes human acceptance. No D05 or D02 continuation. Keep any actual command error with revision/runtime. State afterward: one disposable directory only. Agent preflight: reproduction, preservation, scope and link checks passed. **User result: not_run.**

## Results and resumable checkpoint

| Scenario | Agent preflight | User result | User observation |
| --- | --- | --- | --- |
| R01 | pass | not_run | Pending |
| R02 | pass | not_run | Pending |
| R03 | pass | not_run | Pending |
| R04 | pass | not_run | Pending |
| R05 | pass | not_run | Pending |
| R06 | pass | not_run | Pending |
| R07 | pass | not_run | Pending |
| R08 | pass | not_run | Pending |
| R09 | pass | not_run | Pending |
| R10 | pass | not_run | Pending |
| R11 | pass | not_run | Pending |
| R12 | pass | not_run | Pending |
| R13 | pass | not_run | Pending |
| R14 | pass | not_run | Pending |
| R15 | pass | not_run | Pending |

Current checkpoint: **R01, not started by user**. All inputs are versioned lessons/assets; no service/account/state dependency exists. Current known failures in scoped final agent checks: none. Remaining checks: Product Owner clarity/visual acceptance, full assistive-technology behavior and publication-specific previews. Next safe action: open C01 §5, count the resize copies, and report R01 with your observation. Automated checks and silence do not advance this checkpoint.

Stop by closing the preview; no process needs stopping. Preserve this review package and paired assets. When temporary previews are no longer needed, remove only the directory printed by the verifier (or `$d01_preview_dir` from R15). Resume at the first `not_run` scenario on the same revision. If a figure changes, keep earlier observations and mark affected scenarios for rerun. Stop after D01 and await Product Owner review before any D02 work.
