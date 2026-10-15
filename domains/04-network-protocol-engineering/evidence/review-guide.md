# D04 — Educational authoring review guide

**Source:** [domain-completion scope](../curriculum.md) and [Workflow V2](../../../docs/workflow.md).
**Prepared:** 2026-10-15. **Current revision:** baseline `86d2ef1176998a4e73e32cf5f502cd163fbf48b6` plus the two C14/C18 blocking fixes; exact source hashes in [manifest](lab-manifest.json). The containing Git commit identifies the delivered fixes. Earlier guide/evidence remains versioned at baseline.
**Human editorial evaluation:** not_run. **Learner competency:** not_assessed.

This guide applies the installed `ticket-walkthrough` workflow to authored educational artifacts. There is no implemented portfolio ticket or product to accept. Its purpose is reproducible editorial review of the curriculum, each lesson, six proposed concepts/Charters and coverage/evidence integrity. Your editorial approval does not establish learner mastery or authorize project implementation.

## Start here

Open [the curriculum](../curriculum.md) in your Markdown viewer and read “Position, prerequisites and purpose,” the eighteen-row inventory and neighboring-domain boundaries. Expected: a coherent D04 sequence from paths/discovery through protocols to diagnosis, with all new content explicitly `in_review`.

For optional local replay, use a terminal in the repository:

```sh
cd /Users/hossein/Projects/mediaforge/nodejs-backend-engineering-handbook
node -p 'JSON.stringify({node:process.version,platform:process.platform,arch:process.arch})'
openssl version
node scripts/check-d04.mjs
python3 scripts/check-handbook-links.py
```

Prerequisites: Node compatible with the documented v24 APIs, Python 3 and Git for the link baseline comparison. Chapter 06 needs an OpenSSL executable supporting the documented EC/addext/x509 options (agent preflight: CLI 3.6.3; Node linked OpenSSL 3.5.8). No npm packages, accounts, credentials or external service configuration are needed. Keys/certificates are generated locally and deleted; no system trust store is changed. Loopback binding must be allowed. Ready signal: `18/18 educational labs passed` and a link report with no current issues. If the local environment differs, retain its identity and actual failure/output; do not assume it reproduces the agent's environment.

Agent preflight: [18/18 actual results and precise limits](educational-execution.md), [stdout](educational-labs.txt), [code hashes](lab-manifest.json). Automated passes support example review only. All user-result cells below remain `not_run`.

## Coverage

| Authoring criterion | Scenario IDs | Scope |
|---|---|---|
| Curriculum breadth, sequence and domain boundary | R01 | Editorial artifact review |
| Every lesson's mechanism, examples, failures, exercises and rubric | L01–L18 individually | Editorial review; optional lab replay |
| Distinct product concepts and six complete solution-neutral Charters | P01–P06 individually | Proposed educational direction |
| Lesson/challenge coverage, honest gaps and status reconciliation | R02 | Matrix/state/index review |
| Reproducible examples and evidence limits | R03 | Local execution and evidence review |
| Editorial approval recorded only on explicit instruction | R04 | Review gate; no implementation acceptance |

## R01 — Curriculum progression

Actor: learner as educational reviewer. Prerequisites: none. Read [curriculum](../curriculum.md) and [index](../README.md). Check whether prerequisite order, backend depth and D05/D09/D10–D16 boundaries are appropriate. Expected: all eighteen chapters exist and each has a distinct reasoning outcome. Refusal/no-effect check: no implied approval, no D05 content, no Final PRD or Module Plan. Keep chapter IDs and requested changes. Agent preflight: inventory/dependency review completed. Your evaluation: **not_run**.

## Lesson scenarios — each is an independent review item

For every row: open the linked chapter; inspect its outcomes, mechanism explanations, worked traces, normal example, counterexample/failure reasoning, exercises, advanced exercise evaluation criteria and references. Use [the chapter audit](educational-execution.md#chapter-by-chapter-technical-audit) to locate what changed. Optionally save its single JavaScript block as the named `lab-NN.mjs` in your own disposable directory and run it, or replay all labs with the supported runner. Expected: the stated bounded observation matches the evidence; unexecuted practice remains labeled. Refusal/no-effect check: no project architecture requirement and no mastery inference. Keep scenario ID, factual corrections and sanitized actual output if replayed. These actions read artifacts and create only disposable local lab state; no later scenario depends on a prior network connection.

| Scenario / chapter | Specific editorial checkpoint | Agent preflight | Your result |
|---|---|---|---|
| [L01 — Network paths and addressing](../lessons/01-network-paths-and-addressing.md) | Address/identity and latency/rate units remain distinct. | Lab pass; scope in evidence | not_run |
| [L02 — DNS and service discovery](../lessons/02-dns-and-service-discovery.md) | OS lookup, DNS answer and actual connection remain distinct. | Lab pass; scope in evidence | not_run |
| [L03 — TCP delivery and connection lifecycle](../lessons/03-tcp-delivery-and-connection-lifecycle.md) | Half-close, RST and idle timeout have distinct ownership; ACK/finish/EOF do not prove product completion. | Lab pass; scope in evidence | not_run |
| [L04 — Framing and incremental parsers](../lessons/04-framing-and-incremental-parsers.md) | 1056 partitions include UTF-8/empty frames; both clean and incomplete EOF are terminal. | Lab pass; scope in evidence | not_run |
| [L05 — UDP, loss and path MTU](../lessons/05-udp-loss-and-path-mtu.md) | Delivered datagram boundaries do not imply reliability. | Lab pass; scope in evidence | not_run |
| [L06 — TLS identity and negotiation](../lessons/06-tls-identity-and-negotiation.md) | CA/name positive and negative handshakes retain verification; synthetic wildcard check is separate. | Lab pass; scope in evidence | not_run |
| [L07 — HTTP semantics and representations](../lessons/07-http-semantics-and-representations.md) | Method, representation, URL and origin semantics remain precise. | Lab pass; scope in evidence | not_run |
| [L08 — HTTP/1.1 framing and server lifetimes](../lessons/08-http1-framing-and-server-lifetimes.md) | Apply framing precedence; distinguish short-length/chunked incompleteness from close-delimited completion. | Lab pass; scope in evidence | not_run |
| [L09 — HTTP clients and connection pools](../lessons/09-http-clients-and-connection-pools.md) | Observe queued abort before transmission, delayed terminal events and body-release reuse. | Lab pass; scope in evidence | not_run |
| [L10 — Caching, validation and ranges](../lessons/10-caching-validation-and-ranges.md) | Fixed 206/200/416 observations support byte/validator reasoning without general range-conformance claims. | Lab pass; scope in evidence | not_run |
| [L11 — Proxies, routing and trust boundaries](../lessons/11-proxies-routing-and-trust-boundaries.md) | Forwarding claims require established trust; model is not a proxy. | Lab pass; scope in evidence | not_run |
| [L12 — HTTP/2 streams and flow control](../lessons/12-http2-streams-and-flow-control.md) | Zero stream credit gates DATA while headers progress; connection credit and GOAWAY remain untested. | Lab pass; scope in evidence | not_run |
| [L13 — QUIC and HTTP/3 trade-offs](../lessons/13-quic-and-http3-trade-offs.md) | QUIC/h3 content does not claim genuine transport execution. | Lab pass; scope in evidence | not_run |
| [L14 — WebSocket sessions and control](../lessons/14-websocket-sessions-and-control.md) | Ordinary HTTP 426 has required Upgrade/Connection fields; actual Node client retains fragmented text, masked pong and clean close; restricted peer is not a full server. | Lab pass; scope in evidence | not_run |
| [L15 — Server-sent events and resumption](../lessons/15-server-sent-events-and-resumption.md) | Bytewise BOM/CRLF/IDs and actual HTTP cursor/abort cases are distinct from EventSource/replay guarantees. | Lab pass; scope in evidence | not_run |
| [L16 — RPC envelopes and protocol evolution](../lessons/16-rpc-envelopes-and-protocol-evolution.md) | Envelope/status model does not claim actual gRPC integration. | Lab pass; scope in evidence | not_run |
| [L17 — Deadlines, retries and uncertain outcomes](../lessons/17-deadlines-retries-and-uncertain-outcomes.md) | AbortSignal after full request receipt preserves observed action; cleanup is not rollback. | Lab pass; scope in evidence | not_run |
| [L18 — Network diagnostics and case studies](../lessons/18-network-diagnostics-and-case-studies.md) | Explicit complete/incomplete differs from missing or invalid completion; observed action/status cannot fill that gap. Short-body diagnosis keeps competing hypotheses. | Lab pass; scope in evidence | not_run |

## Charter scenarios — proposed concepts and full artifacts

For each row, open its Charter from [the catalog](../projects/catalog.md). Review actual user value, initial in/out/deferred scope, all journeys, failure cases, direct/supporting lesson links and expected future learning evidence. Expected: useful differentiated direction with consequential product details still owned by future learner-approved discovery. Refusal/no-effect check: no prescribed framework, storage, queue, architecture, deployment or implementation technology; no project execution or final contract claimed. Keep the project ID and any scope correction. Reviewing one does not select it for implementation or approve the others.

| Scenario | Charter to review | Distinctness checkpoint | Agent preflight | Your result |
|---|---|---|---|---|
| P01 | [PathWitness](../projects/p01-pathwitness-endpoint-incident-evidence-charter.md) | Current incident/path evidence, versus runtime diagnosis or release support. | Template/boundary review completed | not_run |
| P02 | [PartnerWire](../projects/p02-partnerwire-message-compatibility-workbench-charter.md) | Partner wire boundaries, versus data-only schema or package compatibility. | Template/boundary review completed | not_run |
| P03 | [RelayParcel](../projects/p03-relayparcel-interrupted-retrieval-charter.md) | Recipient retrieval continuity, versus intake acceptance/handoff. | Template/boundary review completed | not_run |
| P04 | [OriginProof](../projects/p04-originproof-release-interoperability-charter.md) | Declared release/client/path support, versus P01 incident cause. | Template/boundary review completed | not_run |
| P05 | [FieldPulse](../projects/p05-fieldpulse-freshness-and-gap-evidence-charter.md) | Observation freshness/gaps, versus a generic IoT or subscription platform. | Template/boundary review completed | not_run |
| P06 | [SessionTrail](../projects/p06-sessiontrail-interrupted-assistance-charter.md) | Assistance step/acknowledgment continuity, versus chat or voting. | Template/boundary review completed | not_run |

## R02 — Coverage and tracking integrity

Open [coverage](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review), [state](../../../tracking/state.json) and [tracker](../../../TRACKER.md). Expected: C01–C18 and P01–P06 agree; six Charters and eighteen lessons are in_review; D01–D03 approvals and MediaForge external planning remain intact. Review each direct versus supporting mapping against the real Charter problem, rather than assuming a listed technology is required. Refusal/no-effect: no proposed mapping called approved or implemented. Keep mismatched ID/status/path if any. Agent preflight: reconciliation checked. Your evaluation: **not_run**.

## R03 — Example reproducibility and limits

Run the local replay commands under “Start here,” then compare [evidence](educational-execution.md) and [reference reachability](reference-reachability.json). Expected: local labs complete, known invalid cases are asserted inside the successful labs, links resolve, and pure models remain qualified. Refusal/no-effect: passing the h3/RPC models or restricted TLS/WebSocket/SSE fixtures must not become a claim of full interoperability. If replay fails, preserve Node/OS, chapter ID and sanitized output; dependent reproduction claims remain unresolved while independent reading can continue. Agent preflight: the recorded final run passed. Your evaluation: **not_run**.

## R04 — Editorial decision

After the relevant scenarios, report approval or requested changes using named artifact scope: curriculum, L01–L18, catalog concepts and P01–P06. You may approve a batch explicitly or approve selected items; silence and partial approval do not approve the rest. Expected: only your named approvals are later reflected in tracking. Refusal/no-effect: no project selection, Final PRD, Module Plan, implementation or learner-competence result is inferred. Agent preflight: new approvals remain zero. Your evaluation: **not_run**.

## Results and checkpoint

All R01–R04, L01–L18 and P01–P06 user results are **not_run**. No human observations have been received. Agent preflight supports guide readiness, with [practical limits](educational-execution.md#explicit-practical-limitations) preserved. Full-domain checkpoint: **R01**, still not_run. Current scoped fix checkpoint: **F18** below. Previously prepared scenarios still have no user observations. The chapter audit covers all 18 expanded chapters and notes retained practical gaps. No server remains running and no IDs/credentials are needed. Next safe action: open the curriculum and review its eighteen-row chapter inventory and boundaries, then report a scoped editorial decision or requested change.

## Stop, cleanup and resume

The supported runner exits after its fixtures and removes its temporary extraction directory. Ctrl-C stops a foreground replay; if you independently save a lab, delete only your own temporary file after it exits. There is no external data to reset. Resume by reopening this guide at your first unreviewed scenario; retain observations rather than replacing them with automated passes.

## Outstanding review and integrations

Editorial review is pending for every new artifact. Real multi-host, browser/proxy, mTLS/expiration/resumption, h3, gRPC and impaired-network exercises are unverified and are not prerequisites invented for approval of the authored lessons. Learner practice/assessment is separate and remains deferred/not_assessed. Work stops at this educational review gate.

## Scoped blocking-fix evaluation — F18 and F14

This applies the ticket-walkthrough workflow only to the two authorized fixes. The prior R/L/P user results remain not_run; this update records no human acceptance or new general review. Baseline, exact commands, actual preflight and limitations are in [the fix report](blocking-fixes.md).

| Criterion | Scenario | Agent preflight | User result |
|---|---|---|---|
| Complete, incomplete and unknown response evidence remain distinct; explanation/rubric agree | F18 | 23 cases passed in focused replay and complete suite | not_run |
| HTTP 426 names required protocol and Connection option; no premature switch | F14 | Actual HTTP fields/body/completion/no-upgrade assertions passed; existing WebSocket lifecycle passed | not_run |

**Starting point:** in your Markdown viewer, open [Chapter 18](../lessons/18-network-diagnostics-and-case-studies.md) at “Worked diagnostic record.” For F18, predict the three results for `{ actionObserved: true }`, the same evidence plus `complete: false`, and plus `complete: true`. Expected: action observed/completion unknown, action observed/reply incomplete, and complete HTTP response. Check the function and answer rubric against those predictions. Status 200 alone must still leave completion unknown. Optional replay: save the chapter's sole JavaScript block as `lab-18.mjs` in your own disposable directory and run `node lab-18.mjs`; expected output begins `23 evidence cases` and ends `ok`. Retain your predictions, observations and runtime if replayed.

For F14, open [Chapter 14](../lessons/14-websocket-sessions-and-control.md) and identify the ordinary HTTP response before the 101 path. Expected: 426, Upgrade websocket, Connection options upgrade and close, empty complete body; 426 itself does not switch protocols. Compare the explanation with its RFC links. Optional replay: save its sole block as `lab-14.mjs` in your disposable directory and run `node lab-14.mjs`; expected output confirms the 426 headers and existing 101/text/pong/close cases. This is an actual local fixture, not a browser or full-conformance test. Retain any disagreement with the expected fields or output.

Prerequisites: the recorded Node v24 API line and permitted loopback binding; no accounts, credentials or shared IDs. F18 is a model; F14 owns disposable sockets and exits after cleanup. These two standalone scenarios do not need OpenSSL; the optional complete suite does, as documented above. Stop a foreground replay with Ctrl-C and delete only your saved lab files after exit. Resume at your first unreviewed F scenario; do not replace observations with automated passes.

**Checkpoint:** current scenario F18; agent preflight ready, both user results not_run. First action: predict the three completion classifications above. Product Owner editorial approval remains pending; no approval, portfolio work or D05 activity follows automatically.
