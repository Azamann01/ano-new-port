import { siteConfig } from "@/lib/site-config";

export function GoogleFormEmbed() {
  return (
    <div className="surface-container overflow-hidden rounded-2xl">
      <iframe
        src={siteConfig.researchGoogleFormUrl}
        title="Research contribution form"
        className="min-h-[1200px] w-full"
        loading="lazy"
      >
        Loading form…
      </iframe>
    </div>
  );
}
