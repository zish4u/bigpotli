import Header from "@/components/Header";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import Footer from "@/components/Footer";

export default function Home() {
    const categories = [
        { name: "Unstitched", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", count: "120+ Items", link: "/category/unstitched" },
        { name: "Abayas", image: "https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800&auto=format&fit=crop", count: "45 Items", link: "/category/abaya" },
        { name: "Hijabs", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", count: "80 Items", link: "/category/hijab" },
        { name: "Stitched Ethnic", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", count: "200+ Items", link: "/category/stitched" },
    ];

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden bg-gray-50">
                <Image
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920&auto=format&fit=crop"
                    alt="Elegant Ethnic Collection"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 md:bg-black/10 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-xl text-white md:text-brand-plum-dark space-y-6">
                            <h1 className="font-serif text-5xl md:text-7xl leading-tight">
                                Elegance in Every <span className="text-brand-gold italic">Fold</span>
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 max-w-md">
                                Discover our exclusive collection of modest ethnic wear, crafted for the modern woman who values tradition and style.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/shopping" className="bg-brand-plum text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-brand-plum-light transition-all shadow-lg hover:shadow-xl group">
                                    Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/category/unstitched" className="bg-white text-brand-plum-dark px-8 py-4 rounded-full border border-gray-200 hover:border-brand-gold transition-all shadow-md">
                                    View Unstitched
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-plum">Shop by Category</h2>
                        <div className="w-20 h-1 bg-brand-gold mt-2"></div>
                    </div>
                    <Link href="/categories" className="text-brand-gold font-semibold flex items-center gap-2 hover:underline">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Link href={cat.link} key={idx} className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg transition-transform hover:-translate-y-2">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-transparent to-transparent flex flex-col justify-end p-8">
                                <p className="text-brand-gold text-sm font-semibold mb-1 uppercase tracking-widest">{cat.count}</p>
                                <h3 className="text-white text-2xl font-serif">{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="py-12 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-brand-plum-dark p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

                        <div className="flex-1 space-y-6 text-center md:text-left z-10">
                            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase px-4 py-2 tracking-[0.3em] rounded-full">
                                <span className="animate-pulse w-2 h-2 rounded-full bg-brand-gold"></span>
                                Exclusive Deal
                            </div>
                            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
                                Luxury <span className="text-brand-gold italic">Eid</span> Special <br />
                                Collection <span className="text-brand-gold font-normal font-sans text-2xl md:text-3xl ml-2">Up to 40% OFF</span>
                            </h2>
                            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                                Experience the finest embroidery and premium fabrics with our limited-time celebratory discounts.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                <Link href="/category/abaya" className="bg-brand-gold text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-plum transition-all shadow-xl hover:scale-105 active:scale-95">
                                    Shop the Offer
                                </Link>
                                <div className="flex flex-col justify-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ends in</p>
                                    <p className="text-white font-mono font-bold text-xl tracking-tighter">02d : 14h : 35m</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4 relative z-10 w-full max-w-md md:max-w-none">
                            <div className="space-y-4">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl group">
                                    <Image src="https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=400&auto=format&fit=crop" alt="Offer 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden relative shadow-2xl group">
                                    <Image src="https://images.unsplash.com/photo-1560935104-da23eeca09dc?q=80&w=400&auto=format&fit=crop" alt="Offer 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="pt-8 space-y-4">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl group">
                                    <Image src="https://images.unsplash.com/photo-1618333303493-2715ed8c386b?q=80&w=400&auto=format&fit=crop" alt="Offer 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden relative bg-brand-gold flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                                    <p className="text-brand-plum-dark font-black text-3xl leading-none">FREE</p>
                                    <p className="text-white font-bold text-[10px] uppercase tracking-widest mt-1">Shipping over ₹5k</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl text-brand-plum mb-4">Trending Now</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto italic">Explore our most loved pieces, chosen by women of grace across the globe.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/shop" className="inline-block border-2 border-brand-plum px-10 py-4 rounded-full text-brand-plum font-bold hover:bg-brand-plum hover:text-white transition-all tracking-widest uppercase text-sm">
                            View Entire Collection
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
