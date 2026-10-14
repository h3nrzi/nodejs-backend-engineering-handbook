# Project Charter — p05 subscriptionhub live event subscription console

**Status:** Learner-approved educational/project direction; Final PRD NOT CREATED. **Authority:** Handbook scope and learning intent only. Codex generates product-discovery.md, final-prd.md and module-plan.md after implementation kickoff and owner approval. Historical full draft is available in git history.

# P05 — SubscriptionHub: Live Event Subscription Console — Product Requirements

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** learner-approved on 2026-10-12  
**project briefs approval:** learner-approved on 2026-10-12; open product decisions remain  
**Implementation:** not started; no runtime, transport, persistence, framework or architecture selected
**Editorial product boundary:** problem, users, in/out/deferred scope and essential observable behavior are learner-approved; incidental policies and numerical limits may remain open.
**Matt/Codex kickoff:** choose necessary first-version details through the installed Matt Pocock skill workflow with explicit learner approval; preserve approved non-goals and obtain separate approval for any scope change before dependent technical design.



## 1. Problem and motivation

Operators responsible for event-driven business workflows need to know what their subscriptions are following, what happened while they were watching, and whether a disruption means an event was missed. When updates arrive in bursts or an observation is interrupted, a list of recent events alone can falsely suggest uninterrupted coverage. Repeated events may be mistaken for new work; missing events can go unnoticed; and pause or unsubscribe actions may be interpreted as stronger guarantees than the product can provide.

SubscriptionHub is a focused operational console for **defining subscriptions to business-event categories**, exploring relevant event history, and clearly communicating each subscription's active, paused, interrupted, or uncertain coverage state. Its key value is transparency about *what the product knows and does not know* about delivery and continuity.



## 2. Audience and actors

- **Subscriber/operator:** creates a subscription, defines category filters, observes incoming events, pauses/resumes or ends eligible subscriptions and investigates interruptions.
- **Workspace manager:** configures permissions and reviews organization-level subscriptions and usage.
- **Event-source administrator:** documents event categories, source identity, and available continuity or history guarantees; may view diagnostic coverage information.
- **Auditor/analyst:** reviews historical subscription states, event records and explanations without necessarily editing subscriptions.

A human subscriber is a product user; the concept does not require direct interaction with the event's original business actor. These roles do not imply a chosen identity-provider design.



## 3. Goals and measurable outcomes

A user can reliably answer: **What am I subscribed to? Which events are visible? Is observation currently active? Was coverage interrupted? What evidence supports event order, gaps or duplicates? What can be recovered?**

Product-level success checks include: every displayed event identifies its subscription/source context; subscription transitions are visible and understandable; interruptions never appear as verified continuous coverage; a user can identify the last known event before an interruption; and reports clearly distinguish confirmed evidence from unknown periods.

Numeric targets for maximum concurrent subscriptions, event retention, event visibility delay, gap detection time and history-query volume require later product approval. No arbitrary performance promise is made at the concept-project briefs stage.



## 13. Explicit non-goals

Not a general event infrastructure platform, broker, provider integration framework, real-time collaboration engine, log analytics replacement, universal stream processor, message queue, monitoring system or notification marketing suite. No specific transport, framework, streaming API, runtime or hosting topology is selected or implied by this project briefs.



## 14. D02 learning outcomes and project differentiation

This product translates D02's **iterables, event abstractions, asynchronous composition, lifecycle cleanup, runtime data validation, discriminated unions, cancellation semantics and explicit failure states** into an operationally useful product. It forces precise distinctions between observed events, duplicate observations, ordering assumptions and unknowable gaps.

It differs from P01 ContractGuard (data-contract compatibility), P02 DispatchDesk (outbound delivery attempts), P03 PolicyLens (business-rule decisions), P04 PackagePassport (release integration compatibility) and D01's data-processing and concurrency simulation products. Node-specific streams, event-loop implementation and host transport choices remain for later domains or independent implementation discovery.



## 15. Approval record

**Project concept:** learner-approved with the five D02 candidates on 2026-10-12.  
**project briefs editorial review:** approved by learner on 2026-10-12; product questions remain open.  
**Open product questions:** documented in Section 12.  
**Study assessment, technical design and implementation:** not started.


## Workflow gate

Codex conducts product discovery, consolidates the final PRD, prepares a reviewed module plan and works module-by-module: scoped technical grilling → to-spec → to-tickets → implement → verify. No library, infrastructure, architecture or technical approach is mandated by this Charter.
