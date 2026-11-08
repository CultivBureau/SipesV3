import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The assistant reads /KB at runtime; make sure it ships with the server build.
  outputFileTracingIncludes: {
    "/api/agent": ["./KB/**/*"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
