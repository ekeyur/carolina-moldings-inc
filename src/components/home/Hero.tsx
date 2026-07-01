import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const trustItems = [
  { label: "Family Owned", sub: "Since 1975" },
  { label: "Made in the USA", sub: "100% Domestic" },
  { label: "Same/Next Day", sub: "Fast Shipping" },
  { label: "Hand Inspected", sub: "Every Order" },
];

export function Hero() {
  return (
    <section className="bg-navy dot-grid relative overflow-hidden">
      <div className="max-w-310 mx-auto px-6 py-14 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2.5 border border-carolina/40 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.75 h-1.75 rounded-full bg-brand-red shrink-0" />
            <span className="font-mono-brand text-[11.5px] font-semibold tracking-[0.16em] text-[#A9C6E2] uppercase">
              Family&nbsp;Owned&nbsp;·&nbsp;Est.&nbsp;1975
            </span>
          </div>
          <h1 className="font-heading text-white leading-[1.02] tracking-[-0.02em] mb-6 text-[clamp(2.5rem,5vw,3.625rem)] font-extrabold">
            Gas Meter Parts Built to Protect, Perform, and{" "}
            <p className="text-carolina">Same or next day shipping.</p>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            Manufacturer of index covers, Snap Seal™ tamper systems, meter
            screws, paint covers, and gas fittings.
          </p>
          {/* Snap Seal slogan with red accent bar */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-brand-red rounded-full shrink-0" />
            <p className="text-white italic text-lg font-medium">
              "You can't steal from Snap Seal™"
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              render={<Link href="/catalog" />}
              nativeButton={false}
              className="bg-brand-red hover:bg-red-700 text-white font-semibold rounded-[3px] px-6"
            >
              Browse the Catalog
            </Button>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:text-white rounded-[3px] px-6 bg-transparent"
            >
              Request Info
            </Button>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trustItems.map(({ label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-carolina font-heading font-bold text-sm">
                  {label}
                </div>
                <div className="text-white/50 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: meter images */}
        <div className="flex flex-col items-center gap-4">
          {/* Primary meter — 2× the secondary size (320px vs 160px) */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-60 h-60 aspect-square">
              <Image
                src="/meters/american-honeywell.png"
                alt="American / Honeywell gas meter"
                fill
                sizes="240px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <span className="font-mono-brand text-white/50 text-[10px] tracking-widest uppercase">American / Honeywell</span>
          </div>
          {/* Secondary meters — 160px each */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="relative w-40 h-40">
                <Image
                  src="/meters/rockwell-xylem.png"
                  alt="Rockwell / Xylem gas meter"
                  fill
                  sizes="160px"
                  className="object-contain drop-shadow-lg opacity-80"
                />
              </div>
              <span className="font-mono-brand text-white/50 text-[10px] tracking-widest uppercase">Rockwell / Xylem</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="relative w-40 h-40">
                <Image
                  src="/meters/sprague-itron.png"
                  alt="Sprague / Itron gas meter"
                  fill
                  sizes="160px"
                  className="object-contain drop-shadow-lg opacity-80"
                />
              </div>
              <span className="font-mono-brand text-white/50 text-[10px] tracking-widest uppercase">Sprague / Itron</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
