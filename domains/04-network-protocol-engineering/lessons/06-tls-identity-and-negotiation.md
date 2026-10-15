# Chapter 06 — TLS identity and negotiation

**Domain / competency:** D04 / D04-C06
**Editorial status:** in_review — authored 2026-10-15; no learner approval recorded.
**Learner assessment / portfolio implementation:** not_assessed / not_started.

## Outcomes and prerequisites

Separate encryption, service identity and authorization; reason about trust chains, hostname verification, SNI and ALPN; diagnose handshake failures while preserving verification.

Prerequisites: Chapters [02](02-dns-and-service-discovery.md)–[03](03-tcp-delivery-and-connection-lifecycle.md). Read [the curriculum](../curriculum.md) for the full dependency map.

## First principles: secrecy requires knowing the peer

TLS protects transport content against observation and modification under its security assumptions. A server certificate binds identity claims to a public key through a trust model; the handshake proves possession of relevant key material and derives traffic keys. Encryption with an unverified peer can protect bytes while delivering them to the wrong party. Application authorization remains separate: an authenticated service or client is not automatically allowed every action.

A normal server-authenticated exchange verifies the certificate chain against configured trust, checks validity and matches the expected service identity. These checks answer different questions. A trusted certificate for another hostname is still wrong for this connection. A hostname match alone says nothing about chain trust or expiration.

## Names, SNI and ALPN

The network address selects where to connect. The expected hostname selects which identity to verify. SNI conveys a hostname during handshake so a multi-tenant endpoint can choose a certificate. ALPN negotiates an application protocol such as `h2` or `http/1.1`. HTTP authority then identifies the requested origin at the message layer. None is interchangeable with an arbitrary user-supplied header.

For raw `tls.connect`, supply the intended DNS `servername` when appropriate; do not assume every wrapper has HTTPS's convenience behavior. When connecting to an IP while expecting a DNS identity, preserve that intended name explicitly. Sending SNI does not itself prove authorization. The negotiated ALPN value must match the protocol the caller actually speaks; writing HTTP/1.1 bytes onto an h2 connection is a protocol failure.

The lab calls `checkServerIdentity` with a synthetic certificate object. This tests only identity-matching behavior. It deliberately does not claim to validate a real certificate chain, signature, time validity, key possession or handshake.

## TLS versions, resumption and early data

TLS 1.3 removes many historical negotiation options and changes the handshake; compatibility with older peers and local OpenSSL configuration still matters. Avoid copying cipher lists from old tutorials. Record negotiated version and protocol rather than relying on a remembered runtime default. Trust stores differ across Node builds, flags and host integration; a certificate trusted by a browser may not be trusted by a particular Node process.

Resumption can reduce handshake work but is not the same as reusing an existing socket. TLS 1.3 early data has replay implications. An application must not assume transport encryption makes an early state-changing operation safe to replay. D09 owns comprehensive threat modeling and certificate lifecycle; D04 establishes the protocol distinction.

Mutual TLS can authenticate a client certificate at the transport boundary. It still needs mapping into application principals and authorization policy. Certificate renewal, key protection, revocation behavior and compromised credentials are operational concerns requiring explicit design. An expiration timestamp alone is not an availability monitor or a complete security audit.

## Failure investigation and backend cases

Separate TCP connect failures from TLS handshake failures and later HTTP responses. Chain failures, identity mismatch, protocol-version mismatch, unsupported ALPN and a peer that never finishes handshake need different evidence. A server can accept TCP yet fail TLS. A proxy can terminate client TLS and establish a different upstream session; protection and identity must be reasoned about for each hop.

Counterexample: setting `rejectUnauthorized:false` to “fix” a private CA deployment removes verification rather than installing the intended trust. Another dangerous replacement is `checkServerIdentity: () => undefined`, which suppresses name checks. The correction is to understand the intended identity and trust source, then validate with positive and negative cases. Do not distribute private keys in a lesson or evidence log.

In a TypeScript integration, avoid a Boolean `secure` property that conflates “TLS used,” “chain verified,” “hostname verified” and “principal authorized.” A diagnostic result can record negotiated protocol, intended identity and a qualified verification outcome, while excluding secrets and sensitive peer details.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-06.mjs`, then run `node lab-06.mjs`. It uses ESM and built-in modules only. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import { checkServerIdentity } from 'node:tls';
const cert = { subjectaltname: 'DNS:api.example.test' };
assert.equal(checkServerIdentity('api.example.test', cert), undefined);
const mismatch = checkServerIdentity('other.example.test', cert);
assert.ok(mismatch instanceof Error);
assert.equal(mismatch.code, 'ERR_TLS_CERT_ALTNAME_INVALID');
const wildcard = { subjectaltname: 'DNS:*.example.test' };
assert.equal(checkServerIdentity('api.example.test', wildcard), undefined);
assert.ok(checkServerIdentity('a.b.example.test', wildcard) instanceof Error);
console.log('synthetic certificate hostname matches and mismatches: ok');
```

All inputs are synthetic and no handshake occurs. The wildcard case teaches that a single-label wildcard is not an arbitrary-depth suffix rule. The exact Node error code is version-qualified; this experiment cannot qualify a certificate provider or deployed endpoint.

## Hands-on exercises with expected results

1. Draw the four values for connecting to an IP while requesting `api.example.test`: network endpoint, expected identity, SNI and HTTP authority. Expected: explain each purpose and preserve the expected identity.
2. Plan an optional local CA exercise with a valid name, a mismatched name and an untrusted CA. Expected: positive success and separate negative failures while verification stays enabled. This handshake exercise is not executed here.
3. Diagnose “TCP connects but TLS hangs.” Expected: inspect handshake phase/deadline and protocol endpoint before changing HTTP body timeout.

## Self-assessment and answer rubric

- **Is hostname matching full certificate validation?** Full credit: no; chain, validity and handshake possession remain separate.
- **Does ALPN authorize a request?** Full credit: no, it selects protocol; application authorization remains required.
- **Why can browser success coexist with Node trust failure?** Full credit: different trust configuration/build/runtime path; compare actual configuration without disabling checks.

## Reliable references and version notes

- [TLS 1.3, RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html), handshake and early-data model.
- [Service identity, RFC 9525](https://www.rfc-editor.org/rfc/rfc9525.html), updated identity guidance superseding RFC 6125; distinguish current guidance from runtime implementation details.
- [ALPN, RFC 7301](https://www.rfc-editor.org/rfc/rfc7301.html), protocol negotiation.
- [Node v24 TLS](https://nodejs.org/docs/latest-v24.x/api/tls.html), `servername`, `authorized`, trust configuration and `checkServerIdentity`.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P01 and P04 directly challenge scoped identity/negotiation reports. Real TLS handshakes, certificate renewal, mTLS authorization and early-data interoperability are unverified; security policy belongs to D09. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--proposed-coverage-pending-learner-review) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 05](05-udp-loss-and-path-mtu.md) · [Next: Chapter 07](07-http-semantics-and-representations.md)
