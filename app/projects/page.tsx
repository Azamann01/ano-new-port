import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Case studies of custom software built for small and mid-sized businesses across home services, retail, and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="flex flex-col gap-12 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Projects"
          title="Case studies from real engagements"
          description="Each project started as a specific, costly manual process. Here's how they got fixed."
        />
      </AnimatedSection>

      <ProjectGrid projects={projects} />
    </Container>
  );
}
