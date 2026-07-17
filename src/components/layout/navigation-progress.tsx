"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin top progress bar for client-side route changes.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const isFirst = useRef(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    setVisible(true);
    setProgress(18);

    timers.current.push(window.setTimeout(() => setProgress(55), 90));
    timers.current.push(window.setTimeout(() => setProgress(82), 220));
    timers.current.push(
      window.setTimeout(() => {
        setProgress(100);
        timers.current.push(
          window.setTimeout(() => {
            setVisible(false);
            setProgress(0);
          }, 240),
        );
      }, 420),
    );

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [pathname, searchParams]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[2.5px] overflow-hidden"
      role="progressbar"
      aria-hidden={!visible}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Loading"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 shadow-[0_0_12px_rgba(168,85,247,0.55)] transition-[width,opacity] duration-300 ease-out"
        style={{
          width: `${Math.max(progress, 0)}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
