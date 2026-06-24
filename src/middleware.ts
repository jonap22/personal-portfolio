import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

// Latin American Spanish locales → serve Spanish
const LATIN_ES = new Set([
  'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-cu', 'es-do', 'es-ec',
  'es-sv', 'es-gt', 'es-hn', 'es-mx', 'es-ni', 'es-pa', 'es-py', 'es-pe',
  'es-pr', 'es-uy', 'es-ve',
])

function detectLocale(req: NextRequest): 'en' | 'es' {
  // User preference cookie takes priority
  const cookie = req.cookies.get('NEXT_LOCALE')?.value
  if (cookie === 'en' || cookie === 'es') return cookie

  const header = req.headers.get('accept-language') ?? ''
  for (const seg of header.split(',')) {
    const tag = seg.split(';')[0].trim().toLowerCase()
    if (tag === 'es' || LATIN_ES.has(tag)) return 'es'
    if (tag.startsWith('es-')) return 'en' // es-ES (Spain) → English
  }
  return 'en'
}

const intlMiddleware = createMiddleware(routing)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasLocalePrefix = /^\/(en|es)(\/|$)/.test(pathname)

  if (!hasLocalePrefix) {
    const locale = detectLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}
