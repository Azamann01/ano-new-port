import { ArrowRight, Download } from "lucide-react";
import { getAllResearchArticles } from "@/lib/mdx";
import { Button } from "@/components/ui/Button";

/**
 * Features the most recent research article. The HTML article is the primary
 * artefact — it's indexable, its sources are real links and it carries the
 * publication date. A PDF is optional per article (frontmatter `pdf`) and is
 * only ever a point-in-time export of what the article already says.
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
        {latest.pdf && (
          <Button
            href={latest.pdf}
            download={latest.pdf.split("/").pop()}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
        )}
      </div>
    </div>
  );
}
