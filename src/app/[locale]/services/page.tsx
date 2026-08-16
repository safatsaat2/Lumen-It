import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Wrench } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import { resolveServiceIcon } from "@/data/service-icons";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";
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
  const dictionary = await getDictionary(localeParam);

  return {
    title: `${dictionary.services.pageTitle} · MIHI's`,
    description: dictionary.services.pageDescription,
    alternates: {
      canonical: `/${localeParam}/services`,
      languages: { de: "/de/services", en: "/en/services" },
    },
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
                    href={localizedPath(locale, `/services/${service.slug}`)}
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
