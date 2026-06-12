import { useCallback, useEffect } from 'react'

const STORAGE_KEY = 'cv-theme'

type Theme = 'light' | 'dark'

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function useTheme() {
  useEffect(() => {
    applyTheme(getPreferredTheme())
  }, [])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme')
    applyTheme(current === 'dark' ? 'light' : 'dark')
  }, [])

  return { toggleTheme }
}
