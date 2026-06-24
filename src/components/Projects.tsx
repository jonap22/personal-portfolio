'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { ExternalLink, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Highlight {
  label: string
  description: string
}

interface Workstream {
  team: string
  description: string
  tags: string[]
}

interface ProjectItem {
  name: string
  badge: string
  subtitle: string
  description: string
  url: string
  href: string
  highlights?: Highlight[]
  workstreams?: Workstream[]
  tags: string[]
}

const LOGOS = [
  { src: '/okta-logo.svg', alt: 'Okta', style: { height: '2rem', width: 'auto', filter: 'brightness(0)' as const } },
  { src: '/certiconsulty-logo.svg', alt: 'CertiConsulty', style: { height: '1.8rem', width: 'auto' } },
  { src: '/twilio-logo.svg', alt: 'Twilio', style: { height: '2rem', width: 'auto' } },
]

const ROW_NUMS = ['01', '02', '03']

const TWILIO_DOT = { backgroundColor: '#F22F46', opacity: 0.75 }

export default function Projects() {
  const t = useTranslations('projects')
  const items = t.raw('items') as ProjectItem[]

  const [openIdx, setOpenIdx] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? -1 : i))

  const renderHighlights = (highlights: Highlight[], dotStyle?: React.CSSProperties) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {highlights.map(h => (
        <div key={h.label} className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-foreground/50" style={dotStyle} />
            <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">{h.label}</h4>
          </div>
          <p className="text-muted text-sm leading-relaxed">{h.description}</p>
        </div>
      ))}
    </div>
  )

  const renderTwilioWorkstreams = (workstreams: Workstream[]) => (
    <>
      {/* Mobile tabs */}
      <div className="md:hidden mb-6">
        <div className="flex border-b border-[rgba(0,0,0,0.1)] mb-5" role="tablist">
          {workstreams.map((ws, i) => (
            <button
              key={ws.team}
              id={`tab-${i}`}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls="tab-panel"
              onClick={() => setActiveTab(i)}
              className="relative flex-1 pb-3 text-left font-mono text-xs tracking-wide transition-colors"
              style={{ color: activeTab === i ? '#111111' : '#888888' }}
            >
              {ws.team}
              {activeTab === i && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: '#F22F46' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            id="tab-panel"
            key={activeTab}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]"
          >
            <p className="text-muted text-sm leading-relaxed mb-3">{workstreams[activeTab].description}</p>
            <div className="flex flex-wrap gap-2">
              {workstreams[activeTab].tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
        {workstreams.map(ws => (
          <div key={ws.team} className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={TWILIO_DOT} />
              <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">{ws.team}</h4>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-3">{ws.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {ws.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <section id="projects" className="section bg-[rgba(0,0,0,0.018)]">
      <div className="site-container">

        <AnimateIn>
          <span className="section-label">{t('label')}</span>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            className="font-tight font-bold leading-[1.08] tracking-[-0.03em] mb-16"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            {t('headline')}
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="border-t border-[rgba(0,0,0,0.08)]">

            {items.map((item, idx) => {
              const logo = LOGOS[idx]
              const num = ROW_NUMS[idx]
              const isOpen = openIdx === idx
              const tagsLabel = idx === 1 ? t('skillsLabel') : t('stackLabel')

              return (
                <div key={item.name} className="border-b border-[rgba(0,0,0,0.08)]">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between py-7 md:py-8 gap-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-6 md:gap-10 min-w-0">
                      <span className="font-mono text-xs text-muted shrink-0 tracking-widest">{num}</span>
                      <div className="min-w-0">
                        <p className="font-tight font-bold text-xl md:text-2xl tracking-[-0.02em] truncate">{item.name}</p>
                        <p className="text-xs text-muted mt-0.5">{item.badge}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] group-hover:border-[rgba(0,0,0,0.2)] transition-colors"
                      >
                        <Plus size={15} className="text-foreground" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`${item.name}-content`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.3, delay: 0.1 } } }}
                        exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.15 } } }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 md:pb-12 md:flex md:gap-10">
                          <span className="hidden md:inline shrink-0 invisible font-mono text-xs tracking-widest select-none" aria-hidden="true">{num}</span>

                          <div className="md:flex-1 min-w-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              draggable={false}
                              className="pointer-events-none mb-5"
                              style={logo.style}
                            />

                            <p className="text-sm text-muted mb-5">{item.subtitle}</p>

                            <p className="text-muted leading-relaxed mb-4 text-[0.95rem]">
                              {item.description}
                            </p>

                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-mono group mb-8"
                            >
                              {item.url}
                              <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            {item.highlights && renderHighlights(item.highlights)}
                            {item.workstreams && renderTwilioWorkstreams(item.workstreams)}

                            <div className="pt-5 border-t border-[rgba(0,0,0,0.06)]">
                              <p className="font-mono text-xs text-muted mb-2.5 tracking-wide">{tagsLabel}</p>
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                  <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
