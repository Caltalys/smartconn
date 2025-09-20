import { strapiClient } from "../strapi-client";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { getStrapiMedia } from "../utils";
import { Service, StrapiService } from "@/types/strapi/collections/service";

// --- Mappers ---

/**
 * Ánh xạ dữ liệu thô của một Service từ Strapi sang cấu trúc dữ liệu sạch cho frontend.
 */
export function mapService(article: StrapiService): Service {
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.slug,
        cover: article.cover,
        blocks: article.blocks,
        publishedAt: article.publishedAt,
    };
}

// --- API Fetchers ---

interface ServicesResponse extends StrapiResponseCollection<StrapiService> {}

/**
 * Lấy tất cả bài viết, hỗ trợ phân trang và tìm kiếm.
 */
export async function getAllServices(
    locale: string,
    params: { page?: number; pageSize?: number; query?: string } = {}
): Promise<{ data: Service[]; meta: any }> {
    const client = strapiClient(locale);
    const { page = 1, pageSize = 10, query = '' } = params;

    try {
        const response = await client.collection('services').find({
            locale,
            sort: 'publishedAt:desc',
            pagination: {
                page,
                pageSize,
            },
            filters: {
                ...(query && { title: { $containsi: query } }),
            },
            populate: ['cover'],
        }) as unknown as ServicesResponse;

        return {
            data: response.data.map(mapService),
            meta: response.meta,
        };
    } catch (error) {
        console.error("API Error: Could not fetch services.", error);
        return { data: [], meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } } };
    }
}

/**
 * Lấy một bài viết duy nhất dựa vào slug.
 */
export async function getServiceBySlug(slug: string, locale: string): Promise<Service | null> {
    const client = strapiClient(locale);
    try {
        const response = await client.collection('services').find({
            locale,
            filters: { slug: { $eq: slug } },
            populate: ['cover', 'blocks'],
        }) as unknown as StrapiResponseCollection<StrapiService>;

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return mapService(response.data[0]);
    } catch (error) {
        console.error(`API Error: Could not fetch service with slug "${slug}".`, error);
        return null;
    }
}