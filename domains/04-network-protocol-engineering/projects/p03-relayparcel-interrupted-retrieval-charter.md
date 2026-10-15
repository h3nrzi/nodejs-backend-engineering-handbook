# Project Charter — D04-P03 — RelayParcel: Interrupted retrieval for field teams

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** approved_by_learner — concept and Educational Project Charter explicitly approved by the Product Owner on 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

Field technicians need to retrieve versioned manuals and inspection bundles over unstable connections. A restarted download can waste time or, worse, combine bytes from different revisions and display a corrupt document as complete. RelayParcel helps a permitted recipient retrieve the intended artifact, understand interruption and determine whether a later continuation is consistent with the same representation.

## Initial product boundary

Initial direction: a publisher identifies a bounded set of retrievable artifact versions; an authorized recipient requests one, sees progress and an honest completion/interruption outcome, and can attempt supported continuation or an explicit restart. The product direction is byte-consistent retrieval with a clear version reference and recipient-visible verification result.

Out of scope: accepting arbitrary customer uploads, media transformation, collaborative editing, universal offline synchronization, peer-to-peer delivery and legal chain-of-custody certification. Deferred: device-wide caches, multi-source retrieval and automatic bandwidth scheduling. Supported artifact sizes, continuity policy, recipient permissions and version retention are product questions for owner approval.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C03](../lessons/03-tcp-delivery-and-connection-lifecycle.md), [D04-C09](../lessons/09-http-clients-and-connection-pools.md), [D04-C10](../lessons/10-caching-validation-and-ranges.md), [D04-C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md). These connect to observable product problems below. Supporting knowledge: [D04-C04](../lessons/04-framing-and-incremental-parsers.md), [D04-C06](../lessons/06-tls-identity-and-negotiation.md), [D04-C08](../lessons/08-http1-framing-and-server-lifetimes.md), [D04-C11](../lessons/11-proxies-routing-and-trust-boundaries.md), [D04-C18](../lessons/18-network-diagnostics-and-case-studies.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. A publisher exposes an identified artifact revision to a permitted technician.
2. The technician retrieves the artifact and sees completion tied to that revision and observed bytes.
3. Connectivity is interrupted; the UI preserves partial/incomplete truth rather than displaying success.
4. The technician returns after the artifact changed; the product explains whether continuation is supported or a clean restart is necessary, without silently mixing versions.

Challenges include incomplete content despite received success headers, slow readers, closed reused connections, a full response where a partial response was expected, inconsistent range metadata, changed representation coding and lost completion acknowledgment. A future solution may support continuity in several ways or explicitly constrain it; the Charter does not require a particular transfer mechanism. The observable invariant is that a completed artifact never silently combines incompatible representations. Integrity of the received representation and authenticity of its publisher are distinct claims; the verification method and authority for each remain learner-led discovery questions.

## Differentiation and non-goals

D03 IntakeLedger focuses on submission acceptance and recipient handoff accountability. RelayParcel focuses on recipient-side retrieval continuity and representation identity under unstable paths. It has no intake workflow, transformation pipeline or general storage-hosting ambition. This distinction is a proposed product direction, pending learner editorial review.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

Future evidence should show complete retrieval, interruption before full content, continuation against an unchanged revision and refusal/restart against a changed one. Record version references, actual byte counts, status/metadata where applicable and the verification method selected later. The learner should explain why a local successful write or HTTP 200 cannot certify an intact recipient artifact, and what uncertainty remains when a completion receipt is lost. No durability, capacity or cross-platform promise exists yet.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../docs/workflow.md) governs the handoff. Educational authoring gate closed. Project selection and separate-repository discovery remain future actions.
