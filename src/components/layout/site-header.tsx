"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Sparkles } from "lucide-react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

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
  const home = localizedPath(locale);
  const nav = [
    { label: dictionary.nav.services, href: homeSection(locale, "services") },
    { label: dictionary.nav.work, href: homeSection(locale, "work") },
    { label: dictionary.nav.process, href: homeSection(locale, "process") },
    { label: dictionary.nav.pricing, href: homeSection(locale, "pricing") },
    { label: dictionary.nav.faq, href: homeSection(locale, "faq") },
    { label: dictionary.nav.contact, href: homeSection(locale, "contact") },
  ];
  const contactHref = homeSection(locale, "contact");

  // Close mobile menu on route change so Radix portals don't fight React unmount.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
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

          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label={dictionary.nav.openMenu}
              >
                <Menu aria-hidden />
              </Button>
            </DialogTrigger>
            <DialogContent className="left-0 top-0 max-w-none translate-x-0 translate-y-0 rounded-none border-0 sm:max-w-md sm:rounded-3xl sm:border sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
              <DialogHeader>
                <DialogTitle className="font-display text-left">
                  {dictionary.nav.menu}
                </DialogTitle>
              </DialogHeader>
              <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-foreground/5"
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
                <Button variant="primary" className="mt-4" asChild>
                  <Link href={contactHref} onClick={() => setMenuOpen(false)}>
                    {dictionary.nav.cta}
                  </Link>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
