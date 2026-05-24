export type Client = {
  name: string;
  logo: string;
};

/**
 * Inline SVG logos kept here so the marquee renders instantly without
 * additional network calls. Each logo is themable via currentColor.
 */
export const clients: Client[] = [
  { name: "Northwind Pay", logo: "northwind" },
  { name: "Lumen Cloud", logo: "lumencloud" },
  { name: "Harvest AI", logo: "harvest" },
  { name: "Atlas Mobility", logo: "atlas" },
  { name: "Moonlit", logo: "moonlit" },
  { name: "Kindred Foundation", logo: "kindred" },
  { name: "Helio Labs", logo: "helio" },
  { name: "Orbit", logo: "orbit" },
  { name: "Cascade", logo: "cascade" },
  { name: "Vanta Studio", logo: "vanta" },
];
