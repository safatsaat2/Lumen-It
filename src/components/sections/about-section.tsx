import { SectionHeading } from "@/components/layout/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/types";

type AboutSectionProps = {
  dictionary: Dictionary;
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  const { about } = dictionary;

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container space-y-16">
        <SectionHeading
          badge={about.badge}
          title={about.title}
          description={about.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:bg-card"
            >
              <p className="font-display text-4xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 font-medium">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {about.storyTitle}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{about.storyP1}</p>
            <p className="text-muted-foreground leading-relaxed">{about.storyP2}</p>
          </div>

          <ol className="space-y-6 border-l border-border pl-6">
            {about.timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span
                  className="absolute -left-[1.6rem] top-1.5 size-2 rounded-full bg-primary"
                  aria-hidden
                />
                <p className="font-mono text-xs text-primary">{entry.year}</p>
                <p className="mt-1 font-medium">{entry.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
