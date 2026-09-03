import { Hero } from "@/components/home/Hero";
import { ServicesSummary } from "@/components/home/ServicesSummary";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CTASection } from "@/components/home/CTASection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { buildMetadata } from "@/lib/metadata";

export const metadata = {
  ...buildMetadata({
    title: "Custom Technology for SMEs",
    description:
      "Helping small and midsize businesses work smarter with practical, custom technology.",
    path: "/",
  }),
  // The root layout's title.template doesn't apply to a title set in the
  // root page (they're the same route segment — see Next.js's
  // generate-metadata docs on `template`), so the homepage's <title> would
  // otherwise render without the "| TechWithTop" suffix every other page
  // gets. `absolute` sets the literal <title> tag directly, bypassing that.
  title: { absolute: "Custom Technology for SMEs | TechWithTop" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <ServicesSummary />
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <CTASection />
    </>
  );
}
