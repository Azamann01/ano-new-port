@AGENTS.md

# TechWithTop — Custom Software Studio Site

Marketing site for a solo custom-software developer/studio. Pitch: "Helping SMEs work smarter with technology." Built with Next.js (App Router, TypeScript) + Tailwind CSS v4. Brand name is **TechWithTop** (the repo/package is still named `ano-new-port` — that's just the project folder name, not shown anywhere on the site).

## Stack

- Next.js (App Router, Turbopack), TypeScript, React
- Tailwind CSS v4 (CSS-based config via `@theme`/`@plugin`/`@custom-variant` in `app/globals.css` — there is no `tailwind.config.ts`)
- Framer Motion — scroll-triggered card/section animations
- `next-mdx-remote/rsc` + `gray-matter` — static MDX blog posts
- `lucide-react` — icons
- `clsx` + `tailwind-merge` (via `lib/cn.ts`) — conditional classnames
- `@tailwindcss/typography` — prose styling for blog post body

No CMS, no database, no auth, no custom API routes. The contact form posts client-side directly to a Formspree-style endpoint.

## Folder structure

```
app/
  layout.tsx          root layout: fonts, blocking theme-init script, ThemeWatcher, Header/Footer, default metadata
  page.tsx            Home
  globals.css         Tailwind v4 theme tokens, dark mode, glass/glow utilities, scrollbar hiding
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
  layout/            Header (nav + mobile menu + ThemeToggle), Footer
  ui/                Container, Button, SectionHeading, AnimatedCard, AnimatedSection, Accordion,
                     ThemeToggle, ThemeWatcher, PhoneMockup, SectionDivider
  home/              Hero, ServicesSummary, FeaturedProjects, CTASection
  projects/          ProjectCard (renders as an interactive phone mockup), ProjectGrid, ProjectAppScreen
  services/          ServiceCard
  research/          ResearchBrief, GoogleFormEmbed, InterviewCTA
  blog/              BlogList, BlogPostCard
  contact/           ContactForm

content/
  services.ts        typed Service[] data (6 services, no sub-feature bullets — title + one-line description)
  projects.ts         typed ProjectCaseStudy[] data (4 seeded case studies)
  faq.ts              typed FAQItem[] data (Research page FAQ)
  blog/*.mdx           3 seeded placeholder posts with frontmatter (title, date, excerpt, author)

lib/
  site-config.ts     site name/nav/social + placeholder external URLs (see below)
  metadata.ts        buildMetadata() helper for per-page Next Metadata
  mdx.ts             getAllPosts() / getPostBySlug() — reads content/blog/*.mdx at build time
  theme.ts           dark-mode pub/sub store shared by ThemeToggle + ThemeWatcher (see below)
  cn.ts              clsx + tailwind-merge helper

types/index.ts       Service, ProjectCaseStudy, FAQItem, BlogPost(Meta) types
```

## Design system

All theming is driven by CSS custom properties in `app/globals.css`, swapped by a `.dark` class on `<html>` — **not** Tailwind's default `dark:` media-query variant. A `@custom-variant dark (&:where(.dark, .dark *));` is registered so `dark:` utility classes work correctly against that class (needed for one-off dark-specific overrides, e.g. the Hero's "See past work" button).

- `--background` / `--foreground` / `--muted`: flip between white/black in light mode and black/white in dark mode.
- `--border`: always equals `--foreground` (every remaining line on the site matches text color; borders were deliberately removed everywhere else — see below).
- `--container`: the brand color, `rgb(3 105 161)` (blue), **constant across both themes** — it has strong contrast against both white and black, so it never needs a dark-mode variant.
- `--container-foreground` / `--container-muted`: white / translucent-white text used on top of `--container` surfaces.
- `--nav-active`: the header's active-nav-item color. Tints to `--container` in light mode, but stays plain `--foreground` in dark mode (only the animated underline stays brand-colored there) — a deliberate choice so the active item doesn't look identical to the hover state in dark mode.

### Dark mode (automatic + manual)

- `app/layout.tsx` injects a blocking `<Script strategy="beforeInteractive">` that reads `localStorage.theme` (falls back to `prefers-color-scheme`) and adds `.dark` to `<html>` before paint, avoiding a flash of the wrong theme. `<html>` has `suppressHydrationWarning` since this script intentionally mutates the DOM before React hydrates (the standard, expected pattern for this — Next's dev-overlay still logs a harmless hydration diagnostic in dev mode because of it; this does not appear in production and doesn't affect functionality).
- `lib/theme.ts` is a tiny module-level pub/sub store (`subscribe`/`getSnapshot`/`getServerSnapshot`/`setDarkMode`/`applySystemPreference`) — the single source of truth for the current theme, read via React's `useSyncExternalStore` (not `useEffect` + `setState`, which trips a React hooks lint rule and risks hydration bugs). Both `localStorage` reads and writes are wrapped in try/catch (`readStoredTheme`/`writeStoredTheme`) — some browser privacy modes and enterprise policies make `localStorage` throw, and without the guard that would break the toggle's `onClick` mid-handler (the DOM class would flip but `notify()` would never run, leaving the icon/`aria-label` out of sync with the real theme).
- `components/ui/ThemeToggle.tsx`: the sun/moon button in the header. Calls `setDarkMode()`, which flips the class, persists an explicit `localStorage.theme` override, and notifies subscribers.
- `components/ui/ThemeWatcher.tsx`: rendered once in the root layout. Subscribes to the OS `prefers-color-scheme` `matchMedia` query and calls `applySystemPreference()` live — but only takes effect while **no** manual override is stored, so system-preference changes keep working automatically until the visitor explicitly toggles the theme themselves.

### Glass surfaces & ambient glow (performance-sensitive — read before changing)

- `.surface-container` (cards, buttons, badges, the phone-mockup screen, etc.): a translucent `--container` background + `box-shadow`, giving a "glass" look **without `backdrop-filter`**. An earlier version used `backdrop-filter: blur(16px)`, but with many cards stacked on one page this got expensive enough to cause real rendering/compositing failures during scroll (confirmed by DOM inspection while the visual `backdrop-filter` was present — the page was structurally fine, but the browser's compositor hung). Don't reintroduce `backdrop-filter` here without testing scroll performance on a page with several stacked cards.
- `.section-glow` (applied to `<section>`/`Container` wrappers via `relative overflow-hidden section-glow`): a soft ambient brand-color glow behind section content, done via a `::before` with two `radial-gradient`s and **no `filter: blur(...)`** — the gradient's own soft falloff gives the glow look. A real blur filter here (`filter: blur(60px)`, stacked across many sections each with `isolation: isolate`) previously hung the renderer during scroll for the same reason as above. Keep new ambient-background effects gradient-based, not blur-filter-based.
- `.bottom-scroll-blur` (one single fixed 96px-tall strip pinned to the viewport bottom) is the one place `backdrop-filter` is still used — it's a single instance, not stacked per-card/per-section, so it's cheap.
- `.blur-divider` (see Section dividers below) is the other place a real `filter: blur()` is used — it's safe specifically because it's confined to a 1px-tall strip, not a large area.

### No borders except the footer (FAQ accordion is the one exception)

Every border was deliberately removed from Header, Button (secondary/ghost use a `bg-[var(--foreground)]/5` tint instead of a border), form inputs (tint + `focus:ring` instead of `border`), card tag pills, etc. The footer's two `border-t border-[var(--border)]` dividers are the intentional exception, **and** the Research page's FAQ `Accordion` has `divide-y divide-white/15` between items by explicit request — don't remove that divider or add borders back elsewhere without checking this is still wanted.

### Section dividers (blurred lines segmenting a page)

`components/ui/SectionDivider.tsx` renders a `.blur-divider` — a thin gradient line with a soft blur, inserted between major sections on every page (Home, About, Services, Projects list + detail, Research, Blog list + post). The blur is deliberately only ever applied to a **1px-tall strip**, not a large area — that keeps it cheap. See the perf note below before making it bigger or applying blur to a larger element.

### Buttons

`components/ui/Button.tsx` has three variants: `primary` (`surface-container`, i.e. brand-blue fill), `secondary` (subtle `--foreground`-tinted background, no border), and `ghost` (text-only, tinted hover background). Radius is `rounded-md` (deliberately not pill-shaped/`rounded-full` — that was an earlier iteration). Buttons nested inside a `surface-container` parent generally need an explicit override (e.g. `bg-white text-black`) since the default `secondary`/`ghost` styles assume they're sitting on the plain page background, not another colored surface — check contrast by eye whenever adding a `Button` inside a card.

### Project cards render as interactive iPhone mockups

`components/projects/ProjectCard.tsx` no longer looks like a flat text card — it renders a `PhoneMockup` (pure-CSS iPhone frame: status bar, dynamic island, home indicator) containing a `ProjectAppScreen`, with the project title/summary/tags as a caption underneath. On hover the whole card lifts, tilts slightly, and scales up (`group-hover:-translate-y-2 group-hover:rotate-[-1deg] group-hover:scale-[1.03]`). Both the Projects page grid and Home's `FeaturedProjects` teaser use this via the shared `ProjectGrid`/`ProjectCard`.

`ProjectAppScreen` shows a gradient "cover" image (standing in for AI-generated art — there's no image-generation tool available in this environment, see the note below) with a small "✨ Generated" badge and the client name captioned over it, plus two thumbnail rows built from the project's real `results`/`tags` data. **`ProjectGrid` passes `index` down to `ProjectCard` → `ProjectAppScreen`** specifically so each project gets a different, stable gradient from the small `gradients` palette — an earlier version picked the gradient by hashing `project.slug`, but with only 4 gradients and 4 seeded projects, two slugs happened to hash to the same bucket and got identical covers. Keep using the list index (not a content hash) for this unless the palette grows enough to make collisions a non-issue.

## Key implementation notes

- **Scroll animations**: `components/ui/AnimatedCard.tsx` uses Framer Motion's `whileInView` (not manual IntersectionObserver), `viewport={{ once: true, amount: 0.25 }}`, and a per-index stagger delay capped at 0.4s. Grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` so on mobile each card fires its own in-view animation as the user scrolls. `useReducedMotion()` disables animation for accessibility. `AnimatedSection.tsx` is the non-staggered variant used for page sections.
- **Blog**: MDX files in `content/blog/` are read at build time via Node `fs` in `lib/mdx.ts` (Server Components only). `app/blog/[slug]/page.tsx` renders via `<MDXRemote source={...} />` from `next-mdx-remote/rsc`, with `generateStaticParams()` for static generation.
- **SEO**: `lib/metadata.ts` exports `buildMetadata()`, used by every page's `export const metadata` (or `generateMetadata()` for dynamic project/blog detail pages). `app/sitemap.ts` and `app/robots.ts` use Next's built-in `MetadataRoute` types. Default OG image is generated dynamically at `/opengraph-image` via `next/og`'s `ImageResponse`.
- **Contact form**: `components/contact/ContactForm.tsx` is a client component with an `idle | submitting | success | error` state machine, client-side validation (required fields + email regex), and a `fetch(..., { method: "POST" })` straight to `siteConfig.formspreeEndpoint`. No server route.

## Current page copy (source of truth — don't regress to older placeholder wording)

- **Home hero**: heading "Transforming Business Challenges into Practical Digital Solutions"; sub-copy "Smarter operations, Better decisions with Technology that delivers measurable results." No eyebrow badge/button above the heading — it was there briefly (a link to `/blog`) but was removed by request; don't re-add it without being asked.
- **About page**: heading "Technology should solve business problems—not create them."; a "How we work" 5-step list (Discover → Analyse → Design → Develop → Improve); a "Why Work With Me" panel ("I don't start with technology—I start with your business.").
- **Services page**: 6 services, each just a title + one-line description (no sub-bullet feature lists): Operational Discovery, Business Process Automation, Custom Business Systems, Operational Dashboards, Digital Transformation, MVP Development.

## Placeholders to replace before launch

All centralized in `lib/site-config.ts` and `.env.local.example`:

- `NEXT_PUBLIC_FORMSPREE_ID` — real Formspree form ID for the contact form to actually deliver mail
- `NEXT_PUBLIC_SITE_URL` — real production domain (used for canonical URLs, sitemap, OG metadata)
- `siteConfig.researchGoogleFormUrl` — real embedded Google Form URL on the Research page
- `siteConfig.calendlyUrl` — real Calendly (or similar) link for "Book free consultation"
- `public/research-brief.pdf` — currently a minimal placeholder PDF; swap for the real research brief
- `content/projects.ts`, `content/blog/*.mdx` — currently seeded/placeholder copy; swap for real case studies and posts as they're ready
- `siteConfig.social` — placeholder GitHub/LinkedIn/Twitter links

## Testing

Vitest + React Testing Library, configured in `vitest.config.ts` (jsdom environment, native tsconfig path-alias resolution via `resolve.tsconfigPaths`) and `vitest.setup.ts` (`@testing-library/jest-dom` matchers + an `IntersectionObserver` polyfill, since Framer Motion's `whileInView` needs one and jsdom doesn't provide it).

```bash
npm test         # run the full test suite once (CI mode)
npm run test:watch  # watch mode for local development
```

Test files live next to the code they cover, as `*.test.ts(x)`:

- `lib/mdx.test.ts` — `getAllPosts()`/`getPostBySlug()` against the real seeded `content/blog/*.mdx` files.
- `components/contact/ContactForm.test.tsx` — validation errors on empty/malformed submission, successful submit renders the confirmation state, failed submit shows the retry banner and preserves entered values. `fetch` is stubbed with `vi.stubGlobal`.
- `components/ui/AnimatedCard.test.tsx` — children render, the hidden/offset initial style is applied when motion is enabled, and skipped when `useReducedMotion` is mocked to return `true`. **Don't mock this via `window.matchMedia`** — Framer Motion reads `prefers-reduced-motion` once at module load and caches it internally; mock the `useReducedMotion` export from `framer-motion` directly instead.

### Conventions for new tests

- Import `describe`/`it`/`expect`/`vi` explicitly from `"vitest"` in every test file rather than relying on the `globals: true` config.
- Prefer Testing Library queries by role/label/text over test IDs.
- Add a test alongside any new component that has non-trivial logic (validation, conditional rendering, data transforms). Pure presentational components don't need dedicated tests.
- Run `npm test` and `npm run build`/`npm run lint` before considering a change done.

## Known environment limitation: no image generation or upload

This coding environment has no image-generation tool and no way to save an image a user pastes/shares in chat as an actual file on disk — there's no "download attachment" capability available. When a request asks for "AI generated pictures" or "uploaded screenshots" for the project cards, that can't be fulfilled literally yet. The current approach (see `ProjectAppScreen` above) is a CSS-gradient stand-in, explicitly labeled as such. If the user wants real images, they need to either place image files directly in the repo (e.g. `public/projects/`) and say so, or provide an actual reachable file path/URL — don't guess at files in unrelated folders (e.g. Desktop screenshots) without the user explicitly confirming which file belongs to which project.

## A note on external/unexplained edits

Several times in this project's history, files in the working tree have shown up mutated between turns in ways nobody asked for — e.g. every instance of "process" silently replaced with "project" (breaking `process.cwd()`/`process.env` and mangling copy), and separately every instance of "custom software" replaced with the nonsensical "Custom Ideal" (plus some stray em-dashes/hyphens stripped from blog prose). These were identified by comparing against what was just written/committed and reverted since they broke code or produced ungrammatical text — they were not legitimate content changes. If you find copy on this site that doesn't quite parse (a noun phrase that doesn't make sense, a missing dash where one obviously belongs), treat it as suspect and check the surrounding context before assuming it was intentional.

## Commands

```bash
npm run dev          # local dev server (Turbopack)
npm run build        # production build — verifies types + static generation for all routes
npm start             # serve the production build
npm test              # run the test suite once
npm run test:watch   # test suite in watch mode
```

## Verification done

- `npm run build` passes cleanly: all 7 top-level routes + 4 project detail pages + 3 blog post pages statically generated, `sitemap.xml` and `robots.txt` generated.
- `npm test` passes: 15 tests across `lib/mdx.test.ts`, `components/contact/ContactForm.test.tsx`, and `components/ui/AnimatedCard.test.tsx`.
- Verified in-browser in both light and dark mode, desktop and mobile: theme toggle (manual + live OS-preference sync, and now hardened against `localStorage` throwing), phone-mockup project cards with distinct per-project gradient covers and their hover interaction, glass/glow surfaces, borderless UI (except the footer and FAQ accordion dividers), the section dividers between page sections, and the current Home/About/Services copy all render and behave as described above.
