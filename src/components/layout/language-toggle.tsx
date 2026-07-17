"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { localeLabels, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  locale: Locale;
  label: string;
  className?: string;
  variant?: "header" | "floating";
};

function swapLocaleInPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageToggle({
  locale,
  label,
  className,
  variant = "header",
}: LanguageToggleProps) {
  const pathname = usePathname() || `/${locale}`;
  const nextLocale: Locale = locale === "de" ? "en" : "de";
  const href = swapLocaleInPath(pathname, nextLocale);

  if (variant === "floating") {
    return (
      <Button
        asChild
        variant="primary"
        size="lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 size-14 rounded-full p-0 shadow-elevated",
          className,
        )}
      >
        <Link href={href} aria-label={label} title={label}>
          <span className="flex flex-col items-center leading-none">
            <Languages className="mb-0.5 size-4" aria-hidden />
            <span className="text-[10px] font-semibold tracking-wide">
              {localeLabels[nextLocale]}
            </span>
          </span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn("min-w-[4.5rem] gap-1.5 font-medium", className)}
    >
      <Link href={href} aria-label={label} title={label}>
        <Languages className="size-3.5" aria-hidden />
        <span aria-hidden>{localeLabels[locale]}</span>
        <span className="sr-only">{label}</span>
        <span className="text-muted-foreground" aria-hidden>
          → {localeLabels[nextLocale]}
        </span>
      </Link>
    </Button>
  );
}
