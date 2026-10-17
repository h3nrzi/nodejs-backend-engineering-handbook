# Handbook layout and commands

The shared repository root owns Matt skills, workflow configuration and planning.
`app/` and `handbook/` are independent sibling projects with their own package,
lockfile and AGENTS.md. There is no root package, npm workspace or monorepo framework.
The application's App Router is in `app/app/`; its existing `turbopack.root` remains
its application directory.

The Handbook owns `domains/`, `projects/`, `tracking/`, `docs/`, `scripts/`,
`templates/`, `tools/`, `ROADMAP.md`, `TRACKER.md` and its visualization package.
Paths in [canonical state](../tracking/state.json) are relative to **handbook/**.
Editorial decisions, curriculum, coverage and progress values are unchanged.

## Application

From the shared repository root:

```sh
cd app
npm ci
npm run lint
npm run build
npm run dev
```

Open <http://localhost:3000>. Stop with Ctrl-C. `npm run start` serves a completed
production build from the same directory. Read [application guidance](../../app/AGENTS.md).

## Educational examples and diagrams

From the shared repository root:

```sh
cd handbook
nvm use
npm ci --ignore-scripts
node scripts/check-examples.mjs
python3 scripts/check-handbook-links.py
npm run visuals:check -- domains
npm run visuals:check -- --self-test-styles
npm run visuals:smoke
```

Use Node 24 (selected by `.nvmrc`; `nvm use` applies when using nvm). Other Node
managers can select Node 24 equivalently. Node 26 removed the transform flag used
by the historical D01 harness; the runner reports this prerequisite with exit 2.
The visualization package's existing engine constraint and lockfile are unchanged.

The example runner reuses historical D01–D03 harnesses without rewriting them,
runs all 18 D04 labs and the four D05 C01/C02 example programs. These are bounded
educational checks, not complete exercise coverage, application tests or learner assessment.
The renderer requires an installed Chrome/Chromium; set
`PUPPETEER_EXECUTABLE_PATH` if it is outside the auto-detected locations.

For a disposable export, still from `handbook/`:

```sh
npm run visuals:render -- -i domains/05-api-engineering/assets/02-resources-operations-and-workflows/allocation-lifecycle.mmd -o /tmp/handbook-allocation-lifecycle.svg
```

The pinned Mermaid skill lives at `.agents/skills/mermaid-diagrams/` within the
Handbook. A root `.agents/skills/mermaid-diagrams` symlink keeps root discovery
working. All 38 shared Matt skills and `skills-lock.json` remain unchanged at root.

## Historical evidence

Dated audits, `docs/visual-*` records (including the original tooling audit),
`docs/repository-restructure/`, domain `evidence/` and the original local acceptance
guide retain their exact bytes. Their commands, paths, results and hashes describe
the revision that produced them. They are not current-layout instructions. Use
the commands above for current checks; the link checker reports historical links
separately and resolves their original targets through the migration map.

Before the first relocation, repository-root `domains/`, `projects/` and `tracking/`
became `handbook/domains/`, `handbook/projects/` and `handbook/tracking/`.
With this correction the remaining Handbook root files move inside `handbook/`.
Historical Git expressions retain their original spelling. Never rewrite records
or approval evidence to make old commands look current.

For example, reproduce the C02 authoring audit in an isolated historical checkout:

```sh
git worktree add --detach /tmp/handbook-c02-authoring-98784ab 98784ab
cd /tmp/handbook-c02-authoring-98784ab
python3 domains/05-api-engineering/evidence/c02/check-authoring.py
```

After leaving that directory, remove only that disposable checkout with
`git worktree remove /tmp/handbook-c02-authoring-98784ab`.
Other historical harnesses which compare Git paths or published bytes likewise
belong in their publication checkout. The active example runner executes only
their replay assertions without `--record`, retaining the archived evidence.

Current relocation checks and actual results are in the
[correction report](../../.scratch/acceptance/repository-layout-correction/report.md)
and [evaluation guide](../../.scratch/acceptance/repository-layout-correction/guide.md).
