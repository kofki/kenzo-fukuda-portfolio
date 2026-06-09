# Kenzo Fukuda — Portfolio

Personal portfolio site: a single-page tour through work, projects, and experience,
set against a scroll-driven "dive world" background that descends from beach to deep reef.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-first config — no `tailwind.config.js`)
- `motion` (Framer Motion) for animation
- `@phosphor-icons/react` + `simple-icons` for iconography

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
```

## Content

Copy is data-driven: everything lives in typed objects under `data/` (`profile`,
`projects`, `hackathons`, `experience`, `education`, `skills`, `hobbies`, `nav`), and the
section components in `components/sections/` render over them. To add a project, add a data
object — its card and `/projects/<slug>` detail page are generated automatically.
