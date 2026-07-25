import { CalendarClock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function InterviewCTA() {
  return (
    <div className="gradient-bg flex flex-col items-start gap-4 rounded-2xl p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">Prefer to talk instead?</h3>
        <p className="mt-1 text-sm text-white/90">
          Book a short 20-minute interview and share how your team currently handles operations.
        </p>
      </div>
      <Button
        href={siteConfig.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="shrink-0 border-white/40 bg-white text-[var(--foreground)] hover:bg-white/90"
      >
        <CalendarClock className="h-4 w-4" />
        Book an interview
      </Button>
    </div>
  );
}
