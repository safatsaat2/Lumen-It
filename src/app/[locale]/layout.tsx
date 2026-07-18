import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { FloatingLanguageToggle } from "@/components/layout/floating-language-toggle";
import { HtmlLang } from "@/components/layout/html-lang";
import { JsonLd } from "@/components/seo/json-ld";
import { OfferBanner } from "@/components/layout/offer-banner";
import { siteConfig } from "@/config/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { readSiteContent } from "@/lib/content-store";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({ locale, dictionary }),
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const [dictionary, content] = await Promise.all([
    getDictionary(locale),
    readSiteContent(),
  ]);

  return (
    <>
      <HtmlLang locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:shadow-elevated"
      >
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <OfferBanner offer={content.consultation.offerBanner} />
      {children}
      <FloatingLanguageToggle
        locale={locale}
        label={dictionary.language.switchTo}
      />
      <JsonLd data={organizationSchema(dictionary.meta.description)} />
      <JsonLd data={websiteSchema(locale)} />
    </>
  );
}
