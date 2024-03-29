import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { unstable_setRequestLocale } from 'next-intl/server';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Can be imported from a shared config
const locales = ['en', 'es', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  console.log('locale', locale);

  return (
    <html lang={locale ?? 'en'}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}