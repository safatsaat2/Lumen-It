import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { localizedPath, siteConfig } from "@/config/site";
import { getPosts } from "@/data/posts";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

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
      title: `${dictionary.blog.pageTitle} | ${siteConfig.name}`,
      description: dictionary.blog.pageDescription,
      path: "/blog",
    }),
  };
}

export default async function BlogIndexPage({
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
  const posts = getPosts(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content" className="container max-w-4xl py-28 sm:py-32">
        <Badge variant="eyebrow">{dictionary.blog.badge}</Badge>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {dictionary.blog.pageTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {dictionary.blog.pageDescription}
        </p>

        <div className="mt-14 space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-border bg-card/50 p-6 sm:p-8"
            >
              <Badge variant="outline">{post.category}</Badge>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                <Link
                  href={localizedPath(locale, `/blog/${post.slug}`)}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt, locale)}
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" aria-hidden />
                  {post.readingTimeMin} {dictionary.blog.minRead}
                </span>
              </div>
            </article>
          ))}
        </div>
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
