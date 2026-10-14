# MediaForge — Technical Discovery Round 3 (T26–T49)

**Date:** 2026-10-14  
**Learner approval:** All 24 Codex recommendations T26–T49 explicitly approved as Yes.  
**External Codex recording and ADRs:** Pending verification; none claimed for this round.  
**Basis:** Complete learner-supplied Technical Discovery Round 3. Original Codex question, full recommendation, alternatives, and supports are retained verbatim below. ChatGPT teaching notes are separate.

## T26

### Original Codex question and full recommendation (verbatim)

❓ **T26 — Cutoff compliance:** Shall we **preserve the approved content cutoff and require demonstrated cleanup compliance before release**, returning any unavoidable residual-content exception for separate Product Owner approval?

➡️ **Recommended: Yes.** Linux can unlink a file while a running process still holds it open; its content remains until the final reference closes. Therefore, unlinking alone cannot prove removal of unfinished content at the Q46/Q53 cutoff. [Linux unlink semantics](https://man7.org/linux/man-pages/man2/unlink.2.html).

An alternative would explicitly define application-namespace removal as sufficient despite surviving handles. That requires Product Owner clarification; it cannot be silently introduced as an engineering interpretation.

Approval here preserves the contract and establishes a feasibility gate. It **does not approve a residual-content exception** or introduce forensic-erasure requirements.

**Supports:** Q41, Q46, Q53 — [cutoff and retention](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

فایل Unlinkشده ممکن است همچنان از طریق File Descriptor باز قابل‌دسترسی باشد. در پذیرش این تصمیم، هیچ استثنای ماندگاری محتوا تأیید نشده؛ اثبات پاکسازی پیش از Release شرط است.

---

## T27

### Original Codex question and full recommendation (verbatim)

❓ **T27 — PostgreSQL release line:** Shall we use **PostgreSQL 18**, pinning a qualified current minor/security release?

➡️ **Recommended: Yes.** It is a supported release line. Older supported majors may simplify particular host packages but shorten the upgrade runway; an unqualified newer major introduces compatibility work. Exact packaging and minor updates remain subject to qualification. [Official version policy](https://www.postgresql.org/support/versioning/).

**Supports:** Q28, Q39 transactional admission; Q52 [durable history](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

نسخه اصلی PostgreSQL انتخاب می‌شود؛ Minor release و بسته میزبان باید هنگام انتخاب و استقرار ارزیابی شود.

---

## T28

### Original Codex question and full recommendation (verbatim)

❓ **T28 — Database interface and migrations:** Shall we use **parameterized explicit SQL through node-postgres, with versioned SQL migrations managed by node-pg-migrate**?

➡️ **Recommended: Yes.** Explicit SQL makes locking and transactional behavior visible. Transactions must use one checked-out database client. [node-postgres transaction guidance](https://node-postgres.com/features/transactions).

An ORM or query builder offers mapping and typing conveniences, but its generated transaction/locking behavior still needs scrutiny. Explicit SQL costs more handwritten mapping and validation. Migrations run outside HTTP request handling; deployment and rollback choreography remain open.

**Supports:** Q28, Q39 [admission consistency](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107); Q52 history; Q59 last-manager protection.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

SQL صریح امکان دیدن تراکنش و قفل را می‌دهد؛ هزینه آن نگاشت دستی داده و نیاز به تست دقیق است.

---

## T29

### Original Codex question and full recommendation (verbatim)

❓ **T29 — Durable queue:** Shall **PostgreSQL hold accepted waiting requests and dispatch intents**, with a restartable dispatcher scanning durable state and no separate broker initially?

➡️ **Recommended: Yes.** This keeps admission and queued-work authority together.

Redis or another broker supplies scheduling machinery but introduces another recovery and consistency boundary. An in-memory queue cannot independently survive restart. Optional PostgreSQL notifications may wake the dispatcher, but remain hints rather than authoritative queued work.

Claiming, fairness ordering, and dispatch intervals remain downstream.

**Supports:** Q27–Q28, Q38–Q40, Q50 — [admission, fairness, and reservations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

PostgreSQL مرجع انتظار و Dispatch است؛ Notification صرفاً کمک برای بیدارکردن Dispatcher خواهد بود.

---

## T30

### Original Codex question and full recommendation (verbatim)

❓ **T30 — Transactional coordination:** Shall invariant-changing operations use **short transactions that acquire one persistent workspace guard row**, then recheck eligibility and accept the effect?

➡️ **Recommended: Yes.** Coarse coordination is understandable at one workspace and two processing reservations. Database constraints provide additional protection.

Fine-grained locking or serializable transactions can improve concurrency but add retry/deadlock reasoning. Media decoding, large file operations, external calls, and process waits must happen outside the guard.

Current roles and membership participate in effect acceptance; middleware-only authorization would leave removal races. Exact fairness, publication, and transfer protocols remain open.

**Supports:** Q18–Q19, Q58–Q59 [authority](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q28/Q39 admission; Q57 selection ordering.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

قفل Guard Row برای یک Workspace مناسب است، اما پردازش تصویر نباید در محدوده تراکنش انجام شود.

---

## T31

### Original Codex question and full recommendation (verbatim)

❓ **T31 — Clock authority:** Shall we use **database-observed UTC for persisted anchors/deadlines, monotonic timers for live execution, and monitored host time health**, failing closed where time uncertainty makes an action unsafe?

➡️ **Recommended: Yes.** Browser clocks are unsuitable authorities. Wall clocks can jump; monotonic clocks alone cannot reconstruct elapsed time across reboot.

Database timestamps must represent the actual decision point: PostgreSQL `now()` represents transaction start, potentially before lock waiting. [Timestamp semantics](https://www.postgresql.org/docs/18/functions-datetime.html).

Clock-health thresholds and degraded behavior remain open. Uncertainty must never reset anchors, fabricate cancellation, or release reservations.

**Supports:** Q24, Q38, Q46, Q53–Q54 — [elapsed budgets and resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

زمان ثبت‌شده دیتابیس و زمان Monotonic دو مسئله متفاوت را حل می‌کنند؛ زمان‌سنج اشتباه نباید وضعیت را قطعی جلوه دهد.

---

## T32

### Original Codex question and full recommendation (verbatim)

❓ **T32 — Command references after history expiry:** Shall the server issue **actor/action-bound, expiring command intents**, so missing or expired references cannot be recreated as new effects?

➡️ **Recommended: Yes.** First acceptance binds the canonical payload and result; retained accepted records support authorized replay.

Arbitrary client-generated keys need durable tombstones or another verifiable expiry mechanism after history pruning. Server-issued intents add a preparation round trip but make expired-reference rejection explicit.

Draft intents are not accepted processing requests and start no processing clocks. Exact lifetimes, token format, key rotation, and restore behavior remain open; replay cannot extend approved history retention.

**Supports:** Q37 [reconfirmation](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:146); Q51 action replay; Q52/Q54 history; Q57 superseded selections.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

Command Intent صادرشده توسط سرور از بازتولید یک فرمان قدیمی پس از حذف تاریخچه جلوگیری می‌کند؛ خود Intent عملیات پذیرفته‌شده نیست.

---

## T33

### Original Codex question and full recommendation (verbatim)

❓ **T33 — Execution granularity:** Shall **each variant conversion and each validation, verification, or preview task have its own identified, one-shot supervised execution**?

➡️ **Recommended: Yes.** The processing request retains its reservation and five-minute clock across sequential sibling executions.

A whole-request worker reduces startup overhead but broadens its lifetime and access across siblings. Persistent native workers complicate task-specific stopping and evidence. One-shot execution costs process starts, which must be qualified against the budget.

This does not select aggregate auxiliary concurrency or authorize automatic business retries.

**Supports:** Q16/Q29 input handling; Q34 mixed outcomes; Q38–Q40 [request budgets](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107); Q47 verification.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

اجرای جداگانه هر Variant شواهد بهتری فراهم می‌کند، ولی هزینه راه‌اندازی باید در بودجه پنج‌دقیقه‌ای سنجیده شود.

---

## T34

### Original Codex question and full recommendation (verbatim)

❓ **T34 — Restricted execution controller:** Shall a **small trusted local broker own systemd launch, stop, and inspection**, accepting only approved execution identities and operations?

➡️ **Recommended: Yes.** The broker constructs fixed executable, sandbox, and resource settings rather than accepting arbitrary unit properties from HTTP handlers.

Broad system-manager authority in the API is simpler but expands privileged execution exposure. Delegated user-manager control is another option requiring host/controller qualification.

The broker’s transport, privilege profile, authentication, and restart protocol remain open. Media and HTTP processes receive no general system-manager credentials.

**Supports:** Q35, Q46, Q53 [cancellation and evidence](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124); T14’s privilege boundary.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

Broker کوچک مرز دسترسی Privileged را کم می‌کند؛ هنوز روش ارتباط، هویت و مجوزهای آن باید طراحی شود.

---

## T35

### Original Codex question and full recommendation (verbatim)

❓ **T35 — Publication authority and ordering:** Shall **media children write staging only**, while a trusted publisher establishes immutable durable final bytes, arranges isolated verification, and then conditionally commits readiness?

➡️ **Recommended: Yes.** Children receive neither database credentials nor final-store write access. Final candidates remain inaccessible until readiness commits.

Database-first readiness risks referencing absent content. Letting converters publish and mark themselves ready broadens their authority. File-first publication instead creates recoverable orphan-file cases.

Exact ownership handoff, no-clobber operation, filesystem synchronization, cancellation ordering, and orphan recovery remain downstream.

**Supports:** Q35/Q53 cancellation eligibility; Q47, Q55–Q56 [verified readiness and availability](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

فایل خروجی باید با سیاست انتشار کنترل‌شده تثبیت و تأیید شود؛ Orphan file و Crash میانی همچنان قابل‌وقوع هستند.

---

## T36

### Original Codex question and full recommendation (verbatim)

❓ **T36 — OIDC client and callback security:** Shall we use **openid-client 6.x**, with PKCE S256, fresh single-use state/nonce, a configured issuer/audience, and exact registered callbacks?

➡️ **Recommended: Yes**, with a qualified pinned patch and short-lived server-side login transactions. The library fits the approved Node/ESM direction. [Official client documentation](https://github.com/panva/openid-client).

Vendor SDKs can simplify vendor-specific integration but increase coupling. Assembling OIDC validation ourselves adds protocol work. Arbitrary browser-supplied issuer discovery would not be permitted.

**Supports:** Q18–Q19, Q58 [protected access](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q45 safe errors.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

پروتکل OIDC و تنظیمات ضد Replay/CSRF حساس‌اند؛ Patch و تنظیمات واقعی قبل از استفاده باید اعتبارسنجی شوند.

---

## T37

### Original Codex question and full recommendation (verbatim)

❓ **T37 — Session persistence and browser protection:** Shall sessions use **PostgreSQL-backed opaque tokens, storing only token digests**, with login rotation, logout invalidation, protected cookies, and CSRF checks?

➡️ **Recommended: Yes.** Use a `Secure`, `HttpOnly`, `__Host-` cookie with `Path=/`, no `Domain`, and `SameSite=Lax`; require synchronizer CSRF tokens and origin checks for mutations, including uploads.

Client-carried sessions reduce lookups but complicate revocation. Memory-only sessions disappear on restart; Redis introduces another service. SameSite alone is insufficient as the general mutation defense. [Session guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

**Supports:** Q18–Q19, Q58 — [current authorization](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

نشست با Token تصادفی و هش ذخیره‌شده امکان ابطال را فراهم می‌کند؛ SameSite جای دفاع CSRF را به‌تنهایی نمی‌گیرد.

---

## T38

### Original Codex question and full recommendation (verbatim)

❓ **T38 — Session lifetime and identity-provider outages:** Shall sessions expire after **eight hours absolutely or thirty minutes of meaningful user inactivity**, with polling excluded from activity?

➡️ **Recommended: Yes.** These are proposed engineering values. Shorter lifetimes reduce exposure but interrupt review; longer lifetimes improve convenience.

Unexpired local sessions may continue during an identity-provider outage while current workspace checks succeed. New login fails safely. Local logout invalidates the MediaForge session; provider-wide logout or account-disable propagation requires a separately selected integration.

Session expiry does not cancel accepted work or reset product clocks.

**Supports:** Q19, Q50, Q58 [access and accepted work](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q44 observation.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

مدت هشت ساعت مطلق و سی دقیقه عدم فعالیت پیشنهاد مهندسی است؛ Polling نباید نشست را زنده نگه دارد.

---

## T39

### Original Codex question and full recommendation (verbatim)

❓ **T39 — Identity binding and first manager:** Shall we bind stable local member identities to **validated issuer/subject**, prohibit automatic email linking or public enrollment, and bootstrap the first manager through an explicit one-time operator action?

➡️ **Recommended: Yes.** Thereafter, workspace managers assign membership and responsibilities.

First-login ownership creates a deployment race. Email-based linking relies on a claim that can change or be reused; OIDC guarantees identity stability through issuer/subject. [Claim stability](https://openid.net/specs/openid-connect-core-1_0.html#ClaimStability).

Controlled bootstrap adds an operator step. Account recovery and provider migration require explicit audited remapping; concrete enrollment/bootstrap procedures remain open.

**Supports:** Q18–Q19, Q50, Q58–Q59 — [workspace identity and authority](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

اتصال هویت به Issuer/Subject از اشتباه لینک‌کردن حساب‌ها با ایمیل جلوگیری می‌کند؛ Manager اولیه نیازمند اقدام کنترل‌شده است.

---

## T40

### Original Codex question and full recommendation (verbatim)

❓ **T40 — Identity-provider operating model:** Shall the provider shortlist **prefer a managed OIDC service**, subject to actual accessibility, region, cost, and account-control qualification?

➡️ **Recommended: Yes.** This avoids operating another credential service for V1.

Self-operated Keycloak offers control but adds identity-server, database, TLS, administration, recovery, and resource responsibilities. Managed identity adds an external dependency and possible subscription constraints.

This approves a shortlist preference only. It selects no vendor, paid plan, account creation, or purchase. Disqualified managed options would trigger a self-operated proposal.

**Supports:** Q18–Q19, Q58–Q59 — [identity/access boundary](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

اولویت Managed OIDC فقط روش Shortlist است، نه خرید یا انتخاب یک Provider قطعی.

---

## T41

### Original Codex question and full recommendation (verbatim)

❓ **T41 — Structural and declared-metadata inspection:** Shall validation include **bounded inspection of original JPEG/PNG structure and declared metadata alongside complete pixel decoding**?

➡️ **Recommended: Yes.** Normalized decoder metadata can conceal original precision, ignored animation declarations, or problematic profiles. Results must correlate with immutable byte identity; unexplained discrepancies cannot establish acceptance.

Engine-only inspection reduces integration work but has identified blind spots. A different all-in-one engine still needs qualification. Exact inspector/profile-validation components remain open; this does not approve handwritten codecs.

The [PNG specification](https://www.w3.org/TR/png-3/#4Concepts.APNG) permits static decoders to ignore animation chunks, so decoding one image does not establish static-only input.

**Supports:** Q14/Q16, Q29–Q32 [strict input and metadata rules](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:7); Q47 readiness.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

موفقیت Decode، تشخیص انیمیشن، عمق رنگ اصلی یا سلامت Profile را تضمین نمی‌کند؛ بررسی ساختار مستقل لازم است.

---

## T42

### Original Codex question and full recommendation (verbatim)

❓ **T42 — Decoder diversity:** Shall the initial assurance baseline **permit a separate full candidate decode using the same qualified codec stack**, without mandating a second independent runtime decoder?

➡️ **Recommended: Yes**, explicitly accepting common-mode codec risk while retaining independent expected properties, separately sourced fixtures, and visual qualification.

A genuinely independent decoder reduces some shared implementation failures but adds dependencies, resource consumption, and disagreement rules. A different wrapper around the same underlying codecs does not establish independence.

This chooses an assurance posture, not Sharp adoption or passing evidence. Failure to meet required checks still blocks adoption/release.

**Supports:** Q29 strict decoding; Q47–Q48, Q55–Q56 [verification and correction](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:42).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

استفاده از Codec مشترک برای Decode دوم، خطر Common-mode Failure دارد؛ با پذیرش ریسک، تست‌های مستقل و بصری ضروری‌اند.

---

## T43

### Original Codex question and full recommendation (verbatim)

❓ **T43 — Canonical API schemas:** Shall **versioned application-owned JSON Schema define request/response contracts**, with derived or checked TypeScript types and explicit response allowlists?

➡️ **Recommended: Yes.** Mutation bodies should reject unexpected fields and wrong types instead of silently stripping or coercing them.

Fastify’s defaults can alter input, which matters when binding canonical command payloads. [Validation defaults](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/).

Zod/TypeBox-first authoring is another workable approach but adds a schema-conversion choice; separate handwritten types can drift. URL/query parsing remains explicit. Domain-confirmation rejection must still produce its required inspectable record.

**Supports:** Q29 rejection; Q37 replay; Q45 [safe contracts and explanations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

Schema نسخه‌دار باید بدون تغییر پنهانی Payload و با پاسخ Allowlistشده به Idempotency کمک کند.

---

## T44

### Original Codex question and full recommendation (verbatim)

❓ **T44 — Integration seams and browser harness:** Shall **public HTTP workflows be the main integration seam**, using real PostgreSQL/filesystem, with Playwright for browser flows and separate real Linux/systemd acceptance?

➡️ **Recommended: Yes.** Controlled execution and clock seams enable deterministic faults, while real process/resource tests establish behavior doubles cannot prove.

Browser-only tests make races harder to control; unit-only tests miss persistence and execution boundaries. Playwright supplies isolated browser contexts. [Browser isolation](https://playwright.dev/docs/browser-contexts).

No production authentication bypass or public fault-injection endpoints are proposed. Concrete fixtures, hooks, and CI environments remain open.

**Supports:** [AC-01–AC-10 and race/recovery acceptance coverage](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:190).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

تست HTTP با PostgreSQL و فایل واقعی، و تست جداگانه systemd/Linux، پوشش متفاوت و مکمل فراهم می‌کنند.

---

## T45

### Original Codex question and full recommendation (verbatim)

❓ **T45 — Operational telemetry placement:** Shall we initially use **private journald logs with execution context and bounded storage**, plus locally protected operational counters, without an external telemetry service?

➡️ **Recommended: Yes.** This fits the accepted host supervision model.

External telemetry improves off-host visibility but adds service, cost, access, and retention boundaries. Flat files require separate rotation and correlation. Request/execution IDs belong in events rather than unbounded metric-label sets.

Exact age/disk caps, diagnostic access, thresholds, and alerts remain open. Journal entries never replace authoritative outcome evidence.

**Supports:** Q44–Q45 [safe observation and explanations](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:83); Q46/Q52 minimal evidence retention.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

journald ابزار دید عملیاتی است، نه مرجع نتایج کسب‌وکار و اثبات توقف.

---

## T46

### Original Codex question and full recommendation (verbatim)

❓ **T46 — Aggregate backpressure:** Shall we enforce **one host-wide resource-admission budget across all media operations**, with bounded validation/preview work and protected headroom for admitted processing and essential services?

➡️ **Recommended: Yes.** Conversion limits alone ignore decoding, previews, native threads, temporary files, transfers, and logs.

Independent unbounded auxiliary queues would hide overload. We must qualify both product processing reservations together with auxiliary and system headroom, rather than silently reducing approved capacity.

Exact memory/CPU/disk limits, auxiliary concurrency, timeouts, and hardware remain evidence-dependent.

**Supports:** Q16 input limits; Q27, Q38–Q40 [bounded capacity and budgets](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:107).

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

بودجه منابع باید Validation و Preview و Upload و اجرای اصلی را با هم بسنجد و ظرفیت مصوب دو درخواست را حفظ کند.

---

## T47

### Original Codex question and full recommendation (verbatim)

❓ **T47 — Protected media delivery:** Shall downloads and previews use **application-mediated authorized streaming**, without public media directories or reusable URLs that bypass current access checks?

➡️ **Recommended: Yes.** Each new transfer must pass current authorization and availability checks; an already accepted transfer may finish.

Direct static/object delivery can simplify transfers but must supply equivalent revocation and expiry enforcement. Long-lived bearer URLs do not satisfy that boundary by themselves.

The exact acceptance/file-open race protocol, caching, range support, and availability checks remain downstream.

**Supports:** Q19/Q58 [transfer authorization](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:64); Q24/Q42 expiry/deletion; Q33 preview protection.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

هر انتقال جدید باید مجوز فعلی را بررسی کند؛ انتقال معتبر از قبل پذیرفته‌شده اجازه اتمام دارد.

---

## T48

### Original Codex question and full recommendation (verbatim)

❓ **T48 — Execution identity and stale launches:** Shall we **persist launch intent before launch, never reuse execution IDs, and bind host/boot plus supervisor invocation identity**, fencing stale launch authority before accepting inactivity evidence?

➡️ **Recommended: Yes.** PID-only tracking, missing units, stale heartbeats, and expired leases cannot establish that the intended execution is inactive.

Durable identity and fencing add coordination work. Whole-cgroup inactivity evidence is meaningful only for the correctly identified, confined execution with delayed starts prevented. Reboot evidence likewise requires genuine host/boot identification.

Detailed broker/claim/restart protocols remain downstream. Lease expiry alone triggers neither automatic rerun nor reservation release.

**Supports:** Q35, Q46, Q53 [evidence-based resolution](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:124); Q39 reservations.

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

هویت اجرای ماندگار، Host/Boot و Fencing از نسبت‌دادن شواهد اجرای منقضی‌شده به اجرای جدید جلوگیری می‌کند.

---

## T49

### Original Codex question and full recommendation (verbatim)

❓ **T49 — Acknowledged database durability:** Shall authoritative commands and evidence retain **filesystem synchronization and local synchronous commit**, acknowledging accepted effects after durable local commit?

➡️ **Recommended: Yes.** Asynchronous commit can acknowledge changes that a subsequent crash loses; disabling synchronization can risk corruption. [PostgreSQL durability settings](https://www.postgresql.org/docs/18/runtime-config-wal.html).

Durable commit costs I/O latency and depends on truthful storage-flush behavior. It does not protect against destroyed/lost host storage and establishes no backup or disaster-recovery guarantee.

**Supports:** Q37 replay; Q39 reservation accounting; Q52 [durable history](/Users/hossein/Projects/mediaforge/docs/product/v1-product-policies.md:156).

---

### Approved learner decision

**Yes — explicitly approved on 2026-10-14.** All caveats and dependent open choices in the original proposal remain binding. T26 does **not** approve any residual-content exception.

### Separate educational analysis — ChatGPT

Commit محلی Sync از تأیید زودهنگام جلوگیری می‌کند؛ در برابر از دست رفتن کامل Host یا Disk جای Backup نیست.

---

## Engineering synthesis and open dependent questions

This round sets foundational directions for cutoff proof, PostgreSQL version and migration, queue/guard coordination, time authority, command intent, supervisor/broker identities, publication boundaries, OIDC/session safety, metadata inspection, codec-diversity risk, API contracts, browser/Linux test seams, telemetry, host resource controls, protected transfer, execution fencing and durable commit. Decisions do **not** establish completed implementation, empirical media engine qualification, proven inactivity, compliant retention cleanup, capacity sizing or passing tests.

**Next:** send learner-approved T26–T49 to Codex; have the installed domain-modeling skill evaluate only qualifying architecture ADRs; preserve product policies and PRD, then request the complete next engineering frontier. For video learning, reuse `templates/notebooklm-round-video-prompt.md` (no per-round prompt).
