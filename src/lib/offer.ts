export interface HomeOfferImage {
  src: string;
  alt: string;
}

export interface HomeOffer {
  /** Small pill above the heading, e.g. "Eid Special", "Diwali Sale". */
  badgeLabel: string;
  headingPrefix: string;
  /** The emphasized word in the heading, e.g. "Eid", "Diwali". */
  headingHighlight: string;
  headingSuffix: string;
  discountText: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  /**
   * ISO 8601 timestamp (with offset) the offer ends at. Omit to run the
   * banner with no countdown. Once this time passes, the countdown hides
   * itself automatically — the banner won't show a stuck "00:00:00:00".
   */
  endDate?: string;
  images: {
    primary: HomeOfferImage;
    secondary: HomeOfferImage;
    tertiary: HomeOfferImage;
  };
}

// The homepage promo banner (src/components/home/OfferBanner.tsx) renders
// entirely from this object — swap it out for the next festival/occasional
// sale instead of editing the component's JSX.
export const CURRENT_OFFER: HomeOffer = {
  badgeLabel: "Limited Time Offer",
  headingPrefix: "The",
  headingHighlight: "Seasonal",
  headingSuffix: "Edit",
  discountText: "Up to 40% OFF",
  description:
    "Premium embroidery & fabrics, curated for the season. Free delivery across Bihar — Patna, Gaya, Muzaffarpur & more.",
  ctaLabel: "Shop the Collection",
  ctaHref: "/abaya",
  // No endDate: this is a standing seasonal offer, not tied to a specific
  // festival or deadline. Set one (ISO 8601, with offset) only for a real
  // time-boxed promo — the countdown hides itself once it passes, so a
  // stale/expired date won't ever get stuck on screen.
  images: {
    primary: {
      src: "https://images.unsplash.com/photo-1728487235101-664d87965931?q=80&w=400&auto=format&fit=crop",
      alt: "Eid Collection Abaya",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?q=80&w=400&auto=format&fit=crop",
      alt: "Ethnic Wear",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1542380841-5eef57349ca1?q=80&w=400&auto=format&fit=crop",
      alt: "Hijab Collection",
    },
  },
};
