# MediaForge — Technical Discovery Round 4 (T50–T72)

**Date:** 2026-10-14  
**Status:** All 23 technical proposals T50–T72 explicitly approved by learner, including all caveats. T71 operator constraints explicitly supplied; vendor selection and purchases remain unapproved. Codex documentation/ADR recording pending external verification.  
**Source:** Complete user-provided Codex Round 4 response. Verbatim question and complete recommendation for each item follow; teaching notes are explicitly separated.

## T71 — Approved real-world operating inputs

- Primary users: **Iran**.
- Hosting and identity-data geography: **flexible, provided the users can access the service**; actual accessibility and provider restrictions must be qualified, not assumed.
- Spending: **minimal; every paid service requires explicit owner approval**.
- Account ownership/recovery: **personal accounts owned and recoverable by the learner**.
- Existing identity provider: **none**.

These inputs are operator constraints and neither credentials nor a vendor selection. They do not authorize a purchase, paid plan, specific region, provider or production deployment.

## T50

### Codex original question and complete proposal (verbatim)

❓ **T50 — Atomic confirmation admission:** Shall one guarded transaction **recheck authorization, command intent, source eligibility, presets, overlap, and allowances**, then atomically record the accepted request, variants, accounting, history, and replay result?

➡️ **Recommended: Yes.** Domain rejection should instead commit its inspectable rejection record without accepting variant work. Database constraints supplement the guard.

Separate check/write transactions permit races. Constraints alone cannot enforce all counts and eligibility rules. Expensive media validation happens outside the transaction, with evidence bound to immutable source bytes. Database failure must not masquerade as a definitive business rejection.

**Supports:** Q29 [whole-confirmation rejection](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q28/Q39 admission; Q37 replay.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

یک تراکنش نگهبانی‌شده باید همه شروط پذیرش را دوباره بسنجد و نتیجه، تاریخچه، ظرفیت و Replay را یکجا ثبت کند؛ خرابی دیتابیس معادل رد تجاری نیست.

---

## T51

### Codex original question and complete proposal (verbatim)

❓ **T51 — Fair dispatcher claiming:** Shall we assign **immutable acceptance order under the workspace guard**, and atomically move the oldest eligible request from waiting to processing accounting?

➡️ **Recommended: Yes.** Use one operational dispatcher initially, while guarding against accidental competing instances.

Blind `SKIP LOCKED` can skip older eligible work; an in-memory FIFO cannot reconstruct authoritative order after restart. Accepted source holds and departed members’ accepted work remain governed by their approved rules.

Dispatch intent is not proof that the first variant started. The exact launch/start/budget race remains downstream.

**Supports:** Q38–Q41, Q50 — [fairness, reservations, and accepted-work holds](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

FIFO معتبر باید بر ترتیب پذیرش پایدار تکیه کند؛ Intent Dispatch به‌معنی شروع اجرای واقعی نیست.

---

## T52

### Codex original question and complete proposal (verbatim)

❓ **T52 — Concrete command-intent protocol:** Shall we use **durably stored opaque random intents**, with unused intents expiring after thirty minutes and accepted results replayable only within permitted history?

➡️ **Recommended: Yes.** First acceptance binds a versioned canonical domain payload and effect/result atomically. Canonicalization ignores JSON whitespace/object ordering, handles preset selection as the approved ordered set, and preserves meaningful values.

Signed self-contained intents reduce draft storage but add signing/key-rotation mechanics. Arbitrary client keys require another forgotten-key defense. Stateful intents add a preparation round trip but make unknown-reference rejection straightforward.

Draft issuance starts no processing clocks. Replay neither extends retention nor creates a fresh request.

**Supports:** Q37 [reconfirmation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:146); Q51 action replay; Q52/Q54 history; Q57 superseded selections.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

انقضای Intent استفاده‌نشده پس از ۳۰ دقیقه از بازآفرینی ناخواسته فرمان جلوگیری می‌کند؛ Draft زمان پردازش را شروع نمی‌کند.

---

## T53

### Codex original question and complete proposal (verbatim)

❓ **T53 — Broker communication:** Shall the execution broker use **a local Unix-domain socket with OS peer-credential checks, bounded typed messages, and allowlisted operations**?

➡️ **Recommended: Yes.** Callers provide execution/reference identities; the broker constructs executable paths and systemd properties. Media children are not authorized callers.

Direct API-to-systemd access removes a component but broadens privileged authority. Loopback HTTP adds another authentication/configuration boundary. Exact accounts, permissions, and broker recovery remain open.

**Supports:** Q18–Q19 [access boundaries](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q35/Q46/Q53 execution evidence.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Unix Socket و Peer Credentials مرز اختیارات Broker را محدود می‌کنند، نه اینکه تنظیمات دسترسی بعدی را بی‌نیاز کنند.

---

## T54

### Codex original question and complete proposal (verbatim)

❓ **T54 — One-shot service configuration:** Shall media executions use **unique transient systemd services with `Type=exec`, `ExitType=cgroup`, `Restart=no`, and `KillMode=control-group`**?

➡️ **Recommended: Yes**, subject to actual host support. Capture and retain invocation/job evidence before collection can discard it.

Scopes require attaching an externally launched process. Automatic restart risks repeating processing; main-PID lifetime misses surviving descendants. These settings provide primitives—not inactivity proof. A start-job acknowledgment is not actual execution start. [Service documentation](https://github.com/systemd/systemd/blob/main/man/systemd.service.xml).

**Supports:** Q38–Q39 budgets/reservations; Q35/Q46/Q53 [cancellation and reconciliation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Type=exec و ExitType=cgroup ابزارهای نظارت‌اند، نه مدرک کافی برای توقف یا رعایت Cutoff.

---

## T55

### Codex original question and complete proposal (verbatim)

❓ **T55 — Media execution privileges:** Shall each media task receive **only its required read-only inputs and private bounded staging**, with no network, database, system-manager, privilege-escalation, or cgroup-escape authority?

➡️ **Recommended: Yes.** Keep the runtime filesystem read-only and remove unnecessary capabilities.

A broadly shared media account simplifies ownership but exposes unrelated assets. Containers offer another boundary with additional runtime/packaging work. Concrete Linux identities, settings, and handoff must be qualified; flags alone establish neither confinement nor cutoff compliance.

**Supports:** Q4/Q29 [immutable, strictly validated sources](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q33 protected previews; Q47 readiness.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

پردازش تصویر باید با حداقل دسترسی، Staging اختصاصی و بدون شبکه یا مجوز دیتابیس اجرا شود؛ تنظیمات واقعی نیازمند آزمایش است.

---

## T56

### Codex original question and complete proposal (verbatim)

❓ **T56 — Durable evidence dimensions:** Shall we record **processing outcome, launch authority, execution inactivity, publication eligibility, and current availability separately**, rather than deriving every action from one terminal-state flag?

➡️ **Recommended: Yes.** This represents proven inactivity without pretending an indeterminate outcome became failure, and closed publication eligibility without inventing cancellation.

A larger single enum initially looks simpler but conflates independent facts. Separate evidence requires explicit transition checks. A normally completed one-shot execution is inactive; that fact alone does not mean cancellation.

**Supports:** Q21/Q34/Q44 [honest states](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83); Q35/Q46/Q53; Q55–Q56 availability/correction.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Outcome، اختیار Launch، توقف واقعی، حق انتشار و دسترس‌پذیری باید جدا مدل شوند تا وضعیت نامعلوم به شکست جعلی تبدیل نشود.

---

## T57

### Codex original question and complete proposal (verbatim)

❓ **T57 — Trusted byte handoff:** Shall the publisher **copy staging bytes into a new publisher-owned regular file**, hash and synchronize it, close write handles, then install its final identity with a same-filesystem no-clobber hard link and directory synchronization?

➡️ **Recommended: Yes.** Never promote the child-owned staging inode itself. A child may retain a writable descriptor despite pathname or permission changes.

Transferring the original inode after proven inactivity saves copying but depends on the full inactivity protocol. `renameat2` no-replace needs a qualified binding/helper; ordinary rename can overwrite. Fresh copying costs time and temporary disk within the processing budget. [Filesystem primitives](https://man7.org/linux/man-pages/man2/link.2.html), [directory durability](https://man7.org/linux/man-pages/man2/fsync.2.html).

Verify the exact installed bytes before readiness. This does not prove cleanup compliance.

**Supports:** Q4 identity; Q47 [verified content](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42); Q52 provenance.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

کپی به Inode تحت مالکیت Publisher در برابر تغییر از طریق Descriptor قدیمی مفید است؛ ثبات هنگام کپی و بررسی بایت‌های نهایی هنوز مهم‌اند.

---

## T58

### Codex original question and complete proposal (verbatim)

❓ **T58 — Interrupted publication recovery:** Shall publication have **a durable intent bound to source/request/variant/execution**, allowing recovery to finish the same publication only when exact content and eligibility evidence suffice?

➡️ **Recommended: Yes.** Record intent before final installation. Uncommitted files remain inaccessible; recovery never automatically reruns conversion.

Filename-only recovery invents readiness. Declaring every interrupted publication failed invents outcomes. Explicit recovery phases add complexity but make database/filesystem gaps inspectable.

Cancellation/readiness arbitration remains downstream. Neither a publication phase nor a file’s existence proves its ordering relative to stopping.

**Supports:** Q35/Q46/Q53 reconciliation; Q47/Q55–Q56 [readiness and availability](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42); Q37 same-effect recovery.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Intent ماندگار امکان بازیابی همان Publication را می‌دهد بدون تکرار خودکار Conversion یا استنباط Ready از وجود فایل.

---

## T59

### Codex original question and complete proposal (verbatim)

❓ **T59 — Upload identity and acknowledgment recovery:** Shall each upload receive **a server-issued upload/status identity**, acknowledging source success only after immutable bytes, validation evidence, and metadata are durable?

➡️ **Recommended: Yes.** Partial intake remains private and ineligible for processing. After acknowledgment loss, inspect that upload identity first; an explicit new upload still receives a new source identity.

A blind upload response is simpler but leaves disconnect recovery ambiguous. Recoverable identity adds preflight/status work without adding resumable assembly. Store successful-upload time once; recovery cannot restart seven-day retention.

**Supports:** Q3–Q4/Q16/Q29 [submission](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q24/Q54 retention anchors.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Upload ID به بازیابی پاسخ گم‌شده کمک می‌کند؛ شروع مجدد Upload نباید هویت منبع قبلی را به شکل ضمنی ادغام کند.

---

## T60

### Codex original question and complete proposal (verbatim)

❓ **T60 — Reusing source-validation evidence:** Shall confirmations reuse **versioned validation evidence tied to the exact immutable source digest**, provided the bytes and applicable validation rules remain unchanged?

➡️ **Recommended: Yes.** Changed or unconfirmed bytes, or changed applicable rules, require fresh qualified validation before acceptance.

Decoding on every confirmation consumes more media capacity and delays admission. Metadata-only assertions are insufficient. This reuses completed qualified validation, not converter success; current expiry, permission, presets, overlap, and capacity still require rechecking.

**Supports:** Q4/Q29–Q32 [source validation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q28 admission; Q47 verification.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

مدرک اعتبارسنجی قابل استفاده مجدد باید به Digest و نسخه قواعد متصل باشد؛ مجوز و انقضا هنگام تأیید دوباره بررسی می‌شوند.

---

## T61

### Codex original question and complete proposal (verbatim)

❓ **T61 — History expiry and compaction:** Shall history expiry use **idempotent, resumable database compaction**, preserving required provenance and only the approved minimal unresolved metadata?

➡️ **Recommended: Yes.** Evaluate original anchors and retained dependencies in short guarded transactions. Replay detail expires with permitted history; missing references remain incapable of new effects.

Independent cascading deletion risks destroying provenance. Keeping complete histories indefinitely violates finite retention. Explicit dependency-aware minimization adds race and recovery logic.

This concerns metadata; it does not resolve physical cleanup or backup retention.

**Supports:** Q24/Q46/Q52/Q54 — [retention and minimal unresolved records](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Compaction کوتاه و Idempotent باید Provenance ضروری را حفظ کند و Retention نامحدود نسازد.

---

## T62

### Codex original question and complete proposal (verbatim)

❓ **T62 — Supplementary inspector candidates:** Shall we investigate **read-only ExifTool for structure/declared metadata and LittleCMS for explicit ICC interpretation**, alongside the Sharp candidate?

➡️ **Recommended: Yes—qualification only.** Their reports must correlate with immutable source identity.

A bespoke bounded inspector reduces tool dependencies but adds format-maintenance responsibility. Another all-in-one engine requires equivalent qualification. ExifTool adds Perl/tool packaging; LittleCMS adds native integration.

Parsing, profile opening, or CRC checking alone does not establish full conformance. No package adoption, experiment, or passing evidence is implied. [ExifTool documentation](https://github.com/exiftool/exiftool/blob/master/html/exiftool_pod.html), [LittleCMS profile API](https://github.com/mm2/little-cms/blob/master/_autodocs/api-reference/07-profiles.md).

**Supports:** Q14/Q29–Q32 [input, color, and metadata](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q47–Q48 acceptance.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

ExifTool و LittleCMS فقط نامزد ارزیابی هستند؛ هیچ قابلیت یا بسته‌ای تأیید عملی نشده است.

---

## T63

### Codex original question and complete proposal (verbatim)

❓ **T63 — Session implementation:** Shall we use **`@fastify/cookie`, `@fastify/session`, and session-bound `@fastify/csrf-protection`**, with an application-owned digest-keyed PostgreSQL store?

➡️ **Recommended: Yes**, overriding memory persistence and rolling-extension defaults. Enforce server expiry/revocation atomically so an older in-flight save cannot resurrect logout. Polling cannot refresh meaningful activity.

A custom session layer gives control but increases security-sensitive implementation. Generic store adapters may have incompatible identifier or expiry behavior. Package compatibility and store concurrency still need qualification. [Session primitives](https://github.com/fastify/session).

**Supports:** Q18–Q19/Q58 — [current access and revocation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Persist کردن Hash نشست و محافظت از Logout در برابر Save دیرهنگام باید در پایگاه داده معتبر بماند.

---

## T64

### Codex original question and complete proposal (verbatim)

❓ **T64 — Login transaction bounds:** Shall login attempts use **single-use, browser-bound server records valid for ten minutes**, safe local return paths, and no retained provider refresh token?

➡️ **Recommended: Yes.** Keep state/nonce/PKCE server-side; discard provider tokens after validating identity claims needed for the local session.

Refresh-token/provider-API integration supports additional lifecycle features but adds long-lived secrets and dependencies unnecessary for the approved session posture. Ten minutes trades interrupted logins against lingering attempts; it is an engineering default. Outstanding-attempt caps remain resource-dependent.

**Supports:** Q18–Q19/Q58 [protected access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q45 safe responses.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Login Transaction یک‌بارمصرف ۱۰دقیقه‌ای ریسک Replay را محدود می‌کند؛ نگهداری Refresh Token انتخاب نشده است.

---

## T65

### Codex original question and complete proposal (verbatim)

❓ **T65 — Enrollment procedure:** Shall a manager issue **a one-use enrollment reference**, followed by OIDC identity proof and explicit manager confirmation of that identity and responsibilities before access?

➡️ **Recommended: Yes.** Use copyable references without adding email delivery. First-manager bootstrap remains a separate, controlled local operator procedure disabled after bootstrap.

Preprovisioned issuer/subject values are simpler but difficult for managers to obtain. Provider-directory lookup adds vendor coupling. Immediate reference redemption reduces friction but weakens confirmation of the intended recipient. Pending identities remain restricted to relevant managers/operators.

**Supports:** Q18–Q19/Q50/Q58–Q59 — [membership and authority](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

دعوت یک‌بارمصرف و تأیید Manager بعد از اثبات OIDC جلوی دسترسی خودکار به صرف داشتن لینک را می‌گیرد.

---

## T66

### Codex original question and complete proposal (verbatim)

❓ **T66 — Schema/type implementation:** Shall we use **JSON Schema draft-07 with `@fastify/type-provider-json-schema-to-ts`**, sharing schema-derived transport types with the browser?

➡️ **Recommended: Yes.** Check representative contracts in CI and preserve rejection of mutation coercion, injected defaults, and unexpected fields.

Build-time type generation provides standalone types but adds generated-artifact coordination. TypeBox/Zod changes schema authoring/conversion. Static inference does not replace runtime validation, domain checks, or authorization. [Type-provider documentation](https://github.com/fastify/fastify-type-provider-json-schema-to-ts).

**Supports:** Q29 rejection; Q37 replay; Q45 [safe contracts](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

JSON Schema منبع قرارداد است، اما استنتاج TypeScript جای Runtime Validation یا Authorization را نمی‌گیرد.

---

## T67

### Codex original question and complete proposal (verbatim)

❓ **T67 — Versioned HTTP responses:** Shall `/api/v1` commands expose **action acknowledgment/reference separately from resource state**, with one allowlisted safe-error envelope?

➡️ **Recommended: Yes.** Include category/code, explanation, eligible next action, authorized references, and operational correlation. Domain-rejected confirmations retain inspectable records; invalid transport or unauthenticated input is not accepted business work.

Unstructured action-specific responses complicate recovery. RFC problem details is another valid foundation but still needs MediaForge-specific fields. Exact status mappings and transactional acknowledgment ordering remain downstream.

**Supports:** Q29/Q37; Q44–Q45 [observation and explanations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83); Q51 cancellation acknowledgment.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

تأیید Action و State منبع باید جدا گزارش شوند؛ خطای Transport نباید رکورد رد تجاری ساختگی بسازد.

---

## T68

### Codex original question and complete proposal (verbatim)

❓ **T68 — Polling and pagination defaults:** Shall we begin with **one non-overlapping poll every five seconds per visible desk view**, failure backoff capped at thirty seconds, and cursor pages of fifty records, maximum one hundred?

➡️ **Recommended: Yes.** Pause polling when hidden/offline; refresh after actions, focus, and reconnect. Show interrupted/stale observation when polling fails or pauses. Polls do not extend sessions.

Faster polling adds load; slower polling increases lag. Offset pagination shifts under insert/delete; snapshot pagination adds state. Use stable ordering with a unique tie-breaker, without claiming a frozen catalog or freshness SLA.

**Supports:** Q34/Q44 [truthful observation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83); Q58 current authorization.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Polling پنج‌ثانیه‌ای و Backoff تا سی ثانیه انتخاب اولیه‌اند، نه SLA تازگی داده‌ها.

---

## T69

### Codex original question and complete proposal (verbatim)

❓ **T69 — Browser server-state library:** Shall we use **TanStack Query v5**, explicitly disabling persistent protected caches, offline mutation queues, and automatic mutation retry?

➡️ **Recommended: Yes.** Clear protected state on logout, session failure, or identity change. Recovery keeps the original command reference. Avoid optimistic readiness, authorization, or accepted-selection claims.

Native fetch/React state removes a dependency but requires custom cache, cancellation, and race handling. TanStack manages synchronization mechanics; its cache is not authority. Defaults must be deliberately configured. [Query controls](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery), [mutation controls](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation).

**Supports:** Q37 replay; Q44 observation; Q51/Q57–Q58 [actions and selection](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:180).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Cache سمت مرورگر مرجع حقیقت نیست؛ Mutation Retry خودکار و Cache محافظت‌شده پایدار حذف می‌شوند.

---

## T70

### Codex original question and complete proposal (verbatim)

❓ **T70 — CI and host qualification:** Shall ordinary CI run **locked installation, type/schema checks, real PostgreSQL/filesystem HTTP integration, and Playwright**, with separate disposable Linux/systemd qualification gating release?

➡️ **Recommended: Yes.** Missing cgroup/systemd capability means unverified coverage—not passing substitutes.

One privileged runner provides fidelity but increases maintenance and exposure. Ordinary containers alone miss host supervisor behavior. Privileged qualification must not execute untrusted contributions. Exact vendor, host, fixtures, and fault matrix remain downstream.

**Supports:** [AC-01–AC-10 and failure/recovery acceptance](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:190), especially Q35/Q38–Q40/Q46–Q48/Q53.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

قبولی CI معمولی اثبات سازگاری systemd/cgroup نیست؛ Release باید تست Linux واقعی را پاس کند.

---

## T71

### Codex original question and complete proposal (verbatim)

❓ **T71 — Operator constraints for vendor selection:** Shall actual hosting/OIDC vendor selection remain gated until you provide **deployment/user-access regions, permitted hosting/identity-data regions, monthly budget and paid-service permission, and account ownership/recovery constraints**?

➡️ **Recommended: Yes.** Please include those actual constraints with your round response, plus any usable organizational identity arrangement you want considered—without credentials.

The repository cannot supply these preferences, and workstation timezone is not evidence. Managed services trade subscription/dependency costs against self-operation effort. No vendor or paid plan is proposed.

**“Yes” approves this gate only; it does not supply the missing inputs.**

**Supports:** Q18–Q19/Q58–Q59 [protected workspace operations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable. Operator inputs are recorded above; Yes alone was not treated as supplying them.

### Independent Persian educational note (not a Codex quotation)

ورودی واقعی کاربر در ایران، بودجه حداقلی و حساب شخصی است؛ Managed Vendor فقط پس از راستی‌آزمایی دسترسی، سیاست سرویس و تأیید هزینه قابل انتخاب است.

---

## T72

### Codex original question and complete proposal (verbatim)

❓ **T72 — Restore quarantine:** Shall restores begin **isolated, nonserving, and nonexecuting**, requiring access/expiry/deletion evidence checks and exclusion of old execution authority before activation?

➡️ **Recommended: Yes.** Do not automatically resume restored queued/running work or accept stale restored command/session authority. Activate fresh recovery authority only after reconciliation and old-host exclusion.

Automatic in-place restoration is faster but can revive deleted media, obsolete permissions, or duplicate launches. Quarantine adds operator work. Backup products, retention, RPO/RTO, deletion ledgers, and exact fencing remain open. Missing post-backup evidence blocks activation rather than being invented.

**Supports:** Q35/Q46/Q53 [recovery evidence](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124); Q24/Q52/Q54 retention; Q19/Q58 authorization.

### Learner-approved decision

**Yes — explicitly approved on 2026-10-14.** All original qualifications remain applicable.

### Independent Persian educational note (not a Codex quotation)

Restore قرنطینه‌شده مانع احیای خودکار مجوز، کارهای قدیمی و دستورهای معتبرنبوده می‌شود.

---

## Engineering synthesis and evidence gaps

Approved design directions cover atomic admission and fair claiming; expiring command intents; restricted broker/systemd executions; separated outcome/evidence dimensions; trusted handoff and recoverable publication; upload identity; source-validation evidence reuse; retention-aware compaction; candidate inspectors; secure sessions/enrollment; schema-driven APIs; polling/client cache behavior; CI and restore quarantine. The operational constraint gate has real user inputs, but no hosting or identity vendor, subscription, or paid spend is authorized.

**Unresolved downstream:** exact stop/inactivity proof, publication/cancellation ordering, time degradation, retrieval races, physical cutoff cleanup, backup retention and recovery, hardware sizing, media-engine qualification and provider selection. The handbook does not assert successful experiments or implementation. For video use existing `templates/notebooklm-round-video-prompt.md`, not a new prompt.
