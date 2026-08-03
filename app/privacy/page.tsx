import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How TechWithTop Ltd collects, uses, and protects your personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading level="h1" eyebrow="Legal" title="Privacy Policy" />
        <p className="mt-3 text-sm text-[var(--muted)]">Last updated: 3 August 2026</p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection
        delay={0.05}
        className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]"
      >
        <article>
          <h2>Who we are</h2>
          <p>
            This website is operated by {siteConfig.companyName}, a company registered in England
            and Wales (company number {siteConfig.companyNumber}), with its registered office at{" "}
            {siteConfig.registeredAddress}. We&apos;re the data controller for the personal data
            described below. You can contact us at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <h2>What we collect and why</h2>
          <p>
            <strong>Contact form.</strong> When you use the contact form, we collect your name,
            email address, and message. This is used solely to respond to your enquiry. We rely on
            your consent (given via the checkbox on the form) and our legitimate interest in
            answering enquiries as the legal basis for processing this data.
          </p>
          <p>
            The form submits directly to our form provider, Formspree, Inc., who process and
            deliver the message to us as a data processor acting on our instructions. Formspree is
            a US-based third party; see their{" "}
            <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{" "}
            for how they handle data in transit.
          </p>
          <p>
            <strong>Research contribution form.</strong> The embedded form on our Research page is
            a Google Form. Any information you submit there goes directly to Google&apos;s servers
            under Google&apos;s own privacy policy. We don&apos;t control or process that data
            transfer; we only receive the responses you choose to submit.
          </p>
          <p>
            <strong>Theme preference.</strong> Your light/dark mode choice is stored in your
            browser&apos;s <code>localStorage</code>, not a cookie. It never leaves your device and
            isn&apos;t personal data.
          </p>
          <p>
            <strong>Analytics.</strong> We don&apos;t currently use any analytics or tracking
            tools. If that changes, this policy and our{" "}
            <a href="/cookies">Cookie Policy</a> will be updated first, and the choice you make in
            our cookie banner will govern whether analytics cookies are set.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Contact form enquiries and any resulting correspondence are kept for as long as
            reasonably necessary to handle your enquiry and any follow-up, and are then deleted.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR, you have the right to request access to, correction of, or deletion of
            your personal data, to object to or restrict our processing of it, and to data
            portability. To exercise any of these rights, email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. You also have the right
            to lodge a complaint with the{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              Information Commissioner&apos;s Office (ICO)
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be reflected by
            updating the &ldquo;last updated&rdquo; date above.
          </p>
        </article>
      </AnimatedSection>
    </Container>
  );
}
