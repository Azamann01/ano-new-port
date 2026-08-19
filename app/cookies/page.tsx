import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "What cookies and similar technologies this website uses and why.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading level="h1" eyebrow="Legal" title="Cookie Policy" />
        <p className="mt-3 text-sm text-[var(--muted)]">Last updated: 3 August 2026</p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection
        delay={0.05}
        className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]"
      >
        <article>
          <h2>Cookies we set</h2>
          <p>
            None. This website doesn&apos;t set any cookies of its own. Your light/dark theme
            preference is stored in your browser&apos;s <code>localStorage</code>, which is not a
            cookie: it&apos;s only ever read by this site, on your device and is never
            transmitted anywhere.
          </p>

          <h2>Analytics</h2>
          <p>
            If you accept analytics in the cookie banner, we load{" "}
            <a href="https://plausible.io" target="_blank" rel="noopener noreferrer">
              Plausible
            </a>
            , a privacy-focused analytics tool. Plausible doesn&apos;t use cookies or any other
            persistent identifiers, doesn&apos;t collect personal data and doesn&apos;t track you
            across different websites. It counts page views and aggregate visitor numbers only. If
            you decline, or don&apos;t choose, Plausible is never loaded.
          </p>

          <h2>Third-party cookies</h2>
          <p>
            We don&apos;t currently embed any third-party content that would set its own cookies.
            If that changes (for example, if we bring back an embedded form), this page will be
            updated first to describe it.
          </p>

          <h2>The consent banner</h2>
          <p>
            You&apos;ll see a banner on your first visit asking you to accept or decline analytics.
            Your choice is stored in <code>localStorage</code> under the key{" "}
            <code>cookie-consent</code> and controls only whether Plausible loads, described above.
          </p>

          <h2>Changes</h2>
          <p>
            If we start using any additional analytics, advertising, or tracking cookies, this
            page will be updated first to list exactly what&apos;s set, by whom and for how long.
          </p>

          <h2>Questions</h2>
          <p>
            Contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with any
            questions about this policy. See also our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </article>
      </AnimatedSection>
    </Container>
  );
}
