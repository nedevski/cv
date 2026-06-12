import type { ExperienceEntry as ExperienceEntryType } from '../types/cv'
import { EntryMeta } from './EntryMeta'

interface ExperienceEntryProps {
  entry: ExperienceEntryType
}

export function ExperienceEntry({ entry }: ExperienceEntryProps) {
  return (
    <article className="entry">
      <header className="entry__header">
        <h3 className="entry__title">{entry.title}</h3>
        <EntryMeta parts={[`${entry.organization}`, entry.period]} />
      </header>
      {entry.highlights.length > 0 && (
        <ul className="entry__list">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
