'use client'

import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'

const SOCIAL = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/jonap22' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/jonapuglla2000' },
  { icon: Twitter, label: 'X / Twitter', href: 'https://x.com/jona_puglla' },
]

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#111111] text-white border-t border-white/10">
      <div className="site-container">
        {/* Main footer row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-12 items-start border-b border-white/10">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={handleBackToTop}
              className="font-tight font-bold text-2xl tracking-[-0.03em] text-white hover:opacity-50 transition-opacity"
            >
              JP
            </a>
            <p className="text-sm mt-3 leading-relaxed max-w-[260px]" style={{ color: 'rgba(255,255,255,0.62)' }}>
              Software Engineer building products that matter.
              <br />
              Based in Ecuador.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            <span className="font-mono text-[0.65rem] tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.68)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.65rem] tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Connect
            </span>
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors duration-200 group"
                style={{ color: 'rgba(255,255,255,0.68)' }}
              >
                <Icon size={14} />
                {label}
                <ArrowUpRight
                  size={11}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.48)' }}>
            © {new Date().getFullYear()} Jonathan Puglla. Built with Next.js & Framer Motion.
          </span>
          <a
            href="#"
            onClick={handleBackToTop}
            className="font-mono text-xs hover:text-white/80 transition-colors"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
