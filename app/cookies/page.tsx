import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "What cookies and similar technologies this website uses, and why.",
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
            None, currently. This website doesn&apos;t use any analytics, advertising, or tracking
            cookies. Your light/dark theme preference is stored in your browser&apos;s{" "}
            <code>localStorage</code>, which is not a cookie: it&apos;s only ever read by this
            site, on your device, and is never transmitted anywhere.
          </p>

          <h2>Third-party cookies</h2>
          <p>
            Our Research page embeds a Google Form in an iframe. Loading that embed can set
            cookies belonging to Google, under Google&apos;s own cookie policy, independent of
            this website&apos;s code and outside our control. This happens if you visit the
            Research page, regardless of the choice you make in the cookie banner, since the
            iframe itself is what triggers it.
          </p>

          <h2>The consent banner</h2>
          <p>
            You may see a banner on your first visit asking you to accept or decline cookies. Right
            now there is nothing to opt in or out of beyond what&apos;s described above. The
            banner exists so that if we add analytics in future, your choice is already recorded
            and respected rather than us needing to ask again. Your choice is stored in{" "}
            <code>localStorage</code> under the key <code>cookie-consent</code>.
          </p>

          <h2>Changes</h2>
          <p>
            If we start using analytics or advertising cookies, this page will be updated first to
            list exactly what&apos;s set, by whom, and for how long.
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
