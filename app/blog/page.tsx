import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical writing on custom software, automation, and operations for small and mid-sized businesses.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-12 py-20 sm:py-28">
      <AnimatedSection>
        <SectionHeading
          level="h1"
          eyebrow="Insights"
          title="Notes on software, automation, and operations"
          description="Short, practical writing — no jargon, no theory that doesn't hold up in a small business."
        />
      </AnimatedSection>

      <BlogList posts={posts} />
    </Container>
  );
}
