"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/context/QuoteContext";
import type { Product } from "@/types/product";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export function ProductDialog({ product, open, onClose }: Props) {
  const { add, isInQuote } = useQuote();
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const inQuote = isInQuote(product.id);

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      partNo: product.partNo,
      supplier: "carolina",
      image: product.images[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 rounded-[8px] shadow-[0_40px_80px_rgba(0,0,0,.3)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
          {/* Image panel */}
          <div className="bg-white p-5 flex flex-col gap-3 md:border-r border-b md:border-b-0 border-line">
            <div className="relative aspect-square w-full rounded-[6px] overflow-hidden bg-surface">
              {product.images[activeImg] ? (
                <Image
                  src={product.images[activeImg]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-contain p-3"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 font-mono-brand text-[10px] tracking-widest">
                  {product.ph}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    title={`View product image ${i + 1}`}
                    className={`relative w-12 h-12 rounded border-2 overflow-hidden transition-colors ${
                      i === activeImg
                        ? "border-carolina"
                        : "border-line hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
            <DialogHeader className="gap-2">
              <p className="font-mono-brand text-carolina text-xs font-semibold tracking-widest uppercase">
                {product.brand || product.cat}
              </p>
              <DialogTitle className="font-heading font-bold text-navy text-2xl leading-tight">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Part number chip */}
            <div className="inline-flex">
              <span className="bg-navy text-white font-mono-brand text-xs font-semibold px-3 py-1.5 rounded-[3px] tracking-wider">
                {product.partNo}
              </span>
            </div>

            {/* Description */}
            {product.desc && (
              <p className="text-slate-600 text-sm leading-relaxed">
                {product.desc}
              </p>
            )}

            {/* Bullets */}
            {product.bullets && product.bullets.length > 0 && (
              <ul className="space-y-2">
                {product.bullets.map((b) => {
                  const isNegative = /incompatible|not compatible|cannot/i.test(
                    b,
                  );
                  return (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-ink"
                    >
                      {isNegative ? (
                        <XCircle className="h-4 w-4 text-carolina shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-carolina shrink-0 mt-0.5" />
                      )}
                      {b}
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Specs */}
            {(product.fits || product.material || product.pack) && (
              <div className="border-t border-line pt-5 space-y-3">
                {product.fits && (
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="font-mono-brand text-slate-400 text-[11px] tracking-widest uppercase font-medium pt-0.5">
                      Fits
                    </span>
                    <span className="text-ink">{product.fits}</span>
                  </div>
                )}
                {product.material && (
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="font-mono-brand text-slate-400 text-[11px] tracking-widest uppercase font-medium pt-0.5">
                      Material
                    </span>
                    <span className="text-ink">{product.material}</span>
                  </div>
                )}
                {product.pack && (
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="font-mono-brand text-slate-400 text-[11px] tracking-widest uppercase font-medium pt-0.5">
                      Packaged
                    </span>
                    <span className="text-ink">{product.pack}</span>
                  </div>
                )}
              </div>
            )}

            {/* Add to quote */}
            <Button
              onClick={handleAdd}
              className={`w-full rounded-[3px] font-semibold mt-auto ${
                inQuote
                  ? "bg-green text-white hover:bg-green-700"
                  : "bg-brand-red hover:bg-red-700 text-white"
              }`}
            >
              {inQuote ? "✓ In Quote List" : "Add to Quote"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
