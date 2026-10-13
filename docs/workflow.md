# Learning and implementation workflow

## Handbook authoring, one domain at a time

1. Read `AGENTS.md`, machine state, handoff and domain index.
2. Confirm scope for ONE domain. Write exhaustive staged lessons, terminology, how/why/when, practical TypeScript or Node.js educational examples, common mistakes, exercises, checkpoints and trustworthy references (date/version where relevant).
3. Review lesson against `docs/quality-gates.md`; mark review status honestly.
4. Propose distinctly valuable project concepts aligned to coverage goals; avoid many overlapping CRUDs.
5. For approved concepts, write separate **product PRDs**, using `templates/project-prd.md`. Prioritize the problem, intended users, product goals, **in-scope / out-of-scope / deferred boundaries**, core journeys and observable outcomes. Record unresolved policies as explicit questions instead of forcing detailed decisions prematurely. Never prescribe technical solutions.
6. Reconcile `projects/coverage-matrix.md` with affected lessons, project catalogs/PRDs and canonical statuses; update the matrix and both trackers together, or record a dated evidence-backed no-change review. Obtain learner review before marking approved; do not close the domain content gate without this coverage review.

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

## Round-by-round learning and NotebookLM video workflow

For an external Codex/Matt project, preserve a **separate educational dossier per completed interview round** in the implementation repository (for example `docs/learning/product-discovery-round-01.md`). Include each original numbered question, Codex's recommended policy, ChatGPT's review/rationale if any, learner's explicit approval or the **pending** state, product trade-offs, domain concepts and downstream open decisions. The dossier is educational source material, not an alternative canonical PRD or a technical ADR. Never upgrade a suggestion to learner-approved before actual explicit approval; add a provenance link/commit when approval is evidenced.

To produce Persian, question-by-question educational narration and NotebookLM media, use the reusable [NotebookLM engineering round video template](../templates/notebooklm-engineering-round-video-prompt.md) after adding the dossier and relevant approved PRD as NotebookLM sources. Narration should separate proposed, recommended and approved choices, cover each numbered Q in order, avoid invented implementation details, and split into a video series if a single output cannot cover the round adequately. Generated media is an explanatory artifact, not engineering validation or approval.

**First pilot:** [MediaForge Round 1 educational dossier](https://github.com/h3nrzi/mediaforge/blob/main/docs/learning/product-discovery-round-01.md), with 13 recommended but **not yet owner-confirmed** product decisions. This educational recording introduces no new PRD scope and no implementation evidence.

## AI-to-AI handoff

Before finishing, persist current task, status, exact file paths, links, open questions, decisions approved by learner, evidence and next action in `tracking/state.json` and `TRACKER.md`. Unanswered Codex questions belong in external project notes and may be summarized/link-referenced here. No implied approvals. Handoff works from the repo alone, without conversation memory.

## Separate authoring from studying (2026-10-12)

The learner's current phase is **content authoring and portfolio-project planning**, not personal study. During authoring, finish domain lessons, project catalogs, implementation-neutral PRDs and trackers. The exercises and assessment rubric in Chapter 14 remain ready for future use but are **deferred**. Do not initiate, grade or require any learner quiz, practical defense or assessment evidence unless the learner explicitly starts the study phase. Domain chapter editorial approval does not certify competence. Keep project architecture/technical implementation decisions in separate Codex workflows.

## Approved per-domain authoring sequence (2026-10-12)

Apply this order to every domain: **(1) Curriculum planning and learner approval → (2) complete individual lessons with chapter-by-chapter review → (3) develop and review a distinct project candidate catalog → (4) author and review implementation-neutral product PRDs → (5) close the domain content-authoring gate and move to the next domain.** Preliminary project ideas may inform curriculum planning but the actual catalog and PRDs are finalized only after lesson authoring. Do not start learner assessments during authoring. Implementation projects and Codex decisions remain separate. This sequencing is learner-approved; it does not itself approve an individual curriculum blueprint.

## Mandatory coverage-matrix reconciliation

For every project/catalog/PRD creation, edit, approval, scope/status change, rename/move/removal, or new external implementation evidence, read `projects/coverage-matrix.md` and reconcile affected competencies, lesson links, PRD links, gaps and evidence against canonical state before declaring completion. Also reconcile mapped lesson changes and domain content closure. Update the matrix, `tracking/state.json` and `TRACKER.md` in the same change; if the mapping is unchanged, record a dated “reviewed; no mapping change” result with affected paths and evidence in both trackers. Missing review is a completion blocker. Keep taught/editorially approved, planned PRD challenge, assessed competency and externally verified implementation distinct. Never close a gap by silently expanding scope or prescribing a technical solution. Retain historical approvals; this rule does not retroactively revoke D01/D02 approvals.
