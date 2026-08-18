import type { BlogPost } from "@/data/posts";

const contact = {
  path: "/contact",
  label: { en: "Request a quote", de: "Angebot anfragen" },
} as const;

const consult = {
  path: "/consultation",
  label: { en: "AI consultant", de: "KI-Berater" },
} as const;

/** 20 extra service-intent articles. Homepage uses featured posts from posts.ts only. */
export const extraPosts: BlogPost[] = [
  {
    slug: "shopify-vs-woocommerce-deutschland",
    publishedAt: "2026-07-28",
    tags: ["shopify", "ecommerce", "germany"],
    relatedPaths: [
      { path: "/services/shopify-development", label: { en: "Shopify", de: "Shopify" } },
      { path: "/services/wordpress-development", label: { en: "WordPress", de: "WordPress" } },
      contact,
    ],
    en: {
      title: "Shopify vs WooCommerce for German shops in 2026",
      description:
        "Klarna, SEPA, VAT invoices, legal texts — which stack actually fits a DACH shop, and when neither is the right first move.",
      category: "Shopify",
      content: `German shoppers expect familiar checkout and legal trust. Shopify and WooCommerce can both sell here. The wrong choice is picking a platform because a YouTube video called it “easier.”

Choose [Shopify development](/services/shopify-development) when operations should live in Shopify: catalogue, checkout, apps. Choose WordPress/WooCommerce when the marketing site and the shop must be one CMS your team already runs.

## What German shops actually need

SEPA, Klarna, German legal pages, VAT-correct invoices. Generic themes skip these. We scope them in from day one.

## Next step

If you are migrating, [contact us](/contact) with the current platform and order volume. Do not rebuild until the offer is clear — use the [AI consultant](/consultation) first if the shop still cannot say who it is for.`,
    },
    de: {
      title: "Shopify vs WooCommerce für Shops in Deutschland 2026",
      description:
        "Klarna, SEPA, USt-Rechnungen, Rechtstexte — welcher Stack zu einem DACH-Shop passt, und wann keines von beiden der erste Schritt ist.",
      category: "Shopify",
      content: `Im deutschen Checkout zählen vertraute Zahlarten und rechtliches Vertrauen. Shopify und WooCommerce können beides. Die falsche Wahl ist eine Plattform, weil ein Video sie „einfacher“ nennt.

[Shopify-Entwicklung](/services/shopify-development), wenn Katalog, Checkout und Apps in Shopify leben sollen. WordPress/WooCommerce, wenn Shop und Marketing-Site ein CMS sein müssen, das Ihr Team schon bedient.

## Was deutsche Shops wirklich brauchen

SEPA, Klarna, Rechtstexte, korrekte Rechnungen. Generic Themes lassen das weg. Wir scopen es von Tag eins.

## Nächster Schritt

Bei Migration: [Kontakt](/contact) mit aktueller Plattform und Bestellvolumen. Nicht neu bauen, solange das Angebot unklar ist — zuerst [KI-Berater](/consultation).`,
    },
  },
  {
    slug: "nextjs-vs-wordpress-agentur",
    publishedAt: "2026-07-22",
    tags: ["nextjs", "wordpress", "performance"],
    relatedPaths: [
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      { path: "/services/wordpress-development", label: { en: "WordPress", de: "WordPress" } },
      contact,
    ],
    en: {
      title: "Next.js or WordPress — what German companies should pick",
      description:
        "Core Web Vitals, editors, and cost of change: a practical split for 2026, not a framework war.",
      category: "Web",
      content: `Next.js wins on performance and structured locales. WordPress wins when a marketing team must publish without a developer. Most “slow WordPress” sites are plugin piles, not proof that WordPress is dead.

If Core Web Vitals and a product UI matter, start with [custom web development](/services/custom-web-development). If editors already live in the block editor, stay on [WordPress](/services/wordpress-development) and harden it.

## 2026 reality

Google still rewards useful pages and real speed. Fancy stacks with empty content do not rank.

[Request a quote](/contact) with your current CMS and who will edit the site after launch.`,
    },
    de: {
      title: "Next.js oder WordPress — was Unternehmen 2026 wählen sollten",
      description:
        "Core Web Vitals, Redaktion und Wechselkosten: eine praktische Trennung, kein Framework-Krieg.",
      category: "Web",
      content: `Next.js gewinnt bei Performance und Locales. WordPress gewinnt, wenn Marketing ohne Entwickler publizieren muss. Die meisten langsamen WordPress-Sites sind Plugin-Berge, kein Beweis, dass WordPress tot ist.

Wenn Core Web Vitals und Produkt-UI zählen: [individuelle Webentwicklung](/services/custom-web-development). Wenn Redaktion im Block-Editor lebt: [WordPress](/services/wordpress-development) härten, nicht fliehen.

## Realität 2026

Google belohnt nützliche Seiten und echte Geschwindigkeit. Leere High-End-Stacks ranken nicht.

[Angebot](/contact) mit aktuellem CMS und wer die Site nach Launch pflegt.`,
    },
  },
  {
    slug: "dsgvo-website-checkliste-kmu",
    publishedAt: "2026-07-18",
    tags: ["gdpr", "legal", "websites"],
    relatedPaths: [
      { path: "/web-design", label: { en: "Web design", de: "Webdesign" } },
      { path: "/impressum", label: { en: "Impressum", de: "Impressum" } },
      contact,
    ],
    en: {
      title: "GDPR website checklist for German SMEs",
      description:
        "Impressum, privacy, cookies, and hosting — the minimum a business site in Germany needs before you spend on ads.",
      category: "Legal",
      content: `Ads on a site without Impressum and a real privacy page waste money and trust. We do not replace your lawyer. We do put legal routes in the build, not as a forgotten footer.

Minimum: Impressum, privacy, cookie notice that matches what you actually load, and a contact path that works. See our [legal notice](/impressum) pattern and [web design](/web-design) for how that looks on the page.

## Before you scale traffic

Fix tracking consent and forms. Then [contact](/contact) if the site still cannot be handed over cleanly.`,
    },
    de: {
      title: "DSGVO-Website-Checkliste für KMU",
      description:
        "Impressum, Datenschutz, Cookies, Hosting — das Minimum, bevor Sie Geld in Anzeigen stecken.",
      category: "Recht",
      content: `Anzeigen auf einer Site ohne Impressum und echte Datenschutzerklärung verbrennen Geld und Vertrauen. Wir ersetzen keine Anwaltskanzlei. Wir bauen rechtliche Routen mit, nicht als vergessenen Footer.

Minimum: Impressum, Datenschutz, Cookie-Hinweis passend zu dem, was Sie wirklich laden, funktionierender Kontakt. Muster: [Impressum](/impressum) und [Webdesign](/web-design).

## Bevor Traffic skaliert

Einwilligung und Formulare klären. Dann [Kontakt](/contact), wenn die Site noch nicht übergabefähig ist.`,
    },
  },
  {
    slug: "core-web-vitals-kmu-2026",
    publishedAt: "2026-07-08",
    tags: ["performance", "seo", "nextjs"],
    relatedPaths: [
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      { path: "/services/seo-optimization", label: { en: "SEO", de: "SEO" } },
      contact,
    ],
    en: {
      title: "Core Web Vitals in 2026: what still moves rankings",
      description:
        "INP, LCP, and CLS for business sites — without placebo plugins or fake 100/100 screenshots.",
      category: "SEO",
      content: `Core Web Vitals are still a ranking and conversion factor. Most “speed plugins” add JavaScript. Real gains come from less JS, better images, and a stack that fits the page.

[Custom sites](/services/custom-web-development) on Next.js start with server rendering. WordPress can pass too if you remove bloat. Pair speed with [SEO](/services/seo-optimization): a fast empty page still does not rank.

## Measure field data

Lab scores lie. Use Search Console and real users. Then [ask for a quote](/contact) with your current URL.`,
    },
    de: {
      title: "Core Web Vitals 2026: was Rankings wirklich bewegt",
      description:
        "INP, LCP und CLS für Unternehmenssites — ohne Placebo-Plugins und Fake-100/100-Screenshots.",
      category: "SEO",
      content: `Core Web Vitals bleiben Ranking- und Conversion-Faktor. Die meisten „Speed-Plugins“ fügen JavaScript hinzu. Echte Gewinne: weniger JS, bessere Bilder, passender Stack.

[Individuelle Sites](/services/custom-web-development) auf Next.js starten serverseitig. WordPress schafft das auch ohne Ballast. Tempo plus [SEO](/services/seo-optimization): eine schnelle leere Seite rankt nicht.

## Felddaten messen

Labor lügt. Search Console und echte Nutzer. Danach [Angebot](/contact) mit Ihrer URL.`,
    },
  },
  {
    slug: "local-seo-dortmund-kmu",
    publishedAt: "2026-06-30",
    tags: ["seo", "dortmund", "local"],
    relatedPaths: [
      { path: "/services/seo-optimization", label: { en: "SEO", de: "SEO" } },
      { path: "/contact", label: { en: "Contact", de: "Kontakt" } },
      consult,
    ],
    en: {
      title: "Local SEO for companies in Dortmund and NRW",
      description:
        "Google Business Profile, city + service pages, and why 20 cloned city URLs will not save you.",
      category: "SEO",
      content: `If you serve Dortmund, say so on the homepage, on GBP, and on a few real service pages. Do not generate Bochum/Essen copies of the same text.

We use [SEO](/services/seo-optimization) plus a short set of local landings. The German-language Dortmund pages live on the DE site, not as cloned English city URLs.

## Reviews and NAP

Same name, address, phone everywhere. Then [contact](/contact). Visibility is half off-site.`,
    },
    de: {
      title: "Local SEO für Unternehmen in Dortmund und NRW",
      description:
        "Google Unternehmensprofil, Stadt+Leistung, und warum 20 geklonte Städteseiten nicht retten.",
      category: "SEO",
      content: `Wenn Sie Dortmund bedienen, sagen Sie das auf der Startseite, im Unternehmensprofil und auf wenigen echten Leistungsseiten. Keine Bochum/Essen-Klone desselben Texts.

Wir nutzen [SEO](/services/seo-optimization) plus wenige lokale Landings. Start: [Digitalagentur Dortmund](/digitalagentur-dortmund).

## Bewertungen und NAP

Gleicher Name, Adresse, Telefon überall. Dann [Kontakt](/contact). Sichtbarkeit ist zur Hälfte außerhalb der Website.`,
    },
  },
  {
    slug: "shopify-checkout-deutschland",
    publishedAt: "2026-06-22",
    tags: ["shopify", "checkout", "germany"],
    relatedPaths: [
      { path: "/services/shopify-development", label: { en: "Shopify", de: "Shopify" } },
      contact,
      consult,
    ],
    en: {
      title: "Shopify checkout for Germany: Klarna, SEPA, trust",
      description:
        "Why US themes fail German conversion — and what we actually configure on a Shopify build.",
      category: "Shopify",
      content: `A US Shopify theme with PayPal-only checkout leaks German carts. Klarna, SEPA, and visible legal links are not “nice extras.”

[Shopify development](/services/shopify-development) for DACH includes payments, legal texts, and VAT-aware invoicing. If the brand is still fuzzy, [consult](/consultation) before a Plus rebuild.

[Contact](/contact) with your current theme and payment list.`,
    },
    de: {
      title: "Shopify-Checkout für Deutschland: Klarna, SEPA, Vertrauen",
      description:
        "Warum US-Themes deutsche Conversion verlieren — und was wir in einem Shopify-Build wirklich konfigurieren.",
      category: "Shopify",
      content: `Ein US-Theme mit nur PayPal verliert deutsche Warenkörbe. Klarna, SEPA und sichtbare Rechtstexte sind kein Extra.

[Shopify-Entwicklung](/services/shopify-development) für DACH: Zahlarten, Rechtstexte, USt-fähige Rechnungen. Ist die Marke unscharf, zuerst [Berater](/consultation).

[Kontakt](/contact) mit Theme und Zahlarten-Liste.`,
    },
  },
  {
    slug: "api-integration-crm-kmu",
    publishedAt: "2026-06-14",
    tags: ["api", "crm", "automation"],
    relatedPaths: [
      { path: "/services/api-integration", label: { en: "API integration", de: "API-Integration" } },
      { path: "/services/ai-automation", label: { en: "AI automation", de: "KI-Automatisierung" } },
      contact,
    ],
    en: {
      title: "CRM and API integration for small teams",
      description:
        "Connect the shop, forms, and CRM without a six-month enterprise project — and without silent data leaks.",
      category: "API",
      content: `Most SMEs do not need a data lake. They need the contact form, Shopify, and CRM to agree on one customer record.

That is [API integration](/services/api-integration). [AI automation](/services/ai-automation) comes after the source of truth exists.

## GDPR

Know where personal data flows. Then [contact](/contact) with the tools you already pay for.`,
    },
    de: {
      title: "CRM- und API-Integration für kleine Teams",
      description:
        "Shop, Formulare und CRM verbinden — ohne Enterprise-Projekt und ohne stille Datenlecks.",
      category: "API",
      content: `Die meisten KMU brauchen keinen Data Lake. Sie brauchen, dass Formular, Shopify und CRM denselben Kundensatz meinen.

Das ist [API-Integration](/services/api-integration). [KI-Automatisierung](/services/ai-automation) kommt danach.

## DSGVO

Wissen, wohin personenbezogene Daten fließen. Dann [Kontakt](/contact) mit den Tools, die Sie schon zahlen.`,
    },
  },
  {
    slug: "branding-agentur-auswaehlen",
    publishedAt: "2026-06-06",
    tags: ["branding", "agency", "startups"],
    relatedPaths: [
      { path: "/branding", label: { en: "Branding", de: "Branding" } },
      consult,
      contact,
    ],
    en: {
      title: "How to choose a branding agency for a startup",
      description:
        "Skip moodboards that never ship. What to ask before you buy identity, strategy, or a logo pack.",
      category: "Branding",
      content: `A branding agency should leave you with language and rules your site can use. If the delivery is only a PNG, you bought decoration.

Ask for process, handover, and whether they will touch the website. Our [branding](/branding) work sits next to the [AI consultant](/consultation).

[Contact](/contact) with what you already have: name, competitors, and who you will not serve.`,
    },
    de: {
      title: "Wie Sie eine Branding-Agentur für ein Startup wählen",
      description:
        "Keine Moodboards, die nie live gehen. Was Sie fragen, bevor Sie Identität, Strategie oder ein Logo-Paket kaufen.",
      category: "Branding",
      content: `Eine Branding-Agentur sollte Sprache und Regeln hinterlassen, die die Website nutzen kann. Nur ein PNG ist Dekoration.

Fragen Sie nach Ablauf, Übergabe und ob die Website dazugehört. Unser [Branding](/branding) sitzt neben dem [KI-Berater](/consultation).

[Kontakt](/contact) mit Name, Wettbewerb und wen Sie nicht bedienen.`,
    },
  },
  {
    slug: "rebranding-oder-refresh",
    publishedAt: "2026-05-28",
    tags: ["branding", "identity", "rebrand"],
    relatedPaths: [
      { path: "/brand-identity", label: { en: "Brand identity", de: "Markenidentität" } },
      { path: "/brand-strategy", label: { en: "Brand strategy", de: "Markenstrategie" } },
      contact,
    ],
    en: {
      title: "Rebrand vs brand refresh — which one do you need?",
      description:
        "Keep the name and fix the system, or start over? A cost-aware split for SMEs.",
      category: "Identity",
      content: `A full rebrand is for a broken offer or a name you cannot defend. A refresh is new type, colour, and rules on a name that still works.

Start with [brand strategy](/brand-strategy) if the sentence “we are for X” is weak. Start with [brand identity](/brand-identity) if the sentence is strong but the files are a mess.

Then [contact](/contact). Do not buy both by default.`,
    },
    de: {
      title: "Rebranding oder Refresh — was brauchen Sie?",
      description:
        "Name behalten und das System reparieren, oder neu anfangen? Eine kostensensible Trennung für KMU.",
      category: "Identität",
      content: `Ein volles Rebranding ist für ein kaputtes Angebot oder einen Namen, den Sie nicht vertreten. Ein Refresh ist Schrift, Farbe und Regeln bei einem Namen, der noch trägt.

[Markenstrategie](/brand-strategy), wenn der Satz „wir sind für X“ schwach ist. [Markenidentität](/brand-identity), wenn der Satz stark ist, die Dateien aber Chaos.

Dann [Kontakt](/contact). Nicht beides standardmäßig kaufen.`,
    },
  },
  {
    slug: "headless-cms-vs-wordpress",
    publishedAt: "2026-05-20",
    tags: ["cms", "wordpress", "nextjs"],
    relatedPaths: [
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      { path: "/services/wordpress-development", label: { en: "WordPress", de: "WordPress" } },
      contact,
    ],
    en: {
      title: "Headless CMS vs WordPress in 2026",
      description:
        "When a headless stack is worth the editor pain — and when Gutenberg is the grown-up choice.",
      category: "Web",
      content: `Headless looks modern. Editors often hate it. WordPress looks old. Teams often ship faster.

Go headless with [custom web](/services/custom-web-development) when you already have a product team. Stay on [WordPress](/services/wordpress-development) when marketing is the publisher.

[Contact](/contact) with who will log in after week one.`,
    },
    de: {
      title: "Headless CMS vs WordPress 2026",
      description:
        "Wann Headless den Editor-Schmerz wert ist — und wann Gutenberg die erwachsene Wahl ist.",
      category: "Web",
      content: `Headless wirkt modern. Redaktion hasst es oft. WordPress wirkt alt. Teams gehen oft schneller live.

Headless mit [Custom Web](/services/custom-web-development), wenn schon ein Produktteam da ist. [WordPress](/services/wordpress-development), wenn Marketing publiziert.

[Kontakt](/contact) mit der Frage, wer nach Woche eins einloggt.`,
    },
  },
  {
    slug: "ki-automatisierung-kmu-prozesse",
    publishedAt: "2026-05-12",
    tags: ["ai", "automation", "kmu"],
    relatedPaths: [
      { path: "/services/ai-automation", label: { en: "AI automation", de: "KI-Automatisierung" } },
      consult,
      contact,
    ],
    en: {
      title: "AI automation for SMEs: which processes first",
      description:
        "Support, quotes, and internal FAQs — not “an AI strategy.” How we scope automation without a black box.",
      category: "AI",
      content: `Automate a named process with a human fallback. Do not buy a chatbot that invents prices.

[AI automation](/services/ai-automation) after the [consultant](/consultation) if the offer is still vague. Then [contact](/contact) with the process you want to stop doing by hand.`,
    },
    de: {
      title: "KI-Automatisierung für KMU: welche Prozesse zuerst",
      description:
        "Support, Angebote, interne FAQs — keine „KI-Strategie“. So scopen wir Automation ohne Blackbox.",
      category: "KI",
      content: `Einen benannten Prozess automatisieren, mit menschlichem Fallback. Kein Chatbot, der Preise erfindet.

[KI-Automatisierung](/services/ai-automation) nach dem [Berater](/consultation), wenn das Angebot noch vage ist. Dann [Kontakt](/contact) mit dem Prozess, den Sie nicht mehr per Hand machen wollen.`,
    },
  },
  {
    slug: "landingpage-conversion-b2b",
    publishedAt: "2026-05-04",
    tags: ["conversion", "web-design", "b2b"],
    relatedPaths: [
      { path: "/web-design", label: { en: "Web design", de: "Webdesign" } },
      { path: "/custom-websites", label: { en: "Custom websites", de: "Individuelle Websites" } },
      contact,
    ],
    en: {
      title: "B2B landing pages that convert in Germany",
      description:
        "Longer copy, one CTA, real proof — not a US SaaS template with a .de domain.",
      category: "Web design",
      content: `German B2B pages need a claim you can defend, proof you have, and a next step: consultant, contact, or template. Fake reviews hurt more than an empty testimonial slot.

We design that on [web design](/web-design) and [custom websites](/custom-websites). [Contact](/contact) with your current URL and the one action you want.`,
    },
    de: {
      title: "B2B-Landingpages, die in Deutschland convertieren",
      description:
        "Längere Texte, ein CTA, echter Beweis — kein US-SaaS-Template mit .de-Domain.",
      category: "Webdesign",
      content: `Deutsche B2B-Seiten brauchen einen Claim, den Sie vertreten, Beweis, den Sie haben, und einen nächsten Schritt: Berater, Kontakt oder Template. Fake-Reviews schaden mehr als ein leerer Platz.

Wir gestalten das unter [Webdesign](/web-design) und [individuellen Websites](/custom-websites). [Kontakt](/contact) mit URL und der einen Aktion, die Sie wollen.`,
    },
  },
  {
    slug: "impressum-fehler-websites",
    publishedAt: "2026-04-26",
    tags: ["legal", "impressum", "germany"],
    relatedPaths: [
      { path: "/impressum", label: { en: "Impressum", de: "Impressum" } },
      { path: "/contact", label: { en: "Contact", de: "Kontakt" } },
      { path: "/web-development", label: { en: "Web development", de: "Webentwicklung" } },
    ],
    en: {
      title: "Impressum mistakes that kill trust on German sites",
      description:
        "Hidden legal links, placeholder addresses, and why “we’ll add it later” fails the first sales call.",
      category: "Legal",
      content: `If the Impressum is a 6pt footer link or still says [Street], serious buyers leave. We keep legal pages as real routes. Example: [Impressum](/impressum).

Build it into [web development](/web-development), then [contact](/contact) if yours is still a template leftover.`,
    },
    de: {
      title: "Impressum-Fehler, die auf deutschen Sites Vertrauen kosten",
      description:
        "Versteckte Links, Platzhalter-Adressen, und warum „kommt später“ das erste Verkaufsgespräch tötet.",
      category: "Recht",
      content: `Ist das Impressum ein 6pt-Footer oder steht noch [Straße], gehen ernsthafte Kaufende. Rechtliche Seiten sind echte Routen. Beispiel: [Impressum](/impressum).

Mitdenken in der [Webentwicklung](/web-development), dann [Kontakt](/contact), wenn Ihres noch ein Template-Rest ist.`,
    },
  },
  {
    slug: "nocode-vs-individuelle-software",
    publishedAt: "2026-04-18",
    tags: ["software", "nocode", "api"],
    relatedPaths: [
      { path: "/services/api-integration", label: { en: "API integration", de: "API-Integration" } },
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      contact,
    ],
    en: {
      title: "No-code vs custom software for internal tools",
      description:
        "When Airtable is enough, and when you need a real app and APIs — without an enterprise rebuild.",
      category: "Software",
      content: `No-code is fine until permissions, audit logs, or volume break it. Then you need [API integration](/services/api-integration) or a [custom web](/services/custom-web-development) tool.

We do not sell fake “custom software” for a form. [Contact](/contact) with the workflow and user count.`,
    },
    de: {
      title: "No-Code vs individuelle Software für interne Tools",
      description:
        "Wann Airtable reicht — und wann Sie eine echte App und APIs brauchen, ohne Enterprise-Rebuild.",
      category: "Software",
      content: `No-Code reicht, bis Rechte, Audit-Logs oder Volumen brechen. Dann [API-Integration](/services/api-integration) oder [Custom Web](/services/custom-web-development).

Wir verkaufen keine Fake-„Individualsoftware“ für ein Formular. [Kontakt](/contact) mit Ablauf und Nutzerzahl.`,
    },
  },
  {
    slug: "ecommerce-seo-shopify",
    publishedAt: "2026-04-10",
    tags: ["seo", "shopify", "ecommerce"],
    relatedPaths: [
      { path: "/services/seo-optimization", label: { en: "SEO", de: "SEO" } },
      { path: "/services/shopify-development", label: { en: "Shopify", de: "Shopify" } },
      contact,
    ],
    en: {
      title: "E-commerce SEO on Shopify in 2026",
      description:
        "Indexable collections, unique product copy, and technical SEO — not stuffing 500 keywords on the homepage.",
      category: "SEO",
      content: `Shopify SEO fails on duplicate collections and thin product text. Fix information architecture, then speed, then content. [SEO](/services/seo-optimization) plus a sane [Shopify](/services/shopify-development) theme.

[Contact](/contact) with your shop URL. Do not buy “#1 guaranteed.”`,
    },
    de: {
      title: "E-Commerce-SEO auf Shopify 2026",
      description:
        "Indexierbare Collections, einzigartige Produkttexte, Technik — kein Keyword-Stuffing auf der Startseite.",
      category: "SEO",
      content: `Shopify-SEO scheitert an doppelten Collections und dünnen Produkttexten. Zuerst IA, dann Tempo, dann Content. [SEO](/services/seo-optimization) plus ein sauberes [Shopify](/services/shopify-development)-Theme.

[Kontakt](/contact) mit Shop-URL. Kein „Platz-1-Garantie“-Kauf.`,
    },
  },
  {
    slug: "website-wartung-wordpress",
    publishedAt: "2026-04-02",
    tags: ["wordpress", "maintenance", "security"],
    relatedPaths: [
      { path: "/services/wordpress-development", label: { en: "WordPress", de: "WordPress" } },
      contact,
      { path: "/services/seo-optimization", label: { en: "SEO", de: "SEO" } },
    ],
    en: {
      title: "WordPress maintenance that actually prevents downtime",
      description:
        "Updates, backups, plugins — a care plan after handover, not a mystery retainer.",
      category: "WordPress",
      content: `Handover without backups is unfinished. Care is updates, monitoring, and saying no to random plugins.

We build that into [WordPress development](/services/wordpress-development). Optional care after launch: [contact](/contact).`,
    },
    de: {
      title: "WordPress-Wartung, die Ausfälle wirklich verhindert",
      description:
        "Updates, Backups, Plugins — Betreuung nach der Übergabe, kein rätselhafter Retainer.",
      category: "WordPress",
      content: `Übergabe ohne Backups ist unfertig. Betreuung heißt Updates, Monitoring und Nein zu Zufalls-Plugins.

Das gehört zur [WordPress-Entwicklung](/services/wordpress-development). Optionale Betreuung: [Kontakt](/contact).`,
    },
  },
  {
    slug: "mehrsprachige-website-de-en",
    publishedAt: "2026-03-24",
    tags: ["i18n", "seo", "websites"],
    relatedPaths: [
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      { path: "/web-development", label: { en: "Web development", de: "Webentwicklung" } },
      contact,
    ],
    en: {
      title: "German + English websites without duplicate SEO pain",
      description:
        "hreflang, /de and /en, and why Google Translate as your localisation strategy fails B2B.",
      category: "Web",
      content: `One domain, two locales, unique copy. Do not auto-translate legal pages. Do not put Dortmund city pages on /en unless English speakers search that.

We ship this pattern on [custom web development](/services/custom-web-development). [Contact](/contact) if you already have a messy mix of subfolders and subdomains.`,
    },
    de: {
      title: "Deutsch + Englisch ohne SEO-Doppelungen",
      description:
        "hreflang, /de und /en, und warum Google Translate als Lokalisierung im B2B scheitert.",
      category: "Web",
      content: `Eine Domain, zwei Locales, eigener Text. Rechtstexte nicht auto-übersetzen. Dortmund-Seiten nicht auf /en, außer Englisch sucht das wirklich.

Muster in der [individuellen Webentwicklung](/services/custom-web-development). [Kontakt](/contact), wenn Unterordner und Subdomains schon Chaos sind.`,
    },
  },
  {
    slug: "seo-vs-performance-marketing",
    publishedAt: "2026-03-16",
    tags: ["seo", "ads", "growth"],
    relatedPaths: [
      { path: "/services/seo-optimization", label: { en: "SEO", de: "SEO" } },
      consult,
      contact,
    ],
    en: {
      title: "SEO vs paid ads for a new German agency site",
      description:
        "What to buy in month one vs month six — without pretending SEO is free or ads are a strategy.",
      category: "Growth",
      content: `SEO compounds. Ads rent attention. A new domain should not bet the company on “rank #1 next week.”

Fix the offer with the [consultant](/consultation), ship useful pages, then [SEO](/services/seo-optimization). Ads can test messages. [Contact](/contact) if you already burn budget on a weak landing page.`,
    },
    de: {
      title: "SEO vs Anzeigen für eine neue Agentur-Website",
      description:
        "Was Sie in Monat eins vs Monat sechs kaufen — ohne SEO als gratis oder Ads als Strategie zu verkaufen.",
      category: "Wachstum",
      content: `SEO zinseszinst. Ads mieten Aufmerksamkeit. Eine neue Domain sollte nicht auf „nächste Woche Platz 1“ wetten.

Angebot klären im [Berater](/consultation), nützliche Seiten, dann [SEO](/services/seo-optimization). Ads testen Botschaften. [Kontakt](/contact), wenn Budget auf einer schwachen Landing verbrennt.`,
    },
  },
  {
    slug: "logo-vs-markenidentitaet",
    publishedAt: "2026-03-08",
    tags: ["branding", "identity", "logo"],
    relatedPaths: [
      { path: "/brand-identity", label: { en: "Brand identity", de: "Markenidentität" } },
      { path: "/branding", label: { en: "Branding", de: "Branding" } },
      contact,
    ],
    en: {
      title: "Logo vs brand identity — stop buying a PNG",
      description:
        "What files a developer actually needs, and why a logo contest rarely survives a real website.",
      category: "Identity",
      content: `A logo file is not a system. Identity is tokens, type, colour, and usage that still work at 32px and on a landing page.

That is [brand identity](/brand-identity), inside [branding](/branding). [Contact](/contact) with what you already have: SVG or a JPEG in WhatsApp.`,
    },
    de: {
      title: "Logo vs Markenidentität — hören Sie auf, ein PNG zu kaufen",
      description:
        "Welche Dateien Entwicklung wirklich braucht, und warum ein Logo-Contest eine echte Website selten überlebt.",
      category: "Identität",
      content: `Eine Logo-Datei ist kein System. Identität sind Tokens, Schrift, Farbe und Regeln, die bei 32px und auf der Landing halten.

Das ist [Markenidentität](/brand-identity) in [Branding](/branding). [Kontakt](/contact) mit dem, was Sie haben: SVG oder ein JPEG in WhatsApp.`,
    },
  },
  {
    slug: "wordpress-zu-nextjs-umzug",
    publishedAt: "2026-02-28",
    tags: ["wordpress", "nextjs", "migration"],
    relatedPaths: [
      { path: "/services/custom-web-development", label: { en: "Custom web", de: "Custom Web" } },
      { path: "/services/wordpress-development", label: { en: "WordPress", de: "WordPress" } },
      contact,
    ],
    en: {
      title: "When to leave WordPress for Next.js",
      description:
        "Migration triggers: speed, security, or a product UI — not because Next.js is trendy on Twitter.",
      category: "Web",
      content: `Migrate when the theme cannot carry the product, when security updates are a monthly fire, or when locales and performance are first-class needs.

Otherwise, fix [WordPress](/services/wordpress-development). If you do migrate, [custom web](/services/custom-web-development) with a content plan so URLs 301. [Contact](/contact) with page count and plugins.`,
    },
    de: {
      title: "Wann Sie WordPress für Next.js verlassen",
      description:
        "Migrationsgründe: Tempo, Sicherheit oder Produkt-UI — nicht weil Next.js auf Twitter trendy ist.",
      category: "Web",
      content: `Wechseln, wenn das Theme das Produkt nicht trägt, Updates monatlich brennen, oder Locales und Performance erstklassig sein müssen.

Sonst [WordPress](/services/wordpress-development) reparieren. Bei Umzug: [Custom Web](/services/custom-web-development) mit URL-301-Plan. [Kontakt](/contact) mit Seitenzahl und Plugins.`,
    },
  },
];
