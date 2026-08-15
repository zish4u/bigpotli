import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import BiharDistrictCoverage from "@/components/seo/BiharDistrictCoverage";
import type { ProductCard } from "@/types/database.types";
import { Star, ShoppingBag } from "lucide-react";
import { getCategoryMetadata, getCategorySEO } from "@/lib/seo";
import { TIER1_DISTRICTS, TIER2_DISTRICTS, TIER3_DISTRICTS } from "@/lib/districts";

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

  const typedProducts = (products ?? []) as unknown as ProductCard[];
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

        {/* Category Hero */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          {category.image_url ? (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-brand-rose/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/40 to-transparent flex items-end">
            <div className="container mx-auto px-6 pb-8">
              <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                {category.name}
              </p>
              <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                {h1}
              </h1>
            </div>
          </div>
        </div>

        {/* SEO body copy + delivery info */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 py-4">
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

        <main className="flex-grow container mx-auto px-6 py-10 pb-24 md:pb-10">
          {typedProducts.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag className="w-12 h-12 text-brand-rose mx-auto mb-4" />
              <p className="text-brand-muted font-medium">
                No products found in this category yet.
              </p>
            </div>
          ) : (
            <>
              <p className="text-brand-muted text-sm mb-6">
                {typedProducts.length} product{typedProducts.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {typedProducts.map((product) => {
                  const image = product.product_images?.[0];
                  const discount = product.compare_price
                    ? Math.round(
                        ((product.compare_price - product.price) /
                          product.compare_price) *
                          100
                      )
                    : null;

                  return (
                    <Link
                      key={product.id}
                      href={`/${categorySlug}/${product.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col"
                      aria-label={product.name}
                    >
                      <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-brand-rose/10">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.alt ?? product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-rose/20" />
                        )}
                        {product.is_new && (
                          <span className="absolute top-3 left-3 bg-brand-plum text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full tracking-widest">
                            New
                          </span>
                        )}
                        {discount && (
                          <span className="absolute top-3 right-3 bg-brand-gold text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      <div className="p-3 md:p-4 flex-grow flex flex-col">
                        {(product.rating ?? 0) > 0 && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3 h-3 text-brand-gold fill-current" aria-hidden="true" />
                            <span className="text-[10px] font-bold text-brand-muted">
                              {product.rating}
                            </span>
                          </div>
                        )}
                        <h2 className="font-serif text-sm md:text-base text-brand-deep font-bold line-clamp-2 mb-2 group-hover:text-brand-gold transition-colors leading-snug">
                          {product.name}
                        </h2>
                        <div className="mt-auto flex items-baseline gap-2">
                          <span className="text-brand-plum font-black text-base md:text-lg">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          {product.compare_price && (
                            <span className="text-brand-muted/40 line-through text-xs">
                              ₹{product.compare_price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </main>

        {seo?.faqs && seo.faqs.length > 0 && <FAQAccordion items={seo.faqs} />}

        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </div>
    </>
  );
}
