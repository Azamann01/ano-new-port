import type { NextConfig } from "next";

// Calendly is an outbound link (target="_blank"), not an iframe embed, and
// the Research page's Google Form embed was removed (see CLAUDE.md) — so
// there's currently nothing on this site that needs to be framed or that
// frames third-party content, which keeps this CSP simple. Revisit
// frame-src/frame-ancestors if either comes back.
// React's dev-mode Fast Refresh needs eval() for stack-frame remapping —
// harmless since it's dev-only (React never uses eval() in production) —
// but it trips this CSP locally without an explicit allowance.
const scriptSrc = ["'self'", "'unsafe-inline'", "https://plausible.io"];
if (process.env.NODE_ENV !== "production") scriptSrc.push("'unsafe-eval'");

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next's inline hydration/theme-init scripts and Framer Motion's inline
  // style attributes require 'unsafe-inline'; a nonce-based policy would
  // need middleware this static marketing site doesn't otherwise need.
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io https://formspree.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;
