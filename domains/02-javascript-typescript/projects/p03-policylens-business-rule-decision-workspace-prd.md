# P03 — PolicyLens PRD

**Status:** draft_pending_learner_review

## Product overview
Policy authors define versioned, restricted (non-executable) business rules; analysts evaluate cases and see an allowed/denied/needs_review decision with matched-rule explanation. Reviewers publish immutable versions; auditors inspect historical decisions and compare version changes.

## Scope
Draft/published policies, condition vocabulary, explicit rule precedence and no-match defaults, case input validation, explanation trace, saved examples, version comparison, immutable publication, access rules and exports. Exclude arbitrary scripting, enforcement infrastructure, AI decisions, regulatory certification and workflow simulation.

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

## Open product decisions
Initial policy domain, rule vocabulary, precedence and default outcome, approval roles, input/report limits, retention, privacy, activation/rollback and compatibility classification. No architecture, stack or implementation choices.

## D02 coverage and approval
Exercises discriminated unions, exhaustive handling, rule composition, object contracts, and runtime validation. Concept approved; this PRD requires learner review. Learning assessment and implementation deferred.
