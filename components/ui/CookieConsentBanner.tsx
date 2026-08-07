"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { subscribe, getSnapshot, getServerSnapshot, setConsent } from "@/lib/cookie-consent";
import { Button } from "@/components/ui/Button";

export function CookieConsentBanner() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (status !== null) return null;

  return (
    <div className="surface-container fixed inset-x-4 bottom-4 z-[60] flex flex-col gap-4 rounded-2xl p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:max-w-sm">
      <p className="text-sm text-[var(--container-muted)]">
        We use Plausible, a cookieless, privacy-friendly analytics tool, to see how many people
        visit and which pages are useful, nothing more. It sets no cookies and doesn&apos;t track
        you across sites. If you accept, we&apos;ll load it; if you decline, we won&apos;t. See our{" "}
        <Link href="/cookies" className="underline underline-offset-2 hover:text-white">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => setConsent("accepted")}
          variant="secondary"
          className="bg-white text-black hover:bg-white/90"
        >
          Accept
        </Button>
        <Button
          onClick={() => setConsent("declined")}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
