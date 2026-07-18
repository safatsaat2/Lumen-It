"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  siteName: string;
};

function homeSection(locale: Locale, section: string) {
  return `${localizedPath(locale)}#${section}`;
}

export function SiteHeader({ locale, dictionary, siteName }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const home = localizedPath(locale);
  const nav = [
    {
      label: dictionary.nav.consultation,
      href: localizedPath(locale, "/consultation"),
      featured: true,
    },
    { label: dictionary.nav.services, href: homeSection(locale, "services") },
    { label: dictionary.nav.work, href: homeSection(locale, "work") },
    { label: dictionary.nav.process, href: homeSection(locale, "process") },
    { label: dictionary.nav.pricing, href: homeSection(locale, "pricing") },
    { label: dictionary.nav.faq, href: homeSection(locale, "faq") },
    { label: dictionary.nav.contact, href: homeSection(locale, "contact") },
  ];
  const contactHref = homeSection(locale, "contact");

  // Close on route change before this header unmounts (pages each mount their own header).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href={home}
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white shadow-glow transition-transform group-hover:scale-105">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span>{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground",
                item.featured
                  ? "font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle locale={locale} label={dictionary.language.switchTo} />
          <ThemeToggle />
          <Button variant="primary" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href={contactHref}>{dictionary.nav.cta}</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={dictionary.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      {/*
        In-tree mobile drawer (no Radix portal). Portals were causing
        removeChild crashes when SiteHeader unmounted mid-route change.
      */}
      <div
        id={menuId}
        className={cn(
          "absolute inset-x-0 top-full border-b border-border bg-background shadow-elevated transition-[opacity,visibility] duration-200 lg:hidden",
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="container flex max-h-[min(80vh,32rem)] flex-col gap-1 overflow-y-auto py-4" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-foreground/5"
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-2 px-1">
            <LanguageToggle
              locale={locale}
              label={dictionary.language.switchTo}
              className="flex-1"
            />
          </div>
          <Button
            variant="primary"
            className="mt-4"
            asChild
            tabIndex={menuOpen ? 0 : -1}
          >
            <Link href={contactHref} onClick={() => setMenuOpen(false)}>
              {dictionary.nav.cta}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
