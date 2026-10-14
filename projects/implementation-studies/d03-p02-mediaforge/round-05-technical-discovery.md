# MediaForge — Technical Discovery Round 5 (T73–T86)

**Date:** 2026-10-14  
**Learner approval:** All 14 Codex proposals T73–T86 explicitly approved, retaining every caveat and evidence gap.  
**Codex recording/ADR status:** pending verification after the approval is sent.  
**Source fidelity:** Original Codex questions, recommendations, alternatives and evidence gaps reproduced below; separate Persian analysis is not a Codex quotation.

## T73

### Exact Codex question and recommendation

❓ **T73 — Broker authority and uncertain launches:** Shall we use **one exclusively owned broker authority per host, a durable authority generation, and a PostgreSQL execution-control ledger**, never automatically repeating a start whose acknowledgment is uncertain?

➡️ **Recommended: Yes.** Record possible submission before calling systemd. Serialize launch/revocation for each execution identity. A successor must exclude predecessor control and reconcile pending supervisor operations before reopening authority.

Lease-only leadership cannot fence a paused predecessor. Automatic replay risks duplicate work after unit collection. Conservative recovery may hold capacity longer. Database failure closes new launch authority while allowing safety stopping of already identified executions.

**Evidence gap:** OS exclusivity, in-flight supervisor reconciliation, crash transitions, and complete fencing/inactivity proof still require qualification.

**Supports:** Q35/Q46/Q53 [evidence-based resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124); Q37 recovery; Q39 reservations.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Broker باید اختیار انحصاری و Generation ماندگار داشته باشد؛ پاسخ نامعلوم Launch نباید موجب اجرای دوم شود. اثبات Fencing در Linux هنوز نیازمند ارزیابی است.

---

## T74

### Exact Codex question and recommendation

❓ **T74 — Stable staging before copying:** Shall trusted copying begin **only after all authorized staging writers are definitively inactive, future write/launch authority is fenced, and other writers are excluded**?

➡️ **Recommended: Yes.** Retain T57’s fresh publisher-owned inode and verify the installed bytes afterward.

Pre/post hashes, equal sizes, permission changes, completion messages, or main-PID exit do not establish stability throughout copying. A qualified immutable snapshot is an alternative, with greater filesystem integration complexity.

This adds sequencing latency and blocks publication when writer closure is uncertain. Normal successful producer completion remains distinct from variant cancellation.

**Evidence gap:** All-writer containment, delayed-launch fencing, descriptor handoff, and concurrent-writer cases.

**Supports:** Q4 immutable content; Q47 [verified readiness](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42); Q52 provenance; your explicit T57 qualification.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

تا زمانی که تمام Writerها و امکان Launch مجدد مهار نشده‌اند کپی از Staging ایمن نیست؛ Hash قبل و بعد به‌تنهایی ثبات میانی را ثابت نمی‌کند.

---

## T75

### Exact Codex question and recommendation

❓ **T75 — Technical reconciliation scope:** Shall reconciliation **inspect and update evidence for the same execution/publication**, without automatically rerunning conversion, substituting output, or creating another business request?

➡️ **Recommended: Yes.** Idempotent inspection and metadata reconciliation may repeat. Any newly needed verifier execution must have separately governed eligibility and budgets.

Automatic conversion recovery risks unrequested work; blanket failure after a crash invents outcomes. Conservative reconciliation may leave history indeterminate after inactivity is proven, releasing reservations while preserving overlap blocking.

**Evidence gap:** Per-phase idempotence, sufficient recovery evidence, and rules for fresh verification remain open. Missing files or units alone prove no processing outcome.

**Supports:** Q36–Q37 [retry/reconfirmation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:146); Q35/Q46/Q53 reconciliation; Q55–Q56.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Reconciliation فقط درباره همان اجرای قبلی شواهد را بازبینی می‌کند؛ Retry کسب‌وکار مستلزم اقدام جدید معتبر است.

---

## T76

### Exact Codex question and recommendation

❓ **T76 — Retrieval acceptance protocol:** Shall retrieval **prepare and verify pinned immutable bytes outside the workspace guard**, then recheck live authorization, availability, expiry, deletion, and content identity under the guard before accepting the transfer?

➡️ **Recommended: Yes.** Perform preliminary authentication/authorized lookup first. Send protected bytes only after acceptance commits. Close rejected preparations immediately; accepted descriptors may finish under Q58.

Opening and hashing inside the guard simplifies ordering but lets filesystem stalls block workspace mutations. Preparation adds bounded I/O and transfer bookkeeping. Deletion removes future eligibility under the same guard.

**Evidence gap:** Trusted-path opening, pinned identity checks, transfer limits, and races need qualification. Open descriptors do not prove physical cleanup.

**Supports:** Q19/Q58 [retrieval acceptance](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q24/Q42 retention/deletion; Q33/Q47/Q55.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

آماده‌سازی Descriptor خارج از Guard و تأیید نهایی مجوز در Guard، تعادل بهتری میان عدم Block شدن و صحت زمان پذیرش است.

---

## T77

### Exact Codex question and recommendation

❓ **T77 — Protected transfer and caching baseline:** Shall protected API/media use **`Cache-Control: no-store`, no service-worker persistence, sanitized download filenames, and full authenticated streams without partial-range responses initially**?

➡️ **Recommended: Yes**, including `nosniff`. Range requests may receive the full representation.

Authenticated ranges and conditional caching improve efficiency but add subrequest authorization and validator handling. Full uncached transfers increase bandwidth and repeated reads while simplifying access semantics.

Previously delivered bytes remain outside application control; this adds no obligation to retract them.

**Evidence gap:** Header behavior, browser caching, streaming backpressure, concurrency, and timeout qualification.

**Supports:** Q19/Q58 [future-access revocation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q33 previews; Q44 honest observation.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

No-store و No-sniff خطر Cache محتوای خصوصی را کاهش می‌دهند؛ بایت‌های قبلاً دانلودشده قابل پس‌گرفتن نیستند.

---

## T78

### Exact Codex question and recommendation

❓ **T78 — Upload attempt exclusivity:** Shall each upload identity permit **exactly one receiving attempt**, claimed atomically, with repeated bodies returning status/conflict rather than overwriting bytes?

➡️ **Recommended: Yes.** Successful acknowledgment recovery returns the same source. Definitively unsuccessful receiving attempts do not automatically restart; an explicit new upload receives a new identity.

Allowing another body under one identity requires additional attempt fencing and complicates recovery. A missing acknowledgment is not evidence that receiving failed: inspect first.

This adds intake states but prevents duplicate sources and stream replacement.

**Evidence gap:** Disconnect/crash transitions, status retention, receiving deadlines, and partial-content disposal. No resumable assembly or new product retention period is introduced.

**Supports:** Q3–Q4/Q16/Q29 [submission and validation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q24/Q54 anchors.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

هر Upload Identity یک تلاش دریافت دارد؛ برای پاسخ گم‌شده Status همان تلاش پرسیده می‌شود.

---

## T79

### Exact Codex question and recommendation

❓ **T79 — Session saves versus revocation:** Shall ordinary session saves **conditionally update only an existing, matching, unrevoked, unexpired session generation**, never inserting or upserting a missing session?

➡️ **Recommended: Yes.** Only controlled login/rotation creates sessions. Logout/removal/rotation revokes or deletes atomically; a zero-row late save cannot mint a replacement. Protected effects and transfers recheck live session authority.

Tombstones or member-wide generations provide broader revocation options but add state. Conditional updates directly address the accepted late-save risk. Activity updates must neither move backward nor count polling.

**Evidence gap:** Plugin integration and delayed-save races against logout, expiry, rotation, and removal require tests. A loaded middleware object is not current authority.

**Supports:** Q18–Q19/Q58 [revocation and access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); T63.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Conditional Update جلوی زنده‌شدن نشست پس از Logout و Race درخواست دیرهنگام را می‌گیرد.

---

## T80

### Exact Codex question and recommendation

❓ **T80 — Placement of retained provenance:** Shall retained requests and outputs contain **their minimum immutable source/preset/actor provenance**, rather than depending on standalone source history remaining alive?

➡️ **Recommended: Yes.** Compact ordinary history/replay details separately; unresolved records retain only the approved minimum.

Pinning shared history rows reduces duplication but complicates minimization and risks retaining excess information. Bounded provenance snapshots use more metadata while simplifying independent expiry.

This stores no additional media, privileged diagnostics, or archive history.

**Evidence gap:** Exact field allowlists, dependency rules, and compaction race cases remain future schema work.

**Supports:** Q24/Q46/Q52/Q54 — [retained provenance and minimal unresolved records](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Snapshot کوچک Provenance در نتایج ماندگار باید از پاکسازی تاریخچه مستقل باشد.

---

## T81

### Exact Codex question and recommendation

❓ **T81 — Disaster-loss envelope:** Shall production release require **a retention-compliant off-host recovery design for authoritative metadata and still-retained source/ready-output content**, excluding unfinished staging?

➡️ **Recommended: Yes.** This establishes the required recovery scope, not a backup implementation or recovery-time/data-loss promise.

Metadata-only recovery costs less but explicitly accepts irreversible media loss after host destruction. No backup accepts loss of the entire host’s state. Your minimal budget does not implicitly approve either risk.

**Evidence gap:** Retention-safe copies, deletion/revocation evidence, backup store, frequency, RPO/RTO, restore qualification, and cost remain unresolved. Copies cannot extend original retention. Any paid service still requires your explicit approval.

**Supports:** Q55 availability; Q24/Q42/Q52/Q54 [retention and history](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156); Q19/Q58 authorization.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Backup خارج از Host برای داده معتبر لازم است، اما نگهداری نسخه‌های Backup نباید Retention و حذف را دور بزند؛ هزینه هنوز مصوب نیست.

---

## T82

### Exact Codex question and recommendation

❓ **T82 — Explicitly widen OIDC investigation:** Shall we **reopen T40’s managed-first research preference to investigate a self-operated external OIDC service in parallel, with Keycloak as the first candidate**?

➡️ **Recommended: Yes.** Managed options may still win if qualified. This changes the investigation preference while preserving external OIDC and MediaForge-owned authorization.

Auth0’s documented restriction prevents treating it as an accessible default. We have not established that no suitable managed provider exists.

Self-operation adds credential-service administration, runtime/database/TLS, upgrades, recovery, backups, and resource headroom. [Keycloak production requirements](https://www.keycloak.org/server/configuration-production).

**Evidence gap:** Provider eligibility, Iranian access, ownership/recovery, capacity, and cost. This approves no adoption, access experiment, account, purchase, or deployment.

**Supports:** Q18–Q19/Q58–Q59 [identity/access boundary](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); actual T71 constraints.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

بررسی Keycloak در کنار Managed OIDC به معنی انتخاب Keycloak نیست. دسترسی کاربران ایران و الزامات حقوقی و عملیاتی باید احراز شوند.

---

## T83

### Exact Codex question and recommendation

❓ **T83 — Initial Linux qualification target:** Shall we target **Debian 13 amd64 on an operator-controlled native host/full-OS VM, unified cgroup v2, and a private ext4 media filesystem**?

➡️ **Recommended: Yes.** One initial platform limits the build and qualification matrix. Debian documents supported amd64 deployment. [Official release information](https://www.debian.org/releases/trixie/).

Ubuntu LTS may offer better provider templates; ARM64 changes native-build qualification. A shared container cannot be assumed to grant required controls.

**Evidence gap:** Actual image support, package reachability, installed controls, native libraries, disk durability, capacity, Iran access, and cost. This selects no host/vendor/plan and authorizes no installation. An incompatible provider/platform proposal returns for approval.

**Supports:** Q16/Q38–Q40 resource limits; Q46/Q53 [execution and cutoff evidence](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124); T71.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Debian 13 amd64، cgroup v2 و ext4 هدف Qualification است، نه شاهد سازگاری Host انتخاب‌نشده.

---

## T84

### Exact Codex question and recommendation

❓ **T84 — Token strength and enrollment expiry:** Shall session, command-intent, and enrollment references use **at least 32 cryptographically random bytes**, with enrollment references and pending grants expiring **24 hours from issuance without extension**?

➡️ **Recommended: Yes.** Use URL-safe encoding, digest-keyed storage, and context binding. No membership is granted before manager acceptance.

Shorter invitations reduce exposure but increase setup friction; longer ones retain pending identity information longer. Self-contained signed invitations introduce revocation/key-management work.

Existing session/login/command lifetimes remain unchanged.

**Evidence gap:** Pending-record cleanup, rate bounds, token redaction, and concurrent redemption tests. These are engineering parameters, not new product retention policies.

**Supports:** Q18–Q19/Q58–Q59 [controlled enrollment](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q37/Q45 safe recovery.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

توکن‌های تصادفی قوی و Invitation یک‌بارمصرف ۲۴ساعته، نیازمند آزمون Replay و انقضا هستند.

---

## T85

### Exact Codex question and recommendation

❓ **T85 — HTTP status semantics:** Shall we adopt this mapping while preserving explicit action acknowledgments and inspectable domain rejection?

➡️ **Recommended: Yes.**

- **202:** accepted processing confirmation.
- **200:** reads and completed action acknowledgments.
- **400/401:** malformed transport / unauthenticated request.
- **403/404:** forbidden action / concealed protected-object existence, as appropriate.
- **409:** conflicting command payload, overlap, or state.
- **410:** unavailable/expired intent, without claiming a precise cause when unknown.
- **422:** invalid business confirmation.
- **429:** capacity refusal.
- **503:** service/database uncertainty.

Authorized replay returns the original acknowledgment with replay indication and separately current resource state.

Uniform 200 responses simplify clients but obscure boundaries. HTTP status never proves processing outcome or rollback; uncertainty requires same-reference inspection, not automatic fresh mutation.

**Evidence gap:** Final DTO examples and fault/status consistency tests.

**Supports:** Q29 rejection; Q37 recovery; Q44–Q45 [safe outcomes](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83); Q51/Q58.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

Status 202 به معنی پذیرش کار است نه تکمیل آن؛ 503 عدم قطعیت را نشان می‌دهد و نباید Retry خودکار بی‌هویت ایجاد کند.

---

## T86

### Exact Codex question and recommendation

❓ **T86 — Availability observation races:** Shall availability checks carry **content/availability generation and observation time**, with conditional updates preventing stale failures from undoing newer verified restoration?

➡️ **Recommended: Yes.** A known retrieval/integrity failure suspends current availability while preserving genuine historical success. Restoration requires the same expected bytes/identity and original expiry.

Blind last-arriving observations race. Treating every read failure as processing failure corrupts history. Later storage corruption does not itself prove the original verification was false.

This adds evidence bookkeeping and bounded integrity I/O, without automatic reprocessing or substitution.

**Evidence gap:** Audit cadence, observation ordering, restoration, and transfer-preflight integration need qualification. No instantaneous failure-detection promise is added.

**Supports:** Q55–Q56 [availability versus false success](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42); Q43/Q44/Q47/Q54/Q57.

### Learner decision

**Yes — explicitly approved 2026-10-14.** This approves the stated direction, not tests, purchases, provider adoption or experiments.

### Independent educational commentary

نسخه/Generation مشاهده مانع غلبه گزارش قدیمی عدم دسترس‌پذیری بر Restoration جدید می‌شود.

---

## Synthesis and remaining research

The round approved exclusive broker authority, stable staging, same-execution reconciliation, guarded retrieval, protected caching, single-upload attempts, revocation-safe sessions, provenance snapshots, a retention-compliant off-host recovery envelope, parallel investigation of self-operated OIDC, a Debian qualification target, secure enrollment tokens, HTTP status semantics and generation-aware availability observations. Outstanding proof includes stopping/fencing, cutoff cleanup, publication races, resource sizing, engine qualification, vendor access/cost, and backup/restore protocols. **No qualified vendor, purchased service, release test or implementation is implied.** Use the handbook's existing reusable NotebookLM video template.
