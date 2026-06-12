import type { EducationEntry as EducationEntryType } from '../types/cv'
import { EntryMeta } from './EntryMeta'

interface EducationEntryProps {
  entry: EducationEntryType
}

export function EducationEntry({ entry }: EducationEntryProps) {
  return (
    <article className="entry entry--compact">
      <h3 className="entry__title">{entry.degree}</h3>
      <EntryMeta parts={[entry.institution, entry.period]} />
    </article>
  )
}
