#!/usr/bin/env node
// Run existing bounded teaching checks without overwriting historical evidence.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
if (!process.allowedNodeEnvironmentFlags.has('--experimental-transform-types')) {
  console.error('Historical D01 replays require the TypeScript transform flag. Select Node 24 (see .nvmrc) and rerun.');
  process.exit(2);
}
const scripts = [
  'docs/visual-d01/replay.mjs',
  'docs/visual-d02/replay.mjs',
  'docs/visual-d03/replay.mjs',
  'scripts/check-d04.mjs',
  'domains/05-api-engineering/examples/c01/contract-traces.mjs',
  'domains/05-api-engineering/examples/c01/correctness-boundaries.mjs',
  'domains/05-api-engineering/examples/c02/reservation-model.mjs',
  'domains/05-api-engineering/examples/c02/boundaries-and-observations.mjs',
];

for (const script of scripts) {
  console.log(`Running ${script}`);
  const result = spawnSync(process.execPath, [script], {
    cwd: root, stdio: 'inherit', timeout: 180_000,
  });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('PASS: all eight educational check entry points.');
