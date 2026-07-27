import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Why I build custom software for small and mid-sized businesses instead of selling one-size-fits-all platforms.",
  path: "/about",
});

const values = [
  {
    title: "Practical over impressive",
    description:
      "A tool that quietly saves your team two hours a week beats a flashy system nobody fully uses.",
  },
  {
    title: "Built around your process",
    description:
      "Software should adapt to how your business runs — not force your team to change how they work to fit the tool.",
  },
  {
    title: "Honest scoping",
    description:
      "If a spreadsheet or an integration would solve your problem cheaper than custom software, I'll tell you that.",
  },
];

export default function AboutPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-16 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="About"
          title="I build software that removes busywork, not adds to it"
        />
      </AnimatedSection>

      <AnimatedSection className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]" delay={0.05}>
        <div className="flex flex-col gap-4 text-base text-[var(--muted)] sm:text-lg">
          <p>
            I work with small and mid-sized businesses that have outgrown spreadsheets and
            manual processes, but don&apos;t need — or want to pay for — a bloated enterprise
            platform.
          </p>
          <p>
            Most of my projects start the same way: a business is losing hours every week to a
            process that used to work fine at a smaller scale, but is now causing missed
            appointments, duplicate data entry, or errors that take days to catch. My job is to
            build the smallest, most maintainable tool that actually fixes that.
          </p>
          <p>
            That usually means a focused internal tool, a scheduling or dispatch system, or an
            integration between tools you already use — not a from-scratch platform that takes a
            year to ship.
          </p>
        </div>
        <div className="surface-container rounded-2xl p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--container-muted)]">
            How I work
          </p>
          <ol className="mt-4 flex flex-col gap-3 text-sm">
            <li>1. Understand the manual process and what it&apos;s costing you</li>
            <li>2. Scope the smallest tool that solves it</li>
            <li>3. Build, ship, and iterate based on real use</li>
          </ol>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="surface-container rounded-2xl p-6">
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-[var(--container-muted)]">{value.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-start">
        <Button href="/contact">Let&apos;s talk about your process</Button>
      </AnimatedSection>
    </Container>
  );
}
