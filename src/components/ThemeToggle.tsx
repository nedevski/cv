import { HiMoon, HiSun } from 'react-icons/hi2'

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
      <HiSun className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
      <HiMoon className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
    </button>
  )
}
