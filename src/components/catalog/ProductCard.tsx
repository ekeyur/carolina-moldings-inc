"use client";

import Image from "next/image";
import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/context/QuoteContext";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  onOpen: (p: Product) => void;
  priority?: boolean;
};

export function ProductCard({ product, onOpen, priority }: Props) {
  const { add, isInQuote } = useQuote();
  const inQuote = isInQuote(product.id);

  return (
    <div className="bg-white rounded-[6px] border border-line hover:shadow-[0_8px_24px_rgba(19,41,75,.09)] transition-shadow flex flex-col">
      {/* Image */}
      <button
        className="relative aspect-4/3 w-full overflow-hidden rounded-t-[6px] bg-surface cursor-pointer"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name}`}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-4 hover:scale-105 transition-transform duration-200"
            priority={priority}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 font-mono-brand text-[10px] tracking-widest">
            {product.ph}
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Part number chip */}
        <div className="inline-flex">
          <span className="bg-navy text-white font-mono-brand text-[10px] font-semibold px-1.5 py-0.5 rounded-[3px]">
            {product.partNo}
          </span>
        </div>

        {/* Brand/category label */}
        <p className="text-slate-500 text-[11px] font-mono-brand tracking-wide uppercase">
          {product.brand || product.cat}
        </p>

        {/* Name */}
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="font-heading font-bold text-navy text-sm text-left hover:text-carolina transition-colors leading-snug"
        >
          {product.name}
        </button>

        {/* Tamper badge */}
        {product.tamperCompatible && (
          <div className="flex items-center gap-1 text-green text-[11px] font-semibold">
            <Shield className="h-3 w-3" />
            Tamper Compatible
          </div>
        )}

        {/* Fits */}
        {product.fits && (
          <p className="text-slate-500 text-[11px] leading-snug line-clamp-2">
            Fits: {product.fits}
          </p>
        )}

        {/* Add to quote */}
        <Button
          size="sm"
          onClick={() =>
            add({
              id: product.id,
              name: product.name,
              partNo: product.partNo,
              supplier: "carolina",
              image: product.images[0],
            })
          }
          className={`w-full rounded-[3px] text-xs font-semibold mt-auto gap-1 ${
            inQuote
              ? "bg-green-bg text-green border border-green hover:bg-green hover:text-white"
              : "bg-brand-red hover:bg-red-700 text-white"
          }`}
        >
          {inQuote ? "✓ In Quote" : <><Plus className="h-3 w-3" /> Add to Quote</>}
        </Button>
      </div>
    </div>
  );
}
