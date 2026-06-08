# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is the single most important rule: this is **Next.js 16** with breaking changes from older versions. Before writing any Next.js-specific code (routing, metadata, image, fonts, server/client boundaries), read the relevant guide under `node_modules/next/dist/docs/`.

## Project layout

The git root contains a single app in `portfolio-app/`. **All commands below run from `portfolio-app/`, not the repo root.**

```
cd portfolio-app
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (static — SSG, generateStaticParams)
npm start        # serve the production build
npm run lint     # eslint (flat config, eslint-config-next)
```

There is **no test runner** configured (no `test` script, no test files). Don't hunt for one; verify changes by running the app.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · `motion` v12 (Framer Motion) · `@phosphor-icons/react` · `simple-icons`. Path alias `@/*` → `portfolio-app/*`.

## Architecture

### Content is data-driven — edit `data/`, not components
All copy lives in `data/*.ts` as typed objects (`profile`, `projects`, `hackathons`, `experience`, `education`, `skills`, `hobbies`, `nav`); section components in `components/sections/` just map over them. Types are centralized in `types/index.ts`.

`lib/work.ts` is the unified content model: it merges `projects` + `hackathons` into `allWork` and exposes `isHackathon()`, `allWorkSlugs()`, and `getWorkBySlug()`. It feeds **both** the Projects section (`components/sections/Work.tsx`) and the dynamic detail route `app/projects/[slug]/page.tsx` (which uses `generateStaticParams` + `generateMetadata`). To add a project, add a data object — the card and its `/projects/<slug>` page follow automatically.

> Note: `components/sections/Projects.tsx` and `Hackathons.tsx` are legacy/unused — `app/page.tsx` renders `Work.tsx` (titled "Projects"). Don't edit the unused ones.

### Icons are abstracted by name
Data references icons by semantic key, not component. `lib/icons.ts` maps an `IconName` union → Phosphor components; `lib/brandIcon.tsx` maps a `simple-icons` slug → `<BrandIcon slug=…>` brand marks. Skills/socials specify a `brand?` (simple-icons) with an `icon?` (Phosphor) fallback.

### Theming: CSS-variable palette flipped by a `.dark` class
- Modes are `auto | light | dark`. An inline no-flash script in `app/layout.tsx` sets `.dark` on `<html>` before paint, reading `localStorage['theme-mode']` or falling back to the local hour (7am–7pm = light).
- `app/providers.tsx` `ThemeProvider` tracks/cycles the mode via `useSyncExternalStore` and re-evaluates `auto` every 60s.
- **Colors are CSS custom properties** defined twice in `app/globals.css` — once in `:root` (light) and once in `.dark` (night) — then exposed as Tailwind utilities via the `@theme inline` block (`--color-ink` → `text-ink`, etc.). There is **no `tailwind.config.js`**; Tailwind v4 config is CSS-first. Use the semantic tokens (`text-ink`, `bg-sand`, `text-coral`, `--dive-*`, `--sky-*`) so both themes stay correct.

### The scroll-driven "dive world" background
`components/world/WorldBackground.tsx` is a single `fixed inset-0 -z-10` backdrop behind all page content. One `useScroll()` `scrollYProgress` (0 = top of the whole page, 1 = bottom) drives every visual layer. The page descends beach → shallows → deep water → glowing reef city as you scroll.

Each layer is a `DepthLayer` given an `opacity` and optional `parallax` **ramp** — `{ at: number[], to: number[] }` keyed in normalized page-progress space. Tune a layer's appearance by editing its ramp in `WorldBackground.tsx`.

**Critical gotcha:** `DepthLayer` (`components/world/DepthLayer.tsx`) interpolates ramps with its own clamped piecewise-linear helper (`rampValue`), **not** motion's array-form `useTransform(progress, at, to)`. The array form (in this motion version) mis-extrapolates ramps that don't start and end at the same value, which previously made the dive *rewind to the beach at the bottom of the page*. Keep using `rampValue`/the `Ramp` shape; values clamp (not extrapolate) outside `[at[0], at[last]]`.

When `prefers-reduced-motion` is set (`lib/useReducedMotion.ts`), `WorldBackground` renders a single static gradient and all the animated layers are skipped. Keep that branch working when changing the background.

Hero atmosphere (`components/hero/`: `ParallaxSky`, `Sun`, `MoonPhase`, `WeatherLayer`, `AmbientEvents`) reacts to theme (day/night) and live weather from `lib/useWeather.ts` (client-side Open-Meteo fetch, graceful fallback). World scenery decomposes into `components/world/props/` (static SVG objects) and `components/world/sprites/` (animated characters); animations are CSS keyframes registered as `--animate-*` tokens in `globals.css`.

### Navigation / scrollspy contract
`data/nav.ts` defines both the nav order and the scrollspy targets: each item's `sectionId` must match the `id` attribute on the corresponding `<section>` in its `components/sections/*` component. Changing one without the other breaks the active-link highlighting and the hero CTA anchors.
