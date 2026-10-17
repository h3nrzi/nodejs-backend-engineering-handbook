# Project Charter — D04-P04 — OriginProof: Release interoperability review

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** approved_by_learner — concept and Educational Project Charter explicitly approved by the Product Owner on 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

Service teams announce support for browsers, clients and intermediaries but often validate only one direct local path. A release can change redirects, representation metadata, cache behavior or negotiated protocol and break a supported integration without changing its business API. OriginProof helps release reviewers compare declared support with observed endpoint behavior and preserve a qualified compatibility record.

## Initial product boundary

Initial direction: define a bounded support profile for an owner-authorized service release, record observations from named client/path combinations, compare representation and protocol behavior, and produce a release review showing supported, contradicted, inconclusive and not-run claims. Reviewers can compare two releases without treating one successful path as universal coverage.

Out of scope: automatic production deployment, API product design, full browser automation platform, public compatibility certification, penetration testing and global performance ranking. Deferred: continuous release gating and broad third-party device farms. Initial supported protocols, client versions, routes and acceptable compatibility differences require learner product approval.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C06](../lessons/06-tls-identity-and-negotiation.md), [D04-C07](../lessons/07-http-semantics-and-representations.md), [D04-C10](../lessons/10-caching-validation-and-ranges.md), [D04-C11](../lessons/11-proxies-routing-and-trust-boundaries.md), [D04-C12](../lessons/12-http2-streams-and-flow-control.md), [D04-C13](../lessons/13-quic-and-http3-trade-offs.md), [D04-C16](../lessons/16-rpc-envelopes-and-protocol-evolution.md). These connect to observable product problems below. Supporting knowledge: [D04-C02](../lessons/02-dns-and-service-discovery.md), [D04-C08](../lessons/08-http1-framing-and-server-lifetimes.md), [D04-C09](../lessons/09-http-clients-and-connection-pools.md), [D04-C18](../lessons/18-network-diagnostics-and-case-studies.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. A release owner states the supported interaction profile and identifies the release under review.
2. A reviewer records a complete positive observation from a named client/path and attaches sanitized metadata.
3. The reviewer evaluates a mismatched identity, unsupported negotiation, variant/validator disagreement or missing final protocol status.
4. The team compares releases and sees exactly which support claims have evidence, contradictions or no execution.

The domain challenge is interoperability across boundaries: desired versus negotiated protocol, representation selection, conditional retrieval, proxy transformation and application status carried beyond HTTP status. Expected failure cases include a selected language without coherent variant metadata, an h2 claim observed only on the front hop, an h3 claim with no h3 execution, and RPC success inferred without final status. The report must preserve the evidence's client/path/release scope. Unsupported local tooling, an unrun combination and a failed negotiated exchange must remain distinct outcomes. Optional h3 or RPC claims may be recorded as not-run; this Charter does not require implementing every mapped protocol.

## Differentiation and non-goals

PathWitness (P01) diagnoses a current incident and competing causes; OriginProof reviews declared release support across controlled combinations. D02 PackagePassport concerns package exports/runtime compatibility, while this product concerns deployed protocol and representation behavior. It is not another uptime monitor, SDK generator or performance benchmark service.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

A future demo should include two release profiles, a matching capability, a contradicted claim and a not-run protocol. Preserve the actual client/path/version and observations; do not report “HTTP/3 supported” from an h2 exchange. The learner should explain strong versus weak validators, protocol negotiation versus HTTP authority, and why interoperability is directional and environment-specific. Optional advanced protocol coverage must remain absent until genuinely exercised.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../../docs/workflow.md) governs the handoff. Educational authoring gate closed. Project selection and separate-repository discovery remain future actions.
