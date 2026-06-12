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

For a different GitHub Pages base path:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds `cv-builder` and publishes `dist/` to GitHub Pages.

Repository settings required:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions
2. After the first successful deploy, the site URL is shown in the workflow run (typically `https://<user>.github.io/<repo>/`).
