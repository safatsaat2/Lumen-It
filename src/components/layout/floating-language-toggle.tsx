"use client";

import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import type { Locale } from "@/i18n/config";

type FloatingLanguageToggleProps = {
  locale: Locale;
  label: string;
};

export function FloatingLanguageToggle({
  locale,
  label,
}: FloatingLanguageToggleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return <LanguageToggle locale={locale} label={label} variant="floating" />;
}
