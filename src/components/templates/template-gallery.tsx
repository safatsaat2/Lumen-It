"use client";

import { useMemo, useState } from "react";

import { TemplateCard, type TemplateCardCopy } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import {
  filterTemplatesByCategory,
  type WebsiteTemplate,
} from "@/data/templates";
import { cn } from "@/lib/utils";

type TemplateGalleryProps = {
  locale: Locale;
  copy: TemplateCardCopy & {
    all: string;
    filterLabel: string;
    results: string;
    empty: string;
  };
  initialTemplates: WebsiteTemplate[];
  showFilters?: boolean;
};

export function TemplateGallery({
  locale,
  copy,
  initialTemplates,
  showFilters = true,
}: TemplateGalleryProps) {
  const [active, setActive] = useState<string>("all");

  const rankedCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const template of initialTemplates) {
      for (const category of template.categories) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      }
    }

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .filter((category) => category.count >= 2)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [initialTemplates]);

  const templates = useMemo(
    () => filterTemplatesByCategory(active, initialTemplates),
    [active, initialTemplates],
  );

  return (
    <div className="space-y-8">
      {showFilters ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {copy.filterLabel}
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={copy.filterLabel}
          >
            <FilterChip
              active={active === "all"}
              onClick={() => setActive("all")}
              label={copy.all}
              count={initialTemplates.length}
            />
            {rankedCategories.map((category) => (
              <FilterChip
                key={category.name}
                active={active === category.name}
                onClick={() => setActive(category.name)}
                label={category.name}
                count={category.count}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {copy.results.replace("{count}", String(templates.length))}
          </p>
        </div>
      ) : null}

      {templates.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
          {copy.empty}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              locale={locale}
              copy={copy}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <Button
      type="button"
      role="tab"
      aria-selected={active}
      size="sm"
      variant={active ? "primary" : "outline"}
      className={cn("gap-1.5 rounded-full", !active && "bg-background/60")}
      onClick={onClick}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums leading-none",
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-foreground/10 text-muted-foreground",
        )}
      >
        {count}
      </span>
    </Button>
  );
}
