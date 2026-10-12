# Chapter 07 — Filesystem I/O and Resource Ownership

**Domain:** D03 — Node.js Internals  
**Competency:** D03-C07  
**Editorial status:** in_review — authored, awaiting learner approval.  
**Prerequisite review:** learner explicitly approved Chapter 06 on 2026-10-12.  
**Educational execution:** Section 13 records executed fixtures and their limits.  
**Assessment / project implementation:** deferred / not_started.

## 1. Outcomes and prerequisites

Choose a filesystem API from its timing and ownership contract, track valid byte ranges and file positions, release handles on success and failure, and account for incomplete operations. Distinguish paths from opened resources, recognize concurrent-mutation and check/use races, and explain the limits of cancellation, watching and durability evidence.

Prerequisites: [Chapter 03 — I/O lifecycle](03-event-loop-and-io-lifecycle.md), [Chapter 06 — Buffers and encoding](06-buffers-bytes-and-text-encoding.md), and D01 [filesystem foundations](../../01-computer-science-foundations/lessons/09-file-systems-and-io.md). Streams follow in Chapters 08–09; native work contention in 10; shutdown in 16. This chapter's temporary-file experiments are educational, not project implementations or a storage architecture decision.

## 2. The operation has several boundaries

A **path** names a location through filesystem lookup. An **open handle** represents access to a resource obtained by an open operation. A **file descriptor** is the process-level identifier behind that access; a FileHandle object exposes Promise-based operations and lifecycle methods. The path and the opened resource need not remain equivalent after another actor changes the directory entry.

Track submission, native operation, observed completion, validation and resource release separately. A fulfilled read Promise supplies an operation result; the application still needs to use only valid bytes and interpret them correctly. A fulfilled write identifies an observed I/O outcome, not an automatic proof of a durable business transaction.

The callback APIs report their result through a callback; Promise APIs settle a Promise; synchronous APIs return or throw while occupying the calling JavaScript execution. Async filesystem operations are performed through native facilities, commonly the Node thread pool, but neither asynchronous syntax nor awaiting one call creates a global ordering rule for every file operation. The [official filesystem reference](https://github.com/nodejs/node/blob/main/doc/api/fs.md) explicitly warns that concurrent modifications are not automatically synchronized.

## 3. API choice and ownership

| API style | Useful property | Responsibility that remains |
|---|---|---|
| Callback `fs.readFile` | Integrates with callback contracts | Handle the error argument and avoid assuming registration-time try/catch catches later work. |
| Promise `fs/promises.readFile` | Expresses one outcome with await/try/catch | Bound input/memory and handle failure; no automatic cancellation of unrelated work. |
| `readFileSync` | Result is available before the call returns | It blocks execution during the call; unsuitable for assuming responsive request processing. |
| FileHandle read/write | Controls ranges and explicit resource lifetime | Track counts, positions, byte ownership and closure. |
| Stream APIs | Compose incremental consumption | Pressure, errors and cleanup require the next chapters' contracts. |

Whole-file helpers are convenient for genuinely bounded inputs. Their name does not impose a memory limit, and a large Buffer still needs decoding and processing. A tiny synchronous test cannot establish that synchronous file access is harmless under a workload. Conversely, an asynchronous read does not make a large synchronous parser parallel.

A helper that opens its own resource generally owns its cleanup according to its API contract. When the application explicitly opens a FileHandle, it should explicitly arrange closure. Do not rely on eventual garbage collection as resource management. A caller-owned descriptor or handle passed to another API needs its own documented ownership agreement; convenience does not transfer ownership silently.

## 4. Example A — outcomes across API styles and pre-abort

Save as `api-styles.mjs`. Run callback, promise and sync with either existing or missing as the second argument. Run abort without a second argument. Every invocation uses its own temporary directory and removes it in finally.

```javascript
import { readFile as callbackRead, readFileSync } from 'node:fs';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const mode = process.argv[2];
if (!['callback', 'promise', 'sync', 'abort'].includes(mode)) throw new Error('invalid mode');
const directory = await mkdtemp(join(tmpdir(), 'd03-api-'));
try {
  const file = join(directory, 'input.txt');
  await writeFile(file, 'A€Z');
  const target = process.argv[3] === 'missing' ? join(directory, 'absent.txt') : file;
  let bytes;
  if (mode === 'callback') {
    bytes = await new Promise((resolve, reject) => {
      callbackRead(target, (error, value) => error ? reject(error) : resolve(value));
    });
  } else if (mode === 'sync') bytes = readFileSync(target);
  else if (mode === 'abort') {
    const controller = new AbortController();
    controller.abort();
    bytes = await readFile(file, { signal: controller.signal });
  } else bytes = await readFile(target);
  console.log('result', bytes.length, bytes.toString('utf8'));
} catch (error) {
  if (mode === 'abort' && error.name === 'AbortError') console.log('pre-aborted', error.name);
  else if (error.code === 'ENOENT') {
    console.log('missing', error.code);
    process.exitCode = 1;
  } else throw error;
} finally {
  await rm(directory, { recursive: true, force: true });
  console.log('temporary-files-removed');
}
```

Each existing-file mode observes five bytes representing A€Z. Missing-file modes deliberately exit nonzero with ENOENT and still remove the temporary directory. Abort mode catches AbortError from an already-aborted signal. It verifies a specific pre-abort path, not cancellation halfway through an OS request or reversal of a write.

The wrapper around callbackRead exposes a Promise for this example without changing the filesystem operation itself. The common result value does not make the three API styles equivalent in scheduling. Their calling/error boundaries are different, even when the file content matches.

## 5. File positions, valid counts and concurrent mutation

For a buffer read, offset names a location in the destination Buffer; position names a location in the file. Keep those coordinate systems separate. A non-negative explicit read position leaves the handle's current file position unchanged; null uses and advances that current position. Do not issue competing position-dependent operations and assume await in some other part of the program orders them.

`bytesRead` identifies the filled result range. A request for eight bytes may return fewer, especially near the end. For an unchanged regular file, a positive-length read returning zero indicates end-of-file. A short positive read is not by itself a universal end-of-file certificate. An operation requesting zero bytes is another case entirely.

File size or stat is an observation, not a lock or snapshot. Another actor can change a file between stat and read, or between two reads. A file growing after an observed EOF also changes what future reads can see. Decide whether the application's requirement is a best-effort observation, a stable version or something stronger; the filesystem API alone does not decide that policy.

## 6. Example B — positional reads and closure on failure

Save as `handle-reads.mjs` and run normal or fail. The fail mode deliberately throws after a successful read to exercise release on the operation's failure path.

```javascript
import { mkdtemp, writeFile, open, rm } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const mode = process.argv[2];
if (!['normal', 'fail'].includes(mode)) throw new Error('invalid mode');
const directory = await mkdtemp(join(tmpdir(), 'd03-read-'));
let handle;
try {
  const file = join(directory, 'input.txt');
  await writeFile(file, 'abcde');
  handle = await open(file, 'r');
  try {
    const target = Buffer.alloc(8, 0x58);
    const { bytesRead } = await handle.read(target, 0, target.length, 3);
    console.log('range', bytesRead, target.subarray(0, bytesRead).toString());
    console.log('capacity', target.toString());
    if (mode === 'fail') throw new Error('simulated-consumer-failure');
    const one = Buffer.alloc(1);
    await handle.read(one, 0, 1, null);
    console.log('cursor', one.toString());
    const eof = await handle.read(one, 0, 1, 5);
    console.log('eof', eof.bytesRead);
  } finally {
    await handle.close();
    console.log('closed');
  }
} catch (error) {
  if (error.message !== 'simulated-consumer-failure') throw error;
  console.log('operation-failed', error.message);
  process.exitCode = 1;
} finally {
  try {
    if (handle) {
      try {
        await handle.read(Buffer.alloc(1), 0, 1, 0);
        throw new Error('unexpected read after close');
      } catch (error) {
        if (error.code !== 'EBADF') throw error;
        console.log('closed-read-rejected', error.code);
      }
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
    console.log('temporary-files-removed');
  }
}
```

Both modes observe range 2/de while the deterministic full capacity is deXXXXXX. Normal mode's cursor read observes a, proving the prior positional read did not advance it, and its read at position five returns zero. Both modes close the handle, reject a later read with EBADF and clean up the private directory. Fail mode preserves the intentional operation failure with exit status 1.

This exercises successful closure under two operation paths, not an injected close failure. In general, close can also fail. An exception from finally can mask an earlier operation failure; a real error policy should preserve the original and cleanup errors, for example as structured diagnostic evidence, rather than silently dropping either. Avoid starting new work while closing, and do not close a handle still owned by another component.

## 7. Partial writes and explicit progress

`bytesWritten` identifies progress, not necessarily the entire intended result. A low-level write loop needs to advance the buffer offset and file position by observed progress and stop on failure. Zero progress for a nonempty remaining range must not become an endless retry loop.

Keep the source bytes unchanged until the operation that uses them has settled. Concurrent writes on the same file or use of writeFile without waiting for a prior call can produce corruption; the Promise API does not serialize every mutation. Sequential await orders only the calls that this particular code actually sequences.

Opening with an append flag has platform-specific positional behavior; on Linux, positional writes in append mode append rather than obeying the requested offset. Do not teach append handles as interchangeable with the explicit-position experiment below. The [FileHandle write contract](https://github.com/nodejs/node/blob/main/doc/api/fs.md) and file-open flags define these boundaries.

## 8. Example C — controlled short requests and failure after progress

Save as `write-progress.mjs` and run normal, zero or fail. The adapter deliberately limits real requests to two bytes; it does not claim to induce kernel-level short writes. Zero and fail use deterministic fault injection at that adapter boundary.

```javascript
import { mkdtemp, open, readFile, rm } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const mode = process.argv[2];
if (!['normal', 'zero', 'fail'].includes(mode)) throw new Error('invalid mode');
const directory = await mkdtemp(join(tmpdir(), 'd03-write-'));
try {
  const file = join(directory, 'output.txt');
  const handle = await open(file, 'wx');
  try {
    const source = Buffer.from('ABCDEFG');
    let completed = 0;
    let calls = 0;
    async function limitedWrite(offset) {
      calls += 1;
      if (mode === 'zero') return { bytesWritten: 0 };
      if (mode === 'fail' && calls === 2) throw new Error('injected-write-failure');
      return handle.write(source, offset, Math.min(2, source.length - offset), offset);
    }
    while (completed < source.length) {
      const { bytesWritten } = await limitedWrite(completed);
      if (bytesWritten <= 0 || bytesWritten > source.length - completed) {
        throw new Error('invalid-write-progress');
      }
      completed += bytesWritten;
    }
    console.log('completed', completed, 'calls', calls);
  } catch (error) {
    if (!['invalid-write-progress', 'injected-write-failure'].includes(error.message)) throw error;
    console.log('write-rejected', error.message);
    process.exitCode = 1;
  } finally {
    await handle.close();
    console.log('closed');
  }
  console.log('observed-file', JSON.stringify((await readFile(file)).toString()));
} finally {
  await rm(directory, { recursive: true, force: true });
  console.log('temporary-files-removed');
}
```

Normal mode reconstructs ABCDEFG; the local run uses four calls and seven bytes. Zero mode rejects immediately without looping indefinitely and leaves an empty file. Fail mode writes AB before the injected second-call error, then closes; the file still contains AB. Failure did not roll back already completed progress. The fixture asserts these controlled outcomes, not atomicity, crash recovery or a minimum real OS write size.

If a caller requires all-or-nothing publication, that is an additional requirement to design and verify. It is not obtained merely by catching a rejected Promise or deleting the handle variable. Retry identity and partial-output handling must preserve the product's observable rules rather than silently reporting full success.

## 9. Example D — path check/use races and open flags

Save as `path-races.mjs` and run race, exclusive or truncate. All changes stay inside a newly created temporary directory. The race mode interleaves actions deliberately rather than relying on uncertain timing.

```javascript
import { mkdtemp, writeFile, readFile, access, unlink, open, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const mode = process.argv[2];
if (!['race', 'exclusive', 'truncate'].includes(mode)) throw new Error('invalid mode');
const directory = await mkdtemp(join(tmpdir(), 'd03-path-'));
try {
  const file = join(directory, 'input.txt');
  await writeFile(file, 'original');
  if (mode === 'race') {
    await access(file);
    console.log('check-passed');
    await unlink(file);
    try {
      await readFile(file);
      throw new Error('unexpected read success');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      console.log('later-open-failed', error.code);
    }
  } else if (mode === 'exclusive') {
    try {
      const handle = await open(file, 'wx');
      await handle.close();
      throw new Error('unexpected exclusive success');
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      console.log('exclusive-rejected', error.code);
    }
    console.log('unchanged', await readFile(file, 'utf8'));
  } else {
    const handle = await open(file, 'w');
    try { console.log('opened-for-truncation'); }
    finally { await handle.close(); }
    console.log('remaining-bytes', (await readFile(file)).length);
  }
} finally {
  await rm(directory, { recursive: true, force: true });
  console.log('temporary-files-removed');
}
```

Race mode proves a successful access check does not ensure a later open/read succeeds. Attempt the required operation and handle its outcome instead of treating a preflight check as a lock. Exclusive mode rejects an existing path and leaves original intact; truncate mode opens w and leaves zero bytes before any explicit content write. Open flags are behavior, not harmless configuration.

Exclusive creation is not a complete path-security scheme. Directory trust, symlinks, replacement, permissions and platform/filesystem behavior still matter. Paths supplied by callers need the application's security rules, not a generic success/failure probe. The experiment does not validate hostile-directory handling or network filesystem semantics.

## 10. Cancellation, watching and durable outcomes

Supported whole-file operations can accept AbortSignal, but cancellation is best effort and may stop internal buffering while OS work or partial effects already occurred. Do not equate AbortError with no bytes written, a cancelled remote effect or resource release across every API. The pre-aborted read in Example A covers a narrower outcome explicitly.

`fs.watch` is a change notification mechanism with platform and filesystem caveats. A callback filename may be absent. On Linux/macOS, deleting and recreating a watched file can leave the watch attached to its original inode. A notification is not a complete transaction history, a stable current snapshot or proof of every intermediate change. Interpret it as evidence requiring reconciliation with current state, handle errors, and close the watcher when its owner ends. Exact notification counts/order are not tested here.

Finally, distinguish accepted write progress, read-back visibility, publication and durability. `FileHandle.sync`/datasync expose synchronization operations with OS/filesystem semantics. Rename-style publication, data synchronization and directory-entry persistence are separate concerns. No single successful read-back test proves survival of power loss or universal crash-safe replacement. A durability requirement needs platform-specific evidence and an explicit failure model.

These distinctions do not select a persistence design for any approved project. Product acceptance criteria remain authoritative; implementation discovery must decide the necessary guarantees and their evidence in the separate project repository.

## 11. Backend symptom and misconception checks

Imagine a service that reads whole files asynchronously but then decodes, validates and transforms them in one large synchronous callback. Request latency rises. Separate read submission/observation from processing duration and resource lifetime. Async file APIs do not eliminate CPU work or unrestricted allocation. A second symptom, too many open files, instead suggests investigating outstanding handles, owner lifetimes and cleanup paths; adding concurrency can worsen it.

| Mistake | Better reasoning |
|---|---|
| Async means the whole request cannot block | Trace both native I/O and subsequent synchronous work. |
| stat/access reserves the file | It is a point-in-time check, not protection against later mutation. |
| Requested length equals valid bytes | Use bytesRead/bytesWritten and the corresponding range. |
| A short read always proves permanent EOF | Qualify positive-length zero reads and concurrent modification. |
| Promise APIs serialize all file writes | Order and ownership must be established explicitly. |
| Write failure means no output exists | Partial progress can remain. |
| Finally guarantees no cleanup error | Closing itself can fail and needs an error policy. |
| Reading back proves crash durability | Visibility and persistence under failure are different evidence. |
| Watch events are a durable audit log | Notifications have platform and identity limitations. |

## 12. Future-study exercises and rubric

1. Compare the three successful modes in Example A. **Rubric:** same bytes, distinct calling/error/blocking contracts; no timing benchmark inferred.
2. Why does Example B's cursor read begin at a? **Answer:** the earlier read used an explicit position and did not advance the current file position.
3. May deXXXXXX be treated as all valid read content? **Answer:** only bytesRead identifies the valid prefix; sentinels are unused capacity.
4. How would a close error affect an earlier operation error? **Rubric:** preserve both outcomes rather than letting cleanup mask evidence silently.
5. Explain why Example C's fail mode leaves AB. **Rubric:** already completed writes are not rolled back by a later rejection.
6. What do its controlled short requests prove? **Answer:** progress accounting and termination under the adapter; not kernel short-write frequency or crash atomicity.
7. Does Example D's successful access protect the next read? **Answer:** no; another mutation can occur in the gap.
8. Why cannot a watch callback be treated as a complete change history? **Rubric:** missing filenames, resource identity, platform/filesystem variability and reconciliation.
9. Does read-back success meet an approved product's durability requirement automatically? **Answer:** no; define failure model and relevant evidence without silently changing product scope.

No learner answers or grades recorded. Assessment remains deferred.

## 13. Execution evidence and quality review

**Documentation checked on 2026-10-12:** Context7 `/nodejs/node` and the [official filesystem document](https://github.com/nodejs/node/blob/main/doc/api/fs.md) for FileHandle operations, concurrency, flags, abort boundaries and watcher caveats. Unpinned internal binding snippets were not used as universal timing or durability contracts.

**Executed environment:** Node `v26.4.0`, V8 `14.6.202.34-node.21`, libuv `1.52.1`; `darwin/arm64`, Darwin kernel `25.1.0`. Standalone ESM `.mjs` child processes, private temporary directories, explicit handle closure and finally cleanup, with bounded execution timeouts. The local OS/filesystem run is not cross-platform, network-filesystem or crash-testing evidence.

| Fixture | Checked outcome |
|---|---|
| A — API styles/pre-abort | Seven scenarios passed: three API styles each read five bytes/A€Z or reported ENOENT with exit 1; pre-aborted read reported AbortError. |
| B — positional reads/cleanup | Two scenarios passed: valid range 2/de versus capacity deXXXXXX; normal cursor read a and EOF count 0; normal and consumer-failure paths closed handle and rejected later read with EBADF. |
| C — controlled write progress | Three scenarios passed: normal seven-byte result in four bounded requests; zero-progress guard rejected; injected second-call failure left AB; explicit handle closed. |
| D — check/use and flags | Three scenarios passed: check succeeded then read failed ENOENT; wx rejected EEXIST and preserved original; w truncated to zero bytes. |

Four educational fixtures passed fifteen execution scenarios. Explicitly opened handles were closed on the exercised paths, and the verification harness confirmed the temporary-file parent was empty after every scenario. Intentional operation/write failures retained nonzero outcomes. No descriptor-count stress test, cleanup-failure injection, real kernel short-write induction, watcher portability test or crash-durability claim is made.

| Quality criterion | Evidence and limits |
|---|---|
| Progressive explanation | Operation boundaries → API contracts → explicit ownership/ranges → mutation and evidence. |
| Practical examples | Real temporary-file reads/writes; deliberate interleaving and fault injection labeled. |
| Failure/release | Missing file, pre-abort, consumer failure, zero progress, partial output and closed-handle rejection. |
| Guarantees and caveats | Position versus offset, valid counts, append/platform/watch/durability boundaries. |
| Backend relevance | CPU processing versus native I/O; handle accumulation and honest outcome reporting. |
| Exercises | Nine future-study questions with rubrics; no assessment. |
| Honest gaps | Streams, pool saturation, hostile paths, shutdown and crash verification deferred. |

**Review outcome:** author quality-gate review completed; Chapter 07 submitted for learner editorial review. Next: approve or revise Chapter 07 before Chapter 08 — Readable and Writable Stream Mechanics — is authored.
