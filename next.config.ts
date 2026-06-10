import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/todolist-AI",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
