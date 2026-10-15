#!/usr/bin/env python3
"""Check repository-relative Markdown destinations/anchors, reporting baseline debt separately."""
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]

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

def check(files):
    issues, count = [], 0
    for source, text in files.items():
        if not source.endswith('.md'):
            continue
        # Fenced sample paths are not active Markdown links.
        clean = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', text, flags=re.M | re.S)
        destinations = re.findall(r'!?\[[^\]\n]*\]\(([^)\n]+)\)', clean)
        destinations += re.findall(r'^\[[^\]\n]+\]:\s*(\S+)', clean, re.M)
        for raw in destinations:
            target = raw.strip().split(' "', 1)[0].strip('<>')
            if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', target) or target.startswith('//'):
                continue
            if any(x in target for x in ('{{', '}}', '<', '>')):
                continue
            count += 1
            parts = urlsplit(target)
            path = unquote(parts.path)
            base = PurePosixPath(source).parent
            resolved = (ROOT / (path.lstrip('/') if path.startswith('/') else base / path)).resolve() if path else ROOT / source
            try:
                key = resolved.relative_to(ROOT).as_posix()
            except ValueError:
                issues.append((source, target, 'outside repository')); continue
            if key not in files:
                # Directories are legitimate navigation targets.
                if not any(k.startswith(key.rstrip('/') + '/') for k in files):
                    issues.append((source, target, 'missing file'))
            elif parts.fragment and key.endswith('.md'):
                fragment = unquote(parts.fragment)
                if fragment not in headings(files[key]):
                    issues.append((source, target, 'missing anchor'))
    return issues, count

tracked = git('ls-files', '-z').split('\0')
baseline = {}
for name in tracked:
    if name:
        try:
            baseline[name] = git('show', f'HEAD:{name}') if name.endswith('.md') else ''
        except subprocess.CalledProcessError:
            pass
current = {p.relative_to(ROOT).as_posix(): p.read_text() if p.suffix == '.md' else ''
           for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.parts
           and 'node_modules' not in p.parts}
old, _ = check(baseline)
issues, count = check(current)
new = [issue for issue in issues if issue not in old]
print(json.dumps({'checked_internal_links': count, 'current_issues': issues,
                  'pre_existing_issues': [x for x in issues if x in old],
                  'new_issues': new}, indent=2))
raise SystemExit(1 if new else 0)
