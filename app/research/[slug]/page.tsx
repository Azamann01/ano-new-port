import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PrintButton } from "@/components/ui/PrintButton";
import { getAllResearchArticles, getResearchArticleBySlug } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllResearchArticles().map((article) => ({ slug: article.slug }));
}

// Same guard as the blog route: reject any slug that isn't a real article at
// build time rather than letting a runtime lookup build a filesystem path
// straight from the URL (see lib/mdx.ts).
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);
  if (!article) {
    return {
      ...buildMetadata({ title: "Research not found", path: `/research/${slug}` }),
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/research/${article.slug}`,
    ogImage: `/research/${article.slug}/opengraph-image`,
  });
}

export default async function ResearchArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);

  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleUrl = new URL(`/research/${article.slug}`, siteConfig.url).toString();

  return (
    <Container className="section-glow relative overflow-hidden flex flex-col gap-10 py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Report",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.date,
            url: articleUrl,
            mainEntityOfPage: articleUrl,
            image: new URL(
              `/research/${article.slug}/opengraph-image`,
              siteConfig.url
            ).toString(),
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            ...(article.sources.length > 0 && {
              citation: article.sources.map((source) => source.text),
            }),
          }),
        }}
      />
      <Link
        href="/research"
        data-print="hide"
        className="inline-flex w-fit items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--container)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to research
      </Link>

      <AnimatedSection className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Research · {formattedDate}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
        {article.researchFocus && (
          <p className="max-w-2xl text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">Research focus:</span>{" "}
            {article.researchFocus}
          </p>
        )}
      </AnimatedSection>

      <SectionDivider />

      {/* Deliberately NOT wrapped in AnimatedSection. Scroll-triggered reveal
          suits short marketing sections, but on a long article it means the
          reader lands on a title followed by a screenful of nothing until
          they scroll — reported as a bug, and rightly so. Long-form reading
          content renders immediately. */}
      <div className="prose prose-neutral max-w-2xl dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--foreground)]">
        <article>
          <MDXRemote source={article.content} />
        </article>
      </div>

      {article.methodology && (
        <AnimatedSection delay={0.1} className="max-w-2xl">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">Research methodology:</span>{" "}
            {article.methodology}
          </p>
        </AnimatedSection>
      )}

      {article.sources.length > 0 && (
        <AnimatedSection delay={0.15} className="surface-container flex flex-col gap-3 rounded-2xl p-6">
          <h2 className="font-semibold">Sources</h2>
          <ul className="flex flex-col gap-3">
            {article.sources.map((source) => (
              <li key={source.text} className="text-sm text-[var(--container-muted)]">
                {source.text}
                {source.url && (
                  <>
                    {" "}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--container-foreground)]"
                    >
                      {source.url.replace(/^https:\/\//, "")}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      )}

      <div className="flex justify-start" data-print="hide">
        <PrintButton />
      </div>
    </Container>
  );
}
