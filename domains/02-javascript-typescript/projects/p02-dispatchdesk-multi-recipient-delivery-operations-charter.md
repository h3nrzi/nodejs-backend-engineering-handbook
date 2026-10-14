# Project Charter — p02 dispatchdesk multi recipient delivery operations

**Status:** Learner-approved educational/project direction; Final PRD NOT CREATED. **Authority:** Handbook scope and learning intent only. Codex generates product-discovery.md, final-charter.md and module-plan.md after implementation kickoff and owner approval. Historical full draft is available in git history.

# P02 — DispatchDesk: Multi-Recipient Delivery Operations — Project Direction

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** learner-approved, 2026-10-12  
**project briefs approval:** approved by learner; open product decisions remain  
**Implementation:** not started; technical architecture deliberately unspecified
**Approval boundary:** editorially approved problem, users, in/out/deferred scope and indispensable product behavior; detailed open policies do not block this approval.
**Decision timing:** use installed Matt Pocock skills with Codex at this project's kickoff for unresolved first-version decisions; learner approves consequential choices and any scope change before dependent technical design.



## 1. Problem and motivation

Operational teams need to contact many recipients, but bulk dispatch creates uncertain results: some attempts succeed, some are rejected, some remain pending and others lose confirmation. Operators cannot safely distinguish retries from duplicates or tell which recipients need attention. DispatchDesk provides a focused workspace for preparing, initiating, tracking and reconciling a batch of outgoing messages.



## 2. Audience and actors

- **Operator:** prepares batches, reviews recipient validation and starts eligible sends.
- **Supervisor:** reviews outcomes, resolves uncertain cases under policy and authorizes sensitive cancellation/retry actions.
- **Auditor:** views historical intent, actions and recipient-level outcomes without modifying them.
- **Recipient:** receives a message externally but is not necessarily an authenticated workspace user.

Specific role/approval rules are open product decisions; this project briefs does not prescribe identity infrastructure.



## 3. Goals and measurable outcomes

Every batch gives a clearly understandable answer to: which intended recipients were eligible, which attempts were started, which deliveries are confirmed, which were rejected, which remain pending and which outcomes are uncertain. Users can distinguish a retry of an existing intent from a new delivery. Every recipient result exposes its authoritative evidence level. Quantitative capacity, latency, rate, retention and confirmation targets require product approval rather than guessed values.



## 4. In scope, deferred and out of scope

**In:** compose a batch with one message and recipient set; preview and validate; save drafts; initiate a batch; per-recipient outcome tracking; progress and aggregate summary; cancel unstarted work where permitted; retry/reconcile eligible unknown or failed attempts; readable action history; export outcome report.

**Deferred:** multi-channel routing, personalization templates, scheduling campaigns, approval chains, inbound replies, complex audience segmentation and recurring campaigns.

**Out:** marketing automation suite, contact CRM, universal message broker, building actual telecom infrastructure, promising message reads/open rates, unrestricted provider-specific configuration, guaranteed rollback of deliveries.



## 12. Explicit non-goals

Not a broadcast broker, provider implementation, scheduling platform, CRM, marketing suite, guaranteed delivery/reading system or bulk spam utility. No claim of sending through any named commercial service is made.



## 14. Approval record

**Concept approved:** 2026-10-12 as part of five differentiated D02 product ideas.
**project briefs editorial approval:** learner-approved on 2026-10-12; product direction and boundaries confirmed. Detailed product questions remain open for Matt-guided project kickoff.
**Implementation and learning assessment:** not started.


## Workflow gate

Codex conducts product discovery, consolidates the final PRD, prepares a reviewed module plan and works module-by-module: scoped technical grilling → to-spec → to-tickets → implement → verify. No library, infrastructure, architecture or technical approach is mandated by this Charter.
