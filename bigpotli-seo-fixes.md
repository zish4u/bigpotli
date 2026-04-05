# Bigpotli SEO Fix Guide
> Use this file with Claude Code to implement all SEO fixes on bigpotli.com

---

## How to Use This File

Paste this into Claude Code and say:
> "Follow this SEO guide and fix all issues in my Next.js codebase."

Claude Code will read each section and apply the changes file by file.

---

## 1. Critical Bug Fixes (Do First)

### 1.1 Fix Footer Address
**Problem:** Footer shows "Mumbai, MH 400001" — hurts local Bihar SEO.
**Fix:** Replace with real Patna address.

```
Find in code: "Mumbai, MH 400001" (or similar Mumbai address in footer component)
Replace with: "Patna, Bihar 800001, India"
```

Also update any footer text that says "Mumbai" to "Patna, Bihar".

---

### 1.2 Fix Copyright Year
**Problem:** Footer shows © 2024 — stale trust signal.
**Fix:** Make it dynamic so it never goes stale.

```jsx
// In your footer component, replace static year with:
<p>© {new Date().getFullYear()} Bigpotli. All rights reserved.</p>
```

---

### 1.3 Fix Broken Eid Countdown Timer
**Problem:** Timer shows 00:00:00 — broken timers destroy trust.
**Fix:** Either fix the target date or hide the timer until next Eid.

```jsx
// Option A — Fix the target date (update to next Eid date)
const EID_DATE = new Date('2026-03-30T00:00:00'); // Update to actual Eid date

// Option B — Hide timer if date has passed
const now = new Date();
if (now > EID_DATE) return null; // Don't render the timer
```

---

## 2. Meta Tags — All Pages

### 2.1 Homepage (`/`)

```jsx
// In your Next.js page or layout metadata:
export const metadata = {
  title: 'Buy Modest Wear Online in Bihar | Abayas, Hijabs & Suits | Bigpotli',
  description: "Bigpotli is Bihar's dedicated modest wear store. Shop Abayas, Hijabs, Unstitched Suits & Ethnic Wear online. Free delivery to Patna, Gaya, Muzaffarpur. COD available.",
  keywords: 'modest wear online Bihar, Islamic clothing store Bihar, buy abaya online Bihar',
  openGraph: {
    title: 'Buy Modest Wear Online in Bihar | Bigpotli',
    description: "Bihar's No.1 modest wear store — Abayas, Hijabs, Suits. Free delivery. COD available.",
    url: 'https://bigpotli.com',
    siteName: 'Bigpotli',
    locale: 'en_IN',
    type: 'website',
  },
};
```

**H1 text on homepage:**
```
Bihar's No.1 Modest Wear Store for Women
```

**Homepage intro paragraph text:**
```
Bigpotli is Bihar's dedicated Islamic clothing store — shop premium Abayas, Hijabs,
Unstitched Suits, and Stitched Ethnic Wear online. Free delivery across Patna, Gaya,
Muzaffarpur and all Bihar districts. COD available on all orders.
```

---

### 2.2 Abaya Category Page (`/abaya`)

```jsx
export const metadata = {
  title: 'Buy Abayas Online in Bihar | COD | Free Delivery | Bigpotli',
  description: 'Shop premium Abayas online with free delivery to all Bihar districts. Plain, embroidered & black abayas starting ₹4,999. COD available. Order now from Bigpotli.',
  keywords: 'buy abaya online Bihar, plain abaya online India, black abaya online India',
};
```

**H1 text:**
```
Abayas Online — Delivered Across Bihar
```

**Category intro paragraph (add below H1):**
```
Shop premium Abayas online in Bihar with free home delivery to Patna, Gaya, Muzaffarpur,
Darbhanga and all districts. Choose from plain abayas, embroidered designs, and classic
black abayas online — starting at ₹4,999. COD available on every order.
```

---

### 2.3 Hijab Category Page (`/hijab`)

```jsx
export const metadata = {
  title: 'Buy Hijabs Online India | Chiffon, Silk & Cotton Hijabs | Bigpotli',
  description: 'Buy hijabs online in India — chiffon, silk, cotton & fancy hijabs starting ₹799. Free delivery in Bihar. COD available. Shop now at Bigpotli.',
  keywords: 'buy hijab online India, chiffon hijab online India, hijab shop in Patna',
};
```

**H1 text:**
```
Hijabs Online — Chiffon, Silk & Cotton
```

**Category intro paragraph:**
```
Buy hijabs online in India from Bigpotli — Bihar's trusted hijab store. Choose from
breathable chiffon hijabs, premium silk, and everyday cotton styles starting ₹799.
Free delivery to Patna and all Bihar districts. COD available.
```

---

### 2.4 Unstitched Suits Page (`/unstitched-suits`)

```jsx
export const metadata = {
  title: 'Buy Unstitched Suit Fabric Online | Bihar | COD | Bigpotli',
  description: 'Shop unstitched suits online in Bihar — georgette, printed & premium fabrics starting ₹3,750. Free delivery, COD available. Order now at Bigpotli.',
  keywords: 'unstitched suit online Bihar, georgette unstitched suit, printed unstitched fabric online',
};
```

**H1 text:**
```
Unstitched Suits — Delivered Across Bihar
```

**Category intro paragraph:**
```
Shop unstitched suits online in Bihar from Bigpotli. Choose from premium georgette
unstitched suits, printed fabrics, and designer collections — starting ₹3,750.
Perfect for Eid, weddings, and festive occasions. COD available. Free delivery across Bihar.
```

---

### 2.5 Stitched Ethnic Wear Page (`/stitched-ethnic-wear`)

```jsx
export const metadata = {
  title: 'Buy Stitched Ethnic Wear Online | Kurti Sets | Bihar | Bigpotli',
  description: 'Shop stitched ethnic wear online — kurti sets with dupatta, ready-to-wear suits delivered across Bihar. COD available. Starting ₹3,750 at Bigpotli.',
  keywords: 'stitched ethnic wear online India, kurti set with dupatta online, kurti set delivery Bihar',
};
```

**H1 text:**
```
Stitched Ethnic Wear — Ready to Wear, Delivered to Bihar
```

**Category intro paragraph:**
```
Shop stitched ethnic wear online from Bigpotli — ready-to-wear kurti sets with dupatta
and designer suits delivered to your door across Bihar. No stitching wait — wear it
right away. Starting ₹3,750. COD available.
```

---

### 2.6 Eid Collection Page (`/eid-collection`) — Create if not exists

```jsx
export const metadata = {
  title: 'Eid Collection 2026 | Abayas, Hijabs & Suits for Eid | Bigpotli',
  description: "Shop Bigpotli's Eid 2026 collection — exclusive Abayas, Hijabs & Suits for Eid ul-Fitr. Free delivery across Bihar. COD available. Limited stock.",
  keywords: 'Eid abaya collection 2026, Eid outfit ideas Bihar 2026',
};
```

**H1 text:**
```
Eid Collection 2026 — Shop Now, Deliver Before Eid
```

**Category intro paragraph:**
```
Celebrate Eid in style with Bigpotli's exclusive Eid abaya collection 2026. Discover
handpicked Abayas, Hijabs, and Suits — perfect Eid outfit ideas for Bihar women. Free
delivery across Patna, Gaya, Muzaffarpur. Order now — limited stock, COD available.
```

---

## 3. Schema Markup (Structured Data)

### 3.1 LocalBusiness Schema — Add to Homepage `<head>`

```jsx
// In your homepage or root layout, add this script tag:
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "Bigpotli",
  "url": "https://bigpotli.com",
  "logo": "https://bigpotli.com/logo.png",
  "description": "Bihar's dedicated modest wear store — Abayas, Hijabs, Unstitched Suits and Ethnic Wear for women.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Patna",
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
  "telephone": "+91-XXXXXXXXXX",
  "email": "support@bigpotli.com",
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, COD, UPI, Credit Card",
  "areaServed": ["Bihar", "India"],
  "openingHours": "Mo-Su 09:00-21:00"
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

---

### 3.2 Product Schema — Add to Every Product Page

```jsx
// In each product page component:
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,           // dynamic from your product data
  "description": product.description,
  "image": product.images,
  "brand": {
    "@type": "Brand",
    "name": "Bigpotli"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://bigpotli.com/products/${product.slug}`,
    "priceCurrency": "INR",
    "price": product.price,
    "availability": product.inStock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": "Bigpotli"
    }
  }
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

---

### 3.3 BreadcrumbList Schema — Add to Category & Product Pages

```jsx
// Example for /abaya category page:
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bigpotli.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Abayas",
      "item": "https://bigpotli.com/abaya"
    }
  ]
};
```

---

## 4. Image Alt Text

### Rule
Every `<img>` and `next/image` on the site must have a descriptive `alt` attribute. Never use `alt=""` or `alt="image"`.

### Pattern to follow
```
[colour] [product type] [occasion/fabric] [brand/location]
```

### Examples

```jsx
// Abaya images:
alt="black embroidered abaya online India"
alt="plain abaya free delivery Bihar"
alt="designer abaya Eid collection 2026"

// Hijab images:
alt="chiffon hijab online India"
alt="silk hijab buy online Bihar"
alt="cotton hijab everyday wear India"

// Suit images:
alt="georgette unstitched suit online Bihar"
alt="printed unstitched fabric Eid collection"

// Ethnic wear images:
alt="kurti set with dupatta online Bihar"
alt="stitched ethnic wear ready to wear India"
```

### How to fix in Claude Code
Ask Claude Code:
> "Find all img tags and next/image components in this project that have missing, empty, or generic alt text. Update them using the pattern: [colour] [product type] [occasion] — based on the product name or filename."

---

## 5. Sitemap & Robots

### 5.1 Sitemap (Next.js App Router)

Create `app/sitemap.ts`:

```ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bigpotli.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://bigpotli.com/abaya',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bigpotli.com/hijab',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bigpotli.com/unstitched-suits',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bigpotli.com/stitched-ethnic-wear',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bigpotli.com/eid-collection',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
```

### 5.2 Robots.txt

Create `app/robots.ts`:

```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/checkout/'],
    },
    sitemap: 'https://bigpotli.com/sitemap.xml',
  };
}
```

---

## 6. Canonical URLs

Add canonical to every page to avoid duplicate content issues:

```jsx
// In each page's metadata:
export const metadata = {
  // ... other meta tags
  alternates: {
    canonical: 'https://bigpotli.com/abaya', // change per page
  },
};
```

---

## 7. Page Speed Fixes

### 7.1 Use next/image everywhere
Replace all `<img>` tags with Next.js `<Image>` component:

```jsx
import Image from 'next/image';

// Replace:
<img src="/product.jpg" alt="abaya" />

// With:
<Image
  src="/product.jpg"
  alt="black embroidered abaya online India"
  width={600}
  height={800}
  priority={false} // set true only for above-the-fold images
/>
```

### 7.2 Add priority to hero images
The first visible image (hero/banner) should load fast:

```jsx
<Image
  src="/hero-banner.jpg"
  alt="Buy modest wear online Bihar — Bigpotli"
  width={1200}
  height={600}
  priority={true}  // preloads this image
/>
```

---

## 8. Internal Linking

Add these navigation links between pages. Every category page should link to related categories:

```jsx
// Add to /abaya page:
<p>Also explore our <a href="/hijab">Hijab collection</a> and <a href="/eid-collection">Eid Collection 2026</a>.</p>

// Add to /hijab page:
<p>Complete your look with our <a href="/abaya">Abaya collection</a>.</p>

// Add to /unstitched-suits page:
<p>Looking for ready-to-wear? See our <a href="/stitched-ethnic-wear">Stitched Ethnic Wear</a>.</p>

// Add to homepage — 5 category blocks with links:
<a href="/abaya">Shop Abayas</a>
<a href="/hijab">Shop Hijabs</a>
<a href="/unstitched-suits">Unstitched Suits</a>
<a href="/stitched-ethnic-wear">Ethnic Wear</a>
<a href="/eid-collection">Eid Collection 2026</a>
```

---

## 9. Prompt to Give Claude Code

Once you open your project in Claude Code, paste this:

```
I have a Next.js ecommerce store at bigpotli.com. Please follow the instructions
in this SEO guide exactly and implement all changes:

1. Fix footer address from Mumbai to Patna, Bihar
2. Make copyright year dynamic
3. Fix or hide the broken Eid countdown timer
4. Add all metadata (title, description, keywords) to each page as specified
5. Add LocalBusiness schema to homepage
6. Add Product schema to all product pages
7. Add BreadcrumbList schema to category pages
8. Fix all image alt texts using the pattern specified
9. Create sitemap.ts and robots.ts files
10. Add canonical URLs to all pages
11. Replace all <img> tags with next/image
12. Add internal links between category pages as specified

Start with the critical fixes first (footer, copyright, timer), then metadata,
then schema, then images.
```

---

## Priority Order

| Priority | Task | Impact |
|---|---|---|
| 🔴 Do today | Fix footer address (Mumbai → Patna) | Local SEO |
| 🔴 Do today | Build `/eid-collection` page with full SEO copy | Eid traffic |
| 🔴 Do today | Fix copyright year | Trust signal |
| 🟠 This week | Add metadata to all 6 pages | Rankings |
| 🟠 This week | Add LocalBusiness + Product schema | Rich results |
| 🟠 This week | Fix all image alt texts | Image search traffic |
| 🟡 This month | Create sitemap.ts + robots.ts | Crawlability |
| 🟡 This month | Replace img tags with next/image | Page speed |
| 🟡 This month | Add internal links between pages | Link equity |
