import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = CATEGORIES.find(c => c.slug === params.slug);

    if (!category) {
        notFound();
    }

    const categoryProducts = PRODUCTS.filter(p => p.category === params.slug);

    return (
        <div className="min-h-screen flex flex-col pt-2 bg-gray-50/50">
            <Header />

            {/* Category Hero */}
            <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover brightness-50"
                />
                <div className="relative z-10 text-center text-white space-y-4 px-6">
                    <h1 className="font-serif text-5xl md:text-7xl">{category.name}</h1>
                    <p className="text-lg md:text-xl font-light tracking-widest uppercase">The Essence of Grace</p>
                </div>
            </section>

            <main className="container mx-auto px-6 py-16 flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <p className="text-gray-500 italic">Showing {categoryProducts.length} exquisite pieces</p>
                    <div className="flex gap-4">
                        <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-gold">
                            <option>Sort By: Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {categoryProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 grayscale opacity-50">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-xl font-serif">A new collection is coming soon.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
