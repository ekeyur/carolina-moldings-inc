"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuote } from "@/context/QuoteContext";
import type { NutsAndSwivelsFamily } from "@/types/nuts-and-swivels";
import { orderingForms } from "@/data/ordering-forms";

type Props = {
  family: NutsAndSwivelsFamily | null;
  open: boolean;
  onClose: () => void;
};

function ToggleBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm font-medium rounded-[3px] border transition-colors whitespace-nowrap ${
        selected
          ? "bg-navy text-white border-navy"
          : "bg-white text-ink border-line hover:border-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

export function SpecFormDialog({ family, open, onClose }: Props) {
  const { add, setQty: setQuoteQty } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [qty, setQty] = useState(1);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Record<string, string>>();
  const fieldValues = watch();

  if (!family || !family.formId) return null;

  const form = orderingForms[family.formId];
  if (!form) return null;

  const imgSrc = `/nuts-and-swivels/${family.id}.png`;

  const onSubmit = (data: Record<string, string>) => {
    const specLine = Object.entries(data)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ");
    const itemId = `${family.id}-spec-${Date.now()}`;
    add({
      id: itemId,
      name: family.name,
      partNo: "Custom — quote",
      supplier: "nuts-and-swivels",
      image: imgSrc,
      specLine,
    });
    if (qty > 1) setQuoteQty(itemId, qty);
    setSubmitted(true);
    reset();
  };

  const handleClose = () => {
    setSubmitted(false);
    setQty(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-lg p-0 rounded-[8px] shadow-[0_40px_80px_rgba(0,0,0,.3)] overflow-hidden gap-0">
        {/* Header: thumbnail + title */}
        <div className="flex items-start gap-4 p-5 border-b border-line bg-surface">
          <div className="relative w-14 h-14 shrink-0 bg-white rounded-[6px] border border-line overflow-hidden">
            <Image
              src={imgSrc}
              alt={family.name}
              fill
              sizes="56px"
              className="object-contain p-1.5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono-brand text-carolina text-[10px] font-semibold tracking-[0.16em] uppercase mb-0.5">
              Nuts &amp; Swivels · Custom
            </p>
            <h2 className="font-heading font-bold text-navy text-lg leading-tight">
              {form.title}
            </h2>
            <p className="text-slate-500 text-sm leading-snug mt-0.5">{form.intro}</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center p-8">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-heading font-bold text-navy text-lg mb-2">Added to Quote List</h3>
            <p className="text-slate-600 text-sm mb-5">
              Your spec has been added. We'll quote this to your requirements.
            </p>
            <Button
              onClick={handleClose}
              className="bg-navy hover:bg-navy/90 text-white rounded-[3px]"
            >
              Done
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto max-h-[70vh]"
          >
            <div className="p-5 space-y-4">
              {form.fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
                    {field.label}
                    {field.unit && (
                      <span className="ml-1 normal-case text-slate-400">({field.unit})</span>
                    )}
                  </Label>

                  {field.type === "radio" && field.options ? (
                    <div className="flex flex-wrap gap-2">
                      {field.options.map((opt) => (
                        <ToggleBtn
                          key={opt}
                          label={opt}
                          selected={fieldValues[field.key] === opt}
                          onClick={() => setValue(field.key, opt)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <Input
                        type={field.type === "number" ? "number" : "text"}
                        step={field.type === "number" ? "any" : undefined}
                        {...register(field.key)}
                        placeholder={
                          field.type === "number" ? "0" : field.key === "paintColor" ? "Optional" : undefined
                        }
                        className={`rounded-[3px] ${field.unit ? "pr-10" : ""}`}
                      />
                      {field.unit && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                          {field.unit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
                  Quantity
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="rounded-[3px] w-full"
                />
              </div>
            </div>

            {/* Sticky footer */}
            <div className="px-5 pb-5 space-y-2">
              <Button
                type="submit"
                className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] font-semibold"
              >
                Add specification to Quote List
              </Button>
              <p className="text-center text-xs text-slate-400">
                Fill in everything that applies — our team will confirm details and send a personalized quote.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
