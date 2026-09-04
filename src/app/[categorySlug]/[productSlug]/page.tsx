"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Zap, Heart, ChevronRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { useCartStore } from "@/store/useCartStore";
import type { ProductWithImages } from "@/types/database.types";
import { createClient } from "@/lib/supabase/client";

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = use(params);
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();

  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*, categories(slug, name), product_images(url, alt, position)")
      .eq("slug", productSlug)
      .single()
      .then(({ data }) => {
        if (!data) {
          notFound();
          return;
        }
        const p = data as unknown as ProductWithImages;
        if (p.categories?.slug !== categorySlug) {
          router.replace(`/${p.categories?.slug}/${p.slug}`);
          return;
        }
        // Sort images by position
        p.product_images?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        setProduct(p);
        setLoading(false);
      });
  }, [productSlug, categorySlug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  const isFavourite = isInWishlist(product.id);
  const images = product.product_images ?? [];
  const mainImage = images[selectedImage]?.url ?? images[0]?.url;
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null;

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: mainImage ?? "",
    category: product.categories?.name ?? "",
    categorySlug,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <nav className="sr-only">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://bigpotli.com" },
                { "@type": "ListItem", position: 2, name: product.categories?.name ?? categorySlug, item: `https://bigpotli.com/${categorySlug}` },
                { "@type": "ListItem", position: 3, name: product.name, item: `https://bigpotli.com/${categorySlug}/${productSlug}` },
              ],
            }),
          }}
        />
      </nav>

      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: images.map((i) => i.url),
            sku: product.id,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: (product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            aggregateRating: (product.review_count ?? 0) > 0
              ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.review_count }
              : undefined,
          }),
        }}
      />

      <Header />

      <main className="flex-grow container mx-auto px-6 py-10">
        {/* Breadcrumb nav */}
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-8">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${categorySlug}`} className="hover:text-brand-gold transition-colors capitalize">
            {product.categories?.name ?? categorySlug}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-plum-dark truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              {mainImage && (
                <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
              )}
              {product.is_new && (
                <span className="absolute top-4 left-4 bg-brand-plum text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-widest">
                  New
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-brand-gold text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? "border-brand-gold" : "border-transparent"}`}
                  >
                    <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2">
                {product.categories?.name}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-brand-plum-dark font-bold leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(product.rating ?? 0) ? "text-brand-gold fill-current" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.review_count ?? 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-brand-plum">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compare_price && (
                <span className="text-xl text-gray-300 line-through font-bold">
                  ₹{product.compare_price.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-sm font-bold text-green-600">Save {discount}%</span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${(product.stock ?? 0) > 0 ? "bg-green-500" : "bg-red-400"}`} />
              <span className={`font-semibold ${(product.stock ?? 0) > 0 ? "text-green-600" : "text-red-500"}`}>
                {(product.stock ?? 0) > 0 ? `In Stock (${product.stock ?? 0} left)` : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                disabled={product.stock === 0}
                onClick={() => addToCart(cartItem)}
                className="flex-1 border-2 border-brand-plum text-brand-plum py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum hover:text-white transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                disabled={product.stock === 0}
                onClick={() => { addToCart(cartItem); router.push("/checkout"); }}
                className="flex-1 bg-brand-gold text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum transition-all text-sm shadow-lg shadow-brand-gold/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border-2 transition-all ${isFavourite ? "bg-red-50 border-red-300 text-red-500" : "border-gray-200 text-gray-400 hover:border-brand-plum"}`}
              >
                <Heart className={`w-5 h-5 ${isFavourite ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: "Free delivery", sub: "Orders over ₹5,000" },
                { icon: ShieldCheck, label: "Secure payment", sub: "SSL encrypted" },
                { icon: RefreshCw, label: "Easy exchanges", sub: "48-hour window" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
                  <Icon className="w-5 h-5 text-brand-gold mb-1" />
                  <p className="text-[10px] font-bold text-brand-plum-dark uppercase tracking-wide">{label}</p>
                  <p className="text-[9px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </div>
  );
}
