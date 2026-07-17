import {
  Blocks,
  Brush,
  Code2,
  FileCode2,
  Gauge,
  Headphones,
  LayoutTemplate,
  Link2,
  Palette,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICON_NAMES = [
  "Code2",
  "FileCode2",
  "ShoppingBag",
  "ShoppingCart",
  "Brush",
  "Search",
  "Wrench",
  "Gauge",
  "Link2",
  "Sparkles",
  "Workflow",
  "Blocks",
  "LayoutTemplate",
  "Palette",
  "Headphones",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

export const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  Code2,
  FileCode2,
  ShoppingBag,
  ShoppingCart,
  Brush,
  Search,
  Wrench,
  Gauge,
  Link2,
  Sparkles,
  Workflow,
  Blocks,
  LayoutTemplate,
  Palette,
  Headphones,
};

export function resolveServiceIcon(name: string): LucideIcon {
  if (name in serviceIcons) {
    return serviceIcons[name as ServiceIconName];
  }
  return Code2;
}
