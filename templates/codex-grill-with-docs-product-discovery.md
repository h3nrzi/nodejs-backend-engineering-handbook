# Codex prompt template — Matt Pocock grill-with-docs: V1 Product Discovery

**Purpose:** Reusable kickoff prompt for an **already learner-approved product-scope PRD**, used in a **separate implementation repository** after Matt Pocock skills have been installed and configured. This is a prompt template, not a PRD, architecture decision, or indication that implementation has begun.

**Before use:** Copy the approved PRD verbatim into the implementation repository (recommended: `docs/product/prd.md`). Note the exact source URL and revision/commit so the imported baseline can be traced. Verify the actual installed skill names and follow their on-disk instructions. Replace the placeholders below. Preserve the approved PRD unchanged; record newly approved V1 policies separately.

## Copy into Codex (replace placeholders)

```text
Use $grill-with-docs for [PROJECT_NAME] V1 Product Discovery.

## Context

Project: [PROJECT_NAME] — [SHORT_PRODUCT_DESCRIPTION]

Approved product requirements (local baseline):
[LOCAL_PRD_PATH]  (recommended: docs/product/prd.md)

Canonical PRD source:
[HANDBOOK_PRD_URL]

Canonical PRD revision:
[HANDBOOK_COMMIT_OR_REVISION]

Repository instructions:
AGENTS.md
docs/agents/ (if present)

The PRD is already learner-approved at the product-scope level. Our goal is to resolve build-blocking V1 product policies, not to rediscover the product or change its approved boundaries. Read the PRD's explicit open questions first; use the rest of the PRD to identify any essential behavioral ambiguities.

## Required workflow

1. Read the entire local PRD and applicable local agent instructions.
2. Use the installed grill-with-docs skill and follow the actual grilling and domain-modeling skill instructions. If command names or instructions differ, report that difference rather than assuming an invocation.
3. Construct a dependency-aware design tree of the unresolved V1 product decisions.
4. Ask questions in rounds, following the grilling skill's frontier model:
   - Ask the entire currently ready frontier of independent decisions in each round.
   - Number every question (Q1, Q2, ...), with a recommended answer for each.
   - Explain consequential product trade-offs.
   - Phrase each question so "Yes" accepts its recommended answer.
   - Defer questions dependent on unresolved decisions until a subsequent round.
5. Wait for my answers to the whole round before proceeding. Recompute the frontier between rounds.
6. Check facts from available sources or tools rather than asking me to research them.
7. Continue until the necessary V1 product-decision frontier is empty, while keeping safely deferrable questions explicitly deferred.

## Decision authority

I am the product owner and final decision-maker. I may relay entire question rounds to ChatGPT for review before answering.

Distinguish:
- Approved PRD product boundaries and non-goals (authoritative).
- Open V1 product-behavior decisions requiring my approval.
- Technical decisions reserved for a later phase.
- Explicitly deferred or excluded capabilities.

Recommend defaults; never silently approve them, reinterpret the approved scope, or treat skill suggestions as product authority. Flag any proposed scope change for explicit approval.

## Documentation

Treat [LOCAL_PRD_PATH] as an immutable imported product-scope baseline. Record approved V1 product policies in separate local product-decision documentation, with provenance and any still-open questions. Follow installed domain-modeling instructions for precise, approved glossary terms; create glossary files only as terms are resolved. Propose ADRs sparingly, only when the installed skill's requirements apply. Technical designs and implementation ADRs belong to the separate implementation repo, not the Handbook.

## Boundaries for this session

This is Product Discovery only. Do not preselect a framework, database, queue, worker/process model, media-processing library, provider, runtime topology, architecture, or code structure. Do not write application code or implementation tickets. If domain-specific technology is being proposed, classify it for later Technical Discovery.

## Completion condition

When the necessary V1 product frontier is empty, summarize:
- User-approved V1 product rules and where they were recorded.
- Product questions explicitly deferred.
- Scope changes that would need separate approval.
- Documentation updated, and outstanding readiness risks.
- Readiness for Technical Discovery.

Do not claim Product Discovery complete or proceed to technical design until I explicitly confirm shared understanding.

Begin with Round 1, containing the full currently ready frontier of independent product decisions.
```

## Handoff checks

- **Product boundary:** approved canonical PRD version linked; local baseline unchanged.
- **Skills:** installed skill names and instructions verified in the implementation repo; `grill-with-docs` orchestrates `grilling` + `domain-modeling` in the known Matt Pocock installation.
- **Round protocol:** every ready independent question in the current round, numbered with recommended defaults; wait for learner response before advancing.
- **Ownership:** learner approves consequential decisions; ChatGPT may review rounds; Codex records only approved outcomes.
- **Artifacts:** V1 policies and domain terms in the external repo; technical ADR/specs/tickets/code later, after the product gate.
- **Evidence:** initial prompt use does not itself prove skill execution, product decisions, implementation, or competency.
