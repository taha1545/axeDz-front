import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { QueryProvider } from "@/providers/query-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { CustomToaster } from "@/components/custom-toast";
import { getPageMetadata } from "@/lib/metadata";

const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  return getPageMetadata("/", locale as Locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  //
  const { locale } = await params;
  setRequestLocale(locale);
  //
  const messages = await getMessages();
  //
  return (
    <NextIntlClientProvider messages={messages}>
      <CookieConsent />
      <CustomToaster />
      <QueryProvider>
        {children}
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
