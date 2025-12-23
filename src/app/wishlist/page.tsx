"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS } from "@/lib/data";

export default function WishlistPage() {
    const { wishlist, toggleWishlist, addToCart } = useCartStore();

    const wishlistItems = PRODUCTS.filter((p) => wishlist.includes(p.id));

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-6">
                    <h1 className="font-serif text-4xl text-brand-plum mb-2">Your Wishlist</h1>
                    <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">
                        {wishlistItems.length} {wishlistItems.length === 1 ? "Item" : "Items"} Saved
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 space-y-6">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Heart className="w-12 h-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-serif text-brand-plum">Your wishlist is empty</h2>
                        <p className="text-gray-500 max-w-xs mx-auto">Save items you love and they will appear here for easy access later.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-brand-plum text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg">
                            Start Shopping <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product) => (
                            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
                                <div className="relative h-[350px] overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-brand-plum hover:bg-red-50 hover:text-red-500 transition-all"
                                        title="Remove from wishlist"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-serif text-lg mb-2 group-hover:text-brand-gold transition-colors line-clamp-1">{product.name}</h3>
                                    </Link>
                                    <p className="text-brand-plum font-bold text-xl mb-4">{product.price}</p>

                                    <button
                                        onClick={() => { addToCart(product); toggleWishlist(product.id); }}
                                        className="w-full bg-brand-plum text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all text-xs"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Move to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
