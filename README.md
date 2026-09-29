# Rafi Rahman — Portfolio

Personal site for Rafi Rahman, Software Engineer & Digital Product Builder.
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · MDX.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages statically generated)
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before deploying.

## Before launch — placeholders to replace

| What | Where |
| --- | --- |
| Portrait | Add `public/images/portrait.jpg`, set `portrait` in `src/config/site.ts` |
| Contact email, site URL | `src/config/site.ts`, `.env.local` |
| Social profile URLs | `socialLinks` in `src/config/site.ts` (empty links render as text) |
| Project status / type / year / stack | Entries marked `TODO(rafi)` in `src/data/projects.ts` |
| Project screenshots | `cover` and `caseStudy.screenshots` in `src/data/projects.ts` |
| Career journey | `journey` in `src/data/about.ts` (section hidden while empty) |
| Contact delivery | `CONTACT_WEBHOOK_URL` — without it the form offers a pre-filled email |
| Starter articles | Review everything in `src/content/` before publishing |

Honesty rule: never add clients, metrics, testimonials or results that are not
real. Unconfirmed details are omitted, not guessed.

## Architecture

```
src/
├── app/              Routes. Server Components by default.
├── components/
│   ├── animations/   Reveal, RevealText, Magnetic, PointerField
│   ├── hero/         Hero, KineticHeadline, HeroPortrait
│   ├── sections/     Homepage sections (each self-contained)
│   ├── projects/     ProjectCard, ProjectGallery, ProjectCover, CaseStudy…
│   ├── articles/     Shared by blog + insights: layout, list, TOC, progress
│   ├── services/ solutions/ forms/ navigation/ layout/ ui/
├── content/          MDX: blog/ and insights/ (`export const meta = {…}`)
├── data/             Typed content: projects, services, solutions, home…
├── lib/
│   ├── content/      Content access layer — the only thing pages read from
│   ├── metadata/     buildMetadata, JSON-LD, OG image renderer
│   ├── validation/   Article meta + contact form validation
│   └── utils/
├── hooks/            useMediaQuery, useReducedMotion, useScrollProgress
├── types/
└── config/site.ts
```

**Content layer.** Pages never import `src/data` or MDX directly; they call
functions in `src/lib/content/*`. Moving to a CMS (WordPress, Sanity,
Contentful) means reimplementing those modules — pages and components stay.

**Adding content.**
- Blog post / insight: add `src/content/{blog,insights}/<slug>.mdx` exporting `meta`
  (title, description, date `YYYY-MM-DD`, category, tags; `draft: true` hides it in production).
  Insight categories: Build, Think, Learn. MDX can use `<Callout>` and `<Figure>`.
- Project: add an entry to `src/data/projects.ts`. Case-study sections render
  only when present, in a fixed order.
- Service / solution: add to `src/data/services.ts` / `solutions.ts`.

**Design system.** Tokens live in `src/app/globals.css` (`@theme`). Sections
set a surface (`surface-dark`, `surface-light`, …) which redefines semantic
colours (`fg`, `fg-muted`, `line`, `surface`), so components work on either.

**Motion.** No animation library. CSS transitions/keyframes plus small client
islands: one shared IntersectionObserver for reveals (data attributes, no
re-renders), CSS variables for pointer and scroll progress. Everything is
disabled under `prefers-reduced-motion`; reveals never hide content without
JavaScript (`@media (scripting: enabled)`).
