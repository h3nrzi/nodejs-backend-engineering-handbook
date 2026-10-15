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

The lab uses a two-byte unsigned big-endian length and accepts payloads of at most eight bytes. Within the open state it waits for a length or payload; clean EOF and protocol failure are separate terminal states. A header can arrive one byte at a time; a chunk can complete several frames. Consumed bytes must never be interpreted twice, and the parser must make progress on every loop iteration that emits a frame. Zero-length frames need explicit handling to avoid an infinite loop.

Validate the announced length before waiting for or allocating that payload. An attacker can announce an enormous length and never send it. A maximum frame size bounds one claim, but many small frames can still cause unbounded application work. Frame count, total byte allowance, connection lifetime and downstream admission are additional dimensions. A parser that stores every parsed object in an array has merely moved the memory problem.

On EOF, an empty parser buffer can mean an orderly frame boundary. Residual header or payload bytes mean truncation. Do not silently discard them and report success. On a malformed header, fail closed for this protocol; attempting to “find the next likely header” can turn untrusted payload into commands unless resynchronization is explicitly defined.

## Worked partitions and counterexamples

For payload `abc`, the wire bytes are `00 03 61 62 63`. Valid chunkings include `[00] [03 61] [62 63]` and the entire sequence at once. Both must emit exactly one identical payload. Concatenating another frame must emit both in order. The experiment enumerates every split pattern of two small fixtures, because one convenient chunk pattern is weak evidence.

A naive parser reads the length and immediately calls `subarray(2, 2+n)`. If only one payload byte arrived, it may emit a shorter value and interpret later bytes as a new header. A second naive parser checks availability but forgets to remove the header after consuming a payload, producing duplicates or an infinite loop. State and progress invariants expose both defects.

The simple implementation repeatedly concatenates the retained tail. It is intentionally readable, not a high-throughput parser. With larger allowed records and one-byte chunks, repeated copying can cost quadratic work. A production parser might use bounded segment queues and offsets, but that choice needs complexity, ownership and workload review. Return Buffer views only under an explicit lifetime agreement; otherwise later mutation or retention can surprise consumers.

## Backend applications and troubleshooting

Import feeds, device gateways and RPC envelopes all need honest partial-input handling. The same principle applies inside HTTP bodies: a transport chunk is neither a JSON record nor a multipart boundary. Keep framing errors separate from valid frames containing invalid domain values. In TypeScript, represent those stages separately: bytes → framed bytes → decoded value → runtime-validated command.

When symptoms include sporadic JSON failures under load, capture sanitized byte counts and parser state around boundaries. Logging full payloads can expose data and alter timing. Reproduce with deliberate partitions before blaming packet loss: TCP normally repairs loss before delivering ordered bytes, while an application framing bug remains visible.

## Byte-by-byte trace and terminal-state correction

For `00 03 e2 82 ac 00 00`, the first header announces three **bytes**, the UTF-8 encoding of `€`; the second header announces an empty frame. Trace deliveries `[00] [03 e2] [82] [ac 00] [00]`:

| Delivery | Retained state | Emission |
|---|---|---|
| `00` | One header byte | None |
| `03 e2` | Complete header, one of three payload bytes | None |
| `82` | Two of three payload bytes | None |
| `ac 00` | First frame complete; one next-header byte | `e2 82 ac` |
| `00` | Empty frame complete, no residual bytes | Empty payload |

Decode text only after the frame's byte boundary is known, or maintain an explicitly stateful decoder where the protocol is text-based. Concatenating `chunk.toString()` results cannot recover a character already replaced during independent decoding. A copied output Buffer owns its bytes; a view can retain a much larger input allocation or expose mutations.

The original parser threw on incomplete EOF but still accepted a later `push`, and accepted data after clean EOF. The revised parser makes both `ended` and `failed` terminal. This is a stream-lifetime contract: input after EOF cannot silently reopen an exchange. An incomplete second frame can coexist with an earlier emitted frame; the caller must preserve both partial progress and whole-exchange failure rather than treating the list of emitted records as a success certificate.

Partition invariance here covers complete valid input. On invalid input, this batch-returning API can throw after parsing a complete frame in the same push, before returning that batch; with a different partition the earlier frame may already have been returned. A protocol requiring identical partial-result visibility on failure needs an explicit delivery/transaction contract, such as frame-by-frame emission or staging until whole-exchange validation. Do not claim the finite valid-fixture property proves that stronger behavior.

### Bounds must include work and retention

The teaching parser now limits one input chunk to 64 bytes, one payload to eight bytes and one push to sixteen frames. These are fixture contracts, not suggested TCP chunk limits for a real service. A network adapter would need bounded slicing/admission; it must not reject a valid protocol exchange merely because the OS combined several frames into one larger data callback. Copying the retained tail repeatedly remains inefficient under large frame limits. The finite tests establish output agreement for two fixtures, not complexity bounds for all workloads or protocol conformance.

**Advanced exercise:** extend the fixtures with an eight-byte payload, empty input between deliveries, EOF at every byte offset and two complete frames followed by a partial header. Expected: complete boundaries end cleanly; all other EOFs fail; every terminal state rejects subsequent input. Explain the expected count of partitions, `2^(n−1)` for n nonempty bytes, and why random timing on TCP cannot force those exact callback boundaries. Full credit also bounds retained bytes and emitted work independently. The current lab executes 32 + 1024 = 1056 partitions.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-04.mjs`, then run `node lab-04.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
function parser() {
  let rest = Buffer.alloc(0), state = 'open';
  return {
    push(chunk) {
      if (state !== 'open') throw new Error('terminal');
      if (chunk.length > 64) { state = 'failed'; throw new Error('input bound'); }
      rest = Buffer.concat([rest, chunk]);
      const out = [];
      while (rest.length >= 2) {
        const n = rest.readUInt16BE(0);
        if (n > 8) { state = 'failed'; throw new Error('oversize'); }
        if (rest.length < 2 + n) break;
        if (out.length === 16) { state = 'failed'; throw new Error('output bound'); }
        out.push(Buffer.from(rest.subarray(2, 2 + n)));
        rest = rest.subarray(2 + n);
      }
      return out;
    },
    end() {
      if (state !== 'open') throw new Error('terminal');
      state = rest.length ? 'failed' : 'ended';
      if (rest.length) throw new Error('incomplete');
    }
  };
}
const fixtures = [
  { wire: Buffer.from([0, 2, 65, 66, 0, 0]), values: ['AB', ''] },
  { wire: Buffer.from([0, 3, 0xe2, 0x82, 0xac, 0, 2, 65, 66, 0, 0]),
    values: ['€', 'AB', ''] }
];
let partitions = 0;
for (const { wire, values } of fixtures) {
  for (let mask = 0; mask < 2 ** (wire.length - 1); mask++) {
    const p = parser(), result = []; let start = 0;
    result.push(...p.push(Buffer.alloc(0)));
    for (let i = 1; i <= wire.length; i++) {
      if (i === wire.length || (mask & (1 << (i - 1)))) {
        result.push(...p.push(wire.subarray(start, i))); start = i;
      }
    }
    p.end(); assert.deepEqual(result.map(x => x.toString()), values);
    assert.throws(() => p.push(Buffer.alloc(0)), /terminal/); partitions++;
  }
}
for (const prefix of [[0], [0, 2, 65], [0, 0, 0]]) {
  const p = parser(); p.push(Buffer.from(prefix));
  assert.throws(() => p.end(), /incomplete/);
  assert.throws(() => p.push(Buffer.from([0])), /terminal/);
}
const oversized = parser();
assert.throws(() => oversized.push(Buffer.from([0, 9])), /oversize/);
assert.throws(() => oversized.push(Buffer.alloc(0)), /terminal/);
assert.throws(() => parser().push(Buffer.alloc(65)), /input bound/);
assert.throws(() => parser().push(Buffer.alloc(34)), /output bound/);
assert.equal(partitions, 1056);
console.log('1056 partitions; UTF-8, empty frames, bounds, EOF and terminal states: ok');
```

This finite parser enforces small per-push input/output limits as well as per-frame length. Its caller must also bound aggregate admitted work and connection lifetime. It is not a complete hostile-network server, does not implement downstream pressure, and deliberately uses small limits.

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
