"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mainNav, siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white shadow-glow transition-transform group-hover:scale-105">
            <Sparkles className="size-4" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
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
          <ThemeToggle />
          <Button variant="primary" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="#contact">Start a project</Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent className="left-0 top-0 max-w-none translate-x-0 translate-y-0 rounded-none border-0 sm:max-w-md sm:rounded-3xl sm:border sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
              <DialogHeader>
                <DialogTitle className="font-display text-left">Menu</DialogTitle>
              </DialogHeader>
              <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="primary" className="mt-4" asChild>
                  <Link href="#contact">Start a project</Link>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
