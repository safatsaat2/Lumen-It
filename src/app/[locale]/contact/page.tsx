import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactSection } from "@/components/sections/contact-section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const dictionary = await getDictionary(localeParam);

  return {
    title: `${dictionary.contact.title} · MIHI's`,
    description: dictionary.contact.description,
    alternates: {
      canonical: `/${localeParam}/contact`,
      languages: { de: "/de/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
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
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content" className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] grid-bg opacity-25"
          aria-hidden
        />
        <ContactSection
          dictionary={dictionary}
          settings={content.settings}
          templates={content.templates}
        />
      </main>
      <SiteFooter
        locale={locale}
        dictionary={dictionary}
        social={content.social}
        settings={content.settings}
      />
    </>
  );
}
