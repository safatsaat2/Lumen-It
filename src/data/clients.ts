import type { Locale } from "@/i18n/config";

export type Client = {
  name: string;
  nameDe: string;
  logo: string;
};

/**
 * Trust/commitment chips for the marquee — not named client logos.
 * Replace with real clients only after written permission.
 */
export const clients: Client[] = [
  {
    name: "24/7 availability mindset",
    nameDe: "24/7-Erreichbarkeit",
    logo: "default",
  },
  { name: "Always reachable", nameDe: "Immer erreichbar", logo: "default" },
  {
    name: "Clear fixed-scope quotes",
    nameDe: "Klare Festpreisangebote",
    logo: "default",
  },
  {
    name: "GDPR-aware by default",
    nameDe: "DSGVO-bewusst von Anfang an",
    logo: "default",
  },
  {
    name: "Lighthouse 90+ target",
    nameDe: "Lighthouse-Ziel 90+",
    logo: "default",
  },
  {
    name: "Reply within 24h",
    nameDe: "Antwort innerhalb von 24h",
    logo: "default",
  },
  {
    name: "Full handover documentation",
    nameDe: "Vollständige Übergabe-Dokumentation",
    logo: "default",
  },
  {
    name: "Transparent project pricing",
    nameDe: "Transparente Projektpreise",
    logo: "default",
  },
];

export function clientDisplayName(client: Client, locale: Locale): string {
  if (locale === "de") {
    return client.nameDe?.trim() || client.name;
  }
  return client.name;
}
