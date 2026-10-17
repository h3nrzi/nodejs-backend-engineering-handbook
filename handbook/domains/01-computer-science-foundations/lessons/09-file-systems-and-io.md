# Chapter 09 — File Systems and I/O

**Domain:** D01 — Computer Science Foundations  
**Status:** Draft, awaiting learner review  
**Prerequisites:** Chapters 06–08; basic JavaScript and asynchronous functions.

## Learning outcomes

After completing this chapter, explain files and directories versus storage devices; file descriptors, offsets and access modes; sequential versus random I/O; caching and buffering layers; blocking/nonblocking versus asynchronous operations; stream backpressure; durability, flushing and crash-consistency limits; atomic replacement; and correctness/resource trade-offs in large-file processing. Reason about requirements without prescribing technical designs in PRDs.

## 1. Storage is a hierarchy

An application calls a filesystem interface; it doesn't directly manipulate arbitrary disk sectors. Filesystems organize names, directory entries, metadata, allocation and file contents. A pathname identifies an entry at a moment in time, but the same file may have more than one name (hard links), and symbolic links redirect lookup. A **file descriptor/handle** refers to an opened resource; it is not identical to its path.

**Memory versus persistence:** CPU caches, RAM, operating-system page cache and persistent media have different lifetime and latency properties. A successfully completed API call may mean data was accepted into kernel buffers, not that it survived a power loss.

**Inodes** are common Unix-style filesystem metadata identifiers; don't assume all operating systems implement identical objects or semantics. Rename, access-control and path-resolution details vary across platforms and filesystems.

## 2. Files, offsets and access patterns

A file is commonly viewed as a byte sequence; applications impose formats (UTF-8, JSON, CSV, binary records). A UTF-8 character can span multiple bytes, so seeking to an arbitrary byte offset may split a character or record.

**Sequential I/O** accesses nearby ranges in order. **Random I/O** seeks among locations. Sequential access often benefits from caching and prefetching; random access can incur many storage operations. Results depend on device, OS, workload and queue depth.

A descriptor may have a current position; APIs with explicit position arguments can perform positional access without relying on that shared offset.

```ts
import { open } from "node:fs/promises";

async function inspectHeader(path: string): Promise<Buffer> {
  const file = await open(path, "r");
  try {
    const header = Buffer.alloc(16);
    const { bytesRead } = await file.read(header, 0, header.length, 0);
    return header.subarray(0, bytesRead);
  } finally {
    await file.close();
  }
}
```

This is a demonstration of bounded positional reading and closing handles, **not** a secure policy for untrusted paths. It doesn't guarantee all 16 bytes exist or were read, nor does it decode the content.

## 3. Buffering, caching and page cache

**Application buffering:** accumulate bytes before further processing or writing. **Runtime buffering:** a library may batch or stage work. **Kernel page cache:** OS caches file-backed pages. **Device caches:** the storage device may buffer internally. Each improves different kinds of performance but affects memory and durability reasoning.

A read may hit the OS page cache; another may require storage access. A write may return before storage hardware has persisted it. Therefore “write completed” needs a precise contract.

**Read amplification:** a workload fetches more bytes than it logically needs. **Write amplification:** storage writes more than the logical changes. Formats, alignment, filesystem layout and device behavior can contribute.

**Important benchmark trap:** repeating a file read may test warm-cache throughput instead of cold-storage latency. Record whether cache state is warm or cold rather than claiming one result represents both.

## 4. Blocking, nonblocking and asynchronous I/O

Blocking means a call waits for completion before returning control to the caller. Nonblocking operations can return without waiting when the requested action cannot proceed immediately. Asynchronous interfaces report completion later. These terms describe different aspects and do not imply a single implementation mechanism.

In Node.js, `fs/promises` offers asynchronous APIs. Internally, some filesystem work may use a threadpool; `await` suspends the JavaScript function rather than making every filesystem syscall nonblocking.

```ts
import { stat } from "node:fs/promises";

async function fileSize(path: string): Promise<bigint> {
  const info = await stat(path, { bigint: true });
  return info.size;
}
```

Checking size before later opening the same pathname is subject to a **time-of-check/time-of-use** race: the referenced resource could change. This example illustrates metadata reading, not validation of an adversarial pathname.

## 5. Streaming and bounded memory

Reading an entire file makes memory consumption depend on input size and representation. Processing chunks can reduce peak application retention when chunks are released promptly; the chosen chunk size adds overhead and throughput trade-offs. No approach eliminates all allocations.

```ts
import { createReadStream } from "node:fs";

async function countBytes(path: string): Promise<number> {
  let total = 0;
  const stream = createReadStream(path);
  try {
    for await (const chunk of stream) {
      total += chunk.length;
      if (!Number.isSafeInteger(total)) throw new RangeError("Byte count overflow");
    }
    return total;
  } finally {
    stream.destroy();
  }
}
```

The example counts bytes but does not parse records; in many Node.js versions `createReadStream` yields `Buffer` chunks without an encoding. Access control, file mutation while reading and acceptable failures are outside this teaching snippet.

**Chunk boundaries aren't record boundaries.** A JSON document, CSV line or multibyte UTF-8 character can cross chunks. Correct stream processing must preserve incomplete frames or decoded state between chunks.

## 6. Backpressure: when the producer outruns the consumer

A producer can emit chunks faster than downstream work can accept them. Without a limit, buffered bytes accumulate. **Backpressure** is the feedback mechanism by which consumption capacity constrains production.

At steady rates of 12 MiB/s produced and 8 MiB/s consumed, backlog grows around 4 MiB/s until resources run out or rates change. After a minute, roughly 240 MiB has accumulated if no limit or other behavior intervenes.

**Visual question:** Which feedback stops backlog from growing when consumption is slower?

![The producer offers work to a bounded buffer. The consumer removes work from the buffer. When capacity is exhausted, feedback pauses or rejects further offers according to policy. When capacity returns, feedback can allow production to resume. This describes flow control, not durability or guaranteed completion.](../assets/09-file-systems-and-io/bounded-buffer-feedback.svg)

**Figure 1 — Capacity feedback constrains production.** Solid arrows move work; dashed arrows describe capacity feedback. At the stated 12 MiB/s offered and 8 MiB/s consumed, an unchecked backlog gains 4 MiB/s. A bounded buffer needs the documented pause, rejection or loss policy once full; capacity feedback can constrain accepted production. Removal frees a slot, but does not by itself prove durable storage, successful processing or fairness. K counts items here; byte size and other buffers need separate bounds. This is a conceptual mechanism, not a Node API event trace. [Reference](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf).

[Full-size SVG](../assets/09-file-systems-and-io/bounded-buffer-feedback.svg) · [Editable Mermaid source](../assets/09-file-systems-and-io/bounded-buffer-feedback.mmd)

A Node.js writable stream's `write()` boolean indicates whether producers should stop writing until a later `drain` event; it does **not** report that bytes have reached stable storage. Use `pipeline` and other higher-level facilities when justified by the implementation design.

```ts
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

// Educational copy example. Destination handling and crash durability
// are NOT part of this snippet's guarantees.
async function copyFileChunks(source: string, destination: string) {
  await pipeline(createReadStream(source), createWriteStream(destination));
}
```

This example can overwrite the destination and is unsafe if either path is untrusted. `pipeline` coordinates completion/error and stream backpressure; it is not inherently an atomic replace or a durable transaction.

## 7. Reliability: partial writes, flushing, atomicity

A write can succeed partially, be interrupted, or fail after changing some bytes. “Exactly one call” doesn't guarantee an entire logical object was updated atomically. Correctness depends on filesystem, API, file size, failure and concurrency assumptions.

**Visibility:** other processes may observe new data. **Durability:** data survives the stated failure model. **Atomicity:** observers see an indivisible transition according to a defined scope. These are different properties.

A common update pattern writes a new file then renames it over an old name. Renaming within the same filesystem is often atomic at the namespace level, but this does not automatically guarantee contents are durable after a crash. Durability may require flushing file data and relevant directory metadata, subject to OS/filesystem guarantees. Cross-filesystem renames and Windows semantics can differ.

**fsync** requests synchronization of a descriptor's modified data/metadata with storage under platform-specific semantics; it isn't an unconditional guarantee against every device or power failure. Read the target platform contract before making reliability claims.

A project PRD may demand that a confirmed export remain recoverable after a defined interruption scenario; Codex chooses the actual persistence and reconciliation strategy.

## 8. Metadata, permissions and file identity

Access controls involve OS process identity, permissions, ownership, filesystem policy and application authorization. Path traversal, symbolic links and races can undermine naïve “check path then open” approaches.

Do not infer that a directory prefix string check proves a file resides inside an authorized directory. Reparse, symlink resolution and rename races require threat modeling (Domain 09). A PRD should state which users may access which files; the solution is decided during implementation.

File identity may change under a stable path. Log rotation and file replacement illustrate why a long-lived descriptor can point to an old file while path lookup sees a new one.

## 9. I/O performance and measurement

Key measurements:
- **Throughput:** bytes or records processed per second.
- **Latency:** time per operation or request.
- **IOPS:** I/O operations per second.
- **Queue depth:** concurrent outstanding operations.
- **Peak RSS/heap/external memory:** resource pressure.
- **Error rate and integrity:** correctness.

Use a repeatable workload with explicit file sizes, number of files, access pattern, cache state, storage medium and concurrency. Compare end-to-end results, not just inner-loop benchmarks.

**Small-file workload:** metadata, open/close and per-operation overhead can dominate. **Large sequential file:** throughput, buffering and CPU parsing can dominate. **Random access:** seek/access pattern can dominate.

Little's law and Amdahl's law from Chapter 06 can help interpret sustained queues and which stage is worth optimizing, but avoid applying steady-state assumptions to a continuously overloaded workload.

## 10. Backend scenarios

**CSV import:** process rows with a clear error policy, including invalid encoding, malformed rows, missing headers and interrupted jobs. Bound memory and prevent silent data loss. A PRD describes supported sizes, accepted/rejected outcomes and integrity criteria; it does not mandate a streaming parser.

**Customer download:** distinguish complete response from partial transfer. Cancellation, range requests and client disconnects require observable policy, not just a successful disk read.

**Periodic snapshot:** a backup is useful only if restorability is verified; write completion and archive durability are different claims. Distinguish source database and external file resources. Backup architecture belongs to Codex.

**Audit append:** concurrent writers, record boundaries and crash behavior need explicit requirements before selecting file append, database or message service.

## 11. Common misconceptions

1. A completed `write` always means data is on stable media.
2. A file rename guarantees arbitrary crash durability.
3. One read always returns the requested number of bytes.
4. One chunk always contains one complete record.
5. Streaming means zero memory usage.
6. `await` means no thread ever blocks.
7. A high-water mark is an absolute upper bound on every byte retained in the process.
8. A `write()` return value of true means storage flush succeeded.
9. More concurrent filesystem operations always improve throughput.
10. An I/O benchmark without cache state is universally representative.
11. Checking a pathname once prevents later symlink/rename races.
12. Passing unit tests proves a backup is recoverable.

## 12. Exercises

1. Explain difference among path, directory entry and open file descriptor.
2. Why might sequential file access outperform random reads at equal byte count?
3. Differentiate application buffers, OS page cache and persistent media.
4. A program reads a file twice and the second read is faster. Give two plausible explanations.
5. Explain blocking versus nonblocking versus asynchronous I/O.
6. What does a partial read mean? How should a binary parser interpret it?
7. A UTF-8 character spans two chunks. What state should a decoder preserve?
8. Producer emits 12 MiB/s and consumer accepts 8 MiB/s for 60 seconds. Estimate backlog without backpressure.
9. Does `write()` returning true mean the data is durable? Explain.
10. Compare namespace atomicity and crash durability of rename-based file replacement.
11. Why can an `fsync` result still need a carefully stated failure model?
12. Distinguish a file's logical size from process RSS while processing it.
13. Explain one TOCTOU issue when using file metadata checks.
14. Design a fair I/O benchmark with warm and cold cache observations.
15. Write three PRD acceptance criteria for a large-file import without naming a specific implementation technique.

### Answer guide

1. Path is a name, directory entry maps names to filesystem objects, descriptor is a process handle to an opened object.
2. Locality, readahead and lower seek/random-access overhead may help sequential access.
3. Buffers are application/runtime staging; page cache is OS cached file pages; persistent media stores retained bytes under its guarantees.
4. Warm OS cache, warmed runtime/device state, or differing background load.
5. Blocking stalls caller; nonblocking can return without completing; async signals result later.
6. Fewer bytes returned than requested; continue or reject based on framing and EOF policy.
7. Retain incomplete byte sequences/decoder state until a valid complete character is available.
8. About 240 MiB backlog, assuming stable rates.
9. No; it is a backpressure signal, not a durability confirmation.
10. Rename may make new name visible atomically but not guarantee data/directory durability across power loss.
11. OS, filesystem, controller and device guarantees determine what failure model is covered.
12. File size is disk logical data; RSS is resident process memory and may include only portions/buffers.
13. The file or symlink target can change between check and use.
14. Same workload/device, documented cache state, repeats, integrity checks, sizes, concurrency and metrics.
15. Supported input maximum, bounded memory under named concurrency, and explicit successful/failed/interrupted outcomes with validated data integrity.

## 13. Mastery checkpoint and references

Explain sequential/random I/O, identify different cache/buffer layers, handle arbitrary chunk boundaries, distinguish API completion from durability and describe backpressure without assuming a prescribed queue or framework.

References:
- *Operating Systems: Three Easy Pieces*, persistence chapters: https://pages.cs.wisc.edu/~remzi/OSTEP/
- Node.js filesystem API: https://nodejs.org/api/fs.html
- Node.js streams API: https://nodejs.org/api/stream.html
- Node.js streams backpressure guide: https://nodejs.org/en/learn/modules/backpressuring-in-streams
- Linux open and fsync manual references: https://man7.org/linux/man-pages/man2/open.2.html and https://man7.org/linux/man-pages/man2/fsync.2.html

**Coverage audit:** filesystem objects ✓; offsets/access patterns ✓; caching/buffering ✓; async/nonblocking ✓; streams and backpressure ✓; partial reads ✓; flushing/durability ✓; security/races ✓; benchmarking ✓; exercises ✓. Pending: learner review and independently executed examples. Next: Chapter 10 — Concurrent Execution.
