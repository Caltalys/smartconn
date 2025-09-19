import { strapi, StrapiClient } from "@strapi/client";

const client = strapi({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api",
  auth: process.env.STRAPI_API_TOKEN,
});

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const strapiToken = process.env.STRAPI_API_TOKEN;

/**
 * Factory function to create a Strapi client instance
 * with optional locale & headers.
 */
export const strapiClient = (locale?: string): StrapiClient => {
  return strapi({
    baseURL: strapiUrl,
    ...(strapiToken && { auth: strapiToken }),
    ...(locale && {
      headers: {
        "Accept-Language": locale,
        "cache": "no-store", // disable caching in fetch
      },
    }),
  });
};