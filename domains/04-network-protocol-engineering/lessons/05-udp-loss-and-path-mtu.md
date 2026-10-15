# Chapter 05 — UDP, loss and path MTU

**Domain / competency:** D04 / D04-C05
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Explain datagram boundaries, loss, duplication and reordering; relate payload size to path MTU; design bounded acceptance and loss accounting without accidentally promising reliable or exactly-once delivery.

Prerequisites: Chapters [01](01-network-paths-and-addressing.md), [03](03-tcp-delivery-and-connection-lifecycle.md) and [04](04-framing-and-incremental-parsers.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: a datagram is a unit, not a guarantee

UDP carries discrete datagrams between endpoints. A receiver obtains each delivered datagram as a message, unlike TCP's byte stream. Delivery, uniqueness and ordering are not guaranteed. A successful send callback concerns local submission; it does not prove receipt. A datagram can disappear without a response, and apparent absence can also mean that the receiver was too slow or its socket buffer overflowed.

UDP is useful when timeliness, message boundaries or application-specific recovery matters. It is not intrinsically faster for every application. If the application adds unbounded retries, reassembly, sequencing and congestion behavior without a design, it can recreate a fragile transport. QUIC, covered later, is an example of a sophisticated protocol over UDP; UDP alone provides none of its reliability or encryption.

## Size, fragmentation and the path

An interface MTU limits the packet size that fits its link without relevant fragmentation. UDP and IP headers consume space; tunnels can add more overhead. The path MTU reflects the limiting path, which can change. Maximum UDP payload fields do not imply a safe Internet payload size.

IPv4 fragmentation can split a datagram into fragments; losing one prevents complete reassembly. IPv6 routers do not fragment transit packets; endpoint behavior and packet-too-big signaling matter. Filtering useful ICMP messages can cause black-hole symptoms, where small exchanges work and larger ones stall or disappear. Do not infer the exact MTU from one application error or hard-code 1500 as an end-to-end guarantee.

Avoiding fragmentation requires path-aware sizing or a conservative, qualified application limit. Packetization-layer MTU discovery uses acknowledgments/probes at a layer that can reason about delivery. A beginner's “just retry a larger datagram” loop is neither discovery nor congestion control.

## Acceptance, sequencing and bounded state

A telemetry message might contain producer identity, boot/session identity and sequence number. Sequence numbers help distinguish duplicates and apparent gaps, but a gap can later fill if reordering is allowed. A restarted producer can reuse a sequence number, so one global `lastSeen` counter can discard valid new-session data. An IP address alone is not an authenticated producer identity.

Choose a bounded window and a definition of finality. For example, a collector can report “observed unique sequence numbers 1 and 3; 2 not observed at cutoff,” rather than asserting permanent loss. Deduplication needs a scope and retention bound; storing every ID forever is not a sustainable correctness policy. D10 and D11 later address durable delivery and event processing semantics.

For commands with side effects, timeout plus retry is dangerous: the first command might have executed and only its response was lost. Authentication, anti-replay rules and reconciliation must be product decisions. D04 teaches the transport uncertainty, without prescribing a storage or delivery architecture.

## Failure modes and troubleshooting

Small datagrams can still overload a receiver by rate. Bound parsing cost and admitted work; source-address spoofing and amplification are concerns for publicly reachable UDP responders. Do not return a large response to arbitrary unauthenticated input merely to demonstrate the protocol. Multicast and broadcast have routing, membership and scope rules; they do not provide automatic discovery across arbitrary networks.

Inspect receiver counts, accepted/rejected/duplicate counts, sequence gaps, socket errors and local overload before attributing all loss to the network. A packet capture before the application can help separate arrival from application acceptance, but capture drops and offload behavior limit conclusions. Never conduct a load or amplification test against an unowned endpoint.

Counterexample: an application collects three messages `[1,3,3]` and reports “three samples, no loss.” Counting arrivals hides a duplicate and a missing sequence. An honest report separates arrivals, unique accepted messages and not-yet-observed sequences.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-05.mjs`, then run `node lab-05.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import dgram from 'node:dgram';
import { once } from 'node:events';
const receiver = dgram.createSocket('udp4');
const sender = dgram.createSocket('udp4');
receiver.bind(0, '127.0.0.1');
await once(receiver, 'listening');
try {
  const delivered = once(receiver, 'message');
  await new Promise((resolve, reject) => sender.send(Buffer.from('sample'),
    receiver.address().port, '127.0.0.1', e => e ? reject(e) : resolve()));
  const [message, peer] = await delivered;
  assert.equal(message.toString(), 'sample');
  assert.equal(peer.family, 'IPv4');
  const arrivals = [1, 3, 3];
  const unique = new Set(arrivals);
  assert.equal(arrivals.length, 3);
  assert.equal(unique.size, 2);
  assert.equal(unique.has(2), false);
} finally {
  sender.close(); receiver.close();
}
console.log('one loopback datagram; duplicate/gap accounting model: ok');
```

The actual socket exchange sends one six-byte payload. Loss, duplicates and gaps are injected as an array model; no packet loss, MTU probing, flood or network impairment is performed. A local success cannot establish UDP reliability.

## Hands-on exercises with expected results

1. Evaluate arrivals `[2,1,2,4]` at a cutoff. Expected: four arrivals, three unique values, 3 not observed; reordering exists, permanent loss is not established.
2. Explain why a 1400-byte application payload can fail through a tunnel even if it works directly. Expected: path overhead and path MTU, without guessing a universal safe size.
3. Specify bounded deduplication scope for two producers that restart. Expected: producer/session identity, window/expiry and treatment of too-old messages, with limitations.

## Self-assessment and answer rubric

- **Does UDP preserve message boundaries?** Full credit: yes for delivered datagrams, without guaranteeing delivery, order or uniqueness.
- **Why is fragmentation risky?** Full credit: all fragments are needed; additional overhead and loss exposure; distinguish IPv4 and IPv6 forwarding behavior.
- **Is a sequence gap proof of permanent loss?** Full credit: only not observed within the stated window; delayed arrival remains possible.

## Reliable references and version notes

- [UDP, RFC 768](https://www.rfc-editor.org/rfc/rfc768.html), minimal datagram contract.
- [UDP usage guidelines, RFC 8085](https://www.rfc-editor.org/rfc/rfc8085.html), application responsibilities.
- [Datagram PLPMTUD, RFC 8899](https://www.rfc-editor.org/rfc/rfc8899.html), qualified size discovery.
- [Node v24 dgram](https://nodejs.org/docs/latest-v24.x/api/dgram.html), send callbacks, message events and socket cleanup.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P05 directly challenges fresh observations and gap/duplicate reporting without mandating UDP. Actual path-MTU and impaired multi-host behavior remain unexecuted. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 04](04-framing-and-incremental-parsers.md) · [Next: Chapter 06](06-tls-identity-and-negotiation.md)
