import Link from "next/link";
import { Sparkles } from "lucide-react";

import { footerNav, siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white">
                <Sparkles className="size-4" />
              </span>
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
            <p className="text-sm text-muted-foreground">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
            </p>
          </div>

          {(
            [
              ["Agency", footerNav.agency],
              ["Resources", footerNav.resources],
              ["Legal", footerNav.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 text-sm font-medium">{title}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(siteConfig.social).map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize hover:text-foreground"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
