import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import type { ProductCard } from "@/types/database.types";
import { Star, ShoppingBag } from "lucide-react";

const CATEGORY_SLUGS = ["abaya", "hijab", "unstitched", "stitched"];
const SITE_URL = "https://bigpotli.com";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

// ISR — rebuild category pages every hour
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

  return {
    title:
      category.meta_title ??
      `Buy ${category.name} Online in Bihar | Bigpotli`,
    description:
      category.meta_description ??
      `Shop premium ${category.name} online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available.`,
    alternates: { canonical: `${SITE_URL}/${categorySlug}` },
    openGraph: {
      url: `${SITE_URL}/${categorySlug}`,
      title: `${category.name} Collection | Bigpotli`,
    },
  };
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

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: category.name, url: `${SITE_URL}/${categorySlug}` },
        ]}
      />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Category Hero */}
        {category.image_url && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="container mx-auto px-6 pb-8">
                <h1 className="font-serif text-4xl md:text-5xl text-white">
                  Buy {category.name} Online in Bihar
                </h1>
                {category.description && (
                  <p className="text-white/80 mt-2 text-sm">{category.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <main className="flex-grow container mx-auto px-6 py-12">
          {typedProducts.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                No products found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  >
                    <div className="relative h-[260px] overflow-hidden bg-gray-100">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.alt ?? product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      {product.is_new && (
                        <span className="absolute top-3 left-3 bg-brand-plum text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">
                          New
                        </span>
                      )}
                      {discount && (
                        <span className="absolute top-3 right-3 bg-brand-gold text-white text-[10px] font-bold px-2 py-1 rounded-full">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-brand-gold fill-current" />
                        <span className="text-[10px] font-bold text-gray-400">
                          {product.rating}
                        </span>
                      </div>
                      <h2 className="font-serif text-base text-brand-plum-dark font-bold line-clamp-2 mb-2 group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h2>
                      <div className="mt-auto flex items-baseline gap-2">
                        <span className="text-brand-plum font-black text-lg">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.compare_price && (
                          <span className="text-gray-300 line-through text-xs">
                            ₹{product.compare_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
