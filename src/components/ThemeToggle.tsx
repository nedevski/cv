interface ThemeToggleProps {
  onToggle: () => void
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle light and dark mode"
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        ☀
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        ☾
      </span>
    </button>
  )
}
