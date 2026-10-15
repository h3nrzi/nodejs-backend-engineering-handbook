// Separate approved-text concern; no pooled data or uninitialized bytes are inspected.
import assert from 'node:assert/strict';
import { MessageChannel, markAsUntransferable } from 'node:worker_threads';
import { writeFile } from 'node:fs/promises';
const { port1, port2 } = new MessageChannel();
const ab = new ArrayBuffer(4);
const view = new Uint8Array(ab);
view.set([1, 2, 3, 4]);
markAsUntransferable(ab);
let errorName;
try {
  try { port1.postMessage(view, [ab]); }
  catch (error) { errorName = error.name; }
  assert.equal(errorName, 'DataCloneError');
  assert.equal(view.byteLength, 4);
  const received = new Promise(resolve => port2.once('message', resolve));
  port1.postMessage(view);
  const copy = await received;
  copy[0] = 99;
  assert.equal(view[0], 1);
  const result = { date: new Date().toISOString(), command: 'node docs/visual-d03/finding-check.mjs --record',
    environment: { node: process.version, v8: process.versions.v8, platform: process.platform, arch: process.arch },
    errorName, senderLength: view.byteLength, senderFirst: view[0], receiverFirst: copy[0], portsClosedInFinally: true };
  if (process.argv.includes('--record')) await writeFile(new URL('./finding-check.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
  console.log('PASS: explicit untransferable list throws; ordinary posting clones independent bytes.');
} finally { port1.close(); port2.close(); }
