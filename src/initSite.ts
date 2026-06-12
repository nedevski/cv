import { resolveAssetUrl } from './utils/assetUrl'
import type { SiteConfig } from './types/site'

export function initSite(site: SiteConfig): void {
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
