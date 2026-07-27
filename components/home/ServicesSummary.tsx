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
        <SectionHeading
          eyebrow="What I do"
          title="Practical software, built around your operations"
          description="No bloated platforms or year-long rollouts — just focused tools that remove the manual work slowing your team down."
        />
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
