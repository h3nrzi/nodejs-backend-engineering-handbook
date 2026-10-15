# D04 Curriculum — Network & Protocol Engineering

**Status:** in_review — full draft authored and technically expanded 2026-10-15; no learner approval.
**Inventory:** 18 substantive lessons, six proposed catalog concepts, six educational Project Charters.
**Executed examples:** 18 bounded Node.js labs, including expanded lifecycle/failure fixtures; [actual evidence](evidence/educational-execution.md).
**Portfolio implementation / learner competence:** not_started / not_assessed.

## Position, prerequisites and purpose

D04 is fourth in the sixteen-domain [roadmap](../../ROADMAP.md). D01 supplies OS/resource, cost and state-machine reasoning; D02 supplies language, async and static-versus-runtime distinctions; D03 supplies Node execution, byte ownership, stream pressure and cleanup. This domain explains what happens between a Node backend and another endpoint: discovery, transport, secure negotiation, message boundaries, intermediary behavior and incomplete observation.

Entry checkpoint: explain why a Buffer chunk need not be one record, why write(false) is pressure after admission, why cancellation is cooperative, and why a TypeScript assertion does not validate external input. Revisit [D03 bytes](../03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md), [streams](../03-nodejs-internals/lessons/08-readable-and-writable-stream-mechanics.md) and [shutdown](../03-nodejs-internals/lessons/16-runtime-failures-and-graceful-shutdown.md) when those distinctions are unclear. This checkpoint is guidance, not an administered assessment.

## Chapter sequence and competency inventory

| Chapter / competency | Mechanisms and progression | Observable reasoning outcome | Dependencies |
|---|---|---|---|
| [01 — Network paths and addressing](lessons/01-network-paths-and-addressing.md) / D04-C01 | Layers, namespaces, tuples, routing, MTU context; latency/rate/BDP models | Trace a request path and distinguish address from identity. | D01 OS/I/O; D03 bytes |
| [02 — DNS and service discovery](lessons/02-dns-and-service-discovery.md) / D04-C02 | Resolution paths, typed records, TTL/negative cache, multiple families and failover | Explain a stale endpoint and select discriminating evidence. | 01; D03 native pool |
| [03 — TCP delivery and connection lifecycle](lessons/03-tcp-delivery-and-connection-lifecycle.md) / D04-C03 | Handshake, sequence/ACK, windows, pressure, half-close/reset and lifetime | Separate kernel byte delivery from product acknowledgment. | 01–02; D03 streams |
| [04 — Framing and incremental parsers](lessons/04-framing-and-incremental-parsers.md) / D04-C04 | Framing alternatives, incremental state, bounds, EOF and partition invariants | Review a parser across arbitrary chunk boundaries. | 03; D03 buffers; D01 state machines |
| [05 — UDP, loss and path MTU](lessons/05-udp-loss-and-path-mtu.md) / D04-C05 | Datagram semantics, loss/duplicates/reorder, fragmentation and PLPMTUD | Report observations and gaps without promising delivery. | 01,03–04 |
| [06 — TLS identity and negotiation](lessons/06-tls-identity-and-negotiation.md) / D04-C06 | Trust/identity, SNI, ALPN, chain versus name, resumption and early data | Diagnose handshake/identity failures without disabling checks. | 02–03 |
| [07 — HTTP semantics and representations](lessons/07-http-semantics-and-representations.md) / D04-C07 | Methods/status, representations, URLs, negotiation, origins and browser boundary | Interpret a complete exchange without conflating product success. | 04,06; D02 validation |
| [08 — HTTP/1.1 framing and server lifetimes](lessons/08-http1-framing-and-server-lifetimes.md) / D04-C08 | Body-length rules, ambiguous input, receipt/lifetime, streaming/multipart limits | Recognize framing divergence and incomplete messages. | 03–04,07 |
| [09 — HTTP clients and connection pools](lessons/09-http-clients-and-connection-pools.md) / D04-C09 | Agent ownership, pool queues, body consumption, reuse and stale sockets | Explain hidden client queue time and release obligations. | 06–08; D03 cleanup |
| [10 — Caching, validation and ranges](lessons/10-caching-validation-and-ranges.md) / D04-C10 | Freshness/validation, variants, validators, content coding, range identity | Explain correct reuse and reject mixed-version retrieval. | 07–09 |
| [11 — Proxies, routing and trust boundaries](lessons/11-proxies-routing-and-trust-boundaries.md) / D04-C11 | Independent hops, TLS termination, routing, forwarding trust, buffering | Distinguish immediate peer and trusted assertions. | 06–10 |
| [12 — HTTP/2 streams and flow control](lessons/12-http2-streams-and-flow-control.md) / D04-C12 | Streams/frames, HPACK, flow windows, settings/reset/GOAWAY and TCP coupling | Locate a stream stall versus a shared-session problem. | 06,08–09 |
| [13 — QUIC and HTTP/3 trade-offs](lessons/13-quic-and-http3-trade-offs.md) / D04-C13 | QUIC reliability, streams, TLS integration, migration, QPACK, fallback | Compare exact dependency layers and qualify capability claims. | 05–06,12 |
| [14 — WebSocket sessions and control](lessons/14-websocket-sessions-and-control.md) / D04-C14 | Opening, messages/frames, masking, ping/close, pressure and reconnection | Separate open transport from acknowledged application state. | 04,06,08,11 |
| [15 — Server-sent events and resumption](lessons/15-server-sent-events-and-resumption.md) / D04-C15 | UTF-8 line/event grammar, comments/IDs, EventSource, replay gaps and buffering | Explain one-way stream delivery and honest resumption. | 07–11,14 |
| [16 — RPC envelopes and protocol evolution](lessons/16-rpc-envelopes-and-protocol-evolution.md) / D04-C16 | RPC layers, gRPC envelope/trailers, mixed schemas and compatibility direction | Review protocol completion and mixed-version boundaries. | 04,07,12; D02 types |
| [17 — Deadlines, retries and uncertain outcomes](lessons/17-deadlines-retries-and-uncertain-outcomes.md) / D04-C17 | Phase/total/idle budgets, cancellation ownership, retry safety and overload | Preserve uncertain outcomes and bound remaining work. | 03,09,14–16; D02 cancellation |
| [18 — Network diagnostics and case studies](lessons/18-network-diagnostics-and-case-studies.md) / D04-C18 | Competing hypotheses, evidence scope, packet/runtime/application correlation | Write a falsifiable scoped incident report with limitations. | 01–17; D03 diagnostics |

## Why this sequence

Chapters 01–03 establish path, discovery and byte delivery before protocol parsing. Chapter 04 makes message boundaries explicit; Chapter 05 compares datagram responsibility; Chapter 06 adds peer identity before HTTP. Chapters 07–11 develop semantic, framing, client, cache and intermediary boundaries. Chapters 12–13 compare newer HTTP transports only after the shared semantic model. Chapters 14–16 apply lifetime and framing to persistent and RPC interactions. Chapters 17–18 integrate deadlines, uncertainty and diagnosis rather than introducing a disconnected list of tools.

Diagnostics and resource limits appear throughout; the final chapter consolidates evidence selection. A learner may revisit Chapter 17's budget model during Chapter 09, but Chapter 09 defines its necessary timeout distinctions without requiring a forward lesson.

## Breadth audit and neighboring domains

| Boundary | D04 responsibility | Prerequisite or later owner |
|---|---|---|
| Local execution and streams | Apply runtime/byte/pressure models to real endpoint exchanges | D01–D03 retain algorithms, language and Node internals |
| HTTP and API design | Teach protocol methods, status, representations and framing | D05 owns resource contracts, API lifecycle and client-facing product policy |
| Security | Explain TLS identity, untrusted bytes, forwarding assertions and browser-origin boundary | D09 owns threat models, authorization/session policy, SSRF defense and operational key/certificate management |
| Storage and consistency | Explain validators, range identity and replay uncertainty | D07–D08 own storage engines; D10 owns distributed consistency/deduplication design |
| Async delivery | Teach what transport/framing/acknowledgment establish | D11 owns brokers and durable async-processing semantics |
| Performance/reliability | Explain cost dimensions, shared windows, deadlines and retry uncertainty | D12–D13 own workload capacity, resilience/SLO and production policy |
| Testing and operations | Run bounded educational assertions and preserve evidence limits | D14–D16 own system test strategy, deployment, fleet telemetry and incident operations |

Core coverage includes IPv4/IPv6 path distinctions; DNS record/cache/family behavior; TCP delivery, flow/congestion and half-close; bounded framing; UDP/MTU; TLS trust/SNI/ALPN; HTTP versions, metadata, caching/ranges and compression; proxies; WebSocket/SSE; RPC compatibility; and phase-aware diagnosis. No important protocol category above is represented only by a chapter title.

Specializations deliberately outside this course: implementing an IP/TCP/QUIC stack, DNS authoritative service administration, BGP operations, full X.509 lifecycle, SMTP/mail operations, WebRTC/media transport, and complete protocol-conformance suites. They are not silently promised professional qualifications. Full browser/proxy/h3/gRPC integrations remain practical coverage gaps, not absent authored lessons.

## Practice and evidence policy

Each lesson is standalone with outcomes, prerequisites, first-principles mechanisms, normal and failure examples, backend uses, exercises, answer rubric and references. Code uses ESM JavaScript on the exact recorded Node environment; Chapter 06 additionally invokes the installed OpenSSL CLI to generate disposable CA/leaf material; TypeScript modeling tasks retain the static/runtime boundary without requiring a compiler dependency. The one JavaScript lab per lesson is executable using [the retained runner](../../scripts/check-d04.mjs). Additional exercises are authored practice, not recorded learner activity.

Reference line: official Node v24 docs, resolved through Context7 `/websites/nodejs_latest-v24_x_api`, supplemented by primary protocol specifications and direct official API inspection where indexed snippets were incomplete. The deep review expands all 18 chapters, corrects terminal EOF/missing-evidence errors, and upgrades nine lab blocks (03/04/06/08/09/10/12/14/15) plus cancellation and diagnostic assertions in 17/18; [chapter audit](evidence/educational-execution.md#chapter-by-chapter-technical-audit) records findings and remaining scope. This is not a claim that v24 is the latest release or an approved runtime for a future product. [Evidence](evidence/educational-execution.md) distinguishes actual socket exchanges, pure models and unexecuted integrations.

## Portfolio and coverage

[Six proposed Charters](projects/catalog.md) span incident evidence, partner-wire compatibility, retrieval continuity, release interoperability, observation freshness and assistance-session continuity. Each maps direct product challenges separately from supporting knowledge in [the matrix](../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review). No project must implement every protocol, and no architecture is selected to force coverage.

## Review gate

All artifacts are `in_review`. Review breadth, sequencing, factual qualifications and individual Charter direction using [the review guide](evidence/review-guide.md). Editorial approval is pending; portfolio delivery and learner assessment remain separate. Do not start D05 or create Final PRDs/Module Plans from this draft.
