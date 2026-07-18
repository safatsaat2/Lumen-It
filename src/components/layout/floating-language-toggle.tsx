"use client";

import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type FloatingLanguageToggleProps = {
  locale: Locale;
  label: string;
};

export function FloatingLanguageToggle({
  locale,
  label,
}: FloatingLanguageToggleProps) {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always keep a stable DOM node after first paint so route changes cannot
  // race a null ↔ element remount (React removeChild crashes).
  return (
    <div
      className={cn(
        "transition-opacity duration-300",
        ready && visible
          ? "opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!ready || !visible}
    >
      <LanguageToggle locale={locale} label={label} variant="floating" />
    </div>
  );
}
