import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { getLocaleEditable, mergeDictionary } from "@/lib/content-store";

const dictionaries = {
  de: () => import("./dictionaries/de").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const [base, editable] = await Promise.all([
    dictionaries[locale](),
    getLocaleEditable(locale),
  ]);
  return mergeDictionary(base, editable);
}
