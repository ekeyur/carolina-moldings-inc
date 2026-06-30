"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings2, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfiguratorDialog } from "./ConfiguratorDialog";
import { SpecFormDialog } from "./SpecFormDialog";
import { useQuote } from "@/context/QuoteContext";
import type { NutsAndSwivelsFamily } from "@/types/nuts-and-swivels";
import catalog from "@/data/nuts-and-swivels-catalog.json";

const categories = catalog.nutsAndSwivelsCategories as {
  id: string;
  name: string;
  blurb: string;
}[];

type Props = {
  families: NutsAndSwivelsFamily[];
};

export function NutsAndSwivelsGrid({ families }: Props) {
  const [activecat, setActivecat] = useState("all");
  const [configuratorFamily, setConfiguratorFamily] =
    useState<NutsAndSwivelsFamily | null>(null);
  const [specFamily, setSpecFamily] = useState<NutsAndSwivelsFamily | null>(null);
  const { add } = useQuote();

  const filtered =
    activecat === "all"
      ? families
      : families.filter((f) => f.cat === activecat);

  const handleQuoteOnly = (family: NutsAndSwivelsFamily) => {
    add({
      id: `${family.id}-custom-${Date.now()}`,
      name: family.name,
      partNo: "Custom — quote",
      supplier: "nuts-and-swivels",
      image: `/nuts-and-swivels/${family.id}.png`,
      specLine: "Contact us for specifications and pricing",
    });
  };

  return (
    <>
      {/* Category filter chips */}
      <div className="sticky top-16 z-30 bg-white border-b border-line shadow-sm">
        <div className="max-w-310 mx-auto px-6 py-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => setActivecat("all")}
            className={`rounded-[3px] text-xs font-semibold h-8 px-3.5 ${
              activecat === "all"
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
              onClick={() => setActivecat(cat.id)}
              className={`rounded-[3px] text-xs font-semibold h-8 px-3.5 ${
                activecat === cat.id
                  ? "bg-navy text-white"
                  : "bg-surface border border-line text-ink hover:bg-surface-2"
              }`}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Family cards grid */}
      <div className="max-w-310 mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((family) => {
            const catName =
              categories.find((c) => c.id === family.cat)?.name || family.cat;
            const hasConfig = !!family.configurator;
            const hasForm = !!family.formId;
            const isQuoteOnly =
              family.quoteOnly || (!hasConfig && !hasForm && !family.variants);

            const imgSrc = `/nuts-and-swivels/${family.id}.png`;

            return (
              <div
                key={family.id}
                className="bg-white rounded-[6px] border border-line hover:shadow-[0_8px_24px_rgba(19,41,75,.09)] transition-shadow flex flex-col"
              >
                {/* Family image */}
                <div className="relative h-40 w-full bg-surface rounded-t-[6px] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={family.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4"
                    onError={() => {}}
                  />
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Category tag */}
                  <span className="font-mono-brand text-carolina text-[10px] font-semibold tracking-[0.16em] uppercase">
                    {catName}
                  </span>

                  {/* Name */}
                  <h3 className="font-heading font-bold text-navy text-lg leading-tight">
                    {family.name}
                  </h3>

                  {/* Blurb */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {family.blurb}
                  </p>

                  {/* Meta line */}
                  <p className="text-slate-400 text-xs font-mono-brand">
                    {hasConfig && family.configurator === "meterbar"
                      ? "Build to spec · live part number"
                      : hasForm
                        ? "Custom · spec form"
                        : isQuoteOnly
                          ? "Custom · quote only"
                          : family.variants
                            ? `${family.variants.length} variants${family.hasFinish ? " · 3 finishes" : ""}${family.hasInsulated ? " · insulated option" : ""}`
                            : ""}
                  </p>

                  {/* Action button */}
                  <div className="mt-auto">
                    {hasConfig || (family.variants && !hasForm) ? (
                      <Button
                        onClick={() => setConfiguratorFamily(family)}
                        className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] text-sm font-semibold gap-2"
                      >
                        <Settings2 className="h-4 w-4" />
                        Configure & Add to Quote
                      </Button>
                    ) : hasForm ? (
                      <Button
                        onClick={() => setSpecFamily(family)}
                        className="w-full bg-navy hover:bg-navy/90 text-white rounded-[3px] text-sm font-semibold gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Order by Spec Form
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleQuoteOnly(family)}
                        variant="outline"
                        className="w-full border-navy text-navy hover:bg-navy hover:text-white rounded-[3px] text-sm font-semibold gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Request Quote
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfiguratorDialog
        family={configuratorFamily}
        open={!!configuratorFamily}
        onClose={() => setConfiguratorFamily(null)}
      />
      <SpecFormDialog
        family={specFamily}
        open={!!specFamily}
        onClose={() => setSpecFamily(null)}
      />
    </>
  );
}
