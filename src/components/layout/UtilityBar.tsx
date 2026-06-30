export function UtilityBar() {
  return (
    <div className="bg-navy text-white text-xs py-2">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="font-mono-brand tracking-wide">
            <a href="tel:18005237475" className="hover:text-carolina transition-colors">
              1-800-523-7475
            </a>
          </span>
          <span className="text-white/50">|</span>
          <span className="text-white/70">Mon–Fri · 9am–3pm EST</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <span>🇺🇸 Made in the USA</span>
          <span className="text-white/50">|</span>
          <span>Est. 1975</span>
        </div>
      </div>
    </div>
  );
}
