import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="surface-container flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center text-black">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to cut the busywork out of your operations?
          </h2>
          <p className="max-w-lg text-black/80">
            Tell me about your process and I&apos;ll tell you honestly whether custom software is the right fix.
          </p>
          <Button href="/contact" variant="secondary" className="border-black/20 bg-white text-black hover:bg-white/90">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
