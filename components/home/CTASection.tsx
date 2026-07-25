import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="gradient-bg flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center text-white">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to cut the busywork out of your operations?
          </h2>
          <p className="max-w-lg text-white/90">
            Tell me about your process and I'll tell you honestly whether custom software is the right fix.
          </p>
          <Button href="/contact" variant="secondary" className="border-white/40 bg-white text-[var(--foreground)] hover:bg-white/90">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
