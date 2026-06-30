import { ProductGrid } from "@/components/catalog/ProductGrid";
import catalogData from "@/data/carolina-products.json";
import type { CatalogData } from "@/types/product";

const data = catalogData as CatalogData;

type SearchParams = { cat?: string; brand?: string };

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return (
    <>
      {/* Page header */}
      <div className="bg-navy py-10">
        <div className="max-w-[1240px] mx-auto px-6">
          <p className="font-mono-brand text-carolina text-xs font-semibold tracking-[0.16em] uppercase mb-2">
            Product Catalog
          </p>
          <h1 className="font-heading font-extrabold text-white text-3xl">
            Carolina Moldings Products
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            {data.products.length} products across {data.categories.length} categories
          </p>
        </div>
      </div>

      <ProductGrid
        products={data.products}
        categories={data.categories}
        meterBrands={data.meterBrands}
        initialCat={params.cat}
        initialBrand={params.brand}
      />
    </>
  );
}
