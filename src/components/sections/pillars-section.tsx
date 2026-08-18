import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

export function PillarsSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="container space-y-12">
        <SectionHeading
          badge={dictionary.pillars.badge}
          title={dictionary.pillars.title}
          description={dictionary.pillars.description}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.pillars.items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-border bg-card/40 p-6"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight">
                <Link
                  href={localizedPath(locale, item.href)}
                  className="hover:text-primary"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-5 space-y-2">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizedPath(locale, link.href)}
                      className="text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
