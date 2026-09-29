import { siteConfig } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/metadata/og";

export const alt = `${siteConfig.name} — ${siteConfig.roles.join(" & ")}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: siteConfig.roles.join(" · "),
    title: "I build digital products, business software and modern web experiences.",
  });
}
