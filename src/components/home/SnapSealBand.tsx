import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SnapSealBand() {
  return (
    <section className="bg-surface-2 border-y border-line py-20">
      <div className="max-w-310 mx-auto px-6 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
        {/* Left — CMI badge */}
        <div className="flex items-center justify-center">
          <Image
            src="/branding/logo-primary.svg"
            alt="Carolina Moldings"
            width={346}
            height={299}
            className="w-36 md:w-56 h-auto"
            style={{ filter: "drop-shadow(0 12px 30px rgba(19,41,75,.16))" }}
          />
        </div>

        {/* Right — copy */}
        <div>
          <p className="font-mono-brand text-brand-red text-xs font-semibold tracking-[0.16em] uppercase mb-4">
            The Tamper System
          </p>
          <h2 className="font-heading font-extrabold text-navy text-4xl md:text-[2.5rem] leading-[1.04] tracking-[-0.02em] mb-5">
            You can't steal
            <br />
            from Snap Seal™
          </h2>
          <p className="text-slate-700 text-[17px] leading-[1.65] max-w-130 mb-7">
            Our signature snap-on seal locks over the meter connection and can't
            come off without visibly breaking. Theft becomes obvious, and your
            field crews get a fast, tool-free install. Color-coded and
            sequentially numbered for inventory control.
          </p>
          <Button
            render={<Link href="/catalog?cat=tamper" />}
            nativeButton={false}
            className="bg-navy hover:bg-navy/90 text-white font-bold rounded-[3px] px-7 gap-2"
          >
            Explore the Tamper System <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
