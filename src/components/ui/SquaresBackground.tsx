import React, { useRef, useEffect } from 'react'

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern

interface GridOffset {
  x: number
  y: number
}

interface SquaresBackgroundProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left'
  speed?: number
  borderColor?: CanvasStrokeStyle
  squareSize?: number
  hoverFillColor?: CanvasStrokeStyle
  className?: string
}

const SquaresBackground: React.FC<SquaresBackgroundProps> = ({
  direction = 'right',
  speed = 0.5,
  borderColor = '#6b7280',
  squareSize = 40,
  hoverFillColor = '#374151',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const numSquaresX = useRef<number>(0)
  const numSquaresY = useRef<number>(0)
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 })
  const hoveredSquareRef = useRef<GridOffset | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Enable anti-aliasing and smoothing
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 0.5
    }

    const resizeCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      
      // Scale the drawing context so everything draws at the correct size
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio)
      }
      
      // Set display size (CSS pixels)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      
      numSquaresX.current = Math.ceil(rect.width / squareSize) + 2
      numSquaresY.current = Math.ceil(rect.height / squareSize) + 2
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Calculate smooth offset with sub-pixel precision
      const smoothOffsetX = gridOffset.current.x % squareSize
      const smoothOffsetY = gridOffset.current.y % squareSize

      // Calculate starting positions with proper offset
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize - smoothOffsetX
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize - smoothOffsetY

      // Draw grid with anti-aliasing
      for (let x = startX; x < rect.width + squareSize; x += squareSize) {
        for (let y = startY; y < rect.height + squareSize; y += squareSize) {
          const squareX = x
          const squareY = y

          // Check for hovered square
          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(squareX, squareY, squareSize, squareSize)
          }

          // Draw grid lines with smooth rendering
          ctx.strokeStyle = borderColor
          ctx.strokeRect(squareX + 0.25, squareY + 0.25, squareSize - 0.5, squareSize - 0.5)
        }
      }

      // Apply subtle gradient overlay
      const gradient = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        0,
        rect.width / 2,
        rect.height / 2,
        Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      gradient.addColorStop(1, 'rgba(6, 0, 16, 0.3)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1)
      
      // Use smooth animation with proper modulo handling
      switch (direction) {
        case 'right':
          gridOffset.current.x -= effectiveSpeed
          if (gridOffset.current.x < 0) gridOffset.current.x += squareSize
          break
        case 'left':
          gridOffset.current.x += effectiveSpeed
          if (gridOffset.current.x >= squareSize) gridOffset.current.x -= squareSize
          break
        case 'up':
          gridOffset.current.y += effectiveSpeed
          if (gridOffset.current.y >= squareSize) gridOffset.current.y -= squareSize
          break
        case 'down':
          gridOffset.current.y -= effectiveSpeed
          if (gridOffset.current.y < 0) gridOffset.current.y += squareSize
          break
        case 'diagonal':
          gridOffset.current.x -= effectiveSpeed
          gridOffset.current.y -= effectiveSpeed
          if (gridOffset.current.x < 0) gridOffset.current.x += squareSize
          if (gridOffset.current.y < 0) gridOffset.current.y += squareSize
          break
        default:
          break
      }

      drawGrid()
      requestRef.current = requestAnimationFrame(updateAnimation)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Calculate smooth offset
      const smoothOffsetX = gridOffset.current.x % squareSize
      const smoothOffsetY = gridOffset.current.y % squareSize
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize - smoothOffsetX
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize - smoothOffsetY

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize)
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize)

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY }
      }
    }

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    requestRef.current = requestAnimationFrame(updateAnimation)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [direction, speed, borderColor, hoverFillColor, squareSize])

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full border-none block ${className}`}
    />
  )
}

export default SquaresBackground
