# MediaForge — Product Discovery Round 2 (educational record)

**Status:** Q14–Q28 proposed by Codex; ChatGPT recommends Yes on all; **awaiting learner's explicit approval**. Codex reports Round 1 recorded approved in local discovery document, but this record does not independently verify that file. 

**Sources:** [approved PRD](prd.md), Round 2 questions supplied by learner. Original question and full proposed answer appear below; educational notes are separate and are not Codex quotations. No ADR or application implementation is claimed.

## Q14 — Supported input formats

**Codex exact question:**

Should V1 accept **static JPEG and PNG files only**, rejecting animated or multi-frame inputs and other formats with a specific explanation?

**Codex full recommended answer:**

Recommended: Yes. This provides a small, clear supported catalog. Additional raster formats would broaden compatibility but add validation and acceptance cases.
Input formats and preset output formats are independent choices.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** محدودسازی فرمت، وعده محصول را قابل تست می‌کند.

**Illustrative teaching example (not an approved policy):** ورودی متحرک توضیح اختصاصیِ عدم پشتیبانی دریافت می‌کند.

## Q15 — Initial preset catalog

**Codex exact question:**

Should V1 publish these three presets, all preserving aspect ratio, applying no crop, and never enlarging a smaller image?
| Preset | Output format | Maximum longest edge |
| JPEG 1600 | JPEG | 1,600 pixels |
| JPEG 800 | JPEG | 800 pixels |
| PNG 1600 | PNG | 1,600 pixels |

**Codex full recommended answer:**

Recommended: Yes. This offers two publication sizes and a PNG alternative while keeping the catalog small. Preserving the whole image avoids an automatic crop discarding important content.
Transparency, orientation, color, metadata, and JPEG quality rules follow once the catalog is approved.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** Presets رفتار تبدیل را برای مخاطب معین می‌کنند؛ جزئیات شفافیت و رنگ همچنان باز است.

**Illustrative teaching example (not an approved policy):** تصویر کوچک نباید بزرگ‌نمایی شود.

## Q16 — Source limits

**Codex exact question:**

Should each uploaded source satisfy **all three** of these limits?
- File size: at most **20 MiB**.
- Decoded image area: at most **40 million pixels**.
- Width and height: each at most **12,000 pixels**.

**Codex full recommended answer:**

Recommended: Yes. Separate byte, pixel-area, and dimension limits provide understandable boundaries for both ordinary photographs and unusually shaped images.
These are proposed admission limits, not processing-speed promises. Static images require no duration limit.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** حجم فایل، تعداد پیکسل و طول اضلاع سه حد مستقل‌اند.

**Illustrative teaching example (not an approved policy):** فایل فشرده کوچک می‌تواند تصویر Decode‌شده بسیار بزرگی باشد.

## Q17 — Variant selection bound

**Codex exact question:**

Should a request contain **at most three distinct presets**, with each preset selectable only once?

**Codex full recommended answer:**

Recommended: Yes. This supports the approved multiple-variant workflow while bounding each request. Repeating the same preset within one request adds little value because deliberate fresh processing already has its own request identity.
The cap remains three even if the published catalog later contains more presets; a smaller catalog naturally offers fewer choices.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** خروجی‌های یک درخواست مستقل‌اند و یک Preset در همان درخواست تکرار نمی‌شود.

**Illustrative teaching example (not an approved policy):** کاربر JPEG 800 را دوبار در یک درخواست انتخاب می‌کند.

## Q18 — Action permissions

**Codex exact question:**

Should V1 use the following product responsibilities, with roles combinable and every member receiving contributor capabilities?
| Responsibility | Additional permitted actions |
| Contributor | Upload sources; create requests; request eligible retry or cancellation of their own requests |
| Editor/reviewer | Set or clear “selected for use” on workspace outputs |
| Operations user | Request eligible retry, cancellation, or reconciliation for any workspace request |
| Workspace manager | All preceding actions; manage membership and roles; request eligible source/output deletion |
All current permitted members can inspect shared sources, history, and available outputs.

**Codex full recommended answer:**

Recommended: Yes. Contributors control their submissions, editors identify useful results, operations users handle recovery, and managers control access and removal.
This grants action authority. Later policies determine when an action is eligible and what it does. Reconciliation establishes outcomes from evidence; it does not permit manually declaring an unverified result successful.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** مجوز خواندن با مجوز تغییر و با شرایط واجد شرایط بودن عمل متفاوت است.

**Illustrative teaching example (not an approved policy):** Contributor نمی‌تواند خروجی کاربر دیگر را حذف کند.

## Q19 — Membership removal

**Codex exact question:**

Should removing a member **revoke subsequent access to workspace content and history**, while preserving their submitted assets, attribution, and ongoing requests inside the workspace?

**Codex full recommended answer:**

Recommended: Yes. The team can finish and review existing work after someone leaves. Membership removal would not itself cancel processing or delete content.
Separate cancellation and deletion actions remain available under their policies.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** سابقه و محتوا متعلق به Workspace باقی می‌ماند اما دسترسی شخص حذف‌شده قطع می‌شود.

**Illustrative teaching example (not an approved policy):** کاربر جداشده به درخواست قدیمی خودش هم دسترسی آینده ندارد.

## Q20 — Selection multiplicity

**Codex exact question:**

Should “selected for use” be an **independent, shared designation on each ready output**, allowing multiple outputs from the same source, preset, or request to be selected simultaneously?

**Codex full recommended answer:**

Recommended: Yes. Different variants can serve different publication needs. Selecting one does not silently clear another or establish a single authoritative winner.
An exclusive winner would require additional rules about which outputs compete and how replacement works.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** Selected بودن داوری ویرایشی است و انحصاری بودن را تحمیل نمی‌کند.

**Illustrative teaching example (not an approved policy):** دو اندازه خروجی هم‌زمان selected می‌شوند.

## Q21 — Variant lifecycle and availability

**Codex exact question:**

Should each processing variant have these lifecycle outcomes, while tracking current output availability separately?
- **Queued:** accepted and waiting to start.
- **Running:** processing or verification is confirmed underway.
- **Succeeded:** verification passed and the output became retrievable.
- **Failed:** definitive evidence establishes unsuccessful work.
- **Cancelled:** stopping is confirmed without a successful output for that variant.
- **Indeterminate:** available evidence cannot establish the outcome.
A confirmed request rejected before work has a request-level **Rejected** outcome.

**Codex full recommended answer:**

Recommended: Yes. This separates what happened during processing from whether the resulting content remains available now. For example, history could show “Succeeded — output expired,” while the output is no longer presented as ready or downloadable.
Aggregate request labels for mixed variants follow this decision.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** نتیجه تاریخی Succeeded از دسترس‌پذیری فعلی فایل جداست.

**Illustrative teaching example (not an approved policy):** فایل منقضی شده اما سابقه موفقیت حفظ می‌شود.

## Q22 — Cancellation granularity

**Codex exact question:**

Should V1 offer **request-wide cancellation of all unfinished variants**, preserving ready outputs already produced by that request?

**Codex full recommended answer:**

Recommended: Yes. Users get one clear cancellation action. Individual-variant cancellation would give finer control but require more eligibility and race rules.
Each affected variant still reports its own observed outcome. Request-wide cancellation cannot imply that successful siblings were undone.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** درخواست لغو به معنی لغو قطعی همه Variantها یا حذف خروجی موفق نیست.

**Illustrative teaching example (not an approved policy):** یک خروجی آماده مانده و دو خروجی هنوز ناتمام‌اند.

## Q23 — Action at the processing time budget

**Codex exact question:**

When a published processing budget expires, should the product **request stopping unfinished work**, then report the outcome according to the evidence available?

**Codex full recommended answer:**

Recommended: Yes. The budget provides a meaningful boundary rather than merely an advisory warning. It does not prove that processing stopped.
Confirmed ongoing work can show that stopping was requested; an outcome that cannot be established remains indeterminate. Later verified success may still resolve it, as approved in Q10.
The numerical budget follows the supported workload decisions.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** Timeout حکم قطعی شکست نیست و شواهد دیررس معتبر می‌مانند.

**Illustrative teaching example (not an approved policy):** اتصال قطع شده ولی خروجی بعداً قابل تأیید است.

## Q24 — Normal retention periods

**Codex exact question:**

Should these be V1’s ordinary expiry targets?
| Item | Proposed period |
| Source content | **7 days** from successful upload |
| Ready output content | **30 days** from becoming ready |
| Full request history, including rejected requests | **90 days** from confirmation |
| Failed or incomplete intermediate content | Remove within **24 hours** after it is definitively no longer used by active work |

**Codex full recommended answer:**

Recommended: Yes. This gives contributors a week to request transformations, reviewers a month to retrieve results, and the team a longer period to inspect outcomes.
Accepting these periods does **not** decide expiry during active or indeterminate work. Those exceptions and deletion consequences follow later. Essential provenance must remain associated with any retained output, even if full request history expires.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** چهار ساعت متفاوت برای Source، Output، History و Intermediate تعریف شده؛ استثنای کار فعال هنوز باز است.

**Illustrative teaching example (not an approved policy):** منبع پس از ۷ روز حذف شده اما خروجی تا ۳۰ روز قابل دسترس است.

## Q25 — Selection and retention

**Codex exact question:**

Should selecting an output for use **leave its expiry unchanged**, with its expiry visible to the reviewer?

**Codex full recommended answer:**

Recommended: Yes. Selection records intended use; it does not become an implicit archive promise. Reviewers retrieve selected content within the published availability period.
Automatic retention extensions would require additional duration and capacity policies.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** انتخاب محتوا موعد انقضا را تمدید نمی‌کند.

**Illustrative teaching example (not an approved policy):** Editor خروجی selected نزدیک انقضا را مشاهده می‌کند.

## Q26 — Source removal and existing outputs

**Codex exact question:**

Should deleting or expiring a source **preserve its existing ready outputs until their own deletion or expiry**, together with their provenance?

**Codex full recommended answer:**

Recommended: Yes. Source and derived-content availability remain independent. Reviewers can retrieve an existing result after its original source is unavailable, and history clearly identifies that source as deleted or expired.
New processing requires available source content. Removal while work is active or indeterminate remains a dependent question.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** عمر Source از خروجی مشتق‌شده جداست؛ Provenance باقی می‌ماند.

**Illustrative teaching example (not an approved policy):** خروجی PNG بعد از انقضای Source هنوز موجود است.

## Q27 — Admission when waiting capacity is full

**Codex exact question:**

Should V1 accept a **bounded number of waiting requests**, then reject additional confirmations with a clear capacity explanation and inspectable reference when that limit is reached?

**Codex full recommended answer:**

Recommended: Yes. Accepted requests have an honest queued state; rejected requests do not appear accepted or promise eventual processing.
Users can deliberately submit again when capacity becomes available. Exact active and waiting limits follow the workload and cardinality decisions. This selects observable admission behavior, not an execution mechanism.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** پذیرش و رد تحت فشار، تعهد قابل مشاهده برای کاربر است؛ سازوکار صف هنوز انتخاب نشده.

**Illustrative teaching example (not an approved policy):** ظرفیت پر است و درخواست شماره رهگیری با نتیجه رد می‌گیرد.

## Q28 — Overlapping processing

**Codex exact question:**

Should a fresh request be blocked when any selected preset already has **queued, running, or indeterminate work for the same source identity**, directing the user to that existing request?

**Codex full recommended answer:**

Recommended: Yes. This gives two workspace members a clear recovery path and limits unnecessary overlapping work. The user can remove the overlapping preset and request other variants.
After the earlier work has a definitive outcome, fresh processing or eligible retry can proceed. Reconfirmation of the same request continues to refer to that request. A separately uploaded source has its own identity, even when its bytes match.

**ChatGPT recommendation (pending product-owner approval):** Yes.

**Educational analysis:** منع هم‌پوشانی با Reconciliation قابل انجام تکمیل می‌شود؛ وضعیت نامعلوم نباید بن‌بست شود.

**Illustrative teaching example (not an approved policy):** درخواست مشابه به کار Running قبلی ارجاع داده می‌شود.

## Notes for learning

- Product policies do not select storage, processing frameworks or worker topology.
- A processing outcome and present-day output availability are distinct.
- Active/indeterminate retention, precise converter semantics, retry eligibility and role action eligibility still need explicit follow-up; no additional Codex question is invented in this dossier.
- For video, use this dossier plus prd.md. NotebookLM prompts are supplied uniquely in chat, not saved as reusable templates.
