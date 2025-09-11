import React, { useState, useEffect } from 'react'

interface TextTypeProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export const TextType: React.FC<TextTypeProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete
}) => {
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
      onComplete?.()
    }
  }, [currentIndex, text, speed, delay, hasStarted, onComplete])

  return (
    <span className={className}>
      {displayText}
      {!isComplete && displayText && (
        <span className="animate-pulse">|</span>
      )}
      {!displayText && !hasStarted && (
        <span style={{ visibility: 'hidden' }}>{text}</span>
      )}
    </span>
  )
}

export default TextType
