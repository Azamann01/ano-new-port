import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCaseStudy } from "@/types";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { ProjectAppScreen } from "@/components/projects/ProjectAppScreen";

export function ProjectCard({ project, index = 0 }: { project: ProjectCaseStudy; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col items-center gap-4 rounded-2xl p-4 text-center transition-all duration-300 hover:bg-[var(--foreground)]/[0.03]"
    >
      <div className="w-full max-w-[220px] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[-1deg] group-hover:scale-[1.03]">
        <PhoneMockup className="shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
          <ProjectAppScreen project={project} index={index} />
        </PhoneMockup>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {project.industry}
        </p>
        <h3 className="flex items-center gap-1 text-lg font-semibold">
          {project.title}
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="max-w-xs text-sm text-[var(--muted)]">{project.summary}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--foreground)]/5 px-2.5 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
