import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { localizedPath, siteConfig } from "@/config/site";
import { getLocalizedService, services } from "@/data/services";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schemas";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
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
  const dictionary = await getDictionary(locale);
  const service = getLocalizedService(slug, locale);
  if (!service) return {};

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      locale,
      dictionary,
      title: service.seoTitle,
      description: service.metaDescription,
      path: `/services/${slug}`,
    }),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const service = getLocalizedService(slug, locale);
  if (!service) notFound();

  const Icon = service.icon;
  const url = `${siteConfig.url}${localizedPath(locale, `/services/${slug}`)}`;

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main id="main-content" className="pt-28 pb-20 sm:pt-32 sm:pb-28">
        <article className="container max-w-4xl">
          <Link
            href={`${localizedPath(locale)}#services`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {dictionary.services.backToServices}
          </Link>

          <div
            className={cn(
              "mb-8 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
              service.accent,
            )}
          >
            <Icon className="size-6" aria-hidden />
          </div>

          <h1 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{service.short}</p>
          <p className="mt-8 text-base leading-relaxed text-foreground/90">
            {service.long}
          </p>

          <section className="mt-12" aria-labelledby="benefits-heading">
            <h2
              id="benefits-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {dictionary.services.benefitsLabel}
            </h2>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 rounded-2xl border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href={`${localizedPath(locale)}#contact`}>{service.cta}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`${localizedPath(locale)}#contact`}>
                {dictionary.services.relatedCta}
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          url,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: siteConfig.name, href: localizedPath(locale) },
          { name: dictionary.nav.services, href: `${localizedPath(locale)}#services` },
          {
            name: service.title,
            href: localizedPath(locale, `/services/${slug}`),
          },
        ])}
      />
    </>
  );
}
