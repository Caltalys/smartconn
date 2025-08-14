import { strapi as createStrapiClient } from "@strapi/client";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!strapiToken) {
  throw new Error("STRAPI_API_TOKEN is not set in the environment variables.");
}

export const strapi = createStrapiClient({
  baseURL: `${strapiUrl}/api`,
  auth: strapiToken,
});