import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function buildOgImageResponse(title: string, subtitle?: string) {
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
          background: "#ffffff",
          color: "#000000",
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        {subtitle && (
          <div style={{ fontSize: 32, color: "#000000", marginBottom: 24 }}>{subtitle}</div>
        )}
        <div style={{ display: "flex", maxWidth: 900 }}>{title}</div>
      </div>
    ),
    { ...ogImageSize }
  );
}
