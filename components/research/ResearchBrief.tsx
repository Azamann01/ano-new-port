import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function ResearchBrief() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--border)] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">Download the current research brief</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          A short PDF summarizing findings so far, updated as the research progresses.
        </p>
      </div>
      <Button href={siteConfig.researchBriefPath} variant="secondary" className="shrink-0">
        <Download className="h-4 w-4" />
        Download brief
      </Button>
    </div>
  );
}
