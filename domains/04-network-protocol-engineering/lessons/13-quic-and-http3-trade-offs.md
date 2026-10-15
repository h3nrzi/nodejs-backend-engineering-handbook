# Chapter 13 — QUIC and HTTP/3 trade-offs

**Domain / competency:** D04 / D04-C13
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Explain how QUIC provides transport services over UDP and how HTTP/3 uses them; distinguish stream independence from shared congestion and compression dependencies; evaluate deployment trade-offs without assuming runtime support.

Prerequisites: Chapters [05](05-udp-loss-and-path-mtu.md), [06](06-tls-identity-and-negotiation.md) and [12](12-http2-streams-and-flow-control.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: UDP can carry a richer transport

QUIC builds reliable streams, loss recovery, flow control and protected transport state over UDP. UDP supplies datagram carriage; QUIC supplies the richer contract. HTTP/3 maps HTTP exchanges onto QUIC streams. “HTTP/3 is unreliable because UDP is unreliable” confuses the underlying carrier with the protocol layered on it.

QUIC integrates TLS 1.3 handshake mechanisms while protecting transport packets rather than carrying ordinary TLS records over a TCP byte stream. Connection IDs permit an endpoint to relate packets to connection state without relying solely on a stable address/port tuple. This enables qualified migration behavior, but does not imply every implementation accepts every path change or that all network middleboxes cooperate.

## Stream independence and remaining coupling

Reliable QUIC streams deliver ordered bytes within each stream. Missing bytes on one stream need not block delivery of available data on another solely because of a shared TCP sequence. This removes a particular transport head-of-line effect. It does not make all streams independent in every respect: congestion control, connection flow control, CPU, memory and the path remain shared resources.

HTTP/3 also has control streams and QPACK header compression. Compression dependencies can block decoding until required state arrives, subject to protocol limits. A statement that h3 “has no head-of-line blocking” is therefore too broad. Name the exact layer and dependency when comparing protocols.

A QUIC datagram extension can provide unreliable messages within a QUIC connection, but ordinary reliable streams and optional datagrams have different contracts. HTTP/3 does not silently turn normal request bodies into best-effort telemetry. WebTransport and specialized datagram uses require separate capability and security review; they are not implemented in this curriculum.

## Handshake, migration and replay trade-offs

Reduced setup round trips can help certain workloads, especially with resumption, but total time still includes discovery, endpoint availability, processing and response transfer. First contact, cache state and path conditions change the comparison. A single local benchmark cannot establish a universal h3 advantage.

Early data can be replayed under relevant resumption conditions. A payment or state-changing request must not be declared safe merely because the transport offers 0-RTT. Migration also requires path validation and resource controls; accepting a new source tuple is not an application authorization decision. Identity and permissions remain separate from connection continuity.

## Backend capability and deployment reasoning

An h3 endpoint might be at an edge intermediary while the backend speaks h2 or HTTP/1.1. In that case the application's Node process need not directly terminate QUIC. Conversely, a local `http2` server does not become h3-capable because it uses TLS. Check the exact Node distribution, documented API stability, peer support and intended deployment path before proposing direct runtime capabilities. This lesson deliberately makes no claim that a particular core QUIC API is production-stable.

Some paths block UDP or rate-limit it differently from TCP. Fallback and discovery behavior must be observed at the actual client. Alternative-service advertisements can inform clients about another endpoint; they do not prove the endpoint reachable or trustworthy under every path. A backend diagnostic should report negotiated protocol and hop provenance instead of equating a browser badge with the upstream protocol.

## Worked loss model and counterexamples

The lab models two reliable streams with bytes at offsets. Stream A is missing its first byte, while stream B has complete bytes. Independent stream delivery can release B even though A waits. When A's missing byte arrives, its contiguous prefix can advance. This is a reasoning model only: it sends no QUIC packets, performs no encryption and implements no congestion control.

Counterexample: “h3 will fix our database query latency.” Changing transport cannot remove an application computation bottleneck. Another error is describing UDP send success as QUIC stream acknowledgment; the latter requires an actual protocol implementation and acknowledgment state.

For diagnosis, compare negotiated protocol, warm/cold setup, time to response, loss conditions, client CPU and fallback outcomes. If only one environment benefits, report the conditions. D12 owns sustained performance evaluation and D15 owns deployment design; D04 teaches the dependency model needed to ask useful questions.

## Trace packet loss without claiming complete stream independence

QUIC packet numbers identify packet transmissions within packet-number spaces; stream offsets identify positions in reliable stream data. A packet can carry frames from several streams. If one is lost, affected stream data can be transmitted again in newly numbered packets; QUIC does not simply retransmit the same TCP-like packet number. Available bytes on another stream can be delivered independently of the missing stream offset, while congestion loss response still affects sending on the shared path. [RFC 9002](https://www.rfc-editor.org/rfc/rfc9002.html) specifies loss detection/congestion behavior separately from RFC 9000's transport model.

Connection receive allowance and per-stream receive allowance also differ. MAX_DATA accounts for connection-wide stream data, MAX_STREAM_DATA for a particular stream, and MAX_STREAMS limits stream creation. Extra streams cannot bypass an exhausted connection allowance. Resetting a stream does not mean all final-size/connection accounting disappears; a receiver must still enforce the protocol's accounting rules.

### Handshake and migration impose their own boundaries

Before validating a client's address, a server's anti-amplification limit restricts sending to three times the bytes received under the specified conditions. A server can therefore be blocked during handshake for reasons unrelated to an application body window. QUIC Initial datagram sizing and path validation have explicit requirements; a successful tiny UDP echo cannot qualify them.

A connection ID permits identifying connection state after a path change. PATH_CHALLENGE/PATH_RESPONSE validate reachability of a new path; migration may require revised path congestion/MTU knowledge and can be disabled or constrained. A NAT rebinding observation is not proof that arbitrary migration succeeded. QUIC version negotiation, TLS handshake success and HTTP/3 SETTINGS/control-stream validity establish different stages.

QPACK can block a header section whose required dynamic-table insertions have not arrived. Limits on blocked streams constrain that dependency; zero dynamic-table usage can trade compression efficiency for fewer such dependencies. Reliable request streams, critical control streams and optional DATAGRAM extensions must not be conflated.

**Advanced paper lab:** annotate two lost packets, stream-offset gaps, one QPACK-blocked header and a migration attempt. Predict which delivery can proceed and which is blocked, naming the layer each time. Full credit distinguishes per-stream ordering, shared congestion, flow credit, header decoding and path validation. The retained JavaScript model establishes none of these on a real QUIC transport. On this session's Node build no native h3 endpoint/client is exercised; adding a flag or installing a package would require a separately qualified experiment. No practical h3 capability is certified here.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-13.mjs`, then run `node lab-13.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
function contiguous(parts) {
  let offset = 0, result = '';
  while (parts.has(offset)) { result += parts.get(offset); offset++; }
  return result;
}
const a = new Map([[1, 'b']]);
const b = new Map([[0, 'x'], [1, 'y']]);
assert.equal(contiguous(a), '');
assert.equal(contiguous(b), 'xy');
a.set(0, 'a');
assert.equal(contiguous(a), 'ab');
const sharedBudget = { available: 0 };
assert.equal(sharedBudget.available > 0, false);
console.log('model only: independent stream ordering; shared budget can still stall: ok');
```

The function models single-byte offsets over two finite streams. The shared-budget assertion only illustrates a separate dependency. It is not QUIC, HTTP/3, QPACK, retransmission or an empirical latency experiment.

## Hands-on exercises with expected results

1. Draw dependencies for two h3 response streams, a connection budget and QPACK state. Expected: explain both independent stream delivery and possible remaining shared stalls.
2. Analyze “UDP blocked, h2 works.” Expected: transport reachability/fallback evidence before blaming application semantics.
3. Propose a fair optional h2/h3 comparison on an authorized future endpoint. Expected: same content and path conditions, negotiated protocol, cold/warm distinction and no universal winner claim. This comparison remains unrun.

## Self-assessment and answer rubric

- **Does QUIC inherit UDP's lack of reliable streams?** Full credit: QUIC implements reliability above UDP.
- **Does h3 remove all shared bottlenecks?** Full credit: no; distinguish stream ordering from congestion, flow and compression dependencies.
- **Does 0-RTT make retries safe?** Full credit: no; replay-sensitive operations require explicit application policy.

## Reliable references and version notes

- [QUIC transport, RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html), streams, connection IDs and migration.
- [QUIC TLS use, RFC 9001](https://www.rfc-editor.org/rfc/rfc9001.html), handshake protection and early data.
- [HTTP/3, RFC 9114](https://www.rfc-editor.org/rfc/rfc9114.html), HTTP mapping.
- [QPACK, RFC 9204](https://www.rfc-editor.org/rfc/rfc9204.html), compression dependencies.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

No genuine QUIC/h3 execution or runtime-support qualification is claimed. D04-P04 can directly challenge reported protocol capability; transport implementation details are supporting knowledge rather than required project work. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 12](12-http2-streams-and-flow-control.md) · [Next: Chapter 14](14-websocket-sessions-and-control.md)
