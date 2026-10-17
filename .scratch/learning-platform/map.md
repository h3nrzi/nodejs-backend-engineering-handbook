# Chart the multi-course learning platform

Status: open
Labels: wayfinder:map

## Destination

Establish a phased product blueprint for a general-purpose, multi-course learning platform and a detailed, implementation-ready specification for its first release. The route is clear when no product, experience, or technical decision remains that blocks that release's implementation.

## Notes

- This is a planning effort. The platform spans subjects, audiences, and experience levels; the Node.js Backend Engineering Handbook is its first educational content source and initial use case.
- The owner and team initially publish and manage courses under one organization. Independent instructors are a future possibility to evaluate when relevant to the product phases.
- Next.js and the existing repository structure are established. The web application belongs in `client/`; `handbook/` remains authoritative for the Handbook course. Follow the resolved authoring and publishing workflow indexed below; first-release format and tooling selections remain open.
- Follow the resolved audience and learning-context decision indexed below. Remaining first-release scope decisions are open; do not assume JavaScript/TypeScript experience or a backend-engineering-only product.
- Follow the resolved business and operating constraints indexed below when planning the release. Open operating-arrangement and budget decisions permit continued product planning but block final hosting, deployment, and jurisdiction-dependent technical choices; no launch date is committed.
- Capability priorities and product boundaries established by resolved tickets constrain later release decisions. Select first-release capabilities and specify their delivery contracts through the remaining child tickets; conceptual support does not commit the release to every capability.
- Consult the wayfinder, grilling, and domain-modeling skills when working decisions. Use prototype for experience questions and research when a specific decision needs external facts. Verify library/API behavior using Context7 and relevant repository instructions when those questions arise.
- Use root `GLOSSARY.md` for settled language. Preserve the Handbook's distinction between editorial approval, project delivery, and learner competency; its existing tracking state is not learner progress.
- Planning assets belong beside this map: `blueprint.md` and `spec.md` when ready to author. Link supporting research and prototypes from the tickets that use them. The map indexes resolutions rather than duplicating their detail.
- Local tracker rules: child tickets live in `issues/`; `Type:` and `wayfinder:` labels identify their workflow. Open, unblocked, unclaimed tickets form the frontier in numeric filename order. Save `Status: claimed` before work; record an answer and set `Status: resolved` on resolution. Blocking uses the local `Blocked by:` convention. Resolve at most one non-research ticket per session.
- Scoped external research will be added when a decision exposes a concrete factual dependency; none was assumed necessary before the initial owner-led discovery.

## Decisions so far

- [Choose the first learner segment and learning outcome](issues/01-first-learner-and-outcome.md#answer): Serve self-paced learners across subjects through structured courses and visible progress; course outcomes stay course-specific, and real-learner validation remains open.
- [Define courses, educational materials, and learning paths](issues/02-course-and-learning-path-model.md#answer): Independent courses contain course-specific lessons using reusable materials; paths connect courses, ordering is advisory by default, and completion remains distinct from competency.
- [Choose the course authoring and publishing workflow](issues/03-authoring-and-publishing.md#answer): Support varied authoring sources with explicit, version-specific review and publication; independently adopt shared revisions, preserve history, and enforce retirement and access rules during recovery.
- [Choose the learner journey and evidence of learning](issues/04-learner-experience-and-evidence.md#answer): Prioritize self-paced continuity and explicit requirement fulfillment; share qualifying course progress across paths while distinguishing current fulfillment, historical completion, obstacles, and assessed competency.
- [Choose the business and operating constraints for launch](issues/05-business-and-operating-constraints.md#answer): Plan a free, invited adult pilot for learners in Iran with a Persian RTL interface, accessibility and privacy requirements, and owner-led support; operating arrangement and spending approval remain follow-up decisions.

## Not yet specified

- Further audience-validation needs and recruitment beyond the initial community pilot, once its findings expose gaps in the broad learning proposition.
- Activity-specific designs, assessment rubrics, and further feasibility dependencies that cannot yet be specified without selected release capabilities and actual course activities; revisit advanced adaptive personalization only when its educational value and evidence justify it.
- Material-specific ingestion, conversion, and compatibility problems that become visible after first-release material formats and authoring sources are selected.
- Content migration detail and additional external-service or jurisdiction questions exposed by selected material formats and capabilities beyond the operating-arrangement and cost qualification already assigned to live tickets.
- The depth of subsequent product phases and the circumstances under which independent instructors become relevant; revisit after the first learner proposition and release boundary are clear.

## Out of scope

- Production implementation, production deployment, actual launch, and ongoing operation: this map ends with a blueprint and an implementation-ready first-release specification.
- Authoring or completing the Handbook curriculum and creating the future course portfolio: existing material informs discovery, while educational production is separate work.
- Detailed implementation specifications for later phases: the destination includes their direction and prerequisites, with detailed specification limited to the first release.
