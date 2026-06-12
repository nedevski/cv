import type { CertificationEntry as CertificationEntryType } from '../types/cv'
import { EntryMeta } from './EntryMeta'

interface CertificationEntryProps {
  entry: CertificationEntryType
}

export function CertificationEntry({ entry }: CertificationEntryProps) {
  const metaParts = [
    entry.issuer,
    entry.year ?? null,
    entry.verifyUrl ? (
      <a href={entry.verifyUrl} target="_blank" rel="noopener noreferrer">
        {entry.verifyLabel ?? 'Verify credential'}
      </a>
    ) : null,
  ]

  return (
    <article className="entry entry--compact">
      <h3 className="entry__title">
        {entry.url ? (
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {entry.title}
          </a>
        ) : (
          entry.title
        )}
      </h3>
      <EntryMeta parts={metaParts} />
    </article>
  )
}
