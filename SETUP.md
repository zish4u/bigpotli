# 🛍️ Bigpotli – Complete Project Setup Guide
### Next.js 16.2 + Supabase · Bihar-Focused SEO · Performance-Optimised · Claude Pro Workflow

---

## 📋 Table of Contents

- [Phase 1 – Foundation & Security (Week 1–2)](#phase-1--foundation--security-week-12)
  - [1. Project Overview](#1-project-overview)
  - [2. ⚠️ Security Advisory – Axios Supply Chain Attack](#2-️-security-advisory--axios-supply-chain-attack-march-2026)
  - [3. Prerequisites](#3-prerequisites)
  - [4. Local Development Setup](#4-local-development-setup)
  - [5. Supply Chain Hardening](#5-supply-chain-hardening)
  - [6. Supabase Setup](#6-supabase-setup)
  - [7. Environment Variables](#7-environment-variables)
- [Phase 2 – Core E-Commerce (Week 3–5)](#phase-2--core-e-commerce-week-35)
  - [8. Project Structure](#8-project-structure)
  - [8a. URL Routing Architecture](#8a-url-routing-architecture)
  - [9. Database Schema](#9-database-schema)
- [Phase 3 – UI/UX & SEO (Week 6–8)](#phase-3--uiux--seo-week-68)
  - [10. UI/UX Redesign Guidelines](#10-uiux-redesign-guidelines)
  - [11. SEO Strategy – Bihar & Near Me Keywords](#11-seo-strategy--bihar--near-me-keywords)
  - [13. Claude Pro Workflow (AI-Assisted Dev)](#13-claude-pro-workflow-ai-assisted-dev)
- [Phase 4 – Performance, Launch & Post-Launch (Week 9–10)](#phase-4--performance-launch--post-launch-week-910)
  - [12. Performance Optimisation](#12-performance-optimisation)
  - [14. Deployment](#14-deployment)
  - [15. Checklist](#15-checklist)

---

# Phase 1 – Foundation & Security (Week 1–2)

> **Goal:** Get the project initialised with the correct stack, lock down supply chain security, wire up Supabase, and confirm environment variables before writing a single product component.

**Exit criteria for this phase:**
- `npm run dev` runs on `localhost:3000` with Next.js 16.2 + Turbopack
- `npm ls axios` shows exactly `axios@1.14.0` — no other version
- `npm ls plain-crypto-js` returns nothing
- Supabase project live in `ap-south-1`, schema migrations applied
- `.env.local` populated and `.gitignore` confirmed
- `package-lock.json` committed to git

---

## 1. Project Overview

**Bigpotli** is a modest & ethnic wear e-commerce platform targeting women in Bihar and across India, selling Unstitched suits, Abayas, Hijabs, and Stitched Ethnic wear.

**Stack:**
| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) + TypeScript | **16.2.x** |
| UI Library | React + React DOM | **19.2.4** |
| Styling | Tailwind CSS v3 + Framer Motion | latest |
| Backend | Next.js API Routes + Server Actions | — |
| HTTP Client | Axios (pinned, see §2) | **1.14.0** |
| Database | Supabase (PostgreSQL) | latest |
| Auth | Supabase Auth | latest |
| Storage | Supabase Storage (product images) | latest |
| Payments | Razorpay (India-first) | latest |
| Deployment | Vercel | — |
| SEO | next-sitemap + structured data (JSON-LD) | — |

---

## 2. ⚠️ Security Advisory – Axios Supply Chain Attack (March 2026)

> **READ THIS BEFORE INSTALLING ANY PACKAGES.**

On **March 31, 2026**, a North Korean state-sponsored threat actor (Sapphire Sleet / UNC1069) compromised the npm account of the primary Axios maintainer and published two poisoned versions: **`axios@1.14.1`** and **`axios@0.30.4`**. These versions silently install a cross-platform Remote Access Trojan (RAT) that steals all secrets (API keys, SSH keys, cloud credentials, npm tokens) from the machine within ~15 seconds of `npm install`.

### What Was Compromised

| Malicious Version | Status |
|-------------------|--------|
| `axios@1.14.1` | ❌ MALICIOUS — removed from npm, do not install |
| `axios@0.30.4` | ❌ MALICIOUS — removed from npm, do not install |
| `plain-crypto-js@4.2.1` | ❌ MALICIOUS hidden payload, removed from npm |

### Safe Versions to Use

| Package | Safe Version | Command |
|---------|-------------|---------|
| `axios` | **`1.14.0`** | `npm install axios@1.14.0 --save-exact` |
| `next` | **`16.2.x`** | `npm install next@latest` |
| `react` | **`19.2.4`** | `npm install react@latest react-dom@latest` |

### Am I Already Affected?

Run these checks on your machine and CI/CD logs right now:

```bash
# Check if malicious dependency is present in any project
npm ls plain-crypto-js

# Check which axios version is installed
npm ls axios

# Scan for outbound connections to the C2 server (run in terminal)
# IOC domain: sfrclak.com  |  IOC IP: 142.11.206.73
```

If `plain-crypto-js` appears in `npm ls` output, or if your axios version is `1.14.1` / `0.30.4`:
1. **Isolate the machine from your network immediately**
2. **Rotate ALL secrets** — Supabase service role key, Razorpay keys, Resend API key, npm tokens, GitHub tokens, Vercel tokens
3. Do not attempt in-place cleanup — re-image or restore from a clean backup
4. Review CI/CD logs for the window around March 31, 2026 UTC

### Key Lesson — Always Pin Axios

Never use floating ranges for Axios in `package.json`:
```json
// ❌ UNSAFE — resolves to latest, could pull malicious version on next install
"axios": "^1.14.0"

// ✅ SAFE — exact pin, only this version ever installs
"axios": "1.14.0"
```

---

## 3. Prerequisites

Install the following on your local machine before starting:

```bash
# Node.js (v20+ required for Next.js 16)
node -v   # should print v20+

# Package manager
npm -v    # or use pnpm (recommended for speed)

# Git
git --version

# Supabase CLI
npm install -g supabase

# Vercel CLI (for deployment)
npm install -g vercel
```

**Recommended IDE:** VS Code with extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma (if you add Prisma ORM later)
- GitHub Copilot / Claude extension

---

## 4. Local Development Setup

### 4.1 Clone / Initialise the Project

```bash
# Start fresh with Next.js 16 (uses Turbopack by default):
npx create-next-app@latest bigpotli \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd bigpotli

# Verify you have the correct versions
node -v        # v20+
npx next --version  # 16.2.x

# Install core dependencies
npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  framer-motion \
  lucide-react \
  next-sitemap \
  sharp \
  razorpay \
  zod \
  react-hook-form \
  @hookform/resolvers \
  clsx \
  tailwind-merge \
  date-fns

# ⚠️ AXIOS — install with --save-exact to pin to the safe version
# DO NOT use: npm install axios  (resolves to latest, unsafe)
npm install axios@1.14.0 --save-exact

# Dev dependencies
npm install -D \
  @types/node \
  prettier \
  prettier-plugin-tailwindcss \
  @tailwindcss/typography \
  @tailwindcss/aspect-ratio
```

### 4.2 Verify package.json Has Exact Axios Pin

After install, open `package.json` and confirm axios looks like this — no caret, no tilde:

```json
{
  "dependencies": {
    "axios": "1.14.0",
    "next": "^16.2.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "overrides": {
    "axios": "1.14.0"
  }
}
```

The `overrides` block prevents any transitive dependency from pulling in a different (potentially malicious) axios version.

### 4.3 Start Dev Server

Next.js 16 uses Turbopack by default — no flags needed:

```bash
npm run dev
# Open http://localhost:3000
# Turbopack is now the default bundler (2-5x faster builds)
```

---

## 5. Supply Chain Hardening

The Axios attack succeeded because developers trusted npm's default behaviour of resolving `^version` to the latest. These steps protect Bigpotli from similar supply chain attacks going forward.

### 5.1 Always Use `npm ci` in CI/CD (Not `npm install`)

```bash
# In your GitHub Actions / CI pipeline:
npm ci   # ✅ respects lockfile exactly, never resolves to newer versions

# Not:
npm install  # ❌ can pull newer (potentially malicious) versions
```

### 5.2 Create `.npmrc` in Project Root

```ini
# .npmrc
audit=true
fund=false
# Prevent postinstall scripts from running automatically in CI
# (remove ignore-scripts=true locally if packages need build steps)
```

### 5.3 Add `overrides` to Prevent Rogue Transitive Deps

In `package.json`, always lock axios explicitly so no sub-dependency can pull a different version:

```json
{
  "overrides": {
    "axios": "1.14.0"
  }
}
```

### 5.4 Commit Your Lockfile

```bash
# Always commit package-lock.json — it is your source of truth
git add package-lock.json
git commit -m "chore: lock dependencies including axios@1.14.0"
```

### 5.5 Regular Audits

```bash
# Run before every deploy
npm audit

# Upgrade Next.js safely using the official codemod (handles migrations)
npx @next/codemod@canary upgrade latest

# Check for outdated packages (review manually — don't auto-update axios)
npm outdated
```

### 5.6 GitHub Dependabot (Recommended)

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    ignore:
      # Pin axios — only update manually after security review
      - dependency-name: "axios"
        update-types: ["version-update:semver-patch", "version-update:semver-minor", "version-update:semver-major"]
```

---

## 6. Supabase Setup

### 6.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) → **New Project**
2. Name it `bigpotli-prod`
3. Choose region: **South Asia (ap-south-1)** — closest to Bihar users
4. Save your **Project URL** and **anon public key**

### 6.2 Initialise Supabase CLI Locally

```bash
supabase init
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### 6.3 Enable Supabase Features

In the Supabase Dashboard, enable:
- ✅ **Authentication** → Email/Phone OTP (for Indian users, use phone OTP via SMS)
- ✅ **Storage** → Create bucket named `product-images` (public read)
- ✅ **Row Level Security (RLS)** → Always ON
- ✅ **Realtime** → For cart/order updates

---

## 7. Environment Variables

Create `.env.local` in the project root:

```env
# ── Supabase ──────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here   # SERVER ONLY – never expose

# ── Site ──────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Bigpotli

# ── Razorpay ──────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# ── Email (Resend or Nodemailer) ──────────────────
RESEND_API_KEY=re_xxxxxxxxxxxx
SUPPORT_EMAIL=support@bigpotli.com
```

Add `.env.local` to `.gitignore` — never commit secrets.

---

# Phase 2 – Core E-Commerce (Week 3–5)

> **Goal:** Build the full product catalogue structure — URL routing, database schema, category and product pages with ISR, cart, checkout, and Razorpay integration.

**Exit criteria for this phase:**
- `/abaya`, `/hijab`, `/unstitched`, `/stitched` category pages render from Supabase with ISR
- `/abaya/some-product-slug` product pages render correctly with breadcrumbs
- Cart state works client-side; checkout flow completes a test Razorpay payment
- Supabase RLS policies active on all tables
- Old URL redirects (`/category/:slug`, `/product/:slug`) return 301s
- `supabase gen types` output committed as `database.types.ts`

---

## 8. Project Structure

```
bigpotli/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with SEO metadata
│   │   ├── page.tsx                  # Homepage  →  /
│   │   ├── [categorySlug]/
│   │   │   ├── page.tsx              # Category page  →  /abaya  /hijab  /unstitched
│   │   │   └── [productSlug]/
│   │   │       └── page.tsx          # Product page   →  /abaya/daily-wear-cotton-abaya
│   │   ├── (shop)/
│   │   │   └── cart/                 # Cart page  →  /cart
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── account/                  # User dashboard
│   │   ├── checkout/
│   │   ├── sitemap.xml/route.ts      # Dynamic sitemap
│   │   ├── robots.txt/route.ts       # Robots.txt
│   │   └── api/
│   │       ├── orders/route.ts
│   │       ├── payment/route.ts
│   │       └── webhook/razorpay/
│   ├── components/
│   │   ├── ui/                       # Base UI components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── TrendingProducts.tsx
│   │   │   └── OfferBanner.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   └── ReviewSection.tsx
│   │   └── seo/
│   │       ├── LocalBusinessSchema.tsx
│   │       └── ProductSchema.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server client (SSR)
│   │   │   └── middleware.ts         # Auth middleware
│   │   ├── utils.ts
│   │   └── seo.ts                    # SEO helpers
│   ├── hooks/
│   │   ├── useCart.ts
│   │   └── useWishlist.ts
│   └── types/
│       ├── database.types.ts         # Auto-generated from Supabase
│       └── index.ts
├── public/
│   ├── icons/
│   ├── og-image.jpg                  # Open Graph default image
│   └── favicon.ico
├── supabase/
│   ├── migrations/                   # SQL migrations
│   └── seed.sql                      # Seed data
├── next.config.ts
├── tailwind.config.ts
├── next-sitemap.config.js
└── .env.local
```

---

## 8a. URL Routing Architecture

### URL Design

| Page | URL Pattern | Example |
|------|-------------|---------|
| Homepage | `/` | `bigpotli.com/` |
| Category listing | `/[categorySlug]` | `bigpotli.com/abaya` |
| Product detail | `/[categorySlug]/[productSlug]` | `bigpotli.com/abaya/daily-wear-cotton-abaya` |
| Cart | `/cart` | `bigpotli.com/cart` |
| Checkout | `/checkout` | `bigpotli.com/checkout` |
| Account | `/account` | `bigpotli.com/account` |
| New Arrivals | `/new-arrivals` | `bigpotli.com/new-arrivals` |

### How Next.js App Router Implements This

The key insight: `[categorySlug]` is a **top-level dynamic segment**, and `[productSlug]` is nested inside it. Next.js resolves them in order — it first checks if the segment matches a known static route (`cart`, `checkout`, `account`, `new-arrivals`), and falls through to the dynamic `[categorySlug]` only if no static match is found.

**File structure that produces these URLs:**

```
src/app/
├── page.tsx                              →  /
├── cart/page.tsx                         →  /cart          (static, takes priority)
├── checkout/page.tsx                     →  /checkout      (static, takes priority)
├── account/page.tsx                      →  /account       (static, takes priority)
├── new-arrivals/page.tsx                 →  /new-arrivals  (static, takes priority)
├── [categorySlug]/
│   ├── page.tsx                          →  /abaya  /hijab  /unstitched  /stitched
│   └── [productSlug]/
│       └── page.tsx                      →  /abaya/daily-wear-cotton-abaya
```

### Category Page — `src/app/[categorySlug]/page.tsx`

```tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Known category slugs — used for static generation
const CATEGORY_SLUGS = ['abaya', 'hijab', 'unstitched', 'stitched']

interface Props {
  params: Promise<{ categorySlug: string }>
}

// ISR — rebuild category pages every hour
export const revalidate = 3600

// Pre-build all category pages at build time
export async function generateStaticParams() {
  return CATEGORY_SLUGS.map(slug => ({ categorySlug: slug }))
}

// Dynamic SEO metadata per category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params
  const supabase = createClient()
  const { data: category } = await supabase
    .from('categories')
    .select('name, meta_title, meta_description')
    .eq('slug', categorySlug)
    .single()

  if (!category) return { title: 'Not Found' }

  return {
    title: category.meta_title ?? `Buy ${category.name} Online in Bihar | Bigpotli`,
    description: category.meta_description ??
      `Shop premium ${category.name} online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available.`,
    alternates: { canonical: `https://bigpotli.com/${categorySlug}` },
    openGraph: {
      url: `https://bigpotli.com/${categorySlug}`,
      title: `${category.name} Collection | Bigpotli`,
    }
  }
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params
  const supabase = createClient()

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()

  // 404 if slug doesn't match any category
  if (!category) notFound()

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, price, compare_price, rating, is_new')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })

  return (
    <main>
      {/* BreadcrumbList schema — Home > Abaya */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigpotli.com' },
        { name: category.name, url: `https://bigpotli.com/${categorySlug}` }
      ]} />

      <h1>Buy {category.name} Online in Bihar</h1>
      {/* product grid */}
    </main>
  )
}
```

### Product Page — `src/app/[categorySlug]/[productSlug]/page.tsx`

```tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

// ISR — rebuild product pages every 30 minutes
export const revalidate = 1800

// Pre-build all product pages at build time
export async function generateStaticParams() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('slug, categories(slug)')

  return (products ?? []).map(p => ({
    categorySlug: (p.categories as any).slug,
    productSlug: p.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params
  const supabase = createClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, meta_title, meta_description, price, product_images(url)')
    .eq('slug', productSlug)
    .single()

  if (!product) return { title: 'Not Found' }

  return {
    title: product.meta_title ?? `${product.name} | Bigpotli`,
    description: product.meta_description ??
      `Buy ${product.name} online in Bihar. COD available. Free delivery to Patna, Gaya, Muzaffarpur & all districts.`,
    alternates: { canonical: `https://bigpotli.com/${categorySlug}/${productSlug}` },
    openGraph: {
      url: `https://bigpotli.com/${categorySlug}/${productSlug}`,
      images: product.product_images?.[0]
        ? [{ url: product.product_images[0].url }]
        : [],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params
  const supabase = createClient()

  const { data: product } = await supabase
    .from('products')
    .select(`*, categories(slug, name), product_images(url, alt, position)`)
    .eq('slug', productSlug)
    .single()

  if (!product) notFound()

  // Guard: make sure the category in URL matches the product's real category
  // e.g. /hijab/daily-wear-cotton-abaya → redirect to /abaya/daily-wear-cotton-abaya
  if ((product.categories as any).slug !== categorySlug) notFound()

  return (
    <main>
      {/* Breadcrumb: Home > Abaya > Daily Wear Cotton Abaya */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigpotli.com' },
        { name: (product.categories as any).name, url: `https://bigpotli.com/${categorySlug}` },
        { name: product.name, url: `https://bigpotli.com/${categorySlug}/${productSlug}` }
      ]} />

      {/* Product JSON-LD schema */}
      <ProductSchema product={product} categorySlug={categorySlug} />

      {/* Product UI */}
    </main>
  )
}
```

### Redirects — Old URLs → New URLs

If you have any existing links or indexed pages at `/category/abaya` or `/product/...`, add permanent redirects in `next.config.ts` so Google passes link equity to the new URLs:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Category redirects
      {
        source: '/category/:slug',
        destination: '/:slug',
        permanent: true,   // 301 — tells Google to update its index
      },
      // Product redirects (old /product/slug → /categorySlug/slug)
      // Note: products need category context, so redirect to a lookup route
      {
        source: '/product/:slug',
        destination: '/p/:slug',   // see /app/p/[slug]/route.ts below
        permanent: true,
      },
    ]
  },
  // ... rest of config
}
```

For product redirects where the old URL `/product/daily-wear-cotton-abaya` lacks a category, add a redirect resolver route:

```ts
// src/app/p/[slug]/route.ts  — resolves old /product/:slug → /abaya/:slug
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createClient()

  const { data: product } = await supabase
    .from('products')
    .select('slug, categories(slug)')
    .eq('slug', slug)
    .single()

  if (!product) redirect('/')

  const categorySlug = (product.categories as any).slug
  redirect(`/${categorySlug}/${product.slug}`)
}
```

### Database: Ensure `products` Has a Foreign Key to `categories`

Your Supabase query for `generateStaticParams` needs the category slug joined. Confirm the schema has:

```sql
-- products table must reference categories
alter table products
  add constraint products_category_id_fkey
  foreign key (category_id) references categories(id);

-- For the resolver query, add an index on product slug
create index if not exists idx_products_slug on products(slug);
-- And on category slug
create index if not exists idx_categories_slug on categories(slug);
```

---

## 9. Database Schema

Run this in your Supabase SQL editor or as a migration:

```sql
-- ── Profiles (extends Supabase Auth) ──────────────
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text unique,
  city text,
  state text default 'Bihar',
  pincode text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can view/edit own profile"
  on profiles for all using (auth.uid() = id);

-- ── Categories ────────────────────────────────────
create table categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

-- ── Products ──────────────────────────────────────
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_price numeric(10,2),
  category_id int references categories(id),
  stock int default 0,
  is_new boolean default false,
  is_featured boolean default false,
  rating numeric(3,2) default 0,
  review_count int default 0,
  tags text[],                         -- ['bihar', 'eid', 'patna']
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);
create index on products(category_id);
create index on products(slug);
create index on products using gin(tags);

-- ── Product Images ────────────────────────────────
create table product_images (
  id serial primary key,
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  position int default 0
);

-- ── Orders ────────────────────────────────────────
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  status text default 'pending',       -- pending|confirmed|shipped|delivered|cancelled
  total numeric(10,2) not null,
  shipping_address jsonb,
  payment_id text,                     -- Razorpay payment ID
  razorpay_order_id text,
  created_at timestamptz default now()
);
alter table orders enable row level security;
create policy "Users see own orders"
  on orders for select using (auth.uid() = user_id);

-- ── Order Items ───────────────────────────────────
create table order_items (
  id serial primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  price numeric(10,2) not null
);

-- ── Reviews ───────────────────────────────────────
create table reviews (
  id serial primary key,
  product_id uuid references products(id) on delete cascade,
  user_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "Public can read reviews" on reviews for select using (true);
create policy "Auth users can insert reviews" on reviews for insert with check (auth.uid() = user_id);
```

**Generate TypeScript types from Supabase:**
```bash
supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/database.types.ts
```

---

# Phase 3 – UI/UX & SEO (Week 6–8)

> **Goal:** Apply the luxury ethnic design system across all pages, build all homepage sections, implement Bihar-focused SEO with structured data, and polish the mobile experience.

**Exit criteria for this phase:**
- Design system (ivory/gold/deep palette + Cormorant + DM Sans) applied globally
- All 8 homepage sections built and rendering real Supabase data
- ProductCard passes accessibility audit (aria-labels, 44px tap targets)
- LocalBusiness JSON-LD on homepage; Product + BreadcrumbList schemas on product pages
- Dynamic sitemap returns correct new URL format
- Mobile bottom nav, WhatsApp button, and swipeable gallery working on a real device
- Claude Pro project set up with instructions and context files uploaded

---

## 10. UI/UX Redesign Guidelines

The current demo uses placeholder images and basic layout. Here's what to improve:

### 10.1 Design System – Luxury Ethnic Aesthetic

**Color Palette (add to `tailwind.config.ts`):**
```ts
colors: {
  brand: {
    ivory:   '#FAF7F2',   // page background
    gold:    '#C8973A',   // primary accent (CTAs, highlights)
    deep:    '#1C1209',   // headings
    muted:   '#7A6652',   // body text
    rose:    '#E8C4B0',   // soft accent for badges
    green:   '#2D5016',   // "In Stock" / success
  }
}
```

**Typography (`src/app/layout.tsx`):**
```ts
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-display' })
const body    = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
// Apply: className={`${display.variable} ${body.variable}`}
```
- Headings: `font-display` (Cormorant Garamond) — regal, ethnic luxury feel
- Body: `font-body` (DM Sans) — clean, readable, modern

### 10.2 Homepage Sections (Priority Order)

1. **Hero** — Full-viewport image, headline in Cormorant, CTA with gold border button. Use `next/image` with priority prop.
2. **Trust Bar** — "Free Delivery in Bihar" · "COD Available" · "Easy Returns" · "WhatsApp Support"
3. **Category Grid** — 2×2 on mobile, 4-col on desktop. Hover: subtle scale + gold overlay.
4. **Offer Banner** — Countdown timer using `date-fns`. Server-rendered for SEO.
5. **Trending Products** — Card grid with wishlist heart, rating stars, add-to-cart. Skeleton loading states.
6. **Bihar Special Section** — "Loved in Patna, Gaya & Beyond" — social proof for local SEO.
7. **Testimonials** — Real customer quotes with star ratings and city names (Patna, Muzaffarpur, etc.)
8. **Newsletter** — Minimal email capture. Use Supabase table or Resend for email list.

### 10.3 Product Card Component

```tsx
// Key UX requirements:
// ✅ Lazy-loaded image with blur placeholder
// ✅ Wishlist toggle (heart icon) — persisted to Supabase
// ✅ "Add to Cart" without page reload
// ✅ Badge: "New" / "Sale" / "Only 3 left"
// ✅ Accessible: aria-labels on all interactive elements
// ✅ Mobile: full-width tap target (min 44px)
```

### 10.4 Mobile-First Checklist

- [ ] Bottom navigation bar on mobile (Home, Shop, Cart, Account)
- [ ] Sticky "Add to Cart" button on product page
- [ ] Swipeable product image gallery
- [ ] Floating WhatsApp chat button (bottom-right)
- [ ] Touch-friendly size selectors (min 44×44px)

---

## 11. SEO Strategy – Bihar & "Near Me" Keywords

### 11.1 Keyword Analysis & Recommendations

**Assessment of your proposed keywords:**

| Your Keyword | Verdict | Reason |
|---|---|---|
| `affordable kurti set for women` | ✅ Keep | Good transactional intent, moderate competition |
| `cheap kurti sets online` | ⚠️ Reframe | "Cheap" lowers perceived brand value — swap for "affordable" or "budget" |
| `affordable kurti set for women online` | ✅ Keep | Long-tail, lower competition, strong buyer intent |
| `hijab store near me` | ✅ Keep | High local intent — excellent for Bihar/Patna targeting |
| `affordable hijab near me` | ✅ Keep | Price + local combo = very low competition, high conversion |
| `affordable abaya` | ✅ Keep | High volume in India, realistic to rank for |
| `hijab shopping online` | ✅ Keep | Broad discovery keyword, good for category page |
| `hijab shop near me` | ✅ Keep (duplicate of above) | Merge with "hijab store near me" — they target the same intent |
| `stitched suit for women under 500` | ✅ Keep | Price-specific long-tail = almost zero competition, very high conversion |

**Duplicate to remove:** `hijab store near me` appears twice — keep one.

---

### 11.2 Full Target Keyword Strategy

#### 🟢 Primary Keywords — Abaya (your strongest category for Bihar)

| Intent | Keyword | Where to Use |
|--------|---------|-------------|
| Transactional | `buy abaya online Bihar` | `/abaya` H1, meta title |
| Transactional | `affordable abaya online India` | `/abaya` meta description |
| Local | `abaya shop near me Bihar` | Homepage, LocalBusiness schema |
| Local | `abaya shop in Patna` | `/abaya` page body |
| Long-tail | `daily wear abaya under 500` | Product pages |
| Long-tail | `cotton abaya for women online` | Product pages, tags |
| Trend-based | `open abaya online India 2026` | Blog / new arrivals |
| Discovery | `best abaya online shopping in India` | `/abaya` meta title, H1 variant |
| Discovery | `best hijab online store India` | `/hijab` meta title, H1 variant |

#### 🟢 Primary Keywords — Hijab

| Intent | Keyword | Where to Use |
|--------|---------|-------------|
| Local | `hijab shop near me` | Homepage, LocalBusiness schema |
| Local | `hijab store near me` | Same page as above (Google treats as same) |
| Transactional | `hijab shopping online India` | `/hijab` meta title |
| Transactional | `affordable hijab near me` | `/hijab` meta description |
| Transactional | `buy hijab online Bihar` | `/hijab` H1 |
| Long-tail | `chiffon hijab online India` | Product page titles |
| Long-tail | `plain hijab under 200 online` | Product tags |

#### 🟢 Primary Keywords — Kurti / Suits

| Intent | Keyword | Where to Use |
|--------|---------|-------------|
| Transactional | `affordable kurti set for women online` | `/stitched` or `/kurti` page |
| Transactional | `kurti set for women under 500` | Product pages |
| Transactional | `stitched suit for women under 500` | `/stitched` meta description |
| Local | `suit shop Muzaffarpur` | Footer, city landing pages |
| Local | `salwar suit online Bihar COD` | Homepage trust bar |
| Long-tail | `cotton kurti set with dupatta online` | Product titles |
| Trend-based | `ethnic co-ord set for women 2026` | New arrivals, blog |

#### 🟢 Primary Keywords — Unstitched Suits

| Intent | Keyword | Where to Use |
|--------|---------|-------------|
| Transactional | `unstitched suit online Bihar` | `/unstitched` H1 |
| Transactional | `dress material online Bihar` | `/unstitched` meta description |
| Transactional | `unstitched salwar kameez COD` | Homepage, category page |
| Long-tail | `unstitched cotton suit with dupatta` | Product titles |
| Long-tail | `buy unstitched suit material online India` | `/unstitched` body |

#### 🟡 Supporting / Local SEO Keywords

| Type | Keyword |
|------|---------|
| Local city | `ethnic wear in Patna` |
| Local city | `ethnic wear Gaya Bihar` |
| Local city | `ethnic wear Muzaffarpur` |
| Local city | `modest wear Darbhanga` |
| Near-me | `modest fashion near me Bihar` |
| Near-me | `Muslim women clothing online Bihar` |
| Occasion | `Eid special abaya online India` |
| Occasion | `Eid kurti set 2026` |
| Occasion | `wedding guest ethnic suit Bihar` |

#### 🟡 Added by Research — High Opportunity Keywords for 2026

These come from current trend data and have very low competition because few Bihar-specific sellers are targeting them yet:

| Keyword | Why It's Valuable |
|---------|------------------|
| `ethnic co-ord set for women Bihar` | Co-ord sets are the #1 trending ethnic category in 2026; no Bihar sellers dominate this |
| `modest co-ord set online India` | Intersection of modest fashion + co-ord trend = untapped |
| `cotton kurti set for daily wear` | Evergreen, high volume, low competition |
| `affordable modest wear India` | Broad top-of-funnel; builds brand awareness |
| `salwar kameez COD Bihar` | COD is a strong purchase trigger in tier-2/3 Bihar cities |
| `Islamic clothing online Bihar` | Very low competition, high local intent |
| `Eid collection abaya 2026` | Seasonal spike — prepare content 6 weeks before Eid |
| `sharara suit online Bihar` | Sharara making a strong comeback in 2026; barely any Bihar-specific results |

---

### 11.3 Keyword Placement Map (where each keyword goes in code)

```
Homepage (page.tsx)
├── meta title  →  "Bigpotli – Abayas, Hijabs & Ethnic Wear | Shop Online in Bihar"
├── meta desc   →  "Affordable abayas, hijabs, kurti sets & unstitched suits online.
│                   Free delivery across Bihar – Patna, Gaya, Muzaffarpur. COD available."
├── H1          →  "Modest & Ethnic Wear for Women in Bihar"
├── Trust bar   →  "COD Available · Free Delivery in Bihar · Hijab Shop Near Me"
└── Bihar section → "Loved in Patna, Gaya, Muzaffarpur & Beyond"

/abaya (category page)
├── meta title  →  "Best Abaya Online Shopping in India – Bihar's Top Store | Bigpotli"
├── meta desc   →  "Shop affordable abayas online. COD available. Free delivery to
│                   Patna, Gaya, Muzaffarpur & all Bihar districts."
└── H1          →  "Best Abaya Online Shopping in India – Buy Abaya in Bihar"

/hijab (category page)
├── meta title  →  "Best Hijab Online Store India – Affordable & Near Me | Bigpotli"
├── meta desc   →  "India's trusted hijab online store. Buy affordable hijabs with
│                   COD & free delivery across Bihar."
└── H1          →  "Best Hijab Online Store in India – Shop Near You in Bihar"

/unstitched (category page)
├── meta title  →  "Unstitched Suits Online Bihar – Dress Material with COD | Bigpotli"
└── H1          →  "Buy Unstitched Suits & Dress Material Online in Bihar"

/stitched (category page)
├── meta title  →  "Affordable Kurti Sets & Stitched Suits for Women | Bigpotli Bihar"
└── H1          →  "Stitched Suits & Kurti Sets Under ₹500 – Bihar's Ethnic Wear Store"
```

---

### 11.4 Metadata Setup (`src/app/layout.tsx`)

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Bigpotli – Ethnic & Modest Wear | Shop Online in Bihar',
    template: '%s | Bigpotli'
  },
  description: 'Shop premium ethnic wear, abayas, hijabs & unstitched suits online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & nearby cities. COD available.',
  keywords: [
    'buy abaya online Bihar', 'affordable abaya online India', 'abaya shop near me Bihar',
    'best abaya online shopping in India', 'best hijab online store India',
    'hijab shop near me', 'hijab store near me', 'hijab shopping online India', 'affordable hijab near me',
    'affordable kurti set for women online', 'stitched suit for women under 500',
    'unstitched suit online Bihar', 'dress material online Bihar', 'salwar suit online Bihar COD',
    'ethnic co-ord set for women Bihar', 'modest wear India', 'Islamic clothing online Bihar',
    'ethnic wear Bihar', 'affordable modest wear India',
  ],
  authors: [{ name: 'Bigpotli' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bigpotli.com',
    siteName: 'Bigpotli',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://bigpotli.com' },
  verification: { google: 'YOUR_GSC_VERIFICATION_CODE' }
}
```

### 11.3 Local Business Schema (add to homepage)

```tsx
// src/components/seo/LocalBusinessSchema.tsx
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Bigpotli",
    "description": "Premium ethnic and modest wear for women in Bihar and India",
    "url": "https://bigpotli.com",
    "telephone": "+91-98765-43210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Elegance Lane",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "postalCode": "800001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.5941,
      "longitude": 85.1376
    },
    "areaServed": ["Bihar", "Jharkhand", "Uttar Pradesh", "India"],
    "priceRange": "₹₹",
    "openingHours": "Mo-Sa 09:00-21:00"
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
```

### 11.4 Dynamic Sitemap (`src/app/sitemap.xml/route.ts`)

```ts
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()

  // Fetch products with their category slug via join
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at, categories(slug)')

  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  const baseUrl = 'https://bigpotli.com'
  const staticPages = ['', '/cart', '/checkout', '/new-arrivals', '/about', '/contact']

  const urls = [
    // Static pages
    ...staticPages.map(p =>
      `<url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
    // Category pages  →  /abaya  /hijab  etc.
    ...(categories || []).map(c =>
      `<url><loc>${baseUrl}/${c.slug}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`
    ),
    // Product pages  →  /abaya/daily-wear-cotton-abaya
    ...(products || []).map(p => {
      const categorySlug = (p.categories as any)?.slug ?? ''
      return `<url><loc>${baseUrl}/${categorySlug}/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    })
  ]

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  )
}
```

### 11.5 Category Pages with Local SEO

**`/abaya`**
- H1: `"Best Abaya Online Shopping in India – Buy Abaya in Bihar at Bigpotli"`
- Keywords to use: `best abaya online shopping in India`, `buy abaya online Bihar`, `affordable abaya`, `abaya shop near me Bihar`, `cotton abaya for women`
- Body copy: mention `daily wear abaya under 500`, Patna, Gaya, Muzaffarpur delivery

**`/hijab`**
- H1: `"Best Hijab Online Store in India – Shop Hijab Near You in Bihar"`
- Keywords to use: `best hijab online store India`, `hijab shop near me`, `affordable hijab near me`, `buy hijab online Bihar`, `hijab store near me`
- Body copy: mention chiffon, plain, printed hijab options + COD

**`/unstitched`**
- H1: `"Unstitched Suits & Dress Material Online – Bihar COD"`
- Keywords to use: `unstitched suit online Bihar`, `dress material online Bihar`, `unstitched salwar kameez COD`
- Body copy: emphasise custom stitching freedom + local tailor compatibility

**`/stitched`**
- H1: `"Affordable Kurti Sets & Stitched Suits for Women Under ₹500"`
- Keywords to use: `affordable kurti set for women online`, `stitched suit for women under 500`, `kurti set under 500`, `ethnic co-ord set for women Bihar`
- Body copy: price anchors (under ₹500, under ₹999) + occasion mentions (Eid, wedding guest, daily wear)

**All category pages must include:**
- Canonical URL: `https://bigpotli.com/[categorySlug]`
- City delivery block: "We deliver to Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Arrah and all Bihar districts."
- Breadcrumb schema: Home → [Category]
- BreadcrumbList JSON-LD for Google rich results

**Seasonal keywords to add before Eid (6 weeks prior):**
- `Eid collection abaya 2026`, `Eid special hijab online`, `Eid kurti set Bihar`

---

## 13. Claude Pro Workflow (AI-Assisted Dev)

### 13.1 Setting Up Claude in Your Project

Claude Pro (claude.ai) works best with **Projects** feature:

1. Go to [claude.ai](https://claude.ai) → **Projects** → **New Project**
2. Name it: `Bigpotli E-commerce`
3. Add **Project Instructions** (paste this):

```
You are a senior full-stack developer working on "Bigpotli" — a Next.js 16.2 + Supabase e-commerce site for modest & ethnic wear targeting Bihar, India.

Stack: Next.js 16.2 App Router, TypeScript, Tailwind CSS v3, Supabase, Framer Motion, Razorpay.
React version: 19.2.4 with React Compiler enabled (no manual useMemo/useCallback needed).
HTTP client: axios pinned to 1.14.0 (exact, no caret — supply chain safety requirement).
Config: next.config.ts (TypeScript, not .js — Next.js 16 native TS config).
Bundler: Turbopack (default in Next.js 16, no flags needed).
Design: Luxury ethnic aesthetic. Colors: ivory (#FAF7F2), gold (#C8973A), deep brown (#1C1209). Fonts: Cormorant Garamond (display), DM Sans (body).
SEO focus: Bihar, Patna, "near me" local keywords.

URL structure:
- Category pages: /[categorySlug]           e.g. /abaya  /hijab  /unstitched  /stitched
- Product pages:  /[categorySlug]/[productSlug]  e.g. /abaya/daily-wear-cotton-abaya
- Static routes (cart, checkout, account, new-arrivals) take priority over [categorySlug]
- Never use /category/slug or /product/slug — those are the OLD structure

Always:
- Use server components by default; add 'use client' only when needed
- Follow Next.js 16 App Router patterns (not Pages Router, not Next.js 14 patterns)
- Use Supabase SSR client (@supabase/ssr) for server components
- Write TypeScript with proper types from database.types.ts
- Use next.config.ts (TypeScript) not next.config.js
- Mobile-first Tailwind classes
- Include aria-labels for accessibility
- Add ISR revalidate tags for product/category pages
- Never suggest axios versions other than 1.14.0 — it is security-pinned
- Cache Components (use cache directive) for cacheable server data — preferred over getStaticProps patterns
- Always include canonical URL using the new URL structure in generateMetadata
- Breadcrumbs on category pages: Home → Category; on product pages: Home → Category → Product
```

### 13.2 Uploading Context to Claude Projects

Upload these files to your Claude Project for better responses:
- `src/types/database.types.ts` — Supabase schema types
- `tailwind.config.ts` — your design tokens
- `SETUP.md` (this file)

### 13.3 Effective Prompts for This Project

**Generate a new component:**
```
Create a ProductCard component for Bigpotli using our design system.
Props: product (from ProductType), showAddToCart?: boolean
Requirements:
- Supabase image from product_images table
- Wishlist heart toggle
- Sale badge if compare_price > price
- Uses brand.gold for accents
- Framer Motion hover animation
```

**Debug Supabase queries:**
```
I'm getting "permission denied" on this Supabase query: [paste query]
My RLS policy is: [paste policy]
The user is authenticated. What's wrong?
```

**SEO page metadata:**
```
Write Next.js generateMetadata() for the /abaya page (category page).
Target keywords: "buy abaya online Bihar", "abaya shop Patna"
Include OpenGraph, Twitter card, and canonical URL.
```

**Performance review:**
```
Review this component for performance issues in Next.js 16 App Router:
[paste component]
Focus on: unnecessary 'use client', missing image optimisation, render blocking.
```

**Next.js 16 Cache Component:**
```
Convert this server component to use Next.js 16 Cache Components
with the 'use cache' directive for product listing data.
Revalidate every 30 minutes with cacheTag.
```

### 13.4 Claude Code (Optional – Terminal)

If you want Claude to directly edit files:
```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Run in project directory
claude
```

---

# Phase 4 – Performance, Launch & Post-Launch (Week 9–10)

> **Goal:** Hit Core Web Vitals targets, deploy to Vercel with a custom domain, submit to Google Search Console, swap Razorpay to live keys, and run the full pre-launch checklist.

**Exit criteria for this phase:**
- Lighthouse: Performance > 90, SEO = 100, Accessibility > 95
- LCP < 2.5s and CLS < 0.1 on 4G mobile (test from Patna network conditions)
- Live on `bigpotli.com` with SSL provisioned by Vercel
- Sitemap submitted and verified in Google Search Console Coverage report
- Razorpay live keys active; test payment confirmed end-to-end
- All checklist items below ticked

---

## 12. Performance Optimisation

### 12.1 Next.js Image Optimisation

```ts
// next.config.ts  (Next.js 16 uses native TypeScript config)
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
    deviceSizes: [375, 640, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
    // New in Next.js 16.2 — LRU disk cache for images
    maximumDiskCacheSize: 512 * 1024 * 1024, // 512MB
  },
  // React Compiler is stable in Next.js 16 — enable for auto-memoisation
  reactCompiler: true,
}

export default nextConfig
```

### 12.2 Rendering Strategy

| Page | Strategy | Why |
|------|----------|-----|
| Homepage | ISR (revalidate: 3600) | Fresh content, fast load |
| Category pages | SSG + ISR | SEO + performance |
| Product pages | SSG + ISR (revalidate: 1800) | SEO critical |
| Cart / Checkout | CSR | User-specific, no SEO needed |
| Account | CSR + Supabase Auth | Private data |

```tsx
// Product page example
export const revalidate = 1800  // Revalidate every 30 minutes

export async function generateStaticParams() {
  const supabase = createClient()
  const { data } = await supabase.from('products').select('slug')
  return (data || []).map(p => ({ slug: p.slug }))
}
```

### 12.3 Core Web Vitals Targets

| Metric | Target | How to Achieve |
|--------|--------|---------------|
| LCP | < 2.5s | Preload hero image, use `priority` prop |
| FID/INP | < 100ms | Avoid large JS bundles, use server components |
| CLS | < 0.1 | Set explicit width/height on all images |
| TTFB | < 600ms | Edge runtime for API routes, Vercel Edge Network |

### 12.4 Bundle Optimisation

```tsx
// Lazy load heavy components
const ProductGallery = dynamic(() => import('@/components/product/ProductGallery'), {
  loading: () => <GallerySkeleton />
})

// Next.js 16: React Compiler handles memoisation automatically.
// You no longer need to manually wrap with useMemo/useCallback in most cases.
// Just write clean components — the compiler does the rest.

// Use server components by default — only add 'use client' when needed
// Cart state → Zustand (lightweight) or React context
```

### 12.5 Supabase Performance

```ts
// Always select only needed columns
const { data } = await supabase
  .from('products')
  .select('id, name, slug, price, compare_price, rating')
  .eq('is_featured', true)
  .order('created_at', { ascending: false })
  .limit(8)

// Use Supabase connection pooling (add ?pgbouncer=true to DB URL in production)
```

---

## 14. Deployment

### 14.1 Vercel (Recommended)

```bash
# Connect to Vercel
vercel

# Set environment variables in Vercel dashboard or CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add RESEND_API_KEY

# Deploy
vercel --prod
```

**Vercel Settings:**
- Framework Preset: Next.js
- Root Directory: `./` (or `src/` if monorepo)
- Node.js Version: **22.x** (required for Next.js 16)
- Enable: Speed Insights, Web Analytics

### 14.2 Custom Domain

1. Buy domain: `bigpotli.com` (if not owned)
2. Add domain in Vercel Dashboard → Settings → Domains
3. Update DNS records with your registrar
4. SSL auto-provisioned by Vercel

### 14.3 Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://bigpotli.com`
3. Verify via DNS TXT record or HTML meta tag
4. Submit sitemap: `https://bigpotli.com/sitemap.xml`
5. Monitor: Core Web Vitals, Coverage, Performance

---

## 15. Checklist

### Phase 1 – Security (complete before Phase 2)
- [ ] `npm audit` passes with zero high/critical vulnerabilities
- [ ] `npm ls plain-crypto-js` returns nothing (no malicious dep present)
- [ ] `npm ls axios` shows exactly `axios@1.14.0` — no other version
- [ ] `package.json` has `"axios": "1.14.0"` (no `^` or `~`) and `overrides.axios = "1.14.0"`
- [ ] `package-lock.json` is committed to git
- [ ] CI/CD pipeline uses `npm ci` not `npm install`
- [ ] All secrets rotated if any developer ran `npm install` between March 31–April 1, 2026
- [ ] Supabase RLS policies enabled on all tables
- [ ] `.env.local` added to `.gitignore`

### Phase 2 – Core E-Commerce (complete before Phase 3)
- [ ] Category pages (`/abaya`, `/hijab`, etc.) rendering from Supabase with ISR
- [ ] Product pages rendering with correct breadcrumbs and category guard
- [ ] Cart works client-side without page reload
- [ ] Razorpay test payment completes end-to-end
- [ ] 301 redirects in place: `/category/:slug` → `/:slug` and `/product/:slug` → `/p/:slug` resolver
- [ ] `supabase gen types` output committed as `database.types.ts`
- [ ] Foreign key constraint and slug indexes applied in Supabase

### Phase 3 – UI/UX & SEO (complete before Phase 4)
- [ ] All `.env.local` variables set in Vercel
- [ ] Product images migrated to Supabase Storage
- [ ] Sitemap generated and submitted to Google Search Console
- [ ] LocalBusiness JSON-LD added to homepage
- [ ] All pages have unique meta title + description
- [ ] Mobile tested on real device (Patna network conditions)
- [ ] WhatsApp button links to correct number
- [ ] 404 page created with navigation back to shop
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools submitted
- [ ] Google Business Profile created (if physical store exists)
- [ ] `robots.txt` allows Googlebot
- [ ] Images have descriptive alt text with keywords
- [ ] Product pages have BreadcrumbList schema (Home → Category → Product)
- [ ] Product pages have Product schema (price, availability, reviews)
- [ ] Canonical URLs use new structure (`/abaya`, `/abaya/daily-wear-cotton-abaya`)
- [ ] Sitemap submitted with new URL format — verify in GSC Coverage report

### Phase 4 – Launch (run on launch day)
- [ ] Razorpay test → live key swap done
- [ ] Lighthouse score: Performance > 90, SEO = 100, Accessibility > 95
- [ ] LCP < 2.5s on 4G mobile
- [ ] CLS < 0.1
- [ ] No console errors in production
- [ ] `.github/dependabot.yml` configured with axios pinned

---

## 💬 Support & Resources

| Resource | Link |
|----------|------|
| Next.js Docs | https://nextjs.org/docs |
| Supabase Docs | https://supabase.com/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Framer Motion | https://www.framer.com/motion |
| Razorpay Docs | https://razorpay.com/docs |
| Claude Pro | https://claude.ai |
| Vercel | https://vercel.com/docs |

---

*Generated for Bigpotli · Next.js 16.2 + React 19.2 + Supabase · Bihar-First E-Commerce · Updated April 2026*
