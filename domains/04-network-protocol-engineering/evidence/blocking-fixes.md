# D04 — Two blocking editorial fixes

**Date:** 2026-10-15. **Scope:** the two blocking findings in the independent D04 Final Editorial Review and their verification only. **Editorial:** in_review. **Human evaluation:** not_run. **Competency:** not_assessed.

## Revision and source identity

Baseline: `86d2ef1176998a4e73e32cf5f502cd163fbf48b6`. Tested inputs are that baseline plus the two lesson corrections in the commit containing this report. The current [manifest](lab-manifest.json) records SHA-256 values for all 18 executed blocks, their complete lesson files, the unchanged suite runner and both retained outputs. Verify those hashes against the checked-out commit before relying on these results. The prior manifest and results remain available at the baseline commit. No later uncommitted lesson change is covered by this record.

## Corrections and focused evidence

| Finding | Root cause and correction | Actual agent preflight |
|---|---|---|
| F18 — [Unknown versus incomplete](../lessons/18-network-diagnostics-and-case-studies.md) | Negating `complete` treated absent evidence as false when an action was observed. Explicit Boolean true/false now selects complete/incomplete; missing or non-Boolean values select explicit unknown. An observed action remains visible without implying a reply state. Explanation, examples, exercise and answer rubric agree. | 23 cases passed: complete 200/404 and complete without a retained status; incomplete with/without action and with 200/404; missing completion; undefined, null, numeric and string values with/without action. Existing resolution/connect classifications remain exercised. |
| F14 — [HTTP 426 response](../lessons/14-websocket-sessions-and-control.md) | The ordinary-HTTP branch sent only status 426. It now sends `Upgrade: websocket`, `Connection: Upgrade, close` and an explicit zero Content-Length. | Actual loopback HTTP response asserted status, Upgrade, Connection options, zero length/bytes, parser completion and no upgrade ownership transfer. Existing 101, fragmented text, masked pong and clean-close checks also passed. |

The 426 requirements were checked against [RFC 9110 §15.5.22](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.22) and [§7.8](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.8). [RFC 6455 §4.2.2](https://www.rfc-editor.org/rfc/rfc6455.html#section-4.2.2) separately requires Sec-WebSocket-Version for unsupported-version refusal; this ordinary-HTTP case does not test that condition. A 426 response advertises the required upgrade; only the separate valid opening receives 101 and switches protocols.

## Exact replay commands

Working directory: `/Users/hossein/Projects/mediaforge/nodejs-backend-engineering-handbook`. Run these commands from that directory. Focused replay executes the two complete lesson blocks unchanged in separate ESM children; it adds no product endpoint or protocol implementation.

```sh
node --version
node -p 'JSON.stringify(process.versions)'
uname -a
sw_vers
openssl version
python3 --version
git rev-parse HEAD
node --input-type=module > domains/04-network-protocol-engineering/evidence/blocking-fixes-focused.txt 2>&1 <<'JS'
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const root = 'domains/04-network-protocol-engineering/lessons/';
const lessons = await readdir(root);
for (const chapter of ['14', '18']) {
  const file = lessons.find(name => name.startsWith(`${chapter}-`));
  const blocks = [...(await readFile(root + file, 'utf8')).matchAll(/```javascript\n([\s\S]*?)\n```/g)];
  assert.equal(blocks.length, 1);
  const result = spawnSync(process.execPath, ['--input-type=module', '-'], {
    input: blocks[0][1], encoding: 'utf8', timeout: 10_000, maxBuffer: 128 * 1024
  });
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  assert.ifError(result.error);
  assert.equal(result.status, 0, file);
  console.log(`PASS focused chapter ${chapter}`);
}
console.log('2/2 focused lesson labs passed');
JS
node scripts/check-d04.mjs > domains/04-network-protocol-engineering/evidence/educational-labs.txt 2>&1
python3 scripts/check-handbook-links.py > domains/04-network-protocol-engineering/evidence/internal-links.json
python3 -m json.tool tracking/state.json > /dev/null
git diff --check
```

To inspect replay results, open [focused stdout](blocking-fixes-focused.txt), [complete-suite stdout](educational-labs.txt) and [the link report](internal-links.json). Replaying overwrites only these generated evidence outputs; use a disposable checkout if you want to preserve this exact record unchanged.

## Environment, regression and limits

Node v24.22.0; V8 13.6.233.17-node.57; libuv 1.52.1; Node-linked OpenSSL 3.5.8; nghttp2 1.70.0; Undici 7.29.1. Host: macOS 26.1, build 25B78 / Darwin 25.1.0, arm64. Separate OpenSSL CLI: 3.6.3 (9 Jun 2026). Python: 3.14.7. The manifest retains the runtime versions and source/output hashes.

Focused replay: **2/2 passed**, including **23 classifier cases**. Complete existing suite: **18/18 passed**, exit 0. Markdown destination/anchor check: zero current issues; exact count is in the retained link report. JSON and whitespace checks passed. No additional Markdown lint configuration or package script exists in this repository; the repository's available Markdown check is the link/anchor checker.

Source/diff review confirmed only C14/C18 lesson blocks changed; the other 16 blocks and lesson files remain byte-identical to baseline. The suite runner is unchanged. Six Charters, D01–D03, MediaForge and D05–D16 files/records remain unchanged. Counts, competency identifiers and direct/supporting mappings remain unchanged; D04 retains all editorial statuses in_review. [Authoring checks](authoring-checks.json) record the focused scope audit.

These are bounded agent-run educational demonstrations. C18 is a finite model supplied with facts, not a collector or a resolver of contradictory reports. C14 uses an actual Node client and a restricted loopback peer; this fix does not qualify full WebSocket conformance, browser/TLS/proxy behavior or temporal ping handling before the final fragment. The pre-existing practical limits in [execution evidence](educational-execution.md#explicit-practical-limitations) remain. No portfolio implementation, learner competence or human acceptance is established. The two blocking findings are resolved; the prior non-blocking suggestions were not implemented. D04 is ready for Product Owner editorial approval, with no approval recorded.

## Files changed

- Lessons: `lessons/14-websocket-sessions-and-control.md`, `lessons/18-network-diagnostics-and-case-studies.md`.
- D04 evidence: `evidence/blocking-fixes.md`, `evidence/blocking-fixes-focused.txt`, `evidence/lab-manifest.json`, `evidence/educational-labs.txt`, `evidence/internal-links.json`, `evidence/authoring-checks.json`, `evidence/educational-execution.md`, `evidence/review-guide.md`.
- Reconciliation only: D04 `README.md`, repository `TRACKER.md`, `projects/coverage-matrix.md`, `tracking/state.json`.

All D04-relative paths above start at `domains/04-network-protocol-engineering/`. No lesson outside C14/C18, suite runner or Charter changed.
