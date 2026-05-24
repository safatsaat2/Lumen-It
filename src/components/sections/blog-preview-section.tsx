import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/ui/remote-image";
import { posts } from "@/data/posts";
import { formatDate } from "@/lib/utils";

export function BlogPreviewSection() {
  const latest = posts.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="container space-y-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            badge="Insights"
            title="From the studio"
            description="Strategy, engineering and design thinking — fresh from the team."
            align="left"
            className="mx-0"
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all posts
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-3xl border border-border bg-card/50 transition-colors hover:bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <RemoteImage
                  src={post.cover}
                  alt=""
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-6">
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {post.readingTimeMin ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readingTimeMin} min read
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
