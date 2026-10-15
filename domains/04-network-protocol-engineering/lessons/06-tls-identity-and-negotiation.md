# Chapter 06 — TLS identity and negotiation

**Domain / competency:** D04 / D04-C06
**Editorial status:** approved_by_learner — Product Owner editorial approval recorded 2026-10-15; [approval scope](../evidence/editorial-approval.md).
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

The lab now performs real loopback certificate-authenticated handshakes and retains one synthetic `checkServerIdentity` wildcard assertion. The latter alone still tests only name matching; the handshake cases exercise the configured CA and identity validation.

## TLS versions, resumption and early data

TLS 1.3 removes many historical negotiation options and changes the handshake; compatibility with older peers and local OpenSSL configuration still matters. Avoid copying cipher lists from old tutorials. Record negotiated version and protocol rather than relying on a remembered runtime default. Trust stores differ across Node builds, flags and host integration; a certificate trusted by a browser may not be trusted by a particular Node process.

Resumption can reduce handshake work but is not the same as reusing an existing socket. TLS 1.3 early data has replay implications. An application must not assume transport encryption makes an early state-changing operation safe to replay. D09 owns comprehensive threat modeling and certificate lifecycle; D04 establishes the protocol distinction.

Mutual TLS can authenticate a client certificate at the transport boundary. It still needs mapping into application principals and authorization policy. Certificate renewal, key protection, revocation behavior and compromised credentials are operational concerns requiring explicit design. An expiration timestamp alone is not an availability monitor or a complete security audit.

## Failure investigation and backend cases

Separate TCP connect failures from TLS handshake failures and later HTTP responses. Chain failures, identity mismatch, protocol-version mismatch, unsupported ALPN and a peer that never finishes handshake need different evidence. A server can accept TCP yet fail TLS. A proxy can terminate client TLS and establish a different upstream session; protection and identity must be reasoned about for each hop.

Counterexample: setting `rejectUnauthorized:false` to “fix” a private CA deployment removes verification rather than installing the intended trust. Another dangerous replacement is `checkServerIdentity: () => undefined`, which suppresses name checks. The correction is to understand the intended identity and trust source, then validate with positive and negative cases. Do not distribute private keys in a lesson or evidence log.

In a TypeScript integration, avoid a Boolean `secure` property that conflates “TLS used,” “chain verified,” “hostname verified” and “principal authorized.” A diagnostic result can record negotiated protocol, intended identity and a qualified verification outcome, while excluding secrets and sensitive peer details.

## TLS 1.3 exchange: what each stage establishes

For a full certificate-authenticated TLS 1.3 handshake without a HelloRetryRequest or client certificate:

1. ClientHello offers versions, key share, SNI and ALPN choices. The offered name and protocol are requests, not verified results.
2. ServerHello selects handshake parameters and enables derivation of handshake traffic keys. Later handshake messages are protected; ordinary SNI visibility must not be confused with application encryption or assumed Encrypted ClientHello support.
3. EncryptedExtensions carries negotiated extensions such as ALPN; Certificate presents the chain. The client checks trust, validity, intended usage and service identity under its implementation/configuration.
4. CertificateVerify proves possession of the certificate's private key over the handshake transcript. Finished authenticates the handshake transcript with derived key material. Client Finished completes its side; application data keys protect the subsequent exchange.

A certificate match without key possession is insufficient; encryption with an untrusted peer does not establish the requested service. Resumed handshakes can omit the full certificate exchange, so this trace must not be applied mechanically to every connection. Early-data acceptance has its own replay limits. See [RFC 8446 §2](https://www.rfc-editor.org/rfc/rfc8446.html#section-2).

### Separate trust, name, negotiation and authorization experimentally

The revised lab creates a disposable CA and a signed DNS-SAN leaf with the local OpenSSL executable, binds TLS to IPv4 loopback, and requests `local.test` through SNI while connecting to its numeric address. Explicit CA trust, TLS 1.3 and ALPN `lab/1` produce a real handshake and protected application reply. The same leaf fails with `wrong.test` despite trusted signing; an empty trust list fails with the correct name. Verification remains enabled in all three cases.

The synthetic wildcard assertion is retained solely as a Node matcher check. Current service-identity guidance in RFC 9525 and a runtime's historical matching behavior are different authorities; a passing runtime case does not certify every current normative identity rule. Supplying `ca` changes the connection's trust configuration, so a test should not accidentally rely on a developer's system store. No CA is installed globally; generated private keys are removed in `finally` and never retained as evidence.

**Advanced exercise:** extend the local fixture with an expired leaf and an incompatible ALPN offer, documenting actual client/server events. Full credit predicts which validation stage can fail and does not expect the name-check callback to run after a chain failure. Distinguish no negotiated ALPN from selecting a protocol the caller implements; exact failure behavior is API/configuration-specific. These extra cases, mTLS, revocation and resumption remain unexecuted. The current lab requires OpenSSL with `req -addext`, EC key generation and `x509 -extfile` support; no portfolio technology choice follows.

## Practical Node.js example — bounded educational lab

Save the following complete program as `lab-06.mjs`, then run `node lab-06.mjs`. It uses ESM, built-in Node modules and an external OpenSSL CLI to generate disposable certificates. Run `openssl version` first; the exercised CLI was OpenSSL 3.6.3. It is an educational experiment, not portfolio implementation.

```javascript
import assert from 'node:assert/strict';
import tls from 'node:tls';
import { once } from 'node:events';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const dir = await mkdtemp(path.join(tmpdir(), 'd04-tls-'));
const sockets = new Set(); let server;
function openssl(args) {
  execFileSync('openssl', args, { cwd: dir, stdio: 'pipe', timeout: 2000 });
}
try {
  // Disposable keys only. Never reuse this test CA or trust it system-wide.
  openssl(['req', '-x509', '-newkey', 'ec', '-pkeyopt', 'ec_paramgen_curve:P-256',
    '-nodes', '-keyout', 'ca.key', '-out', 'ca.pem', '-days', '2', '-subj', '/CN=D04 Lab CA',
    '-addext', 'basicConstraints=critical,CA:TRUE', '-addext', 'keyUsage=critical,keyCertSign,cRLSign']);
  openssl(['req', '-new', '-newkey', 'ec', '-pkeyopt', 'ec_paramgen_curve:P-256',
    '-nodes', '-keyout', 'leaf.key', '-out', 'leaf.csr', '-subj', '/CN=local.test']);
  await writeFile(path.join(dir, 'leaf.ext'),
    'subjectAltName=DNS:local.test\nbasicConstraints=critical,CA:FALSE\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth\n');
  openssl(['x509', '-req', '-in', 'leaf.csr', '-CA', 'ca.pem', '-CAkey', 'ca.key',
    '-set_serial', '2', '-out', 'leaf.pem', '-days', '2', '-extfile', 'leaf.ext']);
  const ca = await readFile(path.join(dir, 'ca.pem'));
  server = tls.createServer({ key: await readFile(path.join(dir, 'leaf.key')),
    cert: await readFile(path.join(dir, 'leaf.pem')), minVersion: 'TLSv1.3',
    maxVersion: 'TLSv1.3', ALPNProtocols: ['lab/1'] }, socket => {
    sockets.add(socket); socket.on('close', () => sockets.delete(socket));
    socket.on('error', () => {}); socket.end('verified peer');
  });
  server.on('tlsClientError', () => {}); // Negative client cases intentionally fail TLS.
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  async function connect(servername, trust) {
    const socket = tls.connect({ host: '127.0.0.1', port: server.address().port,
      servername, ca: trust, rejectUnauthorized: true, minVersion: 'TLSv1.3',
      maxVersion: 'TLSv1.3', ALPNProtocols: ['lab/1'] });
    try {
      await once(socket, 'secureConnect');
      assert.equal(socket.authorized, true);
      assert.equal(socket.alpnProtocol, 'lab/1'); assert.equal(socket.getProtocol(), 'TLSv1.3');
      let body = ''; for await (const chunk of socket) body += chunk;
      assert.equal(body, 'verified peer');
    } finally { socket.destroy(); }
  }
  await connect('local.test', ca);
  await assert.rejects(connect('wrong.test', ca), { code: 'ERR_TLS_CERT_ALTNAME_INVALID' });
  await assert.rejects(connect('local.test', []), error =>
    ['UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'].includes(error.code));
  assert.equal(tls.checkServerIdentity('a.b.example.test',
    { subjectaltname: 'DNS:*.example.test' }).code, 'ERR_TLS_CERT_ALTNAME_INVALID');
} finally {
  for (const socket of sockets) socket.destroy();
  if (server?.listening) await new Promise(resolve => server.close(resolve));
  await rm(dir, { recursive: true, force: true });
}
console.log('TLS1.3 + ALPN; trusted CA success; wrong name and untrusted CA refused: ok');
```

Three actual TLS connection attempts run: a verified CA/name/ALPN success, a trusted-chain name mismatch and a correct-name untrusted-chain refusal. The separate wildcard assertion tests only name matching. Failure codes are qualified to the recorded runtime; no certificate provider or deployed endpoint is qualified.

## Hands-on exercises with expected results

1. Draw the four values for connecting to an IP while requesting `api.example.test`: network endpoint, expected identity, SNI and HTTP authority. Expected: explain each purpose and preserve the expected identity.
2. Replay the local CA exercise and explain the positive handshake and the two distinct refusal boundaries before inspecting the assertions. Expected: trust and intended identity are independent; verification stays enabled. Extend with expiration only as a separately recorded experiment.
3. Diagnose “TCP connects but TLS hangs.” Expected: inspect handshake phase/deadline and protocol endpoint before changing HTTP body timeout.

## Self-assessment and answer rubric

- **Is hostname matching full certificate validation?** Full credit: no; chain, validity and handshake possession remain separate.
- **Does ALPN authorize a request?** Full credit: no, it selects protocol; application authorization remains required.
- **Why can browser success coexist with Node trust failure?** Full credit: different trust configuration/build/runtime path; compare actual configuration without disabling checks.

## Reliable references and version notes

- [TLS 1.3, RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html), handshake and early-data model.
- [Service identity, RFC 9525](https://www.rfc-editor.org/rfc/rfc9525.html), updated identity guidance superseding RFC 6125; distinguish current guidance from runtime implementation details.
- [ALPN, RFC 7301](https://www.rfc-editor.org/rfc/rfc7301.html), protocol negotiation.
- [OpenSSL req](https://docs.openssl.org/3.6/man1/openssl-req/) and [x509](https://docs.openssl.org/3.6/man1/openssl-x509/), disposable certificate generation only.
- [Node v24 TLS](https://nodejs.org/docs/latest-v24.x/api/tls.html), `servername`, `authorized`, trust configuration and `checkServerIdentity`.

Node API references use the v24 documentation line. Exact local execution environment, command, output and limitations are in [the execution record](../evidence/educational-execution.md). The canonical command `node scripts/check-d04.mjs` extracts and executes the single JavaScript lab from each lesson; prose exercises and TypeScript modeling tasks are not thereby tested. JavaScript is used so networking behavior is observable without a compiler. TypeScript cannot validate network bytes by annotation: keep input `unknown` or bytes until runtime validation, then narrow into explicit protocol states. No TypeScript compiler checks are claimed.

## Coverage gaps and review checklist

D04-P01 and P04 directly challenge scoped identity/negotiation reports. Local CA/name handshakes are exercised; certificate renewal, mTLS authorization, expiration/refusal variants and early-data interoperability remain unverified; security policy belongs to D09. See [the coverage matrix](../../../projects/coverage-matrix.md#d04--approved-editorial-coverage) for direct versus supporting project relevance. Example execution proves only its recorded assertions; editorial review, learner competence and portfolio delivery remain separate.

[Previous: Chapter 05](05-udp-loss-and-path-mtu.md) · [Next: Chapter 07](07-http-semantics-and-representations.md)
