export function resolveAssetUrl(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/')
  ) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path}`
}

export function linkDisplay(url: string): string {
  try {
    const parsed = new URL(url)
    return `${parsed.host}${parsed.pathname.replace(/\/$/, '')}`
  } catch {
    return url
  }
}

export function isUrl(value: string): boolean {
  return value.startsWith('http://') || value.startsWith('https://')
}

export function linkedinDisplay(value: string): string {
  if (!isUrl(value)) {
    return value
  }

  try {
    return new URL(value).pathname.replace(/^\/|\/$/g, '')
  } catch {
    return value
  }
}

export function githubDisplay(value: string): string {
  if (!isUrl(value)) {
    return value
  }

  try {
    const segment = new URL(value).pathname.split('/').filter(Boolean)[0]
    return segment ?? value
  } catch {
    return value
  }
}
