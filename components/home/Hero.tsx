import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="section-glow hero-glow relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Transforming Operational Challenges into Practical Digital Solutions
        </h1>
        <p className="max-w-xl text-lg text-[var(--muted)] dark:text-white/90">
          Smarter operations, better decisions with technology that delivers measurable results.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/projects">See past work</Button>
        </div>
      </Container>
    </section>
  );
}
