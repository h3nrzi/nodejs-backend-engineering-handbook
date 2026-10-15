# D04 — Network & Protocol Engineering

**Status:** in_review — technically reviewed and expanded educational draft awaiting learner approval.
**Authored:** 18 lessons; six proposed concepts and six educational Project Charters.
**Educational labs:** 18/18 passed on the recorded environment, including real TLS, HTTP truncation, h2 window, WebSocket and SSE lifecycle cases; **implementation / learner assessment:** not_started / not_assessed.

## Purpose and boundaries

Fourth in the sixteen-domain roadmap, D04 connects D01–D03 foundations to networked backend behavior: endpoint discovery, delivery, trust, framing, HTTP, intermediaries, persistent channels and diagnosis. API product design belongs to D05, comprehensive security to D09, durable distributed delivery to D10–D11 and production operations to D12–D16. No preceding approved artifacts are superseded.

## Prerequisites and intended competencies

Understand D01 OS/resource and state-machine concepts, D02 async/type/runtime boundaries and D03 byte/stream/cleanup mechanics. The [curriculum](curriculum.md) records prerequisites, dependencies, breadth audit and D04-C01–C18 reasoning outcomes.

## Curriculum index

1. [Network paths and addressing](lessons/01-network-paths-and-addressing.md) — D04-C01; in_review.
2. [DNS and service discovery](lessons/02-dns-and-service-discovery.md) — D04-C02; in_review.
3. [TCP delivery and connection lifecycle](lessons/03-tcp-delivery-and-connection-lifecycle.md) — D04-C03; in_review.
4. [Framing and incremental parsers](lessons/04-framing-and-incremental-parsers.md) — D04-C04; in_review.
5. [UDP, loss and path MTU](lessons/05-udp-loss-and-path-mtu.md) — D04-C05; in_review.
6. [TLS identity and negotiation](lessons/06-tls-identity-and-negotiation.md) — D04-C06; in_review.
7. [HTTP semantics and representations](lessons/07-http-semantics-and-representations.md) — D04-C07; in_review.
8. [HTTP/1.1 framing and server lifetimes](lessons/08-http1-framing-and-server-lifetimes.md) — D04-C08; in_review.
9. [HTTP clients and connection pools](lessons/09-http-clients-and-connection-pools.md) — D04-C09; in_review.
10. [Caching, validation and ranges](lessons/10-caching-validation-and-ranges.md) — D04-C10; in_review.
11. [Proxies, routing and trust boundaries](lessons/11-proxies-routing-and-trust-boundaries.md) — D04-C11; in_review.
12. [HTTP/2 streams and flow control](lessons/12-http2-streams-and-flow-control.md) — D04-C12; in_review.
13. [QUIC and HTTP/3 trade-offs](lessons/13-quic-and-http3-trade-offs.md) — D04-C13; in_review.
14. [WebSocket sessions and control](lessons/14-websocket-sessions-and-control.md) — D04-C14; in_review.
15. [Server-sent events and resumption](lessons/15-server-sent-events-and-resumption.md) — D04-C15; in_review.
16. [RPC envelopes and protocol evolution](lessons/16-rpc-envelopes-and-protocol-evolution.md) — D04-C16; in_review.
17. [Deadlines, retries and uncertain outcomes](lessons/17-deadlines-retries-and-uncertain-outcomes.md) — D04-C17; in_review.
18. [Network diagnostics and case studies](lessons/18-network-diagnostics-and-case-studies.md) — D04-C18; in_review.

## Exercises and checkpoints

Each lesson includes a complete executable Node lab, independent exercises with expected results and self-assessment answer rubrics. [Execution evidence](evidence/educational-execution.md) records the exact environment, commands, output and practical gaps. These agent-run labs do not assess the learner or implement portfolio products.

## Valuable project candidates

[Catalog](projects/catalog.md): six distinct proposed concepts, all in_review. Each Charter includes initial in/out/deferred scope, journeys, observable failure challenges and expected learning evidence.

- [D04-P01 — PathWitness](projects/p01-pathwitness-endpoint-incident-evidence-charter.md) — proposed, in_review.
- [D04-P02 — PartnerWire](projects/p02-partnerwire-message-compatibility-workbench-charter.md) — proposed, in_review.
- [D04-P03 — RelayParcel](projects/p03-relayparcel-interrupted-retrieval-charter.md) — proposed, in_review.
- [D04-P04 — OriginProof](projects/p04-originproof-release-interoperability-charter.md) — proposed, in_review.
- [D04-P05 — FieldPulse](projects/p05-fieldpulse-freshness-and-gap-evidence-charter.md) — proposed, in_review.
- [D04-P06 — SessionTrail](projects/p06-sessiontrail-interrupted-assistance-charter.md) — proposed, in_review.

## Coverage gaps and references

[Coverage matrix](../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) distinguishes direct and supporting proposed challenges from the 14 previously approved Charters. Actual DNS wire queries, multi-hop proxy paths, browser CORS/EventSource/WebSocket, genuine QUIC/h3, generated gRPC clients and real impaired-network experiments remain unverified. Local CA/name/ALPN TLS handshakes, h2 stream credit, a Node WebSocket client against a restricted peer, manual SSE cursor exchange/abort, and fixed HTTP range cases now have bounded execution evidence. Full conformance and multi-platform behavior remain unverified. Lessons teach these mechanisms with explicit practice/evidence qualifications.

## Review evidence and next action

Use [the review guide](evidence/review-guide.md), beginning with the curriculum breadth and boundaries. [Tracking](../../tracking/state.json) records 18 lessons, catalog and six Charters as in_review. Explicit learner approval is required before any new artifact becomes approved. Stop at this educational review gate; no D05 authoring or portfolio implementation is authorized here.
