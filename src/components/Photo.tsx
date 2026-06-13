import { useState } from 'react'
import { resolveAssetUrl } from '../utils/assetUrl'

interface PhotoProps {
  src?: string | null
  alt: string
  initials: string
}

type PhotoLoadState = 'loading' | 'loaded' | 'failed'

export function Photo({ src, alt, initials }: PhotoProps) {
  const resolvedSrc = src ? resolveAssetUrl(src) : null
  const [loadState, setLoadState] = useState<PhotoLoadState>('loading')
  const [prevSrc, setPrevSrc] = useState(resolvedSrc)

  if (resolvedSrc !== prevSrc) {
    setPrevSrc(resolvedSrc)
    setLoadState('loading')
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

  const showInitials = loadState === 'failed'

  return (
    <div className="photo cv-header__photo">
      <div
        className={`photo__frame${loadState === 'loaded' ? ' photo__frame--loaded' : ''}`}
      >
        {loadState !== 'failed' && (
          <img
            key={resolvedSrc}
            src={resolvedSrc}
            alt={alt}
            className="photo__img"
            onLoad={(event) => {
              const image = event.currentTarget
              setLoadState(image.naturalWidth > 0 ? 'loaded' : 'failed')
            }}
            onError={() => setLoadState('failed')}
          />
        )}
        {showInitials && (
          <span className="photo__initials" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
    </div>
  )
}
