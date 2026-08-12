"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { WebsiteTemplate } from "@/data/templates";
import { cn } from "@/lib/utils";

export type TemplateCardCopy = {
  preview: string;
  getTemplate: string;
  templateId: string;
};

type TemplateCardProps = {
  template: WebsiteTemplate;
  locale: Locale;
  copy: TemplateCardCopy;
  priority?: boolean;
};

export function TemplateCard({
  template,
  locale,
  copy,
  priority = false,
}: TemplateCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const getHref = `${localizedPath(locale, "/contact")}?template=${encodeURIComponent(template.id)}`;

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;
    setScrollDistance(Math.max(0, image.offsetHeight - frame.clientHeight));
  }, []);

  useEffect(() => {
    measure();
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(frame);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 shadow-sm transition hover:border-primary/30 hover:shadow-elevated">
      <div
        ref={frameRef}
        className="relative h-[195.219px] max-h-[195.219px] cursor-pointer overflow-hidden bg-muted"
        onMouseEnter={() => setPreviewing(true)}
        onMouseLeave={() => setPreviewing(false)}
        onFocus={() => setPreviewing(true)}
        onBlur={() => setPreviewing(false)}
        onClick={() => setPreviewing((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setPreviewing((open) => !open);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={previewing}
        aria-label={`${template.name} homepage preview`}
      >
        <Image
          ref={imageRef}
          src={template.image}
          alt={`${template.name} website homepage`}
          width={1200}
          height={4800}
          onLoad={measure}
          className={cn(
            "absolute inset-x-0 top-0 h-auto w-full will-change-transform",
            "transition-transform ease-in-out",
          )}
          style={{
            transform: previewing
              ? `translate3d(0, -${scrollDistance}px, 0)`
              : "translate3d(0, 0, 0)",
            transitionDuration: `${Math.min(12, Math.max(4, scrollDistance / 180))}s`,
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          unoptimized={template.image.startsWith("http")}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/75 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {template.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="glow" className="backdrop-blur-md">
              {category}
            </Badge>
          ))}
        </div>
        <p className="absolute bottom-3 left-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground">
          {copy.templateId}: {template.id}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {template.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {template.categories.join(" · ")}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a
              href={template.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.preview}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </Button>
          <Button variant="primary" size="sm" className="flex-1" asChild>
            <Link href={getHref}>
              <ShoppingBag className="size-3.5" aria-hidden />
              {copy.getTemplate}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
