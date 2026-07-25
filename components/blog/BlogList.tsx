import type { BlogPostMeta } from "@/types";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <AnimatedCard key={post.slug} index={index}>
          <BlogPostCard post={post} />
        </AnimatedCard>
      ))}
    </div>
  );
}
