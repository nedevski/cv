import type { Profile } from '../types/cv'
import { deriveInitials } from '../utils/initials'
import { Photo } from './Photo'
import { ThemeToggle } from './ThemeToggle'

interface CvHeaderProps {
  profile: Profile
  onToggleTheme: () => void
}

export function CvHeader({ profile, onToggleTheme }: CvHeaderProps) {
  const initials = profile.initials ?? deriveInitials(profile.name)

  return (
    <header className="cv-header">
      <div className="cv-header__identity">
        <Photo src={profile.photo} alt={profile.name} initials={initials} />

        <div className="cv-header__intro">
          <h1 className="cv-header__name">{profile.name}</h1>
          <p className="cv-header__title">{profile.title}</p>
        </div>

        <ThemeToggle onToggle={onToggleTheme} />
      </div>

      <p className="cv-header__summary">{profile.summary}</p>
    </header>
  )
}
