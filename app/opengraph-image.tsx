import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(120deg, #0a0a0a 0%, #1e1b4b 60%, #4c1d3d 100%)",
          color: "white",
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 32, color: "#a5b4fc", marginBottom: 24 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", maxWidth: 900 }}>{siteConfig.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
