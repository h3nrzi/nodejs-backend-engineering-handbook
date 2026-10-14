# MediaForge — Technical Discovery Round 6 (T87–T102)

**Date:** 2026-10-14  
**Learner decision:** All 16 recommendations T87–T102 explicitly APPROVED, retaining the complete qualifications and evidence gaps.  
**External Codex recording and ADR changes:** Await verification; this handbook records the learner approval, not local implementation evidence.  
**Source:** Learner-uploaded complete Technical Discovery Round 6 text, faithfully reproduced question-by-question below. Original source wording is distinct from ChatGPT's Persian teaching notes.

## T87

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T87 — Should a permanent host-local lock enforce broker exclusivity?**

➡️ **Recommended: Yes.** Use a permanent, root-controlled lock file with an exclusive, nonblocking `flock` held throughout the broker’s lifetime. Acquire it before opening a new authority generation or reconciling execution control. Never replace the locked inode or pass the lock into media children.

**Alternatives and consequences:** A systemd unit name alone does not exclude an accidentally launched second broker. Database locks cannot fence a paused predecessor after its database connection disappears. The local lock provides process-lifetime exclusion, but remains advisory and does not cancel already queued supervisor operations. [Linux documents these lock semantics.](https://man7.org/linux/man-pages/man2/flock.2.html)

**Qualification gaps:** Binding/helper selection, descriptor inheritance, permissions, broker death, simultaneous startup, and pending systemd operations.

**Supports:** Q35, Q39, Q46, Q53 — [reservations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107) and [bounded resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

قفل انحصاری Host-local مانع دو Broker هم‌زمان می‌شود؛ عملیات systemd که قبلاً ارسال شده‌اند همچنان نیازمند Reconciliation هستند.

---

## T88

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T88 — Should one serialized broker protocol arbitrate starts, definitive stops, and readiness?**

➡️ **Recommended: Yes.** Use a trusted per-request arbiter with durable phases and evidence. Keep slow supervisor and filesystem operations outside workspace transactions.

The integrated protocol would require:

- An already-running trusted runner to reach an authenticated barrier before decoding. A short transaction then checks waiting expiry, consumes one start grant, and records entry into authorized variant initialization. This initialization counts toward processing time; supervisor submission or wrapper startup does not.
- A stop request to remain distinct from definitive cancellation. Seal future execution/publication authority and establish relevant inactivity before confirming cancellation.
- Readiness acceptance and definitive stop closure to be mutually exclusive. Readiness may still win while stopping is merely requested; uncertain causal ordering remains indeterminate.
- Inactivity evidence to include both absence of relevant live execution and exclusion of future execution. Missing units, expired leases, or stale PIDs remain insufficient.

Lost grants or acknowledgments never restart clocks or justify another launch. Normal converter completion is not cancellation.

**Alternatives and consequences:** Independent asynchronous flags are simpler but leave delayed-start and publication races. A durable actor framework adds infrastructure without removing the need for physical evidence. The proposed protocol accepts conservative blocking when evidence is incomplete.

**Qualification gaps:** Every grant/commit/stop crash window, descendants, delayed supervisor jobs, clock faults, and converter/verifier/publisher closure. This does not prove cleanup compliance.

**Supports:** Q35, Q38–Q40, Q46–Q47, Q53–Q54 — [budgets](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107), [cancellation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124), and [readiness](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Start Grant و توقف قطعی و Readiness زیر پروتکل واحد قرار می‌گیرند؛ شروع ساعت، ارسال Launch نیست بلکه ورود مجاز به Initialization است.

---

## T89

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T89 — Should trusted manifests and pinned file descriptors govern media handoffs?**

➡️ **Recommended: Yes.** Generate opaque storage keys and trusted manifests binding source, request, variant, recipe, execution, and expected artifacts. Uploaded filenames and child-supplied paths never establish storage authority.

Open files through protected ancestors, reject final symlinks and special files, inspect the opened descriptor’s identity and ownership, and retain pinned handles through the relevant operation. Permit only tracked aliases, including legitimate publication hard links.

**Alternatives and consequences:** Path inspection followed by opening leaves races where directories can change. A qualified `openat2` helper can provide stronger resolution controls but adds native implementation and privileged surface. `O_NOFOLLOW` alone protects only the final path component. [Linux opening documentation](https://man7.org/linux/man-pages/man2/open.2.html) describes that limitation.

**Qualification gaps:** Ancestor protection, aliasing, descriptor leaks, ownership handoff, inode reuse, and manifest substitution. These controls supplement T74’s writer-inactivity requirement.

**Supports:** Q4, Q29, Q47, Q52, Q58 — [source validation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7), [verification](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42), and [provenance](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Manifest معتبر و Descriptor بازشده با کنترل اجزای مسیر مانع اعتماد کور به مسیرهای قابل‌تعویض می‌شود.

---

## T90

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T90 — Should recovery use mutable per-object copies and compactable logical metadata?**

➡️ **Recommended: Yes.** Represent recoverable media as private, individually removable copies retaining their original expiry deadlines. Export only allowlisted application metadata in a form that permits destructive compaction.

Exclude unfinished staging and unqualified immutable versions, historical snapshots, full database dumps, and archived WAL from this recovery representation. Preserve ordinary primary PostgreSQL WAL and local crash safety.

**Alternatives and consequences:** Conventional versioned/PITR backups are operationally familiar, but need demonstrated deadline-compliant removal of historical records and content. The proposed approach sacrifices arbitrary point-in-time recovery and adds custom export, compaction, and restore validation. PostgreSQL’s [continuous archiving](https://www.postgresql.org/docs/18/continuous-archiving.html) provides historical reconstruction rather than per-record retention enforcement.

**Qualification gaps:** Store selection, hidden provider snapshots, consistent exports, independent expiry enforcement, physical removal, schedules, and RPO/RTO. No purchase or retention extension is proposed.

**Supports:** Q24, Q42, Q46, Q52, Q54–Q55 and T81 — [retention](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156) and [availability](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

نسخه‌های مستقل رسانه‌ای با مهلت حذف اصلی، Retention را بهتر رعایت می‌کنند اما قابلیت PITR تاریخی را قربانی می‌کنند و نیازمند Export امن هستند.

---

## T91

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T91 — Should restrictive recovery evidence be written off-host before accepting the corresponding primary effect?**

➡️ **Recommended: Yes.** Introduce a minimal off-host write-ahead ledger for restrictive intentions such as deletion, access revocation, and retirement of execution authority. Write remotely outside the workspace guard, then recheck eligibility before accepting the primary mutation.

PostgreSQL remains the live business authority. Remote evidence may restrict or quarantine restored state; it cannot establish that a business action completed. Bound and compact this evidence according to recovery dependencies.

**Alternatives and consequences:** An asynchronous outbox is cheaper and more available, but total primary loss could erase evidence of later revocations, leaving restoration blocked under T72. Write-ahead evidence addresses that gap at a substantial cost: **remote outages can block acceptance of affected actions**, and unused intentions may conservatively restrict recovery.

This is a new runtime dependency requiring your explicit architectural approval.

**Qualification gaps:** Prewrite/commit reconciliation, unused intentions, compaction, outages, latency, and operating cost. No remote service is selected.

**Supports:** Q19, Q24, Q42, Q46, Q52–Q54, Q58 — [revocation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64), [deletion](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156), and [execution authority](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open. This expressly approves the additional off-host runtime-dependency direction, not a vendor, purchase, or tested availability guarantee.

### Educational interpretation — ChatGPT (not Codex quotation)

ثبت مقدماتی شواهد محدودکننده بیرون Host برای Restore مهم است ولی یک وابستگی عملیاتی تازه ایجاد می‌کند که می‌تواند عملیات حساس را هنگام قطع سرویس متوقف کند.

---

## T92

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T92 — Should NGINX provide the host-local HTTPS edge?**

➡️ **Recommended: Yes.** Place NGINX before Fastify, restrict upstream access to an explicitly trusted local peer, configure the expected origin/hosts/callbacks, and overwrite forwarded fields.

Disable protected-route request/response temporary-file buffering and upstream mutation retries. Media authorization stays in MediaForge. NGINX’s [proxy documentation](https://nginx.org/en/docs/http/ngx_http_proxy_module.html) makes these explicit configuration concerns.

**Alternatives and consequences:** Direct Node TLS removes a service but puts certificate lifecycle management into the application boundary. Another proxy is viable with equivalent qualification. NGINX adds configuration and resource overhead, while accidental spooling creates additional protected copies.

**Qualification gaps:** Streaming across protocol versions, spoofed headers, cookies/callbacks, backpressure, certificate renewal, domain/DNS ownership, and actual Iran access. No domain, certificate provider, or purchase is selected.

**Supports:** Q16, Q18–Q19, Q33, Q37, Q58 — [uploads](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7), [access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64), and [reconfirmation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:146).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

NGINX باید Header و رفتار Buffering را کنترل کند؛ Spooling فایل محرمانه به دیسک ناخواسته قابل‌قبول نیست.

---

## T93

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T93 — Should explicit user interaction refresh session activity through a bounded acknowledgment?**

➡️ **Recommended: Yes.** Use a session-bound, CSRF-protected, coalesced activity acknowledgment for meaningful authenticated interaction, including reading. Conditionally advance only an existing live session’s activity, capped by its original absolute expiry. Polling never counts as activity.

**Alternatives and consequences:** Counting mutations alone can expire sessions while users review content. Counting every request lets polling keep sessions alive indefinitely. The proposed acknowledgment adds traffic and rate controls; it is neither proof of human presence nor authorization.

**Qualification gaps:** Multiple tabs, delayed activity writes, coalescing limits, abusive heartbeats, expiry, and revocation races.

**Supports:** Q18–Q19, Q44, Q58 and T38 — [current access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64) and [observation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

فقط تعامل واقعی معتبر، نه Polling، تمدید نشست را رقم می‌زند؛ Heartbeat به‌خودی‌خود اثبات حضور انسان نیست.

---

## T94

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T94 — Should enrollment claims bind once and membership approval commit atomically?**

➡️ **Recommended: Yes.** Bind each enrollment reference once to one proved issuer/subject. Manager approval atomically rechecks current manager authority, the original 24-hour expiry, claimed identity, intended roles, and invitation state, then consumes the grant alongside membership, replay, and history records.

Changing the intended identity requires a fresh reference. An old grant cannot silently restore revoked membership.

**Alternatives and consequences:** Rebinding improves convenience but creates identity-substitution races. Immediate membership on redemption would abandon the approved manager-confirmation boundary. Atomic approval adds transaction checks but prevents stale grants from granting access.

**Qualification gaps:** Concurrent claim/accept/revoke, manager demotion, duplicate submissions, and misleading identity presentation. Email remains a display hint.

**Supports:** Q18–Q19, Q50, Q58–Q59 — [workspace authority and attribution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Binding دعوت به هویت OIDC یک‌بار انجام می‌شود و پذیرش نقش توسط Manager در تراکنش مجزا و معتبر اعمال می‌شود.

---

## T95

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T95 — Should first-manager bootstrap require local approval of a proved identity?**

➡️ **Recommended: Yes.** A local operator-only action selects a fresh, single-use validated OIDC proof and creates the first manager only while the workspace is uninitialized. Atomically mark bootstrap complete; never reopen bootstrap merely because membership later disappears.

**Alternatives and consequences:** Typing or preprovisioning issuer/subject values is simpler but easier to misidentify. Giving ownership to the first public login creates a race. Explicit local approval adds an operator step and requires a clear identity display.

**Qualification gaps:** Proof freshness, local permissions, concurrent bootstrap attempts, operator display, and recovery procedure.

**Supports:** Q18–Q19, Q58–Q59 — [membership and last-manager safeguards](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Bootstrap مدیر اول باید با Proof هویتی و اقدام Operator محلی صورت بگیرد و بعداً خودکار باز نشود.

---

## T96

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T96 — Should lost-identity recovery use exceptional, audited remapping in maintenance?**

➡️ **Recommended: Yes.** In nonserving maintenance, require verified ownership evidence before mapping an existing local identity to a newly proved issuer/subject. Preserve attribution, revoke old sessions and pending login/enrollment authority, and audit the remapping.

Do not link by email, keep simultaneous active old/new bindings, grant manager status automatically, or revive removed membership. Unproven ownership remains blocked.

**Alternatives and consequences:** Creating a new member is simpler but can lose attribution continuity or circumvent manager safeguards. Controlled remapping preserves continuity at the cost of manual recovery work and downtime.

**Qualification gaps:** Provider-specific ownership evidence, personally controlled recovery material, operator safeguards, and mistaken-remapping recovery.

**Supports:** Q18–Q19, Q50, Q52, Q58–Q59 — [authority](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64) and [attribution history](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

بازیابی تغییر IdP با Remapping حسابرسی‌شده در Maintenance انجام می‌شود، نه اتصال خودکار ایمیل.

---

## T97

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T97 — Should initial releases use coordinated maintenance and compatible-schema rollback?**

➡️ **Recommended: Yes.** Deploy immutable versioned artifacts. Close new intake, confirmations, and enrollment while accepted waiting work continues normal dispatch. Keep clocks, watchdogs, cleanup, and revocation active.

Upgrade incompatible processes/schema only after accepted waiting work and possibly active executions quiesce. Run migrations under deployment exclusivity and check schema compatibility at startup. Roll back application artifacts only when compatible with the current schema.

**Alternatives and consequences:** Incompatible rolling releases risk conflicting authority. Pausing dispatch consumes waiting budgets. Expand/contract deployment can reduce downtime but adds complexity. This recommendation accepts planned downtime and may defer upgrades when activity cannot be excluded.

**Qualification gaps:** Interrupted drains, accepted transfers, migration crashes, compatible rollback, and urgent security updates. No automatic destructive down-migration or backup restoration.

**Supports:** Q35, Q37–Q40, Q46, Q53–Q54 — [budgets](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107) and [uncertainty handling](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

استقرار و Migration باید کار پذیرفته‌شده قبلی را رعایت کنند؛ Rollback فقط با Schema سازگار مجاز است.

---

## T98

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T98 — Should security configuration be generation-bound and secrets use systemd credentials?**

➡️ **Recommended: Yes.** Validate and freeze origin/issuer/callback settings, proxy trust, storage roots, execution allowlists, and schema/recipe versions for each authority generation. Fail startup when required values are invalid or missing. Deliver secrets through restricted systemd credential files and controlled rotation.

Product membership and selection remain ordinary dynamic domain state.

**Alternatives and consequences:** Environment secrets are easy to inherit; remote vaults add dependencies and cost; arbitrary hot reload complicates fencing and provenance. Credential files still do not protect secrets from trusted host root or same-service code. [systemd’s credential documentation](https://github.com/systemd/systemd/blob/main/docs/CREDENTIALS.md) describes the mechanism.

**Qualification gaps:** Rotation, restart compatibility, principal isolation, log/dump exclusion, and recovery material.

**Supports:** Q18–Q19, Q45, Q47, Q52, Q58 — [access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64), [safe errors](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83), and [verification](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

نسخه ثابت Configuration برای هر Authority Generation ریسک تغییر بی‌ردپا را کاهش می‌دهد؛ systemd Credential از Root مورداعتماد حفاظت نمی‌کند.

---

## T99

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T99 — Should chrony provide synchronization alongside an explicit clock-health gate?**

➡️ **Recommended: Yes.** Use chrony, verified boot synchronization, and continuous application monitoring of synchronization health and wall-versus-monotonic consistency.

Record anomaly intervals. Unsafe time closes new time-sensitive admission, launch, renewal, and promotion authority while safety stopping and evidence collection remain possible. Reopen only after health and elapsed deadlines are reconciled.

**Alternatives and consequences:** `systemd-timesyncd` plus qualified monitoring is simpler. Wall-only and monotonic-only approaches each miss relevant failures. Chrony adds a daemon and source/health configuration; its [tracking and waitsync documentation](https://gitlab.com/chrony/chrony/-/blob/master/doc/chronyc.adoc) provides observations rather than application guarantees.

**Qualification gaps:** Iran-reachable sources, error/skew thresholds, suspend/reboot behavior, jumps, and persisted time mappings. No clock reset, reservation release, or cleanup proof follows.

**Supports:** Q24, Q38, Q46, Q53–Q54 — [time budgets](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107), [resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124), and [retention](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Chrony و کنترل سلامت ساعت پایه تصمیم‌گیری‌اند، ولی عدم قطعیت ساعت نباید وضعیت یا Deadline را جعل کند.

---

## T100

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T100 — Should services have separate principals and media tasks use per-unit DynamicUser identities?**

➡️ **Recommended: Yes.** Separate application, broker, publisher, and maintenance/recovery OS principals and scoped database roles. Runtime database roles own no schema or DDL.

Use distinct per-unit DynamicUser identities for media tasks, with protected persistent task directories and no shared application credentials. Trusted handoff occurs only after T74 writer closure. Limit broker privileges to allowlisted operations.

**Alternatives and consequences:** A shared UID simplifies permissions but widens cross-task access. A static UID pool needs safe allocation and reuse machinery. DynamicUser reduces account management while adding directory, namespace, UID-recycling, and handoff complexity.

**Qualification gaps:** Actual Debian behavior, retained staging protection, process visibility, descriptor/chown helpers, precise grants, and UID reuse. No accounts or privileges are being installed.

**Supports:** Q4, Q18–Q19, Q29, Q47, Q52, Q58 — [source integrity](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7) and [protected access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

DynamicUser و Principals جدا ایزولاسیون را بهبود می‌دهند، اما UID reuse و دسترسی به Staging نیازمند Qualification واقعی است.

---

## T101

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T101 — Should previews use a private, on-demand derived cache?**

➡️ **Recommended: Yes.** Key previews by parent identity/digest and preview-recipe version. Allow one generation in flight per key using bounded auxiliary execution. Inherit the parent’s authorization, availability, expiry, and deletion.

A preview is neither a requested output variant nor a selectable deliverable. Exclude reconstructible previews from recovery copies. Regenerate missing previews only from eligible, available parent bytes.

**Alternatives and consequences:** Regeneration on every view costs CPU; eager generation spends resources on unused previews; raw originals increase bandwidth and delegate appearance interpretation to browsers. Caching adds storage and cleanup obligations.

**Qualification gaps:** Format, dimensions, quality, auxiliary limits, duplicate generation, and parent-state races. A cached preview cannot bypass unavailable parent state or restore output readiness.

**Supports:** Q24, Q30–Q33, Q43, Q55, Q58 — [appearance and previews](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42), [retention](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156), and [selection](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:180).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Preview کش‌شده صرفاً داده مشتق‌شده است و هرگز نباید مستقل از دسترس‌پذیری و مجوز Parent سرو شود.

---

## T102

### Original Codex question, recommendation, alternatives and qualifications (verbatim)

❓ **T102 — Should durable copy inventory and cleanup intents coordinate removal?**

➡️ **Recommended: Yes.** Track known media, staging, derivative, and recovery copies with their owners and original deadlines. Use idempotent cleanup intents.

Separate guarded eligibility closure, asynchronous physical removal, and evidence that removal completed. Reconcile and alert on overdue or unknown removal. Never infer cleanup, inactivity, or cancellation from age or an unlink acknowledgment.

**Alternatives and consequences:** Independent backend lifecycle rules with reconciliation distribute policy across stores. Central inventory improves dependency tracking but adds bookkeeping and adapters. Orphan removal still requires ownership evidence rather than modification-time guesses.

**Qualification gaps:** Cross-store inventory, crash recovery, orphan discovery, and actual physical completion. This is a concrete coordination mechanism; it does not relax the strict cutoff or establish compliance.

**Supports:** Q24, Q41–Q43, Q46, Q52–Q54 — [retention and deletion](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156) and [strict bounded resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Learner's confirmed decision

**Yes — approved 2026-10-14.** The original evidence gaps remain open.

### Educational interpretation — ChatGPT (not Codex quotation)

Inventory جامع و Cleanup Intent کمک به حسابرسی حذف می‌کنند ولی نه Unlink و نه Intent به‌تنهایی گواه پاکسازی فیزیکی نیستند.

---

## Synthesis and still-open evidence

Approved: broker-exclusive lock and authority, serialized start/stop/readiness protocol, trusted manifests and pinned handles, retention-compliant recovery representations, off-host restrictive-evidence prewrite, NGINX host edge, bounded meaningful session activity, secure enrollment/bootstrap/remapping, maintenance deployment, credential/configuration generation control, clock monitoring, separate OS principals, private preview cache, and copy cleanup inventory.

**Open:** physical inactivity proof and strict content cutoff, actual Linux systemd/cgroup capability, backups and off-host ledger mechanics/cost, Iranian accessibility, media engine qualification, hardware/resource sizing, cancellation/publication crash windows. No technology qualification, subscription, deployment or implementation is implied. Use `templates/notebooklm-round-video-prompt.md` for videos.
