import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type PageLoaderProps = {
  label?: string;
  className?: string;
  variant?: "page" | "panel";
};

export function PageLoader({
  label = "Loading…",
  className,
  variant = "page",
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        variant === "page" && "min-h-[70vh] w-full px-6 py-24",
        variant === "panel" && "min-h-[40vh] w-full px-4 py-16",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 size-48 rounded-full bg-fuchsia-500/10 blur-[70px]"
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div
            className="absolute -inset-3 animate-loader-pulse rounded-3xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-amber-400/20"
            aria-hidden
          />
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white shadow-glow">
            <Sparkles className="size-6 animate-loader-spin-slow" aria-hidden />
          </div>
          <div
            className="absolute -inset-1 animate-loader-ring rounded-[1.15rem] border border-primary/40"
            aria-hidden
          />
        </div>

        <div className="space-y-3 text-center">
          <p className="font-display text-sm font-medium tracking-wide text-foreground">
            {label}
          </p>
          <div className="mx-auto flex h-1 w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 animate-loader-bar rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />
          </div>
        </div>

        <div className="mt-2 grid w-full max-w-md gap-3 sm:grid-cols-3" aria-hidden>
          <div className="h-16 animate-shimmer rounded-2xl bg-muted/70" />
          <div className="h-16 animate-shimmer rounded-2xl bg-muted/70 [animation-delay:120ms]" />
          <div className="h-16 animate-shimmer rounded-2xl bg-muted/70 [animation-delay:240ms]" />
        </div>
      </div>

      <span className="sr-only">{label}</span>
    </div>
  );
}
