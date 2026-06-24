'use client'

import { AnimateIn } from './AnimateIn'
import { Download, Github, Linkedin, Twitter } from 'lucide-react'
import { useTranslations } from 'next-intl'

const SOCIAL = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/jonap22' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/jonapuglla2000' },
  { icon: Twitter, label: 'X / Twitter', href: 'https://x.com/jona_puglla' },
]

export default function About() {
  const t = useTranslations('about')
  const stats = t.raw('stats') as Array<{ value: string; label: string }>

  return (
    <section id="about" className="section">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label">{t('label')}</span>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — headline */}
          <AnimateIn delay={0.1}>
            <div>
              <h2
                className="font-tight font-bold leading-[1.08] tracking-[-0.03em] mb-8"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                {t('headline').split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>

              <blockquote className="pl-5 border-l-2 border-[rgba(0,0,0,0.12)] mb-8">
                <p
                  className="text-muted italic leading-relaxed"
                  style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)' }}
                >
                  &ldquo;{t('quote')}&rdquo;
                </p>
              </blockquote>

              <a
                href="/CV_PugllaJonathan_EN.pdf"
                download
                className="btn-outline group w-full sm:w-auto"
              >
                <Download size={15} />
                {t('downloadResume')}
              </a>
            </div>
          </AnimateIn>

          {/* Right — narrative */}
          <AnimateIn delay={0.2}>
            <div className="space-y-5 text-muted leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.1vw, 1.1rem)' }}>
              <p>{t('bio.0')}</p>
              <p>
                {t.rich('bio.1', {
                  epn: (chunks) => (
                    <span className="text-foreground font-medium">{chunks}</span>
                  ),
                  sb: (chunks) => (
                    <span className="text-foreground font-medium">{chunks}</span>
                  ),
                })}
              </p>
              <p>{t('bio.2')}</p>
              <p>{t('bio.3')}</p>

              {/* Social links */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white/50 text-muted hover:text-foreground hover:bg-white/80 transition-all duration-200 text-sm font-medium min-h-[48px]"
                  >
                    <Icon size={15} />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden text-xs">{label.split(' /')[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-8 mt-10 sm:mt-24 pt-8 sm:pt-12 border-t border-[rgba(0,0,0,0.07)]">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={0.08 * i}>
              <div className={`py-4 sm:py-0${i < stats.length - 1 ? ' border-b border-[rgba(0,0,0,0.06)] sm:border-none' : ''}`}>
                <div
                  className="font-tight font-bold tracking-[-0.04em] text-foreground leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)' }}
                >
                  {stat.value}
                </div>
                <div className="text-muted text-sm mt-3 leading-snug">
                  {stat.label}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
