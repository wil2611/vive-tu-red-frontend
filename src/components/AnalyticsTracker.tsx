"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { recordPageView } from "@/lib/analytics/tracker";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin")) return;
    if (lastTrackedPathRef.current === pathname) return;

    const referrer =
      typeof document !== "undefined" && document.referrer
        ? document.referrer
        : undefined;

    lastTrackedPathRef.current = pathname;
    void recordPageView(pathname, referrer);
  }, [pathname]);

  return null;
}
