import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ServiceProvider } from "@/context/ServiceContext";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "SmartCom Solutions",
  description: "Your partner in digital transformation.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`antialiased bg-background text-foreground`}>
        <div className="relative flex flex-col min-h-screen">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ServiceProvider>
              {/* <Header /> */}
              {children}
              <Footer />
            </ServiceProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
