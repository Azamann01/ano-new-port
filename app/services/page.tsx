import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Process automation, internal tools, systems integration, and custom web apps for growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <Container className="flex flex-col gap-14 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Services"
          title="Custom software, scoped to your actual problem"
          description="Every engagement starts with understanding the manual process costing your team time — then building the smallest tool that fixes it."
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <AnimatedCard key={service.slug} index={index}>
            <ServiceCard service={service} />
          </AnimatedCard>
        ))}
      </div>

      <AnimatedSection delay={0.1} className="rounded-3xl border border-[var(--border)] p-8 text-center">
        <h2 className="text-2xl font-semibold">Not sure which fits?</h2>
        <p className="mx-auto mt-2 max-w-lg text-[var(--muted)]">
          Tell me about the process that's slowing your team down, and I'll recommend the right
          starting point — even if that means no project at all.
        </p>
        <Button href="/contact" className="mt-6">
          Get in touch
        </Button>
      </AnimatedSection>
    </Container>
  );
}
