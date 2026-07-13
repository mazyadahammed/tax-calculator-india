# Overhaul Plan - ThinkFinance

## Niche Focus
Salaried job-switchers with multiple Form-16s + freelancers/gig workers.

## Proposed Changes

### Phase 2: Programmatic Salary Pages
Generate dynamic pages for specific LPA figures:
- `/in-hand-salary/[amount]-lpa`
- `/tax-calculator/[amount]-lpa-old-vs-new`
Cover 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 30 LPA.
Build a hub/index page at `/salary-hub` so they are crawlable and interlinked.
Register paths in sitemap logic.

### Phase 3: New Persona Tools
- **Form-16 Consolidator**: Route `/multiple-form16` to handle tax computation for users who switched jobs mid-year.
- **Freelancer Presumptive Tax Calculator (Sec 44ADA)**: Route `/freelancer-tax-44ada`.
- Link them from Header, Footer, and Home page.

### Phase 4: E-E-A-T & Trust Signals
- Build `/about` page with biography placeholders.
- Add Last Reviewed date and FY 2025-26 badges.
- Ensure sitewide Footer references all legal pages.

### Phase 5: Audience Capture (Email reminders)
- Add newsletter/reminder sign-up box pointing to a mock/configurable form endpoint using environment variables.

### Phase 6: Affiliate Integration
- Add a "Ways to reduce this next year" section inside the results view.
- Define links in `lib/affiliateLinks.ts`.
- Include explicit legal affiliate disclosures.

### Phase 7: AdSense Clean Placeholders
- Add structured layout boxes that can render ads in the future without JavaScript loading.
