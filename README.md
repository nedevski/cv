# CV Builder

React + Vite app that renders a CV from YAML files in `data/` and deploys to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (served at `/` locally).

## Data files (`data/`)

All content and site settings live in `data/` as YAML. Edit these files to customize your CV — no component changes are needed for content updates.

| File | Purpose |
|------|---------|
| `cv.yaml` | CV content: profile, contact, experience, projects, education, skills, etc. |
| `site.yaml` | Site metadata: page title, favicon, color theme, and default light/dark mode |
| `avatar.jpg` | Default profile photo (referenced by `profile.photo` in `cv.yaml`) |

### `cv.yaml`

Structured sections you can edit:

- **profile** — name, title, photo, summary
- **contact** — email, phone, location, LinkedIn, GitHub
- **experience** — job history with highlights
- **projects** / **personalProjects** — client work and side projects
- **certifications**, **education**, **languages**, **hobbies**

Place images in `data/` and reference them by filename (e.g. `avatar.jpg`). Set `profile.photo` to an external URL to use a remote image instead.

### `site.yaml`

```yaml
title: Your Name — CV
favicon: favicon.svg
mode: dark      # default appearance: light or dark
theme: orange   # color palette (see Theming below)
```

## Theming

The app has two independent theme layers:

1. **Color theme** — accent colors and backgrounds, set in `site.yaml` via `theme`.
2. **Light / dark mode** — set by `mode` in `site.yaml` as the default; visitors can toggle it in the UI. The choice is saved in `localStorage`.

Color themes are defined in `src/styles/themes/` as one CSS file per palette. The filename (without `.css`) is the value you use in `site.yaml`:

| Theme | File |
|-------|------|
| `orange` | `src/styles/themes/orange.css` |
| `blue` | `src/styles/themes/blue.css` |
| `green` | `src/styles/themes/green.css` |
| `teal` | `src/styles/themes/teal.css` |
| `purple` | `src/styles/themes/purple.css` |
| `red` | `src/styles/themes/red.css` |
| `olive` | `src/styles/themes/olive.css` |

Each file defines CSS variables for both light and dark mode under `[data-color-theme="…"]` and `[data-color-theme="…"][data-theme="dark"]`. To add a custom palette, create a new file in `src/styles/themes/`, import it in `src/main.tsx`, and add the name to `COLOR_THEMES` in `src/types/site.ts`.

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
