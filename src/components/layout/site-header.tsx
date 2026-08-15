"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
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

type NavItem = {
  label: string;
  href: string;
  featured?: boolean;
};

function homeSection(locale: Locale, section: string) {
  return `${localizedPath(locale)}#${section}`;
}

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function isNavActive(
  href: string,
  pathname: string,
  hash: string,
  home: string,
) {
  const currentPath = normalizePath(pathname);
  const homePath = normalizePath(home);
  const [rawPath, section] = href.split("#");
  const itemPath = normalizePath(rawPath || homePath);

  if (section) {
    return currentPath === homePath && hash === section;
  }

  if (itemPath === homePath) {
    return currentPath === homePath && !hash;
  }

  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

function navLinkClass({
  active,
  featured,
  mobile = false,
}: {
  active: boolean;
  featured?: boolean;
  mobile?: boolean;
}) {
  if (mobile) {
    return cn(
      "rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-foreground/5",
      active && "bg-foreground/5 text-foreground",
      featured && !active && "text-primary",
      featured && active && "bg-primary/10 text-primary",
      !featured && !active && "text-foreground",
    );
  }

  return cn(
    "rounded-full px-3 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground",
    active && "bg-foreground/5 font-medium text-foreground",
    featured && !active && "font-medium text-primary",
    featured && active && "bg-primary/10 font-medium text-primary",
    !featured && !active && "text-muted-foreground",
  );
}

export function SiteHeader({ locale, dictionary, siteName }: SiteHeaderProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const menuId = useId();
  const moreId = useId();
  const moreRef = useRef<HTMLDivElement>(null);
  const home = localizedPath(locale);

  const primaryNav: NavItem[] = [
    { label: dictionary.nav.home, href: home },
    {
      label: dictionary.nav.consultation,
      href: localizedPath(locale, "/consultation"),
      featured: true,
    },
    {
      label: dictionary.nav.templates,
      href: localizedPath(locale, "/templates"),
    },
    { label: dictionary.nav.services, href: homeSection(locale, "services") },
    { label: dictionary.nav.pricing, href: homeSection(locale, "pricing") },
    {
      label: dictionary.nav.contact,
      href: localizedPath(locale, "/contact"),
    },
  ];

  const moreNav: NavItem[] = [
    { label: dictionary.nav.work, href: homeSection(locale, "work") },
    { label: dictionary.nav.process, href: homeSection(locale, "process") },
    { label: dictionary.nav.faq, href: homeSection(locale, "faq") },
  ];

  const contactHref = localizedPath(locale, "/contact");
  const moreActive = moreNav.some((item) =>
    isNavActive(item.href, pathname, hash, home),
  );

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
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

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (moreRef.current && target && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-[4.5rem]">
        <Link
          href={home}
          className="group flex min-w-0 items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <BrandLogo
            alt={siteName}
            priority
            className="transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {primaryNav.map((item) => {
            const active = isNavActive(item.href, pathname, hash, home);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClass({ active, featured: item.featured })}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground",
                moreOpen || moreActive
                  ? "bg-foreground/5 font-medium text-foreground"
                  : "text-muted-foreground",
              )}
              aria-expanded={moreOpen}
              aria-controls={moreId}
              aria-haspopup="menu"
              aria-current={moreActive ? "true" : undefined}
              onClick={() => setMoreOpen((open) => !open)}
            >
              {dictionary.nav.more}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  moreOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>

            <div
              id={moreId}
              role="menu"
              className={cn(
                "absolute right-0 top-full z-50 mt-2 min-w-[12.5rem] rounded-2xl border border-border bg-popover p-1.5 shadow-elevated transition-[opacity,visibility,transform] duration-150",
                moreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0",
              )}
              aria-hidden={!moreOpen}
            >
              {moreNav.map((item) => {
                const active = isNavActive(item.href, pathname, hash, home);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground",
                      active
                        ? "bg-foreground/5 font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                    tabIndex={moreOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <LanguageToggle locale={locale} label={dictionary.language.switchTo} />
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href={contactHref}>{dictionary.nav.cta}</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-label={dictionary.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      <div
        id={menuId}
        className={cn(
          "absolute inset-x-0 top-full border-b border-border bg-background shadow-elevated transition-[opacity,visibility] duration-200 xl:hidden",
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="container flex max-h-[min(80vh,36rem)] flex-col gap-1 overflow-y-auto py-4"
          aria-label="Mobile"
        >
          {primaryNav.map((item) => {
            const active = isNavActive(item.href, pathname, hash, home);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={navLinkClass({
                  active,
                  featured: item.featured,
                  mobile: true,
                })}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}

          <div
            className={cn(
              "rounded-xl border bg-card/40",
              moreActive ? "border-primary/30" : "border-border/70",
            )}
          >
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors hover:bg-foreground/5",
                moreActive && "text-foreground",
              )}
              aria-expanded={mobileMoreOpen}
              aria-current={moreActive ? "true" : undefined}
              onClick={() => setMobileMoreOpen((open) => !open)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {dictionary.nav.more}
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground transition-transform",
                  mobileMoreOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200",
                mobileMoreOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-1 border-t border-border/60 px-2 py-2">
                  {moreNav.map((item) => {
                    const active = isNavActive(item.href, pathname, hash, home);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground",
                          active
                            ? "bg-foreground/5 font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                        tabIndex={menuOpen && mobileMoreOpen ? 0 : -1}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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
