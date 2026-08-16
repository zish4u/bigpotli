"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { ProductCard as ProductCardType } from "@/types/database.types";

const PRICE_RANGES = [
  { id: "under-500", label: "Under ₹500", min: 0, max: 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "above-2000", label: "Above ₹2,000", min: 2000, max: Infinity },
] as const;

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Customer Rating" },
] as const;

type SortId = (typeof SORT_OPTIONS)[number]["id"];

interface Props {
  products: ProductCardType[];
  categorySlug: string;
}

export default function CategoryProductGrid({ products, categorySlug }: Props) {
  const [sortBy, setSortBy] = useState<SortId>("newest");
  const [priceRanges, setPriceRanges] = useState<Set<string>>(new Set());
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const togglePriceRange = (id: string) => {
    setPriceRanges((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeFilterCount = priceRanges.size + (onSaleOnly ? 1 : 0);

  const filtered = useMemo(() => {
    let result = products;

    if (priceRanges.size > 0) {
      const ranges = PRICE_RANGES.filter((r) => priceRanges.has(r.id));
      result = result.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }

    if (onSaleOnly) {
      result = result.filter((p) => p.compare_price != null && p.compare_price > p.price);
    }

    const sorted = [...result];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, priceRanges, onSaleOnly, sortBy]);

  const clearFilters = () => {
    setPriceRanges(new Set());
    setOnSaleOnly(false);
  };

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-deep mb-3">
          Price
        </h3>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={priceRanges.has(range.id)}
                onChange={() => togglePriceRange(range.id)}
                className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm text-brand-muted group-hover:text-brand-deep transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-5 border-t border-gray-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-deep mb-3">
          Offers
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
          />
          <span className="text-sm text-brand-muted group-hover:text-brand-deep transition-colors">
            On Sale
          </span>
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-plum transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h2 className="font-serif text-lg text-brand-deep font-bold mb-5">Filters</h2>
          {filterPanel}
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 text-sm font-bold text-brand-deep border border-gray-200 rounded-full px-4 py-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-brand-gold text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="hidden lg:block text-sm text-brand-muted">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortId)}
              className="appearance-none text-sm font-semibold text-brand-deep border border-gray-200 rounded-full pl-4 pr-9 py-2 bg-white cursor-pointer focus:outline-none focus:border-brand-gold"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-brand-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-10 h-10 text-brand-rose mx-auto mb-4" />
            <p className="text-brand-muted font-medium mb-4">No products match your filters.</p>
            <button
              onClick={clearFilters}
              className="text-brand-gold font-bold text-sm hover:text-brand-plum transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
            ))}
          </div>
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg text-brand-deep font-bold">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5 text-brand-muted" />
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 bg-brand-plum text-white rounded-xl py-3 font-bold uppercase tracking-widest text-xs"
            >
              Show {filtered.length} Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
