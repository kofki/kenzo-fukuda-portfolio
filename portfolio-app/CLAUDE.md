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


### Icons are abstracted by name
Data references icons by semantic key, not component. `lib/icons.ts` maps an `IconName` union → Phosphor components; `lib/brandIcon.tsx` maps a `simple-icons` slug → `<BrandIcon slug=…>` brand marks. Skills/socials specify a `brand?` (simple-icons) with an `icon?` (Phosphor) fallback.

### Theming: CSS-variable palette flipped by a `.dark` class
- Modes are `auto | light | dark`. An inline no-flash script in `app/layout.tsx` sets `.dark` on `<html>` before paint, reading `localStorage['theme-mode']` or falling back to the local hour (7am–7pm = light).
- `app/providers.tsx` `ThemeProvider` tracks/cycles the mode via `useSyncExternalStore` and re-evaluates `auto` every 60s.
- **Colors are CSS custom properties** defined twice in `app/globals.css` — once in `:root` (light) and once in `.dark` (night) — then exposed as Tailwind utilities via the `@theme inline` block (`--color-ink` → `text-ink`, etc.). There is **no `tailwind.config.js`**; Tailwind v4 config is CSS-first. Use the semantic tokens (`text-ink`, `bg-sand`, `text-coral`, `text-hand`, `bg-tape`) so both themes stay correct.

### The home page: one continuous dive, woodblock style
The design was signed off in Figma first (file `jh20R5gRJFmD11fNGMV1We`, pages 14 and 15). Keep changes faithful to it.

`app/page.tsx` stacks Hero, Work (titled "Projects"), About, Experience, Logbook and Contact. Each section paints its own scenery from flat woodblock-print images in `public/scenes/`, and neighbouring sections share edge colours so they meet without seams. There is no global fixed background any more.

- **Hero** (`components/sections/Hero.tsx`, `components/home/HeroDive.tsx`, `BeachScene.tsx`): a pinned beach scene that cross-fades day and night images on the `.dark` class. As you scroll, the scene zooms into the sea, breaks the surface and comes out underwater in the colour Projects starts with. The tappable props are transparent WebP cut-outs in `public/props/{day,night}/`. Only the crab, umbrella and guitar show on phones.
- **Underwater sections** use `components/home/Underwater.tsx` for the background, eyebrow and title. `ScrollLayer.tsx` is the generic scroll-linked layer (y, x and opacity ramps) used for the reef, jellyfish and city-lights veil.
- **Living layers:** the breakers, glints and shoreline foam are cut out of the beach prints (`public/scenes/waves/`, laid out by `waveLayers.ts`), and the jellyfish, kelp and fish are cut out of their prints (`public/scenes/creatures/`, `creatureLayers.ts`). Both beach prints share one horizon (75.4% down) and sand line (92.6%). `LiveScene` pauses a scene's CSS loops while it is off screen.
- **Grounded scenery:** rocks, coral and kelp stand on the sea floor through `Grounded` / `Pass` (`components/home/Grounded.tsx`): their base never shows, and on the way out each piece passes to the side or under the reader. Sections that use it pass `spill` to `Underwater`. `WaterMood` gives every underwater section its day and night look.
- **Seamless water:** each underwater section's background starts with the colour the previous one ends with, and every scene image is faded at its edges with `fadeEdges()`. Keep both rules when changing a section, or a hard line comes back.
- **Doodles** (`components/home/Doodles.tsx`) are the only hand-drawn SVGs: the name underline and the "that's me" arrow, drawn with the `.doodle-draw` class.
- **Photos** use `components/home/PhotoPrint.tsx`, a paper print with one washi tape.

**Critical gotcha:** use the function form of motion's `useTransform` with a clamped ramp, as `ScrollLayer` and `HeroDive` do. The array form mis-extrapolates ramps that do not start and end at the same value.

**Content must be visible without JavaScript.** Section entrances use the CSS `.reveal` class (scroll-driven `animation-timeline: view()` behind `@supports`), never inline `opacity: 0` from a client component. With `prefers-reduced-motion` (`lib/useReducedMotion.ts`) the hero does not pin, the sea does not rise, and every `ScrollLayer` renders its end state.

Fonts are Dela Gothic One (`font-display`, name and titles), Zen Kaku Gothic New (`font-sans`, body) and Gochi Hand (`font-hand`, notes), set up in `app/fonts.ts`.

### Navigation / scrollspy contract
`data/nav.ts` defines both the nav order and the scrollspy targets: each item's `sectionId` must match the `id` attribute on the corresponding `<section>` in its `components/sections/*` component. Changing one without the other breaks the active-link highlighting and the hero CTA anchors.
