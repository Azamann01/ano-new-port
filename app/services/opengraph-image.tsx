import { siteConfig } from "@/lib/site-config";
import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImageResponse("Services", siteConfig.name);
}
