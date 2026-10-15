# Project Charter — D04-P05 — FieldPulse: Field observation freshness and gaps

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** in_review — proposed concept and Charter; no learner approval recorded.
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

Maintenance coordinators receive intermittent readings from remote field instruments. Dashboards that keep displaying the last value without its age make missing connectivity look like stable conditions. Duplicate and reordered readings can inflate counts or replace newer observations with older ones. FieldPulse gives operators an honest view of observed freshness, duplicates and gaps for a bounded set of sources.

## Initial product boundary

Initial direction: enroll known observation sources under an approved product policy, receive supported readings with source/session references, display their observed age and ordering context, and explain missing or rejected input without inventing values. Operators can inspect how a reconnect or source restart affected the visible sequence.

Out of scope: safety-critical control, medical/industrial certification, billing based on readings, remote actuator commands, a generic IoT platform and a promise of exactly-once delivery. Deferred: prediction, long-term analytics, device provisioning at scale and third-party fleet integrations. Transport, authentication, clock interpretation, freshness thresholds and allowed late-data behavior remain open for owner discovery.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C05](../lessons/05-udp-loss-and-path-mtu.md), [D04-C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md). These connect to observable product problems below. Supporting knowledge: [D04-C01](../lessons/01-network-paths-and-addressing.md), [D04-C02](../lessons/02-dns-and-service-discovery.md), [D04-C04](../lessons/04-framing-and-incremental-parsers.md), [D04-C06](../lessons/06-tls-identity-and-negotiation.md), [D04-C18](../lessons/18-network-diagnostics-and-case-studies.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. An operator adds an approved source and learns the interpretation of freshness and observation time.
2. Normal readings arrive and the operator sees their source/session identity and latest observed state.
3. The source disconnects, duplicates or reorders readings; the view identifies stale or uncertain state rather than presenting apparent continuity.
4. The source restarts and reuses a sequence number; the product distinguishes a new session under its approved policy and preserves earlier evidence.

Challenges include messages lost before receipt, duplicates, reordering, sender clock skew, delayed delivery, oversized readings, receiver overload and sequence reuse after restart. Observed gaps are not automatically permanent loss, and a transport address alone does not authenticate a device. Product truth must distinguish received, accepted, rejected, late and not-observed categories under a declared window. These are challenges to solve, not a requirement to use UDP or any particular broker.

## Differentiation and non-goals

FieldPulse focuses on freshness and evidence gaps rather than generic event subscriptions, voting or delivery campaigns. It does not duplicate D02 SubscriptionHub's subscription lifecycle or D03 LiveRoom's host-governed response windows. No real-time safety guarantee or remote-control action is part of the proposed direction.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

Future evidence should include normal progress, duplicate arrival, out-of-order arrival, a declared observation cutoff and a restarted source. Keep arrival counts separate from unique accepted readings and explain which gaps remain uncertain. The learner should justify session identity, bounded retention and freshness interpretation under clock uncertainty. Multi-host loss, path-MTU behavior and instrument hardware compatibility require separate evidence and remain unverified.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../docs/workflow.md) governs the handoff. Current gate: learner review of this proposed concept and educational Charter.
