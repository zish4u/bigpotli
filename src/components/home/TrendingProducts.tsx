import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { ProductCard as ProductCardType } from "@/types/database.types";

interface Props {
  products: ProductCardType[];
}

export default function TrendingProducts({ products }: Props) {
  return (
    <section className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
              Most Loved
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-deep">
              Trending Now
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mt-3" />
          </div>
          <Link
            href="/abaya"
            className="hidden md:flex items-center gap-2 text-brand-gold font-bold text-sm hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-[420px] animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/abaya"
            className="inline-flex items-center gap-2 border-2 border-brand-plum text-brand-plum px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-plum hover:text-white transition-all"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
