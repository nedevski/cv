import type { CertificationEntry as CertificationEntryType } from '../types/cv'
import { resolveAssetUrl } from '../utils/assetUrl'
import { EntryMeta } from './EntryMeta'

interface CertificationEntryProps {
  entry: CertificationEntryType
}

export function CertificationEntry({ entry }: CertificationEntryProps) {
  const issuer = (
    <span className="entry__issuer">
      <img src={resolveAssetUrl(entry.icon)} alt="" className="entry__issuer-icon" />
      {entry.issuer}
    </span>
  )

  const metaParts = [
    issuer,
    entry.year ?? null,
    entry.verifyUrl ? (
      <a href={entry.verifyUrl} target="_blank" rel="noopener noreferrer">
        {entry.verifyLabel ?? 'Verify credential'}
      </a>
    ) : null,
  ]

  return (
    <article className="entry entry--compact">
      <h3 className="entry__title">{entry.title}</h3>
      <EntryMeta parts={metaParts} />
    </article>
  )
}
