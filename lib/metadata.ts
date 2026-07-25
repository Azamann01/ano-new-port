import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogImage = "/opengraph-image",
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
