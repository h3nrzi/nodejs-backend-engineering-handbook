# MediaForge — Technical Discovery, Round 1 (T1–T9)

**Date:** 2026-10-14  
**Status:** all nine Codex recommendations APPROVED by learner. External Codex recording/ADRs NOT YET VERIFIED.  
**Source:** learner-provided complete Codex Round 1 transcript. Original question and recommendation verbatim below; educational comments are separate and authored by ChatGPT.

## T1 — Runtime and language baseline

**Exact Codex question**

❓ **T1 — Runtime and language baseline:** Shall we use **Node.js on a supported LTS release, with TypeScript for application and orchestration code**, delegating image processing to an existing media engine?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** This fits the Node.js learning context while providing static checking across commands, processing messages, and lifecycle records. JavaScript avoids a type/build layer but loses those checks; another runtime would require reconsidering the learning alignment. Exact runtime version, build tools, and libraries remain open.

**Supports:** PRD §13; FR-01, FR-04, FR-08.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** TypeScript gives static checks, not runtime upload validation; no exact runtime or build system chosen.

**Trade-off illustration:** Type safety simplifies orchestration contracts but must be paired with checks of untrusted media.

---

## T2 — Deployment envelope

**Exact Codex question**

❓ **T2 — Deployment envelope:** Shall we initially target **one continuously running deployment on a controlled Linux host**, with durable storage and explicit process supervision?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** The approved workload does not presently justify horizontal scaling or high availability. This gives us a concrete environment for process ownership, bounded execution, and restart recovery.

A managed multi-service deployment can reduce some host administration but introduces additional service boundaries, cost, and recovery coordination. Short-lived request hosting would still need durable processing elsewhere. A single host concentrates outage and disk-loss risk; backup scope, recovery objectives, hardware capacity, and hosting provider require later decisions. This proposal adds no availability SLA.

**Supports:** Q38–Q40, Q46, Q53; the deferred large-scale-processing boundary.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Host failure and disk loss remain risks requiring a recovery decision.

**Trade-off illustration:** Single-host deployment simplifies coordination but creates a shared outage boundary.

---

## T3 — Processing isolation

**Exact Codex question**

❓ **T3 — Processing isolation:** Shall we put **media decoding, validation, transformation, verification, and preview generation in bounded child processes outside the web/API process**, with operating-system resource controls?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** These operations all touch potentially expensive media content. The boundary should protect request handling during intake and review as well as conversion.

In-process native processing simplifies communication but shares process failure and resource exposure. Worker threads provide separate JavaScript execution within the same operating-system process; their resource limits are not whole-process memory limits. Remote workers introduce additional network and operational coordination. These distinctions are supported by the current [Node.js worker documentation](https://github.com/nodejs/node/blob/main/doc/api/worker_threads.md), retrieved through Context7.

Process isolation alone does not establish a resource sandbox or prove inactivity. Process lifetime, supervision, CPU/memory limits, and stopping evidence remain downstream decisions.

**Supports:** Q16, Q29, Q35, Q38–Q39, Q46–Q47, Q53.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Process isolation is not proof of bounded resources or stopped work.

**Trade-off illustration:** Malformed decoding must not crash the API; process exit does not by itself prove cancellation.

---

## T4 — Durable state authority

**Exact Codex question**

❓ **T4 — Durable state authority:** Shall we use **transactional relational current state as the authority**, accompanied by append-only records of relevant accepted actions and outcome/evidence changes?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** This offers a direct way to coordinate admission, overlapping work, reservations, selection changes, and membership rules while preserving readable history. Aggregate request labels would derive from variant outcomes.

Full event sourcing offers reconstruction from events but adds event evolution, replay, and projection work. A volatile execution queue cannot independently satisfy the restart and history requirements. We would choose the database, transaction boundaries, queue mechanism, and history structure later.

For example, simultaneous confirmations must not both accept prohibited overlapping work; the selected mechanism must enforce that atomically.

**Supports:** FR-01, FR-04, FR-07–FR-09; Q28, Q34–Q40, Q46, Q52, Q57, Q59.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Authoritative current relational state plus append-only history is not full event sourcing.

**Trade-off illustration:** Two simultaneous overlapping confirmations must not both be admitted.

---

## T5 — Identity and authorization boundary

**Exact Codex question**

❓ **T5 — Identity and authorization boundary:** Shall we **delegate credential authentication to an established identity component**, while keeping workspace membership, combinable roles, current authorization, and last-manager protection authoritative inside MediaForge?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** Authentication establishes who is acting; MediaForge determines what that person may currently do.

Relying exclusively on previously issued role claims risks stale permissions after membership removal. Building credential handling ourselves adds password, session, and account-recovery responsibilities. An embedded maintained authentication component and an external identity provider remain alternatives; provider selection, bootstrap, and session design are deferred.

A member removed after opening the desk must be denied their next protected action, while an already accepted transfer may finish.

**Supports:** FR-11, FR-13; Q18–Q19, Q50, Q58–Q59.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Authentication and current local authorization are separate authorities.

**Trade-off illustration:** Revoked membership must defeat stale role claims for new requests.

---

## T6 — Browser/server boundary

**Exact Codex question**

❓ **T6 — Browser/server boundary:** Shall we build the desk around a **same-origin browser/server API with explicit command and query contracts**, bounded file-transfer endpoints, and typed safe JSON results?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** Explicit contracts make confirmation recovery, cancellation acknowledgment, authorization, and safe error reporting inspectable. The server would own domain rules.

Server-rendered pages and actions can support the same behavior with less explicit API surface. GraphQL offers flexible queries but adds machinery for a small fixed workflow. A separate frontend origin adds deployment and browser-security coordination. This question selects neither a frontend framework nor polling versus push.

**Supports:** FR-02, FR-04, FR-08–FR-11, FR-13; Q33, Q37, Q44–Q45, Q51, Q58.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Same origin does not imply separate frontend and backend apps.

**Trade-off illustration:** A lost acknowledgment must recover a command outcome without duplicate business work.

---

## T7 — Verification assurance

**Exact Codex question**

❓ **T7 — Verification assurance:** Shall we **verify finalized candidate bytes rather than trust converter success**, calculating expected properties separately from immutable validated source information and the confirmed preset?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** A successful converter exit must not, by itself, establish readiness. Verification must examine the candidate and its exact associations, and publication must still be eligible.

Reusing only the converter’s assertions risks shared mistakes. Requiring a second independent decoder could reduce some common-mode failures, but adds dependencies and possible disagreements about valid content. I recommend deciding that additional independence after inspecting engine capabilities.

Separately sourced malformed fixtures and representative visual review would challenge shared assumptions. No per-request human approval gate is proposed.

**Supports:** FR-05, FR-12; Q29–Q33, Q47–Q48, Q55–Q56.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Independent expected properties matter; use of a second decoder is still undecided.

**Trade-off illustration:** Exit code zero with corrupted image bytes cannot become Ready.

---

## T8 — Media-engine sourcing

**Exact Codex question**

❓ **T8 — Media-engine sourcing:** Shall we use **a maintained existing media engine behind a narrow application adapter**, qualifying its capabilities before selecting the engine or encoder settings?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** Implementing codecs and color management ourselves would create substantial correctness work unrelated to the desk’s core behavior.

An external conversion service is another option, but introduces content-transfer, retention, cancellation-evidence, and availability dependencies. An existing local engine still needs scrutiny: tolerant decoding defaults, profile handling, animation detection, orientation, precision, and metadata behavior may conflict with the approved contract.

This approves a sourcing strategy only. No engine is selected, and an engine limitation cannot silently narrow product support.

**Supports:** Q14–Q17, Q29–Q32, Q47–Q48; source immutability and provenance invariants.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Engine choice must meet existing product guarantees, not redefine them.

**Trade-off illustration:** Color profiles, EXIF and animation require capability tests of candidate engines.

---

## T9 — Testing and acceptance strategy

**Exact Codex question**

❓ **T9 — Testing and acceptance strategy:** Shall we prioritize **behavior-focused integration tests across public workflows**, supplemented by real-engine fixtures, representative visual review, and controlled crash, race, time, and authorization tests?

**Complete Codex recommendation**

➡️ **Recommended: Yes.** The principal risks cross persistence, content storage, execution, and authorization boundaries.

Unit-only testing would miss those interactions. Browser-only testing would make precise fault and race exploration harder. Targeted unit tests remain useful for pure rules; concrete test seams and tools depend on the architecture.

Examples include a crash between content finalization and state recording, cancellation racing readiness, replay after a lost acknowledgment, and cleanup while a reservation remains unresolved.

**Supports:** AC-01–AC-10; Q35, Q37–Q43, Q46–Q48, Q53–Q59.

**Learner's decision:** Approved **Yes** on 2026-10-14.

**Separate educational analysis — ChatGPT:** Integration tests must cover cross-boundary failure and race behavior.

**Trade-off illustration:** Test a crash between output bytes being finalized and state recording.

---

## Decision boundary and next frontier

These are broad, approved architectural directions only. No exact Node version, web framework, database brand, media library, identity provider, supervisor, host provider, queue, test runner, or operational recovery mechanism was selected. Codex should record the approvals, evaluate actual ADR eligibility using `domain-modeling`, and ask the next full independent frontier. This archive does not claim that local Codex files were updated.
