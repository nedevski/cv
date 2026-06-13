import { useRef } from 'react'
import type { ProjectEntry as ProjectEntryType } from '../types/cv'
import { useInView } from '../hooks/useInView'
import { ChipList } from './ChipList'
import { EntryMeta } from './EntryMeta'

interface ProjectEntryProps {
  entry: ProjectEntryType
}

export function ProjectEntry({ entry }: ProjectEntryProps) {
  const entryRef = useRef<HTMLElement>(null)
  const isInView = useInView(entryRef, { threshold: 0 })
  const metaParts = [
    entry.period ?? null,
    entry.client ?? null,
    entry.url ? (
      <a href={entry.url} target="_blank" rel="noopener noreferrer">
        {entry.urlLabel ?? entry.url}
      </a>
    ) : null,
  ]

  return (
    <article ref={entryRef} className={`entry${isInView ? ' is-in-view' : ''}`}>
      <div className="entry__header">
        <h3 className="entry__title">{entry.title}</h3>
        <EntryMeta parts={metaParts} />
      </div>
      {entry.description && <p className="entry__text">{entry.description}</p>}
      {entry.highlights.length > 0 && (
        <ul className="entry__list">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {entry.technologies && entry.technologies.length > 0 && (
        <ChipList items={entry.technologies} variant="tech" ariaLabel="Technologies used" />
      )}
    </article>
  )
}
