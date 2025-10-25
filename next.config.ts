import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BLOB_HOSTNAME!,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
