import { Download, ExternalLink } from "lucide-react";
import { researchItems } from "@/content/research-items";
import { Button } from "@/components/ui/Button";

export function ResearchArchive() {
  return (
    <div className="surface-container flex flex-col gap-4 rounded-2xl p-6">
      <div>
        <h3 className="font-semibold">Research archive &amp; sources</h3>
        <p className="mt-1 text-sm text-[var(--container-muted)]">
          Past briefs and the third-party research we cite, kept in one place as it grows.
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {researchItems.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-0.5 text-xs text-[var(--container-muted)]">
                {item.date} · {item.type === "document" ? "Document" : item.publisher}
              </p>
            </div>
            <Button
              href={item.url}
              variant="secondary"
              className="shrink-0 bg-white/10 text-white hover:bg-white/20"
              {...(item.type === "document"
                ? { download: true }
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {item.type === "document" ? (
                <Download className="h-4 w-4" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              {item.type === "document" ? "Download" : "View source"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
