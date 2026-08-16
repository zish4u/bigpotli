import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ProductCard from "@/components/product/ProductCard";
import { ShoppingBag, Sparkles } from "lucide-react";
import type { ProductCard as ProductCardType } from "@/types/database.types";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "New Arrivals",
    description: "The newest abayas and Pakistani suits, freshly added to Bigpotli. Free delivery across Bihar, COD available on orders ₹1,000+.",
};

async function getNewArrivals() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );

    const { data } = await supabase
        .from("products")
        .select(
            "id, name, slug, price, compare_price, rating, is_new, product_images(url, alt), categories(slug, name)"
        )
        .eq("is_new", true)
        .order("created_at", { ascending: false })
        .limit(24);

    return (data ?? []) as unknown as ProductCardType[];
}

export default async function NewArrivalsPage() {
    const products = await getNewArrivals();

    return (
        <div className="min-h-screen flex flex-col bg-brand-ivory">
            <Header />

            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 pt-8 pb-6">
                    <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase px-3 py-1.5 tracking-[0.2em] rounded-full mb-3">
                        <Sparkles className="w-3 h-3" /> Freshly Added
                    </div>
                    <h1 className="font-serif text-2xl md:text-3xl text-brand-deep font-bold leading-tight">
                        New Arrivals
                    </h1>
                    <p className="text-brand-muted text-sm mt-1">
                        {products.length} product{products.length !== 1 ? "s" : ""} added recently
                    </p>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-6 py-8 pb-24 md:pb-10">
                {products.length === 0 ? (
                    <div className="text-center py-24">
                        <ShoppingBag className="w-10 h-10 text-brand-rose mx-auto mb-4" />
                        <p className="text-brand-muted font-medium">
                            No new arrivals right now — check back soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            <MobileNav />
            <WhatsAppButton />
        </div>
    );
}
