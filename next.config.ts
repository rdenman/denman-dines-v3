import type { NextConfig } from "next";

const blobHostname = process.env.BLOB_HOSTNAME;

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: blobHostname
      ? [
          {
            protocol: "https",
            hostname: blobHostname,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
