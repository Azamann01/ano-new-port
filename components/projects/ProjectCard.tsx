import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCaseStudy } from "@/types";

export function ProjectCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="surface-container group flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            {project.industry}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--container-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="text-sm text-[var(--container-muted)]">{project.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white px-2.5 py-1 text-xs text-black"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
