import { Suspense } from "react";

import { NavigationProgress } from "@/components/layout/navigation-progress";

/** Suspense boundary required because NavigationProgress reads searchParams. */
export function NavigationProgressHost() {
  return (
    <Suspense fallback={null}>
      <NavigationProgress />
    </Suspense>
  );
}
