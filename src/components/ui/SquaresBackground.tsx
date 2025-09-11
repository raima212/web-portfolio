import React from 'react'

interface SquaresBackgroundProps {
  className?: string
  size?: number
  gap?: number
  color?: string
  opacity?: number
}

export const SquaresBackground: React.FC<SquaresBackgroundProps> = ({
  className = '',
  size = 20,
  gap = 2,
  color = '#6b7280',
  opacity = 0.1
}) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(90deg, ${color} ${gap}px, transparent ${gap}px),
          linear-gradient(${color} ${gap}px, transparent ${gap}px)
        `,
        backgroundSize: `${size + gap}px ${size + gap}px`,
        opacity: opacity
      }}
    />
  )
}

export default SquaresBackground
