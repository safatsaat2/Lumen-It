import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, Clock } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { localizedPath, siteConfig } from "@/config/site";
import { blogSlugs, getPostBySlug, getRelatedPosts } from "@/data/posts";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { readSiteContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogSlugs.map((slug) => ({ locale, slug })),
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
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      locale,
      dictionary,
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      path: `/blog/${slug}`,
    }),
  };
}

function PostBody({
  content,
  locale,
}: {
  content: string;
  locale: Locale;
}) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={block}
              className="pt-4 font-display text-2xl font-semibold tracking-tight"
            >
              {block.replace(/^## /, "")}
            </h2>
          );
        }
        return (
          <p key={block}>
            <LinkedText text={block} locale={locale} />
          </p>
        );
      })}
    </div>
  );
}

function LinkedText({ text, locale }: { text: string; locale: Locale }) {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={localizedPath(locale, match[2])}
        className="font-medium text-primary hover:underline"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return <>{nodes}</>;
}

export default async function BlogPostPage({
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
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();
  const related = getRelatedPosts(slug, locale);
  const url = `${siteConfig.url}${localizedPath(locale, `/blog/${slug}`)}`;

  return (
    <>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        siteName={content.settings.name}
      />
      <main id="main-content" className="container max-w-3xl py-28 sm:py-32">
        <Link
          href={localizedPath(locale, "/blog")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {dictionary.blog.backToBlog}
        </Link>
        <Badge variant="outline">{post.category}</Badge>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, locale)}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readingTimeMin} {dictionary.blog.minRead}
          </span>
        </div>
        <p className="mt-6 text-lg text-muted-foreground">{post.description}</p>
        <PostBody content={post.content} locale={locale} />

        <nav className="mt-14 border-t border-border pt-8">
          <p className="text-sm font-medium">{dictionary.blog.relatedServices}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {post.relatedPaths.map((item) => (
              <li key={item.path}>
                <Link
                  href={localizedPath(locale, item.path)}
                  className="text-sm text-primary hover:underline"
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              {dictionary.blog.related}
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizedPath(locale, `/blog/${item.slug}`)}
                    className="text-sm text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <SiteFooter
        locale={locale}
        dictionary={dictionary}
        social={content.social}
        settings={content.settings}
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          url,
          datePublished: post.publishedAt,
          locale,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: content.settings.name, href: localizedPath(locale) },
          { name: dictionary.nav.blog, href: localizedPath(locale, "/blog") },
          {
            name: post.title,
            href: localizedPath(locale, `/blog/${slug}`),
          },
        ])}
      />
    </>
  );
}
