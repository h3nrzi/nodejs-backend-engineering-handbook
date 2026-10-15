# Three-lesson educational visualization pilot

Prepared 2026-10-15. Product Owner request: **Node.js Backend Engineering Handbook — Visual Enhancement Pilot**, in this chat. Baseline: `8a4fc26` (visual tooling setup). Delivered build: the commit containing this report; resolve it with `git log -1 --format=%H -- docs/visual-pilot/review.md`. Source and SVG SHA-256 identities are in [verification.json](verification.json).

**Five new diagrams: two flowcharts and three sequence diagrams.** Only the three authorized lessons receive additions. Their existing prose, examples, exercises, approval labels and D03's existing inline Mermaid diagram are preserved. The new standalone `.mmd` files are canonical; the linked SVGs are local exports, with captions, informative Markdown alternatives and accessible SVG titles/descriptions. **Visual acceptance: pending; learner evaluation: not_run.** This pilot ends here.

## Teaching plan and asset inventory

Paths below are repository-relative through ordinary links; each source sits beside its rendered export.

| ID / location | Learning question and observable outcome | Format and reason | Editable source | Rendered SVG |
| --- | --- | --- | --- | --- |
| V01 — [D03-C03](../../domains/03-nodejs-internals/lessons/03-event-loop-and-io-lifecycle.md), end of §5, after “Neither path moves…” | Trace submission → operation-specific native progress → runtime/loop handling → JavaScript observation; explain why native progress does not run the result handler. Prevent “all async uses a pool/socket” and “the loop runs beside synchronous JS.” | Top-to-bottom dependency flowchart: separate native paths converge with return of JS control; no global scheduling timeline. | [async-io-handoff.mmd](../../domains/03-nodejs-internals/assets/03-event-loop-and-io-lifecycle/async-io-handoff.mmd) | [async-io-handoff.svg](../../domains/03-nodejs-internals/assets/03-event-loop-and-io-lifecycle/async-io-handoff.svg) |
| V02 — [D04-C03](../../domains/04-network-protocol-engineering/lessons/03-tcp-delivery-and-connection-lifecycle.md), end of “First principles” | Follow SYN/SYN-ACK/ACK and calculate the next byte expected in both directions; distinguish transport ACK from application acknowledgment or business completion. | Two-endpoint sequence: makes direction, causal message order and independent sequence spaces visible. | [handshake-and-byte-acknowledgment.mmd](../../domains/04-network-protocol-engineering/assets/03-tcp-delivery-and-connection-lifecycle/handshake-and-byte-acknowledgment.mmd) | [handshake-and-byte-acknowledgment.svg](../../domains/04-network-protocol-engineering/assets/03-tcp-delivery-and-connection-lifecycle/handshake-and-byte-acknowledgment.svg) |
| V03 — D04-C03, “A directional TCP state trace,” before the existing event table | Trace a reply after client FIN, then reverse FIN and TIME_WAIT; contrast orderly shutdown with a separately chosen reset outcome. Prevent “FIN closes both directions,” “reset proves rollback” and “destroy always sends RST.” | Sequence with alternatives: retains the two directions and explicitly makes the outcomes mutually exclusive. | [half-close-and-reset.mmd](../../domains/04-network-protocol-engineering/assets/03-tcp-delivery-and-connection-lifecycle/half-close-and-reset.mmd) | [half-close-and-reset.svg](../../domains/04-network-protocol-engineering/assets/03-tcp-delivery-and-connection-lifecycle/half-close-and-reset.svg) |
| V04 — [D04-C06](../../domains/04-network-protocol-engineering/lessons/06-tls-identity-and-negotiation.md), after the existing four-stage TLS 1.3 explanation and its caveat | Locate ClientHello/SNI/ALPN offers, selected ALPN, certificate/proofs, verification, Finished and encrypted application exchange. Distinguish already-connected TCP from the cryptographic handshake. | Two-endpoint sequence: shows offers versus selected values and handshake protection boundaries without introducing extra actors. | [tls13-server-authenticated-handshake.mmd](../../domains/04-network-protocol-engineering/assets/06-tls-identity-and-negotiation/tls13-server-authenticated-handshake.mmd) | [tls13-server-authenticated-handshake.svg](../../domains/04-network-protocol-engineering/assets/06-tls-identity-and-negotiation/tls13-server-authenticated-handshake.svg) |
| V05 — D04-C06, immediately after V04 and before “Separate trust, name…” | Name the independent chain/validity/usage, expected hostname and handshake-proof checks; explain why a valid protected session can still carry an unauthorized request. | Decision flowchart: verification failure and application refusal are separate exits, rather than steps in a packet trace. | [identity-and-authorization-boundaries.mmd](../../domains/04-network-protocol-engineering/assets/06-tls-identity-and-negotiation/identity-and-authorization-boundaries.mmd) | [identity-and-authorization-boundaries.svg](../../domains/04-network-protocol-engineering/assets/06-tls-identity-and-negotiation/identity-and-authorization-boundaries.svg) |

## Text alone versus the added visual

| Lesson | Existing text teaching, retained in full | What the visual makes easier to see |
| --- | --- | --- |
| D03-C03 | Defines submission, readiness, native completion and JS observation; explains socket/file differences and delayed callbacks. | Operation-specific native paths and the return of JS control converge before loop handling and callback execution. Native progress and JS observation are visibly different boundaries. |
| D04-C03 | Describes the byte-stream contract, directional EOF, Node events, reset, TIME_WAIT and uncertain business outcomes. | The two sequence spaces can be counted; the reverse stream remains usable after client FIN; reset is an alternative transport ending, not an application result. |
| D04-C06 | Explains names, trust, ALPN, the TLS 1.3 stages, negative identity cases and authorization. | Offers, negotiated selections and verification occupy different points; transport, verified TLS and permitted application action have separate success/failure boundaries. |

## Technical assumptions and reference review

- **V01:** A conceptual dependency model for one ordinary JS/event-loop thread, not a phase clock or native instrumentation. Socket readiness/completion varies by platform; the file path represents documented pool-backed async filesystem operations. Both runtime event handling and the ordinary result callback need control returned from JS. No universal callback order, timer schedule, CJS/ESM ordering, fair dispatch or exhaustive async-API taxonomy is implied. [libuv design](https://docs.libuv.org/en/v1.x/design.html), [Node filesystem pool usage](https://nodejs.org/docs/latest-v24.x/api/fs.html#threadpool-usage).
- **V02–V03:** Ordinary active/passive TCP open, invented illustrative sequence numbers, no loss, wraparound, options or simultaneous open/close. ACKs and data may share real segments; omitted reply ACKs are stated in the caption. The client is the active closer on the orderly path. Reset means a valid RST accepted by its peer; the drawing does not define all reset-validation cases. No Node event-order or packet-capture claim. [RFC 9293 §§3.4–3.6](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.4).
- **V04:** Full certificate-authenticated **TLS 1.3 over TCP**, server authentication only, SNI and ALPN offered with a supported selection. No HelloRetryRequest, client certificate, resumption, 0-RTT, ECH or QUIC trace. ServerHello establishes handshake-key context; EncryptedExtensions carries selected ALPN. Certificate, CertificateVerify and Finished have distinct roles. This example waits for both Finished messages before application exchange; TLS 1.3 permits server application data after its own Finished. TLS 1.2 order/extension placement differ. Arrows represent logical messages, not record/packet counts or exact timing. [RFC 8446 §2](https://www.rfc-editor.org/rfc/rfc8446.html#section-2), [ALPN RFC 7301](https://www.rfc-editor.org/rfc/rfc7301.html).
- **V05:** Logical validation boundaries for the same full handshake, not a mandated implementation check order or comprehensive security-policy diagram. Hostname and chain trust are distinct; cryptographic verification is also required. A verified server identity does not authenticate/authorize every application principal. [Service identity RFC 9525](https://www.rfc-editor.org/rfc/rfc9525.html), [TLS authentication RFC 8446 §4.4](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.4).

References were consulted on 2026-10-15. Context7 resolved Node.js to `/nodejs/node` (official/high reputation) for native I/O and loop boundaries; direct libuv documentation cross-checked the retrieved excerpts. Context7 `/mermaid-js/mermaid` and the installed Mermaid configuration declarations informed per-diagram configuration. Existing lesson experiments establish only their asserted API outcomes; diagrams are reference-backed conceptual explanations, not observed wire traces. No substantive technical error was identified in the approved text within this scoped review; no existing claim was rewritten.

## Reproduction and actual validation

Use the repository root with the existing lockfile/dependencies and installed Chrome/Chromium. No packages, skills, browser flags, global trust configuration or renderer configuration were added/changed. On non-macOS hosts set `PUPPETEER_EXECUTABLE_PATH` to an existing browser. The optional evidence harness uses the already-locked Puppeteer and Marked dependencies; it is scoped to these five sources and three lessons.

```sh
npm run visuals:smoke
npm run visuals:check -- --self-test-styles
node docs/visual-pilot/verify.mjs --render --labs --record
```

The last command validates the exact three lesson files and five `.mmd` files with `npm run visuals:check -- <paths>`, exports each source using `npm run visuals:render -- -i <source> -o <SVG>`, and performs the checks below. It saves structured results to `verification.json`, command output to `validation.txt`, and a separate `lab-replay.json`. Temporary previews/screenshots stay outside lesson directories. It checks the existing inline D03 Mermaid fence as well as all five new diagrams. Re-running with `--record` refreshes evidence; omit that flag for a check without overwriting retained evidence. Omit `--labs` to reuse the separately identified prior replay without claiming another execution.

| Check | Actual result / evidence |
| --- | --- |
| Tooling preflight, before lesson edits | `npm run visuals:smoke`: PASS (three fixture renders, Markdown export, KaTeX, invalid-source and missing-browser refusals). `npm run visuals:check -- --self-test-styles`: 5/5 styled blocks passed. |
| Mermaid syntax | Six blocks passed across eight targets: the existing D03 fence plus five standalone sources; D04 lessons use ordinary SVG links. [Command transcript](validation.txt). |
| SVG output and accessibility | 5/5 parse as XML; each has title, description and ARIA association, no scripts, event handlers, embedded images, foreignObject or remote assets. Source/SVG hashes and bounds are retained in [verification.json](verification.json). |
| Legibility/bounds | Actual SVGs inspected at laptop reading-column width 720 px and mobile width 360 px. No text outside the rendered SVG bounds; minimum scaled text meets the pilot's 12 px mobile floor. Foreground contrast against the diagram's pale surfaces exceeds 4.5:1. Per-figure measurements below and in verification evidence. |
| Local Markdown image/caption preview | Actual Markdown parsed locally with Marked and loaded in Chrome; all five image paths resolve with informative alt text and fit the 360 px reading column. Full-size SVG and canonical source links remain adjacent. This is not GitHub's renderer or a screen-reader audit. |
| Link integrity | `python3 scripts/check-handbook-links.py`: exit 0, no new issues; pre-existing debt is reported separately, not silently fixed. Exact counts in [validation.txt](validation.txt). |
| Existing educational execution | D04 canonical runner 18/18 processes passed, including TCP half-close/RST/timeout and TLS verified/name-mismatch/untrusted-CA cases. D03: 7/7 timer/I/O/ref/unref scenarios with event/causal assertions passed, including the expected ENOENT exit 1. [Separate lab replay](lab-replay.json) records commands, stdout, runtime and date. No packet captures, all-version conformance or learner practice are claimed. |
| Preservation and scope review | Every original line and fenced example survives in order; five additions supplement approved text. Protected tracking/index/coverage/Charter paths are unchanged from baseline. Git whitespace check passed. |

Runtime: Node `v24.22.0`, V8 `13.6.233.17-node.57`, libuv `1.52.1`, Node-linked OpenSSL `3.5.8`, macOS/darwin arm64. External OpenSSL CLI `3.6.3`; browser `Chrome/155.0.8059.79`. CLI `12.0.0`, Mermaid `12.2.0`, Puppeteer `25.14.0`, shared [configuration](../../tools/visuals/mermaid.config.json). This environment is an observation, not a runtime requirement for future portfolio projects.

## Visual inspection findings

Final diagram inspection checks ordering, arrow direction, text, whitespace, clipping and laptop/mobile legibility. White diagram surfaces were also checked against dark page surroundings and in grayscale; labels/edge text convey distinctions without relying on color. Mobile reading uses vertical scrolling and offers a full-size SVG link for zoom.

| Figure | Finding |
| --- | --- |
| V01 | JS return and both native notification paths converge before loop dispatch. No overlapping connectors or clipped labels; increased type size preserves mobile readability. |
| V02 | SYN consumes sequence space; cumulative byte ACK arithmetic is correct in both directions. Two lifelines and separate business-completion note remain clear when scaled. |
| V03 | Alternative frame separates orderly and reset paths. The reply arrow remains after client FIN; TIME_WAIT belongs to the active closer. No clipped alternative labels or note boxes. |
| V04 | Client/server direction, protected-handshake boundary and selected ALPN are legible. Shortened labels and explicit 18 px sequence text preserve mobile clarity; the adjacent caption states the permitted earlier server-data variant. |
| V05 | Verification rejection and application refusal are different labeled branches. All required checks are listed; tall vertical layout keeps the text readable without widening the page. |

Draft validation exposed Mermaid sequence semicolons being parsed as statement separators; labels now use commas. The pinned sequence renderer uses the top-level `fontSize` for actor/note/message text; per-source frontmatter sets it to 18, with narrower outer margins. Setting only individual sequence font options did not change the measured output. A first draft had text below the mobile floor; label/type/layout adjustments fixed it. No new package, global tooling defect or unresolved render failure was found. SVGs retain shared strict security, local fonts and editable sources. Browser/font differences can change layout; cross-host pixel identity, GitHub-native Mermaid preview and full assistive-technology behavior remain untested.


| Figure | Minimum text at 360 px | Minimum text contrast |
| --- | --- | --- |
| V01 | 13.04 px | 16.12:1 |
| V02 | 14.90 px | 11.01:1 |
| V03 | 15.03 px | 11.01:1 |
| V04 | 13.85 px | 11.01:1 |
| V05 | 14.21 px | 14.52:1 |

## Tracking reconciliation and scope review

Reviewed [canonical state](../../tracking/state.json), [tracker](../../TRACKER.md), [D03 index](../../domains/03-nodejs-internals/README.md), [D04 index](../../domains/04-network-protocol-engineering/README.md), [coverage matrix](../../projects/coverage-matrix.md), relevant lesson execution evidence and mapped Charters. **2026-10-15: reviewed; no mapping change.** D03-C03, D04-C03 and D04-C06 retain their competency IDs, prerequisites, chapter order and direct/supporting challenge mappings. No Charter audience/scope, educational approval, implementation evidence or assessment changed. Totals remain 66 approved lessons and 20 approved educational Charters; D05 remains `not_started` and MediaForge's implementation/tests remain unverified.

The request limits changes to the named lessons, their directly related assets and this review package. Reconciliation is recorded here without editing canonical trackers/indexes or reopening their editorial gates. Approval labels refer to the previously accepted educational text; they do not establish acceptance of these newly added visuals.

## Handoff and scaling recommendation

The [hands-on guide](guide.md) covers the five figures, accessibility/text equivalence, reproducibility and preserved-content boundary. Agent checks support review; human scenario results remain `not_run`. Commit locally on `visuals/three-lesson-pilot`; push is not performed because no explicit push authorization was supplied.

After explicit Product Owner visual acceptance, scale across D01–D04 in small topic batches: identify a learning question and misconception first, choose the simplest editable representation, preserve approved text, qualify protocol/runtime assumptions, keep paired source/SVG assets, inspect at 720/360 px, and retain exact validation and separate human outcomes. Reuse the shared theme and this evidence pattern; do not impose a figure quota. Settle mobile reading and publication-preview expectations during this pilot before expanding. No other lesson or D05 work is authorized by this package.
