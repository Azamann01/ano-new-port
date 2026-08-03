import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Page not found",
    description: "The page you're looking for doesn't exist or may have moved.",
    path: "/404",
  }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="section-glow relative flex flex-col items-center gap-6 overflow-hidden py-24 text-center sm:py-32">
      <AnimatedSection className="flex flex-col items-center gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">404</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="max-w-md text-base text-[var(--muted)] sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </AnimatedSection>
    </Container>
  );
}
