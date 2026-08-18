# TechWithTop — full code breakdown and security check

This replaces the shorter summary version. Every function, component, and file is listed with what it actually does. The security section at the end is a real audit, not a guess: it covers dependency vulnerabilities, headers, injection points, and data handling, with a priority-ordered action list.

---

## Part 1: What runs where

Three folders hold almost all the logic:

- **`lib/`** — small, framework-independent helper functions. No UI, just logic.
- **`components/`** — the visual building blocks (React components).
- **`app/`** — the actual pages, each one wiring `lib/` and `components/` together.

`content/` holds the raw text/data (projects, services, blog posts, FAQ). `types/` describes the shape that data must follow.

---

## Part 2: `lib/` — every function

### `lib/site-config.ts`
- **`siteConfig`** — one object holding every site-wide value: name, tagline, nav links, social links, legal company info, and three external integration URLs (Formspree contact-form endpoint, Calendly booking link, a Google Form link). `formspreeEndpoint` and `siteConfig.url` are built from environment variables at build time, with safe fallback placeholder values if those variables aren't set.
- **`isPlaceholderUrl(url)`** — returns `true` if a URL still contains the text `REPLACE_ME`. Used everywhere the site needs to hide a feature that isn't configured yet (e.g. don't show a "Book a call" button if no real Calendly link has been set).

### `lib/metadata.ts`
- **`buildMetadata({title, description, path, ogImage})`** — every page calls this once to generate its browser tab title, meta description, canonical URL, and the preview card shown when a link is shared on social media. One function, reused by every page, so all pages behave consistently.

### `lib/mdx.ts` (blog post reading)
- **`readPostFile(filename)`** — reads one blog post file off disk and splits it into its frontmatter (title, date, etc.) and its actual written content.
- **`getAllPosts()`** — reads every blog post file, sorts them newest-first, and returns just the summary info (used for the blog listing page).
- **`getPostBySlug(slug)`** — reads one specific blog post by its URL slug. Returns `null` if it doesn't exist, which the page uses to show a 404.
- *Flagged in the security section below*: this function builds a file path directly from the URL, which is a pattern worth tightening even though it's low-risk here.

### `lib/theme.ts` (dark mode)
- **`subscribe(listener)`** — lets a component "listen" for theme changes.
- **`getSnapshot()`** — checks whether dark mode is currently on, by reading the page's own HTML tag.
- **`setDarkMode(dark)`** — the function the moon/sun button calls. Flips dark mode on or off, remembers the choice, and tells every listening component to re-render.
- **`isNightTime(date)`** — simple check: is it between 7pm and 7am?
- **`msUntilNextThemeBoundary(date)`** — calculates exactly how many milliseconds until the next 7am or 7pm, so the site can schedule one single timer instead of constantly checking the clock.
- **`applyTimeBasedPreference()`** — switches the theme automatically based on time of day, but only if the visitor hasn't manually picked a theme themselves.

### `lib/cookie-consent.ts`
Same pattern as `theme.ts`, but for the cookie consent banner: remembers whether a visitor clicked "Accept" or "Decline," and lets the analytics script check that choice before loading.

### `lib/cn.ts`
- **`cn(...)`** — a tiny utility that safely combines multiple sets of style classes into one, without conflicts. Used in almost every component.

### `lib/og-image.tsx`
- **`buildOgImageResponse(title, subtitle)`** — generates the preview image shown when a page link is pasted into Slack, Twitter, iMessage, etc. It's built automatically from text, not designed by hand in an image editor, so it can never go out of date with the actual page content.

---

## Part 3: `components/` — every function

### Layout pieces
- **`Header.tsx`** — the top navigation bar. Knows which nav link is "active" based on the current page, and controls the mobile hamburger menu open/close state.
- **`Footer.tsx`** — the bottom of every page. Automatically hides social links and company registration details that haven't been filled in yet (see `isPlaceholderUrl` above).

### Reusable UI pieces (`components/ui/`)
- **`Button.tsx`** — one button component used everywhere. Automatically becomes a link if given a `href`, or a real clickable button otherwise, so the rest of the code never has to think about which one to use.
- **`Container.tsx`** — just adds consistent max-width and side padding. Used to wrap almost every section on the site.
- **`SectionHeading.tsx`** — the "eyebrow label + big title + description" pattern seen at the top of most sections.
- **`Accordion.tsx`** — the expandable FAQ list on the Research page. Opens one question at a time.
- **`AnimatedCard.tsx` / `AnimatedSection.tsx`** — make cards and sections fade and slide into view as you scroll down, using the Framer Motion library. Automatically turns itself off for visitors who've asked their device to reduce motion.
- **`ThemeToggle.tsx`** — the actual sun/moon button in the header; calls `setDarkMode()` from `lib/theme.ts` above.
- **`ThemeWatcher.tsx`** — invisible component that sits in the background and automatically flips the theme at exactly 7am/7pm if a tab is left open across that boundary.
- **`CookieConsentBanner.tsx`** — the "we use Plausible analytics" popup. Disappears permanently once a choice is made.
- **`PlausibleAnalytics.tsx`** — only loads the actual analytics script if the visitor clicked "Accept" on the banner above. If they haven't decided yet, or declined, nothing loads at all.
- **`SocialIcons.tsx`** — the GitHub/LinkedIn/Twitter icon shapes, hand-drawn as code rather than downloaded images.
- **`SectionDivider.tsx`** — the thin blurred line between page sections. Purely decorative.

### Home page pieces (`components/home/`)
- **`Hero.tsx`** — the big heading at the top of the home page. No logic, just content.
- **`ServicesSummary.tsx`** — pulls the services list from `content/services.ts` and displays it.
- **`FeaturedProjects.tsx`** — shows only the first 3 projects from `content/projects.ts` as a teaser.
- **`CTASection.tsx`** — the "Ready to cut the busywork..." banner. Decides whether its button links to Calendly or the contact page, depending on whether a real Calendly link has been set up.

### Projects pieces (`components/projects/`)
- **`ProjectCard.tsx`** — the single most detailed component on the site. For each project it: picks an icon based on the industry, picks a background color if there's no real screenshot yet, checks whether the image is a real photo (`.jpg`/`.png`) versus a hand-drawn placeholder mockup (`.svg`) to decide whether to add a subtle brand-color tint, and shows a "Concept visual" label only on the placeholder ones.
- **`ProjectGrid.tsx`** — arranges a list of projects into the card grid layout.

### Contact pieces (`components/contact/`)
- **`ContactForm.tsx`** — the most important interactive piece on the site. It:
  1. Keeps track of what's typed into each field.
  2. Checks the form before sending: name isn't empty, email looks like an email, message isn't empty, and the privacy checkbox is ticked.
  3. If everything checks out, sends the data directly from the visitor's browser to Formspree (a third-party form-handling service) — there's no server code on this site that ever sees the message.
  4. Shows a loading state while sending, then either a success message or an error message.
  5. Automatically resets itself back to a blank form 5 seconds after a successful send.
- **`InterviewCTA.tsx`** — the "prefer to talk instead?" Calendly panel. Hides itself completely if no real Calendly link is set.

### Blog pieces (`components/blog/`)
- **`BlogList.tsx` / `BlogPostCard.tsx`** — list and format individual blog post previews.

### Research pieces (`components/research/`)
- **`ResearchBrief.tsx`** — a download button for the research PDF.
- **`GoogleFormEmbed.tsx`** — **this one is dead code.** It's fully written but never actually used on any page. It was built for a "contribute to our research" form embed that was removed from the site by request, and the component was intentionally left in place in case it's needed again later.

---

## Part 4: `app/` — every page

Each page follows the same basic shape: set the page's title/description (`metadata`), then render the actual content, usually built from `content/` data and `components/` pieces.

- **`app/layout.tsx`** — the wrapper around every single page. Sets up fonts, injects the dark-mode script that runs before the page is even visible (so there's no flash of the wrong theme), adds structured business info for search engines, and renders the Header/Footer/cookie banner on every page.
- **`app/page.tsx`** — the Home page. Just stacks the Hero, Services summary, Featured projects, and CTA sections in order.
- **`app/about/page.tsx`, `app/contact/page.tsx`, `app/services/page.tsx`** — mostly static content pages built from hardcoded text and the `content/` files.
- **`app/projects/page.tsx`** — shows every project.
- **`app/projects/[slug]/page.tsx`** — the `[slug]` in the folder name means Next.js automatically builds a separate page for every project, using its ID in the web address. Looks up the matching project, shows its full case study, and only shows a video player if that specific project has a `video` field set.
- **`app/blog/page.tsx`** — lists every blog post.
- **`app/blog/[slug]/page.tsx`** — same pattern as projects: one automatic page per blog post file, built from the real file content.
- **`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/cookies/page.tsx`, `app/accessibility/page.tsx`** — static legal pages.
- **`app/sitemap.ts` / `app/robots.ts`** — automatically tell search engines every page that exists on the site (built from the same project/blog data as the real pages, so it's always accurate).
- **`app/*/opengraph-image.tsx`** (one per section) — automatically generates the social-media preview image for that specific page.

---

## Part 5: Is the website secure enough?

**Short answer: yes, for what this site actually is.** It's a static marketing site: no login, no database, no admin panel, no server code that touches sensitive data. That alone removes most of the ways a site like this normally gets attacked. What I checked, and what I found:

### ✅ Already solid

- **Strong security headers are already configured** in `next.config.ts`, applied to every single page:
  - A real Content-Security-Policy that blocks the site from being embedded in someone else's page, blocks scripts from loading off unapproved domains, and blocks the page from being framed by another site (clickjacking protection).
  - `Strict-Transport-Security` forces HTTPS.
  - `X-Content-Type-Options` and `X-Frame-Options` are both set correctly.
  - `Permissions-Policy` explicitly blocks camera/microphone/location access, which this site never needs.
- **No secrets are exposed anywhere.** I checked the entire codebase and the git history convention: no API keys, passwords, or tokens are hardcoded. The `.env.local` file (which holds the real Formspree ID and site URL) is correctly excluded from git, and the values that *are* public (the Formspree form ID, the Google verification code) are meant to be public — they're not secrets by design.
- **No dangerous code execution.** There's no `eval()` in the actual site code (only a comment explaining it's needed briefly during local development, never in the live site). There are 3 places the code injects raw HTML directly (`dangerouslySetInnerHTML`), but all three only ever insert search-engine metadata built from your own hardcoded content, never anything a visitor typed in. That's a normal, standard pattern for this kind of structured data.
- **The contact form doesn't create any risk to the site itself.** It sends data straight from the visitor's browser to Formspree; nothing typed into that form is ever stored, displayed back, or processed by any code you control.
- **Cookie/consent handling is honest and correctly implemented.** The analytics script genuinely doesn't load until a visitor clicks "Accept," matching exactly what the Cookie Policy page claims.

### ⚠️ Needs attention

1. **Four known security vulnerabilities in dependencies (npm packages), all fixable.** Running a scan found high-severity issues in `nanoid`, `postcss`, `sharp`, and `next` itself. These are all fixed by updating to newer versions:
   - Running `npm audit fix` resolves the `nanoid` issue immediately, no side effects.
   - The `postcss`/`sharp`/`next` issues are fixed by upgrading Next.js from `16.2.11` to `16.3.0` (already released, a routine patch update, not a major version jump).
   - **Recommended action:** run `npm audit fix`, then update `next` and `eslint-config-next` to `16.3.0` in `package.json`, then re-run the test suite and build to confirm nothing broke.

2. **One page builds a file path directly from the web address, which is worth tightening.** The blog page (`app/blog/[slug]/page.tsx`) looks up a post file using whatever text appears in the URL. Right now, if someone requested a blog URL that doesn't correspond to a real post, the code would still attempt to look for a matching file on the server before giving up and showing "not found." In practice this isn't exploitable in any damaging way here (there's nothing sensitive to find, and the file extension is fixed), but it's an easy, free fix.
   - **Recommended action:** add one line, `export const dynamicParams = false;`, to that page. This tells the site to instantly reject any blog URL that wasn't one of the real posts at build time, without ever touching the file system for a made-up address.

3. **The contact form has no spam protection built into this site's own code.** Formspree (the third-party service it sends to) does have its own spam filtering, but there's nothing here (like a honeypot field) adding a first layer of defense.
   - **Recommended action:** optional, low priority. If spam becomes a real problem, add a hidden honeypot field or enable Formspree's built-in reCAPTCHA option in their dashboard.

### 📋 Not a security issue, but worth knowing about

- **Several placeholder values still need to be filled in before this is fully "production real":** the company registration number, registered address, and social media links are all still placeholder text (`REPLACE_ME`). The site correctly hides these from visitors until they're filled in, so nothing broken is currently showing, but they should be set before treating the site as fully launched.
- **The `GoogleFormEmbed` component is unused, dead code.** It's not a security risk (it doesn't render anywhere), just worth knowing it exists and isn't doing anything right now.
- **If `NEXT_PUBLIC_SITE_URL` is ever left unset in production,** the site will silently fall back to using `https://example.com` for its canonical links, sitemap, and social preview images, instead of failing loudly. Worth double-checking this is set correctly in the Vercel project settings.

### Bottom line

For a site with no logins, no database, and no server-side processing of sensitive data, this is a well-configured setup — the security headers alone put it ahead of a lot of production sites. The one thing I'd genuinely act on soon is the dependency update (it's a five-minute fix for four flagged vulnerabilities); everything else is optional hardening or pre-launch cleanup, not an active risk.
