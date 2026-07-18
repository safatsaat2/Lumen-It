"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";

import type { OfferBanner as OfferBannerConfig } from "@/lib/consultation/types";

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function safeHref(value: string) {
  const href = value.trim();
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function validDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function formatRemaining(milliseconds: number) {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${days > 0 ? `${days}d ` : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function OfferBanner({ offer }: { offer: OfferBannerConfig }) {
  const [now, setNow] = useState(0);
  const startsAt = useMemo(() => validDate(offer.startsAt), [offer.startsAt]);
  const endsAt = useMemo(() => validDate(offer.endsAt), [offer.endsAt]);
  const countdownTo = useMemo(
    () => validDate(offer.countdownTo),
    [offer.countdownTo],
  );

  useEffect(() => {
    setNow(Date.now());
    if (!countdownTo) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [countdownTo]);

  const active =
    offer.enabled &&
    ((!startsAt && !endsAt) ||
      (now > 0 &&
        (!startsAt || now >= startsAt.getTime()) &&
        (!endsAt || now <= endsAt.getTime())));
  if (!active) return null;

  const href = safeHref(offer.ctaHref);
  const backgroundColor = HEX_COLOR.test(offer.backgroundColor)
    ? offer.backgroundColor
    : "#0f172a";
  const color = HEX_COLOR.test(offer.textColor) ? offer.textColor : "#f8fafc";
  const countdown =
    now > 0 && countdownTo && countdownTo.getTime() > now
      ? formatRemaining(countdownTo.getTime() - now)
      : null;

  return (
    <>
      <div className="h-16 sm:h-14" aria-hidden />
      <aside
        className="fixed inset-x-0 top-16 z-[45] min-h-14 border-b border-white/10 lg:top-[4.5rem]"
        style={{ backgroundColor, color }}
        aria-label="Special offer"
      >
        <div className="container flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-center sm:flex-row sm:gap-4">
          <div className="min-w-0 text-sm">
            <strong>{offer.title}</strong>
            {offer.description ? (
              <span className="ml-2 opacity-80">{offer.description}</span>
            ) : null}
          </div>
          {countdown ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs opacity-90">
              <Clock3 className="size-3.5" aria-hidden />
              {countdown}
            </span>
          ) : null}
          {href && offer.ctaLabel ? (
            <Link
              href={href}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold underline underline-offset-4"
            >
              {offer.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          ) : null}
        </div>
      </aside>
    </>
  );
}
