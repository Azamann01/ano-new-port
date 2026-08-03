import { CalendarClock } from "lucide-react";
import { isPlaceholderUrl, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function InterviewCTA() {
  if (isPlaceholderUrl(siteConfig.calendlyUrl)) return null;

  return (
    <div className="surface-container flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">Prefer to talk instead?</h3>
        <p className="mt-1 text-sm text-[var(--container-muted)]">
          Book a short, free consultation and share how your team currently handles operations.
        </p>
      </div>
      <Button
        href={siteConfig.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="shrink-0 bg-white text-black hover:bg-white/90"
      >
        <CalendarClock className="h-4 w-4" />
        Book free consultation
      </Button>
    </div>
  );
}
