import type { Metadata } from "next";

const SITE_URL = "https://bigpotli.com";

const CATEGORY_SEO: Record<
  string,
  { title: string; description: string; h1: string; body: string }
> = {
  abaya: {
    title: "Best Abaya Online Shopping in India – Bihar's Top Store | Bigpotli",
    description:
      "Shop affordable abayas online. COD available. Free delivery to Patna, Gaya, Muzaffarpur & all Bihar districts.",
    h1: "Best Abaya Online Shopping in India – Buy Abaya in Bihar",
    body: "Discover daily wear abayas under ₹500, cotton abayas for women, and premium embroidered abayas. We deliver to Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Arrah and all Bihar districts.",
  },
  hijab: {
    title: "Best Hijab Online Store India – Affordable & Near Me | Bigpotli",
    description:
      "India's trusted hijab online store. Buy affordable hijabs with COD & free delivery across Bihar.",
    h1: "Best Hijab Online Store in India – Shop Hijab Near You in Bihar",
    body: "Shop chiffon hijabs, plain hijabs, and printed hijabs online. Affordable hijab near me – COD available. Free delivery across Bihar.",
  },
  unstitched: {
    title: "Unstitched Suits Online Bihar – Dress Material with COD | Bigpotli",
    description:
      "Buy unstitched suits & dress material online in Bihar. COD available. Free delivery to Patna, Muzaffarpur & all districts.",
    h1: "Buy Unstitched Suits & Dress Material Online in Bihar",
    body: "Choose from cotton unstitched suits, silk fabric sets, and salwar kameez material. Free to stitch with your local tailor. COD available across Bihar.",
  },
  stitched: {
    title:
      "Affordable Kurti Sets & Stitched Suits for Women | Bigpotli Bihar",
    description:
      "Shop stitched suits & kurti sets under ₹500 for women. COD available. Free delivery across Bihar.",
    h1: "Stitched Suits & Kurti Sets Under ₹500 – Bihar's Ethnic Wear Store",
    body: "Ready-to-wear kurti sets, ethnic co-ord sets, and stitched salwar suits for daily wear, Eid, and wedding occasions. Prices starting under ₹500.",
  },
};

export function getCategorySEO(slug: string) {
  return CATEGORY_SEO[slug] ?? null;
}

export function getCategoryMetadata(slug: string, fallbackName: string): Metadata {
  const seo = CATEGORY_SEO[slug];
  if (!seo) {
    return {
      title: `Buy ${fallbackName} Online in Bihar | Bigpotli`,
      description: `Shop premium ${fallbackName} online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available.`,
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      url: `${SITE_URL}/${slug}`,
      title: `${fallbackName} Collection | Bigpotli`,
    },
  };
}
