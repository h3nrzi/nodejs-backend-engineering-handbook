# Project Charter — P03 — NodeScope: Runtime Incident Evidence Workspace

**Domain:** D03  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic Node.js runtime learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Problem and motivation

Teams investigating a Node.js crash, memory growth or slow endpoint have screenshots, assorted logs and counters collected at different times. A high event-loop utilization number is mistaken for CPU usage, and anecdotes become 'root cause' without comparable windows or evidence gaps. **NodeScope** organizes **reviewable, privacy-minimized incident evidence** and competing explanations. Its value is an auditable diagnostic handoff, **not** an always-on APM agent or automatic production root-cause engine.





## Audience and actors

- **Incident investigator:** opens a case, states a falsifiable symptom, organizes available observations and competing hypotheses.
- **Evidence contributor:** supplies or records explicitly permitted *redacted* metrics, summaries and context.
- **Reviewer:** challenges unsupported conclusions, annotates gaps and approves the handoff summary where enabled.
- **Workspace manager:** controls case visibility and permitted evidence handling at the product level.

Actors describe product responsibility and visibility, not a mandated identity implementation.





## Goals and measurable outcomes

Given a realistic incident, a reviewer can determine **which Node process/runtime and observation window** each measurement describes, distinguish observation from inference, compare hypotheses, see missing evidence and export a self-contained handoff. Success is that case conclusions cannot be silently presented as verified when they lack supporting entries; unsupported metrics do not receive invented values.

Evidence for these goals is the externally observable workflow and acceptance tests, **not** invented throughput, operational SLOs or deployed service results.





## Product boundary: in / out / deferred

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





## Explicit non-goals

Not a commercial APM suite, automatic production operator, remote execution/debugger, privileged heap-report store, alerting/on-call tool or guaranteed root-cause service.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.





## Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C01–C05, C10, C13–C18 (runtime identities, failure causality, measurements, memory and shutdown).

**Distinctness and portfolio rationale:** Unlike D01 Workload & Complexity Observatory (algorithmic benchmark experiments), NodeScope supports **runtime incident evidence review and handoff**, not synthetic algorithm comparisons; unlike P04 it does not run integration preflight cases.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.





## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
