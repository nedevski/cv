# CV Builder

React + Vite CV site, laid out for web, mobile, and print. All content lives in `data/cv.yaml`; pushes to `main` deploy to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Content

The full CV structure is in `data/cv.yaml` — `profile`, `contact`, `experience`, `projects`, `education`, and the rest. Contact fields are all optional; anything omitted is not rendered.

Images belong in `data/` and are referenced by filename (e.g. `profile.photo: profile.jpg`). Remote URLs are supported as well. The favicon is `public/favicon.svg` by default, overridable via `general.favicon`. Certification issuer icons live in `public/icons/` and are referenced from YAML as `icon: icons/microsoft.svg`.

**Themes:** `general.theme` selects the color palette (`orange`, `blue`, `green`, `teal`, `purple`, `red`, `olive`). `general.mode` is the default light/dark appearance; visitors can toggle it and the choice is stored in `localStorage`.

Custom palettes are CSS files under `src/styles/themes/`, imported in `src/main.tsx` and registered in `src/types/site.ts`.

## Build

```bash
npm run build
npm run preview
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` on push to `main`.

In the repo: **Settings → Pages → Source** → GitHub Actions.

Optional env vars (repo or `github-pages` environment):

- `PAGES_CUSTOM_DOMAIN` — e.g. `cv.example.com` (or set it under Pages → Custom domain)
- `VITE_UMAMI_WEBSITE_ID` — Umami website ID
- `VITE_UMAMI_DOMAINS` — comma-separated hostnames to track

### Analytics

Uses self-hosted analytics via `initAnalytics.ts`. Set `VITE_UMAMI_WEBSITE_ID` and `VITE_UMAMI_DOMAINS` as repo variables (or in `github-pages` environment). Local dev skips tracking unless you add a `.env.local` override.
