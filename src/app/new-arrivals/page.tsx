"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { Sparkles } from "lucide-react";

export default function NewArrivalsPage() {
    // Filter products with isNew: true
    const newArrivals = PRODUCTS.filter(product => product.isNew);

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <div className="bg-brand-plum-dark py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase px-4 py-2 tracking-[0.3em] rounded-full mb-6">
                        <Sparkles className="w-3 h-3" /> Latest Collection
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                        New <span className="text-brand-gold italic">Arrivals</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto italic">
                        Be the first to explore our newest pieces, meticulously crafted for elegance and contemporary style.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
                        <div>
                            <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">Freshly Curated</p>
                            <h2 className="text-3xl font-serif text-brand-plum">Discover Excellence</h2>
                        </div>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                            Showing {newArrivals.length} Products
                        </p>
                    </div>

                    {newArrivals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {newArrivals.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <h3 className="text-2xl font-serif text-brand-plum mb-4">No New Arrivals Currently</h3>
                            <p className="text-gray-500 max-w-md mx-auto italic mb-8">
                                We are currently restocking our latest collection. Please check back soon or explore our existing categories.
                            </p>
                            <a href="/categories" className="bg-brand-plum text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg">
                                Browse Categories
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Stay Updated */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-brand-plum rounded-[3rem] p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 relative z-10">Don't Miss <span className="text-brand-gold italic">Next</span> Release</h2>
                        <p className="text-gray-300 max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
                            Join our exclusive mailing list to get early access to new arrivals, seasonal promotions, and modest fashion insights.
                        </p>
                        <div className="max-w-md mx-auto relative z-10">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow bg-white/10 border border-white/20 px-6 py-4 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-all"
                                />
                                <button className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-plum transition-all shadow-xl">
                                    Notify Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
