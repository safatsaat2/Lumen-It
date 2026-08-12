export const TEMPLATE_CATEGORIES = [
  "Restaurant",
  "Cafe",
  "Portfolio",
  "Events",
  "Media",
  "Creator",
  "Salon",
  "Spa",
  "Fitness",
  "Yoga",
  "Engineering",
  "Finance",
  "Interior",
  "Real Estate",
  "Golf",
  "Ecommerce",
  "Coworking",
  "AI",
  "Technology",
  "Sports",
  "Tennis",
  "Coaching",
  "Electrical",
  "Maintenance",
  "Landscape",
  "Home & Garden",
  "Education",
  "Courses",
  "SaaS",
  "Crypto",
  "Fashion",
  "Beauty",
  "Car Rental",
  "Logistics",
  "Transportation",
  "Lighting",
  "Eyewear",
  "Charity",
  "Nonprofit",
  "Furniture",
  "Marketing",
  "Agency",
  "Business",
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export type WebsiteTemplate = {
  id: string;
  name: string;
  slug: string;
  categories: string[];
  image: string;
  websiteUrl: string;
  featured: boolean;
};

export function imageFromUrl(websiteUrl: string): string {
  const normalized = websiteUrl.trim().replace(/\/$/, "");
  const withoutProtocol = normalized.replace(/^https?:\/\//, "");
  if (!withoutProtocol) return "";
  return `/https${withoutProtocol}.png`;
}

export function slugifyTemplateName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function nextTemplateId(list: WebsiteTemplate[]): string {
  const nums = list
    .map((item) => Number.parseInt(item.id.replace(/\D/g, ""), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `TPL-${String(next).padStart(3, "0")}`;
}

export function normalizeTemplate(
  raw: Partial<WebsiteTemplate>,
  fallbackId: string,
): WebsiteTemplate | null {
  const name = String(raw.name ?? "").trim();
  const websiteUrl = String(raw.websiteUrl ?? "").trim();
  if (!name || !websiteUrl) return null;

  const id = String(raw.id ?? fallbackId)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "");
  const slug =
    String(raw.slug ?? "").trim() || slugifyTemplateName(name) || fallbackId.toLowerCase();
  const categories = Array.isArray(raw.categories)
    ? raw.categories.map((c) => String(c).trim()).filter(Boolean)
    : [];
  const image =
    String(raw.image ?? "").trim() || imageFromUrl(websiteUrl) || "/logo.svg";

  return {
    id: id || fallbackId,
    name,
    slug,
    categories: categories.length ? categories : ["Business"],
    image,
    websiteUrl,
    featured: Boolean(raw.featured),
  };
}

export function normalizeTemplates(
  raw: Partial<WebsiteTemplate>[] | undefined | null,
): WebsiteTemplate[] {
  if (!Array.isArray(raw)) return structuredClone(defaultTemplates);
  const seen = new Set<string>();
  const normalized: WebsiteTemplate[] = [];

  raw.forEach((item, index) => {
    const fallbackId = `TPL-${String(index + 1).padStart(3, "0")}`;
    const templateItem = normalizeTemplate(item ?? {}, fallbackId);
    if (!templateItem) return;
    let id = templateItem.id;
    if (seen.has(id)) {
      id = nextTemplateId([...normalized, ...defaultTemplates]);
      let guard = 0;
      while (seen.has(id) && guard < 1000) {
        const n = Number.parseInt(id.replace(/\D/g, ""), 10) + 1;
        id = `TPL-${String(n).padStart(3, "0")}`;
        guard += 1;
      }
    }
    seen.add(id);
    normalized.push({ ...templateItem, id });
  });

  return normalized;
}

function template(
  id: string,
  name: string,
  slug: string,
  categories: TemplateCategory[],
  websiteUrl: string,
  featured = false,
): WebsiteTemplate {
  return {
    id,
    name,
    slug,
    categories,
    image: imageFromUrl(websiteUrl),
    websiteUrl,
    featured,
  };
}

/** Seed / fallback catalog used when site content has no templates yet. */
export const defaultTemplates: WebsiteTemplate[] = [
  template(
    "TPL-001",
    "Maison Lumière",
    "maison-lumiere",
    ["Restaurant"],
    "https://mihi-maison-lumiere-restaurant.vercel.app/",
    true,
  ),
  template(
    "TPL-002",
    "Luxury Fine Dining",
    "luxury-fine-dining",
    ["Restaurant"],
    "https://mihi-luxury-fine-dining.vercel.app/",
    true,
  ),
  template(
    "TPL-003",
    "Modern Minimal",
    "modern-minimal",
    ["Restaurant"],
    "https://mihi-modern-minimal.vercel.app/",
  ),
  template(
    "TPL-004",
    "Italian Family",
    "italian-family",
    ["Restaurant"],
    "https://mihi-italian-family.vercel.app/",
  ),
  template(
    "TPL-005",
    "Steakhouse",
    "steakhouse",
    ["Restaurant"],
    "https://mihi-steakhouse.vercel.app/",
  ),
  template(
    "TPL-006",
    "Mediterranean",
    "mediterranean",
    ["Restaurant"],
    "https://mihi-mediterranean.vercel.app/",
  ),
  template(
    "TPL-007",
    "Cafe Bakery",
    "cafe-bakery",
    ["Cafe", "Restaurant"],
    "https://mihi-cafe-bakery.vercel.app/",
    true,
  ),
  template(
    "TPL-008",
    "Fusion Contemporary",
    "fusion-contemporary",
    ["Restaurant"],
    "https://mihi-fusion-contemporary.vercel.app/",
  ),
  template(
    "TPL-009",
    "Macup",
    "macup",
    ["Cafe", "Restaurant"],
    "https://mihi-macup.vercel.app/",
  ),
  template(
    "TPL-010",
    "Impeccify",
    "impeccify",
    ["Restaurant"],
    "https://mihi-impeccify.vercel.app/",
  ),
  template(
    "TPL-011",
    "Purple Portfolio",
    "purple-portfolio",
    ["Portfolio"],
    "https://mihi-purple-portfolio.vercel.app/",
    true,
  ),
  template(
    "TPL-012",
    "Catrip",
    "catrip",
    ["Events"],
    "https://mihi-catrip.vercel.app/",
  ),
  template(
    "TPL-013",
    "Voice",
    "voice",
    ["Media", "Creator"],
    "https://mihi-voice.vercel.app/",
    true,
  ),
  template(
    "TPL-014",
    "Luxury Salon",
    "luxury-salon",
    ["Salon"],
    "https://mihi-luxury-salon.vercel.app/",
    true,
  ),
  template(
    "TPL-015",
    "Minimal Salon",
    "minimal-salon",
    ["Salon"],
    "https://mihi-minimal-salon.vercel.app/",
  ),
  template(
    "TPL-016",
    "Hair Studio",
    "hair-studio",
    ["Salon"],
    "https://mihi-hair-studio.vercel.app/",
  ),
  template(
    "TPL-017",
    "Spa",
    "spa",
    ["Salon", "Spa"],
    "https://mihi-spa.vercel.app/",
    true,
  ),
  template(
    "TPL-018",
    "Grooming",
    "grooming",
    ["Salon"],
    "https://mihi-grooming.vercel.app/",
  ),
  template(
    "TPL-019",
    "Korean Salon",
    "korean-salon",
    ["Salon"],
    "https://mihi-korean-salon.vercel.app/",
  ),
  template(
    "TPL-020",
    "Beauty Bar",
    "beauty-bar",
    ["Salon"],
    "https://mihi-beauty-bar.vercel.app/",
  ),
  template(
    "TPL-021",
    "Fashion Salon",
    "fashion-salon",
    ["Salon"],
    "https://mihi-fashion-salon.vercel.app/",
  ),
  template(
    "TPL-022",
    "YogaBN",
    "yogabn",
    ["Fitness", "Yoga"],
    "https://mihi-yogabn.vercel.app/",
    true,
  ),
  template(
    "TPL-023",
    "Steevip",
    "steevip",
    ["Engineering"],
    "https://mihi-steevip.vercel.app/",
  ),
  template(
    "TPL-024",
    "Monetix",
    "monetix",
    ["Finance"],
    "https://mihi-monetix.vercel.app/",
    true,
  ),
  template(
    "TPL-025",
    "Exterior",
    "exterior",
    ["Interior"],
    "https://mihi-exterior.vercel.app/",
  ),
  template(
    "TPL-026",
    "Estafb",
    "estafb",
    ["Real Estate"],
    "https://mihi-estafb.vercel.app/",
    true,
  ),
  template(
    "TPL-027",
    "Golf Kit",
    "golf-kit",
    ["Golf", "Ecommerce"],
    "https://mihi-golf-kit.vercel.app/",
  ),
  template(
    "TPL-028",
    "WorkVLP",
    "workvlp",
    ["Business", "Coworking"],
    "https://mihi-workvlp.vercel.app/",
  ),
  template(
    "TPL-029",
    "AI Shop",
    "ai-shop",
    ["AI", "Ecommerce"],
    "https://mihi-ai-shop.vercel.app/",
  ),
  template(
    "TPL-030",
    "Sporen",
    "sporen",
    ["Tennis", "Coaching", "Sports"],
    "https://mihi-sporen.vercel.app/",
  ),
  template(
    "TPL-031",
    "VoltEdge",
    "voltedge",
    ["Electrical", "Engineering", "Maintenance"],
    "https://mihi-voltedge.vercel.app/",
  ),
  template(
    "TPL-032",
    "Verde",
    "verde",
    ["Landscape", "Home & Garden", "Business"],
    "https://mihi-verde.vercel.app/",
  ),
  template(
    "TPL-033",
    "Eduvo",
    "eduvo",
    ["Education", "Courses"],
    "https://mihi-eduvo.vercel.app/",
    true,
  ),
  template(
    "TPL-034",
    "Cuoio",
    "cuoio",
    ["Education", "Ecommerce", "Coaching", "Courses"],
    "https://mihi-cuoio.vercel.app/",
  ),
  template(
    "TPL-035",
    "Tezmiy",
    "tezmiy",
    ["SaaS", "Technology", "Business"],
    "https://mihi-tezmiy.vercel.app/",
  ),
  template(
    "TPL-036",
    "Vixcz",
    "vixcz",
    ["AI", "SaaS"],
    "https://mihi-vixcz.vercel.app/",
  ),
  template(
    "TPL-037",
    "Coivt",
    "coivt",
    ["SaaS", "Crypto", "Finance"],
    "https://mihi-coivt.vercel.app/",
  ),
  template(
    "TPL-038",
    "Habx",
    "habx",
    ["Real Estate", "Ecommerce"],
    "https://mihi-habx.vercel.app/",
  ),
  template(
    "TPL-039",
    "Styleo",
    "styleo",
    ["Fashion", "Ecommerce"],
    "https://mihi-styleo.vercel.app/",
    true,
  ),
  template(
    "TPL-040",
    "Vitara",
    "vitara",
    ["Beauty", "Ecommerce"],
    "https://mihi-vitara.vercel.app/",
  ),
  template(
    "TPL-041",
    "Rank Ryz",
    "rank-ryz",
    ["SaaS", "Technology"],
    "https://mihi-rank-ryz.vercel.app/",
  ),
  template(
    "TPL-042",
    "Revivy",
    "revivy",
    ["Beauty", "Ecommerce"],
    "https://mihi-revivy.vercel.app/",
  ),
  template(
    "TPL-043",
    "CBRLP",
    "cbrlp",
    ["Car Rental"],
    "https://mihi-cbrlp.vercel.app/",
  ),
  template(
    "TPL-044",
    "Journey",
    "journey",
    ["Logistics", "Transportation", "Business"],
    "https://mihi-journey.vercel.app/",
  ),
  template(
    "TPL-045",
    "Lamply",
    "lamply",
    ["Lighting", "Interior", "Ecommerce"],
    "https://mihi-lamply.vercel.app/",
  ),
  template(
    "TPL-046",
    "Eyelpx",
    "eyelpx",
    ["Eyewear", "Fashion", "Ecommerce"],
    "https://mihi-eyelpx.vercel.app/",
  ),
  template(
    "TPL-047",
    "CharityLP",
    "charitylp",
    ["Charity", "Nonprofit"],
    "https://mihi-charitylp.vercel.app/",
  ),
  template(
    "TPL-048",
    "CSPV",
    "cspv",
    ["Furniture", "Interior", "Ecommerce", "Home & Garden"],
    "https://cslpv.vercel.app/",
  ),
  template(
    "TPL-049",
    "Nestify",
    "nestify",
    ["Real Estate"],
    "https://mihi-nestify.vercel.app/",
  ),
  template(
    "TPL-050",
    "IT-X",
    "it-x",
    ["Marketing", "Business", "Agency"],
    "https://it-x.vercel.app/",
  ),
];

/** @deprecated Prefer reading templates from site content; kept as seed alias. */
export const templates = defaultTemplates;

export function getFeaturedTemplates(
  list: WebsiteTemplate[] = defaultTemplates,
): WebsiteTemplate[] {
  return list.filter((t) => t.featured);
}

export function getTemplateById(
  id: string,
  list: WebsiteTemplate[] = defaultTemplates,
): WebsiteTemplate | undefined {
  const normalized = id.trim().toUpperCase();
  return list.find((t) => t.id === normalized);
}

export function getAllCategories(
  list: WebsiteTemplate[] = defaultTemplates,
): string[] {
  const set = new Set<string>();
  for (const t of list) {
    for (const c of t.categories) set.add(c);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterTemplatesByCategory(
  category: string | "all",
  list: WebsiteTemplate[] = defaultTemplates,
): WebsiteTemplate[] {
  if (category === "all") return list;
  return list.filter((t) => t.categories.includes(category));
}
