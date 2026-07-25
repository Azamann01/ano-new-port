import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="mesh-glow relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-[var(--muted)]">
          Custom software for growing businesses
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          <span className="gradient-text">Work smarter</span>, not harder —
          with software built for how your business actually runs.
        </h1>
        <p className="max-w-xl text-lg text-[var(--muted)]">
          {siteConfig.description}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">Start a project</Button>
          <Button href="/projects" variant="secondary">
            See past work
          </Button>
        </div>
      </Container>
    </section>
  );
}
