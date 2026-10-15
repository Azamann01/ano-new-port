import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="section-glow hero-glow relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Custom Technology Built Around How Your Business Already Works
        </h1>
        <p className="max-w-2xl text-lg text-[var(--muted)] dark:text-white/90">
          We Build Systems That Improve How Your Team Delivers, How Customers Experience It, And
          What It All Costs To Run.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/projects">See past work</Button>
        </div>
      </Container>
    </section>
  );
}
