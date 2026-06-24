'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { ExternalLink } from 'lucide-react'

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

const STACK = [
  'Adobe Experience Manager',
  'JavaScript',
  'HTML & CSS',
  'Design Systems',
  'AEM Authoring',
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="projects" className="section bg-[rgba(0,0,0,0.018)]">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label">04 — Work</span>
        </AnimateIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <AnimateIn delay={0.1}>
            <h2
              className="font-tight font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              Featured project.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <a
              href="https://twilio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200 group"
            >
              twilio.com
              <ExternalLink
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15}>
          <motion.div
            className="rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white/30 cursor-default"
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="p-8 md:p-12 lg:p-16">

              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-muted tracking-widest">01</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/50 text-muted border border-[rgba(0,0,0,0.08)]">
                    Contributed
                  </span>
                  <span className="font-mono text-xs text-muted">2025</span>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/twilio-logo.svg"
                  alt="Twilio"
                  className="mb-3"
                  style={{ height: 'clamp(3rem,6vw,4.5rem)', width: 'auto' }}
                />
                <p className="font-tight text-lg text-muted font-medium">
                  One Twilio Rebranding — Component Migration & Web Experience
                </p>
              </div>

              {/* Overview */}
              <p className="text-muted leading-relaxed max-w-[640px] mb-10 text-[0.95rem]">
                Contributed across two cross-functional teams at Twilio to drive the
                One Twilio rebranding initiative — migrating the AEM component library and
                unifying the web presence of Twilio, Segment, and SendGrid under a single
                cohesive design system.
              </p>

              {/* ── Mobile: tab switcher ── */}
              <div className="md:hidden mb-8">
                {/* Tab buttons — underline style */}
                <div
                  className="flex border-b border-[rgba(0,0,0,0.1)] mb-6"
                  role="tablist"
                >
                  {WORKSTREAMS.map((ws, i) => (
                    <button
                      key={ws.team}
                      role="tab"
                      aria-selected={activeTab === i}
                      onClick={() => setActiveTab(i)}
                      className="relative flex-1 pb-3 text-left font-mono text-xs tracking-wide transition-colors duration-200 focus:outline-none"
                      style={{ color: activeTab === i ? '#111111' : '#888888' }}
                    >
                      {ws.team}
                      {activeTab === i && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px]"
                          style={{ backgroundColor: '#F22F46' }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="p-5 rounded-xl bg-white/40 border border-[rgba(0,0,0,0.07)]"
                  >
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {WORKSTREAMS[activeTab].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {WORKSTREAMS[activeTab].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Desktop: side-by-side grid ── */}
              <div className="hidden md:grid grid-cols-2 gap-6 mb-10">
                {WORKSTREAMS.map((ws) => (
                  <div
                    key={ws.team}
                    className="p-6 rounded-xl bg-white/40 border border-[rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: '#F22F46', opacity: 0.7 }}
                      />
                      <h4 className="font-tight font-bold text-sm tracking-[-0.01em]">
                        {ws.team}
                      </h4>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {ws.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ws.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shared stack */}
              <div className="pt-8 border-t border-[rgba(0,0,0,0.06)]">
                <p className="font-mono text-xs text-muted mb-3 tracking-wide">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-white/60 border border-[rgba(0,0,0,0.08)] text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  )
}
