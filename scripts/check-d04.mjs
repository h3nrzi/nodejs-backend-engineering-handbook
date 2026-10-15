// Executes educational lesson labs in isolated, time-bounded child processes.
import assert from 'node:assert/strict';
import { readdir, readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = new URL('../domains/04-network-protocol-engineering/', import.meta.url);
const lessons = (await readdir(new URL('lessons/', root))).filter(x => x.endsWith('.md')).sort();
const temporary = await mkdtemp(path.join(tmpdir(), 'd04-labs-'));
let failures = 0;
try {
  for (const lesson of lessons) {
    const text = await readFile(new URL(`lessons/${lesson}`, root), 'utf8');
    const blocks = [...text.matchAll(/```javascript\n([\s\S]*?)\n```/g)];
    assert.equal(blocks.length, 1, `one complete lab per lesson: ${lesson}`);
    const file = path.join(temporary, lesson.replace('.md', '.mjs'));
    await writeFile(file, blocks[0][1]);
    const result = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 10_000, maxBuffer: 128 * 1024 });
    const ok = result.status === 0 && !result.error;
    if (!ok) failures++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${lesson.slice(0, 2)} ${result.stdout.trim()}`);
    if (!ok) console.error(result.error?.message ?? result.stderr);
  }
} finally { await rm(temporary, { recursive: true, force: true }); }
console.log(`${lessons.length - failures}/${lessons.length} educational labs passed`);
process.exitCode = failures ? 1 : 0;
