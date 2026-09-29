import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

// Turbopack requires remark/rehype plugins to be referenced by name with
// serialisable options (functions cannot cross into the Rust compiler).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        { theme: "github-dark-dimmed", keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
