import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {},
};
export default nextConfig;
