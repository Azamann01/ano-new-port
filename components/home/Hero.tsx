import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="section-glow hero-glow relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Your operations shouldn&apos;t run on spreadsheets and phone calls
        </h1>
        <p className="max-w-2xl text-lg text-[var(--muted)] dark:text-white/90">
          We build custom technology around the way your business already works, cutting out the
          manual steps that quietly eat your team&apos;s week.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/projects">See past work</Button>
        </div>
      </Container>
    </section>
  );
}
