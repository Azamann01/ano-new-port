import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/types";

export function BlogPostCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] p-6 transition-colors hover:border-[var(--foreground)]/30"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {formattedDate}
        </p>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-[var(--muted)]">{post.excerpt}</p>
    </Link>
  );
}
