import { Hero } from "@/components/home/Hero";
import { ServicesSummary } from "@/components/home/ServicesSummary";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CTASection } from "@/components/home/CTASection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Custom Technology for SMEs",
  description:
    "Helping small and midsize businesses work smarter with practical, custom technology.",
  path: "/",
});

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
