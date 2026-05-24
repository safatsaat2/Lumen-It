import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
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
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
            Now booking Q3 2026 engagements
          </Badge>

          <h1 className="animate-fade-up font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl [animation-delay:80ms]">
            We craft brands &{" "}
            <span className="gradient-brand">digital products</span> that scale
          </h1>

          <p className="mt-6 max-w-2xl animate-fade-up text-pretty text-base text-muted-foreground sm:text-lg [animation-delay:160ms]">
            {siteConfig.name} is a premium studio for ambitious founders — brand identity,
            Next.js platforms, and production AI, shipped by a senior team in one sprint cadence.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row sm:justify-center [animation-delay:240ms]">
            <Button variant="primary" size="lg" asChild>
              <Link href="#contact">
                Start a project
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#work">
                <Play className="fill-foreground text-foreground" />
                View our work
              </Link>
            </Button>
          </div>

          <p className="mt-8 animate-fade-up text-sm text-muted-foreground [animation-delay:320ms]">
            {siteConfig.tagline} · Trusted by 180+ teams worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
