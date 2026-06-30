# Build Guide — Carolina Moldings

Current state of the Next.js application. Reference this when continuing development.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.9, App Router, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first — no `tailwind.config.ts`) |
| UI components | shadcn/ui backed by **`@base-ui/react`** (not Radix) |
| Forms | React Hook Form + Zod |
| Quote state | React Context + `localStorage` (`src/context/QuoteContext.tsx`) |
| Fonts | `next/font/google` — Archivo, IBM Plex Sans, IBM Plex Mono |
| Images | `next/image`, served from `public/` |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          Root layout (fonts, QuoteProvider, UtilityBar, Header, Footer)
│   ├── globals.css         Tailwind v4 @theme block + brand tokens + dot-grid utility
│   ├── page.tsx            / Home
│   ├── catalog/page.tsx    /catalog
│   ├── richards/page.tsx   /richards
│   ├── about/page.tsx      /about
│   ├── contact/page.tsx    /contact
│   ├── quote/page.tsx      /quote
│   └── api/
│       ├── quote/route.ts   POST stub (TODO: wire Resend)
│       └── contact/route.ts POST stub (TODO: wire Resend)
├── components/
│   ├── layout/             UtilityBar, Header, Footer
│   ├── home/               Hero, MeterBrandCards, SnapSealBand, WhyCarolina, CustomCTABand
│   ├── catalog/            ProductGrid, ProductCard, ProductDialog
│   └── richards/           RichardsGrid, ConfiguratorDialog, SpecFormDialog
├── context/
│   └── QuoteContext.tsx    add / setQty / remove / clear / isInQuote / count
├── data/
│   ├── carolina-products.json   67 products, 5 categories, 3 meter brands
│   ├── richards-catalog.json    Richards families, finishes, meterBarConfig
│   └── ordering-forms.ts        Ported from design-reference/richards-data.js
├── lib/
│   ├── utils.ts            cn(), formatThousands(), parseThousands()
│   └── richards-helpers.ts buildSwivelPart, buildAccessoryPart, buildMeterBarPart
├── types/
│   ├── product.ts          Product, Category, CatalogData
│   └── richards.ts         RichardsFamily, Variant, Finish, MeterBarConfig, OrderingForm
public/
├── branding/               logo-primary.svg, logo-ondark.svg, logo-mono-navy.svg, logo-mono-white.svg
├── products/               38 product PNGs (transparent)
└── richards/               16 Richards family images
```

---

## Design tokens

Defined in `src/app/globals.css` under `@theme inline`:

| Token | Hex |
|---|---|
| `navy` | `#13294B` |
| `carolina` | `#4B9CD3` |
| `brand-red` | `#C8102E` |
| `ink` | `#16202E` |
| `slate-700/600/500/400` | `#46586E / #5B6B7F / #7E8DA0 / #94A3B5` |
| `line` | `#E3E8EF` |
| `surface` / `surface-2` | `#F8FAFC / #F4F7FA` |
| `green-bg` / `green` | `#EAF7F0 / #1F8A5B` |

Font variables: `--font-archivo`, `--font-ibm-plex-sans`, `--font-ibm-plex-mono`  
Utility classes: `.font-heading`, `.font-body`, `.font-mono-brand`, `.dot-grid`

---

## @base-ui/react gotchas

This version of shadcn uses `@base-ui/react` instead of Radix. Two things differ from standard shadcn docs:

**Button — use `render` prop, not `asChild`:**
```tsx
// correct
<Button render={<Link href="/catalog" />}>Browse</Button>

// wrong — asChild does not exist
<Button asChild><Link href="/catalog">Browse</Link></Button>
```

**Select — `onValueChange` fires `string | null`:**
```tsx
// correct — wrap setter to guard against null
<Select onValueChange={(v) => v !== null && setVal(v)}>

// wrong — type error
<Select onValueChange={setVal}>
```

---

## Routes

| Route | Page file | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Server component, imports 5 home sections |
| `/catalog` | `app/catalog/page.tsx` | Server component; passes data to client `ProductGrid` |
| `/richards` | `app/richards/page.tsx` | Server component; passes families to client `RichardsGrid` |
| `/about` | `app/about/page.tsx` | Server component |
| `/contact` | `app/contact/page.tsx` | `"use client"` — RHF form with success state |
| `/quote` | `app/quote/page.tsx` | `"use client"` — reads QuoteContext, RHF pricing form |
| `POST /api/quote` | `app/api/quote/route.ts` | Stub — logs payload, returns `{ok:true}` |
| `POST /api/contact` | `app/api/contact/route.ts` | Stub — logs payload, returns `{ok:true}` |

---

## Key behaviors

**Catalog filtering** (`ProductGrid.tsx`): category chips + meter-brand chips (shown for All / Index Covers) + text search (name, partNo, brand, fits). All client-side, no server round-trip.

**Product dialog**: image gallery with thumbnail strip (driven by `product.images[]`), tamper badge, bullet list, FITS / MATERIAL / PACKAGED specs, Add to Quote button.

**Richards configurator** (`ConfiguratorDialog.tsx`): three sub-configurators selected by family type:
- Swivels → `buildSwivelPart(base, finishId, insulated)`
- Accessories → `buildAccessoryPart(base, finishId)`
- Meter bar → `buildMeterBarPart(sel)` with full dropdown set

Live part number displayed in a navy chip that updates on every dropdown change.

**Spec-form dialog** (`SpecFormDialog.tsx`): renders dynamic radio/number/text fields from `ordering-forms.ts`; on submit adds a "Custom — quote" line to the quote.

**Quote list** (`/quote`): items grouped into Carolina Moldings and Richards Manufacturing sections. Quantity inputs use thousands formatting (`formatThousands` / `parseThousands`). Persists to `localStorage` via mounted-flag pattern to avoid SSR hydration mismatch.

---

## TODO — before launch

- [ ] Wire email in `src/app/api/quote/route.ts` (suggested: [Resend](https://resend.com))
- [ ] Wire email in `src/app/api/contact/route.ts`
- [ ] Add real product images for multi-image gallery (currently seeded with one image per product)
- [ ] Set up `git init` and push to GitHub
- [ ] Deploy to Vercel (auto-detects Next.js; every push redeploys)
