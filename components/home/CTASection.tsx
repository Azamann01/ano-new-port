import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { isPlaceholderUrl, siteConfig } from "@/lib/site-config";

export function CTASection() {
  const calendlyReady = !isPlaceholderUrl(siteConfig.calendlyUrl);

  return (
    <section className="section-glow relative overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="surface-container flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to cut the busywork out of your operations?
          </h2>
          <p className="max-w-lg text-[var(--container-muted)]">Let&apos;s talk.</p>
          <Button
            href={calendlyReady ? siteConfig.calendlyUrl : "/contact"}
            target={calendlyReady ? "_blank" : undefined}
            rel={calendlyReady ? "noopener noreferrer" : undefined}
            variant="secondary"
            className="bg-white text-black hover:bg-white/90"
          >
            {calendlyReady ? "Book a call" : "Get in touch"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
