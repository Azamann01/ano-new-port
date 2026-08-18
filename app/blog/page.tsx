import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical writing on custom technology, automation, and operations for small and midsize businesses.",
  path: "/blog",
  ogImage: "/blog/opengraph-image",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-12 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Insights"
          title="Notes On Technology, Automation And Operations"
          titleClassName="text-3xl sm:text-4xl"
          description="Short, practical writing. No jargon, no theory that doesn't hold up in a small business."
        />
      </AnimatedSection>

      <SectionDivider />

      <BlogList posts={posts} />
    </Container>
  );
}
