export const siteConfig = {
  name: "TechWithTop",
  tagline: "Helping SMEs work smarter with technology",
  description:
    "We help businesses simplify operations by developing custom software: practical tools that remove busywork and let your team focus on what matters.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "projects@topewilson.tech",
  location: "United Kingdom / Worldwide",

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  social: {
    github: "https://github.com/REPLACE_ME",
    linkedin: "https://linkedin.com/REPLACE_ME",
    twitter: "https://twitter.com/REPLACE_ME",
  },

  legalNav: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],

  companyName: "TechWithTop Ltd",
  companyNumber: "REPLACE_ME",
  registeredAddress: "REPLACE_ME, United Kingdom",

  // --- Placeholders: swap these for real values before launch ---
  formspreeEndpoint:
    process.env.NEXT_PUBLIC_FORMSPREE_ID
      ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
      : "https://formspree.io/f/REPLACE_ME",
  researchGoogleFormUrl:
    "https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true",
  calendlyUrl: "https://calendly.com/REPLACE_ME/interview",
  researchBriefPath: "/research-brief.pdf",
} as const;

/** True while a value still contains the repo's REPLACE_ME placeholder convention. */
export function isPlaceholderUrl(url: string): boolean {
  return url.includes("REPLACE_ME");
}
