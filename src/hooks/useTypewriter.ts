import { useState, useEffect } from 'react'

export const useTypewriter = (text: string, speed: number = 50, delay: number = 0): [string, boolean] => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Reset when text changes
  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setIsComplete(false)
    setHasStarted(false)
  }, [text])

  useEffect(() => {
    if (delay > 0 && !hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(startTimeout)
    }
    
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      
      return () => clearTimeout(timeout)
    } else if (hasStarted && currentIndex >= text.length) {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed, delay, hasStarted])

  return [displayText, isComplete]
}
