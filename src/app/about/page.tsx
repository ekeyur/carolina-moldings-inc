import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50", label: "Years in Business" },
  { value: "3", label: "Generations" },
  { value: "100%", label: "USA Made" },
  { value: "24hr", label: "Typical Ship Time" },
];

const principles = [
  {
    num: "01",
    title: "Quality is non-negotiable",
    desc: "If our products fail, we fail. Every part is QC'd by hand before shipment — no exceptions.",
  },
  {
    num: "02",
    title: "Time is money",
    desc: "A day without materials is a day without production. We ship most orders the same or next business day.",
  },
  {
    num: "03",
    title: "Every customer matters",
    desc: "Same service whether you order a box or a pallet. You'll always reach a real person who knows the parts.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — two-column, navy dot-grid */}
      <section className="bg-navy dot-grid py-12 md:py-24">
        <div className="max-w-310 mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] gap-8 md:gap-12 items-center">
          <div>
            <p className="font-mono-brand text-carolina text-xs font-semibold tracking-[0.16em] uppercase mb-4">
              About Carolina Moldings
            </p>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-[2.875rem] leading-[1.05] tracking-[-0.02em] mb-5">
              Three generations.
              <br />
              One standard of quality.
            </h1>
            <p className="text-[#B9CCE2] text-lg leading-relaxed max-w-140">
              Since 1975, Carolina Moldings has been one of the leading creators
              of gas industry materials in the United States — molding tamper
              seals, index covers, and meter parts that utilities and OEMs trust
              in the field every day.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/branding/logo-ondark.svg"
              alt="Carolina Moldings"
              width={200}
              height={200}
              style={{
                width: "200px",
                height: "auto",
                filter: "drop-shadow(0 16px 40px rgba(0,0,0,.35))",
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats strip — white with column dividers */}
      <section className="bg-white border-b border-line">
        <div className="max-w-310 mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-10 px-5 text-center ${i < stats.length - 1 ? "border-r border-line" : ""}`}
            >
              <div className="font-heading font-extrabold text-navy text-[2.625rem] leading-none">
                {value}
              </div>
              <div className="font-mono-brand text-slate-500 text-[11px] tracking-widest uppercase mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story — two-column with image slot */}
      <section className="bg-white py-20">
        <div className="max-w-310 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="font-mono-brand text-brand-red text-xs font-semibold tracking-[0.16em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-heading font-extrabold text-navy text-[2.125rem] leading-[1.1] tracking-[-0.015em] mb-6">
              Built in Charlotte, trusted nationwide.
            </h2>
            <div className="space-y-5 text-slate-700 text-base leading-[1.7]">
              <p>
                We started in 1975 with a simple idea: gas utilities needed
                better-made, faster-shipping meter parts from people who
                actually pick up the phone. Five decades later, that's still
                exactly what we do.
              </p>
              <p>
                Our Snap Seal™ tamper system became the standard for
                theft-evident metering — "you can't steal from Snap Seal." Today
                we mold a full line of index covers for every major meter, plus
                screws, gaskets, and the small parts that keep a meter shop
                running.
              </p>
              <p>
                We're still family owned and operated, still inspecting every
                part by hand, and still happy to design something custom when
                the catalog doesn't have it.
              </p>
            </div>
          </div>

          {/* Logo panel */}
          <div className="hidden md:flex w-full aspect-4/5 rounded-[6px] bg-navy items-center justify-center">
            <img
              src="/branding/logo-ondark.svg"
              alt="Carolina Moldings, Inc."
              className="w-2/3 max-w-65"
            />
          </div>
        </div>
      </section>

      {/* Values — light gray bg, white cards, centered heading */}
      <section className="bg-surface-2 border-t border-line py-20">
        <div className="max-w-310 mx-auto px-6">
          <h2 className="font-heading font-extrabold text-navy text-[2rem] leading-[1.1] tracking-[-0.015em] mb-10 text-center">
            What hasn't changed since 1975
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5.5">
            {principles.map(({ num, title, desc }) => (
              <div
                key={num}
                className="bg-white border border-line rounded-[6px] p-7.5"
              >
                <div className="font-mono-brand font-bold text-brand-red text-[13px] tracking-[0.06em] mb-4">
                  {num}
                </div>
                <h3 className="font-heading font-bold text-navy text-[19px] mb-2.5">
                  {title}
                </h3>
                <p className="text-slate-600 text-[14.5px] leading-[1.6]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — white bg, navy primary button */}
      <section className="bg-white py-17.5">
        <div className="max-w-310 mx-auto px-6 text-center">
          <h2 className="font-heading font-extrabold text-navy text-[1.875rem] mb-3">
            Let's get you the right parts.
          </h2>
          <p className="text-slate-600 text-base mb-7">
            Browse the catalog or reach out — we're glad to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Button
              render={<Link href="/catalog" />}
              nativeButton={false}
              className="bg-navy hover:bg-navy/90 text-white rounded-[3px] px-7 font-bold gap-2"
            >
              Browse Catalog <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              variant="outline"
              className="border-[#D5DCE6] text-navy hover:bg-surface rounded-[3px] px-7 font-bold bg-white"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
