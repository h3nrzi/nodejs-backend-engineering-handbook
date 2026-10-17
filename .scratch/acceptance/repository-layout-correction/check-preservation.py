#!/usr/bin/env python3
"""Verify the complete fixed baseline, teaching text, evidence and shared skills."""
from pathlib import Path
from collections import Counter
import hashlib
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'handbook/scripts'))
from layout_paths import BASELINE, destination, historical, rewrite_markdown

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)

manifest = json.loads((Path(__file__).parent / 'before.json').read_text())
assert git('rev-parse', BASELINE).decode().strip() == manifest['baseline']
names = git('ls-tree', '-r', '--name-only', BASELINE).decode().splitlines()
assert set(names) == set(manifest['files']), 'baseline manifest incomplete'
counts = Counter()
changes = []
for source in names:
    target = destination(source)
    before = git('show', f'{BASELINE}:{source}')
    assert hashlib.sha256(before).hexdigest() == manifest['files'][source], source
    path = ROOT / target
    assert path.is_file(), f'lost file: {source} -> {target}'
    after = path.read_bytes()
    counts['baseline_files'] += 1
    counts['relocated_files'] += source != target
    if before == after:
        counts['byte_identical'] += 1
        if historical(source): counts['historical_files_byte_identical'] += 1
        if source.startswith('app/'): counts['app_files_byte_identical'] += 1
        continue
    assert not historical(source), f'historical evidence modified: {source}'
    if source == 'handbook/tracking/state.json':
        def paths(value):
            if isinstance(value, dict): return {k: (v if k == 'history' else paths(v)) for k, v in value.items()}
            if isinstance(value, list): return [paths(v) for v in value]
            return value.removeprefix('handbook/') if isinstance(value, str) else value
        assert paths(json.loads(before)) == json.loads(after), 'non-path state change'
        counts['state_paths_only'] += 1
    elif source.endswith('.md') and source not in ('docs/repository-layout.md', 'AGENTS.md', 'docs/information-architecture.md'):
        assert rewrite_markdown(before.decode(), source, names).encode() == after, f'non-path Markdown change: {target}'
        counts['markdown_paths_only'] += 1
    elif source == 'scripts/check-d04.mjs':
        assert before.replace(b'../handbook/domains/', b'../domains/') == after
        counts['script_path_only'] += 1
    else:
        assert source in ('AGENTS.md', 'docs/information-architecture.md', 'docs/repository-layout.md', 'scripts/check-handbook-links.py'), f'unexpected content change: {source}'
        counts['reviewed_layout_guidance_or_checker'] += 1
    changes.append({'source': source, 'destination': target})
# All installed Matt entries and metadata must remain discoverable without changing bytes.
lock = json.loads((ROOT / 'skills-lock.json').read_text())
for name, entry in lock['skills'].items():
    assert entry['source'] == 'mattpocock/skills', name
    path = ROOT / '.agents/skills' / name / 'SKILL.md'
    assert path.is_file() and f'name: {name}\n' in path.read_text(), name
assert len(lock['skills']) == 38
skill = ROOT / '.agents/skills/mermaid-diagrams'
assert skill.is_symlink() and skill.resolve() == (ROOT / 'handbook/.agents/skills/mermaid-diagrams').resolve()
upstream = json.loads((skill / 'UPSTREAM.json').read_text())
for name, digest in upstream['sha256'].items():
    assert hashlib.sha256((skill / name).read_bytes()).hexdigest() == digest, name
for name in ('package.json','package-lock.json','scripts','templates','tools','ROADMAP.md','TRACKER.md'):
    assert not (ROOT / name).exists(), f'Handbook root residue: {name}'
assert sorted(p.name for p in (ROOT / 'docs').iterdir()) == ['README.md'], 'historical docs at shared root'
print(json.dumps({'baseline': manifest['baseline'], **counts, 'matt_skills_discoverable_unchanged': 38,
                  'mermaid_upstream_hashes_verified': len(upstream['sha256']), 'changed_baseline_files': changes,
                  'all_approval_and_progress_values_unchanged': True}, indent=2))
