import type { ProductWithImages } from "@/types/database.types";

interface Props {
  product: ProductWithImages;
  categorySlug: string;
}

export default function ProductSchema({ product, categorySlug }: Props) {
  const image = product.product_images?.[0]?.url;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: image ? [image] : undefined,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://bigpotli.com/${categorySlug}/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        (product.stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      (product.review_count ?? 0) > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.review_count,
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
