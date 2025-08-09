// lib/api.ts
import { strapi, type StrapiClient } from "@strapi/client";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!strapiUrl) {
    throw new Error(
        "The Strapi URL is missing. Please set NEXT_PUBLIC_STRAPI_URL in your environment variables."
    );
}

/**
 * Returns a Strapi client instance with locale-specific headers.
 * @param {string} [locale] - The locale for the 'Accept-Language' header.
 * @returns {StrapiClient} A configured StrapiClient instance.
 */
const getStrapiClient = (locale?: string): StrapiClient => {
    return strapi({
        baseURL: strapiUrl,
        ...(strapiToken && { auth: strapiToken }),
        ...(locale && { headers: { "Accept-Language": locale } }),
    });
};

export const getAllArticles = async (locale: string) => {
    const client = getStrapiClient(locale).collection('articles');
    return await client.find({
        populate: ['cover', 'category', 'author'],
        sort: 'publishedAt:desc',
    });
};

export const getAllCategories = async (locale: string) => {
    const client = getStrapiClient(locale).collection('categories');
    return await client.find();
};
