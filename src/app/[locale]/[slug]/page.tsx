import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoLandingArticle } from "@/components/seo/seo-landing-article";
import { siteConfig } from "@/config/site";
import {
  getSeoPage,
  legalSlugs,
  seoPagesForLocale,
} from "@/data/seo-pages";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent, type LegalBundle } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";

type LegalSlug = keyof LegalBundle;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [...legalSlugs, ...seoPagesForLocale(locale).map((page) => page.slug)].map(
      (slug) => ({ locale, slug }),
    ),
  );
}

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

  const legal = content.legal[locale][slug as LegalSlug];
  if (legal) {
    return {
      metadataBase: new URL(siteConfig.url),
      ...buildPageMetadata({
        locale,
        dictionary,
        title: `${legal.title} | ${content.settings.name}`,
        description: legal.description,
        path: `/${slug}`,
      }),
    };
  }

  const seo = getSeoPage(slug, locale);
  if (!seo) return {};
  const copy = seo[locale];
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      locale,
      dictionary,
      title: copy.title,
      description: copy.description,
      path: `/${slug}`,
      keywords: seo.keywords[locale],
    }),
  };
}

export default async function LocaleSlugPage({
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

  const legal = content.legal[locale][slug as LegalSlug];
  if (legal) {
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
              {legal.title}
            </h1>
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
              {legal.body.map((paragraph) => (
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

  const seo = getSeoPage(slug, locale);
  if (!seo) notFound();
  const copy = seo[locale];

  return (
    <>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content">
        <SeoLandingArticle locale={locale} page={seo} />
      </main>
      <SiteFooter
        locale={locale}
        dictionary={dictionary}
        social={content.social}
        settings={content.settings}
      />
      {copy.faqs.length > 0 ? <JsonLd data={faqSchema(copy.faqs)} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: content.settings.name, href: `/${locale}` },
          { name: copy.h1, href: `/${locale}/${slug}` },
        ])}
      />
    </>
  );
}
