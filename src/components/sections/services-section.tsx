import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge="Services"
          title="Everything you need to launch and scale"
          description="Eight practices. One senior team. Pick a lane or engage us end-to-end."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-xs text-muted-foreground">
                      · {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Learn more
                  <ArrowUpRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Badge variant="accent">Need something bespoke? We scope custom engagements.</Badge>
        </div>
      </div>
    </section>
  );
}
