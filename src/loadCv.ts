import yaml from 'js-yaml'
import cvYaml from './data/cv.yaml?raw'
import defaultAvatar from './data/avatar.jpg'
import type { CvData } from './types/cv'

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

function resolvePhoto(photo?: string | null): string {
  if (photo && (photo.startsWith('http://') || photo.startsWith('https://'))) {
    return photo
  }

  return defaultAvatar
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
