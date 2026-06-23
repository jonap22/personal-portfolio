'use client'

import { useRef, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimateIn } from './AnimateIn'
import { Send, Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
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
    <section id="contact" className="section">
      <div className="site-container">
        <AnimateIn>
          <span className="section-label">05 — Contact</span>
        </AnimateIn>

        {/* Headline — full width */}
        <AnimateIn delay={0.1}>
          <h2
            className="font-tight font-bold leading-[1.02] tracking-[-0.04em] mb-12"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}
          >
            Let&apos;s build something
            <br />
            meaningful.
          </h2>
        </AnimateIn>

        <div className="border-t border-[rgba(0,0,0,0.07)]" />

        {/* Two columns — description/links left, form right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-20 pt-12">

          {/* Left — description + quick links */}
          <AnimateIn delay={0.2}>
            <div>
              <p
                className="text-muted leading-relaxed mb-8"
                style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}
              >
                Have a project in mind, want to collaborate, or just want to say hello?
                I&apos;d love to hear from you. I&apos;ll get back within 24 hours.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:jonathan.puglla@outlook.com"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl bg-white/30 hover:bg-white/60 transition-all duration-200 text-sm text-muted hover:text-foreground min-h-[48px]"
                >
                  <Mail size={14} />
                  jonathan.puglla@outlook.com
                </a>
                <a
                  href="https://t.me/jonathanpuglla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl bg-white/30 hover:bg-white/60 transition-all duration-200 text-sm text-muted hover:text-foreground min-h-[48px]"
                >
                  <MessageSquare size={14} />
                  @jonathanpuglla
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* Right — form in glass card */}
          <AnimateIn delay={0.3}>
            <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/30 p-8 lg:p-10">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs tracking-wide text-muted mb-2.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 bg-white/50 border border-[rgba(0,0,0,0.1)] rounded-xl text-foreground placeholder-muted/40 focus:outline-none focus:border-[rgba(0,0,0,0.25)] focus:bg-white/70 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs tracking-wide text-muted mb-2.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-white/50 border border-[rgba(0,0,0,0.1)] rounded-xl text-foreground placeholder-muted/40 focus:outline-none focus:border-[rgba(0,0,0,0.25)] focus:bg-white/70 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs tracking-wide text-muted mb-2.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project or idea..."
                    className="w-full px-4 py-3.5 bg-white/50 border border-[rgba(0,0,0,0.1)] rounded-xl text-foreground placeholder-muted/40 focus:outline-none focus:border-[rgba(0,0,0,0.25)] focus:bg-white/70 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="btn-primary group w-full sm:w-auto"
                  >
                    {status === 'sending' && 'Sending…'}
                    {status === 'success' && 'Message Sent!'}
                    {status === 'idle' && (
                      <>
                        Send Message
                        <Send
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                    {status === 'error' && 'Try Again'}
                  </button>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-[#16a34a]">
                      <CheckCircle2 size={16} />
                      <span>I&apos;ll be in touch soon.</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-500">
                      <AlertCircle size={16} />
                      <span>Something went wrong. Please try again.</span>
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
