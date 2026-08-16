import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactSection } from "@/components/sections/contact-section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    ...buildPageMetadata({
      locale,
      dictionary,
      title: `${dictionary.contact.title} | ${siteConfig.name}`,
      description: dictionary.contact.description,
      path: "/contact",
    }),
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
