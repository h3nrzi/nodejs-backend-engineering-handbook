#!/usr/bin/env python3
"""Check active Markdown and tracking paths; audit frozen links in their original layout."""
import json
import posixpath
from pathlib import Path
import re
import subprocess
from urllib.parse import unquote, urlsplit
from layout_paths import BASELINE, destination, historical

HANDBOOK = Path(__file__).resolve().parents[1]
ROOT = Path(subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], cwd=HANDBOOK).decode().strip())

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT).decode()

def headings(text):
    text = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', text, flags=re.M | re.S)
    found, counts = set(), {}
    for match in re.finditer(r'^#{1,6}\s+(.+?)\s*#*$', text, re.M):
        value = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', match[1]).lower()
        value = re.sub(r'[^\w\- ]', '', value).replace(' ', '-')
        count = counts.get(value, 0)
        counts[value] = count + 1
        found.add(value + (f'-{count}' if count else ''))
    found.update(re.findall(r'(?:id|name)=[\"\x27]([^\"\x27]+)', text))
    return found

def check(files, archived=None):
    issues, count, historical_count = [], 0, 0
    for source, text in files.items():
        if not source.endswith('.md'):
            continue
        origin = archived.get(source) if archived else None
        clean = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', text, flags=re.M | re.S)
        clean = re.sub(r'(`+).*?\1', '', clean, flags=re.S)
        targets = re.findall(r'!?\[[^\]\n]*\]\(([^)\n]+)\)', clean)
        targets += re.findall(r'^\[[^\]\n]+\]:\s*(\S+)', clean, re.M)
        for raw in targets:
            target = raw.strip().split(' "', 1)[0].strip('<>')
            if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', target) or target.startswith('//'):
                continue
            if any(x in target for x in ('{{', '}}', '<', '>')):
                continue
            count += 1
            historical_count += bool(origin)
            parts = urlsplit(target)
            path = unquote(parts.path)
            key = (posixpath.normpath(path.lstrip('/') if path.startswith('/') else
                                     posixpath.join(posixpath.dirname(origin or source), path))
                   if path else origin or source)
            if origin:
                key = destination(key)
            if key.startswith('../'):
                reason = 'outside repository'
            elif key not in files and not any(k.startswith(key.rstrip('/') + '/') for k in files):
                reason = 'missing file'
            elif parts.fragment and key.endswith('.md') and key in files and unquote(parts.fragment) not in headings(files[key]):
                reason = 'missing anchor'
            else:
                continue
            issues.append((origin or source, target, reason))
    return issues, count, historical_count

names = git('ls-tree', '-r', '--name-only', '-z', BASELINE).split('\0')
baseline = {p: git('show', f'{BASELINE}:{p}') if p.endswith('.md') else '' for p in names if p}
archived = {destination(p): p for p in baseline if historical(p)}
current_names = git('ls-files', '--cached', '--others', '--exclude-standard', '-z').split('\0')
current = {p: (ROOT / p).read_text() if p.endswith('.md') else ''
           for p in current_names if p and (ROOT / p).is_file()}
# Include newly relocated files before staging, and the skill discovery symlink.
for p in list(current):
    if p.startswith('handbook/.agents/skills/mermaid-diagrams/'):
        current[p.removeprefix('handbook/')] = current[p]
old, _, _ = check(baseline)
issues, count, historical_count = check(current, archived)
# Match baseline debt by its old source identity even after relocation.
reverse = {destination(p): p for p in baseline}
new = [x for x in issues if (reverse.get(x[0], x[0]), x[1], x[2]) not in old]
tracking_issues = []
def tracking(value, trail='state'):
    if isinstance(value, dict):
        for key, item in value.items(): tracking(item, trail + '.' + key)
    elif isinstance(value, list):
        for index, item in enumerate(value): tracking(item, f'{trail}[{index}]')
    elif isinstance(value, str) and re.match(r'^(?:handbook/)?(?:domains|projects|tracking|docs|templates)/', value):
        for item in value.split('; '):
            path, _, anchor = item.removeprefix('handbook/').partition('#')
            target = HANDBOOK / path
            if not target.exists() or (anchor and target.suffix == '.md'
                                       and unquote(anchor) not in headings(target.read_text())):
                tracking_issues.append([trail, item])
tracking(json.loads((HANDBOOK / 'tracking/state.json').read_text()))
print(json.dumps({'checked_internal_links': count, 'historical_links_resolved_via_fixed_map': historical_count,
                  'current_issues': issues, 'pre_existing_issues': [x for x in issues if x not in new],
                  'new_issues': new, 'tracking_path_issues': tracking_issues}, indent=2))
raise SystemExit(1 if new or tracking_issues else 0)
