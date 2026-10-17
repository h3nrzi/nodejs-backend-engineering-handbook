# D04 — Network & Protocol Engineering

**Status:** content_complete — curriculum, all 18 lessons, six concepts and six Educational Project Charters approved_by_learner on 2026-10-15.
**Authored:** 18 lessons; six approved concepts and six educational Project Charters.
**Educational labs:** 18/18 passed on the recorded environment, including real TLS, HTTP truncation, h2 window, WebSocket and SSE lifecycle cases; **implementation / learner assessment:** not_started / not_assessed.

## Purpose and boundaries

Fourth in the sixteen-domain roadmap, D04 connects D01–D03 foundations to networked backend behavior: endpoint discovery, delivery, trust, framing, HTTP, intermediaries, persistent channels and diagnosis. API product design belongs to D05, comprehensive security to D09, durable distributed delivery to D10–D11 and production operations to D12–D16. No preceding approved artifacts are superseded.

## Prerequisites and intended competencies

Understand D01 OS/resource and state-machine concepts, D02 async/type/runtime boundaries and D03 byte/stream/cleanup mechanics. The [curriculum](curriculum.md) records prerequisites, dependencies, breadth audit and D04-C01–C18 reasoning outcomes.

## Curriculum index

1. [Network paths and addressing](lessons/01-network-paths-and-addressing.md) — D04-C01; approved_by_learner.
2. [DNS and service discovery](lessons/02-dns-and-service-discovery.md) — D04-C02; approved_by_learner.
3. [TCP delivery and connection lifecycle](lessons/03-tcp-delivery-and-connection-lifecycle.md) — D04-C03; approved_by_learner.
4. [Framing and incremental parsers](lessons/04-framing-and-incremental-parsers.md) — D04-C04; approved_by_learner.
5. [UDP, loss and path MTU](lessons/05-udp-loss-and-path-mtu.md) — D04-C05; approved_by_learner.
6. [TLS identity and negotiation](lessons/06-tls-identity-and-negotiation.md) — D04-C06; approved_by_learner.
7. [HTTP semantics and representations](lessons/07-http-semantics-and-representations.md) — D04-C07; approved_by_learner.
8. [HTTP/1.1 framing and server lifetimes](lessons/08-http1-framing-and-server-lifetimes.md) — D04-C08; approved_by_learner.
9. [HTTP clients and connection pools](lessons/09-http-clients-and-connection-pools.md) — D04-C09; approved_by_learner.
10. [Caching, validation and ranges](lessons/10-caching-validation-and-ranges.md) — D04-C10; approved_by_learner.
11. [Proxies, routing and trust boundaries](lessons/11-proxies-routing-and-trust-boundaries.md) — D04-C11; approved_by_learner.
12. [HTTP/2 streams and flow control](lessons/12-http2-streams-and-flow-control.md) — D04-C12; approved_by_learner.
13. [QUIC and HTTP/3 trade-offs](lessons/13-quic-and-http3-trade-offs.md) — D04-C13; approved_by_learner.
14. [WebSocket sessions and control](lessons/14-websocket-sessions-and-control.md) — D04-C14; approved_by_learner.
15. [Server-sent events and resumption](lessons/15-server-sent-events-and-resumption.md) — D04-C15; approved_by_learner.
16. [RPC envelopes and protocol evolution](lessons/16-rpc-envelopes-and-protocol-evolution.md) — D04-C16; approved_by_learner.
17. [Deadlines, retries and uncertain outcomes](lessons/17-deadlines-retries-and-uncertain-outcomes.md) — D04-C17; approved_by_learner.
18. [Network diagnostics and case studies](lessons/18-network-diagnostics-and-case-studies.md) — D04-C18; approved_by_learner.

## Exercises and checkpoints

Each lesson includes a complete executable Node lab, independent exercises with expected results and self-assessment answer rubrics. [Execution evidence](evidence/educational-execution.md) records the exact environment, commands, output and practical gaps. These agent-run labs do not assess the learner or implement portfolio products.

## Valuable project candidates

[Catalog](projects/catalog.md): six distinct approved educational concepts and Charters. Each Charter includes initial in/out/deferred scope, journeys, observable failure challenges and expected learning evidence.

- [D04-P01 — PathWitness](projects/p01-pathwitness-endpoint-incident-evidence-charter.md) — approved_by_learner.
- [D04-P02 — PartnerWire](projects/p02-partnerwire-message-compatibility-workbench-charter.md) — approved_by_learner.
- [D04-P03 — RelayParcel](projects/p03-relayparcel-interrupted-retrieval-charter.md) — approved_by_learner.
- [D04-P04 — OriginProof](projects/p04-originproof-release-interoperability-charter.md) — approved_by_learner.
- [D04-P05 — FieldPulse](projects/p05-fieldpulse-freshness-and-gap-evidence-charter.md) — approved_by_learner.
- [D04-P06 — SessionTrail](projects/p06-sessiontrail-interrupted-assistance-charter.md) — approved_by_learner.

## Coverage gaps and references

[Coverage matrix](../../projects/coverage-matrix.md#d04--approved-editorial-coverage) distinguishes approved direct challenges from supporting knowledge across D04’s six Charters, alongside the 14 D01–D03 approved Charters. Actual DNS wire queries, multi-hop proxy paths, browser CORS/EventSource/WebSocket, genuine QUIC/h3, generated gRPC clients and real impaired-network experiments remain unverified. Local CA/name/ALPN TLS handshakes, h2 stream credit, a Node WebSocket client against a restricted peer, manual SSE cursor exchange/abort, and fixed HTTP range cases now have bounded execution evidence. Full conformance and multi-platform behavior remain unverified. Lessons teach these mechanisms with explicit practice/evidence qualifications.

## Editorial closure and next action

The Product Owner’s explicit approval closes D04’s educational authoring gate. [Approval record](evidence/editorial-approval.md) identifies the verified revision, both resolved blocking findings, evidence limits and scope. [Tracking](../../tracking/state.json) and the [coverage matrix](../../projects/coverage-matrix.md#d04--approved-editorial-coverage) record 66/66 lessons and 20/20 educational Charters approved across D01–D04.

Final PRDs, Module Plans, implementations and learner competency are outside this approval. D05 remains not_started and next in roadmap order; no D05 authoring or project kickoff occurs in this closure. The [review guide](evidence/review-guide.md#closure-record-evaluation) provides an optional recording-accuracy check; its pending observations do not reopen editorial approval.

**Blocking-fix verification — 2026-10-15:** C14 HTTP 426 headers and C18 complete/incomplete/unknown classification are resolved at `612b777`; retained hashes verified and 18/18 educational labs replayed before approval recording. [Scoped historical evidence](evidence/blocking-fixes.md).
