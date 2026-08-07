import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of the TechWithTop website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading level="h1" eyebrow="Legal" title="Terms of Service" />
        <p className="mt-3 text-sm text-[var(--muted)]">Last updated: 3 August 2026</p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection
        delay={0.05}
        className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]"
      >
        <article>
          <h2>Scope</h2>
          <p>
            These terms govern your use of this website only. They don&apos;t form a contract for
            any technology development, consulting, or other services: any client engagement with{" "}
            {siteConfig.companyName} is governed by a separate agreement entered into directly with
            you.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content on this website, including text, graphics, and case study material, is
            owned by {siteConfig.companyName} unless otherwise credited, and may not be reproduced
            without permission.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You agree not to misuse this website: no attempting to gain unauthorised access to it,
            interfering with its operation, or using it to transmit unlawful content.
          </p>

          <h2>Third-party links and embeds</h2>
          <p>
            This site links to or embeds third-party services, including Calendly (scheduling),
            Formspree (contact form delivery), and Plausible (analytics). We aren&apos;t
            responsible for the content, availability, or practices of these third parties, which
            are governed by their own terms.
          </p>

          <h2>Liability</h2>
          <p>
            This website is provided &ldquo;as is.&rdquo; We don&apos;t guarantee it will be
            uninterrupted or error-free, and to the extent permitted by law we aren&apos;t liable
            for any loss arising from your use of it.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </article>
      </AnimatedSection>
    </Container>
  );
}
