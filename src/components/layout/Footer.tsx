import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-310 mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/branding/logo-ondark.svg"
                alt="Carolina Moldings, Inc."
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="leading-tight">
                <div className="font-heading font-bold text-white text-base leading-none">
                  Carolina Moldings, Inc.
                </div>
                <div className="text-white/50 text-[11px] tracking-wide font-body">
                  Protecting every connection
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              One of the leading providers and creators of gas industry
              materials — family owned and operated since 1975.
            </p>
            <p className="font-mono-brand text-carolina text-[10px] font-semibold tracking-[0.16em] uppercase">
              You can't steal from Snap Seal™
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">
              Products
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { href: "/catalog?cat=tamper", label: "Tamper System" },
                { href: "/catalog?cat=index", label: "Index Covers" },
                { href: "/catalog?cat=screws", label: "Meter Screws" },
                { href: "/nuts-and-swivels", label: "Nuts & Swivels" },
                { href: "/catalog", label: "Full Catalog" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-carolina transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/quote", label: "Request a Quote" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-carolina transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="leading-snug">
                3600 Woodpark Blvd, Suite A<br />
                Charlotte, NC 28206
              </li>
              <li>
                <a
                  href="tel:18005237475"
                  className="text-white font-bold hover:text-carolina transition-colors"
                >
                  1-800-523-7475
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@carolinamoldings.com"
                  className="text-carolina hover:text-carolina/80 transition-colors"
                >
                  contact@carolinamoldings.com
                </a>
              </li>
              <li>Mon–Fri · 9am–3pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} Carolina Moldings, Inc. All rights
            reserved.
          </span>
          <span className="tracking-wide uppercase text-[10px]">
            Charlotte · North Carolina · USA
          </span>
        </div>
      </div>
    </footer>
  );
}
