import type { ProjectCaseStudy } from "@/types";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectGrid({ projects }: { projects: ProjectCaseStudy[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <AnimatedCard key={project.slug} index={index}>
          <ProjectCard project={project} index={index} />
        </AnimatedCard>
      ))}
    </div>
  );
}
