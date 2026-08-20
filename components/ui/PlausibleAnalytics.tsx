"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { subscribe, getSnapshot, getServerSnapshot } from "@/lib/cookie-consent";

// This site's per-site Plausible script (issued from the Plausible dashboard
// for www.techwithtop.co.uk) — it bakes the domain into the script URL
// itself, so unlike the old shared script.js there's no data-domain attribute
// to set separately.
const PLAUSIBLE_SCRIPT_SRC = "https://plausible.io/js/pa-0fR4zxGA8QGKM4bJEWuLk.js";

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

  return (
    <>
      <Script async src={PLAUSIBLE_SCRIPT_SRC} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
      </Script>
    </>
  );
}
