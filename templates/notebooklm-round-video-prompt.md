# NotebookLM — Persian educational video prompt (per discovery round)

Use this short prompt after adding the round's educational dossier and the canonical approved project PRD as NotebookLM sources.

**Replace:** `[PROJECT_NAME]`, `[PHASE]`, `[ROUND_NUMBER]`, `[QUESTION_COUNT]`, `[FIRST_QUESTION]`, `[LAST_QUESTION]`, `[KEY_CONCEPTS]`. If ChatGPT did not recommend accepting a decision, replace the recommendation clause with an accurate description of the actual review. Do not treat a proposed decision as approved without explicit evidence.

## Copyable prompt

```text
Create a comprehensive Persian educational video about **[PROJECT_NAME] — [PHASE], Round [ROUND_NUMBER]**.

Use the uploaded Round [ROUND_NUMBER] educational dossier and the canonical approved [PROJECT_NAME] PRD as your primary sources.

Explain all [QUESTION_COUNT] decisions sequentially, [FIRST_QUESTION] through [LAST_QUESTION]. For each question, explain the problem, Codex's proposal, why ChatGPT recommended accepting it (when the source confirms this), meaningful alternatives, trade-offs, and a concrete example.

Clearly distinguish proposals and recommendations from decisions explicitly approved by the product owner. Do not claim Round [ROUND_NUMBER] has been approved unless the provided sources confirm that.

Teach the underlying backend engineering and product design concepts, including [KEY_CONCEPTS].

Use clear Persian narration with English technical terminology where appropriate. Avoid speculative architecture and unapproved technical choices.

Give every question its own identifiable chapter. If one video cannot cover all [QUESTION_COUNT] questions in sufficient depth, propose a numbered series rather than compressing the material into a shallow summary.
```

## MediaForge Round 1 example values

- `[PROJECT_NAME]`: `MediaForge`
- `[PHASE]`: `Product Discovery`
- `[ROUND_NUMBER]`: `1`
- `[QUESTION_COUNT]`: `13`
- `[FIRST_QUESTION]`: `Q1`
- `[LAST_QUESTION]`: `Q13`
- `[KEY_CONCEPTS]`: `immutability, provenance, independent variant outcomes, access control, retention, cancellation semantics, uncertainty reconciliation, retry versus fresh processing, and rejection history`

For a more detailed teaching-production checklist, see [NotebookLM engineering round video prompt](notebooklm-engineering-round-video-prompt.md).
