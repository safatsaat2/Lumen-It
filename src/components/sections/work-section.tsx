import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/ui/remote-image";
import type { Dictionary } from "@/i18n/dictionaries/types";

type WorkSectionProps = {
  dictionary: Dictionary;
};

export function WorkSection({ dictionary }: WorkSectionProps) {
  const featured = dictionary.projects.slice(0, 4);

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge={dictionary.work.badge}
          title={dictionary.work.title}
          description={dictionary.work.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, index) => (
            <article
              key={project.slug}
              className={`group overflow-hidden rounded-3xl border border-border bg-card ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"
                }`}
              >
                <RemoteImage
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="glow">{project.category}</Badge>
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    {project.metrics.map((metric) => (
                      <span key={metric.label} className="text-foreground/90">
                        <strong className="font-semibold">{metric.value}</strong>{" "}
                        <span className="text-muted-foreground">{metric.label}</span>
                      </span>
                    ))}
                  </div>
                  <Link
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    {dictionary.work.viewCase}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
