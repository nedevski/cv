import { useState } from 'react'
import { resolveAssetUrl } from '../utils/assetUrl'

interface PhotoProps {
  src?: string | null
  alt: string
  initials: string
}

export function Photo({ src, alt, initials }: PhotoProps) {
  const resolvedSrc = src ? resolveAssetUrl(src) : null
  const [loaded, setLoaded] = useState(false)
  const [prevSrc, setPrevSrc] = useState(resolvedSrc)

  if (resolvedSrc !== prevSrc) {
    setPrevSrc(resolvedSrc)
    setLoaded(false)
  }

  if (!resolvedSrc) {
    return (
      <div className="photo cv-header__photo">
        <div className="photo__frame">
          <span className="photo__initials" aria-hidden="true">
            {initials}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="photo cv-header__photo">
      <div className={`photo__frame${loaded ? ' photo__frame--loaded' : ''}`}>
        <img
          key={resolvedSrc}
          src={resolvedSrc}
          alt={alt}
          className="photo__img"
          onLoad={(event) => {
            const image = event.currentTarget
            setLoaded(image.naturalWidth > 0)
          }}
          onError={() => setLoaded(false)}
        />
        <span className="photo__initials" aria-hidden="true">
          {initials}
        </span>
      </div>
    </div>
  )
}
