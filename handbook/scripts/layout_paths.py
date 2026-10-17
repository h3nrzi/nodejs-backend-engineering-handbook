"""Fixed relocation map; archived paths are interpreted at their original revision."""
import posixpath
import re
from urllib.parse import unquote, urlsplit

BASELINE = 'c30b3e0125155e1928c9c378f2372b3dd11f726f'
MOVED_DIRS = ('docs/', 'scripts/', 'templates/', 'tools/', '.scratch/', '.github/',
              '.agents/skills/mermaid-diagrams/')
MOVED_FILES = ('AGENTS.md', 'README.md', 'ROADMAP.md', 'TRACKER.md',
               'package.json', 'package-lock.json')


def destination(path):
    return 'handbook/' + path if path in MOVED_FILES or path.startswith(MOVED_DIRS) else path


def historical(path):
    return ('/evidence/' in path
            or (path.startswith(('docs/visual-', 'docs/repository-restructure/', '.scratch/'))
                and path != 'docs/visual-authoring.md')
            or path in ('docs/curriculum-coverage-audit-2026-10-15.md',
                        'docs/prd-scope-alignment-audit-2026-10-12.md',
                        'docs/restructure-audit-2026-10-15.md'))


def rewrite_markdown(text, source, tracked):
    """Expected live-path edits only: preserve every other byte of teaching text."""
    target_source = destination(source)

    def link(match):
        url = match['url']
        parts = urlsplit(url)
        if parts.scheme or url.startswith('//') or not parts.path or any(c in url for c in '<>{}'):
            return match[0]
        original = (posixpath.normpath(posixpath.join(posixpath.dirname(source), unquote(parts.path)))
                    if not parts.path.startswith('/') else parts.path[1:])
        if original not in tracked and not any(p.startswith(original.rstrip('/') + '/') for p in tracked):
            return match[0]
        updated = posixpath.relpath(destination(original), posixpath.dirname(target_source))
        updated += ('?' + parts.query if parts.query else '') + ('#' + parts.fragment if parts.fragment else '')
        start, end = match.start('url') - match.start(), match.end('url') - match.start()
        return match[0][:start] + updated + match[0][end:]

    text = re.sub(r'!?\[[^\]\n]*\]\((?P<url>[^\s)]+)(?:\s+"[^"\n]*")?\)', link, text)
    text = re.sub(r'(?<![\w/])handbook/(?=(?:domains|projects|tracking)/)', '', text)
    # Retain the dated editorial attribution verbatim, including its Markdown hard break.
    return text.replace('per canonical tracking/state.json; metadata reconciled',
                        'per canonical handbook/tracking/state.json; metadata reconciled')
