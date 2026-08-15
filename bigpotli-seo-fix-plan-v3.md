# Bigpotli.com — SEO Fix Plan v3 (Abaya + Pakistani Suit, Full Bihar District Coverage)

**Context for Claude Code:** Next.js site for Bigpotli, a Patna (Bihar)-based women's
ethnic & modest wear store. **Scope for this pass: only the Abaya and Pakistani Suit
categories.** Other categories (Kurti, Co-ord Set, Lawn Suit) are explicitly out of
scope for now — do not build those pages.

**Target geography:** All Bihar districts with Muslim population above 10% (2011
Census), plus Patna (included explicitly by client request regardless of its %,
since it's also Bihar's largest overall market). Full list below, tiered.

Work through phases **in order** — later phases depend on earlier fixes.

---

## Target district list (use exactly this, tiered)

**IMPORTANT — do not dump all 27 district names as prose sentences on the page.**
Google treats unnatural repetition of place names as a spam signal. Use the
**two-part pattern** described in Phase 1/2 below: natural prose mentioning a handful
of hub cities + a separate tag/pill list component (like the existing homepage
"Delivering to Every Corner of Bihar" section) for the full district list.

- **Tier 1 (mention by name in prose, highest priority — Seemanchal/North Bihar,
  20%+ Muslim population):** Kishanganj, Katihar, Araria, Purnia, Darbhanga,
  Pashchim Champaran (West Champaran), Sitamarhi
- **Tier 2 (tag list, 15–20%):** Siwan, Supaul, Madhubani, Bhagalpur, Gopalganj,
  Purba Champaran (East Champaran), Muzaffarpur, Sheohar
- **Tier 3 (tag list, 10–15%):** Saharsa, Begusarai, Jamui, Banka, Madhepura, Gaya,
  Nawada, Khagaria, Samastipur, Saran, Rohtas
- **Always include regardless of tier:** Patna (client's explicit hometown market —
  mention by name in prose alongside Tier 1, not buried in the tag list)

---

## Phase 0 — Critical NAP & broken-content fixes (blocking, do first)

**Status: partially done — 5/6 complete, 1 remaining (see below). Not marking this
phase done until the rest lands.**

- [x] Replace footer contact address — real Patna store address now lives in
      `src/lib/siteConfig.ts` and is used by `Footer.tsx`, `contact/page.tsx`, and
      `LocalBusinessSchema.tsx`.
- [x] Replace placeholder phone `+91 98765 43210` everywhere (footer, `wa.me`
      WhatsApp link, `tel:` links, schema) with the real business number
      (`siteConfig.phone`, `062052 01601`). Footer, contact page, schema, and
      `WhatsAppButton.tsx` all pull from `siteConfig` now.
- [x] Fix footer social links (currently generic `instagram.com`/`facebook.com`/
      `twitter.com`) — point to the real `instagram.com/bigpotli` profile.
      `siteConfig.social.instagram` now set to `https://instagram.com/bigpotli`.
      Facebook still `null` (icon stays hidden until a handle is supplied).
- [x] Fix broken OG image (`http://localhost:3000/og-image.jpg`) — resolved without
      needing a static asset from the client, using Next.js's file-convention image
      generation instead: `src/app/opengraph-image.tsx` + `src/app/twitter-image.tsx`
      (sharing `src/lib/ogImage.tsx`) render a 1200×630 PNG on the fly from the real
      `logo_old.jpg` brand mark + site name, and `src/app/icon.tsx` does the same for
      the favicon. Stale static reference in `layout.tsx`'s `openGraph.images`
      removed so it doesn't shadow the generated image.
- [x] Remove/hide placeholder customer reviews (Fatima Khatoon, Zainab Ansari,
      Rukhsana Begum) until real reviews are collected — `Testimonials` section is
      now commented out on the homepage (component left in place for reuse once
      real reviews exist).
- [ ] Replace Unsplash stock images on the Abaya and Pakistani Suit product pages
      specifically with real product photos as supplied by the client. Product
      images are pulled live from Supabase (`product_images` table), so this is a
      **content/data task, not a code fix** — depends on what's actually been
      uploaded per product; unverified from code alone.

## Scope note (supersedes "out of scope" section below)

The working tree already has `kurti`, `lawn-suit`, and `co-ord-set` category pages
built (routes, nav links, SEO metadata + FAQs in `src/lib/seo.ts`) from prior work
predating this v3 plan. Per user decision on 2026-08-15, these are being kept rather
than removed — v3's "out of scope" note for these three categories is stale and no
longer applies. They are **not** held to this plan's Tier 1/2/3 district-coverage
requirements (Phases 1/2 below still apply strictly to Abaya and Pakistani Suit).

## Phase 1 — Abaya category page: deep local SEO across full district list

**Status: done.**

- [x] Rewrite `/abaya` H1 → "Buy Abaya Online in Bihar | Patna, Kishanganj, Katihar
      & More" (`src/lib/seo.ts`).
- [x] 200–300 word genuine intro copy naming Patna + all 7 Tier 1 districts
      (Kishanganj, Katihar, Araria, Purnia, Darbhanga, Pashchim Champaran,
      Sitamarhi) spread across several sentences, closing with a link ("and 20+
      other districts across Bihar") down to the tag list — `CATEGORY_SEO.abaya.body`
      in `src/lib/seo.ts` (229 words) + the closing link rendered in
      `src/app/[categorySlug]/page.tsx`.
- [x] District tag/pill list component — new shared
      `src/components/seo/BiharDistrictCoverage.tsx` (props: `tier1`, `tier2`,
      `tier3`, `patna`, matching the API this plan's Notes section specified),
      district data centralized in `src/lib/districts.ts`. Lists all 26 tiered
      districts + Patna (27 total) as pills; Tier 1 + Patna visually highlighted.
      Rendered on `/abaya` below the intro copy.
- [x] FAQ block — `CATEGORY_SEO.abaya.faqs`, rendered via `FAQAccordion` +
      `FAQSchema`.
- [x] Unique meta title/description naming target districts — title "Abaya Online
      in Bihar | COD in Kishanganj, Katihar, Purnia, Patna & More | Bigpotli".
- [ ] Ensure enough real products with descriptive names (avoid "Abaya 1", "Abaya 2").
      Data-dependent (Supabase `products` table) — not verifiable from code, needs a
      manual check against what's actually in the DB.

## Phase 2 — Pakistani Suit category page: build + deep local SEO

**Status: done.**

- [x] Create `/pakistani-suit` route, add to main nav — via the shared
      `[categorySlug]` page + `CATEGORY_SEO["pakistani-suit"]`; linked in
      `Header.tsx` (desktop + mobile) and `Footer.tsx`.
- [x] H1 → "Pakistani Suit Online in Bihar | Patna, Katihar, Purnia & More".
- [x] 200–300 word intro copy, same Tier 1 + Patna naming pattern as Phase 1 —
      `CATEGORY_SEO["pakistani-suit"].body` (215 words).
- [x] District tag/pill list component — reuses `BiharDistrictCoverage` from Phase 1,
      rendered on `/pakistani-suit` via the same `districtCoverage` flag in
      `seo.ts` (no duplicated markup).
- [x] FAQ block — `CATEGORY_SEO["pakistani-suit"].faqs`, rendered via
      `FAQAccordion` + `FAQSchema`.
- [x] Unique meta title/description, no overlap with Abaya page metadata — title
      "Pakistani Suit Online in Bihar | Patna, Katihar, Purnia & More | Bigpotli".
- [ ] Populate with real products as supplied. Data-dependent — not verifiable from
      code.

## Phase 3 — Structured data / schema

**Status: done.**

- [x] `Product` schema (JSON-LD) on individual Abaya and Pakistani Suit product
      pages: name, image, price, availability, and `aggregateRating` — confirmed in
      `src/app/[categorySlug]/[productSlug]/page.tsx`, `aggregateRating` is
      correctly gated on `(product.review_count ?? 0) > 0`, so it only appears once
      real reviews exist, per the plan's requirement.
- [x] `BreadcrumbList` schema on both category pages and their product pages —
      `BreadcrumbSchema` on category pages, inline `BreadcrumbList` JSON-LD on
      product pages.
- [x] `LocalBusiness` schema on homepage/contact page with corrected Phase 0 NAP —
      `LocalBusinessSchema.tsx` now pulls NAP from `siteConfig` and `areaServed`
      from `ALL_BIHAR_DISTRICTS` (`src/lib/districts.ts`), listing all 27
      districts/Patna as `AdministrativeArea` entries.
- [x] `FAQPage` schema on both category pages' FAQ blocks — `FAQSchema` wired into
      the shared category page for any category with `seo.faqs`, including Abaya and
      Pakistani Suit.

## Phase 4 — Technical SEO housekeeping

- [ ] Confirm `sitemap.xml` includes `/pakistani-suit` and updated `/abaya`.
- [ ] Confirm `robots.txt` allows crawling of both category + product routes.
- [ ] Verify canonical tags are correct on both pages.
- [ ] Run Lighthouse/PageSpeed on both pages — flag unoptimized images.
- [ ] Confirm mobile responsiveness (majority of Bihar traffic is mobile).

## Phase 5 — Post-launch (manual follow-ups, not code)

- [ ] Set up/verify Google Business Profile with corrected NAP, category "Women's
      Clothing Store", service area listing the full district set.
- [ ] Submit updated sitemap to Google Search Console; request re-indexing of the
      Abaya and Pakistani Suit pages.
- [ ] Start collecting real Google reviews via WhatsApp after each order — ask
      customers from Tier 1 districts specifically when possible, since reviews
      mentioning those locations reinforce local relevance signals.
- [ ] Track Search Console impressions/clicks weekly, broken down by query where
      possible — watch specifically for Seemanchal-district queries (Kishanganj,
      Katihar, Araria, Purnia) starting to appear, since that's the highest-opportunity
      segment.

---

## Explicitly out of scope for this pass

- Kurti, Co-ord Set, Lawn Suit category pages
- Blog/guides section
- National (non-Bihar) keyword targeting
- Dedicated standalone landing pages per individual district (the tag-list approach
  in Phase 1/2 is sufficient for now — only consider per-district landing pages later
  if Search Console shows strong district-specific query volume worth a dedicated page)

## Notes for Claude Code

- Ask the user for the real business address/phone/Instagram handle before Phase 0 if
  not already available in the repo or env vars — never invent placeholder values.
- Keep commits scoped per phase for easy review/rollback.
- Build the district tag-list as a shared component (e.g.
  `<BiharDistrictCoverage tier1={...} tier2={...} tier3={...} />`) so both category
  pages reuse it instead of duplicating the district array.
- If products/categories are managed via a CMS or data file rather than hardcoded
  JSX, add the Pakistani Suit category through that data layer, not as a one-off
  hardcoded page.
