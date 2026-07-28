import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Technology should solve business problems, not create them — how TechWithTop approaches discovery, design, and development.",
  path: "/about",
});

const steps = [
  {
    title: "Discover",
    description: "Understand your business, goals, and operational challenges.",
  },
  {
    title: "Analyse",
    description: "Identify inefficiencies and opportunities for improvement.",
  },
  {
    title: "Design",
    description: "Create solutions aligned with your workflows and objectives.",
  },
  {
    title: "Develop",
    description: "Build secure, scalable software focused on business outcomes.",
  },
  {
    title: "Improve",
    description: "Continuously refine solutions through feedback and measurable results.",
  },
];

export default function AboutPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-16 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="About"
          title="Technology should solve business problems, not create them."
        />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]" delay={0.05}>
        <div className="flex flex-col gap-4 text-base text-[var(--muted)] sm:text-lg">
          <p>
            At TechWithTop, we work closely with organisations to understand how they operate,
            identify inefficiencies, and develop software that improves productivity and
            supports growth.
          </p>
          <p>
            Every solution is informed by research, built around real workflows, and designed
            to deliver measurable business value.
          </p>
        </div>
        <div className="surface-container rounded-2xl p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            How we work
          </p>
          <ol className="mt-4 flex flex-col gap-4 text-sm">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="font-semibold text-[var(--container-muted)]">
                  {index + 1}
                </span>
                <span>
                  <span className="font-semibold">{step.title}</span>
                  <span className="text-[var(--container-muted)]"> — {step.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1}>
        <div className="surface-container rounded-2xl p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            Why Work With Me
          </p>
          <p className="mt-3 text-xl font-semibold sm:text-2xl">
            I don&apos;t start with technology—I start with your business.
          </p>
          <p className="mt-3 text-[var(--container-muted)]">
            By understanding your operations, identifying inefficiencies, and focusing on
            measurable outcomes, I build solutions that solve real problems and deliver
            lasting value.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-start">
        <Button href="/contact">Let&apos;s talk about your process</Button>
      </AnimatedSection>
    </Container>
  );
}
