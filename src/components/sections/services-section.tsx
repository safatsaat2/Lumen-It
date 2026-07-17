import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { localizedPath } from "@/config/site";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { cn } from "@/lib/utils";

type ServicesSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ServicesSection({ locale, dictionary }: ServicesSectionProps) {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge={dictionary.services.badge}
          title={dictionary.services.title}
          description={dictionary.services.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
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
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {service.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {service.short[locale]}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.benefits[locale].slice(0, 3).map((feature) => (
                    <li key={feature} className="text-xs text-muted-foreground">
                      · {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizedPath(locale, `/services/${service.slug}`)}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-opacity group-hover:opacity-100 sm:opacity-80"
                >
                  {dictionary.services.learnMore}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Badge variant="accent">{dictionary.services.footerNote}</Badge>
        </div>
      </div>
    </section>
  );
}
