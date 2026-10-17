#!/usr/bin/env node
// Disposable rendering checks, retained as a reproducible setup diagnostic.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const directory = mkdtempSync(join(tmpdir(), 'handbook-visuals-'));
console.log(`Disposable output: ${directory}`);
const fixtures = {
  'tcp-handshake': `sequenceDiagram
  accTitle: TCP handshake
  accDescr: Client sends SYN, server sends SYN ACK, client acknowledges. Ordinary no-loss open; options, data and retransmission omitted.
  participant C as Client
  participant S as Server
  C->>S: SYN seq=100
  S->>C: SYN ACK seq=300 ack=101
  C->>S: ACK seq=101 ack=301
`,
  'event-loop-scheduling': `flowchart TD
  accTitle: I/O callback scheduling constraint
  accDescr: A ready I/O callback waits for the current JavaScript stack to return and for the host to dispatch it. This is not a phase-order diagram or a fairness guarantee.
  A["I/O callback becomes ready"] --> B{"JS stack still running?"}
  B -->|Yes| C["Wait for stack to return"]
  B -->|No| D["Await host dispatch"]
  C --> D
  D --> E["I/O callback runs on JS thread"]
`,
  'request-lifecycle': `stateDiagram-v2
  accTitle: Illustrative request lifecycle
  accDescr: Received requests are validated, then rejected or processed. Processing ends in success or failure. Illustrative application model; no cancellation, transport or retry guarantees.
  [*] --> Received
  Received --> Validating
  Validating --> Rejected: invalid
  Validating --> Processing: valid
  Processing --> Succeeded: completed
  Processing --> Failed: error
  Rejected --> [*]
  Succeeded --> [*]
  Failed --> [*]
`,
};

function run(args, expected = 0, env = process.env) {
  const result = spawnSync(process.execPath, [join(root, 'scripts/visuals.mjs'), ...args], {
    cwd: root, env, encoding: 'utf8', timeout: 120_000,
  });
  assert.equal(result.status, expected, `${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
  return `${result.stdout}${result.stderr}`;
}

for (const [name, source] of Object.entries(fixtures)) {
  const input = join(directory, `${name}.mmd`);
  writeFileSync(input, source);
  for (const extension of ['svg', 'png']) {
    const output = join(directory, `${name}.${extension}`);
    run(['render', '-i', input, '-o', output]);
    const data = readFileSync(output);
    assert(data.length > 100);
    if (extension === 'svg') {
      const svg = data.toString();
      assert.match(svg, /<svg\b/);
      assert.match(svg, /<title\b[^>]*>[^<]+<\/title>/);
      assert.match(svg, /<desc\b[^>]*>[^<]+<\/desc>/);
      assert.doesNotMatch(svg, /<script\b|<foreignObject\b/i);
    } else {
      assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      console.log(`${name}: PNG ${data.readUInt32BE(16)} x ${data.readUInt32BE(20)}, ${data.length} bytes`);
    }
  }
}

const markdown = join(directory, 'source.md');
const exported = join(directory, 'export.md');
writeFileSync(markdown, '# Disposable diagrams\n\n'
  + Object.entries(fixtures).map(([name, source]) =>
    `## ${name}\n\n\`\`\`mermaid\n${source}\`\`\`\n\nRendering fixture only; see accessible description for limits.\n`).join('\n'));
run(['check', markdown]);
run(['render', '-i', markdown, '-o', exported]);
const exportedText = readFileSync(exported, 'utf8');
assert.doesNotMatch(exportedText, /```mermaid/);
const images = [...exportedText.matchAll(/!\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)];
assert.equal(images.length, 3);
for (const [, destination] of images) {
  assert(!destination.startsWith('/') && !destination.includes('://'));
  assert(existsSync(join(directory, destination)));
}
console.log('Markdown: 3 fences validated; 3 relative SVG image references resolve.');

// Check the patched KaTeX CSS path with actual mathematical content.
const math = join(directory, 'math.mmd');
writeFileSync(math, 'flowchart LR\n  A["$$E=mc^2$$"] --> B["Energy"]\n');
const mathConfig = join(directory, 'math.config.json');
const config = JSON.parse(readFileSync(join(root, 'tools/visuals/mermaid.config.json'), 'utf8'));
config.htmlLabels = true;
config.forceLegacyMathML = true;
writeFileSync(mathConfig, JSON.stringify(config));
run(['render', '-i', math, '-o', join(directory, 'math.svg'), '-c', mathConfig]);
const mathSvg = readFileSync(join(directory, 'math.svg'), 'utf8');
assert.match(mathSvg, /class="katex-html"/);
console.log('Math: KaTeX typeset output verified with an explicit HTML-label config.');

const invalid = join(directory, 'invalid.md');
writeFileSync(invalid, '# Invalid fixture\n\n```mermaid\nflowchart LR\nA[broken\n```\n');
const rejection = run(['check', invalid], 1);
assert.match(rejection, /Block 1 starting near line 3/);
run(['check', markdown], 2, {
  ...process.env, PUPPETEER_EXECUTABLE_PATH: join(directory, 'missing-browser'),
});
console.log('Refusal checks: invalid fence reports block/line; missing browser exits 2.');
console.log(`PASS. Inspect PNGs and export.md in ${directory}; remove only this directory after review.`);
