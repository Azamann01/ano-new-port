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
    "Ongoing research into where SMEs lose the most time to manual processes, and where custom technology actually pays off.",
  path: "/research",
  ogImage: "/research/opengraph-image",
});

// Curated per-industry gradients standing in for real photography — there's no
// image-generation tool available in this environment (see CLAUDE.md's
// "Known environment limitation" note), so each card gets a distinct,
// deterministic gradient background instead, matching the same disclosed
// stand-in convention used for the Projects cards' cover art.
const industries: { label: string; icon: LucideIcon; gradient: string }[] = [
  { label: "Home Services", icon: Wrench, gradient: "from-amber-400 via-orange-400 to-rose-400" },
  { label: "Retail", icon: ShoppingBag, gradient: "from-fuchsia-500 via-pink-400 to-rose-300" },
  { label: "Professional Services", icon: Briefcase, gradient: "from-sky-400 via-blue-400 to-indigo-500" },
  { label: "Real Estate", icon: Building2, gradient: "from-emerald-400 via-teal-400 to-cyan-500" },
  { label: "Hospitality", icon: UtensilsCrossed, gradient: "from-orange-400 via-amber-300 to-yellow-300" },
  { label: "Logistics", icon: Truck, gradient: "from-violet-500 via-indigo-400 to-sky-400" },
];

export default function ResearchPage() {
  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-16 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Research"
          title="What's actually costing SMEs the most time?"
          description="We're running ongoing research into where manual processes cost small and midsize businesses the most: time, money, and errors, and where custom technology realistically pays off."
        />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.05} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Purpose of this research</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          Most advice about &ldquo;digital transformation&rdquo; is written for enterprises with dedicated IT
          teams and large budgets. This research is focused specifically on SMEs, building an honest,
          practical picture of where custom technology is worth the investment, and where it isn&apos;t.
        </p>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay={0.1} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Industries involved</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {industries.map(({ label, icon: Icon, gradient }, index) => (
            <AnimatedCard key={label} index={index}>
              <div
                className={`group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-br px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${gradient}`}
              >
                <Icon
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-6 w-6 text-white drop-shadow transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-sm font-medium text-white drop-shadow">{label}</span>
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
