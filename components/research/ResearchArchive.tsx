import { ArrowRight, Download, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { researchItems } from "@/content/research-items";
import { getAllResearchArticles } from "@/lib/mdx";
import { Button } from "@/components/ui/Button";
import type { ResearchItem } from "@/types";

function formatMonth(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

/**
 * Article rows are derived from content/research/*.mdx, so publishing a brief
 * is one file. content/research-items.ts is only for rows with no article
 * behind them (a cited third-party source, say) — it's currently empty.
 *
 * Rows are newest first: this is a published archive, not a project plan, so
 * the most recent research leads.
 */
function Row({
  dateLabel,
  title,
  description,
  children,
}: {
  dateLabel: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
      >
        <FileText strokeWidth={1.5} className="h-4 w-4 text-white" />
      </span>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            {dateLabel}
          </p>
          <p className="mt-1 font-medium">{title}</p>
          <p className="mt-1 text-sm text-[var(--container-muted)]">{description}</p>
        </div>
        {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
      </div>
    </li>
  );
}

function LegacyRow({ item }: { item: ResearchItem }) {
  const isSource = item.type === "source";

  return (
    <Row
      dateLabel={`${item.date} · ${isSource ? item.publisher : "Document"}`}
      title={item.title}
      description={item.description}
    >
      <Button
        href={item.url}
        variant="secondary"
        className="bg-white/10 text-white hover:bg-white/20"
        {...(isSource
          ? { target: "_blank", rel: "noopener noreferrer" }
          : { download: item.url.split("/").pop() })}
      >
        {isSource ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
        {isSource ? "View source" : "Download"}
      </Button>
    </Row>
  );
}

export function ResearchArchive() {
  const articles = getAllResearchArticles();

  return (
    <div className="surface-container flex flex-col gap-6 rounded-2xl p-6 sm:p-8">
      <div>
        <h3 className="text-lg font-semibold">TechWithTop Research</h3>
        <p className="mt-1 text-sm text-[var(--container-muted)]">
          Understanding the operational challenges facing UK SMEs.
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {articles.map((article) => (
          <Row
            key={article.slug}
            dateLabel={formatMonth(article.date)}
            title={
              <Link
                href={`/research/${article.slug}`}
                className="transition-colors hover:text-[var(--container-muted)]"
              >
                {article.title}
              </Link>
            }
            description={article.excerpt}
          >
            <Button
              href={`/research/${article.slug}`}
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Read
              <ArrowRight className="h-4 w-4" />
            </Button>
            {article.pdf && (
              <Button
                href={article.pdf}
                download={article.pdf.split("/").pop()}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
            )}
          </Row>
        ))}
        {researchItems.map((item) => (
          <LegacyRow key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}
