import {
  Compass,
  PenTool,
  Rocket,
  Wrench,
} from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { cn } from "@/lib/utils";

const stepIcons = [Compass, PenTool, Wrench, Rocket];

type ProcessSectionProps = {
  dictionary: Dictionary;
};

export function ProcessSection({ dictionary }: ProcessSectionProps) {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-border/60 bg-muted/20 py-20 sm:py-28"
    >
      <div className="container space-y-14">
        <SectionHeading
          badge={dictionary.process.badge}
          title={dictionary.process.title}
          description={dictionary.process.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {dictionary.process.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Compass;
            return (
              <article
                key={step.step}
                className="rounded-3xl border border-border bg-card/60 p-8 transition-colors hover:bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-muted-foreground">{step.step}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-xs text-muted-foreground",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
