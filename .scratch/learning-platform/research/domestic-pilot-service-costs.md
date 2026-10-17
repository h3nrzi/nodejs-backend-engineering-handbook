# Domestic pilot service costs and billing conditions

Evidence retrieved **2026-10-17**. This resolves **Verify domestic pilot service costs and billing conditions** as bounded research for **Estimate pilot operating costs and approve a spending limit**. It selects no provider, architecture, budget or authentication method. No account, purchase, contact, deployment or Iranian learner-network test was performed.

## Result

A modest managed Liara **core subtotal is 1,700,000 toman per nominal month**; an illustrative resource/headroom subtotal is **3,300,000 toman**. These are conditional estimates, **not complete operating budgets or verified feasible bundles**. Add independent backup, any domain and support inbox, applicable invoice tax, unverified usage charges, recovery allowance and any legal/permission costs. Liara email is optional at **1,475,000 toman/month**; requiring both a paid transactional sender and a second paid mailbox is not justified by the current scope.

Confirmed owner estimate scenario, relayed in this session: three months; 10 invited learners, up to 3 concurrent; two small courses/100 text lessons; 500 MB images/content; 1 GB learner/publication database budget; **5 GB total independent backup allowance**; 10 GB monthly delivery; no video/download delivery. These are estimation inputs, not approved product limits or measured capacity. Text, images, code and practice do not themselves establish the runtime memory needed. Required automated email notifications are excluded; account provisioning/recovery remains undecided. The owner subsequently confirmed no existing domain or support inbox, intends to acquire .ir before live operation, and wants a low-cost receiving mailbox with registration and applicable renewal counted.

## Evidence and price integrity

Used Context7 `resolve-library-id` for Liara, selected official `/liara-cloud/docs`, and queried account/billing and service-pricing documentation. Context7 supplied useful capability leads but no reliable current tariff. Followed those leads to official pages and the official docs repository, checked at commit [`c11c03c19b7bf0e51102b16dceb5105b8e341c47`](https://github.com/liara-cloud/docs/tree/c11c03c19b7bf0e51102b16dceb5105b8e341c47). No authenticated API request was made.

Use the **canonical current [pricing page](https://liara.ir/pricing/)**. Search results also expose an [official subdomain copy](https://mail.liara.ir/pricing/) with materially lower prices (Earth 209,000, Opal 589,000 toman) and old gift-credit copy. Those figures conflict with today's canonical page and are **not used**. Public prices are observations, not a contractual quote or proof a plan is currently orderable. The [account API docs](https://docs.liara.ir/references/api/get-info/) distinguish available plans and state free credit is currently unavailable. Deduct no promotional credit.

The live pricing page's [loaded tariff and tier component](https://liara.ir/_next/static/chunks/2818-8380b3718881954e.js) was also inspected read-only because feature details are interactive. Its totals **add hardware and feature package**. The displayed Base total already contains the package: do not add it twice. Asset URLs may change; this report records the values observed, and a later checkout must revalidate them.

All money below is **Iranian toman**, with **1 toman = 10 Iranian rial**. This conversion is arithmetic, not foreign-exchange conversion. For example 1,700,000 toman = 17,000,000 rial. Prices are not USD.

## Published service inputs

| Candidate input | Nominal monthly toman | Hourly toman | Included resources / relevant limits |
| --- | ---: | ---: | --- |
| Earth PaaS or DBaaS, Base | 750,000 each | 1,041 each | 0.512 GB RAM, 0.5 vCPU, 5 GB disk |
| Earth PaaS or DBaaS, Silver | 950,000 each | 1,319 each | Same hardware; Silver package |
| Mars PaaS or DBaaS, Base | 1,300,000 each | 1,805 each | 1 GB RAM, 1 vCPU, 10 GB disk |
| Mars PaaS or DBaaS, Silver | 1,650,000 each | 2,291 each | Same hardware; Silver package |
| Object storage | 475,000 | 659 | Entry 20 GB |
| Opal email | 1,475,000 | Not published in table | 500 sends/day, 5,000/month; 2 addresses; latest 2,500 messages |

Sources: [current pricing](https://liara.ir/pricing/), [tier component](https://liara.ir/_next/static/chunks/2818-8380b3718881954e.js), [object product](https://liara.ir/products/object-storage/), [email product](https://liara.ir/products/email/). Silver figures are sums of the published hardware/package values: Earth 475,000 + 475,000; Mars 825,000 + 825,000. Base is Earth 475,000 + 275,000; Mars 825,000 + 475,000.

The **current feature component** marks Base automatic/manual backups unavailable. Silver lists daily copies for seven days and manual copies, with 45 GB backup space on Earth and 90 GB on Mars. It lists seven-day resource-history availability for Base and 30 days for Silver, with the corresponding app-log windows. App builds on Base are limited to 20 deployments/day, 128 MB source and five minutes. Content storage and build-source limits are different: shipping all 500 MB of images in the source archive may violate the Base build-source limit even though runtime disk has room. [Current tier component](https://liara.ir/_next/static/chunks/2818-8380b3718881954e.js).

Generic [database backup docs](https://docs.liara.ir/dbaas/postgresql/how-tos/create-backup/) say daily automatic backups without stating the package dependency. The newer/current pricing matrix is narrower: **do not promise automatic DB backups on Base** until the actual selected plan is confirmed. This is why the modest scenario costs a Silver DB. Silver product backup space does not count as the independent 5 GB allowance.

## Conditional cost scenarios

The app-plus-managed-database pairing is an **estimate structure**, not a decision that separate DBaaS is required. A single-service persistence route, static deployment or different database engine needs its own technical and recovery assessment before using a lower price.

| Scenario | Monthly core | Three nominal months | With optional Opal monthly | With optional Opal for three months |
| --- | ---: | ---: | ---: | ---: |
| Modest: Earth Base app + Earth Silver DB | 1,700,000 | 5,100,000 | 3,175,000 | 9,525,000 |
| Headroom: Mars Silver app + Mars Silver DB | 3,300,000 | 9,900,000 | 4,775,000 | 14,325,000 |

These totals are **before the unresolved items below**. They assume one always-running app and one DB, no paid separate staging environment, and no permanent duplicate recovery runtime. Headroom increases resource capacity and app backup/build features; it does not establish a throughput SLA or high availability.

Monthly/hourly ratios approximate **720 hours/30 days**, with displayed-hourly rounding. Treat monthly columns as nominal estimates, not a calendar-month cap. Conservative 31-day planning by multiplying by 31/30 gives core **1,756,667–3,410,000 toman**, or **3,280,834–4,934,167** with Opal, before other items; the email hourly/proration contract remains unverified. Three actual calendar months can exceed 90 days. Recompute from the final authenticated quote and actual billing rules before a ceiling is relied on.

A complete cap needs explicit terms:

`monthly cash need = quoted service total + actual tax + B + M + D + U + R + L`

- **B**: independent 5 GB backup destination, export/restore transfer and storage. Unknown; not zero.
- **M**: usable dedicated support inbox. Conditional annual-priced candidate below; short-period cash quote remains unknown.
- **D**: .ir registration/renewal, annual commitment and registrar prerequisites. Conditional registration tariff below; exact renewal remains unknown.
- **U**: any charge for delivery traffic, extra disks/storage, build resources or other metered usage outside the confirmed quote. Unknown; not zero.
- **R**: an owner-set recovery/contingency allowance covering temporary duplicate services and incident work. Distinguish authorized monthly spending from ring-fenced reserve.
- **L**: applicable legal/permission/advisor costs. Unknown; no exemption or free advice is assumed.

This formula prevents presenting a core subtotal as a complete budget. For **illustrative tax sensitivity only**, 10% or 12% added to the nominal core would give **1,870,000/1,904,000** for modest and **3,630,000/3,696,000** for headroom. Neither percentage is a verified applicable tax rate. Confirm the invoice's actual rate and whether displayed prices already include any tax before calculating tax, to avoid double counting.

## Billing, identity and credit risks

Liara's [privacy policy](https://liara.ir/privacy-policy/) says signup includes identity verification and collects operator name, national ID, email and phone. The [account API docs](https://docs.liara.ir/references/api/get-info/) expressly identify individual accounts (`REAL_PERSON`) and identity/email/phone verification fields. This is evidence an individual account type exists, not proof the owner meets exact KYC or service eligibility. Exact document, SIM-owner matching, foreign-national code, recovery and payment-card-name requirements were not established. Do not send identity documents into public tickets.

The [top-up instructions](https://docs.liara.ir/references/console/increase-credit/) require entering the amount **in rial**, then proceeding to payment. The documentation does not publicly identify the currently accepted gateway/card network. Owner-held Iranian cards therefore support a **conditional domestic billing route**, not a verified successful method.

The [terms](https://liara.ir/terms/) require truthful official identity details; refund evidence includes ID image, originating bank-card/IBAN, and only unused balance can qualify. The published minimum payment is **10,000,000 rial = 1,000,000 toman**. VAT is included in the final invoice under applicable law; no percentage is stated. Gift codes expire; no ordinary paid-wallet expiry was established. Insufficient credit causes immediate suspension and Base account services/copies may be irreversibly deleted after **24 hours**. Customer backups remain the customer's responsibility. Provider support covers infrastructure, not the application's maintenance. These obligations require rechecking before contracting.

A **Base feature package on a service is not the same thing as the account subscription level** governing the suspension table. Neither costing Silver features nor buying more RAM establishes a longer account-level deletion grace period. Obtain the actual account-level terms if that protection matters.

Provider [notification settings](https://docs.liara.ir/references/console/set-notifs/) exist; the [API documentation](https://docs.liara.ir/references/api/get-info/) describes a manually adjustable low-credit alert threshold. That does **not** establish a provider-enforced monthly spending cap, automatic stop before a ceiling, guaranteed alert delivery or a safe shutdown retaining data. A small wallet is especially unsafe as a substitute for cost control.

The owner's controls are confirmed planning requirements: hard monthly ceiling, separate setup approval, no automatic upgrade/top-up, early warnings and recovery allowance. Possible future controls must be verified before operation: approved fixed plans; bill/usage review; runway-based balance threshold; an alert route surviving app/provider failure; owner response before depletion; tested exports; explicit end-of-pilot export/closure procedure. They authorize no present purchase or configuration.

## Image delivery, independent backup and recovery

**Do not automatically buy object storage** for 500 MB content: the priced app's 5 GB disk may suffice, subject to deployment, persistence, private access and build/archive design. The [persistent disk docs](https://docs.liara.ir/paas/disks/increase-value/) explain disk resize/restart work; they supply no current per-GB surcharge. Resizing must respect disk consumption and application needs.

The current site supplies no precise PaaS/DBaaS/object-storage 10 GB traffic tariff, included allowance, fair-use numeric threshold, request charge or extra-disk rate in the reviewed public material. The pricing page's **2,500 toman/GB and 200,000/month IPv4 note is under IaaS**; it must not be applied to PaaS or object storage. No VPS is included here. Older unlimited-traffic announcements do not establish current contractual zero-cost delivery. Revalidate each selected product in the quote; 10 GB is the assumed workload, not an evidenced included quota.

An object bucket in the **same Liara account** shares credit/deletion exposure. It is not an independent backup simply because it is a different product. Conditional independent routes are encrypted owner-controlled off-provider storage with sufficient spare capacity, or a separately qualified backup provider/account. **No owner device, spare storage, existing paid account or free capacity is confirmed**; B remains unknown. A 20 GB Liara bucket price cannot be relabelled as an independent backup quote.

Liara documents [exporting object contents locally](https://docs.liara.ir/object-storage/how-tos/create-backup-using-rclone/) and [restoring PostgreSQL from an exported backup](https://docs.liara.ir/dbaas/postgresql/how-tos/restore-backup/). These are capability evidence, not completed backup/restore tests. Require exports of content, database, publication state and necessary configuration; protect keys separately. Choose retention/version count within 5 GB, verify actual compressed sizes and restoration into a fresh target, and set recovery objectives later. Five GB is a total allowance, not five GB per day; a 1 GB DB plus 0.5 GB content may leave only a few uncompressed complete generations. Legal preservation/erasure duties remain separately qualified.

At published hourly rates, one **additional** Earth Silver DB for a 24-hour restore exercise is approximately **31,656 toman**, or an extra Earth Base app plus that DB is **56,640**; a Mars Silver app+DB duplicate pair is **109,968**. These are arithmetic planning sensitivities, not a quote for restore service, export traffic, minimum billing or labor. Keep any exercise inside a separately approved allowance.

## Support inbox and optional account-access mail

Liara explicitly says its service **is not a POP3/IMAP mailbox** and is designed for programming. It does offer a proprietary management panel. [Email service docs](https://docs.liara.ir/email-server/about/). Official documentation shows reading/searching received messages in the console, including HTML/text and deletion, and composing outgoing messages with attachments. [Incoming-message documentation at the fetched official repository commit](https://github.com/liara-cloud/docs/blob/c11c03c19b7bf0e51102b16dceb5105b8e341c47/src/pages/email-server/how-tos/manage-incoming-emails.mdx); [console sending](https://docs.liara.ir/email-server/how-tos/send-email-via-console/).

Thus **receiving and manually sending support messages is publicly evidenced**, but a convenient human support inbox, threaded reply workflow, client access, durable retention/export and operation during account failure remain unverified. Console read+compose may be acceptable at this pilot's scale only after owner workflow review and later test. HTTP forwarding to the app is not a substitute for a usable support channel. Forwarding to another mailbox adds a separately qualified destination; it does not make that destination free or already available.

If a dedicated existing/new mailbox supplies manual support and account recovery, **do not automatically add Opal**. Account provisioning/recovery could be manual, subject to later security decisions; no automated email-dependent auth design is approved. Conversely, if an email-access design is chosen, Opal's sending capacity is a priced candidate. If the **same** qualified Opal service handles console support and transactional sending, count **one 1,475,000-toman subscription**, not two. Delivery to actual learner addresses and anti-abuse/sending-mode prerequisites still require verification. No free sending tier is relied on.

## Low-cost receiving inbox and .ir addendum

Context7 was also queried for **Iranhost** and returned no matching documentation; the following is from its current official product/contract pages, retrieved on the same research date. This is one illustrative domestic supplier, not a market comparison or selection.

[Iranhost Linux Iran Base](https://iranhost.com/webhosting/linux-hosting/) advertises 2 GB hosting, POP3/IMAP/Webmail mailbox features and **275,000 toman/month equivalent only with one-year payment**: **3,300,000 toman annual cash commitment**. An unused website need not be deployed merely to use its mailbox features; verify mailbox-only use, actual mail-server location, encrypted access, message limits and export in the final quote. This is lower recurring cost than Opal, but not a verified 275,000-toman monthly purchase. A displayed crossed-out 329,000 is not taken as a confirmed short-term quote. Annual free .ir is advertised conditionally; do not double count registration if that exact offer qualifies. This would add a separate supplier/account whose actual suitability remains to be established.

The [dedicated shared-email alternative](https://iranhost.com/shared-email-hosting/) costs **319,000 toman/month equivalent with annual payment = 3,828,000 upfront**, with 2 GB/20 mailboxes, SMTP/IMAP/POP3 and webmail. Its declared location is **Europe**, despite the supplier being domestic. No particular foreign transfer, upstream license or use is approved. This is an alternative to the Linux-mailbox option, not another mandatory charge.

[Current .ir registration tariff](https://iranhost.com/domain/) is **95,000 toman (950,000 rial) for one year**. Cached search snippets saying 70,000 were superseded by the live page. It requires an **IRNIC handle** and compliant name/owner information. The [supplier terms](https://iranhost.com/iranhost/rules/) explicitly cover individual customers with a national-ID copy and leave .ir approval to IRNIC. Owner-specific eligibility/document verification, current payment acceptance and exact renewal tariff remain unverified. Direct IRNIC terms pages could not be retrieved; no complete registry-eligibility conclusion is made. No account or domain search/order was submitted.

Treat **95,000 as conditional initial registration**, not a verified renewal price. Annualizing that observed registration cost gives about **7,917/month** for comparison only. For a three-month pilot, cash registration is the full 95,000, not 23,750. A new one-year domain normally has no renewal falling within a three-month scenario, but later renewal must be explicitly budgeted at the then-current quoted price; an advertised free first year is no promise of free renewal. Confirm tax, initial offer, term and renewal separately.

With the **annual Linux mailbox candidate** and no Opal, nominal monthly cost equivalents become **1,975,000 modest / 3,575,000 headroom**, before domain, backup, usage, taxes and reserve. **Actual first-three-month cash** is **8,400,000 / 13,200,000**, consisting of three Liara months plus all twelve mailbox months. Add **95,000** initial .ir only if the advertised free-domain condition does not qualify; renewal remains a later unknown. These are lower-cost comparison scenarios, not complete totals. Paying annual mailbox charges requires the owner's **separate setup approval** and cannot be hidden by dividing the cash charge by twelve or treated as already within an eventual monthly cap. If annual prepayment is undesirable, obtain a supported short-period quote or price another inbox before selecting it. Do not buy an annual service merely because it has a lower advertised monthly equivalent.

## DNS, TLS, monitoring and remaining gates

Liara advertises [free DNS management](https://liara.ir/products/dns/) and [free automatically renewed app TLS](https://docs.liara.ir/paas/domains/enable-ssl/). This supports **zero additional DNS/TLS line items** under those documented features; it does not include a purchased domain, mailbox, independent reachability or guaranteed renewal under outage. No external paid CDN, fonts, analytics or separate monitoring service is assumed.

Built-in [app resource reports](https://docs.liara.ir/paas/details/observations/hardware/), [application logs](https://docs.liara.ir/paas/details/observations/software/) and [object usage reports](https://docs.liara.ir/object-storage/details/observations/) cover basic observation. Retention is tier/product dependent; do not assume logs establish external uptime checking, pager coverage or legally sufficient audit retention. Operator support, billing checks, export verification, account recovery and privacy requests consume owner time. No labor price or zero-hour duty is inferred.

Before any route is described as operationally feasible, verify: truthful individual KYC and supported owner payment; actual selected plan/engine availability and final tax-inclusive quote; delivery/disk/backup metering; usable support channel and domain renewal; off-provider backup destination/price and restore evidence; control/alert behavior under the owner's ceiling. Relevant legal permission, data-location/access/retention contracts and representative Iranian learner/owner connectivity remain gates in their existing decisions. They do not prevent using the bounded subtotals to ask the owner for a spending preference. A different contract, workload or required service reopens the estimate.
