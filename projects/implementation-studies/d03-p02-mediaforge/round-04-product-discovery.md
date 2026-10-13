# MediaForge — Product Discovery Round 4: Educational dossier

**Date:** 2026-10-13  
**Status:** Q47–Q59 are Codex recommendations, **PENDING PRODUCT-OWNER APPROVAL**. Codex reports Round 3 Q29–Q46 recorded approved locally; this is not an independent verification of its local document.  
**Approved PRD baseline:** [prd.md](prd.md)  
**Nature:** exact Codex question and recommendation text supplied in Round 4, followed by clearly labeled separate learning commentary. No architecture, implementation, or ADR inferred.

## Q47 — Complete ready checks

**Codex — exact question:**

Should an output become ready only when all these conditions hold?

- It is nonempty, fully decodable, and retrievable by a permitted actor.
- Its actual format matches the selected preset.
- Its source, preset, and request association is exact.
- Its longest edge equals the smaller of the oriented source’s longest edge and the preset limit.
- Its other dimension preserves aspect ratio within one pixel of rounding, with neither cropping nor upscaling.
- It satisfies the approved orientation, color, transparency, and embedded-metadata policies.
- Cancellation and reconciliation rules still permit accepting it.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** These give each preset a concrete readiness contract. Failure of a required check prevents readiness and produces a verification explanation. Verification methods belong to technical discovery.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** قرارداد پذیرش خروجی فقط ساخت فایل نیست؛ تطابق محتوا، فرمت، ابعاد، Provenance، و مجاز بودن انتشار باید همگی برقرار باشند.

**Approval status:** Pending.

## Q48 — Visual quality acceptance

**Codex — exact question:**

Should release acceptance include representative photographs, text/logos, transparent edges, color and grayscale images, orientation-tagged images, and small or extreme-aspect images?

For supported cases, outputs must show no unintended crop, rotation, missing regions, gross color shift, or distracting compression artifacts at their intended display size.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** This establishes a useful publication-quality standard alongside structural checks. JPEG is allowed to be lossy; no pixel-identical result or compression-ratio promise is made.

Visual review of these sample cases is a release acceptance activity. Individual requests do not require human approval before becoming ready. Specific encoder settings and sample-file preparation remain for technical discovery.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** Visual acceptance نمونه‌ای در زمان انتشار با بررسی خودکار Ready برای تک‌درخواست متفاوت است؛ JPEG الزاماً Pixel-identical نیست.

**Approval status:** Pending.

## Q49 — Retry-count ceiling

**Codex — exact question:**

Should V1 have **no additional lifetime retry-count ceiling**, while retaining every approved eligibility, source-expiry, overlap, capacity, and time-budget constraint?

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Users can deliberately retry eligible failures during source availability. A separate attempt ceiling would introduce another recovery restriction without replacing the existing workload bounds.

Repeated failures remain visible; no retry promises a different result.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** نبود سقف مادام‌العمر به معنی Retry خودکار یا بی‌محدودیت واقعی نیست؛ سایر شروط همچنان برقرارند.

**Approval status:** Pending.

## Q50 — Shared-source processing and attribution

**Codex — exact question:**

Should any current workspace member be able to create fresh processing from an available workspace source, with each new request—including a retry—attributed to its **initiating member**?

Its per-user capacity allowance belongs to that initiator. Original source attribution and parent-request lineage remain visible. Contributor recovery authority covers requests they initiated; operations users and managers retain workspace-wide recovery authority.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Shared visibility supports shared processing without confusing source authorship with request ownership.

Accepted work from removed members continues to consume workspace capacity under its existing limits.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** Source submitter و Request initiator می‌توانند متفاوت باشند؛ مجوز و سهم ظرفیت به آغازکننده درخواست وابسته است.

**Approval status:** Pending.

## Q51 — Cancellation-action responses

**Codex — exact question:**

Should cancellation report an action response separately from the processing outcome?

| Situation                                           | Action response       |
| --------------------------------------------------- | --------------------- |
| Eligible unfinished work receives the stop request  | **Stop requested**    |
| Every variant already succeeded                     | **Already completed** |
| Every variant already cancelled                     | **Already cancelled** |
| Other definitive outcomes leave nothing eligible    | **No eligible work**  |
| Eligibility or acknowledgment cannot be established | **Cannot confirm**    |

Repeated confirmation of the same cancellation action would recover its result without creating new processing work.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** “Stop requested” cannot be mistaken for confirmed cancellation. Actual variant outcomes continue to determine the request summary.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** پاسخ API/اکشن درباره پذیرش فرمان توقف است، نه ادعای نتیجه قطعی پردازش.

**Approval status:** Pending.

## Q52 — Retained history and provenance

**Codex — exact question:**

Should full history retain the following readable information?

- Source identity, original filename, submitting member, basic media metadata, and availability.
- Selected preset name and its definition at confirmation.
- Request/output identities, initiating member, known timestamps, outcomes, and safe explanations.
- Retry links, cancellation/budget events, expiry/deletion, and selection history.

Should standalone source metadata history last **90 days from upload**, with necessary source provenance continuing inside retained requests and outputs?

After ordinary full-history expiry, an unresolved record would retain only the identities, safe evidence summary, timestamps, and reservation information needed for reconciliation and capacity accounting.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Content removal does not erase understandable provenance. The minimal unresolved record contains no retained media or privileged diagnostics.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** Retention تاریخچه و Retention بایت‌های رسانه متفاوت است؛ استثنای سابقه حداقلی برای عملیات حل‌نشده نباید رسانه را نگه دارد.

**Approval status:** Pending.

## Q53 — Bound unfinished work after a stop request

**Codex — exact question:**

Should the approved **24-hour resolution and output-acceptance cutoff** start at the earliest of:

- A user cancellation request.
- A waiting or processing budget expiring and requesting stopping.
- The variant first becoming indeterminate.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** This closes the gap where work remains confirmed running after stopping was requested.

At the cutoff, unfinished artifacts lose promotion eligibility and content held solely for that unfinished work is removed. Already ready outputs keep their retention. The product continues to show the evidenced state—running or indeterminate—and holds capacity until inactivity is confirmed.

This explicitly qualifies Q46’s original indeterminacy-only trigger. It does not treat the cutoff as proof of stopping.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** این پیشنهاد Q46 را از نظر مبدأ بازه دقیق‌تر می‌کند. خروجی پس از Cutoff قابل Ready شدن نیست، اما وضعیت Running/Indeterminate بدون شاهد عوض نمی‌شود.

**Approval status:** Pending.

## Q54 — Duration and clock-reset rules

**Codex — exact question:**

Should all durations mean **elapsed time**, with a day equal to 24 hours, and should their original anchors remain unchanged by refresh, repeated confirmation, reconciliation, or selection?

An explicit new request receives new request budgets and history timing. It does not restart the source’s lifetime. An output’s lifetime begins when it first becomes ready.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Availability and deadlines remain predictable. Repeated actions cannot extend retention or recovery windows.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** زمان سپری‌شده و Anchorهای تغییرناپذیر جلوی تمدید ضمنی انقضا را می‌گیرند.

**Approval status:** Pending.

## Q55 — Temporary output unavailability

**Codex — exact question:**

If a genuinely ready output later cannot be confirmed retrievable, should the product suspend its current ready/retrieval claim and show availability as **unconfirmed or unavailable**, while preserving historical success?

The editor’s recorded selection would remain visible with an unusable warning and be excluded from currently usable selections. Verified restoration of the same content would restore availability with the same identity and original expiry.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** A retrieval problem does not automatically invalidate earlier processing or erase editorial intent. Restoration cannot silently substitute newly processed content, reset retention, or trigger automatic reprocessing.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** حفظ موفقیت تاریخی با اعلام صادقانه نبود دسترسی فعلی سازگار است. Restoration باید همان محتوا را بازگرداند.

**Approval status:** Pending.

## Q56 — Evidence that an earlier success was false

**Codex — exact question:**

If definitive evidence establishes that an output originally failed a required check, should the product **correct the variant to verification failure**, visibly retaining the earlier claim and its correction in history?

The invalid output loses readiness and active selection. Valid siblings remain unchanged; a new retry is available only under the approved eligibility rules.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Historical records must acknowledge an incorrect success claim rather than preserve it as unquestioned truth. This differs from genuine success followed by later availability loss in Q55.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** Correction با Availability outage متفاوت است: ادعای موفقیت قدیمی غلط بوده و باید تاریخچه اصلاح شفاف بماند.

**Approval status:** Pending.

## Q57 — Concurrent selection changes

**Codex — exact question:**

Should the **latest accepted explicit set-or-clear action** determine a shared output’s selection, with the last actor and time visible?

Repeating the same action would recover its result without toggling or reapplying an earlier choice that another editor has since superseded. A newly attempted selection requires a currently ready output and current editor permission.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** This keeps selection reversible and understandable without introducing a collaborative approval workflow.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** آخرین اقدام پذیرفته‌شده ملاک است؛ Replay اقدام قبلی نباید تصمیم جدیدتر Editor دیگر را برگرداند.

**Approval status:** Pending.

## Q58 — Retrieval crossing expiry or revocation

**Codex — exact question:**

Should download and preview retrieval check current permissions and content availability **when the retrieval is accepted**, with an already accepted transfer permitted to finish?

Expiry, deletion, or membership removal immediately blocks new retrieval requests and unauthorized selection actions. Having opened a page earlier grants no continuing authority for later actions.

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** This gives retrieval a clear authorization boundary and avoids interrupting a transfer already legitimately accepted.

This explicitly clarifies Q19: immediate revocation governs subsequent access requests; it does not retroactively cancel an accepted transfer.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** قطع مجوز مانع درخواست بعدی است، نه الزاماً انتقالی که قبل از قطع مجوز پذیرفته شده است.

**Approval status:** Pending.

## Q59 — Last-manager protection

**Codex — exact question:**

Should the product reject removal or demotion that would leave the workspace with **no current workspace manager**, requiring another manager to be assigned first?

**Codex — complete recommended answer:**

➡️ **Recommended: Yes.** Someone remains authorized to manage membership, deletion, and recovery. Initial identity provisioning remains a technical-discovery matter.

**ChatGPT review (not owner approval):** Recommend Yes.

**Educational analysis (not a Codex quote):** این قاعده از بن‌بست مدیریت Workspace جلوگیری می‌کند، بدون تعیین شیوه ایجاد حساب اولیه.

**Approval status:** Pending.

## Learning synthesis

Q47/Q48 distinguish per-output ready verification and sample-based visual release acceptance. Q51 separates accepting a cancellation action from the actual variant outcome. Q53 qualifies Q46 by starting the 24-hour cutoff on the earliest stopping/uncertainty event while leaving evidence-based activity status and capacity accounting intact. Q55 and Q56 distinguish temporary unavailability from a proven false readiness claim. Q58 clarifies Q19 access revocation at the retrieval-acceptance boundary.

**NotebookLM:** use this file plus `prd.md` as sources; ChatGPT supplies a bespoke Round 4 video prompt in chat. No template stored.
