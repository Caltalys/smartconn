import { strapiClient } from "../strapi-client";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { getStrapiMedia } from "../utils";
import { Author, StrapiAuthor } from "@/types/strapi/collections/author";
import { Category, StrapiCategory } from "@/types/strapi/collections/category";
import { Article, StrapiArticle } from "@/types/strapi/collections/article";

// --- Mappers ---

/**
 * Ánh xạ dữ liệu thô của một Author.
 */
function mapAuthor(author: StrapiAuthor | null): Author | null {
    if (!author) return null;
    return {
        id: author.id,
        name: author.name,
        avatarUrl: getStrapiMedia(author.avatar?.url),
    };
}

/**
 * Ánh xạ dữ liệu thô của một Category.
 */
function mapCategory(category: StrapiCategory | null): Category | null {
    if (!category) return null;
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Article từ Strapi sang cấu trúc dữ liệu sạch cho frontend.
 */
export function mapArticle(article: StrapiArticle): Article {
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.slug,
        cover: article.cover,
        author: mapAuthor(article.author),
        category: mapCategory(article.category),
        blocks: article.blocks,
        publishedAt: article.publishedAt,
    };
}

// --- API Fetchers ---

interface ArticlesResponse extends StrapiResponseCollection<StrapiArticle> {}

/**
 * Lấy tất cả bài viết, hỗ trợ phân trang và tìm kiếm.
 */
export async function getAllArticles(
    locale: string,
    params: { page?: number; pageSize?: number; query?: string; categorySlug?: string } = {}
): Promise<{ data: Article[]; meta: any }> {
    const client = strapiClient(locale);
    const { page = 1, pageSize = 10, query = '', categorySlug = '' } = params;

    try {
        const response = await client.collection('articles').find({
            locale,
            sort: 'publishedAt:desc',
            pagination: {
                page,
                pageSize,
            },
            filters: {
                ...(query && { title: { $containsi: query } }),
                ...(categorySlug && { category: { slug: { $eq: categorySlug } } }),
            },
            populate: ['cover', 'category', 'author', 'author.avatar'],
        }) as unknown as ArticlesResponse;

        return {
            data: response.data.map(mapArticle),
            meta: response.meta,
        };
    } catch (error) {
        console.error("API Error: Could not fetch articles.", error);
        return { data: [], meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } } };
    }
}

/**
 * Lấy một bài viết duy nhất dựa vào slug.
 */
export async function getArticleBySlug(slug: string, locale: string): Promise<Article | null> {
    const client = strapiClient(locale);
    try {
        const response = await client.collection('articles').find({
            locale,
            filters: { slug: { $eq: slug } },
            populate: ['cover', 'category', 'author', 'author.avatar', 'blocks'],
        }) as unknown as StrapiResponseCollection<StrapiArticle>;

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return mapArticle(response.data[0]);
    } catch (error) {
        console.error(`API Error: Could not fetch article with slug "${slug}".`, error);
        return null;
    }
}