import type { ColorTheme, ThemeMode } from './site'

export interface GeneralConfig {
  title: string
  favicon: string
  theme: ColorTheme
  mode: ThemeMode
  url?: string
  repository?: string
}

export interface Profile {
  name: string
  title: string
  summary: string
  photo?: string | null
  initials?: string | null
}

export interface Contact {
  email?: string | null
  phone?: string | null
  location?: string | null
  website?: string | null
  linkedin?: string | null
  github?: string | null
  gitlab?: string | null
  facebook?: string | null
  instagram?: string | null
  youtube?: string | null
}

export interface ExperienceEntry {
  title: string
  organization: string
  period: string
  highlights: string[]
}

export interface ProjectEntry {
  title: string
  client?: string | null
  period?: string | null
  url?: string | null
  urlLabel?: string | null
  description?: string | null
  highlights: string[]
  technologies?: string[]
}

export interface CertificationEntry {
  title: string
  issuer: string
  year?: string | null
  verifyUrl?: string | null
  verifyLabel?: string | null
}

export interface EducationEntry {
  degree: string
  institution: string
  period: string
}

export interface LanguageEntry {
  name: string
  level: string
  proficiency: number
}

export interface CvData {
  general: GeneralConfig
  profile: Profile
  contact: Contact
  experience?: ExperienceEntry[]
  projects?: ProjectEntry[]
  personalProjects?: ProjectEntry[]
  certifications?: CertificationEntry[]
  education?: EducationEntry[]
  languages?: LanguageEntry[]
  hobbies?: string[]
}
