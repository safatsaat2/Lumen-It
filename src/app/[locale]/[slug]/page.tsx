import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent, type LegalBundle } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";

type LegalSlug = keyof LegalBundle;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const [dictionary, content] = await Promise.all([
    getDictionary(locale),
    readSiteContent(),
  ]);
  const page = content.legal[locale][slug as LegalSlug];
  if (!page) return {};

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      locale,
      dictionary,
      title: `${page.title} | ${content.settings.name}`,
      description: page.description,
      path: `/${slug}`,
    }),
  };
}

export function generateStaticParams() {
  return (["de", "en"] as const).flatMap((locale) =>
    (["privacy", "terms", "cookies"] as const).map((slug) => ({ locale, slug })),
  );
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const [dictionary, content] = await Promise.all([
    getDictionary(locale),
    readSiteContent(),
  ]);
  const page = content.legal[locale][slug as LegalSlug];
  if (!page) notFound();

  return (
    <>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content" className="container max-w-3xl py-28 sm:py-32">
        <article>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {page.title}
          </h1>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
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
