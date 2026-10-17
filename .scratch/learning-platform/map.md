# Chart the multi-course learning platform

Status: open
Labels: wayfinder:map

## Destination

Establish a phased product blueprint for a general-purpose, multi-course learning platform and a detailed, implementation-ready specification for its first release. The route is clear when no product, experience, or technical decision remains that blocks that release's implementation.

## Notes

- This is a planning effort. The platform spans subjects, audiences, and experience levels; the Node.js Backend Engineering Handbook is its first educational content source and initial use case.
- The owner and team initially publish and manage courses under one organization. Independent instructors are a future possibility to evaluate when relevant to the product phases.
- Next.js and the existing repository structure are established. The web application belongs in `client/`; `handbook/` remains authoritative for the Handbook course. Other courses' formats and authoring workflows remain open.
- Follow the resolved audience and learning-context decision indexed below. Remaining first-release scope decisions are open; do not assume JavaScript/TypeScript experience or a backend-engineering-only product.
- Launch timeline, budget, monetization, hosting, languages, and other operating constraints have no fixed commitments yet.
- Capability priorities established by resolved tickets constrain later release decisions. The detailed boundaries of courses, educational materials, learning paths, personalization, exercises, assessments, and learner progress remain to be specified by the relevant child tickets.
- Consult the wayfinder, grilling, and domain-modeling skills when working decisions. Use prototype for experience questions and research when a specific decision needs external facts. Verify library/API behavior using Context7 and relevant repository instructions when those questions arise.
- Use root `GLOSSARY.md` for settled language. Preserve the Handbook's distinction between editorial approval, project delivery, and learner competency; its existing tracking state is not learner progress.
- Planning assets belong beside this map: `blueprint.md` and `spec.md` when ready to author. Link supporting research and prototypes from the tickets that use them. The map indexes resolutions rather than duplicating their detail.
- Local tracker rules: child tickets live in `issues/`; `Type:` and `wayfinder:` labels identify their workflow. Open, unblocked, unclaimed tickets form the frontier in numeric filename order. Save `Status: claimed` before work; record an answer and set `Status: resolved` on resolution. Blocking uses the local `Blocked by:` convention. Resolve at most one non-research ticket per session.
- Scoped external research will be added when a decision exposes a concrete factual dependency; none was assumed necessary before the initial owner-led discovery.

## Decisions so far

- [Choose the first learner segment and learning outcome](issues/01-first-learner-and-outcome.md#answer): Serve self-paced learners across subjects through structured courses and visible progress; course outcomes stay course-specific, and real-learner validation remains open.

## Not yet specified

- Which audience assumptions will need validation beyond the owner's discovery conversation, and what evidence or access will make that validation possible.
- Capability-specific rules and feasibility questions exposed by selected practice, assessment, personalization, or progress experiences; their shape depends on the learner journey and release boundary.
- Material-specific ingestion, conversion, and compatibility problems that become visible after supported material needs and publishing workflows are selected.
- External-provider qualification, content migration detail, and jurisdiction-specific obligations that may emerge from the release's actual data, access, and operating decisions.
- The depth of subsequent product phases and the circumstances under which independent instructors become relevant; revisit after the first learner proposition and release boundary are clear.

## Out of scope

- Production implementation, production deployment, actual launch, and ongoing operation: this map ends with a blueprint and an implementation-ready first-release specification.
- Authoring or completing the Handbook curriculum and creating the future course portfolio: existing material informs discovery, while educational production is separate work.
- Detailed implementation specifications for later phases: the destination includes their direction and prerequisites, with detailed specification limited to the first release.
