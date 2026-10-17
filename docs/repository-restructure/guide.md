# Repository restructuring — hands-on evaluation

Source: the repository restructuring request in this session. Baseline `aa3114ff357fd297a95f6a3fe32382abc3a2bb53`; evaluate the commit containing this guide. Prepared 2026-10-17. Human evaluation: **not_run**.

## Start here

Actor for every scenario: repository owner/reviewer. Work in `/Users/hossein/Projects/nodejs-backend-engineering-handbook`. Node/npm, Python 3 and Chrome/Chromium are required. No accounts, credentials or external project data are needed. Installed dependencies are ready; on a fresh clone run `npm ci --ignore-scripts` at root and `npm ci` in `app/`.

First concrete action, in a terminal at the repository root:

```sh
cd app
npm run dev -- --hostname 127.0.0.1 --port 3100
```

When the terminal says **Ready**, open <http://127.0.0.1:3100>. Expect the existing Next.js starter page headed “To get started, edit the page.tsx file.” Agent preflight passed; the preflight server is stopped before handoff so this port is available.

## Coverage and scenarios

All user results start `not_run`. Retain terminal results and any unexpected visible behavior without secrets.

| Scenario | Criterion | Exact actions and expected result | Agent preflight | User result |
| --- | --- | --- | --- | --- |
| R01 | App path, App Router and assets | Start the server above. Inspect the starter page; open `/next.svg` and `/restructure-missing`. Expect an SVG and a 404 respectively; no learning-platform features appear. Stop with Ctrl-C. | pass | not_run |
| R02 | Production build and tooling | From `app/`, run `npm run build` then `npm run lint`. Expect exit 0, the `/` and `/_not-found` routes and no ambiguous-root warning. This writes only ignored generated output. | pass | not_run |
| R03 | Canonical content and navigation | Open [root README](../../README.md), follow D05 → C02 → diagram source/SVG, canonical state and coverage links. Open a D04 Charter from its domain index. Expect all links to resolve under `handbook/`, with shared governance links returning to root `docs/`. | pass: automated links; local diagram inspected | not_run |
| R04 | Example commands | From repository root, run `node scripts/check-d04.mjs`, then `node handbook/domains/05-api-engineering/examples/c02/reservation-model.mjs`. Expect 18/18 labs and model assertions to pass. The other three commands are listed in [layout instructions](../repository-layout.md#educational-examples-and-diagrams). No real booking or network provider is modified. | pass: 18 labs and all four examples | not_run |
| R05 | Mermaid validation and export | From root run `npm run visuals:check -- handbook/domains`. Then run the export command below and open `/tmp/handbook-allocation-lifecycle-review.svg`. Expect held → confirmed/released/expired and confirmed → cancelled, with legible labels and no clipping. Existing tracked assets are untouched. | pass: 79 blocks; SVG/PNG render inspected | not_run |
| R06 | Preservation, approvals, evidence and scope | From root run `python3 docs/repository-restructure/check-preservation.py` and `python3 scripts/check-handbook-links.py`. Expect 341 moved files verified and zero link issues. Inspect [state](../../handbook/tracking/state.json), [Tracker](../../TRACKER.md) and [coverage](../../handbook/projects/coverage-matrix.md): C02 stays in_review; later chapters remain unstarted; no new project implementation claims. Use `git show --stat --oneline HEAD` to inspect the published restructuring scope. | pass | not_run |
| R07 | Historical evidence reproduction | Follow [isolated-checkout instructions](../repository-layout.md#historical-evidence) only if you want to reproduce the old C02 authoring audit. Expect the original 274 protected-file result. Use the dedicated checkout because original byte comparisons intentionally predate restructuring. | pass at `98784ab` | not_run |

R05 export, from repository root:

```sh
npm run visuals:render -- -i handbook/domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.mmd -o /tmp/handbook-allocation-lifecycle-review.svg
```

## Evidence and checkpoint

[Verification report](verification.md) and [preflight outputs](preflight.json) retain automated evidence separately from these user observations. Current scenario: **R01 not started**. All scenarios are independent after stopping R01's server. No identities, revisions or mutable application records need to be carried between them. Known limitations: no deployment or learner assessment; historical audits use original checkouts; local rendering does not qualify GitHub's Mermaid renderer.

Next safe action: start R01 using the exact command above and report whether the starter page and images appear.

## Stop, clean up and resume

Stop the development server with Ctrl-C. Remove only your disposable `/tmp/handbook-allocation-lifecycle-review.svg` if desired. Historical worktree cleanup is in the linked instructions. Keep this guide and its user results; resume any unrun scenario from the stated working directory. Generated `.next/` and dependency directories are ignored. Automated passes do not complete human acceptance; every user scenario remains pending until you report observations.
