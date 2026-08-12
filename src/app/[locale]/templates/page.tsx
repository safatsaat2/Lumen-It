import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutTemplate } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { Badge } from "@/components/ui/badge";
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
  const copy = dictionary.templates;

  return {
    title: `${copy.pageTitle} · MIHI's`,
    description: copy.pageDescription,
    alternates: {
      canonical: `/${localeParam}/templates`,
      languages: { de: "/de/templates", en: "/en/templates" },
    },
  };
}

export default async function TemplatesPage({
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
  const copy = dictionary.templates;
  const allTemplates = content.templates;

  return (
    <>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content" className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] grid-bg opacity-30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-16 size-[28rem] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[110px]"
          aria-hidden
        />
        <section className="container relative">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <Badge variant="glow">
              <LayoutTemplate className="size-3.5 text-primary" aria-hidden />
              {copy.badge}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {copy.pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.pageDescription}
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {copy.results.replace("{count}", String(allTemplates.length))}
            </p>
          </div>

          <TemplateGallery
            locale={locale}
            initialTemplates={allTemplates}
            copy={{
              preview: copy.preview,
              getTemplate: copy.getTemplate,
              templateId: copy.templateId,
              all: copy.all,
              filterLabel: copy.filterLabel,
              results: copy.results,
              empty: copy.empty,
            }}
          />
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
