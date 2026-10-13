# MediaForge — Product Discovery Round 1: Educational dossier (Handbook copy)

**Date:** 2026-10-13  
**Phase:** Product Discovery using Matt Pocock `grill-with-docs`  
**Decision status:** **PENDING PRODUCT-OWNER CONFIRMATION**. Codex proposed 13 defaults; ChatGPT reviewed and recommended **Yes** on all 13. **This dossier does not claim the learner sent or confirmed those answers.**  
**Canonical approved PRD:** https://github.com/h3nrzi/nodejs-backend-engineering-handbook/blob/main/domains/03-nodejs-internals/projects/p02-mediaforge-asset-processing-prd.md  
**Canonical PRD copy in this archive:** [prd.md](prd.md).  
**External learning dossier:** https://github.com/h3nrzi/mediaforge/blob/main/docs/learning/product-discovery-round-01.md  
**Purpose:** Human-readable source for NotebookLM educational lesson/video; not an ADR, approved decision register, tech spec, or implementation ticket.

## Background

MediaForge is a limited content-asset transformation desk for editorial teams. Users submit supported media, request curated variants, follow independently attributable processing results and retrieve only verified ready outputs. The original approved PRD prohibits arbitrary executable plugins and unbounded general-purpose processing. Its core promises include honest partial/failure status, provenance, access control, retries, and cancellation as a request rather than guaranteed rollback.

The `grilling` skill asks all currently independent and ready decisions together as a frontier round. Questions dependent on Round 1 answers are reserved for subsequent rounds. `domain-modeling` sharpens domain vocabulary and records approved terms without silently selecting technical architecture.

## Thirteen questions and educational analysis

### Q1 — Initial media category

**Codex proposal (unapproved):** V1 فقط تصاویر raster ثابت را پردازش کند.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** دامنه تست و بازبینی خروجی قابل‌کنترل؛ صوت/ویدئو سیاست‌های زمان و پخش اضافه می‌کنند.

**Questions for later rounds (not decided):** فرمت‌ها، presetها، ورودی پذیرفته‌شده.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q2 — Multiple variants per request

**Codex proposal (unapproved):** هر درخواست چند preset با نتیجه مستقل برای هر variant داشته باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** با AC-03 (موفقیت یک خروجی و شکست دیگری) سازگار است؛ گزارش ترکیبی باید صادق باشد.

**Questions for later rounds (not decided):** حداکثر variants، نتیجه کلی mixed، لغو جزئی.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q3 — Source intake

**Codex proposal (unapproved):** فقط آپلود مستقیم فایل.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** ورود از URL از دامنه اولیه خارج می‌شود و موضوع تغییر منبع دوردست را حذف می‌کند.

**Questions for later rounds (not decided):** فرمت آپلود و حدود ورودی.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q4 — Source identity and replacement

**Codex proposal (unapproved):** محتوای source تغییرناپذیر باشد؛ آپلود مجدد هویت تازه بگیرد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** Provenance تاریخی با نام فایل مشترک یا محتوای تکراری مخدوش نمی‌شود.

**Questions for later rounds (not decided):** رفتار تشخیص تکراری‌ها و نمایش تاریخچه.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q5 — Workspace count

**Codex proposal (unapproved):** V1 یک workspace مدیریت‌شده داشته باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** حدود دامنه عضویت و قابلیت‌های تیمی ساده می‌ماند.

**Questions for later rounds (not decided):** مدل عضویت و نقش‌ها.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q6 — Content visibility

**Codex proposal (unapproved):** اعضای مجاز workspace بتوانند محتوای منبع/تاریخچه/خروجی را ببینند.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** بازبینی تیمی ممکن می‌شود، اما سطح مشاهده نباید با اجازه حذف یا لغو یکسان فرض شود.

**Questions for later rounds (not decided):** مجوزهای مجزا برای خواندن، دانلود، retry، cancel، select و delete.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q7 — Review selection

**Codex proposal (unapproved):** برچسب برگشت‌پذیر selected for use فقط روی خروجی ready.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** درستی فنی خروجی با پسند یا انتخاب انسانی اشتباه نمی‌شود؛ approval حرفه‌ای اضافه نمی‌شود.

**Questions for later rounds (not decided):** چه کسی انتخاب می‌کند، دامنه انتخاب، سرنوشت آن هنگام انقضا.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q8 — Retention model

**Codex proposal (unapproved):** دوره‌های محدود و اعلام‌شده با انقضای خودکار.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** وعده نگهداری دائمی داده نمی‌شود؛ پاکسازی بخشی از انتظار محصول است.

**Questions for later rounds (not decided):** زمان دقیق، مبدأ شمارش، سیاست history و وضعیت نامعلوم.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q9 — Cancellation eligibility

**Codex proposal (unapproved):** برای queued و running امکان درخواست لغو وجود داشته باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** درخواست لغو لزوماً به معنای لغو قطعی یا بازگرداندن اثر نیست.

**Questions for later rounds (not decided):** لغو کل درخواست یا variant، برچسب نتیجه رقابت لغو/تکمیل.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q10 — Later uncertainty resolution

**Codex proposal (unapproved):** وضعیت indeterminate با شواهد قطعی آینده قابل اصلاح باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** timeout دلیل کافی برای نسبت‌دادن شکست نیست؛ خروجی معتبر بعدی ممکن است ثابت شود.

**Questions for later rounds (not decided):** مسئول پیگیری، deadline و وضعیت رفع ابهام.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q11 — Who initiates recovery attempts

**Codex proposal (unapproved):** Retry تجاری نیاز به اقدام صریح کاربر مجاز داشته باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** تلاش پنهانی تازه ایجاد نمی‌شود؛ با بازیابی داخلی در لایه فنی تفاوت دارد.

**Questions for later rounds (not decided):** شرایط مجاز retry، حدود تلاش.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q12 — Deliberate repeat processing

**Codex proposal (unapproved):** درخواست تازه و صریح برای همان source/preset خروجی مستقل بسازد و قبلی را حفظ کند.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** Fresh Request با Retry یا تکرار تأیید همان درخواست یکسان نیست.

**Questions for later rounds (not decided):** شناسایی درخواست تکراری، هزینه و دسترسی به سابقه.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

### Q13 — Rejected request history

**Codex proposal (unapproved):** درخواست تأییدشده ولی ردشده reference و دلیل خوانا داشته باشد.

**ChatGPT recommendation (not product-owner approval):** Yes.

**Reasoning / teachable trade-off:** رد اعتبارسنجی پیش از پردازش با شکست پس از پذیرش تفکیک می‌شود.

**Questions for later rounds (not decided):** دسته‌بندی رد، طول نگهداری تاریخچه.

**Teaching exercise:** برای یک سناریوی واقعی توضیح بده این قاعده چه چیزی را برای کاربر تضمین می‌کند، و چه تضمینی از آن نمی‌توان نتیجه گرفت.

## Cross-cutting concepts to teach

1. **Ready vs selected:** اعتبار خروجی پردازش‌شده با انتخاب انتشار توسط ویرایشگر یکی نیست.
2. **Cancellation requested vs cancelled:** لحظه درخواست لغو به تنهایی شواهدی درباره انجام/عدم انجام پردازش نیست.
3. **Indeterminate vs failed:** نبود پاسخ، اثبات شکست نیست؛ ممکن است بعداً شواهد قطعی برسد.
4. **Retry vs fresh request vs duplicate confirmation:** این سه مسیر، هویت و انتظار کاربر متفاوت دارند.
5. **Workspace visibility vs permissions:** دیدن محتوا به معنای مجوز انجام عملیات تغییردهنده نیست.
6. **Immutable source vs bytes deduplication:** ثبات هویت یک قرارداد محصول است، نه انتخاب storage.

## Proposed answers awaiting owner

**Q1–Q13:** ChatGPT recommends accepting all Codex defaults, with three safeguards: (a) action permissions remain separate from workspace visibility; (b) numeric retention and expiry mechanics remain open; (c) retry and explicitly fresh processing remain distinct. The owner must explicitly confirm and relay to Codex before updating the approved decision record.

## What is not decided

Specific image formats, presets and output validity checks; numeric size, count and concurrency limits; roles and action permissions; detailed cancellation/reconciliation and retry states; retention duration and expiry triggers; aggregate status for mixed variants; implementation architecture, data model, converter, background job mechanism, or tests.

## Recommended NotebookLM usage

Add this dossier and the approved PRD as sources. Use the generic prompt from the Handbook: `templates/notebooklm-engineering-round-video-prompt.md`. Ask for sequential chapter-by-chapter treatment of Q1–Q13; keep proposal, recommendation and actual approval status separate. If the learner later confirms these decisions, update this status with verification evidence rather than rewriting the historical proposal.
