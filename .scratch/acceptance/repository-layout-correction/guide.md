# Layout correction: hands-on evaluation

Ticket: user's “Repository Layout Correction — Separate Matt Workspace, Next.js and Handbook”, 2026-10-17. Baseline `c30b3e0125155e1928c9c378f2372b3dd11f726f` plus the correction described in [report.md](report.md). All user results begin `not_run`; the agent's preflight is supporting evidence, not human acceptance.

## Starting point

Actor: repository owner in a Terminal. The local clone is `/Users/hossein/Projects/nodejs-backend-engineering-handbook`; both dependency installs and production build were preflighted. Node 24, npm, Python 3 and existing Chrome/Chromium are required for the complete Handbook checks. For nvm, `nvm use` inside `handbook/` selects its `.nvmrc`; an equivalent Node 24 selection works with other managers. No credentials are required for these local scenarios.

First concrete action:

```sh
cd /Users/hossein/Projects/nodejs-backend-engineering-handbook
ls -a
```

Expected: sibling `app/` and `handbook/`, root `.agents/`, `skills-lock.json`, `docs/` and concise AGENTS/README. Root has no `package.json`, `package-lock.json`, educational TRACKER/ROADMAP or authoring `scripts/`, `templates/`, `tools/`.

## Coverage and observations

| Scenario | Features / request criteria | Agent preflight | User result |
| --- | --- | --- | --- |
| L1 | ownership inspection; minimal shared root; sibling projects; scoped guidance; free root docs | mapped all baseline files; see report and moves inventory | not_run |
| L2 | independent Next.js install/lint/production build and existing page | commands pass; app bytes unchanged | not_run |
| L3 | complete Handbook package/tools; examples; active links/tracking paths | examples pass; zero Markdown/tracking issues | not_run |
| L4 | Mermaid render, validation, smoke and useful refusals | all checks pass; three PNGs visually inspected; location in preflight | not_run |
| L5 | each skill's ownership; Matt discovery at root; local Mermaid discovery | manifests/provenance hashes match; selector interaction not_run | not_run |
| L6 | lesson/evidence/approval/progress preservation; Git history/hash proof; no user work loss | fixed-baseline checker passes, inventories retained | not_run |

## L1 — Navigate each scope

After the first action, read [root guidance](../../../AGENTS.md), [app guidance](../../../app/AGENTS.md) and [Handbook guidance](../../../handbook/AGENTS.md). Open `docs/` and `handbook/docs/` in your file browser/editor.

Expected: root routes to each project without imposing Handbook editorial rules on app work. Root docs holds its workspace orientation only; all historical educational docs live inside Handbook. Verify the [reported tree](report.md#resulting-ownership) and [move list](moves.json). No commands in this scenario change files. Retain a concrete unexpected path if any.

## L2 — Use the application independently

From the root, in a new Terminal:

```sh
cd app
npm ci
npm run lint
npm run build
npm run start -- --port 3100
```

Expected: install/lint/build exit 0. The install may report the five advisories recorded in preflight; this task changes no dependencies. Open <http://localhost:3100> and confirm the existing Next.js starter page appears. The App Router remains `app/app/`. Stop with Ctrl-C before continuing. If port 3100 is already occupied, stop here and select an unused local port; do not terminate an unrelated process.

This scenario refreshes only application dependencies/build output and starts a local server; it does not change Handbook files. UI evaluation is pending even though the production build passed. Retain the command result and visible page observation.

## L3 — Use the Handbook independently

In a Terminal at the repository root:

```sh
cd handbook
nvm use
node --version
npm ci --ignore-scripts
node scripts/check-examples.mjs
python3 scripts/check-handbook-links.py
```

Expected: Node v24, all eight educational entry points pass (D01 6, D02 16, D03 79, D04 18 and four D05 programs), zero new Markdown issues and zero tracking path issues. The checker reports frozen historical navigation separately. No new educational approval or learner-assessment claim is created. Commands run from Handbook without a root package or root dependencies. Example fixtures are disposable and clean themselves up; historical evidence is not overwritten.

Read current [Handbook commands](../../../handbook/docs/repository-layout.md), open a domain index, follow a lesson's diagram/source links and return via tracking/coverage navigation. Expected: local destinations resolve. Historical evidence retains old paths and is explained by the current layout guide. Retain any failing command/link and its source location.

## L4 — Render and inspect a disposable diagram

From `handbook/`, with existing Chrome/Chromium:

```sh
npm run visuals:check -- domains
npm run visuals:check -- --self-test-styles
npm run visuals:smoke
```

Expected: 79 blocks across 216 targets; five style tests; then three PNG/SVG fixtures, Markdown export, math and refusal checks pass. Copy the exact `Disposable output:` path printed by smoke. Open that directory in Finder or your editor and inspect `tcp-handshake.png`, `event-loop-scheduling.png`, `request-lifecycle.png` and `export.md`.

Expected: readable, unclipped labels, meaningful arrows/state transitions and local images in Markdown. To exercise direct rendering, set `VISUAL_REVIEW_DIR` to that exact printed directory, then run:

```sh
npm run visuals:render -- -i "$VISUAL_REVIEW_DIR/tcp-handshake.mmd" -o "$VISUAL_REVIEW_DIR/tcp-review.svg"
npm run visuals:check -- "$VISUAL_REVIEW_DIR/invalid.md"
PUPPETEER_EXECUTABLE_PATH="$VISUAL_REVIEW_DIR/missing-browser" npm run visuals:check -- "$VISUAL_REVIEW_DIR/source.md"
```

Expected: render succeeds; the invalid diagram exits 1 with its block/line; the missing browser exits 2 with useful configuration guidance. Both refusals are intentional. No source or dependency change is expected. Local rendering does not prove GitHub-native or screen-reader presentation.

## L5 — Discover shared skills

Return to the repository root. Read the per-entry [skill inventory](skills.json). In a fresh Codex session rooted here, inspect the available skills or explicitly reference `.agents/skills/codebase-design/SKILL.md` and `.agents/skills/mermaid-diagrams/SKILL.md` with a read-only request to identify their source paths. Do not invoke Wayfinder, Product Discovery, setup or an implementation workflow.

Expected: 38 Matt manifests are discoverable at their original root locations, and Mermaid resolves through the root symlink to the Handbook-owned vendor. Handbook commands use its local copy. Report any missing selector entry separately from a missing filesystem manifest; the agent verified filesystem discovery and exact bytes but did not exercise next-session selector UI.

## L6 — Audit preservation

From the repository root:

```sh
python3 .scratch/acceptance/repository-layout-correction/check-preservation.py
git log -3 --oneline
```

Expected: all 548 baseline files accounted for, 102 relocations, 511 byte-identical files, all 93 historical files and 17 app files unchanged; approved teaching content changes only in paths. Approval/progress values and the state history remain unchanged. The checker verifies all 38 Matt skills and ten Mermaid upstream hashes. Compare [before.json](before.json), [moves.json](moves.json) and [preservation.json](preservation.json) with Git's migration commit. Git may choose a rename similarity threshold; the SHA-256 inventory is the independent source.

No source mutations occur. Historical paths and publication-checkout instructions are expected in old evidence; do not rewrite records to make their commands current. Retain any exact mismatch and stop dependent assertions if one is found.

Implementation checks and the [pre-commit review](review.md) are complete. These scenarios remain a separate human evaluation.

## Checkpoint, cleanup and resume

Current scenario: L1 not started. Next safe action: run the first `cd`/`ls -a` commands above and report whether ownership matches. Evaluation environment: local clone; no actors/accounts, IDs or secrets. Agent preflight commands/results and smoke directory are in [preflight.json](preflight.json). Known limits: app dependency advisories; Node 24 required for archived TypeScript replay; UI/selector checks pending. No dependent publication or product workflow is started by this guide.

Stop a server with Ctrl-C. Cleanup only the exact disposable `handbook-visuals-*` directory printed by your smoke run after saving observations; avoid wildcard cleanup. Keep repository evidence. No server is left running by agent checks. Resume at the first `not_run` scenario; if temporary artifacts expired, rerun smoke. Report pass/fail/blocked per scenario with observed output. Automated checks do not establish human acceptance and human evaluation is not an extra implementation gate.
