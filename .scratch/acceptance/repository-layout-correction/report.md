# Repository layout correction

Source: user request “Repository Layout Correction — Separate Matt Workspace, Next.js and Handbook”, 2026-10-17. Fixed clean baseline: `c30b3e0125155e1928c9c378f2372b3dd11f726f` on `main`, initially equal to `origin/main`. No staged, modified or untracked user work existed. Ignored app caches/dependencies, Handbook `.DS_Store`, and the existing visualization dependencies were inventoried; no broad cleanup was performed.

## Resulting ownership

```text
repository/
├── AGENTS.md                      shared project routing
├── README.md                      workspace orientation
├── .agents/skills/                38 unchanged Matt skills
│   └── mermaid-diagrams -> ../../handbook/.agents/skills/mermaid-diagrams
├── skills-lock.json               unchanged Matt install metadata
├── .github/pull_request_template.md  neutral project routing
├── docs/README.md                 reserved for future Matt workflows
├── .scratch/acceptance/repository-layout-correction/  this migration's evidence
├── app/                           unchanged Next.js project
│   ├── AGENTS.md
│   ├── app/                       existing App Router
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── ...                        existing configs and files
└── handbook/
    ├── AGENTS.md
    ├── README.md
    ├── ROADMAP.md
    ├── TRACKER.md
    ├── .nvmrc                     Node 24 for archived replay harness
    ├── .gitignore                 generated Python cache only
    ├── .agents/skills/mermaid-diagrams/  unchanged pinned vendor
    ├── .github/pull_request_template.md  original Handbook checklist
    ├── .scratch/acceptance/educational-visualization-setup/  original guide
    ├── domains/                   existing 68 lessons, assets, examples, evidence
    ├── projects/                  existing catalogs, coverage and registry
    ├── tracking/                  existing state; active paths project-relative
    ├── docs/                      Handbook docs and exact historical records
    ├── scripts/                   authoring/validation tools
    ├── templates/
    ├── tools/visuals/
    ├── package.json               exact existing visualization package
    └── package-lock.json          exact existing lockfile
```

The existing root `.gitignore` remains shared. Generated dependencies stay ignored in each project; there is no root `node_modules/` after consolidation. No workspace manager or monorepo framework was introduced.

All **102 relocated tracked files** are listed individually with original SHA-256 values in [moves.json](moves.json). [before.json](before.json) records all **548** baseline file hashes. All existing `handbook/domains/`, `handbook/projects/` and `handbook/tracking/` files keep their locations. Git rename detection and the independent fixed-revision checker distinguish moves from edits.

[skills.json](skills.json) records the purpose, source, ownership and decision for **every installed skill individually**. All 38 Matt skills are general workflow capabilities and remain unchanged at root, including superficially educational names such as `teach` and `scaffold-exercises`. Mermaid was separately installed for Handbook rendering: its 11 vendored/provenance files move unchanged, all ten upstream content hashes match, and its root symlink preserves the discoverable name and supporting resources. No shared skill was reconfigured, reinstalled or invoked to start a workflow. Filesystem discovery from root reads all 38 Matt manifests; next-session UI selector enumeration is left to human evaluation.

No Matt issue-tracker configuration existed before migration. None was invented. Root `docs/` contains only its orientation file and is available for future `docs/agents/`, ADRs and planning. The educational tracker and workflow rules now apply only inside the Handbook.

## Necessary compatibility edits

- Root AGENTS/README route to each sibling; the original Handbook guidance and editorial safeguards move to `handbook/AGENTS.md`.
- Active Markdown destinations and executable example commands use the new project-relative paths. Domain indexes, coverage, tracker and state were reconciled for paths only. Approval statuses, all progress fields, educational prose, example code and diagrams retain their content.
- Canonical state paths resolve from `handbook/`. Its `history` array stays exactly as before; historical records keep their original paths. The checker handles semicolon-separated historical evidence references and validates anchors.
- The D04 runner changes only its relative domain lookup. Visualization wrappers resolve their unchanged local package, theme and vendored validator within `handbook/` without needing root dependencies.
- The active link checker validates current workspace navigation and tracking paths, resolves frozen historical links via the fixed migration map, and distinguishes pre-existing debt. It does not rewrite historical sources. The fixed-baseline preservation checker fails for historical byte changes or non-path changes to educational Markdown.
- A new example entry point runs the unchanged historical D01–D03 replay harnesses without `--record`, all D04 labs and the existing D05 examples. A Node 26 attempt exposed its removal of `--experimental-transform-types`; Node 24 passes. `.nvmrc` selects Node 24 and unsupported runtimes get a clear exit-2 prerequisite message. No dependency or engine range was changed.
- The original Handbook PR checklist is retained inside Handbook, with a neutral root PR template pointing to it.

Historical audits, visual plans, recorded results, approval evidence, example sources, diagram sources/exports and the prior migration checker remain byte-identical. Some historical commands deliberately require their publication checkout; [current commands and reproduction instructions](../../../handbook/docs/repository-layout.md) explain this boundary. No historical success was recast as a new verification.

## Actual validation

Validation ran on the baseline plus this correction's uncommitted working tree, before commit. The app install/lint/build used the Handbook-independent application package. The broad educational replay used the installed Node v24.22.0 on darwin arm64; the initial Handbook shell resolved Node v26.4.0, which passed Mermaid tooling but refused the historical transform flag. npm was 11.19.1; the existing macOS Chrome was reused.

| Working directory | Command | Actual outcome |
| --- | --- | --- |
| `app/` | `npm ci` | exit 0; 358 packages added; 5 high-severity advisories in existing dependencies; no dependency edits |
| `app/` | `npm run lint` | exit 0 |
| `app/` | `npm run build` | exit 0; Next 16.4.2, compilation/TypeScript/static generation pass; `/` and `/_not-found` generated |
| `handbook/` | `npm ci --ignore-scripts --no-fund` | exit 0; 193 packages added; zero reported vulnerabilities; no lockfile edits |
| `handbook/`, Node 24 | `node scripts/check-examples.mjs` | exit 0; D01 6/6, D02 16/16, D03 79/79 across 18 chapters, D04 18/18; four D05 programs pass, including C02's 720 finite combinations |
| `handbook/` | `npm run visuals:check -- domains` | exit 0; 79 blocks across 216 targets |
| `handbook/` | `npm run visuals:check -- --self-test-styles` | exit 0; five colored diagram styles |
| `handbook/` | `npm run visuals:smoke` | exit 0; SVG/PNG fixtures, Markdown, math and refusal tests pass; all three PNGs visually inspected |
| `handbook/` | `python3 scripts/check-handbook-links.py` | exit 0; 1,986 internal links checked, including 725 frozen historical references; zero current issues and zero tracking issues |
| root | `python3 .scratch/acceptance/repository-layout-correction/check-preservation.py` | exit 0; 548 baseline files accounted for; 102 relocated; 511 byte-identical; 93 historical files and 17 app files byte-identical; 31 Markdown path-only edits, one state path-only edit, one D04 path edit, four reviewed guidance/checker changes; 38 Matt skills unchanged/discoverable, ten Mermaid upstream hashes match |

Raw educational and rendering results, final link and preservation outputs, and command summaries are retained alongside this report. Temporary smoke artifacts remain outside the repository for visual evaluation. Read [preflight.json](preflight.json) for completed final results and artifact locations.

## Review and limits

The [pre-commit review](review.md) records the implementing agent’s self-review and its limits. Review checks current ownership against the request, scoped agent guidance, Git rename/content diffs, all fixed-baseline bytes and active path resolution. The only source changes outside deterministic path transformations are current layout guidance and the active link checker; added runners/evidence support this migration. There is no application development, Wayfinder, Product Discovery, lesson authoring or approval change. No learner competence or human acceptance is inferred from automated checks. Existing app dependency advisories are reported without expanding this restructuring into dependency remediation.

Human evaluation remains `not_run`; use the [guide](guide.md). Commit and push occur only after the final checks and review pass. Any publication result is reported in the chat; evidence does not predict a commit SHA before it exists.
