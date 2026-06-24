'use client'

import { useRef, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimateIn } from './AnimateIn'
import { Send, Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const t = useTranslations('contact')
  const tf = useTranslations('contact.form')
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

  useEffect(() => {
    if (publicKey) emailjs.init(publicKey)
  }, [publicKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current || !publicKey || !serviceId || !templateId) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="section bg-[#111111]">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.60)' }}>
            {t('label')}
          </span>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            className="font-tight font-bold leading-[1.02] tracking-[-0.04em] mb-12 text-white"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}
          >
            {t('headline').split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </AnimateIn>

        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-20 pt-12">

          <AnimateIn delay={0.2}>
            <div>
              <p
                className="leading-relaxed mb-8"
                style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', color: 'rgba(255,255,255,0.52)' }}
              >
                {t('description')}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:jonathan.puglla@outlook.com"
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm min-h-[48px]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.70)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.13)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.90)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.70)'
                  }}
                >
                  <Mail size={14} />
                  jonathan.puglla@outlook.com
                </a>
                <a
                  href="https://t.me/jonathanpuglla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm min-h-[48px]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.70)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.13)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.90)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.70)'
                  }}
                >
                  <MessageSquare size={14} />
                  {t('telegramHandle')}
                </a>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div
              className="rounded-2xl p-8 lg:p-10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs tracking-wide mb-2.5"
                      style={{ color: 'rgba(255,255,255,0.60)' }}
                    >
                      {tf('name')} <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.45)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      placeholder={tf('namePlaceholder')}
                      className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-200 text-sm text-white"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs tracking-wide mb-2.5"
                      style={{ color: 'rgba(255,255,255,0.60)' }}
                    >
                      {tf('email')} <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.45)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      placeholder={tf('emailPlaceholder')}
                      className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-200 text-sm text-white"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs tracking-wide mb-2.5"
                    style={{ color: 'rgba(255,255,255,0.60)' }}
                  >
                    {tf('message')} <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.45)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={6}
                    placeholder={tf('messagePlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-200 text-sm text-white resize-none"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] px-[1.625rem] py-[0.875rem] rounded-lg text-sm font-medium min-h-[48px] w-full sm:w-auto hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === 'sending' && tf('sending')}
                    {status === 'success' && tf('sent')}
                    {status === 'idle' && (
                      <>
                        {tf('send')}
                        <Send
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                    {status === 'error' && tf('retry')}
                  </button>

                  {status === 'success' && (
                    <div role="alert" aria-live="polite" className="flex items-center gap-2 text-sm text-[#4ade80]">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>{tf('successMsg')}</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div role="alert" aria-live="assertive" className="flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle size={16} aria-hidden="true" />
                      <span>{tf('errorMsg')}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
