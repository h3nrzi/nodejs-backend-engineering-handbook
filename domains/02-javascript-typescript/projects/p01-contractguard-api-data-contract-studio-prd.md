# P01 — ContractGuard: API Data Contract Studio — Product Requirements

**Domain:** D02 — JavaScript & TypeScript  
**Status:** draft_pending_learner_review  
**Concept:** approved by learner, 2026-10-12  
**PRD approval:** pending  
**Implementation:** not started; technical choices deliberately excluded

## 1. Problem and motivation

Teams integrating external business APIs frequently discover changed or ambiguous payload requirements only after a request fails or data is silently misinterpreted. The product gives API publishers and consumers a shared place to describe expected data, evaluate examples and explain contract changes without needing to operate a production API.

## 2. Audience and actors

- **Contract author:** creates and edits draft contracts and versions.
- **Reviewer:** inspects changes, examples and compatibility evidence and approves publication where enabled.
- **API consumer:** explores published contract versions and checks representative payloads.
- **Workspace manager:** governs who may publish, archive or review contracts. Detailed role configuration is a product decision pending review.

These are product roles, not a prescribed authentication or authorization architecture.

## 3. Goals and measurable outcomes

Users can (a) express a contract unambiguously, (b) see whether a sample matches it, (c) identify which fields failed and why, and (d) compare two versions before adoption. Proposed measurable product checks: identical contracts and payloads yield the same decision; every rejection includes actionable paths/reason categories; a published version remains reviewable after newer versions appear. Quantitative response-time targets and retention limits remain open rather than invented.

## 4. Scope

**In scope:** named contract registry; draft and published versions; field definitions; required/optional/nullability and discriminated alternatives; bounded nested arrays and objects; explicit accepted primitive representations; evaluation of individual and grouped example payloads; structured issue lists; two-version comparison; human-readable comparison reports; access to earlier published results.

**Deferred pending decisions:** team collaboration permissions, reusable shared definitions, large batch processing, import/export of external schema dialects, automated consumer adoption tracking.

**Out of scope:** proxying live API traffic, enforcing contracts on production systems, API request delivery, full API design suite, arbitrary executable user rules, database migration, generating production validators or code.

## 5. Core user journeys

1. **Author:** creates a contract with a name, description, intended message direction and fields, then saves a draft.
2. **Define behavior:** marks fields required/optional, defines null allowance, permissible data shapes, constraints and recognized variant kinds; receives feedback when a contract definition is internally inconsistent.
3. **Evaluate:** submits a JSON sample against a selected version; sees accepted/rejected status and field-level issues.
4. **Review:** compares a proposed version with a published baseline using saved examples and sees cases whose acceptance changed.
5. **Publish:** a permitted actor approves/publishes a coherent draft; the version becomes a stable reference.
6. **Consume:** a colleague browses a published version, reads examples and exports a human-readable compatibility explanation.

## 6. Functional requirements

**FR-01 Contract identity.** Each contract has a stable identifier, display name, description and version history. Names may be edited only under an explicit product policy; historical version identifiers must remain unambiguous.

**FR-02 Draft versioning.** Authors can create a new draft based on a chosen existing version. Editing a draft does not silently modify an already published version.

**FR-03 Field model.** Contracts may specify strings, numbers, booleans, null, objects and arrays, with nested definitions subject to published product limits. Requiredness, nullability and format/range constraints are distinct concepts.

**FR-04 Variant model.** A contract can describe a set of mutually distinguishable variants via an explicit discriminator. Duplicate discriminator values and contradictory declarations are rejected as invalid contract definitions.

**FR-05 Explicit conversion.** Evaluation must not silently coerce strings such as "false" or "" into boolean/numeric values. If any controlled conversion is offered, the contract must explicitly declare it and the result must distinguish accepted conversion from direct conformity. Default recommendation: no implicit conversion.

**FR-06 Evaluation.** A user selects one contract version and submits a JSON sample or saved sample set. The result reports accepted/rejected plus deterministic issue codes, locations and human-readable explanations; malformed JSON is distinguished from well-formed but nonconforming JSON.

**FR-07 Multiple issues.** A nonconforming sample may return multiple independent issues. When issue collection is intentionally capped, the result must disclose truncation rather than implying no other errors exist.

**FR-08 Unknown fields.** Contract definitions specify whether additional object properties are rejected or allowed under an explicit policy. This policy must be visible in the version being evaluated; no silent policy change after publication.

**FR-09 Saved scenarios.** Users can save representative cases and expected outcomes with labels. Re-evaluation records actual outcomes without silently rewriting the user's expected outcome.

**FR-10 Compare versions.** Comparison reports distinguish added/removed/modified constraints and show which saved scenarios changed acceptance. The report must not claim universal compatibility solely from a finite sample set.

**FR-11 Publish lifecycle.** Published versions are immutable product records. Changes result in another version; archival removes a version from default discovery where appropriate without falsifying historical results.

**FR-12 Explain and export.** Users can view and export a human-readable contract-version report, scenario results and incompatibility summary. Report identifies the exact compared versions and whether findings are proven from definitions or observed only on samples.

**FR-13 Access boundaries.** Only authorized actors can change or publish contracts and their examples; read access follows the workspace's agreed visibility policy.

## 7. Externally observable invariants

- A published contract version and its meaning cannot be retroactively altered by draft edits.
- Re-evaluating the same valid JSON value against the same immutable contract version under the same declared policy yields the same acceptance and issue categories.
- A structurally accepted payload never implies that a real API call would be authorized, successful or business-valid.
- Rejection paths refer to the submitted payload, not unrelated data or secret workspace information.
- A comparison always identifies both versions and labels definition-based vs sample-based conclusions.
- A contract with inconsistent or ambiguous discriminator definitions cannot be published.
- Concurrent draft edits or publication attempts cannot silently erase an acknowledged newer revision; conflict is shown to the actor.

## 8. Quality expectations

Evaluation and reporting should provide understandable failure explanations, keyboard-usable workflows and clear loading/empty/error states. Contract/payload complexity, sample counts and report sizes require explicit product limits before implementation planning. The service must not execute code embedded in submitted examples or contract descriptions. User-controlled text is displayed safely. Personal and confidential sample-data handling requires documented retention, deletion and access rules.

## 9. Edge cases, failures and recovery

- Malformed JSON versus valid JSON null/scalar when a record is expected.
- Missing field versus explicit null; zero/false/empty-string distinctions.
- Nested arrays with invalid individual items and path positions.
- Ambiguous discriminator or variant missing its tag.
- Oversized or deeply nested samples, exhausted issue limits, unreadable imports.
- Unknown fields under different version policies.
- Editing an outdated draft; two publishers racing to publish.
- A user lacking permission to access a particular draft/report.
- Export interrupted after report creation; retry should not modify underlying version results.
- A comparison containing no saved examples must disclose the lack of scenario evidence.

## 10. Acceptance scenarios

**AC-01** Given a published version requiring boolean `enabled`, when a sample supplies string `"false"`, evaluation rejects it unless that exact conversion is expressly enabled.

**AC-02** Given a required `count` and optional nullable `note`, omission of `count` yields a required-field issue while explicit null on `note` is accepted.

**AC-03** Given a discriminated union with kinds `success` and `rejected`, an unknown kind is rejected with a discriminator issue.

**AC-04** Given version 1 and a draft version 2 with a stricter field requirement, the comparison identifies changed definitions and saved examples that now fail, without asserting all consumers will fail.

**AC-05** Given a published version, editing a draft based on it leaves the published behavior unchanged.

**AC-06** Given two actors editing the same draft revision, the losing update receives a visible conflict rather than an unnoticed overwrite.

**AC-07** Given invalid items at different array positions, the issue list correctly identifies each reported position; truncation is explicit when caps apply.

**AC-08** Given a non-authorized actor, a publication request is denied without changing the contract state.

**AC-09** Given an empty scenario set, version comparison still identifies definitional changes but clearly marks sample-impact evidence unavailable.

**AC-10** Given the same sample and version twice, the acceptance outcome and issue categories are consistent regardless of who evaluated it, assuming identical policy.

## 11. Assumptions and unresolved product decisions

1. Primary audience: internal engineering teams, external API partners, or both?
2. Contract definition language: guided form only, declarative text only, or both?
3. Extra-field policy: author-selectable or one workspace-wide rule?
4. Publish workflow: single-author publish or separate reviewer approval?
5. What constitutes a breaking change: definition-level guarantees, sample evidence or both? Which changes can be conclusively classified?
6. Sample limits (size/depth/count), issue-report caps and retention/deletion period.
7. Visibility of sensitive samples; workspace ownership and reviewer roles.
8. Are reusable contract fragments necessary for initial launch?

Recommended starting defaults for review: internal engineering teams; guided authoring; explicit per-version extra-field policy; separate draft/published distinction; compare definitions plus saved examples with qualified conclusions. **These recommendations are not approved decisions yet.**

## 12. Explicit non-goals

Not a live traffic gateway, wire-protocol test runner, business authorization validator, database migration service, universal JSON Schema interpreter, code-execution sandbox or compiler. The product may clarify data contracts but cannot prove operational compatibility with an unspecified production API.

## 13. D02 educational value

Demands precise treatment of JavaScript values, absent/null distinctions, array/object properties and equality; TypeScript structural models, discriminated unions, generics and runtime parsers; stable modules and versioned public contracts; useful error types and careful async report outcomes. This is a meaningful backend-oriented product distinct from D01's processing/simulation projects.

## 14. Approval record

**2026-10-12:** P01 product concept approved as part of five-candidate D02 catalog.  
**PRD editorial review:** pending learner approval.  
**Implementation, architecture, stack and learning assessment:** not started/selected.
