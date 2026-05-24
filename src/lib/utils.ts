import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with conditional logic and intelligently
 * merge conflicting Tailwind utilities (e.g. `p-2` overrides `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pretty number formatter (e.g. 1234 -> "1.2K"). */
export function formatNumber(num: number, fractionDigits = 0) {
  if (num >= 1_000_000)
    return `${(num / 1_000_000).toFixed(fractionDigits)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(fractionDigits)}K`;
  return num.toString();
}

/** Convert string to URL-friendly slug. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Estimate reading time in minutes (~200 wpm). */
export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Format ISO date to "Jan 1, 2026". */
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

/** Get absolute URL from a relative path, using NEXT_PUBLIC_SITE_URL. */
export function absoluteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://lumen.agency";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
