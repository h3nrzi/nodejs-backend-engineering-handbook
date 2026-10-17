# NotebookLM educational video — reusable prompt template

**Purpose:** A single reusable prompt for Gemini NotebookLM Video Overview, valid for either MediaForge-style PM Product Discovery rounds or Tech Lead Technical Discovery rounds in any handbook project. This **replaces** creating a bespoke NotebookLM prompt after every round.

## How to use

1. Complete the numbered Codex interview round and get explicit learner approval for decisions before marking them approved.
2. Ensure the handbook learning dossier for that round contains the **exact original Codex questions**, complete Codex recommendations, the learner's actual decisions, and separately labeled teaching commentary/trade-offs/examples.
3. Import that round's dossier and the matching immutable approved PRD into NotebookLM as sources. Where relevant, add the consolidated approved Product Policies and actual architecture ADRs from the implementation repository. Only use verified documents.
4. Replace the placeholders in the prompt below or adapt the wording within NotebookLM. **No new prompt needs to be authored or committed after each round.**
5. Video/NotebookLM explanations do not establish product approval, ADR existence, tested implementation, or technical facts beyond the sources.

## Reusable prompt — copy into NotebookLM

```text
Create a comprehensive, rigorous Persian educational Video Overview or numbered video series for:

Project: [PROJECT_NAME]
Discovery type: [PRODUCT DISCOVERY / TECHNICAL DISCOVERY]
Round: [ROUND_NUMBER]
Question range: [Q_OR_T_START]–[Q_OR_T_END]

Use the uploaded round-specific educational dossier and the approved product-scope PRD as primary and authoritative sources. Use uploaded approved Product Policies and verified ADRs only when they are relevant and present.

Teach ALL numbered questions in their exact original order. Do not omit any, compress multiple questions into vague summaries, or invent missing question wording.

For each question:
1. Preserve the actual Codex question and complete recommended answer from the supplied dossier.
2. Explain the problem and its connection to the product promise, constraints, invariants, acceptance criteria, or settled engineering decisions.
3. Explain Codex's recommendation and its rationale.
4. Compare credible alternatives and meaningful trade-offs.
5. Offer a concrete, realistic scenario, including edge cases/failure modes when relevant.
6. State what the recommendation guarantees and does NOT guarantee, and identify dependent decisions still open.
7. Distinguish clearly between (a) the Codex proposal, (b) separate ChatGPT educational analysis, and (c) the learner/Product Owner's actual recorded decision.

Approval and evidence discipline:
- Call a decision APPROVED only if the uploaded source explicitly records learner approval.
- Otherwise label it PROPOSED or PENDING. Never infer approval from a Codex recommendation alone.
- Distinguish broad architectural direction from selection of a concrete technology; candidate qualification is not production adoption.
- Do not claim ADRs, deployed systems, application code, passed tests, measured performance, or completed validation without verified source evidence.
- Do not invent architecture or silently modify the approved product contract.

For PRODUCT DISCOVERY, prioritize behavior visible to users: eligibility, roles/permissions, scope boundaries, outcomes, retry/cancellation, retention, provenance, readiness and acceptance, as applicable. Explain policy alternatives without prescribing premature architecture.

For TECHNICAL DISCOVERY, prioritize engineering reasoning: system/runtime boundaries, concurrency, state authority, resource isolation, failure and recovery, interfaces, security, observability, testing, cost, operability and ADR trade-offs as applicable. Explicitly connect technical proposals to approved product requirements.

Use natural spoken Persian, introduce accurate English technical terminology when useful, and explain terms in understandable Persian. Present each numbered question as its own clearly identifiable section/chapter. Prefer detailed learning over a shallow recap; if necessary, split into numbered episodes.

End with:
- An accurate recap of confirmed decisions.
- Still-open dependent questions and evidence gaps.
- The conceptual bridge to the next discovery round, WITHOUT guessing its future questions.

Do not give an implementation tutorial unless actual implementation artifacts are among the supplied sources.
```

## Source recommendation

- Required: `projects/implementation-studies/<project-id>/round-XX-product-discovery.md` OR `round-XX-technical-discovery.md`.
- Required: canonical approved project PRD or its verbatim educational copy.
- Optional: currently approved product policies, verified ADRs and directly relevant domain glossary.
- If NotebookLM cannot access a GitHub link directly, import the file content as a supported source instead.
