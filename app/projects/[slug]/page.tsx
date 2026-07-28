import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
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
  if (!project) return buildMetadata({ title: "Project not found", path: `/projects/${slug}` });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
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
          {project.industry} · {project.client}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">{project.summary}</p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.05} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <article>
          <h2 className="text-lg font-semibold">The problem</h2>
          <p className="mt-2 text-[var(--muted)]">{project.problem}</p>
        </article>
        <article>
          <h2 className="text-lg font-semibold">The solution</h2>
          <p className="mt-2 text-[var(--muted)]">{project.solution}</p>
        </article>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1} className="surface-container rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Results</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {project.results.map((result) => (
            <li key={result} className="text-sm text-[var(--container-muted)]">
              — {result}
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-start">
        <Button href="/contact">Start a similar project</Button>
      </AnimatedSection>
    </Container>
  );
}
