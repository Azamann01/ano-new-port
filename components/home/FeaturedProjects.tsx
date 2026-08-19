import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-glow relative overflow-hidden py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Recent Work"
          title="Real Problems, Real Solutions"
          description="A sample of the tools we've built for businesses looking to cut manual work out of their daily operations."
        />
        <ProjectGrid projects={featured} />
        <Button href="/projects" variant="secondary" className="self-start">
          View all projects
        </Button>
      </Container>
    </section>
  );
}
