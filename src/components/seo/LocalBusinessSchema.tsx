export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Bigpotli",
    description:
      "Premium ethnic and modest wear for women in Bihar and India",
    url: "https://bigpotli.com",
    telephone: "+91-98765-43210",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Elegance Lane",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.5941,
      longitude: 85.1376,
    },
    areaServed: ["Bihar", "Jharkhand", "Uttar Pradesh", "India"],
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
