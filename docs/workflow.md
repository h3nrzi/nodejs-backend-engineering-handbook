# Learning and implementation workflow

## Handbook authoring, one domain at a time

1. Read `AGENTS.md`, machine state, handoff and domain index.
2. Confirm scope for ONE domain. Write exhaustive staged lessons, terminology, how/why/when, practical TypeScript or Node.js educational examples, common mistakes, exercises, checkpoints and trustworthy references (date/version where relevant).
3. Review lesson against `docs/quality-gates.md`; mark review status honestly.
4. Propose distinctly valuable project concepts aligned to coverage goals; avoid many overlapping CRUDs.
5. For approved concepts, write separate **product PRDs**, using `templates/project-prd.md`. Prioritize the problem, intended users, product goals, **in-scope / out-of-scope / deferred boundaries**, core journeys and observable outcomes. Record unresolved policies as explicit questions instead of forcing detailed decisions prematurely. Never prescribe technical solutions.
6. Reconcile `projects/coverage-matrix.md` with affected lessons, project catalogs/PRDs and canonical statuses; update the matrix and both trackers together, or record a dated evidence-backed no-change review. Obtain learner review before marking approved; do not close the domain content gate without this coverage review.

**Approved MediaForge-derived refinement:** [Two-role Product Manager → Tech Lead discovery workflow](two-role-discovery-workflow.md). Product behavior is settled with a PM-style `grill-with-docs` interview and explicit final owner sign-off; architectural choices are settled with a separate Tech Lead-style interview and qualifying ADRs before `to-spec` when warranted. This is the reusable distinction between a product contract and engineering design.

## Local implementation journey (outside handbook)

1. Learner studies domain and chooses project PRD.
2. ChatGPT asks learner to create an independent local repository and transfer PRD.
3. ChatGPT prepares starter prompt directing Codex to inspect installed Matt Pocock skills. Use `$wayfinder` or `$grill-with-docs` only if those are actual skill invocation names in that installation; let the agent guide questions and documentation. **Begin with product discovery:** review the approved PRD's scope boundaries and ask only the unresolved product questions that matter for the first intended version. Do not assume skills can approve product choices themselves.
4. Learner relays Codex questions/output to ChatGPT. ChatGPT explains product and technical trade-offs, maps suggestions to the approved PRD boundaries and learning goals, proposes defaults, and identifies changes to in/out scope. **Learner explicitly approves consequential product choices and any scope expansion.** Capture the decisions in the implementation repository's product/spec documentation before dependent implementation work.
5. Once build-blocking product behaviors for the selected version are decided, Codex continues skill-guided technical discovery, architecture, specs, ADRs and tickets in the separate local project repository. Learner approves consequential technical decisions. Then implement and review. Do not turn an open product question into a silent technical assumption.
6. Handbook records linked implementation repo, status, learning coverage and verified evidence; it must not duplicate technical specifications.

## Product-scope approval versus implementation-time discovery (learner agreement, 2026-10-12)

- **Handbook PRD completion gate:** confirm the real problem, primary users, value, what will be built, what will not be built, and the central observable product behaviors/invariants. Approval is editorial/product-direction approval, **not** a claim that every limit, exceptional-case policy or implementation-dependent detail is finalized.
- **Defer nonessential decisions:** numeric limits, retention windows, permission minutiae, retry/pause semantics and other unresolved product policies may remain openly listed in an approved PRD when they do not obscure the agreed product boundary. Do not demand a comprehensive implementation-ready specification during handbook authoring.
- **At project kickoff:** use the actual installed Matt Pocock skill workflow with Codex to interrogate the outstanding product questions for the chosen first version. ChatGPT can recommend options and explain trade-offs; **the learner is the decision maker**. Distinguish necessary first-version rules from safely deferred later-version scope.
- **Scope is authoritative:** a technical proposal that adds functionality, changes intended users, changes accepted product behavior or contradicts an explicit non-goal requires the learner's product approval before adoption. Keep the original PRD's boundary and record approved amendments in the appropriate project documents.
- **Sequence:** agree on the necessary product behaviors before committing to dependent technical solutions, then let Codex handle architecture and implementation in its separate repository. The handbook may link to evidence but does not copy technical ADRs.
- **No hidden readiness gate:** open questions alone do not prevent marking a handbook PRD editorially approved; however, an unresolved question that fundamentally changes **what product is being built** must be resolved before approving the product boundary.

## Reusable Matt Pocock product-discovery prompt

After an implementation repository has been created, the relevant Matt Pocock skills installed/configured, and a traceable approved PRD baseline imported as `docs/product/prd.md`, use [Codex grill-with-docs V1 Product Discovery template](../templates/codex-grill-with-docs-product-discovery.md). Replace all project-specific placeholders and verify actual installed skill invocations.

The installed `grilling` skill's **round-based full-frontier** interviewing asks all currently independent ready product decisions in a round, each numbered with a recommended default; dependent questions wait for later rounds. `domain-modeling` captures clarified terminology and qualifying decisions. The learner reviews and approves each round's consequential choices; ChatGPT may examine full rounds against the canonical approved PRD. Keep the imported PRD unchanged and preserve new V1 decisions separately in the project repo. No architecture, tickets, or implementation before the explicit product-discovery approval gate.

This template reflects the inspected MediaForge skills source on 2026-10-13 and does not by itself establish verified product choices, skill execution, or implementation evidence.

## Reusable Technical Discovery prompt (Tech Lead)

After the learner explicitly confirms final Product Discovery shared understanding, use [Codex grill-with-docs Technical Discovery template](../templates/codex-grill-with-docs-technical-discovery.md) to launch a **new technical interview** against the unchanged PRD and approved product policies. Engineering rounds cover architectural alternatives and qualified ADRs, not revised PM rules. Wait for explicit technical shared-understanding approval before `to-spec` and implementation. MediaForge-specific filled prompt is supplied separately in conversation, not committed as a duplicate static template.

## Per-project educational archive and reusable NotebookLM prompt

Each selected external implementation project has a dedicated learning archive in this handbook under `projects/implementation-studies/<domain-project-slug>/`. Copy the **unchanged approved PRD** there as an educational source, with a pointer to the canonical domain PRD, and write one thorough source-grounded learning document per completed Codex interview round. The project's independent implementation repo remains authoritative for live V1 decisions, technical design, ADRs and code; the handbook archive collects explanations, rationales and links to verified decision/ADR evidence without duplicating implementation artifacts.

For every round, capture numbered original questions, Codex proposals, ChatGPT review (if any), product-owner decisions **only when explicitly confirmed**, alternatives, product/engineering trade-offs, concrete examples, learning exercises, and unresolved dependent decisions. Label pending proposals as pending. For architectural phases, teach actual trade-offs and link to genuine ADRs, never manufacture or pre-approve them. Update the dossier after user approval and evidence as needed.

**NotebookLM process:** Use the reusable [NotebookLM round video prompt template](../templates/notebooklm-round-video-prompt.md) with the specific round dossier and approved PRD (optional verified policy/ADR sources). Replace its project/round placeholders. **Do not generate a new bespoke NotebookLM prompt after each round.** NotebookLM-generated explanations are not approvals or implementation evidence.

**Current pilot:** [D03-P02 MediaForge educational archive](../projects/implementation-studies/d03-p02-mediaforge/README.md), with [approved PRD copy](../projects/implementation-studies/d03-p02-mediaforge/prd.md) and [Round 01 educational content](../projects/implementation-studies/d03-p02-mediaforge/round-01-product-discovery.md) (Q1–Q13 recommendations pending learner confirmation).

## AI-to-AI handoff

Before finishing, persist current task, status, exact file paths, links, open questions, decisions approved by learner, evidence and next action in `tracking/state.json` and `TRACKER.md`. Unanswered Codex questions belong in external project notes and may be summarized/link-referenced here. No implied approvals. Handoff works from the repo alone, without conversation memory.

## Separate authoring from studying (2026-10-12)

The learner's current phase is **content authoring and portfolio-project planning**, not personal study. During authoring, finish domain lessons, project catalogs, implementation-neutral PRDs and trackers. The exercises and assessment rubric in Chapter 14 remain ready for future use but are **deferred**. Do not initiate, grade or require any learner quiz, practical defense or assessment evidence unless the learner explicitly starts the study phase. Domain chapter editorial approval does not certify competence. Keep project architecture/technical implementation decisions in separate Codex workflows.

## Approved per-domain authoring sequence (2026-10-12)

Apply this order to every domain: **(1) Curriculum planning and learner approval → (2) complete individual lessons with chapter-by-chapter review → (3) develop and review a distinct project candidate catalog → (4) author and review implementation-neutral product PRDs → (5) close the domain content-authoring gate and move to the next domain.** Preliminary project ideas may inform curriculum planning but the actual catalog and PRDs are finalized only after lesson authoring. Do not start learner assessments during authoring. Implementation projects and Codex decisions remain separate. This sequencing is learner-approved; it does not itself approve an individual curriculum blueprint.

## Mandatory coverage-matrix reconciliation

For every project/catalog/PRD creation, edit, approval, scope/status change, rename/move/removal, or new external implementation evidence, read `projects/coverage-matrix.md` and reconcile affected competencies, lesson links, PRD links, gaps and evidence against canonical state before declaring completion. Also reconcile mapped lesson changes and domain content closure. Update the matrix, `tracking/state.json` and `TRACKER.md` in the same change; if the mapping is unchanged, record a dated “reviewed; no mapping change” result with affected paths and evidence in both trackers. Missing review is a completion blocker. Keep taught/editorially approved, planned PRD challenge, assessed competency and externally verified implementation distinct. Never close a gap by silently expanding scope or prescribing a technical solution. Retain historical approvals; this rule does not retroactively revoke D01/D02 approvals.
