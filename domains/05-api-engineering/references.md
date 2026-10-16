# D05 primary-source register

**Status:** source register; curriculum approved 2026-10-16. C01 source checks are recorded separately; chapter editorial approval remains pending.

The links below were opened during discovery for the named concepts. This is a scoped planning check, not an exhaustive standards/errata audit or a claim that every future example conforms. Pin exact specification/tool/runtime revisions and recheck relevant sections before lesson authoring. Stable publication links are used where available. Living pages and source branches require a dated revision when an executable example relies on them.

**Historical discovery lookup:** Context7 MCP `resolve-library-id`/`query-docs` tools were not exposed in the discovery session. Following the documentation skills' fallback, the Context7 CLI was attempted with resolve queries for OpenAPI and GraphQL; all returned `fetch failed`, including an OpenAPI retry using system CA support. No library ID was resolved and no Context7 query result is claimed. Primary specifications and official documentation were therefore consulted directly through the web tool. Retry the canonical Context7 workflow when library-specific authoring begins; do not treat this availability limitation as permission to invent API details.

<a id="s01"></a>
## S01 — REST constraints

[Fielding dissertation, Chapter 5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), especially §5.1 and §5.1.5. Primary architectural source for constraint/property reasoning. It is not an HTTP endpoint naming guide or a claim that practical APIs satisfy every constraint. Used by C01–C02.

<a id="s02"></a>
## S02 — HTTP semantics

[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), especially methods (§9), conditional requests (§13) and status (§15). Source for protocol semantics; application acknowledgment and policy require additional explicit contracts. Used across C01–C24. Reuse D04's explanation rather than duplicating its protocol curriculum.

<a id="s03"></a>
## S03 — JSON representation

[RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.html), especially numbers, objects and interoperability (§§4, 6, 8). Source for portable value boundaries and duplicate-name ambiguity; it does not define application money, date or ID semantics. C03/C05.

<a id="s04"></a>
## S04 — Date and time representation

[RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html), timestamp profile. Distinguish an offset-qualified instant from product-local dates, time zones and durations; do not label every date string an instant. C03.

<a id="s05"></a>
## S05 — Partial mutation formats

[RFC 5789 — PATCH](https://www.rfc-editor.org/rfc/rfc5789.html), [RFC 6902 — JSON Patch](https://www.rfc-editor.org/rfc/rfc6902.html), [RFC 7396 — JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396.html). Compare media types, operation semantics, null/array behavior, atomic application and preconditions. Patch atomicity does not provide general transaction isolation. C04/C09.

<a id="s06"></a>
## S06 — Method registry and QUERY

[IANA HTTP method registry](https://www.iana.org/assignments/http-methods), [RFC 10008 — HTTP QUERY](https://www.rfc-editor.org/rfc/rfc10008.html), published June 2026. Discovery found QUERY registered as safe/idempotent. Include its role for content-bearing queries while treating client, intermediary and tooling support as unverified. Do not teach it as an expired draft or assume browser/runtime support. C04/C07.

<a id="s07"></a>
## S07 — JSON Schema dialects

[Draft 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core) and [Validation](https://json-schema.org/draft/2020-12/json-schema-validation). Consult schema resources/references, composition, evaluation and format vocabularies. These are JSON Schema specification publications, not published RFCs. Dialect support and optional format assertion must be established for the actual tool. C05/C13.

<a id="s08"></a>
## S08 — Problem details

[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html), especially problem members/extensions and security considerations. Current problem-details reference replacing RFC 7807. Defines a representation for errors, not a universal domain error taxonomy or retry policy. C06.

<a id="s09"></a>
## S09 — Pagination conventions

[Google AIP-158](https://google.aip.dev/158). Primary published API-design guidance for opaque tokens and traversal conventions. This is a documented API convention, not an Internet standard or proof that cursor traversal is snapshot-consistent. Derive compound ordering and mutation behavior independently under explicit assumptions. C07/C19.

<a id="s10"></a>
## S10 — Cache policy

[RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html), response storage/reuse/freshness; [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861.html), stale extensions. Apply to API representation/authority promises; protocol freshness does not establish source consistency or timely revocation. C08/C22.

<a id="s11"></a>
## S11 — Preconditions and throttling statuses

[RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html), especially 428 and 429, with RFC 9110 for 412 and Retry-After. Status meaning does not select a limiter algorithm or concurrency implementation. C09/C12.

<a id="s12"></a>
## S12 — API security boundaries

[OWASP API Security Top 10, 2023 edition](https://api-security.owasp.org/editions/2023/en/0x11-t10/). Consult object/property/function authorization, resource consumption, sensitive business flows, SSRF, inventory and unsafe API consumption. A risk taxonomy is guidance, not proof of a complete threat model, defense implementation or security certification. C02/C05/C07–C08/C11–C12/C17–C24.

<a id="s13"></a>
## S13 — Idempotency contracts and proposal status

[Idempotency-Key draft status](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/), [revision 07 text](https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.html). As checked 2026-10-16, revision 07 is **expired and archived**, not a published RFC. It is useful background on key/fingerprint/concurrency concerns, not a universal finalized header contract. Recheck status before teaching wire syntax. Published provider behavior is separately labeled in S18. C10/C16/C18.

<a id="s14"></a>
## S14 — OAuth boundary context

[RFC 9700 — OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html). Consult credential/delegation and audience/security context to avoid outdated API-boundary advice. D05 teaches the service's required trust facts; D09 owns comprehensive OAuth/OIDC flows and credential operations. No auth library or provider was qualified. C11.

<a id="s15"></a>
## S15 — Evolving quota metadata

[RateLimit header fields draft status/text](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/). As checked, revision 11 is an **active Internet-Draft**, updated May 2026, not a published RFC. Distinguish this proposal's RateLimit/RateLimit-Policy from older drafts and vendor X-RateLimit conventions. Recheck status and actual supported syntax at authoring. C12.

<a id="s16"></a>
## S16 — OpenAPI description semantics

[OpenAPI 3.2.1](https://spec.openapis.org/oas/v3.2.1.html), published 10 September 2026; comparison [3.1.2](https://spec.openapis.org/oas/v3.1.2.html) and [3.0.4](https://spec.openapis.org/oas/v3.0.4.html). Consult parameter serialization, Schema Object/dialect, security requirements, responses, callbacks/webhooks and streaming descriptions. The live latest page reported 3.2.1 in discovery; pin this version rather than silently following future releases. Published specification support does not qualify any generator or validator. C13–C15/C17/C23.

<a id="s17"></a>
## S17 — Deprecation and retirement

[RFC 9745 — Deprecation](https://www.rfc-editor.org/rfc/rfc9745.html), [RFC 8594 — Sunset](https://www.rfc-editor.org/rfc/rfc8594.html). Distinguish signaling deprecation from planned unavailability and from evidence that consumers have migrated. C14.

<a id="s18"></a>
## S18 — Concrete consumer documentation example

[Stripe API idempotent requests](https://docs.stripe.com/api/idempotent_requests). A primary provider example of explicitly documented replay, key retention and failure behavior. Its precise policies are **provider-specific**, not required behavior for this Handbook's teaching APIs or future projects. No account, SDK or real payment call was used. C15/C23; compare with C10's generic model.

<a id="s19"></a>
## S19 — Asynchronous response preferences

[RFC 7240](https://www.rfc-editor.org/rfc/rfc7240.html), especially `respond-async`, alongside RFC 9110's 202 semantics. A preference is not a promise that a server supports it or a complete operation-resource standard. C16 must specify its operation lifecycle separately.

<a id="s20"></a>
## S20 — Webhook authenticity and delivery conventions

[Standard Webhooks community specification](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md), consulted at its living main branch; [RFC 9421 — HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html). These are different mechanisms/specification scopes; do not conflate their signing formats. Pin the chosen convention/revision for any later fixture. Neither defines universal business acknowledgment or durable event delivery. C18.

<a id="s21"></a>
## S21 — Protocol Buffers compatibility

[Official proto3 language guide](https://protobuf.dev/programming-guides/proto3/), especially presence, reserved fields and binary/JSON compatibility. Living documentation; pin compiler/runtime and message definitions for execution. Binary wire compatibility and consumer semantic compatibility are different checks. C14/C20.

<a id="s22"></a>
## S22 — GraphQL execution

[GraphQL September 2025 specification](https://spec.graphql.org/September2025/), especially validation, operation execution, nullability and response errors; [HTTP guidance](https://graphql.org/learn/serving-over-http/); [performance guidance](https://graphql.org/learn/performance/). Pin the published language edition; transport, subscriptions and evolving incremental delivery need their own supported specification/tool profile. No GraphQL execution library was selected or run. C19/C24.

<a id="s23"></a>
## S23 — gRPC completion and client behavior

[Status codes](https://grpc.io/docs/guides/status-codes/), [deadlines](https://grpc.io/docs/guides/deadlines/) and [retry](https://grpc.io/docs/guides/retry/). Official living guides; verify exact Node binding/version defaults before implementation. C20 must go beyond D04's envelope model to explain method, status and schema contract; no generated client/server exchange was run. C20–C22/C24.

<a id="s24"></a>
## S24 — Persistent transport prerequisites

[RFC 6455 — WebSocket](https://www.rfc-editor.org/rfc/rfc6455.html), [WHATWG server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html). D04 owns framing/parser depth; D05 uses them to distinguish transport behavior from application replay, command acknowledgment and snapshot consistency. WHATWG is a living standard; browser/proxy behavior remains unverified. C21.

<a id="s25"></a>
## S25 — Consumer-driven contract testing boundary

[Official Pact explanation](https://docs.pact.io/getting_started/how_pact_works). Primary description of consumer expectations, interaction contracts and provider verification. Use as an example of a testing model and its boundary, not a mandatory package, architecture or evidence of integration coverage. Re-resolve Context7 docs if a concrete Pact API is later used. C23.

<a id="s26"></a>
## S26 — Diagnostic correlation

[W3C Trace Context](https://www.w3.org/TR/trace-context/), including security/privacy considerations. Consult propagation and untrusted incoming context; it does not make identifiers authorization credentials or prove causal ordering from sampled observations. C24. Production instrumentation libraries and semantic-convention versions remain unselected.

## C01 authoring update — 2026-10-16

Context7 MCP is available in the C01 session. Resolved Node.js to `/nodejs/node` (official repository, High reputation) and queried strict assertion imports/equality/throws. Resolved Mermaid CLI to `/mermaid-js/mermaid-cli` and queried rendering flags. Actual local versions are Node v24.22.0 and Mermaid CLI 12.0.0; living documentation is not represented as an exact runtime source pin. Primary REST/HTTP/URI/link/JSON sources were consulted directly for architectural/specification claims. [C01 validation](evidence/c01/validation.md) records section-level checks, link availability, rendering and limitations. No GraphQL/gRPC/schema tool is used or qualified by C01; future source register entries retain their discovery scope.

## Deferred reference work

For each later chapter, recheck errata/status for the sources actually used, resolve current library documentation through Context7, qualify its supported Node/TypeScript and tool versions, and retain section-level citations. C01 qualifies only its named educational Node/renderer versions; no project runtime, validator, generator, gateway, storage engine, identity provider or broker has been selected. The register is a starting authority map, not a package recommendation or implementation dependency list.
