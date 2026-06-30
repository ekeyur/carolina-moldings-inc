import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomCTABand() {
  return (
    <section className="bg-navy dot-grid py-16">
      <div className="max-w-310 mx-auto px-6 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <p className="font-mono-brand text-carolina text-xs font-semibold tracking-[0.16em] uppercase mb-3">
            Custom Manufacturing
          </p>
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Don't see your part? We'll build it.
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-xl">
            If we don't already stock what you need, we're happy to design and
            mold a piece to fit. Bring us a sample or a spec — we're prepared
            for the future.
          </p>
        </div>
        <div className="shrink-0">
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="bg-brand-red hover:bg-red-700 text-white font-semibold rounded-[3px] px-8 gap-2"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
