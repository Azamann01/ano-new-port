import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ProjectCaseStudy } from "@/types";

const industryIcons: Record<string, LucideIcon> = {
  "Home Services": Wrench,
  Retail: ShoppingBag,
  "Professional Services": Briefcase,
  "Real Estate": Building2,
};

// Curated gradient pairs standing in for a real project screenshot — deterministic
// (by index, not a content hash, so two projects never collide), no external image
// requests or real generation. See CLAUDE.md's image-generation limitation note.
const gradients = [
  "from-fuchsia-500 via-rose-400 to-amber-300",
  "from-sky-400 via-indigo-400 to-violet-500",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-orange-400 via-rose-400 to-fuchsia-500",
];

export function ProjectCard({ project, index = 0 }: { project: ProjectCaseStudy; index?: number }) {
  const Icon = industryIcons[project.industry] ?? Briefcase;
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden ${project.image ? "" : `bg-gradient-to-br ${gradient}`}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Icon
            aria-hidden
            strokeWidth={1.25}
            className="absolute -bottom-4 -right-4 h-28 w-28 text-white/15 transition-transform duration-300 group-hover:scale-110"
          />
        )}
        {!project.image && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-[2px]">
            <Sparkles aria-hidden className="h-3 w-3" />
            Concept visual
          </div>
        )}
        <div
          className={`absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 ${project.image ? "bg-gradient-to-t from-black/70 to-transparent" : ""}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
            {project.industry}
          </p>
          <p className="truncate text-sm font-semibold text-white drop-shadow">{project.client}</p>
        </div>
      </div>

      <div className="surface-container flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-[var(--container-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <p className="text-sm text-[var(--container-muted)]">{project.summary}</p>
        <p className="flex items-start gap-1.5 text-sm font-medium text-[var(--container-foreground)]">
          <TrendingUp aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {project.results[0]}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--container-foreground)]/10 px-2.5 py-1 text-xs text-[var(--container-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
