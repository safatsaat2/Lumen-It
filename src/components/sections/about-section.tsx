import { SectionHeading } from "@/components/layout/section-heading";
import { stats, timeline } from "@/data/stats";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container space-y-16">
        <SectionHeading
          badge="About"
          title={`${siteConfig.name} is a studio built for momentum`}
          description="Strategy, brand, product and engineering under one roof — so you ship faster without sacrificing craft."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:bg-card"
            >
              <p className="font-display text-4xl font-semibold tracking-tight">
                {stat.value}
                {stat.suffix ?? ""}
              </p>
              <p className="mt-2 font-medium">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Our story</h3>
            <p className="text-muted-foreground leading-relaxed">
              Founded in {siteConfig.founded}, {siteConfig.name} started as a tight crew of designers
              and engineers obsessed with shipping work that compounds — not one-off deliverables.
              Today we&apos;re 38 people across San Francisco and Lisbon, partnering with founders
              from pre-seed to enterprise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We measure success in business outcomes: pipeline, retention, performance scores and
              the systems your team can own after handoff.
            </p>
          </div>

          <ol className="space-y-6 border-l border-border pl-6">
            {timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 size-2 rounded-full bg-primary" />
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
