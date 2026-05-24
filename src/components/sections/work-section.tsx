import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/ui/remote-image";
import { projects } from "@/data/projects";

export function WorkSection() {
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge="Work"
          title="Outcomes, not just deliverables"
          description="A sample of recent launches across brand, product, web, AI and growth."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, index) => (
            <article
              key={project.slug}
              className={`group overflow-hidden rounded-3xl border border-border bg-card ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
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
                    {project.client} · {project.year}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 border-t border-border p-6 sm:grid-cols-3 sm:p-8">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-2xl font-semibold">{metric.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Discuss your project
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
