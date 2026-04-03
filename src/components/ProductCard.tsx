"use client";

import Image from "next/image";
import { ShoppingBag, Heart, Zap, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { trackAddToCart } from "@/lib/analytics";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
    const isFavourite = isInWishlist(product.id);
    const router = useRouter();

    const cartItem = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category,
        categorySlug: product.categorySlug,
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        trackAddToCart(product);
        addToCart(cartItem);
        router.push("/checkout");
    };

    const productUrl = `/${product.categorySlug}/${product.slug}`;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 flex flex-col h-full relative">
            <Link href={productUrl} className="relative h-[250px] overflow-hidden block">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.isNew && (
                        <span className="bg-brand-plum text-white text-[10px] font-bold uppercase px-3 py-1.5 tracking-widest rounded-full shadow-lg">New</span>
                    )}
                </div>

                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${isFavourite
                        ? "bg-red-500 text-white shadow-red-200"
                        : "bg-white/80 text-brand-plum hover:bg-white hover:scale-110"
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isFavourite ? "fill-current" : ""}`} />
                </button>
            </Link>

            <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">{product.category}</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-brand-gold fill-current" />
                        <span className="text-[10px] font-bold text-gray-400">{product.rating}</span>
                    </div>
                </div>

                <Link href={productUrl}>
                    <h3 className="font-serif text-lg text-brand-plum-dark mb-1 group-hover:text-brand-gold transition-colors line-clamp-1 font-bold">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-gray-400 text-[10px] mb-3 line-clamp-1 font-medium italic">
                    {product.description}
                </p>

                <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-brand-plum font-black text-xl">₹{product.price.toLocaleString()}</span>
                    <span className="text-gray-300 line-through text-xs font-bold">₹{product.comparePrice.toLocaleString()}</span>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); trackAddToCart(product); addToCart(cartItem); }}
                            className="flex-1 border-2 border-brand-plum text-brand-plum py-3 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum hover:text-white transition-all text-[10px] active:scale-95"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-brand-gold text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum transition-all text-[10px] shadow-sm shadow-brand-gold/20 active:scale-95"
                        >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
