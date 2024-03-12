import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { log } from 'console';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const header = headers()
  let ip = header.get('x-real-ip') as string;

  const forwardedFor = header.get('x-forwarded-for') as string
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }
  const lang = locale || 'en';
  if (!locales.includes(lang as any)) notFound();
  console.log('ip', ip);
  return {
    messages: (await import(`../messages/${lang}.json`)).default
  };
});