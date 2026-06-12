import { useCallback, useEffect } from 'react'
import type { ThemeMode } from '../types/site'

const STORAGE_KEY = 'cv-theme'

function getPreferredTheme(defaultMode: ThemeMode): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return defaultMode
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function useTheme(defaultMode: ThemeMode) {
  useEffect(() => {
    applyTheme(getPreferredTheme(defaultMode))
  }, [defaultMode])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme')
    applyTheme(current === 'dark' ? 'light' : 'dark')
  }, [])

  return { toggleTheme }
}
