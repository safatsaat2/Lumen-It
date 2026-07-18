"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BrainCircuit, Check, Sparkles, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

export function AiConsultantPromo({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = dictionary.consultationPromo;
  const reducedMotion = useReducedMotion();
  const consultationHref = localizedPath(locale, "/consultation");

  return (
    <section
      id="ai-consultant"
      className="relative scroll-mt-24 overflow-hidden border-y border-border/70 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[120px]" aria-hidden />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            // Avoid layout thrash / removeChild races during route unmount.
            layout={false}
          >
            <Badge variant="glow" className="mb-5">
              <Sparkles aria-hidden className="size-3.5 text-primary" />
              {copy.badge}
            </Badge>
            <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" asChild>
                <Link href={consultationHref}>
                  {copy.start}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#ai-consultant-details">{copy.learnMore}</a>
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {copy.trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            id="ai-consultant-details"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            layout={false}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500/25 via-fuchsia-500/10 to-amber-400/20 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-card/85 p-6 shadow-elevated backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BrainCircuit aria-hidden />
                </span>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  AI · Private session
                </span>
              </div>
              <div className="mt-8 space-y-3">
                {[82, 68, 91].map((width, index) => (
                  <motion.div
                    key={width}
                    initial={reducedMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.25 + index * 0.12 }}
                    style={{ width: `${width}%`, transformOrigin: "left" }}
                    className="h-3 rounded-full bg-gradient-to-r from-violet-500/70 via-fuchsia-500/60 to-amber-400/60"
                    layout={false}
                  />
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-border bg-background/70 p-5">
                <WandSparkles className="mb-3 size-5 text-primary" aria-hidden />
                <h3 className="font-display text-lg font-semibold">{copy.insightTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {copy.insightBody}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
