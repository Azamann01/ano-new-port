import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/content/projects";
import { getAllPosts, getAllResearchArticles } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/research",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
  ].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}`, siteConfig.url).toString(),
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(post.date),
  }));

  const researchRoutes = getAllResearchArticles().map((article) => ({
    url: new URL(`/research/${article.slug}`, siteConfig.url).toString(),
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...researchRoutes];
}
