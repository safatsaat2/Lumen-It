"use client";

import { SectionHeading } from "@/components/layout/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge="FAQ"
          title="Questions we hear often"
          description="Still curious? Reach out — we reply within one business day."
        />

        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
