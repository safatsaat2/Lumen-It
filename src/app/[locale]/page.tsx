import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { ContactSection } from "@/components/sections/contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkSection } from "@/components/sections/work-section";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { faqSchema } from "@/lib/seo/schemas";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main id="main-content">
        <HeroSection locale={locale} dictionary={dictionary} />
        <ClientsMarquee label={dictionary.clients.label} />
        <AboutSection dictionary={dictionary} />
        <ServicesSection locale={locale} dictionary={dictionary} />
        <WorkSection dictionary={dictionary} />
        <ProcessSection dictionary={dictionary} />
        <PricingSection locale={locale} dictionary={dictionary} />
        <TestimonialsSection dictionary={dictionary} />
        <FAQSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <JsonLd data={faqSchema(dictionary.faq.items)} />
    </>
  );
}
