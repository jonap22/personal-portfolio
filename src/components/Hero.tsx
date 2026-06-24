'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ParticleNetwork = dynamic(() => import('./ParticleNetwork'), { ssr: false })

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
  const t = useTranslations('hero')
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

  const headlineLines = t('headline').split('\n')

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center bg-[#0F0F0E] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div className="orb orb-1 dark" style={{ x: orbX, y: orbY }} />
        <motion.div className="orb orb-2 dark" style={{ x: orb2X, y: orb2Y }} />
        <motion.div className="orb orb-3 dark" style={{ x: orb3X, y: orb3Y }} />
        <motion.div className="orb orb-4 dark" />
      </div>

      <ParticleNetwork />

      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, rgba(15,15,14,0.72) 0%, rgba(15,15,14,0.38) 55%, transparent 80%)',
        }}
      />

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
          <motion.div variants={itemVariants} className="mb-8">
            <span
              className="inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.06em]"
              style={{ color: 'rgba(247,245,242,0.68)' }}
            >
              <span
                className="inline-block w-7 h-px flex-shrink-0"
                style={{ backgroundColor: 'rgba(247,245,242,0.5)' }}
              />
              {t('eyebrow')}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-tight font-bold leading-[0.94] tracking-[-0.035em] mb-8 text-white"
            style={{ fontSize: 'clamp(3.6rem, 9.5vw, 9rem)' }}
          >
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="leading-relaxed max-w-[560px] mb-12"
            style={{
              fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)',
              color: 'rgba(247,245,242,0.82)',
            }}
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0F0F0E] px-[1.625rem] py-[0.875rem] rounded-lg text-sm font-medium min-h-[48px] w-full sm:w-auto hover:bg-white/90 transition-all duration-200 group"
            >
              {t('viewWork')}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 text-white px-[1.625rem] py-[0.875rem] rounded-lg text-sm font-medium min-h-[48px] w-full sm:w-auto hover:bg-white/15 transition-all duration-200"
            >
              {t('getInTouch')}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

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
            className="font-mono tracking-[0.1em]"
            style={{ fontSize: '0.65rem', color: 'rgba(247,245,242,0.35)' }}
          >
            {t('scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} style={{ color: 'rgba(247,245,242,0.35)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
