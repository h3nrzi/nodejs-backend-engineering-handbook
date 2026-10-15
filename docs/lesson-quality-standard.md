# Lesson quality standard — D04 onward

Status: Editorial standard for new or substantively revised lessons. Existing approved D01–D03 lesson content is grandfathered; apply this standard to it only after a separate content-review decision.

## Educational quality checklist

1. **Position in the curriculum:** state domain ID, chapter ID, prerequisite concepts and connections to adjacent chapters. Avoid unexplained forward dependencies.
2. **Learning outcomes:** state observable reasoning or troubleshooting abilities, not only topics to be covered.
3. **First principles:** define mechanisms and establish a precise mental model before advanced exceptions.
4. **Nuance:** distinguish language/runtime/OS behavior, documented guarantees, implementation observations and one-environment experimental results.
5. **Examples:** show normal and failure/counterexample paths; make assumptions and resource limits explicit.
6. **Backend relevance:** connect the lesson to realistic service problems without converting an educational technique into a required architecture for a portfolio project.
7. **Hands-on practice:** include tasks with expected observations or answer rubrics, and an independent learner reasoning component.
8. **Version discipline:** qualify Node/JavaScript/TypeScript versions, host platform, CJS/ESM and relevant experimental flags; avoid unqualified scheduling and performance guarantees.
9. **Evidence discipline:** editorial approval is not execution; authored sample code is not automatically verified; agent-generated code is not evidence of learner mastery.
10. **Coverage:** identify chapter-level competency and links to Charter challenges; explicitly mark indirect/supporting relevance.

## Review and approval workflow

- Draft one chapter in its owning Domain using `templates/lesson.md`.
- Review factual correctness, examples, prerequisites and internal links. If a runnable example is executed, retain command, runtime, observed results and limitations.
- Resolve substantive educational issues before requesting learner editorial approval. Record only the approved editorial status in canonical tracking.
- Keep learning practice/assessment status separate; assessment may remain deferred.
- Do not modify approved Project Charters or external project Final PRDs to force curriculum-coverage mechanisms.

## Domain gate

A domain's authoring gate can close when its approved blueprint, chapter inventory, Charter count and coverage mapping reconcile, with any substantive known content gaps logged. This does not imply portfolio implementations or learner assessments passed.

For status taxonomy and evidence requirements, see [learning evidence](learning-evidence.md), [quality gates](quality-gates.md) and [tracking protocol](tracking-protocol.md).
