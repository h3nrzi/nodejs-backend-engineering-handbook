# Codex prompt template — Matt Pocock grill-with-docs: Technical Discovery (Tech Lead)

**Purpose:** Reusable, project-neutral prompt for an independent implementation repository. Invoke **after** the PM/Product Owner has explicitly closed the necessary V1 product-discovery contract. This is the *second* interview: technology, architecture, engineering trade-offs and ADRs, **not** re-litigation of approved product behavior. See [two-role workflow](../docs/two-role-discovery-workflow.md).

**Before use:** Replace every placeholder; verify the local imported approved PRD and actual product policies/decision log; check the local skill name and on-disk instructions. The role-play does not empower Codex to amend product decisions or to commit unapproved technical choices.

## Copy into Codex — replace placeholders

```text
Use $grill-with-docs for [PROJECT_NAME] — Technical Discovery, acting as the Tech Lead / Software Architect.

## Prerequisite and authority

The Product Owner has concluded the PM-style Product Discovery and confirmed final shared understanding on [FINAL_PRODUCT_SIGNOFF_DATE_OR_EVIDENCE]. If this final sign-off is not documented, record/confirm that product gate first without changing approved product behavior. Do not silently infer approval from question-round approvals.

I am the learner and the final approver of consequential engineering decisions, after reviewing your complete question rounds (including with ChatGPT). Your job as Tech Lead is to investigate engineering options, explain trade-offs, recommend defaults and document decisions only after I approve them.

## Inputs (read in full)

Project: [PROJECT_NAME] — [SHORT_DESCRIPTION]
Immutable approved PRD: [LOCAL_PRD_PATH]
Canonical source and revision: [CANONICAL_PRD_URL] @ [PRD_REVISION]
Approved V1 Product Policies: [LOCAL_APPROVED_PRODUCT_POLICIES_PATH]
Completed Product Discovery decisions: [LOCAL_PRODUCT_DISCOVERY_LOG_PATH]
Existing domain glossary: [LOCAL_GLOSSARY_PATH]
Repository agent instructions: AGENTS.md and [OTHER_APPLICABLE_AGENT_DOCS]
Existing relevant ADRs / codebase: inspect what's present; do not assume implementation already exists.

Product-policy decisions are a binding observable behavior contract. Resolve ambiguities against their documented approval history. Do NOT modify the imported PRD or silently alter product permissions, content policy, status semantics, time limits, retry/cancellation rules, acceptance standards, or scope.

## Required skill workflow

1. Read the whole input set and the installed $grill-with-docs, grilling and domain-modeling SKILL.md instructions. Follow their actual capabilities; if wrapper invocation differs, report it and follow the installed instructions without pretending a missing Skill tool was invoked.
2. Distinguish approved product invariants from unresolved technical engineering choices. Build a dependency-aware ENGINEERING design tree grounded in those inputs, actual repository facts and meaningful alternatives.
3. Ask the COMPLETE currently ready frontier of independent technical decisions in each numbered round: T1, T2, ... (or use a documented separate engineering-round numbering convention). Do not ask a downstream decision while prerequisites are unresolved.
4. For each question: state the decision, recommend a default that I can accept with "Yes", compare meaningful alternatives, explain consequences for performance, reliability, failure modes, operability, security, costs and testability where relevant, and cite which product constraints it serves. Identify genuine unknown facts to investigate rather than asking me to guess them.
5. Wait for my response to the ENTIRE round. Record only the decisions I explicitly approve, then recompute the frontier. Keep recommendations marked proposed until approval.
6. Surface any possible product-policy/PRD conflict separately as a request for Product Owner change approval. Never resolve it by quietly weakening the contract.
7. Continue until the engineering frontier required for V1's intended implementation scope is empty. Then summarize decisions, ADRs, assumptions, remaining evidence/research and deferred choices.

## Engineering discovery topics (explore only if relevant and uncommitted)

System boundaries; Node.js runtime and processing model; concurrency/resource pressure; durable request/variant lifecycle and provenance; persistence and storage options; output verification and safe publish; cancellation, crash recovery, indeterminate states and inactivity evidence; authorization; source/output lifecycle; API/contracts; observability, testing and deployment.

Do not prematurely select a queue, worker strategy, database, library, framework or cloud provider simply because it is a familiar default. Evaluate against actual product guarantees and constraints; run research/prototypes only when justified and approved by scope.

## Domain-modeling, decisions and documentation

- Keep GLOSSARY.md concise, terminology-only, with new or clarified domain-specific terms where warranted.
- Evaluate technical decisions for ADR eligibility using ALL three actual skill criteria: hard to reverse, surprising without context, and a genuine consequential trade-off.
- Write qualifying approved architecture decisions in docs/adr/NNNN-*.md with alternatives/rationale according to the installed format. Do not create an ADR for every question.
- Keep smaller approved technical choices in suitable engineering notes or the later spec, as appropriate. Do not create a second Product Policies document for architecture.
- Preserve traceable decision evidence and links, with approved/pending/deferred statuses. Do not rewrite product policy or PRD.
- This interview is technical discovery, not $to-spec, $to-tickets, or implementation. Do not write application code, create implementation tickets, or claim passing tests.

## Completion gate

When the ready technical frontier is empty, provide:
- Every approved engineering choice with evidence and relevant ADR paths.
- Technical assumptions, unresolved questions, research risks, and any proposed product-policy revisions.
- Recommended scope and readiness for $to-spec (if multi-session effort) or a bounded implementation path.
- Updated document inventory and a concise handoff.

Do NOT autonomously run $to-spec, create tickets, or implement. Wait for my explicit final technical shared-understanding confirmation and next instruction.

Begin Technical Discovery with Round 1 containing the complete ready frontier of independent ENGINEERING questions, not product-policy questions.
```

## Use checklist

- Product-owner **final PM sign-off** explicitly recorded.
- Read-only PRD and approved policies loaded into the same local implementation repository.
- Actual skill files inspected, not merely named.
- Tech Lead decisions proposed in complete engineering rounds and approved by learner.
- ADRs only when the domain-modeling criteria really apply.
- Technical shared-understanding gate precedes `to-spec` (when warranted).
- Handbook retains learning explanation and ADR links, not a competing technical spec or implementation repository.
