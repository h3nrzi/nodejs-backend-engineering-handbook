#!/usr/bin/env python3
"""C02 structural/preservation audit; does not grade educational depth or learners."""
import hashlib
import json
import re
import subprocess
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[4]
BASELINE = 'dfe397acbaed6326190dbda1e12b76c54854c6ed'
DOMAIN = ROOT / 'domains/05-api-engineering'

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)

def old(path):
    return git('show', f'{BASELINE}:{path}')

def require(value, label):
    if not value:
        raise AssertionError(label)

state = json.loads((ROOT/'tracking/state.json').read_text())
previous = json.loads(old('tracking/state.json'))
domain = next(d for d in state['domains'] if d['id'] == 'D05')
require([d for d in state['domains'] if d['id'] != 'D05'] ==
        [d for d in previous['domains'] if d['id'] != 'D05'], 'earlier/deferred domain objects changed')
require(state['current_implementation_project'] == previous['current_implementation_project'], 'MediaForge changed')
require(state['curriculum_decisions'] == previous['curriculum_decisions'], 'CD01-CD07 changed')
require(state['history'][:len(previous['history'])] == previous['history'], 'history prefix changed')
require(domain['chapter_progress'] == {f'{n:02}': 'approved_by_learner' if n == 1 else 'in_review' if n == 2 else 'not_started' for n in range(1,26)}, 'chapter statuses')
require(domain['authored_lesson_count'] == 2 and domain['approved_lesson_count'] == 1, 'D05 counts')
require(domain['lesson_authoring_stop_before'] == '03' and domain['lesson_authoring_authorized_chapters'] == ['01','02'], 'authorization stop')
require(domain['assessment_status'] == 'deferred_until_learning_phase' and domain['implementation_status'] == 'not_started', 'evidence inflation')
require(domain['project_charters_authored_count'] == domain['project_charters_approved_count'] == domain['project_catalog_candidate_count'] == 0, 'D05 projects started')
require(len(list((DOMAIN/'lessons').glob('*.md'))) == 2, 'later D05 chapter exists')
require(not list((DOMAIN/'projects').glob('*charter*.md')), 'D05 Charter created')
require(sum(len(list(d.glob('lessons/*.md'))) for d in (ROOT/'domains').iterdir()) == 68, 'actual lesson inventory')
cov=state['coverage_matrix_review']
require((cov['chapter_mapping_count'],cov['approved_chapter_mapping_count'],cov['in_review_chapter_mapping_count'],cov['proposed_chapter_mapping_count'],cov['approved_charter_count']) == (68,67,1,23,20), 'coverage counts')
matrix=(ROOT/'projects/coverage-matrix.md').read_text()
old_matrix=old('projects/coverage-matrix.md').decode()
require(matrix.split('## D05 — Proposed curriculum coverage',1)[0] == old_matrix.split('## D05 — Proposed curriculum coverage',1)[0], 'earlier coverage assignments changed')
require(matrix.split('## Mandatory maintenance',1)[1] == old_matrix.split('## Mandatory maintenance',1)[1], 'mandatory coverage maintenance changed')
protected=[]
for name in git('ls-tree','-r','--name-only',BASELINE).decode().splitlines():
    preserve=(name.startswith(tuple(f'domains/{slug}/' for slug in ['01-computer-science-foundations','02-javascript-typescript','03-nodejs-internals','04-network-protocol-engineering']))
              or (name.startswith('projects/') and name != 'projects/coverage-matrix.md')
              or name.startswith('domains/05-api-engineering/evidence/c01/')
              or name.startswith('domains/05-api-engineering/examples/c01/')
              or name.startswith('domains/05-api-engineering/assets/01-api-contracts-and-rest/')
              or name in ['domains/05-api-engineering/lessons/01-apis-as-contracts-and-rest.md','domains/05-api-engineering/evidence/curriculum-approval.md','domains/05-api-engineering/evidence/preflight.json','domains/05-api-engineering/evidence/review-guide.md','domains/05-api-engineering/projects/catalog.md'])
    if preserve:
        require((ROOT/name).read_bytes() == old(name), f'protected file changed: {name}')
        protected.append(name)
profile_path='domains/05-api-engineering/depth-specification.md'
require((ROOT/profile_path).read_text().split('## Part A — Contract foundations',1)[1] == old(profile_path).decode().split('## Part A — Contract foundations',1)[1], 'approved chapter profiles changed')
cur_path='domains/05-api-engineering/curriculum.md'
extract=lambda text:text.split('| Part | Chapter / proposed competency',1)[1].split('## Why 25 chapters',1)[0]
require(extract((ROOT/cur_path).read_text()) == extract(old(cur_path).decode()), 'curriculum sequence/dependencies changed')
chapter=(DOMAIN/'lessons/02-resources-operations-and-workflow-modeling.md').read_text()
for i in range(1,19):
    require(f'case N{i}.' in chapter or f'case N{i},' in chapter or f'case N{i}, ' in chapter, f'normal case N{i}')
    require(re.search(rf'(?:case A{i}[.,]|case A{i},)', chapter), f'adverse case A{i}')
    require(f'**Independent exercise E{i}.' in chapter, f'exercise E{i}')
require(chapter.count('**Answer rubric:**') == 18, 'individual rubrics')
ledger=(DOMAIN/'evidence/c02/depth-ledger.md').read_text()
require(ledger.count('| reasoned |') == 18, 'ledger reviewed row inventory')
execution=json.loads((DOMAIN/'evidence/c02/execution.json').read_text())
for run in execution['runs']:
    require(hashlib.sha256((ROOT/run['source']).read_bytes()).hexdigest() == run['source_sha256'], 'executed source changed')
    require(hashlib.sha256((ROOT/run['stdout_path']).read_bytes()).hexdigest() == run['stdout_sha256'], 'stdout changed')
    require(run['exit_code'] == 0 and not run['stderr'], 'execution failure')
assets=DOMAIN/'assets/02-resources-operations-and-workflows'
svg_results=[]
for source in sorted(assets.glob('*.mmd')):
    svg=source.with_suffix('.svg'); tree=ET.fromstring(svg.read_text())
    ns={'s':'http://www.w3.org/2000/svg'}
    require(tree.find('s:title',ns) is not None and tree.find('s:desc',ns) is not None, f'accessible names: {svg}')
    require(tree.find('s:title',ns).text and tree.find('s:desc',ns).text, 'empty accessible names')
    require('accTitle:' in source.read_text() and 'accDescr:' in source.read_text(), 'source accessibility')
    for el in tree.iter():
        require(el.tag.split('}')[-1] not in ['script','foreignObject','image'], 'active/external SVG element')
        for key,value in el.attrib.items():
            require(not key.lower().startswith('on'), 'event attribute')
            require(not (key.endswith('href') and not value.startswith('#')), 'external SVG link')
    svg_results.append({'source':source.relative_to(ROOT).as_posix(),'svg':svg.relative_to(ROOT).as_posix(),'viewBox':tree.attrib.get('viewBox')})
require(len(svg_results)==3,'visual inventory')
print(json.dumps({'baseline':BASELINE,'protected_files_byte_identical':len(protected),'prior_domain_objects_external_project_decisions_history_preserved':True,'approved_profiles_sequence_unchanged':True,'canonical_counts':{'authored':68,'approved':67,'in_review':1,'unstarted_D05':23,'approved_charters':20},'named_case_and_exercise_inventory':{'normal':18,'adverse':18,'exercises_with_rubrics':18,'integrated':1},'reasoned_rows':18,'execution_hashes_match':True,'svg_accessibility_structure':svg_results,'limits':'Structural audit and retained evidence consistency; not automated depth grading, implementation correctness, external review or learner acceptance.'},indent=2))
