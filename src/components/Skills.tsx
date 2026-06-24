'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { useTranslations } from 'next-intl'

interface SkillGroup {
  category: string
  description: string
  skills: string[]
}

const cardVariants = {
  rest: { y: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.07)' },
  hover: {
    y: -4,
    boxShadow: '0 12px 36px -8px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.07)',
  },
}

export default function Skills() {
  const t = useTranslations('skills')
  const groups = t.raw('groups') as SkillGroup[]

  return (
    <section id="skills" className="section">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label">{t('label')}</span>
        </AnimateIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <AnimateIn delay={0.1}>
            <h2
              className="font-tight font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              {t('headline')}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-muted text-sm max-w-[320px] leading-relaxed">
              {t('subtitle')}
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {groups.map((group, i) => (
            <AnimateIn key={group.category} delay={0.07 * i}>
              <motion.div
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="p-6 rounded-2xl bg-white/25 border border-[rgba(0,0,0,0.07)] h-full cursor-default"
              >
                <div className="mb-5">
                  <h3 className="font-tight font-bold text-base tracking-[-0.01em] text-foreground">
                    {group.category}
                  </h3>
                  <p className="font-mono text-[0.65rem] text-muted mt-1 tracking-wide leading-relaxed">
                    {group.description}
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-[0.9rem] font-tight font-medium text-foreground/80"
                    >
                      <span className="w-1 h-1 rounded-full bg-[rgba(0,0,0,0.2)] shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
