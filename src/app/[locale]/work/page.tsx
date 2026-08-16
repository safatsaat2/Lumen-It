import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Briefcase } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/ui/remote-image";
import { localizedPath } from "@/config/site";
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
      title: `${dictionary.work.pageTitle} | ${siteConfig.name}`,
      description: dictionary.work.pageDescription,
      path: "/work",
    }),
  };
}

export default async function WorkIndexPage({
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
  const projects = dictionary.projects;
  const contactHref = localizedPath(locale, "/contact");

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
              <Briefcase className="size-4 text-primary" aria-hidden />
              {dictionary.work.badge}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {dictionary.work.pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dictionary.work.pageDescription}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <RemoteImage
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="glow">{project.category}</Badge>
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      {project.metrics.map((metric) => (
                        <span key={metric.label} className="text-foreground/90">
                          <strong className="font-semibold">{metric.value}</strong>{" "}
                          <span className="text-muted-foreground">
                            {metric.label}
                          </span>
                        </span>
                      ))}
                    </div>
                    <Link
                      href={contactHref}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      {dictionary.work.viewCase}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
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
