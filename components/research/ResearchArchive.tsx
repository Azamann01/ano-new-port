import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { researchItems } from "@/content/research-items";
import { getAllResearchArticles } from "@/lib/mdx";
import { Button } from "@/components/ui/Button";
import type { ResearchItem } from "@/types";

const secondaryButton = "shrink-0 bg-white/10 text-white hover:bg-white/20";

function formatMonth(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

/**
 * Article entries are derived from content/research/*.mdx so a new brief shows
 * up here just by adding the file — no second place to update. content/
 * research-items.ts is only for entries with no article behind them: the
 * legacy August 2026 PDF, and any cited third-party source worth listing.
 *
 * Articles are listed first and are already newest-first; the manual entries
 * follow. That ordering holds because everything in research-items.ts predates
 * the MDX articles — revisit it if an older article is ever backfilled.
 */
function ArchiveRow({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-[var(--container-muted)]">{meta}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">{children}</div>
    </li>
  );
}

function LegacyRow({ item }: { item: ResearchItem }) {
  const isSource = item.type === "source";

  return (
    <ArchiveRow
      title={item.title}
      meta={`${item.date} · ${isSource ? item.publisher : "Document"}`}
    >
      <Button
        href={item.url}
        variant="secondary"
        className={secondaryButton}
        {...(isSource
          ? { target: "_blank", rel: "noopener noreferrer" }
          : { download: item.url.split("/").pop() })}
      >
        {isSource ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
        {isSource ? "View source" : "Download"}
      </Button>
    </ArchiveRow>
  );
}

export function ResearchArchive() {
  const articles = getAllResearchArticles();

  return (
    <div className="surface-container flex flex-col gap-4 rounded-2xl p-6">
      <div>
        <h3 className="font-semibold">Research archive &amp; sources</h3>
        <p className="mt-1 text-sm text-[var(--container-muted)]">
          Past briefs and the third-party research we cite, kept in one place as it grows.
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArchiveRow
            key={article.slug}
            title={article.title}
            meta={`${formatMonth(article.date)} · Article`}
          >
            <Button
              href={`/research/${article.slug}`}
              variant="secondary"
              className={secondaryButton}
            >
              Read
              <ArrowRight className="h-4 w-4" />
            </Button>
            {article.pdf && (
              <Button
                href={article.pdf}
                download={article.pdf.split("/").pop()}
                variant="ghost"
                className="shrink-0 text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
            )}
          </ArchiveRow>
        ))}
        {researchItems.map((item) => (
          <LegacyRow key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}
