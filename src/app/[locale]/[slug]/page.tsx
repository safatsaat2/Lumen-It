import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";

const legalCopy = {
  de: {
    privacy: {
      title: "Datenschutzerklärung",
      description: "Informationen zur Verarbeitung personenbezogener Daten bei MIHI's.",
      body: [
        "Wir verarbeiten personenbezogene Daten ausschließlich zur Bearbeitung Ihrer Anfragen und zur Bereitstellung dieser Website.",
        "Kontaktformular-Daten (Name, E-Mail, optional Telefon, Betreff, Nachricht) werden an uns übermittelt, um Ihre Anfrage zu beantworten, und nicht an Dritte verkauft.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO. Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen.",
        `Kontakt: ${siteConfig.email}`,
      ],
    },
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      description: "Rahmenbedingungen für die Zusammenarbeit mit MIHI's.",
      body: [
        "Leistungen werden individuell angeboten und schriftlich bestätigt.",
        "Preise verstehen sich zuzüglich gesetzlicher Umsatzsteuer, sofern nicht anders vereinbart.",
        "Geistiges Eigentum an gelieferten Arbeiten geht nach vollständiger Zahlung gemäß Projektvereinbarung über.",
        "Es gilt das Recht der Bundesrepublik Deutschland.",
      ],
    },
    cookies: {
      title: "Cookie-Hinweis",
      description: "Informationen zu Cookies und ähnlichen Technologien.",
      body: [
        "Diese Website setzt technisch notwendige Cookies bzw. lokale Speicherung für Theme- und Spracheinstellungen ein.",
        "Es werden keine Tracking-Cookies von Drittanbietern ohne Ihre Einwilligung gesetzt.",
        "Sie können Cookies in Ihren Browsereinstellungen jederzeit löschen oder blockieren.",
      ],
    },
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      description: "How MIHI's processes personal data.",
      body: [
        "We process personal data only to handle your inquiries and to operate this website.",
        "Contact form data (name, email, optional phone, subject, message) is sent to us so we can reply and is not sold to third parties.",
        "Legal bases include Art. 6(1)(b) and (f) GDPR. You may request access, correction, or deletion of your data.",
        `Contact: ${siteConfig.email}`,
      ],
    },
    terms: {
      title: "Terms of Service",
      description: "Framework terms for working with MIHI's.",
      body: [
        "Services are scoped individually and confirmed in writing.",
        "Prices are exclusive of statutory VAT unless otherwise agreed.",
        "Intellectual property in delivered work transfers after full payment as defined in the project agreement.",
        "The laws of the Federal Republic of Germany apply.",
      ],
    },
    cookies: {
      title: "Cookie Notice",
      description: "Information about cookies and similar technologies.",
      body: [
        "This site uses technically necessary cookies or local storage for theme and language preferences.",
        "No third-party tracking cookies are set without your consent.",
        "You can delete or block cookies in your browser settings at any time.",
      ],
    },
  },
} as const;

type LegalSlug = keyof typeof legalCopy.de;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const page = legalCopy[locale][slug as LegalSlug];
  if (!page) return {};

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      locale,
      dictionary,
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      path: `/${slug}`,
    }),
  };
}

export function generateStaticParams() {
  return (["de", "en"] as const).flatMap((locale) =>
    (["privacy", "terms", "cookies"] as const).map((slug) => ({ locale, slug })),
  );
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const page = legalCopy[locale][slug as LegalSlug];
  if (!page) notFound();

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main id="main-content" className="container max-w-3xl py-28 sm:py-32">
        <article>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {page.title}
          </h1>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
