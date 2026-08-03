import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Accordion } from "@/components/ui/Accordion";
import { ResearchBrief } from "@/components/research/ResearchBrief";
import { GoogleFormEmbed } from "@/components/research/GoogleFormEmbed";
import { faq } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Research",
  description:
    "Ongoing research into where SMEs lose the most time to manual processes, and where custom software actually pays off.",
  path: "/research",
  ogImage: "/research/opengraph-image",
});

const industries = [
  "Home Services",
  "Retail",
  "Professional Services",
  "Real Estate",
  "Hospitality",
  "Logistics",
];

export default function ResearchPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-16 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Research"
          title="What's actually costing SMEs the most time?"
          description="We're running ongoing research into where manual processes cost small and midsize businesses the most: time, money, and errors, and where custom software realistically pays off."
        />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.05} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Purpose of this research</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          Most advice about &ldquo;digital transformation&rdquo; is written for enterprises with dedicated IT
          teams and large budgets. This research is focused specifically on SMEs, building an honest,
          practical picture of where custom software is worth the investment, and where it isn&apos;t.
        </p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Industries involved</h2>
        <div className="flex flex-wrap gap-3">
          {industries.map((industry, index) => (
            <AnimatedCard key={industry} index={index}>
              <span className="surface-container inline-block rounded-full px-4 py-2 text-sm">
                {industry}
              </span>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.15}>
        <ResearchBrief />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.2} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Contribute to the research</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          If you run an SME, your input directly shapes this research. Fill out the form below.
          It takes about 5 minutes.
        </p>
        <GoogleFormEmbed />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.25} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <Accordion items={faq} />
      </AnimatedSection>
    </Container>
  );
}
