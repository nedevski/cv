import type { Contact } from '../types/cv'
import { isUrl, linkDisplay } from '../utils/assetUrl'

interface ContactListProps {
  contact: Contact
}

function ExternalLink({ value }: { value: string }) {
  if (isUrl(value)) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {linkDisplay(value)}
      </a>
    )
  }

  return <span>{value}</span>
}

export function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      <li>
        <span className="contact-list__label">Email</span>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      {contact.phone && (
        <li>
          <span className="contact-list__label">Phone</span>
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
        </li>
      )}
      <li>
        <span className="contact-list__label">Location</span>
        {contact.location}
      </li>
      {contact.linkedin && (
        <li>
          <span className="contact-list__label">LinkedIn</span>
          <ExternalLink value={contact.linkedin} />
        </li>
      )}
      {contact.github && (
        <li>
          <span className="contact-list__label">GitHub</span>
          <ExternalLink value={contact.github} />
        </li>
      )}
    </ul>
  )
}
