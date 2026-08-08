export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  image: string; // path under /public
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  results: string[];
  tags: string[];
  /** Path under /public to a real screenshot/mockup. Falls back to the gradient "Concept visual" banner when unset. */
  image?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};
