import { unstable_noStore as noStore } from "next/cache";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { readSiteContent } from "@/lib/content-store";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  noStore();
  const content = await readSiteContent();
  return content[locale];
}
