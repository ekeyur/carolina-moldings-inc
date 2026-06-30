# Carolina Moldings — Website Rebuild Handoff

This package contains everything needed to rebuild the Carolina Moldings website as a
production **Next.js** application. It was generated from an approved HTML design prototype.

> **Read this first.** The files in `design-reference/` are a **design reference** — an
> interactive prototype built in HTML that shows the intended look, layout, copy, and
> behavior. They are **not** the code you ship. The job is to **recreate this design** in a
> fresh Next.js codebase using the stack below. All the data and images you need are already
> extracted for you in `data/` and `seed-images/`.

---

## Your target stack

| Concern | Choice |
|---|---|
| Framework | **Next.js (latest), App Router** |
| Styling | **Tailwind CSS** |
| UI components | **shadcn/ui** (Radix under the hood) |
| Forms | **React Hook Form** + **zod** for validation |
| Quote state | React Context + `localStorage` (or Zustand) |
| Images | `next/image`, multiple images per product (see BUILD_GUIDE) |
| Hosting | Vercel (recommended) |

---

## What's in this package

```
design_handoff_carolina_moldings/
├── README.md                 ← you are here: setup + GitHub steps
├── BUILD_GUIDE.md            ← full spec: tokens, screens, components, data model, images
├── CLAUDE_CODE_PROMPT.md     ← paste this into Claude Code to scaffold the app
├── data/
│   ├── carolina-products.json   ← 67 Carolina Moldings products (your seed catalog)
│   └── richards-catalog.json    ← Richards distributor families + meter-bar configurator rules
├── seed-images/
│   ├── products/   ← 38 real Carolina product photos (PNG, transparent)
│   ├── richards/   ← 16 Richards family images
│   └── branding/   ← 4 logo variants (SVG): primary, on-dark, mono-navy, mono-white
└── design-reference/
    └── Carolina Moldings.dc.html  ← open in a browser to see the live prototype
        (+ its runtime files and assets)
```

---

## How to view the design reference

Open `design-reference/Carolina Moldings.dc.html` in any modern browser (double-click it).
Use it as the visual source of truth — click through Home, Catalog, Richards, the product
modals, the Richards configurator, and the Quote List. Exact colors, spacing, and copy all
live here. `BUILD_GUIDE.md` documents the measurable details.

---

## Step-by-step: from this zip to a GitHub repo

You do **not** need to know how to code to follow this — Claude Code does the building.

### 1. Install the tools (one time)
- **Node.js** (LTS): https://nodejs.org → download, install.
- **VSCode**: https://code.visualstudio.com → download, install.
- **Git**: https://git-scm.com → download, install.
- **Claude Code**: https://docs.anthropic.com/claude-code → follow the install guide
  (`npm install -g @anthropic-ai/claude-code`), then run `claude` once to sign in.
- A **GitHub account**: https://github.com (free).

### 2. Create the project folder
1. Make a new empty folder somewhere, e.g. `carolina-moldings`.
2. Copy this entire `design_handoff_carolina_moldings/` folder **into** it.
3. Open the `carolina-moldings` folder in VSCode (**File → Open Folder…**).

### 3. Let Claude Code scaffold the app
1. In VSCode, open the built-in terminal (**Terminal → New Terminal**).
2. Type `claude` and press Enter.
3. Open `design_handoff_carolina_moldings/CLAUDE_CODE_PROMPT.md`, copy its entire contents,
   paste it into Claude Code, and press Enter.
4. Claude Code will create the Next.js app, wire up Tailwind + shadcn/ui, import the product
   data, and build the pages. Answer its questions as they come up; let it run the install
   commands it proposes.
5. When it's done, run `npm run dev` and open http://localhost:3000 to see your site.

### 4. Put it on GitHub
In the VSCode terminal (from the project root, once the app is created):

```bash
git init
git add .
git commit -m "Initial commit: Carolina Moldings website"
```

Then create the remote repo:
- **Easiest:** install the GitHub CLI (https://cli.github.com), run `gh auth login` once,
  then `gh repo create carolina-moldings --private --source=. --push`.
- **Or manually:** create an empty repo at https://github.com/new (no README), then:
  ```bash
  git remote add origin https://github.com/<your-username>/carolina-moldings.git
  git branch -M main
  git push -u origin main
  ```

### 5. Deploy (optional, recommended)
- Go to https://vercel.com, sign in with GitHub, **Import** the repo. Vercel auto-detects
  Next.js and deploys it. Every `git push` after that redeploys automatically.

---

## A note on images & "multiple images per product"

The current catalog has **one** real photo per product (38 of them, in `seed-images/products/`).
The data model is already built to hold **an array of images per product** (`images: string[]`),
so multiple angles/detail shots are supported from day one — you just add more URLs to each
product's `images` array. `BUILD_GUIDE.md` → *Images & hosting* covers the recommended hosting
options (local `/public`, Vercel Blob, or Cloudinary) and how to wire a gallery.

---

## Important

- **Do not ship the HTML.** Recreate it in React/Next using shadcn/ui + Tailwind.
- The prototype uses **Archivo**, **IBM Plex Sans**, and **IBM Plex Mono** (all free, on Google
  Fonts) — load them via `next/font/google`.
- Prices are **never** shown on the site. Customers build a **Quote List** (cart with no prices)
  and request pricing. Keep that behavior.
- Carolina parts and Richards parts must stay **visually separate** in the quote (Carolina is the
  manufacturer; Richards is a distributed line).
# carolina-moldings-inc
