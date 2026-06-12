export const COLOR_THEMES = [
  'orange',
  'blue',
  'green',
  'teal',
  'purple',
  'red',
  'olive',
] as const
export type ColorTheme = (typeof COLOR_THEMES)[number]

export const THEME_MODES = ['light', 'dark'] as const
export type ThemeMode = (typeof THEME_MODES)[number]
