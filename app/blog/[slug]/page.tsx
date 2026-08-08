import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      ...buildMetadata({ title: "Post not found", path: `/blog/${slug}` }),
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: `/blog/${post.slug}/opengraph-image`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = new URL(`/blog/${post.slug}`, siteConfig.url).toString();

  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            url: postUrl,
            mainEntityOfPage: postUrl,
            image: new URL(`/blog/${post.slug}/opengraph-image`, siteConfig.url).toString(),
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />
      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to insights
      </Link>

      <AnimatedSection className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {formattedDate} · {post.author}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection
        delay={0.05}
        className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]"
      >
        <article>
          <MDXRemote source={post.content} />
        </article>
      </AnimatedSection>
    </Container>
  );
}
