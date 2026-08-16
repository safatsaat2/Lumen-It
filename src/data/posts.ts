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
];

export type LocalizedPost = BlogPostCopy & {
  slug: string;
  publishedAt: string;
  tags: string[];
  relatedPaths: BlogPost["relatedPaths"];
  readingTimeMin: number;
};

export function getPosts(locale: Locale): LocalizedPost[] {
  return rawPosts
    .map((post) => {
      const copy = post[locale];
      return {
        slug: post.slug,
        publishedAt: post.publishedAt,
        tags: post.tags,
        relatedPaths: post.relatedPaths,
        ...copy,
        readingTimeMin: readingTime(copy.content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
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
