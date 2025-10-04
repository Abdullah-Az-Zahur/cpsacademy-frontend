import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "img.youtube.com",
      "cpsacademy-backend-production-cefb.up.railway.app",
    ],
  },
};

export default nextConfig;
