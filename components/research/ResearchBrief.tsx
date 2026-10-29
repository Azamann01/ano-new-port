import { ArrowRight } from "lucide-react";
import { getAllResearchArticles } from "@/lib/mdx";
import { Button } from "@/components/ui/Button";

/**
 * Features the most recent research article. The HTML article is the only
 * artefact — it's indexable, its sources are real links and it carries the
 * publication date. "Download as PDF" lives on the article itself and uses
 * the browser's print-to-PDF, so there's no separate file to link here.
 */
export function ResearchBrief() {
  const [latest] = getAllResearchArticles();

  if (!latest) return null;

  const published = new Date(latest.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="surface-container flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--container-muted)]">
          Latest research · {published}
        </p>
        <h3 className="mt-2 font-semibold">{latest.title}</h3>
        <p className="mt-1 max-w-xl text-sm text-[var(--container-muted)]">{latest.excerpt}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Button
          href={`/research/${latest.slug}`}
          variant="secondary"
          className="bg-white text-black hover:bg-white/90"
        >
          Read the research
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
