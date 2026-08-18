import type { Locale } from "@/i18n/config";
import type { SeoLandingPage } from "@/data/seo-pages";

/** DE-only Dortmund money pages. Not cloned under /en. */
export const dortmundPages: SeoLandingPage[] = [
  {
    slug: "digitalagentur-dortmund",
    kind: "location",
    locales: ["de"],
    keywords: {
      de: [
        "Digitalagentur Dortmund",
        "Digitalagentur NRW",
        "Digitalagentur Ruhrgebiet",
      ],
      en: ["digital agency Dortmund"],
    },
    de: {
      title: "Digitalagentur Dortmund | Branding, Web & Wachstum | MIHI's",
      description:
        "MIHI's ist Ihre Digitalagentur in Dortmund: Markenentwicklung, Webentwicklung, SEO und KI-Automatisierung für KMU und Gründer in NRW.",
      h1: "Digitalagentur Dortmund für Marken, digitale Produkte & Wachstum",
      intro:
        "Wir sitzen in Dortmund und arbeiten mit Unternehmen in NRW und der DACH-Region. Die Arbeit ist klar gescoped: Brand, Website oder Shop, dann Wachstum — nicht ein vages IT-Paket.",
      sections: [
        {
          heading: "Was eine Digitalagentur hier konkret liefert",
          paragraphs: [
            "Drei Säulen: Brand (Positionierung und Identität), Build (Website, WordPress, Shopify, Schnittstellen) und Grow (SEO und Automatisierung). Sie kaufen eine benannte Leistung, keine Folien.",
            "Der kostenlose KI-Berater ist das Erstgespräch. Danach scopen wir schriftlich und setzen um — mit Übergabe, die Ihr Team halten kann.",
          ],
        },
        {
          heading: "Dortmund, Ruhrgebiet, remote",
          paragraphs: [
            "Sitz Dortmund. Zusammenarbeit vor Ort oder remote in ganz Deutschland. Impressum, Datenschutz und Core Web Vitals gehören zum Build.",
          ],
        },
      ],
      faqs: [
        {
          question: "Seid ihr eine IT-Agentur?",
          answer:
            "Nein. Wir sind eine Digitalagentur: Marke, Website und Wachstum. IT-Infrastruktur und Managed Services sind nicht unser Fokus.",
        },
        {
          question: "Arbeitet ihr nur in Dortmund?",
          answer:
            "Dortmund ist der Sitz. Kundinnen und Kunden sitzen in NRW und der DACH-Region. Projekte laufen oft remote.",
        },
      ],
      related: [
        { path: "/branding-agentur-dortmund", label: "Branding Agentur Dortmund" },
        { path: "/webentwicklung-dortmund", label: "Webentwicklung Dortmund" },
        { path: "/ki-automatisierung-dortmund", label: "KI-Automatisierung Dortmund" },
        { path: "/consultation", label: "KI-Berater" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Kostenloses Erstgespräch",
    },
    en: {
      title: "Digital agency Dortmund | MIHI's",
      description: "German-only local page.",
      h1: "Digital agency Dortmund",
      intro: "",
      sections: [],
      faqs: [],
      related: [],
      ctaPath: "/consultation",
      ctaLabel: "Start",
    },
  },
  {
    slug: "branding-agentur-dortmund",
    kind: "location",
    locales: ["de"],
    keywords: {
      de: [
        "Branding Agentur Dortmund",
        "Markenagentur Dortmund",
        "Markenentwicklung Dortmund",
      ],
      en: ["branding agency Dortmund"],
    },
    de: {
      title: "Branding Agentur Dortmund | Markenentwicklung | MIHI's",
      description:
        "Branding Agentur in Dortmund: Markenstrategie, Identität und eine Website, die die Marke trägt — für KMU und Gründer in NRW.",
      h1: "Branding Agentur Dortmund — Marken, die verkaufen",
      intro:
        "Ein Logo ist keine Marke. Wir klären, für wen Sie da sind, wie Sie klingen und wie das auf der Website sichtbar wird. Sitz Dortmund, Projekte in ganz Deutschland.",
      sections: [
        {
          heading: "Markenstrategie, Identität, Umsetzung",
          paragraphs: [
            "Positionierung und Stimme zuerst. Dann visuelles System. Dann Site oder Template, das dasselbe sagt. Ohne Strategie wird Webdesign schnell Generic.",
            "Starten Sie mit dem KI-Berater, wenn Sie noch keine Sprache für das Angebot haben. Danach setzen wir menschlich um.",
          ],
        },
      ],
      faqs: [
        {
          question: "Macht ihr nur Logos?",
          answer:
            "Nein. Logoarbeit gehört dazu, wenn sie nötig ist. Branding heißt hier Strategie, Identität und der Auftritt online.",
        },
      ],
      related: [
        { path: "/digitalagentur-dortmund", label: "Digitalagentur Dortmund" },
        { path: "/branding", label: "Branding" },
        { path: "/brand-strategy", label: "Markenstrategie" },
        { path: "/consultation", label: "KI-Berater" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Marken-Erstgespräch",
    },
    en: {
      title: "Branding agency Dortmund",
      description: "German-only local page.",
      h1: "Branding agency Dortmund",
      intro: "",
      sections: [],
      faqs: [],
      related: [],
      ctaPath: "/consultation",
      ctaLabel: "Start",
    },
  },
  {
    slug: "webentwicklung-dortmund",
    kind: "location",
    locales: ["de"],
    keywords: {
      de: [
        "Webentwicklung Dortmund",
        "Webentwicklungsagentur Dortmund",
        "Webagentur Dortmund",
      ],
      en: ["web development Dortmund"],
    },
    de: {
      title: "Webentwicklung Dortmund | Individuelle Websites | MIHI's",
      description:
        "Webentwicklung in Dortmund: individuelle Websites, Next.js, WordPress und Shopify — DSGVO-bewusst, mit klarer Übergabe.",
      h1: "Webentwicklung Dortmund — Sites um das Angebot herum",
      intro:
        "Wir bauen Websites, die das Angebot tragen: Custom, wenn die Geschichte es braucht, WordPress oder Shopify, wenn das der richtige Ort ist. Sitz Dortmund.",
      sections: [
        {
          heading: "Custom, WordPress oder Shopify",
          paragraphs: [
            "Marketing- und Produktseiten oft auf Next.js. Redaktionsteams oft auf WordPress. Shops auf Shopify, wenn das der Betrieb des Geschäfts ist.",
            "Rechtstexte, Performance und eine Übergabe, die Ihr Team versteht, gehören zum Scope.",
          ],
        },
      ],
      faqs: [
        {
          question: "Kann ich mit einem Template starten?",
          answer:
            "Ja. Ready-to-Go Templates branden wir. Wenn IA oder Integrationen nicht passen, bauen wir custom.",
        },
      ],
      related: [
        { path: "/webdesign-dortmund", label: "Webdesign Dortmund" },
        { path: "/services/custom-web-development", label: "Individuelle Webentwicklung" },
        { path: "/services/wordpress-entwicklung-dortmund", label: "WordPress Dortmund" },
        { path: "/services/shopify-development", label: "Shopify" },
        { path: "/contact", label: "Angebot anfragen" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Website anfragen",
    },
    en: {
      title: "Web development Dortmund",
      description: "German-only local page.",
      h1: "Web development Dortmund",
      intro: "",
      sections: [],
      faqs: [],
      related: [],
      ctaPath: "/contact",
      ctaLabel: "Start",
    },
  },
  {
    slug: "webdesign-dortmund",
    kind: "location",
    locales: ["de"],
    keywords: {
      de: ["Webdesign Dortmund", "Webdesign Agentur Dortmund", "Website Design Dortmund"],
      en: ["web design Dortmund"],
    },
    de: {
      title: "Webdesign Dortmund | Webdesign Agentur | MIHI's",
      description:
        "Webdesign Agentur in Dortmund: UI nach der Marke, Seiten die das Angebot erklären, Umsetzung als Custom-Site oder gebrandetes Template.",
      h1: "Webdesign Dortmund — klar, lesbar, verkaufsstark",
      intro:
        "Wir gestalten Interfaces für den deutschen Markt: präzise Texte, sichtbare Rechtstexte, nächster Schritt offensichtlich. Danach Umsetzung in Dortmund oder remote.",
      sections: [
        {
          heading: "Design, das gebaut wird",
          paragraphs: [
            "Nicht nur Figma. Layouts landen in Next.js, WordPress oder Shopify — oder auf einem Ready-to-Go Template, wenn Tempo zählt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Nur Redesign ohne neue Technik?",
          answer:
            "Möglich. Oft lohnt sich beides zusammen, damit Design und Code nicht auseinanderlaufen.",
        },
      ],
      related: [
        { path: "/webentwicklung-dortmund", label: "Webentwicklung Dortmund" },
        { path: "/webdesign-agentur", label: "Webdesign-Agentur" },
        { path: "/branding-agentur-dortmund", label: "Branding Dortmund" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Design besprechen",
    },
    en: {
      title: "Web design Dortmund",
      description: "German-only local page.",
      h1: "Web design Dortmund",
      intro: "",
      sections: [],
      faqs: [],
      related: [],
      ctaPath: "/contact",
      ctaLabel: "Start",
    },
  },
  {
    slug: "ki-automatisierung-dortmund",
    kind: "location",
    locales: ["de"],
    keywords: {
      de: [
        "KI Automatisierung Dortmund",
        "KI Agentur Dortmund",
        "Geschäftsprozesse automatisieren",
      ],
      en: ["AI automation Dortmund"],
    },
    de: {
      title: "KI-Automatisierung Dortmund | Prozesse & Beratung | MIHI's",
      description:
        "KI-Automatisierung in Dortmund: Prozesse, Copiloten und der kostenlose KI-Markenberater — für Unternehmen, die zuerst Klarheit, dann Automation wollen.",
      h1: "KI-Automatisierung Dortmund — zuerst Klarheit, dann Bots",
      intro:
        "Viele wollen KI, bevor das Angebot und die Daten stimmen. Wir automatisieren benannte Prozesse und nutzen den KI-Berater als Erstgespräch für Marke und Wachstum.",
      sections: [
        {
          heading: "Berater und Umsetzung",
          paragraphs: [
            "Der KI-Berater unter /consultation ist kostenlos und liefert eine Strategie als PDF. Automatisierung von Support, Vertrieb oder internen Abläufen ist ein separates, gescopetes Projekt.",
            "Keine erfundenen Testimonials. Keine Blackbox ohne Monitoring.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ersetzt die KI euer Team?",
          answer:
            "Nein. Sie strukturiert das Erstgespräch. Build und Verantwortung bleiben menschlich.",
        },
      ],
      related: [
        { path: "/consultation", label: "KI-Berater starten" },
        { path: "/services/ai-automation", label: "KI-Automatisierung" },
        { path: "/digitalagentur-dortmund", label: "Digitalagentur Dortmund" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "KI-Berater öffnen",
    },
    en: {
      title: "AI automation Dortmund",
      description: "German-only local page.",
      h1: "AI automation Dortmund",
      intro: "",
      sections: [],
      faqs: [],
      related: [],
      ctaPath: "/consultation",
      ctaLabel: "Start",
    },
  },
];
