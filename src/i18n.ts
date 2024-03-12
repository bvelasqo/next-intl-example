import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { IPGeolocationAPI } from 'ip-geolocation-api-sdk-typescript';
import { GeolocationParams } from 'ip-geolocation-api-sdk-typescript/GeolocationParams';

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
  const lang = await getCountryByIp(ip);
  if (!locales.includes(lang)) notFound();
  console.log('lang', lang);
  return {
    messages: (await import(`../messages/${lang}.json`)).default
  };
});

async function getCountryByIp(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();
  console.log('data', data);
  return data.countryCode?.toLowerCase() ?? 'en';
}