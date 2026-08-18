import type { Locale } from "@/i18n/config";
import type { ServiceIconName } from "@/data/service-icons";

export type ServiceContent = {
  slug: string;
  localeSlugs?: Partial<Record<Locale, string>>;
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
    localeSlugs: { de: "wordpress-entwicklung-dortmund" },
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
      de: "WordPress-Entwicklung Dortmund | Website erstellen lassen | MIHI's",
      en: "WordPress Development for Businesses | MIHI's",
    },
    metaDescription: {
      de: "WordPress-Entwicklung in Dortmund: professionelle Websites mit sauberem Code, Sicherheit und einfacher Pflege. Jetzt Angebot anfragen.",
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
        "AI-search (GEO/AEO) visibility considered where relevant",
        "Reporting tied to business outcomes, not vanity metrics",
      ],
      de: [
        "Technische Audits, die Ursachen beheben — nicht nur Symptome",
        "Deutsche Inhalte in muttersprachlicher Qualität, keine übersetzten Füllwörter",
        "KI-Sichtbarkeit (GEO/AEO), wo sie für Ihr Projekt sinnvoll ist",
        "Reporting mit Bezug zu Geschäftskennzahlen statt Vanity-Metriken",
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
];

export function publicServiceSlug(service: ServiceContent, locale: Locale) {
  return service.localeSlugs?.[locale] ?? service.slug;
}

export function getServiceBySlug(
  slug: string,
  list: ServiceContent[] = services,
) {
  return list.find(
    (service) =>
      service.slug === slug ||
      service.localeSlugs?.de === slug ||
      service.localeSlugs?.en === slug,
  );
}

export function localizeService(service: ServiceContent, locale: Locale) {
  return {
    slug: publicServiceSlug(service, locale),
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
