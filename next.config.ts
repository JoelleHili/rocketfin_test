import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles']
  }
};

export default nextConfig;
