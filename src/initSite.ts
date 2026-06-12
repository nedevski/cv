import { resolveAssetUrl } from './utils/assetUrl'
import type { GeneralConfig } from './types/cv'

export function initSite(site: GeneralConfig): void {
  const root = document.documentElement
  root.setAttribute('data-color-theme', site.theme)
  root.setAttribute('data-theme', site.mode)

  document.title = site.title

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  link.href = resolveAssetUrl(site.favicon)
}
