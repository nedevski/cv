interface ChipListProps {
  items: string[]
  variant?: 'default' | 'tech'
  ariaLabel?: string
}

export function ChipList({ items, variant = 'default', ariaLabel }: ChipListProps) {
  if (items.length === 0) return null

  const className = variant === 'tech' ? 'chip-list chip-list--tech' : 'chip-list'

  return (
    <ul className={className} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}
