# Separate technical findings for later editorial review

This visual pass preserves approved D03 text. The following concern does not authorize a content rewrite or reopen an editorial approval.

## F01 — Explicit transfer lists and untransferable Buffer storage

Location: [C11 §4, Buffer pooling matters](../../handbook/domains/03-nodejs-internals/lessons/11-worker-threads-and-data-ownership.md). The statement that a transfer attempt can instead result in cloning needs a sharper distinction between **posting without transferring**, **an explicit transfer list**, and historical runtime behavior.

The [Node v22.16.0 postMessage history](https://nodejs.org/download/release/v22.16.0/docs/api/worker_threads.html#portpostmessagevalue-transferlist) says that since v21.0.0 an untransferable object in the transfer list throws. The same release's markAsUntransferable example catches DataCloneError, while its Buffer considerations also use broad cloning language. That combination can mislead readers into expecting fallback cloning for an explicit untransferable transfer-list entry. Current Context7 v24 documentation independently returns the throwing contract.

A bounded synthetic MessageChannel check on Node v24.22.0/macOS, retained in [finding-check.json](finding-check.json), marks a dedicated ArrayBuffer untransferable, observes DataCloneError for an explicit transfer list, verifies sender storage remains intact, then successfully posts it without a transfer list and observes an independent receiver copy. Both ports are closed. This does not execute Node v22.16.0, audit every pooled Buffer constructor, or measure copying costs.

**Disposition:** substantive approved-text clarification recommended in a separately authorized editorial pass. D03-V10 covers dedicated transferable ArrayBuffer, ordinary cloning and SharedArrayBuffer; its caption explicitly excludes pooled/untransferable storage. No approved text or pilot asset changed.

## Historical status and evidence language

Several lesson endings and the D03 index/curriculum retain earlier in_review, not_started, PRD and next-authoring statements despite current canonical approvals and Workflow V2. These are pre-existing editorial/process inconsistencies, not new visual errors. Interpret them through canonical tracking: 18 D03 lessons and five educational Charters approved editorially; implementation and learning evidence remain separate. Historical Node v26/macOS and v22/Linux numerical observations have not been rewritten as v24/macOS results.
