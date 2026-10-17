#!/usr/bin/env python3
"""Verify this layout migration against its fixed pre-move revision."""
import hashlib
import json
import posixpath
import re
import subprocess
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[2]
BASELINE = 'aa3114ff357fd297a95f6a3fe32382abc3a2bb53'


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def destination(name):
    if name.startswith(('domains/', 'projects/', 'tracking/')):
        return 'handbook/' + name
    return 'app/' + name[7:] if name.startswith('my-app/') else name


def original_path(name):
    return name[9:] if name.startswith('handbook/') else name


def markdown(text, source):
    # Compare resolved link targets, including anchors, independently of depth.
    def link(match):
        target = match['target']
        parts = urlsplit(target)
        if parts.scheme or target.startswith('//') or not parts.path:
            return match[0]
        resolved = posixpath.normpath(posixpath.join(posixpath.dirname(source), unquote(parts.path)))
        target = original_path(resolved) + ('#' + parts.fragment if parts.fragment else '')
        start = match.start('target') - match.start()
        end = match.end('target') - match.start()
        return match[0][:start] + target + match[0][end:]
    text = re.sub(r'!?\[[^\]\n]*\]\((?P<target>[^\s)]+)(?:\s+"[^"\n]*")?\)', link, text)
    for directory in ('domains', 'projects', 'tracking'):
        text = text.replace('handbook/' + directory + '/', directory + '/')
    return text


def state_without_path_prefixes(value):
    if isinstance(value, str):
        return original_path(value)
    if isinstance(value, list):
        return [state_without_path_prefixes(item) for item in value]
    if isinstance(value, dict):
        return {key: state_without_path_prefixes(item) for key, item in value.items()}
    return value


counts = {'moved_files': 0, 'byte_identical': 0, 'markdown_path_or_tooling_only': 0, 'state_path_only': 0, 'application_path_config': 0}
for source in git('ls-tree', '-r', '--name-only', BASELINE).decode().splitlines():
    target = destination(source)
    if source == target:
        continue
    counts['moved_files'] += 1
    before = git('show', f'{BASELINE}:{source}')
    after = (ROOT / target).read_bytes()
    if hashlib.sha256(before).digest() == hashlib.sha256(after).digest():
        counts['byte_identical'] += 1
    elif source == 'tracking/state.json':
        assert json.loads(before) == state_without_path_prefixes(json.loads(after)), target
        counts['state_path_only'] += 1
    elif source == 'my-app/next.config.ts':
        assert after.replace(b'    root: __dirname,\n', b'') == before, target
        counts['application_path_config'] += 1
    elif source == 'my-app/README.md':
        assert after.replace(b'cd app # from the repository root\nnpm ci\n', b'') == before, target
        counts['markdown_path_or_tooling_only'] += 1
    elif source.endswith('.md'):
        # These two tooling notes keep a historical exact-byte audit from being
        # presented as a runnable current-layout check. Teaching text is intact.
        if source == 'domains/05-api-engineering/evidence/c02/review-guide.md':
            before = before.replace(
                b'Optional read-only checks:',
                b'For the historical C02 authoring audit, use the [original publication checkout](../../../../docs/repository-layout.md#historical-evidence). Current read-only checks:')
            before = before.replace(
                b'python3 domains/05-api-engineering/evidence/c02/check-authoring.py',
                b'python3 docs/repository-restructure/check-preservation.py')
            before = before.replace(
                b'Expected: 274 protected baseline files byte-identical, unchanged',
                b'Expected: the current restructuring checker verifies 341 moved files with tracking/approval values unchanged except paths. The historical authoring audit reported 274 protected baseline files byte-identical, unchanged')
        elif source == 'domains/05-api-engineering/evidence/c02/validation.md':
            before = before.replace(
                b'## Repository validation and handoff\n',
                b'## Repository validation and handoff\n\n**Path update, 2026-10-17:** The authoring checks below describe the original submission. Run `check-authoring.py` only in the [original publication checkout](../../../../docs/repository-layout.md#historical-evidence). For the restructured tree, use `python3 docs/repository-restructure/check-preservation.py`.\n')
            before = before.replace(
                b'python3 domains/05-api-engineering/evidence/c02/check-authoring.py',
                b'# Historical checkout only:\n# python3 domains/05-api-engineering/evidence/c02/check-authoring.py')
        assert markdown(before.decode(), source) == markdown(after.decode(), target), target
        counts['markdown_path_or_tooling_only'] += 1
    else:
        raise AssertionError(f'Unexpected content change: {target}')

assert counts['moved_files'] == 341, counts
print(json.dumps({'baseline': BASELINE, **counts, 'approval_and_tracking_values_unchanged_except_paths': True}, indent=2))
