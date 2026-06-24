'use client'

import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const scaleX = useSpring(0, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      scaleX.set(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [scaleX])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10000] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'var(--color-fg)',
      }}
    />
  )
}
