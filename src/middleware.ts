import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  // Used when no locale matches
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
