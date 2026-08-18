import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Case studies of custom technology built for small and midsize businesses across home services, retail, and more.",
  path: "/projects",
  ogImage: "/projects/opengraph-image",
});

export default function ProjectsPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-12 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Projects"
          title="Case Studies From Real Problems"
          description="Each project started as a specific, costly manual process. Here's how they got fixed."
        />
      </AnimatedSection>

      <SectionDivider />

      <ProjectGrid projects={projects} />
    </Container>
  );
}
