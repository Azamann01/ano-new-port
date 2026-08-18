import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Operational discovery, process automation, custom business systems, and dashboards for growing businesses.",
  path: "/services",
  ogImage: "/services/opengraph-image",
});

export default function ServicesPage() {
  return (
    <>
      <Container className="section-glow relative overflow-hidden flex flex-col gap-14 py-20 sm:py-28">
        <AnimatedSection>
          <SectionHeading
            level="h1"
            eyebrow="Services"
            title="Custom Technology Scoped To Your Actual Problem"
            titleClassName="text-3xl sm:text-4xl"
            description="Every engagement starts with understanding the manual process costing your team time, then building the smallest tool that fixes it."
          />
        </AnimatedSection>

        <SectionDivider />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedCard key={service.slug} index={index}>
              <ServiceCard service={service} />
            </AnimatedCard>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Full-bleed band, not a contained/rounded card: matches the Home
          CTA's treatment (surface-container on the outer section, Container
          only constraining the text column inside it). */}
      <section className="relative overflow-hidden">
        <div className="surface-container">
          <Container className="py-8 text-center">
            <AnimatedSection>
              <h2 className="text-2xl font-semibold">Not sure which fits?</h2>
              <p className="mx-auto mt-2 max-w-lg text-[var(--container-muted)]">
                Tell us about the process that&apos;s slowing your team down, and we&apos;ll recommend the
                right starting point, even if that means no project is needed.
              </p>
              <Button
                href="/contact"
                variant="secondary"
                className="mt-6 bg-white text-black hover:bg-white/90"
              >
                Get in touch
              </Button>
            </AnimatedSection>
          </Container>
        </div>
      </section>
    </>
  );
}
