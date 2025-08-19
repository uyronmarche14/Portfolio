import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: "standalone",

  // Image optimization
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Experimental features for optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react",
      "react-icons",
      "framer-motion",
    ],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Bundle analyzer (only in analyze mode)
  ...(process.env.ANALYZE === "true" && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require("@next/bundle-analyzer"))({
          enabled: true,
        })
      );
      return config;
    },
  }),

  // Webpack optimizations
  webpack: (config: any, { dev, isServer }: any) => {
    // Bundle analyzer
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new (require("@next/bundle-analyzer"))({
          enabled: true,
        })
      );
    }

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          // Separate UI library chunks
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|@heroicons)[\\/]/,
            name: "ui-libs",
            chunks: "all",
            priority: 20,
          },
          // Separate animation library chunks
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: "animations",
            chunks: "all",
            priority: 20,
          },
        },
      };
    }

    return config;
  },

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Static file caching
  async rewrites() {
    return [
      {
        source: "/static/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
