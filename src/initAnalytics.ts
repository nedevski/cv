const UMAMI_SCRIPT_URL = 'https://analytics.nedevski.com/script.js'

export function initAnalytics(): void {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
  if (!websiteId) return

  const script = document.createElement('script')
  script.defer = true
  script.src = UMAMI_SCRIPT_URL
  script.setAttribute('data-website-id', websiteId)
  script.setAttribute('data-exclude-search', 'true')
  script.setAttribute('data-exclude-hash', 'true')

  const domains = import.meta.env.VITE_UMAMI_DOMAINS
  if (domains) {
    script.setAttribute('data-domains', domains)
  }

  document.head.appendChild(script)
}
