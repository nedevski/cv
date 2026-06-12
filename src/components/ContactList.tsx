import {
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa6'
import { HiEnvelope, HiGlobeAlt, HiMapPin, HiPhone } from 'react-icons/hi2'
import type { IconType } from 'react-icons'
import type { Contact } from '../types/cv'
import { githubDisplay, isUrl, linkDisplay, linkedinDisplay } from '../utils/assetUrl'

interface ContactListProps {
  contact: Contact
}

const contactIcons = {
  email: HiEnvelope,
  location: HiMapPin,
  phone: HiPhone,
  website: HiGlobeAlt,
  linkedin: FaLinkedin,
  github: FaGithub,
  gitlab: FaGitlab,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
} satisfies Record<string, IconType>

type ContactIconName = keyof typeof contactIcons

function hasValue(value?: string | null): value is string {
  return Boolean(value?.trim())
}

function ContactIcon({ name }: { name: ContactIconName }) {
  const Icon = contactIcons[name]
  return <Icon className="contact-list__icon" aria-hidden="true" />
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function ContactLinkItem({
  name,
  value,
  display = linkDisplay,
}: {
  name: ContactIconName
  value: string
  display?: (value: string) => string
}) {
  const label = display(value)

  return (
    <li>
      <ContactIcon name={name} />
      {isUrl(value) ? (
        <ExternalLink href={value}>{label}</ExternalLink>
      ) : (
        <span>{value}</span>
      )}
    </li>
  )
}

export function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      {hasValue(contact.email) && (
        <li>
          <ContactIcon name="email" />
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
      )}
      {hasValue(contact.phone) && (
        <li>
          <ContactIcon name="phone" />
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
        </li>
      )}
      {hasValue(contact.location) && (
        <li>
          <ContactIcon name="location" />
          <span>{contact.location}</span>
        </li>
      )}
      {hasValue(contact.website) && (
        <ContactLinkItem name="website" value={contact.website} />
      )}
      {hasValue(contact.linkedin) && (
        <ContactLinkItem
          name="linkedin"
          value={contact.linkedin}
          display={linkedinDisplay}
        />
      )}
      {hasValue(contact.github) && (
        <ContactLinkItem
          name="github"
          value={contact.github}
          display={githubDisplay}
        />
      )}
      {hasValue(contact.gitlab) && (
        <ContactLinkItem name="gitlab" value={contact.gitlab} />
      )}
      {hasValue(contact.facebook) && (
        <ContactLinkItem name="facebook" value={contact.facebook} />
      )}
      {hasValue(contact.instagram) && (
        <ContactLinkItem name="instagram" value={contact.instagram} />
      )}
      {hasValue(contact.youtube) && (
        <ContactLinkItem name="youtube" value={contact.youtube} />
      )}
    </ul>
  )
}
