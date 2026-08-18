import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Wrench } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizedPath, siteConfig } from "@/config/site";
import { resolveServiceIcon } from "@/data/service-icons";
import { publicServiceSlug } from "@/data/services";
import { seoLandingPages } from "@/data/seo-pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

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
      title: `${dictionary.services.pageTitle} | ${siteConfig.name}`,
      description: dictionary.services.pageDescription,
      path: "/services",
    }),
  };
}

export default async function ServicesIndexPage({
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
      <main
        id="main-content"
        className="relative overflow-hidden pb-24 pt-28 sm:pt-32"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] grid-bg opacity-30"
          aria-hidden
        />
        <section className="container relative space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="eyebrow">
              <Wrench className="size-4 text-primary" aria-hidden />
              {dictionary.services.badge}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {dictionary.services.pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dictionary.services.pageDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {content.services.map((service) => {
              const Icon = resolveServiceIcon(service.icon);
              return (
                <article
                  key={service.slug}
                  className="group flex flex-col rounded-3xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-elevated"
                >
                  <div
                    className={cn(
                      "mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
                      service.accent,
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {service.title[locale]}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {service.short[locale]}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.benefits[locale].map((feature) => (
                      <li key={feature} className="text-xs text-muted-foreground">
                        · {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizedPath(locale, `/services/${publicServiceSlug(service, locale)}`)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    {dictionary.services.learnMore}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href={localizedPath(locale, "/contact")}>
                {dictionary.services.relatedCta}
              </Link>
            </Button>
          </div>

          <nav className="mx-auto max-w-3xl border-t border-border pt-10 text-center">
            <p className="text-sm font-medium">
              {locale === "de" ? "Themen" : "Topics"}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {seoLandingPages
                .filter(
                  (page) =>
                    (!page.locales || page.locales.includes(locale)) &&
                    (page.kind === "topic" ||
                      (locale === "de" && page.slug.includes("dortmund"))),
                )
                .map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={localizedPath(locale, `/${page.slug}`)}
                      className="text-sm text-primary hover:underline"
                    >
                      {page[locale].h1.split("—")[0].split(":")[0].trim()}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href={localizedPath(locale, "/consultation")}
                  className="text-sm text-primary hover:underline"
                >
                  {dictionary.nav.consultation}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/blog")}
                  className="text-sm text-primary hover:underline"
                >
                  {dictionary.nav.blog}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
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
