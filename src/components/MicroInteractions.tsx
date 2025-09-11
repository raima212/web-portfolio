import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'

// Hover Scale Animation
interface HoverScaleProps {
  children: ReactNode
  scale?: number
  className?: string
  onClick?: () => void
}

export const HoverScale = ({ children, scale = 1.05, className = '', onClick }: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Magnetic Effect
interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export const Magnetic = ({ children, strength = 0.3, className = '' }: MagneticProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating Animation
interface FloatingProps {
  children: ReactNode
  intensity?: number
  speed?: number
  className?: string
}

export const Floating = ({ children, intensity = 10, speed = 2, className = '' }: FloatingProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -intensity, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Glow Effect
interface GlowProps {
  children: ReactNode
  color?: string
  intensity?: number
  className?: string
}

export const Glow = ({ children, color = '#10b981', intensity = 0.5, className = '' }: GlowProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        filter: isHovered ? `drop-shadow(0 0 ${intensity * 20}px ${color})` : 'none',
        transition: 'filter 0.3s ease'
      }}
    >
      {children}
    </motion.div>
  )
}

// Typewriter Cursor
interface TypewriterCursorProps {
  isTyping?: boolean
  className?: string
}

export const TypewriterCursor = ({ isTyping = true, className = '' }: TypewriterCursorProps) => {
  return (
    <motion.span
      animate={{ opacity: isTyping ? [1, 0] : 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className={`text-green-400 ${className}`}
    >
      |
    </motion.span>
  )
}

// Stagger Animation
interface StaggerProps {
  children: ReactNode[]
  delay?: number
  className?: string
}

export const Stagger = ({ children, delay = 0.1, className = '' }: StaggerProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Ripple Effect
interface RippleProps {
  children: ReactNode
  color?: string
  className?: string
  onClick?: () => void
}

export const Ripple = ({ children, color = '#10b981', className = '', onClick }: RippleProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { x, y, id: Date.now() }
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }
  
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
            opacity: 0.3
          }}
          initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
          animate={{ width: 100, height: 100 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

// Parallax Scroll
interface ParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export const Parallax = ({ children, offset = 50, className = '' }: ParallaxProps) => {
  const y = useMotionValue(0)
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 })
  const yTransform = useTransform(ySpring, [-1, 1], [-offset, offset])
  
  return (
    <motion.div
      style={{ y: yTransform }}
      onViewportEnter={() => y.set(1)}
      onViewportLeave={() => y.set(0)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Shake Animation
interface ShakeProps {
  children: ReactNode
  trigger?: boolean
  intensity?: number
  className?: string
}

export const Shake = ({ children, trigger = false, intensity = 10, className = '' }: ShakeProps) => {
  return (
    <motion.div
      animate={trigger ? {
        x: [0, -intensity, intensity, -intensity, intensity, 0]
      } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Pulse Animation
interface PulseProps {
  children: ReactNode
  scale?: number
  duration?: number
  className?: string
}

export const Pulse = ({ children, scale = 1.1, duration = 2, className = '' }: PulseProps) => {
  return (
    <motion.div
      animate={{ scale: [1, scale, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Gradient Border
interface GradientBorderProps {
  children: ReactNode
  colors?: string[]
  className?: string
}

export const GradientBorder = ({ 
  children, 
  colors = ['#10b981', '#3b82f6', '#8b5cf6'], 
  className = '' 
}: GradientBorderProps) => {
  return (
    <div
      className={`relative p-[2px] rounded-lg ${className}`}
      style={{
        background: `linear-gradient(45deg, ${colors.join(', ')})`
      }}
    >
      <div className="bg-gray-900 rounded-lg">
        {children}
      </div>
    </div>
  )
}

// Text Reveal Animation
interface TextRevealProps {
  text: string
  delay?: number
  className?: string
}

export const TextReveal = ({ text, delay = 0.05, className = '' }: TextRevealProps) => {
  const words = text.split(' ')
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * delay, duration: 0.5 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

