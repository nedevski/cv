/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string
  readonly VITE_UMAMI_WEBSITE_ID?: string
  readonly VITE_UMAMI_DOMAINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.yaml?raw' {
  const content: string
  export default content
}
