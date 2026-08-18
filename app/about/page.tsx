import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Technology should solve business problems, not create them. How TechWithTop approaches discovery, design, and development.",
  path: "/about",
  ogImage: "/about/opengraph-image",
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
            At TechWithTop, we believe every organisation deserves technology that works in
            harmony with the way it operates. Lasting business improvement begins with
            understanding how work gets done, where challenges arise, and what prevents teams
            from performing at their best.
          </p>
          <p>
            We take a research driven approach to understanding organisations, working closely
            with business leaders to gain insight into their operations, processes, and
            objectives. By identifying inefficiencies, reducing unnecessary complexity, and
            uncovering opportunities for improvement, we help organisations build stronger, more
            efficient ways of working.
          </p>
          <p>
            Every engagement is guided by evidence, informed by operational insight, and focused
            on delivering measurable outcomes. Our commitment is to create practical solutions
            that improve productivity, strengthen decision making, support sustainable growth,
            and deliver lasting business value.
          </p>
          <p>
            We see technology as an enabler of progress. Our purpose is to help organisations
            transform operational challenges into opportunities for continuous improvement,
            innovation, and long term success.
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
                  <span className="text-[var(--container-muted)]">: {step.description}</span>
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
            Why work with us
          </p>
          <p className="mt-3 text-xl font-semibold sm:text-2xl">
            We don&apos;t start with technology. We start with your business.
          </p>
          <p className="mt-3 text-[var(--container-muted)]">
            By understanding your operations, identifying inefficiencies, and focusing on
            measurable outcomes, we build solutions that solve real problems and deliver
            lasting value.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-start">
        <Button href="/contact">Let&apos;s talk</Button>
      </AnimatedSection>
    </Container>
  );
}
