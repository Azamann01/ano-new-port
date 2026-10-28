import { getAllResearchArticles, getResearchArticleBySlug } from "@/lib/mdx";
import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getAllResearchArticles().map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);

  return buildOgImageResponse(article?.title ?? "Research not found", "Research");
}
