import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https' if your local server uses HTTPS
        hostname: "localhost",
        port: "1337", // Replace with the port your local image server is running on (e.g., 8000 for Django, 3000 for another Next.js app)
        pathname: "/**", // Allows any path on localhost
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
