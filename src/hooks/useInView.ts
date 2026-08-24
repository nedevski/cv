import { useEffect, useState, type RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

function hasReachedViewport(element: Element): boolean {
  return element.getBoundingClientRect().top <= window.innerHeight
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = '0px', once = true }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (once && hasReachedViewport(element)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight
        const reachedViewport =
          entry.isIntersecting || entry.boundingClientRect.top <= rootBottom

        if (reachedViewport) {
          setInView(true)
          if (once) {
            observer.disconnect()
            window.removeEventListener('scroll', onScroll)
          }
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    const onScroll = () => {
      if (!once || !hasReachedViewport(element)) return
      setInView(true)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }

    observer.observe(element)
    if (once) window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, threshold, rootMargin, once])

  return inView
}
