# P02 — DispatchDesk: Multi-Recipient Delivery Operations — Product Requirements

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** learner-approved, 2026-10-12  
**PRD approval:** approved by learner; open product decisions remain  
**Implementation:** not started; technical architecture deliberately unspecified

## 1. Problem and motivation

Operational teams need to contact many recipients, but bulk dispatch creates uncertain results: some attempts succeed, some are rejected, some remain pending and others lose confirmation. Operators cannot safely distinguish retries from duplicates or tell which recipients need attention. DispatchDesk provides a focused workspace for preparing, initiating, tracking and reconciling a batch of outgoing messages.

## 2. Audience and actors

- **Operator:** prepares batches, reviews recipient validation and starts eligible sends.
- **Supervisor:** reviews outcomes, resolves uncertain cases under policy and authorizes sensitive cancellation/retry actions.
- **Auditor:** views historical intent, actions and recipient-level outcomes without modifying them.
- **Recipient:** receives a message externally but is not necessarily an authenticated workspace user.

Specific role/approval rules are open product decisions; this PRD does not prescribe identity infrastructure.

## 3. Goals and measurable outcomes

Every batch gives a clearly understandable answer to: which intended recipients were eligible, which attempts were started, which deliveries are confirmed, which were rejected, which remain pending and which outcomes are uncertain. Users can distinguish a retry of an existing intent from a new delivery. Every recipient result exposes its authoritative evidence level. Quantitative capacity, latency, rate, retention and confirmation targets require product approval rather than guessed values.

## 4. In scope, deferred and out of scope

**In:** compose a batch with one message and recipient set; preview and validate; save drafts; initiate a batch; per-recipient outcome tracking; progress and aggregate summary; cancel unstarted work where permitted; retry/reconcile eligible unknown or failed attempts; readable action history; export outcome report.

**Deferred:** multi-channel routing, personalization templates, scheduling campaigns, approval chains, inbound replies, complex audience segmentation and recurring campaigns.

**Out:** marketing automation suite, contact CRM, universal message broker, building actual telecom infrastructure, promising message reads/open rates, unrestricted provider-specific configuration, guaranteed rollback of deliveries.

## 5. Main user journeys

1. Operator starts a draft with campaign title, message content and a list of intended recipients.
2. Product identifies duplicates, malformed destinations and otherwise invalid entries; operator resolves issues or explicitly excludes recipients.
3. Operator reviews a preview stating intended recipient count, exclusions and product-defined delivery constraints.
4. Authorized operator initiates dispatch and receives a stable batch identity. Reload or response loss must not silently create a second distinct batch for the same confirmed initiation intent.
5. Status view distinguishes queued, in progress, delivered/confirmed, rejected, cancelled-before-start and unknown outcomes.
6. Operator can request a stop; UI reports which items were prevented and which were already in flight or completed.
7. Operator inspects uncertain attempts and requests reconciliation or permitted retry, with explicit duplicate-risk protections.
8. Auditor exports a report of intended recipients, distinct attempts, status evidence and decisions.

## 6. Functional requirements

**FR-01 Draft identity.** Each batch draft has a stable identifier, title, message content, recipient set and editable revision. A newly initiated batch is linked to the draft revision submitted.

**FR-02 Recipient validation.** Validation distinguishes invalid address syntax, missing data, duplicate destinations within a batch and policy-ineligible recipients. A destination is not assumed reachable simply because it is well formed.

**FR-03 Deduplication semantics.** The product defines how duplicate recipient entries are identified and displayed; automatic collapse must be visible and cannot silently lose requested message variations.

**FR-04 Preview.** Before dispatch, display count of intended, eligible, excluded and duplicate entries and a preview of the exact message to be sent. Changes after preview require renewed confirmation if they alter the intended send.

**FR-05 Start.** An authorized action starts an eligible batch with a stable logical submission identity. Repeating an identical initiation after a lost response must allow recovery of the same intent rather than blindly launching duplicates.

**FR-06 Recipient states.** Each intended recipient has a visible state and history. Distinguish not started, processing, confirmed success, definitive rejection, cancelled before start and uncertain outcome.

**FR-07 State evidence.** A successful provider acknowledgement must not be described as proof a human received or read the message. The UI states what "delivered" means for the chosen product policy.

**FR-08 Progress.** Display aggregate counts consistent with recipient states. Progress calculations must not silently classify unknown outcomes as successful or failed.

**FR-09 Stop request.** A stop/cancel request prevents eligible future sends where possible but never claims to undo already completed delivery. In-flight attempts may finish after the request.

**FR-10 Retry eligibility.** Product distinguishes retryable definitive rejection, unretryable rejection and unknown outcome. An uncertain attempt requires reconciliation or explicit policy for safe repeated intent; blind duplicate delivery is not an acceptable default.

**FR-11 Reconciliation.** Users can request or view a later authoritative status check for an uncertain recipient. Where authoritative resolution is unavailable, retain an explicit unknown status with guidance rather than inventing success or failure.

**FR-12 Audit history.** Record visible batch actions and meaningful recipient transitions, including actor, time, reason where applicable, and relation between original and repeat attempts.

**FR-13 Reports.** Export a human-readable, privacy-conscious summary identifying the batch, submitted revision, recipient totals, outcomes, unresolved items and any applied exclusions or retries.

**FR-14 Permission boundary.** Viewing, starting, cancelling and retrying follow product roles; unauthorized requests cannot change batch or recipient state.

## 7. Externally observable invariants

- Each initiated batch refers to the exact reviewed message and recipient set, not silently edited later content.
- Every intended recipient has a distinguishable outcome or pending state; none disappear from totals without an explicit exclusion.
- Aggregate counts reconcile to the corresponding recipient-level records under a documented definition.
- Cancellation never rewrites a genuinely completed delivery into "cancelled."
- Transport timeout or disconnection alone never proves a message was rejected or delivered.
- Retrying an existing logical delivery intent cannot silently become a new duplicate intent.
- Earlier outcomes and operator actions remain inspectable under the agreed retention policy.
- Concurrent operator edits/actions cannot silently overwrite a newer revision or falsify a terminal confirmed outcome.

## 8. Nonfunctional and quality expectations

The workspace supports accessible keyboard interactions, readable progress and recovery states, clearly differentiated statuses and mobile-usable inspection. The product must show when data is stale or reconciliation is pending. Sensitive recipient information is displayed only to permitted roles and redacted in exports when policy requires. Explicit bounds are needed for recipients per batch, message size, retention, audit visibility and report size. Failure messages must not leak credentials, private transport details or recipient secrets.

## 9. Edge cases and failure/recovery behavior

- Duplicate destinations expressed with different allowed formatting; ambiguous normalization.
- Empty draft, zero eligible recipients or message changed after preview.
- An initiation succeeds remotely but acknowledgement is lost.
- Supervisor cancels while several sends are already active; remaining results arrive afterward.
- Recipients become ineligible between validation and start.
- An individual dispatch returns no authoritative outcome.
- A "retry" is requested twice, or two operators attempt it concurrently.
- Some recipients are confirmed while others reject, and aggregate completion must remain truthful.
- Source data/report export interrupted; retry must not alter historical results.
- Restricted user attempts to inspect another workspace's recipient details.
- Client reload during in-progress delivery; state must be reconstructible.
- A completed batch is opened after a status semantics/policy change; original evidence meaning must remain clear.

## 10. Acceptance criteria

**AC-01:** Given an invalid or duplicate recipient, preview identifies the problem and makes inclusion/exclusion unambiguous.

**AC-02:** Given a draft changed after preview, a prior confirmation cannot initiate an undisclosed changed recipient set/message.

**AC-03:** Given a successful initiation whose response was lost, an identical repeat can recover that batch without unannounced duplicate submission.

**AC-04:** Given a mixed-result batch, counts and per-recipient status agree, including unresolved outcomes.

**AC-05:** Given an uncertain attempt, the product does not label it rejected merely because of timeout.

**AC-06:** Given cancellation after some sends began, only work genuinely prevented from starting is marked cancelled-before-start; active and completed work remain truthful.

**AC-07:** Given a confirmed result, subsequent retry actions do not silently trigger a second send for the same logical intent.

**AC-08:** Given two conflicting operator actions, the losing stale action is rejected or reconciled visibly.

**AC-09:** Given a user without start/retry permission, the action is denied without changing batch state.

**AC-10:** Given an exported report, it names unresolved cases and uses the declared meaning of confirmed delivery, without claiming recipient read receipt.

**AC-11:** Given a reload during processing, batch identity, per-recipient state and any outstanding uncertainty can be recovered.

**AC-12:** Given no eligible recipients, start is not treated as a successful delivery campaign; the UI explains why initiation is unavailable.

## 11. Assumptions and unresolved product questions

1. Initial outbound channel and what evidence qualifies as confirmed delivery?
2. Primary recipient identity/normalization and duplicate semantics?
3. Maximum recipients, content length, total payload size and submission frequency?
4. Must supervisors approve start, cancellation or retries, or are role permissions sufficient?
5. Which rejection reasons permit retry, and is explicit operator override ever allowed?
6. What outcome-reconciliation capability is expected if the external provider offers no status lookup?
7. How long should drafts, histories and reports remain visible, and who can delete them?
8. May partially sent batches be resumed, or only unfinished individual recipients retried?
9. Which privacy and consent/opt-out policies are mandatory for target users?
10. What constitutes a completed batch when some recipient results remain unknown?

**Starting recommendations, not approved decisions:** one outbound channel, explicit conservative duplicate handling, stable intent identity, truthful unknown state, operator-visible per-recipient history, and no promise of cancellation after initiation.

## 12. Explicit non-goals

Not a broadcast broker, provider implementation, scheduling platform, CRM, marketing suite, guaranteed delivery/reading system or bulk spam utility. No claim of sending through any named commercial service is made.

## 13. Why it belongs in D02

DispatchDesk forces careful treatment of asynchronous composition, partial success, cancellations, Promise failure versus domain rejection, unknown outcomes, resource lifetimes and typed status variants. Its user problem is operational outbound delivery, distinct from ContractGuard's contract validation and D01's concurrency simulation.

## 14. Approval record

**Concept approved:** 2026-10-12 as part of five differentiated D02 product ideas.
**PRD editorial approval:** pending learner review. Product decision questions intentionally open.
**Implementation and learning assessment:** not started.
