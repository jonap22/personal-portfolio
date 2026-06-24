'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

interface Props {
  isDark?: boolean
}

export default function LanguageSwitcher({ isDark = false }: Props) {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('keydown', onKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const switchLocale = (next: string) => {
    if (next === locale) {
      setOpen(false)
      return
    }
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`
    window.location.href = `/${next}`
  }

  const currentLabel = LOCALES.find(l => l.code === locale)?.label ?? 'English'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
          isDark ? 'text-white/70 hover:text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        <Globe size={15} strokeWidth={1.75} />
        <span>{currentLabel}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="flex"
        >
          <ChevronDown size={13} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="absolute right-0 top-[calc(100%+8px)] min-w-[140px] rounded-xl overflow-hidden z-[200]"
            style={{
              backgroundColor: '#FAFAF8',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 32px -4px rgba(0,0,0,0.13), 0 2px 8px -2px rgba(0,0,0,0.07)',
            }}
          >
            {LOCALES.map((l, i) => (
              <button
                key={l.code}
                role="option"
                aria-selected={locale === l.code}
                onClick={() => switchLocale(l.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors duration-150 hover:bg-black/[0.045] ${
                  i > 0 ? 'border-t border-[rgba(0,0,0,0.05)]' : ''
                }`}
              >
                <span
                  className={`font-tight ${locale === l.code ? 'font-semibold text-foreground' : 'font-normal text-[#666]'}`}
                >
                  {l.label}
                </span>
                {locale === l.code && (
                  <Check size={14} strokeWidth={2.5} className="text-foreground shrink-0 ml-3" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
