import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ClientLogoProps = {
  id: string;
  className?: string;
};

/** Theme-aware monogram marks — use currentColor so light/dark mode both work. */
export function ClientLogo({ id, className }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("h-7 w-7 shrink-0 text-muted-foreground", className)}
      fill="currentColor"
    >
      {logoPaths[id] ?? logoPaths.default}
    </svg>
  );
}

const logoPaths: Record<string, ReactNode> = {
  default: (
    <circle cx="16" cy="16" r="10" opacity="0.35" />
  ),
  northwind: (
    <>
      <path d="M8 22V10l8 6 8-6v12h-4V16l-4 3-4-3v6H8z" />
    </>
  ),
  lumencloud: (
  <>
      <circle cx="16" cy="16" r="9" opacity="0.25" />
      <path d="M16 7a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
    </>
  ),
  harvest: (
    <path d="M10 22c0-5 2.5-9 6-11 3.5 2 6 6 6 11H10zm6-14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  ),
  atlas: (
    <path d="M6 24l10-16 10 16H6zm10-4.5L13.5 20h5L16 19.5z" />
  ),
  moonlit: (
    <path d="M18 8a7 7 0 1 0 5 12.2A9 9 0 1 1 18 8z" />
  ),
  kindred: (
    <path d="M16 6c-4 4-8 6-8 11a8 8 0 0 0 16 0c0-5-4-7-8-11zm0 18l-3-3h6l-3 3z" />
  ),
  helio: (
    <>
      <circle cx="16" cy="16" r="5" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7 7l2 2M23 23l2 2M7 25l2-2M23 9l2-2" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  orbit: (
    <>
      <ellipse cx="16" cy="16" rx="11" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  cascade: (
    <path d="M8 10h16v3H8v9h16v3H8z" opacity="0.9" />
  ),
  vanta: (
    <path d="M8 8h7v16H8V8zm9 0h7v10h-7V8z" />
  ),
};
