# P05 — SubscriptionHub: Live Event Subscription Console — Product Requirements

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** learner-approved on 2026-10-12  
**PRD approval:** pending learner editorial review  
**Implementation:** not started; no runtime, transport, persistence, framework or architecture selected

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

Numeric targets for maximum concurrent subscriptions, event retention, event visibility delay, gap detection time and history-query volume require later product approval. No arbitrary performance promise is made at the concept-PRD stage.

## 4. Product scope

**In scope:** event source/category directory; subscription creation and filter definition; subscription status view; recent-event feed; event details and labels; event ordering as explicitly defined by a source; duplicate-event visibility; pause/resume or unsubscribe where supported; interruption and reconnection visibility; coverage gap identification where evidence permits; history exploration; simple time-window/category summaries; audit-oriented export; role-based visibility and subscription lifecycle history.

**Deferred:** multi-source joins, complex user-defined event transformations, cross-workspace sharing, user notification routing, advanced search, unlimited history, bulk import of subscriptions, custom rule scripting, and subscriptions to undocumented external event sources.

**Out of scope:** building a universal event broker, making arbitrary promises of exactly-once delivery, replacing an observability platform, delivering user-facing marketing notifications, managing provider infrastructure, guaranteeing restoration of unavailable historic events, or general-purpose bulk dataset processing.

## 5. Key product concepts and language

- **Event source:** a named producer/domain of business observations with documented event categories.
- **Event:** an observed occurrence with an identity, category, source and relevant event-time metadata; the product separately identifies when it became visible, if supported.
- **Subscription:** a user's saved interest in particular events from permitted sources, plus agreed filter and lifecycle behavior.
- **Observation state:** the console's account of whether new matching events are being observed, paused, interrupted, catching up or ended.
- **Coverage interval:** a period for which the product can state a specific level of confidence about observation and event visibility.
- **Gap:** a discontinuity detected from credible source sequencing or other declared evidence. An *unknown interval* is not automatically proof that events were lost.
- **Duplicate observation:** repeated presentation or delivery associated with the same event identity under the source's stated identity rules. Repeated business events with different IDs must not be silently deduplicated.

These distinctions help avoid presenting a visually continuous feed as proof of complete delivery.

## 6. Core user journeys

1. **Discover:** an operator explores permitted event sources and supported categories, with readable explanations of relevant guarantees and limits.
2. **Create:** the operator chooses a source, category filters and any supported filter parameters; the product validates the selection and saves a subscription with a clear initial state.
3. **Observe:** the operator opens the subscription console to see matching events, the latest known observation point, and a state such as active, paused, interrupted or catching up.
4. **Investigate:** the operator opens an event detail and sees source identity, event ID, relevant timestamps, category, and whether it is a duplicate observation or otherwise requires attention.
5. **Control:** the operator requests pause, resume or unsubscribe; the console explains the product-specific meaning, which events may remain visible and whether history can be recovered.
6. **Recover:** after an interruption, the console displays the last known event, any documented resumed point, evidence-backed detected gaps, and unresolved intervals. It must not silently assert continuity.
7. **Explore history:** the operator filters events by documented category, time window and subscription context, then views simple counts with disclosed limitations.
8. **Audit:** a permitted user exports a report identifying the selected subscription, observed events, lifecycle changes, known gaps and periods for which coverage cannot be established.

## 7. Functional requirements

**FR-01 — Source directory.** Users can browse the sources and categories they are allowed to subscribe to. Descriptions identify which event properties, ordering guarantees and history capabilities are known versus unspecified.

**FR-02 — Subscription identity.** Every subscription has a stable identity, creator/owner context, source selection, filter definition, creation time and lifecycle history.

**FR-03 — Filter definition.** Users can select eligible categories and supported filters. Invalid combinations and unknown categories are rejected with understandable reasons before activation.

**FR-04 — Draft/activation clarity.** Creation and activation outcomes must be explicit. A subscription request with an unknown final outcome must not silently create multiple user-visible subscriptions when repeated.

**FR-05 — Lifecycle statuses.** Product status vocabulary distinguishes requested/activating, active, paused, interrupted, catching_up (if supported), ended, and an explicitly uncertain state when authority is unavailable. Exact permitted transitions must be approved as product policy.

**FR-06 — Event feed.** Users can inspect events matching the subscription's active filter and permitted visibility. Entries identify source, event/category, relevant timestamp(s) and a stable event identifier where available.

**FR-07 — Ordering claims.** The console declares the ordering basis used in a feed (e.g., source order or observation order). It must not imply a global total order across sources unless such a guarantee is actually established.

**FR-08 — Duplicate awareness.** Where source event identity is reliable, repeated observations of the same identity are visibly marked or grouped without erasing evidence of recurrence. Where identity is unavailable, the product avoids claiming proven duplicates.

**FR-09 — Pause.** A pause request returns an explicit outcome and explains whether it merely pauses *display*, pauses subscription participation, or suspends later recovery. These semantics must never be inferred from the button label alone.

**FR-10 — Resume/reconnect.** After a permitted resume or reconnection, the interface identifies whether it continued from a known position, recovered known history, or restarted with a discontinuity.

**FR-11 — Gap reporting.** When a source provides sufficient sequencing or coverage evidence, the console highlights detected gaps with locations/intervals and supporting facts. Unknown periods are labeled uncertain and must not be converted into definite loss or definite completeness.

**FR-12 — History.** Authorized users can inspect retained events for a defined time window. Events outside retention or visibility boundaries produce an explicit limitation rather than a falsely empty result.

**FR-13 — Summaries.** Category/time-window summaries distinguish counts of observed records from guaranteed counts of all events generated at the source. Potential duplicates and incomplete coverage are disclosed where relevant.

**FR-14 — Subscription termination.** End/unsubscribe requests make further subscription behavior clear, without retroactively deleting historical observed events except where documented retention/deletion policies require it.

**FR-15 — Permission boundaries.** The product prevents unauthorized source subscription, viewing restricted events, changing another actor's subscription and exporting protected histories.

**FR-16 — Recoverability and idempotent user actions.** Repeated clicks, lost acknowledgements and concurrent lifecycle actions must not silently produce duplicated subscriptions or contradictory confirmed states; the user can reconcile intent with the authoritative resulting state.

**FR-17 — Event/data validity.** The console distinguishes malformed or unsupported event variants from valid business events; invalid input must not be silently displayed as a trustworthy event.

**FR-18 — History and report export.** Exports include source and subscription identities, selected filters, the declared ordering basis, report period, lifecycle transitions, observed event counts, known gaps, unknown intervals and any evidence/retention limitations.

## 8. Externally observable invariants

1. No user's subscription reveals events or source information outside their permitted visibility.
2. A feed entry is tied to the event source, subscription context and declared ordering basis; the product never fabricates a global ordering guarantee.
3. A gap detected from known sequencing is distinguishable from a period in which coverage is merely unknown.
4. An interruption cannot be represented as continuous, fully verified observation without supporting evidence.
5. Pausing, resuming and ending a subscription cannot retroactively change the historical meaning of previously observed events.
6. Duplicate display and duplicate underlying business events are not equated without a documented identity rule.
7. A repeated subscription lifecycle action can be reconciled with the same user intent rather than silently spawning independent subscriptions.
8. Time-window summaries clearly state whether they measure observed events or a complete source interval.
9. A status shown as confirmed active/paused/ended must correspond to an authoritative known result; uncertainty remains explicit until resolved.
10. Historical records and exported reports remain traceable under agreed privacy and retention rules.

## 9. Nonfunctional constraints and quality expectations

The console must offer readable live, empty, paused, interrupted, catching-up and error states; keyboard and mobile usability; meaningful accessible status indicators beyond color; clear category and time-window controls; and non-misleading loading/refresh behavior. It should distinguish stale observations from a verified no-event interval.

Users need product-approved bounds for active subscriptions per account, event payload size, retention, historical queries, report size and acceptable update delays. Long-running views should not silently lose already acknowledged content. Sensitive event fields require agreed disclosure and redaction policies. User-controlled event descriptions and metadata must be displayed safely; subscription filters must not execute arbitrary code.

## 10. Edge cases, failures and recovery

- A user subscribes to an unavailable or no-longer-authorized source.
- Zero matching events: true absence, delayed visibility and incomplete coverage require different feedback when the system has evidence.
- An event contains an unfamiliar category or missing/invalid required metadata.
- Two events have identical visible content but distinct event IDs; they are not automatically duplicates.
- A source presents repeated event IDs with differing contents; discrepancy is visible rather than silently merged.
- Events arrive out of expected order or source-provided timestamps disagree with visibility times.
- A source provides no reliable sequence numbers; gaps cannot be proven from sequence alone.
- A connection/observation interruption spans an interval for which source history is unavailable.
- The user pauses while new events are already being observed; exact effect and residual events need disclosed semantics.
- A resume request is acknowledged late or its result is lost; duplicate actions are reconciled rather than silently creating conflicting states.
- A subscription expires or is ended while an operator is watching; UI changes to a truthful terminal state.
- Retention removes older events; history and summaries must note the limit.
- Two operators attempt conflicting changes to a shared subscription.
- A user exports a report before catch-up completes; the report states its coverage window and uncertainty.
- Another workspace's event IDs or subscription identifiers are guessed; unauthorized access is denied.
- Event bursts exceed agreed display or retention limits; truncation and summary limitations remain visible.

## 11. Acceptance criteria and scenarios

**AC-01:** Given a permitted source and valid filters, a subscription can be created and its saved source/category configuration shown accurately.

**AC-02:** Given an unsupported category or invalid filter, activation is rejected with a specific reason and no false active subscription.

**AC-03:** Given an active subscription with no observed matching events, the interface distinguishes the absence of observations from a proven complete empty period where evidence is insufficient.

**AC-04:** Given two observations with the same reliable event identity, the UI surfaces duplication without reporting the second as a proven new business occurrence.

**AC-05:** Given content-identical events with different reliable identities, the product does not silently merge them.

**AC-06:** Given source-provided sequencing that establishes a missing interval, the product highlights a detected gap with supporting evidence.

**AC-07:** Given a disconnection and no evidence for whether events occurred, the period is marked uncertain rather than confirmed complete or confirmed lost.

**AC-08:** Given a feed spanning sources without a shared ordering guarantee, the interface does not label its sort order globally authoritative.

**AC-09:** Given a pause request while events are in flight, the resulting state and any late-visible observations match the documented pause policy.

**AC-10:** Given a resumable subscription and eligible retained history, the user sees the resumed position and any catch-up state; inaccessible history is not fabricated.

**AC-11:** Given an activation response lost after a possible successful activation, repeating the same user intent recovers or reconciles its status without silently generating a separate subscription.

**AC-12:** Given two conflicting lifecycle actions on an outdated shared subscription revision, the stale action is rejected or reconciled visibly.

**AC-13:** Given a user lacking permission to view an event source, direct attempts to inspect its event history fail without disclosing event payloads.

**AC-14:** Given a summary for a period that crosses unknown coverage, the result is labeled as observed-event count rather than total events emitted.

**AC-15:** Given a report export for an interrupted subscription, the report identifies last-known observation, known gaps, unknown periods and the report's time window.

**AC-16:** Given an ended subscription, historical events remain discoverable only under the defined retention and privacy policy and the console does not claim continued live observation.

## 12. Assumptions, unknowns and product decisions

1. What initial event domain provides the clearest practical value (e.g. service-status updates, inventory alerts, order-status changes or internal operations)?
2. Does the product begin with one event source per subscription or support multiple sources from launch?
3. Which source guarantees are available and documented: event IDs, timestamps, sequence positions, historical retrieval, continuity evidence?
4. What exactly does **pause** mean: stop display, stop intake, or suspend eligibility for subsequent catch-up?
5. What guarantees, if any, does **resume** provide when events occurred during a pause?
6. How should subscription creation behave when an initiation outcome is uncertain?
7. Can a source/category define its own payload shape, and who approves field visibility?
8. How long is event history retained; can users delete or redact observed records?
9. Which categories or payload fields are confidential, and what sharing model is appropriate?
10. Which status transitions and finality rules must be enforced for ended/expired subscriptions?
11. What are the limits for active subscriptions, events per window, large payloads and report sizes?
12. How should incomplete or contradictory ordering evidence be described without misleading users?
13. Are manual source definitions acceptable at launch, and who may attest to claimed source guarantees?
14. How should timestamps and timezones be presented for consumers in different locations?

**Recommended initial defaults for learner review—not approved:** one bounded business-event domain; one source per subscription; explicit event identity and coverage metadata where source-provided; conservative unknown-coverage reporting; a documented pause/resume policy; limited retained history; and observed-count summaries rather than unsupported completeness guarantees.

## 13. Explicit non-goals

Not a general event infrastructure platform, broker, provider integration framework, real-time collaboration engine, log analytics replacement, universal stream processor, message queue, monitoring system or notification marketing suite. No specific transport, framework, streaming API, runtime or hosting topology is selected or implied by this PRD.

## 14. D02 learning outcomes and project differentiation

This product translates D02's **iterables, event abstractions, asynchronous composition, lifecycle cleanup, runtime data validation, discriminated unions, cancellation semantics and explicit failure states** into an operationally useful product. It forces precise distinctions between observed events, duplicate observations, ordering assumptions and unknowable gaps.

It differs from P01 ContractGuard (data-contract compatibility), P02 DispatchDesk (outbound delivery attempts), P03 PolicyLens (business-rule decisions), P04 PackagePassport (release integration compatibility) and D01's data-processing and concurrency simulation products. Node-specific streams, event-loop implementation and host transport choices remain for later domains or independent implementation discovery.

## 15. Approval record

**Project concept:** learner-approved with the five D02 candidates on 2026-10-12.  
**PRD editorial review:** pending learner approval.  
**Open product questions:** documented in Section 12.  
**Study assessment, technical design and implementation:** not started.
