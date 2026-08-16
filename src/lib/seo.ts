import type { Metadata } from "next";

const SITE_URL = "https://bigpotli.com";

interface FAQItem {
  question: string;
  answer: string;
}

interface CategorySEO {
  title: string;
  description: string;
  h1: string;
  body: string;
  faqs: FAQItem[];
  districtCoverage?: boolean;
}

// Categories in scope for the Phase 1/2 deep local-SEO treatment
// (full district tag list + long-form intro naming Tier 1 districts).
export const DISTRICT_COVERAGE_SLUGS = ["abaya", "pakistani-suit"];

const CATEGORY_SEO: Record<string, CategorySEO> = {
  abaya: {
    title:
      "Abaya Online in Bihar | COD in Kishanganj, Katihar, Purnia, Patna & More | Bigpotli",
    description:
      "Buy abayas online with COD (orders ₹1,000+) across Bihar — Patna, Kishanganj, Katihar, Purnia, Araria, Darbhanga & more. Daily-wear cotton to premium embroidered abayas.",
    h1: "Buy Abaya Online in Bihar | Patna, Kishanganj, Katihar & More",
    body: "Bigpotli is Bihar's trusted destination for abayas online, from everyday cotton styles under ₹500 to premium embroidered pieces for Eid and weddings. We deliver with Cash on Delivery — on orders over ₹1,000 — to Patna and across Seemanchal — including Kishanganj, Katihar, Araria, and Purnia — so you can order with confidence and pay only when your abaya arrives. In Darbhanga, Pashchim Champaran, and Sitamarhi too, our courier partners bring the same COD convenience straight to your doorstep. Every abaya is chosen for fabrics suited to Bihar's climate: breathable cotton and Nida for the long, humid summer, and richer georgette or crepe for winter and festive occasions. Product photos are real and honest, so what you see on the page is exactly what arrives at your door — no surprises. From size XS to 4XL, our size chart on every product page makes it easy to order confidently online, without needing an in-store trial — something that matters when the nearest big-city boutique can be hours away for many of our customers. Our daily-wear and embroidered styles are among our fastest-selling collections and restock regularly, so if your size or design is out of stock, it's worth checking back within a week or two. Whether you're dressing for daily prayers, Eid celebrations, or a wedding in the family, Bigpotli's abaya collection is built around comfort, modesty, and quality that holds up to Bihar's weather.",
    districtCoverage: true,
    faqs: [
      {
        question: "How do I choose the right abaya size?",
        answer:
          "Measure your bust, waist, and full body length in inches, then compare against our size chart on each product page. If you're between sizes, we recommend sizing up for the loose, comfortable fit abayas are meant to have.",
      },
      {
        question: "What is the difference between an abaya and a burqa?",
        answer:
          "An abaya is an open or closed robe worn over regular clothing, often paired separately with a hijab or niqab. A burqa is typically a single full-body garment that also covers the face. Bigpotli's collection focuses on abayas.",
      },
      {
        question: "Which abaya fabric works best for Bihar's summer heat?",
        answer:
          "Cotton and Nida fabrics breathe well and are ideal for Bihar's humid summers. Our daily wear cotton abayas are lightweight and comfortable for all-day wear.",
      },
      {
        question: "Do you deliver abayas with COD across Bihar?",
        answer:
          "Yes, Cash on Delivery is available on orders above ₹1,000 across Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Purnia, Kishanganj, Katihar, Araria, and other Bihar districts. Orders below ₹1,000 need to be prepaid.",
      },
    ],
  },
  hijab: {
    title: "Best Hijab Online Store India – Affordable & Near Me | Bigpotli",
    description:
      "India's trusted hijab online store. Buy affordable hijabs with COD (orders ₹1,000+) & free delivery across Bihar.",
    h1: "Best Hijab Online Store in India – Shop Hijab Near You in Bihar",
    body: "Shop chiffon hijabs, plain hijabs, and printed hijabs online. Affordable hijab near me – COD available on orders ₹1,000+. Free delivery across Bihar, including Patna, Gaya, Muzaffarpur, Purnia, Kishanganj, Katihar and Araria.",
    faqs: [
      {
        question: "How do I style a hijab with an abaya?",
        answer:
          "Pin the hijab under the chin for a clean look, letting it drape over the shoulders to complement your abaya. Chiffon and jersey hijabs pair especially well with flowing abaya styles.",
      },
      {
        question: "What hijab fabrics do you offer?",
        answer:
          "We stock chiffon, jersey, cotton, and printed hijabs. Chiffon is lightweight and formal, jersey holds pins well for everyday wear, and cotton suits Bihar's summer heat.",
      },
      {
        question: "How do I wear a hijab if I'm a beginner?",
        answer:
          "Start with a jersey or cotton hijab — the fabric grips well and is easiest to pin. Fold it in half to form a triangle, place it over your head, and secure under the chin with a pin before wrapping the longer side around.",
      },
      {
        question: "Which hijab is best for Bihar's summer?",
        answer:
          "Cotton and chiffon hijabs are the most breathable choices for Bihar's hot, humid months, keeping you cool while staying modest.",
      },
    ],
  },
  unstitched: {
    title: "Unstitched Suits Online Bihar – Dress Material with COD | Bigpotli",
    description:
      "Buy unstitched suits & dress material online in Bihar. COD available on orders ₹1,000+. Free delivery to Patna, Muzaffarpur & all districts.",
    h1: "Buy Unstitched Suits & Dress Material Online in Bihar",
    body: "Choose from cotton unstitched suits, silk fabric sets, and salwar kameez material. Free to stitch with your local tailor. COD available on orders over ₹1,000, across Bihar.",
    faqs: [
      {
        question: "How much fabric do I need for a salwar suit?",
        answer:
          "Most unstitched suit sets include enough fabric for the top, bottom, and dupatta — typically around 5.5 to 6.5 metres in total, depending on your height and design.",
      },
      {
        question: "Can I get the suit stitched locally after ordering?",
        answer:
          "Yes, our unstitched suits are sold as fabric sets so you can get them tailored to your exact measurements by any local tailor in Patna or your city.",
      },
    ],
  },
  stitched: {
    title:
      "Affordable Kurti Sets & Stitched Suits for Women | Bigpotli Bihar",
    description:
      "Shop stitched suits & kurti sets under ₹500 for women. COD available on orders ₹1,000+. Free delivery across Bihar.",
    h1: "Stitched Suits & Kurti Sets Under ₹500 – Bihar's Ethnic Wear Store",
    body: "Ready-to-wear kurti sets, ethnic co-ord sets, and stitched salwar suits for daily wear, Eid, and wedding occasions. Prices starting under ₹500.",
    faqs: [
      {
        question: "Are stitched suits available in all sizes?",
        answer:
          "Yes, our stitched suits and kurti sets are available across standard sizes. Check the size chart on each product page before ordering.",
      },
      {
        question: "Can I exchange a stitched suit if the size doesn't fit?",
        answer:
          "Yes, stitched suits are eligible for exchange within our return policy window as long as tags are intact and the item is unworn.",
      },
    ],
  },
  "pakistani-suit": {
    title: "Pakistani Suit Online in Bihar | Patna, Katihar, Purnia & More | Bigpotli",
    description:
      "Shop Pakistani suits online with COD (orders ₹1,000+) across Bihar — Patna, Katihar, Purnia, Kishanganj & more. Unstitched and ready-to-wear styles for Eid & weddings.",
    h1: "Pakistani Suit Online in Bihar | Patna, Katihar, Purnia & More",
    body: "Bigpotli brings authentic Pakistani suits to Bihar with Cash on Delivery available across the state on orders over ₹1,000. Customers in Patna order our unstitched and ready-to-wear sets for Eid, weddings, and everyday elegance, while shoppers across Seemanchal — Kishanganj, Katihar, Araria, and Purnia — rely on us for the same COD convenience and doorstep delivery. In Darbhanga, Pashchim Champaran, and Sitamarhi, our courier network reaches just as reliably, so distance from Patna is never a barrier to ordering. Pakistani suits are known for longer kameez lengths, straight-cut trousers or shararas, and richer embroidery than typical Indian suits — a distinct silhouette that Bigpotli sources carefully to bring genuine styles rather than approximations. Many of our sets arrive as versatile 3-piece outfits — kameez, trouser or sharara, and dupatta — so you can mix and match pieces to build a wardrobe rather than a single occasion outfit. Each set arrives with real product photography, so the fabric, embroidery, and fit you see online is exactly what you receive. Whether you're shopping for a festive Eid outfit, a wedding function, or a statement piece to elevate your everyday wardrobe, our Pakistani suit collection is curated for both comfort and craftsmanship. New arrivals are added regularly, so it's worth checking back if a particular design or size is temporarily sold out.",
    districtCoverage: true,
    faqs: [
      {
        question: "What is the difference between a Pakistani suit and an Indian suit?",
        answer:
          "Pakistani suits typically feature longer kameez lengths, straight-cut trousers or shararas, and heavier embroidery than Indian suits, which tend to have shorter kurtas and more varied silhouettes.",
      },
      {
        question: "How do I style a Pakistani suit?",
        answer:
          "Pair a Pakistani suit with matching or contrasting dupatta draped over one shoulder, and keep jewellery minimal for daily wear or statement pieces for festive occasions.",
      },
      {
        question: "Is COD available on Pakistani suit orders in Bihar?",
        answer:
          "Yes, Cash on Delivery is available on Pakistani suit orders above ₹1,000 across Patna and all Bihar districts. Orders below ₹1,000 need to be prepaid.",
      },
    ],
  },
  "lawn-suit": {
    title: "Buy Pakistani Lawn Suits Online in Bihar | COD | Bigpotli",
    description:
      "Shop unstitched Pakistani lawn suits online. Free delivery across Bihar. COD available on orders ₹1,000+.",
    h1: "Buy Pakistani Lawn Suits Online in Bihar",
    body: "Shop unstitched Pakistani lawn suits — breathable summer fabric, best selection April to July. Free delivery to Patna, Gaya, Muzaffarpur, Bhagalpur and all Bihar districts. COD available on orders over ₹1,000.",
    faqs: [
      {
        question: "What is lawn fabric?",
        answer:
          "Lawn is a lightweight, finely woven cotton fabric known for its breathability, making it a popular choice for summer suits, especially in Pakistani fashion.",
      },
      {
        question: "How do I care for a lawn suit?",
        answer:
          "Pure cotton lawn can shrink 5–8% if not pre-washed. Hand wash or use a gentle machine cycle in cold water before your first wear, and iron on a medium setting.",
      },
      {
        question: "What is the difference between lawn and cotton suits?",
        answer:
          "Lawn is a specific type of fine, lightweight cotton weave, while 'cotton suit' can refer to any cotton fabric weight. Lawn is generally lighter and more breathable, ideal for peak summer.",
      },
    ],
  },
  kurti: {
    title: "Buy Kurti Online in Bihar | COD | Bigpotli",
    description:
      "Shop designer and cotton kurtis online with COD (orders ₹1,000+). Free delivery to Patna & all Bihar districts.",
    h1: "Buy Kurti Online in Bihar",
    body: "Shop designer kurtis, cotton kurtis for daily wear, and kurti sets with palazzo. Perfect for Chhath Puja, Eid, and everyday styling. Free delivery to Patna, Gaya, Muzaffarpur, Bhagalpur and all Bihar districts. COD available on orders over ₹1,000.",
    faqs: [
      {
        question: "Which kurti is best for Chhath Puja?",
        answer:
          "Bright cotton kurtis in traditional prints work well for Chhath Puja — breathable fabric is ideal for the long rituals, and festive colours suit the occasion.",
      },
      {
        question: "How do I style a kurti for daily wear?",
        answer:
          "Pair a cotton kurti with palazzos or leggings and simple jewellery for a comfortable daily-wear look, or dress it up with a dupatta and heels for festive occasions.",
      },
      {
        question: "What kurti fabric is best for Bihar's summer?",
        answer:
          "Cotton kurtis are the most breathable and comfortable option for Bihar's hot, humid climate.",
      },
    ],
  },
  "co-ord-set": {
    title: "Buy Co-ord Sets Online in Bihar | COD | Bigpotli",
    description:
      "Shop ethnic co-ord sets online with COD (orders ₹1,000+). Free delivery across Bihar.",
    h1: "Buy Ethnic Co-ord Sets Online in Bihar",
    body: "Shop ethnic co-ord sets — matching top and bottom sets for summer and festive occasions. Free delivery to Patna, Gaya, Muzaffarpur and all Bihar districts. COD available on orders over ₹1,000.",
    faqs: [
      {
        question: "What is a co-ord set?",
        answer:
          "A co-ord set (short for 'coordinated set') is a matching top and bottom outfit designed to be worn together, offering an easy, put-together look without mixing separates.",
      },
      {
        question: "How do I style a co-ord set for festive occasions?",
        answer:
          "Add a dupatta, statement jewellery, and heels to dress up an ethnic co-ord set for weddings or festivals, or keep it simple with minimal accessories for daytime wear.",
      },
    ],
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
      description: `Shop premium ${fallbackName} online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available on orders ₹1,000+.`,
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
