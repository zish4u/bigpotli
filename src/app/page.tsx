import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import OfferBanner from "@/components/home/OfferBanner";
import TrendingProducts from "@/components/home/TrendingProducts";
import BiharSection from "@/components/home/BiharSection";
import Newsletter from "@/components/home/Newsletter";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import type { ProductCard } from "@/types/database.types";
import { VISIBLE_CATEGORY_SLUGS } from "@/lib/categories";

export const revalidate = 3600;

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase
      .from("categories")
      .select("slug, name, image_url, description")
      .in("slug", VISIBLE_CATEGORY_SLUGS)
      .order("id"),
    supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_price, rating, is_new, product_images(url, alt), categories(slug, name)"
      )
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return {
    categories: categories ?? [],
    products: (products ?? []) as unknown as ProductCard[],
  };
}

export default async function Home() {
  const { categories, products } = await getData();

  return (
    <>
      <LocalBusinessSchema />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pb-16 md:pb-0">
          <Hero />
          <TrustBar />
          <CategoryGrid categories={categories} />
          <OfferBanner />
          <TrendingProducts products={products} />
          <BiharSection />
          {/* Testimonials hidden until real customer reviews are collected — see Phase 0 in bigpotli-seo-fix-plan-v3.md */}
          <Newsletter />
        </main>

        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </div>
    </>
  );
}
