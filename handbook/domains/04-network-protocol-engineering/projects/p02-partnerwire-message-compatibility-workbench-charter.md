# Project Charter — D04-P02 — PartnerWire: Partner message compatibility workbench

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** approved_by_learner — concept and Educational Project Charter explicitly approved by the Product Owner on 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

Small logistics and equipment vendors exchange structured messages under partner-specific wire contracts. Failures appear only when messages are fragmented, truncated, encoded differently or produced by another contract revision. PartnerWire gives integration teams a bounded workspace to compare agreed sample exchanges and explain where a partner message stops being interpretable, without executing partner code or silently repairing ambiguous bytes.

## Initial product boundary

Initial direction: register a named partner contract revision and approved sample inputs, evaluate complete and intentionally incomplete exchanges, report framing/decoding/schema stages separately, and compare supported producer/consumer revision directions. The product should preserve sample provenance and byte identity while presenting understandable failure categories. A sanitized or re-encoded sample is a derived artifact: reports should name that transformation and must not claim it reproduces the untouched exchange. How originals may be retained remains a discovery decision.

Out of scope: public arbitrary code execution, general-purpose protocol reverse engineering, a production message broker, autonomous partner-contract rewriting and unrestricted live access to partner infrastructure. Deferred: production traffic ingestion, large-scale replay and automatically generated SDKs. Supported formats, upload limits, revision policy and redaction remain for explicit product discovery.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C04](../lessons/04-framing-and-incremental-parsers.md), [D04-C08](../lessons/08-http1-framing-and-server-lifetimes.md), [D04-C16](../lessons/16-rpc-envelopes-and-protocol-evolution.md). These connect to observable product problems below. Supporting knowledge: [D04-C05](../lessons/05-udp-loss-and-path-mtu.md), [D04-C07](../lessons/07-http-semantics-and-representations.md), [D04-C12](../lessons/12-http2-streams-and-flow-control.md), [D04-C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. An integration owner registers approved sample material and a named contract revision with its intended interpretation.
2. A reviewer evaluates a valid exchange and sees the interpreted records and source boundaries.
3. The reviewer submits a truncated or oversized exchange and sees a stage-specific refusal, including whether earlier complete records were observed.
4. Two revisions are compared in both relevant producer/consumer directions; the report states which combinations were actually evaluated.

Challenges include UTF-8 split across deliveries, multiple records in one delivery, partial headers at EOF, untrusted declared lengths, unsupported compression, unknown enum values and loss of required final status. Malformed framing must not be “recovered” into an unintended command. A complete transport with a failing protocol status must remain distinguishable from successful business interpretation. The contract is about observable interpretation, not a prescribed parser implementation.

## Differentiation and non-goals

D02 ContractGuard evaluates application data contracts; PartnerWire concentrates on wire boundaries, incomplete exchanges and compatibility direction before/around schema interpretation. D02 PackagePassport and D03 PackageClinic inspect package/runtime compatibility, not partner message exchanges. The workspace does not become a generic integration platform.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

Future evidence should preserve a valid sample and meaningful counterexamples, exact source bytes or sanitized equivalents, supported revision pairs and actual interpretation results. The learner should independently explain why all chunkings of one valid exchange should agree, why an oversized claim can be refused before payload allocation, and why successful HTTP status can coexist with RPC failure. Record untested formats explicitly; passing sample fixtures cannot certify all partner traffic.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../../docs/workflow.md) governs the handoff. Educational authoring gate closed. Project selection and separate-repository discovery remain future actions.
