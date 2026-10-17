# Investigate service eligibility and feasible hosting routes for the Iran-based operator

Status: resolved
Type: research
Labels: wayfinder:research
Parent: [Chart the multi-course learning platform](../map.md)
Blocked by: none

## Question

Which realistic service routes merit later costing for the approved Iran-based individual operator and learners in Iran, and what verified restrictions or unknowns constrain them?

Use current primary sources to distinguish (1) legal authorization or restrictions affecting a provider's supply, (2) that provider's own eligibility/contracting rules for an individual resident in Iran, (3) account verification and paying infrastructure bills through a supported method, (4) access by learners in Iran, and (5) data regions, subprocessors, backups and transfers. A general legal authorization does not compel a provider to serve Iran; an accessible website, free tier, Iranian data center, or successful local request does not establish eligibility or learner access.

Check current relevant official sanctions/communications-service material without assuming all cloud hosting for education is covered. Qualify a small illustrative set of foreign managed-service and domestic hosting routes sufficient to reveal a plausible low-complexity route or a specific unresolved dependency. Include at least one concrete domestic candidate; do not imply that domestic hosting is mandated or that a domestic brand keeps all data in Iran. Cover app hosting/persistence and dependencies such as DNS/TLS, source/deployment access, email and backups where public facts reveal a hidden blocker, without selecting an architecture or separately requiring each SaaS category. Source-control service access is relevant because repository publishing is established.

Use Context7 first for provider/cloud-service documentation and follow source links to authoritative provider eligibility and legal terms. Mark unsupported, excluded, conditional, and unverified separately; record dates and product-specific limitations. Do not recommend a false location, nominee account, identity masking, unsupported payment method, or other circumvention. Do not infer owner residence documents, existing accounts, banking access, or credentials.

Do not price or select providers (that belongs to the subsequent budget and technical decisions), create accounts, contact providers, purchase services, or perform production/learner network tests. Identify exact evidence or owner decisions still needed. This research alone does not approve the operating arrangement or launch.

## Comments

### Owner-confirmed billing constraint

The owner can use Iranian bank accounts and domestic payment cards in their own name. No internationally supported payment method is confirmed. Evaluate candidate billing routes on this basis; do not assume international payment access, acceptance by any named provider, or a budget amount. The canonical owner record is in [Choose the pilot operating arrangement](10-operating-arrangement.md#comments).

## Answer

### Bounded provider and authorization research

Completed the scoped primary-source investigation. Full evidence, dates, distinctions and limitations are in [Service eligibility and hosting routes for the Iran-based pilot operator](https://github.com/h3nrzi/nodejs-backend-engineering-handbook/blob/180f95db060770742eb2cd49c26ab6d03de933ed/.scratch/learning-platform/research/iran-provider-and-service-feasibility.md), captured on the unmerged throwaway research branch. No accounts, transactions, provider contacts or Iran-based reachability tests were performed.

- Current 31 CFR §560.540 supersedes General License D-2. It includes e-learning and supporting cloud services with conditions; the commercial-entity website-hosting exclusion and Iranian-origin software rules prevent a blanket finding that this operator's foreign-hosting arrangement is authorized. The report cites official GPO consolidated text, OFAC guidance and its retrieval/currency limits.
- GitHub's own published license supports Iran-resident individuals using covered free repository services, subject to applicable restrictions. It is not another host's license. Paid billing remains unqualified with the owner's confirmed domestic-only payment capability.
- Vercel is an illustrative foreign managed route with unverified eligibility for this operator/use and no confirmed supported owner payment method. Unverified is not prohibited; no paid foreign route is approved or usable in the cost baseline merely because a free tier exists.
- Liara is a conditional domestic managed-hosting/database candidate for further investigation and costing, consistent with the owner's domestic-first priority. Official individual-account, identity-verification and domestic payment-context evidence exists; the owner's exact KYC, accepted payment process and product suitability are not verified. No provider is selected.
- Domestic hosting does not establish Iran-only handling. Runtime, build, database, backups, logs, email, support access and subprocessors require separate location/access/transfer review. Liara's published cross-border and foreign-build possibilities need explicit qualification. This is consistent with the owner's open-geography policy and approves no particular transfer.
- Liara terms make backups the customer's responsibility and expose developer/base-tier services and copies to deletion after 24 hours of insufficient credit. Later costing must account for credit monitoring and recoverable independent copies. Provider-account/financial retention is distinct from learner-record deletion within the application.

### Explicit remaining gates

[Choose the pilot operating arrangement](10-operating-arrangement.md#answer) is now conditionally accepted for planning; jurisdiction-specific technical and pre-launch questions remain at the gates in the [qualification register](14-individual-pilot-regulatory-clarification.md#legal-qualification-register--verified-text-versus-unsettled-applicability). [Estimate pilot operating costs and approve a spending limit](11-operating-budget.md) must qualify candidate-specific individual contracting, identity verification and supported domestic billing before treating a paid route as feasible, then cost all material dependencies and credit/backup exposure. [Decide the first-release technical boundaries and feasibility](08-first-release-technical-boundaries.md) must establish the selected data contract, runtime/build/backup/support locations, lawful transfers, retention/deletion, recovery, dependency eligibility and operability before selecting infrastructure.

Real Iranian fixed/mobile learner access, owner console/source/deployment access, support email and failure/recovery behavior require later operational evidence. They cannot be inferred from this research environment's access to documentation. These verification obligations do not authorize implementation or operation in this planning effort.

This resolves bounded research with documented unknowns. It does not confirm the operating arrangement as suitable, select a provider or architecture, approve spending or data transfers, or authorize launch.
