import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const { hero } = dictionary;

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-20 size-[28rem] rounded-full bg-violet-600/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 size-[24rem] rounded-full bg-fuchsia-500/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 size-[20rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[80px]"
        aria-hidden
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Badge variant="glow" className="mb-6 animate-fade-up">
            <span
              className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]"
              aria-hidden
            />
            {hero.badge}
          </Badge>

          <h1 className="animate-fade-up font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl [animation-delay:80ms]">
            {hero.titleBefore}{" "}
            <span className="gradient-brand">{hero.titleHighlight}</span>
            {hero.titleAfter}
          </h1>

          <p className="mt-6 max-w-2xl animate-fade-up text-pretty text-base text-muted-foreground sm:text-lg [animation-delay:160ms]">
            {hero.description}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row sm:justify-center [animation-delay:240ms]">
            <Button variant="primary" size="lg" asChild>
              <a href="#contact">
                {hero.ctaPrimary}
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`${localizedPath(locale)}#services`}>
                {hero.ctaSecondary}
              </Link>
            </Button>
          </div>

          <p className="mt-8 animate-fade-up text-sm text-muted-foreground [animation-delay:320ms]">
            {hero.trust}
          </p>
        </div>
      </div>
    </section>
  );
}
