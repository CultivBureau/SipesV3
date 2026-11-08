import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The assistant reads /KB at runtime; make sure it ships with the server build.
  outputFileTracingIncludes: {
    "/api/agent": ["./KB/**/*"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/product/:slug*",
        destination: "/sipes/product/:slug*",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/sipes/products",
        permanent: true,
      },
      {
        source: "/colours",
        destination: "/sipes/colours",
        permanent: true,
      },
      {
        source: "/calculator",
        destination: "/sipes/calculator",
        permanent: true,
      },
      {
        source: "/catalogue",
        destination: "/sipes/catalogue",
        permanent: true,
      },
      {
        source: "/loyalty",
        destination: "/sipes/loyalty",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/sipes/faq",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/sipes/news",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/sipes/projects",
        permanent: true,
      },
    ];
  },
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
