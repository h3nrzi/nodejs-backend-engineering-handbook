# Project Charter — P05 — LiveRoom: Interactive Event Session Operations

**Domain:** D03  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic Node.js runtime learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Problem and motivation

During a workshop or live classroom, audience answers can arrive late, disconnect or be repeated, while the host cannot tell which responses were accepted. Basic chat channels do not provide reliable prompt windows and clear participant feedback. **LiveRoom** is a lightweight guided session product: the user value is **transparent response acceptance and a usable live host summary**, not a generalized event broker or video platform.

## Audience and actors

- **Host:** creates a bounded session, opens/closes prompts and reviews summary.
- **Participant:** joins a permitted session, sees the currently available question and submits a response.
- **Session assistant/co-host (deferred):** additional event administration if separately approved.
- **Workspace organizer:** oversees access to owned sessions and resulting summaries as permitted.

Actors describe product responsibility and visibility, not a mandated identity implementation.

## Goals and measurable outcomes

A host can conduct a time-bounded interactive poll with a clear session lifecycle; a participant knows whether their response was accepted, rejected, late or uncertain; host totals reflect the accepted set and remain interpretable after closing. The product works under the approved session/participant limits without claiming universal zero loss or instant delivery.

Evidence for these goals is the externally observable workflow and acceptance tests, **not** invented throughput, operational SLOs or deployed service results.

## Product boundary: in / out / deferred

**In scope for V1:**
- Create and open a named session with a join reference and a host-owned lifecycle.
- Publish one active prompt at a time from a limited initial prompt type catalog (V1 default direction: single-choice poll).
- Allow eligible participants to join and read current prompt/session state.
- Accept or reject responses under explicit prompt-window/participant policy, with visible outcome per submission.
- Show a timely host summary of accepted responses and an honest connection/update state to relevant participants.
- Close prompts and the session; show a stable final summary of accepted outcomes.
- Explain reconnect, duplicate, late and invalid submissions consistently with the published product rules.

**Out of scope:**
- Video/audio conferencing, chat network, collaborative whiteboard, arbitrary scriptable activities.
- General subscriber/event transport broker, full webinar ticketing/payment system or public message archive.
- Guarantees of zero loss, global instantaneous delivery, strict cross-device ordering or automatic correction of remote clock skew.
- Complex audience segmentation, real-time moderation platform, and unlimited attendee scale.

**Deferred until separately approved:**
- Multi-question branching quizzes, free-text Q&A, scoring or automated assessment.
- Co-host collaboration, multi-event enterprise organizations and analytics beyond one session summary.
- Offline-first answering, automatic transcript/video recording and cross-event participant profiles.
- Advanced moderation, anonymous abuse protection and externally integrated event management.

The product boundary is the approval target. Supporting technical mechanisms remain open and no project briefs sentence mandates a runtime topology or library.

## Explicit non-goals

No video/audio meetings, text chat, universal broker, unbounded public survey service, advanced quiz authoring or guaranteed never-lost network delivery in V1.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.

## Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C03–C05, C08–C09 as appropriate, C15–C18 (events and scheduling, observable session outcomes, context, shutdown/failure diagnostics).

**Distinctness and portfolio rationale:** Unlike D02 SubscriptionHub (long-lived subscription to event categories and gap notices), LiveRoom centers on **host-governed prompt windows and participant response acceptance**; it is not an event transport infrastructure product.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.

## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
