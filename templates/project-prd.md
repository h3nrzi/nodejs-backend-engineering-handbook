# PRD — Project name

**Status:** draft | in_review | approved  
**Domain:** DXX  
**Product owner approval:** pending

## 1. Problem and motivation
## 2. Audience and actors
## 3. Goals and measurable outcomes
## 4. Product boundary: in / out / deferred
Treat this as a primary approval gate: concretely state what product and first-version capabilities will be built, and what will deliberately not be built.
## 5. Product capabilities and user journeys
## 6. Functional requirements
## 7. Engineering problems and externally observable invariants
Describe what must remain true (e.g., concurrent reservations cannot exceed available capacity); do NOT specify locks, database, algorithm or implementation pattern.
## 8. Nonfunctional constraints and quality expectations
Describe externally observable measurable expectations, not a technical implementation solution.
## 9. Edge cases, failure behavior and recovery expectations
## 10. Acceptance criteria and scenarios
## 11. Assumptions, unknowns and product-level open questions
List detailed policies, limits and edge-case choices that can wait for Matt-skill-guided product discovery at project kickoff. Flag any unanswered question that materially changes in/out scope: that question cannot be deferred past product-boundary approval.
## 12. Explicit non-goals
## 13. Domain learning outcomes and why this project is valuable
## 14. Approval record
Record product-boundary/editorial approval separately from unresolved decisions and any later implementation readiness. Approval of this PRD does not mean numeric limits and incidental behaviors were all decided.

**Forbidden in PRD:** chosen architecture, libraries, frameworks, database, broker, cache implementation, deployment topology, patterns, algorithms, directory structure and step-by-step technical implementation. These emerge in the separate local repo during Codex skill-guided discovery.

**Later project kickoff:** review this approved scope with Codex using the actually installed Matt Pocock skills; resolve first-version product questions with explicit learner approval before dependent architecture work. Do not silently enlarge the product or force every peripheral decision during handbook authoring.
