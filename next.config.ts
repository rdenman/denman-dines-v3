import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["lucide-react"],
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
