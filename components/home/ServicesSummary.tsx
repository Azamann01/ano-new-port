import { services } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ServicesSummary() {
  return (
    <section className="section-glow relative overflow-hidden py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="What We Do" title="Research-driven technology solutions" />
        <div className="flex max-w-2xl flex-col gap-4 text-base text-[var(--muted)] sm:text-lg">
          <p>
            We partner with organisations to simplify complex operations through research-driven
            technology solutions.
          </p>
          <p>
            By combining business analysis with modern software development, we help businesses
            streamline processes, improve visibility, automate repetitive tasks, and make more
            informed decisions.
          </p>
          <p>Every solution is designed to deliver measurable business value and long-term operational improvement.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedCard key={service.slug} index={index}>
              <ServiceCard service={service} />
            </AnimatedCard>
          ))}
        </div>
        <Button href="/services" variant="secondary" className="self-start">
          View all services
        </Button>
      </Container>
    </section>
  );
}
