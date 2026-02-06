import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vive-tu-red-frontend",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
