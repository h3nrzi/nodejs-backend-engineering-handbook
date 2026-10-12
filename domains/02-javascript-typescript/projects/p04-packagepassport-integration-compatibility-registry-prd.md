# P04 — PackagePassport: Integration Compatibility Registry — Product Requirements

**Domain:** D02 — JavaScript & TypeScript  
**Status:** approved_by_learner  
**Concept:** approved by learner on 2026-10-12  
**PRD approval:** learner-approved on 2026-10-12; open product decisions remain  
**Implementation:** not started; no stack, architecture or dependency-resolution technology selected
**Editorial product boundary:** problem, users, in/out/deferred scope and essential observable behavior are learner-approved; incidental policies and numerical limits may remain open.
**Matt/Codex kickoff:** choose necessary first-version details through the installed Matt Pocock skill workflow with explicit learner approval; preserve approved non-goals and obtain separate approval for any scope change before dependent technical design.

## 1. Problem and motivation

Teams adopting shared software packages often rely on version labels, type declarations or informal integration notes that do not describe the same thing as observable runtime behavior. A new release may rename an export, alter a consumer-facing contract or narrow supported execution environments. Different consumers can report apparently contradictory compatibility outcomes, while maintainers lack a dependable history of what was claimed, observed and still unverified.

PackagePassport is a product-facing registry for documenting releases, their public integration contracts, supported environments and evidence-backed compatibility scenarios. It makes discrepancies visible without pretending to compile, execute or resolve packages itself.

## 2. Target users and actors

- **Package maintainer:** registers an owned package, proposes release records, documents public exports and compatibility claims.
- **Integrator:** identifies the release and consumer environment they intend to use, searches documented scenarios and reviews upgrade risks.
- **Reviewer:** confirms publication of submitted release metadata and compatibility claims when product policy requires it.
- **Evidence contributor:** records outcomes of integration scenarios, including observations that contradict a release's stated support.
- **Workspace administrator:** manages who may edit, publish, withdraw or inspect restricted release records.

Roles are requirements for permissions and accountability, not a prescribed identity or technical access-control implementation.

## 3. Goals and product-level success measures

An integrator should be able to answer four questions: **What does this release claim to expose? Which environments are claimed to be supported? What has actually been observed in relevant scenarios? What changed compared with the previous release?**

For every displayed compatibility status, the product identifies its basis: declared support, observed scenario evidence or insufficient information. The registry must not equate missing evidence with proof of incompatibility or label type-level compatibility as guaranteed execution success.

Measures for product acceptance: versioned release records retain stable meanings; the same criteria yield consistent compatibility labels; conflicting claims and observations are visibly distinguishable; changes to public contract fields are traceable between selected releases. Numeric targets for catalog size, response times and retention remain unresolved.

## 4. Scope: in, deferred and out

**In scope:** package catalog; release registration and lifecycle; release-specific public export inventory; documented callable or data-shape expectations; stated module-format and supported-environment claims; consumer scenario profiles; manually registered or externally evidenced scenario outcomes; compatibility matrices; comparison of two releases; explicit uncertainty and contradictory evidence; change notes; searchable release history; report export; visible ownership and editorial permissions.

**Deferred pending product review:** bulk imports of third-party package metadata; team approval chains; subscriptions to compatibility changes; integrations with external testing systems; sharing of reusable environment profiles between organizations; automated verification of submitted evidence.

**Out of scope:** hosting packages, installing dependencies, resolving dependency trees, executing arbitrary submitted code, building or compiling packages, running a test farm, replacing continuous integration, implementing a Node.js loader, guaranteeing runtime safety or making deployment decisions on behalf of a consumer.

## 5. Primary user journeys

1. A maintainer creates a registry entry for a named package with an owner, description, intended usage and available release history.
2. The maintainer creates a draft release, records the exports and consumer-visible declarations it claims to provide, and identifies supported execution environments and module formats.
3. An integrator selects a consumer profile (environment, required exports and relevant restrictions), then reviews declared compatibility, existing observations and unknown areas.
4. An evidence contributor submits a scenario with its setup description, release, environment, expected behavior, observed outcome, provenance and observation date.
5. A reviewer sees whether scenario observations agree with the maintainer's claims; contradictory evidence remains visible rather than being silently rewritten.
6. An integrator compares two releases, identifies additions/removals/changed contract claims, and reads migration notes and scenario differences.
7. Authorized actors publish or archive records without changing the historical meaning of earlier published revisions.
8. A user exports an evidence-labeled compatibility report for a selected release and consumer profile.

## 6. Functional requirements

**FR-01 — Package identity.** Each package has a stable registry identity, owner and descriptive metadata. A displayed name change cannot silently merge two unrelated packages.

**FR-02 — Release identity.** Each recorded release is unambiguously identified within its package. The product does not assume that a version number alone proves release integrity or authenticity.

**FR-03 — Draft and publication.** Maintainers can save draft release records. Published records are stable historical snapshots; meaningful corrections use visibly identified revisions, corrections or new records under a product-approved policy.

**FR-04 — Public surface.** A release record captures a human-readable inventory of public entrypoints/exports, documented consumers, type-level claims and any relevant runtime-value expectations. Types and actual exports must be identified as different kinds of claims.

**FR-05 — Environment claims.** Supported-environment statements identify the dimensions being claimed (for example host family, version range and supported module format). The product distinguishes unmentioned environments from expressly unsupported ones.

**FR-06 — Consumer scenarios.** An integrator can define a bounded scenario with required public capabilities, consumer assumptions and environment characteristics; the scenario can be attached to a chosen release.

**FR-07 — Evidence records.** A contributor can record supported, unsupported, inconclusive or not-run scenario observations with provenance and observation date. Submissions must disclose whether the result is a documented manual observation or references independent verification.

**FR-08 — Conflict visibility.** A declared supported combination with a failing observation is flagged as a discrepancy. Multiple contradictory observations are retained and presented with their provenance rather than resolved arbitrarily.

**FR-09 — Compatibility matrix.** Users can inspect selected releases against selected environments/scenarios. Every cell distinguishes declared support, observed result and remaining uncertainty; it never collapses all three into one unsupported certainty claim.

**FR-10 — Release comparison.** Compare two release contracts for added, removed and changed public entries, environment claims and documented scenarios. Label changes whose impact is evident from the registry separately from changes whose real impact needs further evidence.

**FR-11 — Migration notes.** Maintainers can provide human-readable upgrade guidance associated with exact source and target versions. Notes are labeled as maintainer guidance, not automatically verified instructions.

**FR-12 — History.** Historical comparisons and evidence records remain attributable to their release, revision, contributor and observation date under agreed retention rules.

**FR-13 — Access controls.** Only permitted actors can edit releases or claims, submit evidence, publish corrections, archive entries or access restricted metadata.

**FR-14 — Export.** Users can export a readable report naming the package, release, consumer profile, relevant claims, observations, disagreements, unverified combinations and comparison boundaries.

**FR-15 — Concurrent edits.** Older draft edits and conflicting publication actions cannot silently overwrite acknowledged newer contributions.

**FR-16 — Status vocabulary.** Product terminology must preserve the distinction between **claimed supported**, **observed passing**, **observed failing**, **inconclusive**, **not evaluated**, and **explicitly unsupported**. Status rollups may be introduced only with disclosed aggregation rules.

## 7. Observable invariants

- A published release record cannot be retroactively rewritten without an explicit, visible correction trail.
- A compatibility statement always identifies the selected release and applicable consumer scenario/environment.
- Missing evidence does not imply passing or failing compatibility.
- A declared export or static type does not prove that a real consumer can load or use the corresponding runtime behavior.
- A failing observation cannot be erased merely because a maintainer publishes a contrary support claim.
- Comparing release A to B does not automatically assert semantic-versioning correctness, runtime safety or consumer-wide breakage without appropriate evidence.
- Conflicting edits do not silently discard a later acknowledged release or evidence revision.
- User-authored descriptions, migration notes and evidence are treated as data; the product does not execute arbitrary submitted package code.

## 8. Quality and nonfunctional expectations

A user should be able to interpret compatibility reports without specialized knowledge of the registry's internals. Matrices need readable labels, filters, keyboard access, sensible empty states and explicit evidence freshness. Large matrices and reports require product-approved bounds. Restricted package information and consumer profiles are visible only under the agreed permissions policy. Metadata, user-authored descriptions and evidence references must be handled safely; the product must not imply that a quoted URL, document or human assertion has been independently verified.

## 9. Edge cases, failure behavior and recovery

- Two unrelated packages share a display name or a release is submitted twice.
- A release claims an export that an integrator reports missing; both records must remain attributable.
- A package has types/declarations described but no corresponding known runtime export evidence.
- Claimed environments use incompatible or ambiguous labels; the product requests clarification rather than silently equating them.
- A consumer profile requires a capability the release does not document; classify as unknown unless explicitly unsupported.
- Multiple contributors report opposing outcomes for the same nominal scenario; retain provenance and show conflict.
- A comparison contains releases with incomplete contract inventories.
- A historical record is corrected after consumers already exported a report; past report meaning and correction timing remain distinguishable.
- A maintainer archives a release that remains cited by historical scenario results.
- An integrator changes a consumer profile while viewing a matrix; avoid mixing old and new assumptions without a visible refresh.
- Concurrent reviewers act on the same release revision.
- Report export fails or is interrupted; retry must not modify evidence or claims.
- A user requests restricted package details without permission.
- A huge or malformed evidence submission exceeds documented limits; return a specific recoverable error.

## 10. Acceptance criteria and example scenarios

**AC-01.** Given a draft release with stated exports and environments, publishing preserves a stable referenced snapshot.

**AC-02.** Given a release whose description names a type but provides no runtime-value claim, the interface does not represent that type declaration as proof of a loadable runtime export.

**AC-03.** Given an environment not mentioned in release support claims and no observations, the matrix marks its status unverified, not unsupported.

**AC-04.** Given maintainer-declared support and an observed failure, the report shows both the claim and conflicting evidence.

**AC-05.** Given two contradictory observations for the same scenario, neither is overwritten, and the matrix surfaces the disagreement.

**AC-06.** Given an older release that lacks an export listed in a newer release, comparison identifies the addition without claiming every integration benefits.

**AC-07.** Given a removed documented export, comparison marks a potential compatibility risk and identifies the affected public contract.

**AC-08.** Given a consumer profile with unmet stated requirements, the result explains the relevant mismatch without fabricating a real execution test.

**AC-09.** Given incomplete release inventories, comparison discloses the limits of its conclusion.

**AC-10.** Given an unauthorized contributor, editing a restricted release is denied without changing its published record.

**AC-11.** Given concurrent edits from an outdated revision, the second publication attempt produces a visible conflict/reconciliation path.

**AC-12.** Given an archived release, historical scenarios and reports still identify it under the approved retention policy.

**AC-13.** Given a report export, the report identifies release, environment/profile, dates, contributors/provenance and which conclusions are claims versus observations.

**AC-14.** Given migration guidance authored by a maintainer, it remains labeled as guidance and not as verified execution success.

## 11. Assumptions and open product decisions

1. Is the initial audience one organization's internal package registry or a shared registry for external partners?
2. Which host/environment dimensions matter at launch, and how are version ranges represented for users?
3. Which public API declarations must be documented initially: named exports, default exports, types, callable signatures, or some smaller subset?
4. Should evidence be manually recorded only, or may users attach results verified by an external system?
5. What provenance is required for observations, and who is permitted to challenge or supersede them?
6. What constitutes a roll-up compatibility verdict when scenarios disagree?
7. Are publication review and historical correction approval mandatory?
8. How long are drafts, archived records, reports and scenario observations retained?
9. What package/size/scenario limits and search performance targets are acceptable?
10. Are private packages and confidential consumer profiles supported in the first release?
11. What minimum data permits describing a release as documented rather than merely registered?
12. How should release authenticity and ownership claims be represented without implying verification not performed by the product?

**Suggested starting defaults, not approved:** internal packages first; a small explicit environment vocabulary; separate claimed support from manually documented observations; uncertainty preserved; versioned immutable public records; compare two releases without automatic compatibility guarantees. Initial audience, evidence policy and environment dimensions will be chosen at Matt-guided project kickoff, with explicit learner approval and no change to the approved product boundary.

## 12. Explicit non-goals

Not a package manager, lockfile analyzer, dependency resolver, build/compile service, CI platform, code runner, live runtime diagnostics tool, security scanner or software supply-chain attestation authority. Registration does not certify a release as authentic, safe, compatible or production-ready.

## 13. D02 educational outcomes

This product emphasizes JavaScript module boundaries and ES module/CommonJS interoperability concepts, TypeScript declarations versus runtime behavior, structural contracts, conditional compatibility states, precise data modeling and error handling. It is differentiated from ContractGuard's payload validation, DispatchDesk's dispatch outcomes and PolicyLens's business-rule decision explanation. Node loader internals and package execution mechanics remain separate D03 learning/implementation subjects.

## 14. Approval record

**Project concept:** learner-approved with the other D02 candidates, 2026-10-12.
**PRD editorial approval:** approved by learner on 2026-10-12; open product decisions remain.
**Product questions:** deliberately unresolved; see section 11.
**Technical implementation, study assessment and repository creation:** not started.
