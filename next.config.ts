import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static exports since we're using dynamic routes
  output: undefined,
};

export default nextConfig;
