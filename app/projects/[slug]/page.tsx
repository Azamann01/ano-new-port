import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { VideoDemoButton } from "@/components/projects/VideoDemoButton";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return {
      ...buildMetadata({ title: "Project not found", path: `/projects/${slug}` }),
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    ogImage: `/projects/${project.slug}/opengraph-image`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <Link
        href="/projects"
        className="inline-flex w-fit items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <AnimatedSection className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {project.industry}, {project.client}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">{project.summary}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--foreground)]/5 px-2.5 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <SectionDivider />

      {project.video && (
        <>
          <AnimatedSection delay={0.05} className="flex justify-start">
            <VideoDemoButton video={project.video} videoPoster={project.videoPoster} />
          </AnimatedSection>

          <SectionDivider />
        </>
      )}

      <AnimatedSection
        delay={project.video ? 0.1 : 0.05}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <article>
          <h2 className="text-lg font-semibold">The problem</h2>
          <p className="mt-2 text-[var(--muted)]">{project.problem}</p>
        </article>
        <article>
          <h2 className="text-lg font-semibold">The solution</h2>
          <p className="mt-2 text-[var(--muted)]">{project.solution}</p>
        </article>
      </AnimatedSection>

      {project.techStack && (
        <>
          <SectionDivider />
          <AnimatedSection delay={project.video ? 0.15 : 0.1}>
            <h2 className="text-lg font-semibold">Built with</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--foreground)]/5 px-2.5 py-1 text-xs text-[var(--muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </>
      )}

      <SectionDivider />

      <AnimatedSection
        delay={project.video ? 0.2 : 0.15}
        className="surface-container rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold">Results</h2>
        {project.client === "Self-initiated project" && (
          <p className="mt-1 text-xs text-[var(--container-muted)]">
            Illustrative figures for this self-initiated project, not measured results from a
            paying client.
          </p>
        )}
        <ul className="mt-3 flex flex-col gap-2">
          {project.results.map((result) => (
            <li key={result} className="flex gap-2 text-sm text-[var(--container-muted)]">
              <span aria-hidden className="text-[var(--container)]">•</span>
              {result}
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {project.testimonial && (
        <>
          <SectionDivider />
          <AnimatedSection
            delay={project.video ? 0.25 : 0.2}
            className="surface-container rounded-2xl p-6 sm:p-8"
          >
            <blockquote className="text-lg font-medium text-[var(--container-foreground)]">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[var(--container-muted)]">
              {project.testimonial.author}, {project.testimonial.role}
            </p>
          </AnimatedSection>
        </>
      )}

      <AnimatedSection
        delay={project.video ? 0.3 : 0.25}
        className="flex flex-wrap justify-start gap-3"
      >
        {project.liveDemoUrl && (
          <Button href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
            Try the live demo
          </Button>
        )}
        <Button href="/contact" variant={project.liveDemoUrl ? "secondary" : "primary"}>
          Start a similar project
        </Button>
      </AnimatedSection>
    </Container>
  );
}
