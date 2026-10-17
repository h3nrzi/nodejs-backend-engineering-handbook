# D05 Curriculum — API Engineering

**Status:** approved_by_learner — curriculum approval recorded 2026-10-16; lesson approval is separate.
**Designed:** 2026-10-16. **Approved inventory:** 25 chapters; D05-C01 `approved_by_learner`, D05-C02 authored `in_review`, C03–C25 `not_started`.
**Phase:** Educational Content Authoring; C02 authoring authorized by the Product Owner; stop before C03 pending explicit approval and authorization.
**Project catalog / Charters / implementation:** not_started. **Learner assessment:** deferred_until_learning_phase.

This is a book and course blueprint. Its chapter profiles specify what future teaching must explain and demonstrate; they are not lessons, implementation specifications or evidence of acquired competence. The initial discovery stopped before lessons. The subsequent explicit Product Owner instruction approved CD01–CD07 and authorized C01. [Curriculum approval record](evidence/curriculum-approval.md). A later instruction explicitly approves C01 editorially and authorizes C02; [C01 approval and scope reconciliation](evidence/c01/editorial-approval.md). C02 remains in_review. Neither publication nor agent review supplies lesson editorial approval.

## Purpose and exit capabilities

API engineering designs the observable agreement between independently evolving consumers and providers: permitted inputs, representations, actions, outcomes, timing, limits, authority and change. A professional API reference must teach how those promises behave under concurrency, malformed input, interruption, mixed versions and constrained resources.

After future study and independent assessment, a learner should be able to:

- Derive a consumer-facing contract from users, workflows and invariants without exposing a database schema as the design.
- Explain resource-oriented HTTP, REST constraints, GraphQL and RPC in terms of their mechanisms and costs; justify a choice for a stated situation.
- Specify inputs, responses, errors and collection traversal precisely enough to predict client behavior at boundary cases.
- Trace concurrent updates, duplicate attempts and lost replies, separating confirmed refusal, committed effect, incomplete observation and unknown outcome.
- Apply authentication context, object/property/function authorization, quotas and limits consistently across read, write, batch and streaming interfaces.
- Describe and evolve contracts, assess directional compatibility, test consumer assumptions and document operational behavior.
- Diagnose a contract failure using scoped evidence across a client, intermediary and service, preserving uncertainty when evidence is missing.

These are intended exit capabilities, not a current competence claim.

## Reading prerequisites

Use the approved [D01](../01-computer-science-foundations/curriculum.md), [D02](../02-javascript-typescript/curriculum.md), [D03](../03-nodejs-internals/curriculum.md) and [D04](../04-network-protocol-engineering/curriculum.md) as source chapters, not material to reproduce wholesale.

| Prerequisite | Necessary ability on entry | Use in D05 |
|---|---|---|
| D01-C01, C05, C10–C12 | State an invariant, enumerate interleavings, distinguish safety/liveness and draw a state transition | Contract reasoning, concurrent mutations, idempotency and operation lifecycles |
| D02-C07–C09, C11–C15 | Separate runtime data from static types; track error, cancellation and unknown outcomes | Validation, client contracts, schemas and failure classification |
| D03-C06, C08–C09, C15–C17 | Track byte/stream ownership, bounded pressure, cleanup and scoped diagnostic evidence | Representations, bulk interfaces, persistent sessions and API troubleshooting |
| D04-C07–C11 | Interpret HTTP methods/status, negotiation, framing, caches and intermediary trust | Apply protocol rules to an API's consumer promises |
| D04-C14–C17 | Separate WebSocket/SSE/RPC transport completion from application acknowledgment; reason about budgets and retries | Real-time contracts, gRPC, idempotency, webhooks and asynchronous operations |

Entry diagnostic for later teaching: explain why `200`, a TypeScript type, an open socket and a local timeout each establish different facts. Readers who cannot explain one should follow the relevant backward link. No prerequisite test has been administered.

## Proposed sequence and dependency map

`Cnn` in this proposal means `D05-Cnn`; dependencies below are instructional dependencies, not software modules. Every detailed profile in the [depth specification](depth-specification.md) expands these prerequisites with prior-domain concepts. All prerequisite edges point backward. References to later chapters are transfer destinations only; each early chapter must explain the minimum concepts needed locally.

| Part | Chapter / proposed competency | Title | D05 prerequisites | Required progression |
|---|---|---|---|---|
| A — Contract foundations | D05-C01 | APIs as contracts and REST as an architectural style | None | Consumers and observable promises → constraints → conformance claims and trade-offs |
| A | D05-C02 | Resources, operations and workflow modeling | C01 | Identity and lifecycle → operation boundaries → competing resource models |
| A | D05-C03 | Representations, serialization and data meaning | C02 | Wire values → semantic precision → loss and ambiguity across clients |
| A | D05-C04 | HTTP operation semantics and mutation contracts | C02–C03 | Method intent → complete exchanges → replacement, patch and replay cases |
| A | D05-C05 | Request and response validation boundaries | C03–C04 | Parsing → structural checks → semantic validation and output safety |
| A | D05-C06 | Error contracts and problem details | C04–C05 | Failure taxonomy → machine-readable errors → uncertain and partially exposed outcomes |
| B — State, correctness and admission | D05-C07 | Collections, pagination, filtering, sorting and search | C02–C06 | Result-set meaning → traversal algorithms → mutation and authorization during traversal |
| B | D05-C08 | Cache policy and read consistency at the API boundary | C03–C07 | Reuse scope → consistency promises → invalidation, identity and privacy failures |
| B | D05-C09 | Conditional mutations and concurrent state changes | C04, C06, C08 | Read/modify/write → conditional update → atomicity boundaries and conflicting invariants |
| B | D05-C10 | Idempotency, retries and outcome reconciliation | C04, C06, C09 | Attempt versus intent → key lifecycle → races, retention and crash windows |
| B | D05-C11 | Authentication and authorization at API boundaries | C02, C05–C08, C10 | Principal and credential → object/property/function checks → consistent refusal and revocation |
| B | D05-C12 | Rate limits, quotas and overload contracts | C06–C07, C10–C11 | Counted unit and scope → admission models → overload and client feedback |
| C — Description and evolution | D05-C13 | OpenAPI, JSON Schema and contract workflows | C03–C06, C11–C12 | Describe an exchange → evaluate schema dialects → compare description with behavior |
| C | D05-C14 | Compatibility, versioning and schema evolution | C07–C13 | Producer/consumer direction → mixed versions → migration, deprecation and retirement |
| C | D05-C15 | Documentation, SDKs and developer experience | C10–C14 | Consumer task → discoverable examples → client defaults and safe operational guidance |
| D — Extended interaction contracts | D05-C16 | Asynchronous operations and long-running tasks | C02, C06, C09–C15 | Acceptance versus completion → operation resource → races, cancellation and expiry |
| D | D05-C17 | Bulk operations, file interfaces, imports and exports | C03, C05–C07, C10–C12, C16 | Unit of work → partial outcomes → bounded transfer, integrity and restart |
| D | D05-C18 | Webhooks and event-delivery interfaces | C06, C10–C16 | Event versus delivery → authenticated attempts → replay, ordering and acknowledgment |
| D | D05-C19 | GraphQL contracts and execution trade-offs | C02–C03, C05–C07, C11–C14 | Schema and selection → execution/error propagation → resolver costs and evolution |
| D | D05-C20 | RPC and gRPC service contracts | C03–C06, C10–C14, C16 | Method contract → generated messages/status → mixed versions, deadlines and streams |
| D | D05-C21 | Streaming and real-time application interfaces | C10–C12, C14, C16, C18 | Application message → acknowledgment/replay → slow consumers, gaps and authority changes |
| E — Verification and operation | D05-C22 | Gateways, intermediaries and policy ownership | C08, C10–C14, C16, C18–C21 | Independent boundary → policy composition → transformations, retries and bypass |
| E | D05-C23 | API verification and consumer contract testing | C01–C22 | Oracle and invariant → layered tests → stateful/fault/compatibility evidence |
| E | D05-C24 | API observability and production troubleshooting | C06, C10, C12, C14, C16, C18, C21–C23 | Attempt and logical operation → causal evidence → scoped incident diagnosis |
| E | D05-C25 | Integrated API design and failure-review workshop | C01–C24 | Competing designs → adversarial review → evidence-qualified defense and transfer |

## Why 25 chapters

The count follows separate mental models and assessment needs. It does not inherit D04's 18 chapters. One chapter on “reliable APIs” would hide three different mechanisms: read reuse/consistency (C08), conditional mutation (C09) and repeated logical intent (C10). Likewise accepting a long task (C16), reporting a partially successful batch (C17), and delivering events to an independently controlled receiver (C18) have distinct state machines and failure evidence.

C03/C05/C13/C14 intentionally revisit the same data from different perspectives: what bytes mean, how a boundary validates them, how a description expresses them, and whether a change breaks a consumer. C19–C21 each receive a full mechanism-oriented chapter; they are not an appendix listing alternatives. C23 and C24 consolidate testing and diagnosis already required in every profile rather than delaying all correctness reasoning until the end.

REST's constraints belong in C01; resource modeling and HTTP semantics then apply and challenge that model. OpenAPI is consolidated after actual exchange semantics so learners can evaluate a description rather than learn only YAML fields. Small readable exchange/schema fragments can appear earlier with local explanations; no earlier lesson assumes mastery of C13.

## Ownership and adjacent-domain map

| Domain | D05 must teach sufficiently to reason about the interface | Other domain retains depth / excluded D05 implementation commitment |
|---|---|---|
| D04 — Networking | Apply method, status, validator, stream and trust semantics to consumer contracts | Wire framing, congestion, TLS negotiation, HTTP/2 flow windows and WebSocket/SSE parsers remain prerequisites |
| D06 — Architecture | Choose contract boundaries and compare coupling/composition costs | Whole-product topology, decomposition, DDD implementation patterns, framework architecture and deployment units |
| D07 — Databases | Express atomic update requirements, uniqueness and traversal assumptions | Transactions/isolation engines, indexes, query planning and physical schema design; D05 must not imply check-then-write is atomic |
| D08 — Data and storage | Specify representation identity, expiry, snapshot/read and artifact guarantees | Object-store internals, storage durability, distributed cache construction and search-engine internals |
| D09 — Security | Apply credential context and object/property/function checks; teach abuse, callback destination and disclosure boundaries | Full OAuth/OIDC protocol courses, cryptographic construction, threat-model programs, SSRF defenses and secret/key operations |
| D10 — Distributed systems | Expose concurrency, deduplication, ordering and unknown-outcome limits honestly | Consensus, replication algorithms, distributed transactions and production deduplication/storage design |
| D11 — Messaging | Define external event identity, acceptance, delivery, acknowledgment and replay promises | Brokers, outbox/inbox engineering, queue configuration and durable consumer internals |
| D12–D13 — Performance and reliability | Bound query/batch/stream costs and retry budgets; specify overload/refusal behavior | Capacity qualification, fleet resilience, SLO policy, production retry/breaker tuning and load-test methodology |
| D14 — Testing | Derive API-specific oracles, negative cases, stateful and consumer compatibility checks | Complete organization testing strategy, test infrastructure and CI architecture |
| D15–D16 — Platform and operations | Explain intermediary policy ownership and API-level evidence needed for diagnosis | Gateway product installation, deployment, fleet telemetry systems, on-call practice and vendor qualification |

These are depth boundaries, not excuses to omit mechanisms needed for API correctness. For example C10 must explain the crash window between action and deduplication record even though durable resolution techniques belong to D10/D11. A teaching model may compare solutions; it cannot choose one for an educational Charter.

## Educational coverage and gap analysis

| Knowledge area | Primary depth owner | Reinforcement / synthesis | Boundary or known practical gap |
|---|---|---|---|
| Contract fundamentals, REST constraints and modeling | C01–C02 | C04, C19–C20, C25 | No REST conformance implied by CRUD naming |
| Representation meaning and input/output validation | C03, C05 | C13–C14, C17, C19–C20 | Schema/tool dialect conformance must be verified during lesson authoring |
| HTTP methods, errors and problem details | C04, C06 | C09–C10, C16, C22 | D04 framing is reused; QUERY support is not assumed from standardization |
| Collection traversal, filtering, sorting, search | C07 | C12, C14, C17, C19 | Index/search relevance implementation stays in D07/D08 |
| Read reuse, consistency and conditional writes | C08–C09 | C11, C14, C22 | No cache/transaction system implemented or certified |
| Idempotency, retries and uncertain outcomes | C10 | C16–C18, C20, C22–C25 | Finite models cannot prove distributed exactly-once effects |
| Identity, access and API abuse boundaries | C11–C12 | C17–C22 | No identity-provider integration or security audit executed |
| OpenAPI, contract workflows, compatibility and DX | C13–C15 | C18–C20, C23 | No generator/validator/SDK selected or qualified |
| Async work, bulk/file interfaces and webhooks | C16–C18 | C21, C23–C25 | Broker/storage/provider integrations absent by design |
| GraphQL, RPC/gRPC and persistent interfaces | C19–C21 | C22–C25 | Full execution mechanisms required; transport integration remains future practice |
| Gateway and intermediary policy | C22 | C08, C10–C12, C24 | No deployment or gateway vendor course |
| Verification, docs usability and incident diagnosis | C15, C23–C25 | Failure/evidence duties in every chapter | No examples ran in discovery; C01/C02 pure-model runs recorded separately; learner exercises remain unrun |

Every area above has a named mechanism, adverse trace and completion gate in the depth profiles. This is **planned coverage**. D05-C01 has approved editorial coverage and D05-C02 authored coverage `in_review`; no external implementation or learner-demonstrated coverage is established. [Global coverage](../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage) tracks these separately.

Deliberately outside core depth: SOAP/WSDL and legacy XML integration courses; OData/JSON:API conformance courses; GraphQL federation platform construction; WebRTC/media transport; protocol-stack implementation; payment/provider qualification; a complete identity service; and an API-management vendor certification. C01/C19/C20 should signpost where these alternatives matter without claiming complete treatment. A concrete later audience need may reopen scope through an explicit curriculum decision.

## Book and course conversion

Each chapter is a self-contained reference unit with definitions, assumptions, mechanism explanation, worked traces, alternatives, exercises, answer rubric, references and subtopic audit. A course can divide it at a mechanism boundary into concept reading → guided normal/failure trace → bounded experiment → independent transfer → formative review. Chapter IDs remain stable for citations, learning evidence and future Charter mapping; course sessions need not equal chapters.

Five part reviews follow C06, C12, C15, C21 and C25. They check contract interpretation, state/admission reasoning, evolution/consumer guidance, interaction lifecycles and integrated diagnosis respectively. They are proposed future learning checkpoints, not extra lessons or assessments performed now. No arbitrary word count or contact-hour estimate stands in for depth. The [depth gate](depth-specification.md#shared-depth-and-completion-gate) decides completeness by reasoning evidence.

## Open curriculum decisions

Historical anchor retained for existing citations. The following seven original proposals were explicitly approved by the Product Owner on 2026-10-16. Definitions and alternatives are preserved; [reconciliation and scope](evidence/curriculum-approval.md) distinguish curriculum approval from all later gates.

| Decision ID / topic | Recommended proposal | Alternative / trade-off | Status |
|---|---|---|---|
| D05-CD01 — Breadth and partition | 25 chapters with separate C08/C09/C10 and C16/C17/C18 | Merging reduces navigation but risks burying different invariants and failure paths | approved_by_learner |
| D05-CD02 — Alternative interfaces | Full C19 GraphQL and C20 gRPC mechanism chapters, bounded by consumer-facing contract depth | A survey is shorter but insufficient for senior reasoning; separate advanced multi-chapter tracks increase scope | approved_by_learner |
| D05-CD03 — Framework coupling | Framework-neutral contracts with bounded Node/TypeScript teaching examples | A framework-led route adds concrete tooling but can obscure protocol and policy distinctions | approved_by_learner |
| D05-CD04 — Specification line | Consult OpenAPI 3.2.1 and JSON Schema 2020-12; compare 3.1.2/3.0 when teaching dialect differences | Tool compatibility may justify an older executable fixture line; choose and record it during lesson authoring | approved_by_learner |
| D05-CD05 — Example continuity | Reuse a small fictional reservation/booking context, plus inventory, artifact and notification counterexamples | One product alone narrows transfer; unrelated examples everywhere make cumulative reasoning harder | approved_by_learner |
| D05-CD06 — Legacy breadth | Signpost SOAP/OData/federation; retain no full specialization chapter initially | Add scoped coverage if the intended professional audience needs it | approved_by_learner |
| D05-CD07 — Depth enforcement | Require the shared gate plus chapter-specific adverse trace and independent rubric | Topic checklists alone cannot establish explanatory depth | approved_by_learner |

Project runtimes, libraries, authentication providers, persistence and gateways remain unselected. C01/C02 use separately qualified Node v24.22.0 pure-model harnesses for education only. Decisions about a project belong to its separate learner-approved discovery. No proposed numeric API policy is binding on a future Charter.

## Review and stop condition

The curriculum, depth gate and C01 editorial content are approved; [C01 approval](evidence/c01/editorial-approval.md) preserves the submitted text/evidence. D05-C02 is a complete draft `in_review`. Review [C02](lessons/02-resources-operations-and-workflow-modeling.md) with its [mechanism ledger](evidence/c02/depth-ledger.md) and [evaluation guide](evidence/c02/review-guide.md). Only explicit Product Owner approval can promote C02 editorial status.

Stop after committing/pushing the C02 deliverable. **Do not begin C03.** Later lesson authoring requires explicit Product Owner approval and authorization. Continue to use the [lesson template](../../../templates/lesson.md), [quality standard](../../../docs/lesson-quality-standard.md) and exact depth profiles. Project concepts/Charters remain not_started; no Final PRDs, Module Plans or technical project discovery belong here.
