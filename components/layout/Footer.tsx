import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

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

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-[var(--border)] py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[var(--container)]">
          {siteConfig.email}
        </a>
      </Container>
    </footer>
  );
}
