/**
 * Global site configuration.
 *
 * Values marked PLACEHOLDER must be replaced before launch — they are
 * intentionally obvious so they are never mistaken for real details.
 */
export const siteConfig = {
  name: "Rafi Rahman",
  shortName: "Rafi",
  role: "Software Engineer",
  roles: ["Software Engineer", "Digital Product Builder"],
  description:
    "Rafi Rahman is a software engineer and digital product builder creating business software, digital products and high-performance web experiences.",
  positioning:
    "I build digital products, business software, and high-performance web experiences that turn ideas and business problems into scalable solutions.",
  // PLACEHOLDER — set NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // PLACEHOLDER — replace with a real inbox.
  email: "hello@example.com",
  locale: "en_US",
  copyrightYear: 2026,
  currentFocus: ["Digital Products", "AI", "Business Software"],
  /**
   * Put the real portrait at /public/images/portrait.jpg and set this to
   * { src: "/images/portrait.jpg", alt: "..." }. While null, a designed
   * placeholder is shown.
   */
  portrait: {
    src: "/images/portrait.jpg",
    alt: "Portrait of Rafi Rahman",
  } as { src: string; alt: string } | null,
} as const;

export type SocialPlatform =
  | "LinkedIn"
  | "GitHub"
  | "Instagram"
  | "Facebook"
  | "X";

export interface SocialLink {
  platform: SocialPlatform;
  /** Empty until the real profile URL is added; empty links render as plain text. */
  href: string;
}

// PLACEHOLDER — add profile URLs.
export const socialLinks: SocialLink[] = [
  { platform: "LinkedIn", href: "" },
  { platform: "GitHub", href: "" },
  { platform: "Instagram", href: "" },
  { platform: "Facebook", href: "" },
  { platform: "X", href: "" },
];
