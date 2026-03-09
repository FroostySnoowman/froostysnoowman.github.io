import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

module.exports = {
  images: {
    unoptimized: true,
  },
  output: "export"
}

export default nextConfig;
