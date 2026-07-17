import { unstable_noStore as noStore } from "next/cache";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { getLocaleEditable, mergeDictionary } from "@/lib/content-store";

const dictionaries = {
  de: () => import("./dictionaries/de").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Always read latest admin-managed content (Blob / JSON), never serve a stale cache.
  noStore();
  const [base, editable] = await Promise.all([
    dictionaries[locale](),
    getLocaleEditable(locale),
  ]);
  return mergeDictionary(base, editable);
}
