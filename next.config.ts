import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.smartcomsolutions.vn",
        pathname: "/uploads/**",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
