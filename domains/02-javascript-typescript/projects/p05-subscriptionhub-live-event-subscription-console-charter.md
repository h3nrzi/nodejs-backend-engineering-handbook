# Project Charter — P05 — SubscriptionHub: Live Event Subscription Console

**Domain:** D02  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic JavaScript/TypeScript learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Problem and motivation

Operators responsible for event-driven business workflows need to know what their subscriptions are following, what happened while they were watching, and whether a disruption means an event was missed. When updates arrive in bursts or an observation is interrupted, a list of recent events alone can falsely suggest uninterrupted coverage. Repeated events may be mistaken for new work; missing events can go unnoticed; and pause or unsubscribe actions may be interpreted as stronger guarantees than the product can provide.

SubscriptionHub is a focused operational console for **defining subscriptions to business-event categories**, exploring relevant event history, and clearly communicating each subscription's active, paused, interrupted, or uncertain coverage state. Its key value is transparency about *what the product knows and does not know* about delivery and continuity.





## Audience and actors

- **Subscriber/operator:** creates a subscription, defines category filters, observes incoming events, pauses/resumes or ends eligible subscriptions and investigates interruptions.
- **Workspace manager:** configures permissions and reviews organization-level subscriptions and usage.
- **Event-source administrator:** documents event categories, source identity, and available continuity or history guarantees; may view diagnostic coverage information.
- **Auditor/analyst:** reviews historical subscription states, event records and explanations without necessarily editing subscriptions.

A human subscriber is a product user; the concept does not require direct interaction with the event's original business actor. These roles do not imply a chosen identity-provider design.





## Goals and measurable outcomes

A user can reliably answer: **What am I subscribed to? Which events are visible? Is observation currently active? Was coverage interrupted? What evidence supports event order, gaps or duplicates? What can be recovered?**

Product-level success checks include: every displayed event identifies its subscription/source context; subscription transitions are visible and understandable; interruptions never appear as verified continuous coverage; a user can identify the last known event before an interruption; and reports clearly distinguish confirmed evidence from unknown periods.

Numeric targets for maximum concurrent subscriptions, event retention, event visibility delay, gap detection time and history-query volume require later product approval. No arbitrary performance promise is made at the concept-project briefs stage.





## Explicit non-goals

Not a general event infrastructure platform, broker, provider integration framework, real-time collaboration engine, log analytics replacement, universal stream processor, message queue, monitoring system or notification marketing suite. No specific transport, framework, streaming API, runtime or hosting topology is selected or implied by this project briefs.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
