# D05 chapter depth specification

**Status:** approved_by_learner — controlling curriculum authoring contract, 2026-10-16; [approval record](evidence/curriculum-approval.md).
**Date:** 2026-10-16. **Inventory:** D05-C01–C25; C01 `approved_by_learner`, C02 draft `in_review`, C03–C25 `not_started`.
**Companion:** [curriculum, dependencies, coverage, boundaries and decisions](curriculum.md).

## Shared depth and completion gate

The failure to avoid is a chapter that names many topics but leaves the reader unable to explain why a mechanism works or predict its failure. A glossary, API tour, checklist, generated schema or happy-path demo alone does not meet this specification.

Every profile below specifies the chapter ID/title, prerequisites, observable outcomes, foundations, technical subtopics, advanced mechanisms/edge cases, misconceptions, trade-offs, backend failure scenarios, educational experiments, candidate visuals, exercises/rubrics, references, boundaries and explicit completion criteria. These are required teaching obligations, not lesson text or execution evidence; C01/C02 fulfillment is audited separately; profile obligations remain unchanged. Visuals are candidates chosen by a learning question; do not draw one merely to satisfy a quota.

For each chapter's required mechanism, future authoring must retain a depth ledger with these fields:

| Field | Required evidence in the future lesson | Insufficient substitute |
|---|---|---|
| Definition and assumptions | Define inputs, state, scope, trust and relevant limits before tracing behavior | Named technology and a short slogan |
| Causal mechanism | Explain the ordered steps, decision points, invariant and guarantee boundary | A list of options or status codes |
| Normal worked case | Trace concrete inputs through intermediate states to an observable result | A request and response with no explanation |
| Adverse worked case | Change an assumption, show the counterexample and identify the violated invariant or unknown fact | “Handle errors” or “use retries” |
| Design comparison | Compare at least two plausible approaches under the same workload/consumer assumptions | Universal “best practice” |
| Independent exercise | Require a prediction, design defense or diagnosis on a changed case; provide a reasoned rubric | Recall of a definition or copying the demonstrated code |
| Evidence and limits | Attach primary sources; distinguish specified semantics, chosen policy, implementation behavior and measured observation | Passing output treated as general proof |

Coverage is evaluated **per required mechanism**, not by averaging a deep example against thin sections elsewhere. One example may cover related mechanisms if the ledger identifies its precise contribution. At chapter level include at least a fully worked normal case and a fully worked adverse case; more are necessary when different mechanisms cannot be taught honestly through that pair. Include a bounded Node.js/TypeScript experiment plan and classify each check as pure model, actual HTTP/stream exchange, schema/tool execution, or external integration. A model of an exchange cannot be labeled an integration test.

Apply four editorial ratings to each ledger row: **absent**, **named**, **explained**, **reasoned**. “Explained” requires causal steps and qualified guarantees; “reasoned” adds a worked boundary/counterexample and transfer rubric. All required mechanisms must reach reasoned; a missing critical failure path cannot be offset by breadth. This is an editorial review rubric, not a numerical learner grade or proof of execution. A reviewer must point to actual lesson sections; empty ledger cells keep a chapter incomplete.

Completion also requires accurate backward prerequisites, no hidden dependence on a future domain, source/version qualification, bounded resources and cleanup in executable examples, direct/supporting/unmapped Charter relevance when Charters later exist, and reconciliation of tracking/index/coverage. Keep proposed examples `not_run` until actual command, exact source revision, runtime/OS/module mode, expected/observed outcomes and limitations are retained. Label untested integrations explicitly. The learner's eventual work and acceptance remain separate from author checks.

Future diagrams follow [visual standards](../../docs/visual-authoring.md): question, precise arrows/guards, accessible textual equivalent and caption. Use the repository `mermaid-diagrams` skill for actual Mermaid work, validate and visually inspect its render. The historical discovery authored no diagram source or lesson code; C01/C02 now have separately recorded sources and bounded execution.

## Chapter-by-chapter depth matrix

This is the compact review surface. The matching profile below contains all fifteen requested dimensions, including prerequisites, foundational concepts, misconceptions, trade-offs, references and boundaries. This matrix retains plans. C01 actual pure-model execution is recorded in [validation](evidence/c01/validation.md), and C02 in [its validation](evidence/c02/validation.md). C01 has [explicit editorial approval](evidence/c01/editorial-approval.md); C02 remains in_review. All learner assessments and C03–C25 experiments remain `not_run`.

| Chapter | Mechanism that must be reasoned through | Required adverse case | Planned evidence boundary | Independent rubric anchor |
|---|---|---|---|---|
| C01 | Constraint → architectural property → coupling | Undocumented transition changes | Pure consumer/contract trace | Name violated constraint and observed consequence |
| C02 | Resource identity and guarded transitions | Generic status change hides multiple effects | Finite state model | Separate identity, authority and acknowledged effect |
| C03 | Value → wire → interpreted value | Numeric/time/absence information loss | Round-trip model + HTTP representation | Specify precision, units and ambiguity |
| C04 | Method intent and patch application | Repeated append and failed patch test | Patch model + HTTP exchange | Distinguish intended effect, atomicity and replay |
| C05 | Parse → validate → authorize → project | Mass assignment and output failure after action | Boundary cases + actual parameter decoding | State exactly what each check proves |
| C06 | Error identity and observation boundary | Commit followed by lost/truncated error reply | HTTP problem/interruption | Preserve effect uncertainty |
| C07 | Total order and continuation predicate | Equal keys and mutation between pages | Traversal model + query/cursor exchange | Derive mixed-direction compound predicate |
| C08 | Reuse scope versus source consistency | Revocation leak and stale post-write read | Explicit-clock cache model + HTTP validation | Identify authority and permitted staleness |
| C09 | Atomic condition/effect enforcement | Split check/write and cross-record write skew | Deterministic model + HTTP precondition | Show both prevention and remaining invariant gap |
| C10 | Intent/key state and action/result coupling | Crash gap, same-key race and expiry | Enumerated state model + receipt exchange | State authoritative evidence and eligible recovery |
| C11 | Principal/action/object/property decision | Export/status/replay bypass | Policy matrix + HTTP refusal/projection | Check all direct and indirect access paths |
| C12 | Counted unit, scope and admission state | Window burst, replica overshoot, unbounded queue | Explicit-clock arithmetic + HTTP feedback | Calculate balance and name unbounded dimensions |
| C13 | Description/dialect interpretation | oneOf overlap, parameter style and tool mismatch | Schema/tool cases + actual serialized request | Distinguish declared, interpreted and enforced contract |
| C14 | Directional compatibility and retirement | Added enum and unchanged-schema behavior break | Old/new fixture matrix | Explain four pairings and rollback exposure |
| C15 | Consumer task and client defaults | Hidden retry creates a fresh logical intent | Local docs/raw HTTP/client walkthrough | Find defaults and preserve uncertain outcome |
| C16 | Admission/operation/observer lifecycles | Lost operation receipt and cancel/complete race | State model + HTTP poll/cancel/result | Separate operation, attempt, observation and expiry |
| C17 | Batch item identity and transfer finalization | Partial effects, corruption and whole-batch retry | Ledger model + bounded streamed transfer | Reconcile accepted/refused/unknown and retry scope |
| C18 | Event/delivery/acceptance/processing | Lost acknowledgment and reserialized signature | Two local HTTP peers + delivery model | Separate authenticity, deduplication and effect evidence |
| C19 | Selection execution, null bubbling and fanout | Non-null failure and shared loader leak | Pinned real execution engine | Derive data/error path and cost/authority scope |
| C20 | Message/presence and final RPC status | Lost trailers and deadline after effect | Pinned generated client/server | Check binary/JSON direction and terminal evidence |
| C21 | Snapshot/replay/session ownership | Snapshot gap, expired cursor and slow consumer | Session model + actual persistent interface | Define gap recovery, bounds and continuing authority |
| C22 | Policy composition across independent hops | Gateway timeout/retry and direct-origin bypass | Client/proxy/origin exchange | Identify enforcement owner and preserved evidence |
| C23 | Claim/oracle/test-boundary relationship | Mock and provider share a wrong assumption | Deliberate contract mutations | Show which assertion fails and what it cannot prove |
| C24 | Logical operation versus attempt evidence | Retry counts hide duplicate effects and missing spans | Controlled incident observations | Separate facts/hypotheses and choose discriminating check |
| C25 | Composition of contract invariants | Retry/retention/auth contradictions | Three bounded integrated case studies | Defend alternatives with adverse traces and evidence limits |

## Part A — Contract foundations

### D05-C01 — APIs as contracts and REST as an architectural style

**Prerequisites:** D01 invariant/state reasoning; D02 public contracts; D04-C07 HTTP semantics and C11 intermediary boundaries. No earlier D05 chapter.

**Observable outcomes:** Extract observable promises from a consumer journey; distinguish interface style from transport; audit a claimed REST design against individual constraints and explain the consequences of relaxing one.

**Foundations:** Provider, consumer, boundary, capability, representation, interaction, contract, policy, mechanism and independent evolution.

**Technical subtopics:** Input/output/state/time/authority/error promises; public, partner and internal audiences; client-server, statelessness, cacheability, uniform interface, layers and optional code-on-demand. Expand uniform interface into resource identification, manipulation through representations, self-descriptive messages and hypermedia-driven application state.

**Advanced mechanisms and edge cases:** Distinguish server resource state from per-client session context; trace a consumer following available transitions versus constructing undocumented URLs; explain cache/intermediary visibility and coupling when an interface constraint is relaxed. API governance and ownership are promises with accountable owners.

**Misconceptions:** JSON plus HTTP equals REST; stateless means no database; REST forbids operations; an internal API needs no compatibility contract.

**Trade-offs:** Hypermedia discovery versus fixed client conventions; broad uniformity versus specialized operation semantics; consumer autonomy versus interface control.

**Backend failure scenario:** A release preserves response shape but changes an undocumented workflow transition, breaking a client whose URL construction embedded server assumptions.

**Educational experiment:** Plan a pure contract-trace comparison of a hypermedia-guided and a convention-dependent client across a changed transition. Record assumptions and actual selected action; no REST certification claim.

**Candidate visual:** Constraint/dependency map answering which property is lost when a constraint changes, with a separate client-state/resource-state comparison.

**Exercises and rubric:** Given two interfaces, defend their style claims and coupling risks. Full credit cites individual constraints and consumer-visible evidence; naming HTTP verbs earns insufficient credit.

**References:** [S01](references.md#s01), [S02](references.md#s02).

**Boundaries:** C02 owns resource/workflow design; C04 method mechanics; C19/C20 alternative execution models. D06 owns system decomposition.

**Depth/completion:** Trace at least one constraint to a concrete architectural property and one failure on relaxation; separately explain all uniform-interface subconstraints without declaring every practical HTTP API fully REST-conformant.

### D05-C02 — Resources, operations and workflow modeling

**Prerequisites:** C01; D01-C12 state transitions.

**Observable outcomes:** Derive identities and operations from user goals; compare two resource models; specify legal/illegal transitions and explain which external invariant each boundary protects.

**Foundations:** Identity versus attributes, resource versus representation, command versus query, collection versus member, lifecycle and relationship.

**Technical subtopics:** Stable identifiers and URI design; containment versus association; ownership and tenant scope; singleton/collection resources; creation, deletion/tombstones and restoration; relationships, action resources, operation resources, links and discoverability; workflow transitions rather than raw table CRUD.

**Advanced mechanisms and edge cases:** Reparenting without accidental identity changes; reusable human names; cascading deletion semantics; multi-resource invariants; stale links and unavailable actions; soft-deleted identifiers; aggregate versus per-item outcomes. Make request acceptance and actual effect explicit without specifying persistence architecture.

**Misconceptions:** One endpoint per table is resource modeling; every action must be squeezed into an attribute update; deep URL nesting provides authorization; DELETE promises physical erasure.

**Trade-offs:** Embedded versus linked relationships; task-specific operations versus generic updates; stable opaque IDs versus readable names; convenience versus coupling.

**Backend failure scenario:** A reservation cancellation also refunds payment, but a generic status update contract leaves the consumer unable to know which effect was accepted.

**Educational experiment:** Plan a pure state-machine model of reservation transitions with legal and illegal sequences; compare a command and generic-update boundary using the same invariant.

**Candidate visual:** Resource identity/relationship diagram and transition table answering what can change without changing identity.

**Exercises and rubric:** Model transfer of an owned asset and deletion during an active workflow. Full credit separates identity, authority, transition preconditions and externally acknowledged effects; it does not require one preferred URI spelling.

**References:** [S01](references.md#s01), [S02](references.md#s02), [S12](references.md#s12).

**Boundaries:** C03 owns representations; C04 HTTP mapping; C09 concurrent transitions; C16 operation lifecycles. D06 owns domain/application architecture.

**Depth/completion:** Compare two coherent models for the same journey, trace a forbidden transition and articulate a consumer-visible invariant that table CRUD alone fails to express.

### D05-C03 — Representations, serialization and data meaning

**Prerequisites:** C02; D02-C01/C15 numeric and runtime-boundary limits; D03-C06 bytes; D04-C07 negotiation.

**Observable outcomes:** Define portable field meanings; predict information loss across serialization; distinguish missing, null, empty and default; explain representation selection to a consumer.

**Foundations:** Wire value versus domain value; media type; encoding versus content coding; precision, units, identity and absence.

**Technical subtopics:** JSON strings/numbers/objects/arrays; Unicode and normalization policy; duplicate member ambiguity; integer/decimal/money representation; instants versus local dates/durations/time zones; binary data and media types; links, projections, sparse fields and expansion; request/response models; negotiation and metadata.

**Advanced mechanisms and edge cases:** Unsafe JavaScript integers, non-finite values and BigInt serialization; decimal rounding across languages; daylight-saving ambiguity; precision loss in timestamps; omitted versus null patch values; canonical representation versus ordinary serialization; public projections exposing internal properties. Do not imply object-key order gives canonical signing bytes.

**Misconceptions:** JSON numbers preserve every database numeric type; ISO-looking dates always denote an instant; optional and nullable are interchangeable; internal entities are safe response DTOs.

**Trade-offs:** String versus numeric decimal/ID transport; expanded versus linked resources; explicit units versus compact payloads; normalization convenience versus preserving user input.

**Backend failure scenario:** An identifier above the client's exact integer range is rounded and used in a later mutation against the wrong resource.

**Educational experiment:** Plan pure serialization round-trips of unsafe integers, absent/null fields and date values, followed by a bounded HTTP negotiation exchange. Distinguish language observations from cross-language compatibility claims.

**Candidate visual:** Value → wire → consumer transformation table locating irreversible loss.

**Exercises and rubric:** Define money, a local appointment date and an opaque ID for two clients. Full credit states units, precision, absence and parsing failures; “use string” without semantics is incomplete.

**References:** [S03](references.md#s03), [S04](references.md#s04), [S02](references.md#s02).

**Boundaries:** C05 validates the chosen representation; C08 handles reuse; C13 describes schemas; C14 evolves them. D08 owns physical storage formats.

**Depth/completion:** Trace at least three distinct losses/ambiguities and their explicit contract choices; include both input and output semantics, not just JSON syntax.

### D05-C04 — HTTP operation semantics and mutation contracts

**Prerequisites:** C02–C03; D04-C07/C08 method/status and complete-message semantics.

**Observable outcomes:** Select and defend method/status/header combinations; distinguish safe, idempotent and cacheable properties; trace replacement and patch effects including failed preconditions and repeated requests.

**Foundations:** Intended effect, target resource, representation metadata, acknowledgment boundary and method semantics.

**Technical subtopics:** GET/HEAD/OPTIONS/POST/PUT/DELETE/PATCH; resource creation and Location; 200/201/202/204; 405/Allow and unsupported media; replacement versus partial changes; JSON Patch operations and test, JSON Merge Patch object/null/array semantics; redirect behavior; complex search using GET, POST or standardized QUERY with explicit interoperability assumptions.

**Advanced mechanisms and edge cases:** Same intended effect with different later responses; safe retrieval with incidental logging; repeated DELETE after absence; PUT server-managed fields and representation transformation; PATCH atomic application versus concurrency isolation; patch path escapes and array indices; precondition interaction; GET content ambiguity. Verify QUERY-aware clients/intermediaries rather than inferring deployment support from RFC publication.

**Misconceptions:** Idempotent means byte-identical responses; PATCH is always idempotent; PUT means merge; 202 means work completed; 204 carries a JSON body.

**Trade-offs:** Replacement versus explicit commands versus patch formats; small patches versus reviewable intent; standardized capabilities versus deployed client compatibility.

**Backend failure scenario:** A retry of an array-append patch duplicates an entry; treating it like replacement hides the duplicate effect.

**Educational experiment:** Plan bounded HTTP exchanges and a pure patch-state trace for replacement, merge removal, failed JSON Patch test and repeated append. Actual parser/library behavior must be separately qualified.

**Candidate visual:** Method/property matrix plus patch before/after state table.

**Exercises and rubric:** Review a create/replace/cancel/search contract. Full credit explains intended effects, response evidence and replay assumptions; status-code memorization alone fails.

**References:** [S02](references.md#s02), [S05](references.md#s05), [S06](references.md#s06).

**Boundaries:** Reuse D04 transport mechanics. C06 errors, C09 atomic concurrent enforcement, C10 logical-intent retries and C16 async lifecycle own their deeper models.

**Depth/completion:** Work through normal and adverse mutations for both patch formats, explain atomicity versus isolation, and show why method idempotency does not establish a business deduplication guarantee.

### D05-C05 — Request and response validation boundaries

**Prerequisites:** C03–C04; D02-C11–C15 static/runtime guarantees.

**Observable outcomes:** Separate parsing, structural validation, semantic checks and authorization; design input/output boundaries; identify where normalization or coercion changes the accepted contract.

**Foundations:** Untrusted bytes, parsed value, schema, domain predicate, projection and trust transition.

**Technical subtopics:** Path/query/header/body decoding; repeated parameters and parser disagreement; scalar/array/object rules; required/optional/nullable/default; allowlists and unknown fields; nested bounds, byte/item/depth limits; cross-field checks; response projection and validation; error locations; schema reuse versus separate input/output shapes.

**Advanced mechanisms and edge cases:** Duplicate keys, ambiguous booleans and empty numeric strings; normalization order; mass assignment; expensive regex/recursive structures; response-validator failures after side effects; streaming validation after response commitment; race between checking a business predicate and performing a change. Explain why uniqueness validation is advisory unless enforced at the mutation boundary.

**Misconceptions:** A TypeScript interface validates traffic; schema-valid means authorized; stripping unknown fields is always harmless; a preflight existence check enforces uniqueness.

**Trade-offs:** Reject versus strip versus preserve unknown input; strict output versus forward-compatible consumers; coercion ergonomics versus predictable input semantics; response checks versus runtime cost.

**Backend failure scenario:** A request includes `role: admin`; automatic model binding copies it despite a schema intended only for display-name edits.

**Educational experiment:** Plan a table-driven pure boundary pipeline with malformed bytes, valid-but-invalid-domain values and output overexposure; add actual HTTP query-serialization cases. No validator is selected in discovery.

**Candidate visual:** Trust-transition pipeline showing which checks establish which facts and where irreversible work starts.

**Exercises and rubric:** Derive checks for a date-range request and cross-tenant item edit. Full credit separates syntax, domain rules, authorization and atomic invariant enforcement; includes refusal with no unauthorized effect.

**References:** [S03](references.md#s03), [S07](references.md#s07), [S12](references.md#s12).

**Boundaries:** C06 formats errors; C09 enforces concurrent mutations; C11 owns authorization; C13 schema dialects. D09 owns comprehensive defensive design.

**Depth/completion:** Trace both accepted and rejected input through each boundary and one response failure after action; do not reduce the lesson to a schema-library tutorial.

### D05-C06 — Error contracts and problem details

**Prerequisites:** C04–C05; D02-C07 error propagation; D04-C17 uncertainty.

**Observable outcomes:** Define stable machine-readable failures; map status, problem type and domain code without leaking internals; explain which failures establish refusal and which leave effects unknown.

**Foundations:** Transport failure, protocol refusal, domain rejection, execution failure, partial outcome and missing evidence.

**Technical subtopics:** Status classes; 400 versus 422 input failures, 401/403/qualified 404, 409 domain conflict versus 412/428 conditions, 413/414/415 limits/media and 429/503 admission distinctions; RFC 9457 problem media type and members; stable problem type/instance; extension members and validation locations; human/localized text versus machine identity; retry guidance and correlation references; malformed/unsupported requests and unexpected errors.

**Advanced mechanisms and edge cases:** Body status versus actual response status; no problem body on a dropped connection; errors after headers or partial content; hidden-resource refusal; redaction; error-contract evolution; dependency failures without pretending every upstream timeout means no effect. A correlation ID is not authorization to retrieve sensitive diagnostics.

**Misconceptions:** Always returning 200 simplifies clients; clients should parse error prose; every 5xx is safely retryable; an absent response is a confirmed business failure.

**Trade-offs:** Granular errors versus information disclosure; stable taxonomy versus exposing internal causes; early refusal detail versus consistent anti-enumeration policy.

**Backend failure scenario:** A booking commits, then serialization fails; the client receives an error and retries as though the action were refused.

**Educational experiment:** Plan bounded HTTP normal/problem responses plus a deliberately interrupted response; compare client-observed facts with controlled server knowledge. Retain causal ordering and distinguish missing body from malformed problem content.

**Candidate visual:** Error evidence decision table and commit/serialization/observation timeline.

**Exercises and rubric:** Classify validation failure, permission refusal, stale update, dependency timeout and truncated reply. Full credit states what is known about effects and what remains uncertain, with safe diagnostic detail.

**References:** [S08](references.md#s08), [S02](references.md#s02), [S12](references.md#s12).

**Boundaries:** C10 decides replay/reconciliation; C11 refusal disclosure; C16/C17 partial or long-running outcomes; C24 diagnosis. D16 owns incident process.

**Depth/completion:** Produce a coherent error taxonomy, valid problem examples and a counterexample to status-only retry classification; explicitly handle failure after response commitment.

## Part B — State, correctness and admission

### D05-C07 — Collections, pagination, filtering, sorting and search

**Prerequisites:** C02–C06; D01 ordering/cost models.

**Observable outcomes:** Specify result-set membership/order; derive stable cursor traversal; predict duplicates, omissions and stale results under mutation; design bounded, authorized query semantics.

**Foundations:** Set versus ordered sequence, total order, tie-breaker, cursor, snapshot and search freshness.

**Technical subtopics:** Offset/page and keyset/cursor models; forward/backward navigation; compound sorting and null placement; filter grammar/operators, escaping and repeated values; text search versus exact predicates, relevance/locale/tokenization assumptions and complex-query method choice; sparse projections/expansion; page-size bounds, total/count semantics, links and termination.

**Advanced mechanisms and edge cases:** Derive a lexicographic continuation predicate for mixed sort directions; equal keys, insertion/deletion and mutable sort fields; cursor binding to tenant/query/order/version; opaque is not encrypted; tampering, expiry and replay; authorization changes between pages; empty page with continuation; eventual search index versus authoritative reads. Snapshot traversal is a guarantee requiring supporting state, not a property granted by base64 cursors.

**Misconceptions:** Cursor automatically means consistent snapshot; offset is always wrong; total count is free/exact; an empty page always ends traversal.

**Trade-offs:** Random access versus stable continuation; exact count versus bounded work; snapshot resource cost versus live results; expressive filters versus predictable query cost.

**Backend failure scenario:** Multiple records share a timestamp; a cursor storing only that timestamp permanently skips the remaining equal-key records.

**Educational experiment:** Plan a pure finite dataset traversal with duplicate timestamps, mixed ordering and interleaved changes; then actual HTTP cursor/query serialization. Compare promised guarantees with observed duplicates/omissions.

**Candidate visual:** Ordered rows and moving cursor with insertion/deletion, plus a continuation predicate table.

**Exercises and rubric:** Derive `(createdAt DESC, id ASC)` continuation and assess a mid-traversal permission change. Full credit uses both keys/directions, preserves query scope and does not promise snapshots without evidence.

**References:** [S09](references.md#s09), [S02](references.md#s02), [S06](references.md#s06), [S12](references.md#s12).

**Boundaries:** C08 read consistency; C12 admission cost; C14 cursor evolution; C19 GraphQL connections. D07/D08 own index/query/search internals.

**Depth/completion:** Derive an actual compound predicate and enumerate permitted traversal anomalies for live versus snapshot contracts; cover query language semantics rather than only page envelope fields.

### D05-C08 — Cache policy and read consistency at the API boundary

**Prerequisites:** C03–C07; D04-C10 cache selection/validation and C11 intermediary scope.

**Observable outcomes:** State a read-after-write promise; design cache identity for representations and authority; explain stale but permitted results versus a contract breach.

**Foundations:** Representation selection, freshness versus source consistency, private/shared reuse, validator and invalidation boundary.

**Technical subtopics:** API cache policy, identity/projection/language variants; authenticated responses; negative caching; conditional read behavior; write acknowledgment versus subsequent reads; invalidation of members, collections and derived views; documented freshness windows and authoritative status reads.

**Advanced mechanisms and edge cases:** Revocation while cached data remains fresh; tenant leakage; write followed by a stale replica/cache response; collection membership changing after member mutation; content coding and representation validator scope; stale-while-revalidate/stale-if-error only under stated policy; stampede and revalidation races as observable costs. Distinguish protocol-compliant reuse from an API promise that was incorrectly stronger.

**Misconceptions:** `no-cache` means no storage; ETag makes a replica current; invalidating a member refreshes every collection; varying by Authorization automatically makes shared reuse safe.

**Trade-offs:** Freshness versus availability and origin load; user-specific versus shared representations; broad invalidation versus dependency tracking; short cache life versus higher request cost.

**Backend failure scenario:** A role is revoked, but a shared response keyed only by URL still exposes privileged fields to another caller.

**Educational experiment:** Plan an explicit-clock pure cache/authority model and a bounded HTTP revalidation exchange; label the model's source freshness separately from HTTP freshness. No CDN or replica test is implied.

**Candidate visual:** Write acknowledgment → invalidation → later read timeline identifying the source and authority of each response.

**Exercises and rubric:** Specify reads immediately after a write and revocation under two cache policies. Full credit states scope, staleness allowances and leakage prevention; does not solve consistency by naming a cache header.

**References:** [S10](references.md#s10), [S02](references.md#s02), [S12](references.md#s12).

**Boundaries:** D04 already teaches age/range algorithms. C09 uses validators for writes; C11 authority; C22 transformations. D08/D10 own cache and replication implementation.

**Depth/completion:** Trace a private/shared identity failure and a read-after-write anomaly, including which contract was violated; separate freshness, authorization and authoritative state.

### D05-C09 — Conditional mutations and concurrent state changes

**Prerequisites:** C04, C06, C08; D01-C10/C12 interleavings and invariants; D04-C10 validators.

**Observable outcomes:** Construct a lost-update interleaving; specify conditional mutation semantics; identify the atomic enforcement point and the invariants one validator cannot protect.

**Foundations:** Revision, precondition, compare-and-change, atomicity versus isolation, resource versus cross-resource invariant.

**Technical subtopics:** If-Match and strong comparison; If-None-Match creation constraints; 412 failed versus 428 required precondition versus domain conflict; ETag lists/wildcards; revisions and selected representation; conditional delete/replace/patch; precedence of applicable HTTP preconditions.

**Advanced mechanisms and edge cases:** Check-then-write race; validators from stale variants; weak validators; representation transformation; logical revision returning to an old value; non-overlapping field edits versus whole-resource conflicts; two independent records violating a shared capacity invariant. Explain the required atomic relationship between condition and effect while deferring database machinery.

**Misconceptions:** Reading a revision and later comparing it in application code is sufficient; 409 and 412 mean the same thing; an ETag is universally a database row version; a row validator prevents write skew.

**Trade-offs:** Whole-resource optimistic concurrency versus field/command-specific conditions; rejecting stale writes versus permitted merges; client simplicity versus coordination cost.

**Backend failure scenario:** Two requests both pass an earlier version check and overwrite one another because the actual write has no atomic condition.

**Educational experiment:** Plan a deterministic interleaving model contrasting split check/write with an atomic conditional transition; add bounded HTTP success/stale/missing-condition cases. Do not label the model a database isolation test.

**Candidate visual:** Two-client read/check/write timeline marking the atomic decision point and invariant.

**Exercises and rubric:** Explain why a seat count spread across records remains unsafe with independent ETags. Full credit states invariant scope and required enforcement boundary without prescribing a data store.

**References:** [S02](references.md#s02), [S11](references.md#s11), [S05](references.md#s05).

**Boundaries:** C10 duplicate intent is separate; C16 operation races reuse conditions. D07 owns transactions/isolation; D10 multi-node coordination.

**Depth/completion:** Demonstrate the lost update, its conditional prevention and a remaining cross-resource counterexample; include condition grammar/comparison and truthful response semantics.

### D05-C10 — Idempotency, retries and outcome reconciliation

**Prerequisites:** C04, C06, C09; D04-C17 retry budgets, replayability and uncertainty.

**Observable outcomes:** Specify a logical-intent/key contract; trace concurrent attempts and uncertain replies; identify durability/retention assumptions; distinguish replayed receipt from repeated action and safe recovery from blind retry.

**Foundations:** Logical operation, attempt, scoped identity, request equivalence, retained outcome and reconciliation.

**Technical subtopics:** Server-assigned versus client keys; principal/tenant/operation scope; payload fingerprints and normalization; pending/completed/refused states; same-key same/different input; response replay versus current resource; retryable failures, body replayability, budgets and lookup/status interfaces.

**Advanced mechanisms and edge cases:** Race to claim a key; action commits before result record; result saved before reply loss; crash/restart; expiry and late retries; in-flight conflict policy; reauthorization before replay; secrets in retained receipts; external side effects beyond local atomicity. Compare transactional coupling, reconciliation and downstream deduplication as conditional approaches rather than an implementation choice.

**Misconceptions:** Any UUID header guarantees exactly-once effects; method idempotency deduplicates every business intent; a timeout authorizes a fresh key; retention can be finite while guaranteeing duplicate prevention forever.

**Trade-offs:** Long retention versus storage/privacy cost; byte versus semantic equivalence; returning an original receipt versus refreshed state; automatic retry versus explicit unknown status.

**Backend failure scenario:** A charge succeeds, the deduplication record is lost, and a retry executes a second charge.

**Educational experiment:** Plan an enumerated pure state machine with injected crash points, concurrent same-key attempts, mismatch and expiry; later pair it with an HTTP receipt/status exchange. Models expose unresolved windows rather than prove durability.

**Candidate visual:** Attempt/intent state machine and crash-window timeline.

**Exercises and rubric:** Classify five key/reply/crash timelines. Full credit identifies authoritative evidence, allowed next actions, retention boundary and remaining uncertainty; “retry with exponential backoff” is inadequate.

**References:** [S13](references.md#s13), [S02](references.md#s02).

**Boundaries:** C09 conditions do not replace key semantics; C16/C18 apply lifecycle/delivery identities. D10/D11 own durable coordination patterns and external effect resolution.

**Depth/completion:** Cover pending ownership, mismatched input, concurrent claim, lost reply, action/record crash gap and expiry, with no universal exactly-once claim. Label the header draft's actual status.

### D05-C11 — Authentication and authorization at API boundaries

**Prerequisites:** C02, C05–C08, C10; D04-C06/C11 transport identity and trusted assertions.

**Observable outcomes:** Distinguish credential validity from permission; specify object/property/function checks for a complete API surface; explain consistent refusal, revocation and sensitive output behavior.

**Foundations:** Principal, actor, tenant, credential, audience, scope, role, ownership and delegated authority.

**Technical subtopics:** API keys, bearer tokens, cookies and mutual TLS as credential/context choices; OAuth delegation versus OIDC identity at a conceptual boundary; issuer/audience/expiry validation responsibilities; RBAC/ABAC/relationship checks; reads, mutations, lists, bulk, exports and operation-status access; 401 challenge, 403 refusal and qualified concealment; CORS versus authorization; CSRF context for ambient credentials.

**Advanced mechanisms and edge cases:** BOLA/property/function authorization; list filters leaking counts; stale permission decisions; revocation during streaming; replayed idempotency receipts; indirect references and callbacks; cross-tenant object access; confused deputies and trusted gateway identity assertions. D05 must explain required facts without teaching custom cryptography or assuming JWT verification alone authorizes an action.

**Misconceptions:** A valid token grants access to every object; opaque IDs prevent unauthorized access; CORS secures server-to-server APIs; field omission on one route protects all projections.

**Trade-offs:** Coarse scopes versus contextual checks; disclosure clarity versus anti-enumeration; cached decisions versus revocation responsiveness; centralized checks versus ownership close to the resource.

**Backend failure scenario:** A user cannot read a record directly but can obtain it through an export or asynchronous result URL.

**Educational experiment:** Plan a pure principal/action/object/property policy matrix and bounded HTTP refusal/projection checks using synthetic principals. No token library or identity provider is selected/verified.

**Candidate visual:** Authority propagation and decision table showing checks at direct and indirect access paths.

**Exercises and rubric:** Review two tenants, one operator and a delegated client across list/read/edit/export/replay. Full credit checks every path and denied effects, with no credential leakage.

**References:** [S12](references.md#s12), [S14](references.md#s14), [S02](references.md#s02).

**Boundaries:** C12 abuse/admission, C18 callback trust, C21 ongoing sessions and C22 assertion ownership. D09 owns deep auth protocols, threat modeling and key operations.

**Depth/completion:** Cover object, property and function checks with at least one indirect bypass counterexample, plus credential/authorization separation and cache/revocation scope.

### D05-C12 — Rate limits, quotas and overload contracts

**Prerequisites:** C06–C07, C10–C11; D01 liveness/cost and D04-C17 budgets.

**Observable outcomes:** Define counted units and partition scope; calculate contrasting admission models; distinguish commercial quota from protective overload rejection; explain client feedback without promising future admission.

**Foundations:** Rate, burst, concurrency, queue bound, budget, fairness, partition and cost unit.

**Technical subtopics:** Fixed/sliding windows, token bucket and leaky-bucket/pacing distinctions; refill/capacity calculations; per-principal/tenant/operation/shared limits; weighted query/batch cost; admitted versus completed versus failed accounting; 429 versus 503; Retry-After; service-limit metadata and reset semantics.

**Advanced mechanisms and edge cases:** Boundary bursts; clock jumps; replica-local limits exceeding global intent; anonymous traffic and forged identity; in-flight retries; cancellation/refund accounting; expensive GraphQL queries and stream fanout; stale advisory headers; queue growth despite rate bounds. Separate algorithm analysis from production limiter design.

**Misconceptions:** Requests per second bounds concurrency/memory; 429 promises the next attempt will succeed; reset timestamps are always portable clocks; rate limiting is the complete authorization/abuse defense.

**Trade-offs:** Exact global accounting versus availability/coordination cost; burst tolerance versus latency; user fairness versus shared tenant budget; fail-open versus fail-closed consequences under explicit policy.

**Backend failure scenario:** Each service instance enforces a nominal global quota independently; scale-out silently multiplies allowed work while a downstream queue grows.

**Educational experiment:** Plan explicit-clock pure fixed-window/token-bucket traces and a bounded HTTP refusal/Retry-After exchange. No throughput benchmark, distributed algorithm or production target is implied.

**Candidate visual:** Same arrival sequence across two admission models, with separate concurrency/queue occupancy rows.

**Exercises and rubric:** Calculate token balance and a window-boundary burst, then assess weighted batch admission. Full credit includes unit/scope/time assumptions, failure accounting and why local precision is not a global guarantee.

**References:** [S11](references.md#s11), [S15](references.md#s15), [S02](references.md#s02).

**Boundaries:** C07 query cost, C17 batch cost, C19 resolver cost and C22 layered enforcement. D12/D13 own capacity/resilience qualification; D10 distributed coordination.

**Depth/completion:** Derive two algorithms over concrete arrivals and expose one unbounded dimension each leaves; label evolving header proposals separately from RFC-defined status semantics.

## Part C — Description and evolution

### D05-C13 — OpenAPI, JSON Schema and contract workflows

**Prerequisites:** C03–C06, C11–C12; D02 type erasure and runtime boundary.

**Observable outcomes:** Describe a real exchange without losing parameter/media/error semantics; evaluate schema composition and dialect assumptions; compare contract-first and code-first workflows using behavioral evidence.

**Foundations:** Description versus enforcement, schema instance versus meta-schema, dialect, reference resolution and source of truth.

**Technical subtopics:** OpenAPI paths/operations/operationId, parameters and serialization, bodies/media types, responses/headers/examples, components/references, security alternatives/requirements, callbacks/webhooks and links. JSON Schema types/constraints, required versus null, enum/const, composition, object closure and read/write annotations; linting, mocks, validation and generation as different activities.

**Advanced mechanisms and edge cases:** OpenAPI 3.0 versus 3.1/3.2 schema differences; declared dialect and tool support; `format` annotation versus assertion; overlapping oneOf branches; allOf versus inheritance; additionalProperties/unevaluatedProperties; discriminator hints; circular/reference resolution; defaults that do not mutate data; security OR/AND semantics; examples that validate while serialization differs on the wire. Remote references are a trust/reproducibility boundary.

**Misconceptions:** An OpenAPI file enforces runtime behavior; allOf is object-oriented inheritance; `format: email` always validates; generated types capture every business rule.

**Trade-offs:** Contract-first versus code-first synchronization; reusable schemas versus context-specific correctness; generated artifacts versus explicit clients; newest specification versus demonstrated tool support.

**Backend failure scenario:** A generated client emits an array query parameter in a different style from the server parser, although both teams claim conformance to the same field schema.

**Educational experiment:** Plan schema-instance evaluation cases and an actual parameter-serialization exchange; later pin the chosen validator/generator and specification line. Discovery selects no tool and runs no schema suite.

**Candidate visual:** Description → mock/generator/validator/runtime graph showing which edges need independent verification.

**Exercises and rubric:** Review nullable fields, composed closed objects, array parameters and two authentication alternatives. Full credit states dialect, interpretation and unexpressed business invariants; valid YAML is insufficient.

**References:** [S07](references.md#s07), [S16](references.md#s16).

**Boundaries:** C05 runtime validation; C14 compatibility; C15 generated client behavior; C23 drift checks. D06 owns tooling architecture.

**Depth/completion:** Work through concrete composition/serialization counterexamples, security requirement logic and dialect mismatch; maintain a claim-to-runtime-check map instead of equating description validity with contract correctness.

### D05-C14 — Compatibility, versioning and schema evolution

**Prerequisites:** C07–C13; D04-C16 directional compatibility.

**Observable outcomes:** Judge a change separately for request acceptance, response consumption and behavior; build a mixed-version matrix; design a migration/deprecation communication plan with explicit consumer obligations.

**Foundations:** Producer/consumer, old/new direction, syntactic versus semantic compatibility, support window and observable dependency.

**Technical subtopics:** Add/remove/rename fields, optionality/nullability, enum growth, constraints/defaults, unknown fields, error taxonomy, sort/page defaults, cursor lifetimes and quota changes; URL/header/media-type versioning; additive evolution; compatibility adapters; deprecation versus sunset; release inventories and consumer evidence.

**Advanced mechanisms and edge cases:** Tightening request acceptance versus widening response possibilities; closed response objects; exhaustive enum clients; new required input; old clients during rollback; cached and replayed receipts; persisted webhooks/events; generated SDK differences; behavior changes with unchanged schema; retirement of status/result URLs. Version labels do not erase coexistence and data migration obligations.

**Misconceptions:** Adding a field is always safe; semantic versioning proves consumer compatibility; a new URL version resolves old-client retirement; schema diffs detect every break.

**Trade-offs:** Long compatibility windows versus maintenance burden; version proliferation versus negotiated change; adapters versus permanent divergent semantics; telemetry confidence versus invisible clients.

**Backend failure scenario:** An optional response enum gains a new value; an exhaustive consumer crashes even though the provider calls it an additive change.

**Educational experiment:** Plan pure old/new producer-consumer acceptance matrices, then representative schema and real client fixtures during authoring. A tool's “non-breaking” report remains a scoped classification, not universal proof.

**Candidate visual:** Four-cell old/new request/response matrix with persisted artifacts spanning retirement.

**Exercises and rubric:** Classify field, enum, constraint, error and ordering changes in both directions. Full credit identifies consumer assumptions, rollback exposure and evidence needed for safe retirement.

**References:** [S16](references.md#s16), [S17](references.md#s17), [S21](references.md#s21).

**Boundaries:** C13 description semantics; C15 migration docs; C18 event versions; C19/C20 style-specific evolution. D07/D10 own internal data/rolling-system mechanisms.

**Depth/completion:** Include all four old/new pairings and at least one behavioral break invisible to schema comparison; specify deprecation and removal as different events with pending consumer evidence.

### D05-C15 — Documentation, SDKs and developer experience

**Prerequisites:** C10–C14; earlier exchange/error/collection contracts.

**Observable outcomes:** Turn a consumer task into reproducible guidance; audit an SDK's hidden defaults; write examples that preserve pagination, retries, cancellation, authority and uncertainty.

**Foundations:** Discoverability, reference versus tutorial versus operational guide, task completion and reproducibility.

**Technical subtopics:** Getting started, authentication context, environment/base URL, examples and error catalog; pagination/query conventions; async operation and webhook concepts introduced with local definitions; version/migration guidance; generated versus handwritten SDKs; timeout/retry/body-consumption defaults; escaping/encoding, language type mapping and support/deprecation information.

**Advanced mechanisms and edge cases:** SDK retries creating a new key; generator upgrades silently changing null or unknown-enum handling; examples with unsafe secrets; configuration bleed across tenants; inconsistent API/SDK versions; sandbox behavior diverging from production; absent diagnostic IDs; pagination helpers masking cost or incomplete traversal. Explain consumer escape hatches and limitations.

**Misconceptions:** An interactive OpenAPI explorer is complete documentation; generated clients guarantee compatibility; an example that returns 200 teaches the whole operation; a sandbox qualifies real-provider behavior.

**Trade-offs:** Convenience abstractions versus visible control; concise happy-path onboarding versus essential failure guidance; generated consistency versus ergonomic hand maintenance.

**Backend failure scenario:** A client helper automatically retries a purchase with a fresh key and hides the original attempt's unknown outcome.

**Educational experiment:** Plan a clean-environment consumer walkthrough against a bounded local teaching interface, comparing raw HTTP and a small client wrapper. No complete SDK or portfolio product is commissioned.

**Candidate visual:** Consumer task journey with decision points for errors, polling, retry and help.

**Exercises and rubric:** Review a quickstart and client wrapper. Full credit finds hidden defaults, explains lost-reply behavior and supplies reproducible safe inputs and cleanup, not merely polished prose.

**References:** [S16](references.md#s16), [S18](references.md#s18), [S02](references.md#s02).

**Boundaries:** C16/C18 teach operation/delivery mechanisms; introductory documentation here must not depend on those chapters being read. C23 tests samples; C24 diagnostic usability. D15 owns publication platforms.

**Depth/completion:** Follow a complete success and uncertain-failure consumer journey, inspect actual wrapper behavior and retain a documentation-to-observed-contract comparison rather than only endpoint reference pages.

## Part D — Extended interaction contracts

### D05-C16 — Asynchronous operations and long-running tasks

**Prerequisites:** C02, C06, C09–C15; D01 state machines and D04-C17 cancellation.

**Observable outcomes:** Separate admission, execution, completion and observation; specify an operation/status/result lifecycle; resolve polling/cancel/retry races without promising rollback.

**Foundations:** Request, logical operation, execution attempt, receipt, result and terminal state.

**Technical subtopics:** 202 and documented monitoring reference; 201-created operation resource alternatives; state/progress/error/result representation; status retrieval, conditional polling, Retry-After and rate budget; result links/redirects; operation ownership; cancellation request versus cancellation outcome; timeout, expiry and retention; optional Prefer/respond-async conventions.

**Advanced mechanisms and edge cases:** Reply lost before operation ID reaches caller; idempotent admission returning the same logical operation; cancel racing completion; retrying work versus retrying observation; monotonic states versus nonmonotonic progress estimates; expired result versus unknown ID; reauthorization for status/result; cached status; terminal error after accepted submission. Queue acceptance alone does not establish durable execution.

**Misconceptions:** 202 promises eventual success; disconnect cancels the job; 100% progress proves result persistence; cancellation always undoes completed effects.

**Trade-offs:** Polling versus callback/stream observation; detailed progress versus estimation honesty; retention versus retrieval guarantees; explicit cancellation states versus simpler but ambiguous contracts.

**Backend failure scenario:** The service accepts work, loses the admission reply and starts a second operation on the caller's retry; the first result remains orphaned.

**Educational experiment:** Plan an enumerated operation state model and bounded HTTP submission/poll/cancel/result exchange with explicit barriers for races; no broker or durable worker system is implemented.

**Candidate visual:** Operation state machine plus separate observer lifecycle answering what survives a disconnect.

**Exercises and rubric:** Analyze lost admission receipt, cancellation after completion and expired status. Full credit distinguishes logical operation from attempt, names authoritative evidence and preserves unresolved outcomes.

**References:** [S02](references.md#s02), [S19](references.md#s19), [S13](references.md#s13).

**Boundaries:** C10 admission deduplication; C17 partial bulk results; C18/C21 observation interfaces. D11 owns processing internals; D13 reliability policy.

**Depth/completion:** Define guarded transitions, actor authority and retention; trace normal completion, lost admission reply and cancel/complete races without deriving durability from an HTTP status.

### D05-C17 — Bulk operations, file interfaces, imports and exports

**Prerequisites:** C03, C05–C07, C10–C12, C16; D03 streams/cleanup and D04 framing/ranges.

**Observable outcomes:** State the unit of atomicity and acknowledgment; design per-item results and retry scopes; explain bounded transfer, integrity, restart and artifact access.

**Foundations:** Batch, item identity, transfer session, artifact identity, partial success and completion evidence.

**Technical subtopics:** Atomic versus best-effort batches; per-item errors/results and order; synchronous envelopes versus operation resources; item/body/count/decoded-byte bounds; multipart/file metadata; resumable session contracts; finalize/commit acknowledgment; exports and authorized result retrieval; checksums and total reconciliation.

**Advanced mechanisms and edge cases:** Duplicate items and overlapping batches; one batch key versus per-item logical identity; item conflicts; disconnect after partial effects; corrupted or missing parts; finalize racing upload; resumed bytes from another artifact version; archive expansion; signed URL authority/expiry; spreadsheet formula hazards as an export consumer boundary. A checksum proves a named byte relation, not caller authorization, safe content or storage durability.

**Misconceptions:** One request makes every item atomic; 2xx means every item succeeded; transport EOF means import committed; multipart upload inherently provides application resume.

**Trade-offs:** Atomic convenience versus batch size and coordination cost; ordered versus parallel item reporting; streamed output versus final manifest; durable artifact retention versus cost/privacy.

**Backend failure scenario:** A client retries an entire import after losing a reply, duplicating successful items while hiding original partial failures.

**Educational experiment:** Plan a finite per-item ledger model and bounded streamed HTTP transfer with truncation, checksum mismatch and explicit finalize. Real object-store resume remains an unrun integration.

**Candidate visual:** Item outcome ledger and upload/admission/finalization state transitions.

**Exercises and rubric:** Reconcile ten items with accepted, refused and unknown outcomes; define which may be retried. Full credit retains stable item identity, totals, authority and unknown states rather than resetting the whole batch.

**References:** [S02](references.md#s02), [S12](references.md#s12), [S16](references.md#s16).

**Boundaries:** D04 owns byte/range mechanics; C16 async lifecycle; C10 replay; D08 file storage/durability and D09 malicious content controls.

**Depth/completion:** Work through mixed outcomes and interrupted transfer separately, including finalization and resume identity; specify atomicity/retention without prescribing queues, storage or architecture.

### D05-C18 — Webhooks and event-delivery interfaces

**Prerequisites:** C06, C10–C16; D04 trust, deadlines and uncertain delivery.

**Observable outcomes:** Distinguish event identity from delivery attempts; define a truthful receiver acknowledgment; trace retry, replay and out-of-order arrivals; reason about callback trust and signature verification boundaries.

**Foundations:** Subscription, producer, event occurrence, delivery, receiver acceptance, processing and observation.

**Technical subtopics:** Registration/change/deletion ownership; event envelope/type/version/time/resource reference; payload snapshots versus fetch-later notifications; event/delivery IDs; signature verification over specified bytes, key identification and time/replay policy; retries/backoff/expiry; redelivery/replay; observable delivery state and diagnostic redaction.

**Advanced mechanisms and edge cases:** Same event with multiple delivery attempts; acknowledgment lost after durable acceptance; 2xx before durable handoff; processing after receipt; out-of-order changes/deletions; receiver deduplication window; signature failure after JSON reserialization; secret rotation overlap; endpoint redirect and DNS/destination change; challenge/registration verification does not eliminate SSRF risk. Distinguish a documented convention from a universal webhook standard.

**Misconceptions:** HTTPS authenticates the event sender; a delivery ID is the business intent ID; 2xx proves business processing; retry guarantees eventual successful delivery; replay means originally failed.

**Trade-offs:** Thin notifications versus self-contained snapshots; early acknowledgment versus processing certainty; ordering guarantees versus throughput/availability; replay retention versus cost/privacy.

**Backend failure scenario:** A receiver performs an action, its acknowledgment is lost, and the same event's later delivery performs the action twice.

**Educational experiment:** Plan two loopback HTTP peers for signature-byte preservation, duplicate/out-of-order attempts and lost acknowledgment, plus a pure delivery-state model. No public callback, broker or provider qualification.

**Candidate visual:** Event → delivery attempts → receiver acceptance → business processing sequence with separate identities.

**Exercises and rubric:** Diagnose a duplicate with rotated keys and a newer event already processed. Full credit separates auth, replay validity, deduplication, ordering and effect evidence.

**References:** [S20](references.md#s20), [S12](references.md#s12), [S13](references.md#s13).

**Boundaries:** C10 deduplication; C14 event evolution; C21 ongoing subscriptions. D09 owns complete SSRF/key defense; D10/D11 durable event/consumer implementation.

**Depth/completion:** Trace duplicate, lost acknowledgment, ordering and rotation cases; define precise authenticated bytes and acknowledgment boundary without equating signature success with authorized business effect.

### D05-C19 — GraphQL contracts and execution trade-offs

**Prerequisites:** C02–C03, C05–C07, C11–C14; D02 nullable/union modeling.

**Observable outcomes:** Trace validation and execution separately; derive null propagation and partial results; explain resolver work/authorization; compare GraphQL with resource HTTP for a stated consumer workload.

**Foundations:** Schema, operation, selection set, variable, resolver, input/output type and execution error.

**Technical subtopics:** Scalars/objects/interfaces/unions/enums, lists/non-null and input objects; field arguments/aliases/fragments; query/mutation/subscription roles; variable coercion; validation versus execution; response data/errors/path; HTTP transport/media/status distinctions; pagination conventions and schema evolution.

**Advanced mechanisms and edge cases:** Null bubbling through nullable/non-null list/item combinations; serialized top-level mutation fields do not form a transaction; N+1 resolver fanout; request-scoped batching/cache and tenant isolation; cost/depth/alias limits; property authorization and hidden data dependencies; persisted operations; unknown enum changes; subscription transport and incremental-delivery features require separately pinned specifications/tool support.

**Misconceptions:** One endpoint means one authorization check or one database query; GraphQL eliminates overfetching/cost; HTTP 200 proves every field succeeded; mutations are automatically atomic.

**Trade-offs:** Client selection flexibility versus execution/admission complexity; schema discoverability versus exposed surface; normalized client caching versus identity/evolution burden; aggregation convenience versus ownership coupling.

**Backend failure scenario:** A nested non-null resolver fails, nulling a larger result than the consumer expected, while a global loader cache leaks another tenant's object.

**Educational experiment:** Plan a pinned GraphQL execution fixture showing validation error, partial data, null propagation and resolver counts; compare a bounded HTTP resource example. Use the execution engine when claiming execution, not a handwritten imitation.

**Candidate visual:** Selection/resolver graph with null propagation and per-request batch scope.

**Exercises and rubric:** Predict data/errors for four list/nullability shapes and defend a cost limit. Full credit traces actual response paths, names authorization scope and distinguishes transport from execution success.

**References:** [S22](references.md#s22), [S12](references.md#s12), [S09](references.md#s09).

**Boundaries:** C07 generic traversal; C14 generic compatibility; C21 event/session behavior. D06 owns federation architecture; D07 resolver query planning.

**Depth/completion:** Derive null/error propagation, count resolver fanout and expose a cache/authority leak; present a fair contract/cost comparison rather than a syntax survey.

### D05-C20 — RPC and gRPC service contracts

**Prerequisites:** C03–C06, C10–C14, C16; D04-C12/C16 envelopes, trailers and protocol completion.

**Observable outcomes:** Specify method/message/status semantics; distinguish transport from RPC completion; evaluate protobuf compatibility; reason about deadline/retry/stream behavior across generated clients.

**Foundations:** Service/method, message, field presence, metadata, status and generated binding.

**Technical subtopics:** Procedure versus resource contracts; unary, client/server/bidirectional streaming; protobuf tags/types/presence and JSON mapping; gRPC statuses/error details/trailers; metadata authority; deadlines/cancellation; supported retry policies and method intent; client/server version combinations; browser/intermediary accessibility trade-offs.

**Advanced mechanisms and edge cases:** Reserved removed field numbers/names; unsafe tag/type changes; unknown fields and enums across binary/JSON paths; absent versus default/explicit presence; DEADLINE_EXCEEDED after a successful remote effect; stream messages before final failure; generated language numeric differences; retry eligibility and commitment points qualified by SDK; middleware dropping trailers.

**Misconceptions:** gRPC runs a local function remotely with local failure guarantees; HTTP 200 means RPC success; protobuf binary compatibility proves semantic compatibility; deadline cancellation rolls back effects.

**Trade-offs:** Generated efficiency and typed methods versus tool/runtime coupling; strict service contracts versus public browser ergonomics; unary simplicity versus streaming lifecycle complexity.

**Backend failure scenario:** A gateway reports successful HTTP while losing a non-OK final RPC status; a client interprets partial stream messages as complete results.

**Educational experiment:** Plan a pinned generated client/server fixture with one final-status failure, one expired deadline after an observed effect and old/new message cases. A pure envelope model may support reasoning but cannot substitute for gRPC SDK execution.

**Candidate visual:** Transport response, message sequence and final RPC status on separate evidence lanes.

**Exercises and rubric:** Review schema edits and a deadline/stream trace. Full credit states binary/JSON/language direction, effect uncertainty and final-status evidence rather than relying on transport success.

**References:** [S21](references.md#s21), [S23](references.md#s23).

**Boundaries:** Reuse D04 framing/HTTP2; C10 replay intent; C14 general evolution; C21 app-message lifecycle. D10 owns distributed call semantics beyond the exposed contract.

**Depth/completion:** Trace an actual method through messages and terminal status, directional presence/tag evolution and uncertain deadline effect; qualify SDK-specific behavior and avoid treating generation as verification.

### D05-C21 — Streaming and real-time application interfaces

**Prerequisites:** C10–C12, C14, C16, C18; D03 backpressure and D04-C14/C15 WebSocket/SSE/resumption.

**Observable outcomes:** Specify message and acknowledgment meaning; design honest resumption/gap behavior; separate transport session from durable application state; explain slow-consumer and authorization lifecycles.

**Foundations:** Session, stream, subscription, message/event identity, cursor, acknowledgment, snapshot and replay window.

**Technical subtopics:** SSE versus WebSocket versus streamed HTTP/gRPC use cases; application envelope/type/version; correlation and command/result acknowledgment; ordering scope; heartbeat/liveness versus progress; connect/auth/subscribe/unsubscribe/close; resume cursors, snapshot-plus-delta handoff and explicit reset/gap signals.

**Advanced mechanisms and edge cases:** Snapshot taken before subscription creates a missing interval; duplicate replay; cursor beyond retention; reconnect storm; slow consumer and bounded backlog; credits/drop/disconnect policy; per-session versus per-user limits; token expiry and revocation during a live connection; close racing accepted work; cumulative acknowledgment ambiguity. Backpressure in one transport is not durable acknowledgment or whole-path memory boundedness.

**Misconceptions:** TCP order gives global event order; ping proves business freshness; reconnect replays everything; socket close proves commands had no effect.

**Trade-offs:** Coalescing versus lossless delivery; disconnect versus buffered lag; snapshot reset versus long replay retention; bidirectional convenience versus session complexity.

**Backend failure scenario:** A client reads a snapshot and then subscribes; an update between those steps is never seen, yet the UI claims current state.

**Educational experiment:** Plan a bounded session model and actual local SSE or WebSocket consumer with controlled duplicate/gap/slow-consumer cases. Select a verified runtime/library at authoring; browser/proxy behavior remains separately tested.

**Candidate visual:** Snapshot/subscription interleaving and session/application state machines answering which state survives reconnect.

**Exercises and rubric:** Repair a snapshot-delta gap and define behavior after expired cursor plus revoked access. Full credit states synchronization boundary, authority, permitted loss and explicit client recovery.

**References:** [S24](references.md#s24), [S23](references.md#s23), [S12](references.md#s12).

**Boundaries:** D04 owns frames and event grammar; C18 server-to-server attempt delivery; C22 intermediary buffering; D10/D11 durable log/order implementation.

**Depth/completion:** Demonstrate gap creation, an explicit recovery contract, duplicate handling and resource/authority limits; do not imply an open transport establishes current application state.

## Part E — Verification and operation

### D05-C22 — Gateways, intermediaries and policy ownership

**Prerequisites:** C08, C10–C14, C16, C18–C21; D04-C11 independent hops and forwarding trust.

**Observable outcomes:** Assign a policy's authority and enforcement owner; trace how intermediaries alter observable contracts; detect unsafe retry/identity/cache/timeout composition and origin bypass.

**Foundations:** Origin, ingress, gateway, proxy, adapter, trusted assertion and independent timeout/response boundary.

**Technical subtopics:** Routing, authentication context propagation, authorization responsibility, rate/quota ownership, body/schema checks, header/media/status transformations, protocol translation, request IDs, cache behavior, buffering and limits; public versus internal API exposure; API inventory and policy drift.

**Advanced mechanisms and edge cases:** Credential stripping/forged forwarding; mismatched parsers/normalization; default gateway retries multiplying application retries; gateway timeout after origin commit; response-error rewriting; dropped trailers; SSE buffering/idle timeout; WebSocket upgrade and session limits; direct-origin bypass; deployment skew between schema/policy/origin; per-hop body/decompression bounds.

**Misconceptions:** Gateway authentication covers object authorization; an API policy exists everywhere because it exists at ingress; proxy status equals origin status; gateway retries are transparent to business correctness.

**Trade-offs:** Central consistency versus application context; transformations versus transparent contracts; edge enforcement latency versus origin authority; shared gateway coupling versus team autonomy.

**Backend failure scenario:** The gateway times out and retries a non-deduplicated mutation while the original origin request continues and commits.

**Educational experiment:** Plan a local client/proxy/origin fixture with explicit barriers for delayed reply, trusted-header replacement and buffered stream behavior. No production gateway installation or provider qualification.

**Candidate visual:** Policy ownership matrix and two-hop sequence naming independent deadlines, identities and outcomes.

**Exercises and rubric:** Review a gateway policy bundle and origin route. Full credit identifies bypass, identity authority, compounded limits/retries and preserved terminal evidence, without choosing a vendor.

**References:** [S02](references.md#s02), [S10](references.md#s10), [S12](references.md#s12), [S23](references.md#s23).

**Boundaries:** Reuse D04 hop mechanics; C11 permission decisions; C24 cross-hop evidence. D06 owns topology; D15 installation/deployment; D16 fleet operations.

**Depth/completion:** Trace a transformed/error/streaming exchange across distinct boundaries; show how one centralized policy can fail at bypass or composition, and identify responsible enforcement owners.

### D05-C23 — API verification and consumer contract testing

**Prerequisites:** C01–C22 as accumulated contract subjects; D01 invariants and state reasoning. Testing explanations in earlier chapters are self-contained; this chapter consolidates them.

**Observable outcomes:** Derive tests from observable promises; choose valid oracles; separate schema, provider, consumer, integration and stateful evidence; detect meaningful failures with deliberate contract mutations.

**Foundations:** Assertion/oracle, invariant, fixture, test boundary, consumer expectation, reproducibility and coverage limitation.

**Technical subtopics:** Schema/conformance checks; positive/negative input and response cases; permission matrices; provider and consumer-driven contracts; old/new fixtures; property/metamorphic tests; generated malformed inputs; model-based transition sequences; deterministic concurrent histories; duplicate/lost-reply faults; documentation examples and SDK verification.

**Advanced mechanisms and edge cases:** Mock agrees with a wrong schema; accidental consumer over-specification; pact-like interaction checks missing global invariants; hidden fixture state; stale auth/cursors; retries masking first failures; flaky timer races; sampled fuzzing versus proof; sandbox versus real dependency differences; cleanup and test isolation; controlled fault evidence versus naturally occurring failure.

**Misconceptions:** OpenAPI validation proves business correctness; a mocked contract test proves integration; every failing client assumption is a provider bug; 100% endpoint coverage means failure-path coverage.

**Trade-offs:** Fast isolated checks versus realistic boundaries; permissive consumer matching versus missed regressions; generated breadth versus a trustworthy oracle; integration fidelity versus reproducibility.

**Backend failure scenario:** Provider tests and generated mocks both validate the same wrong serialization assumption; every consumer integration still fails in production.

**Educational experiment:** Plan a minimal multi-boundary teaching fixture, inject a changed enum, unauthorized projection, split check/write and duplicate effect, then show which checks catch each. No organization CI or portfolio implementation.

**Candidate visual:** Claim-to-test-boundary matrix with blind spots and separate evidence categories.

**Exercises and rubric:** Design an oracle for cursor traversal and uncertain retries; classify mocked versus actual evidence. Full credit predicts a failing mutation and checks no unauthorized/duplicate effects, not just status/body snapshots.

**References:** [S16](references.md#s16), [S18](references.md#s18), [S25](references.md#s25).

**Boundaries:** C24 interprets production evidence; D14 owns comprehensive strategy, tools and CI. Any specific testing library must be documented and pinned later.

**Depth/completion:** Demonstrate at least one realistic bug missed by each chosen test boundary, a stateful invariant oracle and a deliberate mutation that proves assertions can fail meaningfully.

### D05-C24 — API observability and production troubleshooting

**Prerequisites:** C06, C10, C12, C14, C16, C18, C21–C23; D03-C15/C17 and D04-C18 scoped evidence.

**Observable outcomes:** Correlate attempts with logical operations; distinguish transport/status/business outcomes; select discriminating evidence for a contract incident; report uncertainty without leaking sensitive input.

**Foundations:** Observation, claim, causal link, attempt versus operation, sampling, metric dimension and evidence scope.

**Technical subtopics:** Stable route/operation IDs and contract versions; latency/error/admission metrics; attempt and logical-action counts; queue/poll/delivery/session lag; structured logs and traces; request/trace/operation/event/delivery correlation; client/intermediary/origin attribution; redaction, retention, sampling and cardinality; deployment/consumer cohorts.

**Advanced mechanisms and edge cases:** HTTP 2xx with GraphQL errors or non-OK gRPC status; partial batch failure; double-counted retries; missing spans; clock skew; low-volume consumer breakage hidden by averages; high-cardinality IDs/URLs; malicious incoming trace context; diagnostics after an uncertain response. Correlation is a clue, not proof of globally ordered causation or authority.

**Misconceptions:** Healthy HTTP status rate means successful business operations; average latency captures tail failures; no log means no action; trace IDs are trusted user identities.

**Trade-offs:** Diagnostic detail versus privacy/cost; sampling versus rare failure visibility; standardized route labels versus per-consumer diagnosis; client evidence versus uncontrolled clocks and versions.

**Backend failure scenario:** A deployment doubles webhook delivery attempts while logical events are unchanged; an attempts-only dashboard incorrectly reports twice the business throughput and hides duplicate effects.

**Educational experiment:** Plan controlled local incidents for lost reply, stale cache and partial RPC/GraphQL success; preserve sanitized client/proxy/origin observations and compare competing explanations. Synthetic data must not be presented as production measurements.

**Candidate visual:** Logical-operation/attempt/event correlation graph and a timeline with explicitly unknown gaps.

**Exercises and rubric:** Produce an incident memo from incomplete cross-hop evidence. Full credit separates fact/hypothesis, selects a discriminating next check and avoids inferring absence from missing instrumentation.

**References:** [S26](references.md#s26), [S22](references.md#s22), [S23](references.md#s23), [S12](references.md#s12).

**Boundaries:** D03/D04 supply runtime/wire evidence; C23 controlled verification. D16 owns telemetry platforms, production incident process and on-call; D12/D13 SLO/capacity policy.

**Depth/completion:** Diagnose at least two competing causes using scoped evidence and preserve a legitimate unknown outcome; account for logical/attempt counts, terminal status and diagnostic-data authority.

### D05-C25 — Integrated API design and failure-review workshop

**Prerequisites:** C01–C24. Reference readers may enter a case through its named prerequisite subset; course assessment follows the full sequence.

**Observable outcomes:** Defend a coherent contract across concerns; discover contradictions between individually plausible choices; transfer reasoning to an unfamiliar API; produce an evidence-qualified design and incident review.

**Foundations:** Contract invariant, consumer goal, failure hypothesis, alternative, traceability and evidence limitation.

**Technical subtopics:** Three bounded teaching cases: (1) concurrent reservation with a lost mutation reply; (2) evolving partner bulk import plus webhook completion; (3) real-time authorized dashboard with snapshot gaps and mixed clients. Compare resource HTTP, GraphQL and RPC where a case motivates them; reconcile representation, error, admission, evolution, docs and observability promises.

**Advanced mechanisms and edge cases:** Conditional state update plus retained idempotency receipt after permission revocation; batch partial effects plus delivery retries; cursor/status/event expiry across version retirement; snapshot/stream gaps under gateway buffering; rollback with old SDKs; no effect proof available after interruption. Keep cases small enough to enumerate assumptions and adversarial traces.

**Misconceptions:** Individually correct mechanisms compose automatically; one successful demo proves the contract; every learning topic must become a project feature; an agent-authored answer demonstrates learner mastery.

**Trade-offs:** Explain at least two defensible designs per case under explicit consumer, cost, authority and consistency assumptions; avoid selecting a universal stack.

**Backend failure scenario:** An API's safe retry policy conflicts with receipt retention and authorization rules, producing duplicate or disclosed outcomes after a long outage.

**Educational experiment:** Plan finite integrated traces plus a minimal local fixture only where observation helps distinguish hypotheses; retain separate model, HTTP/tool, external and learner evidence. No whole-product technical discovery.

**Candidate visual:** Cross-contract invariant map and one layered failure timeline per case if each clarifies causality.

**Exercises and rubric:** Provide a fresh case with contradictory claims. Full credit identifies invariants, constructs an adverse trace, compares alternatives, derives tests and acknowledges missing evidence; partial credit for correct local mechanisms with unresolved composition; fail unsupported exactly-once/security/completion claims. Require an independent learner defense during future study.

**References:** Select the relevant [source register](references.md) entries per claim; no new authority is created by combining cases.

**Boundaries:** Consolidates D05; does not design a portfolio architecture, approve project policy, implement a Charter or start D06. Later Charters map authentic challenges separately.

**Depth/completion:** Retain three coherent cases with distinct invariants, each including normal/adverse/unknown paths, alternative defense and an independently answerable transfer exercise. Mark all learner outcomes pending until observed.

## Depth review checkpoint

All 25 profiles above are proposals. The shared rubric and each chapter's completion criterion must be applied again to actual lesson drafts. A structurally complete profile does not establish that future prose teaches the mechanism deeply. See [review evidence](evidence/review-guide.md) for the design-session checks and pending Product Owner review.
