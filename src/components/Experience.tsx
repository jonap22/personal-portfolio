'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'
import { MapPin } from 'lucide-react'

const EXPERIENCES = [
  {
    year: '2024',
    period: 'Jul 2024 — Present',
    role: 'Software Developer',
    company: 'Stack Builders',
    location: 'Ecuador',
    description:
      'Building production-grade software solutions for clients across multiple industries. Working with a talented team to deliver elegant, scalable digital products using modern web technologies.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    current: true,
  },
  {
    year: '2024',
    period: 'Apr — Jul 2024',
    role: 'Software Analyst II',
    company: 'Ecuadorian Army',
    location: 'Quito, Ecuador',
    description:
      'Designed and implemented internal software systems to support operational efficiency. Developed tooling for data management, reporting, and workflow automation across multiple departments.',
    tags: ['Python', 'Java', 'MySQL', 'Linux'],
    current: false,
  },
  {
    year: '2022',
    period: 'Dec 2022 — Apr 2024',
    role: 'Cybersecurity Assistant',
    company: 'Fextor',
    location: 'Ecuador',
    description:
      'Assisted in vulnerability assessments, penetration testing, and security auditing. Built tooling to automate security monitoring and helped the team identify and remediate critical infrastructure risks.',
    tags: ['Security', 'Python', 'Network Analysis', 'Bash'],
    current: false,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section bg-[rgba(0,0,0,0.018)]">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label">02 — Experience</span>
        </AnimateIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <AnimateIn delay={0.1}>
            <h2
              className="font-tight font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              Where I&apos;ve worked.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-muted text-sm max-w-[280px] leading-relaxed">
              Three roles across security, military tech, and product engineering — each one
              sharpening a different dimension of the craft.
            </p>
          </AnimateIn>
        </div>

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <AnimateIn key={`${exp.role}-${exp.company}`} delay={0.1 * i}>
              <motion.div
                className="group relative grid grid-cols-1 md:grid-cols-[90px,1fr] gap-6 md:gap-16 py-12 border-b border-[rgba(0,0,0,0.07)] last:border-0 -mx-4 px-4 rounded-2xl transition-colors duration-300 hover:bg-white/30 cursor-default"
              >
                {/* Large year marker */}
                <div className="hidden md:flex items-start pt-1">
                  <span
                    className="font-tight font-black text-[rgba(0,0,0,0.06)] leading-none tracking-[-0.04em] select-none"
                    style={{ fontSize: '4.5rem' }}
                  >
                    {exp.year}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-tight text-xl md:text-2xl font-bold tracking-[-0.02em] text-foreground">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(34,197,94,0.1)] text-[#16a34a] text-xs font-mono font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-muted flex items-center gap-1.5 text-sm">
                        <span className="font-medium text-foreground/70">{exp.company}</span>
                        <span className="text-[rgba(0,0,0,0.2)]">·</span>
                        <MapPin size={12} className="shrink-0" />
                        {exp.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted shrink-0 tracking-wide pt-1">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted leading-relaxed max-w-[620px] mb-5 text-[0.95rem]">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono bg-[rgba(0,0,0,0.05)] rounded-full text-foreground/70 border border-[rgba(0,0,0,0.05)]"
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
            <p className="section-label" style={{ marginBottom: '2rem' }}>Education</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-tight text-xl md:text-2xl font-bold tracking-[-0.02em] mb-1">
                    Software Engineering, B.S.
                  </h3>
                  <p className="text-muted text-sm flex items-center gap-1.5">
                    <MapPin size={12} />
                    Escuela Politécnica Nacional (EPN) · Quito, Ecuador
                  </p>
                </div>
                <span className="font-mono text-xs text-muted tracking-wide shrink-0">
                  2019 — 2024
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
