# Project Charter — D04-P06 — SessionTrail: Interrupted assistance sessions

**Domain:** D04 — Network & Protocol Engineering
**Educational review:** approved_by_learner — concept and Educational Project Charter explicitly approved by the Product Owner on 2026-10-15; [approval scope](../evidence/editorial-approval.md).
**Product Discovery / Final PRD / Module Plan / implementation:** not_started.
**Learner competency:** not_assessed.

This is an educational product direction for review, not a finalized V1 contract, technical design or commitment to build.

## Problem and users

A customer and a remote support specialist work through a short troubleshooting checklist. If either connection drops, both may see a different current step or believe an instruction was acknowledged when it was merely sent. SessionTrail helps the pair understand which guidance and acknowledgments were actually observed, where continuity is uncertain and how to resume a bounded assistance session.

## Initial product boundary

Initial direction: a specialist starts a limited assistance session, shares named checklist steps with one permitted participant, records explicit participant acknowledgment and shows connection/resumption status. After interruption, both can reconcile the last known step and any gap instead of silently replaying an instruction as a new action.

Out of scope: general chat, video/audio calling, remote desktop control, collaborative document editing, host-governed voting, durable legal receipt and guaranteed delivery of every transient update. Deferred: multiple specialists, offline multi-device editing and large workflow automation. Session expiry, acknowledgment meaning, replay window, supported clients and authorization remain consequential product questions for learner approval.

## Learning objectives for the domain

Direct proposed learning challenges: [D04-C14](../lessons/14-websocket-sessions-and-control.md), [D04-C15](../lessons/15-server-sent-events-and-resumption.md), [D04-C17](../lessons/17-deadlines-retries-and-uncertain-outcomes.md). These connect to observable product problems below. Supporting knowledge: [D04-C03](../lessons/03-tcp-delivery-and-connection-lifecycle.md), [D04-C04](../lessons/04-framing-and-incremental-parsers.md), [D04-C06](../lessons/06-tls-identity-and-negotiation.md), [D04-C09](../lessons/09-http-clients-and-connection-pools.md), [D04-C11](../lessons/11-proxies-routing-and-trust-boundaries.md), [D04-C18](../lessons/18-network-diagnostics-and-case-studies.md); it can inform reasoning without becoming a required feature or mechanism.

The learner should distinguish byte transport, protocol completion and product acknowledgment; describe resource/compatibility limits; and justify a diagnosis with actual scoped evidence. No lesson mapping requires implementing a specific Node API or every protocol it teaches.

## Target product journeys and expected failure cases

1. A specialist creates a named session and a permitted participant joins with a visible initial state.
2. The specialist issues a checklist step; sent, observed and explicitly acknowledged states remain distinguishable where the approved policy requires them.
3. One participant disconnects after a step is sent but before acknowledgment is confirmed; both see a qualified uncertainty.
4. The participant returns; the product reconciles supported history or clearly reports a gap, then closes the session with an honest final state.

Challenges include slow consumers, duplicate notifications after reconnect, missing history outside retention, stale-session messages, abrupt transport loss, intermediary buffering and a close handshake that does not prove prior application acknowledgment. The solution must bound per-participant work and avoid portraying an open connection as current state. Either one-way update transport or bidirectional messaging may fit later decisions; no transport or session architecture is chosen here.

## Differentiation and non-goals

This is a two-person assistance continuity product, not a generic subscription console, chat system or LiveRoom voting product. Its value is explicit instruction/acknowledgment uncertainty through interruption. Acknowledging receipt of an instruction does not by itself establish that the participant performed it; the meaning of each acknowledgment and its visible wording remain explicit discovery questions. Existing D02/D03 approved scopes remain untouched, and the proposed challenges do not force WebSocket, SSE or both into an implementation.

No framework, database, queue, deployment, operating-system control, architecture or implementation technology is selected. Educational Node examples do not bind this project. Numeric limits and build-blocking policies are resolved with the learner before dependent engineering.

## Learning evidence and reflection

Future evidence should demonstrate a normal step and acknowledgment, interruption between the two, slow-consumer behavior, a reconnect within supported history and a reconnect with unavailable history. Preserve observed session references and the actual gap/duplicate result. The learner should explain why protocol ping, connection-open state and browser event dispatch are weaker than an explicit application acknowledgment, and why forced closure does not reverse prior work.

All examples in these journeys are proposed evaluation cases. No portfolio behavior, application tests, capacity measurements or learner mastery is verified. The domain's executed educational labs are separate artifacts and cannot be reused as project implementation evidence.

## Implementation kickoff handoff

Only after explicit learner editorial approval and project selection, import this Charter into a separate repository. Codex authors `product-discovery.md` using installed `grill-with-docs` with product focus; the learner approves consequential policies. Codex then authors an explicitly owner-approved `final-prd.md`, followed by an explicitly owner-approved `module-plan.md`. For each selected module: module-scoped technical discovery (`grill-with-docs`) → `to-spec` → `to-tickets` → `implement` → verification and acceptance. Verify the installed skill names at kickoff; this Charter claims none have run.

Do not write Final PRD, Module Plan, ADRs or implementation architecture in the Handbook. [Workflow V2](../../../docs/workflow.md) governs the handoff. Educational authoring gate closed. Project selection and separate-repository discovery remain future actions.
