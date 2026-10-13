# D03 — Node.js Internals Project Candidate Catalog

**Status:** `in_review` — five differentiated product concepts proposed on 2026-10-13; **none selected or learner-approved**.
**Prerequisite:** all 18 D03 lesson chapters are `approved_by_learner` editorially; education is not assessed mastery.
**Phase:** project-catalog review only. Individual product PRDs, implementation and learner assessments are **not_started / deferred**.
**Authority:** [D03 curriculum](../curriculum.md) · [Coverage Matrix](../../../projects/coverage-matrix.md) · [Workflow](../../../docs/workflow.md).

## Purpose and selection rule

Propose **real products solving different problems** that could make Node.js runtime mechanisms consequential to a backend engineer. A product is worth its own candidate only if it has a clear target user, observable user journey, independent value, meaningful first-version boundaries and a distinct challenge. **Do not force a Worker, stream, cluster, runtime loader, database, process topology, job queue or host platform into any product requirement merely because the mechanism is taught in D03.** The implementation choices belong to separate technical discovery after learner-approved product direction.

The candidate names below are working titles, not reserved names or confirmed available brands. Candidate IDs are local identifiers only, **not selection priority**. The five options are deliberately more focused than a general service marketplace or a clone of a monitoring/automation platform. The user may approve all, select a subset, ask for changes, or reject them; **no PRD has been authored or authorized** by this catalog.

## P01 — IntakeLedger: Verified File Submission & Handoff

**User:** small operations teams receiving deliverable documents or binary attachments from customers, vendors or field agents.

**Problem:** incoming files arrive through inconsistent channels; staff cannot clearly tell which delivery was accepted, incomplete, rejected, replaced or successfully handed off.

**Product outcome:** users can submit an identified package of files, track its intake status, see integrity/format validation results, and retrieve or acknowledge accepted files. Staff can distinguish a completed handoff from an incomplete transfer.

**Core journey:** sender starts a named intake → adds bounded files → sees per-file accepted/rejected/incomplete results → reviews final package status → authorized recipient retrieves accepted artifacts and acknowledges receipt or reports an issue.

**V1 in scope:** package and sender references; upload intake and validation results; per-file and overall outcomes; transparent reasons for rejection or incomplete status; access-scoped retrieval; basic handoff history.

**Out of scope:** document collaboration, bulk ETL/analytics, public object-storage service, malware detection claims, universal resumable internet uploads, full digital-signature/legal-proof system.

**Deferred decisions/features:** supported file formats/sizes, interrupted-upload recovery, retention policy, integrity claim and evidence level, team permissions, compliance/security review, automated scans or integrations.

**Distinct engineering challenge (not a mandated solution):** bounded byte handling; partial I/O; integrity semantics; resource cleanup; failure recovery; avoiding a “success” label before the product's stated acceptance and handoff conditions.

**D03 concepts to pressure-test:** C06–C09 bytes/files/streams/pipelines; C03–C05 scheduling and event contracts; C14 memory; C16 shutdown; C17–C18 diagnostic reasoning.

**Why its own product / overlap review:** **intake and custody/handoff** are the product, not arbitrary dataset transformation. D01's Large Dataset Processing Workspace centers on resource-limited processing, not sender-recipient acceptance and handoff. P02 below transforms accepted assets rather than managing external submission and transfer responsibility.

**Potential PRD path after concept approval:** `p01-intakeledger-verified-file-intake-prd.md`.

## P02 — MediaForge: Content Asset Processing Desk

**User:** content teams or small creative agencies producing multiple versions of approved images, audio or short media assets for publication.

**Problem:** repeated asset transformations fail unpredictably, leave unclear partial outputs, and make it hard to see what is ready to publish versus still processing.

**Product outcome:** a contributor submits a supported media asset and selects from a limited set of transformations; staff can review job states, inspect successful output variants, see errors and retrieve completed deliverables.

**Core journey:** submit an asset → choose a supported output preset → track queued/running/complete/failed/indeterminate status → inspect output previews and failure explanation → retrieve approved result or request a permitted retry/cancellation.

**V1 in scope:** small curated transformation catalog; source/target asset metadata; processing job submissions and observable outcomes; downloadable outputs; per-item error and partial-result reporting; user-visible request to cancel eligible work.

**Out of scope:** user-authored executable plugins, arbitrary code execution, a public rendering farm, full digital asset management, collaborative video editing, generalized event/job orchestration or guaranteed instant cancellation.

**Deferred decisions/features:** media/preset formats, supported input/output limits, partial-output policy, ownership/access, cancellation and retry guarantees, content safety, external conversion tool constraints.

**Distinct engineering challenge:** heavy work and resource ownership under multiple requests, output lifecycle, failure isolation and uncertain cancellation, without preselecting thread versus process versus external service.

**D03 concepts:** C03–C04 scheduling; C06–C09 bytes/streams; C10–C12 native work, Workers and processes; C14 memory; C15–C18 outcome attribution and runtime diagnosis.

**Why its own product / overlap review:** creates **new processed assets and previews**, not P01's validated intake/handoff or D01's generic large-data transforms. It is a limited creative operations workflow rather than a general compute platform.

**Potential PRD path after concept approval:** `p02-mediaforge-asset-processing-prd.md`.

## P03 — NodeScope: Runtime Incident Evidence Workspace

**User:** backend engineers and small SRE/operations teams investigating Node.js service slowdown, memory problems or abnormal process exits.

**Problem:** runtime symptoms arrive as disconnected counters and logs; engineers jump to an unverified cause or lose the measurement context needed to reproduce an incident.

**Product outcome:** a team can assemble a privacy-reviewed **incident evidence packet** containing the symptom, runtime/host context, bounded measurements, hypotheses, counterevidence and next investigation steps. The workspace distinguishes a recorded observation from a diagnosis.

**Core journey:** open incident → record symptom and affected service/version → attach approved redacted metrics or diagnostic summaries → compare event-loop, CPU, memory and lifecycle observations for a defined window → annotate competing hypotheses and evidence gaps → export a reproducible handoff report.

**V1 in scope:** incident timeline and case metadata; user-provided or explicitly collected **bounded, non-sensitive** diagnostic summaries; scope/unit/version labels; hypothesis/evidence mapping; redaction review; portable human-readable incident reports.

**Out of scope:** always-on production agent, raw heap-dump hosting by default, debugging arbitrary remote customer processes, automatic root-cause claims, APM vendor replacement, incident paging/on-call management and unrestricted Inspector access.

**Deferred decisions/features:** exact supported evidence sources, safe source authentication, retention, access model, guided collection, redaction guarantees, alert integrations, baseline/comparison methods.

**Distinct engineering challenge:** evidence quality, sampling bias, context/correlation, privacy and realistic runtime failure reproduction, **without assuming tool telemetry establishes causal truth**.

**D03 concepts:** C01–C05 runtime boundaries, C10 contention, C13 module/runtime compatibility signals, C14 heap/GC, C15 context, C16 shutdown, C17 measurement, C18 integrated diagnosis.

**Why its own product / overlap review:** D01 Workload & Complexity Observatory compares algorithmic behaviors; NodeScope is an **incident investigation and evidence-management product** for real runtime observations. P04 tests package execution compatibility, not operational performance evidence.

**Potential PRD path after concept approval:** `p03-nodescope-runtime-incident-evidence-prd.md`.

## P04 — PackageClinic: Runtime Integration Preflight Desk

**User:** teams maintaining shared Node packages and applications preparing a runtime upgrade or integration release.

**Problem:** declared package compatibility can look sound while a real Node entry fails because of export maps, format interpretation, missing relative extensions, startup behavior or runtime-version mismatch.

**Product outcome:** teams assemble **trusted, approved integration scenarios** for package releases and examine reproducible startup/entry outcomes under supported target runtimes, with clear evidence rather than only declared compatibility.

**Core journey:** register a release and desired consumer entry/scenario → specify supported test environment from an approved catalog → submit or link **trusted test material** → run or import an authorized preflight result → inspect pass/fail/error type, version and reproduction instructions → compare with a previous release.

**V1 in scope:** scoped package/consumer compatibility cases; chosen supported target runtime conditions; recorded scenario outcomes and provenance; explicit distinction between observed and merely declared status; explainable failures and comparison reports; repeatable approved sample cases.

**Out of scope:** public arbitrary-code-execution endpoint, security sandbox guarantee, npm registry replacement, package publishing/installation marketplace, unrestricted untrusted customer plugin execution, full CI/CD product.

**Deferred decisions/features:** trusted input provenance, whether checks execute or import external evidence in first version, isolated evaluation policy, supported runtime/OS set, package source approvals, execution/resource limits, internal permissions.

**Distinct engineering challenge:** deterministic runtime-environment interpretation, module-identity/error classification, controlled execution boundaries and evidence provenance. Running any externally submitted code is a **significant security decision to be explicitly resolved before implementation**; this catalog does not assume it is allowed.

**D03 concepts:** C02 startup identity, C05 error contracts, C11–C13 Workers/processes/module loading, C14 memory safeguards, C16 errors/shutdown, C17–C18 reproducible diagnostics.

**Why its own product / overlap review:** D02 **PackagePassport** catalogs *declared* compatibility and integration claims. PackageClinic focuses on **observed execution evidence and reproducibility of trusted runtime preflight cases**, not a second compatibility registry. The trust/execute-versus-import boundary must be approved in its future PRD.

**Potential PRD path after concept approval:** `p04-packageclinic-runtime-preflight-prd.md`.

## P05 — LiveRoom: Interactive Event Session Operations

**User:** trainers, workshop hosts and small event organizers running live audience polls and short Q&A sessions.

**Problem:** during an interactive session, participants reconnect, updates arrive out of order or late, and the host cannot reliably tell which responses are accepted or whether a session has closed.

**Product outcome:** a host creates and runs a time-bounded session; participants join with a session reference, answer active prompts and see explicit accepted/late/unavailable outcomes, while hosts can view session totals and end the event intentionally.

**Core journey:** host creates a session → publishes a supported prompt → participants join and submit responses → each participant receives a clear accepted/rejected/out-of-window outcome → host sees an updated session summary → session closes and a final summary is available.

**V1 in scope:** session lifecycle; a limited prompt type catalog (for example single-choice poll); participant submission and visible outcome; bounded live summary and explicit reconnect/closed state; host final results.

**Out of scope:** generic event subscription broker, conference video/voice platform, collaborative whiteboard, public messaging/chat network, arbitrary real-time plugins, guaranteed zero-loss under all network outages.

**Deferred decisions/features:** participant identity, duplicate submission policy, event ordering and late-response semantics, join limits, retention, moderation, accessibility, recovery after disconnect, anonymous versus identified participation.

**Distinct engineering challenge:** concurrent users and resource lifetime; correctly scoped event states, reconnect and late outcomes; observable session-close behavior without selecting a transport/protocol implementation.

**D03 concepts:** C03–C05 event lifecycle/scheduling, C08–C09 bounded dataflow where relevant, C15 request/session context, C16 service shutdown, C17–C18 measurements and fault diagnosis.

**Why its own product / overlap review:** D02 **SubscriptionHub** centers on users subscribing to event categories and noticing gaps. LiveRoom is a **moderated participant interaction and timed poll product** with accepted response semantics; subscription management is not its principal value. P01–P04 target files, media, incidents and integration releases rather than live audience interaction.

**Potential PRD path after concept approval:** `p05-liveroom-interactive-session-prd.md`.

## Portfolio differentiation check

| Candidate | Primary customer outcome | Strongest D03 pressure | Deliberate non-overlap |
|---|---|---|---|
| P01 IntakeLedger | Accepted and verifiable file handoff | Bytes, file/stream ownership, partial I/O | Not D01 bulk dataset processing |
| P02 MediaForge | Usable transformed media variants | CPU/native work isolation, stream output, cancellation | Not P01 intake or generic queue |
| P03 NodeScope | Trustworthy scoped incident report | GC/CPU/ELU, context, runtime diagnostics | Not D01 complexity benchmarking or full APM |
| P04 PackageClinic | Reproducible runtime compatibility evidence | Node module loading, processes, startup/failure | Not D02 PackagePassport's declared-claims registry |
| P05 LiveRoom | Correct live participant/session outcomes | Event scheduling, connection lifetime, attribution | Not D02 SubscriptionHub event subscriptions |

**Coverage honesty:** these five products **offer opportunities** to challenge D03 learning, not proof they will implement every chapter. Coverage paths C01–C18 in the [Coverage Matrix](../../../projects/coverage-matrix.md) remain **teaching evidence only** until separate approved PRDs identify *actual* product challenges. No candidate is silently mapped as an approved PRD or as implemented mastery. A later selection may deliberately cover only a subset.

**Review questions (not mandatory decisions now):** Are the five user problems distinct enough? Does each V1 boundary describe a coherent product without mandating its technical implementation? Is P04 appropriately limited to **trusted** integration cases? Are any candidates too broad for a focused portfolio build?

## Next gate

**Await explicit learner review:** approve, revise, narrow or remove the **candidate catalog**. Learner approval of concepts does **not** approve PRDs or authorize implementation. Only after candidate review may the handbook author separate product-scope PRDs (one project at a time) using [PRD template](../../../templates/project-prd.md) with in/out/deferred scope, observable journeys and open product policies. Study assessment, technical architecture and implementation remain separate.

**Mandatory coverage reconciliation:** review and link this catalog from the global [Coverage Matrix](../../../projects/coverage-matrix.md) on catalog creation. Candidate existence does **not** replace a PRD row or grant a competency assessment. The canonical state and human tracker must record the catalog as `in_review`, all D03 chapters as learner-approved, and product PRDs/implementations as not_started.
