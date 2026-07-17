import { Star } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { RemoteImage } from "@/components/ui/remote-image";
import type { Dictionary } from "@/i18n/dictionaries/types";

type TestimonialsSectionProps = {
  dictionary: Dictionary;
};

export function TestimonialsSection({ dictionary }: TestimonialsSectionProps) {
  const { testimonials } = dictionary;

  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="container space-y-14">
        <SectionHeading
          badge={testimonials.badge}
          title={testimonials.title}
          description={testimonials.description}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.items.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col rounded-3xl border border-border bg-card/60 p-6"
            >
              <div
                className="flex gap-0.5 text-amber-400"
                aria-label={`${item.rating} / 5`}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <RemoteImage
                  src={item.avatar}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.role}, {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
