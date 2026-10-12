# P03 — PolicyLens PRD

**Domain:** D02 — JavaScript & TypeScript
**Status:** approved_by_learner
**Product approval:** learner-approved on 2026-10-12 (product direction and boundaries)
**Implementation:** not started; technical choices deferred to separate Codex workflow

## Product overview
Policy authors define versioned, restricted (non-executable) business rules; analysts evaluate cases and see an allowed/denied/needs_review decision with matched-rule explanation. Reviewers publish immutable versions; auditors inspect historical decisions and compare version changes.

## Scope — confirmed product boundary

**In scope:** a workspace for *explainable business-policy evaluation*. Users create draft/published rule policies from a finite non-executable vocabulary; define explicit conflict/precedence and no-match behavior; validate and evaluate cases; inspect why a decision was reached; save sample cases; compare versions; inspect immutable publication history; enforce editorial visibility/permission boundaries; and export reports.

**Out of scope:** executing user-supplied scripts, acting as a production authorization/enforcement gateway, autonomous AI policy decisions, regulatory certification and a generic graph/workflow simulator. PolicyLens is a business-decision explanation product, not a system that independently enforces its results.

**Not committed to the first version:** capabilities beyond the approved in-scope set, including broader rule domains or external integrations, require a later product-scope decision. This is not permission to silently add them during technical implementation.

**Actors and core journeys:** policy authors draft conditions and define declared outcomes; reviewers publish permitted versions; analysts submit a case and inspect the decisive matched rules; reviewers compare a proposed version with past examples; auditors recover exact historical version/decision explanations. The product must distinguish **invalid input** from a valid **denied** business result.

**Approval meaning and decision timing:** these in/out boundaries and core behaviors are learner-approved. Specific initial business domain, supported condition vocabulary, rule-conflict policy, default outcome, roles and resource limits are documented below as **open product questions**, not preselected decisions. At the separate project kickoff, Codex uses actually installed Matt Pocock skills to ask the questions needed for the chosen first version, recommends options, and records choices only with explicit learner approval. No technical architecture, database or framework is chosen here.

## Requirements
1. Stable policy and version IDs.
2. Reject malformed conditions and unknown operators.
3. Distinguish invalid case data from valid business denial.
4. Evaluate one declared policy version and return allowed, denied or needs_review with decisive rules.
5. Resolve multiple matches via explicit precedence/conflict settings, and no matches via explicit default.
6. Preserve historical published versions.
7. Compare changes and representative sample outcomes without claiming universal compatibility.
8. Prevent unauthorized publication and silent overwrites of newer drafts.
9. Export versioned explanations with access-controlled case details.

## Invariants
The same canonical case and immutable version yield the same result and explanation categories. Historical decisions retain their original version. User-supplied expressions and descriptions are never executed as code. An allowed result is not itself authorization to perform a real operation.

## Acceptance scenarios
- Missing required input yields validation error rather than denied.
- Conflicting matching rules follow declared policy and explain decisive rule.
- No-match case uses declared default.
- Published results remain stable after later edits.
- Two-version comparison reveals changed saved-case decisions.
- Empty sample comparisons disclose limited evidence.
- Unsupported rules cannot publish; stale edits show conflicts.
- Unauthorized publication changes nothing.
- Archived policies remain traceable from prior decisions.

## Quality and failures
Accessible authoring, readable errors, safe handling of untrusted descriptions, privacy-conscious reports; handle contradictory rules, missing case fields, excessive input sizes, empty comparisons, permissions and partial export failures.

## Open product decisions for Matt-guided kickoff

1. Which bounded business-policy domain is supported initially?
2. Which field types, supported conditions and outcomes are authorable in that domain?
3. How are multiple matching rules resolved, and what happens when no rule matches?
4. Which publication and reviewer permissions are necessary in the first version?
5. What input, rule-count, history, report-size and retention limits are appropriate?
6. What are the privacy and visibility rules for saved business cases?
7. Is policy activation or rollback part of the first version, or a later product increment?
8. Which compatibility conclusions can rely on rules alone, and which require sample evidence?

These are **product** choices, not architecture decisions. Resolve the first-version blocking ones in the dedicated Codex/Matt discovery stage. A change that adds a new kind of product, actor or feature outside the approved boundary needs the learner's separate approval.

## D02 coverage and approval
Exercises discriminated unions, exhaustive handling, rule composition, object contracts, and runtime validation. Concept and PRD editorially approved by learner on 2026-10-12 for the problem, audience, approved scope and essential behavior. Open product policies remain for learner-approved Matt-guided discovery at project kickoff. Learning assessment and implementation deferred.
