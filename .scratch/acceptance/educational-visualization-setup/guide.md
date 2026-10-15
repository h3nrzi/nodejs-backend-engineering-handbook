# Educational visualization tooling — hands-on evaluation

Source: user's Educational Visualization Skills Setup request, 2026-10-15.
Build: visualization setup based on `bfc19a8fb62706b56f7cd6391cec5b4e41c38c62`, including the local skill, package/lock, rendering helpers/config, standards/setup docs and AGENTS link. Preflight ran on these changes before commit; use Git history for the resulting commit. Human evaluation: `not_run`.

## Start here

Actor: repository author, in a Terminal at `/Users/hossein/Projects/nodejs-backend-engineering-handbook`.
Prerequisites: Node >=22.13, npm, existing Chrome/Chromium. This host has Node v24.22.0, npm 11.19.1 and Chrome 155.0.8059.79; dependencies are already installed. No account or key is needed for local diagrams.

First action:

```sh
npm run visuals:smoke
```

Expected: a new `Disposable output:` directory, dimensions for three PNGs, successful Markdown/math/refusal checks and `PASS`. Keep the printed directory path. This smoke diagnostic supports evaluation; the direct authoring commands below exercise the actual tools.

If starting from a fresh clone, first run `npm ci --ignore-scripts`; this skips lifecycle scripts/browser downloads. Browser auto-detection covers macOS Chrome/Chromium and common Linux commands; other locations need `PUPPETEER_EXECUTABLE_PATH`. No server is left running.

For this session, the already-preflighted directory is:

```sh
VISUAL_REVIEW_DIR='/var/folders/bp/pmw9frnx1r5b0bm78bz93d6h0000gn/T/handbook-visuals-kvuy9H'
```

Use that assignment while these files exist. To evaluate your fresh smoke run instead, set the variable to the exact path printed after `Disposable output:`. Do not point it at lesson assets. All scenarios below use only that disposable directory.

## Coverage

| Request criterion | Scenario | Agent evidence / limits |
| --- | --- | --- |
| Minimal compatible skills, provenance and discovery | V1 | One pinned local skill; ten source/license hashes match; next-turn selector discovery not exercised |
| Supporting tools and reproducible installation | V2 | Clean `npm ci --ignore-scripts --no-fund` passed, existing Chrome reused; zero final audit vulnerabilities |
| TCP, scheduling, state-machine render/file output | V3 | Three SVG + three PNG exports, PNGs visually inspected; no lessons touched |
| Markdown and accessibility structure | V4 | Three fences checked/exported; relative links resolve; SVG titles/descriptions present; no native GitHub or screen-reader run |
| Validation and useful failure reporting | V5 | Invalid fence reports block 1 near line 3, exits 1; missing browser exits 2 |
| Standards, missing capabilities and future use | V6 | Standards/setup records complete; image tool exposed but no live raster generation or scientific-accuracy claim |

## V1 — Find and invoke the skill

Read [AGENTS](../../../AGENTS.md), the local [skill](../../../.agents/skills/mermaid-diagrams/SKILL.md), its [pin and hashes](../../../.agents/skills/mermaid-diagrams/UPSTREAM.json), and the [setup audit](../../../docs/visual-tooling.md).

In the next Codex turn/session from this repository, invoke `$mermaid-diagrams` and ask it to inspect the temporary TCP diagram using repository conventions, keeping lessons unchanged. If the selector does not show it, restart Codex or ask it to read the linked manifest explicitly.

Expected: the agent finds the local manifest and uses the installed local renderer/checker. It should not install the full upstream plugin, credentialed search services, or another global skill. Retain the observed skill name/path. Agent preflight: file installation and helper execution passed; selector discovery `not_run`. Your evaluation: `not_run`.

## V2 — Confirm dependencies

```sh
node --version
npm ls @mermaid-js/mermaid-cli mermaid puppeteer katex
npm audit
```

Expected: CLI 12.0.0, Mermaid 12.2.0, Puppeteer 25.14.0 and KaTeX 0.18.10. At setup time audit reported zero vulnerabilities; later advisories may change that result. A fresh-clone `npm ci --ignore-scripts` should restore the lock without downloading a browser. Retain versions/output, not credentials. Agent preflight: pass on this macOS host; other OSes not tested. Your evaluation: `not_run`.

## V3 — Render and inspect the three editable examples

Prerequisite: `VISUAL_REVIEW_DIR` refers to an existing smoke output directory.

```sh
npm run visuals:render -- -i "$VISUAL_REVIEW_DIR/tcp-handshake.mmd" -o "$VISUAL_REVIEW_DIR/tcp-review.svg"
npm run visuals:render -- -i "$VISUAL_REVIEW_DIR/event-loop-scheduling.mmd" -o "$VISUAL_REVIEW_DIR/scheduling-review.png" -s 2
npm run visuals:render -- -i "$VISUAL_REVIEW_DIR/request-lifecycle.mmd" -o "$VISUAL_REVIEW_DIR/state-review.svg"
open "$VISUAL_REVIEW_DIR"
```

Open the exported review files and original PNGs in a browser/Preview. Expected: TCP arrows point client→server, server→client, client→server with SYN/SYN-ACK/ACK sequence numbers; scheduling shows an I/O callback waiting for the current JS stack/host dispatch; state machine separates rejection, processing, success and failure. Text must be legible and free of clipping/overlap. The TCP example excludes loss/options/data; scheduling is not a phase ordering; request states are illustrative rather than a Node/HTTP contract. Compare source text to output and keep any concrete rendering defect. Agent preflight: pass for initial SVG/PNG exports and visual inspection. Your evaluation: `not_run`.

## V4 — Use Markdown and accessible descriptions

```sh
npm run visuals:check -- "$VISUAL_REVIEW_DIR/source.md"
npm run visuals:render -- -i "$VISUAL_REVIEW_DIR/source.md" -o "$VISUAL_REVIEW_DIR/review-export.md"
```

Open `review-export.md` in a Markdown preview. Expected: all three diagrams display via relative SVG image links; descriptive alt text and image title derive from the accessible directives. Read source/alt text and verify it explains the main relationships/limits without depending on color. Open an SVG as text to find its title and description.

GitHub-native Mermaid preview and a screen reader were not preflighted. They require separate viewer checks when publishing a real lesson; no upload/push is necessary for this setup evaluation. Agent preflight: pass for CLI fence validation, conversion, relative paths, SVG metadata and XML parsing. Your evaluation: `not_run`.

## V5 — Observe validation failures

```sh
npm run visuals:check -- "$VISUAL_REVIEW_DIR/invalid.md"
PUPPETEER_EXECUTABLE_PATH="$VISUAL_REVIEW_DIR/missing-browser" npm run visuals:check -- "$VISUAL_REVIEW_DIR/source.md"
```

Expected: first command exits 1 with block 1 near line 3 and a parse error; second exits 2 with an instruction to set an installed Chrome/Chromium executable. Neither installs software, changes source files, or disables the browser sandbox. The environment assignment affects only that command; subsequent normal render commands should still work. Retain sanitized error output. Agent preflight: both expected refusals passed. Your evaluation: `not_run`.

## V6 — Review authoring boundaries and limits

Read [visual standards](../../../docs/visual-authoring.md) and [tooling limitations](../../../docs/visual-tooling.md#session-discovery-and-limitations). Expected: purpose-driven diagram choice with no image quota, preserved sources, captions/alternatives, relative paths, technical review and explicit tool limitations. Check that approved lessons/statuses and D05 remain untouched:

```sh
git diff -- domains tracking/state.json TRACKER.md projects/coverage-matrix.md
```

Expected: no output. `imagegen` is already installed and its built-in tool was exposed, but live raster generation, account quotas and scientific accuracy are not verified. Do not add a key/paid fallback as part of this evaluation. Math test uses a separate temporary HTML-label config; portable default remains SVG text. Agent preflight: documentation and protected-path review passed. Your evaluation: `not_run`.

## Results and checkpoint

| Scenario | Agent preflight | User result |
| --- | --- | --- |
| V1 | Files/helpers pass; selector not_run | not_run |
| V2 | pass | not_run |
| V3 | pass, visual inspection included | not_run |
| V4 | pass locally; GitHub/screen-reader not_run | not_run |
| V5 | pass for expected refusals | not_run |
| V6 | pass for records/boundaries; live raster not_run | not_run |

Current scenario: not started. Next safe action: run `npm run visuals:smoke` from the repo root and retain the printed path and final summary. No known local rendering failures remain. Report observations by scenario; automated passes do not mark human acceptance.

Stop: Ctrl-C if a command is running; there is no persistent server. Cleanup: remove only the exact `handbook-visuals-*` directory printed by your own run once you have retained observations; do not use a broad wildcard. Agent preflight artifacts are left available for review. Resume: rerun smoke to create fresh fixtures if temporary files expired, set `VISUAL_REVIEW_DIR` from the printed output, then continue with the next unrun scenario. This guide is local evaluation evidence; generated demo files remain outside the repository.
