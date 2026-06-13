# CV Builder

React + Vite app that renders a CV from YAML files in `data/` and deploys to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (served at `/` locally).

## Data files (`data/`)

All content and site settings live in `data/cv.yaml`. Edit this file to customize your CV - no component changes are needed for content updates.

| File | Purpose |
|------|---------|
| `cv.yaml` | CV content, site metadata, and theme settings |
| `profile.jpg` (or other image) | Profile photo (referenced by `profile.photo` in `cv.yaml`) |
| `favicon.svg` (in `public/`) | Default favicon unless overridden in `general.favicon` |

Place images in `data/` and reference them by filename (e.g. `profile.jpg`). Set `profile.photo` to an external URL to use a remote image instead.

### `cv.yaml` structure

Top-level sections:

- **general** - page title, favicon, canonical URL, repository link, color theme, and default light/dark mode
- **profile** - name, title, photo, summary
- **contact** - email, phone, location, website, LinkedIn, GitHub, GitLab, Facebook, Instagram, YouTube
- **experience** - job history with highlights
- **projects** - client or professional projects
- **personalProjects** - side projects (same shape as `projects`)
- **certifications**, **education**, **languages**, **hobbies**

#### `general`

```yaml
general:
  title: Your Name - CV
  url: https://cv.example.com      # optional canonical site URL
  repository: https://github.com/you/cv  # optional; linked from the page footer
  favicon: favicon.svg
  mode: dark                       # default appearance: light or dark
  theme: orange                    # color palette (see Theming below)
```

#### `profile`

```yaml
profile:
  name: Your Name
  title: Your Job Title
  photo: profile.jpg               # filename in data/, or https://... URL
  summary: |
    Multi-line summary text.
```

#### `contact`

All fields are optional. Omit a field or leave it empty to hide it.

```yaml
contact:
  email: you@example.com
  phone:
  location: City, Country
  website: https://cv.example.com
  linkedin: https://linkedin.com/in/you
  github: https://github.com/you
  gitlab:
  facebook:
  instagram:
  youtube:
```

#### `experience`

```yaml
experience:
  - title: Job Title
    organization: Company Name
    period: Jan 2020 - Present
    highlights:
      - Bullet point one
      - Bullet point two
```

#### `projects` and `personalProjects`

```yaml
projects:
  - title: Project Name
    client: Client Name            # optional
    period: 2024 - 2025            # optional; use null if unknown
    url: https://example.com/      # optional
    urlLabel: example.com          # optional link label
    description: |
      Multi-line project summary.
    highlights:
      - What you did
    technologies:                  # optional
      - .NET
      - React
```

`personalProjects` uses the same fields. `highlights` may be an empty list.

#### `certifications`

```yaml
certifications:
  - title: Certification Name
    issuer: Issuing Organization
    year: 2024                     # optional
    verifyUrl: https://...         # optional
    verifyLabel: Verify credential # optional
```

#### `education`

```yaml
education:
  - degree: Degree Name
    institution: School Name
    period: 2018 - 2022
```

#### `languages`

`proficiency` is a number from 0 to 100 used for the progress bar.

```yaml
languages:
  - name: English
    level: Professional
    proficiency: 90
```

#### `hobbies`

```yaml
hobbies:
  - Photography
  - Cycling
```

## Theming

The app has two independent theme layers:

1. **Color theme** - accent colors and backgrounds, set in `cv.yaml` via `general.theme`.
2. **Light / dark mode** - set by `general.mode` as the default; visitors can toggle it in the UI. The choice is saved in `localStorage`.

Color themes are defined in `src/styles/themes/` as one CSS file per palette. The filename (without `.css`) is the value you use in `general.theme`:

| Theme | File |
|-------|------|
| `orange` | `src/styles/themes/orange.css` |
| `blue` | `src/styles/themes/blue.css` |
| `green` | `src/styles/themes/green.css` |
| `teal` | `src/styles/themes/teal.css` |
| `purple` | `src/styles/themes/purple.css` |
| `red` | `src/styles/themes/red.css` |
| `olive` | `src/styles/themes/olive.css` |

Each file defines CSS variables for both light and dark mode under `[data-color-theme="..."]` and `[data-color-theme="..."][data-theme="dark"]`. To add a custom palette, create a new file in `src/styles/themes/`, import it in `src/main.tsx`, and add the name to `COLOR_THEMES` in `src/types/site.ts`.

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

1. **Settings -> Pages -> Build and deployment -> Source:** GitHub Actions
2. Optional custom domain - either:
   - **Settings -> Pages -> Custom domain**, or
   - Repository or `github-pages` environment variable **`PAGES_CUSTOM_DOMAIN`** (e.g. `cv.example.com`)

Optional repository or `github-pages` environment variable **`VITE_BASE_PATH`** (defaults to `/` in CI).
