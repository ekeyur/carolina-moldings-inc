const features = [
  {
    icon: "🏠",
    title: "Family Owned",
    desc: "Three generations of family ownership means consistent quality and personal accountability.",
  },
  {
    icon: "✅",
    title: "Quality is Key",
    desc: "Every product is engineered to tight tolerances and inspected before it leaves our facility.",
  },
  {
    icon: "🤝",
    title: "Trust is Our Priority",
    desc: "Utilities rely on us for products that perform every time — no surprises, no substitutions.",
  },
  {
    icon: "🚚",
    title: "Speedy Delivery",
    desc: "Same-day and next-day shipping on most stocked items so your crews are never waiting.",
  },
  {
    icon: "🇺🇸",
    title: "Made in the USA",
    desc: "Every Carolina Moldings product is manufactured domestically — supporting American workers.",
  },
  {
    icon: "🔍",
    title: "Hand-Inspected Quality",
    desc: "Human eyes on every order before it ships — because automated inspection misses what matters.",
  },
];

export function WhyCarolina() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-310 mx-auto px-6">
        <p className="font-mono-brand text-brand-red text-xs font-semibold tracking-[0.16em] uppercase mb-3">
          Why Carolina Moldings
        </p>
        <h2 className="font-heading font-extrabold text-navy text-[2rem] mb-10">
          The standard every utility deserves
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface rounded-[6px] border border-line p-6 hover:shadow-[0_8px_24px_rgba(19,41,75,.09)] transition-shadow"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-heading font-bold text-navy text-lg mb-2">
                {title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
