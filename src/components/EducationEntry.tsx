import type { EducationEntry as EducationEntryType } from '../types/cv'

interface EducationEntryProps {
  entry: EducationEntryType
}

export function EducationEntry({ entry }: EducationEntryProps) {
  return (
    <article className="entry entry--compact entry--education">
      <h3 className="entry__title">{entry.degree}</h3>
      <span className="entry__meta">{entry.institution}</span>
      <span className="entry__meta entry__meta--period">{entry.period}</span>
    </article>
  )
}
