# Chapter 17 — Deadlines, retries and uncertain outcomes

**Domain / competency:** D04 / D04-C17
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Design a phase-aware deadline budget; distinguish idle, receipt and total deadlines; explain safe retry prerequisites and truthful unknown outcomes without promising remote rollback.

Prerequisites: Chapters [03](03-tcp-delivery-and-connection-lifecycle.md), [09](09-http-clients-and-connection-pools.md), [14](14-websocket-sessions-and-control.md)–[16](16-rpc-envelopes-and-protocol-evolution.md), and D02 cancellation. Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: a timeout is an observer decision

A deadline says when a caller stops waiting or admitting further work. It does not travel backward in time to prevent a remote action. A timeout before DNS completes has different implications from a timeout after the server accepted and committed a request. A client error category must preserve the last confirmed phase and avoid declaring “not executed” without evidence.

An idle timeout bounds a period without relevant progress. A total deadline bounds the whole operation, including continued trickle progress. Header receipt, request-body receipt and application processing are separate phases. Timers execute when the event loop can run them; they are not hard real-time preemption. If CPU blocks the loop, cleanup callbacks may run late.

## Budget composition

Start one monotonic budget at the actual operation boundary, including local admission and pool wait. Each later phase receives the remaining budget rather than a fresh full timeout. Otherwise three serial five-second phases can consume fifteen seconds despite a claimed five-second request limit. Reserving cleanup time and refusing to start hopeless work may be sensible under an explicit policy.

Do not send raw local monotonic timestamps to another machine: the epoch is process/host-specific. A propagated duration or protocol-defined deadline needs clear units, clock/skew handling and forwarding rules. Remote services must cooperate to stop work, and stopping observation still does not prove nonexecution.

Cancellation support is API-specific. `Promise.race` alone settles a wrapper while the losing operation can keep running, hold a socket and perform side effects. An AbortSignal conveys a request to supported operations; uncooperative work remains. Lifecycle ownership must detach listeners, release queue slots, cancel timers and terminate owned I/O where the chosen API permits it.

## Retry is a correctness decision before a latency decision

A retry needs a replayable request body, a compatible method/product contract, enough remaining budget and a policy for uncertainty. A consumed stream cannot simply be replayed by calling the same function again. An idempotency identifier can help only if the server's approved semantics actually use it with the necessary scope and retention; adding a header by itself provides no deduplication.

Retrying every timeout can amplify load on an already slow dependency. Bounded attempts, backoff and jitter spread demand, but they do not create capacity or correctness. Coordinated retries across layers can multiply: three attempts at each of three layers can yield up to 27 downstream attempts under a fully nested failure pattern. Establish who owns retries and what evidence it uses.

Retry-After expresses server guidance in a defined format. It still needs parsing, bounds and remaining-budget checks. A circuit breaker can suppress repeated attempts under a chosen policy, but open/closed state is not proof of global service health. Detailed production resilience belongs to D13; this chapter teaches the underlying network outcome model.

## Resource bounds across lifetime dimensions

Bound concurrent operations, pending queue, bytes per message, decoded bytes, per-client backlog and time. One bound cannot replace all others. A small max body still permits millions of queued requests; a connection limit can coexist with an unbounded application queue. Deadlines without cleanup can leave abandoned work accumulating after callers have gone.

In TypeScript, a result union can separate confirmed success, confirmed refusal, pre-send failure and unknown remote outcome. That is more honest than coercing everything into `failed: true`. Product reconciliation and final user wording require learner-approved policies later; a lesson must not choose those policies for a Charter.

## Worked uncertain-outcome experiment

The local server records an action immediately but withholds the response until the client closes. The client destroys its request after receiving an explicit local signal that the action occurred. Assertions then show client failure and server action can coexist. This avoids a fragile timing guess; the fixture has controlled knowledge unavailable to a real remote caller.

Counterexample: implementing a five-second wrapper with Promise.race and then retrying automatically while the first request still runs. It can create duplicate actions and hidden resource use. The correction begins with ownership and product semantics, not merely a shorter timer.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-17.mjs`, then run `node lab-17.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
let signalAction;
const actionObserved = new Promise(resolve => { signalAction = resolve; });
let actions = 0;
const server = http.createServer((req, res) => {
  actions++; req.resume(); signalAction();
  // Deliberately withhold the response; no remote-rollback claim.
});
server.listen(0, '127.0.0.1'); await once(server, 'listening');
try {
  const req = http.request({ host: '127.0.0.1', port: server.address().port,
    method: 'POST', agent: false });
  const errorSeen = new Promise(resolve => req.once('error', resolve));
  const closed = new Promise(resolve => req.once('close', resolve));
  req.end('command'); await actionObserved;
  req.destroy(new Error('caller deadline'));
  assert.equal((await errorSeen).message, 'caller deadline');
  await closed; assert.equal(actions, 1);
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
function remaining(start, total, now) { return Math.max(0, total - (now - start)); }
assert.equal(remaining(100, 500, 450), 150);
assert.equal(remaining(100, 500, 900), 0);
console.log('caller failure coexists with server action; shared budget arithmetic: ok');
```

The action is an in-memory counter in an owned process. It proves coexistence for the controlled timeline, not external durability, a real timeout race, rollback behavior or a retry system. Request destruction is explicit rather than dependent on a tiny timer.

## Hands-on exercises with expected results

1. Allocate a 1000 ms operation budget after 250 ms pool wait and 150 ms setup. Expected: at most 600 ms remains before any reserved cleanup; do not reset to 1000 ms.
2. Trace a lost response for an idempotent read and a non-deduplicated purchase. Expected: different replay safety, same possibility of incomplete observation.
3. Review a race-based timeout wrapper. Expected: identify the losing work, owner, cancellation support and cleanup; no claim that settling a Promise cancels I/O.

## Self-assessment and answer rubric

- **Does timeout prove failure remotely?** Full credit: observation ended; remote outcome depends on phase and evidence.
- **Why include pool wait?** Full credit: user-visible total latency includes local queueing.
- **Does backoff make retries correct?** Full credit: no; replayability and approved action semantics come first.
- **Why use monotonic time locally?** Full credit: elapsed budget should not jump with wall-clock adjustments; timestamps are not portable across hosts.

## Reliable references and version notes

- [Node v24 HTTP](https://nodejs.org/docs/latest-v24.x/api/http.html), client timeout/destruction and server cleanup.
- [Node v24 AbortController](https://nodejs.org/docs/latest-v24.x/api/globals.html#class-abortcontroller), cooperative signaling boundary.
- [HTTP method and retry semantics, RFC 9110 §9.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2), intended effects.
- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/), propagated deadline semantics; no SDK behavior is executed.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P03 and P06 directly challenge interruption truth; retry mechanisms are supporting knowledge. Durable deduplication, distributed transactions and production breaker policies belong to D10/D13 and are not implemented. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 16](16-rpc-envelopes-and-protocol-evolution.md) · [Next: Chapter 18](18-network-diagnostics-and-case-studies.md)
