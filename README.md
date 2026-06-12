# CV Builder

React + Vite app that renders a CV from `src/data/cv.yaml` and deploys to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (served at `/` locally).

## Update your CV

Edit `src/data/cv.yaml`, then rebuild. No component changes are needed for content updates.

Place your profile photo at `src/data/avatar.jpg`. Set `profile.photo` in YAML only to override with an external URL.

## Build

```bash
npm run build
npm run preview
```

To test a non-root base path locally:

```bash
VITE_BASE_PATH=/some-path/ npm run build
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages at the site root (`/`).

Repository settings required:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions
2. Optional custom domain — either:
   - **Settings → Pages → Custom domain**, or
   - Repository or `github-pages` environment variable **`PAGES_CUSTOM_DOMAIN`** (e.g. `cv.example.com`)

Optional repository or `github-pages` environment variable **`VITE_BASE_PATH`** (defaults to `/` in CI).
