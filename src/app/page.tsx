import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { ContactSection } from "@/components/sections/contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkSection } from "@/components/sections/work-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ClientsMarquee />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
