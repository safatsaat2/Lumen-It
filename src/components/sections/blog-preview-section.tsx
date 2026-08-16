import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { localizedPath } from "@/config/site";
import { getPosts } from "@/data/posts";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { formatDate } from "@/lib/utils";

export function BlogPreviewSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const latest = getPosts(locale).slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="container space-y-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            badge={dictionary.blog.badge}
            title={dictionary.blog.title}
            description={dictionary.blog.description}
            align="left"
            className="mx-0"
          />
          <Link
            href={localizedPath(locale, "/blog")}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {dictionary.blog.viewAll}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-3xl border border-border bg-card/50 transition-colors hover:bg-card"
            >
              <div className="space-y-3 p-6">
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
                  <Link href={localizedPath(locale, `/blog/${post.slug}`)}>
                    {post.title}
                  </Link>
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, locale)}
                  </time>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readingTimeMin} {dictionary.blog.minRead}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
