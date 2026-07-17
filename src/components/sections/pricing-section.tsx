"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function formatPrice(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingSection({ locale, dictionary }: PricingSectionProps) {
  const [yearly, setYearly] = useState(false);
  const { pricing } = dictionary;

  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge={pricing.badge}
          title={pricing.title}
          description={pricing.description}
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Label
            htmlFor="billing-toggle"
            className={cn(!yearly && "text-foreground")}
          >
            {pricing.monthly}
          </Label>
          <Switch
            id="billing-toggle"
            checked={yearly}
            onCheckedChange={setYearly}
            aria-label={pricing.yearly}
          />
          <div className="flex items-center gap-2">
            <Label
              htmlFor="billing-toggle"
              className={cn(yearly && "text-foreground")}
            >
              {pricing.yearly}
            </Label>
            <Badge variant="primary">{pricing.save}</Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                tier.highlight
                  ? "border-primary/40 bg-gradient-to-b from-primary/10 to-card shadow-glow"
                  : "border-border bg-card/50",
              )}
            >
              {tier.highlight ? (
                <Badge variant="primary" className="absolute -top-3 left-8">
                  {pricing.mostPopular}
                </Badge>
              ) : null}
              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <p className="mt-6 font-display text-4xl font-semibold tracking-tight">
                {formatPrice(yearly ? tier.yearly : tier.monthly, locale)}
                <span className="text-base font-normal text-muted-foreground">
                  {yearly ? pricing.perYear : pricing.perMonth}
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.highlight ? "primary" : "outline"}
                className="mt-8 w-full"
                asChild
              >
                <Link href="#contact">{tier.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
