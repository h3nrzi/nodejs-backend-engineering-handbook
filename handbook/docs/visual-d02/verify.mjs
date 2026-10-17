// D02 visual review evidence harness, adapted from the accepted pilot. Uses the existing locked renderer and browser.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import puppeteer from 'puppeteer';
import { marked } from 'marked';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
process.chdir(root);
const plan = JSON.parse(await readFile('docs/visual-d02/plan.json', 'utf8'));
const baseline = plan.baseline;
const lessons = plan.reviewedChapters.map(c => c.lesson);
const sources = plan.figures.map(f => f.source);
const commands = [];
function run(command, args, expected = 0, timeout = 180000) {
  const r = spawnSync(command, args, { encoding: 'utf8', timeout, maxBuffer: 1024 * 1024 });
  commands.push({ command: [command, ...args], exit: r.status, stdout: command === 'git' && args[0] === 'show' ? 'Baseline content read (omitted).\n' : r.stdout, stderr: r.stderr });
  assert.ifError(r.error);
  assert.equal(r.status, expected, `${command} ${args.join(' ')}\n${r.stderr}`);
  return r.stdout;
}
const hash = s => createHash('sha256').update(s).digest('hex');
const evidence = { baseline, date: new Date().toISOString(), environment: {
  node: process.version, uv: process.versions.uv, v8: process.versions.v8,
  openssl: process.versions.openssl, platform: process.platform, arch: process.arch,
}, commands, lessons: [], figures: [] };
const temporary = await mkdtemp(join(tmpdir(), 'handbook-visual-d02-'));
console.log(`Disposable previews/screenshots: ${temporary}`);

for (const lesson of lessons) {
  const before = run('git', ['show', `${baseline}:${lesson}`]);
  const after = await readFile(lesson, 'utf8');
  // Every original line must survive in order; no approved prose/code is replaced.
  const lines = after.split('\n'); let index = 0;
  for (const line of before.split('\n')) {
    while (index < lines.length && lines[index] !== line) index++;
    assert(index < lines.length, `Original line missing from ${lesson}: ${line}`); index++;
  }
  const blocks = text => [...text.matchAll(/^(?<fence>`{3,}|~{3,})[^\n]*\n[\s\S]*?^\k<fence>/gm)].map(m => m[0]);
  assert.deepEqual(blocks(after), blocks(before), 'Existing examples and Mermaid fence preserved');
  evidence.lessons.push({ path: lesson, sha256: hash(after), baselineSha256: hash(before), originalLinesPreserved: true, existingCodePreserved: true });
}
const protectedPaths = ['tracking/state.json', 'TRACKER.md', 'projects/coverage-matrix.md', 'domains/01-computer-science-foundations', 'domains/02-javascript-typescript/README.md', 'domains/02-javascript-typescript/curriculum.md', 'domains/02-javascript-typescript/projects', 'domains/03-nodejs-internals', 'domains/04-network-protocol-engineering', 'tools', 'scripts', 'package.json', 'package-lock.json'];
assert.equal(run('git', ['diff', '--name-only', baseline, '--', ...protectedPaths]).trim(), '');
evidence.trackingAndCoverage = 'Reviewed; no mapping/status/Charter change. Protected files unchanged from baseline.';
const allowed = /^(?:domains\/02-javascript-typescript\/(?:lessons\/|assets\/)|docs\/visual-d02\/)/;
const changed = run('git', ['diff', '--name-only', baseline]).trim().split('\n').filter(Boolean);
const untracked = run('git', ['ls-files', '--others', '--exclude-standard']).trim().split('\n').filter(Boolean);
assert([...changed,...untracked].every(p => allowed.test(p)), 'Changes must stay in D02 lessons/assets and review package');
// Retain clean preflight outcomes with the same toolchain as the asset checks.
run('npm', ['run', 'visuals:smoke']);
run('npm', ['run', 'visuals:check', '--', '--self-test-styles']);
run('npm', ['run', 'visuals:check', '--', ...lessons, ...sources]);
if (process.argv.includes('--render')) {
  for (const source of sources) run('npm', ['run', 'visuals:render', '--', '-i', source, '-o', source.replace(/mmd$/, 'svg')]);
}
run('python3', ['scripts/check-handbook-links.py']);
run('git', ['diff', '--check']);

const browserPath = process.env.PUPPETEER_EXECUTABLE_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
assert(existsSync(browserPath), 'Set PUPPETEER_EXECUTABLE_PATH to the existing browser');
const browser = await puppeteer.launch({ executablePath: browserPath });
try {
  evidence.environment.browser = await browser.version();
  const page = await browser.newPage();
  for (const source of sources) {
    const svgPath = source.replace(/mmd$/, 'svg'); const svg = await readFile(svgPath, 'utf8');
    await page.setContent(svg);
    const structure = await page.evaluate(raw => {
      const s = document.querySelector('svg');
      const parsed = new DOMParser().parseFromString(raw, 'image/svg+xml');
      const unsafe = [...s.querySelectorAll('*')].flatMap(e => [...e.attributes].filter(a => /^on/i.test(a.name) || (/^(?:href|xlink:href)$/i.test(a.name) && !a.value.startsWith('#'))));
      return { xmlValid: !parsed.querySelector('parsererror'), title: s.querySelector('title')?.textContent, description: s.querySelector('desc')?.textContent,
        labelled: !!s.getAttribute('aria-labelledby') && !!s.getAttribute('aria-describedby'), unsafeCount: unsafe.length + s.querySelectorAll('script,foreignObject,image').length,
        viewBox: s.getAttribute('viewBox') };
    }, svg);
    assert(structure.xmlValid && structure.title && structure.description && structure.labelled);
    assert.equal(structure.unsafeCount, 0);
    assert(!/https?:\/\//.test(svg.replace(/xmlns(?::\w+)?="[^"]*"/g, '')), 'No remote assets or scripts');
    const sizes = [];
    for (const width of [720, 360]) {
      await page.setViewport({ width: width + 32, height: 1000, deviceScaleFactor: 1 });
      await page.setContent(`<style>body{margin:16px;background:#fff}svg{display:block;max-width:100%;height:auto}</style>${svg}`);
      const metrics = await page.evaluate(() => {
        const s = document.querySelector('svg'), r = s.getBoundingClientRect();
        const texts = [...s.querySelectorAll('text')].flatMap(e => e.querySelector('tspan') ? [...e.querySelectorAll('tspan')].filter(t => !t.querySelector('tspan')) : [e]);
        return { width: r.width, minimumFontPx: Math.min(...texts.map(e => parseFloat(getComputedStyle(e).fontSize))) * r.width / s.viewBox.baseVal.width,
          clipped: texts.filter(e => { const b = e.getBoundingClientRect(); return b.left < r.left - 1 || b.right > r.right + 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1; }).map(e => e.textContent),
          textColors: [...new Set(texts.map(e => getComputedStyle(e).fill))],
          backgroundColors: [...new Set([...s.querySelectorAll('.node rect,.node polygon,rect.actor,rect.note')].map(e => getComputedStyle(e).fill))],
        };
      });
      assert.deepEqual(metrics.clipped, [], `Clipped labels: ${source}`);
      assert(metrics.minimumFontPx >= 12, `Mobile text too small: ${source} ${metrics.minimumFontPx}`);
      const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number);
      const luminance = color => rgb(color).map(n => n / 255).map(n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
      const backgrounds = ['rgb(255, 255, 255)', ...metrics.backgroundColors.filter(c => c.startsWith('rgb('))];
      metrics.minimumContrast = Math.min(...metrics.textColors.flatMap(t => backgrounds.map(bg => {
        const a = luminance(t), b = luminance(bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      })));
      assert(metrics.minimumContrast >= 4.5, `Low text contrast: ${source}`);
      sizes.push({ columnWidth: width, ...metrics });
      await page.screenshot({ path: join(temporary, source.split('/').at(-1).replace('.mmd', `-${width}.png`)), fullPage: true });
    }
    const id = plan.figures.find(f => f.source === source).id;
    const paired = `<style>body{font:18px Arial;margin:16px;background:white}.pair{display:flex;gap:24px;align-items:flex-start}.desktop{width:720px}.mobile{width:360px}img{display:block;max-width:100%;height:auto}</style><h1>${id}</h1><div class="pair"><div class="desktop">720 px<img src="${pathToFileURL(resolve(svgPath))}"></div><div class="mobile">360 px<img src="${pathToFileURL(resolve(svgPath))}"></div></div>`;
    const pairPath = join(temporary, `${id}.html`);
    await writeFile(pairPath, paired);
    await page.setViewport({width:1140,height:900,deviceScaleFactor:1});
    await page.goto(pathToFileURL(pairPath).href);
    await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    await page.screenshot({path:join(temporary,`${id}-pair.png`),fullPage:true});
    await page.addStyleTag({content:'body{background:#111827;color:white}'});
    await page.screenshot({path:join(temporary,`${id}-dark.png`),fullPage:true});
    await page.addStyleTag({content:'body{background:white;color:black}img{filter:grayscale(1)}'});
    await page.screenshot({path:join(temporary,`${id}-gray.png`),fullPage:true});
    evidence.figures.push({ source, sourceSha256: hash(await readFile(source)), svg: svgPath, svgSha256: hash(svg), ...structure, sizes });
  }
  // Preview the actual Markdown with local image paths, captions and source links.
  for (const lesson of lessons) {
    const html = `<base href="${pathToFileURL(resolve(lesson))}"><style>body{font:18px/1.6 Arial;margin:16px auto;padding:0 15px;max-width:720px}img{display:block;max-width:100%;height:auto}pre{overflow:auto}table{display:block;overflow:auto}</style>${marked.parse(await readFile(lesson, 'utf8'))}`;
    const preview = join(temporary, lesson.split('/').at(-1).replace('.md', '.html'));
    await writeFile(preview, html);
    const previews=[];
    for (const columnWidth of [720,360]) {
      await page.setViewport({width:columnWidth+30,height:900,deviceScaleFactor:1});
      await page.goto(pathToFileURL(preview).href);
      await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
      const images = await page.evaluate(() => [...document.images].map(i => ({src:i.getAttribute('src'),alt:i.alt,loaded:i.complete&&i.naturalWidth>0,width:i.width,naturalWidth:i.naturalWidth})));
      assert.equal(images.length,plan.figures.filter(f=>f.lesson===lesson).length,`Missing Markdown image in ${lesson}`);
      assert(images.every(i=>i.loaded&&i.alt&&i.width<=columnWidth));
      previews.push({columnWidth,images});
      for(const [index,figure] of plan.figures.filter(f=>f.lesson===lesson).entries()) {
        await (await page.$$('img'))[index].screenshot({path:join(temporary,`${figure.id}-markdown-${columnWidth}.png`)});
      }
    }
    evidence.lessons.find(l=>l.path===lesson).markdownPreviews=previews;
  }
} finally { await browser.close(); }
if (process.argv.includes('--record')) {
  await writeFile('docs/visual-d02/verification.json', JSON.stringify(evidence, null, 2) + '\n');
  await writeFile('docs/visual-d02/validation.txt', commands.filter(c => !(c.command[0] === 'git' && c.command[1] === 'show')).map(c => `$ ${c.command.join(' ')}\nexit ${c.exit}\n${c.stdout}${c.stderr}`).join('\n'));
}
console.log('PASS: preserved content, tracking/coverage, Mermaid, SVG safety/bounds, mobile labels, Markdown images and links.');
console.log('All original D02 examples preserved; focused replays are separately recorded by replay.mjs.');
