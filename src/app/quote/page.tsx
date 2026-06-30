"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuote } from "@/context/QuoteContext";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function QuotePage() {
  const { items, setQty, remove, clear } = useQuote();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const carolinaItems = items.filter((i) => i.supplier === "carolina");
  const nutsAndSwivelsItems = items.filter((i) => i.supplier === "nuts-and-swivels");

  const onSubmit = async (data: FormData) => {
    await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, items }),
    });
    setSubmitted(true);
    clear();
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-heading font-extrabold text-navy text-3xl mb-3">
            Quote Request Sent!
          </h1>
          <p className="text-slate-600 mb-6">
            We've received your request and will get back to you with pricing
            shortly.
          </p>
          <Button
            render={<Link href="/catalog" />}
            nativeButton={false}
            className="bg-brand-red hover:bg-red-700 text-white rounded-[3px]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <div className="bg-navy py-10">
          <div className="max-w-310 mx-auto px-6">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">
              Request a Quote
            </p>
            <h1 className="font-heading font-extrabold text-white text-3xl">
              Your quote list
            </h1>
          </div>
        </div>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-navy text-2xl mb-2">
              Your quote is empty
            </h2>
            <p className="text-slate-600 mb-6">
              Browse our catalog to add products to your quote list.
            </p>
            <Button
              render={<Link href="/catalog" />}
              nativeButton={false}
              className="bg-brand-red hover:bg-red-700 text-white rounded-[3px]"
            >
              Browse the Catalog
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-navy py-10">
        <div className="max-w-310 mx-auto px-6">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">
            Request a Quote
          </p>
          <h1 className="font-heading font-extrabold text-white text-3xl">
            Your quote list
          </h1>
        </div>
      </div>

      <div className="max-w-310 mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Left: items card */}
        <div className="bg-white border border-line rounded-[6px] overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <span className="text-sm font-medium text-slate-700">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={clear}
              className="text-sm text-brand-red hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Carolina Moldings group */}
          {carolinaItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-5 py-2 bg-surface border-b border-line">
                <Image
                  src="/branding/logo-primary.svg"
                  alt="CMI"
                  width={346}
                  height={299}
                  className="h-5 w-auto"
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Carolina Moldings
                </span>
              </div>
              <div className="divide-y divide-line">
                {carolinaItems.map((item) => (
                  <QuoteRow
                    key={item.id}
                    item={item}
                    setQty={setQty}
                    remove={remove}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Nuts & Swivels group */}
          {nutsAndSwivelsItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-5 py-2 bg-surface border-b border-line">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Nuts &amp; Swivels
                </span>
              </div>
              <div className="divide-y divide-line">
                {nutsAndSwivelsItems.map((item) => (
                  <QuoteRow
                    key={item.id}
                    item={item}
                    setQty={setQty}
                    remove={remove}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pricing note */}
          <div className="px-5 py-4 border-t border-line">
            <p className="text-slate-500 text-xs leading-relaxed">
              Pricing is provided by quote. Submit your list and we'll respond
              with current pricing, quantity breaks, and lead times.
            </p>
          </div>
        </div>

        {/* Right: request pricing form */}
        <div className="bg-white rounded-[6px] border border-line p-6">
          <h2 className="font-heading font-bold text-navy text-xl mb-5">
            Request pricing
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                Full name
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="rounded-[3px]"
              />
              {errors.name && (
                <p className="text-brand-red text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                Company
              </Label>
              <Input
                id="company"
                {...register("company")}
                className="rounded-[3px]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="rounded-[3px]"
              />
              {errors.email && (
                <p className="text-brand-red text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="rounded-[3px]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                Message{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Textarea
                id="message"
                rows={3}
                {...register("message")}
                placeholder=""
                className="rounded-[3px] resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] font-semibold"
            >
              {isSubmitting ? "Sending…" : "Submit quote request"}
            </Button>
            <p className="text-center text-slate-400 text-xs">
              No prices shown online — we'll send a personalized quote.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

type QuoteRowProps = {
  item: ReturnType<typeof useQuote>["items"][number];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

function QuoteRow({ item, setQty, remove }: QuoteRowProps) {
  const [displayQty, setDisplayQty] = useState(
    item.quantity.toLocaleString("en-US"),
  );

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setDisplayQty(raw ? parseInt(raw, 10).toLocaleString("en-US") : "");
    const num = parseInt(raw, 10);
    if (!isNaN(num)) setQty(item.id, num);
  };

  return (
    <div className="flex items-center gap-3 px-5 py-4 bg-white">
      {/* Thumbnail */}
      <div className="relative w-14 h-14 shrink-0 rounded border border-line bg-surface overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="56px"
            className="object-contain p-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-[8px] font-mono-brand">
            IMG
          </div>
        )}
      </div>

      {/* Name + part number */}
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-navy text-sm leading-tight">
          {item.name}
        </p>
        <p className="text-slate-500 text-xs uppercase tracking-wide mt-0.5">
          Part # {item.partNo}
        </p>
        {item.specLine && (
          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">
            {item.specLine}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Quantity
        </span>
        <Input
          value={displayQty}
          onChange={handleQtyChange}
          className="w-28 text-right rounded-[3px] text-sm h-8 font-mono-brand"
          aria-label="Quantity"
        />
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => remove(item.id)}
        className="shrink-0 text-slate-400 hover:text-brand-red transition-colors ml-1"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
