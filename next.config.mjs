import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
    // Include `turbo` so next-intl adds aliases here instead of the
    // newer `turbopack` key, which isn't recognized in our Next.js version.
    turbo: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.smartcomsolutions.vn",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        port: '1337',
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        port: '3000',
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);