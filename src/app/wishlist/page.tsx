"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { createClient } from "@/lib/supabase/client";
import type { ProductCard as ProductCardType } from "@/types/database.types";

export default function WishlistPage() {
    const wishlist = useCartStore((state) => state.wishlist);
    const [products, setProducts] = useState<ProductCardType[] | null>(null);

    useEffect(() => {
        if (wishlist.length === 0) {
            setProducts([]);
            return;
        }

        const supabase = createClient();
        supabase
            .from("products")
            .select(
                "id, name, slug, price, compare_price, rating, is_new, product_images(url, alt), categories(slug, name)"
            )
            .in("id", wishlist)
            .then(({ data }) => setProducts((data as unknown as ProductCardType[]) ?? []));
    }, [wishlist]);

    const loading = products === null;

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="bg-brand-ivory py-12 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <h1 className="font-serif text-4xl text-brand-deep mb-2">Your Wishlist</h1>
                    <p className="text-brand-muted font-medium tracking-wide uppercase text-xs">
                        {loading ? "Loading..." : `${products.length} ${products.length === 1 ? "Item" : "Items"} Saved`}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl h-[380px] animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 space-y-6">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Heart className="w-12 h-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-serif text-brand-deep">Your wishlist is empty</h2>
                        <p className="text-brand-muted max-w-xs mx-auto">Save items you love and they will appear here for easy access later.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-brand-plum text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg">
                            Start Shopping <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
