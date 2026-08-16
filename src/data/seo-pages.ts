import type { Locale } from "@/i18n/config";

export type SeoPageCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  related: { path: string; label: string }[];
  ctaPath: string;
  ctaLabel: string;
};

export type SeoLandingPage = {
  slug: string;
  kind: "topic" | "location" | "consultant";
  keywords: Record<Locale, string[]>;
  de: SeoPageCopy;
  en: SeoPageCopy;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "branding",
    kind: "topic",
    keywords: {
      en: ["branding agency", "brand creation", "branding Germany"],
      de: ["Branding Agentur", "Markenentwicklung", "Branding Deutschland"],
    },
    en: {
      title: "Branding Agency in Germany | MIHI's",
      description:
        "MIHI's builds brands that sell: positioning, verbal identity, visual system, and a website that carries the brand — for German and DACH companies.",
      h1: "Branding that people remember — and buy from",
      intro:
        "A logo is not a brand. Branding is the system of meaning, look, and proof that makes a company feel inevitable. We create that system, then put it to work on a custom website.",
      sections: [
        {
          heading: "What we actually deliver",
          paragraphs: [
            "We start with who you serve, why they should care, and what you refuse to be. Then we translate that into name treatment, voice, colour, type, and a simple set of rules your team can reuse.",
            "The outcome is not a moodboard. It is a usable identity plus a site (or shop) that already speaks in that voice. If you only need identity, we stop there. If you need a launch, we continue into custom web development.",
          ],
        },
        {
          heading: "Who this is for",
          paragraphs: [
            "Founders who are past the first slide deck and need a brand that can survive sales calls, ads, and a product site. Teams replacing a generic template look. Companies entering DACH who need German-language clarity without sounding translated.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do you only design logos?",
          answer:
            "No. Logo work is part of identity when needed, but branding here means positioning, verbal identity, visual system, and how that shows up on the website.",
        },
        {
          question: "Can branding happen without a new website?",
          answer:
            "Yes. Many clients start with identity and strategy, then add a custom site. The AI consultant is a useful first pass before we scope either.",
        },
      ],
      related: [
        { path: "/brand-identity", label: "Brand identity" },
        { path: "/brand-strategy", label: "Brand strategy" },
        { path: "/custom-websites", label: "Custom websites" },
        { path: "/consultation", label: "AI brand consultant" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Start with the AI consultant",
    },
    de: {
      title: "Branding Agentur in Deutschland | MIHI's",
      description:
        "MIHI's entwickelt Marken, die verkaufen: Positionierung, verbale Identität, visuelles System und eine Website, die die Marke trägt — für Unternehmen in Deutschland und der DACH-Region.",
      h1: "Branding, das bleibt — und kauft",
      intro:
        "Ein Logo ist keine Marke. Branding ist das System aus Bedeutung, Auftritt und Beweis, das ein Unternehmen selbstverständlich wirken lässt. Wir bauen dieses System und setzen es auf einer individuellen Website um.",
      sections: [
        {
          heading: "Was Sie konkret erhalten",
          paragraphs: [
            "Wir klären, wen Sie bedienen, warum das relevant ist und wofür Sie nicht stehen. Daraus entstehen Stimme, Farbe, Typografie und einfache Regeln, die Ihr Team wiederverwenden kann.",
            "Das Ergebnis ist keine Moodboard-Sammlung, sondern eine nutzbare Identität plus eine Site (oder ein Shop), die bereits in dieser Stimme spricht. Brauchen Sie nur Identität, hören wir dort auf. Brauchen Sie Launch, geht es in die individuelle Webentwicklung.",
          ],
        },
        {
          heading: "Für wen das gedacht ist",
          paragraphs: [
            "Gründerinnen und Gründer, die über das erste Pitch-Deck hinaus sind. Teams, die ein generisches Template ersetzen. Unternehmen, die den DACH-Markt klar auf Deutsch ansprechen wollen — ohne Übersetzungsgefühl.",
          ],
        },
      ],
      faqs: [
        {
          question: "Machen Sie nur Logos?",
          answer:
            "Nein. Logoarbeit gehört zur Identität, wenn sie nötig ist. Branding bedeutet hier Positionierung, verbale Identität, visuelles System und die Umsetzung auf der Website.",
        },
        {
          question: "Geht Branding ohne neue Website?",
          answer:
            "Ja. Viele starten mit Identität und Strategie und ergänzen später die Site. Der KI-Berater ist ein sinnvoller erster Schritt vor dem Scope.",
        },
      ],
      related: [
        { path: "/brand-identity", label: "Markenidentität" },
        { path: "/brand-strategy", label: "Markenstrategie" },
        { path: "/custom-websites", label: "Individuelle Websites" },
        { path: "/consultation", label: "KI-Markenberater" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Mit dem KI-Berater starten",
    },
  },
  {
    slug: "brand-strategy",
    kind: "topic",
    keywords: {
      en: ["brand strategy", "brand positioning", "brand strategy Germany"],
      de: ["Markenstrategie", "Markenpositionierung", "Brand Strategy"],
    },
    en: {
      title: "Brand Strategy | Positioning that sells | MIHI's",
      description:
        "Brand strategy for German businesses: audience, offer, positioning, and a narrative you can use in sales and on the website — before you spend on design.",
      h1: "Brand strategy before you spend on pixels",
      intro:
        "Most weak websites are strategy problems. If the offer, audience, and proof are fuzzy, no layout will save the conversion. We write that strategy in language your team can actually use.",
      sections: [
        {
          heading: "What brand strategy includes here",
          paragraphs: [
            "Who you serve, what they already tried, why you are the next step, and what you will not promise. We map competitors without copying them, and we define a short narrative for homepage, pitch, and ads.",
            "You can run this as a standalone workshop outcome or feed it into identity and custom web. The AI consultant is a structured first interview; we then tighten it with you.",
          ],
        },
        {
          heading: "How it connects to the website",
          paragraphs: [
            "Strategy becomes page structure: hero claim, proof, offer, and next step. That is why we rarely design a homepage before the story is stable.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is this the same as a business plan?",
          answer:
            "No. We focus on how the market should understand you and what the site must say. Finance and operations stay with you.",
        },
        {
          question: "Can I start with the AI tool?",
          answer:
            "Yes. Use the AI brand consultant, then we refine the output into a strategy you can ship.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/ai-brand-strategy", label: "AI brand strategy" },
        { path: "/consultation", label: "AI consultant" },
        { path: "/services/custom-web-development", label: "Custom web development" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Run a strategy session",
    },
    de: {
      title: "Markenstrategie | Positionierung, die verkauft | MIHI's",
      description:
        "Markenstrategie für Unternehmen in Deutschland: Zielgruppe, Angebot, Positionierung und eine Erzählung für Vertrieb und Website — bevor Sie in Design investieren.",
      h1: "Markenstrategie, bevor Pixel teuer werden",
      intro:
        "Schwache Websites sind oft Strategieprobleme. Ist Angebot, Zielgruppe und Beweis unscharf, rettet kein Layout die Conversion. Wir schreiben die Strategie so, dass Ihr Team sie nutzen kann.",
      sections: [
        {
          heading: "Was Markenstrategie hier umfasst",
          paragraphs: [
            "Wen Sie bedienen, was die Zielgruppe schon versucht hat, warum Sie der nächste Schritt sind und was Sie nicht versprechen. Wettbewerb ohne Kopie. Eine kurze Erzählung für Startseite, Pitch und Anzeigen.",
            "Als eigenes Ergebnis oder als Grundlage für Identität und individuelle Website. Der KI-Berater ist das strukturierte Erstgespräch; danach schärfen wir mit Ihnen.",
          ],
        },
        {
          heading: "Anbindung an die Website",
          paragraphs: [
            "Strategie wird Seitenstruktur: Claim, Beweis, Angebot, nächster Schritt. Deshalb gestalten wir selten eine Startseite, bevor die Geschichte steht.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ist das ein Businessplan?",
          answer:
            "Nein. Es geht darum, wie der Markt Sie verstehen soll und was die Site sagen muss. Finanzen und Betrieb bleiben bei Ihnen.",
        },
        {
          question: "Kann ich mit dem KI-Tool starten?",
          answer:
            "Ja. Nutzen Sie den KI-Markenberater, danach verdichten wir das Ergebnis zu einer Strategie, die Sie umsetzen können.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/ai-brand-strategy", label: "KI-Markenstrategie" },
        { path: "/consultation", label: "KI-Berater" },
        { path: "/services/custom-web-development", label: "Individuelle Webentwicklung" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Strategie-Session starten",
    },
  },
  {
    slug: "brand-identity",
    kind: "topic",
    keywords: {
      en: ["brand identity", "visual identity", "corporate identity"],
      de: ["Markenidentität", "visuelle Identität", "Corporate Identity"],
    },
    en: {
      title: "Brand Identity Design | MIHI's",
      description:
        "Brand identity for German companies: logo system, type, colour, and rules that hold up on a custom website — not a one-off PNG.",
      h1: "Brand identity that survives real use",
      intro:
        "Identity is the visual and verbal kit your team uses every week. We design it so it still looks like you on a landing page, a PDF, and a product UI.",
      sections: [
        {
          heading: "The kit, not the poster",
          paragraphs: [
            "Logo constructions, colour tokens, type pairings, and simple do/don't rules. Enough to brief a developer or a designer without starting over.",
            "We connect identity to custom web and templates: if you launch on a Ready-to-Go site, the identity still has to fit. If you later move to a fully custom build, the system should travel with you.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do you redo everything if we already have a logo?",
          answer:
            "Not always. We keep what works, fix what breaks at small sizes, and fill the gaps (type, colour, usage).",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/web-design", label: "Web design" },
        { path: "/templates", label: "Website templates" },
        { path: "/contact", label: "Contact" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Discuss identity work",
    },
    de: {
      title: "Markenidentität | MIHI's",
      description:
        "Markenidentität für Unternehmen in Deutschland: Logo-System, Typo, Farbe und Regeln, die auf einer individuellen Website halten — kein einmaliges PNG.",
      h1: "Markenidentität, die den Alltag übersteht",
      intro:
        "Identität ist das visuelle und verbale Set, das Ihr Team jede Woche nutzt. Wir gestalten es so, dass es auf Landingpage, PDF und Produkt-UI nach Ihnen aussieht.",
      sections: [
        {
          heading: "Das Set, nicht das Poster",
          paragraphs: [
            "Logo-Konstruktionen, Farbtokens, Schriftpaare und einfache Do/Don't-Regeln. Genug, um Entwicklung oder Design zu briefen, ohne neu zu beginnen.",
            "Anbindung an individuelle Sites und Templates: Starten Sie mit Ready-to-Go, muss die Identität trotzdem passen. Wechseln Sie später auf Custom, soll das System mitwandern.",
          ],
        },
      ],
      faqs: [
        {
          question: "Wird alles neu, wenn schon ein Logo da ist?",
          answer:
            "Nicht immer. Wir behalten, was funktioniert, reparieren, was in klein zerbricht, und füllen Lücken (Typo, Farbe, Anwendung).",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/web-design", label: "Webdesign" },
        { path: "/templates", label: "Website-Templates" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Identität besprechen",
    },
  },
  {
    slug: "web-development",
    kind: "topic",
    keywords: {
      en: ["web development Germany", "custom web development", "Next.js agency"],
      de: ["Webentwicklung Deutschland", "individuelle Webentwicklung", "Next.js Agentur"],
    },
    en: {
      title: "Web Development in Germany | MIHI's",
      description:
        "Custom web development for German businesses: Next.js and modern stacks, GDPR-aware, with a handover your team can own — plus Shopify and WordPress when they fit.",
      h1: "Web development that matches the brand, not a theme",
      intro:
        "We build sites and platforms with a fixed scope, clean code, and documentation. Custom when you need control; Shopify or WordPress when the product already lives there.",
      sections: [
        {
          heading: "How we choose the stack",
          paragraphs: [
            "Marketing and product sites often run on Next.js. Shops stay on Shopify when that is the operating system of the business. WordPress remains an option when content teams already live there.",
            "SEO, performance, and German legal pages (Impressum, privacy) are part of the build, not a later patch.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do you only build Next.js?",
          answer:
            "No. Next.js is a strong default for custom sites. We also deliver Shopify and WordPress when that is the right home for the business.",
        },
      ],
      related: [
        { path: "/custom-websites", label: "Custom websites" },
        { path: "/services/custom-web-development", label: "Custom web service" },
        { path: "/services/shopify-development", label: "Shopify" },
        { path: "/services/wordpress-development", label: "WordPress" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Scope a build",
    },
    de: {
      title: "Webentwicklung in Deutschland | MIHI's",
      description:
        "Individuelle Webentwicklung für Unternehmen in Deutschland: Next.js und moderne Stacks, DSGVO-bewusst, mit Übergabe an Ihr Team — plus Shopify und WordPress, wenn es passt.",
      h1: "Webentwicklung, die zur Marke passt — nicht zum Theme",
      intro:
        "Wir bauen Sites und Plattformen mit festem Scope, sauberem Code und Dokumentation. Custom, wenn Sie Kontrolle brauchen; Shopify oder WordPress, wenn das Geschäft dort läuft.",
      sections: [
        {
          heading: "Wie wir den Stack wählen",
          paragraphs: [
            "Marketing- und Produktseiten oft auf Next.js. Shops bleiben auf Shopify, wenn das das Betriebssystem des Geschäfts ist. WordPress, wenn Redaktion dort bereits arbeitet.",
            "SEO, Performance und rechtliche Seiten (Impressum, Datenschutz) gehören zum Build, nicht zum Nachtrag.",
          ],
        },
      ],
      faqs: [
        {
          question: "Bauen Sie nur Next.js?",
          answer:
            "Nein. Next.js ist ein starker Default für individuelle Sites. Shopify und WordPress liefern wir, wenn das der richtige Ort für das Geschäft ist.",
        },
      ],
      related: [
        { path: "/custom-websites", label: "Individuelle Websites" },
        { path: "/services/custom-web-development", label: "Custom-Web-Leistung" },
        { path: "/services/shopify-development", label: "Shopify" },
        { path: "/services/wordpress-development", label: "WordPress" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Build scopen",
    },
  },
  {
    slug: "custom-websites",
    kind: "topic",
    keywords: {
      en: ["custom websites", "custom website development", "bespoke website"],
      de: ["individuelle Websites", "maßgeschneiderte Website", "Custom Website"],
    },
    en: {
      title: "Custom Websites | Built around your brand | MIHI's",
      description:
        "Custom websites for German and DACH companies: structure from brand strategy, design from identity, engineering that you can maintain after handover.",
      h1: "Custom websites built around the offer, not a template grid",
      intro:
        "A custom site is worth it when the offer, proof, or product flow does not fit a theme. We design the pages around how you sell, then engineer them so Core Web Vitals and German legal requirements are not an afterthought.",
      sections: [
        {
          heading: "Custom vs Ready-to-Go",
          paragraphs: [
            "If you need to go live in hours with a proven layout, use our templates and we brand them. If you need unique IA, integrations, or a product story, we build custom.",
            "Many clients start with a template and later migrate. We plan that path so you do not throw the brand away.",
          ],
        },
      ],
      faqs: [
        {
          question: "How long does a custom site take?",
          answer:
            "It depends on scope. We agree a fixed range after discovery — often weeks, not an open-ended retainer — then handover with docs.",
        },
      ],
      related: [
        { path: "/web-development", label: "Web development" },
        { path: "/web-design", label: "Web design" },
        { path: "/templates", label: "Ready-to-Go templates" },
        { path: "/services/custom-web-development", label: "Custom web service" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Plan a custom site",
    },
    de: {
      title: "Individuelle Websites | Zur Marke gebaut | MIHI's",
      description:
        "Individuelle Websites für Unternehmen in Deutschland und der DACH-Region: Struktur aus der Markenstrategie, Design aus der Identität, Engineering, das Sie nach der Übergabe halten können.",
      h1: "Individuelle Websites um das Angebot herum — nicht um ein Theme",
      intro:
        "Custom lohnt sich, wenn Angebot, Beweis oder Produktfluss nicht in ein Theme passen. Wir gestalten Seiten um Ihren Verkauf, dann bauen wir so, dass Core Web Vitals und deutsche Rechtstexte kein Nachtrag sind.",
      sections: [
        {
          heading: "Custom vs Ready-to-Go",
          paragraphs: [
            "Wenn Sie in Stunden live gehen wollen, nutzen Sie unsere Templates, die wir branden. Wenn IA, Integrationen oder eine Produktgeschichte einzigartig sein müssen, bauen wir custom.",
            "Viele starten mit einem Template und migrieren später. Wir planen den Weg, damit die Marke nicht verloren geht.",
          ],
        },
      ],
      faqs: [
        {
          question: "Wie lange dauert eine individuelle Site?",
          answer:
            "Hängt vom Scope ab. Nach Discovery ein fester Rahmen — oft Wochen, kein offenes Retainer — danach Übergabe mit Dokumentation.",
        },
      ],
      related: [
        { path: "/web-development", label: "Webentwicklung" },
        { path: "/web-design", label: "Webdesign" },
        { path: "/templates", label: "Ready-to-Go Templates" },
        { path: "/services/custom-web-development", label: "Custom-Web-Leistung" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Individuelle Site planen",
    },
  },
  {
    slug: "web-design",
    kind: "topic",
    keywords: {
      en: ["web design Germany", "UI UX design", "website design"],
      de: ["Webdesign Agentur", "UI UX Design", "Website Design Deutschland"],
    },
    en: {
      title: "Web Design Agency in Germany | MIHI's",
      description:
        "Web design for German businesses: UI that follows the brand, pages that explain the offer, and layouts ready for custom development or a branded template.",
      h1: "Web design that sells the offer, not just the aesthetic",
      intro:
        "We design interfaces that carry identity and make the next step obvious. Visual polish matters; so does German copy length, legal links, and how a founder actually presents the product.",
      sections: [
        {
          heading: "From identity to screens",
          paragraphs: [
            "Type and colour from the identity system. Layout from the strategy. Components that a developer can implement without inventing a second brand.",
            "If you already have Figma, we can implement. If you do not, we design then build — or apply the look to a Ready-to-Go template.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do you do UX research?",
          answer:
            "We do structured interviews and offer testing with you, not a large research department. The AI consultant is often the first interview.",
        },
      ],
      related: [
        { path: "/brand-identity", label: "Brand identity" },
        { path: "/custom-websites", label: "Custom websites" },
        { path: "/webdesign-agentur", label: "Webdesign-Agentur" },
        { path: "/services/custom-web-development", label: "Custom web" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Discuss web design",
    },
    de: {
      title: "Webdesign Agentur in Deutschland | MIHI's",
      description:
        "Webdesign für Unternehmen in Deutschland: UI nach der Marke, Seiten, die das Angebot erklären, Layouts für individuelle Entwicklung oder ein gebrandetes Template.",
      h1: "Webdesign, das das Angebot verkauft — nicht nur die Ästhetik",
      intro:
        "Wir gestalten Interfaces, die Identität tragen und den nächsten Schritt klar machen. Optik zählt; ebenso deutsche Textlänge, rechtliche Links und wie Gründer das Produkt wirklich erklären.",
      sections: [
        {
          heading: "Von der Identität zu Screens",
          paragraphs: [
            "Schrift und Farbe aus dem Identitätssystem. Layout aus der Strategie. Komponenten, die Entwicklung umsetzen kann, ohne eine zweite Marke zu erfinden.",
            "Haben Sie bereits Figma, setzen wir um. Wenn nicht, gestalten und bauen wir — oder übertragen den Look auf ein Ready-to-Go Template.",
          ],
        },
      ],
      faqs: [
        {
          question: "Macht ihr UX-Research?",
          answer:
            "Strukturierte Gespräche und Offer-Tests mit Ihnen, keine große Research-Abteilung. Der KI-Berater ist oft das erste Interview.",
        },
      ],
      related: [
        { path: "/brand-identity", label: "Markenidentität" },
        { path: "/custom-websites", label: "Individuelle Websites" },
        { path: "/webdesign-agentur", label: "Webdesign-Agentur" },
        { path: "/services/custom-web-development", label: "Custom Web" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Webdesign besprechen",
    },
  },
  {
    slug: "digital-solutions",
    kind: "topic",
    keywords: {
      en: ["digital solutions", "AI automation", "API integration"],
      de: ["digitale Lösungen", "KI-Automatisierung", "API-Integration"],
    },
    en: {
      title: "Digital Solutions | Web, automation, SEO | MIHI's",
      description:
        "Digital solutions from MIHI's: custom websites, Shopify, APIs, SEO, and AI automation — scoped clearly so German SMEs are not buying a vague transformation package.",
      h1: "Digital solutions with a named scope",
      intro:
        "We do not sell “digital transformation” as a slogan. We sell named practices: a site, a shop, an integration, SEO, or automation — combined when it helps, separated when it should.",
      sections: [
        {
          heading: "What sits under this umbrella",
          paragraphs: [
            "Custom web, WordPress, Shopify, API integration, SEO, and AI automation. Branding and the AI consultant sit next to them so the tech follows the offer.",
            "Start with consultation if you are unsure what to buy. Then we map to a service page and a fixed conversation.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can I buy only automation?",
          answer:
            "Yes, if the site and data are already in place. Otherwise we usually fix the source of truth first.",
        },
      ],
      related: [
        { path: "/services", label: "All services" },
        { path: "/services/ai-automation", label: "AI automation" },
        { path: "/services/api-integration", label: "API integration" },
        { path: "/services/seo-optimization", label: "SEO" },
      ],
      ctaPath: "/services",
      ctaLabel: "Browse services",
    },
    de: {
      title: "Digitale Lösungen | Web, Automatisierung, SEO | MIHI's",
      description:
        "Digitale Lösungen von MIHI's: individuelle Websites, Shopify, APIs, SEO und KI-Automatisierung — klar gescoped, kein vages Transformationspaket.",
      h1: "Digitale Lösungen mit benanntem Scope",
      intro:
        "Wir verkaufen keine „digitale Transformation“ als Slogan. Wir verkaufen benannte Leistungen: Site, Shop, Integration, SEO oder Automatisierung — kombiniert wenn sinnvoll, getrennt wenn nötig.",
      sections: [
        {
          heading: "Was darunterfällt",
          paragraphs: [
            "Custom Web, WordPress, Shopify, API-Integration, SEO und KI-Automatisierung. Branding und der KI-Berater stehen daneben, damit Technik dem Angebot folgt.",
            "Unsicher, was Sie kaufen? Starten Sie mit der Beratung, dann mappen wir auf eine Leistungsseite.",
          ],
        },
      ],
      faqs: [
        {
          question: "Geht nur Automatisierung?",
          answer:
            "Ja, wenn Site und Daten schon stehen. Sonst klären wir zuerst die Quelle der Wahrheit.",
        },
      ],
      related: [
        { path: "/services", label: "Alle Leistungen" },
        { path: "/services/ai-automation", label: "KI-Automatisierung" },
        { path: "/services/api-integration", label: "API-Integration" },
        { path: "/services/seo-optimization", label: "SEO" },
      ],
      ctaPath: "/services",
      ctaLabel: "Leistungen ansehen",
    },
  },
  {
    slug: "branding-agency-germany",
    kind: "location",
    keywords: {
      en: ["branding agency Germany", "branding agency Berlin", "DACH branding"],
      de: ["Branding Agentur Deutschland", "Branding Agentur Berlin"],
    },
    en: {
      title: "Branding Agency in Germany | Berlin-based | MIHI's",
      description:
        "MIHI's is a branding agency working with German and DACH companies from Berlin: brand creation, identity, and websites that carry the brand — GDPR-aware.",
      h1: "A branding agency for companies that sell in Germany",
      intro:
        "We work from Berlin with clients across Germany and DACH. The work is bilingual when it needs to be. Legal and privacy expectations are German by default.",
      sections: [
        {
          heading: "Why location still matters",
          paragraphs: [
            "Searchers looking for a branding agency in Germany usually need German copy, Impressum-ready sites, and a partner who understands DACH buying behaviour — not a US template with a .de domain.",
            "We are not a 200-person network. Founder-led delivery, clear scopes, and the AI consultant as a first conversation.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need to be in Berlin?",
          answer:
            "No. Berlin is where we are based. Projects run remotely across Germany and DACH.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/branding-agentur", label: "Branding-Agentur" },
        { path: "/consultation", label: "AI consultant" },
        { path: "/contact", label: "Contact" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Start a conversation",
    },
    de: {
      title: "Branding Agency in Germany | Sitz Berlin | MIHI's",
      description:
        "MIHI's ist eine Branding-Agentur für Unternehmen in Deutschland und der DACH-Region, mit Sitz in Berlin: Markenaufbau, Identität und Websites — DSGVO-bewusst.",
      h1: "Branding-Agentur für Unternehmen, die in Deutschland verkaufen",
      intro:
        "Wir arbeiten aus Berlin mit Kundinnen und Kunden in Deutschland und der DACH-Region. Zweisprachig, wenn nötig. Recht und Datenschutz standardmäßig deutsch.",
      sections: [
        {
          heading: "Warum der Standort zählt",
          paragraphs: [
            "Wer eine Branding-Agentur in Deutschland sucht, braucht meist deutsche Texte, impressumsfähige Sites und ein Verständnis für DACH-Kaufverhalten — kein US-Template mit .de-Domain.",
            "Keine 200-Personen-Network-Agentur. Founder-led, klare Scopes, KI-Berater als Erstgespräch.",
          ],
        },
      ],
      faqs: [
        {
          question: "Muss ich in Berlin sein?",
          answer:
            "Nein. Berlin ist der Sitz. Projekte laufen remote in Deutschland und der DACH-Region.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/branding-agentur", label: "Branding-Agentur" },
        { path: "/consultation", label: "KI-Berater" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Gespräch starten",
    },
  },
  {
    slug: "web-design-germany",
    kind: "location",
    keywords: {
      en: ["web design Germany", "web design agency Germany", "website design Berlin"],
      de: ["Webdesign Deutschland", "Webdesign Agentur Deutschland"],
    },
    en: {
      title: "Web Design in Germany | MIHI's",
      description:
        "Web design and custom websites for companies in Germany: brand-led UI, German-language pages, and engineering that meets local legal and performance expectations.",
      h1: "Web design for the German market",
      intro:
        "Designing for Germany means longer, more precise copy, visible legal links, and trust signals that match how B2B and SMB buyers decide. We design for that, then build.",
      sections: [
        {
          heading: "What we design and ship",
          paragraphs: [
            "Marketing sites, product sites, and shops. Custom when the story needs it; branded templates when speed matters. SEO and Core Web Vitals are part of the brief.",
          ],
        },
      ],
      faqs: [
        {
          question: "English-only sites?",
          answer:
            "Possible, but most German companies need at least a German layer. We plan locales from the start.",
        },
      ],
      related: [
        { path: "/web-design", label: "Web design" },
        { path: "/webdesign-agentur", label: "Webdesign-Agentur" },
        { path: "/custom-websites", label: "Custom websites" },
        { path: "/services", label: "Services" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Request a design conversation",
    },
    de: {
      title: "Webdesign in Deutschland | MIHI's",
      description:
        "Webdesign und individuelle Websites für Unternehmen in Deutschland: markengeführte UI, deutschsprachige Seiten und Engineering, das lokale Rechts- und Performance-Erwartungen erfüllt.",
      h1: "Webdesign für den deutschen Markt",
      intro:
        "Design für Deutschland heißt oft längere, präzisere Texte, sichtbare Rechtstexte und Vertrauenssignale, die zu B2B- und KMU-Entscheidungen passen. Dafür gestalten und bauen wir.",
      sections: [
        {
          heading: "Was wir gestalten und liefern",
          paragraphs: [
            "Marketing-Sites, Produktseiten, Shops. Custom, wenn die Geschichte es braucht; gebrandete Templates, wenn Tempo zählt. SEO und Core Web Vitals gehören zum Briefing.",
          ],
        },
      ],
      faqs: [
        {
          question: "Nur englische Sites?",
          answer:
            "Möglich, aber die meisten Unternehmen in Deutschland brauchen mindestens eine deutsche Ebene. Locales planen wir von Anfang an.",
        },
      ],
      related: [
        { path: "/web-design", label: "Webdesign" },
        { path: "/webdesign-agentur", label: "Webdesign-Agentur" },
        { path: "/custom-websites", label: "Individuelle Websites" },
        { path: "/services", label: "Leistungen" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Design-Gespräch anfragen",
    },
  },
  {
    slug: "branding-agentur",
    kind: "location",
    keywords: {
      en: ["Branding Agentur", "Markenentwicklung Agentur"],
      de: ["Branding Agentur", "Markenentwicklung", "Agentur Berlin"],
    },
    en: {
      title: "Branding-Agentur | MIHI's Berlin",
      description:
        "MIHI's is a branding agency (Branding-Agentur) in Germany: Markenentwicklung, identity, and websites — with an AI consultant as the first structured conversation.",
      h1: "Branding-Agentur — Markenentwicklung with a website attached",
      intro:
        "This page is for German-language search. The work is the same as our branding practice: strategy, identity, and a site that can sell in DACH.",
      sections: [
        {
          heading: "Leistung, nicht Türsteher-Seite",
          paragraphs: [
            "We keep a small set of location pages so German queries have a clear landing point. Content is unique and links into the full service set — not a doorway farm.",
          ],
        },
      ],
      faqs: [
        {
          question: "Unterschied zu /branding?",
          answer:
            "Same practice. This URL matches how many people search in German. /branding is the English-led topic page.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/branding-agency-germany", label: "Branding agency Germany" },
        { path: "/consultation", label: "KI-Berater" },
        { path: "/impressum", label: "Impressum" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "KI-Berater starten",
    },
    de: {
      title: "Branding-Agentur Berlin | Markenentwicklung | MIHI's",
      description:
        "MIHI's ist Ihre Branding-Agentur in Deutschland: Markenentwicklung, Identität und Websites — mit KI-Berater als strukturiertem Erstgespräch. Sitz Berlin, Projekte in der DACH-Region.",
      h1: "Branding-Agentur: Markenentwicklung mit Website",
      intro:
        "Wir entwickeln Positionierung, Identität und den digitalen Auftritt so, dass Vertrieb und Website dieselbe Sprache sprechen — auf Deutsch, DSGVO-bewusst, ohne leere Agenturphrasen.",
      sections: [
        {
          heading: "Was eine Branding-Agentur hier konkret tut",
          paragraphs: [
            "Kein 80-seitiges Brandbook, das in der Schublade landet. Ein nutzbares System: Claim, Stimme, visuelles Set und Seiten, die das Angebot tragen.",
            "Danach Umsetzung: individuelle Website, Template mit Branding oder Shop — je nach Scope. Der KI-Berater hilft, den Scope zu klären, bevor Sie kaufen.",
          ],
        },
        {
          heading: "Berlin und remote",
          paragraphs: [
            "Sitz in Berlin. Zusammenarbeit remote in ganz Deutschland. Impressum und rechtliche Seiten gehören zum Lieferumfang einer Site, nicht zur Fußnote.",
          ],
        },
      ],
      faqs: [
        {
          question: "Was ist der Unterschied zu /branding?",
          answer:
            "Dieselbe Praxis. Diese URL trifft die deutsche Suche. /branding ist die englisch geführte Themenseite. Beide verlinken auf Beratung und Leistungen.",
        },
        {
          question: "Arbeitet ihr nur in Berlin?",
          answer: "Nein. Berlin ist der Sitz. Kundinnen und Kunden sitzen in der DACH-Region.",
        },
      ],
      related: [
        { path: "/branding", label: "Branding" },
        { path: "/brand-strategy", label: "Markenstrategie" },
        { path: "/branding-agency-germany", label: "Branding agency Germany" },
        { path: "/consultation", label: "KI-Berater" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Mit dem KI-Berater starten",
    },
  },
  {
    slug: "webdesign-agentur",
    kind: "location",
    keywords: {
      en: ["Webdesign Agentur", "web design agency Germany"],
      de: ["Webdesign Agentur", "Webdesign Berlin", "Agentur Webdesign"],
    },
    en: {
      title: "Webdesign-Agentur | MIHI's",
      description:
        "MIHI's is a web design agency in Germany: brand-led UI, custom websites, and templates — GDPR-aware, with German and English pages.",
      h1: "Webdesign-Agentur — sites that match the brand",
      intro:
        "German-language landing for web design. Same practice as /web-design: UI, custom builds, or branded Ready-to-Go templates.",
      sections: [
        {
          heading: "What you get",
          paragraphs: [
            "Page design tied to identity, then engineering on Next.js, Shopify, or WordPress. Legal pages and performance are in the scope.",
          ],
        },
      ],
      faqs: [
        {
          question: "Difference vs /web-design?",
          answer:
            "Same work. This slug matches German search. /web-design is the English-led topic page.",
        },
      ],
      related: [
        { path: "/web-design", label: "Web design" },
        { path: "/web-design-germany", label: "Web design Germany" },
        { path: "/custom-websites", label: "Custom websites" },
        { path: "/contact", label: "Contact" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Talk about a site",
    },
    de: {
      title: "Webdesign-Agentur | Individuelle Websites | MIHI's",
      description:
        "MIHI's ist Ihre Webdesign-Agentur in Deutschland: markengeführte UI, individuelle Websites und Templates — DSGVO-bewusst, Deutsch und Englisch.",
      h1: "Webdesign-Agentur: Sites, die zur Marke passen",
      intro:
        "Wir gestalten und bauen Websites für den deutschen Markt: klare Angebote, lesbare Typografie, rechtliche Seiten und Technik, die nach der Übergabe haltbar ist.",
      sections: [
        {
          heading: "Design und Umsetzung",
          paragraphs: [
            "Nicht nur Figma. Layouts, die in Next.js, Shopify oder WordPress landen — oder als gebrandetes Ready-to-Go Template, wenn Tempo zählt.",
            "Webdesign ohne Marke rutscht ins Generic. Deshalb verlinken wir Identität und Strategie, statt nur ein Theme umzufärben.",
          ],
        },
      ],
      faqs: [
        {
          question: "Unterschied zu /web-design?",
          answer:
            "Dieselbe Leistung. Diese URL trifft die deutsche Suche. /web-design ist die englisch geführte Themenseite.",
        },
      ],
      related: [
        { path: "/web-design", label: "Webdesign" },
        { path: "/web-design-germany", label: "Webdesign Deutschland" },
        { path: "/custom-websites", label: "Individuelle Websites" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/contact",
      ctaLabel: "Website besprechen",
    },
  },
  {
    slug: "ai-brand-consultant",
    kind: "consultant",
    keywords: {
      en: ["AI brand consultant", "AI branding consultant", "brand consultant"],
      de: ["KI Markenberater", "KI Branding Berater", "Markenberater"],
    },
    en: {
      title: "AI Brand Consultant | Free structured session | MIHI's",
      description:
        "Use MIHI's AI brand consultant for a structured branding and business conversation, then download a strategy PDF. Human follow-up when you want to build.",
      h1: "AI brand consultant — a first session, not a chatbot toy",
      intro:
        "The consultant asks about your offer, audience, and constraints, then produces a strategy you can read and share. It lives at /consultation. This page explains when to use it.",
      sections: [
        {
          heading: "What it is for",
          paragraphs: [
            "Founders who need language for positioning before they buy design. Teams who want a written starting point for a kickoff. Anyone who is not ready to book a full project yet.",
            "It does not replace a human workshop for complex organisations. It does replace a blank page.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is the consultant free?",
          answer:
            "Yes. You can run a session and download a PDF. Project work after that is scoped separately.",
        },
      ],
      related: [
        { path: "/consultation", label: "Open the consultant" },
        { path: "/ai-brand-strategy", label: "AI brand strategy" },
        { path: "/brand-strategy-tool", label: "Brand strategy tool" },
        { path: "/brand-strategy", label: "Brand strategy" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Open the AI consultant",
    },
    de: {
      title: "KI-Markenberater | Kostenlose Session | MIHI's",
      description:
        "Der KI-Markenberater von MIHI's führt ein strukturiertes Gespräch zu Marke und Geschäft und liefert eine Strategie als PDF. Menschliche Umsetzung, wenn Sie bauen wollen.",
      h1: "KI-Markenberater — Erstgespräch, kein Spielzeug-Chat",
      intro:
        "Der Berater fragt nach Angebot, Zielgruppe und Rahmen und erzeugt eine Strategie zum Lesen und Teilen. Er lebt unter /consultation. Diese Seite erklärt, wann Sie ihn nutzen.",
      sections: [
        {
          heading: "Wofür er da ist",
          paragraphs: [
            "Gründerinnen und Gründer, die Sprache für Positionierung brauchen, bevor sie Design kaufen. Teams, die ein schriftliches Kickoff-Fundament wollen. Alle, die noch kein volles Projekt buchen.",
            "Er ersetzt keinen Workshop in komplexen Organisationen. Er ersetzt die leere Seite.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ist der Berater kostenlos?",
          answer:
            "Ja. Session und PDF sind frei. Projektarbeit danach wird separat gescoped.",
        },
      ],
      related: [
        { path: "/consultation", label: "Berater öffnen" },
        { path: "/ai-brand-strategy", label: "KI-Markenstrategie" },
        { path: "/brand-strategy-tool", label: "Markenstrategie-Tool" },
        { path: "/brand-strategy", label: "Markenstrategie" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "KI-Berater öffnen",
    },
  },
  {
    slug: "ai-brand-strategy",
    kind: "consultant",
    keywords: {
      en: ["AI brand strategy", "AI branding strategy"],
      de: ["KI Markenstrategie", "KI Brand Strategy"],
    },
    en: {
      title: "AI Brand Strategy | MIHI's consultant",
      description:
        "Generate a first brand strategy with MIHI's AI consultant: positioning, audience, and next steps — then refine with us into identity and a website.",
      h1: "AI brand strategy as a working draft",
      intro:
        "Strategy from the consultant is a draft you can argue with. We use it as input for brand strategy, identity, and custom websites — not as a finished bible.",
      sections: [
        {
          heading: "From draft to build",
          paragraphs: [
            "Run the session, export the PDF, then either implement yourself or ask us to turn it into a site brief. The tool does not auto-build the website.",
          ],
        },
      ],
      faqs: [
        {
          question: "Does the AI invent fake proof?",
          answer:
            "You should only keep claims you can stand behind. We do not publish invented testimonials on this site, and we will not put them on yours.",
        },
      ],
      related: [
        { path: "/consultation", label: "AI consultant" },
        { path: "/brand-strategy", label: "Brand strategy" },
        { path: "/ai-brand-consultant", label: "AI brand consultant" },
        { path: "/custom-websites", label: "Custom websites" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Generate a strategy draft",
    },
    de: {
      title: "KI-Markenstrategie | Berater von MIHI's",
      description:
        "Erste Markenstrategie mit dem KI-Berater von MIHI's: Positionierung, Zielgruppe, nächste Schritte — danach Schärfung zu Identität und Website.",
      h1: "KI-Markenstrategie als Arbeitsentwurf",
      intro:
        "Die Strategie aus dem Berater ist ein Entwurf, den Sie gegenchecken. Wir nutzen ihn für Markenstrategie, Identität und individuelle Websites — nicht als fertige Bibel.",
      sections: [
        {
          heading: "Vom Entwurf zum Build",
          paragraphs: [
            "Session laufen lassen, PDF exportieren, selbst umsetzen oder uns bitten, daraus ein Site-Briefing zu machen. Das Tool baut die Website nicht automatisch.",
          ],
        },
      ],
      faqs: [
        {
          question: "Erfindet die KI Beweise?",
          answer:
            "Behalten Sie nur Claims, die Sie vertreten können. Wir veröffentlichen keine erfundenen Testimonials — und setzen sie auch nicht auf Ihre Site.",
        },
      ],
      related: [
        { path: "/consultation", label: "KI-Berater" },
        { path: "/brand-strategy", label: "Markenstrategie" },
        { path: "/ai-brand-consultant", label: "KI-Markenberater" },
        { path: "/custom-websites", label: "Individuelle Websites" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Strategie-Entwurf erzeugen",
    },
  },
  {
    slug: "brand-strategy-tool",
    kind: "consultant",
    keywords: {
      en: ["brand strategy tool", "branding tool", "AI branding tool"],
      de: ["Markenstrategie Tool", "Branding Tool", "KI Branding Tool"],
    },
    en: {
      title: "Brand Strategy Tool | MIHI's AI consultant",
      description:
        "MIHI's brand strategy tool is the AI consultant: guided questions, a written strategy, and a PDF — then human help for identity and custom websites.",
      h1: "A brand strategy tool that writes with you",
      intro:
        "If you searched for a brand strategy tool, this is ours: not a canvas template, a guided conversation that outputs a document you can take to design or development.",
      sections: [
        {
          heading: "How to use it",
          paragraphs: [
            "Answer honestly, especially about constraints and who you will not serve. Vague answers produce vague strategy. Then open related pages on branding and custom websites when you are ready to implement.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need an account?",
          answer:
            "You start a consultation session in the browser. Keep the link if you want to return to the same journey.",
        },
      ],
      related: [
        { path: "/consultation", label: "Open the tool" },
        { path: "/business-growth-assessment", label: "Growth assessment" },
        { path: "/branding", label: "Branding" },
        { path: "/contact", label: "Contact" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Open the strategy tool",
    },
    de: {
      title: "Markenstrategie-Tool | KI-Berater von MIHI's",
      description:
        "Das Markenstrategie-Tool von MIHI's ist der KI-Berater: geführte Fragen, schriftliche Strategie, PDF — danach menschliche Hilfe für Identität und Website.",
      h1: "Ein Markenstrategie-Tool, das mit Ihnen schreibt",
      intro:
        "Wenn Sie ein Markenstrategie-Tool suchen: unseres ist kein Canvas-Template, sondern ein geführtes Gespräch mit Dokument, das Sie in Design oder Entwicklung mitnehmen.",
      sections: [
        {
          heading: "So nutzen Sie es",
          paragraphs: [
            "Antworten Sie ehrlich, besonders zu Grenzen und wen Sie nicht bedienen. Vage Antworten erzeugen vage Strategie. Danach Branding- und Website-Seiten, wenn Sie umsetzen wollen.",
          ],
        },
      ],
      faqs: [
        {
          question: "Brauche ich ein Konto?",
          answer:
            "Sie starten eine Session im Browser. Den Link behalten, wenn Sie zur selben Journey zurückkehren wollen.",
        },
      ],
      related: [
        { path: "/consultation", label: "Tool öffnen" },
        { path: "/business-growth-assessment", label: "Wachstums-Check" },
        { path: "/branding", label: "Branding" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Strategie-Tool öffnen",
    },
  },
  {
    slug: "business-growth-assessment",
    kind: "consultant",
    keywords: {
      en: ["business growth assessment", "brand assessment", "AI business consultant"],
      de: ["Wachstumsanalyse", "Business Assessment", "KI Business Berater"],
    },
    en: {
      title: "Business Growth Assessment | MIHI's AI consultant",
      description:
        "A structured growth assessment via MIHI's AI consultant: offer, channel, and brand gaps — then a path into strategy, identity, or a custom website.",
      h1: "Growth assessment before you rebuild everything",
      intro:
        "Many companies rebuild the website when the offer or channel is the real bottleneck. The consultant surfaces that. We then recommend strategy, identity, a template, or a custom build — not all of them by default.",
      sections: [
        {
          heading: "What you walk away with",
          paragraphs: [
            "A written view of where the brand and site are unclear. Suggested next steps. A PDF to share with a co-founder. Optional human scoping after.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is this a financial audit?",
          answer:
            "No. It is a brand and go-to-market conversation. We do not replace your accountant or tax advisor.",
        },
      ],
      related: [
        { path: "/consultation", label: "Start the assessment" },
        { path: "/ai-brand-consultant", label: "AI brand consultant" },
        { path: "/digital-solutions", label: "Digital solutions" },
        { path: "/contact", label: "Contact" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Start the assessment",
    },
    de: {
      title: "Business-Wachstums-Check | KI-Berater | MIHI's",
      description:
        "Strukturierter Wachstums-Check über den KI-Berater von MIHI's: Angebot, Kanal, Markenlücken — danach Weg in Strategie, Identität oder individuelle Website.",
      h1: "Wachstums-Check, bevor Sie alles neu bauen",
      intro:
        "Viele bauen die Website neu, obwohl Angebot oder Kanal der Engpass sind. Der Berater macht das sichtbar. Danach empfehlen wir Strategie, Identität, Template oder Custom — nicht alles standardmäßig.",
      sections: [
        {
          heading: "Was Sie mitnehmen",
          paragraphs: [
            "Eine schriftliche Sicht, wo Marke und Site unklar sind. Nächste Schritte. PDF für Mitgründerinnen und Mitgründer. Optional menschliches Scoping danach.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ist das ein Finanz-Audit?",
          answer:
            "Nein. Es ist ein Gespräch zu Marke und Go-to-Market. Wir ersetzen weder Buchhaltung noch Steuerberatung.",
        },
      ],
      related: [
        { path: "/consultation", label: "Check starten" },
        { path: "/ai-brand-consultant", label: "KI-Markenberater" },
        { path: "/digital-solutions", label: "Digitale Lösungen" },
        { path: "/contact", label: "Kontakt" },
      ],
      ctaPath: "/consultation",
      ctaLabel: "Check starten",
    },
  },
];

export function getSeoPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}

export function getSeoCopy(slug: string, locale: Locale) {
  const page = getSeoPage(slug);
  if (!page) return undefined;
  return page[locale];
}

export const seoPageSlugs = seoLandingPages.map((page) => page.slug);

export const legalSlugs = ["privacy", "terms", "cookies", "impressum"] as const;
