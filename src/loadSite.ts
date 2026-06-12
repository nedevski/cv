import yaml from 'js-yaml'
import siteYaml from '../data/site.yaml?raw'
import {
  COLOR_THEMES,
  THEME_MODES,
  type ColorTheme,
  type SiteConfig,
  type ThemeMode,
} from './types/site'

function parseColorTheme(value: unknown): ColorTheme {
  if (typeof value === 'string' && COLOR_THEMES.includes(value as ColorTheme)) {
    return value as ColorTheme
  }

  return 'orange'
}

function parseThemeMode(value: unknown): ThemeMode {
  if (typeof value === 'string' && THEME_MODES.includes(value as ThemeMode)) {
    return value as ThemeMode
  }

  return 'dark'
}

function assertSiteConfig(data: unknown): asserts data is Record<string, unknown> {
  if (!data || typeof data !== 'object') {
    throw new Error('Site config must be an object')
  }
}

export function loadSite(): SiteConfig {
  const parsed = yaml.load(siteYaml)
  assertSiteConfig(parsed)

  const title = parsed.title
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Site config must include a non-empty title')
  }

  const favicon = parsed.favicon
  if (typeof favicon !== 'string' || !favicon.trim()) {
    throw new Error('Site config must include a favicon path')
  }

  return {
    title: title.trim(),
    favicon: favicon.trim(),
    theme: parseColorTheme(parsed.theme),
    mode: parseThemeMode(parsed.mode),
  }
}

export const siteConfig = loadSite()
