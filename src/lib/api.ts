// lib/api.ts
import { strapi, type StrapiClient } from "@strapi/client";
import type { Article, Articles, LandingPage } from "./types";

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
export const getStrapiClient = (locale?: string): StrapiClient => {
    return strapi({
        baseURL: strapiUrl,
        ...(strapiToken && { auth: strapiToken }),
        ...(locale && { headers: { "Accept-Language": locale } }),
    });
};

export const getLandingPage = async (locale: string): Promise<LandingPage> => {
    const client = getStrapiClient(locale).single('landing-page');
    const populateList = [
        'heroSection',
        'heroSection.image',
        'heroSection.cta'];
    const response = await client.find({
        populate: populateList
    });
    return response as unknown as LandingPage;  
};

export const getAllArticles = async (locale: string): Promise<Articles> => {
    const client = getStrapiClient(locale).collection('articles');
    const response = await client.find({
        populate: ['cover', 'category', 'author'],
        sort: 'publishedAt:desc',
    });
    return response as unknown as Articles;
};

export const getArticleBySlug = async (slug: string, locale: string): Promise<Article | null> => {
    const client = getStrapiClient(locale).collection('articles');
    const articles = await client.find({
        filters: { slug: { $eq: slug } },
        populate: ['cover', 'category', 'author', 'blocks'],
        pagination: {
            limit: 1
        }
    });
    if (articles.data.length === 0) {
        return null;
    }
    return articles.data[0] as unknown as Article;
};

export const getAllCategories = async (locale: string) => {
    const client = getStrapiClient(locale).collection('categories');
    return await client.find();
};
