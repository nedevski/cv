# CV Builder — Requirements

This document defines the project goals, hard requirements, and implementation plan for migrating the static HTML CV template into the React app and deploying it to GitHub Pages.

Hard requirements are labeled **REQ-###** and should be referenced in commits, PRs, and implementation discussions.

---

## 1. Project overview

| Item | Location | Role |
|------|----------|------|
| HTML CV template (source of truth for layout & styling) | `HTMLTemplate/` | Reference implementation |
| React app (target) | `cv-builder/` | Fresh Vite + React + TypeScript scaffold |

**End goal:** The React app reads a YAML file containing the user's CV data, renders the same CV as the HTML template, builds to a static site, and is deployed to GitHub Pages.

---

## 2. Hard requirements

### Layout & structure

| ID | Requirement |
|----|-------------|
| **REQ-001** | The rendered CV MUST preserve the two-column layout from `HTMLTemplate/index.html`: a **header** (photo, name, title, summary, theme toggle) and a **main** area with a **primary column** (left) and **secondary column** (right). |
| **REQ-002** | The **primary column** MUST contain these sections, in this order: Experience, Projects, Personal Projects, Certifications. |
| **REQ-003** | The **secondary column** MUST contain these sections, in this order: Contact, Education, Languages, Hobbies. |
| **REQ-004** | On viewports ≤ 720px, the secondary column MUST appear above the primary column (same as `.cv-column--secondary { order: -1 }` in the template). |

### Visual fidelity & theming

| ID | Requirement |
|----|-------------|
| **REQ-005** | Visual appearance MUST match the HTML template: same class naming (BEM-style), spacing, typography, timeline, chips, language bars, and photo frame behavior. |
| **REQ-006** | CSS MUST remain **parametrized via CSS custom properties** (`:root` and `[data-theme="dark"]`) so themes can be changed by editing variables, not scattered hard-coded colors. See `HTMLTemplate/styles.css` lines 1–33. |
| **REQ-007** | Light/dark theme toggle MUST work and persist the user's choice in `localStorage` (key: `cv-theme`), with fallback to `prefers-color-scheme`. See `HTMLTemplate/script.js`. |
| **REQ-008** | Photo MUST show initials as fallback when the image is missing or fails to load (`.photo__frame--loaded` pattern). |

### Responsive & interactive behavior

| ID | Requirement |
|----|-------------|
| **REQ-009** | Sections MUST be **collapsible on mobile only** (≤ 720px): chevron visible, click toggles `data-collapsed`, `aria-expanded` updated. On desktop, section toggles are non-interactive. See `HTMLTemplate/script.js` and `@media (max-width: 720px)` in `styles.css`. |
| **REQ-010** | On viewport resize across the 720px breakpoint, collapsible sections MUST reset to expanded. |

### Print

| ID | Requirement |
|----|-------------|
| **REQ-011** | The CV MUST be **easily printable** via browser print (Ctrl+P / Cmd+P). Print styles from `HTMLTemplate/styles.css` (`@media print`) MUST be preserved: light palette, no shadows, theme toggle hidden, all collapsed sections forced open, page-break avoidance on sections and entries. |

### Data & content

| ID | Requirement |
|----|-------------|
| **REQ-012** | All CV content MUST be driven by a **YAML file** (not hard-coded in components). A single YAML file is the source of truth for a given deployment. |
| **REQ-013** | The YAML schema MUST support all content types present in the HTML template (see §4). |
| **REQ-014** | Optional fields (e.g. project links, certification verify URLs, photo) MUST degrade gracefully when absent. |

### Build & deployment

| ID | Requirement |
|----|-------------|
| **REQ-015** | The React app MUST build to a **static website** (`vite build` output) with no server-side runtime. |
| **REQ-016** | The static site MUST be deployable to **GitHub Pages** (correct `base` path for project or user pages, assets resolve correctly). |
| **REQ-017** | Deployment MUST be automated (e.g. GitHub Actions workflow on push to main) so `npm run build` in `cv-builder/` produces the published artifact. |

### Tech stack

| ID | Requirement |
|----|-------------|
| **REQ-018** | Implementation MUST use the existing **React + Vite + TypeScript** app in `cv-builder/`. |
| **REQ-019** | The HTML template in `HTMLTemplate/` MUST remain the visual/structural reference; the React port MUST not invent a new layout unless explicitly agreed later. |

---

## 3. Source template inventory

### Files to port

| File | Port to React as |
|------|------------------|
| `HTMLTemplate/styles.css` | Global CV stylesheet (e.g. `src/styles/cv.css`) — migrate largely as-is to satisfy **REQ-005**, **REQ-006**, **REQ-011** |
| `HTMLTemplate/index.html` | React component tree — structure only; content from YAML per **REQ-012** |
| `HTMLTemplate/script.js` | React hooks/effects: theme (**REQ-007**), mobile collapsible (**REQ-009**, **REQ-010**), photo fallback (**REQ-008**) |

### Layout regions (reference)

```
.cv
├── .cv-header
│   ├── .photo (photo + initials fallback)
│   ├── .cv-header__intro (name, title, summary)
│   └── .theme-toggle
└── .cv-main
    ├── .cv-column--primary
    │   ├── Experience (timeline entries)
    │   ├── Projects (timeline + tech chips)
    │   ├── Personal Projects (timeline + tech chips)
    │   └── Certifications (compact entries, optional links)
    └── .cv-column--secondary
        ├── Contact (labeled list)
        ├── Education (compact entries)
        ├── Languages (name, level, proficiency bar)
        └── Hobbies (chips)
```

---

## 4. Proposed YAML schema

The YAML file should map 1:1 to template sections. Example shape (to be finalized during implementation):

```yaml
profile:
  name: string
  title: string
  summary: string
  photo: string | null          # path or URL; null → initials from name
  initials: string | null       # optional override; default derived from name

contact:
  email: string
  phone: string | null
  location: string
  linkedin: string | null       # URL or display text
  github: string | null

experience:
  - title: string
    organization: string
    period: string              # e.g. "2022 – Present"
    highlights: string[]

projects:
  - title: string
    client: string | null
    period: string | null
    url: string | null
    urlLabel: string | null
    description: string | null
    highlights: string[]
    technologies: string[]

personalProjects:
  - title: string
    period: string | null
    url: string | null
    urlLabel: string | null
    description: string | null
    highlights: string[]
    technologies: string[]

certifications:
  - title: string
    issuer: string
    year: string | null
    url: string | null          # credential page
    verifyUrl: string | null
    verifyLabel: string | null  # e.g. "Verify credential"

education:
  - degree: string
    institution: string
    period: string

languages:
  - name: string
    level: string               # display label, e.g. "Native"
    proficiency: number       # 0–100 for --level bar

hobbies: string[]

theme:                        # optional overrides for REQ-006
  light: { ...css vars... }
  dark: { ...css vars... }
```

Sections with empty arrays MAY be omitted from the rendered page (behavior TBD; document decision when implementing **REQ-014**).

---

## 5. React app architecture (planned)

### Component breakdown

| Component | Responsibility |
|-----------|----------------|
| `App` | Load YAML, apply theme provider, render `Cv` |
| `Cv` | Root `.cv` wrapper |
| `CvHeader` | Photo, intro, theme toggle |
| `CvMain` | Two-column grid |
| `CvSection` | Reusable collapsible section shell (**REQ-009**) |
| `TimelineEntry` | Experience / project entries |
| `CompactEntry` | Certifications, education |
| `ContactList` | Contact section |
| `LanguageList` | Languages with bars |
| `ChipList` | Hobbies and tech tags |

### Data loading strategy

Two viable approaches (choose one during implementation):

1. **Build-time import** — YAML imported via Vite (`?raw` + `js-yaml` or `vite-plugin-yaml`). Parsed at build time; zero runtime fetch. Simplest for GitHub Pages (**REQ-015**).
2. **Runtime fetch** — `fetch('/cv.yaml')` from `public/`. Easier to swap YAML without rebuild; requires correct `base` path on GitHub Pages (**REQ-016**).

**Recommendation:** Build-time import for type safety and simpler deployment; place `cv.yaml` in `cv-builder/src/data/` or `cv-builder/public/`.

### TypeScript

- Define interfaces matching the YAML schema (**REQ-013**).
- Validate parsed YAML (minimal runtime checks or a schema library) before render.

### Dependencies (anticipated)

| Package | Purpose |
|---------|---------|
| `js-yaml` | Parse YAML |
| `@types/js-yaml` | TypeScript types |

No UI framework beyond React is required; styling stays in CSS per the template.

---

## 6. GitHub Pages deployment (planned)

### Vite configuration

- Set `base` in `vite.config.ts` to the repository subpath if using **project pages** (e.g. `base: '/cv-test/'`) or `'/'` for **user/organization pages** or custom domain.
- Output directory: `dist/` (default).

### GitHub Actions workflow (outline)

1. Trigger: push to `main` (or manual).
2. Checkout repo.
3. Setup Node.js.
4. `cd cv-builder && npm ci && npm run build`.
5. Deploy `cv-builder/dist` to GitHub Pages (e.g. `actions/upload-pages-artifact` + `actions/deploy-pages`, or `peaceiris/actions-gh-pages`).

### Repository settings

- Enable GitHub Pages from Actions (or from `gh-pages` branch, depending on chosen action).
- Document the live URL in `cv-builder/README.md` after first deploy.

---

## 7. Implementation phases

| Phase | Scope | Requirements |
|-------|-------|--------------|
| **1. CSS & assets** | Copy/adapt `styles.css`; remove Vite boilerplate styles | REQ-005, REQ-006, REQ-011 |
| **2. Static components** | Build component tree with placeholder or inline sample data | REQ-001, REQ-002, REQ-003, REQ-004 |
| **3. Interactivity** | Theme toggle, mobile collapsible, photo fallback | REQ-007, REQ-008, REQ-009, REQ-010 |
| **4. YAML integration** | Schema, types, loader, wire all sections | REQ-012, REQ-013, REQ-014 |
| **5. Build & deploy** | Vite `base`, GitHub Actions, verify live site | REQ-015, REQ-016, REQ-017, REQ-018 |

---

## 8. Out of scope (for now)

- In-browser CV editor / admin UI
- Multiple CV profiles or routing
- PDF export beyond browser print (**REQ-011** covers print stylesheet only)
- i18n / multi-language CV content
- Backend or database
- Replacing or removing `HTMLTemplate/` (keep as reference per **REQ-019**)

---

## 9. Acceptance criteria

The project is complete when:

1. **REQ-001** through **REQ-019** are satisfied.
2. Changing `cv.yaml` and rebuilding updates all visible CV content.
3. `npm run build` in `cv-builder/` produces a static `dist/` that matches the HTML template visually on desktop, mobile, and print preview.
4. GitHub Pages serves the built site with working assets and theme toggle.
5. A developer can update the CV by editing YAML and redeploying, without touching React components.

---

## 10. Open decisions

Record choices here as they are made during implementation:

| Topic | Options | Decision |
|-------|---------|----------|
| YAML load strategy | Build-time import vs runtime fetch | _TBD_ |
| GitHub Pages URL type | Project pages (`/repo-name/`) vs user pages (`/`) | _TBD_ |
| Empty sections | Hide section vs show empty heading | _TBD_ |
| Theme overrides in YAML | Support `theme.light` / `theme.dark` or CSS-only | _TBD_ |
| Photo asset path | Relative in `public/` vs absolute URL | _TBD_ |
