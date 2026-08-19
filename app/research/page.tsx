import {
  Briefcase,
  Building2,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Accordion } from "@/components/ui/Accordion";
import { ResearchBrief } from "@/components/research/ResearchBrief";
import { faq } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Research",
  description:
    "Ongoing research into where SMEs lose the most time to manual processes and where custom technology actually pays off.",
  path: "/research",
  ogImage: "/research/opengraph-image",
});

// Curated per-industry gradients standing in for real photography — there's no
// image-generation tool available in this environment (see CLAUDE.md's
// "Known environment limitation" note), so each card gets a distinct,
// deterministic gradient icon badge instead, matching the same disclosed
// stand-in convention used for the Projects cards' cover art.
//
// The description text below is deliberately not dressed up as formal
// per-industry statistics: real, checkable research at this level of
// specificity is scarce (a lot of what circulates online turns out to be
// vendor-blog content citing invented or misattributed surveys — verified
// and rejected a few examples of exactly that while researching this page).
// These are honest, informed observations from scoping projects in each
// industry and are labelled as such in the section intro below.
const industryFindings: { label: string; icon: LucideIcon; gradient: string; description: string }[] = [
  {
    label: "Home Services",
    icon: Wrench,
    gradient: "from-amber-400 via-orange-400 to-rose-400",
    description:
      "Scheduling and dispatch are still coordinated by phone for a lot of independent trades businesses: a technician's day gets built and rebuilt over calls and texts instead of a shared board. Call volume isn't slowing down either. Almost a third of privately rented homes in England (32%) were built before 1919 and older housing stock generally means more repairs, not fewer, according to the government's 2024 English Housing Survey.",
  },
  {
    label: "Retail",
    icon: ShoppingBag,
    gradient: "from-fuchsia-500 via-pink-400 to-rose-300",
    description:
      "For small multi-location retailers, the recurring time sink is inventory reconciliation: keeping stock counts consistent between a point-of-sale system and an online store when the two aren't connected usually means someone manually checking and adjusting numbers at the end of each day, or discovering the mismatch only after a customer has already bought something that wasn't actually in stock.",
  },
  {
    label: "Professional Services",
    icon: Briefcase,
    gradient: "from-sky-400 via-blue-400 to-indigo-500",
    description:
      "Client onboarding at firms like accounting practices and consultancies is still commonly run through email: documents requested one at a time, chased individually and tracked in an inbox rather than a shared checklist. The bottleneck usually isn't any single document. It's the back-and-forth needed to collect all of them.",
  },
  {
    label: "Real Estate",
    icon: Building2,
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    description:
      "Maintenance requests for rental properties typically arrive through a mix of phone calls, texts and emails, with no single record of what was reported, assigned, or resolved. That makes a simple question hard to answer: how many requests are open right now and how long has each one been waiting?",
  },
  {
    label: "Hospitality",
    icon: UtensilsCrossed,
    gradient: "from-orange-400 via-amber-300 to-yellow-300",
    description:
      "Ordering between restaurants and their suppliers still runs largely on phone calls: a kitchen calls in an order, a supplier confirms it verbally and neither side has a shared, live record of what was actually agreed. When an order is wrong or late, resolving it means another phone call rather than simply checking its status.",
  },
  {
    label: "Logistics",
    icon: Truck,
    gradient: "from-violet-500 via-indigo-400 to-sky-400",
    description:
      "For smaller logistics and delivery operations, shipment status often lives in whichever system last touched it: a driver's text, a dispatcher's spreadsheet, a customer's email. Reliably knowing where a shipment actually is usually means checking several places by hand rather than one shared source of truth.",
  },
];

export default function ResearchPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-16 py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }),
        }}
      />
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Research"
          title="What's actually costing SMEs the most time?"
          description="We're running ongoing research into where manual processes cost small and midsize businesses the most: time, money, errors and where custom technology realistically pays off."
        />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.05} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Purpose of this research</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          Most advice about &ldquo;digital transformation&rdquo; is written for enterprises with dedicated IT
          teams and large budgets. This research is focused specifically on UK SMEs, building an honest,
          practical picture of where custom technology is worth the investment and where it isn&apos;t.
        </p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">What we&apos;re finding so far</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          Across the SMEs we talk to, the same pattern keeps showing up: work that should take
          minutes stretches into hours because it still runs through phone calls, spreadsheets and
          manual re-entry between systems that don&apos;t talk to each other. That matches the UK
          data too: a{" "}
          <a
            href="https://retailtimes.co.uk/amex-sme-barometer-small-business-owners-spend-nearly-twice-the-time-on-admin-than-growing-their-business/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--container)]"
          >
            July 2026 survey of 1,000 UK micro, small and medium-sized business owners
          </a>
          , run by American Express with Small Business Saturday UK, found they spend an average of
          11 hours a week on admin and finance-related tasks (around six working days a month),
          nearly twice what they spend on sales and business development (3.6 days a month). And 54%
          said paperwork gets in the way of running their business.
        </p>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          A similar pattern shows up elsewhere too: in the US, a{" "}
          <a
            href="https://erp.intuit.com/blog/research/business-solutions-survey-2024/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--container)]"
          >
            2024 survey of 630 small business owners and executives
          </a>{" "}
          found manual data entry and reconciling information across different apps eats an average
          of 25 hours a week, with 91% saying it undermines their productivity.
        </p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.15} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Where the time actually goes, industry by industry</h2>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            Reliable, industry-specific research at this level of detail is scarce. A lot of what
            circulates online turns out to be marketing content citing surveys that don&apos;t
            actually exist. What&apos;s below is an honest mix of the data above and the patterns we
            consistently see scoping projects in each industry, not a formal, industry-by-industry
            study.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {industryFindings.map(({ label, icon: Icon, gradient, description }, index) => (
            <AnimatedCard key={label} index={index}>
              <div className="surface-container flex h-full flex-col gap-3 rounded-2xl p-5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
                >
                  <Icon aria-hidden strokeWidth={1.5} className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-[var(--container-foreground)]">{label}</h3>
                <p className="text-sm text-[var(--container-muted)]">{description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.15}>
        <ResearchBrief />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.2} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <Accordion items={faq} />
      </AnimatedSection>
    </Container>
  );
}
