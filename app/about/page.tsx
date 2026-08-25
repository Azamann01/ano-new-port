import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Technology should solve business problems, not create them. How TechWithTop approaches discovery, design and development.",
  path: "/about",
  ogImage: "/about/opengraph-image",
});

const steps = [
  {
    title: "Discover",
    description: "Understand your business, goals and operational challenges.",
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
    description: "Build secure, scalable technology focused on business outcomes.",
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
          title="Technology should solve business problems not create them"
        />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]" delay={0.05}>
        <div className="flex flex-col gap-4 text-base text-[var(--muted)] sm:text-lg">
          <p>
            At <strong className="text-[var(--foreground)]">TechWithTop</strong>, we believe
            every organisation deserves technology that works in harmony with the way it
            operates. Lasting improvement starts with understanding how work actually gets
            done, where the friction is, and what stops teams performing at their best.
          </p>
          <p>
            We take a research driven approach, working closely with business leaders to
            understand their operations, processes and objectives before writing a line of
            code. That groundwork lets us cut unnecessary complexity and design around real
            workflows, not assumptions.
          </p>
          <p>
            Every engagement is guided by evidence and judged on results: better productivity,
            sharper decision making and technology that supports sustainable growth rather than
            adding to the workload.
          </p>
          <p>
            Technology, done well, is an enabler of progress. Our purpose is turning operational
            challenges into lasting, practical improvement.
          </p>
        </div>
        <div className="surface-container rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            How we work
          </p>
          <ol className="mt-4 flex flex-col items-center gap-4 text-sm">
            {steps.map((step, index) => (
              <li key={step.title} className="flex max-w-[240px] flex-col items-center gap-1">
                <span className="font-semibold text-[var(--container-muted)]">
                  {index + 1}
                </span>
                <span className="font-semibold">{step.title}</span>
                <span className="text-[var(--container-muted)]">{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1}>
        <div className="surface-container rounded-2xl p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            Why work with us
          </p>
          <p className="mt-3 text-xl font-semibold sm:text-2xl">
            We don&apos;t start with technology. We start with your business.
          </p>
          <p className="mt-3 text-[var(--container-muted)]">
            We build around how your operations actually work, not the other way round.
            Solutions are judged by the outcomes they deliver, not the technology behind them.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-start">
        <Button href="/contact">Let&apos;s talk</Button>
      </AnimatedSection>
    </Container>
  );
}
