"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { subscribe, getSnapshot, getServerSnapshot } from "@/lib/cookie-consent";
import { siteConfig } from "@/lib/site-config";

/**
 * Plausible is cookieless (no persistent identifiers, nothing stored in the
 * browser), but the cookie banner explicitly promises visitors that their
 * accept/decline choice "will control it" once analytics is added — so this
 * only loads the script after an explicit "accepted", not just because
 * Plausible itself wouldn't strictly require it.
 */
export function PlausibleAnalytics() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (status !== "accepted") return null;

  const domain = new URL(siteConfig.url).hostname;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
