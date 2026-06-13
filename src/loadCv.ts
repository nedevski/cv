import yaml from 'js-yaml'
import cvYaml from '../data/cv.yaml?raw'
import {
  COLOR_THEMES,
  THEME_MODES,
  type ColorTheme,
  type ThemeMode,
} from './types/site'
import type { CvData, GeneralConfig } from './types/cv'

const DEFAULT_PHOTO = 'avatar.jpg'

const dataImages = import.meta.glob<string>('../data/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

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

function parseGeneral(data: Record<string, unknown>): GeneralConfig {
  const general = data.general
  if (!general || typeof general !== 'object') {
    throw new Error('CV data must include a general object')
  }

  const raw = general as Record<string, unknown>

  const title = raw.title
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('General config must include a non-empty title')
  }

  const favicon = raw.favicon
  if (typeof favicon !== 'string' || !favicon.trim()) {
    throw new Error('General config must include a favicon path')
  }

  const config: GeneralConfig = {
    title: title.trim(),
    favicon: favicon.trim(),
    theme: parseColorTheme(raw.theme),
    mode: parseThemeMode(raw.mode),
  }

  if (typeof raw.url === 'string' && raw.url.trim()) {
    config.url = raw.url.trim()
  }

  if (typeof raw.repository === 'string' && raw.repository.trim()) {
    config.repository = raw.repository.trim()
  }

  return config
}

function assertCvData(data: unknown): asserts data is Record<string, unknown> {
  if (!data || typeof data !== 'object') {
    throw new Error('CV data must be an object')
  }

  const cv = data as Record<string, unknown>

  if (!cv.profile || typeof cv.profile !== 'object') {
    throw new Error('CV data must include a profile object')
  }

  if (!cv.contact || typeof cv.contact !== 'object') {
    throw new Error('CV data must include a contact object')
  }
}

function dataImageKey(filename: string): string {
  const normalized = filename.replace(/^\.\//, '').replace(/^data\//, '')
  return `../data/${normalized}`
}

function resolvePhoto(photo?: string | null): string {
  const photoRef = photo?.trim() || DEFAULT_PHOTO

  if (photoRef.startsWith('http://') || photoRef.startsWith('https://')) {
    return photoRef
  }

  if (photoRef.startsWith('/')) {
    return photoRef
  }

  const resolved = dataImages[dataImageKey(photoRef)]
  if (resolved) {
    return resolved
  }

  return dataImages[dataImageKey(DEFAULT_PHOTO)] ?? ''
}

export function loadCv(): CvData {
  const parsed = yaml.load(cvYaml)
  assertCvData(parsed)

  const profile = parsed.profile as CvData['profile']

  return {
    ...parsed,
    general: parseGeneral(parsed),
    profile: {
      ...profile,
      photo: resolvePhoto(profile.photo),
    },
  } as CvData
}

export const cvData = loadCv()
