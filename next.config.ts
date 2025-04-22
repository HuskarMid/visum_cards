import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/visum_cards',
  assetPrefix: '/visum_cards/',
};

export default nextConfig;
