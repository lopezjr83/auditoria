'use client'

import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  h: number
  s: number
}

interface BlobHeroProps {
  hues?: number[]
  children: React.ReactNode
  className?: string
}

export function BlobHero({ hues = [245, 200, 190], children, className = '' }: BlobHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respetar prefers-reduced-motion (§11 Playbook)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const blobs: Blob[] = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, vx: 0.35, vy: 0.22, r: 320, h: hues[0], s: 0.54 },
      { x: canvas.width * 0.8, y: canvas.height * 0.6, vx: -0.22, vy: 0.3, r: 260, h: hues[1], s: 0.48 },
      { x: canvas.width * 0.5, y: canvas.height * 0.85, vx: 0.18, vy: -0.28, r: 200, h: hues[2], s: 0.51 },
    ]

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.filter = 'blur(55px)'

      blobs.forEach((b) => {
        b.x += b.vx
        b.y += b.vy

        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `hsla(${b.h},70%,50%,${b.s})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.filter = 'none'
      raf = requestAnimationFrame(draw)
    }

    // Pausar cuando canvas no visible (ahorra CPU)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        draw()
      } else {
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [hues])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
