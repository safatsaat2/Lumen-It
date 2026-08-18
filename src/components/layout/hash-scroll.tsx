"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const RETRY_DELAYS_MS = [0, 50, 150, 400, 800];

function sectionIdFromHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function scrollToHash() {
  const id = sectionIdFromHash();
  if (!id) return true;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "auto", block: "start" });
  return true;
}

/** Next.js App Router ignores hash targets after client navigations / loading.tsx. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    const timeouts: number[] = [];

    const stopWatching = () => {
      observer?.disconnect();
      observer = null;
      timeouts.splice(0).forEach((id) => window.clearTimeout(id));
    };

    const watch = () => {
      if (cancelled || !sectionIdFromHash()) return;

      stopWatching();

      const tryScroll = () => {
        if (cancelled) return true;
        return scrollToHash();
      };

      const scheduleRetries = () => {
        for (const delay of RETRY_DELAYS_MS) {
          timeouts.push(window.setTimeout(() => tryScroll(), delay));
        }
      };

      if (tryScroll()) {
        scheduleRetries();
        return;
      }

      observer = new MutationObserver(() => {
        if (tryScroll()) {
          observer?.disconnect();
          observer = null;
          scheduleRetries();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeouts.push(
        window.setTimeout(() => {
          observer?.disconnect();
          observer = null;
          tryScroll();
        }, 5000),
      );
    };

    watch();

    const onHashChange = () => watch();
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!anchor || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href?.includes("#")) return;
      window.setTimeout(watch, 0);
      window.setTimeout(watch, 200);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);

    return () => {
      cancelled = true;
      stopWatching();
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
