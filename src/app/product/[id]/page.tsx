"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Zap, ChevronRight, Star, ShieldCheck, Truck, RefreshCw, Info, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { trackAddToCart } from "@/lib/analytics";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart, toggleWishlist, isInWishlist } = useCartStore();

    const product = PRODUCTS.find((p) => p.id === Number(id));
    const isFavourite = product ? isInWishlist(product.id) : false;

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("");
    const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        if (product) {
            setActiveImage(product.images[0] || product.image);
            if (product.colors && product.colors.length > 0) {
                setSelectedColor(product.colors[0]);
            }
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-xl font-serif">Product not found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const handleBuyNow = () => {
        if (product) {
            trackAddToCart(product);
            addToCart(product);
            router.push("/checkout");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-3">
                <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    <Link href="/" className="hover:text-brand-plum">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href={`/category/${product.category}`} className="hover:text-brand-plum">{product.category}</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-brand-plum truncate max-w-[150px]">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Multi-Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                            <Image
                                src={activeImage || product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-opacity duration-300"
                                priority
                            />
                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] font-bold uppercase px-2 py-1 tracking-widest rounded-sm">New Arrival</span>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative h-20 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? "border-brand-gold ring-2 ring-brand-gold/20" : "border-gray-100 hover:border-brand-plum/30"}`}
                                    >
                                        <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-brand-gold mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-gray-400 text-[10px] font-bold tracking-tight">(48 Verified Reviews)</span>
                            </div>
                            <h1 className="font-serif text-3xl md:text-4xl text-brand-plum-dark mb-3 leading-tight font-bold">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-brand-plum">{product.price}</span>
                                <span className="text-lg text-gray-400 line-through">{product.oldPrice}</span>
                                <span className="text-brand-gold text-sm font-bold">20% OFF</span>
                            </div>
                        </div>

                        <div className="bg-brand-plum/5 border border-brand-plum/10 rounded-xl p-4 mb-8 italic text-sm text-gray-700 leading-relaxed border-l-4 border-l-brand-gold">
                            "{product.description}"
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-end">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Select Size</h3>
                                <button className="text-[10px] font-bold text-brand-gold underline uppercase tracking-widest">View Size Guide</button>
                            </div>
                            <div className="flex gap-3">
                                {["S", "M", "L", "XL", "2XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all border text-sm ${selectedSize === size
                                            ? "bg-brand-plum text-white border-brand-plum shadow-lg"
                                            : "border-gray-200 text-gray-500 hover:border-brand-plum hover:text-brand-plum"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons - Repositioned & Optimized */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => { trackAddToCart(product); addToCart(product); }}
                                className="flex-1 bg-white border-2 border-brand-plum text-brand-plum py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum hover:text-white transition-all shadow-sm active:scale-95 text-xs"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-brand-gold text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-brand-plum transition-all shadow-md active:scale-95 text-xs"
                            >
                                <Zap className="w-4 h-4 fill-current" />
                                Buy Now
                            </button>
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`w-14 h-14 flex flex-shrink-0 items-center justify-center rounded-xl border transition-all ${isFavourite
                                    ? "bg-red-50 border-red-200 text-red-500 shadow-inner"
                                    : "border-gray-200 text-gray-400 hover:border-brand-plum hover:text-brand-plum"
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isFavourite ? "fill-current" : ""}`} />
                            </button>
                        </div>

                        {/* Trust Micro-copy */}
                        <div className="mt-6 flex flex-wrap justify-between gap-4 py-4 border-y border-gray-50">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                Secure Checkout
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Truck className="w-4 h-4 text-brand-gold" />
                                Worldwide Express
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <RefreshCw className="w-4 h-4 text-brand-gold" />
                                7-Day Returns
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details & Reviews Tabs */}
                <div className="mt-16 lg:mt-24">
                    <div className="flex border-b border-gray-100 mb-8">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === "details" ? "text-brand-plum" : "text-gray-400 hover:text-brand-plum/60"}`}
                        >
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4" /> Feature Details
                            </div>
                            {activeTab === "details" && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold" />}
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === "reviews" ? "text-brand-plum" : "text-gray-400 hover:text-brand-plum/60"}`}
                        >
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> User Reviews ({product.reviews?.length || 0})
                            </div>
                            {activeTab === "reviews" && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold" />}
                        </button>
                    </div>

                    <div className="min-h-[300px] animate-in fade-in duration-500">
                        {activeTab === "details" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="font-serif text-2xl text-brand-plum">Crafted for Excellence</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Each Bigpotli product is a masterpiece of design and craftsmanship. We source the finest materials and employ traditional techniques to ensure every piece reflects our commitment to modesty and luxury.
                                    </p>
                                    <ul className="space-y-3">
                                        {product.details?.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <Image src="/logo.jpg" alt="Bigpotli Seal" width={100} height={30} className="mx-auto opacity-50 grayscale" />
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Quality Guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="bg-gray-50 p-8 rounded-2xl text-center flex-shrink-0 w-full md:w-64">
                                        <p className="text-5xl font-bold text-brand-plum mb-2">4.9</p>
                                        <div className="flex justify-center text-brand-gold mb-2">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Based on 48 Reviews</p>
                                    </div>
                                    <div className="flex-grow space-y-8 w-full">
                                        {product.reviews?.map((review) => (
                                            <div key={review.id} className="border-b border-gray-50 pb-8 last:border-0">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <p className="font-bold text-brand-plum-dark">{review.userName}</p>
                                                        <div className="flex text-brand-gold mt-1 scale-75 origin-left">
                                                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.date}</p>
                                                </div>
                                                <p className="text-gray-600 text-sm italic leading-relaxed">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
