import { useRef, useState, type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { useMediaQuery } from '../hooks/useMediaQuery'

const MOBILE_BREAKPOINT = '(max-width: 720px)'

interface CvSectionProps {
  title: string
  children: ReactNode
  contentClassName?: string
}

export function CvSection({ title, children, contentClassName }: CvSectionProps) {
  const headerRef = useRef<HTMLButtonElement>(null)
  const isInView = useInView(headerRef, { threshold: 0 })
  const isTimeline = contentClassName?.includes('timeline') ?? false
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)
  const [collapsed, setCollapsed] = useState(false)
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile)

  if (prevIsMobile !== isMobile) {
    setPrevIsMobile(isMobile)
    setCollapsed(false)
  }

  const expanded = !collapsed

  return (
    <section
      className={`cv-section${isInView ? ' is-in-view' : ''}`}
      data-collapsible
      {...(collapsed ? { 'data-collapsed': true } : {})}
    >
      <button
        ref={headerRef}
        type="button"
        className="cv-section__toggle"
        aria-expanded={expanded}
        onClick={() => {
          if (!isMobile) return
          setCollapsed((value) => !value)
        }}
      >
        <h2 className="cv-section__title">{title}</h2>
        <span className="cv-section__chevron" aria-hidden="true" />
      </button>
      <div
        className={[
          'cv-section__content',
          contentClassName,
          isTimeline && isInView ? 'is-in-view' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </section>
  )
}
