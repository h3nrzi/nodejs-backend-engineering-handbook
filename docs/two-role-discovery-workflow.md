# Two-role discovery: Product Manager → Tech Lead

This is the reusable **MediaForge-derived implementation workflow** for handbook learning projects. It is not a new handbook domain, not a mandatory two-pass interview for every trivial effort, and not a reason to edit an approved product-scope PRD.

## Flow

```text
Handbook domain lessons + learner-approved product-scope PRD
  ↓
Independent implementation repo: immutable PRD copy and applicable Matt Pocock skills
  ↓
PM / Product Owner discovery — grill-with-docs
  → product policy question rounds and explicit approvals
  → product decision log + consolidated product policies (when useful)
  → product terminology in GLOSSARY.md
  → explicit final shared-understanding confirmation
  ↓
Tech Lead / engineering discovery — fresh grill-with-docs
  → architecture/technical question rounds and explicit approvals
  → ADRs for genuinely qualifying engineering decisions
  → updated domain vocabulary and engineering notes/spec context
  → explicit technical shared-understanding confirmation
  ↓
to-spec (for an effort that warrants a durable spec)
  → to-tickets (for multi-step implementation)
  → implement / code-review / acceptance evidence
```

## The PM interview: what must the product do?

**Inputs:** the canonical learner-approved product-scope PRD, imported unchanged into the implementation repo, and current product constraints. The imported PRD defines what product is being built, not a prescribed implementation.

**Method:** ask Codex to run the installed `grill-with-docs`, actually applying `grilling` and `domain-modeling`. Ask each complete ready frontier of independent questions in a numbered round. Codex supplies proposed defaults with trade-offs. ChatGPT explains and reviews; the learner, acting as Product Owner, approves or changes each consequential answer.

**Possible outputs in the implementation repository:**
- `docs/product/v1-product-discovery.md`: product interview record, approval provenance, dependencies and resulting decisions.
- `docs/product/v1-product-policies.md`: consolidated contract for observable V1 behavior. Use it when the number/complexity of rules merits it; not an intrinsic output required by the skill.
- `GLOSSARY.md`: concise domain-specific vocabulary without implementation details.
- `docs/product/prd.md`: **immutable** approved baseline; do not mix subsequent policy decisions into it.

Ordinary product policies are **not** automatically architectural ADRs. `domain-modeling` proposes an ADR only when a decision is hard to reverse, surprising without context and a real trade-off. Do not demand one ADR per question or mislabel product policies as tech decisions.

**Exit gate:** questions needed for V1 observable behavior are resolved; explicit deferrals and potential scope changes are identified; the **Product Owner explicitly confirms final shared understanding**. Individual round approvals do not themselves satisfy this final gate.

**Reusable Codex prompt:** [Tech Lead `grill-with-docs` template](../templates/codex-grill-with-docs-technical-discovery.md) (fill for each external project after final PM gate).

## The Tech Lead interview: how should it be engineered?

**Inputs:** the frozen PRD, approved product-policy contract, glossary, current project code/constraints and any existing ADRs. This is a **new** `grill-with-docs` interview with its own engineering design tree; do not continue the product question numbering as if engineering choices were product rules.

**Questions:** consider ownership/boundaries, runtime/concurrency, persistence, resource isolation, evidence of processing completion/inactivity, reconciliation, access control, APIs, tests, observability and deployment **only where relevant**. Research environmental facts rather than asking the learner to guess them. Ask all independent ready technical decisions each round with recommendations and trade-offs. The learner reviews and approves consequential selections; ChatGPT facilitates, Codex executes and maintains the implementation repo.

**Outputs:** meaningful technical decisions in spec/technical notes, `GLOSSARY.md` for newly resolved domain vocabulary and `docs/adr/NNNN-*.md` **only** for decisions passing the skill's three-part ADR threshold. ADRs explain consequential architectural choices; the product policies remain the PM contract and must not be silently weakened.

**Conflict boundary:** if a technical design cannot meet a product constraint, return the proposed product change and its consequences to the Product Owner for explicit approval. No silent changes to the PRD, product-policy guarantees or deferred scope.

**Exit gate:** the technical question frontier for the intended effort is closed, consequential decisions are approved, ADRs/glossary updated where warranted, and shared understanding is explicitly confirmed. Choose the minimum engineering ceremony that fits the work: direct implementation for bounded tasks; `to-spec` → `to-tickets` for work requiring durable multi-session planning.

## Handbook's educational record

For each project, use `projects/implementation-studies/<id>/` to retain a linked approved PRD copy and **round-specific educational explanations** (original Codex question verbatim; its complete proposed answer; learner-approved answer when evidenced; alternatives and trade-offs; examples). For engineering rounds, link actual ADRs in the external implementation repository instead of copying/pretending they were approved.

The handbook must not become a second authoritative engineering repository. The external project owns policy decisions, technical design, ADRs, specs, tickets and code. After each documented learning round, the guide gives a **bespoke NotebookLM video prompt in the conversation**, after learner approval, without storing generic NotebookLM templates.

## MediaForge — worked example and current boundary

- [Canonical MediaForge PRD](../domains/03-nodejs-internals/projects/p02-mediaforge-asset-processing-prd.md) and [educational archive](../projects/implementation-studies/d03-p02-mediaforge/README.md).
- [Implementation repo decision log](https://github.com/h3nrzi/mediaforge/blob/main/docs/product/v1-product-discovery.md) and [approved product policies](https://github.com/h3nrzi/mediaforge/blob/main/docs/product/v1-product-policies.md): Q1–Q59 approved across four PM discovery rounds.
- [Domain glossary](https://github.com/h3nrzi/mediaforge/blob/main/GLOSSARY.md).
- **Final PM shared-understanding confirmation is still pending** according to the verified documents. Do not claim Phase 1 closed or Tech Lead discovery started.
- Once final PM approval is recorded, start the separate Tech Lead `grill-with-docs` with these documents as contract inputs. Engineering ADRs belong in `h3nrzi/mediaforge`, not here.

## Reuse rule

Follow this pattern for later selected handbook projects only when detailed V1 product rules merit a PM interview. The handbook PRD remains product-scope/architecture-neutral; module-level technical choices emerge during local implementation using the installed skills.