import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.peerlistforms.vercel.app",
        port: "",
        pathname: "/",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
