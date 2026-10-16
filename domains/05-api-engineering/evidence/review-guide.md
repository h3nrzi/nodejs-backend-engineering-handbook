# D05 curriculum discovery — Historical review evidence and evaluation guide

**Historical snapshot:** the pending states and reproduction checks below describe the discovery commit. On 2026-10-16 the Product Owner subsequently approved CD01–CD07 and authorized C01. See [the approval record](curriculum-approval.md) and [current C01 guide](c01/review-guide.md). The original preflight and unreported human observations are preserved; this historical guide is not the current stop condition.

**Source:** Product Owner's D05 Curriculum Discovery request and continuation in this chat, 2026-10-16.
**Artifact status:** in_review. **Product Owner approval:** pending_learner_review.
**Human evaluation:** not_run. **Lessons / educational experiments / implementations:** not_started / not_run / not_started.

## Purpose and reviewed revision

Evaluate a senior-level, book/course-ready curriculum proposal before any full lesson is authored. This guide adapts the global `ticket-walkthrough` skill to a document deliverable: the supported user boundary is reading/navigating the proposal and inspecting canonical evidence, not launching an API or a fake application. Guide readiness does not establish editorial approval or human acceptance.

Clean initial baseline: `1ffd64b5d4e167a8fd621185dd0fe89c89b1a5b3` on `main`, repository `h3nrzi/nodejs-backend-engineering-handbook`. `git status --porcelain=v1` produced no entries before edits. Baseline link check: 1,561 internal links, zero issues. Review covers the proposal and tracking changes in the commit containing this guide; `git log -1 --format='%H %s'` identifies that revision after publication. Subsequent changes require rechecking affected scenarios while preserving earlier observations.

## Repository authority reviewed

Read AGENTS, workflow, lesson-quality standard, quality gates, visual authoring/tooling, canonical state, TRACKER, coverage matrix, all four approved curricula and domain indexes, D05 scaffold/catalog, domain/lesson/catalog/Charter templates, tracking protocol and the earlier curriculum-coverage audit. Representative full lessons: D03-C09 pipelines/transforms/cancellation; D04-C10 caching/validation/ranges; D04-C17 deadlines/retries/uncertainty. D04-P04 OriginProof supplied a representative approved Charter boundary. This is not a factual re-audit of all 66 lessons.

The prior coverage audit identifies the granularity risk: chapter-level mapping cannot prove advanced subtopic teaching depth. D05 answers it with a per-mechanism ledger, normal/adverse traces, independent transfer rubrics and chapter-specific completion criteria. No previously approved lesson is rewritten.

## Historical scaffolding findings

| Finding at baseline | Disposition in this proposal |
|---|---|
| D05 README and catalog direct Handbook authors to `templates/project-prd.md`, which does not exist | Replaced with Workflow V2 educational Charter guidance; catalog remains not_started |
| Shared catalog template requests a proposed PRD path | Corrected to educational Project Charter path and linked canonical boundary |
| Canonical `domain_authoring_sequence` includes `product_prds`; `product_scope_policy.handbook_prd_approval` suggests Handbook PRD authorship | Corrected active sequence/key to Charter terminology; preserved historical events and migrated count fields |
| D06–D16 each retain the same README/catalog template references: 22 files | Identified deferred scaffold debt; no future-domain authoring or bulk rewrite performed |
| D01/D02 approved curricula/indexes retain pre-V2 PRD terms, with migration notices and historical context | Not reopened; Workflow V2 governs interpretation, not legacy wording |
| External-planning templates legitimately mention Final PRDs | Retained: separate-repository authority is correct |

The internal Markdown link checker does not detect nonexistent paths written only in backticks. The clean baseline link report therefore does not negate the scaffold finding. Use the targeted terminology search below to reproduce it.

## Start here

Actor: Product Owner reviewing educational scope. No credentials, services, runtime installation or disposable data are needed to read the documents.

1. Open [the curriculum sequence](../curriculum.md#proposed-sequence-and-dependency-map).
2. Read the rationale for 25 chapters, then [the shared depth gate](../depth-specification.md#shared-depth-and-completion-gate) and [the compact matrix](../depth-specification.md#chapter-by-chapter-depth-matrix).
3. Follow scenarios R01–R07 below. Record observations by ID; none require editing production or project data.

Expected readiness: 25 proposed IDs C01–C25, fifteen dimensions per profile, explicit `in_review` status, and no lesson files. The terminal working directory for optional checks is `/Users/hossein/Projects/nodejs-backend-engineering-handbook`.

## Criterion-to-scenario coverage

| Request / review criterion | Scenarios | Scope and limitation |
|---|---|---|
| Repository authority, clean baseline and Workflow V2 scaffold findings | R01, R06 | Actual baseline/source review retained; earlier approved content not re-audited |
| Professional breadth, coherent chapter count and sequence | R01, R04 | 25 proposed chapters; pending owner judgment |
| All fifteen chapter dimensions and explicit depth/completion | R02–R03 | Each full profile plus mechanism-level shared gate |
| Failure scenarios, experiments, visuals and assessment rubrics | R02–R03 | Plans only; no code, figures, experiments or learner tests executed |
| Dependency map and domain boundaries, D04 reuse | R04 | Backward prerequisite edges; no architecture selection |
| Coverage/gaps, sources and open curriculum decisions | R05, R07 | Primary-source planning check; library tool qualification deferred |
| Tracking, earlier approvals and project boundaries | R06 | D05 proposed-only; existing approval/evidence preservation checked |
| Commit/push, approval pending and stop before lessons | R06–R07 | Git records identify publication; publication is not approval |

## Scenarios

### R01 — Scope, chapter partition and reader progression

Prerequisites: none. Read [purpose, sequence and chapter-count rationale](../curriculum.md). Verify that the scope spans foundations, state/admission, contract evolution, interaction styles and verification/operation. In particular compare C08/C09/C10 and C16/C17/C18 and decide whether their distinct invariants justify separate chapters.

Expected: a defensible count based on teaching needs, no inherited 18-chapter quota, book and course use explained. No-effect check: zero full lessons, project concepts, Charters, architecture decisions or Final PRDs are introduced. Retain any missing topic or proposed merge/split as a curriculum observation. State after: no files/data changed; R02–R07 independent.

### R02 — Mechanism depth for foundations and correctness

Prerequisites: R01 gives sequence context. Open [depth profiles](../depth-specification.md). Review C01–C12 using the compact matrix, then inspect each full profile's fifteen dimensions. Probe C07's mixed-direction cursor predicate, C09's atomic enforcement point and C10's crash/expiry windows especially closely.

Expected: the future lesson must explain mechanisms and normal/adverse traces, then assess independent reasoning; naming a topic cannot pass the shared gate. No-effect check: planned experiments remain not_run; no claim that a model proves database durability, production behavior or learner mastery. Retain any missing mechanism, wrong boundary or weak rubric by chapter ID.

### R03 — Mechanism depth for lifecycle, alternatives and synthesis

Prerequisites: review R02's shared gate. Review C13–C25 in the [same profiles](../depth-specification.md). Check that C13 handles dialect/description versus enforcement; C14 directional compatibility; C16–C18 distinct operation/item/event/delivery identities; C19 null propagation/resolver cost; C20 presence/final RPC status; C21 snapshot gaps; C22–C25 policy composition, oracles and evidence-qualified diagnosis.

Expected: these chapters receive difficult mechanism and failure obligations rather than a list of tools. No-effect check: GraphQL/gRPC experiments are explicitly future real-engine/generated-client checks, not claimed integrations; no project is required to implement every interface. Retain chapter-specific corrections and whether a profile is too broad to teach coherently.

### R04 — Dependencies and domain ownership

Prerequisites: R01. Read [entry requirements and dependency table](../curriculum.md#reading-prerequisites) and [ownership map](../curriculum.md#ownership-and-adjacent-domain-map). Trace C09 → C08 → D04-C10 and C20 → D04-C16. Distinguish an actual prerequisite from a later transfer pointer.

Expected: required D05 edges point backward; D04 supplies transport/HTTP foundations; future security/storage/distributed/operations domains retain deeper ownership without excusing missing API correctness explanations. No-effect check: no whole-product architecture, framework or storage technology is selected. Retain hidden forward dependencies, duplicated prerequisite content or unresolved ownership.

### R05 — Coverage, sources and honest gaps

Prerequisites: none. Read [coverage/gaps](../curriculum.md#educational-coverage-and-gap-analysis) and [source register](../references.md). Inspect S06, S13, S15 and S16: published QUERY, archived Idempotency-Key draft, active RateLimit draft and pinned OpenAPI line. Inspect provider/community conventions versus normative references.

Expected: each scoped area has a primary chapter, adverse trace and depth gate; exclusions and unrun integrations are explicit; documentation lookup failures are disclosed. No-effect check: a source link, planned experiment or generated schema is not treated as tested behavior or certification. Retain additional required reference work or audience-specific specialization needs.

### R06 — Canonical tracking and preserved evidence

Prerequisites: none. Open [state](../../../tracking/state.json), [TRACKER](../../../TRACKER.md), [D05 coverage](../../../projects/coverage-matrix.md#d05--proposed-curriculum-coverage), [domain index](../README.md) and [catalog](../projects/catalog.md).

Expected: D05 active/in_review; curriculum/depth approval pending; 25 lesson statuses not_started; seven open decisions; no D05 taught mappings or Charters. Existing 66 approved lessons, 20 approved Charters, D01–D04 domain records and MediaForge evidence remain intact. No-effect check: neither commit/push nor this guide marks approval, human acceptance, implementation or mastery complete. Retain any inconsistent count/status/path. Optional read-only checks appear below.

### R07 — Owner decisions and stop boundary

Prerequisites: R01–R06 provide review evidence. Read [the seven open curriculum decisions](../curriculum.md#open-curriculum-decisions). Report approval or requested changes by artifact, chapter and decision ID/order; distinguish acceptance of breadth from acceptance of the depth specification if needed.

Expected: explicit owner decisions determine editorial status. Until then all artifacts remain in_review, user observations not_run and lesson authoring unauthorized. No-effect check: submitting a review observation alone does not automatically authorize Chapter 01, a project or technical implementation. Retain the owner's exact approval/change instruction when received.

## Agent preflight and reproducible checks

The companion [preflight record](preflight.json) stores actual command results and structural/preservation observations for this proposal, not API execution evidence. The final publication revision is identified by Git history, avoiding a self-referential commit hash in this file.

Read-only commands from repository root:

```sh
git log -1 --format='%H %s'
python3 -m json.tool tracking/state.json > /dev/null
python3 scripts/check-handbook-links.py
git diff --check
git diff 1ffd64b5d4e167a8fd621185dd0fe89c89b1a5b3 -- domains/01-computer-science-foundations domains/02-javascript-typescript domains/03-nodejs-internals domains/04-network-protocol-engineering projects/implementations
rg -n 'project-prd\.md|proposed PRD path|product_prds|handbook_prd_approval' domains/05-api-engineering templates/project-catalog.md tracking/state.json
git status --short
git ls-remote origin refs/heads/main
```

Expected: JSON parses, link check reports zero current/new issues, no whitespace errors, protected-domain/implementation diff empty, no active legacy PRD scaffold matches. The terminology search may match the explicitly historical findings in this guide; inspect context. After publication the working tree should be clean and remote `main` should match the publication commit. These commands establish structural/publication facts, not technical depth or owner approval.

To reproduce the profile/dependency and canonical preservation assertions:

```sh
python3 - <<'PY'
import json, re, subprocess
from pathlib import Path
baseline = '1ffd64b5d4e167a8fd621185dd0fe89c89b1a5b3'
root = Path('domains/05-api-engineering')
depth = (root / 'depth-specification.md').read_text()
profiles = re.findall(r'^### D05-C(\d{2}) — ([^\n]+)\n(.*?)(?=^### D05-C|^## |\Z)', depth, re.M | re.S)
labels = ['Prerequisites', 'Observable outcomes', 'Foundations', 'Technical subtopics',
          'Advanced mechanisms and edge cases', 'Misconceptions', 'Trade-offs',
          'Backend failure scenario', 'Educational experiment', 'Candidate visual',
          'Exercises and rubric', 'References', 'Boundaries', 'Depth/completion']
assert [n for n, _, _ in profiles] == [f'{i:02}' for i in range(1, 26)]
assert all(all('**' + label + ':**' in body for label in labels) for _, _, body in profiles)
rows = [line for line in (root / 'curriculum.md').read_text().splitlines()
        if re.match(r'\|[^|]*\| D05-C\d\d \|', line)]
assert len(rows) == 25
edges = 0
for row in rows:
    cells = [value.strip() for value in row.split('|')]
    number = int(cells[2][-2:])
    assert cells[3] == profiles[number - 1][1]
    for first, last in re.findall(r'C(\d{2})(?:[–-]C?(\d{2}))?', cells[4]):
        for dependency in range(int(first), int(last or first) + 1):
            assert dependency < number
            edges += 1
state = json.loads(Path('tracking/state.json').read_text())
old = json.loads(subprocess.check_output(['git', 'show', baseline + ':tracking/state.json'], text=True))
assert state['domains'][:4] == old['domains'][:4]
assert state['current_implementation_project'] == old['current_implementation_project']
assert set(state['domains'][4]['chapter_progress'].values()) == {'not_started'}
assert len(state['domains'][4]['chapter_progress']) == 25
assert state['review'] == 'pending_learner_review'
assert not state['domains'][4]['lesson_authoring_authorized']
print(f'{len(profiles)} profiles; 15 dimensions each; {edges} backward edges; prior domain/project states preserved')
PY
```

Expected: `25 profiles; 15 dimensions each; 168 backward edges; prior domain/project states preserved`. This structural check cannot grade the future lesson's causal explanations; apply R02/R03 and the shared depth rubric separately.

## Results

| Scenario | Agent preflight | User result | Evidence / limitation |
|---|---|---|---|
| R01 | Scope/sequence reviewed | not_run | 25 chapters; zero lesson/project authoring; owner breadth judgment pending |
| R02 | Profiles/matrix structurally checked and editorially reviewed | not_run | C01–C12 obligations are plans, not completed teaching |
| R03 | Profiles/matrix structurally checked and editorially reviewed | not_run | C13–C25; all future experiments unrun |
| R04 | Prerequisite ordering and boundary map checked | not_run | No API/runtime/production integration executed |
| R05 | Primary-source availability/status checked | not_run | Context7 unavailable/CLI failed; full future source audit deferred |
| R06 | Canonical counts/status and protected evidence checked | not_run | Actual structural results in preflight record |
| R07 | Decision and stop states checked | not_run | Seven pending decisions; owner approval absent |

## Checkpoint and resume

**Current scenario:** R01; human review has not started.
**Artifacts:** curriculum.md, depth-specification.md, references.md, this guide and preflight.json under D05; no running process or external test state.
**Known limits:** no lesson prose/code, diagrams, API experiments, generated clients, provider integration or learner assessment executed; primary-source planning checks are not comprehensive conformance review. D06–D16 stale scaffold references remain logged debt.
**Next concrete action:** open [the 25-chapter sequence](../curriculum.md#proposed-sequence-and-dependency-map) and assess R01's chapter partitions. Expected visible result: five parts with proposed IDs C01–C25 and explicit backward prerequisites. Then report observations or continue the complete self-service guide.

Stop reading at any point; no cleanup is needed. Resume at the last scenario with your recorded observations and the proposal commit. Do not alter canonical statuses merely to record a tentative observation. The agent stops after committing/pushing this proposal and awaits explicit Product Owner approval before any lesson authoring.
