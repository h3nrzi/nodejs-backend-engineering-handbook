# P05 — LiveRoom: Interactive Event Session Operations — Product Requirements

**Domain:** D03 — Node.js Internals  
**Status:** in_review — proposed product direction awaiting **one batch learner approval**  
**Concept:** learner-approved in five-item D03 catalog, 2026-10-13  
**PRD approval:** pending; neither approval nor technical implementation implied  
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

The product boundary is the approval target. Supporting technical mechanisms remain open and no PRD sentence mandates a runtime topology or library.

## 5. Product capabilities and user journeys

1. **Create:** host creates a session with recognizable title and supported participation rules.
2. **Open:** host publishes an allowed single-choice prompt and participants with an eligible join reference view it.
3. **Respond:** participant submits a choice and receives accepted/rejected/late/already-submitted feedback.
4. **Observe:** host sees the current accepted-response tally and participants see whether the live state is updating or disconnected.
5. **Close:** host closes the prompt/session and reviews an identifiable final summary; late responses are handled according to the declared window.
6. **Return:** participant reconnects and sees current session/prompt state without being silently assumed to have a successful submission.

## 6. Functional requirements

**FR-01.** Every session has stable identity, host context, join eligibility and explicit states such as draft, open and closed.

**FR-02.** Prompts have stable identity, choices, published/open/closed state and ownership by one session.

**FR-03.** Only a permitted host may open/close a prompt or close the session; unauthorized edits cannot change accepted responses.

**FR-04.** A participant sees an identifiable prompt/session before responding and receives a distinguishable outcome for submission.

**FR-05.** A response is evaluated against current prompt eligibility and session lifecycle, not merely the participant's clock.

**FR-06.** Duplicate or repeated submission outcomes follow a visibly declared V1 policy, without silent double counting.

**FR-07.** A response received after the accepted window closes is not counted as timely solely because the sender's screen was stale.

**FR-08.** Host totals represent the currently accepted responses under the declared counting policy; excluded/invalid/late submissions are not hidden as valid tallies.

**FR-09.** A closed session has a reviewable final summary tied to its session/prompt identities; later views do not silently rewrite prior accepted counts.

**FR-10.** Reconnect shows the current authoritative prompt/session and known previous response outcome, or explicitly unknown status when reconciliation is unavailable.

**FR-11.** A participant cannot submit or read private sessions they are not eligible to join; host-only sensitive controls remain restricted.

**FR-12.** An unavailable update or disconnected UI is labeled as stale/unknown rather than pretending the host sees a real-time result.

**FR-13.** Unsupported prompt type or a session over a published limit gets explained feedback without starting an invalid event.

## 7. Engineering problems and externally observable invariants

**Core product invariants:**
- One response cannot be counted simultaneously as accepted and rejected for the same effective submission.
- A session/prompt closed to submissions never silently accepts an additional late response as though it were on time.
- Summary counts correspond to the effective accepted response set under the documented duplicate/amendment policy.
- A disconnected participant's missing acknowledgment is **unknown**, not automatic proof of rejection.
- Host session changes and participant access honor the agreed permission boundary.
- The host's final summary remains distinguishable from transient live estimates or connection status.

**Challenges, not implementation prescriptions:** Concurrent events, lifecycle and admission ordering, request/session attribution, partial connectivity and outcome reconciliation. No WebSocket, polling, process topology or broker is required by the PRD.

## 8. Nonfunctional constraints and quality expectations

- Usable mobile and desktop join/answer flows, keyboard-accessible host and participant interfaces and readable non-color-only states.
- Publish participant/session/prompt limits and accepted response window behavior at kickoff.
- Avoid embedding sensitive participant data in public join references or exposing one person's private response to unrelated participants.
- Ensure summary freshness is labeled; define a reasonable user-visible refresh/latency target during product discovery instead of inventing a benchmark.
- Explain stale, unavailable, closed, late and duplicate outcomes without assigning false success.

Concrete numerical limits and optional policy details belong to approved product discovery at project kickoff; nothing in D03's synthetic fixture timings is a product performance commitment.

## 9. Edge cases, failure behavior and recovery expectations

- Participant joins after a prompt opened or immediately before its deadline.
- Response sent before host closes, arrives after host closes; host clock versus participant clock differs.
- Participant double-clicks, retries after a response disappears or joins on two devices.
- Host closes a session while an answer is in flight; updates race with summary generation.
- Connection breaks after server accepts an answer but before participant receives acknowledgment.
- Participant accesses an expired or unauthorized join reference.
- Host publishes a new prompt while older results are still displayed; UI shows stale poll.
- Session has zero responses; choices with zero votes; host tries to reopen a closed session.
- Unsupported prompt type and over-limit attendee/session.

The implementation must not invent successful external outcomes from timeouts, disconnections or local diagnostic observations. Rules for genuinely uncertain business outcomes need explicit product authority.

## 10. Acceptance criteria and scenarios

**AC-01.** Given a host-created open session and active supported poll, when a permitted participant joins, the correct current prompt is displayed.

**AC-02.** Given a valid timely choice, when submitted, the participant sees an accepted outcome and the host summary includes it exactly according to the declared counting policy.

**AC-03.** Given an invalid choice, when submitted, the product rejects it with a reason and does not count it.

**AC-04.** Given a closed prompt, when a new response arrives, it receives a late/closed outcome and cannot change the final accepted count.

**AC-05.** Given a repeated submission after acknowledgment loss, when the participant returns, the app can show the authoritative result or explicit unknown state without silent double counting.

**AC-06.** Given a host closes a session, when the final summary is opened, it matches the accepted response set and identifies the session and prompt.

**AC-07.** Given a live connection interruption, the participant/host UI shows stale or reconnecting state, not unqualified up-to-date status.

**AC-08.** Given an unauthorized viewer, when requesting restricted host summary or action, it is unavailable without exposing protected participant details.

**AC-09.** Given a prompt with no accepted answers, when viewed, the summary shows zero rather than a fictitious average or missing data.

**AC-10.** Given an in-flight answer during host closure, the result is resolved under an explicit agreed ordering policy, not random duplicate accepted records.

These are testable **requirements**, not evidence that tests have been executed or a product implemented.

## 11. Assumptions, unknowns and product-level open questions

**Proposed V1 fixed boundary:** A **time-bounded, host-run interactive polling session** with clear participant response outcomes and host tallies; not generic event subscription or a video/chat platform. First useful format is a bounded choice prompt; extra activity types are deferred.

**Questions retained for learner-approved Matt/Codex product discovery before dependent technical choices:**
1. Must V1 support anonymous join by link, named participants or a restricted team identity?
2. Does one participant have one effective vote per prompt, and can the participant change it before closure?
3. Is the accepted window defined by host action, an optional timer or both?
4. What happens to in-flight answers exactly at closure, and which outcome authority resolves ambiguous delivery?
5. Which participant/session/prompt limits and result retention are appropriate?
6. Are live totals visible to participants or only the host, and when are final summaries shared?

Defer detail when it does not change the basic product. If an open decision could change who uses the product or what the first version actually does, it must be resolved/approved before the PRD can become `approved_by_learner`.

## 12. Explicit non-goals

No video/audio meetings, text chat, universal broker, unbounded public survey service, advanced quiz authoring or guaranteed never-lost network delivery in V1.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.

## 13. Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C03–C05, C08–C09 as appropriate, C15–C18 (events and scheduling, observable session outcomes, context, shutdown/failure diagnostics).

**Distinctness and portfolio rationale:** Unlike D02 SubscriptionHub (long-lived subscription to event categories and gap notices), LiveRoom centers on **host-governed prompt windows and participant response acceptance**; it is not an event transport infrastructure product.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.

## 14. Approval record

- **2026-10-13 — concept approval:** user approved all five ideas in the D03 candidate catalog.
- **2026-10-13 — PRD author review:** authored as part of a five-PRD batch using the approved concept, `templates/project-prd.md` and `docs/quality-gates.md`; status **in_review**.
- **Pending:** learner accepts or requests changes to **all five PRDs together**. Concept approval does not imply PRD approval.
- **Not started:** any learner study assessment, code, integration test, implementation repository work or technical ADR.
- **Later selected-project kickoff:** resolve necessary first-version product details using installed Matt Pocock skills and learner confirmation before technical design; require explicit approval for any changes to problem, audience, capabilities or in/out scope.

**Next gate:** when learner explicitly approves the batch of five PRDs, reconcile global Coverage Matrix and both trackers before closing the **D03 content-authoring gate**. No D04 authoring or product implementation is started by this draft.
