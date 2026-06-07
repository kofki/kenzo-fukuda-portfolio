import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock imagery is served from Unsplash while real photos are pending.
    // Next.js 16 removed `images.domains`; remotePatterns is the supported API.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // v16 defaults qualities to [75]; allow a sharper tier for hero/feature art.
    qualities: [75, 90],
  },
};

export default nextConfig;
