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
      ctx.lineWidth = 0.5
      ctx.lineCap = 'round'
    }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize)
          const squareY = y - (gridOffset.current.y % squareSize)

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(squareX, squareY, squareSize, squareSize)
          }

          ctx.strokeStyle = borderColor
          ctx.strokeRect(squareX + 0.25, squareY + 0.25, squareSize - 0.5, squareSize - 0.5)
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      gradient.addColorStop(1, '#060010')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const updateAnimation = () => {
      const animSpeed = Math.max(speed, 0.1)
      
      switch (direction) {
        case 'right':
          gridOffset.current.x -= animSpeed
          if (gridOffset.current.x < 0) gridOffset.current.x += squareSize
          break
        case 'left':
          gridOffset.current.x += animSpeed
          if (gridOffset.current.x >= squareSize) gridOffset.current.x -= squareSize
          break
        case 'up':
          gridOffset.current.y += animSpeed
          if (gridOffset.current.y >= squareSize) gridOffset.current.y -= squareSize
          break
        case 'down':
          gridOffset.current.y -= animSpeed
          if (gridOffset.current.y < 0) gridOffset.current.y += squareSize
          break
        case 'diagonal':
          gridOffset.current.x -= animSpeed
          gridOffset.current.y -= animSpeed
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

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

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
