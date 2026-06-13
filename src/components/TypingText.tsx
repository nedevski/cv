import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypingText({ text, className, speed = 30, delay = 200 }: TypingTextProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [displayed, setDisplayed] = useState(reducedMotion ? text : '')
  const [done, setDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed('')
    setDone(false)

    let intervalId = 0
    const timeoutId = window.setTimeout(() => {
      let index = 0
      intervalId = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [text, speed, delay, reducedMotion])

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      {!done && <span className="typing-cursor" aria-hidden="true" />}
    </p>
  )
}
