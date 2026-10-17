# Educational visual authoring

Applies to future authorized authoring and revisions. This tooling setup does not reopen D01–D04 or start D05. See the [lesson quality standard](lesson-quality-standard.md) and [tooling setup](visual-tooling.md).

## Choose a visual for a learning question

Include a visual when spatial structure, message order, state transitions, ownership, interleavings or a before/after comparison makes a mechanism easier to reason about. State the question it answers before drawing. Omit it when a sentence, code example or small table explains the concept as clearly. There is no image quota; retain substantive explanations, assumptions, examples and counterexamples in prose.

| Format | Use when | Preserve |
| --- | --- | --- |
| Mermaid | Flowcharts/decisions, protocol sequences, state machines, component/ownership relationships | A fenced `mermaid` block for GitHub-native presentation, or a `.mmd` source beside its exported SVG |
| SVG | Memory ownership, packet/byte layouts, aligned concurrency timelines, or spatial relationships that automatic graph layout obscures | Editable SVG with real text and meaningful groups; retain a generator if it produced the SVG |
| Raster PNG | A conceptual/scientific illustration needs pictorial detail that diagrams cannot convey | Original image, final prompt, tool/date, references, review notes and edit instructions; prompts do not guarantee identical regeneration |

Use measured-data plotting tools for scientific charts. Never invent measurements or turn a bitmap into a claimed vector illustration by placing it inside SVG. Mermaid flowcharts can show illustrative architecture; they must not prescribe an implementation for an educational Charter.

## Sources, paths and presentation

- Keep a small Mermaid diagram inline when the publication target supports it. For portable Markdown or course exports, use a standalone source and SVG in `domains/<domain>/assets/<lesson-slug>/`, referenced from the owning lesson with a relative path such as `../assets/<lesson-slug>/<figure-slug>.svg`. These are future path patterns, not files created by setup.
- Use lowercase hyphenated filenames and stable concept labels. Link the editable source near an exported diagram. If source also appears inline, designate one as canonical and regenerate/synchronize the other in the same change; avoid two independently maintained explanations of the same diagram.
- Prefer ordinary `flowchart`, `sequenceDiagram` and `stateDiagram-v2` syntax. Local Mermaid and GitHub can run different versions; inspect GitHub preview for native fences. Export SVG for targets without Mermaid support. Do not require CDN scripts, remote fonts, icons, or a paid rendering service to read a lesson.
- Start with the fewest entities and edges that answer the question. Split a crowded diagram at a meaningful conceptual boundary; no hard node/image quota. Use left-to-right time for sequences and top-to-bottom decisions where readable. Label arrows with the actual action, ownership relation or condition.

## Labels, colors and legibility

Use the [shared renderer configuration](../tools/visuals/mermaid.config.json) for exports: white background, dark text, restrained blue/neutral fills, Arial/Helvetica/sans-serif, nominal 18px text. Test at the actual reading/print width; enlarge or split rather than shrinking labels. Preserve selectable text, clear arrowheads and whitespace. Check grayscale and both light/dark page surroundings.

Use explicit labels and shapes first. If color adds meaning, use it consistently within a figure and its related figures: blue actors/primary elements, purple control/coordination, gray neutral components, green success, amber pending/warning, red failure. Label the category; never communicate a distinction through color alone. Keep ordinary text contrast at least 4.5:1 against its actual background ([W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). The Handbook's purpose-specific palette takes precedence over optional upstream skill examples, which sometimes color storage red.

## Correctness, captions and accessibility

- Verify every entity, arrow direction, transition guard, sequence/acknowledgment number, unit and invariant against authoritative references or a scoped experiment. Specify runtime/version/platform and CJS/ESM when scheduling claims depend on them. Distinguish causal order from possible timing; parallel lanes do not prove simultaneous execution or fairness.
- Explain the takeaway and limits in a meaningful caption: what the reader should notice, what is omitted, and whether it is conceptual, specified or observed. State when time/space is not to scale. Cite the reference that supports the mechanism. A successful render proves syntax/output, not technical truth or learning.
- Add `accTitle` and `accDescr` to Mermaid. Add `<title>`/`<desc>` and accessible naming to authored SVG. Include informative Markdown alt text for exported images and an adjacent prose description or transition table covering the essential relationships; image metadata alone may not be exposed by every Markdown viewer.
- Define abbreviations, avoid tiny embedded code/text, and retain an equivalent explanation for readers who cannot see the image. Raster labels, counts and scientific relationships need manual verification; image generation or a second model's review does not establish accuracy.

## Validate before handoff

1. Run `npm run visuals:check -- <changed Markdown or .mmd file>` for Mermaid, then export using `npm run visuals:render -- -i <source> -o <output.svg>`. Render PNG if needed for visual inspection. The checker validates syntax with the CLI's default theme; the export command applies the Handbook theme.
2. Open the actual result at its intended size. Check labels, arrows, clipping, contrast and layout, plus the caption and text alternative. For authored SVG, also check XML validity, bounds and accessible naming; exclude scripts, event handlers and remote assets. Inspect raster dimensions and labels at the intended publication size.
3. Check the owning Markdown preview and relative paths (`python3 scripts/check-handbook-links.py`). Preview native Mermaid on GitHub when that is the publishing target; local rendering is supporting evidence only.
4. Retain the source, necessary export, regeneration command/configuration, references and actual verification evidence. Keep discarded variants and smoke-test outputs outside lesson directories. Recheck affected outputs after changing sources or tool versions.

Use only reviewed local diagram content. The renderer is a browser process, not a sandbox for arbitrary diagrams. Keep Mermaid strict security enabled; avoid click handlers, injected HTML, external resources and browser flags that disable the sandbox. Raster generation sends prompts/references to the configured service: use the existing built-in tool when exposed; request approval before adding a paid/key-based fallback.
