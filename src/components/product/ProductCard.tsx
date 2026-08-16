"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Zap, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import type { ProductCard as ProductCardType } from "@/types/database.types";
import { formatPrice, getDiscount } from "@/lib/utils";

interface Props {
  product: ProductCardType;
  categorySlug?: string;
}

export default function ProductCard({ product, categorySlug }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const router = useRouter();
  const isFavourite = isInWishlist(product.id);

  const slug = categorySlug ?? product.categories?.slug ?? "";
  const productUrl = `/${slug}/${product.slug}`;
  const image = product.product_images?.[0];
  const discount = getDiscount(product.price, product.compare_price ?? null);

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: image?.url ?? "",
    category: product.categories?.name ?? "",
    categorySlug: slug,
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative">
      <Link
        href={productUrl}
        className="relative block overflow-hidden"
        aria-label={`View ${product.name}`}
      >
        <div className="relative h-[260px] bg-brand-rose/20">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-brand-rose/20" />
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new && (
              <span className="bg-brand-plum text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full tracking-widest shadow">
                New
              </span>
            )}
            {discount && (
              <span className="bg-brand-gold text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-sm transition-all z-10 shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center ${
          isFavourite
            ? "bg-red-500 text-white"
            : "bg-white/80 text-brand-muted hover:bg-white hover:scale-110"
        }`}
        aria-label={isFavourite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        <Heart className={`w-4 h-4 ${isFavourite ? "fill-current" : ""}`} />
      </button>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">
            {product.categories?.name}
          </span>
          {(product.rating ?? 0) > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-brand-gold fill-current" aria-hidden="true" />
              <span className="text-[10px] font-bold text-brand-muted">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        <Link href={productUrl} aria-label={product.name}>
          <h3 className="font-serif text-base text-brand-deep font-bold line-clamp-2 mb-3 group-hover:text-brand-gold transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-brand-plum font-black text-xl">
            {formatPrice(product.price)}
          </span>
          {product.compare_price && (
            <span className="text-brand-muted/40 line-through text-xs font-bold">
              {formatPrice(product.compare_price)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(cartItem);
            }}
            className="w-11 min-h-[44px] flex-shrink-0 border-2 border-brand-plum text-brand-plum rounded-xl flex items-center justify-center hover:bg-brand-plum hover:text-white transition-all active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(cartItem);
              router.push("/checkout");
            }}
            className="flex-1 min-h-[44px] bg-brand-gold text-white rounded-xl flex items-center justify-center gap-1.5 font-bold uppercase tracking-widest hover:bg-brand-plum transition-all text-[10px] shadow-sm active:scale-95"
            aria-label={`Buy ${product.name} now`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
