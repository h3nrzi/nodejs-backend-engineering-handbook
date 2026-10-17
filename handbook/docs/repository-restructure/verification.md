# Repository restructuring verification — 2026-10-17

Request: move the existing Next.js application and canonical Handbook content into sibling `app/` and `handbook/` directories, before Wayfinder. Baseline: clean `aa3114ff357fd297a95f6a3fe32382abc3a2bb53` on `main`. This report covers that baseline plus this restructuring change; the containing commit identifies the verified result.

## Scope and decisions

- Moved all 17 tracked `my-app/` files to `app/`, preserving `app/app/`, `app/public/`, both manifests and all application dependencies/scripts. Config change: `turbopack.root = __dirname` prevents the root visualization lockfile from widening application root detection. The app README now identifies its working directory.
- Moved all 324 tracked educational files in `domains/`, `projects/` and `tracking/` to `handbook/`. Updated Markdown navigation, repository-root example commands, canonical state pointers and the D04 lab runner's source path.
- Kept root governance, docs, templates, skills, visualization package/lockfile, renderer wrapper and theme configuration together. No workspaces, package upgrades, platform features, Product Discovery or Wayfinder work.
- The Markdown checker now excludes inline code examples and ignored build/dependency artifacts, and loads its historical baseline independently of staged renames. A skill's inline example was the sole pre-existing false positive; actual navigation links must resolve.

## Observed checks

Commands run on macOS arm64, Node v24.22.0, npm 11.19.1. Dependencies were already installed; both lockfiles are unchanged. See [captured preflight](preflight.json) for actual outputs and [the guide](guide.md) for reproduction.

| Check | Command / working directory | Result |
| --- | --- | --- |
| Production build | `npm run build` in `app/` | Pass: Next.js 16.4.2; compilation, TypeScript and static generation; `/` and `/_not-found`. No root-detection warning after config fix. |
| Development | `npm run dev -- --hostname 127.0.0.1 --port 3100` in `app/` | Ready; `/` 200, `/next.svg` 200, missing route 404. Browser: starter heading/title, both images loaded, no page errors; screenshot inspected. |
| Lint | `npm run lint` in `app/` | Pass. Removed only disposable nested build cache generated during the initial inferred-root build; no source lint suppression. |
| Educational labs | `node scripts/check-d04.mjs` | 18/18 pass. |
| Standalone examples | Four `node handbook/domains/05-api-engineering/examples/c0{1,2}/*.mjs` entries, individually | All exit 0; source files unchanged. |
| Content and state preservation | `python3 docs/repository-restructure/check-preservation.py` | All 341 moved files accounted for: 306 byte-identical; 33 Markdown path/tooling/setup changes; one state pointer update; one application root config. All other canonical tracking/approval values compare equal. |
| Markdown links | `python3 scripts/check-handbook-links.py` | Zero issues, including anchors; final count in preflight. |
| Mermaid validation | `npm run visuals:check -- handbook/domains` | 79 blocks across 216 targets pass. |
| Mermaid export | SVG and PNG exports of relocated C02 allocation-lifecycle source to `/tmp/handbook-allocation-lifecycle.*` | Both succeed; actual PNG inspected for labels, transitions and clipping. Stored diagrams remain byte-identical. |
| Visualization smoke | `npm run visuals:smoke` | SVG/PNG, Markdown export, KaTeX, invalid-syntax and missing-browser cases; detailed result in preflight. |
| Historical audit reproduction | C02 audit in detached worktree at `98784ab` | Pass: 274 protected files; original authoring checks reproduce without rewriting their evidence. |
| Diff review | Two independent standards/spec reviews; whitespace check | Final results recorded below. Existing Markdown two-space hard breaks retained; `git -c core.whitespace=-blank-at-eol diff --cached --check` passes. |

**2026-10-17: reviewed; no mapping change.** Domain indexes, canonical state, root Tracker and coverage matrix retain the same educational inventory and approval gates: 68 authored lessons (67 approved, C02 in_review), 20 approved educational Charters, D05 C03–C25 not_started. Implementation, tests of external projects and learner competence receive no new claims. Historical JSON, stdout/manifests, examples and editable/rendered diagrams are byte-preserved. Current Markdown links/commands may differ from hashes captured at their original revisions; those records continue to describe those original revisions.

## Limits and reproducibility

The C02 authoring audit compares exact bytes against an earlier authoring baseline; it is reproduced at its publication revision, as documented in [historical evidence instructions](../repository-layout.md#historical-evidence). Its historical command is not a current-layout preservation check; use the restructuring checker above for this move. No learner evaluation, GitHub-native Mermaid visual review, deployment, fresh dependency install or external project validation is claimed. Production font download succeeded in this environment; future builds retain the existing network requirement from `next/font/google`.

Human evaluation remains **not_run**. Guide preparation and automated checks do not establish acceptance.

## Independent review

## Standards

No hard standards breaches or code-smell findings. Independent reviewer reran preservation and link checks. Restored a mechanically changed Tracker prose label and added local historical-audit instructions.

## Spec

One P2 found and corrected: C02 handoff commands presented a historical byte-comparison audit as current. Current checks now use the restructuring verifier; historical reproduction has a direct isolated-checkout link. Reviewer verified the correction and reports no remaining findings.

Final review: **Standards 0 findings; Spec 0 remaining findings** (one P2 corrected).
