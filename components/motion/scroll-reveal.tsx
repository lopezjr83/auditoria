'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export function ScrollReveal({ children, className = '', stagger = 70 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respetar prefers-reduced-motion (§11 Playbook)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = ref.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('[data-reveal]')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-60px' }
    )

    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * stagger}ms`
      io.observe(el)
    })

    return () => io.disconnect()
  }, [stagger])

  return <div ref={ref} className={className}>{children}</div>
}
