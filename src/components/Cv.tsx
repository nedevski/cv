import type { CvData } from '../types/cv'
import { CertificationEntry } from './CertificationEntry'
import { ChipList } from './ChipList'
import { ContactList } from './ContactList'
import { CvFooter } from './CvFooter'
import { CvHeader } from './CvHeader'
import { CvSection } from './CvSection'
import { EducationEntry } from './EducationEntry'
import { ExperienceEntry } from './ExperienceEntry'
import { LanguageList } from './LanguageList'
import { ProjectEntry } from './ProjectEntry'

interface CvProps {
  data: CvData
  onToggleTheme: () => void
}

export function Cv({ data, onToggleTheme }: CvProps) {
  const experience = data.experience ?? []
  const projects = data.projects ?? []
  const personalProjects = data.personalProjects ?? []
  const certifications = data.certifications ?? []
  const education = data.education ?? []
  const languages = data.languages ?? []
  const hobbies = data.hobbies ?? []

  return (
    <div className="cv">
      <CvHeader profile={data.profile} onToggleTheme={onToggleTheme} />

      <main className="cv-main">
        <div className="cv-page cv-page--columns">
          <div className="cv-column cv-column--primary">
            {experience.length > 0 && (
              <CvSection title="Experience" contentClassName="timeline">
                {experience.map((entry) => (
                  <ExperienceEntry key={`${entry.title}-${entry.organization}-${entry.period}`} entry={entry} />
                ))}
              </CvSection>
            )}

          </div>

          <aside className="cv-column cv-column--secondary">
            <CvSection title="Contact">
              <ContactList contact={data.contact} />
            </CvSection>

            {education.length > 0 && (
              <CvSection title="Education">
                {education.map((entry) => (
                  <EducationEntry key={`${entry.degree}-${entry.institution}`} entry={entry} />
                ))}
              </CvSection>
            )}

            {languages.length > 0 && (
              <CvSection title="Languages">
                <LanguageList languages={languages} />
              </CvSection>
            )}

            {hobbies.length > 0 && (
              <CvSection title="Hobbies">
                <ChipList items={hobbies} />
              </CvSection>
            )}
          </aside>
        </div>

        <div className="cv-page cv-page--full">
          {projects.length > 0 && (
            <CvSection title="Projects" contentClassName="timeline">
              {projects.map((entry) => (
                <ProjectEntry key={`${entry.title}-${entry.period ?? ''}`} entry={entry} />
              ))}
            </CvSection>
          )}

          {personalProjects.length > 0 && (
            <CvSection title="Personal Projects" contentClassName="timeline timeline--compact">
              {personalProjects.map((entry) => (
                <ProjectEntry key={`${entry.title}-${entry.period ?? ''}`} entry={entry} />
              ))}
            </CvSection>
          )}

          {certifications.length > 0 && (
            <CvSection title="Certifications" contentClassName="timeline">
              {certifications.map((entry) => (
                <CertificationEntry key={`${entry.title}-${entry.issuer}`} entry={entry} />
              ))}
            </CvSection>
          )}
        </div>
      </main>

      <CvFooter general={data.general} profile={data.profile} />
    </div>
  )
}
