# CV Template

A minimal, print-friendly HTML5 CV with light/dark mode and mobile collapsible sections.

## Usage

1. Open `index.html` in a browser, or serve locally:
   ```bash
   npx serve .
   ```
2. Replace placeholder text with your details.
3. Set your photo path on the `<img class="photo__img">` in `index.html` (e.g. `photo2.jpg`). If the image fails to load, initials are shown inside the same circle.
4. Print via **Ctrl+P** / **Cmd+P** — layout stays two-column and all sections expand automatically.

## Files

| File | Purpose |
|------|---------|
| `index.html` | CV structure and content |
| `styles.css` | Layout, theming, responsive & print styles |
| `script.js` | Theme toggle and mobile accordion |

## Customization

- Edit CSS variables in `:root` inside `styles.css`:
  - `--color-primary` / `--color-secondary` — accent colors for titles, bars, and chips
  - `--bg`, `--surface`, `--text` — base palette
- Language proficiency bars use `--level` on each `.lang-bar__fill` (e.g. `style="--level: 80%"`).
- Column ratio is controlled by `grid-template-columns: 1.65fr 1fr` on `.cv-main`.
