import type { CSSProperties } from 'react'
import type { LanguageEntry } from '../types/cv'

interface LanguageListProps {
  languages: LanguageEntry[]
}

export function LanguageList({ languages }: LanguageListProps) {
  return (
    <ul className="lang-list">
      {languages.map((language) => (
        <li key={language.name} className="lang-item">
          <div className="lang-item__header">
            <span className="lang-item__name">{language.name}</span>
            <span className="lang-item__level">{language.level}</span>
          </div>
          <div className="lang-bar" aria-hidden="true">
            <span
              className="lang-bar__fill"
              style={{ '--level': `${language.proficiency}%` } as CSSProperties}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
