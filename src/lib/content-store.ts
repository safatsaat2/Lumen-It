import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";

import { siteConfig } from "@/config/site";
import {
  defaultConsultationConfig,
  normalizeConsultationConfig,
} from "@/lib/consultation/defaults";
import type { ConsultationConfig } from "@/lib/consultation/types";
import { clients as defaultClients, type Client } from "@/data/clients";
import { services as defaultServices, type ServiceContent } from "@/data/services";
import {
  defaultTemplates,
  normalizeTemplates,
  type WebsiteTemplate,
} from "@/data/templates";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { isVercelBlobEnabled } from "@/lib/use-vercel-blob";

export type SocialLinks = {
  facebook: string;
  instagram: string;
  twitter: string;
  github: string;
  linkedin: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  founded: number;
};

export type LegalPage = {
  title: string;
  description: string;
  body: string[];
};

export type LegalBundle = {
  privacy: LegalPage;
  terms: LegalPage;
  cookies: LegalPage;
  impressum: LegalPage;
};

export type SiteContent = {
  de: Dictionary;
  en: Dictionary;
  services: ServiceContent[];
  social: SocialLinks;
  settings: SiteSettings;
  clients: Client[];
  templates: WebsiteTemplate[];
  legal: {
    de: LegalBundle;
    en: LegalBundle;
  };
  /**
   * AI consultation configuration (journeys, AI settings, offer banner).
   * Never contains API keys — those live in the private encrypted store.
   */
  consultation: ConsultationConfig;
};

/** @deprecated kept for migrating older admin payloads */
export type EditableLocaleContent = {
  hero?: Dictionary["hero"];
  about?: Dictionary["about"];
  work?: Dictionary["work"];
  process?: Dictionary["process"];
  pricing?: Dictionary["pricing"];
  testimonials?: Dictionary["testimonials"];
  faq?: Dictionary["faq"];
  projects?: Dictionary["projects"];
  contactIntro?: {
    badge: string;
    title: string;
    description: string;
  };
  meta?: Dictionary["meta"];
  nav?: Dictionary["nav"];
  language?: Dictionary["language"];
  clients?: Dictionary["clients"];
  services?: Dictionary["services"];
  contact?: Dictionary["contact"];
  footer?: Dictionary["footer"];
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site-content.json");
const BLOB_PATHNAME = "mihis-site-content.json";

function isVercel() {
  return process.env.VERCEL === "1";
}

function hasBlobToken() {
  // Blob is off until USE_VERCEL_BLOB is set true in src/lib/use-vercel-blob.ts
  return isVercelBlobEnabled();
}

function hasGitHubConfig() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function defaultSocial(): SocialLinks {
  return {
    facebook: siteConfig.social.facebook,
    instagram: siteConfig.social.instagram,
    twitter: siteConfig.social.twitter,
    github: siteConfig.social.github,
    linkedin: siteConfig.social.linkedin,
  };
}

function defaultSettings(): SiteSettings {
  return {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    email: siteConfig.email,
    phone: siteConfig.phone,
    address: siteConfig.address,
    founded: siteConfig.founded,
  };
}

function defaultLegal(): SiteContent["legal"] {
  return {
    de: {
      privacy: {
        title: "Datenschutzerklärung",
        description:
          "Informationen zur Verarbeitung personenbezogener Daten bei MIHI's.",
        body: [
          "Wir verarbeiten personenbezogene Daten ausschließlich zur Bearbeitung Ihrer Anfragen und zur Bereitstellung dieser Website.",
          "Kontaktformular-Daten (Name, E-Mail, optional Telefon, Betreff, Nachricht) werden an uns übermittelt, um Ihre Anfrage zu beantworten, und nicht an Dritte verkauft.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO. Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen.",
          `Kontakt: ${siteConfig.email}`,
        ],
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        description: "Rahmenbedingungen für die Zusammenarbeit mit MIHI's.",
        body: [
          "Leistungen werden individuell angeboten und schriftlich bestätigt.",
          "Preise verstehen sich zuzüglich gesetzlicher Umsatzsteuer, sofern nicht anders vereinbart.",
          "Geistiges Eigentum an gelieferten Arbeiten geht nach vollständiger Zahlung gemäß Projektvereinbarung über.",
          "Es gilt das Recht der Bundesrepublik Deutschland.",
        ],
      },
      cookies: {
        title: "Cookie-Hinweis",
        description: "Informationen zu Cookies und ähnlichen Technologien.",
        body: [
          "Diese Website setzt technisch notwendige Cookies bzw. lokale Speicherung für Theme- und Spracheinstellungen ein.",
          "Es werden keine Tracking-Cookies von Drittanbietern ohne Ihre Einwilligung gesetzt.",
          "Sie können Cookies in Ihren Browsereinstellungen jederzeit löschen oder blockieren.",
        ],
      },
      impressum: {
        title: "Impressum",
        description: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
        body: [
          "MIHI's",
          "Inhaber: [Vollständiger Name]",
          "Anschrift: Berlin, Deutschland — [Straße, PLZ Ort]",
          `E-Mail: ${siteConfig.email}`,
          "Umsatzsteuer-ID: [falls vorhanden, sonst weglassen]",
          "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: [Vollständiger Name], Berlin.",
          "Hinweis: Bitte ersetzen Sie die Platzhalter in eckigen Klammern durch Ihre echten Angaben, bevor die Website kommerziell live geht.",
        ],
      },
    },
    en: {
      privacy: {
        title: "Privacy Policy",
        description: "How MIHI's processes personal data.",
        body: [
          "We process personal data only to handle your inquiries and to operate this website.",
          "Contact form data (name, email, optional phone, subject, message) is sent to us so we can reply and is not sold to third parties.",
          "Legal bases include Art. 6(1)(b) and (f) GDPR. You may request access, correction, or deletion of your data.",
          `Contact: ${siteConfig.email}`,
        ],
      },
      terms: {
        title: "Terms of Service",
        description: "Framework terms for working with MIHI's.",
        body: [
          "Services are scoped individually and confirmed in writing.",
          "Prices are exclusive of statutory VAT unless otherwise agreed.",
          "Intellectual property in delivered work transfers after full payment as defined in the project agreement.",
          "The laws of the Federal Republic of Germany apply.",
        ],
      },
      cookies: {
        title: "Cookie Notice",
        description: "Information about cookies and similar technologies.",
        body: [
          "This site uses technically necessary cookies or local storage for theme and language preferences.",
          "No third-party tracking cookies are set without your consent.",
          "You can delete or block cookies in your browser settings at any time.",
        ],
      },
      impressum: {
        title: "Legal notice (Impressum)",
        description: "Information required under German Digital Services Act (DDG).",
        body: [
          "MIHI's",
          "Owner: [Full legal name]",
          "Address: Berlin, Germany — [Street, postcode, city]",
          `Email: ${siteConfig.email}`,
          "VAT ID: [if applicable]",
          "Responsible for content (MStV § 18(2)): [Full legal name], Berlin.",
          "Note: Replace the bracketed placeholders with your real details before taking commercial clients.",
        ],
      },
    },
  };
}

function isFullDictionary(value: unknown): value is Dictionary {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const contact = v.contact as Record<string, unknown> | undefined;
  return Boolean(
    v.meta &&
      v.nav &&
      v.hero &&
      v.about &&
      v.services &&
      v.contact &&
      contact &&
      typeof contact.submit === "string",
  );
}

/** Merge legacy admin payloads into a full dictionary. */
export function mergeDictionary(
  base: Dictionary,
  editable: EditableLocaleContent | Dictionary,
): Dictionary {
  const merged = isFullDictionary(editable)
    ? {
        ...base,
        ...editable,
        meta: { ...base.meta, ...editable.meta },
        nav: { ...base.nav, ...editable.nav },
        language: { ...base.language, ...editable.language },
        hero: { ...base.hero, ...editable.hero },
        clients: { ...base.clients, ...editable.clients },
        about: { ...base.about, ...editable.about },
        services: { ...base.services, ...editable.services },
        work: { ...base.work, ...editable.work },
        process: { ...base.process, ...editable.process },
        pricing: { ...base.pricing, ...editable.pricing },
        testimonials: { ...base.testimonials, ...editable.testimonials },
        faq: { ...base.faq, ...editable.faq },
        contact: { ...base.contact, ...editable.contact },
        footer: { ...base.footer, ...editable.footer },
        templates: {
          ...base.templates,
          ...((editable as Dictionary).templates ?? {}),
        },
        consultationPromo: {
          ...base.consultationPromo,
          ...((editable as Dictionary).consultationPromo ?? {}),
        },
        projects: editable.projects ?? base.projects,
      }
    : (() => {
        const legacy = editable as EditableLocaleContent;
        return {
          ...base,
          hero: legacy.hero ?? base.hero,
          about: legacy.about ?? base.about,
          work: legacy.work ?? base.work,
          process: legacy.process ?? base.process,
          pricing: legacy.pricing ?? base.pricing,
          testimonials: legacy.testimonials ?? base.testimonials,
          faq: legacy.faq ?? base.faq,
          projects: legacy.projects ?? base.projects,
          meta: legacy.meta ? { ...base.meta, ...legacy.meta } : base.meta,
          nav: legacy.nav ? { ...base.nav, ...legacy.nav } : base.nav,
          language: legacy.language
            ? { ...base.language, ...legacy.language }
            : base.language,
          clients: legacy.clients
            ? { ...base.clients, ...legacy.clients }
            : base.clients,
          services: legacy.services
            ? { ...base.services, ...legacy.services }
            : base.services,
          footer: legacy.footer
            ? { ...base.footer, ...legacy.footer }
            : base.footer,
          contact: {
            ...base.contact,
            ...(legacy.contact ?? {}),
            ...(legacy.contactIntro ?? {}),
          },
        };
      })();

  return scrubFabricatedClaims(base, merged);
}

/**
 * One-time safety net: if stored admin/Blob content still contains known
 * fabricated UWG-risk claims, fall back to the honest dictionary defaults
 * for those sections only.
 */
function scrubFabricatedClaims(base: Dictionary, merged: Dictionary): Dictionary {
  const statsBlob = JSON.stringify(merged.about.stats);
  const timelineBlob = JSON.stringify(merged.about.timeline);
  const projectsBlob = JSON.stringify(merged.projects);
  const testimonialsBlob = JSON.stringify(merged.testimonials.items);
  const pricingBlob = JSON.stringify(merged.pricing.tiers);
  const heroTrust = merged.hero.trust;

  const hasFakeStats =
    statsBlob.includes("120+") ||
    /"15"/.test(statsBlob) && statsBlob.includes("Service");
  const hasFakeTimeline =
    timelineBlob.includes("2020") &&
    (timelineBlob.includes("founded") || timelineBlob.includes("gegründet"));
  const hasFakeProjects =
    projectsBlob.includes("Nordwerk") ||
    projectsBlob.includes("Atelier Berg") ||
    projectsBlob.includes("Helixa") ||
    projectsBlob.includes("+31");
  const hasFakeTestimonials =
    testimonialsBlob.includes("Laura Hoffmann") ||
    testimonialsBlob.includes("Jonas Berger") ||
    testimonialsBlob.includes("Elena Krüger") ||
    testimonialsBlob.includes("Nordwerk GmbH");
  const hasSquadPricing =
    pricingBlob.toLowerCase().includes("squad") ||
    pricingBlob.includes("11990");
  const hasFakeTrust =
    heroTrust.includes("DACH") ||
    heroTrust.includes("Trusted by teams") ||
    heroTrust.includes("Vertraut von");

  return {
    ...merged,
    hero: hasFakeTrust ? { ...merged.hero, trust: base.hero.trust } : merged.hero,
    about: {
      ...merged.about,
      stats: hasFakeStats ? base.about.stats : merged.about.stats,
      timeline: hasFakeTimeline ? base.about.timeline : merged.about.timeline,
      storyTitle:
        hasFakeTimeline &&
        (merged.about.storyTitle === "Our story" ||
          merged.about.storyTitle === "Unsere Geschichte")
          ? base.about.storyTitle
          : merged.about.storyTitle,
      storyP1: hasFakeTimeline ? base.about.storyP1 : merged.about.storyP1,
      storyP2: hasFakeTimeline ? base.about.storyP2 : merged.about.storyP2,
    },
    work: hasFakeProjects ? base.work : merged.work,
    projects: hasFakeProjects ? base.projects : merged.projects,
    testimonials: hasFakeTestimonials ? base.testimonials : merged.testimonials,
    pricing: hasSquadPricing ? base.pricing : merged.pricing,
    footer: { ...base.footer, ...merged.footer, impressum: merged.footer.impressum || base.footer.impressum },
  };
}

async function loadBaseDictionaries() {
  const [{ default: de }, { default: en }] = await Promise.all([
    import("@/i18n/dictionaries/de"),
    import("@/i18n/dictionaries/en"),
  ]);
  return { de, en };
}

async function buildDefaults(): Promise<SiteContent> {
  const { de, en } = await loadBaseDictionaries();
  return {
    de: structuredClone(de),
    en: structuredClone(en),
    services: structuredClone(defaultServices),
    social: defaultSocial(),
    settings: defaultSettings(),
    clients: structuredClone(defaultClients),
    templates: structuredClone(defaultTemplates),
    legal: defaultLegal(),
    consultation: defaultConsultationConfig(),
  };
}

function normalizeClients(
  raw: Client[] | undefined,
  defaults: Client[],
): Client[] {
  const usable =
    Array.isArray(raw) &&
    raw.length > 0 &&
    !raw.some((client) =>
      /Northwind|Lumen Cloud|Harvest AI|Atlas Mobility|Moonlit|Kindred|Helio Labs|Vanta Studio/i.test(
        client.name,
      ),
    )
      ? raw
      : defaults;

  const deByEnName = new Map(defaults.map((client) => [client.name, client.nameDe]));

  return usable.map((client) => ({
    name: client.name,
    logo: client.logo,
    nameDe: client.nameDe?.trim() || deByEnName.get(client.name) || client.name,
  }));
}

export async function normalizeSiteContent(
  raw: Partial<SiteContent>,
): Promise<SiteContent> {
  const { de: baseDe, en: baseEn } = await loadBaseDictionaries();
  const defaults = {
    services: structuredClone(defaultServices),
    social: defaultSocial(),
    settings: defaultSettings(),
    clients: structuredClone(defaultClients),
    templates: structuredClone(defaultTemplates),
    legal: defaultLegal(),
  };

  return {
    de: mergeDictionary(baseDe, (raw.de as EditableLocaleContent) ?? {}),
    en: mergeDictionary(baseEn, (raw.en as EditableLocaleContent) ?? {}),
    services:
      Array.isArray(raw.services) &&
      raw.services.length > 0 &&
      raw.services.length <= 8
        ? raw.services
        : defaults.services,
    social: { ...defaults.social, ...(raw.social ?? {}) },
    settings: {
      ...defaults.settings,
      ...(raw.settings ?? {}),
      email:
        raw.settings?.email && !/gmail\.com$/i.test(raw.settings.email)
          ? raw.settings.email
          : defaults.settings.email,
      phone:
        raw.settings?.phone === "+49 30 12345678"
          ? defaults.settings.phone
          : (raw.settings?.phone ?? defaults.settings.phone),
      founded:
        raw.settings?.founded === 2020
          ? defaults.settings.founded
          : (raw.settings?.founded ?? defaults.settings.founded),
    },
    clients: normalizeClients(raw.clients, defaults.clients),
    templates: Array.isArray(raw.templates)
      ? normalizeTemplates(raw.templates)
      : defaults.templates,
    legal: {
      de: {
        ...defaults.legal.de,
        ...(raw.legal?.de ?? {}),
        privacy: {
          ...defaults.legal.de.privacy,
          ...(raw.legal?.de?.privacy ?? {}),
        },
        terms: {
          ...defaults.legal.de.terms,
          ...(raw.legal?.de?.terms ?? {}),
        },
        cookies: {
          ...defaults.legal.de.cookies,
          ...(raw.legal?.de?.cookies ?? {}),
        },
        impressum: {
          ...defaults.legal.de.impressum,
          ...(raw.legal?.de?.impressum ?? {}),
        },
      },
      en: {
        ...defaults.legal.en,
        ...(raw.legal?.en ?? {}),
        privacy: {
          ...defaults.legal.en.privacy,
          ...(raw.legal?.en?.privacy ?? {}),
        },
        terms: {
          ...defaults.legal.en.terms,
          ...(raw.legal?.en?.terms ?? {}),
        },
        cookies: {
          ...defaults.legal.en.cookies,
          ...(raw.legal?.en?.cookies ?? {}),
        },
        impressum: {
          ...defaults.legal.en.impressum,
          ...(raw.legal?.en?.impressum ?? {}),
        },
      },
    },
    consultation: normalizeConsultationConfig(raw.consultation),
  };
}

async function readFromFs(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return normalizeSiteContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeToFs(content: SiteContent): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

async function readFromBlob(): Promise<SiteContent | null> {
  if (!hasBlobToken()) return null;
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const text = await new Response(result.stream).text();
    if (!text) return null;
    return normalizeSiteContent(JSON.parse(text) as Partial<SiteContent>);
  } catch (error) {
    console.error("[content-store] blob read failed:", error);
    return null;
  }
}

async function writeToBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    storeId: process.env.BLOB_STORE_ID,
  });
}

async function readFromGitHub(): Promise<SiteContent | null> {
  if (!hasGitHubConfig()) return null;
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/content/site-content.json?ref=${branch}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: string };
    if (!data.content) return null;
    const decoded = Buffer.from(data.content, "base64").toString("utf8");
    return normalizeSiteContent(JSON.parse(decoded) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeToGitHub(content: SiteContent): Promise<void> {
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/content/site-content.json`;
  const encoded = Buffer.from(JSON.stringify(content, null, 2), "utf8").toString(
    "base64",
  );

  let sha: string | undefined;
  const current = await fetch(`${apiUrl}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (current.ok) {
    const data = (await current.json()) as { sha?: string };
    sha = data.sha;
  }

  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: "chore: update site content from admin dashboard",
      content: encoded,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub content update failed (${res.status}): ${text}`);
  }
}

function storageHint() {
  return (
    "Vercel cannot write local JSON files. Add BLOB_READ_WRITE_TOKEN " +
    "(Vercel Blob) or GITHUB_TOKEN + GITHUB_REPO to enable saving in production."
  );
}

export async function readSiteContent(): Promise<SiteContent> {
  if (hasBlobToken()) {
    const fromBlob = await readFromBlob();
    if (fromBlob) return fromBlob;
  }

  if (hasGitHubConfig()) {
    const fromGitHub = await readFromGitHub();
    if (fromGitHub) return fromGitHub;
  }

  const fromFs = await readFromFs();
  if (fromFs) return fromFs;

  const defaults = await buildDefaults();
  if (!isVercel()) {
    try {
      await writeToFs(defaults);
    } catch {
      // ignore
    }
  }
  return defaults;
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  const normalized = await normalizeSiteContent(content);

  if (hasBlobToken()) {
    await writeToBlob(normalized);
    if (!isVercel()) {
      try {
        await writeToFs(normalized);
      } catch {
        // ignore
      }
    }
    return;
  }

  if (hasGitHubConfig()) {
    await writeToGitHub(normalized);
    if (!isVercel()) {
      try {
        await writeToFs(normalized);
      } catch {
        // ignore
      }
    }
    return;
  }

  if (isVercel()) {
    throw new Error(storageHint());
  }

  await writeToFs(normalized);
}

export async function getLocaleEditable(locale: Locale): Promise<Dictionary> {
  const content = await readSiteContent();
  return content[locale];
}

export async function getEditableServices(): Promise<ServiceContent[]> {
  const content = await readSiteContent();
  return content.services;
}

export async function getSocialLinks(): Promise<SocialLinks> {
  const content = await readSiteContent();
  return content.social;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const content = await readSiteContent();
  return content.settings;
}

export async function getConsultationConfig(): Promise<ConsultationConfig> {
  const content = await readSiteContent();
  return content.consultation;
}
