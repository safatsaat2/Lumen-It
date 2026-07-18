import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";

import { ConsultationExperience } from "@/components/consultation/consultation-experience";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { toPublicJourney } from "@/lib/consultation/service";
import { isValidConsultationId } from "@/lib/consultation/types";
import { readSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const de = locale === "de";
  return {
    title: de ? "KI Business-Berater · MIHI's" : "AI Branding Consultant · MIHI's",
    description: de
      ? "Kostenlose, KI-gestützte Marken- und Geschäftsberatung mit individueller Strategie und PDF-Bericht."
      : "Free AI-powered branding and business consultation with a personalized strategy and downloadable report.",
    alternates: {
      canonical: `/${locale}/consultation`,
      languages: { de: "/de/consultation", en: "/en/consultation" },
    },
  };
}

export default async function ConsultationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const [{ locale: localeParam }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const de = locale === "de";
  const [dictionary, content] = await Promise.all([
    getDictionary(locale),
    readSiteContent(),
  ]);
  const journeys = content.consultation.journeys
    .filter((journey) => journey.enabled)
    .map(toPublicJourney);
  const requestedId = isValidConsultationId(query.id) ? query.id : undefined;

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} siteName={content.settings.name} />
      <main id="main-content" className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] grid-bg opacity-30" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-16 size-[28rem] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[110px]" aria-hidden />
        <section className="container relative">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <Badge variant="glow">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              {de ? "Kostenlose KI-Beratung" : "Free AI consultation"}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {de ? "KI Business-Berater" : "AI Branding Consultant"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {de
                ? "Beantworten Sie kurze, fokussierte Fragen. Unsere KI entwickelt daraus eine individuelle Marken-, Marketing- und Wachstumsstrategie."
                : "Answer a few focused questions. Our AI turns your context into a personalized brand, marketing, and growth strategy."}
            </p>
          </div>
          <ConsultationExperience
            locale={locale}
            journeys={journeys}
            requestedId={requestedId}
          />
        </section>
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
