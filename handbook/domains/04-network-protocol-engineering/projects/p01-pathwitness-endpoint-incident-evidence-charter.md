# Project Charter — D04-P01 — PathWitness: Endpoint incident evidence

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** approved_by_learner — concept and Educational Project Charter explicitly approved by the Product Owner on 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

Support engineers lose time when “the API is down” reports combine DNS, connectivity, TLS, proxy and application failures. A successful test from an engineer's laptop can wrongly dismiss a customer's failure from another environment. PathWitness helps an authorized operator assemble a scoped, reproducible endpoint incident brief that states what each observation actually proves. Its users are integration-support engineers and service owners reviewing incidents, not anonymous Internet scanners.

## Initial product boundary

Initial direction: create a case for an owner-authorized endpoint and observation environment, capture or import a bounded set of probe observations, compare phases and paths, and publish a sanitized case brief with competing hypotheses and explicit unknowns. A reader should see the attempted endpoint, intended identity, observed protocol, phase, timing scope and completeness without receiving credentials or private payloads.

Out of scope: public arbitrary-target scanning, exploitation, global uptime certification, automatic root-cause certainty, provider qualification and remediation of customer infrastructure. Deferred: continuous monitoring, alert routing, organizational incident command and automated operational changes. Probe permissions, redaction, observation retention and supported environments are unresolved product policies for owner-led discovery.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C01](../lessons/01-network-paths-and-addressing.md), [D04-C02](../lessons/02-dns-and-service-discovery.md), [D04-C06](../lessons/06-tls-identity-and-negotiation.md), [D04-C11](../lessons/11-proxies-routing-and-trust-boundaries.md), [D04-C18](../lessons/18-network-diagnostics-and-case-studies.md). These connect to observable product problems below. Supporting knowledge: [D04-C03](../lessons/03-tcp-delivery-and-connection-lifecycle.md), [D04-C09](../lessons/09-http-clients-and-connection-pools.md), [D04-C12](../lessons/12-http2-streams-and-flow-control.md), [D04-C13](../lessons/13-quic-and-http3-trade-offs.md), [D04-C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. Name an approved endpoint and observation context; see whether evidence collection is permitted and which capabilities are supported.
2. Compare two observations with different address families or intermediary paths; retain both sources instead of merging them into one “healthy” status.
3. Record an inconclusive or failed phase and generate a brief that separates observed facts, hypotheses and the next discriminating check.
4. Share a sanitized brief; confirm it excludes sensitive headers and does not upgrade missing evidence into a pass.

Meaningful failures include resolution success followed by connect failure; correct address but identity mismatch; one path succeeding while another fails; headers received with incomplete content; and a test not performed due to authorization or missing capability. The product should distinguish not-run from failed and complete HTTP refusal from transport failure. The important invariant to explore is that no report asserts a stronger boundary than its evidence supports.

## Differentiation and non-goals

This is incident reasoning for a particular time and path. OriginProof (P04) compares release compatibility against declared supported behavior. D03 NodeScope focuses on runtime evidence within a process; this project focuses on network-hop and protocol evidence. It neither alters NodeScope nor becomes a full observability platform.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

A future demonstration should include one complete observation, two distinct failed phases, a contradictory-path comparison and an unrun capability. Retain sanitized inputs, environment, tool/runtime version, actual outputs and a brief with justified uncertainty. The learner should explain why a DNS answer, a TLS hostname match and a complete application response establish different claims. A useful negative check is a report built from headers without body completion: it must not claim successful full transfer.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../../docs/workflow.md) governs the handoff. Educational authoring gate closed. Project selection and separate-repository discovery remain future actions.
