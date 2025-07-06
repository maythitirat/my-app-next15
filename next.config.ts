import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "media.licdn.com",
      // ...add other domains if needed...
    ],
  },
  // Reduce experimental features for better Vercel compatibility
  // experimental: {
  //   // Better caching (available in stable)
  //   staleTimes: {
  //     dynamic: 30, // 30 seconds
  //     static: 180, // 3 minutes
  //   },
  // },
};

export default nextConfig;
