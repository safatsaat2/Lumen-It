import { promises as fs } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";

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
const BLOB_PATHNAME = "mihis-site-content.json";

function isVercel() {
  return process.env.VERCEL === "1";
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function hasGitHubConfig() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

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

async function readFromFs(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
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
    const meta = await head(BLOB_PATHNAME, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    return null;
  }
}

async function writeToBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
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
    const data = (await res.json()) as { content?: string; encoding?: string };
    if (!data.content) return null;
    const decoded = Buffer.from(data.content, "base64").toString("utf8");
    return JSON.parse(decoded) as SiteContent;
  } catch {
    return null;
  }
}

async function writeToGitHub(content: SiteContent): Promise<void> {
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/content/site-content.json`;
  const body = JSON.stringify(content, null, 2);
  const encoded = Buffer.from(body, "utf8").toString("base64");

  // Fetch current SHA (required for updates)
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
  // Prefer remote sources on Vercel so dashboard edits are live
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

  // Seed local file only when the filesystem is writable (local/dev)
  if (!isVercel()) {
    try {
      await writeToFs(defaults);
    } catch {
      // ignore seed failures
    }
  }

  return defaults;
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  if (hasBlobToken()) {
    await writeToBlob(content);
    // Best-effort local mirror for development checkouts
    if (!isVercel()) {
      try {
        await writeToFs(content);
      } catch {
        // ignore
      }
    }
    return;
  }

  if (hasGitHubConfig()) {
    await writeToGitHub(content);
    if (!isVercel()) {
      try {
        await writeToFs(content);
      } catch {
        // ignore
      }
    }
    return;
  }

  if (isVercel()) {
    throw new Error(storageHint());
  }

  await writeToFs(content);
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
