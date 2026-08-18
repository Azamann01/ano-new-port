import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  const logoBase64 = readFileSync(join(process.cwd(), "public/twt-logo.png")).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <img src={logoSrc} width={420} height={420} alt="" />
        <div style={{ display: "flex", fontSize: 32, color: "#000000", marginTop: 8 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
