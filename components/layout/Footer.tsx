import Link from "next/link";
import { companyDetailsReady, isPlaceholderUrl, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "Twitter", href: siteConfig.social.twitter, icon: TwitterIcon },
].filter(({ href }) => !isPlaceholderUrl(href));

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight">{siteConfig.name}</p>
          <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
            {siteConfig.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-[var(--muted)] transition-colors hover:text-[var(--container)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-[var(--border)] py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {companyDetailsReady && (
            <p>
              {siteConfig.companyName} · Company No. {siteConfig.companyNumber} ·{" "}
              {siteConfig.registeredAddress}
            </p>
          )}
        </div>

        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {siteConfig.legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-1.5 transition-colors hover:text-[var(--container)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-md px-1 py-1.5 transition-colors hover:text-[var(--container)]"
        >
          {siteConfig.email}
        </a>
      </Container>
    </footer>
  );
}
