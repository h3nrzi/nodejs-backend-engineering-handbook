# D04 — Educational project catalog

**Status:** in_review — six proposed concepts and six authored educational Charters; none learner-approved.
**Implementation / learner assessment:** not_started / not_assessed.

This portfolio offers different product problems, not six variants of a CRUD service. Selection here means selection for full Charter drafting only; it does not imply learner approval or a commitment to build all six. Final PRDs, Module Plans and solution selection belong in separately selected repositories after learner approval.

| ID / proposed Charter | Users and value | Major behavior / distinctive challenge | Proposed direct coverage | Overlap and boundary |
|---|---|---|---|---|
| D04-P01 [PathWitness](p01-pathwitness-endpoint-incident-evidence-charter.md) — in_review | Support engineers; scoped incident evidence | Compare observed phases and paths; preserve uncertainty | C01, C02, C06, C11, C18 | Runtime diagnostics support rather than replace D03 NodeScope. |
| D04-P02 [PartnerWire](p02-partnerwire-message-compatibility-workbench-charter.md) — in_review | Partner integration teams; explain malformed exchanges | Interpret bounded samples and revision directions; partial-input truth | C04, C08, C16 | Wire-level scope differs from D02 ContractGuard data validation. |
| D04-P03 [RelayParcel](p03-relayparcel-interrupted-retrieval-charter.md) — in_review | Field technicians; intact retrieval through interruptions | Complete or continue an identified artifact; reject mixed versions | C03, C09, C10, C17 | Recipient continuity differs from D03 IntakeLedger intake/handoff. |
| D04-P04 [OriginProof](p04-originproof-release-interoperability-charter.md) — in_review | Release reviewers; evidence for supported clients/paths | Compare declared negotiation/representation support with observations | C06, C07, C10, C11, C12, C13, C16 | Release matrix differs from P01 incident diagnosis and package compatibility. |
| D04-P05 [FieldPulse](p05-fieldpulse-freshness-and-gap-evidence-charter.md) — in_review | Maintenance coordinators; freshness and gap visibility | Distinguish arrivals, duplicates, late and not-observed readings | C05, C17 | No safety-critical controls or generic IoT platform. |
| D04-P06 [SessionTrail](p06-sessiontrail-interrupted-assistance-charter.md) — in_review | Support specialist and participant; interruption reconciliation | Track assistance steps/acknowledgments and honest resumption | C14, C15, C17 | No chat, voting or generic subscription management. |

## Review criteria and remaining choices

Review the distinct user value, initial in/out/deferred boundaries, proposed journeys, observable failure cases and learning evidence in each Charter. A learner can reject or revise a concept without affecting the lessons. No project is required to exercise every chapter; advanced transport internals can remain lesson-only or supporting knowledge.

Open across the portfolio: exact V1 supported clients/formats, product thresholds, permissions, retention and acknowledgment meaning. Those are explicit discovery questions, not missing technical designs to fill in here. No provider access, external endpoint qualification, implementation or project acceptance is claimed. See [coverage](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) and [domain index](../README.md).
