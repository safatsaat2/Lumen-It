import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { SeoLandingPage } from "@/data/seo-pages";

export function SeoLandingArticle({
  locale,
  page,
}: {
  locale: Locale;
  page: SeoLandingPage;
}) {
  const copy = page[locale];

  return (
    <article className="container max-w-3xl py-28 sm:py-32">
      <h1 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {copy.h1}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>

      {copy.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {section.heading}
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/90">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      {copy.faqs.length > 0 ? (
        <section className="mt-12" aria-labelledby="seo-faq-heading">
          <h2
            id="seo-faq-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            FAQ
          </h2>
          <dl className="mt-6 space-y-6">
            {copy.faqs.map((item) => (
              <div key={item.question}>
                <dt className="font-medium">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className="mt-12 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" asChild>
          <Link href={localizedPath(locale, copy.ctaPath)}>
            {copy.ctaLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href={localizedPath(locale, "/contact")}>
            {locale === "de" ? "Kontakt" : "Contact"}
          </Link>
        </Button>
      </div>

      <nav className="mt-14 border-t border-border pt-8" aria-label="Related">
        <p className="text-sm font-medium">
          {locale === "de" ? "Weiterlesen" : "Continue"}
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {copy.related.map((item) => (
            <li key={item.path}>
              <Link
                href={localizedPath(locale, item.path)}
                className="text-sm text-primary hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
