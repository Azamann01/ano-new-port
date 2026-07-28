import { Wrench, ShoppingBag, Briefcase, Building2, Sparkles, type LucideIcon } from "lucide-react";
import type { ProjectCaseStudy } from "@/types";

const industryIcons: Record<string, LucideIcon> = {
  "Home Services": Wrench,
  Retail: ShoppingBag,
  "Professional Services": Briefcase,
  "Real Estate": Building2,
};

// Curated gradient pairs standing in for "AI-generated" cover art per project —
// deterministic (by index), no external image requests or real generation.
const gradients = [
  "from-fuchsia-500 via-rose-400 to-amber-300",
  "from-sky-400 via-indigo-400 to-violet-500",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-orange-400 via-rose-400 to-fuchsia-500",
];

export function ProjectAppScreen({
  project,
  index = 0,
}: {
  project: ProjectCaseStudy;
  index?: number;
}) {
  const Icon = industryIcons[project.industry] ?? Briefcase;
  const heroGradient = gradients[index % gradients.length];

  return (
    <div className="surface-container flex h-full flex-col gap-3 px-4 pb-6 pt-4 text-white">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <p className="truncate text-xs font-semibold">{project.title}</p>
      </div>

      <div
        className={`group/hero relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br ${heroGradient} transition-transform duration-300 hover:scale-[1.02]`}
      >
        <Icon className="absolute bottom-2 right-2 h-10 w-10 text-white/25" strokeWidth={1.25} />
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/25 px-2 py-1 text-[9px] font-medium backdrop-blur-[2px]">
          <Sparkles className="h-2.5 w-2.5" />
          Generated
        </div>
        <p className="absolute bottom-2 left-2 right-12 truncate text-[11px] font-semibold drop-shadow">
          {project.client}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        {project.results.slice(0, 2).map((result, i) => (
          <div
            key={result}
            className="group/row flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-white/10"
          >
            <div
              className={`h-8 w-8 shrink-0 rounded-md bg-gradient-to-br ${gradients[(index + i + 1) % gradients.length]} transition-transform duration-200 group-hover/row:scale-110`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium leading-tight">{result}</p>
              <p className="truncate text-[9px] text-white/50">{project.tags[i % project.tags.length]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-around rounded-xl bg-white/10 py-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`} />
        ))}
      </div>
    </div>
  );
}
