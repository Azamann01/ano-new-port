import { Hero } from "@/components/home/Hero";
import { ServicesSummary } from "@/components/home/ServicesSummary";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CTASection } from "@/components/home/CTASection";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Custom Software for SMEs",
  description:
    "Helping small and mid-sized businesses work smarter with practical, custom-built software.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSummary />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}
