# NotebookLM educational production prompt — one engineering discovery round

**Use:** Copy into NotebookLM after adding one round's source dossier (and optionally the canonical approved PRD and recorded decision log). Substitute bracketed parameters. Intended for study/video narration, not for making project decisions or authorizing implementation.

## Reusable prompt

Create a **Persian-language, technically rigorous, source-grounded educational lesson and video-ready narrative** for [PROJECT_NAME], [PHASE_NAME], Round [ROUND_NUMBER].

The authoritative source for the round is [ROUND_DOSSIER_FILENAME]. The canonical PRD [PRD_SOURCE] provides previously approved product boundaries; a decision is **approved only if its status in the dossier or approved decision record explicitly says so**. Recommendations, pending learner confirmation, and hypothetical examples must remain labeled as such.

### Structure and pacing

Follow the round's numbered questions **in order, one by one**. Do not merge questions, silently skip any question, or jump ahead to dependent decisions from a later round. For each Q:
1. Introduce the real user/business problem and why this decision matters.
2. State the question and Codex's recommended default faithfully.
3. Explain the decision options and product-level trade-offs, with a concrete MediaForge-style scenario that is clearly identified as an illustration if not in the source.
4. Identify what the learner actually approved, rejected, or **has not decided yet**. Do not turn a recommendation into an approval.
5. Explain externally observable impacts, invariants, edge cases and connection to the approved PRD, where source-supported.
6. Distinguish product policy from later architectural or technology choices; do not invent a framework, database, queue, worker model, or other implementation detail.
7. Give a short thought question or exercise to check understanding.
8. State which next-round questions this decision unlocks, only when identified by the sources; otherwise say this is not yet documented.

After all questions, give a concise round-level synthesis: decisions by status, key distinctions, open dependencies, lessons for working with the Matt Pocock grilling skill, and what must be confirmed with the product owner.

### Source fidelity and video quality

- Use clear Persian narration; retain precise English engineering terms (with plain Persian explanation).
- Use the numbered Q IDs as chapter markers, with a distinct transition between each question.
- Prioritize depth over a superficial list; use examples and counterexamples but mark invented scenarios as illustrative.
- State any source gaps and avoid fabricating decisions, dates, technical architecture, empirical results, metrics or tests.
- Distinguish **Codex proposed** vs **ChatGPT recommended** vs **Product owner approved** explicitly.
- Do not claim an ADR exists unless the source shows it; ADRs are not mandatory for routine product decisions.
- End with a concise viewer recap, remaining questions and a suggested title and chapter list for the video.

Desired output: [VIDEO_LECTURE_SCRIPT | STUDY_NOTES | AUDIO_OVERVIEW_BRIEF]. If the chosen NotebookLM format has its own duration/layout settings, adapt the chaptering to those settings without deleting or merging decisions. If one video cannot adequately cover every Q, propose a numbered mini-series and process each question individually.
