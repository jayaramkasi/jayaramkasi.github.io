# Personal Site — Codebase Map

Single-page personal branding site for Jayaram Kasi Visweswaran. React + Vite + TypeScript + Tailwind, deployed to GitHub Pages. A companion Node script generates a print-ready CV from the same data.

## Stack
- **React 18** + **react-router-dom 7** (client-side routing, `BrowserRouter`)
- **Vite 5** build, dev server on **port 4173**
- **Tailwind 3** (`darkMode: "class"`), custom theme, no UI framework
- **TypeScript 5** strict, path alias `~` → `src/`
- **Yarn 4** (Berry, Corepack) — package manager
- **Playwright** E2E tests, **Puppeteer** for CV→PDF rendering
- Icons: `react-icons` (Feather `fi` set). Charts dep: `@headless-charts/react`

## Commands
| Task | Command |
|------|---------|
| Dev server | `yarn dev` (port 4173) |
| Build | `yarn build` (`tsc && vite build` → `dist/`) |
| Preview build | `yarn preview` |
| Generate CV HTML | `yarn cv` → `cv/cv.html` |
| Generate CV PDF | `yarn cv:pdf` → also renders PDF via Puppeteer |
| E2E tests | `yarn test:e2e` (auto-starts dev server) |
| E2E UI / report | `yarn test:e2e:ui` / `yarn test:e2e:report` |

Note: `cv/generate.ts` runs via `node --experimental-strip-types`.

## Layout
```
src/
  main.tsx            Entry — BrowserRouter(basename=BASE_URL) wraps <App/>
  App.tsx             Route table (all routes nested under <Layout/>)
  data.ts             ★ SINGLE SOURCE OF TRUTH for all CV/profile content
  gallery.ts          Live interactive embeds (kept OUT of data.ts / CV)
  index.css           Tailwind entry + theme-transition + body styles
  components/
    Layout.tsx        Sidebar + <main> + animated <Outlet/> (keyed on pathname)
    Sidebar.tsx       Nav (navItems array), responsive drawer, scroll-lock, Esc
    ThemeToggle.tsx   Light/dark toggle button
  hooks/useTheme.ts   Theme state: localStorage + prefers-color-scheme, class on <html>
  pages/              One component per route (see routes below)
cv/
  generate.ts         Derives cv.html (+ optional PDF) from src/data.ts — no copy lives here
  cv.html             Generated output (do not hand-edit)
  Resume of Jayaram Kasi Visweswaran.pdf
e2e/                  Playwright specs (see below)
public/               profile-{light,dark}.png, favicon.svg, cert badges
.github/workflows/    deploy.yml (Pages), e2e.yml (tests)
```

## Routing (`src/App.tsx`)
All routes render inside `<Layout/>`. Index = Introduction.

| Path | Page | H1 |
|------|------|----|
| `/` | Introduction | "Jayaram Kasi Visweswaran" |
| `/experience` | Experience | "16 years of growth" |
| `/expertise` | Expertise | "Skills & proficiency" |
| `/education` | Education | "Academic background" |
| `/featured-work` | FeaturedWork | "Projects that demonstrate impact" |
| `/community` | Community | "Sharing knowledge with the community" |
| `/gallery` | Gallery | "Work in public" |
| `*` | NotFound | — |

Nav labels live in `navItems` in `Sidebar.tsx` — keep in sync with routes and with the `routes` array in `e2e/pages.spec.ts` (headings are asserted there).

## Data model (`src/data.ts`)
Exported consts, all consumed by pages **and** the CV generator:
`profile`, `highlights`, `expertise`, `skillGroups` (name+level 1-10), `toolGroups`, `projects` (title/category/description/tags), `experience` (company/role/period/summary/achievements[]), `community`, `certifications` (badge img + credentialUrl), `education`.

**To edit site content, edit `src/data.ts` then re-run `yarn cv` to regenerate the CV.** Content is not duplicated anywhere else.

`src/gallery.ts` is deliberately separate (`gallery`, `galleryPlatforms`, `GalleryItem` type) so live iframe embeds never leak into the printed CV.

## Theming
- `useTheme` toggles a `dark` class on `<html>`; persists to `localStorage["theme"]`; follows OS `prefers-color-scheme` until the user makes an explicit choice.
- Color transitions only run during a swap via a temporary `.theme-transition` class (300ms), respects `prefers-reduced-motion`.
- Tailwind custom colors (`tailwind.config.js`): `night.{950..600}` (dark bg), `gold.{200..700}` (accent), `cream` (light bg), `moonlight` (light text on dark). Fonts: `font-display` = Fraunces (serif), `font-sans` = Inter. Custom `animate-tab-enter` for page transitions.

## Testing (`e2e/`, Playwright)
`introduction`, `mobile-nav`, `navigation`, `pages`, `theme`. Chromium only; falls back to `/opt/pw-browsers/chromium` if present (sandbox), else Playwright-managed. `pages.spec.ts` drives assertions off the route→heading table above.

## Deployment
`.github/workflows/deploy.yml` on push to `main`: yarn install (immutable) → `yarn build` → copies `dist/index.html` to `dist/404.html` (SPA deep-link fallback, since Pages has no server rewrite) → uploads Pages artifact → deploys. Served at root of `https://jayaramkasi.github.io/`, so Vite `base` stays `/`.

## Conventions
- TS/JS: camelCase vars/functions, PascalCase components/types.
- Import from `~/...` (alias), not relative paths.
- Verify frontend changes in **Arc** (`open -a Arc`), not headless Chromium.
- Do not commit/push unless explicitly asked.
