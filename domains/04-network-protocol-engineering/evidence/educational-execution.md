# D04 educational execution and quality evidence

**Date:** 2026-10-15. **Editorial:** in_review. **Learner review/assessment:** not_run / not_assessed. **Portfolio implementation:** not_started.

## Tested revision and environment

Baseline commit: `088d956494b23545c80fdac72c1adab14fd14cad`. The executed revision is that baseline **plus the uncommitted D04 authoring changes**; no new commit has been created. [The lab manifest](lab-manifest.json) records SHA-256 for every extracted JavaScript block, so the tested code is identifiable independently of later prose changes.

- Node: `v24.22.0`; V8: `13.6.233.17-node.57`; libuv: `1.52.1`; OpenSSL: `3.5.8`.
- Host: macOS 26.1, build 25B78. Platform: `darwin`; architecture: `arm64`; ESM `.mjs` child entries, built-in modules only.
- Working directory: `/Users/hossein/Projects/mediaforge/nodejs-backend-engineering-handbook`.
- Each lab runs in a separate child process with a 10-second ceiling and a disposable OS temporary directory. Socket fixtures use explicit IPv4 loopback and OS-assigned ports. The runner deletes its extracted files; the OS closes any descriptors if a failed child is terminated.

## Executed command and actual result

```sh
node scripts/check-d04.mjs
```

**Final complete run: 18/18 educational lab processes passed**, exit status 0. [Exact stdout](educational-labs.txt), [runner](../../../scripts/check-d04.mjs), and [manifest](lab-manifest.json) are retained. Chapter 04 additionally enumerates all 32 partitions of its six-byte fixture. No individual assertions or pure-model cases are counted as portfolio application tests.

| Chapter | What actually ran | Result |
|---|---|---|
| [C01](../lessons/01-network-paths-and-addressing.md) | Actual loopback TCP/address API and unit arithmetic | pass |
| [C02](../lessons/02-dns-and-service-discovery.md) | Actual numeric lookup; cache/family models only | pass |
| [C03](../lessons/03-tcp-delivery-and-connection-lifecycle.md) | Actual loopback half-close | pass |
| [C04](../lessons/04-framing-and-incremental-parsers.md) | Actual parser; exhaustive partitions of one fixture | pass |
| [C05](../lessons/05-udp-loss-and-path-mtu.md) | Actual one loopback datagram; gap model | pass |
| [C06](../lessons/06-tls-identity-and-negotiation.md) | Actual API on synthetic certificate identity objects | pass |
| [C07](../lessons/07-http-semantics-and-representations.md) | Actual URL/octet APIs | pass |
| [C08](../lessons/08-http1-framing-and-server-lifetimes.md) | Actual loopback HTTP and malformed request refusal | pass |
| [C09](../lessons/09-http-clients-and-connection-pools.md) | Actual HTTP Agent sequential connection reuse | pass |
| [C10](../lessons/10-caching-validation-and-ranges.md) | Actual loopback conditional GET | pass |
| [C11](../lessons/11-proxies-routing-and-trust-boundaries.md) | Pure trust/hop-field model | pass |
| [C12](../lessons/12-http2-streams-and-flow-control.md) | Actual cleartext loopback h2 session | pass |
| [C13](../lessons/13-quic-and-http3-trade-offs.md) | Pure ordering/budget model | pass |
| [C14](../lessons/14-websocket-sessions-and-control.md) | Actual hash/masking calculations; no WebSocket exchange | pass |
| [C15](../lessons/15-server-sent-events-and-resumption.md) | Actual incremental UTF-8; restricted text parser | pass |
| [C16](../lessons/16-rpc-envelopes-and-protocol-evolution.md) | Opaque envelope/status model; no gRPC call | pass |
| [C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md) | Actual HTTP controlled lost-reply timeline; budget model | pass |
| [C18](../lessons/18-network-diagnostics-and-case-studies.md) | Pure evidence-classification model | pass |

## Technical-reference review

Resolved Node.js via Context7 and selected `/websites/nodejs_latest-v24_x_api` (official v24 reference line, high source reputation). Three scoped queries checked socket pressure/lifetime, HTTP connection ownership, and TLS identity/negotiation. Official v24 JSON API documents were also inspected for DNS lookup/resolve, UDP message/send, HTTP timeouts/Agent, TLS matching/SNI, half-close and HTTP/2 close behavior. The exact local Node version is recorded above; “v24” is not a claim about the latest release or a portfolio runtime decision.

Primary protocol material reviewed includes TCP RFC 9293; IPv6/UDP and datagram MTU guidance; HTTP RFCs 9110–9114; TLS 1.3 and service identity RFC 9525; QUIC/QPACK; WebSocket; WHATWG URL/CORS/SSE; and the gRPC protocol/Protocol Buffers evolution documentation linked in the lessons. Important qualifications retained: `lookup` ENOTFOUND is not identical to authoritative NXDOMAIN; TLS name matching is not chain validation; h2 multiplexing retains TCP ordering; SSE subset code is not EventSource conformance; a gRPC envelope calculation is not a library integration.

[Reference reachability results](reference-reachability.json) record HTTP status/final URLs for all distinct external lesson/Charter references at check time. The initial direct pass reached 49/55 references; five direct TLS timeouts were successfully opened with the web tool, and one obsolete Wireshark URL was corrected and successfully rechecked. Initial errors and verification method remain in the report. Reachability is separate from content review; redirects and evolving version-line/master documents can change. These checks do not certify every normative subcase or a third-party provider.

## Authoring review and integrity checks

The [curriculum](../curriculum.md) records chapter progression and neighboring-domain ownership. Each of 18 lessons has the required outcomes/prerequisites, first-principles mechanisms, normal/failure cases, complete lab, exercises/expected outcomes, answer rubric, references and coverage qualification. The catalog and six individual Charters were checked against the Project Charter template and Workflow V2; none is a Final PRD or selects architecture, framework, database, queue, deployment or a required implementation technology.

Chapter IDs C01–C18 and project IDs P01–P06 reconcile across the domain index, catalog, matrix and JSON state. Approved D01–D03 domain records and external MediaForge planning state are preserved. Root documentation now reports 66 authored lessons (48 approved, 18 in_review) and 20 Charters (14 approved, six in_review). New D04 challenges are proposed, never approved challenge evidence.

Internal Markdown destinations and heading anchors are checked repository-wide by `python3 scripts/check-handbook-links.py`. Two pre-existing navigation defects were repaired: the D03 Charter anchor in the matrix and a historical audit link to a deleted file. The latter now names its removal commit and links current coverage without pretending the current matrix is historical evidence. No approved D01–D03 lesson or Charter content was changed.

## Explicit practical limitations

Unexecuted: real DNS wire queries/family racing; real certificate-chain handshakes/mTLS; real loss, MTU or congestion experiments; multi-hop proxies; browser CORS, EventSource and WebSocket behavior; genuine QUIC/HTTP/3; generated gRPC/Protocol Buffers integration; cache/range/compression interoperability; large-load, security-conformance or multi-platform tests. TypeScript modeling tasks have no compiler verification. Suggested external exercises require a future authorized environment and their own evidence.

There are no missing authored chapters or placeholder Charters. These practical limitations are not a claim that optional integrations passed. No learner exercise, production implementation, provider capability or demonstrated competency is inferred from the local examples. Human editorial evaluation remains pending in [the review guide](review-guide.md).
