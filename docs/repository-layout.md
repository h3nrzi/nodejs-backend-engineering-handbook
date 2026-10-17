# Repository layout and commands

The Next.js application lives in `app/`, with its App Router in `app/app/` and static assets in `app/public/`. Its dependencies, lockfile, configuration and runtime scripts stay together. `turbopack.root` is the application directory because the separate root visualization package also has a lockfile. There are no npm workspaces or added monorepo tools.

Canonical educational content lives in `handbook/domains/`, `handbook/projects/` and `handbook/tracking/`. Paths in [canonical state](../handbook/tracking/state.json) are relative to the repository root. Approval, curriculum, project and learner-assessment statuses are unchanged by this move.

Shared governance (`AGENTS.md`, `README.md`, `ROADMAP.md`, `TRACKER.md`), `docs/`, `templates/`, `.agents/` and `.github/` remain at the root. The root package/lockfile, `scripts/` and `tools/visuals/` remain together: the visualization wrapper resolves the local renderer, vendored validator and theme from that root.

## Application

From the repository root:

```sh
cd app
npm ci
npm run dev
```

Open <http://localhost:3000>. Stop with Ctrl-C. From the same `app/` directory, run `npm run build`, `npm run lint`, or `npm run start` (after building). The existing starter page and application dependencies are preserved.

## Educational examples and diagrams

From the repository root:

```sh
npm ci --ignore-scripts
node scripts/check-d04.mjs
node handbook/domains/05-api-engineering/examples/c01/contract-traces.mjs
node handbook/domains/05-api-engineering/examples/c01/correctness-boundaries.mjs
node handbook/domains/05-api-engineering/examples/c02/reservation-model.mjs
node handbook/domains/05-api-engineering/examples/c02/boundaries-and-observations.mjs
python3 scripts/check-handbook-links.py
npm run visuals:check -- handbook/domains
npm run visuals:smoke
```

The renderer requires an installed Chrome/Chromium; see [visual tooling](visual-tooling.md). For a disposable export:

```sh
npm run visuals:render -- -i handbook/domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.mmd -o /tmp/handbook-allocation-lifecycle.svg
```

Older standalone example commands beginning `node domains/…` also work from `handbook/`. Root tooling commands (`scripts/…`, `npm run visuals:…`) run from the repository root. No compatibility symlinks are needed.

## Historical evidence

Recorded JSON, stdout, file manifests, diagram sources/exports and example sources retain their original bytes. Old paths and hashes inside recorded evidence describe the revision that produced it; prefix a historical repository-root `domains/`, `projects/` or `tracking/` path with `handbook/` to locate its current file. Markdown navigation and current example commands use the new locations. Git revision expressions such as `8a4fc26:domains/…` retain their historical spelling.

The C02 `evidence/c02/check-authoring.py` is a historical byte-preservation audit of the C02 authoring submission, not a validator of later restructuring. Its exact comparisons intentionally require the original layout and submitted Markdown bytes. To reproduce it, use an isolated checkout of its publication revision:

```sh
git worktree add --detach /tmp/handbook-c02-authoring-98784ab 98784ab
cd /tmp/handbook-c02-authoring-98784ab
python3 domains/05-api-engineering/evidence/c02/check-authoring.py
```

After leaving that directory, remove only that disposable checkout with `git worktree remove /tmp/handbook-c02-authoring-98784ab`. Reproduction does not update historical evidence or establish learner acceptance. Current restructuring verification is recorded in the [verification report](repository-restructure/verification.md) and [hands-on guide](repository-restructure/guide.md).
