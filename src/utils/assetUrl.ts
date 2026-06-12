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
