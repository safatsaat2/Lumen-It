"use client";

import { SectionHeading } from "@/components/layout/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/i18n/dictionaries/types";

type FAQSectionProps = {
  dictionary: Dictionary;
};

export function FAQSection({ dictionary }: FAQSectionProps) {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge={dictionary.faq.badge}
          title={dictionary.faq.title}
          description={dictionary.faq.description}
        />

        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {dictionary.faq.items.map((item, index) => (
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
