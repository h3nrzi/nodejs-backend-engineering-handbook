# Project Charter — p03-nodescope-runtime-incident-evidence

**Status:** Learner-approved project direction for Domain 03; Final PRD NOT CREATED. No current implementation started. Historical detailed scope draft remains recoverable from git history.

**Primary purpose:** build a useful product that challenges Node.js runtime fundamentals: event-loop responsiveness, asynchronous I/O, streams/backpressure, filesystem/resource ownership, process isolation, controlled cancellation and diagnostic evidence. These are learning challenges, NOT predetermined implementations.

# P03 — NodeScope: Runtime Incident Evidence Workspace — Project Direction

**Domain:** D03 — Node.js Internals  
**Status:** approved_by_learner — product scope approved explicitly with five-project briefs batch on 2026-10-13  
**Concept:** learner-approved in five-item D03 catalog, 2026-10-13  
**project briefs approval:** explicit learner approval on 2026-10-13; technical implementation not started  
**Learning assessments / implementation:** deferred / not_started



## 1. Problem and motivation

Teams investigating a Node.js crash, memory growth or slow endpoint have screenshots, assorted logs and counters collected at different times. A high event-loop utilization number is mistaken for CPU usage, and anecdotes become 'root cause' without comparable windows or evidence gaps. **NodeScope** organizes **reviewable, privacy-minimized incident evidence** and competing explanations. Its value is an auditable diagnostic handoff, **not** an always-on APM agent or automatic production root-cause engine.



## 2. Audience and actors

- **Incident investigator:** opens a case, states a falsifiable symptom, organizes available observations and competing hypotheses.
- **Evidence contributor:** supplies or records explicitly permitted *redacted* metrics, summaries and context.
- **Reviewer:** challenges unsupported conclusions, annotates gaps and approves the handoff summary where enabled.
- **Workspace manager:** controls case visibility and permitted evidence handling at the product level.

Actors describe product responsibility and visibility, not a mandated identity implementation.



## 3. Goals and measurable outcomes

Given a realistic incident, a reviewer can determine **which Node process/runtime and observation window** each measurement describes, distinguish observation from inference, compare hypotheses, see missing evidence and export a self-contained handoff. Success is that case conclusions cannot be silently presented as verified when they lack supporting entries; unsupported metrics do not receive invented values.

Evidence for these goals is the externally observable workflow and acceptance tests, **not** invented throughput, operational SLOs or deployed service results.



## 4. Product boundary: in / out / deferred

**In scope for V1:**
- Create an incident case with symptom, observed impact, time window, affected service/runtime identity and current investigation status.
- Manually record or import **approved, bounded, redacted diagnostic summaries** and relevant notes; no automatic unrestricted collection from external services in V1.
- Record metric units, origin and process/Worker scope, collection time and any known missing measurements.
- Add falsifiable hypotheses and link supporting/contradicting evidence and explicit uncertainties.
- View a timeline and compare relevant observations with their source, sample limits and provenance.
- Review/redact evidence before sharing and export a human-readable incident handoff report.
- Restrict private evidence and report access to permitted collaborators.

**Out of scope:**
- Always-on host agent or APM replacement; live universal monitoring dashboards for arbitrary production systems.
- Unrestricted Inspector access, remote debugging/control, raw heap snapshots or secret-rich diagnostic reports by default.
- Automatic root-cause certainty, remediation deployments, incident paging/escalations and automated production rollback.
- Unbounded ingestion of raw customer logs, traces or credentials.

**Deferred until separately approved:**
- Approved on-host evidence collectors and integrations with observability vendors.
- Cross-service/distributed tracing reconstruction and global clock synchronization.
- Automatic hypothesis ranking, incident alerting, historical trend baselining and organization-wide compliance workflows.

The product boundary is the approval target. Supporting technical mechanisms remain open and no project briefs sentence mandates a runtime topology or library.



## 12. Explicit non-goals

Not a commercial APM suite, automatic production operator, remote execution/debugger, privileged heap-report store, alerting/on-call tool or guaranteed root-cause service.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.



## 13. Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C01–C05, C10, C13–C18 (runtime identities, failure causality, measurements, memory and shutdown).

**Distinctness and portfolio rationale:** Unlike D01 Workload & Complexity Observatory (algorithmic benchmark experiments), NodeScope supports **runtime incident evidence review and handoff**, not synthetic algorithm comparisons; unlike P04 it does not run integration preflight cases.

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
