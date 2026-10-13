# MediaForge — Product Discovery Round 3: Educational dossier

**Date:** 2026-10-13  
**Approval:** Q29–Q46 **APPROVED by product owner on 2026-10-13** (all recommended Yes, with the documented safety/liveness caveat for Q39/Q46). External Codex decision-log update not yet verified. All 18 questions and full recommendation texts below are transcribed from the learner-provided Codex Round 3 message, not independently verified against local Codex documents.  
**Round 2:** Codex reports Q14–Q28 recorded as approved.  
**Source of product scope:** [approved PRD](prd.md).  
**Architectural ADRs:** none verified; no implementation result claimed.

## Q29 — Validation and admission

**Codex — exact question:**

Should validation use the file’s **actual content as authoritative**, require a nonempty, fully decodable supported image within the published limits, and reject damaged inputs without attempting repair?

A filename or supplied file-type mismatch would produce a warning and display the detected format. An invalid source, preset selection, or admission condition would reject the **whole confirmation before variant processing**, with an inspectable explanation.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This prevents partially accepted requests and unexpected repairs. A supported PNG named `.jpg` can still be accepted with a clear warning; damaged image content cannot.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** اعتبار محتوا بر پسوند غلبه دارد؛ ورودی خراب تعمیر خودکار نمی‌شود.

## Q30 — Color and precision support

**Codex — exact question:**

Should V1 support RGB and grayscale images, including indexed-color PNG, with **at most eight bits per color component**, and normalize derived appearance to **sRGB**?

Valid, interpretable embedded color profiles would be honored. Untagged inputs would be interpreted as sRGB. CMYK inputs, higher-precision inputs, and invalid or uninterpretable profiles would receive specific rejection explanations.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This establishes a focused web-publication policy. Professional print color and higher-precision workflows would require broader support and acceptance cases.

These restrictions would be published alongside “JPEG and PNG supported.”

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** فرمت فایل به‌تنهایی تمام حالت‌های رنگ و عمق بیت را تضمین نمی‌کند.

## Q31 — Transparency

**Codex — exact question:**

Should JPEG presets **composite transparent areas onto white**, while PNG 1600 **retains transparency**?

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Users receive a predictable JPEG background and can choose PNG when transparency matters. Background-color selection would add another transformation option to the fixed catalog.

The JPEG behavior must be visible before confirmation.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** سفیدشدن شفافیت در JPEG و حفظ آن در PNG باید به کاربر اعلام شود.

## Q32 — Orientation and embedded metadata

**Codex — exact question:**

Should derived outputs apply valid embedded orientation to their visible appearance, then **remove embedded EXIF, location information, comments, and other nonessential metadata**?

Required output color information would remain. Source/preset/request provenance would remain in MediaForge’s records. Original source bytes would stay unchanged. Missing orientation means the stored pixel orientation; malformed declared orientation is rejected rather than guessed.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Outputs appear upright without carrying incidental source metadata into publication. Reviewers retain provenance through the desk.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** Orientation درست و حذف اطلاعات موقعیت مکانی به انتشار امن کمک می‌کند.

## Q33 — Review information

**Codex — exact question:**

Should review provide **image previews for available sources and ready outputs**, accompanied by:

- Format, dimensions, and byte size.
- Source, preset, and request references.
- Relevant timestamps and expiry.
- Current availability and selection-for-use designation.

Failed or incomplete artifacts would expose safe status information rather than previews or downloads.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** An editor can assess the image and its origin before retrieval. A preview does not independently establish readiness or selection.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** Preview و Metadata جایگزین بررسی Ready و مجوز دسترسی نیستند.

## Q34 — Aggregate request labels

**Codex — exact question:**

Should request summaries use this mapping, always showing individual variant counts and current output availability?

| Variant situation | Request label |
|---|---|
| All variants queued | **Queued** |
| Any queued/running work, except the all-queued case | **In progress** |
| No queued/running work, but an indeterminate variant remains | **Indeterminate** |
| All variants succeeded | **Succeeded** |
| Some succeeded; all others failed or cancelled | **Partially succeeded** |
| All failed | **Failed** |
| All cancelled | **Cancelled** |
| Mixture of failed and cancelled, with no success | **Incomplete** |
| Confirmation rejected before processing | **Rejected** |

An in-progress request containing indeterminate variants would explicitly flag that uncertainty. Stop requests and exceeded budgets would be additional indicators.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Mixed outcomes stay visible without multiplying ambiguous summary states. Historical success is accompanied by current availability, so expired outputs cannot appear ready.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** وضعیت تجمیعی باید شکست جزئی و وضعیت نامعلوم را روشن نگه دارد.

## Q35 — Cancellation races

**Codex — exact question:**

Should a variant become **Succeeded** if it becomes verified and ready before definitive cancellation, even when stopping was already requested?

If stopping is confirmed before readiness, the variant becomes **Cancelled**, and its unfinished artifacts cannot later be promoted to ready. If the ordering or outcome cannot be established, it remains **Indeterminate**.

A cancellation submitted after every variant is already definitive reports no eligible work and preserves the existing outcomes.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This establishes a clear publication boundary: requesting cancellation does not erase success, while confirmed cancellation prevents later publication of unfinished artifacts.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** درخواست لغو با لغو قطعی برابر نیست؛ نتیجه به ترتیب شواهد بستگی دارد.

## Q36 — Retry eligibility and lineage

**Codex — exact question:**

Should retry create a **new, explicitly linked request for selected definitively failed or cancelled variants**, provided that:

- The original source is available and unexpired.
- The actor has recovery permission.
- No overlapping queued, running, or indeterminate source/preset work exists.
- Admission limits permit the new request.

Prior outcomes and ready outputs remain unchanged. Rejected confirmations are corrected through a fresh submission; running, indeterminate, and succeeded variants are not retry targets.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Recovery addresses unsuccessful variants without repeating successful siblings. A failed variant can be retried while a different preset in the original request continues, provided the overlap rule is satisfied.

Retry-count limits follow this eligibility decision.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** Retry فقط برای پیامد شکست یا لغو قطعی با درخواست لینک‌شده جدید است.

## Q37 — Missing acknowledgment and repeated confirmation

**Codex — exact question:**

Should returning after a missing acknowledgment first recover or inspect the **same confirmation’s request reference**, with repeated confirmation resolving to that same request?

If the reference has expired, the product reports that limitation and requires a deliberate fresh confirmation. It never silently treats replay of an old confirmation as new processing.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** A disconnected contributor can investigate what happened before deciding to request more work. This preserves the distinction between reconfirmation, retry, and fresh processing.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** تأیید تکراری و Retry و Fresh Request سه مفهوم متمایزند.

## Q38 — Numerical time budgets

**Codex — exact question:**

Should V1 publish:

- **15 minutes** from accepted confirmation for the first variant to start.
- **5 minutes** from the first variant starting for the request’s remaining work, including verification and any remaining waits.

Exceeding either budget requests stopping unfinished work under Q23.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This gives bounded waiting and processing expectations for the approved image limits and three-variant maximum. It makes no promise that every accepted request will finish successfully within those budgets.

The request-wide budget applies regardless of execution topology.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** بازه‌های ۱۵ و ۵ دقیقه حد سیاستی‌اند نه SLA نتیجه قطعی.

## Q39 — Active and waiting limits

**Codex — exact question:**

Should V1 publish these limits?

| Capacity | Workspace maximum | Per submitting member |
|---|---:|---:|
| Requests occupying processing capacity | **2** | **1** |
| Accepted requests waiting to start | **10** | **3** |

Each request counts once, regardless of its variant count. Indeterminate work retains its existing capacity reservation until evidence establishes that it is no longer active.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This bounds accepted workload and prevents one contributor from consuming every slot.

Uncertainty can temporarily reduce usable capacity. Age alone would not release a reservation and permit potentially overlapping work.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** ابهام طولانی می‌تواند ظرفیت کمیاب را مسدود کند؛ نیازمند فرایند بازیابی روشن است.

## Q40 — Fairness

**Codex — exact question:**

Should waiting requests advance by **oldest eligible accepted confirmation first**, without priority based on role?

A request temporarily ineligible under its submitter’s active limit can be skipped so another eligible request can proceed.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Contributors receive an understandable fairness rule while eligible work can continue. Operations and manager responsibilities grant recovery authority rather than preferential processing.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** قدیمی‌ترین درخواست واجد شرایط جلو می‌رود؛ نقش‌ها اولویت نمی‌سازند.

## Q41 — Source expiry during known active work

**Codex — exact question:**

Should the normal seven-day source expiry prevent **new requests and retries**, while allowing previously accepted, confirmed queued/running work to retain the source content it needs under its published budgets?

Once that work is definitively inactive, retained source content would be removed within 24 hours. Indeterminate work would follow its separately decided uncertainty policy.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** A request accepted shortly before source expiry can finish without gaining an unlimited processing extension.

This is an explicit, limited exception to normal source removal for already accepted work; it does not restore user-facing source availability.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** انقضای معمول Source کار معتبرِ در جریان را ناگهانی تخریب نمی‌کند.

## Q42 — Explicit deletion eligibility

**Codex — exact question:**

Should manager-requested source deletion be **blocked while any referencing request has unfinished work, including indeterminate work**?

The manager can request cancellation and reconciliation first. Individual ready outputs can be deleted independently, preserving siblings, source identity, and historical processing outcomes.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Explicit source deletion cannot silently disrupt unresolved work. Output deletion immediately removes its retrieval eligibility and is shown as **Deleted**, without rewriting its historical processing outcome.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** حذف منبع در حالی که عملیات ناتمام است ایمن نیست؛ حذف Output مستقل است.

## Q43 — Selection after expiry or deletion

**Codex — exact question:**

Should permanent output expiry or deletion **remove its active “selected for use” designation**, while retaining the former designation in available history?

Selection would never transfer automatically to another output, including a retry result.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Current selections refer to retrievable results. An editor deliberately selects a replacement rather than inheriting a choice made about different content.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** انتخاب ویرایشی با حذف/انقضا پایان می‌پذیرد ولی تاریخچه حفظ می‌شود.

## Q44 — Observation and progress

**Codex — exact question:**

Should V1 display:

- Request and variant states.
- Confirmation/start times where known, and the last confirmed evidence time.
- Counts of variants by outcome.
- The current activity stage when known.
- Stop-request and exceeded-budget indicators.

V1 would make **no percentage-complete or estimated-finish-time promise**.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Counts describe actual variant outcomes without implying how much processing remains. For example, “one ready, one running, one queued” is useful even when total work cannot be measured.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** نمایش درصد ساختگی ممنوع؛ وضعیت و شمارش واقعی مفیدتر است.

## Q45 — Customer-facing explanations

**Codex — exact question:**

Should V1 use stable reason categories for invalid/unsupported input, limits, unavailable source, capacity, overlap, processing failure, verification failure, exceeded budget, uncertain outcome, and unavailable output?

Explanations would identify the affected request or variant, explain the known limitation, and offer an eligible next action. Unauthorized access would receive a generic explanation that reveals no protected asset details.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** Users can distinguish correction, waiting, retry, and operations attention. Privileged diagnostics and hidden inputs remain outside customer-visible explanations.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** پیغام قابل‌اقدام به معنی افشای اطلاعات حساس نیست.

## Q46 — Bounded reconciliation of indeterminate work

**Codex — exact question:**

Should an indeterminate variant have a **24-hour reconciliation and output-acceptance window**, beginning when it becomes indeterminate?

During that window, definitive evidence can resolve it, and a verified retrievable output can become ready. After the window:

- Request stopping any possibly continuing work.
- Remove unfinished artifacts and prevent their later promotion to ready.
- Preserve already ready outputs under their normal retention.
- Keep an unresolved outcome explicitly indeterminate.
- Retain the minimal unresolved-status and capacity-reservation record until evidence confirms inactivity; full request history still follows its ordinary 90-day period.

**Codex — full recommended answer (verbatim):**

➡️ **Recommended: Yes.** This bounds retention of unfinished content and late delivery while preserving honest uncertainty. It can leave capacity unavailable until operations obtains stopping evidence.

The minimal unresolved record is an **explicit exception to ordinary history expiry**. It does not extend source/output availability or permit indefinite retention of unfinished media. Evidence arriving later can still correct the known outcome, but cannot revive purged content as a ready deliverable.

**Codex proposal:** Yes. **ChatGPT review:** Yes. **Product-owner decision:** Approved Yes (2026-10-13), preserving Q39/Q46 safety/liveness caveat.

**Educational interpretation, not a Codex quote:** پنجره ۲۴ساعته پذیرش خروجی را محدود می‌کند ولی وضعیت نامعلوم ممکن است ادامه یابد.

## Concepts for educational review

Product admission and image correctness; color/metadata safety; separation of historical result and availability; cancellation/retry races; honest progress; capacity under indeterminate outcomes. All decisions in Q29–Q46 are **learner-approved**; evidence of Codex recording remains pending. Do not assume architectural choices or tests. A video prompt is supplied in the conversation, not saved as a template.
