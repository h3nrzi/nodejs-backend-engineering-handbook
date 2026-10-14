# Module-Driven Engineering — Ownership and evidence

| Stage | Owner/author | Approval gate | Location |
|---|---|---|---|
| Domain lessons and Project Charter | Handbook team / ChatGPT | Learner editorial approval | Handbook |
| Product Discovery log | Codex (PM role) | Learner approves product policies | Implementation repo |
| Final PRD | Codex | Learner accepts consolidated product contract | Implementation repo |
| Module Plan | Codex | Learner approves modular delivery scope/order | Implementation repo |
| Technical discovery per module | Codex (Tech Lead role) | Learner approves consequential engineering choices | Implementation repo |
| Spec, tickets, implementation | Codex | Verified module acceptance | Implementation repo |
| Learning analysis, archive, tracking | Handbook/ChatGPT | Evidence-based | Handbook |

**Consolidation is a gate.** Approved product decisions must appear in the Final PRD with traceability; unresolved questions must be explicit. Do not create a technical module plan in place of product requirements.

**Module boundary is a gate.** Each module brief identifies value, requirements, dependencies, shared contracts, definition of done, evidence and deliberately deferred neighboring concerns. A cross-cutting decision may be provisionally recorded once but never forces global technical grilling.

**Traceability:** Charter → Codex Product Discovery → approved Final PRD requirement IDs → Module Plan assignments → module Specs/Tickets → acceptance evidence.

**Historical records:** Archives and ADRs from an abandoned discovery effort can inform new analysis, but have no automatic adoption authority in a restarted project. New Codex sessions independently validate applicability and seek owner approval for adoption.