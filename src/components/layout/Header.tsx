"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ListOrdered, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/nuts-and-swivels", label: "Nuts & Swivels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={cn(
            "text-ink font-medium text-sm hover:text-brand-red transition-colors relative pb-1",
            pathname === href &&
              "text-brand-red after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-red",
          )}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

export function Header() {
  const { count } = useQuote();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line shadow-sm">
      <div className="max-w-310 mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/branding/logo-primary.svg"
            alt="Carolina Moldings, Inc."
            width={346}
            height={299}
            className="h-10 w-auto"
            style={{ width: "auto" }}
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-heading font-bold text-navy text-base leading-none">
              Carolina Moldings, Inc.
            </div>
            <div className="text-slate-500 text-[11px] tracking-wide font-body">
              Protecting every connection
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        {/* Quote button + mobile menu */}
        <div className="flex items-center gap-3">
          <Button
            render={<Link href="/quote" />}
            nativeButton={false}
            className="bg-brand-red hover:bg-red-700 text-white text-sm font-semibold rounded-[3px] gap-2 relative"
          >
            <ListOrdered className="h-4 w-4" />
            <span className="hidden sm:inline">Quote List</span>
            {count > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center bg-carolina text-white text-[10px] font-bold px-1 rounded-full border-2 border-white">
                {count > 99 ? "99+" : count}
              </Badge>
            )}
          </Button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg w-8 h-8 text-ink hover:bg-muted transition-colors md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/branding/logo-primary.svg"
                    alt="CMI"
                    width={346}
                    height={299}
                    className="h-8 w-auto"
                    style={{ width: "auto" }}
                  />
                  <span className="font-heading font-bold text-navy text-sm">
                    Carolina Moldings
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <NavLinks />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
