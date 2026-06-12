import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import yaml from 'js-yaml'
import type { Plugin, ResolvedConfig } from 'vite'

const OG_IMAGE = 'social-preview.jpg'
const DEFAULT_PHOTO = 'avatar.jpg'

interface SocialPreview {
  title: string
  description: string
  url: string
  imageUrl: string
  photoPath: string | null
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null
}

function trimString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function firstSummaryLine(summary: string): string {
  const line = summary
    .split('\n')
    .map((part) => part.trim())
    .find(Boolean)

  return line ?? ''
}

function joinUrl(baseUrl: string, pathname: string): string {
  const base = baseUrl.replace(/\/$/, '')
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}

function resolveSiteUrl(data: Record<string, unknown>): string {
  const general = asRecord(data.general)
  const contact = asRecord(data.contact)

  const fromGeneral = trimString(general?.url)
  if (fromGeneral) {
    return fromGeneral.replace(/\/$/, '')
  }

  const fromContact = trimString(contact?.website)
  if (fromContact) {
    return fromContact.replace(/\/$/, '')
  }

  return ''
}

function resolvePhotoPath(root: string, photoRef: string): string | null {
  if (photoRef.startsWith('http://') || photoRef.startsWith('https://')) {
    return null
  }

  const filename = photoRef.replace(/^\.\//, '').replace(/^data\//, '')
  const photoPath = resolve(root, 'data', filename)

  if (existsSync(photoPath)) {
    return photoPath
  }

  const fallbackPath = resolve(root, 'data', DEFAULT_PHOTO)
  return existsSync(fallbackPath) ? fallbackPath : null
}

function loadSocialPreview(root: string, basePath: string): SocialPreview {
  const cvPath = resolve(root, 'data/cv.yaml')
  const parsed = yaml.load(readFileSync(cvPath, 'utf8'))
  const data = asRecord(parsed)

  if (!data) {
    throw new Error('CV data must be an object')
  }

  const general = asRecord(data.general)
  const profile = asRecord(data.profile)

  const title = trimString(general?.title) || 'CV'
  const summary = trimString(profile?.summary)
  const description = firstSummaryLine(summary) || trimString(profile?.title) || title
  const siteUrl = resolveSiteUrl(data)

  const photoRef = trimString(profile?.photo) || DEFAULT_PHOTO
  const isRemotePhoto =
    photoRef.startsWith('http://') || photoRef.startsWith('https://')

  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const imagePath = `${normalizedBase}${OG_IMAGE}`.replace(/\/{2,}/g, '/')

  const imageUrl = isRemotePhoto
    ? photoRef
    : siteUrl
      ? joinUrl(siteUrl, imagePath)
      : imagePath

  const photoPath = isRemotePhoto ? null : resolvePhotoPath(root, photoRef)

  return {
    title,
    description,
    url: siteUrl || imagePath,
    imageUrl,
    photoPath,
  }
}

function injectSocialMeta(html: string, preview: SocialPreview): string {
  const tags = [
    `<meta name="description" content="${escapeAttr(preview.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeAttr(preview.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(preview.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(preview.url)}" />`,
    `<meta property="og:image" content="${escapeAttr(preview.imageUrl)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeAttr(preview.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(preview.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(preview.imageUrl)}" />`,
  ].join('\n    ')

  if (html.includes('</head>')) {
    return html.replace('</head>', `    ${tags}\n  </head>`)
  }

  return `${tags}\n${html}`
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

export function socialPreviewPlugin(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'social-preview',
    configResolved(resolved) {
      config = resolved
    },
    transformIndexHtml(html) {
      const preview = loadSocialPreview(config.root, config.base)
      return injectSocialMeta(html, preview)
    },
    closeBundle() {
      const preview = loadSocialPreview(config.root, config.base)

      if (!preview.photoPath) {
        return
      }

      const outputPath = join(config.root, config.build.outDir, OG_IMAGE)
      copyFileSync(preview.photoPath, outputPath)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const base = server.config.base
        const requestPath = req.url?.split('?')[0] ?? ''
        const expectedPath = `${base}${OG_IMAGE}`.replace(/\/{2,}/g, '/')

        if (requestPath !== expectedPath && requestPath !== `/${OG_IMAGE}`) {
          next()
          return
        }

        const preview = loadSocialPreview(server.config.root, server.config.base)

        if (!preview.photoPath) {
          next()
          return
        }

        res.setHeader('Content-Type', 'image/jpeg')
        res.end(readFileSync(preview.photoPath))
      })
    },
  }
}
