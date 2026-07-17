import type { Locale } from "@/i18n/config";
import type { ServiceIconName } from "@/data/service-icons";

export type ServiceContent = {
  slug: string;
  icon: ServiceIconName;
  accent: string;
  title: Record<Locale, string>;
  short: Record<Locale, string>;
  long: Record<Locale, string>;
  benefits: Record<Locale, string[]>;
  cta: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
};

export const services: ServiceContent[] = [
  {
    slug: "custom-web-development",
    icon: "Code2",
    accent: "from-violet-500 to-indigo-500",
    title: {
      en: "Custom Web Development",
      de: "Individuelle Webentwicklung",
    },
    short: {
      en: "Bespoke websites and web platforms built on modern frameworks — no page-builder compromises.",
      de: "Individuelle Websites und Webplattformen auf Basis moderner Frameworks — ganz ohne Page-Builder-Kompromisse.",
    },
    long: {
      en: "For businesses that have outgrown templates, we design and build custom websites and web platforms using modern frameworks like React and Next.js. You get a site built around your exact content structure, integrations, and performance targets — not a theme with your logo on it. Every build includes GDPR-aware defaults, clean semantic code your next developer can actually read, and a full handover package.",
      de: "Für Unternehmen, die aus Templates herausgewachsen sind, gestalten und entwickeln wir individuelle Websites und Webplattformen mit modernen Frameworks wie React und Next.js. Sie erhalten eine Website, die exakt auf Ihre Inhaltsstruktur, Schnittstellen und Performance-Ziele zugeschnitten ist — kein Theme mit aufgesetztem Logo. Jedes Projekt entsteht mit DSGVO-bewussten Standardeinstellungen, sauberem, semantischem Code und einer vollständig dokumentierten Übergabe.",
    },
    benefits: {
      en: [
        "Built for your exact requirements, not a template's limitations",
        "Faster load times and better Core Web Vitals than page-builder sites",
        "Scales cleanly as your business and content grow",
        "Full code ownership and documentation at handover",
      ],
      de: [
        "Exakt auf Ihre Anforderungen zugeschnitten statt Template-Grenzen",
        "Schnellere Ladezeiten und bessere Core-Web-Vitals-Werte als bei Page-Buildern",
        "Wächst sauber mit Ihrem Unternehmen und Ihren Inhalten mit",
        "Vollständige Code-Eigentumsrechte und Dokumentation bei der Übergabe",
      ],
    },
    cta: {
      en: "Request a Web Development Quote",
      de: "Angebot für Webentwicklung anfragen",
    },
    seoTitle: {
      de: "Individuelle Webentwicklung für Unternehmen in Deutschland | MIHI's",
      en: "Custom Web Development for Businesses in Germany | MIHI's",
    },
    metaDescription: {
      de: "Maßgeschneiderte Websites und Webplattformen mit React/Next.js — schnell, sicher und DSGVO-bewusst. Jetzt Angebot anfragen.",
      en: "Bespoke websites and web platforms with React/Next.js — fast, secure, and GDPR-aware. Request a quote today.",
    },
  },
  {
    slug: "wordpress-development",
    icon: "FileCode2",
    accent: "from-sky-500 to-blue-600",
    title: { en: "WordPress Development", de: "WordPress-Entwicklung" },
    short: {
      en: "Professional WordPress sites your marketing team can actually manage after we leave.",
      de: "Professionelle WordPress-Websites, die Ihr Marketing-Team auch nach der Übergabe selbst pflegen kann.",
    },
    long: {
      en: "We build WordPress sites the way a marketing team actually needs them: custom themes or carefully chosen premium themes, a clean editing experience in the block editor, and only the plugins that earn their place. Every WordPress project is checked for update hygiene, security hardening, and page speed before handover, so you're not inheriting technical debt on day one.",
      de: "Wir entwickeln WordPress-Websites so, wie ein Marketing-Team sie wirklich braucht: individuelle Themes oder sorgfältig ausgewählte Premium-Themes, eine übersichtliche Bearbeitung im Block-Editor und nur die Plugins, die ihren Platz auch verdienen. Jedes WordPress-Projekt wird vor der Übergabe auf Update-Hygiene, Sicherheitshärtung und Ladegeschwindigkeit geprüft.",
    },
    benefits: {
      en: [
        "An editing experience your team can use without a developer",
        "Security hardening and update discipline from launch",
        "Custom Gutenberg blocks where they genuinely help",
        "No plugin bloat — only what's justified",
      ],
      de: [
        "Bearbeitbar durch Ihr Team, ganz ohne Entwickler",
        "Sicherheitshärtung und Update-Disziplin ab Launch",
        "Individuelle Gutenberg-Blöcke, wo sie wirklich Mehrwert bieten",
        "Kein Plugin-Wildwuchs — nur, was sich rechtfertigt",
      ],
    },
    cta: { en: "Get a WordPress Quote", de: "WordPress-Angebot anfragen" },
    seoTitle: {
      de: "WordPress-Entwicklung für Unternehmen | MIHI's",
      en: "WordPress Development for Businesses | MIHI's",
    },
    metaDescription: {
      de: "Professionelle WordPress-Websites mit sauberem Code, Sicherheitshärtung und einfacher Bedienung für Ihr Team. Jetzt anfragen.",
      en: "Professional WordPress sites with clean code, security hardening, and an editing experience your team can own.",
    },
  },
  {
    slug: "shopify-development",
    icon: "ShoppingBag",
    accent: "from-emerald-400 to-teal-500",
    title: { en: "Shopify Development", de: "Shopify-Entwicklung" },
    short: {
      en: "Shopify stores built for German shoppers — Klarna, SEPA, and legal texts included.",
      de: "Shopify-Stores für den deutschen Markt — inklusive Klarna, SEPA und rechtssicheren Texten.",
    },
    long: {
      en: "We design, build, and migrate Shopify stores for German and DACH retailers, including details generic Shopify agencies often miss: SEPA and Klarna checkout, Trusted Shops integration, German-language legal texts, and VAT-correct invoicing. Whether you need a customized theme or a fully custom Shopify Plus build, we scope it around your product catalogue and order volume.",
      de: "Wir gestalten, entwickeln und migrieren Shopify-Stores für Händler in Deutschland und der DACH-Region — inklusive der Details, die generische Shopify-Agenturen oft übersehen: SEPA- und Klarna-Checkout, Trusted-Shops-Integration, deutschsprachige Rechtstexte und umsatzsteuerkonforme Rechnungsstellung. Ob Theme-Anpassung oder vollständig individueller Shopify-Plus-Aufbau — wir kalkulieren nach Ihrem Produktkatalog und Bestellvolumen.",
    },
    benefits: {
      en: [
        "German payment methods and legal texts built in from day one",
        "Theme customization or full custom builds, scoped to your catalogue",
        "Clean data migration from your current platform with no lost orders",
        "Ongoing app and performance audits available post-launch",
      ],
      de: [
        "Deutsche Zahlungsarten und Rechtstexte von Anfang an integriert",
        "Theme-Anpassung oder vollständiger Custom-Build, passend zu Ihrem Katalog",
        "Saubere Datenmigration ohne Bestellverlust",
        "Laufende App- und Performance-Audits nach dem Launch verfügbar",
      ],
    },
    cta: { en: "Get a Shopify Quote", de: "Shopify-Angebot anfragen" },
    seoTitle: {
      de: "Shopify-Entwicklung für deutsche Onlineshops | MIHI's",
      en: "Shopify Development for German Online Stores | MIHI's",
    },
    metaDescription: {
      de: "Shopify-Stores mit SEPA, Klarna und rechtssicheren Texten für den deutschen Markt. Individuelle Themes und Migrationen.",
      en: "Shopify stores with SEPA, Klarna, and legally sound texts for the German market. Custom themes and migrations.",
    },
  },
  {
    slug: "ecommerce-solutions",
    icon: "ShoppingCart",
    accent: "from-amber-400 to-orange-500",
    title: { en: "E-commerce Solutions", de: "E-Commerce-Lösungen" },
    short: {
      en: "Full e-commerce builds across Shopify, WooCommerce, and custom platforms.",
      de: "Vollständige E-Commerce-Lösungen auf Shopify, WooCommerce oder individuellen Plattformen.",
    },
    long: {
      en: "Beyond a single platform, we advise on and build the right e-commerce foundation for your catalogue size, order volume, and internal systems — from a focused WooCommerce store to a headless commerce architecture for complex, high-volume retailers. Every build includes payment gateway integration, inventory logic, and a checkout flow tested against German consumer expectations.",
      de: "Über eine einzelne Plattform hinaus beraten und entwickeln wir die passende E-Commerce-Grundlage für Ihre Katalogsgröße, Ihr Bestellvolumen und Ihre internen Systeme — von einem fokussierten WooCommerce-Shop bis zu einer Headless-Commerce-Architektur für Händler mit hohem Volumen. Jedes Projekt umfasst Zahlungsanbieter-Integration, Bestandslogik und einen an deutschen Kundenerwartungen ausgerichteten Checkout.",
    },
    benefits: {
      en: [
        "Platform-neutral advice, not a one-platform sales pitch",
        "Payment, shipping, and tax logic configured for German/EU sales",
        "Inventory and order management that fits your operations",
        "Built to scale from first sale to peak-season traffic",
      ],
      de: [
        "Plattformneutrale Beratung statt Verkauf einer einzigen Lösung",
        "Zahlungs-, Versand- und Steuerlogik für den deutschen und europäischen Markt",
        "Bestands- und Auftragsverwaltung passend zu Ihren Abläufen",
        "Skalierbar vom ersten Verkauf bis zur Saisonspitze",
      ],
    },
    cta: {
      en: "Discuss Your E-Commerce Project",
      de: "E-Commerce-Projekt besprechen",
    },
    seoTitle: {
      de: "E-Commerce-Lösungen: Shopify, WooCommerce & individuell | MIHI's",
      en: "E-Commerce Solutions: Shopify, WooCommerce & Custom | MIHI's",
    },
    metaDescription: {
      de: "Plattformneutrale E-Commerce-Beratung und -Entwicklung für den deutschen und europäischen Markt.",
      en: "Platform-neutral e-commerce consulting and builds for the German and European market.",
    },
  },
  {
    slug: "ui-ux-design",
    icon: "Brush",
    accent: "from-pink-500 to-rose-500",
    title: { en: "UI/UX Design", de: "UI/UX-Design" },
    short: {
      en: "Interfaces designed around how your customers actually decide, not just how they look.",
      de: "Interfaces, die daran ausgerichtet sind, wie Ihre Kunden wirklich entscheiden — nicht nur, wie sie aussehen.",
    },
    long: {
      en: "Our design process starts with how people actually use your product — the questions they ask, the moments they hesitate — before a single pixel is decided. We deliver wireframes, a full visual design system in Figma, and interactive prototypes your developers can build from without guesswork. German users respond to clarity over cleverness, and every design we ship reflects that.",
      de: "Unser Designprozess beginnt damit, wie Menschen Ihr Produkt tatsächlich nutzen — welche Fragen sie stellen, an welchen Stellen sie zögern —, bevor auch nur ein Pixel feststeht. Wir liefern Wireframes, ein vollständiges visuelles Designsystem in Figma und interaktive Prototypen, mit denen Entwickler ohne Rätselraten arbeiten können. Deutsche Nutzerinnen und Nutzer reagieren auf Klarheit stärker als auf Verspieltheit.",
    },
    benefits: {
      en: [
        "Research-informed design, not decoration",
        "A reusable design system, not a one-off set of screens",
        "Developer-ready specs and components",
        "Designed for accessibility (WCAG 2.1 AA) from the first draft",
      ],
      de: [
        "Recherchebasiertes Design statt reiner Dekoration",
        "Ein wiederverwendbares Designsystem statt einmaliger Einzelscreens",
        "Entwicklerfertige Spezifikationen und Komponenten",
        "Barrierefreiheit (WCAG 2.1 AA) von Beginn an mitgedacht",
      ],
    },
    cta: { en: "Start a Design Project", de: "Design-Projekt starten" },
    seoTitle: {
      de: "UI/UX-Design für Websites und Software | MIHI's",
      en: "UI/UX Design for Websites and Software | MIHI's",
    },
    metaDescription: {
      de: "Nutzerzentriertes Interface-Design mit Figma-Designsystemen, barrierefrei nach WCAG 2.1 AA.",
      en: "User-centered interface design with Figma design systems, accessible to WCAG 2.1 AA.",
    },
  },
  {
    slug: "seo-optimization",
    icon: "Search",
    accent: "from-lime-400 to-green-500",
    title: { en: "SEO Optimization", de: "SEO-Optimierung" },
    short: {
      en: "Technical SEO and content strategy built for how Germans actually search.",
      de: "Technisches SEO und Content-Strategie, ausgerichtet auf deutsches Suchverhalten.",
    },
    long: {
      en: "We combine technical SEO (site speed, crawlability, structured data), content strategy in native German, and — increasingly relevant in 2026 — visibility inside AI answer engines like ChatGPT and Google AI Overviews. Reporting is in plain business terms: rankings and traffic are a means to an end, tracked alongside qualified leads and revenue impact.",
      de: "Wir verbinden technisches SEO (Ladegeschwindigkeit, Crawlbarkeit, strukturierte Daten), Content-Strategie in muttersprachlichem Deutsch und — 2026 zunehmend relevant — Sichtbarkeit in KI-Antwortsystemen wie ChatGPT und Google AI Overviews. Das Reporting erfolgt in klarer Geschäftssprache: Rankings und Traffic sind Mittel zum Zweck, ergänzt um qualifizierte Anfragen und Umsatzwirkung.",
    },
    benefits: {
      en: [
        "Technical audits that fix root causes, not just symptoms",
        "Native-quality German content, not translated filler",
        "AI-search (GEO/AEO) visibility included at Growth tier and above",
        "Monthly reporting tied to business outcomes, not vanity metrics",
      ],
      de: [
        "Technische Audits, die Ursachen beheben — nicht nur Symptome",
        "Deutsche Inhalte in muttersprachlicher Qualität, keine übersetzten Füllwörter",
        "KI-Sichtbarkeit (GEO/AEO) ab dem Growth-Paket enthalten",
        "Monatliches Reporting mit Bezug zu Geschäftskennzahlen",
      ],
    },
    cta: { en: "Get an SEO Audit", de: "SEO-Audit anfragen" },
    seoTitle: {
      de: "SEO-Optimierung für den deutschen Markt | MIHI's",
      en: "SEO Optimization for the German Market | MIHI's",
    },
    metaDescription: {
      de: "Technisches SEO, Content-Strategie und KI-Suchsichtbarkeit (GEO/AEO) für Unternehmen in Deutschland.",
      en: "Technical SEO, content strategy, and AI-search visibility (GEO/AEO) for businesses in Germany.",
    },
  },
  {
    slug: "website-maintenance",
    icon: "Wrench",
    accent: "from-slate-500 to-zinc-600",
    title: { en: "Website Maintenance", de: "Website-Wartung" },
    short: {
      en: "Ongoing updates, monitoring, and support so your site stays fast, secure, and online.",
      de: "Laufende Updates, Monitoring und Support, damit Ihre Website schnell, sicher und online bleibt.",
    },
    long: {
      en: "A website is a living system, not a one-time deliverable. Our maintenance plans cover core and plugin updates, daily backups, uptime and security monitoring, and a monthly allowance of content or development time — with response-time guarantees that scale by plan. Most clients move onto a maintenance plan the day their project launches.",
      de: "Eine Website ist ein lebendes System, kein einmaliges Projekt. Unsere Wartungspläne umfassen Core- und Plugin-Updates, tägliche Backups, Uptime- und Sicherheitsüberwachung sowie ein monatliches Zeitkontingent für Inhalte oder Weiterentwicklung — mit Reaktionszeiten, die je nach Plan variieren.",
    },
    benefits: {
      en: [
        "Proactive updates instead of reactive fire-fighting",
        "Daily backups and tested recovery process",
        "A defined monthly time allowance for small changes",
        'Response-time SLAs, not vague "best effort" promises',
      ],
      de: [
        "Proaktive Updates statt reaktiver Feuerwehreinsätze",
        "Tägliche Backups mit getestetem Wiederherstellungsprozess",
        "Festes monatliches Zeitkontingent für kleinere Änderungen",
        "Verbindliche Reaktionszeiten (SLAs) statt vager Bemühenszusagen",
      ],
    },
    cta: { en: "Compare Maintenance Plans", de: "Wartungspläne vergleichen" },
    seoTitle: {
      de: "Website-Wartung & Support-Pläne | MIHI's",
      en: "Website Maintenance & Support Plans | MIHI's",
    },
    metaDescription: {
      de: "Laufende Updates, Backups, Monitoring und priorisierter Support für Ihre Website. Pläne ab 149 €/Monat.",
      en: "Ongoing updates, backups, monitoring, and prioritized support for your website. Plans from €149/month.",
    },
  },
  {
    slug: "website-speed-optimization",
    icon: "Gauge",
    accent: "from-cyan-400 to-blue-500",
    title: {
      en: "Website Speed Optimization",
      de: "Website-Performance-Optimierung",
    },
    short: {
      en: 'Measurable Core Web Vitals improvements, not vague "we made it faster" promises.',
      de: "Messbare Verbesserungen der Core Web Vitals — keine vagen Versprechen von „schneller gemacht“.",
    },
    long: {
      en: "Slow pages cost you both customers and Google rankings. We audit image handling, JavaScript loading, server response time, and caching strategy, then implement fixes with a before/after Lighthouse and Core Web Vitals report. Most sites we optimize move from a 40–60 score into the 90s.",
      de: "Langsame Seiten kosten Sie Kunden und Google-Rankings gleichermaßen. Wir analysieren Bildmanagement, JavaScript-Ladeverhalten, Serverantwortzeiten und Caching-Strategie und setzen anschließend Maßnahmen um — mit einem Vorher-Nachher-Bericht zu Lighthouse- und Core-Web-Vitals-Werten. Die meisten optimierten Websites steigen von 40–60 auf über 90 Punkte.",
    },
    benefits: {
      en: [
        "Documented before/after performance scores",
        "Fixes prioritized by actual impact, not busywork",
        "Often improves SEO rankings as a side effect",
        "One-time audit or ongoing performance monitoring available",
      ],
      de: [
        "Dokumentierte Vorher-Nachher-Performance-Werte",
        "Maßnahmen priorisiert nach tatsächlicher Wirkung",
        "Verbessert häufig auch das SEO-Ranking",
        "Einmaliges Audit oder laufendes Performance-Monitoring buchbar",
      ],
    },
    cta: { en: "Request a Speed Audit", de: "Performance-Audit anfragen" },
    seoTitle: {
      de: "Website-Performance-Optimierung | MIHI's",
      en: "Website Performance Optimization | MIHI's",
    },
    metaDescription: {
      de: "Core Web Vitals und Lighthouse-Score verbessern — mit dokumentiertem Vorher-Nachher-Ergebnis.",
      en: "Improve Core Web Vitals and Lighthouse scores — with documented before/after results.",
    },
  },
  {
    slug: "api-integration",
    icon: "Link2",
    accent: "from-indigo-500 to-violet-600",
    title: { en: "API Integration", de: "API-Integration" },
    short: {
      en: "Your CRM, ERP, payments, and marketing tools, connected and kept in sync.",
      de: "Ihr CRM, ERP, Zahlungsanbieter und Marketing-Tools — verbunden und synchron gehalten.",
    },
    long: {
      en: 'Manual data re-entry between systems costs hours and introduces errors. We build and maintain API integrations between your website, CRM, ERP, payment providers, and marketing tools, with proper error handling and monitoring rather than a fragile one-off script. Every integration includes documentation of what\'s connected to what.',
      de: "Manuelle Datenübertragung zwischen Systemen kostet Zeit und verursacht Fehler. Wir entwickeln und betreuen API-Integrationen zwischen Ihrer Website, CRM, ERP, Zahlungsanbietern und Marketing-Tools — mit sauberer Fehlerbehandlung und Monitoring statt einem fragilen Einmal-Skript. Jede Integration wird dokumentiert.",
    },
    benefits: {
      en: [
        "Eliminates manual double data entry",
        'Built with error handling and monitoring, not "hope it works"',
        "Documented, so it doesn't become a black box",
        "Scoped by complexity — from a single sync to full orchestration",
      ],
      de: [
        "Beseitigt manuelle Doppelerfassung von Daten",
        "Mit Fehlerbehandlung und Monitoring statt Blindvertrauen",
        "Dokumentiert, damit keine Blackbox entsteht",
        "Kalkuliert nach Komplexität — vom Einzel-Sync bis zur vollständigen Orchestrierung",
      ],
    },
    cta: { en: "Scope an Integration", de: "Integration anfragen" },
    seoTitle: {
      de: "API-Integration für CRM, ERP & Zahlungsanbieter | MIHI's",
      en: "API Integration for CRM, ERP & Payment Providers | MIHI's",
    },
    metaDescription: {
      de: "Systeme verbinden und synchron halten — dokumentiert, überwacht und zuverlässig.",
      en: "Connect and sync your systems — documented, monitored, and reliable.",
    },
  },
  {
    slug: "ai-automation",
    icon: "Sparkles",
    accent: "from-fuchsia-500 to-purple-500",
    title: { en: "AI Automation", de: "KI-Automatisierung" },
    short: {
      en: "AI copilots and workflow automation that remove real manual work — with governance included.",
      de: "KI-Copiloten und Workflow-Automatisierung, die echte manuelle Arbeit einsparen — inklusive Governance.",
    },
    long: {
      en: "We design and build AI-powered automation for support triage, lead qualification, document processing, and internal reporting — using retrieval-augmented generation (RAG) where it genuinely improves accuracy, not AI for its own sake. Every deployment includes monitoring, human-in-the-loop escalation, and a clear view of what data the system can access.",
      de: "Wir konzipieren und entwickeln KI-gestützte Automatisierung für Support-Triage, Lead-Qualifizierung, Dokumentenverarbeitung und internes Reporting — mit Retrieval-Augmented Generation (RAG), wo sie die Genauigkeit wirklich verbessert. Jede Umsetzung umfasst Monitoring, eine Eskalation an Menschen bei Grenzfällen sowie eine klare Übersicht der Datenzugriffe.",
    },
    benefits: {
      en: [
        "Scoped around a real, measurable business process",
        "Human-in-the-loop escalation, not a fully unsupervised black box",
        "Monitoring and cost controls from day one",
        "Data access boundaries documented for your own compliance records",
      ],
      de: [
        "Ausgerichtet auf einen echten, messbaren Geschäftsprozess",
        "Eskalation an Menschen bei Grenzfällen statt unüberwachter Blackbox",
        "Monitoring und Kostenkontrolle ab dem ersten Tag",
        "Dokumentierte Datenzugriffsgrenzen für Ihre eigene Compliance",
      ],
    },
    cta: { en: "Explore AI Automation", de: "KI-Automatisierung erkunden" },
    seoTitle: {
      de: "KI-Automatisierung für Unternehmen | MIHI's",
      en: "AI Automation for Businesses | MIHI's",
    },
    metaDescription: {
      de: "KI-Copiloten und Automatisierung für Support, Vertrieb und interne Prozesse — mit Governance und Monitoring.",
      en: "AI copilots and automation for support, sales, and internal processes — with governance and monitoring.",
    },
  },
  {
    slug: "business-automation",
    icon: "Workflow",
    accent: "from-red-500 to-orange-500",
    title: { en: "Business Automation", de: "Business-Automatisierung" },
    short: {
      en: "Rules-based workflow automation across the tools you already use.",
      de: "Regelbasierte Workflow-Automatisierung über die Tools, die Sie bereits nutzen.",
    },
    long: {
      en: "Not every automation needs artificial intelligence — many of the highest-value wins are simple, rules-based workflows connecting tools you already use: invoice routing, appointment scheduling, order notifications, internal approvals. We build these on reliable, maintainable platforms (n8n, Make, Zapier, or custom scripts) and document every workflow.",
      de: "Nicht jede Automatisierung braucht künstliche Intelligenz — viele der wirkungsvollsten Verbesserungen sind einfache, regelbasierte Workflows zwischen bereits genutzten Tools: Rechnungsweiterleitung, Terminplanung, Bestellbenachrichtigungen, interne Freigaben. Wir setzen diese auf zuverlässigen, wartbaren Plattformen um (n8n, Make, Zapier oder individuelle Skripte).",
    },
    benefits: {
      en: [
        "Often the fastest and lowest-cost automation wins",
        "Built on maintainable, well-documented platforms",
        "No dependency on AI where deterministic logic is more reliable",
        "A natural first step before more advanced AI automation",
      ],
      de: [
        "Oft die schnellste und günstigste Form der Automatisierung",
        "Umsetzung auf wartbaren, dokumentierten Plattformen",
        "Keine KI-Abhängigkeit, wo deterministische Logik zuverlässiger ist",
        "Ein sinnvoller erster Schritt vor komplexerer KI-Automatisierung",
      ],
    },
    cta: { en: "Map Your Workflows", de: "Workflows analysieren lassen" },
    seoTitle: {
      de: "Business-Prozessautomatisierung | MIHI's",
      en: "Business Process Automation | MIHI's",
    },
    metaDescription: {
      de: "Regelbasierte Workflow-Automatisierung für wiederkehrende Aufgaben — schnell umgesetzt, klar dokumentiert.",
      en: "Rules-based workflow automation for recurring tasks — delivered fast and clearly documented.",
    },
  },
  {
    slug: "custom-software-development",
    icon: "Blocks",
    accent: "from-violet-600 to-blue-500",
    title: {
      en: "Custom Software Development",
      de: "Individualsoftware-Entwicklung",
    },
    short: {
      en: "Internal tools and platforms built around your actual processes.",
      de: "Interne Tools und Plattformen, die zu Ihren tatsächlichen Prozessen passen.",
    },
    long: {
      en: "When off-the-shelf software forces your team to work around its limitations, we build custom applications instead — internal tools, client portals, booking systems, or full SaaS platforms — architected for your specific data model and workflows. Every project includes a technical specification you own.",
      de: "Wenn Standardsoftware Ihr Team zwingt, sich um deren Grenzen herumzuarbeiten, entwickeln wir stattdessen individuelle Anwendungen — interne Tools, Kundenportale, Buchungssysteme oder vollständige SaaS-Plattformen —, konzipiert für Ihr konkretes Datenmodell und Ihre Arbeitsabläufe. Jedes Projekt umfasst eine technische Dokumentation, die Ihnen gehört.",
    },
    benefits: {
      en: [
        "Built around your process, not the other way around",
        "No recurring per-seat licensing on tools you no longer need",
        "Full technical documentation and code ownership at handover",
        "Scoped in phases, starting with an MVP where appropriate",
      ],
      de: [
        "Passend zu Ihrem Prozess — nicht umgekehrt",
        "Keine wiederkehrenden Lizenzkosten pro Nutzer",
        "Vollständige technische Dokumentation und Code-Eigentum bei Übergabe",
        "Phasenweise Umsetzung, bei Bedarf beginnend mit einem MVP",
      ],
    },
    cta: { en: "Discuss a Custom Build", de: "Individualprojekt besprechen" },
    seoTitle: {
      de: "Individualsoftware-Entwicklung | MIHI's",
      en: "Custom Software Development | MIHI's",
    },
    metaDescription: {
      de: "Interne Tools, Portale und Plattformen, entwickelt für Ihre Prozesse — mit vollständiger Dokumentation.",
      en: "Internal tools, portals, and platforms built for your processes — with full documentation.",
    },
  },
  {
    slug: "cms-development",
    icon: "LayoutTemplate",
    accent: "from-teal-400 to-cyan-500",
    title: { en: "CMS Development", de: "CMS-Entwicklung" },
    short: {
      en: "Content platforms your editorial and marketing team can run without a developer.",
      de: "Content-Plattformen, die Ihr Redaktions- und Marketing-Team ohne Entwickler pflegen kann.",
    },
    long: {
      en: "Whether the right fit is WordPress, TYPO3 (still widely used in German Mittelstand), or a headless CMS such as Sanity or Contentful, we structure content models around how your team actually publishes — multi-author workflows, approval steps, and multilingual content.",
      de: "Ob WordPress, TYPO3 (im deutschen Mittelstand weiterhin verbreitet) oder ein Headless-CMS wie Sanity oder Contentful die richtige Wahl ist — wir strukturieren das Content-Modell danach, wie Ihr Team tatsächlich veröffentlicht: mit Workflows für mehrere Autoren, Freigabeschritten und mehrsprachigen Inhalten.",
    },
    benefits: {
      en: [
        "Right-sized CMS choice for your team size and workflow",
        "Editorial workflows with approval steps, if you need them",
        "Multilingual content structure built in from the start",
        "Training included so your team is self-sufficient after handover",
      ],
      de: [
        "Passende CMS-Wahl für Teamgröße und Arbeitsweise",
        "Redaktionelle Workflows mit Freigabeschritten, sofern benötigt",
        "Mehrsprachige Content-Struktur von Beginn an integriert",
        "Inklusive Schulung für Selbstständigkeit nach der Übergabe",
      ],
    },
    cta: {
      en: "Talk Through Your CMS Needs",
      de: "CMS-Bedarf besprechen",
    },
    seoTitle: {
      de: "CMS-Entwicklung: WordPress, TYPO3 & Headless | MIHI's",
      en: "CMS Development: WordPress, TYPO3 & Headless | MIHI's",
    },
    metaDescription: {
      de: "Content-Management-Systeme, die Ihr Team ohne Entwickler pflegen kann.",
      en: "Content management systems your team can run without a developer.",
    },
  },
  {
    slug: "landing-page-development",
    icon: "Palette",
    accent: "from-yellow-400 to-amber-500",
    title: {
      en: "Landing Page Development",
      de: "Landingpage-Entwicklung",
    },
    short: {
      en: "Focused, high-converting single pages for campaigns, launches, and lead generation.",
      de: "Fokussierte, konversionsstarke Einzelseiten für Kampagnen, Produktlaunches und Leadgenerierung.",
    },
    long: {
      en: "For a product launch, an ad campaign, or a specific lead-generation offer, a full website rebuild is often the wrong tool. We design and build focused landing pages with a single clear goal, fast load times, and conversion tracking, typically delivered within a week.",
      de: "Für einen Produktlaunch, eine Werbekampagne oder ein konkretes Lead-Angebot ist ein kompletter Website-Relaunch oft das falsche Mittel. Wir gestalten und entwickeln fokussierte Landingpages mit einem klaren Ziel, kurzen Ladezeiten und Conversion-Tracking — in der Regel innerhalb einer Woche.",
    },
    benefits: {
      en: [
        "Delivered in days, not weeks",
        "Built around one goal and one call to action",
        "Fast-loading by default — critical for paid traffic quality scores",
        "Conversion tracking configured from launch",
      ],
      de: [
        "Lieferung in Tagen statt Wochen",
        "Ausgerichtet auf ein Ziel und einen Call-to-Action",
        "Standardmäßig schnell ladend — entscheidend für Ads-Qualitätsfaktoren",
        "Conversion-Tracking bereits ab Launch eingerichtet",
      ],
    },
    cta: { en: "Request a Landing Page", de: "Landingpage anfragen" },
    seoTitle: {
      de: "Landingpage-Entwicklung für Kampagnen | MIHI's",
      en: "Landing Page Development for Campaigns | MIHI's",
    },
    metaDescription: {
      de: "Fokussierte, schnell ladende Landingpages für Produktlaunches und Leadgenerierung — Lieferung in Tagen.",
      en: "Focused, fast-loading landing pages for product launches and lead generation — delivered in days.",
    },
  },
  {
    slug: "technical-support",
    icon: "Headphones",
    accent: "from-stone-500 to-neutral-700",
    title: { en: "Technical Support", de: "Technischer Support" },
    short: {
      en: "Direct access to a developer when something breaks — without a ticket queue.",
      de: "Direkter Zugang zu einem Entwickler, wenn etwas ausfällt — ohne Ticket-Warteschlange.",
    },
    long: {
      en: "Whether you're a maintenance client or need one-off help, our technical support covers bug fixes, hosting issues, third-party integration failures, and urgent content fixes. Priority clients get same-business-day response; all clients get a named point of contact.",
      de: "Ob als Wartungskunde oder für einmalige Hilfe: Unser technischer Support deckt Bugfixes, Hosting-Probleme, ausgefallene Drittanbieter-Integrationen und dringende Content-Korrekturen ab. Priority-Kunden erhalten eine Reaktion am selben Werktag; alle Kunden erhalten einen festen Ansprechpartner.",
    },
    benefits: {
      en: [
        "A named contact, not an anonymous ticket queue",
        "Response-time guarantees by plan",
        "Covers hosting, integrations, and content issues — not just code",
        "Available as a standalone hourly service or bundled into a retainer",
      ],
      de: [
        "Fester Ansprechpartner statt anonymer Ticket-Warteschlange",
        "Verbindliche Reaktionszeiten je nach Plan",
        "Deckt Hosting, Integrationen und Content-Probleme ab — nicht nur Code",
        "Buchbar als eigenständige Stundenleistung oder im Retainer enthalten",
      ],
    },
    cta: { en: "Get Support Coverage", de: "Support-Paket anfragen" },
    seoTitle: {
      de: "Technischer Support & Priority-Betreuung | MIHI's",
      en: "Technical Support & Priority Coverage | MIHI's",
    },
    metaDescription: {
      de: "Direkter Zugang zu einem Entwickler mit verbindlichen Reaktionszeiten — kein anonymes Ticketsystem.",
      en: "Direct access to a developer with response-time guarantees — no anonymous ticket queue.",
    },
  },
];

export function getServiceBySlug(
  slug: string,
  list: ServiceContent[] = services,
) {
  return list.find((service) => service.slug === slug);
}

export function localizeService(service: ServiceContent, locale: Locale) {
  return {
    slug: service.slug,
    icon: service.icon,
    accent: service.accent,
    title: service.title[locale],
    short: service.short[locale],
    long: service.long[locale],
    benefits: service.benefits[locale],
    cta: service.cta[locale],
    seoTitle: service.seoTitle[locale],
    metaDescription: service.metaDescription[locale],
  };
}

export function getLocalizedService(
  slug: string,
  locale: Locale,
  list: ServiceContent[] = services,
) {
  const service = getServiceBySlug(slug, list);
  if (!service) return null;
  return localizeService(service, locale);
}
