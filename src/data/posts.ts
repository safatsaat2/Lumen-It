import { extraPosts } from "@/data/posts-extra";
import { readingTime } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export type BlogPostCopy = {
  title: string;
  description: string;
  category: string;
  content: string;
};

export type BlogPost = {
  slug: string;
  publishedAt: string;
  featured?: boolean;
  tags: string[];
  relatedPaths: { path: string; label: { de: string; en: string } }[];
  de: BlogPostCopy;
  en: BlogPostCopy;
};

const rawPosts: BlogPost[] = [
  {
    slug: "brand-before-the-website",
    publishedAt: "2026-07-14",
    tags: ["branding", "strategy", "websites"],
    relatedPaths: [
      { path: "/branding", label: { en: "Branding", de: "Branding" } },
      {
        path: "/custom-websites",
        label: { en: "Custom websites", de: "Individuelle Websites" },
      },
      {
        path: "/consultation",
        label: { en: "AI consultant", de: "KI-Berater" },
      },
    ],
    en: {
      title: "Build the brand before you rebuild the website",
      description:
        "Why a new theme rarely fixes conversion — and how positioning, identity, and page structure should land before engineering.",
      category: "Branding",
      content: `A new website will not save an unclear offer. If visitors cannot say who you are for, what you sell, and why they should trust you in the first screen, a prettier layout only makes the confusion faster.

## What to settle first

Write the audience, the offer, and the proof in sentences you would say on a sales call. That becomes the homepage. Colour and type come after, not before.

If you need a structured first pass, run the AI consultant, then decide whether you need identity work, a Ready-to-Go template, or a custom build.

## When a rebuild is still the right move

Rebuild when the information architecture is wrong, the stack cannot carry the brand, or legal and performance work was never done. Do not rebuild because a competitor launched a dark-mode landing page.`,
    },
    de: {
      title: "Marke klären, bevor Sie die Website neu bauen",
      description:
        "Warum ein neues Theme selten Conversion rettet — und warum Positionierung, Identität und Seitenstruktur vor dem Engineering stehen sollten.",
      category: "Branding",
      content: `Eine neue Website rettet kein unscharfes Angebot. Wenn Besuchende nicht sagen können, für wen Sie da sind, was Sie verkaufen und warum man Ihnen trauen soll, macht ein schöneres Layout die Verwirrung nur schneller.

## Was zuerst stehen muss

Zielgruppe, Angebot und Beweis in Sätzen, die Sie im Verkaufsgespräch sagen würden. Daraus wird die Startseite. Farbe und Schrift kommen danach.

Für einen strukturierten ersten Durchgang: KI-Berater nutzen, dann entscheiden, ob Identität, ein Ready-to-Go Template oder ein Custom-Build nötig ist.

## Wann ein Rebuild trotzdem richtig ist

Wenn die Informationsarchitektur falsch ist, der Stack die Marke nicht tragen kann oder Rechtstexte und Performance nie mitgedacht wurden. Nicht, weil ein Wettbewerber Dark Mode hat.`,
    },
  },
  {
    slug: "custom-website-or-template",
    publishedAt: "2026-06-22",
    tags: ["websites", "templates", "process"],
    relatedPaths: [
      {
        path: "/custom-websites",
        label: { en: "Custom websites", de: "Individuelle Websites" },
      },
      { path: "/templates", label: { en: "Templates", de: "Templates" } },
      {
        path: "/web-development",
        label: { en: "Web development", de: "Webentwicklung" },
      },
    ],
    en: {
      title: "Custom website or branded template?",
      description:
        "A practical split: when Ready-to-Go is enough, when custom web development is worth the scope, and how not to throw the brand away later.",
      category: "Web",
      content: `Templates are not a failure. They fail when you fight the layout for six weeks instead of admitting you needed custom information architecture.

## Choose a template when

You have a clear offer, you need to go live quickly, and the page types already exist in the kit. We still apply identity so it does not look like a demo.

## Choose custom when

You have a product flow, integrations, or a story that does not fit a grid. Custom also wins when SEO landing pages, locales, and legal structure need to be first-class.

Plan a path from template to custom if budget is staged. Keep the identity system so you are not buying a second brand in year two.`,
    },
    de: {
      title: "Individuelle Website oder gebrandetes Template?",
      description:
        "Eine praktische Trennung: wann Ready-to-Go reicht, wann Custom-Webentwicklung den Scope wert ist, und wie die Marke später nicht verloren geht.",
      category: "Web",
      content: `Templates sind kein Scheitern. Sie scheitern, wenn Sie sechs Wochen gegen das Layout kämpfen, statt zuzugeben, dass Sie eine eigene Informationsarchitektur brauchen.

## Template, wenn

Das Angebot klar ist, Tempo zählt und die Seitentypen im Kit schon existieren. Identität setzen wir trotzdem auf, damit es nicht nach Demo aussieht.

## Custom, wenn

Produktfluss, Integrationen oder eine Geschichte, die nicht ins Raster passt. Custom gewinnt auch, wenn SEO-Landings, Locales und Rechtstexte erstklassig sein müssen.

Planen Sie den Weg vom Template zu Custom, wenn das Budget gestaffelt ist. Das Identitätssystem behalten, damit Sie im zweiten Jahr nicht eine zweite Marke kaufen.`,
    },
  },
  {
    slug: "brand-identity-that-ships",
    publishedAt: "2026-05-18",
    tags: ["identity", "design", "branding"],
    relatedPaths: [
      {
        path: "/brand-identity",
        label: { en: "Brand identity", de: "Markenidentität" },
      },
      { path: "/web-design", label: { en: "Web design", de: "Webdesign" } },
      { path: "/branding", label: { en: "Branding", de: "Branding" } },
    ],
    en: {
      title: "Brand identity that still works on a real website",
      description:
        "Logo files are not a system. What to include so developers and templates can use the identity without inventing a second look.",
      category: "Identity",
      content: `Identity dies in handoff. A PNG in a Slack thread is not a system. Developers need tokens: colour, type, spacing, and a logo that still reads at 32 pixels.

## Minimum kit

Wordmark or symbol that works on light and dark. Two typefaces or a disciplined one-family setup. Colour with accessible contrast. A short voice note so headlines do not sound like a different company.

Then apply it to the site — custom or template — in the same engagement if you can. Identity that never ships is decoration.`,
    },
    de: {
      title: "Markenidentität, die auf einer echten Website hält",
      description:
        "Logo-Dateien sind kein System. Was Sie brauchen, damit Entwicklung und Templates den Auftritt nutzen, ohne einen zweiten Look zu erfinden.",
      category: "Identität",
      content: `Identität stirbt in der Übergabe. Ein PNG in Slack ist kein System. Entwicklung braucht Tokens: Farbe, Schrift, Abstand und ein Logo, das bei 32 Pixeln lesbar bleibt.

## Minimales Set

Wortmarke oder Zeichen auf Hell und Dunkel. Zwei Schriften oder eine disziplinierte Familie. Farbe mit Kontrast. Eine kurze Stimme, damit Headlines nicht nach einer anderen Firma klingen.

Dann auf die Site bringen — custom oder Template — am besten im selben Auftrag. Identität, die nie live geht, ist Dekoration.`,
    },
  },
  {
    slug: "webdesign-for-german-buyers",
    publishedAt: "2026-04-09",
    tags: ["web design", "germany", "seo"],
    relatedPaths: [
      { path: "/web-design", label: { en: "Web design", de: "Webdesign" } },
      {
        path: "/webdesign-agentur",
        label: { en: "Webdesign-Agentur", de: "Webdesign-Agentur" },
      },
      {
        path: "/services/seo-optimization",
        label: { en: "SEO", de: "SEO" },
      },
    ],
    en: {
      title: "Web design that fits how German buyers decide",
      description:
        "Longer copy, visible legal links, and trust without fake reviews — what we design for DACH sites that need to convert.",
      category: "Web design",
      content: `German B2B and SMB pages often need more precise copy than a US SaaS landing. Buyers look for Impressum, privacy, and a real company behind the claim. Hiding that in a tiny footer link is a trust leak.

## What we put on the page

A claim you can defend. Proof you actually have. A next step (consultant, contact, or template). Legal pages as first-class routes, not an afterthought.

We do not invent testimonials. If you do not have quotes yet, use process, scope, and clarity instead of theatre.`,
    },
    de: {
      title: "Webdesign, das zu Entscheidungen in Deutschland passt",
      description:
        "Längere Texte, sichtbare Rechtstexte und Vertrauen ohne Fake-Reviews — worauf wir bei DACH-Sites achten, die convertieren sollen.",
      category: "Webdesign",
      content: `Deutsche B2B- und KMU-Seiten brauchen oft präzisere Texte als eine US-SaaS-Landing. Kaufende suchen Impressum, Datenschutz und ein echtes Unternehmen hinter dem Claim. Das in einem Mini-Footer zu verstecken, ist ein Vertrauensleck.

## Was auf die Seite gehört

Ein Claim, den Sie vertreten. Beweis, den Sie wirklich haben. Ein nächster Schritt (Berater, Kontakt oder Template). Rechtliche Seiten als echte Routen.

Wir erfinden keine Testimonials. Wenn noch keine Zitate da sind, nutzen Sie Ablauf, Scope und Klarheit statt Theater.`,
    },
  },
  {
    slug: "how-the-ai-consultant-helps",
    publishedAt: "2026-03-02",
    tags: ["ai", "strategy", "consultation"],
    relatedPaths: [
      {
        path: "/consultation",
        label: { en: "AI consultant", de: "KI-Berater" },
      },
      {
        path: "/ai-brand-consultant",
        label: { en: "AI brand consultant", de: "KI-Markenberater" },
      },
      {
        path: "/brand-strategy",
        label: { en: "Brand strategy", de: "Markenstrategie" },
      },
    ],
    en: {
      title: "How the AI brand consultant should be used",
      description:
        "It is a structured first session with a PDF — not an autopilot agency. When to trust the draft and when to talk to a human.",
      category: "Consultant",
      content: `The consultant exists so you do not start a project from a blank form. It asks about the business, writes a strategy draft, and lets you download a PDF.

## Use it when

You need language for positioning, you want a kickoff document, or you are comparing template vs custom and need the offer written down.

## Do not use it as

A replacement for legal advice, accounting, or invented social proof. Keep only claims you can stand behind. When you are ready to build, contact us or pick a service page.`,
    },
    de: {
      title: "Wie Sie den KI-Markenberater sinnvoll nutzen",
      description:
        "Ein strukturiertes Erstgespräch mit PDF — keine Autopilot-Agentur. Wann der Entwurf trägt und wann ein Mensch dran muss.",
      category: "Berater",
      content: `Der Berater existiert, damit Projekte nicht mit einem leeren Formular starten. Er fragt zum Geschäft, schreibt einen Strategie-Entwurf und liefert ein PDF.

## Nutzen, wenn

Sie Sprache für Positionierung brauchen, ein Kickoff-Dokument wollen oder Template vs Custom vergleichen und das Angebot schriftlich brauchen.

## Nicht nutzen als

Ersatz für Rechts- oder Steuerberatung oder für erfundene Social Proofs. Nur Claims behalten, die Sie vertreten. Wenn Sie bauen wollen: Kontakt oder eine Leistungsseite.`,
    },
  },
  {
    slug: "brand-strategy-for-small-teams",
    publishedAt: "2026-01-27",
    tags: ["strategy", "branding", "growth"],
    relatedPaths: [
      {
        path: "/brand-strategy",
        label: { en: "Brand strategy", de: "Markenstrategie" },
      },
      {
        path: "/business-growth-assessment",
        label: { en: "Growth assessment", de: "Wachstums-Check" },
      },
      {
        path: "/digital-solutions",
        label: { en: "Digital solutions", de: "Digitale Lösungen" },
      },
    ],
    en: {
      title: "Brand strategy for small teams in Germany",
      description:
        "You do not need a 80-page brand book. You need a position, a voice, and a site that can carry both — plus honesty about channels.",
      category: "Strategy",
      content: `Small teams in DACH often over-buy strategy decks and under-buy a site that can sell. The useful version of brand strategy fits on a few pages: who it is for, what you refuse, proof, and the next step.

## Pair it with a channel decision

A beautiful site with no distribution plan is a brochure. The growth assessment in the consultant is there to surface whether the bottleneck is brand, site, or channel — before you spend on all three.`,
    },
    de: {
      title: "Markenstrategie für kleine Teams in Deutschland",
      description:
        "Sie brauchen kein 80-Seiten-Brandbook. Sie brauchen Position, Stimme und eine Site, die beides trägt — plus Ehrlichkeit bei Kanälen.",
      category: "Strategie",
      content: `Kleine Teams in der DACH-Region kaufen oft zu viel Strategie-Deck und zu wenig Site, die verkaufen kann. Die nützliche Markenstrategie passt auf wenige Seiten: für wen, wofür nicht, Beweis, nächster Schritt.

## Mit Kanalentscheidung koppeln

Eine schöne Site ohne Distribution ist eine Broschüre. Der Wachstums-Check im Berater zeigt, ob der Engpass Marke, Site oder Kanal ist — bevor Sie alle drei bezahlen.`,
    },
  },
  {
    slug: "website-kosten-kmu-2026",
    publishedAt: "2026-08-10",
    featured: true,
    tags: ["web", "pricing", "kmu"],
    relatedPaths: [
      {
        path: "/web-development",
        label: { en: "Web development", de: "Webentwicklung" },
      },
      {
        path: "/services/wordpress-development",
        label: { en: "WordPress", de: "WordPress" },
      },
      {
        path: "/contact",
        label: { en: "Request a quote", de: "Angebot anfragen" },
      },
    ],
    en: {
      title: "What a business website actually costs in 2026",
      description:
        "A honest range for German SMEs: template, WordPress, or custom — and when paying more is wasted.",
      category: "Web",
      content: `People search “how much does a website cost” because agencies hide the number. Here is a useful split for companies in Germany — not a fake price list.

A Ready-to-Go template that we brand can be the right first site if your offer is already clear. [Custom web development](/services/custom-web-development) is worth it when the structure, integrations, or product story do not fit a theme. [WordPress](/services/wordpress-development) sits in the middle: your team edits content, we still harden security and speed.

## What drives the price

Scope, languages (DE/EN), shop vs brochure, and how much of the brand is already decided. If the offer is fuzzy, budget for [brand strategy](/brand-strategy) before a rebuild. Use the [AI consultant](/consultation) as a written first pass, then [contact us](/contact) for a fixed quote.

## What you should not pay for

Open retainers with no handover. Invented testimonials. A redesign that copies a competitor and still has no next step on the page.

When you are ready, start from [web development](/web-development) or send the project to [contact](/contact).`,
    },
    de: {
      title: "Was eine Unternehmens-Website 2026 wirklich kostet",
      description:
        "Ein ehrlicher Rahmen für KMU in Deutschland: Template, WordPress oder Custom — und wann mehr Geld verschwendet ist.",
      category: "Web",
      content: `Viele suchen „Was kostet eine Website“, weil Agenturen die Zahl verstecken. Hier eine brauchbare Trennung für Unternehmen in Deutschland — keine Fake-Preisliste.

Ein Ready-to-Go Template, das wir branden, reicht, wenn das Angebot schon klar ist. [Individuelle Webentwicklung](/services/custom-web-development) lohnt sich, wenn Struktur, Integrationen oder die Produktgeschichte nicht in ein Theme passen. [WordPress in Dortmund](/services/wordpress-entwicklung-dortmund) liegt dazwischen: Ihr Team pflegt Inhalte, wir härten Sicherheit und Tempo.

## Was den Preis treibt

Scope, Sprachen (DE/EN), Shop vs Broschüre, und wie weit die Marke schon steht. Ist das Angebot unscharf, planen Sie [Markenstrategie](/brand-strategy) vor dem Rebuild. Der [KI-Berater](/consultation) ist der schriftliche erste Pass; danach [Kontakt](/contact) für ein Festpreisangebot.

## Wofür Sie nicht zahlen sollten

Offene Retainer ohne Übergabe. Erfundene Testimonials. Ein Redesign, das den Wettbewerb kopiert und trotzdem keinen nächsten Schritt auf der Seite hat.

Wenn Sie soweit sind: [Webentwicklung Dortmund](/webentwicklung-dortmund) oder direkt [anfragen](/contact).`,
    },
  },
  {
    slug: "branding-oder-website-zuerst",
    publishedAt: "2026-08-12",
    featured: true,
    tags: ["branding", "web", "strategy"],
    relatedPaths: [
      {
        path: "/branding",
        label: { en: "Branding", de: "Branding" },
      },
      {
        path: "/consultation",
        label: { en: "AI consultant", de: "KI-Berater" },
      },
      {
        path: "/contact",
        label: { en: "Contact", de: "Kontakt" },
      },
    ],
    en: {
      title: "Branding or website first?",
      description:
        "When a new site is wasted spend — and when identity work can wait until you have a page that sells.",
      category: "Branding",
      content: `Startups often buy a website and hope the brand appears. Or they buy a logo pack and never ship. The useful order is: write the offer, then decide whether identity or a site is the bottleneck.

If visitors cannot say who you serve after the first screen, [brand strategy](/brand-strategy) first. If the story is clear but the layout and stack are wrong, [custom websites](/custom-websites) or a branded template.

## A practical test

Open your current homepage. Can a stranger forward the offer in one sentence? If not, run the [AI consultant](/consultation) and keep only claims you can stand behind. Then talk to us via [contact](/contact) or start on [branding](/branding).

## Germany-specific

Buyers look for Impressum and a real company. Hiding that is a trust leak. We design for that on [web design](/web-design) work, not as a footer afterthought.`,
    },
    de: {
      title: "Zuerst Branding oder zuerst die Website?",
      description:
        "Wann eine neue Site Geld verbrennt — und wann Identität warten kann, bis eine Seite verkauft.",
      category: "Branding",
      content: `Viele kaufen eine Website und hoffen, die Marke entstehe nebenbei. Oder sie kaufen ein Logo-Paket und gehen nie live. Die nützliche Reihenfolge: Angebot aufschreiben, dann entscheiden, ob Identität oder Site der Engpass ist.

Wenn Besuchende nach dem ersten Screen nicht sagen können, wen Sie bedienen, zuerst [Markenstrategie](/brand-strategy). Ist die Geschichte klar, aber Layout und Stack falsch: [individuelle Websites](/custom-websites) oder ein gebrandetes Template.

## Ein praktischer Test

Öffnen Sie Ihre Startseite. Kann eine fremde Person das Angebot in einem Satz weitergeben? Wenn nicht: [KI-Berater](/consultation), nur Claims behalten, die Sie vertreten. Danach [Kontakt](/contact) oder [Branding Agentur Dortmund](/branding-agentur-dortmund).

## Speziell Deutschland

Kaufende suchen Impressum und ein echtes Unternehmen. Das zu verstecken ist ein Vertrauensleck. Darauf achten wir beim [Webdesign Dortmund](/webdesign-dortmund), nicht als Fußnote.`,
    },
  },
  {
    slug: "wordpress-oder-custom-website",
    publishedAt: "2026-08-14",
    featured: true,
    tags: ["wordpress", "web", "dortmund"],
    relatedPaths: [
      {
        path: "/services/wordpress-development",
        label: { en: "WordPress", de: "WordPress" },
      },
      {
        path: "/services/custom-web-development",
        label: { en: "Custom web", de: "Custom Web" },
      },
      {
        path: "/contact",
        label: { en: "Get a quote", de: "Angebot holen" },
      },
    ],
    en: {
      title: "WordPress or a custom website?",
      description:
        "A clear split for marketing teams in Germany: when the block editor is enough, and when Next.js is the cheaper long-term choice.",
      category: "WordPress",
      content: `WordPress is not outdated. It fails when you fight the theme for months. Custom is not always smarter. It fails when you needed a CMS your marketing team can use on Tuesday.

Choose [WordPress development](/services/wordpress-development) when editors already live there and the page types are normal. Choose [custom web development](/services/custom-web-development) when performance, locales, or product UI need to be first-class.

## Dortmund and DACH

Legal pages, German copy length, and handover docs are part of both. We build WordPress in Dortmund with update hygiene, not plugin piles. Read [web development](/web-development) or [request a quote](/contact).

## Next step

If you are unsure, say so in the [consultation](/consultation). The output is a strategy PDF, not an automatic rebuild.`,
    },
    de: {
      title: "WordPress oder individuelle Website?",
      description:
        "Eine klare Trennung für Marketing-Teams in Deutschland: wann der Block-Editor reicht — und wann Next.js langfristig günstiger ist.",
      category: "WordPress",
      content: `WordPress ist nicht veraltet. Es scheitert, wenn Sie monatelang gegen das Theme kämpfen. Custom ist nicht immer klüger. Es scheitert, wenn Sie am Dienstag ein CMS brauchen, das Redaktion bedienen kann.

Wählen Sie [WordPress-Entwicklung in Dortmund](/services/wordpress-entwicklung-dortmund), wenn Editoren dort schon arbeiten und die Seitentypen normal sind. Wählen Sie [individuelle Webentwicklung](/services/custom-web-development), wenn Performance, Locales oder Produkt-UI erstklassig sein müssen.

## Dortmund und DACH

Rechtstexte, deutsche Textlänge und Übergabe gehören zu beidem. Wir bauen WordPress mit Update-Hygiene, nicht mit Plugin-Bergen. Weiter: [Webentwicklung Dortmund](/webentwicklung-dortmund) oder [Angebot](/contact).

## Nächster Schritt

Unsicher? Sagen Sie das im [KI-Berater](/consultation). Das Ergebnis ist ein Strategie-PDF, kein automatischer Rebuild.`,
    },
  },
  {
    slug: "ki-automatisierung-oder-berater",
    publishedAt: "2026-08-16",
    featured: true,
    tags: ["ai", "automation", "consultation"],
    relatedPaths: [
      {
        path: "/consultation",
        label: { en: "AI consultant", de: "KI-Berater" },
      },
      {
        path: "/services/ai-automation",
        label: { en: "AI automation service", de: "KI-Leistung" },
      },
      {
        path: "/contact",
        label: { en: "Contact", de: "Kontakt" },
      },
    ],
    en: {
      title: "AI consultant vs AI automation — what to buy first",
      description:
        "Use the free strategy session before you automate a messy process. How MIHI's splits advice and build.",
      category: "AI",
      content: `“We need AI” is not a brief. If the offer, the source of truth, or the website is unclear, automation copies the mess faster.

Start with the [AI brand consultant](/consultation). It is a structured conversation and a PDF. [AI automation](/services/ai-automation) is a scoped project: support, sales, or an internal workflow with monitoring — not a toy chatbot.

## For German SMEs

Keep only claims you can defend. We do not invent reviews. After the PDF, [contact](/contact) if you want a build in Dortmund or remote.

## Related

[Digital solutions](/digital-solutions) and [AI automation](/services/ai-automation) if you want a scoped build.`,
    },
    de: {
      title: "KI-Berater oder KI-Automatisierung — was zuerst?",
      description:
        "Nutzen Sie die kostenlose Strategiesession, bevor Sie einen unklaren Prozess automatisieren. So trennt MIHI's Beratung und Build.",
      category: "KI",
      content: `„Wir brauchen KI“ ist kein Briefing. Sind Angebot, Datenquelle oder Website unklar, kopiert Automation das Chaos nur schneller.

Starten Sie mit dem [KI-Markenberater](/consultation). Das ist ein strukturiertes Gespräch und ein PDF. [KI-Automatisierung](/services/ai-automation) ist ein gescopetes Projekt: Support, Vertrieb oder ein interner Ablauf mit Monitoring — kein Spielzeug-Chat.

## Für KMU in Deutschland

Nur Claims behalten, die Sie vertreten. Wir erfinden keine Reviews. Nach dem PDF: [Kontakt](/contact), wenn Sie in Dortmund oder remote bauen wollen.

## Weiterlesen

[KI-Automatisierung Dortmund](/ki-automatisierung-dortmund) und [Digitalagentur Dortmund](/digitalagentur-dortmund).`,
    },
  },
  ...extraPosts,
];

export type LocalizedPost = BlogPostCopy & {
  slug: string;
  publishedAt: string;
  featured?: boolean;
  tags: string[];
  relatedPaths: BlogPost["relatedPaths"];
  readingTimeMin: number;
};

function localize(post: BlogPost, locale: Locale): LocalizedPost {
  const copy = post[locale];
  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    featured: post.featured,
    tags: post.tags,
    relatedPaths: post.relatedPaths,
    ...copy,
    readingTimeMin: readingTime(copy.content),
  };
}

export function getPosts(locale: Locale): LocalizedPost[] {
  return rawPosts
    .map((post) => localize(post, locale))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getFeaturedPosts(locale: Locale, count = 4): LocalizedPost[] {
  const featured = getPosts(locale).filter((post) => post.featured);
  if (featured.length >= count) return featured.slice(0, count);
  return getPosts(locale).slice(0, count);
}

export function getPostBySlug(slug: string, locale: Locale) {
  return getPosts(locale).find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, locale: Locale, count = 2) {
  const current = getPostBySlug(slug, locale);
  if (!current) return [];
  return getPosts(locale)
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((tag) => current.tags.includes(tag)).length;
      const bShared = b.tags.filter((tag) => current.tags.includes(tag)).length;
      return bShared - aShared;
    })
    .slice(0, count);
}

export const blogSlugs = rawPosts.map((post) => post.slug);
