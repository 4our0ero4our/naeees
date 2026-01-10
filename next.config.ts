import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Empty turbopack config to silence warning since I am using Turbopack
  turbopack: {},
  // Add next image config to silence warning since I am using next image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
