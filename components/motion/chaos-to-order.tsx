'use client'

import { useEffect, useRef } from 'react'

interface ChaosToOrderProps {
  width?: number
  height?: number
  className?: string
}

export function ChaosToOrder({
  width = 400,
  height = 300,
  className = ''
}: ChaosToOrderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())
  const intersectionRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    // Canvas size
    canvas.width = width
    canvas.height = height

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function drawChaos(progress: number) {
      // progress: 0-1 durante 1.5s (0-1.5)
      const t = progress // 0 a 1
      const squareSize = 25
      const gridSize = 6

      // Dispersos aleatoriamente (caótico)
      for (let i = 0; i < gridSize * gridSize; i++) {
        const seed = i * 12345 // Pseudo-random determinístico
        const x = (seed % (width - squareSize)) + Math.sin(t * 10 + i) * 30
        const y = ((seed * 7) % (height - squareSize)) + Math.cos(t * 8 + i) * 30

        ctx.fillStyle = `hsl(15, 95%, ${50 + t * 10}%)`
        ctx.fillRect(x, y, squareSize, squareSize)
      }
    }

    function drawArrowAndCheck(progress: number) {
      // progress: 0-1 durante 0.3s (1.5-1.8)
      const midX = width / 2
      const midY = height / 2

      ctx.globalAlpha = progress * 2 // Fade in

      // Arrow →
      ctx.strokeStyle = `hsl(200, 80%, 50%)`
      ctx.lineWidth = 3
      ctx.lineCap = 'round'

      const arrowX = midX - 20 + progress * 40
      ctx.beginPath()
      ctx.moveTo(midX - 30, midY)
      ctx.lineTo(arrowX, midY)
      ctx.stroke()

      // Arrow head
      ctx.beginPath()
      ctx.moveTo(arrowX, midY)
      ctx.lineTo(arrowX - 8, midY - 8)
      ctx.moveTo(arrowX, midY)
      ctx.lineTo(arrowX - 8, midY + 8)
      ctx.stroke()

      // Checkmark ✓
      ctx.strokeStyle = `hsl(145, 80%, 50%)`
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(midX + 40, midY - 5)
      ctx.lineTo(midX + 50, midY + 5)
      ctx.lineTo(midX + 65, midY - 10)
      ctx.stroke()

      ctx.globalAlpha = 1
    }

    function drawOrder(progress: number) {
      // progress: 0-1 durante 1.5s (1.8-3.3)
      // Transición smooth de caos a orden

      const gridSize = 6
      const squareSize = 25
      const spacing = 15
      const offsetX = (width - (gridSize * (squareSize + spacing))) / 2
      const offsetY = (height - (gridSize * (squareSize + spacing))) / 2

      for (let i = 0; i < gridSize * gridSize; i++) {
        const row = Math.floor(i / gridSize)
        const col = i % gridSize

        // Target position (ordered grid)
        const targetX = offsetX + col * (squareSize + spacing)
        const targetY = offsetY + row * (squareSize + spacing)

        // Source position (chaotic)
        const seed = i * 12345
        const sourceX = (seed % (width - squareSize)) + Math.sin(progress * 10 + i) * 30
        const sourceY = ((seed * 7) % (height - squareSize)) + Math.cos(progress * 8 + i) * 30

        // Lerp between source and target
        const x = sourceX + (targetX - sourceX) * progress
        const y = sourceY + (targetY - sourceY) * progress

        // Color transition: red to green
        const hue = 15 + (145 - 15) * progress
        const lightness = 50 + (55 - 50) * progress
        ctx.fillStyle = `hsl(${hue}, 85%, ${lightness}%)`
        ctx.fillRect(x, y, squareSize, squareSize)
      }
    }

    function animate(timestamp: number) {
      if (prefersReducedMotion) {
        // Show final ordered state
        ctx.clearRect(0, 0, width, height)
        ctx.globalAlpha = 1
        const gridSize = 6
        const offsetX = (width - (gridSize * (25 + 15))) / 2
        const offsetY = (height - (gridSize * (25 + 15))) / 2
        for (let i = 0; i < gridSize * gridSize; i++) {
          const row = Math.floor(i / gridSize)
          const col = i % gridSize
          const x = offsetX + col * 40
          const y = offsetY + row * 40
          ctx.fillStyle = `hsl(145, 85%, 55%)`
          ctx.fillRect(x, y, 25, 25)
        }
        return
      }

      const elapsed = timestamp - startTimeRef.current
      const totalCycle = 3000 // 3 segundos total
      const cycleProgress = (elapsed % totalCycle) / totalCycle

      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = 1

      // Fase 1: Caos (0-1.5s → 0-0.5 del ciclo)
      if (cycleProgress < 0.5) {
        const phaseProgress = cycleProgress / 0.5
        drawChaos(phaseProgress)
      }
      // Fase 2: Transición (1.5-1.8s → 0.5-0.6 del ciclo)
      else if (cycleProgress < 0.6) {
        const phaseProgress = (cycleProgress - 0.5) / 0.1
        drawChaos(1 - phaseProgress * 0.3) // Fade out caos
        drawArrowAndCheck(phaseProgress)
      }
      // Fase 3: Orden (1.8-3.3s → 0.6-1 del ciclo)
      else {
        const phaseProgress = (cycleProgress - 0.6) / 0.4
        drawOrder(phaseProgress)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // IntersectionObserver para pausar cuando está fuera de vista
    intersectionRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimeRef.current = Date.now()
          animationRef.current = requestAnimationFrame(animate)
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      },
      { threshold: 0.1, rootMargin: '-60px' }
    )

    intersectionRef.current.observe(canvas)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (intersectionRef.current) {
        intersectionRef.current.disconnect()
      }
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
      style={{
        aspectRatio: `${width}/${height}`,
        maxWidth: '100%'
      }}
    />
  )
}
