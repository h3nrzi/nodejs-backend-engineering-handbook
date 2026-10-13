# P04 — PackageClinic: Runtime Integration Preflight Desk — Product Requirements

**Domain:** D03 — Node.js Internals  
**Status:** in_review — proposed product direction awaiting **one batch learner approval**  
**Concept:** learner-approved in five-item D03 catalog, 2026-10-13  
**PRD approval:** pending; neither approval nor technical implementation implied  
**Learning assessments / implementation:** deferred / not_started

## 1. Problem and motivation

A release can advertise compatible types or documented exports while actual Node entry points fail for the consumer's runtime due to package-scope interpretation, missing ESM extensions, export conditions or startup-time errors. **PackageClinic** helps an authorized package team **exercise a small catalog of trusted, explicitly approved integration scenarios** and record their reproducible outcomes. This is execution-backed preflight evidence, not a registry of asserted compatibility or a public code-execution platform.

## 2. Audience and actors

- **Package maintainer:** registers the release and a trusted compatibility case that they are authorized to test.
- **Consumer integrator:** selects supported consumer expectations, reviews test result and release comparison.
- **Authorized operator/reviewer:** approves what material and scenario may be executed and interprets failure evidence.
- **Workspace manager:** limits access to internal packages, reports and trusted test material.

Actors describe product responsibility and visibility, not a mandated identity implementation.

## 3. Goals and measurable outcomes

For an explicitly supported scenario and target Node runtime, a team can see whether **a real approved execution** passed or failed, with its environment, entry, observed error/outcome and bounded evidence. Results are reproducible enough for an engineer to investigate, and unsupported runtime combinations are never labeled compatible. No security isolation or cross-platform guarantee is assumed.

Evidence for these goals is the externally observable workflow and acceptance tests, **not** invented throughput, operational SLOs or deployed service results.

## 4. Product boundary: in / out / deferred

**In scope for V1:**
- Register a package/release reference and consumer entry/scenario with stable identifiers and declared provenance.
- Select from a deliberately **small, operator-approved catalog of runtime conditions and trusted scenarios**.
- Execute **only owner/operator-approved, trusted test material** within explicit safe-use conditions, or attach a clearly marked externally executed result as supplemental evidence.
- Record whether an individual scenario actually ran, passed, failed, could not run or produced an uncertain/incomplete outcome.
- Show human-readable failure class, relevant public entry/export/format expectation, runtime/environment and reproduction context.
- Compare observations for two eligible package releases without claiming universal future compatibility.
- Restrict scenario execution permissions and evidence viewing; preserve bounded history of observed results.

**Out of scope:**
- Public arbitrary-code-as-a-service, browser code playground, unrestricted third-party package execution or security-sandbox guarantee.
- Full npm registry/mirror, publish manager, automatic dependency upgrade or dependency vulnerability scanning.
- Full CI/CD platform, generalized load/stress testing or automatic production rollout.
- Assertion that running one small case proves security or all consumer use cases.

**Deferred until separately approved:**
- Accepting broader untrusted source packages (requires separate security/product scope approval, possibly a new product class).
- Large runtime/OS matrix, continuous scheduled checks and broad organization integrations.
- Generated migration patches, automated environment provisioning or comprehensive policy-as-code.

The product boundary is the approval target. Supporting technical mechanisms remain open and no PRD sentence mandates a runtime topology or library.

## 5. Product capabilities and user journeys

1. **Register:** maintainer identifies trusted package/release/consumer entry and expected scenario behavior.
2. **Scope:** operator checks material provenance, permissions and supported conditions before allowing a preflight.
3. **Execute:** permitted user starts a supported trusted scenario and sees execution state and eventual observed result.
4. **Diagnose:** integrator views actual runtime/version, error classification, expected vs observed entry behavior and reproducible evidence.
5. **Compare:** integrator compares a subsequent trusted release against earlier results, with explicit unsupported and not-run cases.

## 6. Functional requirements

**FR-01.** Each package release, scenario definition, consumer entry and result has independent stable identity and provenance.

**FR-02.** Supported Node runtime and environment conditions are visible **before** the permitted test request.

**FR-03.** The system accepts runtime execution only for vetted, explicitly authorized trusted scenarios; untrusted/anonymous arbitrary code is out of scope.

**FR-04.** The operator's product authority to run a scenario is explicit and checked; a viewer's right to read results is distinct from right to submit/execute material.

**FR-05.** Each run records scenario identity, expected behavior, runtime/environment identity, start/outcome state and applicable evidence.

**FR-06.** A passing result means only that the defined assertions succeeded **for that scenario/environment**; it does not assert universal package compatibility.

**FR-07.** A missing dependency, unsupported environment, startup failure, module loading error and test assertion failure are distinguishable where observable.

**FR-08.** One run's failure cannot silently change earlier package metadata or a previous observed result.

**FR-09.** An interrupted or unclear run is marked unknown/incomplete rather than pass or presumed failure, with safe next-step guidance.

**FR-10.** A comparison identifies both releases, tested scenarios and supported environment conditions, and highlights untested combinations as gaps.

**FR-11.** The product can show a separately labeled externally produced verification record when that record is allowed, without pretending the product itself executed it.

**FR-12.** Results and scenario details are visible only to permitted workspace actors; sensitive package contents and logs follow a minimized evidence policy.

**FR-13.** The user can find readable error and reproduction information for a failing trusted scenario within safe disclosure constraints.

**FR-14.** An over-limit/unsupported/ineligible scenario is refused with an intelligible reason and not recorded as a passed check.

## 7. Engineering problems and externally observable invariants

**Core product invariants:**
- A green/compatible result always points to a specific actually executed trusted scenario, environment and observed expectation.
- Not-run, inaccessible, indeterminate or unsupported conditions never masquerade as successful compatibility checks.
- An unauthorized request cannot execute code or reveal restricted package data.
- A successful runtime preflight is **not** a safety certification or arbitrary-workload compatibility promise.
- A previous run result remains distinguishable from a later run or changed scenario definition.
- The permitted execution scope remains limited to trusted reviewed material; untrusted public submissions are never silently admitted.

**Challenges, not implementation prescriptions:** Accurate runtime/entry failure classification, execution authority and provenance, process lifetime/unknown outcomes, and security review. **No isolation technology, topology or execution platform is prescribed** by product scope.

## 8. Nonfunctional constraints and quality expectations

- Publish narrow supported runtime, scenario and resource limits before implementation; always label unsupported systems.
- Restrict who can provide and approve trusted executable material; do not assume that any Node runtime mechanism is a security sandbox.
- Handle private package source, logs and test evidence as confidential; set deletion/redaction and report access policy.
- Provide meaningful permission, invalid input, failed, blocked and incomplete states with reproducible read-only results.
- Do not claim guaranteed isolation or safe handling of arbitrarily hostile code; the trusted-only V1 boundary is a deliberate restriction.

Concrete numerical limits and optional policy details belong to approved product discovery at project kickoff; nothing in D03's synthetic fixture timings is a product performance commitment.

## 9. Edge cases, failure behavior and recovery expectations

- ESM relative import omits extension while CommonJS require succeeds; import/require conditions differ.
- Package `exports` hides an otherwise existing file; a scoped package changes module interpretation.
- Specified runtime unavailable or environment incompatible; evaluator cannot obtain trusted package material.
- Scenario unexpectedly hangs, crashes, fails to report completion or produces huge output.
- Test appears green but compares the wrong release or wrong entry.
- Two test runs share an input but have distinct environments and different results.
- The operator removes a scenario's permission after a request was queued.
- Externally produced result arrives without independently verifiable environment identity or source.
- Private release log contains tokens, filesystem paths or sensitive source material.

The implementation must not invent successful external outcomes from timeouts, disconnections or local diagnostic observations. Rules for genuinely uncertain business outcomes need explicit product authority.

## 10. Acceptance criteria and scenarios

**AC-01.** Given a permitted trusted package scenario and supported runtime, when an authorized test runs, its result identifies actual runtime, scenario, outcome and evidence.

**AC-02.** Given a package entry that fails an ESM import in a supported fixture, when run, the failure appears as an actual observed error tied to that entry/version.

**AC-03.** Given an unsupported runtime combination, when selected, the UI does not claim a passed compatibility check.

**AC-04.** Given an untrusted anonymous code submission, when attempted, V1 refuses execution and does not treat it as an approved scenario.

**AC-05.** Given a viewer without execution permission, when requesting a preflight run, no executable work is started.

**AC-06.** Given a run interrupted before a reliable result, when inspected, it shows an honest incomplete/unknown state and a documented next action.

**AC-07.** Given identical package releases tested under two supported runtimes, the comparison retains separate results rather than combining them into a single compatibility label.

**AC-08.** Given imported third-party evidence, when displayed, the report clearly distinguishes imported observations from executions performed through this product.

**AC-09.** Given logs containing potentially sensitive details, when reviewing or exporting, access and minimization rules prevent unintended disclosure.

**AC-10.** Given a newer execution of an edited scenario, previous reviewed results still identify their earlier scenario definition and environment.

These are testable **requirements**, not evidence that tests have been executed or a product implemented.

## 11. Assumptions, unknowns and product-level open questions

**Proposed V1 fixed boundary:** V1 includes **actual approved preflight execution of curated trusted tests** plus evidence review; it is **not a passive declared-compatibility registry** and does **not** accept arbitrary public code. Product's ability to execute trusted code is subject to safe deployment discovery and explicit learner acceptance of this V1 boundary.

**Questions retained for learner-approved Matt/Codex product discovery before dependent technical choices:**
1. Which trusted parties may supply executable fixture material and who can approve it?
2. Which initial runtime versions/platforms and consumer entry scenarios are supported?
3. What is the agreed process for verifying trust/provenance and restricting evidence access?
4. Which failure labels and expected-result definitions are indispensable to V1?
5. What limits on execution duration, output, concurrency and retention are acceptable?
6. What should be shown when a trusted run cannot be safely started or an outcome remains unknown?

**Explicit scope/security decision for this PRD's approval:** Please confirm in the five-PRD batch that P04 V1 is **trusted/owner-approved scenario execution** (not import-only and not untrusted user code execution). This is the key differentiator from D02 PackagePassport and a consequential product/trust boundary; reject or revise it before approval if undesired.

Defer detail when it does not change the basic product. If an open decision could change who uses the product or what the first version actually does, it must be resolved/approved before the PRD can become `approved_by_learner`.

## 12. Explicit non-goals

Not a general-purpose sandbox, remote code execution service, registry clone, full CI platform or security certification. **Untrusted code execution is explicitly out of V1**.

The handbook must not become an implementation repository, nor select its backend stack, database, deployment, communication protocol, workers, brokers, algorithms or vendor products.

## 13. Domain learning outcomes and why this project is valuable

**Possible D03 learning coverage:** D03-C02, C05, C11–C13, C14, C16–C18 (runtime identity, module resolution, process isolation challenges, failures, diagnostics).

**Distinctness and portfolio rationale:** Unlike D02 PackagePassport (cataloging declared compatibility), PackageClinic provides **bounded actual results of trusted execution cases**; unlike P03 NodeScope it validates package entry behavior, not historical incident metrics.

Learning coverage is a **planned educational challenge**, not a guarantee that implementation must use a specific technique, nor proof of an assessed skill.

## 14. Approval record

- **2026-10-13 — concept approval:** user approved all five ideas in the D03 candidate catalog.
- **2026-10-13 — PRD author review:** authored as part of a five-PRD batch using the approved concept, `templates/project-prd.md` and `docs/quality-gates.md`; status **in_review**.
- **Pending:** learner accepts or requests changes to **all five PRDs together**. Concept approval does not imply PRD approval.
- **Not started:** any learner study assessment, code, integration test, implementation repository work or technical ADR.
- **Later selected-project kickoff:** resolve necessary first-version product details using installed Matt Pocock skills and learner confirmation before technical design; require explicit approval for any changes to problem, audience, capabilities or in/out scope.

**Next gate:** when learner explicitly approves the batch of five PRDs, reconcile global Coverage Matrix and both trackers before closing the **D03 content-authoring gate**. No D04 authoring or product implementation is started by this draft.
