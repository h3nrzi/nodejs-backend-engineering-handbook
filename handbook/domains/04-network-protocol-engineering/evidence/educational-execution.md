# D04 educational execution and technical review evidence

> Historical technical evidence from before editorial approval. Statuses and counts below describe that run. The Product Owner subsequently approved D04’s educational authoring gate on 2026-10-15; see the [current approval record](editorial-approval.md). Retained lab inputs and outputs are unchanged.

**Date:** 2026-10-15. **Editorial:** in_review for curriculum, all 18 lessons, catalog and six Charters. **Learner editorial evaluation / competency:** not_run / not_assessed. **Portfolio implementation:** not_started.

## Current blocking-fix verification

The two independent-review blocking findings in C14/C18 are now corrected and locally verified; see [the scoped fix report](blocking-fixes.md) for exact commands, current results, source identity and limits. D04 remains in_review, with Product Owner editorial approval pending. The [manifest](lab-manifest.json), [stdout](educational-labs.txt) and [link report](internal-links.json) now describe this replay. The deep-review narrative below records the earlier expansion at `86d2ef1`; its original evidence remains in that commit and is not a new general review.

## Revision and review scope

Deep-review baseline: `713e05b199750d775ad6e71fd595bd6c6df91196` (first D04 authoring commit). Historical tested/delivered revision: `86d2ef1176998a4e73e32cf5f502cd163fbf48b6`. Its original manifest, execution output and review record remain versioned at that commit; the current manifest/output describe the later scoped blocking fixes linked above. The first-session pre-authoring baseline was `088d956494b23545c80fdac72c1adab14fd14cad`.

Review covered Workflow V2, lesson quality/evidence/quality-gate rules, the curriculum, all 18 lessons/labs, catalog and six Charters, tracking and coverage. Relevant D01 state-machine, D02 cancellation and D03 byte/stream/shutdown material informed prerequisite and ownership checks; none of those approved artifacts was edited. Existing chapter order and D04-C01–C18 identifiers remain appropriate and unchanged.

For each chapter, the audit checked protocol terminology and mechanism, first-principles progression, failure/edge cases, Node versus specification claims, worked examples/counterexamples, diagnosis, exercises/evaluation criteria and primary references. All 18 chapters received substantive explanatory additions and an advanced reasoning exercise with explicit evaluation criteria. Nine lab blocks were upgraded (03/04/06/08/09/10/12/14/15); 17 now uses actual AbortSignal cancellation, and 18 corrects missing-evidence classification. This is educational authoring and agent execution, not portfolio implementation or learner practice.

## Chapter-by-chapter technical audit

| Chapter / competency | Substantive weakness found | Improvement and practical qualification |
|---|---|---|
| [01 / C01](../lessons/01-network-paths-and-addressing.md) | Layers were described but not followed through termination; BDP lacked a constraining-window example. | Five-stage endpoint/identity trace; NAT versus proxy, IPv6 scope, accept/admission distinction; 100 Mbit/s × 80 ms BDP and 64 KiB-flight calculation. Advanced namespace incident rubric. Lab remains loopback/address/arithmetic, not routing evidence. |
| [02 / C02](../lessons/02-dns-and-service-discovery.md) | Cache ownership and candidate-attempt cleanup needed deeper incident reasoning. | Multi-cache/pooled-connection timeline; CNAME/negative-cache and DNSSEC trust boundaries; hypothesis table and loser-attempt ownership. Numeric lookup/cache/family models remain explicitly distinct from wire DNS or Happy Eyeballs execution. |
| [03 / C03](../lessons/03-tcp-delivery-and-connection-lifecycle.md) | Half-close-only lab left reset/timeout ownership unobserved; close-state diagnosis was shallow. | Directional state/event table, sequence/ACK/FIN explanation, CLOSE_WAIT versus TIME_WAIT diagnosis; actual half-close, explicit RST/ECONNRESET and idle-notification-without-close fixtures. No packet capture, real loss, drain pressure or tuning claim. |
| [04 / C04](../lessons/04-framing-and-incremental-parsers.md) | Parser accepted input after EOF, including after incomplete EOF; only one ASCII fixture. | Terminal ended/failed states, explicit per-push input/output limits, bytewise UTF-8 trace and 1056 partitions across two fixtures; bounds/partial-EOF negatives. Added invalid-input batching caveat: valid-stream partition invariance does not prove identical partial-result exposure after failure. No production parser/fuzzing claim. |
| [05 / C05](../lessons/05-udp-loss-and-path-mtu.md) | MTU and gap explanations lacked numeric/sequence examples. | Derived conditional 1232-byte IPv6/UDP payload budget, qualified fragment-loss arithmetic, restart/reorder/duplicate timeline and connected-UDP distinction. Lab remains one actual datagram plus gap model; no wire impairment or PMTU discovery. |
| [06 / C06](../lessons/06-tls-identity-and-negotiation.md) | Synthetic hostname matcher could not exercise the main handshake/trust outcomes. | TLS 1.3 handshake-stage explanation; disposable CA and signed SAN leaf; real verified TLS/ALPN reply and separate wrong-name/untrusted-CA refusals. Runtime matcher versus RFC 9525 distinction retained. No expiration, revocation, mTLS, resumption or provider qualification. |
| [07 / C07](../lessons/07-http-semantics-and-representations.md) | Redirect/replay and encoding boundaries lacked worked multi-stage examples. | 202-to-later-rejection trace, 303/307/308 and historical 301/302 distinctions, representation/coding/framing table, decompression bounds and stale If-Match update example. URL/octet lab does not verify browser/CORS/decompression behavior. |
| [08 / C08](../lessons/08-http1-framing-and-server-lifetimes.md) | Framing overview omitted an explicit precedence table; incomplete-body exercise had no execution. | HEAD/status/CONNECT/TE/length/close precedence and precise TE+CL handling; actual malformed request refusal plus short Content-Length, unfinished chunked and close-delimited responses. Node completion/error/consumption distinguished. No proxy parser-agreement/security certification. |
| [09 / C09](../lessons/09-http-clients-and-connection-pools.md) | Sequential reuse alone did not expose queue ownership/cancellation. | Held response, queued request abort, consumed release and reused complete 404; actual handler/socket counts. Documents delayed queued-request terminal events observed on this runtime and why cleanup must avoid circular waits. Fetch pools, stale races and fairness remain untested. |
| [10 / C10](../lessons/10-caching-validation-and-ranges.md) | Cache age, weak/strong preconditions and resume metadata needed concrete cases; lab only exact-tag 304. | Age arithmetic, comparison/method outcomes and version/coding/offset resume table; actual fixed 206, stale If-Range full 200 and unsatisfied 416 alongside 304. Explicitly scripted cases, not a general range/cache/CDN implementation. |
| [11 / C11](../lessons/11-proxies-routing-and-trust-boundaries.md) | Trust model lacked a multi-hop walk and important translation/lifetime cases. | Two-hop 504 uncertainty, trusted-segment interpretation, Forwarded grammar caveats, h2 TE exception, chunked reframing, CONNECT/Upgrade/head ownership and streaming diagnosis exercise. Lab remains a model, not an authenticated proxy. |
| [12 / C12](../lessons/12-http2-streams-and-flow-control.md) | Two addressed streams did not test flow control or cancellation. | Stream/connection credit arithmetic, negative settings-adjusted window reasoning, GOAWAY/REFUSED_STREAM/CANCEL distinctions. Actual zero stream receive credit gates DATA while header-only stream completes; settings increase releases body; separate CANCEL observed at server. No connection-window exhaustion, TLS h2 or GOAWAY replay. |
| [13 / C13](../lessons/13-quic-and-http3-trade-offs.md) | Ordering model was honest but protocol treatment needed packet/credit/handshake detail. | Packet-number versus stream-offset recovery, MAX_DATA/MAX_STREAM_DATA/MAX_STREAMS, anti-amplification, migration/path validation and QPACK dependency analysis; advanced paper trace. No QUIC/h3 execution or native-runtime capability qualification; model remains labelled model. |
| [14 / C14](../lessons/14-websocket-sessions-and-control.md) | Hash/XOR calculations did not exercise a WebSocket lifecycle. | Actual Node WebSocket client against restricted loopback upgrade peer; 101, fragmented text with interleaved ping/masked pong and clean 1000 close; ordinary HTTP 426. Added reserved-code, UTF-8 and compression boundaries. Peer is a short-control fixture, not a full server; browser/TLS/reconnect/malformed-frame paths unverified. |
| [15 / C15](../lessons/15-server-sent-events-and-resumption.md) | LF-only whole-text split did not exercise streaming HTTP, ID state or disconnect cleanup. | Bytewise streaming UTF-8/BOM/CRLF/LF, ID-only cursor, NUL/invalid-retry and empty-data cases; actual HTTP event 7, incomplete tail, manual Last-Event-ID replay to 8 and abort/producer cleanup. No EventSource scheduling, browser/CORS/proxy or durable replay claims. |
| [16 / C16](../lessons/16-rpc-envelopes-and-protocol-evolution.md) | Envelope/status model lacked a complete protocol trace and semantic compatibility counterexamples. | Exact gRPC envelope bytes, trailers-only/missing-final-status, compression and partial-stream explanation; enum/presence/number/rewriter compatibility table and old/new matrix rubric. Lab remains opaque envelope/status model; no gRPC/protobuf/trailer integration. |
| [17 / C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md) | Explicit destroy model did not exercise supported signal cancellation or complete-request causal boundary. | Full request receipt before action barrier, actual HTTP AbortSignal and server response-close cleanup; shared budget/cleanup reserve arithmetic, outcome table and retry-key/replayability boundaries. Action is an in-memory counter; no durability, real timer race, retry or rollback result. |
| [18 / C18](../lessons/18-network-diagnostics-and-case-studies.md) | `!e.connected` turned absent evidence into a connection failure; incident examples lacked a numeric evidence record. | Explicit `connected === false`; empty object remains insufficient evidence. Added 200/4096-declared/2048-received timeline, competing-cause table, contradictory-evidence handling and a two-fixture diagnostic exercise. Model is not a root-cause collector or production incident proof. |

## Executed environment, commands and results

- Working directory: `/Users/hossein/Projects/mediaforge/nodejs-backend-engineering-handbook`.
- Node `v24.22.0`; V8 `13.6.233.17-node.57`; libuv `1.52.1`; Node-linked OpenSSL `3.5.8`; nghttp2 `1.70.0`; Undici `7.29.1`.
- Host macOS 26.1 / Darwin 25.1.0, build 25B78; `darwin` / `arm64`; standalone ESM child entries. Node global WebSocket was available; EventSource was undefined in the unflagged process. No flags were added and no EventSource integration was inferred.
- Separate OpenSSL **CLI** `3.6.3` (9 Jun 2026), used only for local CA/leaf generation. This differs from Node's linked TLS library. Exact executable arguments are retained in Chapter 06's executed block. EC P-256 keys, two-day certificates and explicit SAN/extensions are disposable fixtures; neither keys nor a global trust installation are retained.
- Unchanged runner: one child per lesson, ten-second process ceiling, 128 KiB output ceiling, disposable extraction directory. Socket fixtures bind IPv4 loopback with OS-assigned ports. Actual failure-path cleanup runs inside fixtures; forced child termination is a final bound and does not establish that every `finally` would run on a kill.

Exact replay/check commands:

```sh
cd /Users/hossein/Projects/mediaforge/nodejs-backend-engineering-handbook
node --version
node -p 'JSON.stringify(process.versions)'
uname -a
sw_vers
openssl version
node scripts/check-d04.mjs > handbook/domains/04-network-protocol-engineering/evidence/educational-labs.txt 2>&1
python3 scripts/check-handbook-links.py > handbook/domains/04-network-protocol-engineering/evidence/internal-links.json
python3 -m json.tool handbook/tracking/state.json > /dev/null
git diff --check
```

**Retained complete run: 18/18 educational lab processes passed**, runner exit 0; [exact stdout](educational-labs.txt), [code hashes/environment](lab-manifest.json), [runner](../../../../scripts/check-d04.mjs). The chapter audit above names each executed scope, including pure models. Counts are processes, not portfolio application tests, learner exercises or full protocol implementations.

Expected failures are asserted *inside* successful labs: RST/ECONNRESET; oversize/output/input/EOF terminal refusal; trusted-chain wrong name and untrusted CA; HTTP ambiguous request rejection and short-length/missing-zero-chunk body errors; queued ABORT_ERR; 416 unsatisfied fixed range; h2 CANCEL reset; and action-before-client ABORT_ERR. HTTP 404/416 and ordinary HTTP 426 are complete protocol responses, not child-process failures. Actual Node error codes are runtime-qualified observations.

Development evidence: the first expanded suite was **17/18** because C09 reached the ten-second ceiling while awaiting the queued abort error before releasing the occupied response. Releasing/consuming that independently owned response before awaiting terminal events corrected the circular wait; the subsequent complete suite passed. The final retained run includes the later range cases, BOM-at-ID parser fixture and independent invalid-retry/bare-CR/empty-ID/event-type assertions. No production timeout race or performance threshold is inferred from those controlled observations.

## Reference review and specification/runtime boundaries

Context7 resolved Node.js to `/websites/nodejs_latest-v24_x_api` (official v24 line, high source reputation). Scoped queries checked net timeout/reset/half-close; TLS SNI/name/CA/ALPN; HTTP ownership/limits/completeness; h2 stream/session windows and closure; and WebSocket/EventSource availability. Direct official v24 JSON documents for net, TLS, HTTP, HTTP/2, globals and DNS were fetched as a cross-check. One indexed WebSocket result incorrectly labelled its stability experimental; the direct globals history states non-experimental since v22.4.0, and the local global was observed. No feature from an evolving version-line document was assumed present solely from a search snippet.

Primary sources were checked for HTTP/1.1 body precedence/TE+CL and incompleteness (RFC 9112), h2 flow/shutdown (RFC 9113), TLS handshake/identity (RFC 8446/9525), QUIC transport/loss/QPACK (RFC 9000/9002/9204), WebSocket frames/control (RFC 6455), WHATWG SSE ID/dispatch/line rules, and gRPC/Protocol Buffers wire/evolution guidance. Lessons link the relevant specifications and distinguish normative rules from documented Node behavior and this host's observations. QUIC analysis was not promoted to experimental verification.

[Reference reachability](reference-reachability.json) retains first-session results/errors and a separate deep-review check of newly introduced external URLs. Reachability is not content accuracy or conformance. The gRPC GitHub HTML open failed through the web tool during this review; the official raw protocol document was used as a fallback. Evolving documents were consulted on 2026-10-15; no commercial provider is qualified.

## Charter review and coverage reconciliation

All six Charters retain distinct users/value, initial boundaries, observable failures and solution neutrality. No consequential product policy, architecture, Final PRD or Module Plan was authored.

| Charter | Finding / correction |
|---|---|
| P01 PathWitness | Incident/path evidence remains distinct from runtime inspection and release review; no correction needed. |
| P02 PartnerWire | Clarified that sanitizing/re-encoding creates derived sample evidence; original-retention policy remains open. |
| P03 RelayParcel | Distinguished representation integrity from publisher authenticity; verification authority remains discovery work. |
| P04 OriginProof | Distinguished unsupported tooling, unrun combination and failed negotiation; optional mapped protocols are not mandated implementations. |
| P05 FieldPulse | Distinguished age since receipt from age since measurement under sender-clock uncertainty. |
| P06 SessionTrail | Distinguished instruction receipt acknowledgment from evidence of performing an instruction; meaning/wording remain discovery questions. |

Reviewed curriculum, domain index, catalog, coverage matrix and trackers: **no competency identifier, chapter sequence, direct/supporting mapping, project audience or scope change**. Practical gap descriptions were refreshed. Totals remain 66 authored lessons (48 approved, 18 in_review) and 20 Charters (14 approved, six in_review). All D01–D03 domain records/files, D05–D16 records and MediaForge external planning state remain unchanged. No learner approval, implementation, application-test acceptance or mastery is inferred.

[Authoring checks](authoring-checks.json) record section/ID/count/status, JSON and hash verification, prior-record preservation and diff review. [Internal links](internal-links.json) record the actual repository-wide destination/anchor check. These checks support author review; section presence does not certify teaching quality. Source/diff review checked fixture ownership, bounds, expected negatives, prose/code agreement, and Charter neutrality before handoff.

## Explicit practical limitations

Still unexecuted: actual DNS wire/family racing; routing/NAT captures; real loss/congestion/PMTU or TCP drain pressure; TLS expiration/revocation/mTLS/resumption/early data; authenticated multi-hop proxy paths and parser differentials; browser CORS/WebSocket/EventSource and actual intermediary buffering; HTTP/2 connection-window exhaustion, TLS h2 and GOAWAY replay; genuine QUIC/HTTP/3; generated gRPC/protobuf and real final trailers; broad range/cache/compression/CDN interoperability; broad parser fuzzing, security-conformance, load or multi-platform tests. TypeScript modeling exercises have no compiler verification. Suggested extension exercises remain unrun unless explicitly listed above.

No authored chapter or Charter is missing. The remaining gaps are practical scope limits and later specializations, not silently passed requirements. D04 is ready for **learner editorial review**, with these limits visible; it is not approved or closed. [The existing review guide](review-guide.md) has complete R01–R04/L01–L18/P01–P06 coverage, actual agent preflight and separate user results, all **not_run**. First learner action: review the curriculum's chapter inventory and neighboring-domain boundaries (R01). Do not start D05 or a portfolio implementation; wait for explicit learner approval before closing D04.
