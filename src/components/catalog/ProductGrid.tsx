"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";
import type { Product, Category } from "@/types/product";

type Props = {
  products: Product[];
  categories: Category[];
  meterBrands: string[];
  initialCat?: string;
  initialBrand?: string;
};

export function ProductGrid({
  products,
  categories,
  meterBrands,
  initialCat,
  initialBrand,
}: Props) {
  const [activeCat, setActiveCat] = useState(initialCat || "all");
  const [activeBrand, setActiveBrand] = useState(initialBrand || "all");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const showBrandFilter = activeCat === "all" || activeCat === "index";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCat !== "all" && p.cat !== activeCat) return false;
      if (showBrandFilter && activeBrand !== "all" && p.brand !== activeBrand)
        return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q) ||
          (p.fits || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, activeCat, activeBrand, search, showBrandFilter]);

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-line shadow-sm">
        <div className="max-w-310 mx-auto px-6 py-3 flex flex-col gap-3">
          {/* Category chips + search */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              size="sm"
              onClick={() => setActiveCat("all")}
              className={`rounded-[3px] text-xs font-semibold h-8 px-3.5 ${
                activeCat === "all"
                  ? "bg-navy text-white"
                  : "bg-surface border border-line text-ink hover:bg-surface-2"
              }`}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                onClick={() => setActiveCat(cat.id)}
                className={`rounded-[3px] text-xs font-semibold h-8 px-3.5 ${
                  activeCat === cat.id
                    ? "bg-navy text-white"
                    : "bg-surface border border-line text-ink hover:bg-surface-2"
                }`}
              >
                {cat.name}
              </Button>
            ))}

            {/* Search — full width on mobile, auto on larger */}
            <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="pl-8 h-7 text-xs rounded-[3px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Brand chips — shown for All or Index Covers */}
          {showBrandFilter && (
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => setActiveBrand("all")}
                className={`rounded-[3px] text-xs h-7 px-3 ${
                  activeBrand === "all"
                    ? "bg-carolina text-white"
                    : "bg-surface border border-line text-slate-600 hover:bg-surface-2"
                }`}
              >
                All Brands
              </Button>
              {meterBrands.map((brand) => (
                <Button
                  key={brand}
                  size="sm"
                  onClick={() => setActiveBrand(brand)}
                  className={`rounded-[3px] text-xs h-7 px-3 ${
                    activeBrand === brand
                      ? "bg-carolina text-white"
                      : "bg-surface border border-line text-slate-600 hover:bg-surface-2"
                  }`}
                >
                  {brand}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-310 mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg font-heading font-bold text-navy mb-2">
              No products found
            </p>
            <p className="text-sm">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={setSelectedProduct} priority={i === 0} />
            ))}
          </div>
        )}
      </div>

      <ProductDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
