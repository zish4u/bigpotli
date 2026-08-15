# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test suite is currently configured.

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
```

## Architecture Overview

**Bigpotli** is a Next.js 15 (App Router) e-commerce store for ethnic wear (abayas, hijabs, unstitched/stitched suits) targeting Bihar, India. The stack is: Next.js + TypeScript + Tailwind CSS + Supabase (auth + DB) + Razorpay (payments) + Zustand (client state).

### Routing

URL pattern: `/{categorySlug}/{productSlug}` — e.g. `/abaya/luxury-embroidered-abaya`

- `src/app/[categorySlug]/page.tsx` — category listing page
- `src/app/[categorySlug]/[productSlug]/page.tsx` — product detail page (fetches from Supabase)
- `src/app/p/[slug]/route.ts` — legacy redirect route
- `src/app/api/payment/route.ts` — creates Razorpay order
- `src/app/api/payment/verify/route.ts` — verifies Razorpay payment signature
- `src/app/api/orders/route.ts` — fetches user order history from Supabase
- `src/app/api/webhook/razorpay/route.ts` — Razorpay webhook handler

### Supabase

Two clients exist for different contexts:
- `src/lib/supabase/client.ts` — browser client (`createBrowserClient`)
- `src/lib/supabase/server.ts` — server client (`createServerClient`, requires cookie store)

`src/middleware.ts` calls `supabase.auth.getUser()` on every request to keep sessions fresh. It excludes static assets.

DB types are auto-generated in `src/types/database.types.ts`. The convenience aliases at the bottom (`Product`, `Category`, `ProductWithImages`, `ProductCard`, etc.) are what most components use — prefer these over raw `Tables<"products">` access.

### State Management (Zustand)

- `src/store/useCartStore.ts` — cart, wishlist, coupon logic; persisted to `localStorage` as `bigpotli-cart-storage`. Cart items use `id` as a string (UUID for Supabase products).
- `src/store/useAuthStore.ts` — minimal local auth mirror; persisted as `bigpotli-auth-storage`. Actual auth is handled by Supabase.

### Static/Mock Data

`src/lib/data.ts` contains mock `PRODUCTS`, `CATEGORIES`, and `COUPONS` arrays used in legacy pages and checkout coupon validation. New product pages pull live data from Supabase; the mock data is a fallback used in components that haven't been migrated.

### SEO

- `src/lib/seo.ts` — per-category SEO metadata (`getCategoryMetadata`, `getCategorySEO`) for the four main categories: `abaya`, `hijab`, `unstitched`, `stitched`
- Product pages inline JSON-LD `Product` and `BreadcrumbList` schema directly in the JSX
- `src/components/seo/` — reusable schema components (`ProductSchema`, `BreadcrumbSchema`, `LocalBusinessSchema`)
- `src/app/sitemap.xml/route.ts` and `src/app/robots.txt/route.ts` — dynamic SEO routes
- Analytics tracked via `src/lib/analytics.ts` (GA4 + Facebook Pixel events)

### Styling

Tailwind with custom brand tokens: `brand-gold`, `brand-plum`, `brand-plum-dark`, `brand-ivory`, `brand-deep`. Fonts: `--font-display` (Cormorant Garamond, serif) and `--font-body` (DM Sans). Use `font-serif` for display headings and `font-sans` for body text.

### Payment Flow

1. Checkout form submits → `POST /api/payment` creates a Razorpay order (returns `order_id`, `amount`)
2. Razorpay JS SDK opens payment modal
3. On success → `POST /api/payment/verify` validates HMAC signature
4. Order is persisted to Supabase `orders` + `order_items` tables
5. `trackPurchase()` fires GA4/Pixel events
