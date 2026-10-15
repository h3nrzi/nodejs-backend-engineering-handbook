# Chapter 04 — Framing and incremental parsers

**Domain / competency:** D04 / D04-C04
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Build and review a bounded incremental framing parser; preserve correctness across arbitrary chunk boundaries; distinguish a complete frame, incomplete input and a terminal protocol violation.

Prerequisites: Chapter [03](03-tcp-delivery-and-connection-lifecycle.md), [D03 buffers](../../03-nodejs-internals/lessons/06-buffers-bytes-and-text-encoding.md), and D01 state machines. Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: boundaries must come from the protocol

A TCP data callback reports available bytes, not a sender's message. Two writes can arrive together; one write can arrive in pieces. Parsing `JSON.parse(chunk.toString())` therefore assumes a contract the transport does not provide. A protocol needs a boundary rule: fixed size, a delimiter with escaping, a length prefix, a self-delimiting grammar or end of connection.

Choose framing independently from serialization. JSON describes a value; a four-byte length can delimit its encoded bytes. UTF-8 text must be measured with byte length, not JavaScript string length. A delimiter protocol must define whether delimiters can occur in payloads, how escaping works, and what an incomplete trailing record means. Splitting strings before preserving a multibyte character can corrupt text even when the delimiter logic looks plausible.

## State machine and invariants

The lab uses a two-byte unsigned big-endian length and accepts payloads of at most eight bytes. The states are waiting for length, waiting for payload and terminal failure. A header can arrive one byte at a time; a chunk can complete several frames. Consumed bytes must never be interpreted twice, and the parser must make progress on every loop iteration that emits a frame. Zero-length frames need explicit handling to avoid an infinite loop.

Validate the announced length before waiting for or allocating that payload. An attacker can announce an enormous length and never send it. A maximum frame size bounds one claim, but many small frames can still cause unbounded application work. Frame count, total byte allowance, connection lifetime and downstream admission are additional dimensions. A parser that stores every parsed object in an array has merely moved the memory problem.

On EOF, an empty parser buffer can mean an orderly frame boundary. Residual header or payload bytes mean truncation. Do not silently discard them and report success. On a malformed header, fail closed for this protocol; attempting to “find the next likely header” can turn untrusted payload into commands unless resynchronization is explicitly defined.

## Worked partitions and counterexamples

For payload `abc`, the wire bytes are `00 03 61 62 63`. Valid chunkings include `[00] [03 61] [62 63]` and the entire sequence at once. Both must emit exactly one identical payload. Concatenating another frame must emit both in order. The experiment enumerates every split pattern of a small fixture, because one convenient chunk pattern is weak evidence.

A naive parser reads the length and immediately calls `subarray(2, 2+n)`. If only one payload byte arrived, it may emit a shorter value and interpret later bytes as a new header. A second naive parser checks availability but forgets to remove the header after consuming a payload, producing duplicates or an infinite loop. State and progress invariants expose both defects.

The simple implementation repeatedly concatenates the retained tail. It is intentionally readable, not a high-throughput parser. With larger allowed records and one-byte chunks, repeated copying can cost quadratic work. A production parser might use bounded segment queues and offsets, but that choice needs complexity, ownership and workload review. Return Buffer views only under an explicit lifetime agreement; otherwise later mutation or retention can surprise consumers.

## Backend applications and troubleshooting

Import feeds, device gateways and RPC envelopes all need honest partial-input handling. The same principle applies inside HTTP bodies: a transport chunk is neither a JSON record nor a multipart boundary. Keep framing errors separate from valid frames containing invalid domain values. In TypeScript, represent those stages separately: bytes → framed bytes → decoded value → runtime-validated command.

When symptoms include sporadic JSON failures under load, capture sanitized byte counts and parser state around boundaries. Logging full payloads can expose data and alter timing. Reproduce with deliberate partitions before blaming packet loss: TCP normally repairs loss before delivering ordered bytes, while an application framing bug remains visible.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-04.mjs`, then run `node lab-04.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
function parser() {
  let rest = Buffer.alloc(0), failed = false;
  return {
    push(chunk) {
      if (failed) throw new Error('terminal');
      rest = Buffer.concat([rest, chunk]);
      const out = [];
      while (rest.length >= 2) {
        const n = rest.readUInt16BE(0);
        if (n > 8) { failed = true; throw new Error('oversize'); }
        if (rest.length < 2 + n) break;
        out.push(Buffer.from(rest.subarray(2, 2 + n)));
        rest = rest.subarray(2 + n);
      }
      return out;
    },
    end() { if (failed || rest.length) throw new Error('incomplete or failed'); }
  };
}
const wire = Buffer.from([0, 2, 65, 66, 0, 0]);
for (let mask = 0; mask < 2 ** (wire.length - 1); mask++) {
  const p = parser(), result = []; let start = 0;
  for (let i = 1; i <= wire.length; i++) {
    if (i === wire.length || (mask & (1 << (i - 1)))) {
      result.push(...p.push(wire.subarray(start, i))); start = i;
    }
  }
  p.end();
  assert.deepEqual(result.map(x => x.toString()), ['AB', '']);
}
const oversized = parser();
assert.throws(() => oversized.push(Buffer.from([0, 9])), /oversize/);
assert.throws(() => oversized.push(Buffer.alloc(0)), /terminal/);
const truncated = parser(); truncated.push(Buffer.from([0, 2, 65]));
assert.throws(() => truncated.end(), /incomplete/);
console.log('32 chunk partitions, empty frame, oversize and truncation: ok');
```

This finite parser returns at most the frames present in each caller-provided chunk. It assumes the caller also bounds input chunks and admitted output. It is not a complete hostile-network server, does not implement downstream pressure, and deliberately uses small limits.

## Hands-on exercises with expected results

1. Add a fixture with a three-byte UTF-8 character and calculate its length prefix from bytes. Expected: every partition reconstructs identical bytes before text decoding.
2. Describe how to bound total frames and pause admission while a consumer is busy. Expected: a per-frame maximum alone is insufficient; include terminal cleanup.
3. Trace EOF after one header byte and EOF after one full frame plus a partial second frame. Expected: distinguish emitted complete data from failure of the overall exchange; no silent success.

## Self-assessment and answer rubric

- **Why test every partition?** Full credit: transport boundaries are arbitrary; finite exhaustive testing covers the fixture, not every possible input.
- **Why reject length before allocation?** Full credit: untrusted size is a resource claim; waiting and allocation both have costs.
- **Is this parser production-ready?** Full credit: identify copying complexity, aggregate admission, timeouts and schema validation as separate responsibilities.

## Reliable references and version notes

- [Node v24 Buffer](https://nodejs.org/docs/latest-v24.x/api/buffer.html), byte lengths, endianness and view/copy behavior.
- [Node v24 net](https://nodejs.org/docs/latest-v24.x/api/net.html), stream delivery contract.
- [JSON text sequences, RFC 7464](https://www.rfc-editor.org/rfc/rfc7464.html), an alternative framing design and its recovery rules.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P02 directly challenges incomplete and malformed partner messages. A future implementation may choose a standard protocol rather than this educational envelope. Binary parser optimization and fuzzing campaigns are unverified. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 03](03-tcp-delivery-and-connection-lifecycle.md) · [Next: Chapter 05](05-udp-loss-and-path-mtu.md)
