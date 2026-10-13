# P03 — NodeScope: Runtime Incident Evidence Workspace — Product Requirements

**Domain:** D03 — Node.js Internals  
**Status:** approved_by_learner — product scope approved explicitly with five-PRD batch on 2026-10-13  
**Concept:** learner-approved in five-item D03 catalog, 2026-10-13  
**PRD approval:** explicit learner approval on 2026-10-13; technical implementation not started  
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

The product boundary is the approval target. Supporting technical mechanisms remain open and no PRD sentence mandates a runtime topology or library.

## 5. Product capabilities and user journeys

1. **Open:** investigator records the observed symptom and affected runtime/time-window without presuming a cause.
2. **Evidence:** contributor adds approved redacted observations (e.g., elapsed time, CPU, ELU, memory, process exit) with units, source and scope.
3. **Analyze:** investigator records competing hypotheses; links each to supporting/contradicting entries and notes uncollected signals.
4. **Review:** reviewer challenges a conclusion and requests clarification when windows/units differ or observations are missing.
5. **Handoff:** case owner exports a readable report containing timeline, context, evidence, hypotheses, uncertainty and next diagnostic tests.

## 6. Functional requirements

**FR-01.** Every incident has stable case identity, summary, affected component/context, declared observation interval and lifecycle.

**FR-02.** An evidence entry has source, measurement name/statement, unit where quantitative, sample interval, process/thread/host scope if known, and an explicit provenance/uncertainty label.

**FR-03.** A user can record that a metric is unavailable or its source/time scope is uncertain, rather than entering fabricated values.

**FR-04.** The product distinguishes **raw observation**, contributor interpretation, hypothesis and reviewed conclusion as separate fields/labels.

**FR-05.** Hypotheses can list both supporting and contradicting evidence and must not silently inherit an authoritative verified tag.

**FR-06.** An evidence list/timeline does not imply a total cross-process order where clock alignment is absent.

**FR-07.** Privacy/redaction review is required before a case export is shared beyond its permitted audience.

**FR-08.** Unsafe or unsupported raw artifacts (such as unrestricted heap dumps or sensitive process reports) are not accepted as ordinary shareable evidence in V1.

**FR-09.** Permitted reviewers can annotate gaps and change a case's review status without deleting underlying cited observations.

**FR-10.** A report identifies the case, versioned evidence entries, unresolved questions, affected runtime/version, scope gaps and evidence quality.

**FR-11.** Access rules apply to case listings, evidence retrieval and exports; restricted cases do not disclose evidence to unrelated users.

**FR-12.** Old reports or citations remain distinguishable from later edited hypotheses; material updates do not silently replace prior signed-off conclusions.

**FR-13.** Incidents can be closed as 'documented' or 'inconclusive' without pretending that an unproven cause became certain.

## 7. Engineering problems and externally observable invariants

**Core product invariants:**
- A number without source, unit or known scope is not presented as comparable high-confidence evidence.
- A trace ID or coincident timestamp cannot on its own certify causal ordering or external transaction completion.
- An imported note cannot rewrite an existing observed measurement silently or impersonate an accepted review.
- Private incident data never becomes accessible merely because someone knows its case ID.
- A share/export identifies both evidence and uncertainty; closure does not turn an inference into a fact.
- The workspace does not execute arbitrary diagnostics against an external production host by default.

**Challenges, not implementation prescriptions:** Evidence provenance, measurement identity, cross-context causal uncertainty, privacy and review workflows. A technical collection agent/vendor is not selected.

## 8. Nonfunctional constraints and quality expectations

- Support understandable error/empty/restricted/inconclusive states; keyboard-usable timeline and report review.
- Bound evidence sizes and report volume; make data minimization, access restriction and retention explicit at kickoff.
- Identify units, process/Worker scope and Node/runtime version in reports; never sum overlapping heap/external/RSS fields as one memory total.
- Reports explain observation versus inference visually and textually, not with color only.
- Avoid implying professional incident-response certification or production diagnosis accuracy from synthetic D03 examples.

Concrete numerical limits and optional policy details belong to approved product discovery at project kickoff; nothing in D03's synthetic fixture timings is a product performance commitment.

## 9. Edge cases, failure behavior and recovery expectations

- An investigator lacks the exact Node version; a metric has no unit; two samples cover disjoint windows.
- Process and Worker metrics mixed incorrectly; wall-clock sources disagree.
- A JSON summary is malformed or claims metrics that are unsupported.
- Contributors disagree; evidence changes after a report has been exported.
- A case has no evidence, contradictory evidence or no defensible root cause.
- Evidence includes credentials or identifiable user data requiring redaction/refusal.
- Viewer loses authorization during review; deletion/retention policy removes data after a report existed.
- A team closes an inconclusive case and later reopens it with a new observation.

The implementation must not invent successful external outcomes from timeouts, disconnections or local diagnostic observations. Rules for genuinely uncertain business outcomes need explicit product authority.

## 10. Acceptance criteria and scenarios

**AC-01.** Given an incident with symptom and runtime identity, when saved, a reviewer can identify its declared scope and latest investigation status.

**AC-02.** Given a metric with a missing unit/scope, when compared with a reliable one, it is flagged non-comparable rather than normalized silently.

**AC-03.** Given ELU and CPU values for one interval, the report preserves their distinct meanings and does not label ELU as CPU percentage.

**AC-04.** Given contradictory evidence, when recording hypotheses, both supporting and rebutting entries remain visible.

**AC-05.** Given no evidence of remote outcome, when exporting, the report cannot state that a missing response proves rollback.

**AC-06.** Given suspected sensitive content in an uploaded report, when review is required, restricted details are not publicly exposed by default.

**AC-07.** Given two actors with different permissions, when accessing a private incident, the unauthorized actor cannot list or export its evidence.

**AC-08.** Given a report previously exported, when observations are later edited, the reviewer can distinguish the prior reviewed version from later changes.

**AC-09.** Given an inconclusive case, the owner can close it as documented-with-gaps without fabricating a root cause.

**AC-10.** Given an incident report with time windows from two unsynchronized hosts, the report labels the chronology as uncertain.

These are testable **requirements**, not evidence that tests have been executed or a product implemented.

## 11. Assumptions, unknowns and product-level open questions

**Proposed V1 fixed boundary:** A **case-oriented evidence and handoff workspace** based on explicitly provided bounded summaries; not a collector that inspects arbitrary production machines or a deployment/alerting platform.

**Questions retained for learner-approved Matt/Codex product discovery before dependent technical choices:**
1. Which safe summary formats and manually entered observation fields are essential in V1?
2. Who may review and publish redacted incident exports, and how is access restricted?
3. What provenance labels, sample windows and version fields are required before comparison?
4. What are safe size, case count and retention/deletion policies?
5. What constitutes a reviewed vs inconclusive outcome without overpromising causality?
6. Should V1 require any automatic collection? Proposed boundary: **no**; such integrations remain deferred.

Defer detail when it does not change the basic product. If an open decision could change who uses the product or what the first version actually does, it must be resolved/approved before the PRD can become `approved_by_learner`.

## 12. Explicit non-goals

Not a commercial APM suite, automatic production operator, remote execution/debugger, privileged heap-report store, alerting/on-call tool or guaranteed root-cause service.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.

## 13. Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C01–C05, C10, C13–C18 (runtime identities, failure causality, measurements, memory and shutdown).

**Distinctness and portfolio rationale:** Unlike D01 Workload & Complexity Observatory (algorithmic benchmark experiments), NodeScope supports **runtime incident evidence review and handoff**, not synthetic algorithm comparisons; unlike P04 it does not run integration preflight cases.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.

## 14. Approval record

- **2026-10-13 — concept approval:** user approved all five ideas in the D03 candidate catalog.
- **2026-10-13 — PRD author review:** authored as part of a five-PRD batch using the approved concept, `templates/project-prd.md` and `docs/quality-gates.md`; status **in_review**.
- **2026-10-13 — PRD approval:** learner explicitly approved all five PRDs as one batch; this product's scope and externally observable requirements are approved. Later detailed policies remain open for learner-led discovery.
- **Not started:** any learner study assessment, code, integration test, implementation repository work or technical ADR.
- **Later selected-project kickoff:** resolve necessary first-version product details using installed Matt Pocock skills and learner confirmation before technical design; require explicit approval for any changes to problem, audience, capabilities or in/out scope.

**Next gate:** reconcile global Coverage Matrix, domain indexes and both trackers, then close the D03 content-authoring gate following the five-PRD batch approval. No D04 authoring or product implementation is started by this draft.
