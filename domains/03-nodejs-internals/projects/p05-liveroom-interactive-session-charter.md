# Project Charter — p05-liveroom-interactive-session

**Status:** Learner-approved project direction for Domain 03; Final PRD NOT CREATED. No current implementation started. Historical detailed scope draft remains recoverable from git history.

**Primary purpose:** build a useful product that challenges Node.js runtime fundamentals: event-loop responsiveness, asynchronous I/O, streams/backpressure, filesystem/resource ownership, process isolation, controlled cancellation and diagnostic evidence. These are learning challenges, NOT predetermined implementations.

# P05 — LiveRoom: Interactive Event Session Operations — Project Direction

**Domain:** D03 — Node.js Internals  
**Status:** approved_by_learner — product scope approved explicitly with five-project briefs batch on 2026-10-13  
**Concept:** learner-approved in five-item D03 catalog, 2026-10-13  
**project briefs approval:** explicit learner approval on 2026-10-13; technical implementation not started  
**Learning assessments / implementation:** deferred / not_started



## 1. Problem and motivation

During a workshop or live classroom, audience answers can arrive late, disconnect or be repeated, while the host cannot tell which responses were accepted. Basic chat channels do not provide reliable prompt windows and clear participant feedback. **LiveRoom** is a lightweight guided session product: the user value is **transparent response acceptance and a usable live host summary**, not a generalized event broker or video platform.



## 2. Audience and actors

- **Host:** creates a bounded session, opens/closes prompts and reviews summary.
- **Participant:** joins a permitted session, sees the currently available question and submits a response.
- **Session assistant/co-host (deferred):** additional event administration if separately approved.
- **Workspace organizer:** oversees access to owned sessions and resulting summaries as permitted.

Actors describe product responsibility and visibility, not a mandated identity implementation.



## 3. Goals and measurable outcomes

A host can conduct a time-bounded interactive poll with a clear session lifecycle; a participant knows whether their response was accepted, rejected, late or uncertain; host totals reflect the accepted set and remain interpretable after closing. The product works under the approved session/participant limits without claiming universal zero loss or instant delivery.

Evidence for these goals is the externally observable workflow and acceptance tests, **not** invented throughput, operational SLOs or deployed service results.



## 4. Product boundary: in / out / deferred

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



## 12. Explicit non-goals

No video/audio meetings, text chat, universal broker, unbounded public survey service, advanced quiz authoring or guaranteed never-lost network delivery in V1.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.



## 13. Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C03–C05, C08–C09 as appropriate, C15–C18 (events and scheduling, observable session outcomes, context, shutdown/failure diagnostics).

**Distinctness and portfolio rationale:** Unlike D02 SubscriptionHub (long-lived subscription to event categories and gap notices), LiveRoom centers on **host-governed prompt windows and participant response acceptance**; it is not an event transport infrastructure product.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.



## 14. Approval record

- **2026-10-13 — concept approval:** user approved all five ideas in the D03 candidate catalog.
- **2026-10-13 — project briefs author review:** authored as part of a five-project briefs batch using the approved concept, `templates/project-charter.md` and `docs/quality-gates.md`; status **in_review**.
- **2026-10-13 — project briefs approval:** learner explicitly approved all five project briefs as one batch; this product's scope and externally observable requirements are approved. Later detailed policies remain open for learner-led discovery.
- **Not started:** any learner study assessment, code, integration test, implementation repository work or technical ADR.
- **Later selected-project kickoff:** resolve necessary first-version product details using installed Matt Pocock skills and learner confirmation before technical design; require explicit approval for any changes to problem, audience, capabilities or in/out scope.

**Next gate:** reconcile global Coverage Matrix, domain indexes and both trackers, then close the D03 content-authoring gate following the five-project briefs batch approval. No D04 authoring or product implementation is started by this draft.


## Implementation kickoff gate

The independent-project Codex process must create and obtain explicit owner approval for `product-discovery.md`, then `final-charter.md`, then `module-plan.md`. Each approved module uses module-scoped technical discovery → to-spec → to-tickets → implementation → verification. Product scope cannot be expanded to force any Node.js mechanism.
