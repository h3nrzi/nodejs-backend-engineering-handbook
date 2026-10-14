# MediaForge — Technical Discovery Round 2 (T10–T25)

**Date:** 2026-10-14  
**Product/learner approval:** Approved Yes for all 16 recommendations T10–T25, in this conversation.  
**Codex recording and ADRs for this round:** Not yet verified; do not claim they have been saved externally.  
**Source:** learner-provided complete Codex Round 2 transcript. Exact question and recommendation bodies are preserved below, with ChatGPT educational commentary strictly separate.

## T10 — Node.js release line

### Codex: original question

❓ **T10 — Node.js release line:** Shall we use **Node.js 24 LTS**, pinning a qualified current security patch in the eventual build?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Node 24 provides an established LTS baseline. Node 22 is an older supported alternative; Node 26 is currently classified as Current. Exact patch compatibility must be checked with the selected dependencies, and pinning must allow reviewed security updates. [Official release status](https://nodejs.org/en/about/previous-releases).

**Supports:** PRD learning context; Q38, Q46, Q53

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

LTS is a stability commitment rather than a claim that any arbitrary patch is qualified. Production patch remains evidence-dependent.

**Example and trade-off:** An LTS baseline supports stable CI, while a security update still needs compatibility checks.

---

## T11 — Build and package tooling

### Codex: original question

❓ **T11 — Build and package tooling:** Shall we use **strict TypeScript, native ESM, compiled JavaScript for server/execution processes, and npm with a committed lockfile and clean locked CI installs**?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** This keeps production execution separate from development loaders and makes dependency installation repeatable.

Runtime TypeScript execution removes a compilation step but adds production tooling behavior. pnpm or Yarn are valid alternatives with different dependency-management conventions. A lockfile alone does not establish reproducibility of native media binaries or the Linux environment. [TypeScript guidance](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html), [npm locked installs](https://docs.npmjs.com/cli/commands/npm-ci).

**Supports:** FR-01, FR-04, FR-08; acceptance verification

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Reproducible JS dependencies and native-media binary reproducibility are distinct concerns.

**Example and trade-off:** A lockfile stabilizes npm packages, not the native libvips binary or host OS.

---

## T12 — Database product

### Codex: original question

❓ **T12 — Database product:** Shall we use **PostgreSQL on the initial host** for authoritative state and action/evidence history?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Its explicit transactional concurrency controls suit coordination between API, scheduling, and recovery processes.

SQLite is a credible, simpler V1 alternative and may handle this workload adequately. Its WAL mode permits readers alongside a writer, but only one writer at a time. PostgreSQL adds service administration and memory costs in exchange for more flexible concurrent coordination. [PostgreSQL locking](https://www.postgresql.org/docs/18/explicit-locking.html), [SQLite concurrency](https://sqlite.org/wal.html).

This selects no queue, schema, driver, or locking protocol.

**Supports:** Q28, Q39–Q40; Q57; Q59

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Selecting PostgreSQL does not automatically solve concurrent admission: exact transactional invariants remain open.

**Example and trade-off:** Simultaneous request confirmations demand atomic admission rather than merely serialized UI actions.

---

## T13 — Media storage

### Codex: original question

❓ **T13 — Media storage:** Shall we use **private local filesystem storage on durable host storage**, separating sources, staging content, and finalized outputs, with metadata in the database?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes,** **Initially without shared media deduplication across source identities.**

Object storage separates media durability from the application host but introduces another service and different publication/access semantics. Database blobs consolidate storage but enlarge database storage and backup responsibilities.

Local files simplify V1 while concentrating disk-loss and space-pressure risk. Crash-safe publication, permissions, backup, and cleanup protocols remain open.

**Supports:** Q4; Q47; Q24, Q42, Q52

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Distinct source identities must not be collapsed just because byte contents match. Atomic publication and backup still require design.

**Example and trade-off:** Local final output disappears after a disk incident; output metadata alone cannot restore content.

---

## T14 — Supervision and resource controls

### Codex: original question

❓ **T14 — Supervision and resource controls:** Shall we use **systemd for persistent services, with separate constrained service/cgroup v2 boundaries for media executions**?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes,** **Subject to qualifying the actual host’s supported controls.**

Per-execution containers add packaging and namespace isolation but require another runtime lifecycle. Direct Node child processes with custom cgroup management put more supervision and race-handling code in MediaForge. One shared worker group simplifies operation but weakens independent stopping and accounting.

Activation authority must be restricted. This approves neither unrestricted system-manager access nor exact limits, execution granularity, or inactivity proof. Sending a signal is insufficient evidence of stopping. [systemd resource controls](https://github.com/systemd/systemd/blob/main/man/systemd.resource-control.xml), [cgroup evidence](https://docs.kernel.org/admin-guide/cgroup-v2.html).

**Supports:** Q38–Q40; Q35, Q46, Q53

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Avoid equating kill/exit with a proved inactive cgroup; resource enforcement and privileged activation need independent checks.

**Example and trade-off:** Sending a termination signal to an isolated execution is not proof its subprocess tree has stopped.

---

## T15 — HTTP server framework

### Codex: original question

❓ **T15 — HTTP server framework:** Shall we use **Fastify**, with application-owned request/response schemas and thin handlers calling domain operations?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Its schema-based validation and serialization fit explicit command/query contracts.

Express offers a smaller core but requires more separately assembled conventions. A full-stack framework supplies more rendering/server integration than this API necessarily needs. Fastify’s schema support does not replace authorization or media-content validation. [Official validation documentation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/).

Plugins, schema-authoring tools, and endpoint definitions remain open.

**Supports:** FR-04, FR-11, FR-13; Q45

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Schema validation, business validation and media decoding checks have different responsibilities.

**Example and trade-off:** A Fastify schema can reject malformed JSON without assessing malicious image bytes.

---

## T16 — Browser application

### Codex: original question

❓ **T16 — Browser application:** Shall we use **React with Vite**, delivering built static assets at the API’s origin, without requiring server rendering?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** It provides a practical basis for the interactive processing and review desk without requiring another production frontend service.

Server-rendered HTML with small client enhancements would reduce client dependencies. A full-stack React framework provides routing and data conventions but adds server features we may not need. React/Vite leaves those client conventions for us to choose. [React’s trade-offs](https://react.dev/learn/build-a-react-app-from-scratch), [Vite backend integration](https://vite.dev/guide/backend-integration).

This choice is independent of which HTTP server framework wins T15.

**Supports:** Q33, Q34/Q44, Q57

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

One origin in production doesn't preclude separate dev tooling or frontend build artifacts.

**Example and trade-off:** Built React/Vite assets are served from the same API origin in production.

---

## T17 — Authentication integration

### Codex: original question

❓ **T17 — Authentication integration:** Shall we use **an external OpenID Connect provider through server-side Authorization Code integration**, mapping issuer/subject to local member identities and giving the browser an opaque server-managed session?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** This delegates credential operations while retaining MediaForge’s current workspace authority.

Maintained embedded authentication removes the external login service but adds credential operations to our deployment. Browser bearer tokens introduce different token-exposure and session-control trade-offs. The server-side code flow keeps token exchange at the server. [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html).

Provider, client library, PKCE configuration, session storage/lifetimes, account linking, and initial-manager provisioning remain open.

**Supports:** Q18–Q19, Q50, Q58–Q59

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

External identity operations still imply dependency and outage trade-offs. Workspace authorization stays domain-owned.

**Example and trade-off:** An OIDC-authenticated member is removed: a fresh protected action must be denied by current local membership.

---

## T18 — First media-engine candidate

### Codex: original question

❓ **T18 — First media-engine candidate:** Shall we **qualify Sharp/libvips first**, without adopting it yet, against the complete approved media contract?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** It appears a close fit for local Node integration, but documentation does not establish full conformance.

Its [metadata inspection](https://sharp.pixelplumbing.com/api-input/#metadata) does not decode compressed pixels. Documented frame metadata also does not establish animated-PNG rejection. Strict damage handling, original precision, malformed profiles/orientation, output metadata, and resource behavior need explicit qualification.

Alternatives are investigating ImageMagick or libvips CLI first, or comparing several engines immediately. Multiple engines increase qualification and packaging work. Any gap must lead to a supplementary-component proposal, another engine, or explicit Product Owner conflict review.

**Supports:** Q14–Q16, Q29–Q32; Q47–Q48

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Candidate investigation is not library adoption. Run the full approved sample and negative fixture suite before committing.

**Example and trade-off:** An animated PNG that appears static from metadata alone must still fail the approved intake contract.

---

## T19 — Variant sequencing

### Codex: original question

❓ **T19 — Variant sequencing:** Shall each request process its variants **sequentially in published preset order**, while separate eligible requests can occupy the two processing reservations?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** This reduces simultaneous decoded-image pressure and simplifies sibling-result and cancellation coordination.

Parallel siblings may shorten elapsed completion time but increase peak resource demand. Sequential processing must still be qualified against the five-minute request budget. This does not establish a global limit for validation/previews or prove that two reservations fit the host.

**Supports:** Q17, Q34, Q38–Q40

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

The 5-minute budget stays request-wide; sequencing cannot silently extend it.

**Example and trade-off:** Three variants run in preset order within one request-wide budget, not separate per-variant budgets.

---

## T20 — Durable command identity

### Codex: original question

❓ **T20 — Durable command identity:** Shall every consequential mutation use **a stable command reference bound to its actor, action, and canonical payload**, with the accepted effect/result and replay record committed together?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** An authorized repeat recovers the original result; changing the payload under the same reference produces a conflict. Replay must not reapply an old selection over a newer accepted choice.

Button disabling cannot handle disconnects or competing clients. Deduplicating solely by business content would incorrectly collapse deliberate fresh processing. Unknown or expired references must never silently create new commands.

Reference issuance, replay horizons, and expiry/tombstone mechanics remain open.

**Supports:** Q37, Q51, Q57

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Distinct legitimate fresh commands remain distinguishable even when their input bytes are identical.

**Example and trade-off:** Client repeats the same cancellation command after losing the reply; it recovers the original action result.

---

## T21 — Byte identity and processing provenance

### Codex: original question

❓ **T21 — Byte identity and processing provenance:** Shall we record **SHA-256 digests of source and finalized-output bytes, immutable confirmed preset definitions, engine/recipe versions, and execution/output associations**?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Names, paths, and the current preset catalog cannot establish which bytes and recipe produced an historical result.

Shared content-addressed storage could save space but complicates independent deletion and retention. Digests support byte-identity checks; they do not prove correct derivation, visual quality, or readiness. Publication and verification protocols remain open.

**Supports:** Q4, Q47, Q55–Q56, Q52

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Hash equality supports content identity but not semantic correctness or trust in the engine.

**Example and trade-off:** Two files have identical hash; they may nevertheless be different product source identities.

---

## T22 — Observation transport

### Codex: original question

❓ **T22 — Observation transport:** Shall we start with **bounded authenticated polling of state/evidence snapshots**, refreshing immediately after actions and showing stale/disconnected observation?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** It provides straightforward recovery without maintaining a persistent event channel.

Server-Sent Events can reduce update latency but need reconnect and replay handling. WebSockets add bidirectional connection state. Polling creates recurring requests and observation lag; intervals and conditional-request behavior remain open. No freshness SLA is proposed.

**Supports:** Q34, Q44, Q37

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Polling cannot imply live certainty; UI must signal stale data and unknown state.

**Example and trade-off:** Polling UI loses connectivity and marks its displayed snapshot stale.

---

## T23 — Integration test runner

### Codex: original question

❓ **T23 — Integration test runner:** Shall we use **Vitest for TypeScript application and integration tests**, exercising real persistence, media, and processes where relevant?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** It supports isolated test projects and process pools while keeping application tests in TypeScript. [Official isolation documentation](https://vitest.dev/guide/improving-performance.html#test-isolation).

Node’s built-in test runner reduces dependencies; Jest is another established option. Vitest adds tooling. Its fake timers cannot stand in for a controlled database or supervisor clock: cross-process fault/time seams need separate design. Browser-test tooling remains open.

**Supports:** AC-01–AC-10; crash/race/expiry/authorization cases

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Fake timers alone cannot prove deterministic process supervision and transactional race behavior.

**Example and trade-off:** A process crashes between file finalization and DB commit: a real integration test exercises recovery.

---

## T24 — Upload transport

### Codex: original question

❓ **T24 — Upload transport:** Shall V1 use **one bounded streaming upload request per source**, without a resumable chunk-assembly protocol?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Streaming avoids whole-file server buffering. Browser FormData/multipart transport remains compatible with this choice.

Resumable uploads tolerate unstable connections but introduce upload-session, partial-content, and cleanup coordination for a 20 MiB maximum. Streaming still needs explicit backpressure, partial-upload cleanup, and isolated validation. Transport limits, timeouts, and lost-upload-acknowledgment recovery remain open.

**Supports:** Q3–Q4, Q16, Q29; Q24

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

No resumable upload protocol for V1 doesn't excuse cleanup of interrupted streaming transfers.

**Example and trade-off:** A browser sends a 20 MiB stream then disconnects; server must clean incomplete staging.

---

## T25 — Operational telemetry

### Codex: original question

❓ **T25 — Operational telemetry:** Shall we use **structured operational events and counters correlated by request, variant, command, and execution**, keeping database evidence history authoritative?

### Codex: recommended answer (complete)

➡️ **Recommended: Yes.** Exclude media payloads, credentials, and protected-content details from general logs.

Free-text-only diagnostics make race and crash attribution harder. A full tracing/metrics platform provides richer analysis but adds operational components. Logs themselves establish neither processing outcomes nor inactivity proof. Sinks, diagnostic permissions/retention, thresholds, and alerting remain open.

**Supports:** Q44–Q45; Q46/Q52

### Learner decision

**Approved: Yes — 2026-10-14.**

### ChatGPT teaching note (not a Codex quotation)

Operational telemetry is not an authoritative processing outcome or inactivity evidence.

**Example and trade-off:** Two executions share a log correlation ID scheme; logs remain separate from the DB's evidence authority.

---

## Synthesis, constraints, and pending engineering frontier

Round 2 narrows the design to Node 24 LTS, strict TypeScript/ESM/npm, PostgreSQL, local private media filesystem, systemd/cgroup v2 subject to host qualification, Fastify, React/Vite, external OIDC with server sessions, Sharp/libvips **qualification only**, sequential sibling variants, stable durable command references, SHA-256 provenance, authenticated polling, Vitest, streaming uploads, and structured telemetry. Technical Round 1 baseline and all Product Policies remain authoritative.

The following are **not settled**: exact security patches and dependency compatibility; backup/restore; host resource sizing and proof of inactivity; OIDC provider and session policy; adoption/qualification of Sharp; queue and transactional admission; crash-safe publication, cleanup, retention, and reconciliation; second-decoder strategy; API and testing specifics. No implementation evidence exists from this approval alone.

**NotebookLM:** create a round-specific video prompt in conversation after learner approval. Do not commit a generic prompt template.
