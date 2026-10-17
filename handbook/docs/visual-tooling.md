# Educational visualization tooling setup

Prepared 2026-10-15 for the visualization setup request, from clean baseline `bfc19a8fb62706b56f7cd6391cec5b4e41c38c62`. Scope: authoring tools and [visual standards](visual-authoring.md). No approved lessons, domain/project status, coverage mapping, Final PRD or implementation changed; D05 remains not_started. This is not an authoring milestone, so canonical editorial trackers and domain indexes remain unchanged.

## Existing capabilities audited

- User skills: `figma`, `format-code`, `postman-walkthrough`, `ticket-walkthrough`; system skills include `imagegen`, `openai-docs`, `skill-creator`, `skill-installer`, and `review-agent`. Documentation/discovery skills: `context7-mcp`, `find-docs`, `find-skills`. Nine symlinked `understand*` skills support code/design knowledge graphs rather than textbook illustration.
- Session plugin skills already include `visualize` for in-conversation exploration, plus document/PDF/presentation/spreadsheet production and Figma. They do not supply a reproducible repository Mermaid CLI. No duplicate plugins installed.
- Official `imagegen` is installed at `~/.codex/skills/.system/imagegen/SKILL.md`; its built-in image-generation tool is exposed in this session and needs no API key configured by this project. No live raster generation was exercised. Tool exposure is session-dependent; installing a skill alone cannot enable a missing image service. The API CLI fallback needs explicit selection, an API key and approval before integration here; it was not installed or invoked.
- No project-local skills or Node package manifest existed. Three existing D03 lessons contain Mermaid fences. They were inspected for conventions only, not edited or re-rendered as part of setup.
- Host: macOS/darwin arm64, Node `v24.22.0`, npm `11.19.1`, Chrome `155.0.8059.79`. `pnpm`, Yarn, Bun, Python 3 and `gh` are present; global npm packages were only `corepack@0.36.0` and `npm@11.19.1`. No `mmdc`, Graphviz `dot`, D2, PlantUML, Inkscape, `rsvg-convert`, ImageMagick or Poppler `pdftoppm` command was on PATH. Existing Playwright cache and Chrome were present; no new browser installed. Hand-authored SVG needs no specialized authoring dependency.

## Candidate review and selection

Actual upstream `SKILL.md`, README/install instructions, available licenses, file trees and relevant rendering scripts/dependencies were inspected at the commits below. GitHub maintenance observations are repository-level snapshots, not proof that every skill was recently changed. Search/leaderboard listings were discovery aids, not compatibility evidence.

| Candidate and pinned source | License, dependencies and permission/service implications | Decision |
| --- | --- | --- |
| [championswimmer/tech-doc-skills — mermaid-diagrams](https://github.com/championswimmer/tech-doc-skills/tree/860bbf9d483deff584f57b09f85072a7b44bb8f9/skills/mermaid-diagrams), `860bbf9d483deff584f57b09f85072a7b44bb8f9` | MIT. Node + `mmdc`; validator reads requested paths recursively, writes/removes its own OS-temp files and spawns `mmdc` without a shell. Template helper writes stdout. No credential or network calls in either helper. The full plugin bundles unrelated credentialed search MCP services; those manifests/services were excluded. | **Installed only this skill.** Small source (0 stars at audit; last repo commit Aug 17), so popularity offers little assurance. Narrow scope, inspection of both scripts, source hashes and successful local tests support this specific selection; no blanket trust in the bundle. |
| [OpenAI imagegen](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.system/imagegen), reviewed upstream `49f948faa9258a0c61caceaf225e179651397431` | Apache-2.0 skill license. Installed host-managed revision differs from that upstream snapshot; installed manifest SHA-256 `681ddb4ad6d06a2acc78a3535b583f8d0c1ea800ecda3d56370d3310fd2cd4ba`. Built-in tool uses an external image service; explicit API fallback needs Python/OpenAI SDK and `OPENAI_API_KEY`. Prompts/reference images leave the host. | **Retain existing capability; no duplicate install.** Useful for conceptual pictorial illustrations, not exact protocol/state/runtime diagrams. Host-managed files are not pinned or copied into this repo. |
| [Anthropic canvas-design](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/canvas-design), `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | Skill Apache-2.0; bundled fonts carry individual OFL notices. README documents Claude plugin/manual skill loading; the manifest is portable text, but its instructions refer to Claude, font searches/downloads and an unspecified local canvas/PDF/PNG implementation. No required paid service or pinned rendering dependency declared. | **Not installed.** Official, active repo (Oct 9), but artistic philosophy, sparse typography and PNG/PDF-only outputs do not address editable, technically precise textbook figures. Existing image/document tools cover occasional static art. |
| [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill/tree/8646fcc9f74f38539c6cdb4c969723336a96ddcd), `8646fcc9f74f38539c6cdb4c969723336a96ddcd` | No license file or declared repository license found at reviewed tree. Manual `.claude/skills` copy; Python >=3.11, `uv`, `playwright>=1.40.0` and Chromium. Renderer loads an unversioned `https://esm.sh/@excalidraw/excalidraw?bundle`, then evaluates supplied diagram JSON in a page. No API key required; CDN supplies executable code/fonts. | **Deferred.** Useful editable spatial/concurrency diagrams, but license ambiguity, unpinned online rendering, extra dependencies and Claude-specific paths need resolution. Popular (~5k stars); last repo commit Mar 1, so recent maintenance was not established. SVG is sufficient for this setup. |
| [K-Dense scientific-schematics](https://github.com/K-Dense-AI/scientific-agent-skills/tree/a1043ef544e3a100c28e70a736b6cf32554d0677/skills/scientific-schematics), `a1043ef544e3a100c28e70a736b6cf32554d0677` (skill metadata 1.10) | MIT; Python >=3.10, `requests`, network and `OPENROUTER_API_KEY`. `allowed-tools: Read Write Edit Bash` is Claude vocabulary, not a Codex permission boundary. Scripts call OpenRouter for generation/review, read env or `.env`, and persist PNGs/logs. Prompts/images are sent externally; model/credit availability was not qualified. README supports individual skill installation rather than requiring the full bundle. | **Not installed.** Reputable active source (~50k stars; Oct 12), but paid credentialed raster generation duplicates the existing image capability and supplies no vector path. No paid calls or new credentials authorized or used. |

No additional skill was necessary to cover flowcharts, sequences, state machines, network interactions and component boundaries. Memory layouts and aligned concurrency explanations can use authored SVG; scientific illustrations can use the available image tool with factual review. New specialized plotting/animation needs should be evaluated when a concrete lesson requires them.

## Installed artifacts and reproducibility

- One repository skill: [mermaid-diagrams](../.agents/skills/mermaid-diagrams/SKILL.md), copied with the official `skill-installer` helper using `--repo championswimmer/tech-doc-skills --path skills/mermaid-diagrams --ref 860bbf9d483deff584f57b09f85072a7b44bb8f9 --dest .agents/skills --method download`. Vendored files are unchanged. Root upstream MIT license is included; [UPSTREAM.json](../.agents/skills/mermaid-diagrams/UPSTREAM.json) records all ten source/license SHA-256 hashes. A clone already contains the skill; rerunning an installer is unnecessary.
- Local dev tool: `@mermaid-js/mermaid-cli@12.0.0`, resolved `mermaid@12.2.0` and peer `puppeteer@25.14.0`, recorded with integrity hashes in [package-lock.json](../package-lock.json). Node >=22.13.0 is required by the CLI. No global npm packages added.
- Scoped override: the CLI's KaTeX CSS dependency is pinned to `0.18.10`, matching Mermaid's resolved KaTeX, to avoid [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7). CLI source uses this dependency for `katex/dist/katex.css`; ordinary exports and actual KaTeX typesetting with an explicit HTML-label test configuration were checked after overriding. Initial audit reported two low entries (KaTeX and its CLI parent); final audit reports zero. Remove/reconsider the override when upgrading to a CLI with a corrected range.
- [scripts/visuals.mjs](../scripts/visuals.mjs) adds the local `mmdc` to PATH for the unmodified validator and selects an existing browser through `PUPPETEER_EXECUTABLE_PATH`, macOS Chrome/Chromium paths or Linux Chrome/Chromium commands on PATH. It downloads nothing and does not disable the browser sandbox. Other systems can set the executable explicitly; Windows invocation has not been tested.
- [Renderer configuration](../tools/visuals/mermaid.config.json) provides strict security, SVG text labels and the shared light palette. [Smoke checker](../scripts/check-visuals.mjs) is a reusable setup diagnostic; all of its fixture source/output files are written to a fresh OS-temp directory, never into lessons.

Run from the repository root:

```sh
npm ci --ignore-scripts
npm run visuals:smoke
npm run visuals:check -- --self-test-styles
```

`--ignore-scripts` prevents dependency lifecycle scripts and Puppeteer's browser download. Rendering still uses installed package code, so the lockfile and normal package review remain necessary. Installation contacts npm/GitHub; ordinary local diagrams use bundled renderer assets. Browser version and installed fonts are host dependencies, so pixel-identical output across hosts is not promised.

If automatic browser discovery fails, set `PUPPETEER_EXECUTABLE_PATH` to an existing Chrome/Chromium executable in the shell; do not install a browser or weaken its sandbox automatically.

Available commands (replace example paths with actual authoring paths):

```sh
npm run visuals:render -- -i diagram.mmd -o diagram.svg
npm run visuals:render -- -i diagram.mmd -o diagram.png -s 2
npm run visuals:render -- -i source.md -o exported.md
npm run visuals:check -- source.md diagram.mmd
```

Markdown export replaces Mermaid fences with relative SVG links and uses accessible descriptions as alt text. It writes outputs; use a disposable/export directory and keep editable source. `visuals:check` reads requested files and renders temporary SVGs. Its upstream extractor covers conventional triple-backtick fences and `:::mermaid`; it is not a full Markdown parser or accessibility/semantic checker. Four-backtick/tilde fences are outside its documented support. Use the explicit file list rather than scanning every approved domain as a routine setup check.

## Session discovery and limitations

Codex discovers repository skills under `.agents/skills`; use `$mermaid-diagrams` explicitly or ask for a Mermaid diagram. It should be available on the next turn; if absent, restart the session or read the linked manifest explicitly. The [official skill documentation](https://learn.chatgpt.com/docs/build-skills) describes discovery and restart behavior. [AGENTS.md](../AGENTS.md) points future sessions here and to the standards. Use `$imagegen` only when that session exposes its tool; no missing service can be enabled by this repository alone.

GitHub supports Mermaid fences, but its deployed renderer version can differ from the local pin; [GitHub's diagram documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) recommends checking compatibility. Native GitHub preview, future course/PDF export, full screen-reader behavior, Windows/Linux rendering and live raster generation were not tested. The default SVG-text configuration displays dollar-delimited formula labels literally; complex Mermaid math needs an explicit HTML-label configuration and target-specific review of its foreignObject/MathML support. The smoke check uses such a temporary configuration only to verify KaTeX; it does not change the repository default. Prefer adjacent Markdown equations or an intentionally authored SVG for portable figures. There is no scientific-accuracy certification, animation editor or dedicated measured-data plotting stack in this setup.

## Verification evidence

See the dated setup preflight below; hands-on learner evaluation remains separate and pending. No generated demonstration assets are intended for version control. The local handoff guide is `.scratch/acceptance/educational-visualization-setup/guide.md`. The reusable smoke checker is retained so another session can reproduce the examples without relying on temporary files.

Agent preflight on 2026-10-15, using the working tree based on the baseline above:

| Check | Actual result |
| --- | --- |
| Pinned skill installation | Ten vendored source/license files match the recorded SHA-256 values; no local modifications |
| Clean dependency restore | `npm ci --ignore-scripts --no-fund` exited 0; 193 packages installed, 194 audited; no browser downloaded |
| Dependency audit after scoped KaTeX override | `npm audit --json`: zero reported vulnerabilities; a point-in-time registry check, not a guarantee |
| TCP handshake sequence | SVG and PNG exported; PNG 507 × 357; title/description and ordinary no-loss SYN/SYN-ACK/ACK labels present |
| Event-loop scheduling constraint | SVG and PNG exported; PNG 236 × 725; I/O readiness/stack-return/host-dispatch flow; no exact phase/fairness claim |
| Illustrative request state machine | SVG and PNG exported; PNG 451 × 536; valid/invalid and success/failure branches present |
| Markdown | Three fences validated and exported to three resolvable relative SVG image references; no Mermaid fences remain in the portable export |
| Accessible SVG structure | All three diagram SVGs include nonempty title/description and no script/foreignObject; generated SVGs parse as XML |
| Patched KaTeX path | A separate HTML-label/forceLegacyMathML configuration produced `katex-html` typeset content; default SVG-text config intentionally retained |
| Expected refusals | Invalid Markdown diagram exits 1 and reports block 1 near line 3; nonexistent browser override exits 2 |
| Upstream style self-test | Five styled flowchart/sequence/class/state/ER blocks passed after dependency restore |
| Visual inspection | Agent opened the three PNGs; labels/arrows readable, no visible clipping or overlapping elements |
| Repository checks and review | Both authored Node scripts pass syntax checks; 868 internal links resolve with zero issues; whitespace/diff review found no remaining issues; protected lessons/tracking/coverage have no diff |

Final disposable fixture directory for this session: `/var/folders/bp/pmw9frnx1r5b0bm78bz93d6h0000gn/T/handbook-visuals-kvuy9H`. It may expire; `npm run visuals:smoke` recreates the sources and exports in a fresh directory and prints its location. Nothing there is referenced by a lesson. The TCP fixture follows the ordinary open in [RFC 9293 §3.5](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.5); the scheduling fixture illustrates the non-preemption constraint described in [Node's event-loop guide](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick), not a complete runtime model. The request state model is invented for renderer evaluation, not an HTTP/Node contract.

Human evaluation starts `not_run`; automated and agent visual checks do not establish learner acceptance. The initial setup handoff was uncommitted and unpushed; subsequent commit/push status is recorded by Git history.
