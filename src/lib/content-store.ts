import { promises as fs } from "fs";
import path from "path";

import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";

export type EditableLocaleContent = {
  hero: Dictionary["hero"];
  about: Dictionary["about"];
  work: Dictionary["work"];
  process: Dictionary["process"];
  pricing: Dictionary["pricing"];
  testimonials: Dictionary["testimonials"];
  faq: Dictionary["faq"];
  projects: Dictionary["projects"];
  contactIntro: {
    badge: string;
    title: string;
    description: string;
  };
};

export type SiteContent = {
  de: EditableLocaleContent;
  en: EditableLocaleContent;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site-content.json");

function pickEditable(dict: Dictionary): EditableLocaleContent {
  return {
    hero: dict.hero,
    about: dict.about,
    work: dict.work,
    process: dict.process,
    pricing: dict.pricing,
    testimonials: dict.testimonials,
    faq: dict.faq,
    projects: dict.projects,
    contactIntro: {
      badge: dict.contact.badge,
      title: dict.contact.title,
      description: dict.contact.description,
    },
  };
}

async function buildDefaults(): Promise<SiteContent> {
  const [{ default: de }, { default: en }] = await Promise.all([
    import("@/i18n/dictionaries/de"),
    import("@/i18n/dictionaries/en"),
  ]);
  return {
    de: pickEditable(de),
    en: pickEditable(en),
  };
}

export async function ensureContentFile(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    const defaults = await buildDefaults();
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.writeFile(CONTENT_FILE, JSON.stringify(defaults, null, 2), "utf8");
    return defaults;
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  return ensureContentFile();
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function getLocaleEditable(
  locale: Locale,
): Promise<EditableLocaleContent> {
  const content = await readSiteContent();
  return content[locale];
}

export function mergeDictionary(
  base: Dictionary,
  editable: EditableLocaleContent,
): Dictionary {
  return {
    ...base,
    hero: editable.hero,
    about: editable.about,
    work: editable.work,
    process: editable.process,
    pricing: editable.pricing,
    testimonials: editable.testimonials,
    faq: editable.faq,
    projects: editable.projects,
    contact: {
      ...base.contact,
      badge: editable.contactIntro.badge,
      title: editable.contactIntro.title,
      description: editable.contactIntro.description,
    },
  };
}
