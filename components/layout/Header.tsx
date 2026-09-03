"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

function isNavItemActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/70 shadow-sm backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between pl-3 sm:pl-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive}
                className={cn(
                  "nav-link text-sm font-medium transition-colors hover:text-[var(--container)]",
                  isActive ? "text-[var(--nav-active)]" : "text-[var(--muted)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href="/contact" className="text-sm">
            Start a project
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-[var(--foreground)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 pb-6">
            {siteConfig.nav.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--foreground)]/5 hover:text-[var(--container)]",
                    isActive ? "text-[var(--nav-active)]" : "text-[var(--foreground)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-2 justify-center" onClick={() => setOpen(false)}>
              Start a project
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
