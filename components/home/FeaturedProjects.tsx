import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="border-t border-[var(--border)] py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Recent work"
          title="Real problems, real software"
          description="A sample of the tools I've built for businesses looking to cut manual work out of their day-to-day."
        />
        <ProjectGrid projects={featured} />
        <Button href="/projects" variant="secondary" className="self-start">
          View all projects
        </Button>
      </Container>
    </section>
  );
}
