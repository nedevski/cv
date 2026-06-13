import type { GeneralConfig, Profile } from '../types/cv'

interface CvFooterProps {
  general: GeneralConfig
  profile: Profile
}

export function CvFooter({ general, profile }: CvFooterProps) {
  const year = new Date().getFullYear()
  const repository = general.repository

  return (
    <footer className="cv-footer">
      <p className="cv-footer__text">
        &copy; {year} {profile.name}
        {repository && (
          <>
            {' · '}
            Powered by <a href={repository}>Github Pages</a>
          </>
        )}
      </p>
    </footer>
  )
}
