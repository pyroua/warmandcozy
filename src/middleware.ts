import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['nl', 'en', 'fr'] as const;
type Locale = typeof locales[number];
const defaultLocale: Locale = 'nl';

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage
    .split(',')
    .map(l => l.split(';')[0].trim().substring(0, 2));
  return (preferred.find(l => locales.includes(l as Locale)) as Locale) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a known locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to preferred or default locale
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();

  if (locale === defaultLocale) {
    // Default locale: redirect / → /nl
    url.pathname = `/nl${pathname === '/' ? '' : pathname}`;
  } else {
    url.pathname = `/${locale}${pathname}`;
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
};
