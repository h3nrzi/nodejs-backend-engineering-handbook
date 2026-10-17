# Engineering skills setup — Hands-on evaluation

Source: this chat's setup-matt-pocock-skills request and approved draft.
Build: `37c48533e22b6a0b21b38ffb970ff6b2b9d53afb` plus uncommitted
`AGENTS.md`, `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`,
`docs/agents/domain.md`, and this guide.
Prepared: 2026-10-17.
Human evaluation: not_run.

## Start here

Evaluate the repo's documented engineering workflow in a terminal.
No server, credentials, installation, or sample issues are needed.

```sh
cd /Users/hossein/Projects/nodejs-backend-engineering-handbook
cat AGENTS.md
```

Ready when the output shows one Agent skills section pointing to three
files under `docs/agents/`. All scenarios are read-only and independent.

## Coverage

| Feature / criterion | Scenario | Scope |
| --- | --- | --- |
| Root instructions route agents to configuration | S1 | Document review |
| Local specs, numbered tickets, comments, and wayfinding | S1 | Document review; downstream skill execution untested |
| Five default triage statuses and execution states | S2 | Document review; downstream skill execution untested |
| Single-context glossary and ADR consumer rules | S3 | Document review; lazy domain file creation untested |

## Scenarios

### S1 — Find the local issue workflow

Actor: repo maintainer. Prerequisites: repository files are present.

```sh
cat AGENTS.md
cat docs/agents/issue-tracker.md
```

Expected: the root instructions link all three configuration files; specs
use `.scratch/<feature-slug>/spec.md`; tickets use separate numbered files
under `.scratch/<feature-slug>/issues/`, starting at `01`. Comments append
under Comments. Wayfinding documents maps, blocking, frontier, claim, and
resolve. Ambiguous issue numbers require the feature context.

No-effect check: reading the configuration creates no tickets or external
tracker activity. State after: unchanged.
Evidence to retain: any mismatch between this workflow and how you want
to track work.
Agent preflight: pass; all three pointers resolve and the written tracker
document was reviewed against the approved draft.
Your evaluation: not_run.
Your observation: pending.

### S2 — Check local triage vocabulary

Actor: repo maintainer. Prerequisites: repository files are present.

```sh
cat docs/agents/triage-labels.md
cat docs/agents/issue-tracker.md
```

Expected: needs-triage, needs-info, ready-for-agent, ready-for-human, and
wontfix each map to an identical local Status string. Wayfinding uses
claimed and resolved for execution progress, separately from triage roles.

No-effect check: no GitHub labels are required or created.
State after: unchanged. Evidence to retain: any desired vocabulary change.
Agent preflight: pass; all five identity mappings were checked from disk.
Your evaluation: not_run.
Your observation: pending.

### S3 — Check domain documentation rules

Actor: repo maintainer. Prerequisites: repository files are present.

```sh
cat docs/agents/domain.md
```

Expected: root GLOSSARY.md and docs/adr/ form one shared context. Agents
read relevant domain documents, proceed silently if absent, use glossary
terms, and explicitly flag proposals that contradict an ADR. Domain
modeling creates domain documents as terms and decisions are resolved.

No-effect check: setup has not created placeholder glossary or ADR files.
State after: unchanged. Evidence to retain: any disagreement with these
consumer rules.
Agent preflight: pass; the single-context rules were reviewed and absence
of GLOSSARY.md, GLOSSARY-MAP.md, and docs/adr/ was checked from disk.
Your evaluation: not_run.
Your observation: pending.

## Preflight and results

Agent checks: four configured files exist, end with newlines, and contain
no trailing whitespace; one Agent skills heading exists; all three
configuration pointers resolve; all five default mappings are present.
The approved content was reviewed with no discrepancies found. The initial
working tree was clean. Git reports new AGENTS.md and docs/ files; no
existing files were modified. Application tests are not applicable to this
documentation-only configuration. No downstream engineering skill was run.

| Scenario | Agent preflight | User result | Evidence source |
| --- | --- | --- | --- |
| S1 | pass | not_run | File checks and approved-draft review |
| S2 | pass | not_run | Five mappings checked from disk |
| S3 | pass | not_run | Domain rules reviewed; lazy targets absent |

## Checkpoint and next action

Current scenario: S1, pending user evaluation.
Environment: local checkout at the path in Start here; no process running.
Artifacts: AGENTS.md, docs/agents/*.md, and this guide.
Dependencies: none between scenarios. Known failures: none observed.
Next safe action: run the two commands in Start here and confirm the three
configuration pointers are visible. Then follow S1 through S3 and report
your observations by scenario ID.

## Stop, cleanup, and resume

Stop at any point; no runtime or disposable fixtures need cleanup. Keep the
configuration and this guide. Resume at the first scenario without a user
observation. Edit docs/agents/*.md directly for future workflow changes;
rerun setup when switching issue trackers or restarting from scratch.

## Outstanding acceptance

S1, S2, and S3 await actual user observations. Downstream skill behavior
requires a future real skill invocation; configuration checks do not
establish that integration behavior or human acceptance.
