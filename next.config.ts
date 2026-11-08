import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/china", destination: "/study-abroad/china", permanent: false },
      { source: "/universities", destination: "/china-universities", permanent: false },
      { source: "/universities/:slug", destination: "/china-universities/:slug", permanent: false },
      { source: "/programs", destination: "/china-programs", permanent: false },
      { source: "/programs/compare", destination: "/china-programs/compare", permanent: false },
      { source: "/study/scholarships", destination: "/china-scholarships", permanent: false },
      { source: "/scholarships/:slug", destination: "/china-scholarships/:slug", permanent: false },
      { source: "/eligibility", destination: "/eligibility-checker", permanent: false },
      { source: "/study/inquiry", destination: "/apply", permanent: false },
      { source: "/admission-guide", destination: "/admission-requirements", permanent: false },
      { source: "/admission-guide/csca", destination: "/csca", permanent: false },
    ];
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
