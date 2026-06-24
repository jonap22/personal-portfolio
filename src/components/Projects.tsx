'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { ExternalLink, Plus } from 'lucide-react'

const WORKSTREAMS = [
  {
    team: 'Engineering Platform',
    description:
      'Migrated AEM components to the One Twilio rebranding, unifying Segment and SendGrid components into a single cohesive design language across the entire platform.',
    tags: ['AEM', 'Component Migration', 'Segment', 'SendGrid'],
  },
  {
    team: 'Web Experience',
    description:
      'Migrated large volumes of pages to the new design system via the AEM authoring view. Fixed component-level bugs and improved the overall authoring and end-user experience.',
    tags: ['Design System', 'AEM Authoring', 'Bug Fixes', 'DX'],
  },
]

const TWILIO_STACK = ['Adobe Experience Manager', 'JavaScript', 'HTML & CSS', 'Design Systems', 'AEM Authoring']

const OKTA_HIGHLIGHTS = [
  {
    label: 'DevRel Microsites',
    description:
      'Maintain and develop microsites for the Auth0 Developer Relations team built on Next.js — ensuring content accuracy, performance, and a seamless developer experience across properties like jwt.io.',
  },
  {
    label: 'Legacy Modernization',
    description:
      'Migrating legacy web properties from outdated architectures to modern Next.js, improving build times, scalability, and long-term maintainability across the Auth0 web ecosystem.',
  },
]

const OKTA_TAGS = ['Next.js', 'TypeScript', 'Auth0', 'DevRel', 'Site Maintenance', 'Legacy Migration', 'JWT']

const CERTICONSULTY_HIGHLIGHTS = [
  {
    label: 'Vision & Strategy',
    description:
      "Defined the company mission and go-to-market strategy for Ecuador's occupational safety consulting market, positioning CertiConsulty as a compliance-first, practical alternative to traditional providers.",
  },
  {
    label: 'Product & Operations',
    description:
      'Built the service offering from the ground up — structured training programs, SENESCYT-validated certifications, SUT registration workflows, and a consulting model that scales across industries.',
  },
]

const CERTICONSULTY_TAGS = ['Leadership', 'Business Development', 'Product Strategy', 'B2B', 'Go-to-Market', 'Compliance Tech']

export default function Projects() {
  const [openIdx, setOpenIdx] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? -1 : i))

  return (
    <section id="projects" className="section bg-[rgba(0,0,0,0.018)]">
      <div className="site-container">

        <AnimateIn>
          <span className="section-label">04 — Work</span>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            className="font-tight font-bold leading-[1.08] tracking-[-0.03em] mb-16"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            Selected work.
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="border-t border-[rgba(0,0,0,0.08)]">

            {/* ── Row 1: Okta / Auth0 DevRel (most recent) ── */}
            <div className="border-b border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => toggle(0)}
                className="w-full flex items-center justify-between py-7 md:py-8 gap-6 text-left group"
                aria-expanded={openIdx === 0}
              >
                <div className="flex items-center gap-6 md:gap-10 min-w-0">
                  <span className="font-mono text-xs text-muted shrink-0 tracking-widest">01</span>
                  <div className="min-w-0">
                    <p className="font-tight font-bold text-xl md:text-2xl tracking-[-0.02em] truncate">Okta</p>
                    <p className="text-xs text-muted mt-0.5">Contributed · 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <motion.div
                    animate={{ rotate: openIdx === 0 ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] group-hover:border-[rgba(0,0,0,0.2)] transition-colors"
                  >
                    <Plus size={15} className="text-foreground" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === 0 && (
                  <motion.div
                    key="okta-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.3, delay: 0.1 } } }}
                    exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.15 } } }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 md:pb-12 md:flex md:gap-10">
                      <span className="hidden md:inline shrink-0 invisible font-mono text-xs tracking-widest select-none" aria-hidden="true">01</span>

                      <div className="md:flex-1 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/okta-logo.svg" alt="Okta" draggable={false} className="pointer-events-none mb-5" style={{ height: '2rem', width: 'auto', filter: 'brightness(0)' }} />

                        <p className="text-sm text-muted mb-5">Auth0 Developer Relations — Microsite Maintenance & Legacy Migration</p>

                        <p className="text-muted leading-relaxed mb-4 text-[0.95rem]">
                          Contributing to the Auth0 Developer Relations team at Okta — maintaining Next.js microsites,
                          migrating legacy web properties to modern architectures, and keeping properties like jwt.io
                          running smoothly for millions of developers worldwide.
                        </p>

                        <a href="https://www.okta.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-mono group mb-8">
                          okta.com <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {OKTA_HIGHLIGHTS.map(h => (
                            <div key={h.label} className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]">
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-foreground/50" />
                                <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">{h.label}</h4>
                              </div>
                              <p className="text-muted text-sm leading-relaxed">{h.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-5 border-t border-[rgba(0,0,0,0.06)]">
                          <p className="font-mono text-xs text-muted mb-2.5 tracking-wide">Stack</p>
                          <div className="flex flex-wrap gap-2">
                            {OKTA_TAGS.map(tag => (
                              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Row 2: CertiConsulty ── */}
            <div className="border-b border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => toggle(1)}
                className="w-full flex items-center justify-between py-7 md:py-8 gap-6 text-left group"
                aria-expanded={openIdx === 1}
              >
                <div className="flex items-center gap-6 md:gap-10 min-w-0">
                  <span className="font-mono text-xs text-muted shrink-0 tracking-widest">02</span>
                  <div className="min-w-0">
                    <p className="font-tight font-bold text-xl md:text-2xl tracking-[-0.02em] truncate">CertiConsulty</p>
                    <p className="text-xs text-muted mt-0.5">Co-founded · 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <motion.div
                    animate={{ rotate: openIdx === 1 ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] group-hover:border-[rgba(0,0,0,0.2)] transition-colors"
                  >
                    <Plus size={15} className="text-foreground" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === 1 && (
                  <motion.div
                    key="certiconsulty-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.3, delay: 0.1 } } }}
                    exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.15 } } }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 md:pb-12 md:flex md:gap-10">
                      <span className="hidden md:inline shrink-0 invisible font-mono text-xs tracking-widest select-none" aria-hidden="true">02</span>

                      <div className="md:flex-1 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/certiconsulty-logo.svg" alt="CertiConsulty" draggable={false} className="pointer-events-none mb-5" style={{ height: '1.8rem', width: 'auto' }} />

                        <p className="text-sm text-muted mb-5">Occupational Safety & Health Consulting — Ecuador</p>

                        <p className="text-muted leading-relaxed mb-4 text-[0.95rem]">
                          Co-founded and built CertiConsulty from the ground up — an occupational safety and health
                          consulting company helping Ecuadorian businesses achieve full compliance with Ministry of
                          Labor regulations. Led company vision, product design, and go-to-market strategy while
                          building a certified, multidisciplinary team with national coverage.
                        </p>

                        <a href="https://www.certiconsulty.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-mono group mb-8">
                          certiconsulty.com <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {CERTICONSULTY_HIGHLIGHTS.map(h => (
                            <div key={h.label} className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]">
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-foreground/50" />
                                <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">{h.label}</h4>
                              </div>
                              <p className="text-muted text-sm leading-relaxed">{h.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-5 border-t border-[rgba(0,0,0,0.06)]">
                          <p className="font-mono text-xs text-muted mb-2.5 tracking-wide">Skills demonstrated</p>
                          <div className="flex flex-wrap gap-2">
                            {CERTICONSULTY_TAGS.map(tag => (
                              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Row 3: Twilio ── */}
            <div className="border-b border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => toggle(2)}
                className="w-full flex items-center justify-between py-7 md:py-8 gap-6 text-left group"
                aria-expanded={openIdx === 2}
              >
                <div className="flex items-center gap-6 md:gap-10 min-w-0">
                  <span className="font-mono text-xs text-muted shrink-0 tracking-widest">03</span>
                  <div className="min-w-0">
                    <p className="font-tight font-bold text-xl md:text-2xl tracking-[-0.02em] truncate">Twilio</p>
                    <p className="text-xs text-muted mt-0.5">Contributed · 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <motion.div
                    animate={{ rotate: openIdx === 2 ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] group-hover:border-[rgba(0,0,0,0.2)] transition-colors"
                  >
                    <Plus size={15} className="text-foreground" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === 2 && (
                  <motion.div
                    key="twilio-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.3, delay: 0.1 } } }}
                    exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }, opacity: { duration: 0.15 } } }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 md:pb-12 md:flex md:gap-10">
                      <span className="hidden md:inline shrink-0 invisible font-mono text-xs tracking-widest select-none" aria-hidden="true">03</span>

                      <div className="md:flex-1 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/twilio-logo.svg" alt="Twilio" draggable={false} className="pointer-events-none mb-5" style={{ height: '2rem', width: 'auto' }} />

                        <p className="text-sm text-muted mb-5">One Twilio Rebranding — Component Migration & Web Experience</p>

                        <p className="text-muted leading-relaxed mb-4 text-[0.95rem]">
                          Contributed across two cross-functional teams at Twilio to drive the One Twilio rebranding
                          initiative — migrating the AEM component library and unifying the web presence of Twilio,
                          Segment, and SendGrid under a single cohesive design system.
                        </p>

                        <a href="https://twilio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-mono group mb-8">
                          twilio.com <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <div className="md:hidden mb-6">
                          <div className="flex border-b border-[rgba(0,0,0,0.1)] mb-5" role="tablist">
                            {WORKSTREAMS.map((ws, i) => (
                              <button key={ws.team} id={`tab-${i}`} role="tab" aria-selected={activeTab === i} aria-controls="tab-panel"
                                onClick={() => setActiveTab(i)} className="relative flex-1 pb-3 text-left font-mono text-xs tracking-wide transition-colors"
                                style={{ color: activeTab === i ? '#111111' : '#888888' }}
                              >
                                {ws.team}
                                {activeTab === i && <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: '#F22F46' }} transition={{ duration: 0.3 }} />}
                              </button>
                            ))}
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.div id="tab-panel" key={activeTab} role="tabpanel" aria-labelledby={`tab-${activeTab}`}
                              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                              className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]"
                            >
                              <p className="text-muted text-sm leading-relaxed mb-3">{WORKSTREAMS[activeTab].description}</p>
                              <div className="flex flex-wrap gap-2">
                                {WORKSTREAMS[activeTab].tags.map(tag => <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">{tag}</span>)}
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
                          {WORKSTREAMS.map(ws => (
                            <div key={ws.team} className="p-5 rounded-xl bg-white/50 border border-[rgba(0,0,0,0.07)]">
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F22F46', opacity: 0.75 }} />
                                <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">{ws.team}</h4>
                              </div>
                              <p className="text-muted text-sm leading-relaxed mb-3">{ws.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {ws.tags.map(tag => (
                                  <span key={tag} className="px-2 py-0.5 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">{tag}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-5 border-t border-[rgba(0,0,0,0.06)]">
                          <p className="font-mono text-xs text-muted mb-2.5 tracking-wide">Stack</p>
                          <div className="flex flex-wrap gap-2">
                            {TWILIO_STACK.map(tag => (
                              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
