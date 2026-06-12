import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2'
import type { IconType } from 'react-icons'
import type { Contact } from '../types/cv'
import { githubDisplay, isUrl, linkedinDisplay } from '../utils/assetUrl'

interface ContactListProps {
  contact: Contact
}

const contactIcons: Record<'email' | 'location' | 'phone' | 'linkedin' | 'github', IconType> = {
  email: HiEnvelope,
  location: HiMapPin,
  phone: HiPhone,
  linkedin: FaLinkedin,
  github: FaGithub,
}

function ContactIcon({ name }: { name: keyof typeof contactIcons }) {
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

export function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      <li>
        <ContactIcon name="email" />
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      {contact.phone && (
        <li>
          <ContactIcon name="phone" />
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
        </li>
      )}
      <li>
        <ContactIcon name="location" />
        <span>{contact.location}</span>
      </li>
      {contact.linkedin && (
        <li>
          <ContactIcon name="linkedin" />
          {isUrl(contact.linkedin) ? (
            <ExternalLink href={contact.linkedin}>
              {linkedinDisplay(contact.linkedin)}
            </ExternalLink>
          ) : (
            <span>{contact.linkedin}</span>
          )}
        </li>
      )}
      {contact.github && (
        <li>
          <ContactIcon name="github" />
          {isUrl(contact.github) ? (
            <ExternalLink href={contact.github}>
              {githubDisplay(contact.github)}
            </ExternalLink>
          ) : (
            <span>{contact.github}</span>
          )}
        </li>
      )}
    </ul>
  )
}
