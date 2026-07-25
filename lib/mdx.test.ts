import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

describe("getAllPosts", () => {
  it("returns all seeded posts with required frontmatter fields", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThanOrEqual(3);
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.author).toBeTruthy();
    }
  });

  it("sorts posts newest-first by date", () => {
    const posts = getAllPosts();
    const dates = posts.map((p) => p.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));

    expect(dates).toEqual(sorted);
  });

  it("does not include MDX body content in the listing", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post).not.toHaveProperty("content");
    }
  });
});

describe("getPostBySlug", () => {
  it("returns the full post, including content, for a known slug", () => {
    const [firstMeta] = getAllPosts();
    const post = getPostBySlug(firstMeta.slug);

    expect(post).not.toBeNull();
    expect(post?.slug).toBe(firstMeta.slug);
    expect(post?.content.length).toBeGreaterThan(0);
  });

  it("returns null for a slug that doesn't exist", () => {
    const post = getPostBySlug("this-slug-does-not-exist");
    expect(post).toBeNull();
  });
});
