'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ExperienceItem {
  period: string
  role: string
  company: string
  location: string
  description: string
  tags: string[]
}

export default function Experience() {
  const t = useTranslations('experience')
  const items = t.raw('items') as ExperienceItem[]

  return (
    <section id="experience" className="section bg-[#111111]">
      <div className="site-container">
        <AnimateIn>
          <span
            className="section-label"
            style={{ color: 'rgba(255,255,255,0.60)' }}
          >
            {t('label')}
          </span>
        </AnimateIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <AnimateIn delay={0.1}>
            <h2
              className="font-tight font-bold leading-[1.08] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              {t('headline')}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p style={{ color: 'rgba(255,255,255,0.62)' }} className="text-sm max-w-[280px] leading-relaxed">
              {t('subtitle')}
            </p>
          </AnimateIn>
        </div>

        <div>
          {items.map((exp, i) => (
            <AnimateIn key={`${exp.role}-${exp.company}`} delay={0.1 * i}>
              <motion.div
                className="group relative grid grid-cols-1 md:grid-cols-[90px,1fr] gap-6 md:gap-16 py-12 border-b last:border-0 -mx-4 px-4 rounded-2xl transition-colors duration-300 hover:bg-white/[0.04] cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                {/* Year marker */}
                <div className="hidden md:flex items-start pt-1">
                  <span
                    className="font-tight font-black leading-none tracking-[-0.04em] select-none"
                    style={{ fontSize: '4.5rem', color: 'rgba(255,255,255,0.07)' }}
                  >
                    {exp.period.match(/\d{4}/)?.[0]}
                  </span>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-tight text-xl md:text-2xl font-bold tracking-[-0.02em] text-white">
                          {exp.role}
                        </h3>
                        {i === 0 && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(34,197,94,0.12)] text-[#4ade80] text-xs font-mono font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                            {t('now')}
                          </span>
                        )}
                      </div>
                      <p className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <span style={{ color: 'rgba(255,255,255,0.82)' }} className="font-medium">{exp.company}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                        <MapPin size={12} className="shrink-0" />
                        {exp.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs tracking-wide shrink-0 pt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <p className="leading-relaxed max-w-[620px] mb-5 text-[0.95rem]" style={{ color: 'rgba(255,255,255,0.70)' }}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono rounded-full"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.72)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Education card */}
        <div className="mt-20">
          <AnimateIn>
            <p
              className="section-label"
              style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.60)' }}
            >
              {t('educationLabel')}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-tight text-xl md:text-2xl font-bold tracking-[-0.02em] mb-1 text-white">
                    {t('degree')}
                  </h3>
                  <p className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    <MapPin size={12} />
                    {t('university')}
                  </p>
                </div>
                <span className="font-mono text-xs tracking-wide shrink-0" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {t('universityPeriod')}
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
