@AGENTS.md

# Ano — Custom Software Studio Site

Marketing site for a solo custom-software developer/studio. Pitch: "Helping SMEs work smarter with practical software." Built with Next.js (App Router, TypeScript) + Tailwind CSS v4, styled/interaction-wise after codewithbeto.dev but with entirely original content for this business.

## Stack

- Next.js (App Router, Turbopack), TypeScript, React
- Tailwind CSS v4 (CSS-based config via `@theme`/`@plugin` in `app/globals.css` — there is no `tailwind.config.ts`)
- Framer Motion — scroll-triggered card/section animations
- `next-mdx-remote/rsc` + `gray-matter` — static MDX blog posts
- `lucide-react` — icons
- `clsx` + `tailwind-merge` (via `lib/cn.ts`) — conditional classnames
- `@tailwindcss/typography` — prose styling for blog post body

No CMS, no database, no auth, no custom API routes. The contact form posts client-side directly to a Formspree-style endpoint.

## Folder structure

```
app/
  layout.tsx          root layout: fonts, Header/Footer, default metadata
  page.tsx            Home
  globals.css         Tailwind v4 theme, gradient utilities, typography plugin
  sitemap.ts          dynamic sitemap (static routes + project + blog slugs)
  robots.ts
  opengraph-image.tsx dynamic OG image (next/og ImageResponse) used as default OG image
  about/page.tsx
  services/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  research/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  contact/page.tsx

components/
  layout/            Header (nav + mobile menu), Footer
  ui/                Container, Button, SectionHeading, AnimatedCard, AnimatedSection, Accordion
  home/              Hero, ServicesSummary, FeaturedProjects, CTASection
  projects/          ProjectCard, ProjectGrid (shared by Projects page + Home teaser)
  services/          ServiceCard
  research/          ResearchBrief, GoogleFormEmbed, InterviewCTA
  blog/              BlogList, BlogPostCard
  contact/           ContactForm

content/
  services.ts        typed Service[] data
  projects.ts         typed ProjectCaseStudy[] data (4 seeded case studies)
  faq.ts              typed FAQItem[] data (Research page FAQ)
  blog/*.mdx           3 seeded placeholder posts with frontmatter (title, date, excerpt, author)

lib/
  site-config.ts     site name/nav/social + placeholder external URLs (see below)
  metadata.ts        buildMetadata() helper for per-page Next Metadata
  mdx.ts             getAllPosts() / getPostBySlug() — reads content/blog/*.mdx at build time
  cn.ts              clsx + tailwind-merge helper

types/index.ts       Service, ProjectCaseStudy, FAQItem, BlogPost(Meta) types
```

## Key implementation notes

- **Scroll animations**: `components/ui/AnimatedCard.tsx` uses Framer Motion's `whileInView` (not manual IntersectionObserver), `viewport={{ once: true, amount: 0.25 }}`, and a per-index stagger delay capped at 0.4s. Grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` so on mobile each card fires its own in-view animation as the user scrolls — this is what produces the one-by-one animate-in feel on the Projects page (and Home's featured projects, and the Blog list). `useReducedMotion()` disables animation for accessibility. `AnimatedSection.tsx` is the non-staggered variant used for page sections (About, Research, etc.).
- **Tailwind v4**: this project has no `tailwind.config.ts`. Theme tokens (`--color-*`, `--font-*`) and the `@tailwindcss/typography` plugin are registered directly in `app/globals.css` via `@theme inline` and `@plugin`. Gradient look is driven by `.gradient-text` / `.gradient-bg` / `.mesh-glow` utility classes defined there.
- **Blog**: MDX files in `content/blog/` are read at build time via Node `fs` in `lib/mdx.ts` (Server Components only). `app/blog/[slug]/page.tsx` renders via `<MDXRemote source={...} />` from `next-mdx-remote/rsc`, with `generateStaticParams()` for static generation.
- **SEO**: `lib/metadata.ts` exports `buildMetadata()`, used by every page's `export const metadata` (or `generateMetadata()` for dynamic project/blog detail pages). `app/sitemap.ts` and `app/robots.ts` use Next's built-in `MetadataRoute` types. Default OG image is generated dynamically at `/opengraph-image` via `next/og`'s `ImageResponse` (no static PNG needed).
- **Contact form**: `components/contact/ContactForm.tsx` is a client component with an `idle | submitting | success | error` state machine, client-side validation (required fields + email regex), and a `fetch(..., { method: "POST" })` straight to `siteConfig.formspreeEndpoint`. No server route.

## Placeholders to replace before launch

All centralized in `lib/site-config.ts` and `.env.local.example`:

- `NEXT_PUBLIC_FORMSPREE_ID` — real Formspree form ID for the contact form to actually deliver mail
- `NEXT_PUBLIC_SITE_URL` — real production domain (used for canonical URLs, sitemap, OG metadata)
- `siteConfig.researchGoogleFormUrl` — real embedded Google Form URL on the Research page
- `siteConfig.calendlyUrl` — real Calendly (or similar) link for "Book an interview"
- `public/research-brief.pdf` — currently a minimal placeholder PDF; swap for the real research brief
- `content/projects.ts`, `content/services.ts`, `content/blog/*.mdx` — currently seeded/placeholder copy; swap for real case studies, services, and posts as they're ready
- `siteConfig.social` — placeholder GitHub/LinkedIn/Twitter links

## Commands

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build — verifies types + static generation for all routes
npm start        # serve the production build
```

## Verification done

- `npm run build` passes cleanly: all 7 top-level routes + 4 project detail pages + 3 blog post pages statically generated, `sitemap.xml` and `robots.txt` generated.
- Verified in-browser at mobile viewport (375×812): Projects grid animates cards in one-by-one on scroll, matching the reference site's mobile feel; contact form client-side validation shows per-field errors; blog MDX post renders with typography styling.
