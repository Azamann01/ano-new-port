import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="section-glow relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Transforming Business Challenges into Practical Digital Solutions
        </h1>
        <p className="max-w-xl text-lg text-[var(--muted)]">
          Smarter operations, Better decisions with Technology that delivers measurable results.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">Start a project</Button>
          <Button
            href="/projects"
            variant="secondary"
            className="bg-[var(--foreground)]/5 dark:bg-white/10 dark:hover:bg-white/20"
          >
            See past work
          </Button>
        </div>
      </Container>
    </section>
  );
}
