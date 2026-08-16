import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import BiharDistrictCoverage from "@/components/seo/BiharDistrictCoverage";
import CategoryProductGrid from "@/components/category/CategoryProductGrid";
import type { ProductCard } from "@/types/database.types";
import { Truck, CreditCard, ChevronRight } from "lucide-react";
import { getCategoryMetadata, getCategorySEO } from "@/lib/seo";
import { TIER1_DISTRICTS, TIER2_DISTRICTS, TIER3_DISTRICTS } from "@/lib/districts";

const EXPLORE_LINKS = [
  { href: "/abaya", label: "Abaya" },
  { href: "/pakistani-suit", label: "Pakistani Suit" },
  { href: "/new-arrivals", label: "New Arrivals" },
];

const CATEGORY_SLUGS = [
  "abaya",
  "hijab",
  "unstitched",
  "stitched",
  "pakistani-suit",
  "lawn-suit",
  "kurti",
  "co-ord-set",
];
const SITE_URL = "https://bigpotli.com";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ categorySlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const supabase = createStaticClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
  const { data: category } = await supabase
    .from("categories")
    .select("name, meta_title, meta_description")
    .eq("slug", categorySlug)
    .single();

  if (!category) return { title: "Not Found" };

  if (category.meta_title && category.meta_description) {
    return {
      title: category.meta_title,
      description: category.meta_description,
      alternates: { canonical: `${SITE_URL}/${categorySlug}` },
    };
  }

  return getCategoryMetadata(categorySlug, category.name);
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", categorySlug)
    .single();

  if (!category) notFound();

  const { data: products } = await supabase
    .from("products")
    .select(
      "id, name, slug, price, compare_price, rating, is_new, product_images(url, alt, position)"
    )
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  const rawProducts = (products ?? []) as unknown as ProductCard[];
  const typedProducts: ProductCard[] = rawProducts.map((product) => ({
    ...product,
    categories: { slug: categorySlug, name: category.name },
  }));
  const seo = getCategorySEO(categorySlug);
  const h1 = seo?.h1 ?? `Buy ${category.name} Online in Bihar`;
  const bodyText = seo?.body ?? `Shop premium ${category.name} online with free delivery across Bihar.`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: category.name, url: `${SITE_URL}/${categorySlug}` },
        ]}
      />
      {seo?.faqs && seo.faqs.length > 0 && <FAQSchema items={seo.faqs} />}
      <div className="min-h-screen flex flex-col bg-brand-ivory">
        <Header />

        {/* Breadcrumb + compact title — no hero banner competing with the product grid */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 pt-5 pb-4">
            <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3">
              <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-brand-plum-dark">{category.name}</span>
            </nav>
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <h1 className="font-serif text-brand-deep font-bold leading-tight">
                <span className="block text-2xl md:text-3xl">{category.name}</span>
                <span className="block text-xs md:text-sm font-medium text-brand-muted normal-case mt-1">
                  {h1}
                </span>
              </h1>
              <span className="text-brand-muted text-sm lg:hidden">
                {typedProducts.length} product{typedProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Trust signals — light inline badges, not a competing dark bar
                (the header already carries a dark promo strip) */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-1.5 mt-3 pt-3 border-t border-gray-100 text-[11px] md:text-xs font-semibold text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                Free Delivery Across Bihar
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                COD Available on Orders ₹1,000+
              </span>
            </div>
          </div>
        </div>

        <main className="flex-grow container mx-auto px-6 py-8 pb-24 md:pb-10">
          {typedProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-brand-muted font-medium">
                No products found in this category yet.
              </p>
            </div>
          ) : (
            <CategoryProductGrid products={typedProducts} categorySlug={categorySlug} />
          )}
        </main>

        {/* SEO copy + district coverage — below the product grid, not competing with it */}
        <div className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-10">
            <p className="text-brand-muted text-sm leading-relaxed max-w-3xl">
              {bodyText}
              {seo?.districtCoverage ? (
                <>
                  {" "}
                  <a
                    href="#bihar-districts"
                    className="text-brand-deep font-semibold underline hover:text-brand-gold transition-colors"
                  >
                    and 20+ other districts across Bihar
                  </a>
                  .
                </>
              ) : (
                <span className="text-brand-deep font-semibold">
                  {" "}
                  We deliver to Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Arrah and all Bihar districts.
                </span>
              )}
            </p>
          </div>
        </div>

        {seo?.districtCoverage && (
          <BiharDistrictCoverage
            tier1={TIER1_DISTRICTS}
            tier2={TIER2_DISTRICTS}
            tier3={TIER3_DISTRICTS}
          />
        )}

        {seo?.faqs && seo.faqs.length > 0 && <FAQAccordion items={seo.faqs} />}

        {/* Explore More — plain internal links, same pattern as Nykaa/Myntra's
            "Popular Searches" / "Other Categories" blocks near the footer */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6 py-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted mb-3">
              Explore More
            </p>
            <p className="text-sm leading-relaxed">
              {EXPLORE_LINKS.filter((link) => link.href !== `/${categorySlug}`).map(
                (link, i, arr) => (
                  <span key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-deep font-medium hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                    {i < arr.length - 1 && <span className="mx-2 text-gray-300">|</span>}
                  </span>
                )
              )}
            </p>
          </div>
        </div>

        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </div>
    </>
  );
}
