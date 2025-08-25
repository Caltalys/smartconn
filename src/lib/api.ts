// lib/api.ts
import { strapi, type StrapiClient } from "@strapi/client";
import type { AboutPage, Article, Articles, LandingPage, Service, Services } from "./types";

type StrapiFilterValue =
    | string
    | number
    | boolean
    | { [key: string]: StrapiFilterValue }
    | StrapiFilterValue[];

type StrapiFilters = {
    [key: string]: StrapiFilterValue;
};

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
        ...(locale && {
            headers: { 
                "Accept-Language": locale, 
                "cache": "no-store" 
            },
        }),
    });
};

export const getHeaderFooterSection = async (locale: string): Promise<LandingPage> => {
    const client = getStrapiClient(locale).single('landing-page');
    const populateList = [
        'headerSection.navbar',
        'headerSection.navbar.menus',
        'headerSection.navbar.menus.submenus',
        'footerSection.quickLinks'
    ];
    const response = await client.find({
        locale: locale,
        populate: populateList
    });
    return response.data as unknown as LandingPage;  
};

export const getAboutPage = async (locale: string): Promise<AboutPage> => {
    const client = getStrapiClient(locale).single('about');
    // const populateList = [
    //     'about',
    //     'about.base.image',
    //     'about.base.ctas',
    //     'about.features',
    //     'about.features.image',
    // ];
    const response = await client.find({
        locale: locale,
        populate: {
            headline : true,
            blocks: {
                populate: '*',
            },
            features: {
                populate: '*',
            }
        },
    });
    console.log(response);
    return response.data as unknown as AboutPage;  
};

export const getLandingPage = async (locale: string): Promise<LandingPage> => {
    const client = getStrapiClient(locale).single('landing-page');
    const populateList = [
        'headerSection.navbar',
        'headerSection.navbar.menus',
        'headerSection.navbar.menus.submenus',
        'heroSection.base',
        'heroSection.base.ctas',
        'heroSection.image',
        'heroSection.video',
        'aboutSection.base',
        'aboutSection.base.ctas',
        'aboutSection.base.image',
        'servicesSection.base',
        'servicesSection.base.ctas',
        'servicesSection.services',
        'servicesSection.services.image',
        'advantagesSection.base',
        'advantagesSection.base.ctas',
        'advantagesSection.items',
        'partnerSection.base',
        'partnerSection.base.ctas',
        'partnerSection.items',
        'partnerSection.items.image',
        'footerSection.quickLinks',
        'blocks.image',
        'blocks.cta'
        ];
    const response = await client.find({
        locale: locale,
        populate: populateList
    });
    //console.log(response);
    return response.data as unknown as LandingPage;  
};

export const getAllArticles = async (
    locale: string,
    { page = 1, pageSize = 10, query }: { page?: number; pageSize?: number; query?: string } = {}
): Promise<Articles> => {
    const client = getStrapiClient(locale).collection('articles');

    const filters: StrapiFilters = {
        category: { id: { $notIn: [6,7] } },
    };
    if (query) {
        filters.$or = [
            { title: { $containsi: query } },
            { description: { $containsi: query } },
            { category: { name: { $containsi: query } } },
        ];
    }
    const response = await client.find({
        locale: locale,
        filters,
        populate: ['cover', 'category', 'author'],
        sort: 'publishedAt:desc',
        pagination: { page, pageSize },
    });
    //console.log(response);
    return response as unknown as Articles;
};

export const getRecruitmentArticles = async (
    locale: string,
    { page = 1, pageSize = 10 }: { page?: number; pageSize?: number } = {}
): Promise<Articles> => {
    const client = getStrapiClient(locale).collection('articles');
    const response = await client.find({
        locale: locale,
        filters: { category: { id : { $eq: 6 }} },
        populate: ['cover', 'category', 'author'],
        sort: 'publishedAt:desc',
        pagination: { page, pageSize },
    });
    console.log(response);
    return response as unknown as Articles;
};

export const getArticleBySlug = async (slug: string, locale: string): Promise<Article | null> => {
    const client = getStrapiClient(locale).collection('articles');
    const articles = await client.find({
        locale: locale,
        filters: { slug: { $eq: slug } },
        populate: {
            cover: true,
            category: true,
            author: true,
            blocks: {
                populate: '*',
            },
        },
        pagination: {
            limit: 1
        }
    });
    //console.log(articles);
    if (articles.data.length === 0) {
        return null;
    }
    return articles.data[0] as unknown as Article;
};

export const getAllServices = async (
    locale: string,
    { page = 1, pageSize = 10 }: { page?: number; pageSize?: number } = {}
): Promise<Services> => {
    const client = getStrapiClient(locale).collection('services');
    const response = await client.find({
        locale: locale,
        populate: ['cover'],
        sort: 'publishedAt:desc',
        pagination: { page, pageSize },
    });
    //console.log(response);
    return response as unknown as Services;
};

export const getServiceBySlug = async (slug: string, locale: string): Promise<Service | null> => {
    const client = getStrapiClient(locale).collection('services');
    const services = await client.find({
        locale: locale,
        filters: { slug: { $eq: slug } },
        populate: {
            cover: true,
            blocks: {
                populate: '*',
            },
        },
        pagination: {
            limit: 1
        }
    });
    //console.log(services);
    if (services.data.length === 0) {
        return null;
    }
    return services.data[0] as unknown as Service;
};

export const getAllCategories = async (locale: string) => {
    const client = getStrapiClient(locale).collection('categories');
    return await client.find();
};
