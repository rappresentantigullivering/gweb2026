import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/archivio/2025/",
        destination: "/archivio/2025/index.html",
      },
      {
        source: "/archivio/2025/:path+/",
        destination: "/archivio/2025/:path*/index.html",
      },
    ];
  },
};

export default withMDX(nextConfig);
