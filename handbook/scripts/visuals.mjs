#!/usr/bin/env node
// Use the locked local renderer and an existing browser; never download tools.
import { accessSync, constants, existsSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [command, ...args] = process.argv.slice(2);
if (!['render', 'check'].includes(command) || args.length === 0) {
  console.error('Usage: npm run visuals:render -- -i input.mmd -o output.svg\n'
    + '       npm run visuals:check -- file.md [diagram.mmd ...]\n'
    + '       npm run visuals:check -- --self-test-styles');
  process.exit(2);
}

const bin = join(root, 'node_modules', '.bin');
if (!existsSync(join(bin, 'mmdc'))) {
  console.error('Renderer missing. Run npm ci --ignore-scripts first.');
  process.exit(2);
}

const candidates = process.env.PUPPETEER_EXECUTABLE_PATH
  ? [resolve(process.env.PUPPETEER_EXECUTABLE_PATH)]
  : [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ...(process.env.PATH ?? '').split(delimiter).flatMap(directory =>
        ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
          .map(name => join(directory, name))),
    ];
const browser = candidates.find(candidate => {
  try {
    accessSync(candidate, constants.X_OK);
    return true;
  } catch {
    return false;
  }
});
if (!browser) {
  console.error('Chrome/Chromium missing. Set PUPPETEER_EXECUTABLE_PATH to an installed executable.');
  process.exit(2);
}

const env = {
  ...process.env,
  PATH: `${bin}${delimiter}${process.env.PATH ?? ''}`,
  PUPPETEER_EXECUTABLE_PATH: browser,
};
const executable = command === 'render' ? join(bin, 'mmdc') : process.execPath;
const forwarded = command === 'render'
  ? ['-c', join(root, 'tools', 'visuals', 'mermaid.config.json'), '-b', 'white', ...args]
  : [join(root, '.agents', 'skills', 'mermaid-diagrams', 'scripts', 'validate-mermaid.js'), ...args];
const result = spawnSync(executable, forwarded, { env, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
