import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

interface OgImageInput {
  eyebrow: string;
  title: string;
}

/** Shared Open Graph artwork: dark, typographic, one accent glow. */
export function renderOgImage({ eyebrow, title }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0d",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(91,124,255,0.35), transparent 45%), radial-gradient(circle at 100% 100%, rgba(155,123,255,0.25), transparent 40%)",
          color: "#f5f5f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 6 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(120deg, #5b7cff, #9b7bff)",
            }}
          />
          RAFI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#a3a3ab" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 48 ? 64 : 80, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a3a3ab" }}>
          <span>{siteConfig.name}</span>
          <span>{siteConfig.roles.join(" · ")}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
