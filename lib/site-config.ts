export const siteConfig = {
  name: "TechWithTop",
  tagline: "Helping SMEs work smarter with technology",
  description:
    "I help businesses simplify operations by developing custom software — practical tools that remove busywork and let your team focus on what matters.",
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
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
  },

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
