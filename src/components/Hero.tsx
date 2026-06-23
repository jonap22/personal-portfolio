'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const EASE = [0.25, 0.1, 0.25, 1.0] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: EASE },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const springCfg = { stiffness: 38, damping: 18 }
  const orbX = useSpring(0, springCfg)
  const orbY = useSpring(0, springCfg)

  const orb2X = useTransform(orbX, (v) => v * -0.65)
  const orb2Y = useTransform(orbY, (v) => v * -0.65)
  const orb3X = useTransform(orbX, (v) => v * 0.45)
  const orb3Y = useTransform(orbY, (v) => v * 0.45)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      orbX.set((e.clientX / window.innerWidth - 0.5) * 28)
      orbY.set((e.clientY / window.innerHeight - 0.5) * 28)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [orbX, orbY])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center"
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div className="orb orb-1" style={{ x: orbX, y: orbY }} />
        <motion.div className="orb orb-2" style={{ x: orb2X, y: orb2Y }} />
        <motion.div className="orb orb-3" style={{ x: orb3X, y: orb3Y }} />
        <motion.div className="orb orb-4" />
      </div>

      {/* Main content */}
      <motion.div
        className="site-container relative z-10 pt-[68px] pb-28"
        style={{ y: contentY }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[960px]"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="section-label" style={{ marginBottom: 0 }}>
              Software Engineer · Founder
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-tight font-bold leading-[0.94] tracking-[-0.035em] mb-8"
            style={{ fontSize: 'clamp(3.6rem, 9.5vw, 9rem)' }}
          >
            Building products
            <br />
            <span className="text-gradient">people actually</span>
            <br />
            use.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-muted leading-relaxed max-w-[560px] mb-12"
            style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)' }}
          >
            I&apos;m Jonathan — a Software Engineer and Product Builder based in Ecuador.
            I craft software that solves real problems with exceptional attention to
            technical excellence and human experience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="#projects" className="btn-primary group w-full sm:w-auto">
              View Work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto">
              Get In Touch
            </a>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="flex flex-col items-center gap-2"
      >
        <span
          className="font-mono text-muted tracking-[0.1em]"
          style={{ fontSize: '0.65rem' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-muted" />
        </motion.div>
      </motion.div>
      </motion.div>
    </section>
  )
}
