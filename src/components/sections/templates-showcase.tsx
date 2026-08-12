import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { TemplateCard } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import { getFeaturedTemplates, type WebsiteTemplate } from "@/data/templates";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

export function TemplatesShowcase({
  locale,
  dictionary,
  templates,
}: {
  locale: Locale;
  dictionary: Dictionary;
  templates: WebsiteTemplate[];
}) {
  const copy = dictionary.templates;
  const featured = getFeaturedTemplates(templates).slice(0, 12);
  const cardCopy = {
    preview: copy.preview,
    getTemplate: copy.getTemplate,
    templateId: copy.templateId,
  };

  return (
    <section
      id="templates"
      className="relative scroll-mt-24 overflow-hidden border-y border-border/70 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-24 size-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]"
        aria-hidden
      />
      <div className="container relative">
        <SectionHeading
          badge={copy.badge}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              locale={locale}
              copy={cardCopy}
              priority={index < 3}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link href={localizedPath(locale, "/templates")}>
              {copy.viewAll}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
