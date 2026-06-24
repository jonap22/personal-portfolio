import type { Metadata } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Jonathan Puglla — Software Engineer',
  description:
    'Software Engineer, Founder, and Product Builder based in Ecuador. Building products that solve real problems with exceptional attention to craft and technical excellence.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Ecuador',
    'Jonathan Puglla',
    'Stack Builders',
  ],
  authors: [{ name: 'Jonathan Puglla' }],
  openGraph: {
    title: 'Jonathan Puglla — Software Engineer',
    description: 'Software Engineer, Founder, and Product Builder based in Ecuador.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@jona_puglla',
    title: 'Jonathan Puglla — Software Engineer',
    description: 'Software Engineer, Founder, and Product Builder based in Ecuador.',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // next-intl middleware sets x-next-intl-locale on every request
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') ?? 'en'

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative font-sans bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
