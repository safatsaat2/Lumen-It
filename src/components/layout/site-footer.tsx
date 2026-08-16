import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialNetworkIcon, socialLabel } from "@/components/layout/social-icons";
import { Separator } from "@/components/ui/separator";
import { localizedPath } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { SocialLinks, SiteSettings } from "@/lib/content-store";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
  social: SocialLinks;
  settings: SiteSettings;
};

export function SiteFooter({
  locale,
  dictionary,
  social,
  settings,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  const home = localizedPath(locale);
  const section = (id: string) => `${home}#${id}`;

  const columns = [
    {
      title: dictionary.footer.agency,
      links: [
        { label: dictionary.footer.about, href: section("about") },
        { label: dictionary.footer.services, href: localizedPath(locale, "/services") },
        { label: "Branding", href: localizedPath(locale, "/branding") },
        { label: dictionary.footer.process, href: section("process") },
        { label: dictionary.footer.contact, href: localizedPath(locale, "/contact") },
      ],
    },
    {
      title: dictionary.footer.resources,
      links: [
        {
          label: dictionary.footer.templates,
          href: localizedPath(locale, "/templates"),
        },
        { label: dictionary.footer.blog, href: localizedPath(locale, "/blog") },
        {
          label: dictionary.nav.consultation,
          href: localizedPath(locale, "/consultation"),
        },
        { label: dictionary.nav.work, href: localizedPath(locale, "/work") },
        { label: dictionary.footer.faq, href: section("faq") },
        { label: dictionary.footer.pricing, href: section("pricing") },
      ],
    },
    {
      title: dictionary.footer.legal,
      links: [
        {
          label: dictionary.footer.impressum,
          href: localizedPath(locale, "/impressum"),
        },
        {
          label: dictionary.footer.privacy,
          href: localizedPath(locale, "/privacy"),
        },
        {
          label: dictionary.footer.terms,
          href: localizedPath(locale, "/terms"),
        },
        {
          label: dictionary.footer.cookies,
          href: localizedPath(locale, "/cookies"),
        },
      ],
    },
  ];

  const socialEntries = Object.entries(social).filter(
    ([, href]) => typeof href === "string" && href.trim().length > 0,
  );

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Link
              href={localizedPath(locale)}
              className="inline-flex items-center"
            >
              <BrandLogo alt={settings.name} />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              {dictionary.meta.description}
            </p>
            <p className="text-sm text-muted-foreground">
              <a href={`mailto:${settings.email}`} className="hover:text-foreground">
                {settings.email}
              </a>
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-sm font-medium">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
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
            © {year} {settings.name}. {dictionary.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {socialEntries.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLabel(key)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground"
              >
                <SocialNetworkIcon network={key} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
