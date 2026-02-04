import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // If deploying to a subdirectory (e.g., username.github.io/repo-name), uncomment and set:
  // basePath: '/repo-name',
  // trailingSlash: true,
};

export default nextConfig;
