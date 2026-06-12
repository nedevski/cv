import type { ReactNode } from 'react'

interface EntryMetaProps {
  parts: ReactNode[]
}

export function EntryMeta({ parts }: EntryMetaProps) {
  const visibleParts = parts.filter((part) => part !== null && part !== undefined && part !== false)
  if (visibleParts.length === 0) return null

  return (
    <span className="entry__meta">
      {visibleParts.map((part, index) => (
        <span key={index}>
          {index > 0 ? <span className="entry__meta-sep" aria-hidden="true">•</span> : null}
          {part}
        </span>
      ))}
    </span>
  )
}
