# UPDOG — the meme that refuses to come down 🐕‍🦺⬆️

A single-page, internet-native **sky world** for the $UPDOG meme. Built with
Next.js (App Router) + TypeScript + Tailwind, with all visuals hand-built as
inline SVG (green-arrow marks, puffy clouds, split-flap board, a golden-retriever
mascot) — **zero image dependencies** out of the box.

The whole page is one continuous scroll that climbs through cloud strata:
**hero → punchline → why → flight status → the coin → flight plan → the pack →
sunset boarding call → footer.**

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Requires Node.js 18.18+ (Next.js 15 / React 19).

---

## Editing content — one file

**All copy, links, CTAs, contract fields, chain name, and legal text live in
[`src/config/site.ts`](src/config/site.ts).** Never edit copy inside components.

- `siteConfig` — brand + launch state:
  - `xUrl`, `telegramUrl`, `buyUrl` → leave `""` until live (links auto-disable).
  - `contractAddress` → `"COMING SOON"` until launch.
  - `isLaunchLive` → flip to `true` **and** set `buyUrl` to enable the "GO UP" /
    buy CTAs. While `false`, every buy button shows "LAUNCH PENDING" and is disabled.
  - `chainName` is a **placeholder label only** and is marked as such in the UI.
- `content` — every on-page string (hero, punchline meme lines, dashboard vibe
  rows, roadmap stages, gallery cards, boarding pass, footer).

> ⚠️ Safety rules baked into the config header: never add price, liquidity, APY,
> or performance claims, and never invent real URLs or contract addresses.

---

## Design system

- **Type:** Fredoka (display) + Nunito (body), loaded via `next/font` as the
  CSS variables `--font-display` / `--font-sans` (see `src/app/layout.tsx`).
- **Tokens:** colors, shadows, and keyframes live in
  [`src/app/globals.css`](src/app/globals.css) and
  [`tailwind.config.ts`](tailwind.config.ts).
- **Sections** chain their `<CloudBank tint>` to the section above so the scroll
  reads as one sky. If you reorder sections in `src/app/page.tsx`, re-check each
  section's `tint` against the previous section's bottom color.

### Interaction / a11y

- **Custom cursor** (`CustomCursor`) — desktop + fine-pointer only, disabled for
  keyboard users, respects `prefers-reduced-motion`.
- **Sound** (`SoundProvider` / `SoundToggle`) — bark/chime are **off by default**,
  Web Audio only, created on a real click gesture. Never autoplays.
- Reduced-motion flattens all animation; focus rings, skip link, and semantic
  landmarks are in place.

---

## Replacing placeholder assets

Everything ships as original inline SVG so the site works with **no external
files**. Swap points, in priority order:

### Dog mascot → real art or 3D
[`src/components/mascot/MascotPlaceholder.tsx`](src/components/mascot/MascotPlaceholder.tsx)
exposes a stable interface — surrounding components don't change:

- `imageUrl?: string` → render a flat `<img>` (PNG/WebP) instead of the SVG.
- `glbUrl?: string` → **reserved** for the final swap: an original, optimized
  **GLB/GLTF** 3D dog in a React Three Fiber scene.

**Final 3D asset expectations:** Draco-compressed GLB, baked lighting, low-poly
optimized meshes, an idle bob + wind-blown-ear idle animation, and a separate
attach point/bone for the nose arrow. (A Meshy → GLB pipeline is the intended
source; keep any API key server-side in `.env.local`, never commit it.)

### Gallery / pack photos
[`src/components/gallery/Gallery.tsx`](src/components/gallery/Gallery.tsx) renders
honest `SAMPLE` placeholders driven by `content.gallery.cards[].kind`. Replace the
`PlaceholderArt` tiles with real pack photos/memes when they exist.

### Other art (clouds, sky, arrow, coin, board)
All are code-drawn SVG components under `src/components/` — edit the SVG directly;
no texture files are required.

---

## Environment variables

None are required to run the static marketing site. If/when a 3D asset pipeline
or any keyed service is added, put secrets in `updog-site/.env.local` (already
covered by `.gitignore`) and read them **server-side only** — never expose a key
to the browser.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # fonts, metadata, providers (Sound/Preloader/Cursor/Header/Footer)
│  ├─ page.tsx          # section composition
│  └─ globals.css       # tokens, keyframes, cloud-card / flap / cursor styles
├─ config/site.ts       # ← all copy, links, launch state (edit here)
├─ lib/                 # sound engine, useCopy hook
└─ components/
   ├─ arrows/  clouds/  sky/  mascot/  cursor/  sound/  ui/
   ├─ header/  hero/  punchline/  why/  dashboard/  token/
   └─ roadmap/  gallery/  finalCta/  footer/
```

---

## Legal

$UPDOG is a meme coin. Nothing in this project is financial advice. Third-party
names (e.g. chain labels) appear for reference only and imply no affiliation or
endorsement. See the disclaimers in the footer and `src/config/site.ts`.
