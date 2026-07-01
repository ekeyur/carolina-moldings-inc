"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ListOrdered, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/nuts-and-swivels", label: "Nuts & Swivels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLinks({ onClick, mobile }: { onClick?: () => void; mobile?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={cn(
            mobile
              ? "flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors"
              : "text-ink font-medium text-sm hover:text-brand-red transition-colors relative pb-1",
            mobile && pathname === href
              ? "text-brand-red bg-brand-red/8 font-semibold"
              : mobile
                ? "text-ink hover:text-brand-red hover:bg-muted"
                : pathname === href
                  ? "text-brand-red after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-red"
                  : "",
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg w-8 h-8 text-ink hover:bg-muted transition-colors md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0 w-72">
              <SheetHeader className="px-5 pt-5 pb-4 border-b border-line">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/branding/logo-primary.svg"
                    alt="Carolina Moldings, Inc."
                    width={346}
                    height={299}
                    style={{ height: "2rem", width: "auto" }}
                  />
                  <span className="font-heading font-bold text-navy text-sm leading-tight">
                    Carolina Moldings, Inc.
                  </span>
                </Link>
              </SheetHeader>

              <nav className="flex flex-col px-3 py-3 flex-1">
                <NavLinks mobile onClick={() => setMobileOpen(false)} />
              </nav>

              <SheetFooter className="border-t border-line px-4 py-4">
                <Button
                  render={<Link href="/quote" onClick={() => setMobileOpen(false)} />}
                  nativeButton={false}
                  className="w-full bg-brand-red hover:bg-red-700 text-white text-sm font-semibold rounded-[3px] gap-2 relative justify-center"
                >
                  <ListOrdered className="h-4 w-4" />
                  Quote List
                  {count > 0 && (
                    <Badge className="ml-1 h-5 min-w-5 flex items-center justify-center bg-white text-brand-red text-[10px] font-bold px-1 rounded-full">
                      {count > 99 ? "99+" : count}
                    </Badge>
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
