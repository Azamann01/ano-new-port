import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { InterviewCTA } from "@/components/contact/InterviewCTA";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch to talk about a custom software project for your business.",
  path: "/contact",
  ogImage: "/contact/opengraph-image",
});

export default function ContactPage() {
  return (
    <Container className="section-glow relative overflow-hidden grid grid-cols-1 gap-14 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr]">
      <AnimatedSection className="flex flex-col gap-8">
        <SectionHeading
          level="h1"
          eyebrow="Contact"
          title="We're here to help you"
          description="Share what's slowing your team down and we'll follow up within a couple of business days."
        />
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
          >
            <Mail className="h-4 w-4" /> {siteConfig.email}
          </a>
          <p className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <MapPin className="h-4 w-4" /> {siteConfig.location}
          </p>
        </div>

        <InterviewCTA />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <ContactForm />
      </AnimatedSection>
    </Container>
  );
}
