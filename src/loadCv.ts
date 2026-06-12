import yaml from 'js-yaml'
import cvYaml from './data/cv.yaml?raw'
import type { CvData } from './types/cv'

const DEFAULT_PHOTO = 'avatar.jpg'

const dataImages = import.meta.glob<string>('./data/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function assertCvData(data: unknown): asserts data is CvData {
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
  return `./data/${normalized}`
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

  return {
    ...parsed,
    profile: {
      ...parsed.profile,
      photo: resolvePhoto(parsed.profile.photo),
    },
  }
}
