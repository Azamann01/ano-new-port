import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  BlogPost,
  BlogPostMeta,
  ResearchArticle,
  ResearchArticleMeta,
  ResearchSource,
} from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const RESEARCH_DIR = path.join(process.cwd(), "content", "research");

/** Newest first. Dates are ISO strings, so a plain string compare is enough. */
function byDateDesc(a: { date: string }, b: { date: string }) {
  return a.date < b.date ? 1 : -1;
}

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readFile(dir: string, slug: string) {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
  return matter(raw);
}

function readPostFile(slug: string): BlogPost {
  const { data, content } = readFile(BLOG_DIR, slug);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author ?? "Ano",
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return listSlugs(BLOG_DIR)
    .map((slug): BlogPostMeta => {
      const { content, ...meta } = readPostFile(slug);
      void content;
      return meta;
    })
    .sort(byDateDesc);
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`))) return null;
  return readPostFile(slug);
}

/**
 * Research briefs are MDX articles, same pipeline as the blog — the HTML page
 * is the source of truth, not a PDF. A `pdf` frontmatter field is optional and
 * only ever a point-in-time export of what the article already says.
 */
function readResearchFile(slug: string): ResearchArticle {
  const { data, content } = readFile(RESEARCH_DIR, slug);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    researchFocus: data.researchFocus,
    methodology: data.methodology,
    pdf: data.pdf,
    sources: (data.sources ?? []) as ResearchSource[],
    content,
  };
}

export function getAllResearchArticles(): ResearchArticleMeta[] {
  return listSlugs(RESEARCH_DIR)
    .map((slug): ResearchArticleMeta => {
      const { content, ...meta } = readResearchFile(slug);
      void content;
      return meta;
    })
    .sort(byDateDesc);
}

export function getResearchArticleBySlug(slug: string): ResearchArticle | null {
  if (!fs.existsSync(path.join(RESEARCH_DIR, `${slug}.mdx`))) return null;
  return readResearchFile(slug);
}
