import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
const RESTRICTED_COUNTRIES = ["CN", "RU", "KP", "IR", "SY", "CU", "SD", "GB"]
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const res = NextResponse.next();
  console.log('request.geo', request.geo);
  const country = request.geo?.country ?? ""
  
  console.log('country', country);
  if(RESTRICTED_COUNTRIES.includes(country)){
    return NextResponse.rewrite(new URL("/restricted", request.url))
  }
  return res;
}

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  // Used when no locale matches
  localeDetection: false,
  localePrefix: 'always',
  pathnames: {
    // The key is the pathname for the given locale
    // The value is the pathname for the default locale
    en: '/en',
    es: '/es',
    fr: '/fr'
  }
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|fr)/:path*']
};

