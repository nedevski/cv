# CV Builder

React + Vite CV site, laid out for web, mobile, and print. All content lives in `data/cv.yaml`; pushes to `main` deploy to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Content

The full CV structure is in `data/cv.yaml` — `profile`, `contact`, `experience`, `projects`, `education`, and the rest. Contact fields are all optional; anything omitted is not rendered.

Images belong in `data/` and are referenced by filename (e.g. `profile.photo: profile.jpg`). Remote URLs are supported as well. The favicon is `public/favicon.svg` by default, overridable via `general.favicon`.

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
- `VITE_CF_WEB_ANALYTICS_TOKEN` — Cloudflare Web Analytics beacon token (see below)

### Analytics (optional)

Uses [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/). The site does **not** need to be proxied through Cloudflare.

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Analytics** → **Web Analytics** → **Add a site**
2. Type your hostname manually (no `https://`, no path):
   - GitHub Pages: `username.github.io` (not the `/repo` path)
   - Custom domain: e.g. `cv.example.com`
3. Select the hostname from the suggestion, then **Done**
4. Open **Manage site** on the new site card and copy the **token** from the snippet (`data-cf-beacon` → `"token"`). You do not need to paste the snippet into this repo — the app injects it at build time.
5. Set the GitHub Actions variable `VITE_CF_WEB_ANALYTICS_TOKEN` (repo or `github-pages` environment):
6. Redeploy (push to `main` or re-run the deploy workflow)

For local testing, put the token in `.env.local` as `VITE_CF_WEB_ANALYTICS_TOKEN=...` (gitignored).
