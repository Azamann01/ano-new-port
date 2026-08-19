import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description: "Our approach to making this website accessible and how to report an issue.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading level="h1" eyebrow="Legal" title="Accessibility Statement" />
        <p className="mt-3 text-sm text-[var(--muted)]">Last updated: 3 August 2026</p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection
        delay={0.05}
        className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]"
      >
        <article>
          <p>
            The Public Sector Bodies Accessibility Regulations 2018 don&apos;t apply to{" "}
            {siteConfig.companyName}, a private company. This statement isn&apos;t a legal
            requirement. We&apos;re publishing it because we think accessibility is worth doing
            well and we&apos;re voluntarily aiming for WCAG 2.1 AA.
          </p>

          <h2>What we&apos;ve done</h2>
          <ul>
            <li>Every interactive element is a real, keyboard-focusable button or link, not a click handler on a generic element.</li>
            <li>A visible focus ring appears on every interactive element when navigating by keyboard.</li>
            <li>Images have descriptive alt text.</li>
            <li>Animations respect your operating system&apos;s &ldquo;reduce motion&rdquo; setting.</li>
            <li>Text and background colours are checked against WCAG AA contrast requirements.</li>
            <li>A &ldquo;skip to content&rdquo; link is available at the top of every page for keyboard and screen reader users.</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Some content on this site is embedded from third parties we don&apos;t control: the
            Calendly booking widget and the Formspree-powered contact form delivery. Their
            accessibility is governed by those providers, not by us.
          </p>

          <h2>Reporting an issue</h2>
          <p>
            If you hit an accessibility barrier anywhere on this site, we&apos;d like to know.
            Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with the page and a
            description of the problem. We&apos;ll look into it.
          </p>
        </article>
      </AnimatedSection>
    </Container>
  );
}
