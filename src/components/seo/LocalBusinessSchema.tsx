import { siteConfig } from "@/lib/siteConfig";
import { ALL_BIHAR_DISTRICTS } from "@/lib/districts";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteConfig.name,
    description:
      "Premium ethnic and modest wear for women in Bihar and India",
    url: siteConfig.url,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.5941,
      longitude: 85.1376,
    },
    areaServed: ALL_BIHAR_DISTRICTS.map((district) => ({
      "@type": "AdministrativeArea",
      name: district,
    })),
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-21:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
